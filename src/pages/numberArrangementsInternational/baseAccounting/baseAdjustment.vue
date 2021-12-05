<template>
  <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="基数调整记录" name="first">
      <!-- form表单 -->
      <el-form :inline="true" :model="formData">
        <el-form-item v-for="(item, index) in formControl" :key="index" :label="item.label">
          <template v-if="item.type === 'select'">
            <el-select v-model="formData[index]">
              <el-option
                v-for="(itemSele, index) in item.optionData"
                :key="index"
                :label="itemSele.label"
                :value="itemSele.value"
              ></el-option>
            </el-select>
          </template>
          <template v-else-if="item.type === 'input'">
            <el-input v-model.trim="formData[index]" maxlength="24"></el-input>
          </template>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- table表格 -->
      <el-table style="width: 100%" border>
        <el-table-column
          v-for="(item, index) in tableDataMain"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          align="center"
        ></el-table-column>
      </el-table>
      <!-- 下载按钮 -->
      <el-button class="paginationTop floatLeft formStyle paginLeft" type="primary">下载</el-button>
      <!-- 分页 -->
      <div class="floatRight paginationTop">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="paginationData.total"
          @current-change="handleCurrentChange"
          :current-page="paginationData.currentPage"
          :pager-count="paginationData.pagerCount"
          :page-size="paginationData.pageSize"
        ></el-pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      fullLoading: false, //控制加载
      // 表单控制
      formControl: [
        {
          label: "届数",
          // model: "formData.numberOf",
          type: "select",
          optionData: [
            {
              label: "请选择",
              value: ""
            },
            {
              label: "届数",
              value: "1"
            }
          ]
        },
        {
          label: "交易团",
          // model: "formData.dealClusterName",
          type: "select",
          optionData: [
            {
              label: "请选择",
              value: ""
            },
            {
              label: "交易团1",
              value: "交易团1"
            }
          ]
        },
        {
          label: "期数",
          // model: "formData.numberOf",
          type: "select",
          optionData: [
            {
              label: "请选择",
              value: ""
            },
            {
              label: "期数",
              value: "1"
            }
          ]
        }
      ],
      // 表单
      formData: {
        numberOf: "",
        dealClusterName: ""
      },
      // 表格控制
      tableDataMain: [
        { label: "届数", prop: "periods" },
        { label: "期数", prop: "periods" },
        { label: "交易团", prop: "periods" },
        { label: "保留展位数", prop: "periods" },
        { label: "切块支持数", prop: "periods" },
        { label: "出口额数据", prop: "periods" }
      ],
      // 表格
      tableData: [],
      // 分页
      paginationData: {
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 40
      },
      activeName: "first"
    };
  },
  methods: {
    handleCurrentChange() {

    }
  }
};
</script>
<style scoped>
.floatRight {
  float: right;
  margin-right: 50px;
}
.formStyle {
  padding: 8px 30px;
}
.paginationTop {
  margin-top: 10px;
}
.paginLeft {
  margin-left: 30px;
}
</style>
