<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="查看发票列表" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="届数" size="mini" prop="exhibitionNum">
          <el-select  placeholder="请选择" v-model="ruleForm.exhibitionNum">
            <el-option v-for="(item, index) in exhibitionNum" :key="index"
              :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期数" size="mini" prop="exhibitionSession">
          <el-select  placeholder="请选择" v-model="ruleForm.exhibitionSession">
            <el-option label="1" :value="1"></el-option>
            <el-option label="3" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="searchList">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableForm"
        style="width: 100%;">
        <el-table-column
          prop="exhibitionNum"
          label="届数"
          align="center" >
        </el-table-column>
        <el-table-column
          prop="exhibitionSession"
          label="期数"
          align="center">
        </el-table-column>
        <el-table-column
          label="付款通知书编号"
          align="center">
          <template slot-scope="scope">
            <el-button  type="text" size="small" @click="handleView(scope.row, scope.index)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="companyNameCh"
          label="企业名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="proformaInvoiceId"
          label="发票编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="invoiceTime"
          label="开票时间"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right">
          <template slot-scope="scope">
            <el-button @click="pointUpload(scope.row, scope.$index)" type="text" size="small" >下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <div class="footer-btn"><el-button type="primary" @click="toADD">申请开具增值税发票</el-button></div>
    <div class="pageModel">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page = 1
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"></el-pagination>
      </div>
      <el-dialog title="查看" :visible.sync="dialogProduct" width="30%" center>
        <div style="margin-bottom: 50px;">
          <span style="float: left">付款通知书编号:</span>
          <ul style="margin-left: 110px" v-for="item in codeList" :key="item">
            <li class="li-style">
              {{item}}
            </li>
          </ul>
        </div>
        <div class="btn-style">
          <el-button type="danger" @click="dialogProduct = false">确定</el-button>
          <el-button @click="dialogProduct = false">取消</el-button>
        </div>
      </el-dialog>
  </el-tabs>

</template>
<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
import tableMixIn from "@/utils/helper/tableMixIn";
import { mapActions, mapGetters } from "vuex";
export default {
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      activeName: "first",
      dialogProduct: false,
      total: 0,
      codeList: [],
      ruleForm: {
        exhibitionNum: "",
        exhibitionSession: 1
      },
      tableForm: [],
      addedValueTax: [],
      param: {
        type: 0,
        size: 10,
        current: 1,
        isAsc: true,
        orgType: 0,
        exhibitionNum: "",
        exhibitionSession: "",
        orderByField: "ifo_proforma_invoice.create_date"
      }
    };
  },
  computed: {
    ...mapGetters('commonStore', ['exhibitionNum', "currentExhibition"])
  },
  async created() {
    if (!this.exhibitionNum) {
      await this.getExhibitionNum().then(res => {
        if (res) {
          let array = [];
          for (let item of res) {
            array.push({
              label: item.exhibitionNum,
              value: item.exhibitionNum,
              current: item.current
            });
          }
          this.$store.commit('commonStore/EXHIBITION_NUM', array);
          for (let item of this.exhibitionNum) {
            if (item.current) {
              this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
              this.ruleForm.exhibitionNum = this.currentExhibition;
              break;
            }
          }
        }
      });
    } else if (!this.currentExhibition) {
      for (let item of this.exhibitionNum) {
        if (item.current) {
          this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
          this.ruleForm.exhibitionNum = this.currentExhibition;
          break;
        }
      }
    } else {
      this.ruleForm.exhibitionNum = this.currentExhibition;
    }
    // 获取增值税发票信息
    // this.ifoAddedValueInvoice(Object.assign(this.param, this.ruleForm)).then(res => {
    //   this.addedValueTax = res;
    //   this.addedValueTax.invoiceType = "增值税";
    // });

    // 更新增值税发票信息 保存按钮接口
    this.getIfoAddedValueInvoiceInfo(Object.assign(this.param, this.ruleForm)).then(res => {
      this.total = res.total;
      this.tableForm = res.records;
      this.codeList = res.records.paymentNotificationIds;
    });
  },
  methods: {
    ...mapActions('invoiceList', ['ifoAddedValueInvoice']),   // 获取增值税发票信息
    ...mapActions('invoiceList', ['getIfoAddedValueInvoiceInfo']),   // 更新增值税发票信息 保存按钮接口

    ...mapActions("commonStore", ["getExhibitionNum", "getExhibitionPlace", "downFileMethods"]),
    // 查询功能
    searchList() {
      if (this.ruleForm.exhibitionNum) {
        this.param.exhibitionNum = this.ruleForm.exhibitionNum;
      } else {
        this.param.exhibitionNum = "";
      }
      if (this.ruleForm.exhibitionSession) {
        this.param.exhibitionSession = this.ruleForm.exhibitionSession;
      } else {
        this.param.exhibitionSession = "";
      }
      this.getIfoAddedValueInvoiceInfo(this.param).then(res => {
        this.tableForm = res.records;
      });
    },
    // 打开查看列表
    handleView(row, index) {
      this.codeList = row.paymentNotificationIds;
      this.dialogProduct = true;
    },
    // 跳转到新增增值税发票页面
    toADD() {
      // this.$router.push({
      //   path: '/addInvoice',
      //   query: {
      //     data: this.addedValueTax
      //   }
      // });
      this.$alert('请联系招展代理开具增值税发票', {
        confirmButtonText: '确定',
        callback: action => {
          return true;
        }
      });
    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.param.size = val;
      this.getIfoAddedValueInvoiceInfo(this.param).then(res => {
        this.tableForm = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.param.current = val;
      this.getIfoAddedValueInvoiceInfo(this.param).then(res => {
        this.tableForm = res.records;
        this.total = res.total;
      });
    },
    // 单行下载
    pointUpload(row, index) {
      let downLoadfile = {
        fileId: row.fileId
      };

      let url = '/api/ifoFile/get?fileId=' + downLoadfile.fileId;
      this.downLoadfile(url);
    }
  }
};
</script>
<style scoped>
.btn-style{
text-align: center;
padding-bottom: 20px;
}
.li-style{
list-style:none;
cursor:pointer;
}
.footer-btn{
  margin-top: 40px;
  margin-left: 20px;
  float: left;
}
.pageModel{
  float: right;
  margin-top: 40px;
  margin-right: 20px;
}
</style>

