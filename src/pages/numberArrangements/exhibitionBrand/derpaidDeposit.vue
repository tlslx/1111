<template>
  <div v-loading="loading2"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(225, 225, 225)">
    <el-tabs v-model="activeName">     
      <el-tab-pane label="查询未缴齐订金企业" name="first"></el-tab-pane>
      <el-form :inline="true" :model="formData" size="small" >
        <el-form-item label="广交会编码">
          <el-input v-model.trim="formData.cantonFairCode"></el-input>
        </el-form-item>
        <el-form-item label="是否已缴齐订金" label-width="120px">
         <el-select v-model="formData.isSubscription" >
          <el-option label="请选择" value=""></el-option>
          <el-option label="已交齐" value="1"></el-option>
          <el-option label="已缴纳" value="2"></el-option>
          <el-option label="未缴纳" value="0"></el-option>
         </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model.trim="formData.companyName"></el-input>
        </el-form-item>
        <el-button type="primary" @click="handelCdit" style="float: right;padding: 8px 25px">查询</el-button>
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="backg">
          <el-table-column align="center"
            prop="companyName"
            label="企业名称"
            width="180">
          </el-table-column>
          <el-table-column align="center"
            prop="cantonFairCode"
            label="广交会编码"
            width="180">
          </el-table-column>
          <el-table-column align="center"
            prop="businessContactsCh"
            label="企业联系人">
          </el-table-column>
          <el-table-column align="center"
            prop="telephone"
            label="联系方式">
          </el-table-column>
          <el-table-column align="center"
            prop="isSubscription"
            label="是否已缴齐订金">
            <template slot-scope="scope">
              {{scope.row.isSubscription === 0 ? '未缴纳' : (scope.row.isSubscription === 1 ? '已交齐' : '已缴纳')}}
            </template>
          </el-table-column>
          <el-table-column align="center"
            prop="checkResult"
            label="审核状态">
            <template slot-scope="scope">
              {{scope.row.checkResult === '1' ? '审核通过' : (scope.row.checkResult === '2' ? '审核不通过' : '未审核')}}
            </template>
          </el-table-column>
          <el-table-column align="center"
            prop="deposit"
            label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handeldeposit(scope.row.boothAffirmId)">订金登记
              </el-button>
              <el-button size="mini" type="text"  :disabled="scope.row.dealClusterBackNumber !== null" @click="handelAdit(scope.row.boothAffirmId)">退回申请</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <el-dialog title="登记" :visible.sync="dialogVisible" width="30%" @close="handelCure">
        <el-form :model="form">
          <el-form-item label="是否已交齐订金" :label-width="formLabelWidth">
            <el-select v-model="form.isSubscription"  style="width: 120px">
              <el-option label="已交齐" value="1"></el-option>
              <el-option label="已缴纳" value="2"></el-option>
              <el-option label="未缴纳" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button  @click="handelBure">取 消</el-button>
          <el-button type="danger"  @click="handelSure" >确 定</el-button>
        </span>
      </el-dialog>
      <el-button style="margin-top: 20px;" type="primary">下载</el-button>
      <el-form :inline="true" style="float: right;">
        <el-form-item>
          <el-pagination
            style="margin-top: 20px;"
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
          <el-button style="margin-top: 20px;" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-tabs>    
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      paginationData: {
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
      loading2: true,
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
  created() {
    let obj = {
      cantonFairCode: this.formData.cantonFairCode,
      isSubscription: this.formData.isSubscription,
      companyName: this.formData.companyName, 
      "current": 1,
      "size": 10
    };
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
        "size": 10
      };
      this.handelLure(obj);
    },
    handleSizeChange() {},
    // 获取id 跳转
    handelAdit(id) {
      this.id = this.$router.history.current.query.id;
      this.$router.push({
        path: '/back_confirm',
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
        "size": 10
      };
      this.handelLure(obj);
    }
  }
};
</script>
<style>

</style>


