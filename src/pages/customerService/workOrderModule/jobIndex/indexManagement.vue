/**
 * @file 指标管理
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="指标管理" name="0">
      <el-table border :data="IndicatorManagement.records" v-loading="loading">
        <el-table-column label="工单完成率" prop="sessionNum" align="center"></el-table-column>
        <el-table-column label="及效性(及时处理率）" prop="commitTime" align="center"></el-table-column>
        <el-table-column label="整体满意度" prop="subscribePerson" align="center"></el-table-column>
        <el-table-column label="人均处理量" prop="subscribeTime" align="center"></el-table-column>
        <el-table-column label="待处理工单总量" prop="point" align="center"></el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      loading: '',
      activeName: '0'
    };
  },
  created() {
    let _this = this;
    this.selectJodIndicator().then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('jobIndex', ['IndicatorManagement'])
  },
  methods: {
    ...mapActions('jobIndex', ['selectIndicatorManagement'])
  }
};
</script>
<style scoped>
.pagination-footer {
  margin-top: 20px;
}
</style>












