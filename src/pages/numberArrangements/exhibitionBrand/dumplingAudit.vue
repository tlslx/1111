<template>
  <div>
    <el-tabs v-model="activeName" v-loading="loadinga"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(225, 225, 225)">
      <el-tab-pane label="审核企业资质" name="first">    
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" >
          <el-form-item label="申请展区" >
            <el-input v-model.trim="formInline.exhibitionAreaName" style="width: 170px;"></el-input>
          </el-form-item>
          <el-form-item label="广交会编码">
            <el-input v-model.trim="formInline.cantonFairCode" style="width: 170px;"></el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model.trim="formInline.companyName" style="width: 170px;"></el-input>        
          </el-form-item>
          <el-form-item label="企业编码">
            <el-input v-model="formInline.companyCode" style="width: 170px;"></el-input>
          </el-form-item>
          <el-form-item label="订金是否收齐" label-width="120">
            <el-select v-model="formInline.isSubscription"  style="width: 170px;">
              <el-option label="请选择" value="" ></el-option>
              <el-option label="已交齐" value="1"></el-option>
              <el-option label="已缴纳" value="2"></el-option>
              <el-option label="未缴纳" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float: right; margin-right: 190px">
            <el-button type="primary" style="padding: 8px 23px" @click="onSubmit">查询</el-button>
          </el-form-item>
            <el-table
          :data="tableData"
          border
          style="width: 100%" :header-cell-style="backg">
            <el-table-column align="center"
              prop="cantonFairCode"
              label="广交会编码"
              width="180">
            </el-table-column>
            <el-table-column align="center"
              prop="companyName"
              label="企业名称"
              width="180" >
              <template slot-scope="scope">
                <el-button type="text" @click="handle(scope.row)">{{scope.row.companyName}}</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center"
              prop="companyCode"
              label="企业编码">
            </el-table-column>
            <el-table-column align="center"
              prop="exhibitionAreaName"
              label="申请展区">
            </el-table-column>
            <el-table-column align="center"
              prop="scheduleBoothNumber" 
              label="申请展位数量">
            </el-table-column>
            <el-table-column align="center"
              prop="checkResult" 
              label="审核情况">
              <template slot-scope="scope">
                {{ scope.row.checkResult === '0' ? '未审核' : (scope.row.checkResult === '1' ? '审核通过' : '审核不通过')}}
              </template>
            </el-table-column>
            <el-table-column align="center"
              prop="isSubscription"
              label="订金是否收齐">
              <template slot-scope="scope">
                {{ scope.row.isSubscription === 0 ? '未缴纳' : (scope.row.isSubscription === 1 ? '已交齐' : '已缴纳')}}
              </template>
            </el-table-column>
            <el-table-column align="center"
              label="附件">
            </el-table-column>
          </el-table>
        </el-form>
        <el-form style="float: right; margin-top: 10px" :inline="true">
          <el-form-item >
            <el-pagination
              background
              layout="total, prev, pager, next, jumper"
              :total="paginationData.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="paginationData.currentPage"
              :page-size="paginationData.pageSize">
            </el-pagination>       
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
      backg: {
        'background-color': '#E4E4E4'
      },
      activeName: "first",
      formInline: {
        exhibitionAreaName: '',
        isSubscription: '',
        cantonFairCode: '',
        companyName: '',
        companyCode: ''
      },
      loadinga: true,
      companyId: '',
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
        { scheduleBoothNumber: '' }
      ]
    };
  },
  created() {
    let objOne = {
      "pageIndex": 1,
      "pageSize": 10
    };
    this.handleUserLists(objOne);
  },
  methods: {
    ...mapActions("enquireUnderpaid", [
      "getEnterprisePetails", "getEnterpriseQetails"
    ]),
    
    handle(id) {
      this.$router.push({
        path: '/review_business',
        query: {
          id
        }
      });
    },
    //分页
    handleCurrentChange(current) {
      let objOne = {
        "customQueryParams": [
        ],
        "pageIndex": current,
        "pageSize": 10 
      };
      let key = Object.keys(this.formInline);
      for (let i = 0; i < key.length; i++) {
        if (this.formInline[key[i]] !== "") {
          let listb = {
            "name": key[i],
            "findType": "LIKE",
            "joinType": "And",
            "dataType": 
            "Default",
            "values": [
              this.formInline[key[i]]
            ],
            "description": ""
          };
          objOne.customQueryParams.push(listb);
        }
      }
      // let listac = encodeURI(JSON.stringify(objOne));
      this.handleUserLists(objOne);
    },
    //接受后台数据
    handleUserLists(val) {
      let listac = encodeURI(JSON.stringify(val));
      this.getEnterpriseQetails(listac).then(res => {
        this.companyId = res.records.companyId;
        this.tableData = [];
        this.tableData = res.records;
        this.paginationData.currentPage = res.current;
        this.paginationData.pageSize = res.size;
        this.paginationData.total = res.total;
        this.loadinga = false;
      }).catch(e => {});
      this.loadinga = true;
    },
    handleSizeChange(size) {
    },
    //查询
    onSubmit() {
      let objOne = {
        "customQueryParams": [
        ],
        "pageIndex": 1,
        "pageSize": 10 
      };
      let key = Object.keys(this.formInline);
      for (let i = 0; i < key.length; i++) {
        if (this.formInline[key[i]] !== "") {
          let listb = {
            "name": key[i],
            "findType": "LIKE",
            "joinType": "And",
            "dataType": 
            "Default",
            "values": [
              this.formInline[key[i]]
            ],
            "description": ""
          };
          objOne.customQueryParams.push(listb);
        }
      }
      let lista = encodeURI(JSON.stringify(objOne));
      this.getEnterprisePetails(lista).then(res => {
        this.tableData = [];
        this.tableData = res.records;
        this.paginationData.currentPage = res.current;
        this.paginationData.pageSize = res.size;
        this.paginationData.total = res.total;
      }).catch(e => {});
    }
  }
};
</script>
<style >
/* .el-.el-table thead {
   background-color: #E4E4E4
 }*/
</style>

