<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="待安排展位数清单" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展期">
          <el-select v-model="queryForm.exhibitionPeriod" clearable>
            <el-option v-for="(item, index) in this.exhibitionPeriodOpts" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="arrangedBoothReorder.records" v-loading="loading" border>
        <el-table-column label="展期" prop="exhibitionPeriod" align="center"></el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="品牌展位数" prop="brandBoothNumber" align="center"></el-table-column>
        <el-table-column label="已确认品牌展位数" prop="affirmBoothNumber" align="center"></el-table-column>
        <el-table-column label="待安排品牌展位数" prop="arrangedBoothNumber" align="center"></el-table-column>
        <el-table-column label="收回退回总数" prop="totalReturn" align="center"></el-table-column>
        <el-table-column label="退回展位数" prop="totalBackNumber" align="center"></el-table-column>
        <el-table-column label="违规使用收回展位数" prop="illegalRecovery" align="center"></el-table-column>
        <el-table-column label="知识产权收回展位数" prop="intellectualProperty" align="center"></el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium" @click="handleDownload">下载</el-button>
          <el-button type="primary" size="medium" @click="dialogFormVisible = true">发送商协会</el-button>
          <el-dialog title="发送商协会" :visible.sync="dialogFormVisible" width="400px">
            <el-form label-width="100px">
              <el-form-item label="请选择商协会:">
                <el-checkbox-group v-model="paramData" @change="handleCheckedAssociationChange" >
                  <el-checkbox v-for="item in coceralOpts" :label="item.deptId" :key="item.deptCode">{{item.deptName}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleSendworkSendCoceralBoothArranged">确 定</el-button>
            </div>
          </el-dialog>
        </span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="arrangedBoothReorder.total">
        </el-pagination>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      activeName: 'first',
      loading: '',
      exhibitionAreaOpts: [],
      delegationOpts: [],
      companyOpts: [],
      coceralOpts: [],
      exhibitionPeriodOpts: [], // 展期
      backTypeOpts: [{ value: '1', label: '全部退回' }, { value: '2', label: '部分退回' }],
      dialogFormVisible: false, // [发送商协会]:弹框判断
      paramData: [], //[发送商协会]:勾选的数目
      queryForm: {
        exhibitionPeriod: '',
        exhibitionArea: '',
        dealClusterId: '',
        companyName: '',
        coceralId: '',
        backType: '',
        cantonFairCode: '',
        backReason: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  async beforeCreate() {
    // this.exhibitionAreaOpts = await kindo.dictionary.get('exhibitionArea'); // 展区
    this.exhibitionPeriodOpts = await kindo.dictionary.get('exhibitionPeriodNum'); // 展期
  },
  computed: {
    ...mapGetters('workDepartReturn', ['boothReorderData', 'arrangedBoothReorder']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        exhibitionPeriod: this.queryForm.exhibitionPeriod || 0,
      //  exhibitionArea: this.queryForm.exhibitionArea,
      //  dealClusterId: this.queryForm.dealClusterId,
      //  companyName: this.queryForm.companyName,
      //  coceralId: this.queryForm.coceralId,
      //  backType: this.queryForm.backType,
      //  cantonFairCode: this.queryForm.cantonFairCode,
      //  backReason: this.queryForm.backReason,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    //商协会
    this.getassociationDepartment().then(res => {
      this.coceralOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    if (this.$store.getters.userInfo.org.parentName.indexOf('商协会') !== -1 || this.$store.getters.userInfo.org.parentName.indexOf('商会') !== -1) {
      this.coceralOpts = {
        label: this.$store.getters.userInfo.org.deptName,
        value: this.$store.getters.userInfo.org.deptId
      };
      this.queryForm.coceralId = this.$store.getters.userInfo.org.deptCode;
    } else {
      // 商协会
      this.getassociationDepartment().then(res => {
        this.coceralOpts = JSON.parse(JSON.stringify(res));
      }).catch(e => {});
    }
    this.createdQuery();
  },
  methods: {
    ...mapActions('workDepartReturn', ['getBoothReorder', 'getArrangedBoothReorder']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getassociationDepartment']),
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    // 下载
    handleDownload() {
      let url = `exhibitionArea=${this.queryForm.exhibitionArea}&dealClusterId=${this.queryForm.dealClusterId}&companyName=${this.queryForm.companyName}&coceralId=${this.queryForm.coceralId}&backType=${this.queryForm.backType}&cantonFairCode=${this.queryForm.cantonFairCode}&backReason=${this.queryForm.backReason}&deptId=${this.$store.getters.userInfo.org.deptId}&deptName=${this.$store.getters.userInfo.org.deptName}&deptType=${this.$store.getters.userInfo.org.deptType}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/backArrange/selectNumberList/download?${url}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    handleSizeChange(val) {
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    //获取选择的商协会
    handleCheckedAssociationChange(val) {
    //  console.log(val);

      this.paramData = val;
     // console.log(this.paramData);
    },
    //发送选择的商协会
    handleSendworkSendCoceralBoothArranged() {
      if (this.paramData.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择要发送的商协会"
        });
      } else {
        let Data = [];
        for (let i = 0; i < this.paramData.length; i++) {
          Data.push({ "coceralId": this.paramData[i] });
        }
        this.$http.postJson(`${process.env.API_NA_URL}/api/backArrange/workSendCoceralBoothArranged`, Data).then(res => {
          this.dialogFormVisible = false;
          this.$message({
            type: "success",
            message: "提交成功"
          });
        });
      }
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
    //  this.getBoothReorder(this.formQuery).then(res => {
    //    this.loading = false;
    //  }).catch(e => {
    //    this.loading = false;
    //  });
      this.getArrangedBoothReorder(this.formQuery).then(res => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}
</style>
