/**
 * @file 商协会驻地信息编辑
 * @author: weiwei
 * @date:2019/5/30
 */
<template>
  <!-- <div>交易团（除了分团）驻地信息查看</div> -->
  <el-tabs v-model="activeName">
    <el-tab-pane label="查看" name="first">
      <div class="title">
        <h6>说明：</h6>
        <p>1.请根据驻会期数，填报大会委员会委员任职名单（每期一人）。如个别期数无任职人员，请填写“无”。</p>
        <p>2.“行政级别”参考格式：正厅级、副厅级、正处级、副处级。</p>
        <p>3.更新秘书长以上参会人员的信息前，请先保存报送人员、驻地信息以及大会领导委员会任职名单。</p>
        <p>4.大会秘书处咨询电话：<span>020-89138109</span></p>
      </div>

      <div class="above-table">大会领导委员会委员任职名单
        <el-button type="text" class="download" @click="downLoadOne">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border :data="leaderListData.records">
        <el-table-column prop="numberParticipants" label="期数">
          <template slot-scope="scope">
            {{ scope.row.numberParticipants | qishuFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="memberName" label="姓名"></el-table-column>
        <el-table-column prop="memberPosition" label="所在单位及职务"></el-table-column>
        <el-table-column prop="memberLevel" label="行政级别"></el-table-column>
        <el-table-column prop="responsibilityNote" label="备注"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditOne(scope.row)" :disabled="scope.row.status !== 1">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain" style="padding-bottom: 10px;">
        <el-pagination
          @size-change="handleSizeChangeOne"
          @current-change="handleCurrentChangeOne"
          :current-page="pageInfoDataOne.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoDataOne.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="leaderListData.total">
        </el-pagination>
      </el-row>
      <el-dialog title="编辑" :visible.sync="oneVis" @close="closeEditOne">
        <el-form :model="oneForm">
          <el-form-item label="期数" prop="numberParticipants">
            <el-select v-model="oneForm.numberParticipants">
              <el-option v-for="item in qishuArray" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="memberName"><el-input v-model="oneForm.memberName"></el-input></el-form-item>
          <el-form-item label="所在单位及职务" prop="memberPosition"><el-input v-model="oneForm.memberPosition"></el-input></el-form-item>
          <el-form-item label="行政级别" prop="memberLevel"><el-input v-model="oneForm.memberLevel"></el-input></el-form-item>
          <el-form-item label="备注" prop="responsibilityNote"><el-input v-model="oneForm.responsibilityNote"></el-input></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitEditOne">确 定</el-button>
        </span>
      </el-dialog>

      <div class="above-table">报送人员信息
        <el-button type="text" class="download" @click="downLoadTwo">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border :data="associationListData.records">
        <el-table-column prop="reporterName" label="填报人姓名"></el-table-column>
        <el-table-column prop="informantPhone" label="手机"></el-table-column>
        <el-table-column prop="informantOfficePhone" label="办公电话"></el-table-column>
        <el-table-column prop="informantFax" label="传真"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditTwo(scope.row)" :disabled="scope.row.status !== 1">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain" style="padding-bottom: 10px;">
        <el-pagination
          @size-change="handleSizeChangeTwo"
          @current-change="handleCurrentChangeTwo"
          :current-page="pageInfoDataTwo.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoDataTwo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="associationListData.total">
        </el-pagination>
      </el-row>
      <el-dialog title="编辑" :visible.sync="twoVis" @close="closeEditTwo">
        <el-form :model="twoForm">
          <el-form-item label="填报人姓名" prop="reporterName"><el-input v-model="twoForm.reporterName"></el-input></el-form-item>
          <el-form-item label="手机" prop="informantPhone"><el-input v-model="twoForm.informantPhone"></el-input></el-form-item>
          <el-form-item label="办公电话" prop="informantOfficePhone"><el-input v-model="twoForm.informantOfficePhone"></el-input></el-form-item>
          <el-form-item label="传真" prop="informantFax"><el-input v-model="twoForm.informantFax"></el-input></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitEditTwo">确 定</el-button>
        </span>
      </el-dialog>

      <div class="above-table">驻地信息
        <el-button type="text" class="download" @click="downLoadThr">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border :data="stationListData.records">
        <el-table-column prop="station" label="驻地"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="conferenceGroupTelephone" label="会务组电话"></el-table-column>
        <el-table-column prop="peopleStationedNumber" label="入住人数"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditThr(scope.row)" :disabled="scope.row.status !== 1">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain" style="padding-bottom: 10px;">
        <el-pagination
          @size-change="handleSizeChangeThr"
          @current-change="handleCurrentChangeThr"
          :current-page="pageInfoDataThr.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoDataThr.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="stationListData.total">
        </el-pagination>
      </el-row>
      <el-dialog title="编辑" :visible.sync="thrVis" @close="closeEditThr">
        <el-form :model="thrForm">
          <el-form-item label="驻地" prop="station"><el-input v-model="thrForm.station"></el-input></el-form-item>
          <el-form-item label="地址" prop="address"><el-input v-model="thrForm.address"></el-input></el-form-item>
          <el-form-item label="会务组电话" prop="conferenceGroupTelephone"><el-input v-model="thrForm.conferenceGroupTelephone"></el-input></el-form-item>
          <el-form-item label="入住人数" prop="peopleStationedNumber"><el-input v-model="thrForm.peopleStationedNumber"></el-input></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitEditThr">确 定</el-button>
        </span>
      </el-dialog>

      <div class="above-table">商会、协会秘书长以上参会人员信息
        <el-button type="text" class="download" @click="downLoadFo">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border :data="generalListData.records">
        <el-table-column prop="participation" label="参会职务"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="participantPosition" label="所在单位及职务"></el-table-column>
        <el-table-column prop="participantAdministrativeLevel" label="行政级别"></el-table-column>
        <el-table-column prop="participantNumber" label="参会期数">
          <template slot-scope="scope">
            {{ scope.row.participantNumber | qishuFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="participantRemarks" label="备注"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditFo(scope.row)" :disabled="scope.row.status !== 1">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain" style="padding-bottom: 10px;">
        <el-pagination
          @size-change="handleSizeChangeFo"
          @current-change="handleCurrentChangeFo"
          :current-page="pageInfoDataFo.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoDataFo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="generalListData.total">
        </el-pagination>
      </el-row>
      <el-dialog title="编辑" :visible.sync="foVis" @close="closeEditFo">
        <el-form :model="foForm">
          <el-form-item label="参会职务" prop="participation"><el-input v-model="foForm.participation"></el-input></el-form-item>
          <el-form-item label="姓名" prop="name"><el-input v-model="foForm.name"></el-input></el-form-item>
          <el-form-item label="所在单位、部门及职务" prop="participantPosition"><el-input v-model="foForm.participantPosition"></el-input></el-form-item>
          <el-form-item label="行政级别" prop="participantAdministrativeLevel"><el-input v-model="foForm.participantAdministrativeLevel"></el-input></el-form-item>
          <el-form-item label="参会期数" prop="participantNumber">
            <el-select v-model="foForm.participantNumber">
              <el-option v-for="item in qishuArray" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="participantRemarks"><el-input v-model="foForm.participantRemarks"></el-input></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitEditFo">确 定</el-button>
        </span>
      </el-dialog>

      <el-row type="flex" class="bottom" justify="center">
        <h6>如需修改，请申请撤回，并于修改后重新提交，咨询可致电：<span>020-89128109</span></h6>
      </el-row>
      <el-row type="flex" class="bottom" justify="center">
        <el-button type="primary" @click="handleWithDraw" :disabled="withdrawStatus === 0">
          {{ withdrawStatus === 0 ? '撤回中' : (withdrawStatus === 1 || withdrawStatus === null ? '申请撤回' : '') }}
        </el-button>
        <!-- <el-button type="primary">保存</el-button> -->
        <el-button type="danger" @click="submitSubmitSecretary">提交大会秘书处</el-button>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: 'first',
      oneVis: false, twoVis: false, thrVis: false, foVis: false,
      qishuArray: [{ label: '一期', value: '1' }, { label: '二期', value: '2' }, { label: '三期', value: '3' }],
      oneForm: { numberParticipants: '', memberName: "", memberPosition: '', memberLevel: '', responsibilityNote: '', appointmentsId: '',
        orgId: '', exhibitionnum: '' },
      twoForm: { reporterName: '', informantPhone: '', informantOfficePhone: '', informantFax: '', reportId: '',
        orgId: '', exhibitionnum: '' },
      thrForm: { station: '', address: '', conferenceGroupTelephone: '', peopleStationedNumber: '', stationId: '',
        orgId: '', exhibitionnum: '' },
      foForm: { participation: '', name: '', participantPosition: '', participantAdministrativeLevel: '', participantNumber: '',
        participantRemarks: '', leaderId: '', orgId: '', exhibitionnum: '' },
      pageInfoDataOne: { currentPage: 1, pageSize: 10 },
      pageInfoDataTwo: { currentPage: 1, pageSize: 10 },
      pageInfoDataThr: { currentPage: 1, pageSize: 10 },
      pageInfoDataFo: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    qishuFilter: val => {
      let _val = val + '';
      switch (_val) {
        case '1':
          return '第一期';
        case '2':
          return '第二期';
        case '3':
          return '第三期';
        default:
          return '';
      }
    }
  },
  computed: {
    ...mapGetters('exhibitContact', ['leaderListData', 'associationListData', 'stationListData', 'generalListData', 'withdrawStatus']),
    paramsOne() {
      return {
        current: this.pageInfoDataOne.currentPage, size: this.pageInfoDataOne.pageSize
      };
    },
    paramsTwo() {
      return {
        current: this.pageInfoDataTwo.currentPage, size: this.pageInfoDataTwo.pageSize
      };
    },
    paramsThr() {
      return {
        current: this.pageInfoDataThr.currentPage, size: this.pageInfoDataThr.pageSize
      };
    },
    paramsFo() {
      return {
        current: this.pageInfoDataFo.currentPage, size: this.pageInfoDataFo.pageSize
      };
    }
  },
  created() {
    this.getLeadershipList(this.paramsOne); // tab1
    this.getAssociationList(this.paramsTwo); // tab2
    this.getStationList(this.paramsThr); // tab3
    this.getGeneralList(this.paramsFo); // tab4
    this.getWithdrawStatus(); // 审核状态
  },
  methods: {
    ...mapActions('exhibitContact', ['getLeadershipList', 'getAssociationList', 'getStationList', 'getGeneralList',
      'postLeadershipListEdit', 'postTradingGroupAssociationEdit', 'postTradingGroupStationEdit', 'postSecretaryGeneralEdit',
      'postWithdraw', 'postSubmitSecretary', 'getWithdrawStatus']),
    closeEditOne() { // 关闭-置空
      for (const key in this.oneForm) {
        this.oneForm[key] = '';
      }
    },
    closeEditTwo() {
      for (const key in this.twoForm) {
        this.twoForm[key] = '';
      }
    },
    closeEditThr() {
      for (const key in this.thrForm) {
        this.thrForm[key] = '';
      }
    },
    closeEditFo() {
      for (const key in this.foForm) {
        this.foForm[key] = '';
      }
    },
    submitEditOne() { // 提交编辑
      this.postLeadershipListEdit(this.oneForm).then(() => {
        this.$message.success('编辑成功');
        this.oneVis = false;
        this.getLeadershipList(this.paramsOne); // tab1
      }).catch(() => {
        this.$message.error('编辑失败');
      });
    },
    submitEditTwo() { // 提交编辑
      this.postTradingGroupAssociationEdit(this.twoForm).then(() => {
        this.$message.success('编辑成功');
        this.twoVis = false;
        this.getAssociationList(this.paramsTwo); // tab2
      }).catch(() => {
        this.$message.error('编辑失败');
      });
    },
    submitEditThr() { // 提交编辑
      this.postTradingGroupStationEdit(this.thrForm).then(() => {
        this.$message.success('编辑成功');
        this.thrVis = false;
        this.getStationList(this.paramsThr); // tab3
      }).catch(() => {
        this.$message.error('编辑失败');
      });
    },
    submitEditFo() { // 提交编辑
      this.postSecretaryGeneralEdit(this.foForm).then(() => {
        this.$message.success('编辑成功');
        this.foVis = false;
        this.getGeneralList(this.paramsFo); // tab4
      }).catch(() => {
        this.$message.error('编辑失败');
      });
    },
    // 编辑打开赋值
    handleEditCopy(obj, row) {
      for (const key in obj) {
        for (const k in row) {
          if (k === key) {
            obj[key] = row[k];
          }
        }
      }
    },
    handleEditOne(row) {
      let _this = this;
      this.handleEditCopy(_this.oneForm, row);
      this.oneVis = true;
    },
    handleEditTwo(row) {
      let _this = this;
      this.handleEditCopy(_this.twoForm, row);
      this.twoVis = true;
    },
    handleEditThr(row) {
      let _this = this;
      this.handleEditCopy(_this.thrForm, row);
      this.thrVis = true;
    },
    handleEditFo(row) {
      let _this = this;
      this.handleEditCopy(_this.foForm, row);
      this.foVis = true;
    },
    handleWithDraw() { // 申请撤回
      this.$confirm('是否申请撤回?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消'
      }).then(() => {
        this.postWithdraw().then(() => {
          this.getWithdrawStatus(); // 审核状态
          this.$message.success('已申请撤回');
        }).catch(() => {
          this.$message.error('申请失败');
        });
      });
    },
    submitSubmitSecretary() { // 提交大会秘书处
      this.$confirm('是否提交大会秘书处?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消'
      }).then(() => {
        this.postSubmitSecretary().then(() => {
          this.$message.success('已提交');
        }).catch(() => {
          this.$message.error('提交失败');
        });
      });
    },
    downLoadOne() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupLeadershipList/downloadLeader`);
    },
    downLoadTwo() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupTradingGroupAssociation/downloadAssociation`);
    },
    downLoadThr() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupTradingGroupStation/downloadStation`);
    },
    downLoadFo() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupAboveSecretaryGeneral/downloadGeneral`);
    },
    handleSizeChangeOne(val) {
      this.pageInfoDataOne.pageSize = val;
      this.getLeadershipList(this.paramsOne);
    },
    handleCurrentChangeOne(val) {
      this.pageInfoDataOne.currentPage = val;
      this.getLeadershipList(this.paramsOne);
    },
    handleSizeChangeTwo(val) {
      this.pageInfoDataTwo.pageSize = val;
      this.getAssociationList(this.paramsTwo); // tab2
    },
    handleCurrentChangeTwo(val) {
      this.pageInfoDataTwo.currentPage = val;
      this.getAssociationList(this.paramsTwo); // tab2
    },
    handleSizeChangeThr(val) {
      this.pageInfoDataThr.pageSize = val;
      this.getStationList(this.paramsThr); // tab3
    },
    handleCurrentChangeThr(val) {
      this.pageInfoDataThr.currentPage = val;
      this.getStationList(this.paramsThr); // tab3
    },
    handleSizeChangeFo(val) {
      this.pageInfoDataFo.pageSize = val;
      this.getGeneralList(this.paramsFo);
    },
    handleCurrentChangeFo(val) {
      this.pageInfoDataFo.currentPage = val;
      this.getGeneralList(this.paramsFo);
    }
  }
};
</script>
<style lang='less' scoped>
.el-tabs {
  .el-tab-pane {
    .title {
      background-color: #FCE7E7;
      margin-bottom: 10px;
      h6 {
        line-height: 22px;
        color: #FE3565;
        margin: 0;
      }
      p {
        span {
          color: #0066CC;
          text-decoration: underline;
        }
      }
    }
    .bottom {
      margin-bottom: 10px;
      h6 {
        line-height: 22px;
        color: #FE3565;
        margin: 0;
        span {
          color: #0066CC;
          text-decoration: underline;
        }
      }
    }
    .above-table {
      position: relative;
      padding-bottom: 10px;
      /deep/ .el-button {
        position: absolute;
        &.download {
          right: 40px;
        }
        &.print {
          right: 0px;
        }
      }
    }
  }
}
</style>
