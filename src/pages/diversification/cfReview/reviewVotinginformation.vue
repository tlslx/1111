<template>
  <div style="padding: 5px;">
    <p><span class="title">评审投票信息</span></p>
    <hr>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
      <el-form-item label="活动编号:" size="mini">
        <el-select v-model="ruleForm.activityCode" placeholder="请选择">
          <el-option v-for="(item, index) in activityCodes" :key="index" :label="item.activityCode" :value="item.activityCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评审阶段:" size="mini">
        <el-select v-model="ruleForm.stage" placeholder="请选择">
          <el-option label="初评" value="0"></el-option>
          <el-option label="终评" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="getReviewVetoList()">查询</el-button>
        <el-button type="primary" @click="resetReviewVetoList()">重置</el-button>
      </el-form-item>
    </el-form>

    <section>
      <aside class="aside-left">
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </aside>
      <article class="article-right">
        <el-table
          :data="reviewVetos"
          border
          style="width: 100%">
          <el-table-column
            prop="companyNameCn"
            label="企业名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productCategoryNameCn"
            label="产品类别"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productNo"
            label="产品编号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productNameCn"
            label="产品名称中文"
            align="center">
          </el-table-column>
          <el-table-column
            prop="stage"
            label="评审阶段"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.stage === '0'">初评</span>
              <span v-else>终评</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="total"
            label="投票"
            align="center">
          </el-table-column>
          <el-table-column
            prop="score"
            label="评分"
            align="center">
          </el-table-column>
        </el-table>

        <el-pagination
          background
          class="pagination"
          @size-change="reviewVetoSizeChange"
          @current-change="reviewVetoCurrentChange"
          :current-page.sync="ruleForm.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="ruleForm.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRuleFormDatas"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>

      </article>
    </section>
  </div>
</template>

<script>
  import http from "@/scripts/framework/http";
  export default {
    name: "reviewVotinginformation",
    data() {
      return {
        activityCodes: [],
        totalRuleFormDatas: 1,
        pageInfo: {
          current: 1,
          size: 10
        },
        ruleForm: {
          activityCode: '',
          expertId: '1',   // 专家id
          stage: '',
          current: 1,
          size: 10
        },
        treeData: [
          {
            label: '评审专家',
            children: []
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        reviewVetos: [],
        baseApi: process.env.API_CF_URL,
        baseApi2: process.env.API_DICT_URL
      };
    },
    mounted() {
      this.getActivityList();
      this.getExpertList();
      this.getReviewVetoList();
    },
    methods: {
      /*
       *  数据获取
       */
      // 获取活动列表
      getActivityList() {
        http.get(this.baseApi + '/api/customservice/cf/getCfActivityCode').then(res => {
          this.activityCodes = res.records;
          this.ruleForm.activityCode = this.activityCodes[0].activityCode;
        }).catch(error => {
        });
      },
      // 评委（专家）列表获取
      getExpertList() {
        http.get(this.baseApi + '/api/customservice/cf/listExpert', this.pageInfo).then(res => {
          if (res.records.length > 0) {
            let length = res.records.length;
            let data = res.records;
            let child = {
              id: 0,
              label: '',
              expertId: ''
            };
            for (let i = 0; i < length; i++) {
              child.id = i;
              child.label = data[i].nameCn;
              child.expertId = data[i].expertId;
              this.treeData[0].children.push(child);
            }
          }
          // 初始化默认为第一个专家的评审列表
          // this.ruleForm.expertId = this.ruleForm.expertId = this.treeData[0].children[0].expertId;
          this.ruleForm.expertId = "";
        }).catch(error => {
        });
      },
      // 获取评审信息列表
      getReviewVetoList() {
        // this.baseApi +
        http.get(this.baseApi + '/api/customservice/cf/listFinalReviewVote', this.ruleForm).then(res => {
          this.reviewVetos = res.records;
          this.totalRuleFormDatas = res.total;
        }).catch(error => {
        });
      },

      /*
       * 事件处理
       */
      // 重置表单
      resetReviewVetoList() {
        this.ruleForm.activityCode = this.activityCodes[0].activityCode;
        this.ruleForm.stage = '';
        // 默认为第一个专家的评审列表
        this.ruleForm.expertId = this.treeData[0].children[0].expertId;
      },
      // 评审专家选择事件
      handleNodeClick(data) {
        this.ruleForm.expertId = data.expertId;
        this.getReviewVetoList();
      },
      // 分页页数变化
      reviewVetoSizeChange(pageSize) {
        this.ruleForm.size = pageSize;
        this.getReviewVetoList();
      },
      // 分页当前页改变
      reviewVetoCurrentChange(page) {
        this.ruleForm.current = page;
        this.getReviewVetoList();
      }
    }
  };
</script>

<style scoped>
  .aside-left{
    width: 20%;
    float: left;
    padding: 5px;
    box-sizing: border-box;
  }
  .article-right{
    width: 80%;
    float: right;
    padding: 5px;
    box-sizing: border-box;
  }
  .pagination{
    margin: 10px auto;
    text-align: center;
  }
</style>
