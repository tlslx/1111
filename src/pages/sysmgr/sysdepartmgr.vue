<!--组织机构列表-->
<template>
  <el-page ref="sysdepartmgr">
    <template slot="header">

      <!--编辑-->
      <el-dialog :title="source.language.dialogName" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
        <el-form :model="dialogModel" :rules="rules" ref="dialogComponent" label-position="right" :label-width="currentLanguage==='zh'?'120px':'180px'" inline modal :disabled="isRead">
          <!--上级机构-->
          <el-form-item :label="source.language.parentName" prop="parentName">
            <el-input size="mini" style="width:300px;" v-model="dialogModel.parentName" :disabled="true"></el-input>
          </el-form-item>
          <!--机构类型-->
          <el-form-item :label="source.language.deptType" prop="deptType">
            <el-select size="mini" style="width:300px;" v-model="dialogModel.deptType" class="filter-item" :placeholder="source.language.selectPlaceholder">
              <el-option v-for="item in source.deptType" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <!-- 机构类型为交易团时显示所属地区 -->
          <el-form-item :label="source.language.tradingGroupRegion" prop="tradingGroupRegion" v-if="isTradeGroupSelected">
            <el-select size="mini" style="width:300px;" v-model="dialogModel.tradingGroupRegion" class="filter-item" :placeholder="source.language.selectPlaceholder">
              <el-option v-for="item in source.tradingGroupRegion" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <!--机构名称-->
          <el-form-item :label="isTradeGroupSelected ? source.language.tradeGroupName : source.language.deptName" prop="deptName">
            <el-input size="mini" style="width:300px;" v-model="dialogModel.deptName" @blur="handleTrim('dialogModel','deptName',$event)"></el-input>
          </el-form-item>
          <!--机构全称-->
          <el-form-item :label="isTradeGroupSelected ? source.language.tradeGroupFullName : source.language.fullName" prop="fullName">
            <el-input size="mini" style="width:300px;" v-model="dialogModel.fullName"></el-input>
          </el-form-item>
          <!--机构编码-->
          <el-form-item :label="isTradeGroupSelected ? source.language.tradeGroupCode : source.language.deptCode" prop="deptCode">
            <el-input size="mini" style="width:300px;" v-model="dialogModel.deptCode" @blur="handleTrim('dialogModel','deptCode',$event)"></el-input>
          </el-form-item>
          <!--机构状态-->
          <el-form-item :label="source.language.state" prop="state">
            <el-select size="mini" style="width:300px;" v-model="dialogModel.state" class="filter-item" :placeholder="source.language.selectPlaceholder">
              <el-option v-for="item in source.state" :key="Number(item.value)" :label="item.label" :value="Number(item.value)" />
            </el-select>
          </el-form-item>
          <!--机构地址-->
          <el-form-item :label="source.language.deptAddr" prop="deptAddr">
            <el-input size="mini" style="width:300px;" v-model="dialogModel.deptAddr"></el-input>
          </el-form-item>
          <!--联系方式-->
          <el-form-item :label="source.language.contactsInfo" prop="contactsInfo">
            <el-input size="mini" style="width:300px;" v-model="dialogModel.contactsInfo"></el-input>
          </el-form-item>
          <!--联系人-->
          <el-form-item :label="source.language.contacts" prop="contacts">
            <el-input size="mini" style="width:300px;" v-model="dialogModel.contacts"></el-input>
          </el-form-item>
          <!--邮箱-->
          <el-form-item :label="source.language.email" prop="email">
            <el-input size="mini" style="width:300px;" v-model="dialogModel.email"></el-input>
          </el-form-item>
          <!--邮政编码-->
          <el-form-item :label="source.language.postcode" prop="postcode">
            <el-input size="mini" style="width:300px;" v-model="dialogModel.postcode"></el-input>
          </el-form-item>
          <!--传真-->
          <el-form-item :label="source.language.fax" prop="fax">
            <el-input size="mini" style="width:300px;" v-model="dialogModel.fax"></el-input>
          </el-form-item>
          <!--备注-->
          <el-form-item :label="source.language.remark" prop="remark">
            <el-input type="textarea" size="mini" style="width:300px; margin-top: 10px;" v-model="dialogModel.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveData('dialogComponent')" v-if="!isRead" :disabled="isRead">{{source.language.submit}}</el-button>
          <el-button @click="handleCancel">{{source.language.cancel}}</el-button>
        </span>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box :title="source.language.moduleName" icon="fa-search">
        <el-form :model="listParams" label-position="right" size="small" :label-width="currentLanguage==='zh'?'110px':'140px'" inline @submit.native.prevent @keyup.enter.native="searchList">
          <el-form-item :label="source.language.deptName" prop="deptName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="listParams.deptName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.deptCode" prop="itemCode">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="listParams.deptCode" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.deptType" prop="deptType">
            <el-select v-model="listParams.deptType" class="filter-item" :placeholder="source.language.selectPlaceholder">
              <el-option v-for="item in source.deptType" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.state" prop="state">
            <el-select v-model="listParams.state" class="filter-item" :placeholder="source.language.selectPlaceholder">
              <el-option v-for="item in source.state" :key="Number(item.value)" :label="item.label" :value="Number(item.value)" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="searchList">{{source.language.query}}</el-button>
            <el-button type="info" @click="handleRest">{{source.language.reset}}</el-button>
            <el-button v-if="right('add')" type="primary" @click="handleAdd">{{source.language.add}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>

    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <el-row :gutter="20">
            <!--左侧机构树-->
            <el-col :span="4">
              <div class="sysdict-data-tree" :style="treeStyle">
                <el-tree-view ref="treeElement" class="el-datagrid-picker-tree" iconCls="glyphicon glyphicon-folder-close" highlightCurrent :url="api.getTree" :custom-params="treeConditions" :params="treeParams" :root-id="rootId" sort="orderNo" text-field="deptName" value-field="deptId" parent-field="parentId" :expand-on-click-node="false" @node-click="handleTreeClick" @handle-params="handleParams">
                </el-tree-view>
              </div>
            </el-col>
            <!--表格-->
            <el-col :span="20">
              <kindo-table ref="tableComponent" :url="api.get" :queryParam="tableParams" @selection-change="handleSelections">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <!--机构名称-->
                <el-table-column :label="source.language.deptName" min-width="150" prop="deptName" align="center" show-overflow-tooltip>
                  <!-- <template slot-scope="scope">
                    <el-button @click="handleUpdate(scope.row)" type="text">{{scope.row.deptName}}</el-button>
                  </template> -->
                </el-table-column>
                <!--机构编码-->
                <el-table-column prop="deptCode" :label="source.language.deptCode" min-width="200" show-overflow-tooltip align="center"></el-table-column>
                <!--上级机构-->
                <el-table-column prop="parentName" :label="source.language.parentName" min-width="200" show-overflow-tooltip align="center"></el-table-column>
                <!--机构类型-->
                <el-table-column prop="deptType" :label="source.language.deptType" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.deptType,row.deptType)}" min-width="100" show-overflow-tooltip align="center">
                </el-table-column>
                <!--状态-->
                <el-table-column prop="state" :label="source.language.state" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.state,row.state)}" min-width="100" show-overflow-tooltip align="center">
                </el-table-column>
                <!--创建时间-->
                <el-table-column prop="createDate" :label="source.language.createDate" min-width="200" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip align="center"></el-table-column>
                <!--操作-->
                <el-table-column :label="source.language.operation" min-width="250" align="center" fixed='right'>
                  <template slot-scope="scope">
                    <el-button v-if="right('edit')" type="text" @click="handleUpdate(scope.row)" class="btnUnderline">{{source.commonLanguage.edit}}</el-button>
                    <el-button v-if="right('view')" type="text" @click="handleRead(scope.row)" class="btnUnderline">{{source.commonLanguage.view}}</el-button>
                    <el-button v-if="right('delete')" type="text" @click="handleDelete(scope.row)" class="btnUnderline">{{source.commonLanguage.delete}}</el-button>
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
import { ViewStatus, ViewUtils } from '@/utils/helper/view'; // 视图工具
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "sysdepartmgr",
  mixins: [listPageBase],
  inject: ["reload"],
  data() {
    return {
      pageId: "sysmgr/sysdepartmgr",
      api: {
        get: kindo.config.api.upms + "/api/sysDepartment/search",
        getTree: kindo.config.api.upms + "/api/sysDepartment/getListAll",
        insert: kindo.config.api.upms + "/api/sysDepartment/add",
        delete: kindo.config.api.upms + "/api/sysDepartment/deleteBatchIds",
        update: kindo.config.api.upms + "/api/sysDepartment/updateById"
      },
      mainHeight: 500,
      listParams: {}, // 列表筛选参数
      listSelections: [], // 列表选中的数据（多选）
      treeConditions: [ // 树查询条件
        { JoinType: "And", Name: "state", FindType: "EQ", Values: ["1"] }
      ],
      treeParams: { // 树查询参数
        test: 1
      },
      treeSelection: null, // 树组件选中数据
      rules: { // 校验规则
      },
      dialogStatus: ViewStatus.Add, // 模态框状态（新增/更新/查看）
      dialogModel: {
        parentName: '',
        deptName: '',
        fullName: '',
        deptCode: '',
        deptType: '',
        tradingGroupRegion: '',
        state: '',
        deptAddr: '',
        contactsInfo: '',
        contacts: '',
        email: '',
        postcode: '',
        fax: '',
        remark: ''
      }, // 模态框数据
      dialogModelOrginal: {}, //表单加载后的初始数据
      dialogVisible: false, // 是否展示模态框
      source: {
        languageSelection: [],
        ML_TYPE: [],
        language: [], // kindo国际化数据
        commonLanguage: []
      },
      rootId: "-1",
      userType: '', //1为内部用户、2为外部用户
      currentLanguage: 'zh'
    };
  },
  watch: {
    watchDeptType(newValue, oldValue) {
      if (newValue !== '7') {
        this.dialogModel.tradingGroupRegion = '';
      }
    }
  },
  computed: {
    watchDeptType() {
      return this.dialogModel.deptType;
    },
    dialogComponent() { // 模态框组件引用
      return this.$refs['dialogComponent'];
    },
    tableComponent() { // 列表组件引用
      return this.$refs['tableComponent'];
    },
    treeComponent() { // 树组件引用
      return this.$refs['treeComponent'];
    },
    tableParams: function () {
      return {
        queryParams: this.listParams
      };
    },
    treeStyle() {
      return {
        height: `${this.mainHeight}px`
      };
    },
    isAdd() {
      return ViewUtils.isAdd(this.dialogStatus);
    },
    isEdit() {
      return ViewUtils.isEdit(this.dialogStatus);
    },
    isRead() {
      return ViewUtils.isRead(this.dialogStatus);
    },
    isTradeGroupSelected() {
      return this.dialogModel.deptType === '7';
    }
  },
  async created() {
    this.dynamicHeight();
    // 获取当前登录用户的机构
    let userSource = this.$store.getters.userInfo.source;
    let levelCode = this.$store.getters.userInfo.org.levelCode;
    let deptId = this.$store.getters.userInfo.org.deptId;
    // rootId为-1时，不按parentId查询
    if (userSource === "2") {
      this.treeConditions.push({ JoinType: "And", Name: "DEPT_ID", FindType: "EQ", Values: [deptId] });
      // this.rootId = deptId;
      this.listParams.levelCode = levelCode;
    } else {
      this.rootId = "0";
      //内部用户可新增根目录，后台查询逻辑修改，不需要 levelCode 参数
      // this.listParams.levelCode = "2!";
      // this.treeConditions.push({ JoinType: "And", Name: "LEVEL_CODE", FindType: "LIKE", Values: ["2"] });
    }
    this.userType = userSource;
    this._forms = Object.assign({}, this.listParams);
    // 读取国际化
    this.source.language = kindo.util.getLanguage('SysDepartmentLang');
    this.source.commonLanguage = kindo.util.getLanguage('CommonLang');
    // 读取数据字典
    this.source.languageSelection = await kindo.dictionary.get('languageType');
    this.source.deptType = await kindo.dictionary.get('deptType');
    this.source.state = await kindo.dictionary.get('state');
    this.source.tradingGroupRegion = await kindo.dictionary.get('tradingGroupRegion');
    //当前系统的语言版本
    this.currentLanguage = kindo.cache.get('language');
    this.rules = {
      deptName: [
        { required: true, message: this.source.commonLanguage.input + this.source.language.deptName, trigger: "blur" },
        { min: 1, max: 32, message: this.source.commonLanguage.max32, trigger: "blur" }
      ],
      fullName: [
        { min: 1, max: 32, message: this.source.commonLanguage.max32, trigger: "blur" }
      ],
      deptCode: [
        { required: true, message: this.source.commonLanguage.input + this.source.language.deptCode, trigger: "blur" },
        { min: 1, max: 32, message: this.source.commonLanguage.max32, trigger: "blur" },
        { validator: kindo.validate.checkPassword, trigger: "blur" }
      ],
      state: [
        { required: true, message: this.source.language.selectPlaceholder + this.source.language.state, trigger: "blur" }
      ],
      deptType: [
        { required: true, message: this.source.language.selectPlaceholder + this.source.language.deptType, trigger: "blur" }
      ],
      deptAddr: [
        { max: 200, message: this.source.commonLanguage.max200, trigger: "blur" }
      ],
      contactsInfo: [
        { max: 200, message: this.source.commonLanguage.max200, trigger: "blur" }
      ],
      contacts: [
        { max: 50, message: this.source.commonLanguage.max50, trigger: "blur" }
      ],
      email: [
        { max: 50, message: this.source.commonLanguage.max50, trigger: "blur" },
        { type: 'email', message: this.source.commonLanguage.plzEnterCorrectEmail, trigger: "blur" }
      ],
      postcode: [
        { max: 16, message: this.source.commonLanguage.max16, trigger: "blur" }
      ],
      fax: [
        { max: 16, message: this.source.commonLanguage.max16, trigger: "blur" }
      ],
      remark: [
        { max: 200, message: this.source.commonLanguage.max200, trigger: "blur" }
      ]
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.searchList();
    });
  },
  methods: {
    handleTrim(model, key, e) {
      this[model][key] = e.target.value.trim();
    },
    // translate(path) { // 翻译当前模块信息
    //   return this.$t('SysDepartmentLang.' + path);
    // },
    validateForm(formRef) { // 验证表单
      return new Promise((resolve, reject) => {
        formRef.validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject();
          }
        });
      });
    },
    loadSuccess() {
      // 等页面初始化完成，数据加载成功，记录当前form的原始数据
      this.dialogModelOrginal = JSON.stringify(this.dialogModel);
    },
    deleteConfirm() { // 删除提示框
      let _this = this;
      return _this.$confirm(_this.source.commonLanguage.confirmDelete, _this.source.commonLanguage.tips, {
        confirmButtonText: _this.source.commonLanguage.confirm,
        cancelButtonText: _this.source.commonLanguage.cancel,
        type: "warning"
      });
    },
    formChanged() {
      // 判断form数据是否改变
      if (JSON.stringify(this.dialogModel) !== this.dialogModelOrginal) {
        return true;
      } else {
        return false;
      }
    },
    dynamicHeight() {
      // 获取 header 高度
      this.mainHeight = document.querySelector(
        ".el-layout-item.center"
      ).clientHeight;
      // console.log(this.mainHeight);
      // this.mainHeight = this.mainHeight - 270;
      // console.log(this.mainHeight);
    },
    handleAdd() { // 新增操作
      //内部用户可新增根目录
      //当前版本不上线该功能，注释掉
      if (this.userType === '1') {
        this.resetDialogModel();
        if (this.treeSelection == null) {
          //根目录原始父节点 先写死
          this.dialogModel.parentId = '0';
          this.dialogModel.parentCode = '0';
          this.dialogModel.parentName = '根部门';
        } else {
          this.dialogModel.parentId = this.treeSelection.deptId;
          this.dialogModel.parentCode = this.treeSelection.deptCode;
          this.dialogModel.parentName = this.treeSelection.deptName;
        }
      } else {
        if (this.treeSelection == null) {
          kindo.util.alert(this.source.language.plzSelectParent, this.source.language.tips, "warning");
          return;
        }
        this.resetDialogModel();
        this.dialogModel.parentId = this.treeSelection.deptId;
        this.dialogModel.parentCode = this.treeSelection.deptCode;
        this.dialogModel.parentName = this.treeSelection.deptName;
      }
      this.dialogStatus = ViewStatus.Add;
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.dialogComponent.clearValidate();
      });
      this.loadSuccess();
    },
    handleDelete(row) { // 删除操作
      this.handleDeletes([row]);
    },
    handleDeletes(rows) { // 批量删除操作
      let _this = this;
      if (rows && rows.length > 0) {
        _this.deleteConfirm().then(() => {
          _this.batchDelete(rows);
        });
      } else {
        _this.$message({
          message: _this.source.commonLanguage.selectData,
          type: "warning"
        });
      }
    },
    beforeClose(done) {
      const _this = this;
      const isChanged = _this.formChanged();
      if (isChanged) {
        _this.$confirm(_this.source.commonLanguage.cencalConfirm, _this.source.commonLanguage.tips)
          .then(() => {
            done();
            _this.dialogComponent.clearValidate();
          })
          .catch(() => { });
      } else {
        done();
        _this.dialogComponent.clearValidate();
      }
    },
    handleCancel() {
      // let _this = this;
      //防止重置时产生多余的隐藏属性
      // if (Object.prototype.hasOwnProperty.call(this.dialogModel, 'tradingGroupRegion')) {
      //   delete this.dialogModel.tradingGroupRegion;
      // }
      // 判断form的数据是否发生改变
      // let isChanged = _this.formChanged();
      // if (isChanged) {
      //   _this.$confirm(_this.source.commonLanguage.cencalConfirm, _this.source.commonLanguage.tips)
      //     .then(() => {
      //       _this.dialogVisible = false;
      //       _this.dialogComponent.clearValidate();
      //     })
      //     .catch(() => { });
      // } else {
      //   _this.dialogVisible = false;
      //   _this.dialogComponent.clearValidate();
      // }
      this.dialogVisible = false;
      this.dialogComponent.clearValidate();
    },
    handleUpdate(row) { // 更新操作
      this.dialogStatus = ViewStatus.Update;
      this.dialogVisible = true;
      this.dialogModel = Object.assign({}, row);
      this.loadSuccess();
    },
    handleRead(row) { // 查看操作
      this.dialogStatus = ViewStatus.Read;
      this.dialogVisible = true;
      this.dialogModel = Object.assign({}, row);
      this.loadSuccess();
    },
    handleRest() { // 重置查询条件
      this.reload();
    },
    // 树组件展开
    handleParams(data) {
      this.treeConditions = this.treeConditions.filter(item => item.Name !== 'DEPT_ID');
      // this.treeConditions = [{ JoinType: "And", Name: "state", FindType: "EQ", Values: ["1"] }];
    },
    // 树组件选中
    handleTreeClick(data, node, component) {
      this.treeSelection = data;
      this.listParams.parentId = data.deptId;
      this.searchList();
    },
    handleSelections(rows) { // 列表选择操作
      this.listSelections = rows;
    },
    resetDialogModel() { // 重置数据
      this.dialogModel = {
        parentName: '',
        deptName: '',
        fullName: '',
        deptCode: '',
        deptType: '',
        tradingGroupRegion: '',
        state: '',
        deptAddr: '',
        contactsInfo: '',
        contacts: '',
        email: '',
        postcode: '',
        fax: '',
        remark: ''
      };
    },
    searchList() {
      this.tableComponent.loadData();
    },
    batchDelete(rows) { // 批量删除数据
      const ids = rows.map(row => row.deptId);
      const data = { json: JSON.stringify(ids) };
      this.$http.post(this.api.delete, data).then(() => {
        this.dialogVisible = false;
        this.reload();
      }, err => {
        this.$message.error(err);
      });
    },
    saveData(formName) { // 新增/更新数据
      this.$refs[formName].validate(valide => {
        if (valide) {
          const url = this.isAdd ? this.api.insert : this.api.update;
          this.validateForm(this.dialogComponent).then(() => {
            const data = {
              json: JSON.stringify({ formData: this.dialogModel })
            };
            this.$http.post(url, data).then(() => {
              this.dialogVisible = false;
              // this.tableComponent.reloadData();
              this.reload();
            }, err => {
              this.$message.error(err);
            });
          });
        }
      });
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
}
.maincenter {
  text-align: center;
}
.btnUnderline {
  text-decoration: underline;
}
</style>

