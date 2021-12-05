<template>
  <el-form :ref="name" :model="form" :data-url="api.dataUrl" :update-url="api.updateUrl" :add-url="api.addUrl" @submit-success="onSubmitSuccess" :sub-data='subData'>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称：" prop="menuName">
              <el-input v-model="form.menuName" :disabled="isView"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="子系统路径：" prop="imgUrl">
              <el-input v-model="form.imgUrl" :disabled="isView"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单编码：" prop="menuCode">
              <el-input v-model="form.menuCode" :disabled="isView"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单图标：" prop="menuIcon">
              <el-input v-model="form.menuIcon" :disabled="isView"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单类型：" prop="menuType">
              <el-select v-model="form.menuType" placeholder="请选择" clearable :disabled="isView">
                <el-option v-for="item in source.menuType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级菜单：" prop="parentId">
              <el-tree-picker v-model="form.parentId" return-type="object" root-id="0" :url="api.getMenu" value-field="menuId" text-field="menuName" parent-field="parentId" :disabled="isView">
              </el-tree-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属系统：" prop="systemId">
              <el-dropdown-list v-model="form.systemId" :base-url="api.baseUrl" :url="api.getSystemInfo" text-field="systemName" value-field="systemId" :params="{OrderModelField: [{OrderByField: 'orderNo',asc: true}]}" :allow-create="false" :filterable="true" :clearable="true" :disabled="isView">
              </el-dropdown-list>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.menuType=='1'">
          <el-col :span="24">
            <el-form-item label="菜单链接：" prop="menuUrl">
              <el-input v-model="form.menuUrl" :disabled="isView"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.menuType=='2' || form.menuType=='3'">
          <el-col :span="24">
            <el-form-item :label="fnncLabelText" prop="openFunc">
              <el-input v-model="form.openFunc" :disabled="isView"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态:" prop="state">
              <el-select v-model="form.state" placeholder="请选择" clearable :disabled="isView">
                <el-option v-for="item in source.state" :key="Number(item.value)" :label="item.label" :value="Number(item.value)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序:" prop="orderNo">
              <el-input v-model="form.orderNo" :disabled="isView"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:" prop="remark">
              <el-input type="textarea" v-model="form.remark" :disabled="isView"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <kindo-box>
              <div slot="control">
                <el-button icon="el-icon-plus" type="primary" @click="addLanguage" :disabled="isFormView">{{language.commonLang.add1}}</el-button>
              </div>
              <kindo-table ref="languageTable" :pagination="false">
                <el-table-column prop="languageType" :label="language.dictLang.languageType" min-width="200" show-overflow-tooltip header-align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.action !== 'edit'" v-text="scope.row.languageText"></span>
                    <el-select v-else v-model="scope.row.languageType" clearable :placeholder="language.commonLang.select + language.dictLang.languageType" @change="languageChange(scope.row)">
                      <el-option v-for="item in source.languageSelection" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="languageContent" :label="language.commonLang.languageContent" min-width="200" show-overflow-tooltip header-align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.action !== 'edit'" v-text="scope.row.languageContent"></span>
                    <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" size="mini" v-else v-model="scope.row.languageContent"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="language.commonLang.operation" width="120" align="center" fixed='right'>
                  <template slot-scope="scope">
                    <div v-if="scope.row.action === 'edit'">
                      <el-button type="text" :title="language.commonLang.save" icon="el-icon-check" @click="saveTheme(scope.row)"></el-button>
                      <el-button type="text" :title="language.commonLang.delete" icon="el-icon-close" @click="cancelTheme(scope.row)"></el-button>
                    </div>
                    <div v-else>
                      <el-button type="text" icon="el-icon-edit" :title="language.commonLang.edit1" @click="editTheme(scope.row)" :disabled="isFormView"></el-button>
                      <el-button type="text" icon="el-icon-delete" :title="language.commonLang.delete" @click="delTheme(scope.row)" :disabled="isFormView"></el-button>
                    </div>
                  </template>
                </el-table-column>
              </kindo-table>
            </kindo-box>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script>
import dialogPageBase from "@/components/framework/mixins/dialogPageBase";
export default {
  mixins: [dialogPageBase],
  data() {
    return {
      api: {
        baseUrl: kindo.config.api.upms,
        dataUrl: kindo.config.api.upms + "/api/sysMenu/getSingleById",
        updateUrl: kindo.config.api.upms + "/api/sysMenu/updateById",
        addUrl: kindo.config.api.upms + "/api/sysMenu/add",
        getSystemInfo: kindo.config.api.upms + "/api/sysSystemInfo/getListAll",
        getMenu: kindo.config.api.upms + "/api/sysMenu/getListAll",
        getLanguage: kindo.config.api.upms + "/api/sysI18n/findI18nList"
      },
      submitType: "json",
      activeTab: "baseInfo",
      form: {
        createDate: "",
        creatorId: "",
        creatorName: "",
        imgUrl: "",
        menuType: "0",
        levelCode: "",
        menuCode: "",
        menuIcon: "",
        menuId: "",
        menuName: "",
        menuUrl: "",
        modifierId: "",
        modifierName: "",
        modifyDate: "",
        orderNo: "0",
        parentId: "0",
        remark: "",
        state: 1,
        systemId: "",
        internalData: []
      },
      subData: [],
      source: {
        menuType: "",
        state: "",
        parentDictOptions: [],
        languageSelection: [],
        parentDictOptionsOfEdit: []
      },
      language: {
        dictLang: {},
        commonLang: {}
      },
      isFormView: false,
      isDataLoaded: false
    };
  },
  methods: {
    pageLoad() {
      if (this.args.operType === "addSub" || this.args.operType === "nextAdd") {
        let row = this.args.row;
        let temp = this.formDefault;
        if (this.args.operType === "addSub") {
          temp.orderNo = 0;
          temp.parentId = row.menuId;
        } else {
          temp.orderNo = row.orderNo + 1;
          temp.parentId = row.parentId;
        }
        temp.menuIcon = row.menuIcon;
        if (this.args.operType === "addSub") {
          if (row.menuType === "1") {
            temp.menuType = "2";
          }
        }
        this.form = Object.assign({}, temp);
      }
    },
    onSubmitSuccess(data) {
      this.$message.success("保存成功！请继续新增记录！");
      if (this.$utility.isFunction(this.afterSubmit)) {
        // const param = Object.assign({}, data, { internalData: this.$refs.languageTable.internalData });
        // console.log(param);
        this.afterSubmit(data);
      }
    },
    languageChange(row) {
      //select选择器v-model绑定的是value值，需要展示的是label值
      this.source.languageSelection.forEach(item => {
        if (item.value === row.languageType) {
          row.languageText = item.label;
        }
      });
      //更新到表
      this.$refs.languageTable.internalData.forEach((tableItem, index) => {
        if (tableItem.languageType === row.languageType) {
          tableItem.languageText = row.languageText;
        }
      });
    },

    /**
     * 保存需要提交给国际化数据
     * @param {Array} internalData 语言表格的数据
     */
    saveSubData(internalData) {
      const subFormTable = [];
      const menuId = this.form.menuId;
      internalData.forEach(item => {
        subFormTable.push({
          i18nLanguage: item.languageType,
          i18nKey: menuId,
          i18nValue: item.languageContent
        });
      });
      this.subData = [{
        name: 'SysI18n',
        data: subFormTable
      }];
    },
    saveTheme(row) {
      let _this = this;
      const param = Object.assign({}, row);
      if (!param.languageContent) {
        _this.$message({
          message: _this.language.dictLang.putLanguageContent,
          type: "info"
        });
        return;
      } else if (!param.languageType) {
        _this.$message({
          message: _this.language.dictLang.putLanguageType,
          type: "info"
        });
        return;
      }
      const inChecKeys = _this.$refs.languageTable.internalData.findIndex(temp => temp === row);
      if (inChecKeys !== -1) {
        row.action = "";
        _this.$refs.languageTable.internalData.splice(inChecKeys, 1, row);
        const savedLanguage = this.source.languageSelection.find(item => item.value.toLowerCase() === row.languageType.toLowerCase());
        savedLanguage.disabled = true;
        _this.saveSubData(_this.$refs.languageTable.internalData);
      }
    },
    editTheme(row) {
      // 检查选择是否禁用
      // this.updateRows(row);
      const inChecKeys = this.$refs.languageTable.internalData.findIndex(temp => temp === row);
      if (inChecKeys !== -1) {
        row.action = "edit";
        this.$refs.languageTable.internalData.splice(inChecKeys, 1, row);
      }
    },
    delTheme(row) {
      const inChecKeys = this.$refs.languageTable.internalData.findIndex(temp => temp === row);
      if (inChecKeys !== -1) {
        const savedLanguage = this.source.languageSelection.find(item => item.value.toLowerCase() === row.languageType.toLowerCase());
        if (savedLanguage) {
          savedLanguage.disabled = false;
        }
        this.$refs.languageTable.internalData.splice(inChecKeys, 1);
        this.saveSubData(this.$refs.languageTable.internalData);
      }
    },
    cancelTheme(row) {
      // 记录上次状态
      this.delTheme(row);
    },
    addLanguage() {
      let _this = this;
      let hasEditInfo = false;
      _this.$refs.languageTable.internalData.forEach((item, index) => {
        if (item.action) {
          hasEditInfo = true;
          return true;
        }
      });
      if (hasEditInfo) {
        _this.$message({
          message: _this.language.commonLang.handleUnfinishedData,
          type: "info"
        });
        return;
      }
      const model = {
        action: "edit",
        languageText: "",
        languageType: "",
        languageContent: ""
      };
      _this.$refs.languageTable.internalData.push(model);
      // _this.updateRows(model);
    }
  },
  computed: {
    fnncLabelText() {
      if (this.form.menuType === "2") {
        return "按钮方法：";
      } else {
        return "视图指令：";
      }
    }
  },
  async created() {
    this.source.menuType = await kindo.dictionary.get('menuType');
    this.source.state = await kindo.dictionary.get('state');

    // 读取数据字典
    const languageSelection = await kindo.dictionary.get('languageType');
    // console.log('languageSelection:', languageSelection);
    const currentLn = kindo.cache.get('language');
    // console.log('currentLn:', currentLn);
    // 初始化，默认为中文环境，后续根据当前系统语言环境，配置不可选选项
    const disabledLn = languageSelection.find(item => item.value.toLowerCase() === currentLn.toLowerCase());
    // console.log('disabledLn:', disabledLn);
    if (disabledLn) {
      disabledLn.disabled = true;
    }
    this.source.languageSelection = languageSelection;

    //读取国际化
    this.language.dictLang = await kindo.util.getLanguage('DictLang');
    this.language.commonLang = await kindo.util.getLanguage('CommonLang');

  },
  updated() {
    //编辑的时候，查到菜单的数据，插入已配置的言语选项
    if (this.form.menuId && !this.isDataLoaded) {
      this.$http.get(`${this.api.getLanguage}?key=${this.form.menuId}`)
        .then(res => {
          if (res) {
            this.isDataLoaded = true;
            res.records.forEach(item => {
              const currentLn = this.source.languageSelection.find(f => f.value === item.i18nLanguage);
              currentLn.disabled = true;
              this.$refs.languageTable.internalData.push({
                action: '',
                languageContent: item.i18nValue,
                languageType: item.i18nLanguage,
                languageText: currentLn.label
              });
            });
            this.saveSubData(this.$refs.languageTable.internalData);
          }
        });
    }
  }
};
</script>
