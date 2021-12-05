<template>
  <div v-loading="loading2"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(225, 225, 225)">
    <el-tabs v-model="activeName">     
      <el-tab-pane label="查询未缴齐订金企业" name="first">
        <el-card>
          <el-form :inline="true" :model="formData" size="small" >
            <el-form-item label="广交会编码">
              <el-input v-model.trim="formData.cantonFairCode" clearable></el-input>
            </el-form-item>
            <el-form-item label="是否已缴齐订金" label-width="120px">
            <el-select v-model="formData.isSubscription" clearable>
              <el-option label="请选择" value=""></el-option>
              <el-option label="已缴齐" value="1"></el-option>
              <el-option label="已缴纳" value="2"></el-option>
              <el-option label="未缴纳" value="0"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="企业名称">
              <el-input v-model.trim="formData.companyName" clearable></el-input>
            </el-form-item>
            <el-button type="primary" size="small" @click="handelCdit" style="float: right;padding: 8px 25px">查询</el-button>
            <el-table :data="tableData" border style="width: 100%" :header-cell-style="backg" id="divPrint">
              <el-table-column align="center"
                prop="companyName"
                label="企业名称"
                min-width="120">
              </el-table-column>
              <el-table-column align="center"
                prop="cantonFairCode"
                label="广交会编码"
                min-width="120">
              </el-table-column>
              <el-table-column align="center"
                prop="businessContactsCh"
                label="企业联系人">
              </el-table-column>
              <el-table-column align="center"
                prop="telephone"
                min-width="120"
                label="联系方式">
              </el-table-column>
              <el-table-column align="center"
                prop="isSubscription"
                min-width="120"
                label="是否已缴齐订金">
                <template slot-scope="scope">
                  {{scope.row.isSubscription === 0 ? '未缴纳' : (scope.row.isSubscription === 1 ? '已缴齐' : '已缴纳')}}
                </template>
              </el-table-column>
              <el-table-column align="center"
                prop="checkResult"
                min-width="120"
                label="审核状态">
                <template slot-scope="scope">
                  {{scope.row.checkResult | cheStatus}}
                </template>
              </el-table-column>
              <el-table-column align="center"
                prop="deposit"
                label="操作" width="300">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="handeldeposit(scope.row.boothAffirmId)">订金登记
                  </el-button>
                  <el-button size="mini" type="text"  :disabled="scope.row.dealClusterBackNumber != null && scope.row.dealClusterBackNumber !== '' && scope.row.dealClusterBackNumber !== 0" @click="handelAdit(scope.row.boothAffirmId)">退回申请</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-dialog title="登记" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false" @close="handelCure">
            <el-form :model="form">
              <el-form-item label="是否已缴齐订金" :label-width="formLabelWidth">
                <el-select v-model="form.isSubscription"  style="width: 120px">
                  <el-option label="已缴齐" value="1"></el-option>
                  <el-option label="已缴纳" value="2"></el-option>
                  <el-option label="未缴纳" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="handelBure">取 消</el-button>
              <el-button type="danger" size="small" @click="handelSure" >确 定</el-button>
            </span>
          </el-dialog>
          <el-button style="margin-top: 20px;" type="primary" size="small" @click="handDownload">下载</el-button>
          <el-form :inline="true" style="float: right;">
            <el-form-item>
              <el-pagination
                style="margin-top: 20px;"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="paginationData.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="paginationData.pageSizes"
                :current-page="paginationData.currentPage"          
                :page-size="paginationData.pageSize">
              </el-pagination>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>    
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      backg: {
        'background-color': '#E4E4E4'
      },
      activeName: 'first',
      formData: {
        cantonFairCode: '',
        checkStatu: '',
        companyName: ''
      },
      isSuer: true,
      form: {
        isSubscription: ''
      },
      loading2: false,
      id: 1,
      pageDate: {
        "current": 1,
        "size": 10
      },
      boothAffirmId: '',
      formLabelWidth: '120px',
      dialogVisible: false,
      tableData: [
      ]
    };
  },
  filters: {
    cheStatus(val) {
      if (val === "0") {
        return "未审核";
      } else if (val === "1") {
        return "审核通过";
      } else if (val === "2") {
        return "审核不通过";
      } else {
        return "未审核";
      }
    }
  },
  created() {
    let obj = {
      cantonFairCode: this.formData.cantonFairCode,
      isSubscription: this.formData.isSubscription,
      companyName: this.formData.companyName, 
      "current": 1,
      "size": 10,
      dealClusterId: this.$store.getters.userInfo.org.deptId
    };
    this.pageDate["dealClusterId"] = this.$store.getters.userInfo.org.deptId;
    this.handelLure(obj);
  },
  methods: {
    ...mapActions("enquireUnderpaid", [
      "getUnderpaidPeposit",
      "postRegisteredBnterprise"
    ]),
    // 接受后台数据
    handelLure(val) {
      this.getUnderpaidPeposit(val).then(res => {
        this.boothAffirmId = res.records.boothAffirmId;
        this.tableData = res.records;
        this.paginationData.currentPage = res.current;
        this.paginationData.pageSize = res.size;
        this.paginationData.total = res.total;   
        this.loading2 = false;    
      }).catch(e => {});
    },
    // 订金
    handeldeposit(boothAffirm) {
      this.dialogVisible = true;
      this.form['boothAffirmId'] = boothAffirm;
    },
    // 确定
    handelSure() {
      this.dialogVisible = false;
      let obj = {
        'isSubscription': this.form.isSubscription,
        'boothAffirmId': this.form.boothAffirmId
      };
      this.postRegisteredBnterprise(obj).then(res => {
        this.handelLure(this.pageDate);
      }).catch(e => {});
    },
    back() {},
    // 取消
    handelBure() {
      this.dialogVisible = false;
      this.form.isSubscription = '';
    },
    // 关闭遮罩层
    handelCure() {
      this.form.isSubscription = '';
    },
    ofTrue() {},
    // 分页
    handleCurrentChange(current) {
      let obj = {
        cantonFairCode: this.formData.cantonFairCode,
        isSubscription: this.formData.isSubscription,
        companyName: this.formData.companyName, 
        "current": current,
        "size": 10,
        dealClusterId: this.$store.getters.userInfo.org.deptId
      };
      this.handelLure(obj);
    },
    handleSizeChange(val) {
      let obj = {
        cantonFairCode: this.formData.cantonFairCode,
        isSubscription: this.formData.isSubscription,
        companyName: this.formData.companyName, 
        "current": 1,
        "size": val,
        dealClusterId: this.$store.getters.userInfo.org.deptId
      };
      this.handelLure(obj);
    },
    // 获取id 跳转
    handelAdit(id) {
      this.id = this.$router.history.current.query.id;
      this.$router.push({
        path: '/backConfirm',
        query: {
          id,
          explainType: 3
        }
      });
        
      // }
    },
    // 查询
    handelCdit() {
      let obj = {
        cantonFairCode: this.formData.cantonFairCode,
        isSubscription: this.formData.isSubscription,
        companyName: this.formData.companyName, 
        "current": 1,
        "size": 10,
        dealClusterId: this.$store.getters.userInfo.org.deptId
      };
      this.handelLure(obj);
    },
    // 下载
    handDownload() {
      let url = "cantonFairCode=" + this.formData.cantonFairCode + "&isSubscription=" + this.formData.isSubscription + "&companyName=" + this.formData.companyName + "&dealClusterId=" + this.$store.getters.userInfo.org.deptId;
      url = url.replace(/undefined/g, "");
      window.open(process.env.API_NA_URL + "/api/numberAffirm/download?" + url + "&token=" + localStorage.getItem("USER_TOKEN"), "_parent");
    }
  }
};
</script>


