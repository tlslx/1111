<template>
  <div class="potentialDataBox">
    <kindo-box title="潜在数据">
      <kindo-table ref="potentialTable" :height="'680px'" :url="api.getListPage" :queryParam="queryParam">
        <el-table-column label="姓名" prop="personName" min-width="80" align='center'></el-table-column>
        <el-table-column label="手机号" prop="phoneNumber" min-width="80" align='center'></el-table-column>
        <el-table-column label="是否已注册" prop="registerStatus" align="center" min-width="80">
          <template slot-scope="scope">
            <span>
              {{scope.row.registerStatus=== 1?'是':'否'}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="所属企业" prop="enterpriseName" min-width="80" align='center'></el-table-column>
        <!-- <el-table-column label="是否旧系统注册企业" prop="isOldSysUser" align="center" min-width="80">
          <template slot-scope="scope">
            <span>
              {{scope.row.isOldSysUser=== 1?'是':'否'}}
            </span>
          </template>
        </el-table-column> -->
        <el-table-column label="是否曾办证" prop="hadCredentials" align="center" min-width="80">
          <template slot-scope="scope">
            <span>
              {{scope.row.hadCredentials=== 1?'是':'否'}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="归属招商合作机构" prop="ascriptionAgencyName" min-width="100" align='center'></el-table-column>
        <el-table-column label="累计参会届数" prop="attendSessionTotal" min-width="80" align='center'></el-table-column>
        <el-table-column label="累计参会期数" prop="attendPeriodTotal" min-width="80" align='center'></el-table-column>
        <el-table-column label="当届是否申请证件" prop="curruntApplyStatus" align="center" min-width="60">
          <template slot-scope="scope">
            <span>
              {{scope.row.curruntApplyStatus=== 1?'已申请':'未申请'}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="当届是否办证" prop="curruntHoldCredentials" align="center" min-width="80">
          <template slot-scope="scope">
            <span>
              {{scope.row.curruntHoldCredentials=== 1?'已办证':'未办证'}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="近三年参会届数" prop="attendSessionLty" min-width="80" align='center'></el-table-column>
        <el-table-column label="操作" align="center" min-width="80">
          <template slot-scope="scope">
            <el-button type="text" @click="editTable(scope)" class="btnUnderline">跟进</el-button>
          </template>
        </el-table-column>
        <div slot="control">
          <el-button type="primary" icon="el-icon-upload2">导入数据</el-button>
          <el-button type="primary" icon="el-icon-plus">新建数据</el-button>
          <el-button type="success" icon="el-icon-refresh">更新</el-button>
          <el-button type="success" icon="el-icon-download">下载</el-button>
        </div>
      </kindo-table>
      <el-dialog title="潜在数据跟进" :visible.sync="potentialDialog" width="50%" @closed="closedPotentialDialog">
        <el-form :model="potentialForm" label-width="220px" size="small" label-position="right" ref="potentialForm">
          <el-form-item label="姓名：">
            <el-input v-model="potentialForm.personName" disabled class="inputWidth"></el-input>
          </el-form-item>
          <el-form-item label="所属公司：">
            <el-input v-model="potentialForm.enterpriseName" disabled class="inputWidth"></el-input>
          </el-form-item>
          <el-form-item label="固定是否有效：">
            <el-select v-model="potentialForm.fixedPhoneStatus" placeholder="" class="inputWidth">
              <ElOption key="1" label="有效" :value="1"></ElOption>
              <ElOption key="2" label="无效" :value="0"></ElOption>
            </el-select>
          </el-form-item>
          <el-form-item label="手机是否有效：">
            <el-select v-model="potentialForm.phonenumberStatus" placeholder="" class="inputWidth">
              <ElOption key="1" label="有效" :value="1"></ElOption>
              <ElOption key="2" label="无效" :value="0"></ElOption>
            </el-select>
          </el-form-item>
          <el-form-item label="是否接电话：">
            <el-select v-model="potentialForm.answerStatus" placeholder="" class="inputWidth">
              <ElOption key="1" label="接电话" :value="1"></ElOption>
              <ElOption key="2" label="未接电话" :value="0"></ElOption>
            </el-select>
          </el-form-item>
          <el-form-item label="是否有参会意向：">
            <el-select v-model="potentialForm.attendIntention" placeholder="" class="inputWidth">
              <ElOption key="1" label="有意向" :value="1"></ElOption>
              <ElOption key="2" label="无意向" :value="0"></ElOption>
            </el-select>
          </el-form-item>
          <el-form-item label="感兴趣产品类别：">
            <el-input v-model="potentialForm.interestedProduct" class="inputWidth"></el-input>
          </el-form-item>
          <el-form-item label="数据标签：">
            <el-select v-model="potentialForm.dataLab" placeholder="" class="inputWidth">
              <ElOption key="1" label="无效" :value="'无效'"></ElOption>
              <ElOption key="2" label="不良" :value="'不良'"></ElOption>
              <ElOption key="3" label="禁用" :value="'禁用'"></ElOption>
              <ElOption key="4" label="无" :value="'无'"></ElOption>
            </el-select>
          </el-form-item>
          <el-form-item label="登记人：">
            <el-input v-model="potentialForm.registrar" class="inputWidth"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="potentialDialog=false">关闭</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </el-dialog>
    </kindo-box>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageId: 'importExhibition/dataMgtCleaning/potentialData',
      baseTestUrl: 'http://10.28.124.212:8051/',
      api: {
        getListPage: 'http://10.28.124.212:8051/api/infoIfiPotentialData/getListPage'
      },
      potentialForm: {
        personName: '',
        enterpriseName: '',
        fixedPhoneStatus: '1',
        phonenumberStatus: '1',
        answerStatus: '1',
        attendIntention: '1',
        interestedProduct: '1',
        registrar: '1'
      },
      potentialDialog: false,
      potentialTable: [
        {
          id: 1,
          personName: '刘先放',
          phoneNumber: '123456',
          registerStatus: '1',
          enterpriseName: '广州天宇机械有限公司',
          isOldSysUser: '1',
          hadCredentials: '1',
          ascriptionAgencyName: '',
          attendSessionTotal: '22',
          attendPeriodTotal: '77',
          curruntApplyStatus: '1',
          curruntHoldCredentials: '1',
          attendSessionLty: '1'
        },
        {
          id: 2,
          personName: '张三',
          phoneNumber: '222222',
          registerStatus: '1',
          enterpriseName: '南京金融设备公司',
          isOldSysUser: '1',
          hadCredentials: '1',
          ascriptionAgencyName: '',
          attendSessionTotal: '25',
          attendPeriodTotal: '121',
          curruntApplyStatus: '1',
          curruntHoldCredentials: '1',
          attendSessionLty: '1'
        },
        {
          id: 3,
          personName: '李四',
          phoneNumber: '3333333',
          registerStatus: '',
          enterpriseName: '',
          isOldSysUser: '',
          hadCredentials: '',
          ascriptionAgencyName: '',
          attendSessionTotal: '',
          attendPeriodTotal: '',
          curruntApplyStatus: '',
          curruntHoldCredentials: '',
          attendSessionLty: ''
        }
      ]
    };
  },
  methods: {
    editTable(scope) {
      console.log(scope);
      this.potentialForm = Object.assign({}, scope.row);
      this.potentialDialog = true;
    },
    submit() {
      const potentialForm = Object.assign({}, this.potentialForm);
      console.log('potentialForm:', potentialForm);
      this.potentialDialog = false;
    },
    closedPotentialDialog() {
      this.potentialForm = {};
    }
  },
  mounted() {
    const json = {
      page: {
        current: 1,
        size: 10
      }
    };
    const url = this.baseTestUrl + 'api/infoIfiPotentialData/getListPage';
    this.$http.get(url, { json })
      .then(res => {
        console.log(res);
      });
    // this.$refs.potentialTable.internalData = this.potentialTable;
    this.$refs.potentialTable.loadData();
  },
  computed: {
    queryParam: function () {
      return {
        queryParams: {}
      };
    }
  }
};
</script>

<style lang="less" scoped>
.potentialDataBox {
  .btnUnderline {
    text-decoration: underline;
  }
  .inputWidth {
    width: 280px;
  }
}
</style>

