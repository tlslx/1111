<template>
  <el-form :ref="name" :model="form" data-url="/api/basicData/operatorGroup/getSingleById" update-url="/api/basicData/operatorGroup/updateById" add-url="/api/basicData/operatorGroup/add"
    width="100%" >
        <el-row>
          <el-form-col label="组别名称：" prop="groupName" :span="24">
            <el-input v-model="form.groupName" :disabled="isView" ></el-input>
          </el-form-col>
          <el-form-col label="备注：" prop="remark" :span="24">
            <el-input type="textarea" v-model="form.remark" :disabled="isView"></el-input>
          </el-form-col>          
        </el-row>
  </el-form>
</template>

<script>
  import dialogPageBase from "@/components/framework/mixins/dialogPageBase";
  export default {
    mixins: [dialogPageBase],
    data() {
      return {
        activeTab: "baseInfo",
        form: {
          groupName: "",
          remark: ""
        }
      };
    },
    methods: {

      pageLoad() {
      }
    }
  };

</script>

<style>
.icon-button {
    font-size: medium;
}
</style>

