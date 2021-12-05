/**
* @file 产品终评列表 + 产品入围名单
* @author:wanglifeng
* @date:2019/1/30
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="产品终评列表" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="活动编号:" size="mini">
          <el-select v-model="ruleForm.activityCode" placeholder="请选择">
            <el-option v-for="(item, index) in activityCodes" :key="index" :label="item.activityCode" :value="item.activityCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称:" size="mini">
          <el-input v-model="ruleForm.companyName" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="产品编号:" size="mini">
          <el-input v-model="ruleForm.productNo" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="产品名称:" size="mini">
          <el-input v-model="ruleForm.productName" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="状态:" size="mini">
          <el-select v-model="ruleForm.status" placeholder="请选择">
            <el-option label="终评中" value="10"></el-option>
            <el-option label="终评通过" value="11"></el-option>
            <el-option label="终评不通过" value="12"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
          <el-button type="primary" @click="resetForm()">重置</el-button>
          <el-button type="primary" @click="generateShortlist">生成入围名单</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%;">
          <el-table-column
            prop="companyNameCn"
            label="企业名称"
            align="center">
            <template slot-scope="scope">
              <span class="blue-underline" @click="goCompanyDetail(scope.row, scope.index)">{{scope.row.companyNameCn}}</span>
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
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="productCategoryNameCn"
            label="产品类别"
            align="center">
            <!--<template slot-scope="scope">-->
            <!--</template>-->
          </el-table-column>
          <el-table-column
            prop="score"
            label="评分"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="productStatus"
            label="状态"
            align="center"
            width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.productStatus==10">终评中</span>
              <span v-else-if="scope.row.productStatus==11">终评通过</span>
              <span v-else-if="scope.row.productStatus==12">终评不通过</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="awardLevel"
            label="奖项"
            align="center"
            width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.awardLevel == 0">未获奖</span>
              <span v-else-if="scope.row.awardLevel == 1">至尊金奖</span>
              <span v-else-if="scope.row.awardLevel == 2">金奖</span>
              <span v-else-if="scope.row.awardLevel == 3">银奖</span>
              <span v-else-if="scope.row.awardLevel == 4">铜奖</span>
              <span v-else-if="scope.row.awardLevel == 5">入围奖</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            width="90">
            <template slot-scope="scope">
              <el-button @click="showEwm(scope.row, scope.index)" type="text" size="mini">二维码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageInfo.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
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
    </el-tab-pane>
    <el-tab-pane label="产品入围名单" name="second">
      <el-form :inline="true" :model="ruleForm2" class="demo-ruleForm">
        <el-form-item label="活动编号:" size="mini">
          <el-select v-model="ruleForm2.activityCode" placeholder="请选择">
            <el-option v-for="(item, index) in activityCodes" :key="index" :label="item.activityCode" :value="item.activityCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称:" size="mini">
          <el-input v-model="ruleForm2.companyName" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="产品编号:" size="mini">
          <el-input v-model="ruleForm2.productNo" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="产品名称:" size="mini">
          <el-input v-model="ruleForm2.productName" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="状态:" size="mini">
          <el-select v-model="ruleForm2.status" placeholder="请选择">
            <el-option label="终评中" value="10"></el-option>
            <el-option label="终评通过" value="11"></el-option>
            <el-option label="终评不通过" value="12"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm2()">查询</el-button>
          <el-button type="primary" @click="resetForm2">重置</el-button>
          <el-button type="primary" @click="showInitialList()">终评初始名单</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-row class="btn-row">
          <el-button type="primary" @click="showAddProduct()">新增入围产品</el-button>
          <el-button type="primary" :disabled="multipleSelection.length !== 1" @click="getAward">所获奖项</el-button>
          <el-button type="primary" :disabled="multipleSelection.length < 1" @click="initiateVote(1)">发起投票</el-button>
          <el-button type="primary" :disabled="multipleSelection.length < 1" @click="voteAgain">重新投票</el-button>
          <el-button type="primary" @click="reviewPass">终评通过</el-button>
          <el-button type="primary" @click="savePublicRecord">在线展示发布</el-button>
          <el-button type="primary" @click="exportData">导出</el-button>
          <el-button type="primary" :disabled="multipleSelection.length !== 1" @click="downAward">下载获奖证书</el-button>
        </el-row>
        <el-table
          :data="tableData2"
          border
          style="width: 100%;"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="companyNameCn"
            label="企业名称"
            align="center"
            width="220">
            <template slot-scope="scope">
              <span class="blue-underline" @click="goCompanyDetail(scope.row, scope.index)">{{scope.row.companyNameCn}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="productNameCn"
            label="产品名称(中文)"
            align="center"
            width="220">
          </el-table-column>
          <el-table-column
            prop="productNo"
            label="产品编号"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="productCategoryNameCn"
            label="产品类别"
            align="center"
            width="140">
          </el-table-column>
          <el-table-column
            prop="score"
            label="评分"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="productStatus"
            label="状态"
            align="center"
            width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.productStatus=='10'">终评中</span>
              <span v-else-if="scope.row.productStatus=='11'">终评通过</span>
              <span v-else-if="scope.row.productStatus=='12'">终评不通过</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="awardLevel"
            label="奖项"
            align="center"
            width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.awardLevel == 0">未获奖</span>
              <span v-else-if="scope.row.awardLevel == 1">至尊金奖</span>
              <span v-else-if="scope.row.awardLevel == 2">金奖</span>
              <span v-else-if="scope.row.awardLevel == 3">银奖</span>
              <span v-else-if="scope.row.awardLevel == 4">铜奖</span>
              <span v-else-if="scope.row.awardLevel == 5">入围奖</span>
            </template>
          </el-table-column>
          <el-table-column
            label="评议投票结果"
            align="center">
            <el-table-column
              prop="agree"
              label="赞成"
              align="center"
              width="60">
            </el-table-column>
            <el-table-column
              prop="disagree"
              label="反对"
              align="center"
              width="60">
            </el-table-column>
            <el-table-column
              prop="abstention"
              label="弃权"
              align="center"
              width="60">
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            width="180">
            <template slot-scope="scope">
              <el-button @click="initiateVote(scope.row, scope.index)" type="text" size="mini">发起投票</el-button>
              <el-button @click="voteAgain(scope.row, scope.index)" type="text" size="mini">重新投票</el-button>
              <el-button @click="voteList(scope.row, scope.index)" type="text" size="mini">查看评议投票</el-button>
              <el-button :disabled="scope.row.productStatus!=='10'" @click="handledelete(scope.row, scope.index)" type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          class="paging"
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page.sync="pageInfo2.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageInfo2.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo2.total"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </template>
      <!--新增入围产品弹窗-->
      <el-dialog title="新增入围产品" :visible.sync="dialogProduct" width="80%">
        <el-form :inline="true" :model="addProduct" label-width="80px" class="demo-form-inline">
          <el-form-item label="企业名称:" size="mini">
            <el-input v-model="addProduct.companyNameCn" placeholder="请输入内容" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="产品名称" size="mini">
            <el-input v-model="addProduct.productNameCn" placeholder="请输入" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="产品编号" size="mini">
            <el-input v-model="addProduct.productNo" placeholder="请输入" style="width: 130px;"></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="addProductSubmit">查询</el-button>
            <el-button type="primary" @click="resetAddProduct">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="gridData">
          <el-table-column label="序号" align="center" type="index" width="60"></el-table-column>
          <el-table-column prop="companyNameCn" label="企业名称" align="center"></el-table-column>
          <el-table-column prop="productNameCn" label="产品名称" align="center"></el-table-column>
          <el-table-column prop="productNo" label="产品编号" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleJoin(scope.row.awardProductId)" type="text" size="mini">加入</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          style="margin: 10px auto;text-align: center;"
          @size-change="handleSizeChange3"
          @current-change="handleCurrentChange3"
          :current-page.sync="pageInfo3.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageInfo3.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo3.total"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
        <div class="dialog-footer">
          <el-button type="primary" @click="dialogProduct = false">关 闭</el-button>
        </div>
      </el-dialog>
      <!-- 终评初始名单弹窗 -->
      <el-dialog title="终评初始名单" :visible.sync="digInitialList" width="80%">
        <el-form :inline="true" :model="initialList" label-width="80px" class="demo-form-inline">
          <el-form-item label="企业名称:" size="mini">
            <el-input v-model="initialList.companyNameCn" placeholder="请输入内容" style="width: 115px"></el-input>
          </el-form-item>
          <el-form-item label="产品名称" size="mini">
            <el-input v-model="initialList.productNameCn" style="width: 115px"></el-input>
          </el-form-item>
          <el-form-item label="产品类别" size="mini">
            <el-select v-model="initialList.productCategoryId" placeholder="请选择" style="width: 115px">
              <el-option v-for="(item, index) in productCategorys" :key="index" :label="item.productCategoryNameCn" :value="item.productCategoryId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="initialListSubmit">查询</el-button>
            <el-button type="primary" @click="resetInitalList">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="initialListData">
          <el-table-column label="序号" type="index" width="60"></el-table-column>
          <el-table-column prop="companyNameCn" label="企业名称" width="150"></el-table-column>
          <el-table-column prop="productNameCn" label="产品名称" width="120"></el-table-column>
          <el-table-column prop="productNo" label="产品编号" width="150"></el-table-column>
          <el-table-column prop="productCategoryId" label="产品类别" width="150">
            <template slot-scope="scope">
              <span v-for="(item, index) in productCategorys" :key="index">
                <span v-if="scope.row.productCategoryId===item.productCategoryId">{{item.productCategoryNameCn}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="score" label="评分"></el-table-column>
        </el-table>
        <el-pagination
          class="paging"
          @size-change="handleSizeChange4"
          @current-change="handleCurrentChange4"
          :current-page.sync="pageInfo4.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageInfo4.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo4.total"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
        <div class="dialog-footer">
          <el-button @click="digInitialList = false">关闭</el-button>
        </div>
      </el-dialog>
      <!-- 所获奖项弹窗 -->
      <el-dialog title="产品获得奖项" :visible.sync="digReceivedAward" width="350px">
        <el-form :model="receivedAwards" class="demo-form-inline">
          <el-form-item label="所获奖项">
            <el-select v-model="receivedAwards.awardLevel" placeholder="请选择" size="mini">
              <!--<el-option v-for="(item, index) in productCategorys" :key="index" :label="item.productCategoryNameCn" :value="item.productCategoryId"></el-option>-->
              <el-option label="未获奖" value="0">未获奖</el-option>
              <el-option label="至尊金奖" value="1">至尊金奖</el-option>
              <el-option label="金奖" value="2">金奖</el-option>
              <el-option label="银奖" value="3">银奖</el-option>
              <el-option label="铜奖" value="4">铜奖</el-option>
              <el-option label="入围奖" value="5">入围奖</el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitReceivedAward">确认</el-button>
          <el-button @click="digReceivedAward = false">取消</el-button>
        </div>
      </el-dialog>
      <!-- 评议投票弹窗 -->
      <el-dialog title="评议投票" :visible.sync="diaVoteList" width="500px">
        <el-row>
          <h4 style="font-size: 17px;margin: 5px auto;text-align: center;">产品名称：{{voteList.productNameCn}}</h4>
        </el-row>
        <el-table :data="voteListData">
          <el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
          <el-table-column prop="name_cn" align="center" label="评审专家"></el-table-column>
          <el-table-column prop="type" align="center" label="投票情况">
            <template slot-scope="scope">
              <span v-if="scope.row.type == '0'">赞成</span>
              <span v-else-if="scope.row.type == '1'">反对</span>
              <span v-else-if="scope.row.type == '2'">弃权</span>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          class="paging"
          @size-change="handleSizeChange5"
          @current-change="handleCurrentChange5"
          :current-page.sync="VoteList.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="VoteList.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="VoteList.total"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
        <div class="dialog-footer">
          <el-button @click="diaVoteList = false">关闭</el-button>
        </div>
      </el-dialog>

    </el-tab-pane>
  </el-tabs>

</template>

<script>
  export default {
    name: "productReviewListEnd",
    data() {
      return {
        activeName: 'first',
        multipleSelection: [],
        activityCodes: [],
        productCategorys: [],
        allCountrys: [],
        gridData: [],
        tableData2: [],
        tableData: [],
        initialListData: [],
        voteListData: [], // 评议投票弹窗列表数据
        receivedAwards: {
          awardLevel: '0'
        },
        // 二维码图片路径
        qrCodeUrl: '',
        // 显示二维码
        productInfo: {
          companyNameCn: '',
          productName: '',
          productNo: ''
        },
        // 分页1
        pageInfo: {
          current: 1,
          size: 10,
          total: 0
        },
        // 分页2
        pageInfo2: {
          current: 1,
          size: 10,
          total: 0
        },
        // 分页3
        pageInfo3: {
          current: 1,
          size: 10,
          total: 0
        },
        // 分页4
        pageInfo4: {
          current: 1,
          size: 10,
          total: 0
        },
        dialogQrCode: false,
        dialogProduct: false,
        digInitialList: false,
        digReceivedAward: false, // 所获奖项
        diaVoteList: false, // 终评评议列表
        // 新增入围产品弹窗
        addProduct: {
          companyNameCn: '',
          productNo: '',
          productNameCn: ''
        },
        // 终评初始名单弹窗
        initialList: {
          companyNameCn: '',
          productCategoryId: '',
          productNameCn: ''
        },
        ruleForm: {
          activityCode: '',
          companyName: '',
          productNo: '',
          productName: '',
          status: ''
        },
        ruleForm2: {
          activityCode: '',
          companyName: '',
          productNo: '',
          productName: '',
          status: ''
        },
        VoteList: {
          productNameCn: '',
          current: 1,
          size: 10,
          total: 0
        },
        baseApi: process.env.API_CF_URL
        // baseApi: 'http://192.168.1.101:9014'
      };
    },
    methods: {
      handleJoin(awardProductId) {
        let data = {
          awardProductId: awardProductId
        };
        this.$http.post(this.baseApi + '/api/customservice/cf/addFinalList', data).then(res => {
          this.$message({
            message: '加入成功！',
            type: 'success'
          });
          this.addProductSubmit();
          this.getListFinalReview();
        }).catch(err => {
        });
      },
      // 获取活动编号
      getActivityList() {
        this.$http.get(this.baseApi + '/api/customservice/cf/getCfActivityCode').then(res => {
          this.activityCodes = res.records;
          this.ruleForm.activityCode = this.activityCodes[0].activityCode;
          this.ruleForm2.activityCode = this.activityCodes[0].activityCode;
          this.getProductCategoryInfo();
          this.getListFinalReview();
          this.getListFinalProduct();
        }).catch(error => {
        });
      },
      // 获取所有的产品类别信息
      getProductCategoryInfo() {
        let params = {
          activityCode: this.ruleForm.activityCode
        };
        this.$http.get(this.baseApi + '/api/customservice/cf/listProductCategory', params).then(res => {
          this.productCategorys = res.records;
        }).catch(error => {
        });
      },
      // 获取终评产品列表
      getListFinalProduct() {
        let params = {
          current: this.pageInfo.current,
          size: this.pageInfo.size,
          activityCode: this.ruleForm.activityCode,
          companyNameCn: this.ruleForm.companyName,
          productNo: this.ruleForm.productNo,
          productNameCn: this.ruleForm.productName,
          productStatus: this.ruleForm.status
        };
        this.$http.get(this.baseApi + '/api/customservice/cf/listFinalProduct', params).then(res => {
          this.tableData = res.records;
          this.pageInfo.total = res.total;
        }).catch(err => {
        });
      },
      // 获取终评入围名单
      getListFinalReview() {
        let data = {
          current: this.pageInfo2.current,
          size: this.pageInfo2.size,
          activityCode: this.ruleForm2.activityCode,
          companyNameCn: this.ruleForm2.companyName,
          productNo: this.ruleForm2.productNo,
          productNameCn: this.ruleForm2.productName,
          stage: this.ruleForm2.status
        };
        this.$http.get(this.baseApi + '/api/customservice/cf/listFinalReview', data).then(res => {
          this.tableData2 = res.records;
          this.pageInfo2.total = res.total;
        }).catch(err => {
        });
      },
      // 显示终评初始名单
      showInitialList() {
        this.digInitialList = true;
        this.getProductCategoryInfo();
        this.initialListSubmit(2);
      },
      // 跳转到企业详情
      goCompanyDetail(row, index) {
        this.$router.push({
          path: '/productInfomationDetail',
          query: {
            showBtn: false,
            cfCompanyId: row.cfCompanyId,
            awardProductId: row.awardProductId,
            productStatus: row.productStatus
          }
        });
      },
      // 产品终评列表查询
      submitForm() {
        this.pageInfo.current = 1;
        this.getListFinalProduct();
      },
      // 产品入围名单查询
      submitForm2() {
        this.pageInfo2.current = 1;
        this.getListFinalReview();
      },
      // 重置表单
      resetForm() {
        this.ruleForm.activityCode = this.activityCodes[0].activityCode;
        this.ruleForm.companyName = '';
        this.ruleForm.productNo = '';
        this.ruleForm.productName = '';
        this.ruleForm.status = '';
      },
      resetForm2() {
        this.ruleForm2.activityCode = this.activityCodes[0].activityCode;
        this.ruleForm2.companyName = '';
        this.ruleForm2.productNo = '';
        this.ruleForm2.productName = '';
        this.ruleForm2.status = '';
      },
      resetInitalList() {
        this.initialList.companyNameCn = '';
        this.initialList.productCategoryId = '';
        this.initialList.productNameCn = '';
      },
      resetAddProduct() {
        this.addProduct.companyNameCn = '';
        this.addProduct.productNo = '';
        this.addProduct.productNameCn = '';
      },
      // 生成入围名单
      generateShortlist() {
        this.$confirm('此操作将重新生成入围名单，之前数据将清空, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            activityCode: this.ruleForm.activityCode
          };
          this.$http.post(this.baseApi + '/api/customservice/cf/finalAppraisalList', data).then(res => {
            this.getListFinalReview();
            this.activeName = 'second';
          }).catch(err => {
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      // 新增入围产品
      showAddProduct() {
        this.addProductSubmit();
      },
      // 新增入围名单查询
      addProductSubmit() {
        let params = {
          current: this.pageInfo3.current,
          size: this.pageInfo3.size,
          companyNameCn: this.addProduct.companyNameCn,
          productNameCn: this.addProduct.productNameCn,
          productNo: this.addProduct.productNo
        };
        this.$http.get(this.baseApi + '/api/customservice/cf/listFinalUnReview', params).then(res => {
          this.gridData = res.records;
          this.pageInfo3.total = res.total;
          this.dialogProduct = true;
        }).catch(err => {
        });
      },
      // 所获奖项 终评评议奖项修改
      getAward() {
        if (this.multipleSelection.length === 1) {
          this.digReceivedAward = true;
        } else if (this.multipleSelection.length > 1) {
          this.$message({
            message: '您只能选中任何一款产品！',
            type: 'warning'
          });
        } else {
          this.$message({
            message: '您没有选中任何一款产品，请先选择产品！',
            type: 'warning'
          });
        }
      },
      // 确认奖项
      submitReceivedAward() {
        let awardProductId = null;
        let productCategoryId = null;
        let activityCode = null;
        this.multipleSelection.forEach((item) => {
          activityCode = item.activityCode;
          awardProductId = item.awardProductId;
          productCategoryId = item.productCategoryId;
        });
        let obj = {
          activityCode: activityCode,
          awardProductId: awardProductId,
          awardLevel: this.receivedAwards.awardLevel,
          productCategoryId: productCategoryId
        };
        this.$http.post(this.baseApi + '/api/customservice/cf/finalDiscussUpdateVote', obj).then(res => {
          this.$message({
            message: '奖项设置成功',
            type: 'success'
          });
          this.getListFinalReview();
          this.digReceivedAward = false;
        }).catch(err => {
        });
      },
      // 发起投票 终评评议发起投票
      initiateVote(row) {
        let data = [];
        let activityCode = null;
        if (row === 1) {
          if (this.multipleSelection.length < 1) {
            this.$message.error('请先在表格中选择产品！');
          } else {
            this.multipleSelection.forEach((item) => {
              data.push(item.awardProductId);
            });
            activityCode = this.multipleSelection[0].activityCode;
            let params = {
              ids: data.join(),
              activityCode: activityCode
            };
            this.$confirm('是否确定发起投票?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.post(this.baseApi + '/api/customservice/cf/finalDiscussInitiateVote', params).then(res => {
                this.$message({
                  type: 'success',
                  message: '发起投票成功!'
                });
                this.getListFinalReview();
              }).catch(err => {
              });
            }).catch(() => {
            });
          }
        } else {
          data.push(row.awardProductId);
          let params = {
            ids: data.join()
          };
          this.$confirm('是否确定发起投票?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post(this.baseApi + '/api/customservice/cf/finalDiscussInitiateVote', params).then(res => {
              this.$message({
                type: 'success',
                message: '发起投票成功!'
              });
            }).catch(err => {
            });
          }).catch(err2 => {
          });
        }
      },
      // 重新投票
      voteAgain(row) {
        let data = [];
        let activityCode = null;
        if (!row.awardProductId) {
          if (this.multipleSelection.length > 0) {
            this.multipleSelection.forEach((item) => {
              data.push(item.awardProductId);
            });
            activityCode = this.multipleSelection[0].activityCode;
          } else {
            this.$message.error('请先在表格中选择产品！');
            return;
          }
        } else {
          data.push(row.awardProductId);
          activityCode = row.activityCode;
        }
        this.finalDiscussResetVote(data, activityCode);
      },
      finalDiscussResetVote(data, activityCode) {
        let params = {
          ids: data.join(),
          activityCode: activityCode
        };
        this.$confirm('是否确定重新投票?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.baseApi + '/api/customservice/cf/finalDiscussResetVote', params).then(res => {
            this.$message({
              type: 'success',
              message: '发起重新投票成功!'
            });
            this.getListFinalReview();
          }).catch(err => {
          });
        }).catch(() => {
        });
      },
      // 终评通过
      reviewPass() {
        this.$confirm('是否确定终评通过，结束终评阶段?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            activityCode: this.ruleForm2.activityCode
          };
          this.$http.post(this.baseApi + '/api/customservice/cf/finalAdoption', params).then(res => {
            this.$message({
              type: 'success',
              message: '终评通过!'
            });
            this.getListFinalReview();
            this.getListFinalProduct();
          }).catch(err => {
          });
        }).catch(() => {
        });
      },
      // 导出终评结果
      exportData() {
        this.excelDownload('/api/customservice/cf/downListFinalReviewExcel', this.ruleForm2);
      },
      excelDownload(url, formData) {
        let excelUrl = this.baseApi + url + '?';
        for (let item in formData) {
          excelUrl = excelUrl + item + "=" + formData[item] + "&";
        }
        excelUrl = excelUrl.substring(0, excelUrl.length - 1);
        window.open(excelUrl);
      },
      // 下载获奖证书  改成可多选
      downAward() {
        let data = null;
        if (this.multipleSelection.length === 1) {
          this.multipleSelection.forEach((item) => {
            data = item.awardProductId;
          });
          this.$http.get(this.baseApi + '/api/customservice/cf/ifAward?awardProductId=' + data).then(res => {
            window.open(this.baseApi + '/api/customservice/cf/downAeardPfd?awardProductId=' + data);
          });
        } else {
          this.$message.error('请先在表格中选择一种个产品！');
        }
      },
      // 终评评议投票列表
      voteList(row, index) {
        this.voteList.productNameCn = row.productNameCn;
        this.diaVoteList = true;
        let params = {
          awardProductId: row.awardProductId,
          current: this.VoteList.current,
          size: this.VoteList.size
        };
        this.$http.get(this.baseApi + '/api/customservice/cf/finalDiscussVoteRecord', params).then(res => {
          this.voteListData = res.records;
          this.VoteList.total = res.total;
        }).catch(err => {
        });
      },
      // 在线展示发布
      savePublicRecord() {
        let data = [];
        this.multipleSelection.forEach((item, index) => {
          data.push(item.activityCode);
        });
        this.$confirm('是否确定在线展示发布?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.baseApi + '/api/customservice/cf/savePublicRecord', data).then(res => {
            this.$message({
              type: 'success',
              message: '在线展示发布成功!'
            });
            this.getListFinalReview();
          }).catch(err => {
          });
        }).catch(() => {
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
      // 新增入围名单查询
      initialListSubmit(index) {
        let params;
        if (index === 2) {
          params = {
            current: this.pageInfo.current,
            size: this.pageInfo.size
          };
        } else {
          params = {
            current: this.pageInfo4.current,
            size: this.pageInfo4.size,
            // activityCode: this.ruleForm2.activityCode,
            companyNameCn: this.initialList.companyNameCn,
            productNameCn: this.initialList.productNameCn,
            productCategoryId: this.initialList.productCategoryId
          };
        }
        this.$http.get(this.baseApi + '/api/customservice/cf/listFinalInitialReview', params).then(res => {
          this.initialListData = res.records;
          this.pageInfo4.total = res.total;
        }).catch(err => {
        });
      },
      // 表格选择框
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 删除
      handledelete(row, index) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            awardProductId: row.awardProductId
          };
          this.$http.post(this.baseApi + '/api/customservice/cf/deleteFinalList', data).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getListFinalReview();
          }).catch(err => {
            this.$message({
              type: 'error',
              message: '删除失败!' + err
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //  分页1
      handleSizeChange(val) {
        this.pageInfo.size = val;
        this.getListFinalProduct();
      },
      handleCurrentChange(val) {
        this.pageInfo.current = val;
        this.getListFinalProduct();
      },
      //  分页2
      handleSizeChange2(val) {
        this.pageInfo2.size = val;
        this.getListFinalReview();
      },
      handleCurrentChange2(val) {
        this.pageInfo2.current = val;
        this.getListFinalReview();
      },
      //  分页3
      handleSizeChange3(val) {
        this.pageInfo3.size = val;
        this.addProductSubmit();
      },
      handleCurrentChange3(val) {
        this.pageInfo3.current = val;
        this.addProductSubmit();
      },
      //  分页4
      handleSizeChange4(val) {
        this.pageInfo4.size = val;
        this.initialListSubmit();
      },
      handleCurrentChange4(val) {
        this.pageInfo4.current = val;
        this.initialListSubmit();
      },
      //  分页5
      handleSizeChange5(val) {
        this.VoteList.size = val;
        this.voteList();
      },
      handleCurrentChange5(val) {
        this.VoteList.current = val;
        this.voteList();
      }
    },
    mounted() {
      this.getActivityList();
      // this.getProductCategoryInfo();
      // this.getCfActivityAward();
    }
  };
</script>

<style scoped>
  .btn-row{
    margin: 10px;
  }
  .dialog-footer{
    text-align: center;
    margin: 50px 0;
    padding-bottom: 10px;
  }
  .dialog-top{
    margin-top: -30px;
  }
  .dialog-top img{
    display: block;
    margin: 0 auto;
    height: 80px;
  }
  .dialog-content{
    margin: 10px 0;
  }
  .text-center{
    text-align: center;
  }
  .blue-underline{
    color: #1e6abc;
    text-decoration: underline;
  }
  .paging {
    float: right;
    margin-top: 10px;
    margin-right: 20px;
  }
</style>
