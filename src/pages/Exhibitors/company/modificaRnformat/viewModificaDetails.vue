<style>

</style>
<template>
  <div>
    <el-tabs v-model="activeName" class="businessReview">
      <el-tab-pane label="查看修改详情" name="first"></el-tab-pane>
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <el-form-item label="修改项:" prop="enNames">
          <el-input v-model="obj.colName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="colname" label="修改项" align="center">
        </el-table-column>
        <el-table-column prop="oldContent" label="旧内容" align="center">
        </el-table-column>
        <el-table-column prop="newContent" label="新内容" align="center">
        </el-table-column>
        <el-table-column prop="applyModifyTime" label="提交时间" align="center">
        </el-table-column>
        <el-table-column prop="reApprove" label="状态" align="center">
         <template slot-scope="scope">
              {{ scope.row.reApprove | statusFilter }}
            </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfoData.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfoData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfoData.total">
      </el-pagination> -->
    </el-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: 'first',
      dataList: [],
      formInline: {
        companyName: ''
      },
      reviewTrDate: [
        {
          prop: "agentCh",
          label: "修改项",
          type: "string"
        },
        {
          prop: "oldContent",
          label: "旧内容",
          type: "string"
        },
        {
          prop: "content",
          label: "新内容",
          type: "string"
        },
        {
          prop: "time",
          label: "提交时间",
          type: "string"
        },
        {
          prop: "isEnabled",
          label: "状态",
          type: "string"
        }
      ],
      tableData: [],
      pageInfoData: {
        currentPage: 1,
        pageSize: 10,
        total: 1
      },
      obj: {
        modifyId: '',
        colName: ''
      }
    };
  },
  filters: {
    statusFilter: value => {
      switch (value) {
        case '0':
          return '未审核';
        case '1':
          return '审核不通过';
        case '2':
          return '审核通过';
        default:
          return;
      }
    }
  },
  created() {
    // console.log(this.$route.query, '999');
    this.obj.modifyId = this.$route.query.historyModifyId;
    this.handelGetViewModificaDetail(this.obj);
  },
  methods: {
    ...mapActions("modificaRnformat", [
      "getViewModificaDetail"            // 查看重要信息修改详情
    ]),
    handelGetViewModificaDetail(obj) {
      this.getViewModificaDetail(obj).then(res => {
        // console.log(res, '852');
        this.pageInfoData.currentPage = res.current;
        this.pageInfoData.pageSize = res.size;
        this.pageInfoData.total = res.total;
        this.tableData = res;
      });
    },
    // 分页
    handleSizeChange() {},
    // 分页按钮
    handleCurrentChange() {},
    // 查询
    onSubmit() {
      this.handelGetViewModificaDetail(this.obj);
    },
    // 操作按钮 lacalStorage.setItem('username','zxy');设置  localStorage.getItem('username');获取
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
