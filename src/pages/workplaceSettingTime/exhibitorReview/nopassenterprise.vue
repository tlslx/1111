<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="commendationList">
    <el-tab-pane label="商协会通知" name="first"></el-tab-pane>
    <el-card class="box-card">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="searchParamsForm.dictionary"
        @select-params="selectParams"
      ></search-param-link>
      <canBeEdit-table
        :loading="loading"
        :tableTrData="reviewTrDate"
        :tableData="businessList.records"
        :selection ='selection'
        :isSelectable ='isSelectable'
        @change-multiple-selection ='selectAll'
      ></canBeEdit-table>
      <div style="display: flex; justify-content: space-between;">
        <el-button style="margin-top: 18px; height: 32px;" type="primary" @click="onNotice">通知</el-button>
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
      selection: true,
      // 表头数据
      reviewTrDate: [
        {
          prop: "noticeStatus",
          label: "通知状态",
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
          prop: "cecfCode",
          label: "广交会编码",
          type: "input",
          userDefined: true
        },
        {
          prop: "companyName",
          label: "企业中文名称",
          type: "input",
          userDefined: true
        },
        {
          prop: "exhibitionAreaName",
          label: "展区",
          type: "input",
          width: '100',
          userDefined: true
        },
        {
          prop: "boothType",
          label: "展位类型",
          type: "input",
          userDefined: true
        },
        {
          prop: "exhibitionType",
          label: "布展类型",
          type: "input",
          userDefined: true
        },
        {
          prop: "boothNumberLast",
          label: "上届展位数",
          type: "input",
          userDefined: true
        },
        {
          prop: "customsCodes",
          label: "海关编码",
          type: "input",
          userDefined: true
        },
        {
          prop: "amountExports",
          label: "出口额",
          type: "input",
          userDefined: true
        },
        {
          prop: "businessAssociationCode",
          label: "商协会会员号",
          type: "input",
          userDefined: true
        },
        {
          prop: "newDate",
          label: "最大产品尺寸（长*宽*高 单位米）",
          type: "input",
          userDefined: true
        },
        {
          label: "分类别审核",
          type: "child",
          childen: [
            {
              prop: "categoryA",
              label: "A类",
              width: '100'
            },
            {
              prop: "categoryB",
              label: "B类",
              width: '100'
            },
            {
              prop: "categoryC",
              label: "C类",
              width: '100'
            },
            {
              prop: "categoryD",
              label: "D类",
              width: '100'
            },
            {
              prop: "categoryE",
              label: "E类",
              width: '100'
            }
          ]
        },
        {
          prop: "overallRatingStatus",
          label: "总体审核",
          type: "string",
          style: 'width: 100px'
        }
      ],
      reviewtData: [
      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: right;"
      },
      // 搜索框联动设置
      searchParamsForm: {
        variate: "delegation",
        data: [
          {
            prop: "boothType",
            label: "展位类型",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "cecfCode",
            label: "广交会编码",
            value: "",
            width: "100px",
            type: "input"
          },
          {
            prop: "exhibitionArea",
            label: "展区",
            value: "",
            width: "60px",
            type: "select"
          },
          {
            prop: "exhibitionType",
            label: "布展类型",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "noticeStatus",
            label: "通知状态",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "delegation",
            label: "交易团",
            value: "",
            width: "80px",
            type: "select"
          }
        ],
        dictionary: {
          exhibitionArea: [],
          boothType: [],
          exhibitionType: []
        },
        newButton: {}
      },
      noticeStatus: [
        {
          value: "0",
          label: "未通知"
        },
        {
          value: "1",
          label: "已通知"
        }
      ],
      // 传参
      searchParams: {
        current: 1,
        size: 10,
        overallRatingStatus: 2
      },
      NoticeDate: []
    };
  },
  async created() {
    // this.searchParamsForm.dictionary.exhibitionArea = await kindo.dictionary.get('exhibitionArea'); // 展区
    // this.searchParamsForm.dictionary.delegation = await kindo.dictionary.get('delegation'); // 交易团
    this.searchParamsForm.dictionary.boothType = await kindo.dictionary.get('booth_Type'); // 展位类型
    this.searchParamsForm.dictionary.exhibitionType = await kindo.dictionary.get('exhibitionType'); // 布展类型
  },
  mounted() {
    // 展区
    this.getExhibitionDate(this.$store.getters.userInfo.org.deptId).then((res) => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.searchParamsForm.dictionary.exhibitionArea = newRes.map(item => {
        return { value: item.exhibitionAreaCode, label: item.exhibitionAreaName };
      });
    });
    // 交易团
    this.getdelegationDepartment().then(res => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.searchParamsForm.dictionary.delegation = newRes.map(item => {
        return { value: item.deptId, label: item.deptName };
      });
    }).catch(e => {});
    this.searchParamsForm.dictionary.noticeStatus = this.noticeStatus;
    this.getData();
  },
  computed: {
    ...mapGetters("quantitativeArrangement", [
      "businessList" // 商协会复核查询
    ])
  },
  methods: {
    ...mapActions("quantitativeArrangement", [
      "getBusinessreview", // 商协会复核查询
      'getInformEnterprises'
    ]),
    ...mapActions("nainformation", [
      "getdelegationDepartment" // 交易团
    ]),
    ...mapActions("quantitativeArrangement", [
      'getExhibitionDate' //展区信息
    ]),
    // 全选按钮
    isSelectable(row, index) {
      if (row.noticeStatus === '已通知') {
        return false;
      } else {
        return true;
      }
    },
    selectAll(val) {
      this.NoticeDate = val;
    },
    //通知按钮
    onNotice() {
      if (this.NoticeDate.length !== 0) {
        let temp = {};
        let demandRecordList = [];
        for (let key in this.NoticeDate) {
          let newDate = {};
          newDate.demandRecordId = this.NoticeDate[key].demandRecordId;
          demandRecordList.push(newDate);
        }
        temp.demandRecordList = demandRecordList;
        temp.creatorId = this.$store.getters.userInfo.userId;
        temp.creatorName = this.$store.getters.userInfo.userName;
        this.getInformEnterprises(temp).then((res) => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.getData();
        });
      } else {
        this.$message.error('请选择要通知的企业');
      }

    },
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getBusinessreview(this.searchParams)
        .then(response => {
          // // this.reviewtData = response.records;
          if (response.total > 0) {
            this.pageInfo.currentPage = response.current;
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
    // 修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.size = val;
      this.getBusinessreview(this.searchParams)
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
      this.getBusinessreview(this.searchParams)
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
      let reg = new RegExp("^[A-Za-z0-9]+$");
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (formVal.prop === "delegation" && formVal.type === "select") {
          this.searchParams.delegationId = formVal.value;
          // if (this.searchParams.delegationId !== '' && this.searchParams.delegationId != null) {
          //   for (let key in this.searchParamsForm.dictionary.delegation) {
          //     if (
          //       this.searchParamsForm.dictionary.delegation[key].value === this.searchParams.delegationId
          //     ) {
          //       this.searchParams.delegationName = this.searchParamsForm.dictionary.delegation[
          //         key
          //       ].label;
          //     }
          //   }
          // } else {
          //   this.searchParams.delegationName = '';
          // }
        }
        if (formVal.prop === "exhibitionArea" && formVal.type === "select") {
          this.searchParams.exhibitionArea = formVal.value;
          if (this.searchParams.exhibitionArea !== '' && this.searchParams.exhibitionArea != null) {
            for (let key in this.searchParamsForm.dictionary.exhibitionArea) {
              if (
                this.searchParamsForm.dictionary.exhibitionArea[key].value === this.searchParams.exhibitionArea
              ) {
                this.searchParams.exhibitionAreaName = this.searchParamsForm.dictionary.exhibitionArea[
                  key
                ].label;
              }
            }
          } else {
            this.searchParams.exhibitionAreaName = '';
          }
        }
        if (formVal.prop === "exhibitionType" && formVal.type === "select") {
          this.searchParams.exhibitionType = formVal.value;
        }
        if (formVal.prop === "boothType" && formVal.type === "select") {
          this.searchParams.boothType = formVal.value;
        }
        if (formVal.prop === "noticeStatus" && formVal.type === "select") {
          this.searchParams.noticeStatus = formVal.value;
        }
        if (formVal.prop === "cecfCode" && formVal.type === "input") {
          if (!reg.test(formVal.value.trim()) && formVal.value !== "") {
            this.$message.error("广交会编码请输入数字或字母");
            formVal.value = "";
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
      if (
        reg.test(this.searchParams.cecfCode) || this.searchParams.cecfCode === ""
      ) {
        this.loading = true;
        this.getBusinessreview(obj)
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
    }
  }
};
</script>
