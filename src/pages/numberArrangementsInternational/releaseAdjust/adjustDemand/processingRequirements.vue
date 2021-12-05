<template>
  <div v-loading.fullscreen="fullLoading">
    <el-card style="padding-bottom: 24px">
      <!-- 表单 -->
      <el-form :inline="true" :model="formData" size="small" label-width="110px">
        <el-form-item label="他团拟换入展位">
          <el-select v-model="formData.inExhibitionAreaCode" clearable>
            <el-option
              v-for="(item, index) in localstora.exhibitionArea"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="他团拟换出展位">
          <el-select v-model="formData.outExhibitionAreaCode" clearable>
            <el-option
              v-for="(item, index) in localstora.exhibitionArea"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对方交易团">
          <el-select v-model="formData.delegationCode" clearable>
            <el-option
              v-for="(item, index) in localstora.delegation"
              :key="index"
              :label="item.deptName"
              :value="item.deptCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展位类型">
          <el-select v-model="formData.boothType" clearable>
            <el-option label="一般性展位" value="1"></el-option>
            <el-option label="中央通道展位" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" size="small" border>
        <el-table-column align="center" label="他团换入展位" prop="inExhibitionArea"></el-table-column>
        <!-- <el-table-column align="center" label="换入展位数量（填写数字）" prop="inNumber"></el-table-column> -->
        <el-table-column align="center" min-width="120" label="他团换出展位" prop="outExhibitionArea"></el-table-column>
        <el-table-column align="center" min-width="120" label="调换展位数量" prop="exchangeNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="展位类型" prop="boothType">
          <template slot-scope="scope">{{scope.row.boothType | status}}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="对方交易团" prop="delegationName"></el-table-column>
        <el-table-column align="center" min-width="120" label="备注" prop="remark"></el-table-column>
        <el-table-column align="center" min-width="120" label="联系方式" prop="contact"></el-table-column>
        <el-table-column align="center" min-width="160" label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="handPass(scope.row, 3)">同意</el-button>
            <el-button type="text" @click="handPass(scope.row, 1)">不同意</el-button> -->
            <el-button type="text" :disabled="scope.row.otherDelegationConfirm === '3'" @click="handWidth(scope.row)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    </el-card>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      obj: {
        delegationId: "140",
        current: 1,
        size: 10
      },
      fullLoading: false,
      formData: {
        boothType: "",
        delegationCode: "",
        outExhibitionAreaCode: "",
        inExhibitionAreaCode: ""
      },
      localstora: {
        exhibitionArea: [],
        delegation: []
      }, // 数据字典
      // 表格数据
      tableData: [],
      // 分页
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      }
    };
  },
  filters: {
    status(val) {
      if (val === "1") {
        return "一般性展位";
      } else if (val === "2") {
        return "中央通道展位";
      }
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    let delejyt = [];
    this.localstora.delegation = [];
    this.getdelegationDepartment().then(res => {
      delejyt = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < delejyt.length; i++) {
        if (delejyt[i].deptId !== this.$store.getters.userInfo.org.deptId) {
          this.localstora.delegation.push(delejyt[i]);
        }
      }
    }).catch(e => {});
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
    }
    this.getListPage(this.obj);
  },
  methods: {
    ...mapActions("releaseAdjust", [
      "getlistSendScheduleRequest", // 发布调整需求时，查询需要处理的调整需求
      "updatesendScheduleRequest", // 发布调整需求时，处理展位调整需求
      "getlistExchangeIntent" // 查询跟本交易团发布一般性展位调整需求相匹配的其他交易团
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistExchangeIntent(Url)
        .then(res => {
          this.fullLoading = false;
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.tableData = JSON.parse(JSON.stringify(res.records));
        })
        .catch(e => {
          this.tableData = [];
        });
    },
    // 查询
    onSearch() {
      this.obj = {
        delegationId: "140",
        current: "1",
        size: "10"
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
    // 同意/不同意
    handPass(val, id) {
      let handcancel = {};
      handcancel = {
        intentId: val.intentId,
        matchId: val.matchId,
        otherDelegationConfirm: id
      };
      this.$confirm("确认进行此操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.updatesendScheduleRequest(handcancel)
            .then(res => {
              this.$message({
                message: "操作成功！",
                type: "success"
              });
              this.getListPage(this.obj);
              // this.$router.go(0);
            })
            .catch(e => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消该操作！"
          });
        });
      // this.updatesendScheduleRequest(handcancel)
      //   .then(res => {})
      //   .catch(e => {});
    },
    handWidth(val) {
      let handcancel = {};
      handcancel = {
        intentId: val.intentId,
        matchId: val.matchId,
        otherDelegationConfirm: "2"
      };
      // this.$confirm("确认进行此操作？", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      this.updatesendScheduleRequest(handcancel)
        .then(res => {
          // this.$message({
          //   message: "操作成功！",
          //   type: "success"
          // });
          this.getListPage(this.obj);
          this.$emit("handWidth", val);
          // this.$router.go(0);
        })
        .catch(e => {});
        // })
        // .catch(() => {
        //   this.$message({
        //     type: "info",
        //     message: "已取消该操作！"
        //   });
        // });
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
</style>


