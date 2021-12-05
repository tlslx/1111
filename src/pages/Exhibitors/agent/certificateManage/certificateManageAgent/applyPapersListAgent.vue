<style scoped lang="less">

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
      <el-form-item label="姓名">
        <el-input type="text" v-model="ruleForm.name"></el-input>
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
      title="新增人员"
      :visible.sync="addflag"
      width="80%"
      :show-close="false">
      <el-form :model="form" label-width="114px">
        <el-row :getter="10">
          <el-col :span="12">
          <el-form-item label="证件类型">
            <el-select style="width: 90%" placeholder="请选择" v-model="form.badgeTypeCode" disabled clearable>
              <el-option  v-for="(item, index) in badgeArray" :key="index" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证明类型:" size="small">
              <el-select style="width: 90%" :value="peopleObj.idType" disabled>
                <el-option v-for="(item, index) in personCardTypeArr" :key="index"
                  :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :getter="10">
          <el-col :span="12">
            <el-form-item label="届数">
              <el-select style="width: 90%" v-model="form.exhibitionSessioin" placeholder="请选择">
                <el-option v-for="(item, index) in exhibitionNum" :key="index"
                  :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证件号码:" size="small">
              <el-input style="width: 90%" :value="peopleObj.idNo" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 带出的数据 -->
        <el-row :getter="10">
          <el-col :span="12">
          <el-form-item label="人员:" size="small">
            <el-input style="width: 90%" @focus="dialogVisible=true" :value="peopleObj.name"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效期开始时间:" size="small">
              <el-date-picker :value="peopleObj.idCardExpireStartTime" type="date" placeholder="选择日期" disabled></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :getter="10">
          <el-col :span="12">
            <el-form-item label="招展代理:" size="small">
              <el-input style="width: 90%"  :value="peopleObj.agentNameCh" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效期结束时间:" size="small">
              <el-date-picker :value="peopleObj.idCardExpireEndTime" type="date" placeholder="选择日期" disabled></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="证件照:" size="small">
            <el-upload ref="addZj"
              disabled
              :action="API_POT_URL + '/api/ifoPerson/uploadPeopleFile'" list-type="picture"
              accept=".jpg,.JPG"  :file-list="this.sfzAddFileList"
              :limit='1'>
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">提示：证件照片格式为JPG格式，且小于100kb。
                照片高宽比例为5:4，分辨率为200 * 250较好。</div>
            </el-upload>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="扫描件:" size="small">
            <el-upload ref="addSfz"
              disabled
              :action="API_POT_URL + '/api/ifoPerson/uploadPeopleFile'" list-type="picture"
              accept=".jpg,.JPG" :file-list="this.zjAddFileList"
              :limit='1'>
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">提示：身份证照片格式为JPG格式，不超过100kb。</div>
            </el-upload>
          </el-form-item>
        </el-row>
      </el-form>

      <div class="bm bm-pe" style="padding: 10px 0">
        <el-button @click="addflag=false">取 消</el-button>
        <el-button type="danger" @click="affirmForm">新  增</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      API_POT_URL: process.env.API_POT_URL,
      personCardTypeArr: [],
      badgeArray: [],
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
      ],
      //新增人员
      sfzAddFileList: [],
      zjAddFileList: [],
      form: {
        badgeTypeCode: "",
        badgeTypeName: "",
        exhibitionSessioin: "",
        // exhibitionPeriod: "",
        // effectStartDate: "",
        // effectEndDate: "",
        // 带出来的
        uesrId: "",
        idcardNo: "",
        // enterpriceName: "",
        // enterpriceNameEn: "",
        idcardTypeCode: "",
        bagePhotoUrl: "", //证件照
        idcardFrontUrl: "", //扫描件
        //默认要传，表单没有的
        sex: "",
        applyOrgName: ""
      }
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
      //展示图片
      if (this.peopleObj.idScan) {
        this.sfzAddFileList = [
        { name: '证件照', url: this.peopleObj.idScan ? process.env.API_POT_URL + '/api/ifoFile/getImg?fileId=' + this.peopleObj.idScan : '' }];  
      } else {
        this.sfzAddFileList = [];
      }
      if (this.peopleObj.cardPic) {
        this.zjAddFileList = [
        { name: '扫描件', url: this.peopleObj.cardPic ? process.env.API_POT_URL + '/api/ifoFile/getImg?fileId=' + this.peopleObj.cardPic : '' }];  
      } else {
        this.zjAddFileList = [];
      }
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
    affirmForm() {
      //处理数据
      // let {
      //   // agentNameCh,
      //   name,
      //   sex,
      //   cardPic,
      //   companyNameCh,
      //   companyNameEn,
      //   // idCardExpireEndTime,
      //   // idCardExpireStartTime,
      //   idNo,
      //   idScan,
      //   idType,
      //   ifoPersonId
      // } = this.peopleObj;

      // this.form.uesrId = ifoPersonId || "";
      // this.form.idcardNo = idNo || "";
      // this.form.enterpriceName = companyNameCh || "";
      // this.form.enterpriceNameEn = companyNameEn || "";
      // this.form.bagePhotoUrl = idScan || "";
      // this.form.idcardFrontUrl = cardPic || "";
      // this.form.idcardTypeCode = idType || "";
      // this.form.sex = sex || "";
      // this.form.applyOrgName = "nihao";
      // this.form.applyUserName = name || "";
      
      console.log("新增~~~~");
      
    }
  },
  async created() {
    this.personCardTypeArr = await kindo.dictionary.get('ifoPersonCardType');
    this.badgeArray = await kindo.dictionary.get('badgeType');
    this.ifoPeopleTypeArr = await kindo.dictionary.get('ifoPeopleType');
    this.reApproveArray = await kindo.dictionary.get('ifoCommonApproveStatus');
  }
};
</script>
