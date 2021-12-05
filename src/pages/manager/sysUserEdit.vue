<template>
  <el-form :ref="name" :model="form" data-url="/api/sysUser/getSingleById"
    update-url="/api/sysUser/updateById" add-url="/api/sysUser/add">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="用户名称：" prop="userName" :span="24" required>
            <el-input v-model="form.userName" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="工作部门：" prop="workDeptId" :span="24" required>
            <el-ou-picker v-model="form.workDeptId" @change="onDeptChange" :disabled="isView"></el-ou-picker>
          </el-form-col>
        </el-row>
        <el-row v-if="false">
          <el-form-col label="编制部门：" prop="compileDeptId" :span="24" >
            <el-ou-picker v-model="form.compileDeptId" :disabled="isView"></el-ou-picker>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="职务：" prop="job" :span="12" >
            <el-input v-model="form.job" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="员工状态：" prop="epmplayee" :span="12" >
            <el-input v-model="form.epmplayee" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="职位类型：" prop="positionType" :span="12" >
            <el-input v-model="form.positionType" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="职位：" prop="position" :span="12" >
            <el-input v-model="form.position" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="QQ：" prop="qq" :span="12" >
            <el-input v-model="form.qq" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="邮件：" prop="email" :span="12" >
            <el-input v-model="form.email" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="手机：" prop="mobile" :span="12" >
            <el-input v-model="form.mobile" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="微信：" prop="weixin" :span="12" >
            <el-input v-model="form.weixin" :disabled="isView"></el-input>
          </el-form-col>
          </el-row>
        <el-row>
          <el-form-col label="状态：" prop="state" :span="12" required>
            <el-dropdown-list v-model="form.state" :disabled="isView" 
              data-dictionary="state"></el-dropdown-list>
          </el-form-col>
          <el-form-col label="排序号：" prop="orderNo" :span="12" >
            <el-input v-model="form.orderNo" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="备注：" prop="remark" :span="24" >
            <el-input type="textarea" v-model="form.remark" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
      </el-tab-pane>
      
      <el-tab-pane label="高级设置" name="mgrInfo">
        <el-row>
          <el-form-col label="用户账号：" prop="account" :span="24" required>
            <el-input v-model="form.account" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="是否管理员：" prop="isSuperAdmin" :span="24" required>
            <el-dropdown-list v-model="form.isSuperAdmin" :disabled="isView" 
              data-dictionary="yesOrNoCode"></el-dropdown-list>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="用户类型：" prop="userType" :span="24" required>
            <el-dropdown-list v-model="form.userType" :disabled="isView" 
              data-dictionary="userType"></el-dropdown-list>
            <!-- <el-input v-model="form.userType" :disabled="isView"></el-input> -->
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="开始时间：" prop="startDate" :span="12" >
            <el-date-picker v-model="form.startDate" :disabled="isView" clearable></el-date-picker>
          </el-form-col>
          <el-form-col label="结束时间：" prop="endDate" :span="12" >
            <el-date-picker v-model="form.endDate" :disabled="isView" clearable></el-date-picker>
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
      submitType: "json",
      activeTab: "baseInfo",
      form: {
        addr: "",
        cityId: "",
        cityName: "",
        compileDeptCode: "",
        compileDeptId: "",
        compileDeptName: "",
        createDate: "",
        creatorId: "",
        creatorName: "",
        endDate: undefined,
        startDate: undefined,
        epmplayee: "",
        extAttr: "",
        idCardNo: "",
        isSuperAdmin: "0",
        job: "",
        modifierId: "",
        modifierName: "",
        modifyDate: "",
        oaId: "",
        orderNo: "0",
        position: "",
        positionType: "",
        privateKey: "",
        provinceId: "",
        provinceName: "",
        remark: "",
        state: "1",
        superior: "",
        superiorId: "",
        superiorName: "",
        userId: "",
        userName: "",
        userType: "1",
        villageId: "",
        villageName: "",
        workDeptCode: "",
        workDeptId: "",
        workDeptName: "",
        qq: "",
        weixin: "",
        email: "",
        mobile: ""
      }
    };
  },
  methods: {
    onDeptChange(value, text, objs) {
      // console.info(objs);
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
      this.activeTab = "baseInfo";
    }
  }
};
</script>
