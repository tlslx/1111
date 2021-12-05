<template>
  <el-page ref="mapmanage">
    <template slot="header">
      <!--弹框新增（修改） -->
      <el-dialog :title="language.dictLang.info + '-' + dictFormId" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
        <el-form :model="dictForm" :rules="rules" ref="dictForm" label-position="left" label-width="100px" inline modal :disabled="isFormView">
          <el-form-item :label="language.dictLang.name" prop="itemText">
            <el-input size="mini" style="width:300px;" v-model="dictForm.itemText" :placeholder="language.commonLang.input + language.dictLang.name" @blur="dictFormBlur('itemText',$event)"></el-input>
          </el-form-item>
          <el-form-item :label="language.dictLang.code" prop="itemCode">
            <el-input size="mini" style="width:300px;" v-model="dictForm.itemCode" :placeholder="language.commonLang.input + language.dictLang.code" @blur="dictFormBlur('itemCode',$event)"></el-input>
          </el-form-item>
          <el-form-item :label="language.dictLang.orderNo" prop="orderNo">
            <el-input size="mini" style="width:200px;" v-model="dictForm.orderNo" :placeholder="language.commonLang.input + language.dictLang.orderNo" @blur="dictFormBlur('orderNo',$event)"></el-input>
          </el-form-item>
          <el-form-item :label="language.dictLang.state" prop="state">
            <el-select size="mini" style="width:200px;" class="user-input-content" v-model="dictForm.state" :placeholder="language.commonLang.select" clearable>
              <el-option v-for="item in source.state" :key="Number(item.value)" :label="item.label" :value="Number(item.value)">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.dictLang.type" prop="dictName">
            <el-input size="mini" style="width:200px;" v-model="dictForm.dictName" disabled></el-input>
          </el-form-item>
          <el-form-item :label="language.dictLang.parentDict" prop="dataDictItemParentId">
            <el-select v-model="dictForm.dataDictItemParentId" clearable filterable size="mini" style="width:200px;" class="user-input-content" :disabled="isDisabled">
              <el-option v-for="item in source.parentDictOptionsOfEdit" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!--i18n表-->
        <kindo-box>
          <div slot="control">
            <el-button v-if="right('add')" icon="el-icon-plus" type="primary" @click="addLanguage" :disabled="isFormView">{{language.commonLang.add1}}</el-button>
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
                  <el-button v-if="right('add')" type="text" :title="language.commonLang.save" icon="el-icon-check" @click="saveTheme(scope.row)"></el-button>
                  <el-button v-if="right('delete')" type="text" :title="language.commonLang.delete" icon="el-icon-close" @click="cancelTheme(scope.row)"></el-button>
                </div>
                <div v-else>
                  <el-button v-if="right('edit')" type="text" icon="el-icon-edit" :title="language.commonLang.edit1" @click="editTheme(scope.row)" :disabled="isFormView"></el-button>
                  <el-button v-if="right('delete')" type="text" icon="el-icon-delete" :title="language.commonLang.delete" @click="delTheme(scope.row)" :disabled="isFormView"></el-button>
                </div>
              </template>
            </el-table-column>
          </kindo-table>
        </kindo-box>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit('dictForm')" :disabled="isFormView">{{language.commonLang.confirm}}</el-button>
          <el-button @click="dialogVisible = false">{{language.commonLang.close}}</el-button>
        </span>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box :title="language.dictLang.dataManager" icon="fa-search">
        <el-form :model="forms" label-position="right" :label-width="currentLanguage==='zh'?'110px':'160px'" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="language.dictLang.name" prop="itemText">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.itemText" class="inputclass" :placeholder="language.commonLang.input + language.dictLang.name"></el-input>
          </el-form-item>
          <el-form-item :label="language.dictLang.code" prop="itemCode">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.itemCode" class="inputclass" :placeholder="language.commonLang.input + language.dictLang.code"></el-input>
          </el-form-item>
          <el-form-item :label="language.dictLang.parentDict" prop="exhibitionSeason">
            <el-select v-model="forms.dataDictItemParentId" filterable :placeholder="language.commonLang.select" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.parentDictOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{language.commonLang.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{language.commonLang.reset}}</el-button>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col>
            <el-button v-if="right('add')" icon="el-icon-plus" type="primary" @click="onAdd" class="sys-buttons sysuser-add-button">{{language.commonLang.add}}</el-button>
          </el-col>
        </el-row>
      </kindo-box>
    </template>

    <template slot="body">
      <!--数据区域-->
      <el-page-data class="sysdict-data">
        <!--左侧字典树-->
        <kindo-box>
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="sysdict-data-tree" :style="treeStyle">
                <el-tree-view ref="tree" class="el-datagrid-picker-tree" iconCls="glyphicon glyphicon-folder-close" highlightCurrent :url="api.getTree" :custom-params="treeforms" root-id="0" sort="orderNo" text-field="dictName" value-field="dataDictId" parent-field="dataDictParentId" :expand-on-click-node="false" @node-click="onTreeNodeClick">
                </el-tree-view>
              </div>
            </el-col>
            <el-col :span="20">
              <kindo-table ref="sysDictTable" :url="api.get" :queryParam="form" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="itemText" :label="language.dictLang.name" min-width="200"></el-table-column>
                <el-table-column prop="dictName" :label="language.dictLang.type" min-width="150"></el-table-column>
                <el-table-column prop="itemCode" :label="language.dictLang.code" min-width="150"></el-table-column>
                <el-table-column prop="parentItemText" :label="language.dictLang.parentDict" min-width="200"></el-table-column>
                <el-table-column :label="language.commonLang.operation" width="180" align="center" fixed='right'>
                  <template slot-scope="scope">
                    <el-button v-if='right("edit")' type="text" @click="onEdit(scope.row)" class="btnUnderLine">{{language.commonLang.edit}}</el-button>
                    <el-button v-if='right("view")' type="text" @click="onEdit(scope.row, true)" class="btnUnderLine">{{language.commonLang.view}}</el-button>
                    <el-button v-if='right("delete")' type="text" @click="onDel(scope.row)" class="btnUnderLine">{{language.commonLang.delete}}</el-button>
                  </template>
                </el-table-column>
              </kindo-table>
            </el-col>
          </el-row>
        </kindo-box>
      </el-page-data>
    </template>

  </el-page>

</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "mapmanage",
  mixins: [listPageBase],
  inject: ['reload'],
  data() {
    return {
      pageId: 'sysmgr/sysdictmgr',
      api: {
        get: kindo.config.api.upms + "/api/sysDataDictItem/getDicItemPage",
        getTree: kindo.config.api.upms + "/api/sysDataDict/getListAll",
        getParentDict: kindo.config.api.upms + "/api/sysDataDictItem/findParentDicItemList",
        insert: kindo.config.api.upms + "/api/sysDataDictItem/add",
        delete: kindo.config.api.upms + "/api/sysDataDictItem/deleteBatchIds",
        update: kindo.config.api.upms + "/api/sysDataDictItem/updateById",
        getLanguageType: kindo.config.api.upms + "/api/sysDataDictItem/findDicItemList",
        getI18nTable: kindo.config.api.upms + "/api/sysI18n/findI18nList"
      },
      forms: {
        itemText: "",
        itemCode: "",
        dataDictItemParentId: "",
        dataDictId: ""
      },
      language: {
        dictLang: {},
        commonLang: {}
      },
      mainHeight: 500,
      delDictSelection: [],
      dataSysDictId: "",
      dictForm: {
        itemText: '',
        itemCode: '',
        orderNo: ''
      },
      dialogVisible: false,
      isFormView: false,
      isTreeClick: false,
      dictFormId: "",
      dictName: "",
      dataDictId: "",
      dataDictParentId: "",
      rules: {},
      dictModel: {
        languageContent: ""
      },
      selectKeys: "",
      label: "",
      source: {
        parentDictOptions: [],
        languageSelection: [],
        parentDictOptionsOfEdit: [],
        state: []
      },
      treeforms: [
        { JoinType: "And", Name: "state", FindType: "EQ", Values: ["1"] }
      ],
      currentLanguage: 'zh'
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.forms
      };
    },
    isDisabled: function () {
      return this.source.parentDictOptionsOfEdit.length === 0;
    },
    treeStyle() {
      return {
        height: `${this.mainHeight}px`
      };
    }
  },
  async created() {
    this.dynamicHeight();
    this._forms = Object.assign({}, this.forms);
    // 读取数据字典
    this.source.languageSelection = await kindo.dictionary.get('languageType');
    this.source.state = await kindo.dictionary.get('state');

    //读取国际化
    this.language.dictLang = await kindo.util.getLanguage('DictLang');
    this.language.commonLang = await kindo.util.getLanguage('CommonLang');
    //获取当前系统语言环境
    this.currentLanguage = kindo.cache.get('language');
    this.rules = {
      itemText: [
        { required: true, message: this.language.dictLang.putName, trigger: "blur" },
        { min: 1, max: 32, message: this.language.commonLang.max32, trigger: "blur" }
      ],
      itemCode: [
        { required: true, message: this.language.dictLang.putCode, trigger: "blur" },
        { min: 1, max: 32, message: this.language.commonLang.max32, trigger: "blur" },
        { validator: kindo.validate.checkdictDataCode, trigger: "blur" }
      ],
      dictFormParentName: [
        { required: false, message: this.language.dictLang.putParentDict, trigger: "change" }
      ],
      state: [
        { required: true, message: this.language.commonLang.selectOneLeast, trigger: "blur" }
      ],
      orderNo: [
        { required: true, pattern: /^\d{1,4}$/, message: this.language.dictLang.putOrderNo, trigger: "blur" }
      ]
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  watch: {
    dialogVisible(val, oldval) {
      let dictForm = this.$refs['dictForm'];
      if (val && dictForm) {
        dictForm.clearValidate();
      }
    }
  },
  methods: {
    dictFormBlur(key, e) {
      if (!this.dictForm[key]) {
        this.$set(this.dictForm, key, '');
      }
      this.dictForm[key] = e.target.value.trim();
    },
    dynamicHeight() {
      // 获取 header 高度
      this.mainHeight = document.querySelector(
        ".el-layout-item.center"
      ).clientHeight;
      this.mainHeight = this.mainHeight - 270;
    },
    onQuery() {
      this.$refs.sysDictTable.loadData();
    },
    // 重置条件为空查询
    onResetQuery() {
      this.reload();
      // this.forms = Object.assign({}, this._forms);
      // this.isTreeClick = false;
      // this.dataSysDictId = '';
      // this.dataDictId = '';
      // this.dictName = '';
      // this.dataDictParentId = '';
      // this.source.parentDictOptions = [];
      // this.source.parentDictOptionsOfEdit = [];
      // // let treeDataMap = Object.assign({}, this.$refs.tree.treeDataMap);
      // // this.$refs.tree.treeDataMap = {};
      // this.$nextTick(function () {
      //   // this.$refs.tree.treeDataMap = this.$refs.tree.loadedNodeMap[0];
      //   this.$refs.sysDictTable.reloadData();
      // });
    },
    onAdd() {
      let _this = this;
      // 先选择左侧字典树，才可以新增
      if (!_this.isTreeClick) {
        _this.$message({
          type: "info",
          message: _this.language.commonLang.selectLeftTree
        });
        return;
      }
      _this.dialogVisible = true;
      _this.isFormView = false;
      //清空表单选项
      _this.dictFormId = _this.language.commonLang.add;
      _this.dictForm = {
        itemText: '',
        itemCode: '',
        orderNo: '',
        state: ''
      };
      _this.dictForm.dataDictId = _this.dataDictId;
      _this.dictForm.dictName = _this.dictName;
      //如果是新增，需要重新查询当前字典的上层字典集合(修复重置页面刷新的bug)
      _this.source.parentDictOptionsOfEdit = _this.source.parentDictOptions;
      _this.$nextTick(function () {
        _this.$refs.languageTable.internalData = [];
      });
    },
    onEdit(row, isView = false) {
      let _this = this;
      _this.dialogVisible = true;
      _this.isFormView = isView;
      _this.dictFormId = isView ? _this.language.commonLang.view : _this.language.commonLang.edit;
      _this.dictForm = {
        dataDictItemId: row.dataDictItemId,
        itemText: row.itemText,
        itemCode: row.itemCode,
        dataDictId: row.dataDictId,
        dataDictItemParentId: row.dataDictItemParentId,
        parentItemText: row.parentItemText,
        dictName: row.dictName,
        orderNo: row.orderNo,
        state: row.state
      };
      //给表赋值
      _this.queryLanguageTable(row);
      //如果是修改/查询，需要重新查询当前字典的上层字典集合(修复重置页面刷新的bug)
      _this.queryParentDict(_this.dictForm.dataDictId, "parentDictOptionsOfEdit");
    },
    onDel(row) {
      let _this = this;
      let delDictId = "";
      let dictIdData = [];
      if (row.dataDictItemId) {
        delDictId = row.dataDictItemId;
        dictIdData.push(delDictId);
      }

      let delPara = {
        json: JSON.stringify(dictIdData)
      };
      _this.$confirm(_this.language.commonLang.confirmDelete, _this.language.commonLang.tips, {
        confirmButtonText: _this.language.commonLang.confirm,
        cancelButtonText: _this.language.commonLang.cancel,
        type: "warning"
      })
        .then(() => {
          _this.$http.post(_this.api.delete, delPara).then(res => {
            _this.$refs.sysDictTable.reloadData();
            _this.$message({
              type: "success",
              message: _this.language.commonLang.deleteSuccess
            });
          }, err => {
            _this.$message.error(err);
          });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: _this.language.commonLang.cancelDelete
          });
        });
    },
    onDelBatch() {
      let _this = this;
      let sysSelectedData = _this.delDictSelection;
      let dictIdData = [];

      if (sysSelectedData.length === 0) {
        _this.$message({
          message: _this.language.commonLang.selectData,
          type: "warning"
        });
        return;
      }
      for (let i = 0; i < sysSelectedData.length; i++) {
        let dataDictItemId = sysSelectedData[i].dataDictItemId;
        if (dataDictItemId) {
          dictIdData.push(dataDictItemId);
        }
      }
      let delPara = {
        json: JSON.stringify(dictIdData)
      };
      _this.$confirm(_this.language.commonLang.confirmDelete, _this.language.commonLang.tips, {
        confirmButtonText: _this.language.commonLang.confirm,
        cancelButtonText: _this.language.commonLang.cancel,
        type: "warning"
      })
        .then(() => {
          _this.$http.post(_this.api.delete, delPara).then(res => {
            _this.$refs.sysDictTable.reloadData();
            _this.$message({
              type: "success",
              message: _this.language.commonLang.deleteSuccess
            });
          }, err => {
            _this.$message.error(err);
          });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: _this.language.commonLang.cancelDelete
          });
        });
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //字典表单提交校验
          if (this.submitValidata()) {
            return false;
          }

          //表数据
          let formTableData = this.$refs.languageTable.internalData;
          let subFormTable = [];
          formTableData.forEach((item, index) => {
            subFormTable.push({
              i18nLanguage: item.languageType,
              i18nKey: this.dictForm.itemCode,
              i18nValue: item.languageContent
            });
          });
          let uri = this.dictFormId === this.language.commonLang.add ? this.api.insert : this.api.update;
          let sysFormData = {
            json: JSON.stringify({
              formData: JSON.stringify(this.dictForm),
              subTables: [JSON.stringify(subFormTable)],
              subTableNames: ["SysI18n"],
              subTableLength: 1
            })
          };
          this.$http.post(uri, sysFormData).then(res => {
            this.dialogVisible = false;
            this.$refs.sysDictTable.reloadData();
          }, err => {
            this.$message.error(err);
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.delDictSelection = val;
    },
    queryParentDict(dataDictId, title) {
      let customQueryParams = {
        dataDictId: dataDictId,
        state: "1"
      };
      let queryDictPara = {
        json: {
          CustomQueryParams: customQueryParams
        }
      };
      this.$http.get(this.api.getParentDict, queryDictPara).then(res => {
        let parentDict = res.records;
        let dataset = [];
        for (let i = 0; i < parentDict.length; i++) {
          dataset.push({
            label: parentDict[i].itemText,
            value: parentDict[i].dataDictItemId
          });
        }
        if (title === "parentDictOptions") {
          this.source.parentDictOptions = dataset;
        } else if (title === "parentDictOptionsOfEdit") {
          this.source.parentDictOptionsOfEdit = dataset;
        }
      });
    },
    queryLanguageTable(row) {
      let param = {
        key: row.dataDictItemId
      };
      this.$http.get(this.api.getI18nTable, param).then(res => {
        let languageTableData = res.records;
        let dataset = [];
        let languageText = "";
        for (let i = 0; i < languageTableData.length; i++) {
          for (let j = 0; j < this.source.languageSelection.length; j++) {
            if (languageTableData[i].i18nLanguage === this.source.languageSelection[j].value) {
              languageText = this.source.languageSelection[j].label;
              break;
            }
          }
          dataset.push({
            action: "",
            languageText: languageText,
            languageType: languageTableData[i].i18nLanguage,
            languageContent: languageTableData[i].i18nValue
          });
        }
        this.$refs.languageTable.internalData = dataset;
      });
    },
    onTreeNodeClick(data, node, component) {
      const dictIds = data["dataDictId"];
      if (dictIds === this.dataDictId) {
        return;
      }
      // 设置当前页为第一页
      this.$refs.sysDictTable.internalCurrentPage = 1;
      this.isTreeClick = true;
      this.dataSysDictId = data.dataDictId;
      this.dataDictId = dictIds;
      this.dictName = data.dictName;
      this.dataDictParentId = data.dataDictParentId;
      this.forms.dataDictId = dictIds;
      this.queryParentDict(this.dataSysDictId, "parentDictOptions");
      this.onQuery();
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
      _this.updateRows(model);
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
      }
    },
    editTheme(row) {
      // 检查选择是否禁用
      this.updateRows(row);
      const inChecKeys = this.$refs.languageTable.internalData.findIndex(temp => temp === row);
      if (inChecKeys !== -1) {
        row.action = "edit";
        this.$refs.languageTable.internalData.splice(inChecKeys, 1, row);
      }
    },
    delTheme(row) {
      const inChecKeys = this.$refs.languageTable.internalData.findIndex(temp => temp === row);
      if (inChecKeys !== -1) {
        this.$refs.languageTable.internalData.splice(inChecKeys, 1);
      }
    },
    cancelTheme(row) {
      // 记录上次状态
      this.delTheme(row);
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
    updateRows(row) {
      let ids = [];
      this.$refs.languageTable.internalData.forEach((item, index) => {
        if (row) {
          if (row.languageType !== item.languageType) {
            ids = ids.concat(item.languageType);
          }
          //系统当前语言默认不可选
          ids = ids.concat(this.currentLanguage.toUpperCase());
        }
      });
      this.source.languageSelection.forEach(item => {
        item.disabled = false;
      });
      ids.forEach(rowItem => {
        if (rowItem) {
          const inChecKeys = this.source.languageSelection.findIndex(temp => temp.value.toLowerCase() === rowItem.toLowerCase());
          if (inChecKeys !== -1) {
            this.source.languageSelection[inChecKeys].disabled = true;
          }
        }
      });
    },
    //字典表单提交校验
    submitValidata() {
      //同类型字典名称校验
      // if (this.dictTextCheckingForSameType(this.dictForm)) {
      //   this.$message.error(this.language.dictLang.nameDuplication);
      //   return true;
      // }
      //同类型字典编码校验
      // if (this.dictCodeCheckingForSameType(this.dictForm)) {
      //   this.$message.error(this.language.dictLang.codeDuplication);
      //   return true;
      // }

      //上层字典名称校验
      //      if (this.superstratumDictChecking(this.dataDictParentId, this.dictForm.dataDictItemParentId)) {
      //        this.$message.error(this.language.dictLang.parentDictIsNull);
      //        return true;
      //      }
      return false;
    },
    //同类型字典名称校验
    dictTextCheckingForSameType(dictForm) {
      let _this = this;
      let flag = false;
      _this.$refs.sysDictTable.internalData.forEach((tableItem, index) => {
        if (tableItem.itemText === dictForm.itemText && (_this.dictFormId === _this.language.commonLang.add || tableItem.dataDictItemId !== dictForm.dataDictItemId)) {
          flag = true;
          return;
        }
      });
      return flag;
    },
    //同类型字典编码校验
    dictCodeCheckingForSameType(dictForm) {
      let _this = this;
      let flag = false;
      _this.$refs.sysDictTable.internalData.forEach((tableItem, index) => {
        if (tableItem.itemCode === dictForm.itemCode && (_this.dictFormId === _this.language.commonLang.add || tableItem.dataDictItemId !== dictForm.dataDictItemId)) {
          flag = true;
          return;
        }
      });
      return flag;
    },
    //上层字典名称校验
    superstratumDictChecking(dataDictParentId, dataDictItemParentId) {
      let flag = false;
      if (dataDictParentId && dataDictParentId !== "0" && !dataDictItemParentId) {
        flag = true;
      }
      return flag;
    }
  }
};
</script>
<style scoped>
.sysdict-data-tree {
  width: 96%;
  border: 1px solid #ebeff5;
  padding: 2%;
  max-height: 590px;
  overflow: auto;
  margin-top: 6px;
}
.btnUnderLine {
  text-decoration: underline;
}
</style>
