/*
* @file 产品初评列表 + 产品入围名单
* @author:wanglifeng
* @date:2019/1/17
*/
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="产品初评列表" name="first">
      <el-form :inline="true" :model="reviewForm" class="demo-reviewForm">
        <el-form-item label="活动编号:" size="mini">
          <el-select v-model="reviewForm.activityCode" placeholder="请选择">
            <el-option v-for="(item,index) in activityCodes" :label="item.activityCode" :key="index"
                       :value="item.activityCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称:" size="mini">
          <el-input v-model.trim="reviewForm.companyNameCn" placeholder="请输入企业名称"></el-input>
        </el-form-item>

        <el-form-item label="产品编号:" size="mini">
          <el-input v-model.trim="reviewForm.productNo" placeholder="请输入产品编号"></el-input>
        </el-form-item>

        <el-form-item label="产品名称:" size="mini">
          <el-input v-model.trim="reviewForm.productNameCn" placeholder="请输入产品名称"></el-input>
        </el-form-item>

        <el-form-item label="状态:" size="mini">
          <el-select v-model="reviewForm.productStatus" placeholder="请选择">
            <el-option label="初评中" value="05"></el-option>
            <el-option label="初评不通过" value="07"></el-option>
            <el-option label="初评通过，请寄送产品实物" value="08"></el-option>
            <el-option label="收到产品实物，即将进入终评" value="09"></el-option>
            <el-option label="终评中" value="10"></el-option>
            <el-option label="终评通过" value="11"></el-option>
            <el-option label="终评不通过" value="12"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="searchPreEvaluationForm()">查询</el-button>
          <el-button type="primary" @click="resetPreEvaluationForm()">重置</el-button>
          <el-button type="primary" @click="generatorReviewProductList()">生成入围名单</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          ref="multipleTable"
          :data="reviewData"
          border
          style="width: 100%;">
          <el-table-column
            prop="companyNameCn"
            label="企业名称"
            align="center">
            <template slot-scope="scope">
              <router-link :to="{path:'/productInfomationDetail',query:{ showBtn: false, cfCompanyId: scope.row.cfCompanyId, awardProductId: scope.row.awardProductId, productStatus: scope.row.productStatus  }}">{{scope.row.companyNameCn}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="productNameCn"
            label="产品名称(中文)"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productNo"
            label="产品编号"
            align="center">
          </el-table-column>
          <el-table-column
            label="产品类别"
            align="center">
            <template slot-scope="scope">
              <span v-for="(item, index) in productCategorys" :key="index"
                    v-if="scope.row.productCategoryId === item.productCategoryId">{{item.productCategoryNameCn}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="votes"
            label="投票数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productStatus"
            label="状态"
            align="center">
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
        </el-table>
      </template>
      <el-pagination
        background
        class="pagination"
        @size-change="reviewFormSizeChange"
        @current-change="reviewFormCurrentChange"
        :current-page.sync="reviewForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="reviewForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalReviewFormDatas"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
    </el-tab-pane>

    <el-tab-pane label="产品入围名单" name="second">
      <el-form :inline="true" :model="candidateForm" ref="multipleTable2" class="demo-reviewForm">
        <el-form-item label="活动编号:" size="mini">
          <el-select v-model="candidateForm.activityCode" placeholder="请选择">
            <el-option v-for="(item,index) in activityCodes" :label="item.activityCode" :key="index"
                       :value="item.activityCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称:" size="mini">
          <el-input v-model.trim="candidateForm.companyNameCn" placeholder="请输入企业名称"></el-input>
        </el-form-item>

        <el-form-item label="产品编号:" size="mini">
          <el-input v-model.trim="candidateForm.productNo" placeholder="请输入产品编号"></el-input>
        </el-form-item>

        <el-form-item label="产品名称:" size="mini">
          <el-input v-model.trim="candidateForm.productNameCn" placeholder="请输入产品名称"></el-input>
        </el-form-item>

        <el-form-item label="状态:" size="mini">
          <el-select v-model="candidateForm.productStatus" placeholder="请选择">
            <el-option label="初评中" value="05"></el-option>
            <el-option label="初评不通过" value="07"></el-option>
            <el-option label="初评通过，请寄送产品实物" value="08"></el-option>
            <el-option label="收到产品实物，即将进入终评" value="09"></el-option>
            <el-option label="终评中" value="10"></el-option>
            <el-option label="终评通过" value="11"></el-option>
            <el-option label="终评不通过" value="12"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="searchReviewProductList()">查询</el-button>
          <el-button type="primary" @click="resetReviewProductList()">重置</el-button>
          <el-button type="primary" @click="reviewInitProductList()">初评初始名单</el-button>
        </el-form-item>
      </el-form>

      <template>
        <el-row class="btn-row">
          <el-button type="primary" @click="addProductCandidate()">新增入围产品</el-button>
          <el-button type="primary" @click="reviewPass()">初评通过请寄送产品</el-button>
          <el-button type="primary" @click="goPreliminary()">进入终评</el-button>
          <el-button type="primary" @click="buyerVetoPublish()">采购商投票发布</el-button>
          <el-button type="primary" @click="exportPreliminaryResult()">导出初评结果</el-button>
          <el-button type="primary" @click="" v-show="false">导出说明卡</el-button>
        </el-row>

        <el-table
          ref="multipleTable"
          :data="candidateData"
          stripe
          style="width: 100%;"
          @selection-change="handleSelectionChange">
          <el-table-column
            prop="companyNameCn"
            label="企业名称"
            width="200"
            align="center">
            <template slot-scope="scope">
              <router-link :to="{path:'/productInfomationDetail',query:{ showBtn: false, cfCompanyId: scope.row.cfCompanyId, awardProductId: scope.row.awardProductId, productStatus: scope.row.productStatus }}">{{scope.row.companyNameCn}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="productNameCn"
            label="产品名称(中文)"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productNo"
            label="产品编号"
            align="center">
          </el-table-column>
          <el-table-column
            label="产品类别"
            align="center">
            <template slot-scope="scope">
              <span v-for="(item,index) in productCategorys" :key="index"
                    v-if="scope.row.productCategoryId == item.productCategoryId">{{item.productCategoryNameCn}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="votes"
            label="投票数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productStatus"
            label="状态"
            align="center">
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
            label="操作"
            align="center"
            fixed="right"
            width="300">
            <template slot-scope="scope">
              <el-button v-if="scope.row.productStatus==='01'" type="text" size="mini" style="color: #8a8a8a;">二维码</el-button>
              <el-button v-else-if="scope.row.productStatus==='02'" type="text" size="mini" style="color: #8a8a8a;">二维码</el-button>
              <el-button v-else-if="scope.row.productStatus==='03'" type="text" size="mini" style="color: #8a8a8a;">二维码</el-button>
              <el-button v-else-if="scope.row.productStatus==='04'" type="text" size="mini" style="color: #8a8a8a;">二维码</el-button>
              <el-button v-else-if="scope.row.productStatus==='05'" type="text" size="mini" style="color: #8a8a8a;">二维码</el-button>
              <el-button v-else-if="scope.row.productStatus==='06'" type="text" size="mini" style="color: #8a8a8a;">二维码</el-button>
              <el-button v-else-if="scope.row.productStatus==='07'" type="text" size="mini" style="color: #8a8a8a;">二维码</el-button>
              <el-button v-else  @click="showEwm(scope.row, scope.index)" type="text" size="mini">二维码</el-button>
              <el-button @click="showUpdateStatus(scope.row, scope.index)" type="text" size="mini">更新状态</el-button>
              <el-button v-if="scope.row.productStatus==='05'"  @click="handledelete(scope.row, scope.index)" type="text" size="mini">删除</el-button>
              <el-button v-else style="color: #8a8a8a;" @click="" type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        background
        class="pagination"
        @size-change="candidateFormSizeChange"
        @current-change="candidateFormCurrentChange"
        :current-page.sync="candidateForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="candidateForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCandidateFormDatas"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
      <!--产品二维码弹窗-->
      <el-dialog title="产品二维码" :visible.sync="dialogQrCode" class="formProduct" >
        <div>
          <div ref="printarea">
            <img src="@/theme/framework/images/erweima-top.png" alt="" style="width: 80%;display: block;margin: 0 auto;">
            <div class="dialog-content">
              <img :src="qrCodeUrl" alt="" >
              <div>
                <div class="dialog-item">
                  <span>企业名称:</span>
                  <span>{{productInfo.companyNameCn}}</span>
                </div>
                <div class="dialog-item">
                  <span>产品名称:</span>
                  <span>{{productInfo.productNameCn}}</span>
                </div>
                <div class="dialog-item">
                  <span>产品编号:</span>
                  <span>{{productInfo.productNo}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="dialog-footer">
            <el-button type="primary" @click="printQrCode()">打 印</el-button>
            <el-button @click="dialogQrCode = false">关 闭</el-button>
          </div>
        </div>
      </el-dialog>

      <!--新增入围产品弹窗-->
      <el-dialog title="新增入围产品"  width="860px" :visible.sync="dialogProduct" @close='closeAddProductDialog'>
        <el-form :inline="true" :model="addProduct" class="demo-form-inline">
          <el-form-item label="企业名称" size="mini" label-width="70px">
            <el-input style="width: 150px" v-model.trim="addProduct.companyNameCn" placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item label="产品名称" size="mini" label-width="70px">
            <el-input style="width: 150px" v-model.trim="addProduct.productNameCn" placeholder="请输入产品名称">></el-input>
          </el-form-item>
          <el-form-item label="产品编号" size="mini" label-width="70px">
            <el-input style="width: 150px" v-model.trim="addProduct.productNo" placeholder="请输入产品编号">></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="searchCandidateProduct()">查询</el-button>
            <el-button type="primary" @click="resetCandidateProduct()">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="addcandidateProduct">
          <el-table-column align="center" property="date" label="序号" type="index" width="100"></el-table-column>
          <el-table-column align="center" property="companyNameCn" label="企业名称" width="170"></el-table-column>
          <el-table-column property="productNameCn" label="产品名称" width="150"></el-table-column>
          <el-table-column property="productNo" label="产品编号" width="150"></el-table-column>
          <el-table-column
            prop="votes"
            label="投票数"
            align="center">
          </el-table-column>
          <el-table-column property="address" label="操作">
            <template slot-scope="scope">
              <el-button @click="addCandidateProduct(scope.row.awardProductId)" type="text" size="mini">加入</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          class="dialogpagination"
          @size-change="productSearchSizeChange"
          @current-change="addProductSearchCurrentChange"
          :current-page.sync="addProduct.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="addProduct.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalProductSearchDatas"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
        <div class="dialog-footer">
          <el-button type="primary" @click="closeAddProductDialog">关  闭</el-button>
        </div>

      </el-dialog>

      <el-dialog title="初评初始名单"  width="860px" :visible.sync="dialogReview">
        <el-form :inline="true" :model="reviewSearch" class="demo-form-inline">
          <el-form-item label="企业名称" size="mini" label-width="70px">
            <el-input style="width: 150px" v-model.trim="reviewSearch.companyNameCn" placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item label="产品名称" size="mini" label-width="70px" >
            <el-input style="width: 150px" v-model.trim="reviewSearch.productNameCn"  placeholder="请输入产品名称"></el-input>
          </el-form-item>
          <el-form-item label="产品类别" size="mini" label-width="70px">
            <el-select style="width: 150px" v-model="reviewSearch.productCategoryId" placeholder="请选择">
              <el-option v-for="(item,index) in productCategorys" :label="item.productCategoryNameCn" :key="index"
                         :value="item.productCategoryId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="mini">
            <el-button  type="primary" @click="searchReviewInitList()">查询</el-button>
            <el-button  type="primary" @click="resetReviewInitList()">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="reviewInitList">
          <el-table-column property="date" label="序号" type="index" width="60"></el-table-column>
          <el-table-column align="center"  property="companyNameCn" label="企业名称" width="170"></el-table-column>
          <el-table-column property="productNameCn" label="产品名称" width="150"></el-table-column>
          <el-table-column property="productNo" label="产品编号" width="120"></el-table-column>
          <el-table-column
            label="产品类别"
            align="center">
            <template slot-scope="scope">
              <span v-for="(item,index) in productCategorys" :key="index"
                    v-if="scope.row.productCategoryId == item.productCategoryId">{{item.productCategoryNameCn}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="votes"
            label="投票数"
            align="center">
          </el-table-column>
        </el-table>
        <el-pagination
          small
          background
          class="dialogpagination"
          @size-change="handleReviewSearchSizeChange"
          @current-change="reviewSearchCurrentChange"
          :current-page.sync="reviewSearch.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="reviewSearch.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalReviewSearchDatas"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
        <div class="dialog-footer">
          <el-button @click="dialogReview = false">关 闭</el-button>
        </div>
      </el-dialog>

      <el-dialog title="选择" :visible.sync="updateSelectVisible" center>
        <el-form :model="updateform">
          <el-form-item label="选择状态" :label-width="200">
            <el-select v-model="updateform.status" placeholder="请选择">
              <el-option label="初评不通过" value="07"></el-option>
              <el-option label="初评通过，请寄送产品实物" value="08"></el-option>
              <el-option label="收到产品实物，即将进入终评" value="09"></el-option>
              <el-option label="终评中" value="10"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateSelectVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateProductStatus()">确 定</el-button>
        </div>
      </el-dialog>

    </el-tab-pane>
  </el-tabs>

</template>

<script>
  import http from "@/scripts/framework/http";

  export default {
    name: "productReviewList",
    data() {
      return {
        totalReviewSearchDatas: 0,
        totalReviewFormDatas: 0,
        totalCandidateFormDatas: 0,
        totalProductSearchDatas: 0,

        activeName: 'first',
        centerDialogVisible: false,
        multipleSelection: '',
        productCategorys: [],  // 产品种类列表
        activityCodes: [],  // 活动列表对应的活动编号
        reviewData: [],
        candidateData: [],
        addcandidateProduct: [],
        reviewInitList: [],
        qrCodeUrl: '',
        dialogQrCode: false,
        dialogProduct: false,
        dialogReview: false,
        addProduct: {
          activityCode: '',
          companyNameCn: '',
          productNo: '',
          productNameCn: '',
          current: 1,
          size: 10
        },
        current: '',
        reviewSearch: {
          activityCode: '',
          companyNameCn: '',
          productNameCn: '',
          productCategoryId: '',
          current: 1,
          size: 10
        },
        reviewForm: {
          activityCode: '',
          companyNameCn: '',
          productNo: '',
          productNameCn: '',
          productStatus: '',
          current: 1,
          size: 10
        },
        candidateForm: {
          activityCode: '',
          companyNameCn: '',
          productNo: '',
          productNameCn: '',
          productStatus: '',
          current: 1,
          size: 10
        },
        productInfo: {
          companyNameCn: '',
          productNameCn: '',
          productNo: ''
        },
        updateSelectVisible: false,
        updateform: {
          awardProductId: '',
          status: ''
        },
        baseApi: process.env.API_CF_URL
      };
    },
    mounted() {
      this.initPageData();
    },
    methods: {
      initPageData() {
        this.getActivityList();
      },
      closeAddProductDialog() {
        this.dialogProduct = false;
        // 重新获取初评列表
        this.searchReviewProductList();
      },
      // 获取初始的初评产品列表数据
      getProductListData(params) {
        http.get(this.baseApi + '/api/customservice/cf/listFirstProduct', params).then(res => {
          this.reviewData = res.records;
          this.totalReviewFormDatas = res.total;
        }).catch(error => {

        });
      },
      // 获取所有的产品分类信息
      getProductCategoryInfo(activityCode) {
        http.get(this.baseApi + '/api/customservice/cf/listProductCategory', {
          activityCode: activityCode
        }).then(res => {
          this.productCategorys = res.records;
        }).catch(error => {

        });
      },
      // 获取活动列表
      getActivityList() {
        http.get(this.baseApi + '/api/customservice/cf/getCfActivityCode').then(res => {
          //http.get(this.baseApi + '/api/customservice/cf/listCfActivity').then(res => {
          this.activityCodes = res.records;
          this.reviewForm.activityCode = this.activityCodes[0].activityCode;
          this.candidateForm.activityCode = this.activityCodes[0].activityCode;
          this.addProduct.activityCode = this.activityCodes[0].activityCode;
          this.reviewSearch.activityCode = this.activityCodes[0].activityCode;
          this.getProductCategoryInfo(this.activityCodes[0].activityCode);
          this.getProductListData(this.reviewForm);
        }).catch(error => {

        });
      },
      // 查询初评列表
      searchPreEvaluationForm() {
        let activityCode = this.reviewForm.activityCode ? this.reviewForm.activityCode : this.activityCodes[this.activityCodes.length - 1].activityCode;
        this.getProductCategoryInfo(activityCode);
        this.getProductListData(this.reviewForm);
      },
      // 查询初始入围名单
      searchReviewProductList() {
        let activityCode = this.candidateForm.activityCode ? this.candidateForm.activityCode : this.activityCodes[this.activityCodes.length - 1].activityCode;
        this.getProductCategoryInfo(activityCode);
        this.getReviewProductList(this.candidateForm);
      },
      // 初评入围名单获取
      getReviewProductList(params) {
        http.get(this.baseApi + '/api/customservice/cf/listFirstReview', params).then(res => {
          this.candidateData = res.records;
          this.totalCandidateFormDatas = res.total;
        }).catch(error => {
        });
      },
      // 生成入围名单获取
      generatorReviewProductList() {
        this.showDialogTips("此操作将重新生成入围名单, 之前数据将清空, 是否继续?").then(() => {
          http.post(this.baseApi + '/api/customservice/cf/generateFirstSelectedList').then(res => {
            this.$message.success("生成入围名单成功");
            this.activeName = 'second';
            this.getReviewProductList(this.candidateForm);
          }).catch(error => {

          });
        }).catch(() => {});
      },
      // 初评初始名单列表
      getReviewInitList() {
        http.get(this.baseApi + '/api/customservice/cf/listFirstInitialReview', this.reviewSearch).then(res => {
          this.reviewInitList = res.records;
          this.totalReviewSearchDatas = res.total;
        }).catch(error => {});
      },
      searchReviewInitList() {
        this.getReviewInitList();
      },
      // 是否记忆页面选择的条件
      handleClick(tab, event) {
        if (tab.index === '0') {
          this.reviewForm.current = 1;
          this.getProductListData(this.reviewForm);
        } else {
          this.candidateForm.current = 1;
          this.getReviewProductList(this.candidateForm);
        }
      },
      // 表格选择框
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 显示二维码
      showEwm(row, index) {
        this.createEwm(row.awardProductId);
        // 修改对应的企业名称
        this.productInfo.companyNameCn = row.companyNameCn;
        this.productInfo.productNameCn = row.productNameCn;
        this.productInfo.productNo = row.productNo;
        this.dialogQrCode = true;
      },
      // 生成二维码
      createEwm(awardProductId) {
        http.post(this.baseApi + '/api/customservice/cf/generateProductQRCode', { awardProductId: awardProductId }).then(res => {
          this.qrCodeUrl = "data:image/jpeg;base64," + res;
        }).catch(error => {
        });
      },
      // 打印二维码
      printQrCode() {
        this.$print(this.$refs.printarea);
      },
      // 初评初始名单
      reviewInitProductList() {
        this.dialogReview = true;
        this.getReviewInitList();
      },
      // 新增入围产品dialog
      addProductCandidate() {
        this.dialogProduct = true;
        this.searchCandidateProduct();
      },
      // 查询需要添加入围的产品
      searchCandidateProduct() {
        http.get(this.baseApi + '/api/customservice/cf/getAddFirstList', this.addProduct).then(res => {
          this.addcandidateProduct = res.records;
          this.totalProductSearchDatas = res.total;
        }).catch(error => {

        });
      },
      // 添加入围产品
      addCandidateProduct(awardProductId) {
        let data = {
          awardProductIds: awardProductId
        };
        http.post(this.baseApi + '/api/customservice/cf/addFirstList', data).then(res => {
          this.$message.success("加入成功");
          this.searchCandidateProduct();
        }).catch(error => {
        });
      },
      // 显示状态更新窗口
      showUpdateStatus(row, index) {
        this.updateSelectVisible = true;
        this.updateform.status = '';
        this.updateform.awardProductId = row.awardProductId;
      },
      // 更新状态
      updateProductStatus() {
        this.updateSelectVisible = false;
        http.post(this.baseApi + '/api/customservice/cf/updateFirstList', this.updateform).then(data => {
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          this.getReviewProductList(this.candidateForm);
        }).catch(error => {

        });
      },
      // 删除
      handledelete(row, index) {
        http.post(this.baseApi + '/api/customservice/cf/deleteFirstList', {
          awardProductId: row.awardProductId
        }).then(data => {
          // 重新获取数据
          this.searchReviewProductList();
        }).catch(error => {
        });
      },

      /*
       *  页面分页信息处理
       */
      // 入围产品分页---size变化
      handleReviewSearchSizeChange(pageSize) {
        this.reviewSearch.size = pageSize;
      },
      // 入围产品列表---处理下一页信息
      reviewSearchCurrentChange(currentPage) {
        this.reviewSearch.current = currentPage;
        this.getReviewInitList();
      },
      // 添加入围产品查询列表---size处理
      productSearchSizeChange(pageSize) {
        this.addProduct.size = currentPage;
        this.searchCandidateProduct();
      },
      // 添加入围产品查询列表---翻页处理
      addProductSearchCurrentChange(currentPage) {
        this.addProduct.current = currentPage;
        this.searchCandidateProduct();
      },
      // 初评列表---size处理
      reviewFormSizeChange(pageSize) {
        this.reviewForm.size = pageSize;
        this.getProductListData(this.reviewForm);
      },
      // 初评列表---翻页处理
      reviewFormCurrentChange(currentPage) {
        this.reviewForm.current = currentPage;
        this.getProductListData(this.reviewForm);
      },
      // 产品入围名单---size处理
      candidateFormSizeChange(pageSize) {
        this.candidateForm.size = pageSize;
        this.getReviewProductList(this.candidateForm);
      },
      // 产品入围名单---翻页处理
      candidateFormCurrentChange(currentPage) {
        this.candidateForm.current = currentPage;
        this.getReviewProductList(this.candidateForm);
      },
      // 初评通过请寄送产品
      reviewPass() {
        this.showDialogTips("是否进行初评通过操作?").then(() => {
          http.post(this.baseApi + '/api/customservice/cf/passFirstList').then((res) => {
            this.getReviewProductList(this.candidateForm);
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => {});
      },
      // 进入终评
      goPreliminary() {
        this.showDialogTips("是否进入终评?").then(() => {
          http.post(this.baseApi + '/api/customservice/cf/confirmIntoLastList').then((res) => {
            this.$message.success("进入终评成功");
            this.getReviewProductList(this.candidateForm);
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => { });
      },
      // 采购商投票发布
      buyerVetoPublish() {
        this.showDialogTips("确认进行采购商发布?").then(() => {
          http.post(this.baseApi + '/api/customservice/cf/generatePublicRecordList').then((res) => {
            this.$message.success("采购商投票发布成功");
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => { });
      },
      // 导出初评结果
      exportPreliminaryResult() {
        this.excelDownload('/api/customservice/cf/downListFirstReviewExcel', this.candidateForm);
      },
      excelDownload(url, formData) {
        // let publishApi = "http://139.9.71.183:9014";
        let excelUrl = this.baseApi + url + '?';
        for (let item in formData) {
          excelUrl = excelUrl + item + "=" + formData[item] + "&";
        }
        excelUrl = excelUrl.substring(0, excelUrl.length - 1);
        window.open(excelUrl);
      },
      // 重置初评列表搜索表单
      resetPreEvaluationForm() {
        this.resetFormData(this.reviewForm);
      },
      // 重置入围列表搜索表单
      resetReviewProductList() {
        this.resetFormData(this.candidateForm);
      },
      // 重置新增入围产品搜索表单
      resetCandidateProduct() {
        this.resetFormData(this.addProduct);
      },
      // 重置初评初始名单搜索表单
      resetReviewInitList() {
        this.resetFormData(this.reviewSearch);
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
  .btn-row {
    margin: 10px;
  }

  .dialog-footer {
    text-align: center;
    margin: 20px 0;
    padding-bottom: 10px;
  }

  .dialog-content {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dialog-content .dialog-item {
    margin: 25px 0;
  }

  .dialog-content img{
    height: 180px;
    width: 180px;
    margin: 0 20px;
  }
  .dialog-item:nth-child(1){
    color: #3A3A3A;
  }

  .dialogpagination{
    margin: 10px auto;
    text-align: center;
  }

  .pagination{
    margin: 10px auto;
    text-align: center;
  }
</style>
