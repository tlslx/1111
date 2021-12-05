<style lang="less" scoped>
  /deep/.el-form-item__label {
    padding: 0;
  }
</style>

<template>
  <!-- 内部用户信息编辑页面 -->
  <el-form :ref="name" :model="form" @submit-success="onSubmitSuccess" data-url="/api/sysUser/getSingleById" update-url="/api/sysUser/updateById" add-url="/api/sysUser/add">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="用户名称：" prop="userName" :span="24" required :max="100" :validator="checkSpecial">
            <el-input v-model="form.userName" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="用户账号：" prop="account" :span="24" required :max="50" :validator="checkSpecial">
            <el-input v-model="form.account" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="工作部门：" prop="workDeptId" :span="24" required :max="32">
            <el-tree-picker v-model="form.workDeptId"
              return-type="object"
              root-id="0"
              url="/api/sysDepartment/getListAll"
              value-field="deptId"
              text-field="deptName"
              parent-field="parentId"
              @change="onDeptChange"
              :default-expand-keys="defaultExpandKeys"
              :tree-query-params="treeQueryParams"
              :sort="sort"
              :disabled="isView">
            </el-tree-picker>
            <!-- <el-ou-picker v-model="form.workDeptId" @change="onDeptChange" :disabled="isView" :multiple="false"></el-ou-picker> -->
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="身份证号：" prop="idCardNo" :span="24" required :max="32" :validator="checkCard">
            <el-input v-model="form.idCardNo" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="性别：" prop="sex" :span="12" required :max="10">
            <el-radio v-model="form.sex" label="男" :disabled="isView">男</el-radio>
            <el-radio v-model="form.sex" label="女" :disabled="isView">女</el-radio>
          </el-form-col>
          <el-form-col label="国籍：" prop="nationality" :span="12" :max="50">
            <el-input v-model="form.nationality" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row v-if="false">
          <el-form-col label="编制部门：" prop="compileDeptId" :span="24" :max="32">
            <el-ou-picker v-model="form.compileDeptId" :disabled="isView"></el-ou-picker>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="职务：" prop="job" :span="12" :max="100">
            <el-input v-model="form.job" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="员工状态：" prop="epmplayee" :span="12" :max="20">
            <el-input v-model="form.epmplayee" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="职位类型：" prop="positionType" :span="12" :max="80">
            <el-input v-model="form.positionType" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="职位：" prop="position" :span="12" :max="100" >
            <el-input v-model="form.position" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="手机：" prop="mobile" :span="12" required :max="50" number :validator="checkMobile">
            <el-input v-model="form.mobile" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="邮件：" prop="email" :span="12" required :max="200" :validator="checkEmail">
            <el-input v-model="form.email" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="状态：" prop="state" :span="12" required >
            <el-dropdown-list v-model="form.state" :disabled="isView" data-dictionary="state"></el-dropdown-list>
          </el-form-col>
          <!-- <el-form-col label="排序号：" prop="orderNo" :span="12" number>
            <el-input v-model="form.orderNo" :disabled="isView"></el-input>
          </el-form-col> -->
          <el-form-col label="排序号：" prop="orderNo" :span="12">
            <el-input-number v-model="form.orderNo" :disabled="isView" controls-position="right" :min="0" :max="999999999" ></el-input-number>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="联系地址：" prop="addr" :span="24" :max="200" >
            <el-input v-model="form.addr" :disabled="isView"></el-input>
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
          <el-form-col label="QQ：" prop="qq" :span="12" :max="50" number>
            <el-input v-model="form.qq" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="微信：" prop="weixin" :span="12" :max="50" >
            <el-input v-model="form.weixin" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="是否管理员：" prop="isSuperAdmin" :span="24" required>
            <el-dropdown-list v-model="form.isSuperAdmin" :disabled="isView" data-dictionary="yesOrNoCode"></el-dropdown-list>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="用户类型：" prop="userType" :span="24" required :max="20">
            <el-dropdown-list v-model="form.userType" :disabled="isView" data-dictionary="userType"></el-dropdown-list>
            <!-- <el-input v-model="form.userType" :disabled="isView"></el-input> -->
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="开始时间：" prop="startDate" :span="12" resetField>
            <el-date-picker v-model="form.startDate" type="date" value-format="yyyy-MM-dd" :disabled="isView" :picker-options="pickerOptionsOne"></el-date-picker>
          </el-form-col>
          <el-form-col label="结束时间：" prop="endDate" :span="12">
            <el-date-picker v-model="form.endDate" type="date" value-format="yyyy-MM-dd" :disabled="isView" clearable :picker-options="pickerOptionsTwo"></el-date-picker>
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
      pickerOptionsTh: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      pickerOptionsOne: {
        disabledDate: (time) => {
          if (this.form.endDate != null && this.form.endDate !== undefined) {
            return time.getTime() > this.form.endDate;
          }
        }
      },
      pickerOptionsTwo: {
        disabledDate: (time) => {
          if (this.form.startDate != null && this.form.startDate !== undefined) {
            return time.getTime() < this.form.startDate;
          }
        }
      },
      treeQueryParams: [{ Name: "State", FindType: "EQ", Values: ["1"] }],
      sort: "orderNo",
      defaultExpandKeys: [
        "cd08bdeb2bd84091901da4f39637c94d",
        "8a706d0898954e4c910fb73769bd4ae9"
      ],
      form: {
        account: "",
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
        sex: "男",
        birthdate: "",
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
    checkCard(rule, value, callback) {
      let regRule = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (!regRule.test(value)) {
        return callback(new Error("请输入正确的身份证号格式"));
      } else {
        return callback();
      }
    },
    checkCn(rule, value, callback) {
      let regRule = /[\u4e00-\u9fa5]/g;
      if (regRule.test(value)) {
        return callback();
      } else {
        return callback(new Error("只能输入中文"));
      }
    },
    checkEmail(rule, value, callback) {
      let regRule = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!regRule.test(value)) {
        return callback(new Error("请输入正确邮箱格式"));
      } else {
        return callback();
      }
    },
    checkSpecial(rule, value, callback) {
      let regRule = /[`~!@#$%^&*_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&* ——\-+={}|《》？：“”【】、；‘’，。、]/im;
      let space = /\s+/g;
      if (regRule.test(value) || space.test(value)) {
        return callback(new Error("不能输入特殊字符"));
      } else {
        return callback();
      }
    },
    checkMobile(rule, value, callback) {
      let phoneValid = /^1[23456789]\d{9}$/;
      if (!phoneValid.test(value)) {
        return callback(new Error("请输入正确手机号"));
      } else {
        return callback();
      }

    },
    onDeptChange(value, text, objs) {
      //console.info(objs);
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
    },
    onSubmitSuccess(data) {
      this.$message.success("保存成功！");
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-form-item__label {
padding: 0;
}
</style>

