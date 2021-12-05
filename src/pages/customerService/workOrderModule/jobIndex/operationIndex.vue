/**
 * @file 作业指标
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="作业指标" name="first">
      <el-table border :data="jodIndicator.records" v-loading="loading">
        <el-table-column label="待处理工单量" prop="sessionNum" align="center"></el-table-column>
        <el-table-column label="每天完成工单量" prop="commitTime" align="center"></el-table-column>
        <el-table-column label="已处理工单量" prop="subscribePerson" align="center"></el-table-column>
        <el-table-column label="个人工单满意度" prop="subscribeTime" align="center"></el-table-column>
        <el-table-column label="个人工单及时处理率" prop="point" align="center"></el-table-column>
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
      activeName: 'first'
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
    ...mapGetters('jobIndex', ['jodIndicator'])
  },

  methods: {
    ...mapActions('jobIndex', ['selectJodIndicator'])
  }
};
</script>
<style scoped>
.pagination-footer {
  margin-top: 20px;
}
</style>












