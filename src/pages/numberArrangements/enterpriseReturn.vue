<template>
  <div>
    <el-tabs v-model="activeName" v-loading="loadinga"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(225, 225, 225)">
      <el-tab-pane label="交易团查看企业退回申请书" name="first">
      <!-- form表单 -->
      <el-form :inline="true" :model="formData" size="small">
        <el-form-item label="广交会编码">
          <el-input v-model.trim="formData.cantonFairCode"></el-input>
        </el-form-item>
        <el-form-item label="审核结果">
          <el-select v-model="formData.checkStatus">
            <el-option label="请选择" value=""></el-option>
            <el-option label="未审核" value="0"></el-option>
            <el-option label="审核通过" value="1"></el-option>
            <el-option label="审核不通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model.trim="formData.companyName"></el-input>
        </el-form-item>
        <el-form-item label="情况分类" >
          <el-select v-model="formData.backType">
            <el-option label="请选择" value=""></el-option>
            <el-option label="全部返回" value="1"></el-option>
            <el-option label="部分返回" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-input v-model.trim="formData.dealClusterName"></el-input>
        </el-form-item>
        <el-form-item label="展期">
          <el-select v-model="formData.exhibitionPeriod">
            <el-option label="请选择" value=""></el-option>
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发起方">
          <el-select v-model="formData.applyRole">
            <el-option label="请选择" value=""></el-option>
            <el-option label="企业" value="1"></el-option>
            <el-option label="交易团" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-input v-model.trim="formData.exhibitionAreaName"></el-input>
        </el-form-item>
        <el-form-item style="float: right; margin-right: 50px;">
          <el-button type="primary" style="padding: 10px 20px" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- tabel表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="dealClusterName" label="交易团"></el-table-column>
        <el-table-column align="center" prop="applyRole" label="发起方">
          <template slot-scope="scope">
            {{scope.row.applyRole === '1' ? '企业' : '交易团'}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="companyName" label="企业名称"></el-table-column>
        <el-table-column align="center" prop="exhibitionPeriod" label="展期"></el-table-column>
        <el-table-column align="center" prop="exhibitionAreaName" label="展区"></el-table-column>
        <el-table-column align="center" prop="cantonFairCode" label="广交会编号"></el-table-column>
        <el-table-column align="center" prop="backType" label="情况分类">
          <template slot-scope="scope">
            {{scope.row.backType === 1 ? '全部退回' : '部分退回'}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="backReason" label="退回原因">
        </el-table-column>
        <el-table-column align="center" prop="attachment" label="附件">
          <template slot-scope="scope">
            <img src="" alt="">
          </template>
        </el-table-column>
        <el-table-column align="center" label="审核结果" prop="checkStatus">
          <template slot-scope="scope">
            <span style="color: #0f0; cursor: pointer;" @click="ofTrue">
              {{ scope.row.checkStatus === '1' ? '审核通过' : (scope.row.checkStatus === '2'? '审核不通过' : '未审核')}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-button type="primary" style="margin-top: 10px">下载</el-button>
      <el-form :inline="true" style="float: right; margin-top: 10px">
        <el-form-item>
          <el-pagination
            style="margin-top: 5px;"
            background
            layout="total, prev, pager, next, jumper"
            :total="paginationData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationData.currentPage"
            :page-size="paginationData.pageSize">
          </el-pagination>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
      </el-tab-pane>
   </el-tabs>
  </div> 
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      activeName: "first",
      isShow: false,
      fileList: [],
      audit: '',
      classific: '',
      itiator: '',
      exhibi: '',
      appyRole: [],
      loadinga: true, 
      paginationData: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      pageDate: {
        "pageIndex": 1,
        "pageSize": 10
      },
      tableData: [
      ],
      formData: {
        exhibitionAreaName: '',
        companyName: '',
        dealClusterName: '',
        cantonFairCode: '',
        exhibitionPeriod: '',
        backType: '',
        checkStatus: '',
        applyRole: ''
      }
    };
  },
  created() {
    this.handleUserList(this.pageDate);
  },
  methods: {
    ...mapActions("enterprisesConfirm", ["getEnterpriseReturn"]),
    ofTrue() {},
    // 分页
    handleCurrentChange(currentPage) {
      let objOne = {
        "customQueryParams": [
        ],
        "pageIndex": currentPage,
        "pageSize": 10
      };
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        if (this.formData[key[i]] !== "" && this.formData[key[i]] != null) {
          let listb = {
            "name": key[i],
            "findType": "LIKE",
            "joinType": "And",
            "dataType": 
            "Default",
            "values": [
              this.formData[key[i]]
            ],
            "description": ""
          };
          objOne.customQueryParams.push(listb);
        }
      }
      // let lista = encodeURI(JSON.stringify(objOne));
      this.handleUserList(objOne);
    },
    handleSizeChange(size) {
    },
    handelCheck() {
      this.$router.push("/tradeGroupAudit");
    },
    handelAdd() {
      this.isShow = true;
    },
    handelServe() {
      this.isShow = false;
    },
    // 查询按钮
    onSubmit() {
      //查询时后台需要的格式数据
      let objOne = {
        "customQueryParams": [
        ],
        "pageIndex": 1,
        "pageSize": 10
      };
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        if (this.formData[key[i]] !== "" && this.formData[key[i]] != null) {
          let listb = {
            "name": key[i],
            "findType": "LIKE",
            "joinType": "And",
            "dataType": 
            "Default",
            "values": [
              this.formData[key[i]]
            ],
            "description": ""
          };
          objOne.customQueryParams.push(listb);
        }
      }
      this.handleUserList(objOne);
      // let lista = encodeURI(JSON.stringify(objOne));
      // this.getEnterpriseReturn(lista).then(res => {
      //   this.tableData = res.records;
      //   this.paginationData.pageSize = res.size;
      //   this.paginationData.currentPage = res.current;
      //   this.paginationData.total = res.total;
      // }).catch(e => {});
    },
    // 请求后台数据
    handleUserList(val) {  
      let getUrl = encodeURI(JSON.stringify(val));
      this.getEnterpriseReturn(getUrl).then(res => {
        this.tableData = res.records;
        this.paginationData.pageSize = res.size;
        this.paginationData.currentPage = res.current;
        this.paginationData.total = res.total;
        this.loadinga = false;
      }).catch(e => {});
    }
  } 
};
</script>
<style scoped>
</style>



