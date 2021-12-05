<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="制作定金通知详情" name="first">
      <el-form :inline="true" style="height: 40px;" label-width="83px">
        <el-form-item label="展览代码："></el-form-item>
        <el-form-item label="展览名称："></el-form-item>
        <el-form-item label="届数："></el-form-item>
        <el-form-item label="交易团："></el-form-item>
      </el-form>
      <div style="margin-bottom: 20px;">
        <span>打印内容：</span>
        <el-checkbox-group v-model="checkList" style="display: inline-block;">
          <el-checkbox label="封面"></el-checkbox>
          <el-checkbox label="清单（定金）"></el-checkbox>
          <el-checkbox label="交易团"></el-checkbox>
        </el-checkbox-group>
      </div>
      <!-- 横线 -->
      <el-divider></el-divider>
      <el-tabs v-model="activeNameTwo" type="card" @tab-click="handleClick">
        <el-tab-pane label="封面" name="one">
          <h4 style="taxt-align: center;">第___届广交会展位定金缴款通知</h4>
          <div></div>
          <div style="width: 150px; height: 60px; flat: right;">
            <p>中国对外贸易中心</p>
            <p>2018-12-12</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="清单（定金）" name="two">
          <el-form :model="formData" :inline="true" size="small">
            <el-form-item label="期数：">
              <el-select v-model="queryForm.exhibitionSession" clearable>
                <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展区：">
              <el-select v-model="queryForm.exhibitionSession" clearable>
                <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSearch">筛选</el-button>
            </el-form-item>
          </el-form>
          <!-- table 表格 -->
          <simpleness-table
            :loading="loadingTwo"
            :tableData="tableDataTwo"
            :tableTrData="dataTwo"
            @edit="tableEdit"
          ></simpleness-table>
          <!-- 分页 -->
          <div style="padding-top: 10px;float: right;">
            <pagination
              :pageInfo="paginationData"
              @handle-size-change="handleSizeChange"
              @handle-current-change="handleCurrentChange"
            ></pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import SimplenessTable from "@/components/project/common1/simplenessTable";
import pagination from "@/components/project/common1/pagination";
import { mapActions } from "vuex";
export default {
  components: {
    "simpleness-table": SimplenessTable,
    pagination
  },
  data() {
    return {
      loadingTwo: false,
      tableDataTwo: [],
      checkList: [],
      isSelection: true,
      dataTwo: [
        {
          prop: "",
          label: "展区",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "一般性展位数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "品牌展位数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "展位总数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "标准展位费",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "计数百分比/固定值",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "预订款金额",
          type: "string",
          width: "90"
        }
      ],
      paginationData: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      exhibitionSessionOpts: [],
      delegationOpts: [],
      exhibitionAreaOpts: [],
      queryForm: {
        exhibitionSession: '',
        delegationId: '',
        exhibitionAreaCode: '',
        boothType: '',
        companyName: ''
      },
      activeName: "first",
      activeNameTwo: "one"
    };
  },
  created() {
    // 获取届数
    this.getsysExhibitions().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.exhibitionSessionOpts.push(res.data[i].exhibitionNum - 0);
      }
      let rul = (a, b) => a - b;
      this.exhibitionSessionOpts = this.exhibitionSessionOpts.sort(rul);
    });
    // 获取交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 获取展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  methods: {
    ...mapActions("exhibitionSettlement", [
      "getOrdinaryAdjustCompany"
    ]),
    ...mapActions("nainformation", [
      "getsysExhibitions", //获取展届信息
      "getdelegationDepartment", // 获取所有交易团
      "getexhibitionArea" // 获取展区
    ]),
    // 获取页面初始数据
    getListPage(url) {

    },
    // 组件打钩项
    handSele() {},
    // 组件打钩事件
    seChange(val) {
    },
    // 筛选
    onSearch() {

    },
    // 编辑
    edit(a) {
    },
    // 分条/页
    handleSizeChange(val) {
      this.obj.size = val;
      this.getListPage(this.obj);
    },
    // 分页
    handleCurrentChange(val) {
      this.obj.current = val;
      this.getListPage(this.obj);
    }
  }
};
</script>

