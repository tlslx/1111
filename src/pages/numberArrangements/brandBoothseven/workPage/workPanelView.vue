<template>
  <div>
    <el-form :model="queryForm" :inline="true" size="small">
      <el-form-item label="商协会">
        <el-select v-model="queryForm.coceralId" clearable>
          <el-option v-for="(item, index) in coceralOpts" :key="index" :value="item.deptCode" :label="item.deptName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展区">
        <el-select v-model="queryForm.exhibitionArea" clearable>
          <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称">
        <el-input placeholder="请输入" v-model="queryForm.companyName" clearable></el-input>
      </el-form-item>
      <el-form-item label="交易团">
        <el-select v-model="queryForm.dealClusterId" clearable>
          <el-option v-for="(item, index) in dealClusterOpts" :key="index" :value="item.deptCode" :label="item.deptName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="getLpf.records" v-loading="loading" size="small" border>
      <el-table-column min-width="120" label="企业名称" prop="companyName" align="center"></el-table-column>
      <el-table-column min-width="120" label="所属交易团" prop="dealClusterName" align="center"></el-table-column>
      <el-table-column min-width="120" label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
      <el-table-column min-width="120" label="商协会" prop="coceralName" align="center"></el-table-column>
      <el-table-column min-width="120" label="新增安排展位数" prop="beforeNumber" align="center"></el-table-column>
      <el-table-column min-width="120" label="异议内容" prop="objectionContent" align="center"></el-table-column>
      <el-table-column min-width="120" label="处理意见" prop="disposeOpinion" align="center"></el-table-column>
      <!-- <el-table-column min-width="160" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" :disabled="scope.row.isDispose === '1'" @click="dealWidth(scope.row)">处理</el-button>
          <el-button type="text" :disabled="scope.row.isDispose === '1'" @click="handleBack(scope.row)">返还商协会</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-row type="flex" justify="space-between" class="pagination-footer">
      <span class="add_btn">
        <el-button type="primary" size="medium" @click="hanDownload">下载</el-button>
      </span>
      <el-pagination 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        :page-size="pageInfo.pageSize"
        :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="getLpf.total">
      </el-pagination>
    </el-row>
    <!-- 处理弹框 -->
    <el-dialog title="提示" :visible.sync="isVisible" v-if="isVisible" :close-on-click-modal="false" width="550px">
      <el-form :model="dealData" ref="dealRef" :rules="dealRules" size="small" label-width="150px">
        <el-form-item label="请输入处理意见：" prop="disposeOpinion">
          <el-input type="textarea" v-model="dealData.disposeOpinion" :rows="5"></el-input>
        </el-form-item>
        <div class="closCenter">
          <el-button type="primary" size="medium" @click="handSure('dealRef')">确认</el-button>
          <el-button type="info" size="medium" @click="isVisible = false;">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
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
      contrastDialog: false,
      isVisible: false,
      dialogTitle: '',
      type: '', // 新增or编辑
      exhibitionAreaOpts: [],
      dealClusterOpts: [],
      companyOpts: [],
      coceralOpts: [],
      dealData: {
        disposeOpinion: ""
      },
      dealRules: {
        disposeOpinion: [
          { required: true, message: '请输入处理意见', trigger: 'blur' }
        ]
      },
      queryForm: {
        exhibitionArea: '',
        dealClusterId: '',
        companyName: '',
        coceralId: ''
      },
      contrastObj: {
        publicityId: '',
        companyCode: '',
        dealClusterId: '',
        exhibitionArea: '',
        coceralId: '',
        beforeNumber: '',
        objectionContent: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('brandBooth', ['getLpf']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        companyName: this.queryForm.companyName,
        coceralId: this.queryForm.coceralId,
        dealClusterId: this.queryForm.dealClusterId,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.dealClusterOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      this.coceralOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  mounted() {
    this.createdQuery();
  },
  methods: {
    ...mapActions('brandBooth', [
      'getlistPageFeedback', // 查看交易团反馈意见
      'updateschemePublicityLog', // 外贸司处理交易团反馈意见
      'updatereturnPlanForCoceral' // 外贸司返还方案商协会重新提交方案
    ]),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getassociationDepartment']),
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    handleSizeChange(val) {
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getlistPageFeedback(this.formQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 处理
    dealWidth(val) {
      this.dealData = {
        disposeOpinion: val.disposeOpinion
      };
      this.isVisible = true;
      this.dealData["publicityId"] = val.publicityId;
    },
    // 处理 确认
    handSure(fname) {
      this.$refs[fname].validate((valid) => {
        if (valid) {
          this.updateschemePublicityLog(this.dealData).then(res => {
            this.isVisible = false;
            this.$message({
              message: "公示成功",
              type: "success"
            });
            this.createdQuery();
          });
        } else {
          return false;
        }
      });
    },
    // 返还商协会
    handleBack(val) {
      this.$confirm("是否确认将该条展位调整安排方案返回商协会重新提交？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      }).then(() => {
        this.updatereturnPlanForCoceral({
          "schemePublicity":
          {
            "publicityId": val.publicityId 
          },
          "schemePublicityLog":
          {
            "publicityId": val.publicityId 
          }
        }).then(res => {
          this.$message({
            type: "success",
            message: "操作成功"
          });
          this.createdQuery();
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
    },
    // 下载
    hanDownload() {
      let url = this.getLpf.current + "&size=" + this.getLpf.total + "&dealClusterId=" + this.queryForm.dealClusterId + "&exhibitionArea=" + this.queryForm.exhibitionArea + "&companyName=" + this.queryForm.companyName + "&coceralId=" + this.queryForm.coceralId + "&token=" + localStorage.getItem("USER_TOKEN");
      window.open(process.env.API_NA_URL + "/api/ordinaryRecommendCompany/delegation/download?current=" + url, "_parent");
    }
  }
};
</script>
<style scoped>
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}  
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
.closCenter {
  text-align: center;
  line-height: 50px;
  margin-bottom: 20px;
}
</style>
