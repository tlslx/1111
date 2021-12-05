<template>
  <el-popover
    placement="right"
    width="400"
    v-model="visible"
    trigger="manual">
    <kindo-table
      ref="table"
      @row-click='rowClickFunc'
      :pagination='false'
      :url="config.api.get">
      <el-table-column width="150" property="schemeName" label="日期"></el-table-column>
      <el-table-column width="100" property="description" label="姓名"></el-table-column>
      <el-table-column width="300" property="creatorName" label="地址"></el-table-column>
    </kindo-table>
    <el-button slot="reference" type="primary" class="checkBtn" @click="visible = !visible">{{languageSource.AdjustmentApply.addenterprise}}</el-button>
  </el-popover>
</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'addBusiness',
  mixins: [listPageBase],
  props: {
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      //接口地址
      config,
      visible: false,
      selectRow: {} //选中的行
    };
  },
  mounted () {
    this.query();
  },
  methods: {
    //表格查询方法
    query () {
      this.$refs.table.loadData();
    },
    //表格行点击事件
    rowClickFunc (row, event, column) {
      this.visible = false;
      this.selectRow = row;
      this.$emit('rowClick', row);
    }
  }
};
</script>

<style scoped>
.checkBtn {
  margin-left: 10px;
  margin-top: 6px;
}
</style>
