/**
* @file CF评选产品列表
* @author:wanglifeng
* @date:2019/1/14
*/
<template>
  <div>
    <p><span class="title">CF评选产品列表 </span></p>
    <hr>
    <el-form :inline="true" :model="ruleForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="活动编号:" size="mini">
        <el-select v-model="ruleForm.activityCode" @change="getProductCategory">
          <el-option v-for="(item, index) in activeCodeOption" :label="item.activityCode" :value="item.activityCode" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品类别:" size="mini">
        <el-select v-model="ruleForm.productCategoryId" placeholder="请选择">
          <el-option v-for="(item, index) in categoryOption" :label="item.productCategoryNameCn" :value="item.productCategoryId" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品编号:" size="mini">
        <el-input v-model="ruleForm.productNo" placeholder="请输入内容" clearable></el-input>
      </el-form-item>

      <el-form-item size="mini">
        <el-button type="primary" @click="searchForm()">查询</el-button>
        <el-button type="primary" @click="resetData()">重置</el-button>
        <el-button class="btn1" @click="handleAdd">新增产品</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="productNameCn"
          label="产品名称"
          align="center">
          <!--<template slot-scope="scope">-->
            <!--<span class="click-name">{{scope.row.designerNameCn}}</span>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column
          prop="productNo"
          label="产品编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="productCategoryId"
          label="产品类别"
          align="center">
          <template slot-scope="scope">
            <span v-for="(item, index) in categoryOption" :key="index">
              <span v-if="item.productCategoryId === scope.row.productCategoryId">
                {{item.productCategoryNameCn}}
              </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="productStatus"
          label="状态"
          align="center">
          <template slot-scope="scope">

            <span v-if="scope.row.productStatus == '01'">待提交</span>
            <span v-else-if="scope.row.productStatus == '02'">待审核</span>
            <span v-else-if="scope.row.productStatus == '03'">审核通过</span>
            <!--<span v-else-if="scope.row.productStatus == '04'">审核不通过</span>-->
            <el-tooltip v-else-if="scope.row.productStatus == '04'" effect="dark" :content="scope.row.auditContent" placement="top">
              <span style="color: #ff0000;">审核不通过</span>
            </el-tooltip>
            <span v-else-if="scope.row.productStatus == '05'">初评中</span>
            <span v-else-if="scope.row.productStatus == '06'"></span>
            <span v-else-if="scope.row.productStatus == '07'">初评不通过</span>
            <span v-else-if="scope.row.productStatus == '08'">通过初评，请寄送产品实物</span>
            <span v-else-if="scope.row.productStatus == '09'">收到产品实物，即将进行终评</span>
            <span v-else-if="scope.row.productStatus == '10'">终评中</span>
            <span v-else-if="scope.row.productStatus == '11'">终评通过</span>
            <span v-else-if="scope.row.productStatus == '12'">终评不通过</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button @click="showEwm(scope.row, scope.index)" :disabled="Number(scope.row.productStatus)<8" type="text" size="mini">二维码</el-button>
            <el-button @click="handleEdit(scope.row, scope.index)" :disabled="Number(scope.row.productStatus)>4" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="add-page">
        <!--分页-->
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </el-row>
    </template>
    <!--产品二维码弹窗-->
    <el-dialog title="产品二维码" :visible.sync="dialogQrCode" class="formProduct" width="60%">
      <div style="padding: 20px">
        <div ref="printarea">
          <div class="dialog-top">
            <img src="../../../theme/framework/images/erweima-top.png" alt="" style="width: 80%;display: block;margin: 0 auto;">
          </div>
          <div class="dialog-content">
            <el-row>
              <el-col :span="10">
                <img :src="qrCodeUrl" alt="" style="width: 80%;display:block;margin: 0 auto;">
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="12" style="line-height: 50px;">
                <el-row style="margin-top: 10px;"><span class="text-center">企业名称：</span><span>{{productInfo.companyNameCn}}</span></el-row>
                <el-row><span class="text-center">产品名称：</span><span>{{productInfo.productNameCn}}</span></el-row>
                <el-row><span class="text-center">产品编号：</span><span>{{productInfo.productNo}}</span></el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="dialog-footer">
          <el-row style="text-align: center;">
            <el-button type="primary" @click="printQrCode">打  印</el-button>
            <el-button @click="dialogQrCode = false">关  闭</el-button>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import pageprint from '../../../scripts/framework/pageprint.js';

Vue.use(pageprint);
export default {
  name: "perfectInformation",
  data() {
    return {
      tableData: [],
      categoryOption: [],
      activeCodeOption: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // cfCompanyId: '',
      ruleForm: {
        activityCode: '',
        productCategoryId: '',
        productNo: ''
      },
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "padding: 20px 0;text-align: center;"
      },
      // 二维码图片路径
      dialogQrCode: false,
      qrCodeUrl: '',
      // 显示二维码
      productInfo: {
        companyNameCn: '',
        productNameCn: '',
        productNo: ''
      },
      // baseApi: 'http://192.168.1.111:9014'
      baseApi: process.env.API_CF_URL
    };
  },
  methods: {
    // 获取产品类别
    getProductCategory() {
      this.ruleForm.productCategoryId = '';
      let params = {
        activityCode: this.ruleForm.activityCode
      };
      this.$http.get(this.baseApi + '/api/customservice/cf/listProductCategory', params).then(res => {
        this.categoryOption = res.records;
      }).catch(err => {
      });
    },
    // 获取活动编号
    getActiveCode() {
      this.$http.get(this.baseApi + '/api/customservice/cf/getCfActivityCode').then(res => {
        this.activeCodeOption = res.records;
        this.ruleForm.activityCode = res.records[0].activityCode;
        this.getProductCategory();
      }).catch(error => {
      });
    },
    // 显示二维码
    showEwm(row, index) {
      this.createEwm(row.awardProductId);
      this.productInfo.productNo = row.productNo;
      this.productInfo.productNameCn = row.productNameCn;
      this.productInfo.companyNameCn = row.companyNameCn;
      this.dialogQrCode = true;
    },
    // 生成二维码
    createEwm(awardProductId) {
      this.$http.post(this.baseApi + '/api/customservice/cf/generateProductQRCode', { awardProductId: awardProductId }).then(res => {
        this.qrCodeUrl = "data:image/jpeg;base64," + res;
      }).catch(error => {
      });
    },
    // 打印二维码
    printQrCode() {
      this.$print(this.$refs.printarea);
    },
    handleAdd() {
      this.$router.push({
        path: '/addCfProduct'
      });
    },
    handleEdit(row, index) {
      this.$router.push({
        path: '/addCfProduct',
        query: {
          awardProductId: row.awardProductId
        }
      });
    },
    resetData() {
      this.ruleForm.activityCode = this.activeCodeOption[0].activityCode;
      this.ruleForm.productNo = '';
      this.ruleForm.productCategoryId = '';
      this.currentPage = 1;
    },
    searchForm() {
      this.currentPage = 1;
      this.getData();
    },
    getData() {
      let params = {
        current: this.currentPage || null,
        size: this.pageSize || null,
        activityCode: this.ruleForm.activityCode || null,
        productNo: this.ruleForm.productNo || null,
        productCategoryId: this.ruleForm.productCategoryId || null
      };
      this.$http.get(this.baseApi + '/api/customservice/cf/getCfProductListPage', params).then(data => {
        this.tableData = data.records;
        this.total = data.total;
      }).catch(error => {
      });
    },
  //  分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    }
  },
  mounted() {
    this.getActiveCode();
    // this.getProductCategory();
    this.getData();
  }
};
</script>
<style scoped>
.title{
  font-size: 18px;
  font-weight: 600;
}
.btn1 {
  background-color: #ffb826;
  color: white;
  border-color: #ffb826;
}
.add-page{
  margin-top: 5px;
}
.paging{
  float: right;
}
</style>
