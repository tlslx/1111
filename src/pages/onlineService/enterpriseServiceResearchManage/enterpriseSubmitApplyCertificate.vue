/**
 * @file 企业提交办证申请
 * @author: llluj
 */
<style scoped>
  .enter-submit-apply-container {
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
    padding-right: 20px;
  }
</style>
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="参展证件一览表" name="0">
        <search-param-link
          :searchParamsForm="searchParamsForm.data"
          :variate="searchParamsForm.variate"
          :dictionary="dictionary"
          @select-params="selectParams"
        ></search-param-link>
        <cust-table
          v-loading="loading"
          :cols="cols"
          :data="tableData"
          :index="tableIndex"
          @deal-with-operate="dealWithOperate"
        ></cust-table>
        <div class="enter-submit-apply-container">
          <div class="btn-bar">
            <el-button type="primary" @click="maintainPeopDoc">维护人员资料</el-button>
            <el-button type="primary" @click="applyCertificates">申请证件</el-button>
          </div>
          <pagination
            class="page-bar"
            :pageInfo="pageInfo"
            @handle-size-change="handleSizeChange"
            @handle-current-change="handleCurrentChange">
          </pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import custTable from "@/components/project/onlineService/common/custTable.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import { $helper } from "@/scripts/project/utils";
export default {
  name: "enterpriseSubmitApplyCertificate",
  components: {
    "cust-table": custTable,
    "pagination": pagination,
    "search-param-link": searchParamLinkage
  },
  data() {
    return {
      activeName: 0,
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
            prop: "applyUserName",
            label: "姓名",
            value: "",
            type: "input"
          },
          {
            prop: "idcardNo",
            label: "身份证号码",
            value: "",
            type: "input"
          },
          {
            prop: "status",
            label: "审核状态",
            value: "",
            type: "select"
          },
          {
            prop: "enterpriceCode",
            label: "广交会编码",
            value: "",
            type: "input"
          },
          {
            prop: "enterpriceName",
            label: "企业名称",
            value: "",
            type: "input"
          },
          {
            prop: "badgeTypeCode",
            label: "证件类型",
            value: "",
            type: "select"
          },
          {
            prop: "isValid",
            label: "是否有效",
            value: "",
            type: "select"
          }
        ]
      },
      // 性别字典
      osSex: [],
      // 证件状态字典
      osHandleModes: [],
      // 字典数据
      dictionary: {
        // 期数
        "exhibitionPeriod": [],
        // 审核状态
        "status": [],
        // 证件类型
        "badgeTypeCode": [],
        // 是否有效
        "isValid": []
      },
      cols: [
        {
          prop: "enterpriceCode",
          label: "广交会编码",
          type: "string"
        },
        {
          prop: "enterpriceName",
          label: "企业名称",
          type: "string"
        },
        {
          prop: "exhibitionPeriod",
          label: "期数",
          type: "string"
        },
        {
          prop: "applyUserName",
          label: "姓名",
          type: "string"
        },
        {
          prop: "sex",
          label: "性别",
          type: "string"
        },
        {
          prop: "icCardNo",
          label: "IC卡",
          type: "string"
        },
        {
          prop: "idcardNo",
          label: "身份证号",
          type: "string"
        },
        {
          prop: "badgeTypeName",
          label: "办证类型",
          type: "string"
        },
        {
          prop: "status",
          label: "审核",
          type: "string"
        },
        {
          prop: "handleMode",
          label: "状态",
          type: "string"
        },
        {
          prop: "effectStartDate",
          label: "生效开始",
          type: "string"
        },
        {
          prop: "effectEndDate",
          label: "生效结束",
          type: "string"
        },
        {
          prop: "createDate",
          label: "申请时间",
          type: "string"
        },
        {
          prop: "modifyDate",
          label: "审核日期",
          type: "string"
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
        "orderModelField": [{
          "orderByField": "createDate",
          "asc": false
        }],
        "customQueryParams": [
        ]
      },
      searchParams: {}
    };
  },
  mounted() {
    this.getDictionaryData();
    this.getTableList();
  },
  computed: {
    ...mapGetters('enterApplyExhibitCertiInfo', ['exhibitorCardList', 'loading', 'exhibitorCardTotal']),
    tableData() {
      return {
        data: this.exhibitorCardList
      };
    },
    // 表格排序属性设置
    tableIndex: function () {
      return (this.pageInfo.currentPage - 1) * this.pageInfo.pageSize + 1;
    }
  },
  methods: {
    ...mapActions('enterApplyExhibitCertiInfo', ['getOsDictionary', 'getExhibitorCardList', 'deleteExhibitCardInfo']),
    // 获取字典信息
    async getDictionaryData() {
      let [exhibitionPeriod, status, badgeTypeCode, isValid, osSex, osHandleModes] = await Promise.all([
        // 获取期数字典
        kindo.dictionary.get('exhibitionPeriodNum'),
        // 获取审核状态字典
        kindo.dictionary.get('badge_audit_status'),
        // 获取证件类型字典
        kindo.dictionary.get('bigBadgeType'),
        // 获取是否有效字典
        kindo.dictionary.get('BM_YES_NO'),
        // 获取性别字典
        kindo.dictionary.get('gender'),
        // 查询证件状态
        kindo.dictionary.get('BADGE_APPLY_HANDLE_MODE')
      ]);
      // 获取期数字典
      this.dictionary.exhibitionPeriod = exhibitionPeriod;
      // 获取审核状态字典
      this.dictionary.status = status;
      // 获取证件类型字典
      this.dictionary.badgeTypeCode = badgeTypeCode;
      // 获取是否有效字典
      this.dictionary.isValid = isValid;
      // 获取性别字典
      this.osSex = osSex;
      // 获取证件状态字典
      this.osHandleModes = osHandleModes;
    },
    // 维护人员资料
    maintainPeopDoc() {
      this.$router.push({
        path: '/certificateHandlingInfoList'
      });
    },
    // 申请证件
    applyCertificates() {
      this.$router.push({
        path: '/registrationCardPersonnel'
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
      this.getExhibitorCardList(_searchParams);
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
      this.getExhibitorCardList(_searchParams);
    },
    // 查询
    selectParams() {
      this.searchParams = JSON.parse(JSON.stringify(this.initParams));
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        let currentObject = {};
        if (String(formVal.value) !== 'null' && formVal.value !== '') {
          currentObject.name = formVal.prop;
          if (formVal.type === 'input') {
            currentObject.findType = 'LIKE';
          }
          if (formVal.type === 'select') {
            currentObject.findType = 'EQ';
          }
          currentObject.joinType = 'And';
          currentObject.values = [];
          currentObject.values.push($helper.trim(formVal.value));
          this.searchParams.customQueryParams.push(currentObject);
        }
      });
      this.searchParams.pageIndex = 1;
      this.pageInfo.currentPage = 1;
      this.getExhibitorCardList(this.searchParams);
    },
    // 处理表格操作
    dealWithOperate(scope, prop) {
      if (prop === 'edit') {
        // console.log('编辑');
        this.$router.push({
          path: '/registrationCardPersonnel',
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
          // 处理删除传参开始
          let delParams = [];
          let delParam = {};
          delParam['userName'] = scope.row.applyUserName;
          delParam['idCardNo'] = scope.row.idcardNo;
          delParam['userId'] = scope.row.userId;
          delParams.push(delParam);
          // 处理删除传参结束
          this.deleteExhibitCardInfo(delParams).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        });
      }
    },
    // 获取列表数据
    async getTableList() {
      await this.getExhibitorCardList(this.initParams).then(response => {
      });
    }
  },
  watch: {
    "exhibitorCardTotal"(newVal) {
      this.pageInfo.total = newVal;
    }
  }
};
</script>

