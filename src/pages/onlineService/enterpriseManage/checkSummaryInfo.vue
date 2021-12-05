/**
 * @file 工作部查看汇总信息
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="工作部查看汇总信息" name="first">
      <dir>
        <el-form
          ref="form"
          :inline="true"
          :model="formInline"
          size="small"
          class="demo-form-inline"
        >
          <el-form-item label="广交会企业编码:" label-width="120px">
            <el-input v-model="formInline.code" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="企业名称:" label-width="80px">
            <el-input v-model="formInline.companyName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="状态:" label-width="50px">
            <el-select v-model="formInline.state" placeholder="全部">
              <el-option label="全部" value="all"></el-option>
              <el-option label="一次性任务" value="one_task"></el-option>
              <el-option label="定时任务" value="time_task"></el-option>
            </el-select>
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
          <div class="block" style="display: flex; justify-content: space-between;">
            <el-button @click="downloadAll" class="btn_recommend" size="medium">点击下载全部</el-button>
            <div style="display: flex;align-items: center;padding-right: 120px;">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="800"
              ></el-pagination>
              <el-button type="primary" size="medium" style="margin-left: 20px;">确定</el-button>
            </div>
          </div>
        </el-tabs>
      </dir>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      currentPage4: 5,
      cols: [
        {
          prop: "companyName",
          label: "公司名称"
        },
        {
          prop: "countriesRegions",
          label: "国家/地区"
        },
        {
          prop: "purchaseIntention",
          label: "采购意向"
        },
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "nationality",
          label: "国籍"
        },
        {
          prop: "passportNumeber",
          label: "护照号码"
        },
        {
          prop: "position",
          label: "职务"
        },
        {
          prop: "mail",
          label: "E-mail"
        }
      ],
      tableData: [
        {
          companyName: "广东萌果科技有限公司",
          countriesRegions: "中国湛江",
          purchaseIntention: "汽车配件与建筑材料",
          name: "张雪",
          nationality: "中国",
          passportNumeber: "8373******4882",
          position: "市场部经理",
          mail: "152576216@qq.com"
        },
        {
          companyName: "广东萌果科技有限公司",
          countriesRegions: "中国湛江",
          purchaseIntention: "汽车配件与建筑材料",
          name: "张雪",
          nationality: "中国",
          passportNumeber: "8373******4882",
          position: "市场部经理",
          mail: "152576216@qq.com"
        },
        {
          companyName: "广东萌果科技有限公司",
          countriesRegions: "中国湛江",
          purchaseIntention: "汽车配件与建筑材料",
          name: "张雪",
          nationality: "中国",
          passportNumeber: "8373******4882",
          position: "市场部经理",
          mail: "152576216@qq.com"
        },
        {
          companyName: "广东萌果科技有限公司",
          countriesRegions: "中国湛江",
          purchaseIntention: "汽车配件与建筑材料",
          name: "张雪",
          nationality: "中国",
          passportNumeber: "8373******4882",
          position: "市场部经理",
          mail: "152576216@qq.com"
        },
        {
          companyName: "广东萌果科技有限公司",
          countriesRegions: "中国湛江",
          purchaseIntention: "汽车配件与建筑材料",
          name: "张雪",
          nationality: "中国",
          passportNumeber: "8373******4882",
          position: "市场部经理",
          mail: "152576216@qq.com"
        },
        {
          companyName: "广东萌果科技有限公司",
          countriesRegions: "中国湛江",
          purchaseIntention: "汽车配件与建筑材料",
          name: "张雪",
          nationality: "中国",
          passportNumeber: "8373******4882",
          position: "市场部经理",
          mail: "152576216@qq.com"
        },
        {
          companyName: "广东萌果科技有限公司",
          countriesRegions: "中国湛江",
          purchaseIntention: "汽车配件与建筑材料",
          name: "张雪",
          nationality: "中国",
          passportNumeber: "8373******4882",
          position: "市场部经理",
          mail: "152576216@qq.com"
        },
        {
          companyName: "广东萌果科技有限公司",
          countriesRegions: "中国湛江",
          purchaseIntention: "汽车配件与建筑材料",
          name: "张雪",
          nationality: "中国",
          passportNumeber: "8373******4882",
          position: "市场部经理",
          mail: "152576216@qq.com"
        },
        {
          companyName: "广东萌果科技有限公司",
          countriesRegions: "中国湛江",
          purchaseIntention: "汽车配件与建筑材料",
          name: "张雪",
          nationality: "中国",
          passportNumeber: "8373******4882",
          position: "市场部经理",
          mail: "152576216@qq.com"
        },
        {
          companyName: "广东萌果科技有限公司",
          countriesRegions: "中国湛江",
          purchaseIntention: "汽车配件与建筑材料",
          name: "张雪",
          nationality: "中国",
          passportNumeber: "8373******4882",
          position: "市场部经理",
          mail: "152576216@qq.com"
        }
      ],
      formInline: {
        code: "",
        companyName: "",
        state: ""
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
      // console.log("submit!");
    },
    downloadAll() {
      // console.log("download!");
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style scoped>
.el-table {
  text-align: center;
}
.btn_recommend {
  background: #ff6600;
  color: white;
  margin: 20px 0px;
  height: 40px;
  padding: 0px 30px;
}
</style>

