/**
 * @file 我的工单
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="我的工单" name="first">
      <el-form :model="queryForm" :inline="true" class="search-form-inline">
        <el-form-item label="编号；">
          <el-input clearable v-model="queryForm.businessOrderNumber"></el-input>
        </el-form-item>
        <el-form-item label="类型；">
          <el-select v-model="queryForm.workType" clearable>
            <el-option label="手工工单" value="1"></el-option>
            <el-option label="投诉工单" value="2"></el-option>
            <el-option label="报障工单" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态；">
          <el-select v-model="queryForm.workStatus" clearable>
            <el-option label="等待处理" value="1"></el-option>
            <el-option label="无法完工" value="2"></el-option>
            <el-option label="已经受理" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table ref="multipleTable" border :data="listWorkOrder" v-loading="loading">
        <el-table-column label="" width="65">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="展期" prop="workOrder.numberPeriods" align="center"></el-table-column>
        <el-table-column label="工单号" prop="workOrder.workOrderNumber" align="center"></el-table-column>
        <el-table-column label="工单类型" prop="workOrder.workType" align="center"></el-table-column>
        <el-table-column label="状态" prop="workOrder.workStatus" align="center"></el-table-column>
        <el-table-column label="业务类型" prop="workOrder.businessNumber" align="center"></el-table-column>
        <el-table-column label="接单部门" prop="deptName" align="center"></el-table-column>
        <el-table-column label="接单员" prop="acceptorName" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="workOrder.createTime" align="center"></el-table-column>
        <el-table-column label="业务单号" prop="workOrder.businessOrderNumber" align="center"></el-table-column>
        <el-table-column label="展位号" prop="workOrder.positionNumber" align="center"></el-table-column>
        <el-table-column label="参展商" prop="workOrder.exhibitorName" align="center"></el-table-column>
        <el-table-column label="标题" prop="workOrder.workTitle" align="center"></el-table-column>
        <el-table-column label="展区" prop="workOrder.exhibitionArea" align="center"></el-table-column>
        <el-table-column label="展厅" prop="workOrder.exhibitionHall" align="center"></el-table-column>
        <el-table-column label="打印次数" prop="workOrder.printTwice" align="center"></el-table-column>
        <el-table-column label="下单人" prop="workOrder.createPerson" align="center"></el-table-column>
        <el-table-column label="操作" prop="operate" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteUser(scope.row)" v-if="workStatus==='待处理'">转单</el-button>
            <el-button type="text" @click="deleteUser(scope.row)" v-if="workStatus==='已经受理' & workType!='手工工单'">结果反馈</el-button>
            <el-button type="text" @click="modifyUser(scope.row)">详情</el-button>
            <el-button type="text" @click="deleteUser(scope.row)" v-if="workType==='手工工单'">结单</el-button>
            <el-button type="text" @click="modifyUser(scope.row)" v-if="workStatus==='无法完工'">退单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" layout="total, prev, pager, next, jumper" :total="listWorkOrder.total">
      </el-pagination>
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="openWork">派单</el-button>
          <el-dialog title="派单" :visible.sync="OpenCopeExhibitionReceiver">
            <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm">
              <el-form-item label="施工组：" prop="constructionGroup">
                <el-select v-model="ruleForm.constructionGroup" v-on:change="selectGroup" clearable>
                  <el-option v-for="item in constructionGroups" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="施工单位名称：" prop="constructionGroupName">
                {{ruleForm.constructionGroupName}}
              </el-form-item>
              <el-form-item label="施工人员：" prop="constructionNames">
                {{ruleForm.constructionNames}}
              </el-form-item>
              <el-form-item label="手机号：" prop="noAccountPhone">
                {{ruleForm.noAccountPhone}}
              </el-form-item>
              <el-form-item label="负责的展区：" prop="area">
                {{ruleForm.area}}
              </el-form-item>
              <el-form-item label="负责的展厅：" prop="hall">
                {{ruleForm.hall}}
              </el-form-item>
              <el-form-item class="el-form-item-btn">
                <el-button class="btn1" @click="submitForm">确认</el-button>
                <el-button class="btn2" @click="OpenCopeExhibitionReceiver = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="close">批量打印</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="handleQuery">下载</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="close">催单</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      loading: '',
      activeName: 'first',
      OpenCopeExhibitionReceiver: false,
      workTypes: [],
      workStatusOps: [],
      constructionGroups: [],
      constructionNames: [],
      areas: [],
      halls: [],
      constructionGroupId: '',
      templateRadio: "",
      queryForm: {
        businessOrderNumber: "",
        workType: "",
        workStatus: ""
      },
      ruleForm: {
        constructionGroup: "",
        constructionGroupName: "",
        constructionName: "",
        noAccountPhone: "",
        area: "",
        hall: ""
      },
      form: {
        workOrderNumber: "",
        acceptorRowId: ""
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  created() {
    let _this = this;
    this.loading = true;
    this.selectListWorkOrder(this.listWorkOrderQuery).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
    this.selectListGroup(this.constructionGroupQuery).then(response => {
      console.log(response, 'response');
      for (let i in response.records) {
        _this.constructionGroups.push({
          value: i,
          label: response.records[i].constructionGroup
        });
      }
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('OrdersReminders', ['listWorkOrder']),
    ...mapGetters('orderSetting', ['listGroupDetails']),
    ...mapGetters('orderSetting', ['listGroup']),
    ...mapGetters('dictionary', ['dictionaryData']),
    // initData() {
    //   this.form = [];
    // },
    listWorkOrderQuery() {
      return {
        businessOrderNumber: this.queryForm.businessOrderNumber,
        workType: this.queryForm.workType,
        workStatus: this.queryForm.workStatus,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    },
    constructionGroupQuery() {
      return {
        constructionGroup: "",
        constructionGroupName: "",
        area: "",
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  // async beforeCreate() {
  //   this.constructionGroups = await kindo.dictionary.get('constructionGroups'); // 类型
  //   this.issueNums = await kindo.dictionary.get('issueNums'); // 状态
  //   this.places = await kindo.dictionary.get('places'); // 展区
  // },
  methods: {
    ...mapActions('OrdersReminders', ['selectListWorkOrder', 'sendWorkOrderInfo']),
    ...mapActions('orderSetting', ['selectListGroup']),
    ...mapActions('orderSetting', ['selectListGroupDetails']),
    close() {

    },
    openWork() {
      if (this.form.workOrderNumber) {
        this.OpenCopeExhibitionReceiver = true;
      }
    },
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    createdQuery() {
      this.loading = true;
      this.selectListWorkOrder(this.listWorkOrderQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    selectGroup(val) {
      var obj = {};
      obj = this.constructionGroups.find(item => {
        return item.value === val;
      });
      let _this = this;
      this.loading = true;
      this.selectListGroup(this.constructionGroupQuery).then(response => {
        for (let i in response.records) {
          if (obj.label === response.records[i].constructionGroup) {
            let constructionGroupId = response.records[i].constructionGroupId;
            _this.selectListGroupDetails(constructionGroupId).then(response2 => {
              this.ruleForm = response2;
            }).catch(e => {
            });
          }
        }
        _this.loading = false;
      }).catch(e => {
        _this.loading = false;
      });
    },
    //获取选中数据
    getTemplateRow(index, row) {
      this.templateSelection = row;
      console.log("templateSelection", row);
      this.form.workOrderNumber = row.workOrder.workOrderNumber;
      this.form.acceptorRowId = row.workOrder.acceptorRowId;
    },
    // 派单
    submitForm() {
      let _this = this;
      this.loading = true;
      this.sendWorkOrderInfo(this.form).then(response => {
        this.closeCope;
        _this.loading = false;
      }).catch(e => {
        _this.loading = false;
      });
      this.OpenCopeExhibitionReceiver = false;
    }
  }
};
</script>
<style scoped>
.pagination-footer {
  margin-top: 20px;
}
</style>












