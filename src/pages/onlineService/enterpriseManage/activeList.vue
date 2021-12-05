/**
 * @file 活动论坛列表
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="活动论坛列表" name="first">
      <dir>
        <el-form
          ref="form"
          :inline="true"
          :model="formInline"
          size="small"
          class="demo-form-inline"
        >
          <el-form-item label="活动名称:" label-width="120px">
            <el-input v-model="formInline.eventName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="论坛名称:" label-width="80px">
            <el-input v-model="formInline.BBSName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100px;" type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>

        <el-tabs v-model="activeName">
          <el-table
            :header-cell-style="tableHeaderColor"
            :data="tableData"
            :border=true
            size="small"
            style="width: 100%"
          >
            <el-table-column
              v-for="(item, index) in cols"
              :key="index"
              align="center"
              :prop="item.prop"
              :label="item.label"
            ></el-table-column>
          </el-table>
          <div
            style="display: flex; align-items: right;padding-right: 120px; margin-left: 40%;margin-top: 40px"
          >
          <pagination
            class="page-bar"
            :pageInfo="pageInfo"
            @handle-size-change="handleSizeChange"
            @handle-current-change="handleCurrentChange">
          </pagination>
            <el-button type="primary" size="medium" style="margin-left: 20px;">确定</el-button>
          </div>
        </el-tabs>
      </dir>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import pagination from "@/components/project/onlineService/common/pagination.vue";
export default {
  components: {
    'pagination': pagination
  },
  data() {
    return {
      activeName: "first",
      currentPage4: 5,
      cols: [
        {
          prop: "activeBBSName",
          label: "活动与论坛名称"
        },
        {
          prop: "organizers",
          label: "主办方"
        },
        {
          prop: "startTime",
          label: "开始时间"
        },
        {
          prop: "endTime",
          label: "结束时间"
        },
        {
          prop: "numLimit",
          label: "人数限制"
        },
        {
          prop: "operation",
          label: "操作"
        }
      ],
      tableData: [
        {
          activeBBSName: "商协会对外贸易交流论坛",
          organizers: "广交会",
          startTime: "2018/09/20",
          endTime: "2018/11/20",
          numLimit: "100",
          operation: "报名"
        },
        {
          activeBBSName: "商协会对外贸易交流论坛",
          organizers: "广交会",
          startTime: "2018/09/20",
          endTime: "2018/11/20",
          numLimit: "100",
          operation: "报名"
        },
        {
          activeBBSName: "商协会对外贸易交流论坛",
          organizers: "广交会",
          startTime: "2018/09/20",
          endTime: "2018/11/20",
          numLimit: "100",
          operation: "已报名"
        },
        {
          activeBBSName: "商协会对外贸易交流论坛",
          organizers: "广交会",
          startTime: "2018/09/20",
          endTime: "2018/11/20",
          numLimit: "100",
          operation: "报名"
        },
        {
          activeBBSName: "商协会对外贸易交流论坛",
          organizers: "广交会",
          startTime: "2018/09/20",
          endTime: "2018/11/20",
          numLimit: "100",
          operation: "已报名"
        },
        {
          activeBBSName: "商协会对外贸易交流论坛",
          organizers: "广交会",
          startTime: "2018/09/20",
          endTime: "2018/11/20",
          numLimit: "100",
          operation: "报名"
        },
        {
          activeBBSName: "商协会对外贸易交流论坛",
          organizers: "广交会",
          startTime: "2018/09/20",
          endTime: "2018/11/20",
          numLimit: "100",
          operation: "报名"
        },
        {
          activeBBSName: "商协会对外贸易交流论坛",
          organizers: "广交会",
          startTime: "2018/09/20",
          endTime: "2018/11/20",
          numLimit: "100",
          operation: "报名"
        },
        {
          activeBBSName: "商协会对外贸易交流论坛",
          organizers: "广交会",
          startTime: "2018/09/20",
          endTime: "2018/11/20",
          numLimit: "100",
          operation: "已报名"
        },
        {
          activeBBSName: "商协会对外贸易交流论坛",
          organizers: "广交会",
          startTime: "2018/09/20",
          endTime: "2018/11/20",
          numLimit: "100",
          operation: "报名"
        }
      ],
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0
      },
      formInline: {
        eventName: "",
        BBSName: ""
      }
    };
  },
  methods: {
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f5f5f5;";
        //  return "background-color: #f5f5f5;color: #B6B5C2;font-weight: 500;";
      }
    },
    onSubmit() {
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
    }
  }
};
</script>
<style scoped>
.el-table {
  text-align: center;
}
</style>



