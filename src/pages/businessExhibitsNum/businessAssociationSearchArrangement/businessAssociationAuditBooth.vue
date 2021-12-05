<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="businessReview">
    <el-tab-pane label="商协会审核粘连展位安排" name="first"></el-tab-pane>
    <el-card class="box-card">
      <search-param-link :searchParamsForm="searchParamsForm.data" :variate="searchParamsForm.variate" :dictionary="searchParamsForm.dictionary" @select-params="selectParams"></search-param-link>
      <canBeEdit-table :loading="loading" :tableTrData="reviewTrDate" @input-blur="handleBlur" :tableData="tableData.records" :rules="rules" :selection='selection' :isSelectable='isSelectable' @change-multiple-selection='selectAll' @deal-with-operate="customsEvent"></canBeEdit-table>
      <div style="display: flex; justify-content: space-between;">
        <div>
          <el-button style="margin-top: 18px; height: 32px;" type="primary" @click="onNotice('通过')" :disabled="timeData.currentTime < timeData.startTime || timeData.currentTime > timeData.endTime">通过</el-button>
          <el-button style="margin-top: 18px; height: 32px;" type="primary" @click="onNotice('不通过')" :disabled="timeData.currentTime < timeData.startTime || timeData.currentTime > timeData.endTime">不通过</el-button>
          <el-button style="margin-top: 18px; height: 32px;" type="primary" @click="handleDownload">下载</el-button>
        </div>
        <pagination class="pages" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
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
    var needInt = (rule, value, callback) => {
      const reg = /[^\d\$]/g;
      if (!value) {
        return callback(new Error('请输入>0的整数'));
      } else if (reg.test(value)) {
        return callback(new Error('请输入>0的整数'));
      } else {
        return callback();
      }
    };
    return {
      activeName: "first",
      loading: false,
      selection: true,
      NoticeDate: [],
      // 表头数据
      reviewTrDate: [
        {
          prop: "delegationName",
          label: "交易团",
          type: "string"
        },
        {
          prop: "companyCecfCode",
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
          prop: "city",
          label: "城市",
          type: "input"
        },
        {
          prop: "exhibitionPeriod",
          label: "期数",
          type: "input"
        },
        {
          prop: "exhibitionAreaName",
          label: "展区",
          type: "string"
        },
        {
          prop: "boothNumber",
          label: "申请展位数",
          type: "string"
        },
        {
          prop: "exhibitionType",
          label: "布展类型",
          type: "string"
        },
        {
          prop: "recommendSpecial",
          label: "交易团推荐特装数",
          type: "string"
        },
        {
          prop: "recommendStandard",
          label: "交易团推荐标摊数",
          type: "string"
        },
        {
          prop: "recommendUnified",
          label: "交易团推荐统一布展展位数",
          type: "string"
        },
        {
          prop: "recommendSumNumber",
          label: "一般性展位安排总数",
          type: "string"
        },
        {
          prop: "recommendCentralChannel",
          label: "交易团推荐中央通道展位数",
          type: "string"
        },
        {
          prop: "applyAdjoinNumber",
          label: "交易团推荐粘连展位数",
          type: "string"
        },
        {
          prop: "examineStatus",
          label: "企业资质复核结果",
          type: "string"
        },
        {
          prop: "brandAdhesionResult",
          label: "品牌粘连审核结果",
          type: "string"
        },
        {
          prop: "adhesionNumberResult",
          label: "审核通过粘连数",
          width: 200,
          maxlength: 10,
          type: "fillinput",
          disabled: 'editFlag'
        },
        {
          type: "btn",
          label: "品牌粘连审核",
          show: true,
          unChangeStatus: true,
          width: "160",
          operator: {
            type: "text",
            textArray: [
              {
                prop: "pass",
                label: "通过",
                style:
                  "text-decoration: underline;color: #409EFF; margin-right: 10px;"
              },
              {
                prop: "nopass",
                label: "不通过",
                style:
                  "text-decoration: underline;margin-right: 10px; color: #409EFF;"
              }
            ]
          }
        }
        // {
        //   label: "建议更换",
        //   type: "child",
        //   childen: [
        //     {
        //       prop: "suggestChange",
        //       label: "建议更换审核"
        //     },
        //     {
        //       label: "建议更换操作",
        //       type: "btn",
        //       width: "120",
        //       textArray: [
        //         {
        //           prop: "pass",
        //           label: "更换",
        //           type: "text",
        //           style:
        //             "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
        //         },
        //         {
        //           prop: "nopass",
        //           label: "维持",
        //           type: "text",
        //           style:
        //             "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   label: "品牌粘连审核",
        //   type: "child",
        //   childen: [
        //     {
        //       prop: "brandAdhesionCheck",
        //       label: "品牌粘连审核"
        //     },
        //     {
        //       label: "品牌粘连操作",
        //       type: "btn",
        //       width: "120",
        //       textArray: [
        //         {
        //           prop: "pass",
        //           label: "通过",
        //           type: "text",
        //           style:
        //             "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
        //         },
        //         {
        //           prop: "nopass",
        //           label: "不通过",
        //           type: "text",
        //           style:
        //             "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   label: "粘连数量审核",
        //   type: "child",
        //   childen: [
        //     {
        //       prop: "brandAdhesionNumberCheck",
        //       label: "粘连数量审核"
        //     },
        //     {
        //       label: "粘连数量审核操作",
        //       type: "btn",
        //       width: "120",
        //       textArray: [
        //         {
        //           prop: "pass",
        //           label: "通过",
        //           type: "text",
        //           style:
        //             "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
        //         },
        //         {
        //           prop: "nopass",
        //           label: "不通过",
        //           type: "text",
        //           style:
        //             "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
        //         }
        //       ]
        //     }
        //   ]
        // }
      ],
      rules: {
        adhesionNumberResult: [{ validator: needInt, trigger: 'change' }]
      },
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
        variate: "delegation",
        data: [
          {
            prop: "companyName",
            label: "企业名称",
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
            prop: "isCoceralVip",
            label: "是否商会会员",
            value: "",
            width: "120px",
            type: "select"
          },
          {
            prop: "companyCecfCode",
            label: "广交会编码",
            value: "",
            width: "120px",
            type: "input"
          },
          {
            prop: "exhibitionType",
            label: "布展类型",
            value: "",
            width: "120px",
            type: "select"
          },
          {
            prop: "delegation",
            label: "交易团",
            value: "",
            width: "120px",
            type: "select"
          }
          // {
          //   prop: "isBrandCompany",
          //   label: "是否品牌企业",
          //   value: "",
          //   width: "120px",
          //   type: "select"
          // }
          // {
          //   prop: "city",
          //   label: "城市",
          //   value: "",
          //   width: "100px",
          //   type: "select"
          // },
          // {
          //   prop: "schedulePlan",
          //   label: "安排情况",
          //   value: "",
          //   width: "120px",
          //   type: "select"
          // }
        ],
        dictionary: {
          city: [],
          exhibitionArea: [],
          exhibitionPeriod: [],
          exhibitionType: [],
          delegation: [],
          coceral: [],
          isCoceralVip: [],
          isBrandCompany: [],
          schedulePlan: []
        }
      },
      // 开放期间时间
      timeData: {
        startTime: '',
        endTime: '',
        currentTime: ''
      },
      tableData: {},
      // 传参
      searchParams: {
        current: 1,
        size: 10,
        coceralId: this.$store.getters.userInfo.org.deptId,
        exhibitionAreaCode: ''
      },
      istrue: true,
      isVal: [
        {
          value: '1',
          label: "是"
        },
        {
          value: '0',
          label: "否"
        }
      ],
      schedulePlan: [
        {
          value: '1',
          label: "已安排"
        },
        {
          value: '0',
          label: "未安排"
        }
      ]
    };
  },
  async created() {
    if (this.$store.getters.userInfo.org.deptCode) {
      this.searchParams.coeralId = this.$store.getters.userInfo.org.deptCode;
    }
    this.searchParamsForm.dictionary.city = await kindo.dictionary.get('city'); //城市
    // this.searchParamsForm.dictionary.delegation = await kindo.dictionary.get('delegation'); //交易团
    this.searchParamsForm.dictionary.exhibitionPeriod = await kindo.dictionary.get('exhibitionPeriodNum'); //展期
    // this.searchParamsForm.dictionary.exhibitionArea = await kindo.dictionary.get('exhibitionArea'); // 展区
    this.searchParamsForm.dictionary.exhibitionType = [{ value: 'SPECIAL_BOOTH', label: '绿色特装' }, { value: 'STANDARD_BOOTH', label: '标摊' }, { value: 'CENTER_CHANNEL_BOOTH', label: '中央通道' }, { value: 'UNIFICATION_BOOTH', label: '统一布展' }]; // 布展类型
    //this.searchParamsForm.dictionary.coceral = await kindo.dictionary.get('coceral'); // 商协会
  },
  mounted() {
    // 展区
    this.getexhibitionArea(this.$store.getters.userInfo.org.deptId).then(res => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.searchParamsForm.dictionary.exhibitionArea = newRes.map(item => {
        return { value: item.exhibitionAreaCode, label: item.exhibitionAreaName };
      });
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.searchParamsForm.dictionary.delegation = newRes.map(item => {
        return { value: item.deptId, label: item.deptName };
      });
    }).catch(e => {});
    // 商会
    this.getassociationDepartment().then(res => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.searchParamsForm.dictionary.coceralId = newRes.map(item => {
        return { value: item.deptId, label: item.deptName };
      });
    });
    this.searchParamsForm.dictionary.isBrandCompany = this.isVal;
    this.searchParamsForm.dictionary.isCoceralVip = this.isVal;
    this.searchParamsForm.dictionary.schedulePlan = this.schedulePlan;
    this.getData();
  },
  computed: {
    ...mapGetters("businessAssociationSearchArrangement", [
      "ordinaryarrangList" ////商协会审核安排方案(查询)
    ])
  },
  methods: {
    ...mapActions("businessAssociationSearchArrangement", [
      "getOrdinaryArrangement", // //商协会审核安排方案(查询)
      'getCoceralBrandAdhesionCheck',
      'getCoceralBrandAdhesionNumberCheck',
      'getSuggestChange',
      'getCoceralAdhesion'  //通过不通过
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment", // 交易团
      "getassociationDepartment" // 商会
    ]),
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getOrdinaryArrangement(this.searchParams)
        .then(response => {
          if (response.total > 0) {
            this.pageInfo.currentPage = response.current;
            this.pageInfo.total = response.total;
          } else if (response.total === 0) {
            this.pageInfo.currentPage = 1;
            this.pageInfo.total = 0;
          }
          // 是否粘连功能开放期间
          this.$http.get(`${process.env.API_NA_URL}/api/speciaAreaExternal/time/get`, { subKey: 'ADHESION_BOOTH_APPLICATION_NO_TIME', orald: this.$store.getters.userInfo.org.deptId }).then(res => {
            let startTime = res.startTime === '0000/00/00' ? 0 : new Date(res.startTime).getTime();
            this.timeData.startTime = startTime;
            let endTime = res.endTime === '0000/00/00' ? 0 : new Date(res.endTime).getTime();
            this.timeData.endTime = endTime === 0 ? endTime : (endTime + 24 * 60 * 60 * 1000 - 1);
            this.timeData.currentTime = new Date().getTime();
            if ((this.timeData.currentTime < this.timeData.startTime || this.timeData.currentTime > this.timeData.endTime) && this.timeData.startTime !== 0 && this.timeData.endTime !== 0) {
              this.$message.warning('注意：当前时间不在商会审核品牌粘连内');
            }
            this.tableData = JSON.parse(JSON.stringify(this.ordinaryarrangList));
            for (let key in this.tableData.records) {
              if ((this.timeData.currentTime < this.timeData.startTime || this.timeData.currentTime > this.timeData.endTime) && this.timeData.startTime !== 0 && this.timeData.endTime !== 0) {
                this.tableData.records[key].disFlag = '0';
              } else {
                this.tableData.records[key].disFlag = '1';
              }
            }
            this.loading = false;
          }).catch(e => {
            this.loading = false;
          });
        })
        .catch(e => {
          this.loading = false;
        });
    },
    // 全选按钮
    isSelectable(row, index) {
      // if (row.brandAdhesionResult === '未审核') {
      return true;
      // } else {
      //   return false;
      // }
    },
    selectAll(val) {
      this.NoticeDate = val;
    },
    // 鼠标失去焦点事件
    handleBlur(value, row) {
      if (row.brandAdhesionResult === '1' || row.brandAdhesionResult === '2') {
        this.$message.error("该企业已审核,请选择未审核的企业!");
      } else if (row.exhibitionAreaCode === 'MA02' && (Number(row.adhesionNumberResult) > Number(row.recommendUnified))) {
        this.$message.warning('“商协会审核粘连数”不得大于“统一布展推荐数”，请重新输入');
      } else if (row.exhibitionAreaCode !== 'MA02' && (Number(row.adhesionNumberResult) > Number(row.recommendSpecial))) {
        this.$message.warning('“商协会审核粘连数”不得大于“特装推荐数”，请重新输入');
      } else {
        let reg = /^(\d{1,8}|\d{1,8}\.\d{0,1}|\s*)$/;
        let newresult = row.adhesionNumberResult + '';
        if (reg.test(newresult) && newresult !== '' && newresult !== '0') {
          let newArry = [];
          let temp = {};
          temp.ownId = row.recommendId;
          if (row.adhesionNumberResult === '') {
            temp.adhesionNumberResult = row.applyAdjoinNumber;
          } else {
            temp.adhesionNumberResult = row.adhesionNumberResult;
          }
          //temp.examineOpinion = value.value;
          temp.examineUserId = this.$store.getters.userInfo.userId;
          temp.examineUserCn = this.$store.getters.userInfo.userName;
          temp.examineStatus = "1";
          newArry.push(temp);
          this.getCoceralAdhesion(newArry).then((res) => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.getData();
          });
        } 
        // else {
        //   this.$message.error("请填入正确商协会审核粘连数,长度最多为8位数,不要超过1位小数");
        // }
      }  
    },
    //批量审核
    onNotice(val) {
      let _this = this;
      if (this.NoticeDate && this.NoticeDate.length > 0) {
        let reg = /^(\d{1,8}|\d{1,8}\.\d{0,1}|\s*)$/;
        this.istrue = true;
        for (let key in this.NoticeDate) {
          if (!reg.test(this.NoticeDate[key].adhesionNumberResult)) {
            this.istrue = false;
            this.$message.error("请填入正确商协会审核粘连数,长度为8位数,不要超过1位小数!");
            break;
          } else if (this.NoticeDate[key].exhibitionAreaCode === 'MA02' && (Number(this.NoticeDate[key].adhesionNumberResult) > Number(this.NoticeDate[key].recommendUnified))) {
            this.istrue = false;
            this.$message.warning('“商协会审核粘连数”不得大于“统一布展推荐数”，请重新输入');
            break;
          } else if (this.NoticeDate[key].exhibitionAreaCode !== 'MA02' && (Number(this.NoticeDate[key].adhesionNumberResult) > Number(this.NoticeDate[key].recommendSpecial))) {
            this.istrue = false;
            this.$message.warning('“商协会审核粘连数”不得大于“特装推荐数”，请重新输入');
            break;
          }
        }
        if (this.istrue === true) {
          // this.$prompt(
          //   "此操作商协会将审核" + val + "并填入" + val + "理由, 是否继续?",
          //   "提示",
          //   {
          //     confirmButtonText: "确定",
          //     cancelButtonText: "取消",
          //     inputPattern: /^(?!(\s+$)).{1,200}$/,
          //     inputErrorMessage: "请填入" + val + "理由,长度为200字符,请不要输入全空格"
          //   }
          // )
          // .then(value => {
          if (val === '通过') {
            let newArry = [];
            for (let key in _this.NoticeDate) {
              let temp = {};
              temp.ownId = _this.NoticeDate[key].recommendId;
              if (_this.NoticeDate[key].adhesionNumberResult === '') {
                temp.adhesionNumberResult = _this.NoticeDate[key].applyAdjoinNumber;
              } else {
                temp.adhesionNumberResult = _this.NoticeDate[key].adhesionNumberResult;
              }
              temp.examineStatus = "1";
              //temp.examineOpinion = value.value;
              temp.examineUserId = this.$store.getters.userInfo.userId;
              temp.examineUserCn = this.$store.getters.userInfo.userName;
              newArry.push(temp);
            }
            // if (this.)
            _this.getCoceralAdhesion(newArry).then((res) => {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              _this.getData();
            });
          } else if (val === '不通过') {
            let newArry = [];
            for (let key in this.NoticeDate) {
              let temp = {};
              temp.ownId = this.NoticeDate[key].recommendId;
              if (_this.NoticeDate[key].adhesionNumberResult === '') {
                temp.adhesionNumberResult = _this.NoticeDate[key].applyAdjoinNumber;
              } else {
                temp.adhesionNumberResult = _this.NoticeDate[key].adhesionNumberResult;
              }
              temp.examineStatus = "2";
              //temp.examineOpinion = value.value;
              temp.examineUserId = this.$store.getters.userInfo.userId;
              temp.examineUserCn = this.$store.getters.userInfo.userName;
              newArry.push(temp);
            }
            _this.getCoceralAdhesion(newArry).then((res) => {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              _this.getData();
            });
          }
          // }).catch(() => {
          //   this.$message({
          //     type: 'info',
          //     message: '已取消删除'
          //   });
          // });
        }
      } else {
        this.$message.error("请选择要审核的企业!");
      }
    },
    // 表格操作按钮
    customsEvent(scope, operateItem, operate) {
      if (scope.row.brandAdhesionResult === '1' || scope.row.brandAdhesionResult === '2') {
        this.$message.error("该企业已审核,请选择未审核的企业!");
      } else if (scope.row.exhibitionAreaCode === 'MA02' && (Number(scope.row.adhesionNumberResult) > Number(scope.row.recommendUnified))) {
        this.$message.warning('“商协会审核粘连数”不得大于“统一布展推荐数”，请重新输入');
      } else if (scope.row.exhibitionAreaCode !== 'MA02' && (Number(scope.row.adhesionNumberResult) > Number(scope.row.recommendSpecial))) {
        this.$message.warning('“商协会审核粘连数”不得大于“特装推荐数”，请重新输入');
      } else {
        //this.$prompt(
        // "此操作商协会将审核" + operate.label + "并填入" + operate.label + "理由, 是否继续?",
        // "提示",
        //   {
        //     confirmButtonText: "确定",
        //     cancelButtonText: "取消",
        //     inputPattern: /^(?!(\s+$)).{1,200}$/,
        //     inputErrorMessage: "请填入" + operate.label + "理由,长度为200字符,请不要输入全空格"
        //   }
      // )
      //   .then(value => {
        let reg = /^(\d{1,8}|\d{1,8}\.\d{0,1}|\s*)$/;
        let newresult = scope.row.adhesionNumberResult;
        if (reg.test(newresult)) {
          let newArry = [];
          let temp = {};
          temp.ownId = scope.row.recommendId;
          if (scope.row.adhesionNumberResult === '') {
            temp.adhesionNumberResult = scope.row.applyAdjoinNumber;
          } else {
            temp.adhesionNumberResult = scope.row.adhesionNumberResult;
          }
          //temp.examineOpinion = value.value;
          temp.examineUserId = this.$store.getters.userInfo.userId;
          temp.examineUserCn = this.$store.getters.userInfo.userName;
          if (operateItem === 'pass') {
            temp.examineStatus = "1";
            newArry.push(temp);
            this.getCoceralAdhesion(newArry).then((res) => {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.getData();
            });
          } else if (operateItem === 'nopass') {
            temp.examineStatus = "2";
            newArry.push(temp);
            this.getCoceralAdhesion(newArry).then((res) => {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.getData();
            });
          }
        }
        //  else {
        //   this.$message.error("请填入正确商协会审核粘连数,长度为8位数,不要超过1位小数, 或者不填");
        // }
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });
        // });
      }
      //建议更换按钮审核---品牌粘连审核---粘连数量审核
      // let temp = {};
      // temp.ownId = scope.row.demandRecordId;
      // temp.examineUserId = this.$store.getters.userInfo.userId;
      // temp.examineUserCn = this.$store.getters.userInfo.userName;
      // if (operate.prop === "pass") {
      //   temp.examineOpinion = operate.label;
      //   temp.examineStatus = "1";
      //   if (operateItem.label === "品牌粘连操作") {
      //     this.getCoceralBrandAdhesionCheck(temp).then(res => {
      //       this.$message({
      //         type: "success",
      //         message: "操作成功!"
      //       });
      //       this.getData();
      //     });
      //   } else if (operateItem.label === "粘连数量审核操作") {
      //     this.getCoceralBrandAdhesionNumberCheck(temp).then(res => {
      //       this.$message({
      //         type: "success",
      //         message: "操作成功!"
      //       });
      //       this.getData();
      //     });
      //   } else if (operateItem.label === "建议更换操作") {
      //     this.getSuggestChange(temp).then(res => {
      //       this.$message({
      //         type: "success",
      //         message: "操作成功!"
      //       });
      //       this.getData();
      //     });
      //   }
      // } else if (operate.prop === "nopass") {
      //   this.$prompt(
      //     "此操作" + operateItem.label + operate.label + "并填入不通过理由, 是否继续?",
      //     "提示",
      //     {
      //       confirmButtonText: "确定",
      //       cancelButtonText: "取消",
      //       inputPattern: /^(?!(\s+$)).{1,200}$/,
      //       inputErrorMessage: "请填入不通过理由,长度为200字符,请不要输入全空格"
      //     }
      //   )
      //     .then(value => {
      //       temp.examineOpinion = value.value;
      //       temp.examineStatus = "2";
      //       if (operateItem.label === "品牌粘连操作") {
      //         this.getCoceralBrandAdhesionCheck(temp).then(res => {
      //           this.$message({
      //             type: "success",
      //             message: "操作成功!"
      //           });
      //           this.getData();
      //         });
      //       } else if (operateItem.label === "粘连数量审核操作") {
      //         this.getCoceralBrandAdhesionNumberCheck(temp).then(res => {
      //           this.$message({
      //             type: "success",
      //             message: "操作成功!"
      //           });
      //           this.getData();
      //         });
      //       } else if (operateItem.label === "建议更换操作") {
      //         this.getSuggestChange(temp).then(res => {
      //           this.$message({
      //             type: "success",
      //             message: "操作成功!"
      //           });
      //           this.getData();
      //         });
      //       }
      //     })
      //     .catch(() => {
      //       this.$message({
      //         type: "info",
      //         message: "已取消审核"
      //       });
      //     });
      // }
    },
    // 下载
    handleDownload() {
      let url = `coceralId=${this.$store.getters.userInfo.org.deptId}&companyName=${this.searchParams.companyName}&exhibitionAreaCode=${this.searchParams.exhibitionAreaCode}&delegationId=${this.searchParams.delegationId}&isCoceralVip=${this.searchParams.isCoceralVip}&companyCecfCode=${this.searchParams.companyCecfCode}&exhibitionType=${this.searchParams.exhibitionType}`;
      url = url.replace(/undefined/g, '');
      window.open(`${process.env.API_NA_URL}/api/ordinaryArrange/getOrdinaryArrangement/download?${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.size = val;
      this.getData();
    },
    // 修改当前页信息
    handleCurrentChange(val) {
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.current = val;
      this.getData();
    },
    // 模糊查询
    // 模糊查询
    selectParams() {
      // let _this = this;
      this.searchParams.current = 1;
      this.searchParams.size = 10;
      this.pageInfo.pageSize = 10;
      let reg = new RegExp("^[A-Za-z0-9]+$");
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (formVal.prop === "delegation" && formVal.type === "select") {
          if (formVal.value !== '' && formVal.value != null) {
            this.searchParams.delegationId = formVal.value;
            // for (let key in this.searchParamsForm.dictionary.delegation) {
            //   if (
            //     this.searchParamsForm.dictionary.delegation[key].value === this.searchParams.delegationId
            //   ) {
            //     this.searchParams.delegationName = this.searchParamsForm.dictionary.delegation[key].label;
            //   }
            // }
          } else {
            this.searchParams.delegationId = '';
            //this.searchParams.delegationName = '';
          }
        }
        if (formVal.prop === "exhibitionArea" && formVal.type === "select") {
          if (formVal.value !== '' && formVal.value != null) {
            this.searchParams.exhibitionArea = formVal.value;
            // for (let key in this.searchParamsForm.dictionary.exhibitionArea) {
            //   if (
            //     this.searchParamsForm.dictionary.exhibitionArea[key].value === this.searchParams.exhibitionArea
            //   ) {
            //     this.searchParams.exhibitionAreaName = this.searchParamsForm.dictionary.exhibitionArea[
            //       key
            //     ].label;
            //   }
            // }
          } else {
            this.searchParams.exhibitionArea = '';
            //this.searchParams.exhibitionAreaName = '';
          }
        }
        if (formVal.prop === "exhibitionType" && formVal.type === "select") {
          this.searchParams.exhibitionType = formVal.value;
        }
        if (formVal.prop === "coceral" && formVal.type === "select") {
          this.searchParams.coceralId = formVal.value;
        }
        if (formVal.prop === "city" && formVal.type === "select") {
          this.searchParams.city = formVal.value;
        }
        if (formVal.prop === "exhibitionPeriod" && formVal.type === "select") {
          this.searchParams.exhibitionPeriod = formVal.value;
        }
        if (formVal.prop === "companyName" && formVal.type === "input") {
          this.searchParams.companyName = formVal.value;
        }
        if (formVal.prop === "isCoceralVip" && formVal.type === "select") {
          this.searchParams.isCoceralVip = formVal.value;
        }
        if (formVal.prop === "isBrandCompany" && formVal.type === "select") {
          this.searchParams.isBrandCompany = formVal.value;
        }
        if (formVal.prop === "schedulePlan" && formVal.type === "select") {
          this.searchParams.schedulePlan = formVal.value;
        }
        if (formVal.prop === "companyCecfCode" && formVal.type === "input") {
          if (!reg.test(formVal.value.trim()) && formVal.value !== "") {
            this.$message.error("广交会编码请输入数字或字母");
            formVal.value = "";
            this.searchParams.companyCecfCode = formVal.value;
          } else {
            this.searchParams.companyCecfCode = formVal.value;
          }
        }
      });
      let obj = {
        current: 1,
        size: 10,
        coceralId: this.$store.getters.userInfo.org.deptId
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
        reg.test(this.searchParams.companyCecfCode) || this.searchParams.companyCecfCode === ""
      ) {
        this.getData();
      }
    }
  }
};
</script>
