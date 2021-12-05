<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="审核申请企业信息" name="first">
      <el-form :model="queryForm" size="small" :inline="true">
        <el-form-item label="企业名称">
          <el-select v-model="queryForm.companyCode" clearable>
            <el-option v-for="(item, key) in companyOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请展位数">
          <el-input placeholder="请输入" v-model="queryForm.applyBoothNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="queryForm.checkStatus" clearable>
            <el-option v-for="(item, key) in checkStatusOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" class="floatlaf" size="medium" @click="handleQuery">查询</el-button>
          <!-- <el-button type="primary" size="medium">上传</el-button> -->
          <el-upload
            class="floatlaf"
            action=""
            :limit="1"
            :http-request="uploadFileMethod">
            <el-button class="formStyle" type="primary" size="medium">上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-table :data="confirmCompanyInfoData.records" ref="multipleTable" v-loading="loading" @select="handleSelectionChange" @select-all="handleSelectionChange" @selection-change="handleCheckedChange" :row-key="getRowKey" border>
        <el-table-column type="selection" :selectable="handleSelectAble" width="38px"></el-table-column>
        <el-table-column align="center" label="企业名称" prop="companyName" width="120">
          <template slot-scope="scope">
            <a href="javacript:;" @click="goConCompanyApt(scope.row, 'info')">{{ scope.row.companyName }}</a>
          </template>
        </el-table-column>
        <el-table-column align="center" label="交易团" prop="dealClusterName"></el-table-column>
        <el-table-column align="center" label="申请展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" label="上届品牌数" prop="lastBoothNumber"></el-table-column>
        <el-table-column align="center" label="申请展位数" prop="applyBoothNumber"></el-table-column>
        <el-table-column align="center" label="总分" prop="coceralTotalGrade"></el-table-column>
        <el-table-column align="center" label="出口额占所属大类出口额比例" prop="exportRatio"></el-table-column>
        <el-table-column align="center" label="按比例计算后的出口额项目得分" prop="exportRatioScore"></el-table-column>
        <el-table-column align="center" label="品牌建设项目得分" prop="brandBuildScore"></el-table-column>
        <el-table-column align="center" label="专利与版权项目得分" prop="patentScore"></el-table-column>
        <el-table-column align="center" label="国家级高新技术企业项目得分" prop="newHighScore"></el-table-column>
        <el-table-column align="center" label="国家/行业标准项目得分" prop="standardScore"></el-table-column>
        <el-table-column align="center" label="质量、环境管理体系认证项目得分" prop="qualityScore"></el-table-column>
        <el-table-column align="center" label="面向企业的行业认证项目得分" prop="industryScore"></el-table-column>
        <el-table-column align="center" label="面向产品或生产线的行业认证项目得分" prop="productionScore"></el-table-column>
        <el-table-column align="center" label="境内商标项目得分" prop="territoryScore"></el-table-column>
        <el-table-column align="center" label="境外商标项目得分" prop="beyondScore"></el-table-column>
        <el-table-column align="center" label="使用母子公司资质对应企业名称（初核后）" prop="correlationCompanyName" width="200"></el-table-column>
        <el-table-column align="center" label="审核状态" prop="checkStatus">
          <template slot-scope="scope">
            {{ scope.row.checkStatus | checkFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="handleTablePass(scope.row, '1', '')" :disabled="handleDisabled(scope.row)">通过</el-button>
            <el-button type="text" @click="handleTablePass(scope.row, '2', '')" :disabled="handleDisabled(scope.row)">不通过</el-button>
            <el-button type="text" @click="goConCompanyApt(scope.row, 'aptitude')" :disabled="handleDisabled(scope.row)">审核资质</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="utils-button" type="primary" size="medium" @click="handDownload">下载模板</el-button>
      <el-button class="utils-button" type="primary" size="medium" @click="handleBtnPass('1', '')">通过</el-button>
      <el-button class="utils-button" type="primary" size="medium" @click="handleBtnPass('2', '')">不通过</el-button>
      <el-form class="pagination-container" :inline="true">
        <el-form-item>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="confirmCompanyInfoData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfoData.currentPage"
            :page-size="pageInfoData.pageSize"
            :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
            >
          </el-pagination>
        </el-form-item>
      </el-form>
      <!-- 不通过弹窗 -->
      <el-dialog title="不通过原因" :visible.sync="passDialog" v-model="passDialog" width="550ppx">
        <el-form :model="passObj" ref="noPassReasonForm" :rules="passReasonRule">
          <el-form-item label="审核意见：" prop="checkOpinion">
            <el-input v-model="passObj.checkOpinion" type="textarea" :rows="4" maxlength="120"></el-input>
          </el-form-item>
          <div class="dialog-footer">
            <el-button type="primary" size="medium" @click="handleTablePass('', '2', 'noPassReasonForm')">保存</el-button>
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
    return {
      activeName: 'first',
      loading: '',
      passDialog: false,
      lastCheckData: [], // 上次保存的值
      selectData: [], // 选中的数据索引
      checkList: [], // 临时选中的值
      exhibitionAreaOpts: [],
      checkStatusOpts: [{ value: '0', label: '未审核' }, { value: '1', label: '审核通过' }, { value: '2', label: '审核未通过' }],
      companyOpts: [],
      delegationOpts: [],
      url: process.env.API_NA_URL,
      queryForm: {
        exhibitionArea: '', // 展区id
        applyBoothNumber: '', // 申请展位数
        coceralId: this.$store.getters.userInfo.org.deptCode,
        checkStatus: '', // 审核状态
        companyCode: '', // 企业id
        dealClusterId: '' // 交易团id
      },
      passObj: {
        checkOpinion: '' // 审核意见
      },
      passListData: [], // 通过不通过批量上次数据
      passReasonRule: {
        checkOpinion: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      passRequestData: {}, // 通过不通过传参
      currentBrandApplyId: '', // 当前的id
      pageInfoData: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    checkFilter: value => {
      switch (value) {
        case '0':
          return '未审核';
        case '1': 
          return '审核通过';
        case '2':
          return '审核未通过';  
        default:
          return '';    
      }
    }
  },
  computed: {
    ...mapGetters('checkRecommendCompany', ['confirmCompanyInfoData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea, 
        applyBoothNumber: this.queryForm.applyBoothNumber,
        checkStatus: this.queryForm.checkStatus,
        coceralId: this.queryForm.coceralId,
        companyCode: this.queryForm.companyCode, 
        dealClusterId: this.queryForm.dealClusterId,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    },
    getRowKey (row) { // 获取row的key值
      return row.checkStatus; 
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.loading = true;
    this.getQueryCondition().then(res => {
      this.companyOpts = res.companyOpts;
      this.createdQuery();
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('checkRecommendCompany', ['getConfirmCompanyInfo', 'getQueryCondition', 'postConCompanyScoreUpdate',
      "uploadconfirmCompanyInfo" // 上传
    ]),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment']),
    // 是否已审核（单条）
    handleDisabled(row) {
      if (row.checkStatus === '0') {
        return false;
      } else {
        return true;
      }
    },
    // 是否已审核（批量）
    handleSelectAble(row) {
      if (row.checkStatus === '0') {
        return true;
      } else {
        return false;
      }
    },
    // 前往查看企业信息页
    goConCompanyApt(val, type) {
      this.$router.push({ path: '/reviewEnterpriseQualiy', query: { data: val, type: type }});
    },
    // 点击表格里的通过or不通过
    handleTablePass(row, typeId, formName) {
      this.passRequestData = {
        brandApplyId: row.brandApplyId,
        checkStatus: typeId,
        checkOpinion: ''
      };
      if (formName === '') {
        if (typeId === '1') {
          this.$confirm('确定审核通过吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.passListData.push(this.passRequestData);
            this.postConCompanyScoreUpdate(this.passListData).then(() => {
              this.$message.success('操作成功');
              this.passListData = [];
              this.checkList = [];
              this.selectData = [];
              this.createdQuery();
            }).catch(e => {});
          }).catch(() => {
            this.$message.info('已取消本次操作');
          });
        } else if (typeId === '2') {
          this.passDialog = true;
          this.currentBrandApplyId = row.brandApplyId;
        }
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let fullScreenloading = this.$loading({ fullscreen: true });
            // 判断点的是表格里的操作还是按钮
            if (this.passListData.length === 0) {
              this.passRequestData.brandApplyId = this.currentBrandApplyId;
              this.passRequestData.checkOpinion = this.passObj.checkOpinion;
              this.passListData.push(this.passRequestData);
            } else {
              for (let i = 0; i < this.passListData.length; i++) {
                this.passListData[i].checkOpinion = this.passObj.checkOpinion;
              }
            }
            this.postConCompanyScoreUpdate(this.passListData).then(() => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message.success('操作成功');
              this.passListData = [];
              this.checkList = [];
              this.selectData = [];
              this.passDialog = false;
              this.createdQuery();
            }).catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
          }
        });
      }
    },
    // 选中的数据获取
    handleCheckedChange(rows) { // 选中的数据获取
      this.checkList = []; // 初始化，防止重复添加
      if (rows) {
        rows.forEach(row => { // 遍历已选择的数据
          if (row) {
            this.checkList.push(row);
          }
        });
      }
    },
    // 点击按钮通过or不通过
    handleBtnPass(typeId) {
      this.lastCheckData[this.pageInfoData.currentPage - 1] = this.checkList; // 保存当前页获取的值
      //降维 --- 二维数组降至一维数组
      let getList = Array.prototype.concat.apply([], this.lastCheckData);
      if (getList.length > 0) {
        this.passListData = JSON.parse(JSON.stringify(getList));
        for (let i = 0; i < this.passListData.length; i++) {
          this.passListData[i].checkStatus = typeId;
        }
        if (typeId === '1') {
          this.$confirm('确定勾选项都审核通过吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.postConCompanyScoreUpdate(this.passListData).then(() => {
              this.$message.success('操作成功');
              this.passListData = [];
              this.checkList = [];
              this.selectData = [];
              this.createdQuery();
            }).catch(e => {});
          }).catch(() => {
            this.$message.info('已取消本次操作');
          });
        } else if (typeId === '2') {
          this.passObj.checkOpinion = '';
          this.passDialog = true;
        }
      } else {
        this.$message.warning('请至少选择一项');
      }
      
    },
    handleSelectionChange(selection, row) { // 选中的数据索引获取
      this.selectData[this.pageInfoData.currentPage - 1] = []; // 初始化
      this.confirmCompanyInfoData.records.forEach((item, index) => {
        for (let i = 0; i < selection.length; i++) { // 遍历已选的数据重新填充数组
          if (item.brandApplyId === selection[i].brandApplyId) {
            this.selectData[this.pageInfoData.currentPage - 1].push(index);
          } 
        }
      });
    },
    toggleSelection(rows) { // 判断是否选中
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 查询
    handleQuery() {
      this.pageInfoData.currentPage = 1;
      this.createdQuery();
    },
    // 导入（上传）
    uploadFileMethod(param) {
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      this.uploadconfirmCompanyInfo(formData).then(res => {
        this.$message({
          type: "success",
          message: "导入成功"
        });
      }).catch(e => {});
    },
    // 下载
    handDownload() {
      // // // // let url = "exhibitionArea=" + this.queryForm.exhibitionArea + "&boothType=" + this.queryForm.boothType + "&exhibitionPeriod=" + this.queryForm.exhibitionPeriod + "&exhibitionAreaCode=" + this.queryForm.exhibitionAreaCode;
      // url = url.replace(/undefined/g, "");
      window.open(process.env.API_NA_URL + "/api/businessAssociation/confirmCompanyInfo/download?token=" + localStorage.getItem("USER_TOKEN"), "_parent");
    },
    // 操作页面
    handleCurrentChange(val) {
      this.lastCheckData[this.pageInfoData.currentPage - 1] = this.checkList; // 保存当前页获取的值
      this.pageInfoData.currentPage = val;
      this.loading = true;
      this.getConfirmCompanyInfo(this.formQuery).then(() => {
        this.loading = false;

        let arr = [];
        if (this.selectData[this.pageInfoData.currentPage - 1]) {
          this.selectData[this.pageInfoData.currentPage - 1].forEach((item, index) => {
            arr.push(this.confirmCompanyInfoData.records[item]);
          });
        }
        let setTime = new Promise((resolve, reject) => {
          resolve(arr);
        });
        Promise.all([setTime]).then((results) => {
          this.toggleSelection(arr);
        });
      }).catch(e => {
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      this.pageInfoData.currentPage = 1;
      this.pageInfoData.pageSize = val;
      this.createdQuery();
    },
    //查询封装
    createdQuery() {
      this.loading = true;
      this.getConfirmCompanyInfo(this.formQuery).then(() => {
        this.loading = false;
        this.checkList = [];
        this.selectData = [];
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.queryBtn, .pagination-container{
  float: right;
}
.utils-button, .pagination-container{
  margin-top: 20px;
} 
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
.floatlaf {
  margin: 0 10px;
  float: left;
}
</style>
