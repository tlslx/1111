<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="brandExhibitionInquiry">
    <el-tab-pane label="品牌企业参展确认情况查询" name="first"></el-tab-pane>
    <el-card class="box-card">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="searchParamsForm.dictionary"
        @select-params="selectParams"
        @new-onchangeDate="newonchangeDate"
      ></search-param-link>

      <canBeEdit-table
        :loading="loading"
        :tableTrData="reviewTrDate"
        :tableData="reviewtData"
      ></canBeEdit-table>

      <div style="display: flex; justify-content: space-between;">
        <el-button style="margin-top: 18px; height: 32px;" type="primary" @click="download">下载</el-button>
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
      // 表头数据
      reviewTrDate: [
        {
          prop: "exhibitionAreaName",
          label: "展区",
          type: "input",
          userDefined: true
        },
        {
          prop: "coceralName",
          label: "商协会",
          type: "string",
          userDefined: true
        },
        {
          prop: "dealClusterName",
          label: "交易团",
          type: "input",
          userDefined: true
        },
        {
          prop: "cityName",
          label: "城市",
          type: "input",
          userDefined: true
        },
        {
          prop: "companyName",
          label: "企业名称",
          type: "input",
          userDefined: true
        },
        {
          prop: "cantonFairCode",
          label: "广交会编码",
          type: "input",
          userDefined: true
        },
        {
          prop: "initialBoothNum",
          label: "当届可确认品牌展位数",
          type: "input",
          userDefined: true
        },
        {
          prop: "brandBoothNumber",
          label: "上届品牌展位数",
          type: "input",
          userDefined: true
        },
        {
          prop: "violationBoothNum",
          label: "上届大会收回品牌展位数",
          type: "input",
          userDefined: true
        },
        {
          prop: "affirmBoothNumber",
          label: "本届已确认品牌展位数",
          type: "input",
          userDefined: true
        },
        {
          prop: "unConfirmBoothNum",
          label: "未确认品牌展位数",
          type: "input",
          userDefined: true
        },
        {
          prop: "dealClusterCheckStatus",
          label: "交易团资料审核",
          type: "string",
          userDefined: true
        },
        {
          prop: "coceralCheckStatus",
          label: "商协会资料审核",
          type: "string",
          userDefined: true
        },
        {
          prop: "selfBackNumber",
          label: "申请退回品牌展位数",
          type: "input",
          userDefined: true
        }
      ],
      reviewtData: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: right;"
      },
      list: [],
      // 搜索框联动设置
      searchParamsForm: {
        variate: "exhibitionArea",
        data: [
          {
            prop: "exhibitionArea",
            label: "展区",
            value: "",
            width: "120px",
            type: "select"
          },
          {
            prop: "dealClusterId",
            label: "交易团",
            value: "",
            width: "120px",
            type: "select"
          },
          {
            // 英文和数字
            prop: "coceralId",
            label: "商协会",
            value: "",
            width: "120px",
            type: "select"
          },
          {
            prop: "city",
            label: "城市",
            value: "",
            width: "120px",
            type: "select",
            ishow: "2"
          },
          {
            prop: "ifConfirmAll",
            label: "是否足额确认展位",
            value: "",
            width: "140px",
            type: "select"
          },
          {
            // 英文和数字
            prop: "cantonFairCode",
            label: "广交会编码",
            value: "",
            width: "120px",
            type: "input"
          },
          {
            prop: "companyName",
            label: "企业名称",
            value: "",
            width: "120px",
            type: "input"
          },
          {
            prop: "ifBack",
            label: "是否申请退回品牌展位",
            value: "",
            width: "170px",
            type: "select"
          },
          {
            prop: "dealClusterCheckStatus",
            label: "交易团审核资料",
            value: "",
            width: "140px",
            type: "select"
          },
          {
            prop: "coceralCheckStatus",
            label: "商协会审核资料",
            value: "",
            width: "140px",
            type: "select"
          }
        ],
        dictionary: {
          exhibitionArea: [],
          dealClusterId: [],
          ifConfirmAll: [],
          coceralId: [],
          city: [],
          isBack: [],
          dealClusterCheckStatus: [],
          coceralCheckStatus: []
        },
        newButton: {}
      },
      ifConfirmAllDate: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 2
        }

      ],
      ifBackDate: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 2
        }
      ],
      dealClusterCheckStatusData: [
        {
          label: '未审核',
          value: 0
        },
        {
          label: '通过',
          value: 1
        },
        {
          label: '不通过',
          value: 2
        }
      ],
      coceralCheckStatusData: [
        {
          label: '未审核',
          value: 0
        },
        {
          label: '通过',
          value: 1
        },
        {
          label: '不通过',
          value: 2
        }
      ],
      // 传参
      searchParams: {
        // exhibitionArea: "",
        // exhibitionSession: "",
        current: 1,
        size: 10
      }
    };
  },
  // async beforeCreate() {
  //   this.searchParamsForm.dictionary.city = await kindo.dictionary.get('city'); //城市
  // },
  created () {
    if (this.$store.getters.userInfo.org.parentName.indexOf('商协会') !== -1 || this.$store.getters.userInfo.org.parentName.indexOf('商会') !== -1) {
      this.searchParams['coceralId'] = this.$store.getters.userInfo.org.deptId;
      this.searchParamsForm.data.splice(2, 1);
    } else if (this.$store.getters.userInfo.org.parentName.indexOf('交易团') !== -1) {
      this.searchParams['dealClusterId'] = this.$store.getters.userInfo.org.deptId;
      this.searchParamsForm.data.splice(1, 1);
    }
    this.searchParamsForm.dictionary.ifConfirmAll = this.ifConfirmAllDate;
    this.searchParamsForm.dictionary.ifBack = this.ifBackDate;
    this.searchParamsForm.dictionary.dealClusterCheckStatus = this.dealClusterCheckStatusData;
    this.searchParamsForm.dictionary.coceralCheckStatus = this.coceralCheckStatusData;
     // 展区
    this.getexhibitionArea().then(res => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.searchParamsForm.dictionary.exhibitionArea = newRes.map(item => {
        return { value: item.exhibitionAreaCode, label: item.exhibitionAreaName };
      });
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.searchParamsForm.dictionary.dealClusterId = newRes.map(item => {
        return { value: item.deptId, label: item.deptName };
      });
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.searchParamsForm.dictionary.coceralId = newRes.map(item => {
        return { value: item.deptId, label: item.deptName };
      });
    });
    // 城市
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
    // Promise.all([this.getexhibitionArea(), this.getdelegationDepartment(), this.getassociationDepartment()]).then((res) => {
    //   let newRes = JSON.parse(JSON.stringify(res[0]));
    //   this.searchParamsForm.dictionary.exhibitionArea = newRes.map(item => {
    //     return { value: item.exhibitionAreaCode, label: item.exhibitionAreaName };
    //   });
    //   let newResd = JSON.parse(JSON.stringify(res[1]));
    //   this.searchParamsForm.dictionary.delegation = newResd.map(item => {
    //     return { value: item.deptId, label: item.deptName };
    //   });
    //   let newResc = JSON.parse(JSON.stringify(res[2]));
    //   this.searchParamsForm.dictionary.delegation = newResc.map(item => {
    //     return { value: item.deptId, label: item.deptName };
    //   });
    // });
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("brandBoothArrangement", [
      "confirmList" // 查询工作部设置的规则相关的交易团
    ])
  },
  methods: {
    ...mapActions("brandBoothArrangement", [
      "getConfirmList" // 确认表彰交易团列表查询
    ]),
    ...mapActions("quantitativeArrangement", [
      'getProvinceDate'  //展区城市信息
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment", // 交易团
      'getassociationDepartment' //商协会
    ]),
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getConfirmList(this.searchParams)
        .then(response => {
          this.reviewtData = JSON.parse(JSON.stringify(response.records));
          for (let i = 0; i < this.reviewtData.length; i++) {
            // if (this.reviewtData[i].dealClusterCheckStatus === "0" || this.reviewtData[i].dealClusterCheckStatus == null) {
            if (this.reviewtData[i].dealClusterCheckStatus === "0") {
              this.reviewtData[i].dealClusterCheckStatus = "未审核";
            } else if (this.reviewtData[i].dealClusterCheckStatus === "1") {
              this.reviewtData[i].dealClusterCheckStatus = "通过";
            } else if (this.reviewtData[i].dealClusterCheckStatus === "2") {
              this.reviewtData[i].dealClusterCheckStatus = "不通过";
            }
          }
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
    // 修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.size = val;
      this.getData();
      // this.getConfirmList(this.searchParams)
      //   .then(res => {
      //     this.loading = false;
      //   })
      //   .catch(e => {
      //     this.loading = false;
      //   });
    },
    // 修改当前页信息
    handleCurrentChange(val) {
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.current = val;
      this.getData();
      // this.getConfirmList(this.searchParams)
      //   .then(res => {
      //     this.loading = false;
      //   })
      //   .catch(e => {
      //     this.loading = false;
      //   });
    },
    // 模糊查询
    selectParams() {
      let _this = this;
      this.searchParams.current = 1;
      this.searchParams.size = 10;
      this.pageInfo.pageSize = 10;
      let reg = new RegExp('^[A-Za-z0-9]+$');
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (formVal.prop === "dealClusterId" && formVal.type === "select") {
          this.searchParams.dealClusterId = formVal.value;
          if (this.searchParams.dealClusterId !== '') {
            for (let key in this.searchParamsForm.dictionary.dealClusterId) {
              if (
                this.searchParamsForm.dictionary.dealClusterId[key].value === this.searchParams.dealClusterId
              ) {
                this.searchParams.delegationName = this.searchParamsForm.dictionary.dealClusterId[
                  key
                ].label;
              }
            }
          } else {
            this.searchParams.delegationName = '';
          }
        }
        if (formVal.prop === "exhibitionArea" && formVal.type === "select") {
          this.searchParams.exhibitionArea = formVal.value;
          if (this.searchParams.exhibitionArea !== '') {
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
        if (formVal.prop === "ifConfirmAll" && formVal.type === "select") {
          this.searchParams.ifConfirmAll = formVal.value;
        }
        if (formVal.prop === "ifBack" && formVal.type === "select") {
          this.searchParams.ifBack = formVal.value;
        }
        if (formVal.prop === "dealClusterCheckStatus" && formVal.type === "select") {
          this.searchParams.dealClusterCheckStatus = formVal.value;
        }
        if (formVal.prop === "coceralCheckStatus" && formVal.type === "select") {
          this.searchParams.ifConfirmAll = formVal.value;
        }
        if (formVal.prop === "coceralId" && formVal.type === "select") {
          this.searchParams.coceralId = formVal.value;
        }
        if (formVal.prop === "companyName" && formVal.type === "input") {
          this.searchParams.companyName = formVal.value;
        }
        if (formVal.prop === "city" && formVal.type === "select") {
          this.searchParams.city = formVal.value;
        }
        if (formVal.prop === "cantonFairCode" && formVal.type === "input") {
          if (!reg.test(formVal.value.trim()) && formVal.value !== '') {
            this.$message.error("广交会编码请输入数字或字母");
            formVal.value = '';
            this.searchParams.cantonFairCode = formVal.value;
          } else {
            this.searchParams.cantonFairCode = formVal.value;
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
      if (this.$store.getters.userInfo.org.parentName.indexOf('商协会') !== -1 || this.$store.getters.userInfo.org.parentName.indexOf('商会') !== -1) {
        obj['coceralId'] = this.$store.getters.userInfo.org.deptId;
      } else if (this.$store.getters.userInfo.org.parentName.indexOf('交易团') !== -1) {
        obj['dealClusterId'] = this.$store.getters.userInfo.org.deptId;
      }
      if (reg.test(this.searchParams.cantonFairCode) || this.searchParams.cantonFairCode === '') {
        this.loading = true;
        this.getConfirmList(obj)
          .then(res => {
            _this.loading = false;
            this.reviewtData = JSON.parse(JSON.stringify(res.records));
            for (let i = 0; i < this.reviewtData.length; i++) {
              if (this.reviewtData[i].dealClusterCheckStatus === "0" || this.reviewtData[i].dealClusterCheckStatus == null) {
                this.reviewtData[i].dealClusterCheckStatus = "未审核";
              } else if (this.reviewtData[i].dealClusterCheckStatus === "1") {
                this.reviewtData[i].dealClusterCheckStatus = "通过";
              } else if (this.reviewtData[i].dealClusterCheckStatus === "2") {
                this.reviewtData[i].dealClusterCheckStatus = "不通过";
              }
            }
            if (res.total > 0) {
              this.pageInfo.currentPage = res.current;
              this.pageInfo.pageSize = 10;
              this.pageInfo.total = res.total;
            } else if (res.total === 0) {
              this.pageInfo.currentPage = 1;
              this.pageInfo.total = 0;
            }
          })
          .catch(e => {
            _this.loading = false;
          });
      }
    },
    //下载
    download() {
      let url = `dealClusterId=${this.searchParams.dealClusterId}&exhibitionArea=${this.searchParams.exhibitionArea}&ifConfirmAll=${this.searchParams.ifConfirmAll}&ifBack=${this.searchParams.ifBack}&coceralId=${this.searchParams.coceralId}&companyName=${this.searchParams.companyName}&city=${this.searchParams.city}&cantonFairCode=${this.searchParams.cantonFairCode}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/SchemePublish/getConfirmList/download?${url}&deptId=${this.$store.getters.userInfo.org.deptId}&deptName=${this.$store.getters.userInfo.org.deptName}&deptType=${this.$store.getters.userInfo.org.deptType}&token=${this.$store.state.token}`, '_parent');
    }
  }
};
</script>
