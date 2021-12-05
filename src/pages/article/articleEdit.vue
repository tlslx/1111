<template>
  <el-form :ref="name" :model="form" data-url="/api/article/getSingleById" update-url="/api/article/updateById" add-url="/api/article/add"
    width="100%" >
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="标题：" prop="title" :span="24">
            <el-input v-model="form.title" :disabled="isView" @change="onInputTitle"></el-input>
          </el-form-col>
          <el-form-col label="作者：" prop="author" :span="8">
            <el-input v-model="form.author" :disabled="isView" @change="onInputAuthor"></el-input>
          </el-form-col>
          <el-form-col label="分类：" prop="categoryId" :span="8">
            <el-dropdown-list v-model="form.categoryId" @change="onCategoryChange" url="/api/article/getCategory"
              text-field="category" value-field="categoryId" :params="{OrderModelField: [{OrderByField: 'departmentId',asc: true}]}"
              :allow-create="false" :filterable="true" :clearable="true" :disabled="isView" style="width: calc(100% - 48px)">
            </el-dropdown-list>
            <el-popover placement="bottom" width="300" trigger="click">
              <el-datagrid ref="detailtable" :height="200" style="margin-bottom:12px;" row-key="categoryId" data-url="/api/article/getCategory"
                :editable="true" :show-checkbox="false" :showBottom="false" :pagination="false" :dataHandler="saveCategory">
                <el-table-column prop="category" label="分类名称" width="200" sortable="custom">
                  <el-datagrid-edit-cell slot-scope="scope" :props="scope">
                    <el-input v-model="scope.row['category']" size="small"></el-input>
                  </el-datagrid-edit-cell>
                </el-table-column>
              </el-datagrid>
              <el-button class="icon-button" slot="reference" style="padding: 4px 4px;" icon="el-icon-edit-outline" size="mini"></el-button>
            </el-popover>
          </el-form-col>
          <el-form-col label="原创：" prop="original" :span="4">
            <el-switch v-model="form.original" :active-value=1 :inactive-value=0 :disabled="isView"></el-switch>
          </el-form-col>
          <el-form-col label="置顶：" prop="	top" :span="4">
            <el-switch v-model="form.top" :active-value=1 :inactive-value=0 :disabled="isView"></el-switch>
          </el-form-col>
          <el-form-col label="内容：" prop="content" :span="24">
            <tiny-editor ref="editor" v-model="form.content"></tiny-editor>
          </el-form-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="附加信息" name="moreInfo">
        <el-row>
          <el-form-col label="简介：" prop="description" :span="14">
            <el-input type="textarea" :autosize="{ minRows:10 , maxRows: 10}" v-model="form.description" @change="onInputDescriptionChange"
              :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="封面图片：" prop="coverImage" :span="10">
            <el-input v-model="form.coverImage" :disabled="isView" v-show="false"></el-input>
            <img style="height:150px;width:210px;text-align:center" :src="form.coverImage" />
            <pic-cropper @getImageData="onGetCoverImage" style="text-align:center"></pic-cropper>
          </el-form-col>
          <el-form-col label="关键字：" prop="keywords" :span="24">
            <el-input v-model="form.keywords" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="创建者：" prop="creatorName" :span="8">
            <el-input v-model="form.creatorName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="创建时间：" prop="createDate" :span="8">
            <el-input v-model="form.createDate" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="修改时间：" prop="modify_date" :span="8">
            <el-input v-model="form.modifyDate" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script>
  import dialogPageBase from "@/components/framework/mixins/dialogPageBase";
  import tinyEditor from "@/components/framework/plugins/tinyEditor";
  import picCropper from "@/components/framework/plugins/picCropper";
  export default {
    name: "articleEdit",
    mixins: [dialogPageBase],
    data() {
      return {
        activeTab: "baseInfo",
        form: {
          title: "",
          author: "",
          original: "0",
          top: "0",
          content: "",
          keywords: "",
          category: "",
          categoryId: "",
          description: "",
          creatorName: "",
          createDate: "",
          coverImage: "",
          modifyDate: ""
        }
      };
    },
    methods: {
      // 根据选中的分类设置分类ID和名称
      onCategoryChange: function (itemValue, itemText, item) {
        this.form.category = itemText;
      },
      pageLoad() {},
      // 替换标题
      onInputTitle() {
        var _this = this;
        _this.$refs.editor.setTextById("title", _this.form.title);
      },
      // 替换作者
      onInputAuthor() {
        var _this = this;
        _this.$refs.editor.setTextById("author", "作者：" + _this.form.author);
      },
      // 设置内容简介
      onInputDescriptionChange() {
        let _this = this;
        _this.$refs.editor.setTextById("description", _this.form.description);
      },
      // 设置封面图片
      onGetCoverImage(img) {
        this.form.coverImage = img;
      },
      saveCategory(_category, _operType, msg) {
        var paramData = "";
        var _this = this;
        switch (_operType) {
          case "ADD":
            // 增加分类
            paramData = {
              category: _category.category,
              deparment: _this.$store.getters.userInfo.org.deptName,
              departmentId: _this.$store.getters.userInfo.org.deptId
            };
            this.$http
              .post("/api/article/addCategory", paramData)
              .then(function (resultData) {
                // _category.categoryId = resultData.categoryId;
                Object.assign(_category, resultData);
                _this.$refs.detailtable.saveSuccess(_category, "ADD");
              })
              .catch(function (message) {
                // 错误捕捉
              });
            break;
          case "DEL":
            // 删除指定分类
            paramData = {
              categoryId: _category.categoryId
            };
            this.$http
              .post("/api/article/delCategoryById", paramData)
              .then(function (resultData) {
                _this.$refs.detailtable.saveSuccess(_category, "DEL");
              })
              .catch(function (message) {
                // 错误捕捉
                _this.$message.error(message);
              });
            break;
          case "EDIT":
            // 删除指定分类
            paramData = {
              categoryId: _category.categoryId,
              category: _category.category
            };
            this.$http
              .post("/api/article/updateCategoryById", paramData)
              .then(function (resultData) {
                _this.$refs.detailtable.saveSuccess(_category, "EDIT");
              })
              .catch(function (message) {
                // 错误捕捉
                _this.$message.error(message);
              });
            break;
          default:
            break;
        }
      }
    },
    components: {
      tinyEditor,
      picCropper
    }
  };

</script>

<style>
.icon-button {
    font-size: medium;
}
</style>

