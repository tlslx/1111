<template>
  <!-- <div> -->
  <!-- 首页 -->
  <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="商协会提交品牌展位数量安排方案" name="first">
      <!-- form表单 -->
      <el-form :model="formData" size="small" :inline="true">
        <el-form-item label="交易团">
          <el-select v-model="formData.dealClusterId" clearable style="width: 150px;">
            <el-option :label="item.text" :value="item.value" v-for="(item, index) of optionDeal" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请展区">
          <el-select v-model="formData.exhibitionArea" clearable style="width: 150px;">
            <el-option :label="item.text" :value="item.value" v-for="(item, index) of optionExhi" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model.trim="formData.companyName" maxlength="24"></el-input>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input v-model.trim="formData.cantonFairCode" maxlength="24"></el-input>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary">上传</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" label="选择" type="selection" width="50"></el-table-column>
        <el-table-column align="center" label="企业基本信息">
          <el-table-column align="center" label="地区" prop="region" width="100"></el-table-column>
          <el-table-column align="center" label="商协会" prop="coceralName" width="100"></el-table-column>
          <el-table-column align="center" label="交易团" prop="dealClusterName" width="100"></el-table-column>
          <el-table-column align="center" label="申请企业名称" prop="companyName" width="100"></el-table-column>
          <el-table-column align="center" label="广交会编码" prop="cantonFairCode" width="100"></el-table-column>
          <el-table-column align="center" label="海关编码" prop="customCode" width="100"></el-table-column>
          <el-table-column align="center" label="企业属性" prop="companyAttribute" width="100"></el-table-column>
          <el-table-column align="center" label="企业类型" prop="companyType" width="100"></el-table-column>
          <el-table-column align="center" label="申请展区" prop="exhibitionAreaName" width="100"></el-table-column>
          <el-table-column align="center" :label="lastBoothNumber" prop="lastBoothNumber" width="100"></el-table-column>
          <el-table-column align="center" label="申请展位数" prop="applyBoothNumber" width="100"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="品牌展位预安排数" prop="provisionNumber">
          <template slot-scope="scope">
            <el-input @change="provNum(scope.$index, scope.row.provisionNumber)" maxlength="8" v-model.trim="scope.row.provisionNumber"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="评审总分" prop="coceralTotalGrade"></el-table-column>
        <el-table-column align="center" label="是否达标" prop="isStandard"></el-table-column>
        <el-table-column align="center" label="评审项目得分">
          <el-table-column align="center" label="出口额" prop="coceralExportScore" width="150"></el-table-column>
          <el-table-column align="center" label="行业自律" prop="selfDisciplineScore" width="150"></el-table-column>
          <el-table-column align="center" label="品牌建设" prop="brandBuildScore"></el-table-column>
          <el-table-column align="center" label="专利与版权" prop="patentsScore" width="120"></el-table-column>
          <el-table-column align="center" label="高新技术企业或高新技术产品" prop="newHighScore" width="120"></el-table-column>
          <el-table-column align="center" label="国家标准或行业标准" prop="standardScore" width="120"></el-table-column>
          <el-table-column align="center" label="质量、环境管理体系认证" prop="qualityScore" width="150"></el-table-column>
          <el-table-column align="center" label="面向企业的行业认证" prop="industryScore" width="150"></el-table-column>
          <el-table-column align="center" label="面向产品或生产线的行业认证数" prop="industryScore" width="150"></el-table-column>
          <el-table-column align="center" label="境内商标" prop="territoryScore" width="120"></el-table-column>
          <el-table-column align="center" label="境外商标" prop="beyondScore" width="120"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="授权子公司名称" prop="correlationCompanyName" width="120"></el-table-column>
        <!-- <el-table-column align="center" label="备注" prop="remark" width="120"></el-table-column> -->
      </el-table>
      <el-button type="primary" @click="handelAdd" style="margin-left: 10px;">方案保存</el-button>
      <el-button type="danger" @click="planSubmit" style="margin-left: 10px;">方案提交</el-button>
      <el-button type="primary" style="margin-left: 10px;">下载</el-button>
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
            :page-size="paginationData.pageSize"
          ></el-pagination>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
  <!-- </div> -->
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      localstora: {}, // 字典
      lastBoothNumber: "", //上届展位数
      planSub: [], // 方案提交
      saveScheme: [], // 方案保存
      fullLoading: true,
      optionDeal: [], // 交易团
      optionExhi: [], // 申请展区
      obj: {
        current: "1",
        size: "10",
        coceralId: "1"
      },
      paginationData: {
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 40
      },
      formData: {
        dealClusterId: "", // 交易团
        exhibitionArea: "", // 申请展区
        companyName: "", // 企业名称
        cantonFairCode: "" // 广交会编码
      },
      tableData: [],
      activeName: "first"
    };
  },
  mounted() {
    this.localstora = JSON.parse(localStorage.getItem("dictData"));
    this.optionDeal = this.localstora.delegation;
    this.optionExhi = this.localstora.exhibitionArea;
    this.getPage(this.obj);
  },
  methods: {
    ...mapActions("businessAssociationSubmission", [
      "getbusinessAssociation", // 查询/获取页面数据
      "savebusinessAssociation", // 单个方案保存
      "savebatchBusinessAssociation", // 批量方案保存
      "savesubmitQuantityPlan" // 方案提交批量
    ]),
    // 输入框的校验事件
    provNum(val, data) {
      if (data.replace(/^([1-9][0-9]*)$/, "")) {
        this.$message("品牌展位预安排数只能输入正整数");
        this.tableData[val].provisionNumber = "";
      }
      for (let i = 0; i < this.saveScheme.length; i++) {
        if (this.saveScheme[i].brandApplyId === this.tableData[val].brandApplyId) {
          this.saveScheme[i].provisionNumber = this.tableData[val].provisionNumber;
        }
      }
    },
    // 查询按钮功能实现（暂无数据）
    onSearch() {
      this.obj = {
        current: "1",
        size: "10",
        coceralId: "1"
      };
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        let aFirst = key[i];
        let bSecend = this.formData[key[i]];
        if (bSecend !== "") {
          this.obj[aFirst] = bSecend;
        }
        this.getPage(this.obj);
      }
    },
    // 表格勾选时的事件
    handleSelectionChange(val) {
      this.saveScheme = [];
      this.planSub = [];
      if (val.length === 0) {
        this.saveScheme = [];
        this.planSub = [];
      } else {
        for (let i = 0; i < val.length; i++) {
          let checkBox = {};
          let checkBoxSub = {};
          checkBox["provisionNumber"] = val[i].provisionNumber;
          checkBox["brandApplyId"] = val[i].brandApplyId;
          checkBoxSub["brandApplyId"] = val[i].brandApplyId;
          this.saveScheme.push(checkBox);
          this.planSub.push(checkBoxSub);
        }
      }
    },
    // 分页
    handleCurrentChange(val) {
      this.obj.current = val;
      this.getPage(this.obj);
    },
    // 方案保存
    handelAdd() {
      let flag = true;
      if (this.saveScheme.length === 0) {
        this.$message("请勾选您要保存的方案");
      } else {
        for (let i = 0; i < this.saveScheme.length; i++) {
          if (this.saveScheme[i].provisionNumber === "") {
            this.$message("您要保存的品牌展位预安排数不能为空");
            // break;
            flag = false;
          }
        }
        if (flag) {
          this.savebatchBusinessAssociation(this.saveScheme)
              .then(res => {
                this.$message("方案保存成功");
                this.getPage(this.obj);
              })
              .catch(e => {});
        }
      }
    },
    // 方案提交
    planSubmit() {
      if (this.planSub.length === 0) {
        this.$message("请勾选您要提交的方案");
      } else {
        this.savesubmitQuantityPlan(this.planSub).then(res => {
          this.$message("方案提交成功");
          this.getPage(this.obj);
        }).catch(e => {});
      }
    },
    handelCheck() {},
    // 获取页面数据
    getPage(getData) {
      this.getbusinessAssociation(getData)
        .then(res => {
          this.fullLoading = false;
          this.paginationData.currentPage = res.list.current;
          this.paginationData.pageSize = res.list.size;
          this.paginationData.total = res.list.total;
          this.tableData = JSON.parse(JSON.stringify(res.list.records));
          this.lastBoothNumber = res.exhibitionSession + "届品牌展位数";
        })
        .catch(e => {});
    }
  }
};
</script>

