<template>
  <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="交易团反馈品牌数量安排方案公示意见" name="first">
      <!-- form表单 -->
      <el-form :model="formData" size="small" :inline="true">
        <el-form-item label="商协会">
          <el-select v-model="formData.coceralName" clearable>
            <el-option
              v-for="(item, index) in localstora.businessAssociation"
              :key="index"
              :label="item.deptName"
              :value="item.deptName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="formData.exhibitionAreaName" clearable>
            <el-option
              v-for="(item, index) in localstora.exhibitionArea"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评审企业">
          <!-- <el-input v-model="formData.companyName"></el-input> -->
          <el-select v-model="formData.companyName" clearable>
            <el-option label="请选择" value=""></el-option>
            <el-option label="北京好贵文化传媒公司1" value="北京好贵文化传媒公司1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="formData.dealClusterName" clearable>
            <el-option
              v-for="(item, index) in localstora.delegation"
              :key="index"
              :label="item.deptName"
              :value="item.deptName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button class="fRight" type="primary" size="small" @click="onSearch">查询</el-button>
      </el-form>
      <!-- table表格 -->
      <el-table :data="tableData" style="width: 100%" border class="bBottom">
        <template v-for="(item, index) in tableDataMin">
          <el-table-column :key="index" align="center" :label="item.label" :prop="item.prop" v-if="item.aFirst">
            <template slot-scope="scope">
              <span>{{scope.row.status === "1" ? "已提交" : "未提交"}}</span>
            </template>
          </el-table-column>
          <el-table-column :key="index" align="center" v-else :label="item.label" :prop="item.prop"></el-table-column>
        </template>
        <el-table-column label="操作" align="center" prop="hh">
          <template slot-scope="scope">
            <el-button type="primary" @click="register(scope.row)">登记</el-button>
            <el-button type="primary" @click="cancelDispute(scope.row)">取消异议</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <!-- 分页 -->
    <el-button class="rlMargin" type="danger" :disabled="hanSur" @click="onSubmit">提交外贸司</el-button>
    <el-button type="primary" @click="download">下载</el-button>
    <el-form :inline="true" style="float: right;" class="mBottom">
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
      <el-form-item>
        <el-button type="primary">确定</el-button>
      </el-form-item>
    </el-form>
    <!-- 登记弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="500px" @close="closeDialog">
      <el-form>
        <el-form-item label="异议内容：" class="mright">
          <el-input type="textarea" rows="5" maxlength="128" v-model="dissentDetails"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 取消登记弹框 -->
    <el-dialog title="提示" :visible.sync="isCancel" width="500px" @close="closeCancel">
      <p class="ctext">是否确认取消异议内容？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isCancel = false">取 消</el-button>
        <el-button type="primary" @click="cancelSure">确 定</el-button>
      </span>
    </el-dialog>
  </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      hanSur: false,
      obj: {
        current: "1",
        size: "10"
        // coceralName: "",
        // exhibitionAreaName: "",
        // companyName: "",
        // dealClusterName: ""
      }, // 初始化传参
      isCancel: false, //取消登记弹框是否显示
      dialogVisible: false, //登记弹框是否显示控件
      dissentDetails: "", //异议内容
      regist: {
        publicityId: "",
        objectionContent: ""
      },
      fullLoading: true, // loading加载
      // 表格绑定字段
      tableDataMin: [
        { label: "评审企业", prop: "companyName" },
        { label: "所属交易团", prop: "dealClusterName" },
        { label: "展区", prop: "exhibitionAreaName" },
        { label: "商协会", prop: "coceralName" },
        { label: "原安排展位数", prop: "beforeNumber" },
        { label: "反馈状态", prop: "isDispose", aFirst: true },
        { label: "异议内容", prop: "objectionContent" }
      ],
      // 分页
      paginationData: {
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 40
      },
      // 表格数据
      tableData: [],
      // 表单绑定字段
      formData: {
        coceralName: "", // 商协会
        exhibitionArea: "", // 展区
        appraisalCompany: "", //评审企业
        dealClusterId: "" //交易团
      },
      localstora: {
        exhibitionArea: [], // 展区
        delegation: [], // 交易团
        businessAssociation: [] // 商协会
      }, // 数据字典
      activeName: "first"
    };
  },
  mounted() {
    this.obj.coceralName = "";
    this.obj.exhibitionAreaName = "";
    this.obj.companyName = "";
    this.obj.dealClusterName = "";
    this.getListPage(this.obj);
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      this.localstora.businessAssociation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  methods: {
    ...mapActions("feedbackBrand", [
      "getfeedBackList", // 获取
      "addobjectionTrad", // 添加异议内容
      "cancelobjectionTrad", // 取消异议内容
      // "downloadtrad", // 下载反馈意见汇总
      "commitstatusTrad" // 提交外贸司
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment", // 交易团
      "getassociationDepartment" // 商协会
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getfeedBackList(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.paginationData.total = res.total;
          this.tableData = JSON.parse(JSON.stringify(res.records));
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].isDispose !== "1") {
              this.hanSur = false;
            } else {
              this.hanSur = true;
            }
          }
        })
        .catch(e => {});
    },
    // 查询
    onSearch() {
      this.obj.coceralName = this.formData.coceralName; //商协会
      this.obj.exhibitionAreaName = this.formData.exhibitionAreaName; //展区
      this.obj.companyName = this.formData.companyName; // 评审企业
      this.obj.dealClusterName = this.formData.dealClusterName; // 交易团
      this.getListPage(this.obj);
    },
    // 关闭登记弹框
    closeDialog() {
      this.dissentDetails = "";
    },
    // 关闭取消登记弹框
    closeCancel() {},
    // 登记确定
    dialogSure() {
      this.dialogVisible = false;
      this.regist.objectionContent = this.dissentDetails;
      this.addobjectionTrad(this.regist)
        .then(res => {
          this.getListPage(this.obj);
        })
        .catch(e => {});
    },
    // 取消登记的确定按钮
    cancelSure() {
      this.isCancel = false;
      this.cancelobjectionTrad(this.regist)
        .then(res => {
          this.getListPage(this.obj);
        })
        .catch(e => {});
    },
    // 取消异议
    cancelDispute(val) {
      this.regist.publicityId = val.publicityId;
      this.regist.objectionContent = "";
      this.dissentDetails = val.objectionContent;
      this.isCancel = true;
    },
    // 登记
    register(val) {
      this.regist.publicityId = val.publicityId;
      this.dissentDetails = val.objectionContent;
      this.dialogVisible = true;
    },
    // 分页
    handleCurrentChange(val) {
      this.obj.current = val;
      this.getListPage(this.obj);
    },
    // 提交外贸司
    onSubmit() {
      this.$confirm('提交外贸司?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.commitstatusTrad(this.obj)
        .then(res => {
          this.getListPage(this.obj);
          this.hanSur = true;
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
        })
        .catch(e => {
          this.$message("您已提交，请不要重复提交");
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '提交失败!'
        });          
      });
      
    },
    // 下载
    download() {
      this.$router.push({
        path: "/downloadTemplatefb",
        query: { Obj: this.obj }
      });
    }
  }
};
</script>
<style scoped>
.ctext {
  font-size: 16px;
  text-align: center;
}
/* 查询按钮样式 */
.fRight {
  float: right;
  margin-right: 30px;
}
/* table表格样式 */
.bBottom {
  margin-bottom: 10px;
}
/* 登记提示框样式 */
.mright {
  padding-right: 30px;
}
/* 分页样式 */
.rlMargin {
  margin: 0 10px;
}
/* 为弹框的出现提供支持 */
.mBottom {
  margin-bottom: 500px;
}
</style>

