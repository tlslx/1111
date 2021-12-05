<template>
  <el-form :ref="name" :model="form" :data-url="api.dataUrl" :update-url="api.updateUrl" :add-url="api.addUrl" :disabled="isView">
    <el-tabs v-model="activeTab">
      <el-tab-pane :label="language.commonLang.baseInfo" name="baseInfo">
        <el-row>
          <el-form-col :label="language.userLang.userName" prop="userName" :span="12" name :max="18" required>
            <el-input v-model="form.userName"></el-input>
          </el-form-col>
          <el-form-col :label="language.userLang.account" prop="account" :span="12" account :max="18" required>
            <el-input v-model="form.account" :disabled="isView || isEdit"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col :label="language.userLang.workDept" prop="workDeptId" :span="12" required>
            <el-ou-picker v-model="form.workDeptId" @change="onDeptChange" :multiple="false" :mergeCheckedNodes="false" :showcheckbox="false" :expand-on-click-node="false" :tree-params="treeParams" :root-id="rootId"></el-ou-picker>
          </el-form-col>
          <el-form-col :label="language.userLang.assoRoles" prop="roleIds" :span="12" array required>
            <el-select v-model="form.roleIds" :placeholder="language.commonLang.select" multiple collapse-tags>
              <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col :label="language.userLang.mobile" prop="mobile" :span="12" globalMobile required>
            <el-input v-model="form.mobile"></el-input>
          </el-form-col>
          <el-form-col :label="language.userLang.email" prop="email" :span="12" email required>
            <el-input v-model="form.email"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col :label="language.userLang.resetPassword" prop="resetType" :span="12" required>
            <el-select v-model="form.resetType" :placeholder="language.commonLang.select" clearable>
              <el-option v-for="item in source.resetType" :key="Number(item.value)" :label="item.label" :value="Number(item.value)">
              </el-option>
            </el-select>
          </el-form-col>
          <el-form-col :label="language.userLang.state" prop="state" :span="12" required>
            <el-select v-model="form.state" :placeholder="language.commonLang.select" clearable>
              <el-option v-for="item in source.state" :key="Number(item.value)" :label="item.label" :value="Number(item.value)">
              </el-option>
            </el-select>
          </el-form-col>
        </el-row>
        <!-- <el-row>
          <el-form-col :label="language.commonLang.startDate" prop="startDate" :span="12">
            <el-date-picker v-model="form.startDate" :picker-options="startTimeOptions" @change="startTimeChange"></el-date-picker>
          </el-form-col>
          <el-form-col :label="language.commonLang.endDate" prop="endDate" :span="12">
            <el-date-picker v-model="form.endDate" :picker-options="endTimeOptions" @change="endTimeChange"></el-date-picker>
          </el-form-col>
        </el-row> -->
        <el-row>
          <el-form-col :label="language.commonLang.remark" prop="remark" :span="24" :max="50">
            <el-input v-model="form.remark"></el-input>
          </el-form-col>
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
        dataUrl: kindo.config.api.upms + "/api/sysUser/getSingleById",
        updateUrl: kindo.config.api.upms + "/api/sysUser/updateById",
        addUrl: kindo.config.api.upms + "/api/sysUser/add"
      },
      language: {
        commonLang: {},
        userLang: {}
      },
      startTimeOptions: {},
      endTimeOptions: {},
      defaultStartTimeOptions: {
        disabledDate(time) {
          return time.getTime() < new Date(new Date() - 24 * 60 * 60 * 1000).getTime();
        }
      },
      defaultEndTimeOptions: {
        disabledDate(time) {
          return time.getTime() < new Date(new Date()).getTime();
        }
      },
      submitType: "json",
      activeTab: "baseInfo",
      form: {
        roles: [],
        roleIds: [],
        account: "",
        createDate: "",
        creatorId: "",
        creatorName: "",
        endDate: undefined,
        startDate: undefined,
        epmplayee: "",
        extAttr: "",
        resetType: 0,
        isSuperAdmin: 0,
        modifierId: "",
        modifierName: "",
        modifyDate: "",
        oaId: "",
        orderNo: 0,
        remark: "",
        state: 1,
        userId: "",
        userName: "",
        workDeptCode: "",
        workDeptId: "",
        workDeptName: "",
        qq: "",
        email: "",
        mobile: "",
        oauthInfo: ""
      },
      source: {
        state: "",
        resetType: ""
      },
      roleOption: []
    };
  },
  methods: {
    startTimeChange: function (e) { //设置开始时间
      this.form.startDate = e;
      let startTime = this.form.startDate ? new Date(this.form.startDate).valueOf() : '';
      if (e) {
        this.endTimeOptions = {
          disabledDate: date => {
            let disabled = date.getTime() < new Date(new Date()).getTime();
            return date && (date.valueOf() < startTime) || disabled;
          }
        };
      } else {
        this.endTimeOptions = Object.assign({}, this.defaultEndTimeOptions);
      }

    },
    endTimeChange: function (e) { //设置结束时间
      this.form.endDate = e;
      let endTime = this.form.endDate ? new Date(this.form.endDate).valueOf() - 1 * 24 * 60 * 60 * 1000 : '';
      if (e) {
        this.startTimeOptions = {
          disabledDate(date) {
            let disabled = date.getTime() < new Date(new Date() - 24 * 60 * 60 * 1000).getTime();
            return date && (date.valueOf() > endTime) || disabled;
          }
        };
      } else {
        this.startTimeOptions = Object.assign({}, this.defaultStartTimeOptions);
      }

    },
    onDeptChange(value, text, objs) {
      if (typeof value === "string") {
        this.form.workDeptId = value;
        this.form.workDeptName = text;
        this.form.workDeptCode = objs.deptCode;
      } else {
        this.form.workDeptId = value[0];
        this.form.workDeptName = text[0];
        this.form.workDeptCode = objs[0].deptCode;
      }
    },
    pageLoad() {
      let _this = this;
      _this.activeTab = "baseInfo";
      let dataset = [];
      for (let i = 0; i < _this.form.roles.length; i++) {
        let data = _this.args.filter(function (item) {
          return item.value === _this.form.roles[i].roleId;
        });
        // let data = _this.args.filter(item => item.roleId === _this.form.roles[i].roleId);
        if (!data || data.length === 0) {
          dataset.push({
            label: _this.form.roles[i].roleName,
            value: _this.form.roles[i].roleId,
            disabled: true
          });
        }
      }
      _this.roleOption = _this.args.concat(dataset);
    }
  },
  computed: {
    roleOptions: function () {
      return this.roleOption;
    },
    treeParams: function () {
      let treeParams = [];
      let userSource = this.$store.getters.userInfo.source;
      let param = {};
      if (userSource === "2") {
        param = { JoinType: "And", Name: "DEPT_ID", FindType: "EQ", Values: [this.$store.getters.userInfo.org.deptId] };
        treeParams.push(param);
      }
      return treeParams;
    },
    rootId: function () {
      let userSource = this.$store.getters.userInfo.source;
      return userSource === '1' ? '0' : '-1';
    }
  },
  watch: {

  },
  mounted() {
    this.startTimeOptions = Object.assign({}, this.defaultStartTimeOptions);
    this.endTimeOptions = Object.assign({}, this.defaultEndTimeOptions);
  },
  async created() {
    //获取字典信息
    this.source.state = await kindo.dictionary.get('state');
    this.source.resetType = await kindo.dictionary.get('resetType');

    //获取国际化
    this.language.commonLang = kindo.util.getLanguage('CommonLang');
    this.language.userLang = kindo.util.getLanguage('UserLang');

  }
};
</script>
