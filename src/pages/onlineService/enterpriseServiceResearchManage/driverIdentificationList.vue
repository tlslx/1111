/**
 * @file 司机人员证件列表
 */
<style scoped>
  .driver-identify-btn-container {
    display: table;
    padding: 10px 20px;
    width: 100%;
  }
  .btn-bar {
    display: table-cell;
    text-align: left;
    vertical-align: middle;
  }
  .page-bar {
    display: table-cell;
    vertical-align: middle;
  }
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="司机人员证件列表" name="0">
      <div v-loading="loading">
        <search-param-link
          :searchParamsForm="searchParamsForm.data"
          :variate="searchParamsForm.variate"
          :dictionary="dictionary"
          @select-params="selectParams"
        ></search-param-link>
        <cust-table
          :cols="cols"
          :data="tableData"
          :index="tableIndex"
          @deal-with-operate="dealWithOperate"
        ></cust-table>
        <div class="driver-identify-btn-container">
          <div class="btn-bar">
            <el-button type="primary" @click="apppyCarCertifi">申请车证</el-button>
          </div>
          <pagination
            class="page-bar"
            :pageInfo="pageInfo"
            @handle-size-change="handleSizeChange"
            @handle-current-change="handleCurrentChange"
          ></pagination>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import custTable from "@/components/project/onlineService/common/custTable.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { $helper } from "@/scripts/project/utils";
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    "cust-table": custTable,
    "search-param-link": searchParamLinkage,
    pagination: pagination
  },
  data() {
    return {
      activeName: 0,
      loading: false,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "",
        data: [
          {
            prop: "exhibitionPeriod",
            label: "期数",
            value: "",
            type: "select"
          },
          {
            prop: "enterpriceName",
            label: "企业名称",
            value: "",
            type: "input"
          },
          {
            prop: "vehicleLicense",
            label: "车牌号码",
            value: "",
            type: "input"
          },
          {
            prop: "badgeTypeName",
            label: "证件类型",
            value: "",
            type: "input"
          },
          {
            prop: "driverName",
            label: "司机姓名",
            value: "",
            type: "input"
          },
          {
            prop: "idcardNo",
            label: "身份证号码",
            value: "",
            type: "input"
          }
        ]
      },
      // 字典数据
      dictionary: {
        // 期数
        "exhibitionPeriod": [],
        // 证件类型
        "badgeTypeName": []
      },
      cols: [
        {
          prop: "enterpriceName",
          label: "企业名称",
          type: "string"
        },
        {
          prop: "vehicleLicense",
          label: "车牌号码",
          type: "string"
        },
        {
          prop: "exhibitionPeriod",
          label: "期数",
          type: "string"
        },
        {
          prop: "driverName",
          label: "司机姓名",
          type: "string"
        },

        {
          prop: "badgeTypeName",
          label: "证件类型",
          type: "string"
        },
        {
          prop: "idcardNo",
          label: "身份证号",
          type: "string"
        },
        {
          prop: "status",
          label: "状态",
          type: "string"
        },
        {
          prop: "badgePhotoUrl",
          label: "证件照",
          type: "img",
          containImage: true
        },
        {
          prop: "operation",
          type: "operator",
          fixed: "right",
          width: "100px",
          label: "操作",
          btns: [
            {
              type: "underlineText",
              label: "查看",
              prop: "select"
            },
            {
              type: "underlineText",
              label: "修改",
              prop: "edit"
            },
            {
              type: "underlineText",
              label: "删除",
              prop: "del"
            }
          ]
        }
      ],
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "padding: 10px 0;text-align: right;"
      },
      initParams: {
        "isPage": true,
        "pageIndex": 1,
        "pageSize": 10,
        "queryParams": {}
      },
      searchParams: {}
    };
  },
  computed: {
    ...mapGetters('enterApplyCardInfo', ['driverCertificateList']),
    tableData() {
      return {
        data: this.driverCertificateList
      };
    },
    // 表格排序属性设置
    tableIndex: function () {
      return (this.pageInfo.currentPage - 1) * this.pageInfo.pageSize + 1;
    }
  },
  created() {
    this.getDictionaryData();
    this.loading = true;
    this.getDriverCertificateList(this.initParams).then(res => {
      this.loading = false;
      this.pageInfo.total = res.applyInfo.total;
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('enterApplyCardInfo', ['getDriverCertificateList', 'deleteDriverCertificateInfo']),
    // 获取字典信息
    async getDictionaryData() {
      let [exhibitionPeriod, vehicleBadgeType] = await Promise.all([
        // 获取期数字典
        kindo.dictionary.get('exhibitionPeriodNum'),
        // 获取证件类型字典
        kindo.dictionary.get('vehicleBadgeType')
      ]);
      // 获取期数字典
      this.dictionary.exhibitionPeriod = exhibitionPeriod;
      // 获取证件类型字典
      this.dictionary.badgeTypeName = vehicleBadgeType;
    },
    selectParams() {
      this.searchParams = JSON.parse(JSON.stringify(this.initParams));
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (String(formVal.value) !== 'null' && formVal.value !== '') {
          this.searchParams.queryParams[formVal.prop] = $helper.trim(formVal.value);
        }
      });
      this.searchParams.pageIndex = 1;
      this.pageInfo.currentPage = 1;
      this.loading = true;
      this.getDriverCertificateList(this.searchParams).then(res => {
        this.loading = false;
        this.pageInfo.total = res.applyInfo.total;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 修改每页展示条数
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      let _searchParams = {};
      if (!this.searchParams.customQueryParams) {
        _searchParams = this.initParams;
        _searchParams.pageSize = val;
      } else {
        this.searchParams.pageSize = val;
        _searchParams = this.searchParams;
      }
      this.getDriverCertificateList(_searchParams);
    },
    // 修改当前页数
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      let _searchParams = {};
      if (!this.searchParams.customQueryParams) {
        this.initParams.pageIndex = val;
        _searchParams = this.initParams;
      } else {
        this.searchParams.pageIndex = val;
        _searchParams = this.searchParams;
      }
      this.getDriverCertificateList(_searchParams);
    },
    // 处理表格操作
    dealWithOperate(scope, prop) {
      if (prop === 'edit') {
        this.$router.push({
          path: '/enterpriseSubmitsCarLicenseApply',
          query: {
            pattern: 'edit',
            data: { ...scope.row }
          }
        });
      } else if (prop === 'del') {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 处理删除传参结束
          // this.deleteDriverCertificateInfo(delParams).then(res => {
          //   this.$message({
          //     type: 'success',
          //     message: '删除成功!'
          //   });
          // });
        });
      }
    },
    // 申请车证
    apppyCarCertifi() {

    }
  }
};
</script>

