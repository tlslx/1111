/**
 * @file 分团列表
 * @author: lihed
 * @date:2019/5/7
 */
<template>
  <el-container>
    <el-header>
      <span>分团列表</span>
    </el-header>
    <el-main>
      <div class="table-contain">
        <el-table border v-loading="loading" :data="tableData" style="width: 100%">
          <el-table-column prop="subgroupName" label="分团名称" align="center"></el-table-column>
          <el-table-column prop="seatSwitch" label="审核状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.seatSwitch!=1">关闭</span>
              <span v-else-if="scope.row.seatSwitch==1">开启</span>
            </template>
          </el-table-column>
          <el-table-column prop="operate" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button @click="changeStatus(scope.$index, scope.row)" type="text" size="small">修改状态</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-row type="flex" justify="end" class="pagination-contain">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfoData.current"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageInfoData.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { mapActions } from "vuex";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  mixins: [listPageBase],
  name: 'clusterList',
  data() {
    return {
      total: 0,
      loading: '',
      tableData: [],
      pageInfoData: {
        current: 1,
        size: 10
      }
    };
  },
  mounted() {
    // 分团列表 查询
    this.getSubgroupSwitch(this.pageInfoData).then(res => {
      this.total = res.total;

      res.records.forEach(item => {
        this.tableData.push(item);
      });
    });
  },
  methods: {
    ...mapActions("enterpriseBooth", ["getSubgroupSwitch"]), // 分团列表 查询
    ...mapActions("enterpriseBooth", ["setSubgroupSwitch"]), // 分团列表 设置开或关

    // 修改状态
    changeStatus(index, row) {
      let params = {
        subgroupId: row.subgroupId
      };

      if (row.seatSwitch === 1) {
        params.seatSwitch = 0;
      } else {
        params.seatSwitch = 1;
      }

      const fullScreenloading = this.$loading({
        lock: true,
        text: 'Loading',
        fullscreen: true,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      this.setSubgroupSwitch(params).then(res => {
        // 分团列表 查询 刷新
        this.getSubgroupSwitch(this.pageInfoData).then(resp => {
          if (resp) {
            this.total = resp.total;
            if (resp.records) {
              this.tableData = resp.records;
            }
          }

          this.$nextTick(() => {
            fullScreenloading.close();
          });
          this.$message.success('修改成功');
        });
      });
    },
    handleSizeChange(val) {
      this.pageInfoData.size = val;
      this.getSubgroupSwitch(this.pageInfoData).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    handleCurrentChange(val) {
      this.pageInfoData.current = val;
      this.getSubgroupSwitch(this.pageInfoData).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    }
  }
};
</script>
<style lang='less' scoped>
.el-container {
 .el-header {
    border-bottom: 1px solid #ddd;
    span {
      font-size: 16px;
      font-weight: 700;
      color: #333;
      height: 58px;
      line-height: 58px;
      display: block;
      float: left;
      border-bottom: 2px solid #2b579a;
    }
  }
  .el-main {
    .table-contain {
      .pagination-contain {
        padding-top: 10px;
      }
    }
  }
}
</style>
