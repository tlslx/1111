<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="管理员查看企业申请展位信息" name="first">
      <!-- form表单 -->
      <el-form :inline="true" :model="formData" size="small">
        <el-form-item label="申请展区">
          <el-select v-model="formData.exhibitionArea" @change="changeTwo" placeholder="请选择">
            <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展品分类">
          <el-select v-model="formData.exhibitsCategory" placeholder="请选择">
            <el-option v-for="(itemTwo, indexTwo) in optionsTwo" :key="indexTwo" :label="itemTwo.label" :value="itemTwo.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model.trim="formData.companyName" maxlength="24"></el-input>
        </el-form-item>
        <el-form-item style="float: right; margin-right: 50px;">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- tabel表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="exhibitionAreaName" label="展区"></el-table-column>
        <el-table-column align="center" prop="companyName" label="企业名称"></el-table-column>
        <el-table-column align="center" prop="boothType" label="展位类型"></el-table-column>
        <el-table-column align="center" prop="exhibitsCategory" label="展品分类"></el-table-column>
        <el-table-column align="center" prop="customCode" label="参评海关编码"></el-table-column>
        <el-table-column align="center" prop="territory" label="参评境外注册商标"></el-table-column>
        <el-table-column align="center" prop="beyond" label="境内注册商标"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-form :inline="true" style="float: right;">
        <el-form-item>
          <el-pagination
            style="margin-top: 5px;"
            background
            layout="total, prev, pager, next, jumper"
            :total="paginationData.total"
            @current-change="handleCurrentChange"
            :current-page="paginationData.currentPage"
            :pager-count="paginationData.pagerCount"
            :page-size="paginationData.pageSize">
          </el-pagination>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      fullLoading: true,
      obj: {
        'dealClusterId': "1",
        'current': "1",
        'size': "10"
      },
      activeName: "first",
      options: [
        { label: "全部", value: "" },
        { label: "家电", value: "a101" },
        { label: "家纺", value: "a102" },
        { label: "工程农机（室外）", value: "a103" }
      ],
      optionsOne: [
        { 
          value: "EH04", child: [
            { label: "洗衣机", value: "洗衣机" },
            { label: "电视机", value: "电视机" }
          ]
        },
        { 
          value: "EH05", child: [
            { label: "广播", value: "广播" },
            { label: "电子元器", value: "电子元器" }
          ]
        },
        { 
          value: "EH02", child: [
            { label: "灯具", value: "灯具" },
            { label: "连接器", value: "连接器" },
            { label: "电源", value: "电源" }
          ]
        },
        { 
          value: "HT02", child: [
            { label: "锁类", value: "锁类" },
            { label: "拉手类", value: "拉手类" },
            { label: "门窗类", value: "门窗类" }
          ]
        },
        { 
          value: "HT01", child: [
            { label: "扳手", value: "扳手" },
            { label: "剪刀", value: "剪刀" },
            { label: "计算器", value: "计算器" }
          ]
        }
      ],
      optionsTwo: [],
      paginationData: {
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 40
      },
      tableData: [],
      formData: {
        exhibitionArea: "",
        exhibitsCategory: "",
        companyName: ""
      }
    };
  },
  mounted() {
    this.getListPage(this.obj);
  },
  methods: {
    ...mapActions('tradeGroupAudit', ['getdealClusterQueryApply']),
    handleCurrentChange(val) {
      this.obj["current"] = val;
      this.getListPage(this.obj);
    },
    getListPage(Url) {
      this.getdealClusterQueryApply(Url).then(res => {
        this.fullLoading = false;
        this.tableData = [];
        this.tableData = res.records;
        this.paginationData.total = res.total;
        this.paginationData.pageSize = res.size;
        this.paginationData.currentPage = res.current;
      }).catch(e => {});
    },
    handleClick() {},
    changeTwo() {
      this.optionsTwo = [];
      this.formData.exhibitsCategory = "";
      for (let i = 0; i < this.options.length; i++) {
        if (this.optionsOne[i].value === this.formData.exhibitionArea) {
          this.optionsTwo = this.optionsOne[i].child;
        }
      }
    },
    onSubmit() {
      this.obj = {
        'dealClusterId': "1",
        'current': "1",
        'size': "10"
      };
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        let aFirst = key[i];
        let bSecend = this.formData[key[i]];
        if (bSecend !== "") {
          this.obj[aFirst] = bSecend;
        }
        this.getListPage(this.obj);
      }
    }
  }
};
</script>
<style scoped>
/* .fcolor {
  color: #0f0;
}
.popup{
  position: absolute;
  left: 35%;
  top: 20%;
  width: 500px;
} */
</style>



