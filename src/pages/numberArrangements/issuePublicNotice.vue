<template>
  <el-tabs v-model="activeName" :inline="true" @tab-click="handleTabs">
    <el-tab-pane label="外贸司审批并公示安排结果" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="商协会">
          <el-select v-model="queryForm.coceralId" clearable>
            <el-option v-for="(item, index) in coceralOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="(item, index) in dealClusterOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery('first')">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="examineResultDataList" v-loading="loading" border @selection-change="handleSelectionChange">
        <el-table-column
          :selectable="isSelectable" 
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="届数" prop="exhibitionSession" align="center"></el-table-column>
        <el-table-column label="地区" prop="area" align="center"></el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="商协会" prop="coceralName" align="center"></el-table-column>
        <el-table-column label="品牌企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="品牌企业展位数" prop="scheduleBoothNumber" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="getBoothNumber" ref="scheduleBoothNumber" :rules="rules">
                <el-form-item class="item-Num" prop="scheduleBoothNumber">
                  <el-input type="number" v-model.number="getBoothNumber.scheduleBoothNumber" oninput="if(value>10)value=value.slice(0,10)"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.scheduleBoothNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" :disabled='scope.row.isDispose === 1 ? true : false' @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" @click="handleSave(scope.$index, 'scheduleBoothNumber', scope.row)" :disabled="!scope.row.edit">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="danger" size="medium" @click="openPublished">公示</el-button>
          <el-button type="primary" size="medium" @click="handDownload">下载</el-button>
        </span>
        <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-size="pageInfoData.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="examineResultData.total">
        </el-pagination>
      </el-row>
      <!-- 公示弹框 -->
      <el-dialog title="公示" :visible.sync="isPublished" v-if="isPublished" width="550px">
        <el-form :model="publishedForm" ref="publishedForm" :rules="publishRules">
          <el-form-item label="发布至：" prop="publishWay">
            <el-checkbox-group v-model="publishedForm.publishWay">
              <el-checkbox v-for="(item, index) in publishedGoOpts" :key="index" :label="item" @change="handleChange((index + 1), publishWayArr)"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="附件：">
            <!-- <el-button type="primary" size="medium">选取文件</el-button> -->
            <!-- <el-upload
              class="upload-demo"
              action=""
              :limit="1"
              :http-request="uploadFileMethod">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload> -->
            <el-upload
              class="upload-demo"
              :action="uploadUrl"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList2"
              :on-exceed="handleExceed"
              :limit="1"
            >
              <el-button size="small" type="primary">选取文件</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload> 
          </el-form-item>
        </el-form>
        <div class="public-footer">
          <el-button type="primary" size="medium" @click="submitPublish('publishedForm')">确认</el-button>
          <el-button type="info" size="medium" @click="resetForm('publishedForm')">取消</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="外贸司汇总并公示意见表" name="second">
      <el-form :model="queryFormT" :inline="true">
        <el-form-item label="商协会">
          <el-select v-model="queryFormT.coceralId" clearable>
            <el-option v-for="(item, index) in coceralOpts" :key="index" :value="item.deptCode" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryFormT.dealClusterId" clearable>
            <el-option v-for="(item, index) in dealClusterOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="queryFormT.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评审企业">
          <el-input placeholder="请输入" v-model="queryFormT.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery('second')">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="foreignSummaryData.records" v-loading="loading" border>
        <el-table-column label="评审企业" prop="companyName" align="center"></el-table-column>
        <el-table-column label="所属交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="商协会" prop="coceralName" align="center"></el-table-column>
        <el-table-column label="原安排展位数" prop="beforeNumber" align="center"></el-table-column>
        <el-table-column label="异议内容" prop="objectionContent" align="center"></el-table-column>
        <el-table-column label="处理意见" prop="disposeOpinion" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleReturnCorcerl(scope.row, '')">返还商协会</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium" @click="secondDownload">下载</el-button>
        </span>
        <el-pagination 
          @size-change="handleSizeChangeT"
          @current-change="handleCurrentChangeT"
          :current-page="pageInfoData.currentPage"
          :page-size="pageInfoData.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="foreignSummaryData.total">
        </el-pagination>
      </el-row>
      <!-- 返还商协会弹窗 -->
      <el-dialog title="返还商协会" :visible.sync="passDialog" v-if="passDialog" width="550px">
        <el-form :model="passObj" ref="returnForm" :rules="returnReasonRule">
          <el-form-item label="处理意见：" prop="disposeOpinion">
            <el-input v-model="passObj.disposeOpinion" type="textarea" :rows="4" maxlength="120"></el-input>
          </el-form-item>
          <div class="public-footer">
            <el-button type="primary" size="medium" @click="handleReturnCorcerl('', 'returnForm')">保存</el-button>
            <el-button size="medium" @click="passDialog = false;">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    var needInt = (rule, value, callback) => {
      const reg = /[^\d\$]/g;
      if (value === '') {
        return callback(new Error('请输入>=0的整数'));
      } else if (reg.test(value)) {
        return callback(new Error('请输入>=0的整数'));
      } else {
        return callback();
      }
    };
    return {
      activeName: 'first',
      loading: '',
      isPublished: false,
      fileId: '',
      // 上传图片地址
      uploadUrl: process.env.API_NA_URL + '/api/reschedule/attach/upload',
      fileList2: [],
      passDialog: false,
      selectDate: [], //多选数据
      examineResultDataList: [],
      exhibitionAreaOpts: [],
      dealClusterOpts: [],
      companyOpts: [],
      coceralOpts: [],
      backTypeOpts: [],
      queryForm: {
        exhibitionArea: '',
        coceralId: '',
        dealClusterId: ''
      },
      getBoothNumber: {
        scheduleBoothNumber: ''
      },
      lastIndex: '',
      rules: {
        scheduleBoothNumber: [{ required: true, validator: needInt, trigger: 'blur' }]
      },
      publishWayArr: [],
      publishedGoOpts: ['广交会官网', '内部管理系统', '易捷通系统'],
      publishedForm: {
        publishWay: []
      },
      publishedData: {}, // 公示传参
      publishRules: {
        publishWay: [{ required: true, message: '请选择至少一项发布渠道', trigger: 'change' }]
      },
      queryFormT: {
        exhibitionArea: '',
        dealClusterId: '',
        coceralId: '',
        companyName: ''
      },
      returnCorcerlData: {},
      passObj: {
        disposeOpinion: ''
      },
      publicityIdData: '',
      returnReasonRule: {
        disposeOpinion: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      pageInfoData: { currentPage: 1, pageSize: 10 },
      pageInfoDataT: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('adjustmentForeignTradeDivision', ['examineResultData', 'foreignSummaryData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        coceralId: this.queryForm.coceralId,
        dealClusterId: this.queryForm.dealClusterId,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    },
    uploadBoothNumber() { // 在线编辑保存
      return {
        scheduleId: '',
        scheduleBoothNumber: this.getBoothNumber.scheduleBoothNumber - 0
      };
    },
    formQueryT() {
      return {
        exhibitionArea: this.queryFormT.exhibitionArea,
        coceralId: this.queryFormT.coceralId,
        dealClusterId: this.queryFormT.dealClusterId,
        companyName: this.queryFormT.companyName,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.dealClusterOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      this.coceralOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.createdQuery();
  },
  methods: {
    ...mapActions('adjustmentForeignTradeDivision', ['getExamineResultQuery', 'getExamineResult', 'postExamineUpdate', 'postPublicityAdd', 
      'getForeignSummaryQuery', 'getForeignSummary', 'postReturnAssoUpdate', 'getPublicityDate']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getassociationDepartment']),
    // 编辑数据封装
    editData(index, row) { 
      this.getBoothNumber.scheduleBoothNumber = row.scheduleBoothNumber ? row.scheduleBoothNumber : 0;
      this.examineResultDataList[index]['edit'] = true;
      this.lastIndex = index;
    },
    // 编辑
    handleEdit(index, row) {
      if (this.lastIndex === '' || index === this.lastIndex) {
        this.editData(index, row);
      } else if (index !== this.lastIndex) {
        this.$confirm('是否放弃保存此次编辑？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.examineResultDataList.length; i++) {
            this.examineResultDataList[i]['edit'] = false;
          }
          this.editData(index, row);
        }).catch(() => {
          this.$message.info('已取消此操作!');
        });
      }
    },
    // 保存
    handleSave(index, formName, row) { // 编辑保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.uploadBoothNumber.scheduleId = row.scheduleId;
          this.postExamineUpdate(this.uploadBoothNumber).then(res => {
            this.examineResultDataList[index]['edit'] = false;
            this.$message.success('保存成功');
            this.createdQuery();
          }).catch(e => {
            this.loading = false;
          });
        }
      });
    },
    // 打开公示弹框
    openPublished() {
      this.publishedData = {
        pubilshWay: '',
        attachment: ''
      },
      this.publishWayArr = [];
      this.publishedForm.pubilshWay = [];
      this.isPublished = true;
    },
    // 发布渠选择
    handleChange(id, arr) {
      let index = arr.indexOf(id);
      if (index === -1) {
        arr.push(id);
      } else {
        arr.splice(index, 1);
      }
    },
    //清空按钮
    resetForm() {
      this.$refs.publishedForm.resetFields();
      this.fileId = '';
      this.isPublished = false;
      this.createdQuery();
    },
    handlePreview(file, fileList) {
      // console.log(file, fileList, 'kkk');
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList, 'kkk');
    },
    // 限制文件数量
    handleExceed() {
      this.$message.warning(`当前限制选择1个文件`);
    },
    handleSuccess(response, file) {
      // console.log(response.data.fileId);
      this.fileId = response.data.fileId;
    },
    //下载功能(外贸司审批并公示安排结果)
    handDownload() {
      let url = this.$store.state.token;
      window.open(process.env.API_NA_URL + "/api/reschedule/examine/download?token=" + url, "_parent");
    },
    //下载功能(外贸司汇总并公示意见表)
    secondDownload() {
      let url = this.$store.state.token;
      window.open(process.env.API_NA_URL + "/api/reschedule/foreignSummary/download?token=" + url, "_parent");
    },
    // 确认公布
    submitPublish(formName) {
      if (this.selectDate.length !== 0) {
        let reschedules = [];
        for (let key in this.selectDate) {
          reschedules.push({ scheduleId: this.selectDate[key].scheduleId });
        }
        this.$refs[formName].validate(valid => {
          if (valid) {
            let fullScreenloading = this.$loading({ fullscreen: true });
            this.publishedData.pubilshWay = this.publishWayArr.length > 1 ? this.publishWayArr.join(',') : this.publishWayArr[0] + '';
            this.publishedData.fileId = this.fileId;
            this.publishedData.reschedules = reschedules;
            if (this.publishedData.fileId !== '') {
              this.getPublicityDate(this.publishedData).then((res) => {
                this.$nextTick(() => { 
                  fullScreenloading.close();
                });
                this.$message.success('公示成功');
                this.resetForm();
              }).catch(e => {
                this.$nextTick(() => { 
                  fullScreenloading.close();
                });
              });
            } else {
              this.$message.error('请选择要上传的附件');
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            }
          }
        });
      } else {
        this.$message.error('请选择要公布的企业');
      }
    },
    // tab切换时
    handleTabs(tab) {
      this.handleQuery(tab.name);
    },
    // 返还商协会
    handleReturnCorcerl(row, formName) {
      if (formName === '') {
        this.passObj.disposeOpinion = ''; 
        this.returnCorcerlData = {
          schemePublicity: {
            publicityId: row.publicityId
          },
          schemePublicityLog: {
            disposeOpinion: '',
            publicityId: row.publicityId
          }
        };
        this.publicityIdData = row.publicityId;
        this.passDialog = true;
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let fullScreenloading = this.$loading({ fullscreen: true });
            this.returnCorcerlData.schemePublicityLog.disposeOpinion = this.passObj.disposeOpinion;
            this.returnCorcerlData.schemePublicity.publicityId = this.returnCorcerlData.schemePublicityLog.publicityId = this.publicityIdData;
            this.postReturnAssoUpdate(this.returnCorcerlData).then(() => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message.success('操作成功');
              this.passDialog = false;
              this.createdQueryT();
            }).catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
          }
        });
      }
    },
    // 查询
    handleQuery(typeName) {
      this.pageInfoData.currentPage = 1;
      if (typeName === 'first') {
        this.createdQuery();
      } else if (typeName === 'second') {
        this.createdQueryT();
      }
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.createdQuery();
    },
    handleSizeChange(val) {
      this.pageInfoData.currentPage = 1;
      this.pageInfoData.pageSize = val;
      this.createdQuery();
    },
    handleCurrentChangeT(val) {
      this.pageInfoDataT.currentPage = val;
      this.createdQueryT();
    },
    handleSizeChangeT(val) {
      this.pageInfoDataT.currentPage = 1;
      this.pageInfoDataT.pageSize = val;
      this.createdQueryT();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getExamineResult(this.formQuery).then(data => {
        this.loading = false;
        let reviewInfoData = JSON.parse(JSON.stringify(data.records));
        for (let i = 0; i < reviewInfoData.length; i++) {
          reviewInfoData[i].edit = false;
        }
        this.examineResultDataList = reviewInfoData;
        this.lastIndex = '';
      }).catch(e => {
        this.loading = false;
      });
    },
    createdQueryT() {
      this.loading = true;
      this.getForeignSummary(this.formQueryT).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 多选功能
    handleSelectionChange(val) {
      this.selectDate = val;
    },
    isSelectable(row, index) {
      if (row.isDispose === 0) {
        return true;
      } else if (row.isDispose === 1) {
        return false;
      }
    }
  }
};
</script>
<style scoped>
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}  
.item-Num  >>> .el-form-item__content{
  margin-left: 0 !important;
}
.item-Num >>> input::-webkit-outer-spin-button,
.item-Num >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none!important;
}
.item-Num >>> input[type="number"]{
  -moz-appearance: textfield!important;
}
.el-table >>> .cell{
  overflow: visible !important;
}
.public-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
