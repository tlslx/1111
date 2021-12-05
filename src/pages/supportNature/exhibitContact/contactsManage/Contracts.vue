/**
 * @components 第三方联系人组件
 * @date:2019/5/8
*/
<template>
  <div>
    <el-tabs v-model="activeName">
    <el-tab-pane label="第三方单位联系人" name="first">
      <el-form :inline="true" :model="queryFormInline" ref="queryFormInline" class="query-form-inline">
        <el-form-item label="单位名称" prop="thirdPartyName">
          <el-input placeholder="请输入" v-model="queryFormInline.thirdPartyName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="table-contain">
      <span>第三方单位</span>
      <!-- style="width: 100%" max-height="400" v-loading="hasloading" -->
      <el-row class="above-table">
        <el-col :span="6">
          右侧工作可以联系本交易团委托的第三方单位（请在对应项打“√”或填写相关内容）：
        </el-col>
        <el-col :span="18">
          <el-row><el-checkbox v-model="filingSchedule" @change="handleCheckChange">备案系统展位信息录入进度；</el-checkbox></el-row>
          <el-row><el-checkbox v-model="corporateInformationSchedule" @change="handleCheckChange">企业重要信息修改进度；</el-checkbox></el-row>
          <el-row><el-checkbox v-model="meetingAnnouncement" @change="handleCheckChange">会议通知；</el-checkbox></el-row>
          <el-row>
            <el-col :span="6"><el-checkbox v-model="checkOthers">其他（请填写）：</el-checkbox></el-col>
            <el-col :span="18"><el-input :disabled="!this.checkOthers" v-model="inputValue" @change="handleCheckChange"></el-input></el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-table border :data="contractListData.records">
        <el-table-column prop="thirdPartyName" label="单位全称"></el-table-column>
        <el-table-column prop="thirdPartyContact" label="姓名"></el-table-column>
        <el-table-column prop="thirdPartyPosition" label="职务"></el-table-column>
        <el-table-column prop="thirdPartyTelephonNumber" label="固定电话">
          <el-table-column prop="thirdPartyTelephonNumberA" label="区号"></el-table-column>
          <el-table-column prop="thirdPartyTelephonNumberB" label="号码"></el-table-column>
        </el-table-column>
        <el-table-column prop="thirdPartyCellphoneNumber" label="手机"></el-table-column>
        <el-table-column prop="thirdPartyQq" label="QQ(选填)"></el-table-column>
        <el-table-column prop="thirdPartyWeichat" label="微信号（选填）"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleMod(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-button class="newAddBtn" type="primary" @click="handleRouterPushNew">新增联系人</el-button>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="contractListData.total">
        </el-pagination>
      </el-row>
      </div>
    </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Contracts",
  data() {
    return {
      activeName: 'first',
      queryFormInline: { thirdPartyName: '' },
      pageInfoData: {
        currentPage: 1,
        pageSize: 10
      },
      checkObj: {}, // 原来就拿到的对象
      filingSchedule: false,
      corporateInformationSchedule: false,
      meetingAnnouncement: false,
      inputValue: '',
      checkOthers: false, // 第四个选项
      otherInputDisabled: true
    };
  },
  computed: {
    ...mapGetters('exhibitContact', ['contractListData']),
    queryParams() {
      return {
        thirdPartyName: this.queryFormInline.thirdPartyName,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    },
    workUpdateParams() {
      let checkObjParams = this.checkObj;
      if (this.corporateInformationSchedule) {
        checkObjParams.corporateInformationSchedule = 1;
      } else {
        checkObjParams.corporateInformationSchedule = 0;
      }
      if (this.filingSchedule) {
        checkObjParams.filingSchedule = 1;
      } else {
        checkObjParams.filingSchedule = 0;
      }
      if (this.meetingAnnouncement) {
        checkObjParams.meetingAnnouncement = 1;
      } else {
        checkObjParams.meetingAnnouncement = 0;
      }
      if (this.inputValue) {
        checkObjParams.others = this.inputValue;
      }
      return checkObjParams;
    }
  },
  created() {
    this.getContractsList(this.queryParams);
    this.getWork();
  },
  methods: {
    ...mapActions('exhibitContact', ['getContractsList', 'getThirdPartyWork', 'postUpdateThirdPartyWork']),
    getWork() {
      this.getThirdPartyWork().then(res => {
        this.checkObj = res;
        for (const key in res) {
          if (key === 'corporateInformationSchedule') {
            if (res[key] === 1) {
              this.corporateInformationSchedule = true;
            }
          }
          if (key === 'filingSchedule') {
            if (res[key] === 1) {
              this.filingSchedule = true;
            }
          }
          if (key === 'meetingAnnouncement') {
            if (res[key] === 1) {
              this.meetingAnnouncement = true;
            }
          }
          if (key === 'others') {
            if (res[key] != null && res[key].length > 0) {
              this.checkOthers = true;
              this.inputValue = res[key];
            }
          }
        }
      });
    },
    handleQuery() {
      this.getContractsList(this.queryParams); // 查询表单
    },
    // 修改
    handleMod(row) {
      this.$router.push({ path: '/editContracts', query: { row }});
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getContractsList(this.queryParams); // 查询表单
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getContractsList(this.queryParams); // 查询表单
    },
    handleRouterPushNew() {
      this.$router.push({ path: '/addContracts' });
    },
    handleCheckChange() { // 选项改变
      this.postUpdateThirdPartyWork(this.workUpdateParams).then(() => {
        this.getWork(); // 刷新一下选框
      });
    }
  }
};
</script>
<style lang='less' scoped>
.table-contain {
  .above-table {
    >.el-col {
      border: 1px solid #EBEEF5;
      padding: 15px 20px;
      height: calc(100% - 30px);
    }
  }
  .pagination-contain {
    position: relative;
    padding: 10px 0;
    .newAddBtn {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
}
</style>
