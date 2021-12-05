<style lang="less" scoped>
@import "../../../../../theme/project/css/flex.less";
</style>

<template>
  <el-tabs value="default">
    <el-tab-pane label="撤销记录" name="default">
      <el-form :inline="true" :model="queryForm">
        <el-form-item label="证件类型">
          <el-select style="width: 90%" placeholder="请选择" v-model="queryForm.badgeTypeCode" clearable>
            <el-option  v-for="(item, index) in badgeArray" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请单号" prop="name">
          <el-select style="width: 90%" v-model="queryForm.exhibitionPeriod" placeholder="请选择">
            <el-option  v-for="(item, index) in oddNumArray" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getTableListCheckPapers(this.queryForm)" size="mini">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" border>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column v-for="(item, index) in tableHead" :key="index"
          :prop="item.prop" :label="item.label" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text">提交修改申请</el-button>
            <el-button type="text" @click="handleEditDialog(scope.row.ifoPersonId)">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.row.ifoPersonId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="bm bm-pj">
        <el-button type="primary">批量审核</el-button>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryForm.current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="queryForm.size"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      oddNumArray: [],
      badgeArray: [],
      queryForm: {
        exhibitionPeriod: "",
        badgeTypeCode: "",

        current: 1,
        size: 10
      },
      total: 0,
      tableData: [],
      tableHead: [
        {
          prop: "a",
          label: "申请单号"
        },
        {
          prop: "a",
          label: "姓名"
        },
        {
          prop: "a",
          label: "证件类型"
        },
        {
          prop: "a",
          label: "撤销时间"
        }
      ]
    };
  },
  methods: {
    ...mapActions("certificateManage", ["getFirstCheckPapersList"]),
    getTableListCheckPapers(param) {
      this.getFirstCheckPapersList(param).then(res => {
        this.tableData.splice(0, this.tableData.length);
        if (res && res.records && res.records.length) {
          this.total = res.total;
          this.tableData = res.records;
        }
      });
    },
    handleSizeChange(val) {
      this.queryForm.size = val;
      this.getTableListCheckPapers(this.queryForm);
    },
    handleCurrentChange(val) {
      this.queryForm.current = val;
      this.getTableListCheckPapers(this.queryForm);
    }
  },
  async created() {
    // this.getTableListCheckPapers(this.queryForm);
    this.badgeArray = await kindo.dictionary.get('badgeType');
  }
};
</script>
