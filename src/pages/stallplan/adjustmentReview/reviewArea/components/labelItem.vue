<template>
  <el-table :data="data" border class="t-m">
    <el-table-column
      label="序号"
      type="index"
      header-align="center"
      align="center"
      width="60">
    </el-table-column>
    <el-table-column prop="userName" label="操作人" header-align="center" align="center" min-width="181" ></el-table-column>
    <el-table-column prop="actName" label="节点名" header-align="center" align="center" min-width="177" ></el-table-column>
    <el-table-column prop="startTime" label="开始时间" header-align="center" align="center" min-width="177" ></el-table-column>
    <el-table-column prop="endTime" label="结束时间" header-align="center" align="center" min-width="177" ></el-table-column>
    <el-table-column prop="submitType" label="审核" header-align="center" align="center" min-width="177">
      <template slot-scope="scope">
        {{ showText(scope.row) }}
      </template>
    </el-table-column>
    <el-table-column prop="comment" label="审核意见" header-align="center" align="center" min-width="177" >
      <template slot-scope="scope">
        {{ scope.row.actId === "toBeSubmit" ? '流程开启' : scope.row.comment }}
      </template>
    </el-table-column>
    <!-- <el-table-column
      :label="languageSource.AdjustmentApply.index"
      type="index"
      header-align="center"
      align="center"
      width="60">
    </el-table-column>
    <el-table-column prop="userName" label="操作人" header-align="center" align="center" min-width="181" ></el-table-column>
    <el-table-column prop="actName" :label="languageSource.AdjustmentApply.partName" header-align="center" align="center" min-width="177" ></el-table-column>
    <el-table-column prop="startTime" :label="languageSource.CommonLang.startDate" header-align="center" align="center" min-width="177" ></el-table-column>
    <el-table-column prop="endTime" :label="languageSource.CommonLang.endDate" header-align="center" align="center" min-width="177" ></el-table-column>
    <el-table-column prop="submitType" :label="languageSource.AdjustmentApply.check" header-align="center" align="center" min-width="177">
      <template slot-scope="scope">
        {{ showText(scope.row) }}
      </template>
    </el-table-column>
    <el-table-column prop="comment" :label="languageSource.AdjustmentApply.opinion" header-align="center" align="center" min-width="177" >
      <template slot-scope="scope">
        {{ scope.row.actId === "toBeSubmit" ? '流程开启' : scope.row.comment }}
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
export default {
  name: 'labelItem',
  props: ["data"],
  data () {
    return {
      'lableRows': {},
      'languageSource': {
        'CommonLang': {},
        'AdjustmentApply': {}
      }
    };
  },
  async created () {
    //读取国际化
    // this.languageSource.CommonLang = await kindo.util.getLanguage('CommonLang');
    // this.languageSource.AdjustmentApply = await kindo.util.getLanguage('AdjustmentApply');
  },
  methods: {
    showText (row) {
      if (row.actId === 'toBeSubmit') {
        return "已申请";
      } else if (row.submitType === "1") {
        return "通过";
      } else if (row.submitType === "0" || row.submitType === "2") {
        return "不通过";
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
