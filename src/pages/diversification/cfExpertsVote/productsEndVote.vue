/**
* @file 产品终评投票
* @author: wanglifeng
* @date: 2019/1/21
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="产品终评投票列表" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="产品类别:" size="mini">
          <el-select v-model="ruleForm.productCategoryId" placeholder="请选择">
            <el-option v-for="(item, index) in productCategorys" :key="index" :label="item.productCategoryNameCn" :value="item.productCategoryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称:" size="mini">
          <el-input v-model="ruleForm.productName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="状态:" size="mini">
          <el-select v-model="ruleForm.reviewState" placeholder="请选择">
            <el-option label="未投票" value="1"></el-option>
            <el-option label="已投票" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>

      <el-row class="item-row">
        <el-col :span="8" v-for="(votelimit, index) in voteLimits" :key="index">
          <span v-for="(category, ind) in productCategorys"
                v-if="votelimit.productCategoryId===category.productCategoryId && category.productCategoryNameCn!==null"
                :key="ind">{{category.productCategoryNameCn}}：</span>
          <span>上限{{votelimit.finalUpLimit}}（可投票{{votelimit.remainVotes}}）</span>
          <span>下限{{votelimit.finalDownLimit}}</span>
        </el-col>
      </el-row>

      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%;">
          <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="80">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="imagePath"
            label="产品图片"
            align="center"
            width="200">
            <template slot-scope="scope">
              <img :src="showImgPath(scope.row)" alt="" class="productimg">
            </template>
          </el-table-column>
          <el-table-column
            prop="productNameCn"
            label="产品名称"
            align="center"
            width="190">
            <template slot-scope="scope">
              <span class="blue_unline" @click="toProductDetail(scope.row, scope.index)">{{scope.row.productNameCn}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="productNo"
            label="产品编号"
            sortable
            align="center"
            width="145">
          </el-table-column>
          <el-table-column
            prop="productCategoryNameCn"
            label="产品类别"
            align="center"
            width="145">
          </el-table-column>
          <el-table-column
            prop="reviewStateNULL"
            label="状态"
            align="center"
            width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.reviewStateNULL==2">已投票</span>
              <span v-else-if="scope.row.reviewStateNULL==1">未投票</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="score"
            label="评分"
            sortable
            align="center"
            width="130">
            <template slot-scope="scope">
              <el-input type="number" size="small" v-model.trim="scope.row.score" :disabled="productCategorys.length==''" @change="handleEdit(scope.row.score, scope.$index)" style="width: 100px;" :max="10" :min="1"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            width="150">
            <template slot-scope="scope">
              <el-button @click="handleSubmit(scope.row, scope.$index)" type="text" size="small" :disabled="productCategorys.length==''">提交</el-button>
              <el-button @click="handleUndo(scope.row, scope.$index)" type="text" size="small" :disabled="productCategorys.length==''">撤销</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: "productsEndVote",
  data() {
    return {
      activeName: 'first',
      inputVisible: false,
      current: 1,
      size: 10,
      total: 0,
      changeStatus: true, // 是否修改了评分，true为修改过
      productCategorys: [],
      tableData: [],
      voteLimits: [],
      activityCodes: [],
      activityCode: '',
      ruleForm: {
        productCategoryId: '',
        productName: '',
        reviewState: '1'
      },
      // baseApi: 'http://192.168.1.108:9014'
      baseApi: process.env.API_CF_URL
    };
  },
  methods: {
    submitForm() {
      this.current = 1;
      this.getListFinalProductVote();
    },
    // 重置
    resetForm() {
      this.ruleForm.productCategoryId = '';
      this.ruleForm.productName = '';
      this.ruleForm.reviewState = '1';
    },
    // 编辑评分
    handleEdit(score, index) {
      if (score > 10) {
        this.$message({
          type: "error",
          message: "分数只能是1到10的整数"
        });
        this.tableData[index].score = 10;
        this.changeStatus = true;
      } else if (score < 1) {
        this.$message({
          type: "error",
          message: "分数只能是1到10的整数"
        });
        this.tableData[index].score = 1;
        this.changeStatus = true;
      } else if (score === '') {
        this.changeStatus = false;
      } else {
        this.changeStatus = true;
      }
    },
    handleSubmit(row, index) {
      // 判断有没有修改，有修改则继续，没有修改则不运行下面代码
      if (this.changeStatus === true) {
        if (row.score > 0 && row.score <= 10) {
          let data = [
            {
              score: row.score,
              awardProductId: row.awardProductId,
              reviewId: row.reviewId,
              activityCode: this.activityCode,
              productCategoryId: row.productCategoryId
            }
          ];
          this.$confirm('确定提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.postJson(this.baseApi + "/api/customservice/cf/finalReviewVote", data).then(res => {
              this.getListFinalProductVote();
              this.$message({
                type: "success",
                message: "评分成功"
              });
              this.changeStatus = false;
              this.getListFinalProductVote();
            });
          });
        } else {
          this.$message({
            type: "warning",
            message: "分数只能是1到10的整数"
          });
        }
      } else if (!row.score) {
        this.$message({
          type: "warning",
          message: "您还未进行评分!"
        });
      } else if (row.score) {
        this.$message({
          type: "warning",
          message: "您还未进行评分修改!"
        });
      }
      this.changeStatus = true;
      // this.tableData[index].editStatus = false;
    },
    // 撤销
    handleUndo(row, index) {
      let data = [
        row.awardProductId
      ];
      this.$confirm('确定撤销?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.postJson(this.baseApi + '/api/customservice/cf/finalReviewVoteCancel', data).then(res => {
          this.$message({
            message: '撤销成功！',
            type: 'warning'
          });
          this.getListFinalProductVote();
          this.tableData[index].score = null;
        }).catch(err => {
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消'
        // });
      });
    },
    showImgPath(row) {
      if (row.imagePath) {
        return this.baseApi + "/api/customservice/cf/viewImage/" + row.imagePath;
      }
    },
    // 获取活动列表
    getActivityList() {
      this.$http.get(this.baseApi + '/api/customservice/cf/getCfActivityCode').then(res => {
        if (res.records) {
          this.activityCodes = res.records;
          this.activityCode = this.activityCodes[0].activityCode;
          this.getProductCategoryInfo();
          this.getListFinalProductVote();
        } else {
          this.$message({
            message: '获取当前活动编号失败！',
            type: 'error'
          });
        }
      }).catch(error => {
      });
    },
    // 获取所有的产品类别信息
    getProductCategoryInfo() {
      let params = {
        activityCode: this.activityCode
      };
      this.$http.get(this.baseApi + '/api/customservice/cf/listProductCategory', params).then(res => {
        this.productCategorys = res.records;
      }).catch(error => {
      });
    },
    // 获取产品终评投票列表 /customservice/cf/listFinalProductVote
    getListFinalProductVote() {
      let params = {
        current: this.current,
        size: this.size,
        activityCode: this.activityCode,
        productCategoryId: this.ruleForm.productCategoryId || null,
        productNameCn: this.ruleForm.productName || null,
        reviewState: this.ruleForm.reviewState || null
      };
      this.$http.get(this.baseApi + '/api/customservice/cf/listFinalProductVote', params).then(res => {
        this.tableData = res.records;
        this.total = res.total;
        // for (let i = 0; i < this.tableData.length; i++) {
        //   this.tableData[i].editStatus = false;
        // }
      }).catch(error => {
      });
    },
    // 获取各类别投票上下限
    getCategoryVoteLimit() {
      this.$http.get(this.baseApi + '/api/customservice/cf/listFinalProductVoteCount').then(res => {
        this.voteLimits = res;
      }).catch(err => {
      });
    },

    // 跳转到产品详情
    toProductDetail(row, index) {
      let reviewState = row.reviewId != null ? "2" : "1";
      this.$router.push({
        path: '/productBasicInformationEnd',
        query: {
          reviewId: row.reviewId,
          awardProductId: row.awardProductId,
          reviewState: reviewState
        }
      });
    },
    // 表格多选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页事件
    handleSizeChange(val) {
      this.size = val;
      this.getListFinalProductVote();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.getListFinalProductVote();
    }
  },
  mounted() {
    this.getActivityList();
    this.getCategoryVoteLimit();
  }
};
</script>
<style scoped>
  .item-row{
    margin: 10px;
    height: 40px;
    padding-left: 20px;
    line-height: 40px;
  }
  .btn-row{
    margin-top: 10px;
  }
  .productimg{
    width: 100px;
    height: 70px;
    margin-top: 5px;
  }
  .paging{
    float: right;
  }
  .blue_unline{
    color: #1e6abc;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
