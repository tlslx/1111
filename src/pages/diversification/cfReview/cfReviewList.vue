/**
* @file CF奖资质审核列表
* @author:wanglifeng
* @date:2019/1/17
*/
<template>
  <div>
    <p><span class="title">CF奖资质审核列表 </span></p>
    <hr>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
      <el-form-item label="活动编号:" size="mini">
        <el-select v-model="ruleForm.activityCode" placeholder="请选择">
          <el-option v-for="(item,index) in activityCodes" :label="item.activityCode" :key="index"
                     :value="item.activityCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称:" size="mini">
        <el-input v-model.trim="ruleForm.companyNameCn" placeholder="请输入企业名称"></el-input>
      </el-form-item>

      <el-form-item label="产品编号:" size="mini">
        <el-input v-model.trim="ruleForm.productNo" placeholder="请输入产品编号"></el-input>
      </el-form-item>

      <el-form-item label="产品名称:" size="mini">
        <el-input v-model.trim="ruleForm.productNameCn" placeholder="请输入产品名称"></el-input>
      </el-form-item>

      <el-form-item label="状态:" size="mini">
        <el-select v-model="ruleForm.productStatus" placeholder="请选择">
          <el-option label="待审核" value="02"></el-option>
          <el-option label="审核通过" value="03"></el-option>
          <el-option label="审核不通过" value="04"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item size="mini">
        <el-button type="primary" @click="submitForm()">查询</el-button>
        <el-button type="primary" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>

    <template>
      <el-row class="btn-row">
        <!--<el-checkbox v-model="handleSelectionChange">全选/全不选</el-checkbox>-->
        <el-button type="primary" :disabled="!showBtn" @click="reviewMultiPass()">审核通过</el-button>
        <el-button type="primary" :disabled="!showBtn" @click="reviewMultiNoPass()">审核不通过</el-button>
        <el-button type="primary" :disabled="!passBtn" @click="goMultiPreliminary()">进入初评</el-button>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="cfReviewList"
        border
        @select-all="handleTabSelectAll"
        @selection-change="handleSelectionChange"
        >

        <el-table-column
          type="selection"
          disabled='true'
          :selectable="checkboxInit"
          width="80">
        </el-table-column>

        <el-table-column
          prop="companyNameCn"
          label="企业名称"
          width="170"
          align="center">
          <template slot-scope="scope">
              <router-link :to="{path:'/productInfomationDetail',query:{ showBtn: true, cfCompanyId: scope.row.cfCompanyId, awardProductId: scope.row.awardProductId, productStatus: scope.row.productStatus }}">{{scope.row.companyNameCn}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="productNameCn"
          label="产品名称(中文)"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="productNo"
          label="产品编号"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          label="产品类别"
          width="150"
          align="center">
          <template slot-scope="scope">
              <span v-for="(item,index) in productCategorys" :key="index"
                    v-if="scope.row.productCategoryId == item.productCategoryId">{{item.productCategoryNameCn}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="productStatus"
          label="状态"
          align="center"
          width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.productStatus==='01'">待提交</span>
            <span v-else-if="scope.row.productStatus==='02'">待审核</span>
            <span v-else-if="scope.row.productStatus==='03'">审核通过</span>
            <span v-else-if="scope.row.productStatus==='04'">审核不通过</span>
            <span v-else-if="scope.row.productStatus==='05'">初评中</span>
            <span v-else-if="scope.row.productStatus==='06'">未知状态</span>
            <span v-else-if="scope.row.productStatus==='07'">初评不通过</span>
            <span v-else-if="scope.row.productStatus==='08'">初评通过，请寄送产品实物</span>
            <span v-else-if="scope.row.productStatus==='09'">收到产品实物，即将进入终评</span>
            <span v-else-if="scope.row.productStatus==='10'">终评中</span>
            <span v-else-if="scope.row.productStatus==='11'">终评通过</span>
            <span v-else-if="scope.row.productStatus==='12'">终评不通过</span>
            <span v-else>待提交</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="auditContent"
          label="备注"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="300">
          <template slot-scope="scope">
            <el-button v-if="scope.row.productStatus==='02'" @click="handleSinglePass(scope.row, scope.index)" type="text" size="mini">通过</el-button>
            <el-button v-else style="color: #8a8a8a" type="text" size="mini">通过</el-button>
            <el-button v-if="scope.row.productStatus==='02'" @click="handleSingleNoPass(scope.row, scope.index)" type="text" size="mini">不通过</el-button>
            <el-button v-else style="color: #8a8a8a" type="text" size="mini">不通过</el-button>
            <el-button v-if="scope.row.productStatus==='03'" @click="goSinglePreliminary(scope.row, scope.index)" type="text" size="mini">进入初评</el-button>
            <el-button v-else style="color: #8a8a8a"  type="text" size="mini">进入初评</el-button>
            <el-button @click="handleSingleEdit(scope.row, scope.index)" type="text" size="mini">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      background
      class="pagination"
      @size-change="cfReviewFormSizeChange"
      @current-change="cfReviewFormCurrentChange"
      :current-page.sync="ruleForm.current"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="ruleForm.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalcfReviewFormDatas"
      prev-text="上一页"
      next-text="下一页">
    </el-pagination>

    <!--驳回原因弹窗-->
    <el-dialog title="驳回原因" :visible.sync="dialogProduct"  :close-on-click-modal="false" class="formProduct">
      <el-form :model="formProduct" :rules="dialogProductRules" >
          <el-form-item label-width="0" prop="auditContent">
            <el-input v-model.trim="formProduct.auditContent" type="textarea" maxlength="100"></el-input>
          </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="sendReviewStatusRequest()">确 定</el-button>
        <el-button @click="dialogProduct = false">取 消</el-button>
        <el-button @click="resetDialogProduct()">重 置</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import http from "@/scripts/framework/http";

  export default {
    name: "cfReviewList",
    data() {
      return {
        allChecked: false, // 全选
        multipleSelection: [],
        activityCodes: [],
        productCategorys: [],  // 产品类别列表
        cfReviewList: [],
        totalcfReviewFormDatas: 0,
        reviewPendingDatas: [],
        reviewPassDatas: [],
        reviewNoPassDatas: [],

        reviewPageCount: 1,
        reviewTotalPage: 1,
        ruleForm: {
          companyNameCn: '',
          activityCode: '',
          productNo: '',
          productNameCn: '',
          productStatus: '',
          current: 1,
          size: 10
        },
        statusUpdate: [],
        dialogProduct: false, // 产品列表弹窗
        dialogAwardSetting: false, // 奖项设置弹窗
        formProduct: {
          auditContent: '',
          nodeId: '',
          auditStatus: ''
        },
        mode: 'single',
        reviewParams: [],
        showBtn: false,
        passBtn: false,
        preliminaryBtn: false,
        baseApi: process.env.API_CF_URL,
        dialogProductRules: {
          auditContent: [
            { required: true, message: '驳回原因需要在100个字符以内', trigger: 'blur' },
            { min: 0, max: 100, message: '驳回原因需要在100个字符以内', trigger: 'blur' }
          ]
        }
      };
    },
    mounted() {
      this.initCfReviewData();
    },
    methods: {
      initCfReviewData() {
        this.getActivityList();
      },
      resetForm() {
        this.resetFormData(this.ruleForm);
      },
      // 获取活动列表
      getActivityList() {
        http.get(this.baseApi + '/api/customservice/cf/getCfActivityCode').then(res => {
          this.activityCodes = res.records;
          this.ruleForm.activityCode = this.activityCodes[0].activityCode;
          this.getProductCategoryInfo(this.activityCodes[0].activityCode);
          this.getCfReviewList(this.ruleForm);
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取资质审核列表
      getCfReviewList(params) {
        http.get(this.baseApi + '/api/customservice/cf/listCfProductApply', params).then(res => {
          this.cfReviewList = res.records;
          this.totalcfReviewFormDatas = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取所有的产品分类信息
      getProductCategoryInfo(activityCode) {
        http.get(this.baseApi + '/api/customservice/cf/listProductCategory', {
          activityCode: activityCode
        }).then(res => {
          this.productCategorys = res.records;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 条件查询资质审核列表
      submitForm() {
        this.getCfReviewList(this.ruleForm);
      },
      // 提交资质审核信息
      putProductReviewStatus(params) {
        http.postJson(this.baseApi + '/api/customservice/cf/auditProductInfo', params).then((res) => {
          this.$message.success("操作成功");
          this.getCfReviewList(this.ruleForm);
        }).catch((error) => {
          this.$message.error(error);
        });
      },
      // 表格全选处理
      handleTabSelectAll(val) {
        this.multipleSelection = val;
        this.reviewPendingDatas = [];
        this.reviewPassDatas = [];
        // 只有选中时，批量操作按钮才能点击
        if (val.length > 0) {
          for (let i = 0, length = val.length; i < length; i++) {
            if (val[i].productStatus === '02') {
              this.reviewPendingDatas.push(val[i]);
            } else if (this.multipleSelection[i].productStatus === '03') {
              this.reviewPassDatas.push(val[i]);
            } else if (this.multipleSelection[i].productStatus === '04') {
              this.reviewNoPassDatas.push(val[i]);
            }
          }
          if (this.reviewPendingDatas.length > 0) {
            this.showBtn = true;
          } else {
            this.showBtn = false;
          }

          if (this.reviewPassDatas.length > 0) {
            this.passBtn = true;
          } else {
            this.passBtn = false;
          }
        } else {
          this.passBtn = false;
          this.showBtn = false;
        }
      },
      // 表格多选框选中事件,反选
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      singleBaseParams(row, status) {
        this.formProduct.nodeId = row.awardProductId;
        this.formProduct.auditStatus = status;
        this.mode = "single";
      },
      // 选择需要批量操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.reviewPendingDatas = [];
        this.reviewPassDatas = [];
        // 只有选中时，批量操作按钮才能点击
        if (val.length > 0) {
          for (let i = 0, length = val.length; i < length; i++) {
            if (val[i].productStatus === '02') {
              this.reviewPendingDatas.push(val[i]);
            } else if (this.multipleSelection[i].productStatus === '03') {
              this.reviewPassDatas.push(val[i]);
            } else if (this.multipleSelection[i].productStatus === '04') {
              this.reviewNoPassDatas.push(val[i]);
            }
          }
          if (this.reviewPendingDatas.length > 0) {
            this.showBtn = true;
          } else {
            this.showBtn = false;
          }

          if (this.reviewPassDatas.length > 0) {
            this.passBtn = true;
          } else {
            this.passBtn = false;
          }
        } else {
          this.passBtn = false;
          this.showBtn = false;
        }
      },
      // 根据当前的状态判断是否能够勾选
      checkboxInit(row, index) {
        if (row.productStatus === '04') {
          return false;
        } else {
          return true; //可勾选
        }
      },

      handleSinglePass(row, index) {
        this.showDialogTips("确认所选产品通过审核?").then(() => {
          let params = [{ nodeId: row.awardProductId, auditStatus: '1' }];
          this.putProductReviewStatus(params);
        }).catch(() => {});
      },
      handleSingleNoPass(row, index) {
        this.formProduct.auditContent = "";
        this.dialogProduct = true;
        this.singleBaseParams(row, "2");
      },
      // 发送状态更新的请求
      sendReviewStatusRequest() {
        this.dialogProduct = false;
        let reviewObjs = this.generateParams();
        this.putProductReviewStatus(reviewObjs);
        this.getCfReviewList(this.ruleForm);
      },
      goSinglePreliminary(row, index) {
        this.showDialogTips("确认所选产品进入初评?").then(() => {
          this.singleBaseParams(row, "3");
          this.sendReviewStatusRequest();
        }).catch(() => {});
      },
      // 修改,跳转到企业基本信息
      handleSingleEdit(row, index) {
        this.$router.push({
          path: '/productInfomationEdit',
          query: {
            awardProductId: row.awardProductId,
            cfCompanyId: row.cfCompanyId
          }
        });
      },
      // 审核通过 nodeId auditStatus auditContent
      reviewMultiPass() {
        if (this.reviewPassDatas.length > 0 || this.reviewNoPassDatas.length > 0) {
          this.$message.error("所选的产品包含已经审核过的产品!");
        } else {
          this.showDialogTips("确认所选产品通过审核?").then(() => {
            this.formProduct.auditStatus = "1";
            this.mode = "multi";
            let reviewObjs = this.generateParams();
            this.putProductReviewStatus(reviewObjs);
          }).catch(() => {});
        }

      },
      // 审核不通过
      reviewMultiNoPass() {
        if (this.reviewPassDatas.length > 0 || this.reviewNoPassDatas.length > 0) {
          this.$message.error("所选的产品包含已经审核过的产品!");
        } else {
          this.formProduct.auditContent = "";
          this.dialogProduct = true;
          this.formProduct.auditStatus = "2";
          this.mode = "multi";
        }
      },
      // 进入初评
      goMultiPreliminary() {
        if (this.reviewPendingDatas.length > 0) {
          this.$message.error("所选的产品包含待审核产品!");
        } else {
          this.showDialogTips("确认所选产品进入初评?").then(() => {
            this.formProduct.auditStatus = "3";
            this.mode = "multi";
            let reviewObjs = this.generateParams();
            this.putProductReviewStatus(reviewObjs);
          }).catch(() => {});
        }
      },
      cfReviewFormSizeChange(pageSize) {
        this.ruleForm.size = pageSize;
        this.getCfReviewList(this.ruleForm);
      },
      // 资质审核列表分页操作
      cfReviewFormCurrentChange(currentPage) {
        this.ruleForm.current = currentPage;
        this.getCfReviewList(this.ruleForm);
      },
      resetDialogProduct() {
        this.formProduct.auditContent = "";
      },
      // 重置搜索表单
      resetFormData(resetObj) {
        for (let item in resetObj) {
          if (item === "activityCode") {
            resetObj[item] = this.activityCodes[0].activityCode;
          } else if (item === "current") {
            resetObj[item] = resetObj[item];
          } else if (item === "size") {
            resetObj[item] = resetObj[item];
          } else {
            resetObj[item] = '';
          }
        }
      },
      // 请求参数生成
      generateParams() {
        this.reviewPendingDatas = [];
        this.reviewPassDatas = [];
        let reviewObjs = [];
        if (this.mode === "single") {
          let reviewObj = this.formProduct;
          reviewObjs.push(reviewObj);
        } else {
          for (let i = 0, length = this.multipleSelection.length; i < length; i++) {
            let reviewObj = {};
            reviewObj.nodeId = this.multipleSelection[i].awardProductId;
            reviewObj.auditStatus = this.formProduct.auditStatus;
            // 审核不通过时需要写原因
            if (reviewObj.auditStatus === "2") {
              reviewObj.auditContent = this.formProduct.auditContent;
            }
            if (this.multipleSelection[i].productStatus === '02') {
              this.reviewPendingDatas.push(reviewObj);
            } else if (this.multipleSelection[i].productStatus === '03') {
              this.reviewPassDatas.push(reviewObj);
            }
            if (reviewObj.auditStatus === "2" || reviewObj.auditStatus === "1") {
              reviewObjs = this.reviewPendingDatas;
            } else {
              reviewObjs = this.reviewPassDatas;
            }
          }
        }
        return reviewObjs;
      },
      // 消息提示
      showDialogTips(tipMessage) {
        return this.$confirm(tipMessage, '操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        });
      }
    }
  };
</script>

<style scoped>
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
  }

  .btn-row {
    margin: 10px;
  }

  .dialog-footer {
    text-align: center;
    margin: 15px 0;
    padding-bottom: 10px;
  }
  .pagination{
    margin: 10px auto;
    text-align: center;
  }

</style>
