<style lang="less" scoped>
.pages {
  text-align: right;
}
</style>
<template>
  <el-tabs v-model="activeName" class="businessReview">
    <el-tab-pane label="商协会复核" name="first"></el-tab-pane>
    <el-card class="box-card">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="searchParamsForm.dictionary"
        @select-params="selectParams"
      ></search-param-link>
      <div>
        <p>共查询到{{this.pageInfo.total}}条记录</p>
        <p>注：一下分类别审核中A-E类分别代表。</p>
        <p>A类：依法取得法人营业执照和外贸经营者登记证明，并已办理进出口企业代码。</p>
        <p>B类：出口金额达到最低标准。</p>
        <p>C类：参展展品情况（参考《中国进出口商品交易会（出口展）一般性展位数量安排办法》第二章第十一条）</p>
        <p>D类：企业信用情况（参考《中国进出口商品交易会（出口展）一般性展位数量安排办法》第二章第十二条）</p>
        <p>E类：企业环保情况（参考《中国进出口商品交易会（出口展）一般性展位数量安排办法》第二章第十二条）</p>
      </div>
      <canBeEdit-table
        :loading="loading"
        :tableTrData="reviewTrDate"
        :tableData="businessList.records"
        @childOperate="childOperate"
      ></canBeEdit-table>
      <pagination
        class="pages"
        :pageInfo="pageInfo"
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"
      ></pagination>
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
          type: "string"
        },
        {
          prop: "exhibitionAreaName",
          label: "展区",
          type: "string"
        },
        {
          prop: "boothType",
          label: "展位类型",
          type: "string"
        },
        {
          prop: "exhibitionType",
          label: "布展类型",
          type: "string"
        },
        {
          prop: "boothNumberLast",
          label: "上届展位数",
          type: "string"
        },
        {
          prop: "customsCodes",
          label: "海关编码",
          type: "string"
        },
        {
          prop: "amountExports",
          label: "出口额",
          type: "string"
        },
        {
          prop: "businessAssociationCode",
          label: "商协会会员号",
          type: "string"
        },
        {
          prop: "newDate",
          label: "最大产品尺寸（长*宽*高 单位米）",
          type: "string"
        },
        {
          label: "分类别审核",
          type: "child",
          childen: [
            {
              prop: "categoryA",
              label: "A类"
            },
            {
              label: "A类操作",
              type: "btn",
              width: "120",
              textArray: [
                {
                  prop: "pass",
                  label: "合格",
                  type: "text",
                  style:
                    "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
                },
                {
                  prop: "nopass",
                  label: "不合格",
                  type: "text",
                  style:
                    "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
                }
              ]
            },
            {
              prop: "categoryB",
              label: "B类"
            },
            {
              label: "B类操作",
              type: "btn",
              width: "120",
              textArray: [
                {
                  prop: "pass",
                  label: "合格",
                  type: "text",
                  style:
                    "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
                },
                {
                  prop: "nopass",
                  label: "不合格",
                  type: "text",
                  style:
                    "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
                }
              ]
            },
            {
              prop: "categoryC",
              label: "C类"
            },
            {
              label: "C类操作",
              type: "btn",
              width: "120",
              textArray: [
                {
                  prop: "pass",
                  label: "合格",
                  type: "text",
                  style:
                    "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
                },
                {
                  prop: "nopass",
                  label: "不合格",
                  type: "text",
                  style:
                    "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
                }
              ]
            },
            {
              prop: "categoryD",
              label: "D类"
            },
            {
              label: "D类操作",
              type: "btn",
              width: "120",
              textArray: [
                {
                  prop: "pass",
                  label: "合格",
                  type: "text",
                  style:
                    "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
                },
                {
                  prop: "nopass",
                  label: "不合格",
                  type: "text",
                  style:
                    "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
                }
              ]
            },
            {
              prop: "categoryE",
              label: "E类"
            },
            {
              label: "E类操作",
              type: "btn",
              width: "120",
              textArray: [
                {
                  prop: "pass",
                  label: "合格",
                  type: "text",
                  style:
                    "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
                },
                {
                  prop: "nopass",
                  label: "不合格",
                  type: "text",
                  style:
                    "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
                }
              ]
            }
          ]
        },
        {
          label: "总体审核",
          type: "child",
          childen: [
            {
              prop: "overallRatingStatus",
              label: "总体审核"
            },
            {
              label: "总体审核操作",
              type: "btn",
              width: "120",
              textArray: [
                {
                  prop: "pass",
                  label: "通过",
                  type: "text",
                  style:
                    "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
                },
                {
                  prop: "nopass",
                  label: "不通过",
                  type: "text",
                  style:
                    "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
                }
              ]
            }
          ]
        }
      ],
      reviewtData: [
        {
          applyCode: "1111",
          apply: "境外",
          operateType: "text",
          Code: "lalal",
          enclosure: "wwww"
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
        variate: "boothType",
        data: [
          {
            prop: "delegation",
            label: "交易团",
            value: "",
            width: "80px",
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
            prop: "boothType",
            label: "展位类型",
            value: "",
            width: "82px",
            type: "select"
          }
        ],
        dictionary: {
          exhibitionType: [],
          exhibitionArea: [],
          boothType: [
          ],
          delegation: []
        }
      },
      // 传参
      searchParams: {
        // exhibitionArea: "",
        // exhibitionSession: "",
        current: 1,
        size: 10
      }
    };
  },
  async created() {
    // this.searchParamsForm.dictionary.exhibitionArea = await kindo.dictionary.get('exhibitionArea'); // 展区
    // this.searchParamsForm.dictionary.delegation = await kindo.dictionary.get('delegation'); // 交易团
    this.searchParamsForm.dictionary.exhibitionType = await kindo.dictionary.get('exhibitionType'); // 布展类型
    this.searchParamsForm.dictionary.boothType = await kindo.dictionary.get('booth_Type'); // 展位类型
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
    this.getData();
  },
  computed: {
    ...mapGetters("quantitativeArrangement", [
      "businessList", // 商协会复核查询
      "categoryAList"
    ])
  },
  methods: {
    ...mapActions("quantitativeArrangement", [
      "getBusinessreview", // 商协会复核查询
      "getBusinesscategoryA",
      'getBusinesscategoryB',
      'getBusinesscategoryC',
      'getBusinesscategoryD',
      'getBusinesscategoryE',
      'getBusinesscategoryALL'
    ]),
    ...mapActions("nainformation", [
      "getdelegationDepartment" // 交易团
    ]),
    ...mapActions("quantitativeArrangement", [
      'getExhibitionDate' //展区信息
    ]),
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getBusinessreview(this.searchParams)
        .then(response => {
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
    // 表格操作按钮
    childOperate(scope, operateItem, operate) {
      let temp = {};
      temp.ownId = scope.row.demandRecordId;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      if (operate.prop === "pass") {
        temp.examineOpinion = operate.label;
        temp.examineStatus = "1";
        this.$confirm("此操作审核" + operateItem.label + operate.label + ", 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (operateItem.label === "A类操作") {
              this.getBusinesscategoryA(temp).then(res => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.getData();
              });
            } else if (operateItem.label === "B类操作") {
              this.getBusinesscategoryB(temp).then(res => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.getData();
              });
            } else if (operateItem.label === "C类操作") {
              this.getBusinesscategoryC(temp).then(res => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.getData();
              });
            } else if (operateItem.label === "D类操作") {
              this.getBusinesscategoryD(temp).then(res => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.getData();
              });
            } else if (operateItem.label === "E类操作") {
              this.getBusinesscategoryE(temp).then(res => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.getData();
              });
            } else if (operateItem.label === "总体审核操作") {
              this.getBusinesscategoryALL(temp).then(res => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.getData();
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
      } else if (operate.prop === "nopass") {
        temp.examineStatus = "2";
        this.$prompt(
          "此操作审核" + operateItem.label + operate.label + "并填入不通过理由, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /^(?!(\s+$)).{1,200}$/,
            inputErrorMessage: "请填入不通过理由,长度为200字符,请不要输入全空格"
          }
        )
          .then(value => {
            temp.examineOpinion = value.value;
            if (operateItem.label === "A类操作") {
              this.getBusinesscategoryA(temp).then(res => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.getData();
              });
            } else if (operateItem.label === "B类操作") {
              this.getBusinesscategoryB(temp).then(res => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.getData();
              });
            } else if (operateItem.label === "C类操作") {
              this.getBusinesscategoryC(temp).then(res => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.getData();
              });
            } else if (operateItem.label === "D类操作") {
              this.getBusinesscategoryD(temp).then(res => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.getData();
              });
            } else if (operateItem.label === "E类操作") {
              this.getBusinesscategoryE(temp).then(res => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.getData();
              });
            } else if (operateItem.label === "总体审核操作") {
              this.getBusinesscategoryALL(temp).then(res => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.getData();
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
      }
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
    // 模糊查询
    selectParams() {
      let _this = this;
      this.searchParams.current = 1;
      this.searchParams.size = 10;
      this.pageInfo.pageSize = 10;
      let reg = new RegExp("^[A-Za-z0-9]+$");
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (formVal.prop === "delegation" && formVal.type === "select") {
          this.searchParams.delegationId = formVal.value;
          // if (this.searchParams.delegationId !== '' && this.searchParams.delegationId != null) {
          //   for (let key in this.searchParamsForm.dictionary.delegation) {
          //     if (
          //       this.searchParamsForm.dictionary.delegation[key].value === this.searchParams.delegationId
          //     ) {
          //       this.searchParams.delegationName = this.searchParamsForm.dictionary.delegation[key].label;
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
