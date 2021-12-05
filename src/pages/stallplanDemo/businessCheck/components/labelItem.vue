<template>
  <el-table :data="data" border class="t-m">
    <el-table-column
      :label="languageSource.AdjustmentApply.index"
      type="index"
      header-align="center"
      align="center"
      width="60">
    </el-table-column>
    <el-table-column prop="userName" :label="languageSource.AdjustmentApply.operator" header-align="center" align="center" min-width="181" ></el-table-column>
    <el-table-column prop="actName" :label="languageSource.AdjustmentApply.partName" header-align="center" align="center" min-width="177" ></el-table-column>
    <el-table-column prop="startTime" :label="languageSource.CommonLang.startDate" header-align="center" align="center" min-width="177" ></el-table-column>
    <el-table-column prop="endTime" :label="languageSource.CommonLang.endDate" header-align="center" align="center" min-width="177" ></el-table-column>
    <el-table-column prop="submitType" :label="languageSource.AdjustmentApply.checkTitle" header-align="center" align="center" min-width="177">
      <template slot-scope="scope">
        {{ showText(scope.row) }}
      </template>
    </el-table-column>
    <el-table-column prop="comment" :label="languageSource.AdjustmentApply.opinionTable" header-align="center" align="center" min-width="177" >
      <template slot-scope="scope">
        {{ scope.row.actId === "apply" ? '提交申请' : scope.row.comment }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'labelItem',
  mixins: [listPageBase],
  props: {
    "data": {
      'type': Array,
      'required': true
    },
    "languageSource": {
      'type': Object
    }
  },
  data () {
    return {
    };
  },
  methods: {
    showText (row) {
      if (row.actId === 'apply') {
        return "已申请";
      } else if (row.submitType === "0") {
        return "不通过";
      } else if (row.submitType === "1" || row.submitType === "2") {
        return "通过";
      } else if (row.submitType === "-1") {
        return "撤回";
      }
    }
  }
};
</script>
<style scoped>
.item-block {
  border-bottom: 1px #ccc solid;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.title-label {
  width: 80px;
  margin-right: 10px;
}
.item-row {
  margin: 10px
}
.t-m {
  margin-bottom: 20px;
}
</style>
