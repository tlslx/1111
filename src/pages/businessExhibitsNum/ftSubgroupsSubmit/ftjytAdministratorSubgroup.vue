<template>
  <!-- <el-tabs v-model="activeName">
    <el-tab-pane label="交易团分团授权" name="first"> -->
  <el-card style="padding-bottom: 24px">
    <!-- 表单 -->
    <el-form :inline="true" :model="formData" size="small">
      <el-form-item label="分团">
        <el-select v-model="formData.delegationSubId" clearable>
          <el-option v-for="(item, index) in optionsub" :key="index" :label="item.deptName" :value="item.deptId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="授权状态">
        <el-select v-model="formData.authorizeStatus" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option label="已授权" value="1"></el-option>
          <el-option label="未授权" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="floatRight">
        <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" size="small" border>
      <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
      <el-table-column align="center" min-width="120" label="分团" prop="delegationSubName"></el-table-column>
      <el-table-column align="center" min-width="120" label="授权状态" prop="authorizeStatus">
        <template slot-scope="scope">
          {{scope.row.authorizeStatus | statusa}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="160" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" :disabled="scope.row.authorizeStatus === '1'" @click="handaccredit(scope.row, '1')">授权</el-button>
          <el-button type="text" :disabled="scope.row.authorizeStatus === '0'" @click="handaccredit(scope.row, '0')">取消授权</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 一堆按钮 -->
    <div class="paginationTop floatLeft">
      <el-button type="primary" size="small" class="formStyle" @click="isExhibit = true">新增</el-button>
    </div>
    <!-- 分页 -->
    <div class="floatRight paginationTop">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="paginationData.pageSizes"
        :current-page="paginationData.currentPage"
        :pager-count="paginationData.pagerCount"
        :page-size="paginationData.pageSize"
      ></el-pagination>
    </div>
    <!-- 新增 -->
    <el-dialog title="新增" :visible.sync="isExhibit" :close-on-click-modal="false" v-if="isExhibit" width="500px">
      <el-form :model="addForm" :rules="rules" ref="ruleForm" size="small" label-width="120px">
        <el-form-item label="分团" prop="delegationSubId">
          <el-select v-model="addForm.delegationSubId" clearable>
            <el-option v-for="(item, index) in optionsub" :key="index" :label="item.deptName" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授权状态" prop="authorizeStatus">
          <el-select v-model="addForm.authorizeStatus" clearable>
            <el-option label="已授权" value="1"></el-option>
            <el-option label="未授权" value="0"></el-option>
          </el-select>
        </el-form-item>
        <div class="divp">
          <el-button type="primary" @click="handSure('ruleForm')">确认</el-button>
          <el-button @click="handCancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </el-card>
    <!-- </el-tab-pane>
  </el-tabs> -->
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      obj: {
        current: "1",
        size: "10",
        delegationId: "010"
      },
      formData: {
        delegationSubId: "",
        authorizeStatus: ""
      },
      tableData: [],
      optionsub: [],
      isExhibit: false,
      addForm: {
        delegationSubId: "",
        authorizeStatus: ""
      },
      rules: {
        delegationSubId: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        authorizeStatus: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      acredit: {
        recordId: "",
        authorizeStatus: ""
      },
      activeName: "first"
    };
  },
  filters: {
    statusa(val) {
      if (val === "0") {
        return "未授权";
      } else if (val === "1") {
        return "已授权";
      }
    }
  },
  created() {
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
    }
    // this.getlistPageDelegationSub({
    //   delegationId: this.$store.getters.userInfo.org.deptId
    // }).then(res => {
    //   this.optionsub = res;
    // }).catch(e => {});
    // 获取交易团下分团的数据
    this.getsysDepartment({
      deptType: "30",
      parentId: this.$store.getters.userInfo.org.deptId
    }).then(res => {
      this.optionsub = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.getListPage(this.obj);
  },
  methods: {
    ...mapActions("subpanelGeneralArrangement", [
      "getlistPageAuthorizeLog", // 查询交易团授权信息
      "getlistPageDelegationSub", // 查询交易团分团信息
      "updateauthorizeLog", // 交易团授权/取消授权
      "addauthorizeLog", // 交易团新增授权信息
      "getsysDepartment" // 分团 固定 deptType = 30;
    ]),
    ...mapActions("nainformation", [
      "getsubCluster" // 获取交易团下分团的数据
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistPageAuthorizeLog(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.tableData = getTable;
        })
        .catch(e => {});
    },
    // 查询
    onSearch() {
      this.obj = {
        current: "1",
        size: "10",
        delegationId: "010"
      };
      if (this.$store.getters.userInfo.org.deptId) {
        this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
      }
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        let aFirst = key[i];
        let bSecend = this.formData[key[i]];
        if (bSecend !== "") {
          this.obj[aFirst] = bSecend;
        }
      }
      this.getListPage(this.obj);
    },
    // 新增 确认
    handSure(datae) {
      for (let i = 0; i < this.optionsub.length; i++) {
        if (this.addForm.delegationSubId === this.optionsub[i].deptId) {
          this.addForm["delegationSubName"] = this.optionsub[i].deptName;
          this.addForm["delegationSubCode"] = this.optionsub[i].deptCode;
        }
      }
      this.addForm["delegationId"] = this.$store.getters.userInfo.org.deptId;
      this.addForm["delegationName"] = this.$store.getters.userInfo.org.deptName;
      this.$refs[datae].validate((vald) => {
        if (vald) {
          this.addauthorizeLog(this.addForm)
            .then(res => {
              this.isExhibit = false;
              this.$message({
                message: "确认成功",
                type: "success"
              });
              this.addForm = {
                delegationSubId: "",
                authorizeStatus: ""
              };
              this.getListPage(this.obj); // 调用初始加载页面方法
            })
            .catch(e => {});
        } else {
          return false;
        }
      });
    },
    // 新增 取消
    handCancel() {
      this.isExhibit = false;
      this.addForm = {
        delegationSubId: "",
        authorizeStatus: ""
      };
    },
    // 授权/取消授权
    handaccredit(val, vid) {
      this.acredit.recordId = val.recordId;
      this.acredit.authorizeStatus = vid;
      if (vid === "1") {
        this.$confirm('是否确认授权?', '审核', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updateauthorizeLog(this.acredit).then(res => {
            this.$message({
              type: 'success',
              message: '授权成功'
            });
            this.getListPage(this.obj);
          }).catch();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消确认'
          });          
        });
      } else if (vid === "0") {
        this.$confirm('是否确认取消授权?', '审核', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updateauthorizeLog(this.acredit).then(res => {
            this.$message({
              type: 'success',
              message: '取消授权成功'
            });
            this.getListPage(this.obj);
          }).catch();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消确认'
          });          
        });
      }
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

<style scoped>
.floatRight {
  float: right;
  margin-right: 50px;
}
.formStyle {
  padding: 8px 30px;
}
.paginationTop {
  margin-top: 10px;
}
.floatLeft {
  float: left;
}
.cont {
  text-align: center;
  margin-top: 20px;
}
.wid {
  width: 300px;
}
.divp {
  text-align: center;
  padding: 20px 0;
}
</style>
