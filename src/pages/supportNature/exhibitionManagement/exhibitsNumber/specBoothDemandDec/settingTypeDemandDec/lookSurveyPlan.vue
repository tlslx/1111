/**
* @file 查看调研方案
* @author:heli
* @date:2019/6/5
*/
<template>
    <div class="addBooth">
      <el-tabs v-model="activeName">
        <el-tab-pane label="查看调研方案" name="first">
          <el-form ref="addForm" :model="addForm" label-width="200px">
            <el-row>
              <el-form-item label="届数:">
                <el-col :span="4">
                  <el-input v-model="addForm.exhibitionNum" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="调研方案名称:">
                <el-col :span="4">
                  <el-input v-model="addForm.surveyName" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="申报类型:">
                <el-col :span="4">
                  <el-input v-model="addForm.surveyName" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="展区:">
                <el-col :span="10">
                  <el-input v-model="addForm.exhibitionAreaCodes" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="制定数量详情:">
                <el-col :span="10">
                  <template>
                    <el-table :data="tableData" style="width: 100%;">
                      <el-table-column
                        prop="delegationName"
                        label="交易团"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="sessionOneBoothNum"
                        label="第一期展位数"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="sessionTwoBoothNum"
                        label="第二期展位数"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="sessionThreeBoothNum"
                        label="第三期展位数"
                        align="center">
                      </el-table-column>
                    </el-table>
                  </template>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>

          <!--表单提交/返回按钮-->
          <div class="submit_div">
            <el-button type="primary" class="submit_btn" @click="backSearchSchemes">返回</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
export default {
  name: "lookSurveyPlan",
  data() {
    return {
      tableData: [],
      activeName: 'first',
      addForm: {
        file: '',
        surveyName: '',
        exhibitionNum: "",
        declareType: '', // 0:不限制展位数量,1:限制展位数量
        exhibitionAreaCodes: ''
      }
    };
  },
  // watch: {
  //   "addForm.ifoBoothApply.boothNum": function(newV, oldV) {
  //     let value = newV;
  //     this.addForm.boothArea = value * 9;
  //   }
  // },
  mounted() {
    // 查看调研方案
    if (this.$route.query.data) {
      this.tableData = this.$route.query.data.schemeLks;
      this.addForm.surveyName = this.$route.query.data.surveyName;
      this.addForm.exhibitionNum = this.$route.query.data.exhibitionNum;
      this.addForm.exhibitionAreaCodes = this.$route.query.data.exhibitionAreaNames;

      if (this.$route.query.data.declareType === "1") { // 申报类型
        this.addForm.declareType = '限制展位数量';
      } else {
        this.addForm.declareType = "不限制展位数量";
      }
    }
  },
  methods: {
    // 返回
    backSearchSchemes() {
      this.$router.replace('/researchSchemesList');
    }
  }
};
</script>

<style scoped>
.addBooth{
  width: 100%;
  margin: 0 auto;
}
.addBooth p{
  color: red;
}
.submit_div{
  margin: 30px 0 50px 170px;
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
