<template>
  <div>
    <!--展区方案框-->
    <el-dialog :title="(action==='add' ? language.extensionLang.add : action === 'edit' ? language.extensionLang.edit : action==='clone'?language.extensionLang.copy:language.extensionLang.view)+language.extensionLang.exhibitionAreaPlan" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="90%" v-if="childVisible">
      <kindo-box>
        <el-form :model="child" :rules="childRules" ref="child" label-position="right" label-width="80px" inline :disabled="action === 'view'">
          <el-form-item :label="language.extensionLang.exhibitionNum" prop="exhibitionNum">
            <el-select v-model="child.exhibitionNum" @change="selectChange" :clearable="false" :placeholder="language.extensionLang.selectPlaceholder" class="inputclass">
              <el-option v-for="item in source.expnum" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.extensionLang.exhibitionPeriodCode" prop="exhibitionPeriodCode">
            <el-select v-model="child.exhibitionPeriodCode" :clearable="false" :placeholder="language.extensionLang.selectPlaceholder" class="inputclass">
              <el-option v-for="item in source.explist" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.extensionLang.schemeName" prop="schemeName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.schemeName" class="inputclass"></el-input>
          </el-form-item>
        </el-form>
      </kindo-box>
      <kindo-box>
        <kindo-table ref="childTable" :pagination="false" :cell-style="isCenter">
          <el-table-column :label="language.extensionLang.categoryCode" prop="exhibitionCategoryCode" min-width="150px" show-overflow-tooltip :formatter="(row, column, value) => kindo.dictionary.getLabel(source.options, value)" header-align="center">
          </el-table-column>
          <el-table-column :label="language.extensionLang.exhibitionArea" prop="exhibitionAreaCode" min-width="100px" show-overflow-tooltip :formatter="(row, column, value) => kindo.dictionary.getLabel(source.dataareas, value)" header-align="center">
          </el-table-column>
          <el-table-column :label="language.extensionLang.boothNumScale" prop="boothNumScale" min-width="150px" show-overflow-tooltip header-align="center" align="center">
          </el-table-column>
          <el-table-column :label="language.extensionLang.exhibitionAreaLayout" header-align="center">
            <el-table-column :label="language.extensionLang.brandBoothNum" prop="brandBoothNum" min-width="120px" show-overflow-tooltip header-align="center" align="center">
            </el-table-column>
            <el-table-column :label="language.extensionLang.generalBoothNum" prop="generalBoothNum" min-width="130px" show-overflow-tooltip header-align="center" align="center">
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column :label="language.extensionLang.arrangeExhibitionTypeCode" prop="arrangeExhibitionTypeCode" min-width="150px" show-overflow-tooltip :formatter="(row, column, value) => value.split(',').map(item => kindo.dictionary.getLabel(source.arrange, item)).toString()" header-align="center" align="center">
          </el-table-column> -->
          <el-table-column :label="language.extensionLang.arrangeExhibitionOrg" prop="arrangeExhibitionOrg" min-width="150px" show-overflow-tooltip header-align="center" align="center">
          </el-table-column>
          <el-table-column :label="language.extensionLang.color" prop="exhibitionAreaColor" min-width="150px" show-overflow-tooltip header-align="center" align="center">
            <template slot-scope="scope">
              <i class="arrcolor" :style="{ background: scope.row.exhibitionAreaColor }"></i>
            </template>
          </el-table-column>
          <!-- <el-table-column :label="language.extensionLang.standardBoothScale" prop="standardBoothScale" min-width="120px" show-overflow-tooltip header-align="center">
          </el-table-column> -->
          <el-table-column :label="language.extensionLang.applicationTypeCode" prop="applicationTypeCode" min-width="100px" show-overflow-tooltip :formatter="(row, column, value) => kindo.dictionary.getLabel(source.apptype, value)" header-align="center">
          </el-table-column>
          <el-table-column :label="language.extensionLang.isUnifyArrange" prop="isUnifyArrangeExhibitionArea" :formatter="(row) => row.isUnifyArrangeExhibitionArea === '0'?language.extensionLang.no:language.extensionLang.yes" min-width="160px" show-overflow-tooltip header-align="center" align="center">
          </el-table-column>
          <el-table-column :label="language.extensionLang.isNewThemeArea" prop="isNewThemeArea" :formatter="(row) => row.isNewThemeArea === '0'?language.extensionLang.no:language.extensionLang.yes" min-width="150px" show-overflow-tooltip header-align="center" align="center">
          </el-table-column>
          <el-table-column :label="language.extensionLang.isImportantArea" prop="isImportantArea" :formatter="(row) => row.isImportantArea === '0'?language.extensionLang.no:language.extensionLang.yes" min-width="150px" show-overflow-tooltip header-align="center" align="center">
          </el-table-column>
          <el-table-column :label="language.extensionLang.operation" width="240" align="center" fixed='right'>
            <template slot-scope="scope">
              <el-button type="text" @click="editRowClick(scope.$index, scope.row, 'view')">{{language.extensionLang.view}}</el-button>
              <el-button type="text" v-if="action!=='view'" :title="language.extensionLang.edit" @click="editRowClick(scope.$index, scope.row, 'edit')">{{language.extensionLang.edit}}</el-button>
              <el-button type="text" v-if="action!=='view'" :title="language.extensionLang.delete" @click="delRowClick(scope.$index, scope.row)">{{language.extensionLang.delete}}</el-button>
            </template>
          </el-table-column>
        </kindo-table>
        <div v-if="action!=='view'" slot="control">
          <el-button type="primary" @click="insert">{{language.extensionLang.addPlanDetail}}</el-button>
        </div>
      </kindo-box>
      <div slot="footer" class="dialog-footer">
        <el-button @click="childVisible = false">{{action==='view'?language.extensionLang.return:language.extensionLang.cancel}}</el-button>
        <el-button v-if="action!=='view'" type="primary" @click="diagsave">{{language.extensionLang.confirm}}</el-button>
      </div>
    </el-dialog>

    <!--展览大类框-->
    <el-dialog :title="(detailAction==='add'? language.extensionLang.add : detailAction==='edit'? language.extensionLang.edit : language.extensionLang.view)+language.extensionLang.planDetail" :close-on-click-modal="false" top="15px" :visible.sync="addVisible" width="70%">
      <kindo-box>
        <el-form :model="addmodel" :rules="addRules" ref="addmodel" :disabled="detailAction ==='view'" label-position="right" label-width="150px" inline>
          <el-form-item :label="language.extensionLang.categoryCode" prop="exhibitionCategoryCode">
            <el-select v-model="addmodel.exhibitionCategoryCode" :clearable="false" :placeholder="language.extensionLang.selectPlaceholder" @change="exhibitionTypeChange" class="normalclass">
              <el-option v-for="item in source.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.extensionLang.exhibitionAreaCode" prop="exhibitionAreaCode">
            <el-select v-model="addmodel.exhibitionAreaCode" :clearable="false" :placeholder="language.extensionLang.selectPlaceholder" @focus="selectExhibitionType(addmodel.exhibitionCategoryCode)" class="normalclass">
              <el-option v-for="item in source.areas" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item :label="language.extensionLang.exhibitionOrg" prop="exhibitionOrg">
            <el-expview-picker v-model="addmodel.exhibitionOrg"></el-expview-picker>
          </el-form-item> -->
          <el-form-item :label="language.extensionLang.numArrangeOrg" prop="numArrangeOrg">
            <el-expview-picker :multiple="true" :colltags="true" :showcheckbox="true" :getchild="true" :disabled="detailAction ==='view'" v-model="addmodel.numArrangeOrg"></el-expview-picker>
          </el-form-item>
          <el-form-item :label="language.extensionLang.positionArrangeOrg" prop="positionArrangeOrg">
            <el-expview-picker :multiple="true" :colltags="true" :showcheckbox="true" :getchild="true" :disabled="detailAction ==='view'" v-model="addmodel.positionArrangeOrg"></el-expview-picker>
          </el-form-item>
          <el-form-item :label="language.extensionLang.boothNumScale1" prop="boothNumScale">
            <el-input-number v-model.trim.number="addmodel.boothNumScale" :min="0" controls-position="right" class="normalclass" label=""></el-input-number>
          </el-form-item>
          <el-form-item :label="language.extensionLang.brandBoothNum" prop="brandBoothNum">
            <el-input-number v-model.trim.number="addmodel.brandBoothNum" :min="0" controls-position="right" class="normalclass" label=""></el-input-number>
          </el-form-item>
          <el-form-item :label="language.extensionLang.generalBoothNum" prop="generalBoothNum">
            <el-input-number v-model.trim.number="addmodel.generalBoothNum" :min="0" disabled controls-position="right" class="normalclass" label=""></el-input-number>
          </el-form-item>
         
          <el-form-item :label="language.extensionLang.isUnifyArrange" prop="isUnifyArrangeExhibitionArea">
            <el-radio v-model="addmodel.isUnifyArrangeExhibitionArea" @change="seatAreaChange" label="0">{{language.extensionLang.no}}</el-radio>
            <el-radio v-model="addmodel.isUnifyArrangeExhibitionArea" @change="seatAreaChange" label="1">{{language.extensionLang.yes}}</el-radio>
          </el-form-item>
          <el-form-item :label="language.extensionLang.arrangeExhibitionTypeCode" prop="arrangeExhibitionTypeCode">
            <el-select v-model="addmodel.arrangeExhibitionTypeCode" multiple :clearable="false" :placeholder="language.extensionLang.selectPlaceholder" class="normalclass">
              <el-option v-for="item in source.arrangeExhibitionTypeCode" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="language.extensionLang.arrangeExhibitionOrg" prop="arrangeExhibitionOrg">
            <el-input v-model="addmodel.arrangeExhibitionOrg"></el-input>
          </el-form-item>
         
          <el-form-item :label="language.extensionLang.applicationTypeCode" prop="applicationTypeCode">
            <el-select v-model="addmodel.applicationTypeCode" :clearable="false" :placeholder="language.extensionLang.selectPlaceholder" class="normalclass">
              <el-option v-for="item in source.apptype" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.extensionLang.remark" prop="remark">
            <el-input type="textarea" v-model="addmodel.remark" placeholder="" rows="3" maxlength="200"></el-input>
          </el-form-item>
          <!-- <el-form-item :label="language.extensionLang.seatArea" prop="seatArea">
            <el-input-number v-model.trim.number="addmodel.seatArea" :max="100000" controls-position="right" class="normalclass" label="" @change="seatAreaChange"></el-input-number>
          </el-form-item>
          <el-form-item :label="language.extensionLang.standardBoothScale" prop="inputValue">
            <el-tag :key="tag" v-for="tag in dynamicTags" :closable='detailAction !=="view"' :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="addmodel.inputValue" ref="saveTagInput" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
            <el-button v-else class="button-new-tag" @click="showInput">+ {{language.extensionLang.add}}</el-button>
          </el-form-item> -->
         
          <el-form-item :label="language.extensionLang.isNewThemeArea" prop="isNewThemeArea">
            <el-radio v-model="addmodel.isNewThemeArea" label="0">{{language.extensionLang.no}}</el-radio>
            <el-radio v-model="addmodel.isNewThemeArea" label="1">{{language.extensionLang.yes}}</el-radio>
          </el-form-item>
          <el-form-item :label="language.extensionLang.isImportantArea" prop="isImportantArea">
            <el-radio v-model="addmodel.isImportantArea" label="0">{{language.extensionLang.no}}</el-radio>
            <el-radio v-model="addmodel.isImportantArea" label="1">{{language.extensionLang.yes}}</el-radio>
          </el-form-item>
          <el-form-item :label="language.extensionLang.exhibitionAreaCode+language.extensionLang.color" prop="exhibitionAreaColor">
            <el-color-picker :predefine="predefineColors" v-model="addmodel.exhibitionAreaColor"></el-color-picker>
            <!-- <colorPicker v-model="addmodel.exhibitionAreaColor" /> -->
            <!-- <div class='areaColor'><colorPicker v-model="addmodel.exhibitionAreaColor" class='classPlace' /></div> -->
          </el-form-item>

          <kindo-box>
            <kindo-table ref="themetable" :pagination="false" :cell-style="isCenter">
              <el-table-column :label="language.extensionLang.areaLength + '(mm)'" prop="length" min-width="150" show-overflow-tooltip header-align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.action !== 'edit'" v-text="scope.row.length"></span>
                  <el-input-number v-model.trim.number="scope.row.length" :min="0" controls-position="right" :max="999999" v-else @change="areaChange(scope.row,$event)"></el-input-number>
                  <!-- <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" @change="areaChange(scope.row,$event)" maxlength="100" v-else v-model="scope.row.theme"></el-input> -->
                </template>
              </el-table-column>
              <el-table-column :label="language.extensionLang.areaWidth + '(mm)'" prop="width" min-width="150" show-overflow-tooltip header-align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.action !== 'edit'" v-text="scope.row.width"></span>
                  <el-input-number v-model.trim.number="scope.row.width" :min="0" controls-position="right" :max="999999" v-else @change="areaChange(scope.row,$event)"></el-input-number>
                  <!-- <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" @change="areaChange(scope.row,$event)" maxlength="100" v-else v-model="scope.row.category"></el-input> -->
                </template>
              </el-table-column>
              <el-table-column :label="language.extensionLang.areaCount + '(mm^2)'" prop="area" min-width="150" show-overflow-tooltip header-align="center">
                <template slot-scope="scope">
                  <span v-text="scope.row.area"></span>
                </template>
              </el-table-column>
              <el-table-column :label="language.extensionLang.operation" min-width="160" align="center" fixed='right'>
                <template slot-scope="scope">
                  <div v-if="scope.row.action === 'edit'">
                    <el-button type="text" @click="saveTheme(scope.row, scope.$index)">{{language.extensionLang.save}}</el-button>
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
              <el-button type="primary" @click="addArea">{{language.extensionLang.addArea}}</el-button>
            </div>
          </kindo-box>
        </el-form>
      </kindo-box>
      <div slot="footer" v-if="detailAction !=='view'" class="dialog-footer">
        <el-button @click="addVisible = false">{{language.extensionLang.cancel}}</el-button>
        <el-button type="primary" @click="diaginsert">{{language.extensionLang.confirm}}</el-button>
      </div>
      <div slot="footer" v-else class="dialog-footer">
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
      action: "",
      detailAction: "",
      rowdata: {},
      editexp: 1, // 默认展期统计数
      index: "",
      // dynamicTags: [],
      // inputVisible: false,
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#5615c7',
        '#c71585',
        '#c7151b'
      ],
      // 弹出框
      child: {
        action: "",
        schemeId: "",
        schemeName: "",
        exhibitionNum: "",
        exhibitionPeriodCode: "",
        schemeDetails: [],
        exhibitionDetails: []
      },
      addmodel: {
        Id: "",
        schemeDetailId: "",         // 展区方案明细ID
        schemeId: "",               // 展区方案ID
        exhibitionCategoryCode: "", // 展览大类
        exhibitionAreaCode: "",     // 展区名称value值
        exhibitionAreaName: '',       // 展区名称lable值     
        exhibitionAreaColor: "#cccccc",    // 展区颜色
        // standardBoothScale: "",     // 标摊展位规格
        numArrangeOrg: "",          // 展位数量安排单位
        positionArrangeOrg: "",     // 展位位置安排单位
        boothNumScale: 0,           // 展区展位数量总规模
        brandBoothNum: 0,           // 品牌展位数量
        generalBoothNum: 0,         // 一般性展位数量
        arrangeExhibitionTypeCode: [],  // 布展类型
        isUnifyArrangeExhibitionArea: "0",  // 是否为统一布展展区
        arrangeExhibitionOrg: "",   // 布展承建商
        applicationTypeCode: "",    // 申请类型
        remark: "",                 // 备注
        isNewThemeArea: "0",        // 是否新题材展区
        isImportantArea: "0",        // 是否重点关注展区
        standardBoothScales: []     // 标摊展位规格
      },
      source: {
        explist: [],
        dataexplist: [],
        expnum: [],
        options: [],
        areas: [],
        arrange: [],
        apptype: [],
        arrangeExhibitionTypeCode: []
      },
      childRules: {
        schemeName: [],
        exhibitionNum: [],
        exhibitionPeriodCode: []
      },
      addRules: {
        exhibitionCategoryCode: [{ required: true, message: " ", trigger: "change" }],
        exhibitionAreaCode: [{ required: true, message: " ", trigger: "change" }],
        // exhibitionOrg: [{ required: true, message: " ", trigger: "change" }],
        numArrangeOrg: [{ required: true, message: " ", trigger: "change" }],
        isUnifyArrangeExhibitionArea: [],
        positionArrangeOrg: [{ required: true, message: " ", trigger: "change" }],
        arrangeExhibitionTypeCode: [{ required: true, message: " ", trigger: "change" }],
        brandBoothNum: [],
        generalBoothNum: [],
        arrangeExhibitionOrg: [],
        applicationTypeCode: [{ required: true, message: " ", trigger: "change" }],
        exhibitionAreaColor: []
      },
      childVisible: false,
      addVisible: false,
      isAdd: false
    };
  },
  async created() {
    this._child = Object.assign({}, this.child);
    this._addmodel = Object.assign({}, this.addmodel);
    // 读取数据字典
    this.source.explist = await kindo.dictionary.get('exhibitionPeriodNum');  // 展期
    this.source.dataexplist = await kindo.dictionary.get('exhibitionPeriodNum');  // 展期
    this.source.options = await kindo.dictionary.get('bigCategoryOfExhibits'); // 展览大类
    this.source.areas = await kindo.dictionary.get('exhibitionArea'); // 展区
    this.source.dataareas = await kindo.dictionary.get('exhibitionArea'); // 展区
    // this.source.expnum = await kindo.dictionary.get('exhibitionPeriodNum');   // 届别
    this.source.arrange = await kindo.dictionary.get('exhibitionType');   // 布展类型
    this.source.apptype = await kindo.dictionary.get('waysOfApplication');   // 申请类型
    this.childRules.schemeName = [
      // 请输入名称
      { required: true, message: this.language.extensionLang.inputPlaceholder + this.language.extensionLang.name, trigger: "blur" },
      //请输入最多100个字符
      { min: 0, max: 100, message: this.language.extensionLang.inputPlaceholder + this.language.extensionLang.maxChar100, trigger: "blur" }
    ];
    this.childRules.exhibitionNum = [
      // 请选择届别
      { required: true, message: this.language.extensionLang.selectPlaceholder + this.language.extensionLang.exhibitionNum, trigger: "change" }
    ];
    this.childRules.exhibitionPeriodCode = [
      // 请选择展期
      { required: true, message: this.language.extensionLang.selectPlaceholder + this.language.extensionLang.exhibitionPeriodCode, trigger: "change" }
    ];
    this.addRules.isUnifyArrangeExhibitionArea = [
      //请选择是否为统一布展展区
      { required: true, message: this.language.extensionLang.selectPlaceholder + this.language.extensionLang.isUnifyArrange, trigger: "change" }
    ];
    this.addRules.boothNumScale = [
      { required: true, message: this.language.extensionLang.inputPlaceholder, trigger: "change" },
      {
        validator: (rule, value, callback) => {
          if (/^(\d{1,5}|[1]\d{5}|200000)$/.test(value) === false) {
            return callback(new Error(this.language.extensionLang.lessThanTwoHundredthousand));
          } else {
            return callback();
          }
        },
        trigger: "change"
      },
      {
        validator: (rule, value, callback) => {
          if (parseInt(value) < parseInt(this.addmodel.brandBoothNum)) {
            return callback(new Error(this.language.extensionLang.notGreaterthan));
          } else {
            return callback();
          }
        },
        trigger: "change"
      }
    ];
    this.addRules.brandBoothNum = [ // 请输入品牌展位数量
      { required: true, message: this.language.extensionLang.inputPlaceholder, trigger: "change" },
      {
        validator: (rule, value, callback) => {
          if (/^(100000|\d{1,5})$/.test(value) === false) {
            return callback(new Error(this.language.extensionLang.lessThanHundredthousand));
          } else {
            return callback();
          }
        },
        trigger: "change"
      },
      {
        validator: (rule, value, callback) => {
          if (parseInt(value) > parseInt(this.addmodel.boothNumScale)) {
            return callback(new Error(this.language.extensionLang.notGreaterthan));
          } else {
            return callback();
          }
        },
        trigger: "change"
      }
    ];
    this.addRules.generalBoothNum = [
      { required: false, message: this.language.extensionLang.inputPlaceholder, trigger: "change" },
      { pattern: /^(100000|\d{1,5})$/, message: this.language.extensionLang.lessThanHundredthousand }
    ];
    this.addRules.arrangeExhibitionOrg = [
      { required: false, message: this.language.extensionLang.inputPlaceholder, trigger: "change" },
      { min: 1, max: 100, message: this.language.extensionLang.maxChar100, trigger: "change" }
    ];
    this.addRules.exhibitionAreaColor = [
      //选择颜色
      { required: true, message: this.language.extensionLang.selectPlaceholder + this.language.extensionLang.color, trigger: "change" }
    ];
    this.getall();
  },

  mounted() {
    this.$nextTick(function () {
    });
  },
  methods: {
    getadd() {
      this.child = Object.assign({}, this._child);
      this.$refs.child.resetFields();
      this.source.explist = [];
      this.source.arrangeExhibitionTypeCode = [];
      this.addList('child');
    },
    getedit() {
      this.$refs.childTable.internalData = [];
      this.action = 'edit';
      this.editList(this.rowdata, 'schemeId', 'child', this.api.getbyid);
      this.selectChange(this.rowdata.exhibitionNum, 'edit');
    },
    getclone() {
      this.$refs.childTable.internalData = [];
      this.action = 'clone';
      this.cloneList(this.rowdata, 'schemeId', 'child', this.api.clone);
      this.selectChange(this.rowdata.exhibitionNum, 'edit');
    },
    getview() {
      this.$refs.childTable.internalData = [];
      this.action = 'view';
      this.viewList(this.rowdata, 'schemeId', 'child', this.api.getbyid);
    },
    getall() {
      this.source.expnum = [];
      this.$http.get(this.api.getall).then(res => {
        if (res.length) {
          res.forEach((item, index) => {
            let params = {
              id: item.exhibitionId.toString(),
              label: item.exhibitionNum.toString(),
              value: item.exhibitionNum.toString()
            };
            this.source.expnum.push(params);
          });
        }
      });
    },
    async exhibitionTypeChange(val, type) {
      if (!type) {
        this.addmodel.exhibitionAreaCode = '';
      }
      this.source.areas = await kindo.dictionary.getItem(this.source.options, val);
    },
    selectExhibitionType(val) {
      if (!val) {
        this.source.areas = [];
        this.$message({
          type: 'warning',
          message: this.language.extensionLang.selectPlaceholder + this.language.extensionLang.categoryCode
        });
      }
    },
    // 方案明细弹出框 修改、查看 
    editRowClick(rowIndex, row, act) {
      setTimeout(() => {
        this.$refs.child.validate(valid => {
          if (valid) {
            this.addVisible = true;
            this.detailAction = act;
            if (act === 'edit') {
              this.isAdd = false; // 是为编辑数据
              this.index = rowIndex;
            }
            this.addmodel = Object.assign({}, row);
            // 动态判断布展类型内容
            if (this.addmodel.isUnifyArrangeExhibitionArea === "1") {
              this.source.arrangeExhibitionTypeCode = this.source.arrange.filter(item => item.value !== 'STANDARD_BOOTH' && item.value !== 'CENTER_CHANNEL_BOOTH');
            } else {
              this.source.arrangeExhibitionTypeCode = this.source.arrange.filter(item => item.value !== 'UNIFICATION_BOOTH' && item.value !== 'CENTER_CHANNEL_BOOTH');
            }
            this.exhibitionTypeChange(this.addmodel.exhibitionCategoryCode, 'edit');
            this.addmodel.arrangeExhibitionTypeCode = row.arrangeExhibitionTypeCode.split(',');
            this.$nextTick(function () {
              this.$refs.themetable.internalData = this.addmodel.standardBoothScales;
            });
          }
        });
      }, 1000);
    },
    delRowClick(rowIndex, row) {
      //确认删除吗？
      kindo.util.confirm(this.language.extensionLang.deleteConfirm, this.language.extensionLang.tips, "warning", async () => {
        this.$refs.childTable.internalData.splice(rowIndex, 1);
      });
    },
    // 增加面积操作开始
    addArea() {
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
        length: 0,
        width: 0,
        area: 0
        // category: []
      };
      this.$refs.themetable.internalData.push(model);
      // this.updateRows(model);
    },
    saveTheme(row, rowIndex) {
      const param = Object.assign({}, row);
      if (!param.length) {
        // 请输入长
        kindo.util.alert(this.language.extensionLang.inputPlaceholder + this.language.extensionLang.areaLength, this.language.extensionLang.tips, "warning");
        return;
      }
      if (!param.width) {
        // 请输入宽
        kindo.util.alert(this.language.extensionLang.inputPlaceholder + this.language.extensionLang.areaWidth, this.language.extensionLang.tips, "warning");
        return;
      }
       // 判断保存的每一条数据中长宽是不能同时重复
      let isRepeat = false;
      if (this.$refs.themetable.internalData.length) {
        this.$refs.themetable.internalData.forEach((el, index) => {
          if (param.length === el.length && param.width === el.width && index !== rowIndex) {
            isRepeat = true;
          } 
        });
      }
      if (isRepeat) {
        kindo.util.alert(this.language.extensionLang.isAlreadyExist, this.language.extensionLang.tips, "warning");
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
      // this.updateRows(row);
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
    // // 递归更新选项
    // updateRows(row) {
    //   let _this = this;
    //   let ids = [];
    //   _this.source.options.forEach((item, index) => {
    //     _this.source.options[index].disabled = false;
    //   });

    //   ids.forEach(temprow => {
    //     if (temprow) {
    //       const inChecKeys = _this.source.options.findIndex(
    //         temp => temp.value === temprow
    //       );
    //       if (inChecKeys !== -1) {
    //         _this.source.options[inChecKeys].disabled = true;
    //       }
    //     }
    //   });
    // },
    areaChange(row, vlist) {
      const inChecKeys = this.$refs.themetable.internalData.findIndex(
        temp => temp === row
      );
      if (inChecKeys !== -1) {
        row.area = row.length * row.width;
        this.$refs.themetable.internalData.splice(inChecKeys, 1, row);
      }
    },
    seatAreaChange(v) {
      this.addmodel.arrangeExhibitionTypeCode = [];
      this.source.arrangeExhibitionTypeCode.forEach(el => {
        this.addmodel.arrangeExhibitionTypeCode.push(el.value);
      });  
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
          // let sid = null;
          if (this.action === 'add' || this.action === 'clone') {
            url = this.api.add;
          } else if (this.action === 'edit') {
            url = this.api.update;
            // sid = this.child.schemeId;
          }
          // let jsonData = {
          //   schemeId: sid,
          //   schemeName: this.child.schemeName,
          //   exhibitionNum: parseInt(this.child.exhibitionNum),
          //   exhibitionPeriodCode: parseInt(this.child.exhibitionPeriodCode),
          //   creatorId: null,
          //   creatorName: null,
          //   createDate: null,
          //   modifierId: null,
          //   modifierName: null,
          //   modifyDate: null,
          //   schemeDetails: this.$refs.childTable.internalData
          // };
          let params = Object.assign({}, this.child);
          params.schemeDetails = this.$refs.childTable.internalData;
          this.$http.postJson(url, params).then(res => {
            this.childVisible = false;
            this.$emit('reload');
            //数据保存成功
            kindo.util.alert(this.language.extensionLang.saveSuccess, "success");
          });
        }
      });
    },
    // 下拉时更新表格
    selectChange(val, type) {
      if (!type) {
        this.child.exhibitionPeriodCode = "";
      }
      this.source.explist = [];
      if (val) {
        let _this = this;
        this.$http.get(this.api.getnum, { exhibitionNum: val }).then(res => {
          if (res.length) {
            res.forEach((item, index) => {
              let params = {
                id: item.exhibitionPeriodId.toString(),
                label: kindo.dictionary.getLabel(_this.source.dataexplist, item.exhibitionPeriodDictCode),
                value: item.exhibitionPeriodDictCode.toString()
              };
              _this.source.explist.push(params);
            });
          }
        });
      }
    },
    // 添加方案明细
    insert() {
      this.$refs.child.validate(valid => {
        if (valid) {
          this.addVisible = true;
          this.$nextTick(function () {
            this.index = "";
            this.addmodel = Object.assign({}, this._addmodel);
            this.$refs.addmodel.resetFields();
            this.detailAction = 'add';
            this.isAdd = true;  // 是为增加数据
            this.source.areas = [];
            this.$refs.themetable.internalData = [];
          });
        }
      });
    },
    // 创建自定义分类结构
    createCategory(row) {
      let category = [];
      let themelist = [];
      if (row.standardBoothScales) {
        themelist = row.standardBoothScales;
        themelist.forEach(item => {
          const model = {
            action: "",
            length: item.length,
            width: item.width,
            area: item.area
          };
          category.push(model);
        });
        return category;
      } else {
        return [];
      }
    },
    // 保存大类,确定自动加一期 保存方案明细
    diaginsert() {
      if (!this.$refs.themetable.internalData.length) {
        this.$message({
          type: 'warning',
          message: this.language.extensionLang.addArea
        });
        return;
      }
      let hasEditInfo = false;
      let hasThemeInfo = false;
      this.$refs.childTable.internalData.find((item, index) => {
        if (item.exhibitionCategoryCode === this.addmodel.exhibitionCategoryCode && item.exhibitionAreaCode === this.addmodel.exhibitionAreaCode && this.index !== index) {
          hasEditInfo = true;
          return true;
        }
      });
      if (hasEditInfo) {
        //请勿重复添加数据
        kindo.util.alert(this.language.extensionLang.adddifferentData, this.language.extensionLang.tips, "warning");
        return;
      }
      
      this.$refs.themetable.internalData.forEach((item, index) => {
        if (item.action) {
          hasThemeInfo = true;
          return true;
        }
      });
      if (hasThemeInfo) {
        // kindo.util.alert("请先处理未完成的数据", this.language.extensionLang.tips, "warning");
        kindo.util.alert(this.language.extensionLang.handlePreData, this.language.extensionLang.tips, "warning");
        return;
      }

      this.$refs.addmodel.validate(valid => {
        if (valid) {
          this.addVisible = false;
          this.addmodel.arrangeExhibitionTypeCode = this.addmodel.arrangeExhibitionTypeCode.join(',');
          this.addmodel.exhibitionAreaName = kindo.dictionary.getLabel(this.source.areas, this.addmodel.exhibitionAreaCode);
          this.addmodel.standardBoothScales = this.$refs.themetable.internalData;
          let parms = Object.assign({}, this.addmodel);
          if (this.isAdd) { // 新增方案明细数据
            this.$refs.childTable.internalData.push(parms);
          } else {  // 编辑方案明细数据
            this.$refs.childTable.internalData.splice(this.index, 1, parms);
          }
          this.$refs.childTable.internalData = this.sortData(this.$refs.childTable.internalData);
        }
      });
    },
    // 更新保存
    // saveData(data) {
    //   if (data.schemeDetailId !== "" || data.Id !== "") {
    //     this.$refs.childTable.internalData.splice(this.index, 1, data);
    //   } else {
    //     data.Id = this.$utility.newGuid();
    //     this.$refs.childTable.internalData.push(data);
    //   }
    //   this.$refs.childTable.internalData = this.sortData(
    //     this.$refs.childTable.internalData
    //   );
    // },
    sortData(data) {
      let result = data;
      result.sort((a, b) => {
        var comparison = parseInt(a.exhibitionCategoryCode) - parseInt(b.exhibitionCategoryCode);
        if (comparison === 0) {
          if (a.exhibitionAreaCode > b.exhibitionAreaCode) {
            comparison = 1;
          } else if (a.exhibitionAreaCode < b.exhibitionAreaCode) {
            comparison = -1;
          } else {
            comparison = 0;
          }
        }
        return comparison;
      });
      return result;
    }
  },
  watch: {
    "addmodel.boothNumScale"(v) {
      if (v >= 0) {
        this.addmodel.generalBoothNum = parseInt(v) - parseInt(kindo.validate.isEmpty(this.addmodel.brandBoothNum) ? 0 : this.addmodel.brandBoothNum);
      }
    },
    "addmodel.brandBoothNum"(v) {
      if (v >= 0) {
        this.addmodel.generalBoothNum = parseInt(kindo.validate.isEmpty(this.addmodel.boothNumScale) ? 0 : this.addmodel.boothNumScale) - parseInt(v);
      }
    },
    "addmodel.isUnifyArrangeExhibitionArea"(v) {
      if (v === "1") {
        this.source.arrangeExhibitionTypeCode = this.source.arrange.filter(item => item.value !== 'STANDARD_BOOTH' && item.value !== 'CENTER_CHANNEL_BOOTH');
      } else {
        this.source.arrangeExhibitionTypeCode = this.source.arrange.filter(item => item.value !== 'UNIFICATION_BOOTH' && item.value !== 'CENTER_CHANNEL_BOOTH');
      }
    },
    "action"(value) {
      switch (value) {
        case "add":
          return this.getadd();
        case "edit":
          return this.getedit();
        case "clone":
          return this.getclone();
        case "view":
          return this.getview();
        case "delete":
          return this.deleteList(this.rowdata, 'schemeId', 'child', this.api.delete);
        default:
          return "";
      }
    }
  }
};
</script>

<style scoped>
.arrcolor {
  width: 22px;
  border: 1px solid #ccc;
  height: 22px;
  display: block;
  margin: 0 auto;
  border-radius: 150px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
 .areaColor {
    width: 15px;
    height: 15px;
    border: 1px solid #ccc;
    margin-top: 12px;
  }
  .classPlace {
    position: absolute;
    top: 13px;
    left: 1px; 
  }
  .el-form--inline .el-form-item__content {
    display: inline-block;
    vertical-align: top;
    width: 200px !important;
  }
</style>
