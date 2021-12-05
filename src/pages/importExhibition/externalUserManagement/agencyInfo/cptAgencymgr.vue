<template>
  <el-page ref="cptAgencymgr">
    <template slot="header">
      <!--弹窗 -->
      <registerInfo-dialog ref="registerInfoDialog" />
      <el-dialog :visible.sync="imgVisible">
        <img width="100%" :src="dialogImageUrl">
      </el-dialog>
      <!--按钮栏 -->
      <kindo-box title="合作机构用户管理" icon="fa-search">
        <el-form inline ref="forms" :model="forms" :rules="cptAgencyRules" label-position="right">
          <el-form-item label="合作机构名称" label-width="110px" prop="cooperationAgencyName">
            <el-input v-model="forms.cooperationAgencyName" placeholder="请输入" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item label="合作机构编码" label-width="110px" prop="cooperationAgencyCode">
            <el-input v-model="forms.cooperationAgencyCode" placeholder="请输入" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item label="类型" label-width="60px">
            <el-select v-model="forms.agencyTypeId" clearable placeholder="请选择" class="inputclass">
              <el-option v-for="item in source.typeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类别" label-width="60px">
            <el-select v-model="forms.agencyCategoryId" clearable placeholder="请选择" class="inputclass">
              <el-option v-for="item in source.categoryOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="1px">
            <el-button type="primary" icon="el-icon-search" @click="onQuery">查询</el-button>
            <el-button type="info" @click="onResetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <kindo-table ref="cptAgencymgrTable" :url="api.get" :queryParam="form">
          <el-table-column min-width="150px" label="合作机构">
            <template slot-scope="scope">
              <el-button v-right.edit type="text" @click="onEdit(scope.row, true)">{{scope.row.cooperationAgencyName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="cooperationAgencyCode" label="合作机构编码" min-width="150px"></el-table-column>
          <el-table-column prop="agencyTypeId" label="类型" min-width="150px" :formatter="typeView"></el-table-column>
          <el-table-column prop="agencyCategoryId" label="类别" min-width="150px" :formatter="categoryView"></el-table-column>
          <el-table-column prop="status" label="办证状态" min-width="150px" :formatter="badgeState"></el-table-column>
          <el-table-column prop="modifierName" label="管理员" min-width="100px"></el-table-column>
          <el-table-column prop="modifyDate" label="操作时间" min-width="160px"></el-table-column>
          <el-table-column prop="officialSealPicture" label="公章证明" min-width="100px">
            <template slot-scope="scope">
              <el-button v-right.view type="text" @click="checkPic(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button v-right.edit type="text" @click="onEdit(scope.row)">修改</el-button>
              <el-button v-right.edit type="text" @click="switchStatus(scope.row)" v-if="scope.row.status === 0">启用</el-button>
              <el-button v-right.edit type="text" @click="switchStatus(scope.row)" v-else-if="scope.row.status === 1">禁用</el-button>
            </template>
          </el-table-column>
          <div slot="control">
            <el-button icon="el-icon-plus" type="primary" @click="createCptAgency">新增合作机构</el-button>
          </div>
        </kindo-table>
      </kindo-box>
    </template>
  </el-page>
</template>

<script>
import registerInfoDialog from "./registration/agencyRegisterInfo";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'cptAgencymgr',
  components: {
    registerInfoDialog
  },
  mixins: [listPageBase],
  data() {
    var validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error('不能包含特殊字符或空格'));
      } else {
        return callback();
      }
    };
    // 机构编码校验
    var validateAgencyCode = (rule, value, callback) => {
      if (kindo.validate.agencyCode(value) || value === "") {
        return callback();
      } else {
        return callback(new Error('只能是数字或字母'));
      }
    };
    return {
      // pageId: "cptAgencymgr",
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiCooperationAgency/getListPage",
        forbidden: kindo.config.api.importExbUrl + "/api/infoIfiCooperationAgency/switchById"
      },
      forms: {
        cooperationAgencyName: "",
        orgId: "",
        agencyTypeId: "",
        agencyCategoryId: ""
      },
      source: {
        language: {},
        typeOptions: [],
        categoryOptions: []
      },
      imgVisible: false,
      dialogImageUrl: "",
      cptAgencyRules: {
        cooperationAgencyName: [
          { max: 100, message: "长度不能超过 100 个字符", trigger: "blur" },
          { validator: validateSpecialChars, trigger: 'blur' }
        ],
        orgcooperationAgencyCodeId: [
          { max: 32, message: "不能超过 32 个字符", trigger: "blur" },
          { validator: validateAgencyCode, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.forms
      };
    }
  },
  async created() {
    this._forms = Object.assign({}, this.forms);
    // 读取数据字典
    //类型
    this.source.typeOptions = await kindo.dictionary.get('agencyType');
    //类别
    this.source.categoryOptions = await kindo.dictionary.get('agencyCategory');
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
    this.$root.$on("refreshCptTable", isRefresh => {
      if (isRefresh) {
        this.onQuery();
      }
    });
  },
  methods: {
    onQuery() {
      this.$refs.cptAgencymgrTable.loadData();
    },
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.cptAgencymgrTable.reloadData();
      });
    },
    createCptAgency() {
      this.$refs.registerInfoDialog.dialogVisible = true;
      this.$root.$emit("handleRegisterForm", { isFormView: false, isEdit: false });
      this.$refs.registerInfoDialog.registerForm = {
        agencyTypeId: "",
        cooperationAgencyCode: "",
        cooperationAgencyName: "",
        agencyCategoryId: "",
        officialSealPicture: "",
        undertakingLetter: "",
        intentionEnterprise: "",
        contactName: "",
        contactIdNumber: "",
        contactPhonenumber: "",
        contactMail: "",
        contactIdScanned: "",
        contactBusinessCard: ""
      };
    },
    handleCurrentChange(val) {
      this.onQuery(val);
    },
    onEdit(row, view) {
      this.$refs.registerInfoDialog.dialogVisible = true;
      this.$root.$emit("handleRegisterForm", { isFormView: view, isEdit: true });
      let agencyTypeLabel = this.typeView(row);
      let agencyCategoryLabel = this.categoryView(row);
      this.$refs.registerInfoDialog.registerForm = {
        agencyTypeId: agencyTypeLabel,
        orgId: row.orgId,
        cooperationAgencyCode: row.cooperationAgencyCode,
        cooperationAgencyName: row.cooperationAgencyName,
        agencyCategoryId: agencyCategoryLabel,
        officialSealPicture: row.officialSealPicture,
        undertakingLetter: row.undertakingLetter,
        intentionEnterprise: row.intentionEnterprise,
        contactName: row.contactName,
        contactIdNumber: row.contactIdNumber,
        contactPhonenumber: row.contactPhonenumber,
        contactMail: row.contactMail,
        contactIdScanned: row.contactIdScanned,
        contactBusinessCard: row.contactBusinessCard,
        status: row.status
      };
    },
    //类型
    typeView(row) {
      let typeLabel = row.agencyTypeId;
      for (let i = 0; i < this.source.typeOptions.length; i++) {
        if (this.source.typeOptions[i].value === row.agencyTypeId) {
          typeLabel = this.source.typeOptions[i].label;
          break;
        }
      }
      return typeLabel;
    },
    //类别
    categoryView(row) {
      let categoryLabel = row.agencyCategoryId;
      for (let i = 0; i < this.source.categoryOptions.length; i++) {
        if (this.source.categoryOptions[i].value === row.agencyCategoryId) {
          categoryLabel = this.source.categoryOptions[i].label;
          break;
        }
      }
      return categoryLabel;
    },
    //办证状态
    badgeState(row) {
      if (row.hasBadge === 2) {
        return "已办证";
      } else {
        return "未办证";
      }
    },
    checkPic(row) {
      this.imgVisible = true;
      this.dialogImageUrl = row.officialSealPicture;
    },
    //禁用/启用
    switchStatus(row) {
      //如果是禁用状态status值为0，操作按钮显示启用，那么下发value值为1，将status值改为1（启用）
      let params = {
        orgId: row.orgId,
        status: row.status === 1 ? 0 : 1,
        cooperationAgencyCode: row.cooperationAgencyCode,
        cooperationAgencyName: row.cooperationAgencyName
      };
      this.$http.postJson(this.api.forbidden, params).then(res => {
        this.onQuery(1);
      }, err => {
        this.$message.error(err);
      });
    }
  }
};
</script>
<style>
</style>
