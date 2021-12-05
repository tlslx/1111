<style lang="less" scoped>
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}
//弹框样式
.cont {
  text-align: center;
  margin-top: 20px;
  padding-bottom: 20px;
}
.formStyle {
  padding: 8px 30px;
}
</style>
<template>
  <el-tabs v-model="activeName" class="commendationList">
    <el-tab-pane label="交易团审核企业基本信息" name="first"></el-tab-pane>
    <el-card class="box-card">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="searchParamsForm.dictionary"
        @select-params="selectParams"
        @new-onchangeDate="newonchangeDate"
      ></search-param-link>
      <!--
      <canBeEdit-table
        :loading="loading"
        :selection="true"
        :isSelectable="handleSelectable"
        :tableTrData="reviewTrDate"
        :tableData="applicationList.records"
        @change-multiple-selection="handleSelectChange"
        @change-all-selection="handleSelectAll"
        @deal-with-operate="dealWithChangeStatusEvent"
        @cell-click="cellClick"
        @mouseEnter="mouseEnter"
      ></canBeEdit-table>
      -->
      <el-table :data="applicationList.records" ref="multipleTable" v-loading="loading" border
      @select="handleSelectionChange"
      @select-all="handleSelectionChange"
      @selection-change="handleCheckedChange"
      >
        <el-table-column :selectable="handleSelectable" type="selection" width="55"></el-table-column>
        <el-table-column label="广交会编码" align="center" prop="cecfCode"></el-table-column>
        <el-table-column label="企业名称" align="center" prop="companyName">
          <template slot-scope="scope">
            <a href="javascript:;" @click="cellClick(scope.row)">{{scope.row.companyName}}</a>
          </template>
        </el-table-column>
        <el-table-column label="申请展区" align="center" prop="exhibitionAreaName"></el-table-column>
        <el-table-column label="申请展位数量" align="center" prop="boothNumber"></el-table-column>
        <el-table-column label="城市" align="center" prop="cityName"></el-table-column>
        <el-table-column label="交易团" align="center" prop="delegationName"></el-table-column>
        <el-table-column label="分团审核情况" align="center" v-if="false" prop="subClusterCheckStatus">
          <template slot-scope="scope">
            {{ scope.row.subClusterCheckStatus }}
          </template>
        </el-table-column>
        <el-table-column label="交易团审核情况" align="center" prop="clusterCheckStatus">
          <template slot-scope="scope">
            {{ scope.row.clusterCheckStatus }}
          </template>
        </el-table-column>
      </el-table>
      <div style="line-height: 68px;">
        <el-row type="flex" justify="space-between" class="pagination-footer">
          <span class="add_btn">
            <el-button type="danger" size="medium" @click="handleSelectAll">全选</el-button>
            <el-button type="danger" size="medium" @click="handleSelectNoAll">取消选择</el-button>
            <el-button type="danger" size="medium" :disabled="checkData.checkList.length < 1" @click="handlePass">通过</el-button>
            <el-button type="danger" size="medium" :disabled="checkData.checkList.length > 1 || checkData.checkList.length < 1" @click="btnshow('不通过')">不通过</el-button>
            <el-button type="danger" size="medium" @click="handleDownload">下载</el-button>
          </span>
          <pagination
            class="pages"
            :pageInfo="pageInfo"
            @handle-size-change="handleSizeChange"
            @handle-current-change="handleCurrentChange"
          ></pagination>
        </el-row>
      </div>
      <el-dialog title="审核" :visible.sync="isShow" v-if="isShow" :close-on-click-modal="false" width="500px">
        <el-form :model="auditForm" ref="auditRef" size="small" :rules="auditRules" label-width="120px">
          <el-form-item label="不通过原因：" prop="examineOpinion">
            <el-input type="textarea" v-model="auditForm.examineOpinion" row="5"></el-input>
          </el-form-item>
          <div class="cont">
            <el-button class="formStyle" @click="npSeave('auditRef')">保存</el-button>
            <el-button class="formStyle" @click="isShow = false">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
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
      refName: 'table',
      selectAllFlag: true,
      lastCheckData: [], // 上次保存的值
      selectData: [], // 选中的数据索引
      checkData: {
        checkList: [], // 临时选中的值
        checkObj: {}
      },
      isShow: false,
      onebtnData: {
        'examineOpinion': '',
        'newdata': ''
      },
      companyId: '', //公司id
      exhibitionSession: '',
      auditRules: {
        examineOpinion: [{ required: true, message: "必填项", trigger: "blur" }]
      }, //校验规则
      btnDialogVisible: false,
      fatDate: [],
      noPassList: [], // 未通过与未审核数组
      list: [],
      auditForm: {
        examineOpinion: ''
      },
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
        {
          prop: "boothNumber",
          label: "申请展位数量",
          type: "input",
          userDefined: true
        },
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
          label: "交易团审核结果",
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
        currentPage: this.$route.query.currentPage || 1,
        //pageSize: 2,
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
          // {
          //   prop: "subClusterCheckStatus",
          //   label: "分团审核情况",
          //   value: "",
          //   width: "150px",
          //   type: "select"
          // },
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
        boothType: '02',
        roleJsonStr: []
      },
      //下载传值
      queryForm: {
        delegationId: '',
        boothType: '02',
        exhibitionSession: ''
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
        }
        //,
        //{
        //  value: 3,
        //  label: "审核中"
        //}
        //
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
      // this.searchParamsForm.dictionary.city = tempDate;
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
      'getProvinceDate',  //展区城市信息
      'postCompanyCheckPass', //审核通过
      "getQualificationaudit" // 审核 第一个审核
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea" // 展区
    ]),
    // 是否可选
    handleSelectable(row) {
      if (row.clusterCheckStatus === '通过' || row.clusterCheckStatus === '1' || row.clusterCheckStatus === '不通过') {
        return false;
      } else {
        this.companyId = row.companyId;
        this.exhibitionSession = row.exhibitionSession;
        return true;
      }
    },
    // 全选按钮
    handleSelectAll() {
      if (this.selectAllFlag) {
        this.selectAllFlag = false;
        this.$refs.multipleTable.toggleAllSelection();
      }
    },
    // 取消选择
    handleSelectNoAll() {
      this.selectAllFlag = true;
      this.$refs.multipleTable.clearSelection();
    },
    // 全选
    handleSelectionChange(selection, row) {
      this.selectData[this.pageInfo.currentPage - 1] = []; // 初始化
      this.applicationList.records.forEach((item, index) => {
        for (let i = 0; i < selection.length; i++) { // 遍历已选的数据重新填充数组
          if (item.companyId === selection[i].companyId) {
            this.selectData[this.pageInfo.currentPage - 1].push(index);
          }
        }
      });
      if (this.selectData[this.pageInfo.currentPage - 1].length === this.noPassList.length) {
        this.selectAllFlag = false;
      } else {
        this.selectAllFlag = true;
      }
    },
    // 选择
    handleCheckedChange(rows) {
      this.checkData.checkList = []; // 初始化，防止重复添加
      if (rows) {
        rows.forEach(row => { // 遍历已选择的数据
          if (row) {
            this.checkData.checkList.push({
              exhibitionSession: row.exhibitionSession,
              ownId: row.companyId,
              examineUserId: this.$store.getters.userInfo.userId,
              examineUserCn: this.$store.getters.userInfo.userName,
              examineStatus: '1',
              examineOpinion: '',
              examineOrg: row.delegationId,
              examineOrgCn: row.delegationName
            });
            this.checkData.checkObj = row;
            //console.log(row);
            //console.log(checkData);
          }
        });
      }
    },
    // 判断是否选中
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 通过
    handlePass() {
      this.lastCheckData[this.pageInfo.currentPage - 1] = this.checkData.checkList; // 保存当前页获取的值
      //降维 --- 二维数组降至一维数组
      //let getList = this.lastCheckData.flat();(兼容性有问题)
      let getList = Array.prototype.concat.apply([], this.lastCheckData);
      this.$confirm('是否将选中的信息审核通过', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postCompanyCheckPass(getList).then(() => {
          this.$message.success('操作成功');
          this.getData();
        }).catch(e => {});
      }).catch(() => {
        this.$message.info('已取消本次操作');
      });
    },
    // 第一个弹框
    btnshow(val) {
      this.onebtnData.examineOpinion = val;
      this.onebtnData.row = this.$route.query.row;
     // console.log(this.$route.query.row);
      let temp = {};
    //  temp.ownId = this.$route.query.row.companyId;
      temp.ownId = this.checkData.checkList[0].ownId;
      temp.examineOrg = this.$store.getters.userInfo.org.deptId;
      temp.examineOrgCn = this.$store.getters.userInfo.org.deptName;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      temp.roleJsonStr = this.searchParams.roleJsonStr;
      if (val === "通过") {
        temp.examineStatus = 1;
        temp.examineOpinion = '通过';
        this.$confirm('审核通过', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getQualificationaudit(temp).then(res => {
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            this.getcompanyInfo();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      } else {
        this.isShow = true;
      }
      // }
    },
    handleDownload() {
      let url = `delegationId=${this.queryForm.delegationId}&boothType=${this.queryForm.boothType}&exhibitionSession=${this.queryForm.exhibitionSession}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/ordinaryCompany/brandCompany/download?${url}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
    },
    // 第一个 审核不通过 弹框
    npSeave(datae) {
      let temp = {};
      temp.ownId = this.checkData.checkList[0].ownId;
      temp.exhibitionSession = this.exhibitionSession;
      temp.examineOrg = this.$store.getters.userInfo.org.deptId;
      temp.examineOrgCn = this.$store.getters.userInfo.org.deptName;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      temp.roleJsonStr = this.searchParams.roleJsonStr;
      temp.examineStatus = 2;
      temp.examineOpinion = this.auditForm.examineOpinion;
      this.$refs[datae].validate(vald => {
        if (vald) {
          this.getQualificationaudit(temp).then(res => {
            this.auditForm.examineOpinion = '';
            this.isShow = false;
          //  this.$message({
           //   message: "审核不通过",
           //   type: "success"
           // });
            this.$confirm('审核企业基本材料不通过，请提交相关企业退回展位申请。', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push({ path: '/companyBackBoothApply', query: { data: this.checkData.checkObj, list: this.checkData.checkObj[0] }});
            });
         //
          }).catch(e => {});
        }
      });
    },
    // 不通过
    handleNoPass() {
      this.$confirm('审核企业基本材料不通过，请提交相关企业退回展位申请。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({ path: '/companyBackBoothApply', query: { data: this.checkData.checkObj, list: this.checkData.checkObj[0] }});
      }).catch(() => {
        this.$message.info('已取消本次操作');
      });
    },
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getApplicationList(this.searchParams)
        .then(response => {
          if (response.total > 0) {
            //this.pageInfo.pageSize = 2;
            this.pageInfo.currentPage = this.$route.query.currentPage || response.current;
            this.pageInfo.total = response.total;
            this.queryForm.delegationId = response.records[0].delegationId;
            this.queryForm.exhibitionSession = response.records[0].exhibitionSession;
          } else if (response.total === 0) {
            this.pageInfo.currentPage = 1;
            this.pageInfo.total = 0;
          }
          this.noPassList = [];
          for (let i = 0, l = response.records.length; i < l; i++) {
            if (response.records[i].clusterCheckStatus !== '通过' && response.records[i].clusterCheckStatus !== '1') {
              this.noPassList.push(response.records[i]);
            }
          }
          this.checkData.checkList = [];
          this.checkData.checkObj = {};
          this.selectData = [];
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
    // //联想城市
    // newChange(val) {
    //   console.log(val, 'kkkk');
    //   this.getProvinceDate().then((res) => {
    //     console.log(res, 'res');
    //   });
    // },
    // 点击单元格获取信息.页面跳转
    cellClick(row) {
      this.$router.push({
        path: '/brandEnterprise',
        query: {
          id: row.companyId,
          row: row,
          currentPage: this.pageInfo.currentPage
        }
      });
    },
    mouseEnter(row, column, cell, event) {
      if (column.label === "企业名称") {
        let cellDiv = cell.getElementsByTagName('div')[0];
        cellDiv.style.cursor = 'pointer';
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
      this.lastCheckData[this.pageInfo.currentPage - 1] = this.checkData.checkList;
      this.pageInfo.currentPage = val;
      this.searchParams.current = val;
      this.getApplicationList(this.searchParams)
        .then(res => {
          this.loading = false;
          this.noPassList = [];
          for (let i = 0, l = res.records.length; i < l; i++) {
            if (res.records[i].clusterCheckStatus !== '通过' && res.records[i].clusterCheckStatus !== '1') {
              this.noPassList.push(res.records[i]);
            }
          }
          // 勾选上次已勾选的数据
          let arr = [];
          if (this.selectData[this.pageInfo.currentPage - 1]) {
            this.selectData[this.pageInfo.currentPage - 1].forEach((item, index) => {
              arr.push(this.applicationList.records[item]);
            });
          }
          let setTime = new Promise((resolve, reject) => {
            resolve(arr);
          });
          Promise.all([setTime]).then((results) => {
            this.toggleSelection(arr);
          });
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
            this.noPassList = [];
            for (let i = 0, l = res.records.length; i < l; i++) {
              if (res.records[i].clusterCheckStatus !== '通过' && res.records[i].clusterCheckStatus !== '1') {
                this.noPassList.push(res.records[i]);
              }
            }
            this.checkData.checkList = [];
            this.checkData.checkObj = {};
            this.selectData = [];
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
