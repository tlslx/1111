<style scoped>

</style>

<template>
  <div>
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
      <!-- <el-form-item label="届数">
        <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择" @change="changeRuleForm">
          <el-option v-for="(item, index) in exhibitionNum" :key="index"
            :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item> -->

      <!-- <el-form-item label="期数">
        <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择" @change="changeRuleForm">
          <el-option label="1" :value="1"></el-option>
          <el-option label="3" :value="3"></el-option>
        </el-select>
      </el-form-item> -->

      <!-- <el-form-item label="证件类型" >
        <el-select  placeholder="请选择" v-model="ruleForm.idType" clearable @change="changeRuleForm">
          <el-option  v-for="item in personCardTypeArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="姓名">
        <el-input type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="企业名称">
        <el-input type="text" v-model="ruleForm.companyName"></el-input>
      </el-form-item>

      <el-form-item label="审核状态">
        <el-select  placeholder="请选择" v-model="ruleForm.ApproveState" clearable >
          <el-option  v-for="item in reApproveArray" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="制证状态">
        <el-select  placeholder="请选择" v-model="ruleForm.accreditation" clearable>
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

    <el-table ref="peopleTable" :data="tableData" >
      <el-table-column v-for="(item, index) in tableHead" :key="index" 
        :prop="item.prop" :label="item.label" align="center" :formatter="formatterRow">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" >查看详情</el-button>
          <el-button type="text" >撤回</el-button>
          <el-button type="text" >丢证补办</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end" class="pagination-contain">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="ruleForm.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="ruleForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-row>

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
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import addPapers from "../../../company/components/addPapersPeople";
export default {
  components: {
    "add-papers": addPapers
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
      peopleObj: {},
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
        // exhibitionNum: "",
        // exhibitionSession: 1,
        name: "",
        companyName: "",
        idType: "",
        ApproveState: "",
        accreditation: ""
      },
      total: 0,
      tableData: [],
      tableHead: [
        {
          prop: "exhibitionSessioin",
          label: "届数"
        },
        {
          prop: "exhibitionPeriod",
          label: "期数"
        },
        {
          prop: "companyName",
          label: "企业名称"
        },
        {
          prop: "badgeTypeName",
          label: "证件类型"
        },
        {
          prop: "applyUserName",
          label: "姓名"
        },
        {
          prop: "sex",
          label: "性别"
        },
        {
          prop: "idcardFrontPhotoUrl",
          label: "个人证件照"
        },
        {
          prop: "initialStatusDesc",
          label: "初审状态"
        },
        {
          prop: "reviewStatusDesc",
          label: "复审状态"
        },
        {
          prop: "bagdeMakeStatusDesc",
          label: "制证状态"
        },
        {
          prop: "badgeNo",
          label: "证件号码"
        },
        {
          prop: "invalidDesc",
          label: "不通过原因"
        }
      ]
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
    ...mapActions("certificateManage", [
      "getManagePeopleInfoList"
    ]),
    handleSizeChangeTop(param) {
      this.ruleTop.size = param;
      // this.getTableTop(this.ruleTop);
    },
    handleCurrentChangeTop(param) {
      this.ruleTop.current = param;
      this.getTableTop(this.ruleTop);
    },
    changeRuleForm() {
      return "";
    },

    //人员的列表的方法
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

    //申请证件列表--方法
    formatterRow(row, column, cellValue, index) {
      let prop = column.property;
      let value = row[prop];
      // console.log(value);
      
      if (prop === "sex") {
        if (value === "1") {
          return "男";
        } else if (value === "0") {
          return "女";
        }
      } else if (prop === "idcardFrontPhotoUrl") {
        if (value) {
          return (
            <img src={this.API_POT_URL + '/api/ifoFile/getImg?fileId=' + value}/>
          );  
        } else {
          return "";
        }
      } else {
        return row[prop];
      }
    },
    //新增功能
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
    cancelDialog(param) {
      this.addflag = param;
    },
    affirmForm(param) {
      return param;
      // console.log("queren", param);

      // this.addPersonalPapers(param).then(res => {
      //   console.log(res);
        
      //   this.$message({
      //     type: "success",
      //     message: "申请成功"
      //   });
      //   this.addflag = false;
      //   this.resetFuleForm();
      //   this.ruleForm = Object.assign({}, this.ruleForm);
      //   // this.getTableDataBottom(this.ruleForm);
      // });
    }
  },
  async created() {
    this.personCardTypeArr = await kindo.dictionary.get('ifoPersonCardType');
    this.ifoPeopleTypeArr = await kindo.dictionary.get('ifoPeopleType');
    this.reApproveArray = await kindo.dictionary.get('ifoCommonApproveStatus');
  }
};
</script>
