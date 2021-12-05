/**
 * @file 交易团（除了分团）驻地信息填报new
 * @author: weiwei
 * @date:2019/6/3
 */
<template>
  <div class="page-contain">
    <el-header height="40px">商协会驻地信息填报</el-header>
    <el-tabs v-model="activeName">
      <el-tab-pane label="填报样式" name="first">
        <el-form :model="fillForm" ref="fillForm" :rules="rules" label-width="170px">
          <span>报送人员信息</span><hr>
          <el-row>
            <el-col :span="12">
              <el-form-item label="填报人姓名" prop="reporterName">
                <el-input placeholder="请输入" v-model="fillForm.reporterName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机" prop="informantPhone">
                <el-input placeholder="请输入" v-model="fillForm.informantPhone" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="办公电话" prop="informantOfficePhone">
                <el-input placeholder="请输入" v-model.number="fillForm.informantOfficePhone" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="传真" prop="informantFax">
                <el-input placeholder="请输入" v-model.number="fillForm.informantFax" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <span>驻地信息</span><hr>
          <el-row>
            <el-col :span="12">
              <el-form-item label="驻地" prop="station">
                <el-input placeholder="请输入" v-model="fillForm.station" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址" prop="address">
                <el-input placeholder="请输入" v-model.number="fillForm.address" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="会务组电话" prop="conferenceGroupTelephone">
                <el-input placeholder="请输入" v-model="fillForm.conferenceGroupTelephone" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入住人数" prop="peopleStationedNumber">
                <el-input placeholder="请输入" v-model="fillForm.peopleStationedNumber" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <span>大会领导委员会委员任职名单</span><hr>
          <el-table :data="fillForm.leaderList" border>
            <el-table-column label="期数" prop="numberParticipants">
              <template slot-scope="scope">
                <el-form-item :prop="'leaderList.' + scope.$index + '.numberParticipants'" label-width="0" :rules="rules.numberParticipants">
                  <el-select placeholder="请输入" v-model="scope.row.numberParticipants" disabled>
                    <el-option v-for="item in qishuArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="memberName">
              <template slot-scope="scope">
                <el-form-item :prop="'leaderList.' + scope.$index + '.memberName'" label-width="0" :rules="rules.memberName">
                  <el-input placeholder="请输入" v-model="scope.row.memberName" clearable></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="所在单位及职务" prop="memberPosition">
              <template slot-scope="scope">
                <el-form-item :prop="'leaderList.' + scope.$index + '.memberPosition'" label-width="0" :rules="rules.memberPosition">
                  <el-input placeholder="请输入" v-model="scope.row.memberPosition" clearable></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="行政级别" prop="memberLevel">
              <template slot-scope="scope">
                <el-form-item :prop="'leaderList.' + scope.$index + '.memberLevel'" label-width="0" :rules="rules.memberLevel">
                  <el-input placeholder="请输入" v-model="scope.row.memberLevel" clearable></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="responsibilityNote">
              <template slot-scope="scope">
                <el-form-item :prop="'leaderList.' + scope.$index + '.responsibilityNote'" label-width="0" :rules="rules.responsibilityNote">
                  <el-input placeholder="请输入" v-model="scope.row.responsibilityNote" clearable></el-input>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>

          <span>交易团秘书长以上参会人员信息</span><hr>
          <el-table :data="fillForm.aboveSecretaryList" border>
            <el-table-column label="参会职务" prop="participation">
              <template slot-scope="scope">
                <el-form-item :prop="'aboveSecretaryList.' + scope.$index + '.participation'" label-width="0" :rules="rules.participation">
                  <el-input placeholder="请输入" v-model="scope.row.participation" clearable></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="name">
              <template slot-scope="scope">
                <el-form-item :prop="'aboveSecretaryList.' + scope.$index + '.name'" label-width="0" :rules="rules.name">
                  <el-input placeholder="请输入" v-model="scope.row.name" clearable></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="所在单位、部门及部门" prop="participantPosition">
              <template slot-scope="scope">
                <el-form-item :prop="'aboveSecretaryList.' + scope.$index + '.participantPosition'" label-width="0" :rules="rules.participantPosition">
                  <el-input placeholder="请输入" v-model="scope.row.participantPosition" clearable></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="行政级别" prop="participantAdministrativeLevel">
              <template slot-scope="scope">
                <el-form-item :prop="'aboveSecretaryList.' + scope.$index + '.participantAdministrativeLevel'" label-width="0" :rules="rules.participantAdministrativeLevel">
                  <el-input placeholder="请输入" v-model="scope.row.participantAdministrativeLevel" clearable></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="参会期数" prop="participantNumber">
              <template slot-scope="scope">
                <el-form-item :prop="'aboveSecretaryList.' + scope.$index + '.participantNumber'" label-width="0" :rules="rules.participantNumber">
                  <el-select placeholder="请输入" v-model="scope.row.participantNumber">
                    <el-option v-for="item in qishuArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="participantRemarks">
              <template slot-scope="scope">
                <el-form-item :prop="'aboveSecretaryList.' + scope.$index + '.participantRemarks'" label-width="0" :rules="rules.participantRemarks">
                  <el-input placeholder="请输入" v-model="scope.row.participantRemarks" clearable></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="operate">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDelRow(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" class="bottom" justify="center">
            <el-button type="primary" @click="handleAddRow">添加</el-button>
          </el-row>
        </el-form>
        <el-row type="flex" class="bottom" justify="center" style="padding-top: 10px;">
          <el-button type="primary" @click="handleSubmit('fillForm')">提交大会秘书处</el-button>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    let telephone = (rule, value, callback) => {
      let phoneTest = this.$store.state.common.CHECK_CONST_DATA.telephone;
      if (!phoneTest.test(value)) {
        return callback(new Error("请输入正确格式的电话号码"));
      }
      return callback();
    };
    let onlyNumber = (rule, value, callback) => {
      let phoneTest = this.$store.state.common.CHECK_CONST_DATA.onlyNumber;
      if (!phoneTest.test(value)) {
        return callback(new Error("请输入非零开头的数字"));
      }
      return callback();
    };
    return {
      activeName: 'first',
      fillForm: {
        reporterName: '', informantOfficePhone: '', informantPhone: '',
        informantFax: '',

        station: '', address: '', conferenceGroupTelephone: '',
        peopleStationedNumber: '',

        leaderList: [ // 领导人tableList
          { numberParticipants: 1, memberName: '', memberPosition: '', memberLevel: '', responsibilityNote: '' },
          { numberParticipants: 2, memberName: '', memberPosition: '', memberLevel: '', responsibilityNote: '' },
          { numberParticipants: 3, memberName: '', memberPosition: '', memberLevel: '', responsibilityNote: '' }
        ],
        aboveSecretaryList: [ // 商会、协会秘书长以上参会人员信息

        ]
      },
      // qishuArr: [1, 2, 3], // 期数下拉框
      qishuArr: [{ value: 1, label: '第一期' }, { value: 2, label: '第二期' }, { value: 3, label: '第三期' }], // 期数下拉框
      rules: {
        numberParticipants: [{ required: true, message: '请输入', trigger: ["blur", "change"] }],
        memberName: [{ required: true, message: '请输入', trigger: 'blur' }],
        memberPosition: [{ required: true, message: '请输入', trigger: 'blur' }],
        memberLevel: [{ required: true, message: '请输入', trigger: 'blur' }],

        reporterName: [{ required: true, message: '请输入', trigger: 'blur' }],
        informantOfficePhone: [{ required: true, message: '请输入', trigger: 'blur' }],
        informantPhone: [{ required: true, message: '请输入', trigger: 'blur' }, { validator: telephone, trigger: "blur" }],
        informantFax: [{ required: true, message: '请输入', trigger: 'blur' }],

        station: [{ required: true, message: '请输入', trigger: 'blur' }],
        address: [{ required: true, message: '请输入', trigger: 'blur' }],
        conferenceGroupTelephone: [{ required: true, message: '请输入', trigger: 'blur' }, { validator: telephone, trigger: "blur" }],
        peopleStationedNumber: [{ required: true, message: '请输入', trigger: 'blur' }, { max: 5, message: '长度在 5个字符以内', trigger: 'blur' },
          { validator: onlyNumber, trigger: "blur" }],

        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        participantAdministrativeLevel: [{ required: true, message: '请输入', trigger: 'blur' }],
        participantPosition: [{ required: true, message: '请输入', trigger: 'blur' }],
        participantNumber: [{ required: true, message: '请输入', trigger: 'blur' }],
        participation: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    };
  },
  computed: {
    fillParams() {
      let a = this.fillForm;
      return {
        // efSupLeadershipList: { numberParticipants: a.numberParticipants, memberName: a.memberName, memberPosition: a.memberPosition,
        //   memberLevel: a.memberLevel, responsibilityNote: a.responsibilityNote },
        leadershipLists: a.leaderList,
        efSupTradingGroupAssociation: { reporterName: a.reporterName, informantOfficePhone: a.informantOfficePhone, informantPhone: a.informantPhone,
          informantFax: a.informantFax },
        efSupTradingGroupStation: { station: a.station, address: a.address, conferenceGroupTelephone: a.conferenceGroupTelephone,
          peopleStationedNumber: a.peopleStationedNumber },
        // efSupAboveSecretaryGeneral: {
        //   name: a.name, participantAdministrativeLevel: a.participantAdministrativeLevel, participantPosition: a.participantPosition,
        //   participantNumber: a.participantNumber, participantRemarks: a.participantRemarks, participation: a.participation
        // }
        generalList: a.aboveSecretaryList
      };
    }
  },
  methods: {
    ...mapActions('exhibitStation', ['postExhibitFillSubmit']),
    handleAddRow() {
      let newRow = { participation: '', name: '', participantPosition: '', participantAdministrativeLevel: '', numberParticipants: '', participantRemarks: '' };
      this.fillForm.aboveSecretaryList.push(newRow);
    },
    handleDelRow(index) {
      this.fillForm.aboveSecretaryList.splice(index, 1);
    },
    handleSubmit(formName) { // 提交大会秘书处
      this.$confirm('确认提交大会秘书处?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消'
      }).then(() => {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.postExhibitFillSubmit(this.fillParams).then(() => {
              this.$message.success('提交成功');
              this.$refs[formName].resetFields(this.fillForm); // 清空表单
              this.fillForm.aboveSecretaryList = [];
            }).catch(() => {
              this.$message.error('提交失败');
            });
          } else {
            this.$message.error('请将表单填写完整');
          }
        });
      }).catch(() => {
        this.$message.info('取消提交');
      });
    }
  }
};
</script>
<style lang='less' scoped>
.page-contain {
  .el-header {
    line-height: 40px;
    font-size: 22px;
    font-weight: 700;
  }
  .el-tab-pane {
    .el-form {
      border: 1px solid #000;
    }
  }
}
</style>
