/**
 * @file 工作部设置VIP企业证件指标
 */
<style scoped>
  .set-enter-certifi-indicate {
    padding: 20px 0;
  }
  .indicate-list {
    padding: 10px 0;
  }
  .vip-enterprise-operation-container {
    display: table;
    padding: 20px;
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
    padding-right: 40px;
  }
  .certificate-edit-table >>> .el-form-item__error {
    padding-top: 0;
  }
</style>
<template>
  <el-page ref="setEnterCertificateIndicator">
    <template slot="body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="工作部设置VIP企业证件指标" name="0">
          <search-param-link :searchParamsForm="searchParamsForm.data"
            :variate="searchParamsForm.variate"
            :dictionary="dictionaryData"
            @select-params="selectParams">
          </search-param-link>
          <can-be-edit-table
            ref="certificateEditTable"
            class="certificate-edit-table"
            :loading="loading"
            :tableData="vipEnterCertifiIndicators"
            :tableTrData="tableTrData"
            :rules="rules"
            @edit-table-data="editTableData">
          </can-be-edit-table>
          <div class="vip-enterprise-operation-container">
            <div class="btn-bar" v-if="activeName === '0'">
              <el-button type="primary" :disabled="vipEnterCertifiIndicators.length <= 0" @click="keySet">一键设置</el-button>
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
      <batch-setting-certi-indicator ref="batchSetting" :batchSettingInfo="batchSettingInfo" @batch-setting="batchSetting" @close-batch-setting="closeBatchSetting"></batch-setting-certi-indicator>
    </template>
  </el-page>
</template>
<script>
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import canBeEditTable from "@/components/project/onlineService/common/canBeEditTable.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import batchSettingCertiIndicators from "@/components/project/onlineService/enterpriseManage/batchSettingCertiIndicators";
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  name: 'setEnterCertificateIndicators',
  components: {
    'search-param-link': searchParamLinkage,
    'can-be-edit-table': canBeEditTable,
    'pagination': pagination,
    'batch-setting-certi-indicator': batchSettingCertiIndicators
  },
  data() {
    return {
      activeName: 0,
      loading: true,
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "text-align: right;"
      },
      currentArray: [],
      batchSettingInfo: {
        dialogVisible: false
      },
      // 搜索框联动设置
      searchParamsForm: {
        variate: "exhibitionArea",
        data: [
          {
            "prop": "companyName",
            "label": "企业名称",
            "value": "",
            "type": "input"
          }
        ]
      },
      // 推荐VIP企业传参
      recommendEnterParams: {
        "efOsVipCompanyInfos": []
      },
      initParams: {
        "orderModelField": [
          {
            "orderByField": "",
            "asc": false
          }
        ],
        "customQueryParams": [
          {
            "name": "session",
            "findType": "EQ",
            "joinType": "And",
            "values": []
          }
        ],
        "pageIndex": 1,
        "pageSize": 10
      },
      searchParams: {},
      tableTrData: [
        {
          "prop": "sequenceNum",
          "label": "序号",
          "type": "string"
        },
        {
          "prop": "companyName",
          "label": "企业名称",
          "type": "string"
        },
        {
          "prop": "phase",
          "label": "展期",
          "type": "string"
        },
        {
          "prop": "cantonCode",
          "label": "广交会企业编码",
          "type": "string"
        },
        {
          "prop": "exhibitionArea",
          "label": "展区",
          "type": "string"
        },
        {
          "prop": "exhibitionCert",
          "label": "筹展证证件指标",
          "type": "input",
          "maxlength": 8
        },
        {
          "prop": "rebackExhibitionCert",
          "label": "撤展证证件指标",
          "type": "input",
          "maxlength": 8
        },
        {
          "prop": "receptionCert",
          "label": "接待证证件指标",
          "type": "input",
          "maxlength": 8
        },
        {
          "prop": "parkingCert",
          "label": "内停车证证件指标",
          "type": "input",
          "maxlength": 8
        },
        {
          "prop": 'edit',
          "label": '修改',
          "type": 'btn',
          "style": "text-decoration: underline;color: #2d92ec;cursor: pointer;",
          "iconName": '',
          "event": true,
          "show": true
        }
      ],
      rules: {
        // 筹展证证件指标
        exhibitionCert: [
          { validator: this.check, trigger: 'blur' }
        ],
        // 撤展证证件指标
        rebackExhibitionCert: [
          { validator: this.check, trigger: 'blur' }
        ],
        // 内停车证证件指标
        parkingCert: [
          { validator: this.check, trigger: 'blur' }
        ],
        // 接待证证件指标
        receptionCert: [
          { validator: this.check, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters('common', ['session']),
    ...mapGetters('dictionary', ['dictionaryData']),
    ...mapGetters('setEnterServiceScope', ['vipEnterCertifiIndicators'])
  },
  created() {
    let _this = this;
    this.getSessionInfo().then(res => {
      this.initParams.customQueryParams.forEach((value, index, array) => {
        if (value.name === 'session') {
          value.values[0] = res.session;
        }
      });
      this.getVIPEnterCertifiIndicators(this.initParams).then(response => {
        _this.loading = false;
        if (response.total > 0) {
          this.pageInfo.currentPage = response.current;
          this.pageInfo.total = response.total;
        } else if (response.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
      }).catch(e => {
        _this.loading = false;
      });
    });
  },
  methods: {
    ...mapActions('common', ['getSessionInfo']),
    ...mapActions('setEnterServiceScope', ['getVIPEnterCertifiIndicators', 'setSingleVipEnterCertifi', 'setVipEnterCertificateIndicators']),
    handleClick() {

    },
    // 校验筹展证证件指标、撤展证证件指标、接待证证件指标、内停车证证件指标
    check(rule, value, callback) {
      if (!Number.isInteger(Number(value))) {
        return callback(new Error('请输入数字值'));
      } else {
        return callback();
      }
    },
    // 重置查询分页参数
    initSearchParamsPageInfo() {
      this.searchParams.pageIndex = 1;
      this.searchParams.pageSize = 10;
    },
    // 打开一键设置窗口
    keySet() {
      this.batchSettingInfo.dialogVisible = true;
    },
    // 修改当前行
    editTableData(params) {
      let _this = this;
      this.loading = true;
      params.iconType = 'text';
      params.iconName = '';
      this.setSingleVipEnterCertifi(params).then(res => {
        this.loading = false;
        this.$message({
          type: 'success',
          message: '设置成功'
        });
        let _searchParams = {};
        if (!this.searchParams.customQueryParams) {
          _searchParams = this.initParams;
        } else {
          _searchParams = this.searchParams;
        }
        _this.loading = true;
        this.getVIPEnterCertifiIndicators(_searchParams).then(response => {
          _this.loading = false;
          this.pageInfo.total = response.total;
        }).catch(e => {
          _this.loading = false;
        });
      }).catch(e => {
        this.loading = false;
        this.$message({
          showClose: true,
          message: e,
          type: 'error'
        });
      });
    },
    // 修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      let _searchParams = {};
      if (!this.searchParams.customQueryParams) {
        _searchParams = this.initParams;
        _searchParams.pageSize = val;
      } else {
        this.searchParams.pageSize = val;
        _searchParams = this.searchParams;
      }
      this.getVIPEnterCertifiIndicators(_searchParams).then(res => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 修改当前页信息
    handleCurrentChange(val) {
      this.loading = true;
      this.pageInfo.currentPage = val;
      let _searchParams = {};
      if (!this.searchParams.customQueryParams) {
        this.initParams.pageIndex = val;
        _searchParams = this.initParams;
      } else {
        this.searchParams.pageIndex = val;
        _searchParams = this.searchParams;
      }
      this.getVIPEnterCertifiIndicators(_searchParams).then(res => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 一键设置功能
    batchSetting(formData) {
      let _this = this;
      let currentObject = {};
      currentObject.session = this.session ? this.session : null;
      for (let key in formData) {
        currentObject[key] = formData[key] + '';
      }
      this.setVipEnterCertificateIndicators(currentObject).then(res => {
        this.$message({
          type: 'success',
          message: '设置成功'
        });
        this.batchSettingInfo.dialogVisible = false;
        _this.loading = true;
        let _searchParams = {};
        if (!this.searchParams.customQueryParams) {
          _searchParams = this.initParams;
        } else {
          _searchParams = this.searchParams;
        }
        this.getVIPEnterCertifiIndicators(_searchParams).then(response => {
          _this.loading = false;
          this.pageInfo.currentPage = 1;
          this.pageInfo.pageSize = 10;
          this.searchParams.pageIndex = 1;
          this.searchParams.pageSize = 10;
          this.pageInfo.total = response.total;
        }).catch(e => {
          _this.loading = false;
        });
      }).catch(e => {
        this.$message({
          showClose: true,
          message: e,
          type: 'error'
        });
      });
    },
    // 查询
    selectParams() {
      let _this = this;
      this.loading = true;
      this.searchParams = JSON.parse(JSON.stringify(this.initParams));
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        let currentObject = {};
        if (formVal.value !== '') {
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
      this.initSearchParamsPageInfo();
      this.getVIPEnterCertifiIndicators(this.searchParams).then(res => {
        _this.loading = false;
        if (res.total > 0) {
          this.pageInfo.currentPage = res.current;
          this.pageInfo.pageSize = 10;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
      }).catch(e => {
        _this.loading = false;
      });
    },
    // 关闭一键设置窗口
    closeBatchSetting() {
      this.batchSettingInfo.dialogVisible = false;
    }
  }
};
</script>
