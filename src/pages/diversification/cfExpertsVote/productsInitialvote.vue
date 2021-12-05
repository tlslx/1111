/**
* @file 产品初评投票列表
* @author: wanglifeng
* @date: 2019/1/21
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="产品初评投票列表" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="产品类别:" size="mini">
          <el-select style="width: 150px" v-model="ruleForm.productCategoryId" placeholder="请选择">
            <el-option v-for="(item,index) in productCategorys" :label="item.productCategoryNameCn" :key="index"
                       :value="item.productCategoryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称:" size="mini">
          <el-input v-model.trim="ruleForm.productNameCn" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="投票状态:" size="mini">
          <el-select v-model="ruleForm.reviewState" placeholder="请选择">
            <el-option label="未投票" value="1"></el-option>
            <el-option label="已投票" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="submitVetoForm()">查询</el-button>
          <el-button type="primary" @click="resetVetoForm()">重置</el-button>
        </el-form-item>
      </el-form>

      <el-row class="item-row" style="margin-left: 20px;" >
        <el-col :span="8" v-for="(votelimit,index) in voteLimits" :key="index" ><span v-for="(category,index) in productCategorys" v-if="votelimit.productCategoryId==category.productCategoryId && category.productCategoryNameCn!=null">{{category.productCategoryNameCn}}：</span><span>上限{{votelimit.firstUpLimit}}（可投票{{votelimit.remainVotes}}）</span><span>下限{{votelimit.firstDownLimit}}</span></el-col>
        <!--<el-col :span="8"  v-for="(category,index) in productCategorys" :key="index" ><span v-for="(votelimit,index) in voteLimits" v-if="votelimit.productCategoryId==category.productCategoryId">{{category.productCategoryNameCn}}：</span><span>上限{{votelimit.firstUpLimit}}（可投票{{votelimit.remainVotes}}）</span><span>下限{{votelimit.firstDownLimit}}</span></el-col>-->
      </el-row>

      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin: 0 20px">
          <el-table-column
            prop="imagePath"
            label="产品图片"
            align="center"
            width="240">
            <template slot-scope="scope">
              <img :src="showImgPath(scope.row)" alt="" class="productimg">
            </template>
          </el-table-column>
          <el-table-column
            prop="productNameCn"
            label="产品名称"
            align="center">
            <template slot-scope="scope">
              <!--<span @click="toProductDetail(scope.row, scope.index)">{{scope.row.productNameCn}}</span>-->
              <router-link :to="{ path: '/productBasicInformation', query: { reviewId: scope.row.reviewId, awardProductId: scope.row.awardProductId, reviewState: scope.row.reviewId != null ? '2' : '1' }}">{{scope.row.productNameCn}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="productNo"
            label="产品编号"
            sort
            align="center"
            width="150">
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
            prop="review_id"
            label="状态"
            align="center"
            width="150">
            <!--此处的review_id如果不为空说明已投票，空表示未投票-->
            <template slot-scope="scope">
              <span v-if="scope.row.reviewId!=null">已投票</span>
              <span v-else-if="scope.row.reviewId==null">未投票</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            width="150">
            <template slot-scope="scope">
              <el-button @click="handleCancelVeto(scope.row, scope.index)" type="text" size="small">撤销</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        background
        class="pagination"
        @size-change="reviewVetoSizeChange"
        @current-change="reviewVetoCurrentChange"
        :current-page.sync="ruleForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="ruleForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalReviewVetoDatas"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import http from "@/scripts/framework/http";
  export default {
    name: "productsInitialvote",
    data() {
      return {
        totalReviewVetoDatas: 0,
        productCategorys: [],  // 产品种类列表
        activityCodes: [],  // 活动列表对应的活动编号
        activeName: 'first',
        reviewPageCount: 1,
        reviewTotalPage: 1,
        tableData: [],
        voteLimits: [],
        ruleForm: {
          productCategoryId: '',
          productNameCn: '',
          reviewState: '',
          current: 1,
          size: 10
        },
        productCategoryId: '',
        activityCode: '',
        baseApi: process.env.API_CF_URL
      };
    },
    methods: {
      init() {
        this.getActivityList();
        this.getReviewVoteList();
      },
      showImgPath(row) {
        return this.baseApi + "/api/customservice/cf/viewImage/" + row.imagePath;
      },
      // 获取初评产品投票列表 /customservice/cf/listFirstProductVote
      getReviewVoteList() {
        http.get(this.baseApi + '/api/customservice/cf/firstVoteList', this.ruleForm).then(res => {
          this.tableData = res.records;
          this.totalReviewVetoDatas = res.total;
        }).catch(err => {
        });
      },
      // 获取各类别投票上下限
      getCategoryVoteLimit(activityCode) {
        http.get(this.baseApi + '/api/customservice/cf/getFirstVoteLimit', {
          activityCode: activityCode
        }).then(res => {
          this.voteLimits = res;
        }).catch(err => {
        });
      },
      // 获取活动列表
      getActivityList() {
        http.get(this.baseApi + '/api/customservice/cf/getCfActivityCode').then(res => {
          //http.get(this.baseApi + '/api/customservice/cf/listCfActivity').then(res => {
          this.activityCodes = res.records;
          this.getCategoryVoteLimit(this.activityCodes[0].activityCode);
          this.getProductCategoryInfo(this.activityCodes[0].activityCode);
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
      // 按条件查询初评投票列表数据
      submitVetoForm() {
        this.getReviewVoteList();
      },
      resetVetoForm() {
        this.resetFormData(this.ruleForm);
      },
      // 撤销投票
      handleCancelVeto(row, index) {
        this.showDialogTips("确认撤销投票吗?").then(() => {
          http.post(this.baseApi + '/api/customservice/cf/firstReviewVoteCancel', { reviewIds: row.reviewId }).then(res => {
            this.$message.success("撤销成功!");
            this.getReviewVoteList();
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => { });
      },
      // 跳转到产品详情
      toProductDetail(row, index) {
        let reviewState = row.reviewId != null ? "2" : "1";
        this.$router.push({
          path: '/productBasicInformation',
          query: { awardProductId: row.awardProductId, reviewState: reviewState }
        });
      },
      // 表格多选框选中事件
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      reviewVetoSizeChange(pageSize) {
        this.ruleForm.size = pageSize;
        this.getReviewVoteList();
      },
      // 初评投票列表分页处理
      reviewVetoCurrentChange(currentPage) {
        this.ruleForm.current = currentPage;
        this.getReviewVoteList();
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
    },
    mounted() {
      this.init();
    }
  };
</script>
<style scoped>
  .item-row{
    margin: 10px;
    height: 40px;
    line-height: 40px;
  }
  .productimg{
    width: 70px;
    height: 70px;
    margin-top: 5px;
  }
  .pagination{
    margin: 10px auto;
    text-align: center;
  }

</style>
