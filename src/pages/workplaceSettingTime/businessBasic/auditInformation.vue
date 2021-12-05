<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="commendationList">
  <!--  <el-tab-pane label="交易团审核企业基本资料" name="first"></el-tab-pane> -->
    <el-tab-pane label="一般性展位申请企业审核" name="first"></el-tab-pane>
    <el-card class="box-card">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="searchParamsForm.dictionary"
        @select-params="selectParams"
        @new-onchangeDate="newonchangeDate"
      ></search-param-link>
      <p style="color: red;">一般性展位申请企业审核不包含新能源、宠物用品展区展位申请，该类企业审核请前往“新能源、宠物用品展区企业审核、推荐”。</p>
      <canBeEdit-table
        :loading="loading"
        :tableTrData="reviewTrDate"
        :tableData="applicationList.records"
        :selection='selection'
        :isSelectable='isSelectable'
        @change-multiple-selection='selectAll'
        @deal-with-operate="dealWithChangeStatusEvent"
        @cell-click="cellClick"
        @mouseEnter="mouseEnter"
      ></canBeEdit-table>
      <div style="margin-top: 20px">
        <el-button v-if="isDisabled" type="primary" @click="handleSubmitAllSelected">批量审核</el-button>
        <p style="color: red" v-if="isDisabled">批量审核仅在有分团提交企业审核结果时使用，否则请点击企业名称进入审核界面，逐项审核。</p>
        <pagination
          class="pages"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
      </div>
    </el-card>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import pagination from "@/components/project/common/pagination.vue";
import searchParamLinkage from "@/components/project/common/searchParamLinkage.vue";
import { mapActions, mapGetters } from "vuex";
// import utility from '@/scripts/framework/utility';
// import { $date } from "@/scripts/project/utils";
export default {
  components: {
    "canBeEdit-table": canBeEditTable,
    "search-param-link": searchParamLinkage,
    pagination
  },
  data() {
    return {
      activeName: "first",
      loading: false,
      selection: this.$store.getters.userInfo.org.deptType === '7',
      isDisabled: this.$store.getters.userInfo.org.deptType === '7',
      NoticeDate: [],
      btnDialogVisible: false,
      fatDate: [],
      list: [],
      // 表头数据
      reviewTrDate: [
        {
          prop: "cecfCode",
          label: "广交会编码",
          type: "input",
          userDefined: true
        },
        {
          prop: "companyName",
          label: "企业名称",
          type: "string",
          userDefined: true,
          style: 'text-decoration: underline;color: #409EFF;'
        },
        {
          prop: "exhibitionAreaName",
          label: "申请展区",
          type: "input",
          userDefined: true
        },
        // {
        //   prop: "boothNumber",
        //   label: "申请展位数量",
        //   type: "input",
        //   userDefined: true
        // },
        // {
        //   prop: "boothType",
        //   label: "展位类型",
        //   type: "input",
        //   userDefined: true
        // },
        {
          prop: "cityName",
          label: "城市",
          type: "input",
          userDefined: true
        },
        {
          prop: "delegationName",
          label: "交易团",
          type: "input",
          userDefined: true
        },
        {
          prop: "subClusterCheckStatus",
          label: "分团审核情况",
          type: "input",
          userDefined: true
        },
        {
          prop: "clusterCheckStatus",
          label: "交易团审核情况",
          type: "input",
          userDefined: true
        }
      ],
      reviewtData: [
        {
          delegationName: "广东",
          initialNumber: 123,
          operating: true,
          BM02: "F"
        }
      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: right;"
      },
      // 搜索框联动设置
      searchParamsForm: {
        variate: "clusterCheckStatus",
        data: [
          {
            prop: "companyName",
            label: "企业名称",
            value: "",
            width: "120px",
            type: "input"
          },
          // {
          //   prop: "delegation",
          //   label: "交易团",
          //   value: "",
          //   width: "150px",
          //   type: "select"
          // },
          {
            // 英文和数字
            prop: "cecfCode",
            label: "广交会编码",
            value: "",
            width: "120px",
            type: "input"
          },
          {
            prop: "exhibitionArea",
            label: "展区",
            value: "",
            width: "120px",
            type: "select"
          },
          {
            prop: "city",
            label: "城市",
            value: "",
            width: "100px",
            type: "select",
            ishow: "2"
          },
          {
            prop: "subClusterCheckStatus",
            label: "分团审核情况",
            value: "",
            width: "150px",
            type: "select"
          },
          {
            prop: "clusterCheckStatus",
            label: "交易团审核情况",
            value: "",
            width: "150px",
            type: "select"
          }
          // {
          //   prop: "boothType",
          //   label: "展位类型",
          //   value: "",
          //   width: "150px",
          //   type: "select"
          // }
        ],
        dictionary: {
          exhibitionArea: [],
          delegation: [],
          boothType: [],
          city: []
        },
        newButton: {}
      },
      // 传参
      searchParams: {
        // exhibitionArea: "",
        // exhibitionSession: "",
        current: this.$route.query.currentPage || 1,
        size: 10,
        boothType: '01',
        roleJsonStr: []
      },
      searchDate: [],
      labelDate: [],
      boothType: [{
        label: '一般性',
        value: '01'
      },
      {
        label: '品牌',
        value: '02'
      }],
      subClusterCheckStatus: [
        {
          value: 0,
          label: "未审核"
        },
        {
          value: 1,
          label: "通过"
        },
        {
          value: 2,
          label: "未通过"
        },
        {
          value: 3,
          label: "审核中"
        }
      ],
      clusterCheckStatus: [
        {
          value: 0,
          label: "未审核"
        },
        {
          value: 1,
          label: "通过"
        },
        {
          value: 2,
          label: "未通过"
        },
        {
          value: 3,
          label: "审核中"
        }
      ]
    };
  },
  created () {
    // 展区
    this.getexhibitionArea().then(res => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.searchParamsForm.dictionary.exhibitionArea = newRes.map(item => {
        return { value: item.exhibitionAreaCode, label: item.exhibitionAreaName };
      });
    }).catch(e => {});
    this.searchParamsForm.dictionary.boothType = this.boothType;
    // this.searchParamsForm.dictionary.exhibitionArea = await kindo.dictionary.get('exhibitionArea'); // 展区
    // this.searchParamsForm.dictionary.delegation = await kindo.dictionary.get('delegation'); // 交易团
  },
  mounted() {
    let newArry = [];
    for (let key in this.$store.getters.userInfo.role) {
      let newobj = {};
      newobj.roleId = this.$store.getters.userInfo.role[key].roleId;
      newobj.roleName = this.$store.getters.userInfo.role[key].roleName;
      newArry.push(newobj);
    }
    this.searchParams.roleJsonStr = JSON.stringify(newArry);
    this.searchParamsForm.dictionary.clusterCheckStatus = this.clusterCheckStatus;
    this.searchParamsForm.dictionary.subClusterCheckStatus = this.subClusterCheckStatus;
    this.getProvinceDate().then((res) => {
      let newDate = JSON.parse(JSON.stringify(res));
      let tempDate = [];
      for (let key in newDate) {
        let temp = {};
        temp.label = newDate[key];
        temp.value = key;
        tempDate.push(temp);
      }
      this.list = tempDate;
    });
    this.getData();
  },
  computed: {
    ...mapGetters("quantitativeArrangement", [
      "applicationList", // 查询工作部设置的规则相关的交易团
      'provinceDateList'  //展区城市信息
    ])
  },
  methods: {
    ...mapActions("quantitativeArrangement", [
      "getApplicationList", // 确认表彰交易团列表查询
      'getExhibitionDate', //展区信息
      'getProvinceDate'  //展区城市信息
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea" // 展区
    ]),
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getApplicationList(this.searchParams)
        .then(response => {
          if (response.total > 0) {
            this.pageInfo.currentPage = this.$route.query.currentPage || response.current;
            this.pageInfo.total = response.total;
          } else if (response.total === 0) {
            this.pageInfo.currentPage = 1;
            this.pageInfo.total = 0;
          }
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    //联想城市
    newonchangeDate(val) {
      if (val !== '') {
        setTimeout(() => {
          this.searchParamsForm.dictionary.city = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(val.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.searchParamsForm.dictionary.city = [];
      }
    },
    // 点击单元格获取信息.页面跳转
    cellClick(row, column, cell, event) {
      if (column.label === "企业名称") {
        this.$router.push({
          path: '/businessAuditData',
          query: {
            id: row.companyId,
            row: row,
            currentPage: this.pageInfo.currentPage
          }
        });
        // if (row.boothType === '一般性') {
        //   this.$router.push({
        //     path: '/businessAuditData',
        //     query: {
        //       id: row.companyId,
        //       row: row
        //     }
        //   });
        // } else {
        //   this.$router.push({
        //     path: '/brandEnterprise',
        //     query: {
        //       id: row.companyId,
        //       row: row
        //     }
        //   });
        // }
      }
    },
    mouseEnter(row, column, cell, event) {
      if (column.label === "企业名称") {
        let cellDiv = cell.getElementsByTagName('div')[0];
        cellDiv.style.cursor = 'pointer';
      }
    },
    // 判断是否可选
    isSelectable(row, index) {
      if ((row.subClusterCheckStatus === '不通过' || row.subClusterCheckStatus === '通过') && this.$store.getters.userInfo.org.deptType === '7') {
        return true;
      } else {
        return false;
      }
    },
    selectAll(val) {
      this.NoticeDate = [];
      val.forEach(el => {
        let data = {
          'companyId': el.companyId,
          'exhibitionSession': el.exhibitionSession
        };
        this.NoticeDate.push(data);
      });
    },
    //批量审核
    handleSubmitAllSelected() {
      if (this.NoticeDate.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择企业"
        });
      } else {
        this.loading = true;
        this.$http.postJson(`${process.env.API_NA_URL}/api/ordinaryCompany/companyInfo/ordinary/batchCheck`, this.NoticeDate).then(res => {
          this.loading = false;
          this.NoticeDate = [];
          this.$message({
            type: "success",
            message: "提交成功"
          });
          this.getData();
        }).catch(e => {
          this.loading = false;
        });
      }
    },
    // 修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.size = val;
      this.getApplicationList(this.searchParams)
        .then(res => {
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    // 修改当前页信息
    handleCurrentChange(val) {
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.current = val;
      this.getApplicationList(this.searchParams)
        .then(res => {
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    // 模糊查询
    selectParams() {
      let _this = this;
      this.searchParams.current = 1;
      this.searchParams.size = 10;
      this.pageInfo.pageSize = 10;
      let reg = new RegExp('^[A-Za-z0-9]+$');
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        // if (formVal.prop === "delegation" && formVal.type === "select") {
        //   this.searchParams.delegationId = formVal.value;
        //   if (this.searchParams.delegationId !== '') {
        //     for (let key in this.searchParamsForm.dictionary.delegation) {
        //       if (
        //         this.searchParamsForm.dictionary.delegation[key].value === this.searchParams.delegationId
        //       ) {
        //         this.searchParams.delegationName = this.searchParamsForm.dictionary.delegation[
        //           key
        //         ].label;
        //       }
        //     }
        //   } else {
        //     this.searchParams.delegationName = '';
        //   }
        // }
        if (
          formVal.prop === "clusterCheckStatus" && formVal.type === "select"
        ) {
          this.searchParams.clusterCheckStatus = formVal.value;
        }
        if (
          formVal.prop === "boothType" && formVal.type === "select"
        ) {
          this.searchParams.boothType = formVal.value;
        }
        if (
          formVal.prop === "city" && formVal.type === "select"
        ) {
          this.searchParams.city = formVal.value;
        }
        if (
          formVal.prop === "subClusterCheckStatus" && formVal.type === "select"
        ) {
          this.searchParams.subClusterCheckStatus = formVal.value;
        }
        if (formVal.prop === "exhibitionArea" && formVal.type === "select") {
          this.searchParams.exhibitionArea = formVal.value;
          // if (this.searchParams.exhibitionArea !== '' && this.searchParams.exhibitionArea != null) {
          //   for (let key in this.searchParamsForm.dictionary.exhibitionArea) {
          //     if (
          //       this.searchParamsForm.dictionary.exhibitionArea[key].value === this.searchParams.exhibitionArea
          //     ) {
          //       this.searchParams.exhibitionAreaName = this.searchParamsForm.dictionary.exhibitionArea[
          //         key
          //       ].label;
          //     }
          //   }
          // } else {
          //   this.searchParams.exhibitionAreaName = '';
          // }
        }
        if (formVal.prop === "companyName" && formVal.type === "input") {
          this.searchParams.companyName = formVal.value;
        }
        if (formVal.prop === "city" && formVal.type === "input") {
          this.searchParams.city = formVal.value;
        }
        if (formVal.prop === "cecfCode" && formVal.type === "input") {
          if (!reg.test(formVal.value.trim()) && formVal.value !== '') {
            this.$message.error("广交会编码请输入数字或字母");
            formVal.value = '';
            this.searchParams.cecfCode = formVal.value;
          } else {
            this.searchParams.cecfCode = formVal.value;
          }
        }
      });
      let obj = {
        current: 1,
        size: 10
      };
      let key = Object.keys(this.searchParams);
      for (let i = 0; i < key.length; i++) {
        let aFirst = key[i];
        let bSecend = this.searchParams[key[i]];
        if (bSecend !== "") {
          obj[aFirst] = bSecend;
        }
      }
      if (reg.test(this.searchParams.cecfCode) || this.searchParams.cecfCode === '') {
        this.loading = true;
        this.getApplicationList(obj)
          .then(res => {
            _this.loading = false;
            if (res.total > 0) {
              this.pageInfo.currentPage = res.current;
              this.pageInfo.pageSize = 10;
              this.pageInfo.total = res.total;
            } else if (res.total === 0) {
              this.pageInfo.currentPage = 1;
              this.pageInfo.total = 0;
              this.reviewtData = res.records;
            }
          })
          .catch(e => {
            _this.loading = false;
          });
      }
    },
    // 表格按钮操作
    dealWithChangeStatusEvent(scope, operateItem, operate) {
      if (operate.prop === "edit") {
        this.btnDialogVisible = true;
        for (let key in scope.row.label) {
          scope.row.label[key].boothNumber = scope.row.label[key].boothNumber - 0;
        }
        this.fatDate = scope.row;
      } else if (operate.prop === "add") {
        this.getPreservation(scope.row.delegationId).then(res => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.getData();
        });
        scope.row.operating = false;
      }
    }
  }
};
</script>
