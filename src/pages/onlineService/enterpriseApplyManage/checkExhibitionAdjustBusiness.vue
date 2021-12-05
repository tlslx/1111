<style scoped>
.justconter {
  float: right;
}
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="审核展区调整" name="0">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        @select-params="selectParams"
      ></search-param-link>
      <el-table
        :data="tableData"
        ref="multipleTable"
        @select="handleSelectionChange"
        @select-all="handleSelectionDhange"
        @selection-change="handleCheckedChange"
        :row-key="getRowKey"
        border
        style="width: 100%"
      >
        <el-table-column align="center" type="selection" :selectable="checkboxInit"></el-table-column>
        <el-table-column align="center" prop="companyName" label="企业名称"></el-table-column>
        <el-table-column align="center" prop="cantonCode" width="150" label="广交会企业编码"></el-table-column>
        <el-table-column align="center" prop="businessDelegationId" label="交易团"></el-table-column>
        <el-table-column align="center" prop="businessAssociation" label="商协会"></el-table-column>
        <el-table-column align="center" prop="hsCode" label="海关商品编码"></el-table-column>
        <el-table-column align="center" prop="exhibitsName" label="对应商品名称"></el-table-column>
        <el-table-column align="center" prop="propertyType" label="建议增加展区"></el-table-column>
        <el-table-column align="center" prop="addExhibitionArea" label="建议原因">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.addExhibitionArea" disabled></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleAudit(scope.row)" type="text" size="small">审核</el-button>
            <!-- <el-button :disabled="scope.row.businessAssociationStatus === '1'" @click="handleNotgo(scope.row)" type="text" size="small">不通过</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="handlePass('pass')" size="small">通过</el-button>
      <el-button type="danger" @click="handlePass('noPass')" size="small">不通过</el-button>
      <div class="justconter">
        <pagination
          class="pages"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { mapActions, mapGetters } from "vuex";
// import { $helper } from "@/scripts/project/utils";
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    "search-param-link": searchParamLinkage,
    pagination: pagination
  },
  data() {
    return {
      tableData: [],
      ruseFrem: {
        addExhibitionArea: ""
      },
      activeName: 0,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "companyName",
        data: [
          {
            prop: "companyName",
            label: "企业名称",
            value: "",
            type: "input"
          }
        ]
      },
      // 分页
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      // 传参
      searchParams: {
        companyName: "", // 企业名称
        // companyId: "1",
        businessDelegationId: "", // 交易团
        businessAssociationStatus: '0',
        businessDelegationStatus: "1",
        size: "10",
        current: "1"
      },
      lastCheckData: [], // 上次保存的值
      selectData: [], // 选中的数据索引
      checkList: [], // 临时选中的值
      getList: [] // 降维之后的数组
    };
  },
  created() {
    this.handleClickData(this.searchParams);
  },
  computed: {
    ...mapGetters("companyInfomation", ["getReviewArea"]),
    getRowKey(row) {
      // 获取row的key值
      return row.businessAssociation; // 这里举例获取姓名
    }
  },
  methods: {
    ...mapActions("companyInfomation", [
      "getReviewAreaAdjustment",
      "postReviewAreaAdjustmentBatch"
    ]),
    // 初始化数据
    handleClickData(val) {
      let values = encodeURI(JSON.stringify(val));
      this.getReviewAreaAdjustment(values)
        .then(res => {
          this.pageInfo.currentPage = res.current;
          this.pageInfo.pageSize = res.size;
          this.pageInfo.total = res.total;
          let skb = JSON.parse(JSON.stringify(res.records));
          // this.tableData = skb;
          let arrList = [];
          for (let i = 0; i < skb.length; i++) {
            if (skb[i].businessAssociationStatus === "0") {
              arrList.push(skb[i]);
            }
          }
          this.tableData = arrList;
          let arr = [];
          if (this.selectData[this.pageInfo.currentPage - 1]) {
            this.selectData[this.pageInfo.currentPage - 1].forEach(
              (item, index) => {
                arr.push(this.tableData[item]);
              }
            );
          }
          setTimeout(() => {
            this.toggleSelection(arr);
          }, 0);
        })
        .catch(e => {});
    },
    // 选中的数据索引获取
    handleSelectionChange(selection, row) {
      this.selectData[this.pageInfo.currentPage - 1] = []; // 初始化
      this.tableData.forEach((item, index) => {
        for (let i = 0; i < selection.length; i++) {
          // 遍历已选的数据重新填充数组
          if (item.companyId === selection[i].companyId) {
            // 补充：注意这里的判断必须要保证判断的值是唯一的（不一定要拿获取的值进行比较，比如ID值），不然遍历的时候会都添加进去
            this.selectData[this.pageInfo.currentPage - 1].push(index);
          }
        }
      });
    },
    // 根据当前的状态判断是否能够勾选
    checkboxInit(row, index) {
      if (row.businessAssociationStatus === "1") {
        return false;
      } else {
        return true; //可勾选
      }
    },
    // 判断是否选中
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionDhange() {},
    // 选中的数据获取
    handleCheckedChange(rows) {
      this.checkList = []; // 初始化，防止重复添加
      if (rows) {
        rows.forEach(row => {
          // 遍历已选择的数据
          if (row) {
            let searchParamPass = {};
            searchParamPass.addExhibitionArea = row.addExhibitionArea;
            searchParamPass.adjustId = row.adjustId;
            searchParamPass.businessAssociation = row.businessAssociation;
            searchParamPass.companyId = row.companyId;
            searchParamPass.businessAssociationStatus = "1";
            searchParamPass.cantonCode = row.cantonCode;
            searchParamPass.hsCode = row.hsCode;
            searchParamPass.exhibitsName = row.exhibitsName;
            this.checkList.push(searchParamPass);
          }
        });
      }
    },
    // 查询
    selectParams() {
      this.searchParamsForm.data.forEach((val, index, arr) => {
        if (val.prop === "companyName") {
          this.searchParams.companyName = val.value;
        }
        if (val.prop === "companyId") {
          if (val.value !== "") {
            this.searchParams.companyId = val.value;
          } else {
            this.searchParams.companyId = this.$store.state.userInfo.companyId;
          }
        }
        if (val.prop === "businessDelegationId") {
          this.searchParams.businessDelegationId = val.value;
        }
      });
      if (this.searchParams.companyName.length > 54) {
        this.$message("输入过长请正确输入");
      // } else if (this.searchParams.companyName.length > 54) {
      //   this.$message("输入过长请正确输入");
      // } else if (this.searchParams.businessDelegationId.length > 20) {
      //   this.$message("输入过长请正确输入");
      } else {
        this.handleClickData(this.searchParams);
      }
      // this.handleClickData(this.searchParams);
    },
    // 查看
    handleClick(data) {
      this.$router.push({
        path: "/reviewExhibitionAdjustAllList",
        query: {
          data,
          id: 1
        }
      });
    },
    // 审核
    handleAudit(data) {
      this.$router.push({
        path: "/reviewExhibitionAdjustAllList",
        query: {
          data,
          id: 3
        }
      });
    },
    // 通过
    handlePass(val) {
      this.lastCheckData[this.pageInfo.currentPage - 1] = this.checkList; // 保存当前页获取的值
      //降维 --- 二维数组降至一维数组
      this.getList = Array.prototype.concat.apply([], this.lastCheckData);
      this.$confirm('请确认执行该操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.getList && val === "pass") {
          this.postReviewAreaAdjustmentBatch(this.getList).then(() => {
            this.handleClickData(this.searchParams);
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }).catch();
        } else if (this.getList && val === "noPass") {
          this.getList.businessAssociationStatus = 2;
          this.postReviewAreaAdjustmentBatch(this.getList).then(() => {
            this.handleClickData(this.searchParams);
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }).catch();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    //分页
    handleCurrentChange(current) {
      this.searchParams.current = current;
      this.pageInfo.currentPage = current;
      this.selectParams();
    },
    handleSizeChange() {}
  }
};
</script>
