/*
* @file 管理人员信息-人证管理-我的证件
* @author: weiwei
* @date:2019/5/18
*/
<template>
  <div class="page-container">
    <el-tabs v-model="pageActiveName">
      <el-tab-pane label="我的证件" name="two">
        <el-table :data="tableTopData">
          <el-table-column v-for='(item, index) in tableTopHead' :key="index"
            :prop="item.prop" :label="item.label" align="center"></el-table-column>
        </el-table>
        <el-row type="flex" justify="end" class="pagination-contain">
          <el-pagination
            @size-change="handleSizeChangeTop"
            @current-change="handleCurrentChangeTop"
            :current-page='ruleTop.cuurent'
            :page-sizes="[10, 20, 30, 40]"
            :page-size="ruleTop.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalTop">
          </el-pagination>
        </el-row>
        
        <!-- bottomForm -->
        
        <el-form :inline="true" :model="ruleForm" style="margin-top: 20px">
          <el-form-item label="届数">
            <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择" @change="changeRuleForm">
              <el-option v-for="(item, index) in exhibitionNum" :key="index"
                :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="期数">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择" @change="changeRuleForm">
              <el-option label="1" :value="1"></el-option>
              <el-option label="3" :value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="证件类型" >
            <el-select  placeholder="请选择" v-model="ruleForm.idType" clearable @change="changeRuleForm">
              <el-option  v-for="item in personCardTypeArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="审核状态">
            <el-select  placeholder="请选择" v-model="ruleForm.ApproveState" clearable @change="changeRuleForm">
              <el-option  v-for="item in reApproveArray" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="制证状态">
            <el-select  placeholder="请选择" v-model="ruleForm.accreditation" clearable @change="changeRuleForm">
              <el-option  v-for="item in accreditationState" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <div class="bm bm-pe">
              <el-button type="primary" @click="changeRuleForm" size="mini">查询</el-button>
              <el-button type="primary" size="mini" @click="addflag=true">新增</el-button>
            </div>
          </el-row>
        </el-form>

        <badeg-apply-plan :searchObj="ruleForm"></badeg-apply-plan>
        <!-- <el-table :data="tableBtmData">
          <el-table-column v-for='(item, index) in tableBtmHead' :key="index"
            :prop="item.prop" :label="item.label" align="center"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="getPapersDetail(scope.row.applyId)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" class="pagination-contain">
          <el-pagination
            @size-change="handleSizeChangeBottom"
            @current-change="handleCurrentChangeBottom"
            :current-page='ruleForm.cuurent'
            :page-sizes="[10, 20, 30, 40]"
            :page-size="ruleForm.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalBottom">
          </el-pagination>
        </el-row> -->

      <!-- 人员的选择 -->
      <el-dialog
        title="选择人员"
        :visible.sync="dialogVisible"
        width="80%"
        :show-close="false">
        <el-table ref="peopleTable" :data="managePeopleInfoData.records" @select="selectCurrent">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="peopleType" label="人员类型" align="center" :formatter="handleMethods"></el-table-column>
        </el-table>
        <el-row type="flex" justify="end" class="pagination-contain">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page = pageInfoData.currentPage
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageInfoData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="managePeopleInfoData.total">
          </el-pagination>
        </el-row>
      </el-dialog>
      
      <!-- 新增dialog -->
      <el-dialog
        @close="peopleObj={}"
        title="新增证件"
        width="80%"
        :visible.sync="addflag"
        :show-close="false">
        <add-papers @show-people="showPeople" :peopleObj="peopleObj" @cancel-dialog="cancelDialog"
          @affirm-form="affirmForm"></add-papers>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="addflag = false">取 消</el-button>
          <el-button type="danger">保  存</el-button>
        </span> -->
      </el-dialog>
      
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import addPapers from "./components/addPapersPeople";
import badegApplyPlan from "./badgeApplyPlan";
export default {
  components: {
    "add-papers": addPapers,
    "badeg-apply-plan": badegApplyPlan
  },
  data() {
    return {
      personCardTypeArr: [],
      reApproveArray: [],
      //人员的选择
      dialogVisible: false,
      pageInfoData: { currentPage: 1, pageSize: 10 },
      ifoPeopleTypeArr: [],
      queryForm: {
        name: '',
        peopleType: '',
        reviewStatusOne: '',
        reviewStatusTwo: ''
      },
      addflag: false,
      pageActiveName: 'two',
      // top的表格
      ruleTop: {
        current: 1,
        size: 10
      },
      totalTop: 0,
      tableTopHead: [
        {
          prop: "badgeTypeName",
          label: "证件类型"
        },
        {
          prop: "exhibitionPeriod",
          label: "期数"
        },
        {
          prop: "combination",
          label: "总额度"
        },
        {
          prop: "applyCombination",
          label: "已申请额度"
        },
        {
          prop: "residueCombination",
          label: "剩余额度"
        }
      ],
      tableTopData: [
        {
          type: "参展类型",
          exhibitionNum: "全期",
          combination: "总额度",
          applyCombination: "已申请额度",
          residueCombination: "3"
        }
      ],
      //bottom表格
      accreditationState: [
        {
          label: "已制证",
          value: "y"
        },
        {
          label: "未制证",
          value: "p"
        }
      ],
      ruleForm: {
        exhibitionNum: "",
        exhibitionSession: 1,
        idType: "",
        ApproveState: "",
        accreditation: ""
      },
      peopleObj: {}
    };
  },
  computed: {
    ...mapGetters('certificateManage', ['managePeopleInfoData']),
    ...mapGetters('commonStore', ['exhibitionNum', "currentExhibition"]),
    params() {
      let paramsData = {
        "customQueryParams": [
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "org_type",
            "values": [
              "0"
            ]
          }
        ],
        "orderModelField": [
          {
            "asc": false,
            "orderByField": "create_date"
          }
        ],
        "pageIndex": this.pageInfoData.currentPage,
        "pageSize": this.pageInfoData.pageSize
      };
      if (this.queryForm.name) {
        paramsData.customQueryParams.push({
          "findType": "LIKE",
          "joinType": "And",
          "name": "name",
          "values": [
            this.queryForm.name
          ]
        });
      }
      if (this.queryForm.peopleType) {
        paramsData.customQueryParams.push({
          "findType": "EQ",
          "joinType": "And",
          "name": "people_type",
          "values": [
            this.queryForm.peopleType
          ]
        });
      }
      if (this.queryForm.reviewStatusOne) {
        paramsData.customQueryParams.push({
          "findType": "EQ",
          "joinType": "And",
          "name": "review_status_one",
          "values": [
            this.queryForm.reviewStatusOne
          ]
        });
      }
      if (this.queryForm.reviewStatusTwo) {
        paramsData.customQueryParams.push({
          "findType": "EQ",
          "joinType": "And",
          "name": "review_status_two",
          "values": [
            this.queryForm.reviewStatusTwo
          ]
        });
      }
      return paramsData;
    }
  },
  methods: {
    ...mapActions("commonStore", ["getExhibitionNum"]),
    ...mapActions("certificateManage", [
      "getStatisticsTable",
      "getManagePeopleInfoList",
      "addPersonalPapers",
      "getPeoplePapersDetail"
    ]),
    changeRuleForm() {
      this.ruleForm = Object.assign({}, this.ruleForm);
    },
    //重置搜索条件
    resetFuleForm() {
      this.ruleForm = {
        current: 1,
        size: 10,
        exhibitionNum: "",
        exhibitionSession: 1,
        idType: "",
        ApproveState: "",
        accreditation: "",
        orderByField: "create_date",
        isAsc: false
      };
    },
    cancelDialog(param) {
      this.addflag = param;
    },
    affirmForm(param) {
      // console.log("queren", param);

      this.addPersonalPapers(param).then(res => {
        console.log(res);
        
        this.$message({
          type: "success",
          message: "申请成功"
        });
        this.addflag = false;
        this.resetFuleForm();
        this.ruleForm = Object.assign({}, this.ruleForm);
        // this.getTableDataBottom(this.ruleForm);
      });
    },
    handleMethods(row, column, cellValue, index) {
      for (let i = 0; i < this.ifoPeopleTypeArr.length; i++) {
        const ele = this.ifoPeopleTypeArr[i];
        if (ele.value === cellValue) {
          return ele.label;
        }
      }
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getManagePeopleInfoList(this.params);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getManagePeopleInfoList(this.params);
    },
    selectCurrent(selection, row) {
      this.peopleObj = Object.assign({}, row);
      // console.log(this.peopleObj);
      this.dialogVisible = false;
      this.$refs["peopleTable"].clearSelection();
    },
    showPeople(param) {
      this.dialogVisible = param;
      let str = JSON.stringify(this.peopleObj);
      if (str !== "{}") {
        for (let item of this.managePeopleInfoData.records) {
          if (item.ifoPersonId === this.peopleObj.ifoPersonId) {
            this.$refs["peopleTable"].toggleRowSelection(item, true);
          }
        }
      }
    },
    //获取top列表
    getTableTop(param) {
      this.getStatisticsTable(param).then(res => {
        // console.log(res);
        
      });
    },
    handleSizeChangeTop(param) {
      this.ruleTop.size = param;
      this.getTableTop(this.ruleTop);
    },
    handleCurrentChangeTop(param) {
      this.ruleTop.current = param;
      this.getTableTop(this.ruleTop);
    }
    //bottom表格

  },
  async created() {
    this.getTableTop(this.ruleTop);
    // this.getTableDataBottom(this.ruleForm);

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

    this.personCardTypeArr = await kindo.dictionary.get('ifoPersonCardType');
    this.ifoPeopleTypeArr = await kindo.dictionary.get('ifoPeopleType');
    this.reApproveArray = await kindo.dictionary.get('ifoCommonApproveStatus');

    //获取人员列表
    await this.getManagePeopleInfoList(this.params);
  }
};
</script>
<style lang='less' scoped>
@import "../../../theme/project/css/flex.less";
</style>
