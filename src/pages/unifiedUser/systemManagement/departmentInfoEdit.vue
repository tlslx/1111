<template>
<!-- 部门信息管理编辑页面 -->
  <el-form :ref="name" :model="form" data-url="/api/sysDepartment/getSingleById"
    update-url="/api/sysDepartment/updateById" add-url="/api/sysDepartment/add">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="上级部门:" prop="parentId" :span="24">
            <el-tree-picker v-model="form.parentId"
              return-type="object"
              root-id="0"
              url="/api/sysDepartment/getListAll"
              value-field="deptId"
              text-field="deptName"
              parent-field="parentId"
              @change="onParentChange"
              :disabled="isView">
            </el-tree-picker>
          </el-form-col>
          <el-form-col label="部门全名：" prop="fullName" :span="24" :max="100">
            <el-input v-model="form.fullName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="部门编码：" prop="deptCode" :span="12" :max="24" :validator="checkOut" number>
            <el-input v-model="form.deptCode" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="部门名称：" prop="deptName" :span="12" :max="24" required>
            <el-input v-model="form.deptName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="机构类型：" prop="deptType" :span="12">
            <!-- <el-input v-model="form.deptType" :disabled="isView"></el-input> -->
            <el-dropdown-list v-model="form.deptType" :disabled="isView"
              data-dictionary="deptType"></el-dropdown-list>
          </el-form-col>
          <el-form-col label="部门层级：" prop="deptLevel" :span="12" >
            <!-- <el-input v-model="form.deptLevel" :disabled="isView"></el-input> -->
            <el-dropdown-list v-model="form.deptLevel" :disabled="isView"
              data-dictionary="deptLevel"></el-dropdown-list>
          </el-form-col>
          <el-form-col label="状态：" prop="state" :span="12">
            <el-dropdown-list v-model="form.state" :disabled="isView"
              data-dictionary="state"></el-dropdown-list>
          </el-form-col>
          <el-form-col label="排序号：" prop="orderNo" :span="12">
            <el-input-number v-model="form.orderNo" :disabled="isView" controls-position="right" :min="0" :max="9999"></el-input-number>
          </el-form-col>
          <el-form-col label="备注：" prop="remark" :span="24" :max="128">
            <el-input type="textarea" v-model="form.remark" :disabled="isView"></el-input>
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
        bugetDeptId: "",
        cardDeptId: "",
        createDate: "",
        creatorId: "",
        creatorName: "",
        deptCode: "",
        deptId: "",
        deptLevel: "",
        deptName: "",
        deptType: "",
        exhDeptId: "",
        fullName: "",
        isOa: "",
        levelCode: "",
        modifierId: "",
        modifierName: "",
        modifyDate: "",
        orderNo: "",
        parentCode: "",
        parentId: "",
        parentName: "",
        remark: "",
        state: ""
      }
    };
  },
  methods: {
    pageLoad() {},
    onParentChange(value, text, obj) {
      this.form.parentId = value;
      this.form.parentName = text;
      this.form.parentCode = obj.code;
    },
    checkOut(rule, value, callback) {
      let regRule = /[@#\$%\^&\*]/;
      if (regRule.test(value)) {
        return callback(new Error("不能包含非法字符"));
      } else {
        return callback();
      }
    }
  }
};
</script>
