/**
* @file 设置展区(限制数量)【工作部管理员】
* @author:heli
* @date:2019/6/5
*/
<template>
    <div class="addBooth">
      <el-tabs v-model="activeName">
        <el-tab-pane label="设置展区" name="first">
          <el-form ref="addForm" :model="addForm" label-width="200px" :rules="formRules">
            <el-row>
              <el-form-item label="届数:">
                <el-col :span="4">
                  <el-select v-model="addForm.exhibitionNum" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in exhibitionSessionArr" :label="item.exhibitionNum"
                    :value="item.exhibitionNum" :key="item.exhibitionId"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="调研方案名称:" prop="surveyName">
                <el-col :span="4">
                  <el-input v-model="addForm.surveyName"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="申报类型:" prop="declareType">
                <el-radio-group v-model="addForm.declareType">
                  <el-radio label="1">制定展位数量</el-radio>
                  <el-radio label="0" @click.native="unlimitNunber">不限制展位数量</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="调研展区:" prop="exhibitionAreaCodes">
                <el-col :span="6">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox><br>
                  <el-checkbox-group v-model="addForm.exhibitionAreaCodes">
                    <el-checkbox v-for="(item, index) in exhibitionAreaArr" :label="item.itemCode" :key="index">{{item.itemText}}</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>

          <!--表单提交/返回按钮-->
          <div class="submit_div">
            <el-button class="submit_btn"  @click="dialogVisibleData = true">导入数据</el-button>
            <el-button type="primary" @click="onSubmit('addForm')" class="submit_btn">提交</el-button>
            <el-button class="submit_btn" @click="backSearchSchemes">返回</el-button>
          </div>
        </el-tab-pane>

        <!--导入数据-->
        <el-dialog title="导入数据" :visible.sync="dialogVisibleData" width="30%" :before-close="handleClose">
          <el-form :model="addForm">
            <el-form-item label="导入Excel文件:" :label-width="formLabelWidth">
              <el-upload ref="upload" action="" multiple accept=".xls"
                list-type='text'
                name="file"
                :http-request="handleUploadFiles"
                :auto-upload="true"
                :file-list="fileList"
                :on-error="uploadError"
                :on-change="uploadSuccess"
                :on-remove="handleRemove">
                <el-button slot="trigger" size="small" type="primary">上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleData = false;">取 消</el-button>
          </span>
        </el-dialog>
      </el-tabs>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "limitNumExhibitAreas",
  data() {
    return {
      formData: new FormData(),
      file: {},
      addForm: {
        file: '',
        surveyName: '',
        exhibitionNum: "",
        declareType: '1', // 0:不限制展位数量,1:限制展位数量
        exhibitionAreaCodes: []
      },
      fileList: [],
      checkAll: false,
      activeName: 'first',
      dialogVisible: false,
      isIndeterminate: true,
      exhibitionAreaArr: [],
      formLabelWidth: '120px',
      dialogVisibleData: false,
      exhibitionSessionArr: [],
      formRules: { // 表单校验
        surveyName: [{ required: true, message: "方案名称A", trigger: "change" }],
        declareType: [{ required: true, trigger: "change" }],
        exhibitionAreaCodes: [{ required: true, message: "请选择展区", trigger: "change" }]
      },
      uploadParams: {}
    };
  },
  // watch: {
  //   "addForm.ifoBoothApply.boothNum": function(newV, oldV) {
  //     let value = newV;
  //     this.addForm.boothArea = value * 9;
  //   }
  // },
  mounted() {
    // 获取所有届数信息
    this.getListAll().then(res => {
      this.exhibitionSessionArr = res;
    });

    // 根据展届展期获取展区和专区的信息
    this.findDicItemListByExhibiArea().then(res => {
      this.exhibitionAreaArr = res.records;
    });
  },
  methods: {
    ...mapActions("enterpriseBooth", ["getListAll"]), // 获取所有届数信息
    ...mapActions("enterpriseBooth", ["findDicItemListByExhibiArea"]), // 根据字典获取展区
    ...mapActions("enterpriseBooth", ["surveySchemeAdd"]), // 展位数量 设定需求申报类型 新增

    uploadSuccess(res, file, fileList) {
      this.$message.success("文件上传成功");
      this.dialogVisibleData = false;
      this.fileList = fileList;
    },
    // 文件自定义上传非特装
    handleUploadFiles(param) {
      this.formData.append('file', param.file);
      this.addForm.file = this.formData.get("file");
    },
    handleRemove(file) {
      this.$message.warning('文件已删除');
    },
    uploadError() {
      this.$message.error("文件上传失败");
    },
    handleCheckAllChange(val) { // 全选
      let temp = [];
      for (let key in this.exhibitionAreaArr) {
        temp.push(this.exhibitionAreaArr[key].itemCode);
      }
      this.addForm.exhibitionAreaCodes = val ? temp : [];
      this.isIndeterminate = false;
    },
    // 修改、新增
    onSubmit(addForm) {
      let formData = new FormData();
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          formData.append('file', this.addForm.file);
          formData.append('surveyName', this.addForm.surveyName);
          formData.append('declareType', this.addForm.declareType);
          formData.append('exhibitionNum', this.addForm.exhibitionNum);
          formData.append('exhibitionAreaCodes', this.addForm.exhibitionAreaCodes);

          this.surveySchemeAdd(formData).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功!'
            });

            this.$router.replace('/researchSchemesList');
          });
        } else {
          return false;
        }
      });
    },
    // 返回
    backSearchSchemes() {
      this.$router.replace('/researchSchemesList');
    },
    // 不限制展位数量
    unlimitNunber() {
      this.$router.push('/unlimitedNumExhibitAreas');
    },
    // 展位新增提示信息
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }

  }
};
</script>

<style scoped>
.addBooth{
  width: 100%;
  margin: 0 auto;
}
.submit_div{
  margin: 30px 0 50px 170px;
}
.addBooth p{
  color: red;
}
.addBooth span{
  color: red;
  display: inline-block;
  margin-left: 20px;
}
.addBooth p a{
  text-decoration: none
}
.el-form-item{
  margin-bottom: 30px;
}
</style>

<style>
.addBooth .el-transfer__button {
  border-radius: 0% !important;
}
</style>
