<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="工作部按商会交团展区生成统计汇总表" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="统计角色">
          <el-select v-model="queryForm.statisticalRole" @change="roleChange">
            <el-option v-for="item in statisticalRoleOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商会" v-if="queryForm.statisticalRole === '1'">
          <el-select v-model="queryForm.coceralId" clearable>
            <el-option v-for="item in coceralOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团" v-if="queryForm.statisticalRole === '2'">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="item in dealClusterOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展期" v-if="queryForm.statisticalRole === '3'">
          <el-select v-model="queryForm.exhibitionPeriod" clearable>
            <el-option v-for="item in exhibitionPeriodOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区" v-if="queryForm.statisticalRole === '3'">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="item in exhibitionAreaOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="boothSumData.records" v-loading="loading" border v-if="queryForm.statisticalRole === '1'">
        <el-table-column label="商会" prop="coceralName" align="center"></el-table-column>
        <el-table-column label="收回退回总数" prop="totalReturn" align="center"></el-table-column>
        <el-table-column label="退回展位数" prop="returnBooth" align="center"></el-table-column>
        <el-table-column label="违规使用收回展位数" prop="illegalRecovery" align="center"></el-table-column>
        <el-table-column label="知识产权收回展位数" prop="intellectualProperty" align="center"></el-table-column>
        <el-table-column label="备注" prop="remark" align="center"></el-table-column>
      </el-table>
      <el-table :data="boothSumData.records" v-loading="loading" border v-if="queryForm.statisticalRole === '2'">
        <el-table-column label="交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="收回退回总数" prop="totalReturn" align="center"></el-table-column>
        <el-table-column label="退回展位数" prop="returnBooth" align="center"></el-table-column>
        <el-table-column label="违规使用收回展位数" prop="illegalRecovery" align="center"></el-table-column>
        <el-table-column label="知识产权收回展位数" prop="intellectualProperty" align="center"></el-table-column>
        <el-table-column label="备注" prop="remark" align="center"></el-table-column>
      </el-table>
      <el-table :data="boothSumData.records" v-loading="loading" border v-if="queryForm.statisticalRole === '3'">
        <el-table-column label="展期" prop="exhibitionPeriod" align="center"></el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="收回退回总数" prop="totalReturn" align="center"></el-table-column>
        <el-table-column label="退回展位数" prop="returnBooth" align="center"></el-table-column>
        <el-table-column label="违规使用收回展位数" prop="illegalRecovery" align="center"></el-table-column>
        <el-table-column label="知识产权收回展位数" prop="intellectualProperty" align="center"></el-table-column>
        <el-table-column label="备注" prop="remark" align="center"></el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium">下载</el-button>
        </span>
        <el-pagination 
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="boothSumData.total">
        </el-pagination>
      </el-row>
    </el-tab-pane>
  </el-tabs>
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
      statisticalRoleOpts: [{ value: '1', label: '商协会' }, { value: '2', label: '交易团' }, { value: '3', label: '展区' }],
      exhibitionAreaOpts: [],
      dealClusterOpts: [],
      coceralOpts: [],
      exhibitionPeriodOpts: [],
      queryForm: {
        statisticalRole: '1',
        exhibitionArea: '',
        dealClusterId: '',
        coceralId: '',
        exhibitionPeriod: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('workDepartReturn', ['boothSumData']),
    formQuery() {
      return {
        statisticalRole: this.queryForm.statisticalRole,
        exhibitionArea: this.queryForm.exhibitionArea,
        dealClusterId: this.queryForm.dealClusterId,
        coceralId: this.queryForm.coceralId,
        exhibitionPeriod: this.queryForm.exhibitionPeriod,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    this.loading = true;
    this.getReturnBoothSumInfo({ statisticalRole: '1', current: 0, size: 10 }).then(res => {
      this.exhibitionAreaOpts = res.exhibitionAreaOpts;
      this.exhibitionPeriodOpts = res.exhibitionPeriodOpts;
      this.dealClusterOpts = res.dealClusterOpts;
      this.coceralOpts = res.coceralOpts;
      this.createdQuery();
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('workDepartReturn', ['getReturnBoothSumInfo']),
    // 角色改变
    roleChange(val) {
      this.queryForm = {
        statisticalRole: val,
        exhibitionArea: '',
        dealClusterId: '',
        coceralId: '',
        exhibitionPeriod: ''
      };
      this.handleQuery();
    },
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.loading = true;
      this.getReturnBoothSumInfo({ statisticalRole: this.queryForm.statisticalRole, current: 0, size: 10 }).then(res => {
        this.exhibitionAreaOpts = res.exhibitionAreaOpts;
        this.exhibitionPeriodOpts = res.exhibitionPeriodOpts;
        this.dealClusterOpts = res.dealClusterOpts;
        this.coceralOpts = res.coceralOpts;
        this.createdQuery();
      }).catch(e => {
        this.loading = false;
      });
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getReturnBoothSumInfo(this.formQuery).then(res => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
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
</style>
