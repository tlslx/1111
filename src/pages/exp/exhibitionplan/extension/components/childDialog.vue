<template>
  <div>
    <!--展览展期框-->
    <el-dialog :title="(action==='add'?language.extensionLang.add:action==='edit'?language.extensionLang.edit:action==='clone'?language.extensionLang.copy:language.extensionLang.view)+language.extensionLang.exhibition+language.extensionLang.exhibitionPeriodCode" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="90%">
      <kindo-box>
        <el-form :model="child" :rules="childRules" ref="child" label-position="right" label-width="80px" inline>
          <el-form-item :label="language.extensionLang.exhibitionNum" prop="exhibitionNum">
            <span v-text="child.exhibitionNum"></span>{{language.extensionLang.session}}
          </el-form-item>
          <el-form-item :label="language.extensionLang.exhibitionName" prop="exhibitionName">
            <el-input v-if="action!=='view'" @blur="(ev)=>ev.target.value = ev.target.value.trim()" @change="selectChangeName" v-model="child.exhibitionName" class="inputclass"></el-input>
            <span v-else v-text="child.exhibitionName"></span>
          </el-form-item>
          <el-form-item :label="language.extensionLang.exhibitionYear" prop="exhibitionYear">
            <el-date-picker v-if="action!=='view'" v-model="child.exhibitionYear" @change="selectChange" :placeholder="language.extensionLang.selectPlaceholder+language.extensionLang.exhibitionYear" :picker-options="{disabledDate:TimeDisabled}" class="inputclass" :clearable="false" :editable="false" type="year"></el-date-picker>
            <span v-else v-text="child.exhibitionYear"></span>
          </el-form-item>
          <el-form-item :label="language.extensionLang.exhibitionSeason" prop="exhibitionSeason">
            <el-select v-if="action!=='view'" v-model="child.exhibitionSeason" @change="selectChange" :clearable="false" :placeholder="language.extensionLang.selectPlaceholder" class="inputclass">
              <el-option v-for="item in source.quarter" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span v-else v-text="kindo.dictionary.getLabel(source.quarter, child.exhibitionSeason)"></span>
          </el-form-item>
        </el-form>
      </kindo-box>
      <kindo-box>
        <kindo-table ref="childTable" :pagination="false" :span-method="objectOneMethod">
          <el-table-column :label="language.extensionLang.exhibitionDate" prop="exhibitionDate" min-width="100px" :formatter="(row, column, value) => this.child.exhibitionYear+language.extensionLang.year+kindo.dictionary.getLabel(source.quarter, this.child.exhibitionSeason)" show-overflow-tooltip header-align="center">
          </el-table-column>
          <el-table-column :label="language.extensionLang.exhibitionNum" prop="exhibitionNum" min-width="100px" show-overflow-tooltip header-align="center">
          </el-table-column>
          <el-table-column :label="language.extensionLang.exhibitionName" prop="exhibitionName" min-width="100px" show-overflow-tooltip header-align="center">
          </el-table-column>
          <el-table-column :label="language.extensionLang.exhibitionPeriodCode" prop="exhibitionPeriodDictCode" min-width="150px" show-overflow-tooltip :formatter="(row, column, value) => kindo.dictionary.getLabel(source.explist, value)" header-align="center">
          </el-table-column>
          <el-table-column :label="language.extensionLang.themeName" prop="themeName" min-width="200px" show-overflow-tooltip header-align="center">
          </el-table-column>
          <el-table-column :label="language.extensionLang.categoryCode" prop="categoryCode" min-width="150px" show-overflow-tooltip :formatter="(row, column, value) => kindo.dictionary.getLabel(source.options, value)" header-align="center">
          </el-table-column>
          <el-table-column :label="language.extensionLang.exhibition+language.extensionLang.time" header-align="center">
            <el-table-column :label="language.extensionLang.prepareStartTime" prop="prepareStartTime" min-width="150px" show-overflow-tooltip header-align="center" align="center">
            </el-table-column>
            <el-table-column :label="language.extensionLang.prepareEndTime" prop="prepareEndTime" min-width="150px" show-overflow-tooltip header-align="center" align="center">
            </el-table-column>
            <el-table-column :label="language.extensionLang.curtainTime" prop="curtainTime" min-width="150px" show-overflow-tooltip header-align="center" align="center">
            </el-table-column>
            <el-table-column :label="language.extensionLang.closingTime" prop="closingTime" min-width="150px" show-overflow-tooltip header-align="center" align="center">
            </el-table-column>
            <el-table-column :label="language.extensionLang.dismantleStartTime" prop="dismantleStartTime" min-width="150px" show-overflow-tooltip header-align="center" align="center">
            </el-table-column>
            <el-table-column :label="language.extensionLang.dismantleEndTime" prop="dismantleEndTime" min-width="150px" show-overflow-tooltip header-align="center" align="center">
            </el-table-column>
          </el-table-column>
          <el-table-column :label="language.extensionLang.operation" width="240" align="center" fixed='right'>
            <template slot-scope="scope">
              <el-button type="text" @click="viewRowClick(scope.row)">{{language.extensionLang.view}}</el-button>
              <el-button v-if="child.action!=='view'" type="text" :title="language.extensionLang.edit" @click="editRowClick(scope.row)">{{language.extensionLang.edit}}</el-button>
              <el-button type="text" :title="language.extensionLang.delete" v-if="child.action!=='view'&&scope.row.exhibitionPeriodDictCode === (editexp-1).toString()" @click="delRowClick(scope.row)">{{language.extensionLang.delete}}</el-button>
            </template>
          </el-table-column>
        </kindo-table>
        <div v-if="child.action!=='view'" slot="control">
          <el-button icon="el-icon-plus" type="primary" @click="insert">{{language.extensionLang.add1+language.extensionLang.exhibitionPeriodCode}}</el-button>
        </div>
      </kindo-box>
      <div slot="footer" class="dialog-footer">
        <el-button @click="childVisible = false">{{language.extensionLang.cancel}}</el-button>
        <el-button v-if="child.action!=='view'" type="primary" @click="diagsave">{{language.extensionLang.confirm}}</el-button>
      </div>
    </el-dialog>

    <!--展览大类框-->
    <el-dialog :title="(detailAction ==='view'?language.extensionLang.view:child.action==='add'?language.extensionLang.add:child.action==='edit'?language.extensionLang.edit:child.action==='clone'?language.extensionLang.copy:language.extensionLang.view)+language.extensionLang.exhibition+language.extensionLang.exhibitionPeriodCode" :close-on-click-modal="false" top="15px" :visible.sync="addVisible" width="55%" v-if="addVisible">
      <kindo-box>
        <el-form :model="addmodel" ref="addmodel" label-position="right" label-width="100px">
          <el-form-item :label="language.extensionLang.exhibitionPeriodCode" prop="exhibitionPeriodDictCode">
            <span v-text="kindo.dictionary.getLabel(source.explist, addmodel.exhibitionPeriodDictCode)"></span>
          </el-form-item>
        </el-form>
        <el-form :model="addmodel" :rules="addRules" ref="addmodel" :disabled="detailAction ==='view'" label-position="right" label-width="100px" inline>
          <el-form-item :label="language.extensionLang.prepareStartTime" prop="prepareStartTime">
            <el-date-picker v-model="addmodel.prepareStartTime" class="normalclass" :picker-options="{disabledDate:val=>val.getTime() < Date.now() - 8.64e7}" :editable="false" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false"></el-date-picker>
          </el-form-item>
          <el-form-item :label="language.extensionLang.prepareEndTime" prop="prepareEndTime">
            <el-date-picker v-model="addmodel.prepareEndTime" class="normalclass" :picker-options="{disabledDate:val=> (val.getTime() < Date.parse(addmodel.prepareStartTime)) ||val.getTime() < Date.now() - 8.64e7}" :editable="false" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false"></el-date-picker>
          </el-form-item>
          <el-form-item :label="language.extensionLang.curtainTime" prop="curtainTime">
            <el-date-picker v-model="addmodel.curtainTime" class="normalclass" :picker-options="{disabledDate:val=>val.getTime() < Date.now() - 8.64e7}" :editable="false" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false"></el-date-picker>
          </el-form-item>
          <el-form-item :label="language.extensionLang.closingTime" prop="closingTime">
            <el-date-picker v-model="addmodel.closingTime" class="normalclass" :picker-options="{disabledDate:val=> (val.getTime() < Date.parse(addmodel.curtainTime)) ||val.getTime() < Date.now() - 8.64e7}" :editable="false" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false"></el-date-picker>
          </el-form-item>
          <el-form-item :label="language.extensionLang.dismantleStartTime" prop="dismantleStartTime">
            <el-date-picker v-model="addmodel.dismantleStartTime" class="normalclass" :picker-options="{disabledDate:val=>val.getTime() < Date.now() - 8.64e7}" :editable="false" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false"></el-date-picker>
          </el-form-item>
          <el-form-item :label="language.extensionLang.dismantleEndTime" prop="dismantleEndTime">
            <el-date-picker v-model="addmodel.dismantleEndTime" class="normalclass" :picker-options="{disabledDate:val=>(val.getTime() < Date.parse(addmodel.dismantleStartTime)) ||val.getTime() < Date.now() - 8.64e7}" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false"></el-date-picker>
          </el-form-item>
          <kindo-box>
            <kindo-table ref="themetable" :pagination="false">
              <el-table-column :label="language.extensionLang.themeName" prop="theme" min-width="150px" show-overflow-tooltip header-align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.action !== 'edit'" v-text="scope.row.theme"></span>
                  <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" maxlength="100" v-else v-model="scope.row.theme"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="language.extensionLang.categoryCode" prop="category" min-width="150px" show-overflow-tooltip header-align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.action !== 'edit'" v-text="getCategory(scope.row.category)"></span>
                  <el-select v-else v-model="scope.row.category" clearable multiple :placeholder="language.extensionLang.selectPlaceholder+language.extensionLang.categoryCode" @change="categoryChange(scope.row,$event)">
                    <el-option v-for="item in source.options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column :label="language.extensionLang.operation" width="160" align="center" fixed='right'>
                <template slot-scope="scope">
                  <div v-if="scope.row.action === 'edit'">
                    <el-button type="text" @click="saveTheme(scope.row)">{{language.extensionLang.save}}</el-button>
                    <el-button type="text" @click="cancelTheme(scope.row)">{{language.extensionLang.delete}}</el-button>
                  </div>
                  <div v-else>
                    <el-button type="text" @click="editTheme(scope.row)">{{language.extensionLang.edit1}}</el-button>
                    <el-button type="text" @click="delTheme(scope.row)">{{language.extensionLang.delete}}</el-button>
                  </div>
                </template>
              </el-table-column>
            </kindo-table>
            <div slot="control">
              <el-button icon="el-icon-plus" type="primary" @click="addTheme">{{language.extensionLang.addline}}</el-button>
            </div>
          </kindo-box>
        </el-form>
      </kindo-box>
      <div slot="footer" v-if="detailAction !=='view'" class="dialog-footer">
        <el-button type="primary" @click="diaginsert">{{language.extensionLang.confirm}}</el-button>
        <!-- <el-button @click="addVisible = false"><i class="glyphicon glyphicon-remove"></i>取 消</el-button> -->
      </div>
      <div slot="footer" v-else class="dialog-footer">
        <!-- <el-button type="primary" @click="diaginsert">{{language.extensionLang.confirm}}</el-button> -->
        <el-button @click="addVisible = false">{{language.extensionLang.return}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
export default {
  name: 'childdialog',
  mixins: [tableMixIn],
  props: {
    api: {
      type: Object,
      default: () => {
        return {};
      }
    },
    language: Object
  },
  data() {
    return {
      editexp: 1, // 默认展期统计数
      action: "",
      detailAction: "",
      rowdata: {},
      // 弹出框
      child: {
        exhibitionId: "",
        exhibitionName: "",
        exhibitionNum: "",
        exhibitionYear: kindo.util.formatDate(new Date(), "yyyy"),
        exhibitionSeason: "1",
        exhibitionDetails: []
      },
      addmodel: {
        exhibitionId: "",
        exhibitionPeriodDictCode: "1",
        themeName: "",
        attrCategory: [],
        prepareStartTime: kindo.util.formatTime(new Date(), "yyyy-MM-dd 00:00:00"),
        prepareEndTime: kindo.util.formatTime(new Date().proDate("{%d+7}"), "yyyy-MM-dd 23:59:59"),
        curtainTime: kindo.util.formatTime(new Date().proDate("{%d+14}"), "yyyy-MM-dd 00:00:00"),
        closingTime: kindo.util.formatTime(new Date().proDate("{%d+21}"), "yyyy-MM-dd 23:59:59"),
        dismantleStartTime: kindo.util.formatTime(new Date().proDate("{%d+28}"), "yyyy-MM-dd 00:00:00"),
        dismantleEndTime: kindo.util.formatTime(new Date().proDate("{%d+35}"), "yyyy-MM-dd 23:59:59")
      },
      source: {
        explist: [],
        quarter: [],
        options: []
      },
      childRules: {
        exhibitionName: [],
        exhibitionYear: [],
        exhibitionSeason: []
      },
      addRules: {
        // theme: [{ required: true, message: " ", trigger: "blur" }],
        // attrCategory: [{ required: true, message: " ", trigger: "change" }]
      },
      childVisible: false,
      addVisible: false,
      isPrepareStartTime: false,
      isPrepareEndTime: false,
      isCurtainTime: false,
      isClosingTime: false,
      isDismantleStartTime: false,
      isDismantleEndTime: false
    };
  },
  async created() {
    this._child = Object.assign({}, this.child);
    this._addmodel = Object.assign({}, this.addmodel);
    // 读取数据字典
    this.source.explist = await kindo.dictionary.get('exhibitionPeriodNum');  // 展期
    this.source.options = await kindo.dictionary.get('bigCategoryOfExhibits'); // 展览大类

    const sessions = [this.language.extensionLang.spring, this.language.extensionLang.autumn];
    sessions.forEach((s, i) => {
      this.source.quarter.push({
        value: (i + 1).toString(),
        label: s
      });
    });
    this.childRules.exhibitionName = [
      // { required: true, message: "请输入名称", trigger: "blur" },
      { required: true, message: this.language.extensionLang.inputPlaceholder + this.language.extensionLang.exhibitionName, trigger: "blur" },
      // { min: 0, max: 255, message: "请输入最多255个字符", trigger: "blur" }
      { pattern: /^[^\s]*$/, message: this.language.extensionLang.isSpace },
      { min: 0, max: 255, message: this.language.extensionLang.inputPlaceholder + this.language.extensionLang.maxChar255, trigger: "blur" }
    ];
    this.childRules.exhibitionYear = [
      //  { required: true, message: "请选择年份", trigger: "change" }
      { required: true, message: this.language.extensionLang.selectPlaceholder + this.language.extensionLang.exhibitionYear, trigger: "change" }
    ];
    this.childRules.exhibitionSeason = [
      //   { required: true, message: "请选择季度", trigger: "change" }
      { required: true, message: this.language.extensionLang.selectPlaceholder + this.language.extensionLang.exhibitionSeason, trigger: "change" }
    ];
    // this.addRules.prepareStartTime = this.addRules.prepareEndTime = this.addRules.curtainTime = this.addRules.closingTime = this.addRules.dismantleStartTime = this.addRules.dismantleEndTime = [
    //   { required: true, message: this.language.extensionLang.selectPlaceholder, trigger: "change" }
    // ];
  },

  mounted() {
    this.$nextTick(function () {
    });
  },
  methods: {
    getadd() {
      this.editexp = 1;
      this.child = Object.assign({}, this._child);
      this.$refs.child.resetFields();
      this.$http.get(this.api.getinit).then(res => {
        this.child.exhibitionYear = res.exhibitionYear;
        this.child.exhibitionNum = res.exhibitionNum.toString();
        this.child.exhibitionSeason = res.exhibitionSeason;
      });
      this.addList('child');
    },
    // 验证查询时间
    TimeDisabled(v) {
      if (Date.parse(v) < Date.parse(new Date())) {
        return true;
      } else {
        return false;
      }
    },
    // 弹出框
    viewRowClick(row) {
      this.addVisible = true;
      this.addmodel = Object.assign({}, row);
      this.detailAction = 'view';
      this.$nextTick(function () {
        this.addmodel.attrCategory = this.createCategory(row);
        this.$refs.themetable.internalData = this.addmodel.attrCategory;
      });
    },
    // 弹出框
    editRowClick(row) {
      this.addVisible = true;
      this.addmodel = Object.assign({}, row);
      this.child.action = 'edit';
      this.detailAction = 'edit';
      this.$nextTick(function () {
        this.addmodel.attrCategory = this.createCategory(row);
        this.$refs.themetable.internalData = this.addmodel.attrCategory;
      });
    },
    delRowClick(row) {
      // 确认删除展期吗？
      kindo.util.confirm(this.language.extensionLang.deleteCode, this.language.extensionLang.tips, "warning", async () => {
        this.deleteRows(row.exhibitionPeriodDictCode);
        this.checkRows(this.$refs.childTable.internalData);
        this.editexp--;
      });
    },
    // 递归更新选项
    updateRows(row) {
      let _this = this;
      let ids = [];
      this.$refs.themetable.internalData.forEach((item, index) => {
        if (row) {
          if (row.category !== item.category) {
            ids = ids.concat(item.category);
          }
        }
      });
      _this.source.options.forEach((item, index) => {
        _this.source.options[index].disabled = false;
      });

      ids.forEach(temprow => {
        if (temprow) {
          const inChecKeys = _this.source.options.findIndex(
            temp => temp.value === temprow
          );
          if (inChecKeys !== -1) {
            _this.source.options[inChecKeys].disabled = true;
          }
        }
      });
    },
    // 递归删除
    deleteRows(exhibitionPeriodDictCode) {
      const inChecKeys = this.$refs.childTable.internalData.findIndex(
        temp => temp.exhibitionPeriodDictCode === exhibitionPeriodDictCode
      );
      if (inChecKeys !== -1) {
        this.$refs.childTable.internalData.splice(inChecKeys, 1);
        this.deleteRows(exhibitionPeriodDictCode);
      } else {
        return false;
      }
    },
    // 去重复,按照顺序格式来排序插入table
    checkRows(row) {
      this.unique(this.$refs.childTable.internalData);
    },
    // 保存提交数据
    diagsave() {
      if (!this.$refs.childTable.internalData.length) {
        //请先添加一条完整数据
        kindo.util.alert(this.language.extensionLang.addData, this.language.extensionLang.tips, "warning");
        return;
      }
      this.$refs.child.validate(valid => {
        if (valid) {
          let url = "";
          if (this.action === 'add' || this.action === 'clone') {
            url = this.api.add;
          } else if (this.action === 'edit') {
            url = this.api.update;
          }
          let jsonData = {
            exhibitionName: this.child.exhibitionName,
            exhibitionNum: parseInt(this.child.exhibitionNum),
            exhibitionPeriodNum: 0,
            exhibitionYear: this.child.exhibitionYear,
            exhibitionSeason: this.child.exhibitionSeason,
            exhibitionDetails: this.$refs.childTable.internalData
          };
          this.$http.postJson(url, jsonData).then(res => {
            this.childVisible = false;
            this.$emit('reload');
            //数据保存成功
            kindo.util.alert(this.language.extensionLang.saveSuccess, "success");
          });
        }
      });
    },
    // 创建自定义分类结构
    createCategory(row) {
      let category = [];
      let themelist = [];
      themelist = this.unique(this.$refs.childTable.internalData);
      themelist.forEach(item => {
        if (row.exhibitionPeriodDictCode === item.exhibitionPeriodDictCode) {
          const model = {
            action: "",
            theme: item.themeName,
            category: item.categoryCodeList
          };
          category.push(model);
        }
      });
      return category;
    },
    unsamle(list) {
      let s = [];
      for (let i = 0; i < list.length; i++) {
        let matchCode = list[i];
        let isExist = false;
        for (let m = 0; m < s.length; m++) {
          if (matchCode.theme === s[m].theme) {
            // cate = arr[j].category.concat(list[i].category);
            s[m].category = s[m].category.concat(matchCode.category);
            // s[m].category += "," + matchCode.category;
            isExist = true;
            break;
          }
        }
        if (!isExist) {
          s.push(matchCode);
        }
      }
      return s;
    },
    unique(list) {
      let arr = [];
      for (let i = 0; i < list.length; i++) {
        if (i === 0) {
          arr.push(list[i]);
        }
        let b = false;
        if (arr.length > 0 && i > 0) {
          for (let j = 0; j < arr.length; j++) {
            if (arr[j].themeName === list[i].themeName && arr[j].exhibitionPeriodDictCode === list[i].exhibitionPeriodDictCode) {
              b = true;
            }
          }
          if (!b) {
            arr.push(list[i]);
          }
        }
      }
      return arr;
    },
    selectChangeName(v) {
      this.child.exhibitionName = v;
      if (this.$refs.childTable.internalData.length) {
        this.$refs.childTable.internalData.forEach((item, index) => {
          item.exhibitionName = this.child.exhibitionName;
        });
      }
    },
    // 下拉时更新表格
    selectChange(v) {
      this.$http.get(this.api.getnum, { exhibitionYear: this.child.exhibitionYear, exhibitionSeason: this.child.exhibitionSeason }).then(res => {
        this.child.exhibitionNum = res.exhibitionNum.toString();
        if (this.$refs.childTable.internalData.length) {
          this.$refs.childTable.internalData.forEach((item, index) => {
            item.exhibitionNum = this.child.exhibitionNum;// + "届"
            item.exhibitionName = this.child.exhibitionName;
            item.exhibitionYear = this.child.exhibitionYear;
            item.exhibitionSeason = this.child.exhibitionSeason;
          });
        }
      });
    },
    // 添加大类验证，是否一期
    insert() {
      if (this.editexp > this.source.explist.length) {
        //超过展期字典设置的最大展期数
        kindo.util.alert(this.language.extensionLang.overDicMaxNum, this.language.extensionLang.tips, "warning");
        return;
      }
      this.$refs.child.validate(valid => {
        if (valid) {
          this.addVisible = true;
          this.$nextTick(function () {
            this.$refs.themetable.internalData = [];
            this.detailAction = 'add';
            this.addmodel.attrCategory = [];
            this.addmodel.exhibitionPeriodDictCode = this.editexp.toString();
            this.addmodel.exhibitionPeriodIndex = this.editexp;
          });
        }
      });
    },
    // 保存大类,确定自动加一期
    diaginsert() {
      let hasEditInfo = false;
      if (this.isPrepareStartTime || this.isPrepareEndTime || this.isCurtainTime || this.isClosingTime || this.isDismantleStartTime || this.isDismantleEndTime) {
        this.$message({
          type: 'warning',
          message: this.language.extensionLang.timePerNode
        });
        return;
      }
      if (Date.parse(this.NewDate(this.addmodel.prepareEndTime)) > Date.parse(this.NewDate(this.addmodel.curtainTime)) || Date.parse(this.NewDate(this.addmodel.closingTime)) > Date.parse(this.NewDate(this.addmodel.dismantleStartTime))) {
        this.$message({
          type: 'warning',
          message: this.language.extensionLang.timePerNode
        });
        return;
      }
      this.$refs.themetable.internalData.forEach((item, index) => {
        if (item.action) {
          hasEditInfo = true;
          return true;
        }
      });
      if (hasEditInfo) {
        // kindo.util.alert("请先处理未完成的数据", this.language.extensionLang.tips, "warning");
        kindo.util.alert(this.language.extensionLang.handlePreData, this.language.extensionLang.tips, "warning");
        return;
      }
      if (!this.$refs.themetable.internalData.length) {
        //请先增加展览大类
        kindo.util.alert(this.language.extensionLang.addPreCategoryCode, this.language.extensionLang.tips, "warning");
        return;
      }
      this.$refs.addmodel.validate(valid => {
        if (valid) {
          this.addVisible = false;
          this.addmodel.attrCategory = this.unsamle(this.$refs.themetable.internalData); // 合并名称相同的数据
          if (!this.addmodel.id && !this.addmodel.exhibitionId) {
            this.editexp++;
          }
          this.saveData(this.addmodel);
        }
      });
    },
    saveData(data) {
      // 先删除后添加
      if (data.exhibitionId) {
        this.deleteRows(data.exhibitionPeriodDictCode);
        this.createData(data);
      } else {
        this.deleteRows(data.exhibitionPeriodDictCode);
        this.createData(data);
      }
      this.$refs.childTable.internalData = this.sortData(
        this.$refs.childTable.internalData
      );
    },
    createData(data) {
      data.attrCategory.forEach(temp => {
        temp.category.forEach((item, index) => {
          let params = {};
          if (this.$refs.childTable.internalData.length === 0) {
            data.exhibitionPeriodIndex = 1;
          }
          params = {
            id: data.exhibitionId !== "" ? data.exhibitionId : this.$utility.newGuid(),
            exhibitionId: data.exhibitionId,
            exhibitionYear: this.child.exhibitionYear,
            exhibitionSeason: this.child.exhibitionSeason,
            exhibitionNum: this.child.exhibitionNum,
            exhibitionName: this.child.exhibitionName,
            exhibitionPeriodDictCode: data.exhibitionPeriodDictCode,
            themeName: temp.theme,
            categoryCode: item,
            categoryCodeList: temp.category,
            curtainTime: data.curtainTime,
            closingTime: data.closingTime,
            prepareStartTime: data.prepareStartTime,
            prepareEndTime: data.prepareEndTime,
            dismantleStartTime: data.dismantleStartTime,
            dismantleEndTime: data.dismantleEndTime,
            exhibitionPeriodIndex: data.exhibitionPeriodIndex,
            exhibitionPeriodNum: 0
          };
          this.$refs.childTable.internalData.push(params);
        });
      });
    },
    sortData(data) {
      let result = data;
      result.sort((a, b) => {
        return parseInt(a.exhibitionPeriodDictCode) - parseInt(b.exhibitionPeriodDictCode);
      });
      return result;
    },
    // 增加展期大类操作
    addTheme() {
      let hasEditInfo = false;
      this.$refs.themetable.internalData.forEach((item, index) => {
        if (item.action) {
          hasEditInfo = true;
          return true;
        }
      });
      if (hasEditInfo) {
        // 请先处理未完成的数据
        kindo.util.alert(this.language.extensionLang.handlePreData, this.language.extensionLang.tips, "warning");
        return;
      }

      const model = {
        action: "edit",
        theme: "",
        category: []
      };
      this.$refs.themetable.internalData.push(model);
      this.updateRows(model);
    },
    saveTheme(row) {
      const param = Object.assign({}, row);
      if (!param.theme) {
        // 请输入展览题材
        kindo.util.alert(this.language.extensionLang.inputPlaceholder + this.language.extensionLang.themeName, this.language.extensionLang.tips, "warning");
        return;
      }
      if (!param.category.length) {
        // 请选择展览大类
        kindo.util.alert(this.language.extensionLang.selectPlaceholder + this.language.extensionLang.categoryCode, this.language.extensionLang.tips, "warning");
        return;
      }

      const inChecKeys = this.$refs.themetable.internalData.findIndex(
        temp => temp === row
      );
      if (inChecKeys !== -1) {
        row.action = "";
        this.$refs.themetable.internalData.splice(inChecKeys, 1, row);
      }
    },
    editTheme(row) {
      // 检查选择是否禁用
      this.updateRows(row);
      const inChecKeys = this.$refs.themetable.internalData.findIndex(
        temp => temp === row
      );
      if (inChecKeys !== -1) {
        row.action = "edit";
        this.$refs.themetable.internalData.splice(inChecKeys, 1, row);
      }
    },
    delTheme(row) {
      const inChecKeys = this.$refs.themetable.internalData.findIndex(
        temp => temp === row
      );
      if (inChecKeys !== -1) {
        this.$refs.themetable.internalData.splice(inChecKeys, 1);
      }
    },
    cancelTheme(row) {
      // 记录上次状态
      this.delTheme(row);
    },
    getCategory(rows) {
      if (rows.length) {
        let catename = "";
        rows.forEach((item, index) => {
          catename += kindo.dictionary.getLabel(this.source.options, item) + "、";
        });
        return catename.substr(0, catename.lastIndexOf("、"));
      } else {
        return "";
      }
    },
    // 处理IE时间兼容性
    NewDate(str) {
      if (kindo.util.checkuserAgent() === "IE") {
        // 首先将日期分隔，获取到日期部分和时间部分
        let newstr = kindo.util.formatTime(str);
        let day = newstr.split(' ');
        // 获取日期部分的年月日
        let days = day[0].split('-');
        // 获取时间部分的时分秒
        let mi = day[day.length - 1].split(':');
        // 获取当前date类型日期
        let date = new Date();
        // 给date赋值年月日
        date.setUTCFullYear(days[0], days[1] - 1, days[2]);
        // 给date赋值时分秒首先转换utc时区+8
        date.setUTCHours(mi[0] - 8, mi[1], mi[2]);
        return date;
      } else {
        return str;
      }
    },
    // select 选中,row当前值，vlist选中数组
    categoryChange(row, vlist) {
      let catename = "";
      vlist.forEach((item, index) => {
        const newitem = this.source.options.filter(temp => temp.value === item)[0];

        catename += newitem.label.substr(0, newitem.label.lastIndexOf("类")) + "、";
      });
      this.addmodel.themeName = catename.substr(0, catename.lastIndexOf("、"));
      row.theme = this.addmodel.themeName;
    },
    // 合并单元格
    setTable(data) {
      let spanOneArr = [];
      let spanTwoArr = [];
      let spanThrArr = [];
      let concatOne = 0;
      let concatTwo = 0;
      let concatThr = 0;
      data.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1);
          spanTwoArr.push(1);
          spanThrArr.push(1);
        } else {
          if (item.exhibitionNum === data[index - 1].exhibitionNum) {
            // 第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1;
            spanOneArr.push(0);
          } else {
            spanOneArr.push(1);
            concatOne = index;
          }
          if (item.exhibitionPeriodDictCode === data[index - 1].exhibitionPeriodDictCode) {
            // 第N列合并相同内容的判断条件
            spanTwoArr[concatTwo] += 1;
            spanTwoArr.push(0);
          } else {
            spanTwoArr.push(1);
            concatTwo = index;
          }
          if (item.themeName === data[index - 1].themeName && item.exhibitionPeriodDictCode === data[index - 1].exhibitionPeriodDictCode) {
            // 第N列合并相同内容的判断条件
            spanThrArr[concatThr] += 1;
            spanThrArr.push(0);
          } else {
            spanThrArr.push(1);
            concatThr = index;
          }
        }
      });
      return {
        one: spanOneArr,
        two: spanTwoArr,
        thr: spanThrArr
      };
    },
    objectOneMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3) {
        const _row = this.setTable(this.$refs.childTable.internalData).one[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 4 || columnIndex > 6) {
        const _row = this.setTable(this.$refs.childTable.internalData).two[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 5) {
        const _row = this.setTable(this.$refs.childTable.internalData).thr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    }
  },
  watch: {
    "child.exhibitionYear"(v) {
      this.child.exhibitionYear = kindo.util.formatDate(v, "yyyy");
    },
    "addmodel.prepareStartTime"(v) {
      // if (Date.parse(v) < Date.parse(this.addmodel.prepareEndTime) && Date.parse(v) < Date.parse(this.addmodel.curtainTime) && Date.parse(v) < Date.parse(this.addmodel.closingTime) && Date.parse(v) < Date.parse(this.addmodel.dismantleStartTime) && Date.parse(v) < Date.parse(this.addmodel.dismantleEndTime)) {
      if (Date.parse(this.NewDate(v)) < Date.parse(this.NewDate(this.addmodel.prepareEndTime))) {
        this.addmodel.prepareStartTime = kindo.util.formatTime(v);
        this.isPrepareStartTime = false;
        if (this.isPrepareEndTime) {
          this.isPrepareEndTime = false;
        }
      } else {
        this.$message({
          type: 'warning',
          message: this.language.extensionLang.moreThanStartPreparation
        });
        this.isPrepareStartTime = true;
      }
    },
    "addmodel.prepareEndTime"(v) {
      if (Date.parse(this.NewDate(v)) > Date.parse(this.NewDate(this.addmodel.prepareStartTime))) {
        this.addmodel.prepareEndTime = kindo.util.formatTime(v);
        this.isPrepareEndTime = false;
        if (this.isPrepareStartTime) {
          this.isPrepareStartTime = false;
        }
      } else {
        this.$message({
          type: 'warning',
          message: this.language.extensionLang.moreThanEndPreparation
        });
        this.isPrepareEndTime = true;
      }
      // this.addmodel.prepareEndTime = kindo.util.formatTime(v);
    },
    "addmodel.curtainTime"(v) {
      if (Date.parse(this.NewDate(v)) < Date.parse(this.NewDate(this.addmodel.closingTime))) {
        this.addmodel.curtainTime = kindo.util.formatTime(v);
        this.isCurtainTime = false;
        if (this.isClosingTime) {
          this.isClosingTime = false;
        }
      } else {
        this.$message({
          type: 'warning',
          message: this.language.extensionLang.moreThanStartTime
        });
        this.isCurtainTime = true;
      }
    },
    "addmodel.closingTime"(v) {
      if (Date.parse(this.NewDate(v)) > Date.parse(this.NewDate(this.addmodel.curtainTime))) {
        this.addmodel.closingTime = kindo.util.formatTime(v);
        this.isClosingTime = false;
        if (this.isCurtainTime) {
          this.isCurtainTime = false;
        }
      } else {
        this.$message({
          type: 'warning',
          message: this.language.extensionLang.moreThanCloseTime
        });
        this.isClosingTime = true;
      }
    },
    "addmodel.dismantleStartTime"(v) {
      if (Date.parse(this.NewDate(v)) < Date.parse(this.NewDate(this.addmodel.dismantleEndTime))) {
        this.addmodel.dismantleStartTime = kindo.util.formatTime(v);
        this.isDismantleStartTime = false;
        if (this.isDismantleEndTime) {
          this.isDismantleEndTime = false;
        }
      } else {
        this.$message({
          type: 'warning',
          message: this.language.extensionLang.moreThanDismantlingStartTime
        });
        this.isDismantleStartTime = true;
      }
    },
    "addmodel.dismantleEndTime"(v) {
      if (Date.parse(this.NewDate(v)) > Date.parse(this.NewDate(this.addmodel.dismantleStartTime))) {
        this.addmodel.dismantleEndTime = kindo.util.formatTime(v);
        this.isDismantleEndTime = false;
        if (this.isDismantleStartTime) {
          this.isDismantleStartTime = false;
        }
      } else {
        this.$message({
          type: 'warning',
          message: this.language.extensionLang.moreThanDismantlingEndTime
        });
        this.isDismantleEndTime = true;
      }
    },
    "action"(value) {
      switch (value) {
        case "add":
          return this.getadd();
        case "edit":
          return this.editList(this.rowdata, 'exhibitionId', 'child', this.api.getbyid);
        case "clone":
          return this.cloneList(this.rowdata, 'exhibitionId', 'child', this.api.clone);
        case "view":
          return this.viewList(this.rowdata, 'exhibitionId', 'child', this.api.getbyid);
        case "delete":
          return this.deleteList(this.rowdata, 'exhibitionId', 'child', this.api.delete);
        default:
          return "";
      }
    }
  }
};
</script>

<style scoped>
</style>
