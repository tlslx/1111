<template>
  <el-form :ref="name" :model="form" data-url="/api/article/category/getSingleById"
    update-url="/api/article/category/updateById" add-url="/api/article/category/add" width="100%" size="mini">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="分类名称：" prop="category" :span="12" >
            <el-input v-model="form.category" :disabled="isView" @change="onInputTitle"></el-input>
          </el-form-col>
          <el-form-col label="部门：" prop="department" :span="12" >
            <el-input v-model="form.department" :disabled="isView"  @change="onInputAuthor"></el-input>
          </el-form-col>
           <el-form-col label="创建者：" prop="creatorName" :span="12" >
            <el-input v-model="form.creatorName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="创建时间：" prop="createDate" :span="12" >
            <el-input v-model="form.createDate" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script>
import dialogPageBase from "@/components/framework/mixins/dialogPageBase";
export default {
  name: "articleCategoryEdit",
  mixins: [dialogPageBase],
  data() {
    return {
      activeTab: "baseInfo",
      form: {
        category: "",
        department: "",
        creatorName: "",
        createDate: ""
      }
    };
  },
  methods: {
    pageLoad() {}
  }
};
</script>


