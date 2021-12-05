<template>
  <el-container>
    <el-header>
      <headline :label="languageSource.LocationLang.seatCheckLabel" />
    </el-header>
    <el-main class="p-b-n">
      <el-table :data="tableData" border>
        <el-table-column prop="violation" :label="languageSource.LocationLang.violationRuleType"></el-table-column>
        <el-table-column prop="type" :label="languageSource.LocationLang.ruleType"></el-table-column>
        <el-table-column :label="languageSource.LocationLang.checkResult" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state" type="success" size="small" icon="el-icon-check" class="b-w" circle></el-button>
            <el-button v-else type="danger" size="small" icon="el-icon-close" class="b-w" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="content" :label="languageSource.LocationLang.forceReason" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" :id="scope.row">{{languageSource.CommonLang.edit1}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="content" :label="languageSource.AdjustmentApply.annex" align="center">
          <template slot-scope="scope" >
            <el-button type="text" size="small" :id="scope.row">{{languageSource.LocationLang.upload}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'checking',
  mixins: [listPageBase],
  components: {
    'headline': () => import('../../components/headline')
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
.b-w {
  width: 40px
}
</style>
