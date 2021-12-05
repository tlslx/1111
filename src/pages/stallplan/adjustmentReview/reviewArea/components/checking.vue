<template>
  <el-container>
    <el-header>
      <headline label="检查位置安排是否符合位置安排规则" />
    </el-header>
    <el-main class="p-b-n">
      <el-table :data="tableData" border>
        <el-table-column prop="violation" label="违反安排规则类型"></el-table-column>
        <el-table-column prop="type" label="规则类型"></el-table-column>
        <el-table-column label="检查结果" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state" type="success" icon="el-icon-check" size="mini" circle></el-button>
            <el-button v-else type="danger" icon="el-icon-close" size="mini" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="强制提交说明理由" align="center">
          <template>
            <el-button type="text">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="content" :label="languageSource.AdjustmentApply.annex" align="center">
          <template>
            <el-button type="text">上传</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'checking',
  components: {
    'headline': () => import('../../../components/headline')
  },
  props: {
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      'tableData': [
        { 'id': 1, 'violation': '展位安排数少于推荐数', 'type': '非严禁类规则', 'state': 1 },
        { 'id': 2, 'violation': '红黑名单企业位置安排超出规则', 'type': '非严禁类规则', 'state': 0 }
      ]
    };
  }
};
</script>

<style scoped>
.p-b-n {
  padding-bottom: 0px;
}
</style>
