<template>
<!-- 菜单信息管理编辑页面 -->
  <el-form :ref="name" :model="form"
    data-url="/api/sysMenu/getSingleById"
    update-url="/api/sysMenu/updateById"
    add-url="/api/sysMenu/add"
    @submit-success="onSubmitSuccess">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="菜单ID：" prop="menuId">
            <el-input v-model="form.menuId" :disabled="true"></el-input>
          </el-form-col>
          <el-form-col label="子系统路径：" prop="imgUrl" :span="12" >
            <el-input v-model="form.imgUrl" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <!-- <el-form-col label="菜单名称：" prop="menuName" :span="12" required :max="200" :validator="checkSpecial"> -->
          <el-form-col label="菜单名称：" prop="menuName" :span="12" required :max="200">
            <el-input v-model="form.menuName" :disabled="isView"></el-input>
          </el-form-col>
          <!-- <el-form-col label="菜单编码：" prop="menuCode" :span="12" :max="32" :validator="checkNumEl" required> -->
          <el-form-col label="菜单编码：" prop="menuCode" :span="12" :max="32" required>
            <el-input v-model="form.menuCode" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="菜单类型：" prop="menuType" :span="12" :max="20" data-dictionary="menuType">
            <el-dropdown-list v-model="form.menuType" :disabled="isView"
              data-dictionary="menuType"></el-dropdown-list>
          </el-form-col>
          <el-form-col label="上级菜单：" prop="parentId" :span="12" :max="32">
            <el-tree-picker v-model="form.parentId"
              return-type="object"
              root-id="0"
              url="/api/sysMenu/getListAll"
              value-field="menuId"
              text-field="menuName"
              parent-field="parentId"
              :disabled="isView">
            </el-tree-picker>
          </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="所属系统：" prop="systemId" :span="24" :max="32">
            <el-dropdown-list v-model="form.systemId"
              url="/api/sysSystemInfo/getListAll"
              text-field="systemName" value-field="systemId"
              :params="{OrderModelField: [{OrderByField: 'orderNo',asc: true}]}"
              :allow-create="false"
              :filterable="true"
              :clearable="true"
              :disabled="isView">
            </el-dropdown-list>
            <!-- <el-dropdown-list v-model="form.systemId" :disabled="isView"></el-dropdown-list> -->
          </el-form-col>
        </el-row>
        <el-row v-if="form.menuType=='1'">
          <el-form-col label="菜单链接：" prop="menuUrl" :span="24" :max="500">
            <el-input v-model="form.menuUrl" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row v-if="form.menuType=='2' || form.menuType=='3'">
          <el-form-col :label="fnncLabelText" prop="operFunc" :span="24" >
            <el-input v-model="form.operFunc" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <!-- <el-form-col label="是否子节点：" prop="isLeaf" :span="12" >
            <el-dropdown-list v-model="form.isLeaf" :disabled="isView"
              data-dictionary="yesOrNoCode"></el-dropdown-list>
          </el-form-col> -->
          <el-form-col label="状态：" prop="state" :span="12">
            <el-dropdown-list v-model="form.state" :disabled="isView" data-dictionary="state"></el-dropdown-list>
          </el-form-col>
          <!--
          <el-form-col label="排序：" prop="orderNo" :span="12" number :max="10">
            <el-input v-model="form.orderNo" :disabled="isView"></el-input>
          </el-form-col>-->
        <el-form-col label="排序号：" prop="orderNo" :span="12">
            <el-input-number v-model="form.orderNo" :disabled="isView" controls-position="right" :min="0" :max="9999"></el-input-number>
        </el-form-col>
        </el-row>
        <el-row>
          <el-form-col label="备注：" prop="remark" :span="24" >
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
        state: "0",
        systemId: ""
      }
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
    checkSpecial(rule, value, callback) {
      let regRule = /[`~!@#$%^&*_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&* ——\-+={}|《》？：“”【】、；‘’，。、]/im;
      let space = /\s+/g;
      if (regRule.test(value) || space.test(value)) {
        return callback(new Error("不能输入特殊字符"));
      } else {
        return callback();
      }
    },
    checkNumEl(rule, value, callback) {
      let regRule = /^[0-9a-zA-Z]+$/;
      if (regRule.test(value)) {
        return callback();
      } else {
        return callback(new Error("只能输入字母和数字"));
      }
    },
    onSubmitSuccess(data) {
      this.$message.success("保存成功！");
      if (this.$utility.isFunction(this.afterSubmit)) {
        this.afterSubmit(data);
      }
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
  }
};
</script>
<style lang="less" scoped>
/deep/.el-form-item__label {
padding: 0;
}
</style>
