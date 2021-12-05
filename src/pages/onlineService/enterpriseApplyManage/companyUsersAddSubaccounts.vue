/**
 * @file 公司用户添加子账户
 */
<template>
  <el-tabs v-model="activeName">
    <!-- 修改人: 李康   关联公司用户 改为 关联企业用户 -->
    <el-tab-pane label="关联企业用户" name="0">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        @select-params="selectParams"
      ></search-param-link>
      <el-table :data="affcompany" :header-cell-style="tableHeaderColor" v-loading="loading" border stripe>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="手机"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button class="text-btn" @click="handleClick(scope.row)" type="text" size="small">添加</el-button>
            <!-- <el-button class="text-btns" type="text" size="small" v-else>已添加</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom-btn">
        <el-button type=primary @click="toBack" class="btn">返回</el-button>
        <pagination
          :pageInfo="pageInfo"
          class="page"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"></pagination>
      </div>
      <el-dialog title="选择展区" :visible.sync="dialogVisible">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="授权管理展区：">
            <el-select v-model="allowArea" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value"
                :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="toConfirm" class="dialog-btn">确定</el-button>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { $helper } from "@/scripts/project/utils";
// vuex
import { mapGetters, mapActions } from "vuex";
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    "cust-table": custTable,
    "search-param-link": searchParamLinkage,
    "pagination": pagination
  },
  data() {
    return {
      activeName: 0,
      form: {},
      options: [],
      dialogVisible: false,
      allowArea: "",
      accountId: "",
      // 设置table的loading变量
      loading: true,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "userName",
        data: [
          {
            prop: "userName",
            label: "姓名",
            value: "",
            width: "60px",
            type: "input"
          }
        ]
      },
      // 分页
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "padding: 20px 0;text-align: center;"
      },
      // 传参
      searchParams: {
        "affiliateCompanySession": {},
        "pageStart": "1",
        "pageSize": "10"
      }
    };
  },
  computed: {
    ...mapGetters('enterpriseRegister', ['affcompany'])
  },
  created() {
    // let dictData = JSON.parse(localStorage.getItem('dictData'));
    // this.options = dictData.allowArea.sort((a, b) => a.text.charCodeAt(0) - b.text.charCodeAt(0));
    this.options = kindo.dictionary.get('exhibitionArea');
    // 前端将贫困展区删除
    let deleteIndex = 0;
    this.options.forEach((val, index) => {
      if (val.value === 'LD01') {
        deleteIndex = index;
        this.options.splice(deleteIndex, 1);
      }
    });
    // 初始化
    this.getData();
  },
  methods: {
    ...mapActions('enterpriseRegister', ['affiliateCompanyInfo', 'affiliateCompanyUserAddInfo']),
    // 模糊查询
    selectParams() {
      // 查询字段去空格
      let val = $helper.trim(this.searchParamsForm.data[0].value);
      // 定义传参
      if (val !== "") {
        this.searchParams = {
          "affiliateCompanySession": {
            "userName": val
          },
          "pageStart": "1",
          "pageSize": "10"
        };
      } else {
        this.searchParams = {
          "affiliateCompanySession": {},
          "pageStart": "1",
          "pageSize": "10"
        };
      }
      this.getData();
    },
    // 获取数据方法
    getData() {
      this.loading = true;
      this.affiliateCompanyInfo(this.searchParams).then(response => {
        // 查询成功
        if (response.total > 0) {
          this.pageInfo.currentPage = response.current;
          this.pageInfo.total = response.total;
        } else if (response.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
        this.loading = false;
      }).catch(e => {
         // 查询失败
        this.loading = false;
      });
    },
    // 分页
    handleSizeChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.pageSize = val;
      this.affiliateCompanyInfo(this.searchParams).then(res => {

        //设置table的loading变量
        this.loading = false;
        // this.tableData = res.records;
      });
    },
    handleCurrentChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.pageStart = val;
      this.affiliateCompanyInfo(this.searchParams).then(res => {
        //设置table的loading变量
        this.loading = false;
        // this.tableData = res.records;
      });
    },
    // 修改table header的背景色
    tableHeaderColor({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (rowIndex === 0) {
        return "background-color: #f5f5f5;";
      }
    },
    // 添加按钮
    handleClick(row) {
      this.dialogVisible = true;
      this.accountId = row.accountId;
    },
    toConfirm() {
      let param = {
        "affiliateCompanyUserAddSession":
        {
          "accountId": this.accountId,
          "allowArea": this.allowArea,
          "companyId": localStorage.getItem("getComPanyId"),
          "linkStatus": "1",
          "modifierId": this.$store.getters.userInfo.userId
        }
      };
      // 调添加接口
      this.affiliateCompanyUserAddInfo(param).then(res => {
        this.dialogVisible = false;
        this.$message({
          type: 'success',
          message: '添加成功!'
        });
        this.getData();
      });
    },
    toBack() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.text-btn{
  text-decoration: underline;
}
.text-btns{
  color: #999;
}
.bottom-btn{
  width: 96%;
  padding: 0 2%;
}
.btn{
  width: 120px;
  height: 40px;
  float: left;
  margin-top: 20px;
}
.page{
  float: right;
}
.dialog-btn{
  margin: 10px;
}
</style>
