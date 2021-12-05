<style lang="less">
  @import "../../../../../theme/project/css/flex.less";
  #company-reservation {
    //修改表格的每项单元格的宽度
    .el-table__body, .el-table__footer, .el-table__header {
      table-layout: auto;
      // min-width: 3500px;
    }
  }
</style>

<template>
  <div id="company-reservation">
    <el-tabs v-model="activeName">
      <el-tab-pane label="审核企业申请" name="index">
        <!-- 搜索条件 -->
        <el-form :inline="true" :model="ruleForm" class="demo-ruleForm" :rules="searchRules" label-width="110px">
          <el-form-item label="届数" size="mini" placeholder="请选择">
            <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择" @change="exhibitionNumChange">
              <el-option v-for="(item, index) in exhibitionNum" :key="index"
                :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期数" size="mini" placeholder="请选择" @change="periodCodeChange">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option v-for="(item, index) in exhibitionSessionArray" :key="index"
                :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="大会复审情况" size="mini" placeholder="请选择">
            <el-select v-model="ruleForm.reApprove" placeholder="请选择">
              <el-option v-for="item in reApproveArray" :key="item.value"
              :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请展区" size="mini" placeholder="请选择">
            <el-select v-model="ruleForm.exhibitionAreaCode" placeholder="请选择">
              <el-option v-for="item in specialAreaArray" :key="item.label"
                :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业英文名称:" size="mini" placeholder="请选择" prop="enNames">
            <el-input v-model="ruleForm.companyNameEn" clearable></el-input>
          </el-form-item>
        </el-form>
        <div class="bm bm-pe">
          <el-button type="primary" @click="getTableList(ruleForm)">查询</el-button>
        </div>
        <!-- 表格 -->
        <div class="bm bm-pc bm-ver">
          <el-table
            :data="tableData">
            <el-table-column
              type="selection"
              width="55"
              align="center">
            </el-table-column>
            <el-table-column v-for="item in tableHead" :key="item.prop"
              :formatter="formatterRow"
              :label="item.label"
              :prop="item.prop"
              align="center"
              width="150">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="150">
              <template slot-scope="scope">
                <div class="bm bm-pc">
                  <el-button @click="checkThis(scope.row)" type="text" size="small">查看</el-button>
                  <!-- <el-button @click="chcekThis(scope.row.gjhId)" type="text" size="small">审核</el-button> -->
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="bm bm-pj" style="margin-top: 10px">
            <!-- <el-button type="primary" size="small">批量审核</el-button> -->
            <div class="block bm bm-ac" style="float:right; margin-top:10px;" >
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="ruleForm.current"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="ruleForm.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    // 校验函数
    let checkLength = (rule, value, callback) => {
      let errors = [];
      if (value.length > rule.length) {
        errors.push(new Error("长度超过限制" + rule.length));
      }
      callback(errors);
    };
    return {
      specialAreaArray: [],
      arrSpecialAreas: [], //专区
      activeName: "index",
      reApproveArray: [],
      reasonArray: [],
      exhibitionSessionArray: [
        {
          label: "1",
          value: 1
        },
        {
          label: "3",
          value: 3
        }
      ],
      ruleForm: {
        companyNameEn: "",
        reApprove: "",
        exhibitionAreaCode: "",
        exhibitionNum: "",
        exhibitionSession: 1,
        current: 1,
        size: 10,
        isAsc: false,
        orderByField: "apply.create_date"
      },
      // 验证信息验证
      searchRules: {
        enNames: [
          { message: "企业英文名称不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z0-9]*[a-zA-Z0-9]+$/;
              if (!regRule.test(value) && value !== "") {
                errors.push(new Error("请输入字母、数字、括号、字符间支持一个空格"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
          { length: "50", validator: checkLength }
        ]
      },
      currentPage: 1,
      total: 1,
      // 表头
      tableHead: [
        {
          label: "届数",
          prop: "exhibitionNum"
        },
        {
          label: "期数",
          prop: "exhibitionSession"
        },
        {
          label: "企业英文名称",
          prop: "companyNameEn"
        },
        {
          label: "广交会编码",
          prop: "cantoncode"
        },
        {
          label: "国别地区",
          prop: "crChName"
        },
        {
          label: "申请展区",
          prop: "exhibitionAreaCode"
        },
        {
          label: "专区",
          prop: "exhibitionRegionId"
        },
        {
          label: "展位类型",
          prop: "layout"
        },
        {
          label: "申请个数",
          prop: "boothNum"
        },
        {
          label: "参展记录",
          prop: "boothArranges"
        },
        {
          label: "展位号",
          prop: "boothArrangeNum"
        },
        {
          label: "审核状态",
          prop: "firstApprove"
        },
        {
          label: "大会复审情况",
          prop: "reApprove"
        },
        {
          label: "原因",
          prop: "reason"
        },
        {
          label: "是否财富五百强企业或子公司(初审)",
          prop: "firstFivehundredApprove"
        },
        {
          label: "是否财富五百强企业或子公司(复审)",
          prop: "reFivehundredApprove"
        },
        {
          label: "是否参加其他国际展会(初审)",
          prop: "firstOtherExhibitorApprove"
        },
        {
          label: "是否参加其他国际展会(复审)",
          prop: "reOtherExhibitiorApprove"
        },
        {
          label: "是否vip企业",
          prop: "isVipCompany"
        }
      ],
      //企业表格数据
      tableData: []
    };
  },
  computed: {
    ...mapGetters('commonStore', ['exhibitionNum', "currentExhibition", "layoutArray"])
  },
  methods: {
    // ...mapActions("numberBooth", ["getCheckCompanyBoothList"]), // 用户列表查询
    ...mapActions("commonStore", ["getExhibitionNum", "getExhibitionPlace", "getBoothApplyType"]),
    ...mapActions("agent", ["getReserveCompanyList"]),
    formatterRow(row, column, cellValue, index) {
      // console.log("lie", row, column);
      let prop = column.property;
      let value = row[prop] ? row[prop] : "";
      let str = "";
      if (prop === "firstApprove" || prop === "reApprove") {
        for (let item of this.reApproveArray) {
          if (value === item.value) {
            str = item.label;
            break;
          }
        }
        return str;
      } else if (prop === "exhibitionAreaCode") {
        for (let item of this.specialAreaArray) {
          if (value === item.value) {
            str = item.label;
            if (this.arrSpecialAreas.length === 0) {
              this.applyExhibitionRegion(value); 
            }
            break;
          }
        }
        return str;
      } else if (prop === "exhibitionRegionId") {
        if (this.arrSpecialAreas.length > 0) {
          for (let item of this.arrSpecialAreas) {
            if (item.value === value) {
              str = item.label;
              break;
            }
          }
          return str;
        }
      } else if (prop === "layout") {
        for (let item of this.layoutArray) {
          if (value === item.value) {
            str = item.label;
            break;
          }
        }
        return str;
      } else if (
        prop === "firstFivehundredApprove" || prop === "reFivehundredApprove"
        || prop === "firstOtherExhibitorApprove" || prop === "reOtherExhibitiorApprove"
        || prop === "isVipCompany") {
        if (value === "1") {
          return "是";
        } else {
          return "否";
        }
      } else if (prop === "boothArranges") {
        if (value && value.length > 0) {
          value.map(item => item.exhibitionNum);
        }
      } else if (prop === "reason") {
        if (value) {
          for (let item of this.reasonArray) {
            if (value === item.value) {
              return item.label;
            }
          }
        } else {
          return str;
        }
      } else {
        return value;
      }
    },
    //列表请求
    getTableList(param) {
      this.getReserveCompanyList(param).then(res => {
        // console.log(res);
        if (res && res.records && res.records.length > 0) {
          this.tableData.splice(0, this.tableData.length);
          this.total = res.total;
          for (let item of res.records) {
            this.tableData.push(item);
          }
        }
      });
    },
    //届数变化，请求展区
    exhibitionNumChange(param) {
      let obj = {
        exhibitionNum: param,
        periodCode: this.ruleForm.exhibitionSession,
        exhibitionAreaCode: ""
      };
      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          let array = [];
          for (let item of res) {
            array.push({
              label: item.exhibitionAreaNameCh,
              value: item.exhibitionAreaArrangeId
            });
          }
          if (this.specialAreaArray.length > 0) {
            this.specialAreaArray.splice(0, this.specialAreaArray.length);
          }
          this.specialAreaArray = array;
        }
      });
    },
    //期数变化,请求展区
    periodCodeChange(param) {
      let obj = {
        exhibitionNum: this.ruleForm.exhibitionNum,
        periodCode: param,
        exhibitionAreaCode: ""
      };
      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          if (res) {
            let array = [];
            for (let item of res) {
              array.push({
                label: item.exhibitionAreaNameCh,
                value: item.exhibitionAreaArrangeId
              });
            }
            if (this.specialAreaArray.length > 0) {
              this.specialAreaArray.splice(0, this.specialAreaArray.length);
            }
            this.specialAreaArray = array;
          }
        }
      });
    },
    //专区请求
    applyExhibitionRegion(param) {
      let obj = {
        exhibitionNum: this.ruleForm.exhibitionNum,
        periodCode: this.ruleForm.exhibitionSession,
        exhibitionAreaCode: param
      };
      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          let array = [];
          for (let item of res[0].exhibitionRegions) {
            array.push({
              label: item.reCh,
              value: item.exhibitionRegionId
            });
          }
          if (this.arrSpecialAreas.length > 0) {
            this.arrSpecialAreas.splice(0, this.arrSpecialAreas.length);
          }
          for (let item of array) {
            this.arrSpecialAreas.push(item);
          }
        }
      });
    },
    checkThis(param) {
      // console.log("bianji", param);
      this.$router.push({
        path: "/agent_companyBooth_msg",
        query: {
          row: JSON.stringify(param)
        }
      });
    },
    chcekThis(param) {
      console.log("shanchu", param);
    },
    // 分页 页面显示数据量切换
    handleSizeChange(param) {
      // console.log("页面显示", param);
      this.ruleForm.size = param;
      
    },
    handleCurrentChange(param) {
      // console.log("页面显示2", param);
      this.ruleForm.current = param;
    }
  },
  async created() {
    if (!this.layoutArray) {
      this.getBoothApplyType().then(res => {
        if (res) {
          let array = [];
          for (let item of res.records) {
            array.push({
              label: item.itemText,
              value: item.itemCode
            });
          }
          this.$store.commit('commonStore/LAYOUT_TYPE', array);
        }
      });
    }

    if (!this.exhibitionNum) {
      await this.getExhibitionNum().then(res => {
        if (res) {
          let array = [];
          for (let item of res) {
            array.push({
              label: item.exhibitionNum,
              value: item.exhibitionNum,
              current: item.current
            });
          }
          this.$store.commit('commonStore/EXHIBITION_NUM', array);
          for (let item of this.exhibitionNum) {
            if (item.current) {
              this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
              this.ruleForm.exhibitionNum = this.currentExhibition;
              break;
            }
          }
        }
      });
    } else if (!this.currentExhibition) {
      for (let item of this.exhibitionNum) {
        if (item.current) {
          this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
          this.ruleForm.exhibitionNum = this.currentExhibition;
          break;
        }
      }
    } else {
      this.ruleForm.exhibitionNum = this.currentExhibition;
    }
    //复审状态
    this.reApproveArray = await kindo.dictionary.get('ifoCommonApproveStatus');
    //原因
    this.reasonArray = await kindo.dictionary.get('ifoBoothApplyRefuseReason');

    this.exhibitionNumChange(this.ruleForm.exhibitionNum);
    // this.getCheckCompanyBoothList(this.ruleForm);

    //请求列表
    this.getTableList(this.ruleForm);
  }
};
</script>
