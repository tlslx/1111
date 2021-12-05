/**
* @file 产品投票统计 + 采购商投票统计
* @author:wanglifeng
* @date:2019/1/19
*/
<template>
  <el-tabs v-model="activeName" @tab-click="handleTabChange">
    <el-tab-pane label="产品投票统计" name="first">
      <el-form :inline="true" :model="productVetoForm" class="demo-ruleForm">
        <el-form-item label="活动编号:" size="mini">
          <el-select v-model="productVetoForm.activityCode" placeholder="请选择" @change="productActivityCodeChange">
            <el-option v-for="(item, index) in activityCodes" :key="index" :label="item.activityCode" :value="item.activityCode"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品类别:" size="mini">
          <el-select v-model="productVetoForm.categoryId" placeholder="请选择">
            <el-option v-for="(item, index) in productCategorys" :key="index" :label="item.productCategoryNameCn" :value="item.productCategoryId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品名称:" size="mini">
          <el-input v-model="productVetoForm.productName" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="searchProductVeto()">查询</el-button>
          <el-button type="primary" @click="resetProductVeto()">重置</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          :data="productVetosData"
          border
          style="width: 100%;">
          <el-table-column
            prop=""
            type="index"
            label="序号"
            width="60"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productNameCn"
            label="产品名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productNo"
            label="产品编号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productCategoryNameCn"
            label="产品类别"
            align="center">
          </el-table-column>
          <el-table-column
            prop="totalVote"
            label="得票数"
            align="center">
          </el-table-column>
        </el-table>
        <el-pagination
          background
          class="pagination"
          @size-change="productVetoSizeChange"
          @current-change="productVetoCurrentChange"
          :current-page.sync="productVetoForm.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="productVetoForm.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="productVetoTotal"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>

      </template>

    </el-tab-pane>
    <el-tab-pane label="采购商投票统计" name="second">
      <el-form :inline="true" :model="businessVetoForm" ref="businessVetoForm" class="demo-ruleForm">
        <el-form-item label="活动编号:" size="mini">
          <el-select v-model="businessVetoForm.activityCode" placeholder="请选择" @change="businessActivityCodeChange">
            <el-option v-for="(item, index) in activityCodes" :key="index" :label="item.activityCode" :value="item.activityCode"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="国家地区:" size="mini">
          <el-select v-model="businessVetoForm.contry" placeholder="请选择">
            <el-option v-for="(item, index) in allCountrys" :key="index" :label="item.itemText" :value="item.dataDictItemId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="searchBusinessVeto()">查询</el-button>
          <el-button type="primary" @click="resetBusinessVeto()">重置</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          :data="businessVetoData"
          border
          style="width: 100%;">
          <el-table-column
            prop=""
            type="index"
            label="序号"
            width="60"
            align="center">
          </el-table-column>
          <el-table-column
            prop="contry"
            label="国家地区"
            align="center">
            <template slot-scope="scope">
              <span v-for="(item,index) in allCountrys" :key="index"
                    v-if="scope.row.contry === item.dataDictItemId">{{item.itemText}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="公司名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            align="center">
          </el-table-column>
          <el-table-column
            prop="totalVote"
            label="投票数"
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            prop="categoryIds"
            label="投票类别"
            align="center">
            <template slot-scope="scope">
              <span v-for="(category,index) in scope.row.categoryIds.split(',')" :key="index">
                <span v-for="(allcategory,index_in) in productCategorys" :key="index_in" v-if="category === allcategory.productCategoryId"> {{allcategory.productCategoryNameCn}} </span>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          class="pagination"
          @size-change="busniessVetoSizeChange"
          @current-change="busniessVetoCurrentChange"
          :current-page.sync="businessVetoForm.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="businessVetoForm.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="businessVetoTotal"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </template>

    </el-tab-pane>
  </el-tabs>

</template>

<script>
  import http from "@/scripts/framework/http";
  export default {
    name: "voteStatistics",
    data() {
      return {
        activeName: 'first',
        activityCodes: [],
        productCategorys: [],
        allCountrys: [],

        productVetosData: [],
        businessVetoData: [],

        productVetoTotal: 0,
        businessVetoTotal: 0,
        productVetoForm: {
          activityCode: '',
          categoryId: '',
          productName: '',
          current: 1,
          size: 10
        },
        businessVetoForm: {
          activityCode: '',
          contry: '',
          current: 1,
          size: 10
        },
        // baseApi: process.env.API_CF_URL,
        baseApi: process.env.API_CF_URL,
        baseApi2: process.env.API_DICT_URL
      };
    },
    mounted() {
      // 初始化数据
      this.getAllCountry();
      this.getActivityList();
    },
    methods: {
      /*
       *  数据获取
       */
      // 获取活动列表
      getActivityList() {
        this.$http.get(this.baseApi + '/api/customservice/cf/getCfActivityCode').then(res => {
          this.activityCodes = res.records;
          this.productVetoForm.activityCode = this.activityCodes[0].activityCode;
          this.businessVetoForm.activityCode = this.activityCodes[0].activityCode;
          this.getProductCategoryInfo(this.activityCodes[0].activityCode);
          this.getProductTotalVotes();
          this.getPurchaserTotalVotes();
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
      // 获取国家地区 ifo/potentialCustomerEnquiry/getAllCountry
      getAllCountry() {
        http.get(this.baseApi2 + '/api/sysDataDictItem/findDicItemList?dictCode=country').then(res => {
          this.allCountrys = res.records;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 采购商投票列表 /api/infoCsVoteLog/getPurchaserTotalVote
      getPurchaserTotalVotes() {
        this.getProductCategoryInfo(this.businessVetoForm.activityCode);
        http.get(this.baseApi + '/api/customservice/cf/getPurchaserTotalVote', this.businessVetoForm).then(res => {
          this.businessVetoData = res.records;
          this.businessVetoTotal = res.total;
        }).catch(err => {
          this.$message.error(err);
        });
      },
      // 产品投票汇总列表 api/infoCsVoteLog/getProductTotalVote
      getProductTotalVotes() {
        this.getProductCategoryInfo(this.productVetoForm.activityCode);
        http.get(this.baseApi + '/api/customservice/cf/getProductTotalVote', this.productVetoForm).then(res => {
          this.productVetosData = res.records;
          this.productVetoTotal = res.total;
        }).catch(err => {
        });
      },

      /*
       * 事件处理
       */
      // 产品投票活动编号变化
      productActivityCodeChange(activityCode) {},
      // 采购商投票活动编号变化
      businessActivityCodeChange(activityCode) {},
      // 搜索采购商投票统计
      searchBusinessVeto() {
        this.getPurchaserTotalVotes();
      },
      // 搜索产品投票统计
      searchProductVeto() {
        this.getProductTotalVotes();
      },
      // tabs标签切换
      handleTabChange(tab) {
        if (tab.index === '1') {
          this.getPurchaserTotalVotes();
        } else {
          this.getProductTotalVotes();
        }
      },

      /*
       * 分页信息处理
       */
      // 产品投票列表每页显示数量变化
      productVetoSizeChange(pageSize) {
        this.productVetoForm.size = pageSize;
        this.getProductTotalVotes();
      },
      // 产品投票列表页码变化
      productVetoCurrentChange(currentPage) {
        this.productVetoForm.current = currentPage;
        this.getProductTotalVotes();
      },
      // 采购商投票列表每页显示数量变化
      busniessVetoSizeChange(pageSize) {
        this.businessVetoForm.size = pageSize;
        this.getPurchaserTotalVotes();
      },
      // 采购商投票列表页码变化
      busniessVetoCurrentChange(currentPage) {
        this.businessVetoForm.current = currentPage;
        this.getPurchaserTotalVotes();
      },
      // 表单重置
      resetProductVeto() {
        this.productVetoForm.activityCode = this.activityCodes[0].activityCode;
        this.productVetoForm.categoryId = '';
        this.productVetoForm.productName = '';
      },
      resetBusinessVeto() {
        this.businessVetoForm.activityCode = this.activityCodes[0].activityCode;
        this.businessVetoForm.contry = '';
      }
    }
  };
</script>

<style scoped>
  .pagination{
    margin: 10px auto;
    text-align: center;
  }
</style>
