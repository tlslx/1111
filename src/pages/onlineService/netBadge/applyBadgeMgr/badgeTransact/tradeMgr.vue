<template>
  <div class="tradeMgrBox">
    <kindo-box title="商协会证件管理" v-loading="reqLoading">
      <kindo-box>
        <el-form :model="personForm" inline label-width="110px" size="small" label-position="right" v-if="activeName==='first'">
          <el-form-item label="姓名：">
            <el-input v-model="personForm.userName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="身份证号码：">
            <el-input v-model="personForm.idcardNo" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="企业名称：">
            <el-input v-model="personForm.enterpriceName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="广交会编码：">
            <el-input v-model="personForm.enterpriceCode" placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query('indexTable')" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="secondForm" inline label-width="110px" size="small" label-position="right" v-else>
          <el-form-item label="期数：">
            <el-select v-model="secondForm.exhibitionPeriod" placeholder="" clearable>
              <el-option v-for="item in exhibitionPeriods" :key="item.key" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model="secondForm.applyUserName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="身份证号码：">
            <el-input v-model="secondForm.idcardNo" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="审核状态：">
            <el-select v-model="secondForm.status" placeholder="" clearable>
              <el-option v-for="item in source.dictionary.badgeAuditStatuses" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广交会编码：">
            <el-input v-model="secondForm.enterpriceCode" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="企业名称：">
            <el-input v-model="secondForm.enterpriceName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="证件类型：">
            <el-select v-model="secondForm.badgeTypeCode" placeholder="" clearable>
              <el-option v-for="item in source.dictionary.badgeTypes" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否有效：">
            <el-select v-model="secondForm.isValid" placeholder="" clearable>
              <el-option key="1" label="是" value="Y"></el-option>
              <el-option key="2" label="否" value="N"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="无效原因：" v-if="secondForm.isValid==='N'">
            <el-select v-model="secondForm.unvalidDesc" placeholder="" clearable>
              <el-option v-for="item in source.dictionary.badgeInvalidReasons" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query('secondTable')" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
      <kindo-box>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="办证人员列表" name="first">
            <kindo-box>
              <kindo-table ref="indexTable" :height="'500px'" :url="api.getBmSysUserInfoList" :queryParam="getQueryParam" :pageIndex='false' @selection-change='selectionChange'>
                <!-- <kindo-table ref="indexTable" :height="'500px'"> -->
                <el-table-column type="selection" align="center" min-width="50"></el-table-column>
                <el-table-column label="分团名称" prop="orgName" align="center" min-width="80"></el-table-column>
                <el-table-column label="广交会编码" prop="enterpriceCode" align="center" min-width="80"></el-table-column>
                <el-table-column label="企业名称" prop="enterpriceName" align="center" min-width="80"></el-table-column>
                <el-table-column label="姓名" prop="userName" align="center" min-width="80"></el-table-column>
                <el-table-column label="性别" prop="sexTypeCode" align="center" min-width="80" :formatter="formatSex"> </el-table-column>
                <el-table-column label="身份证号" prop="idcardNo" align="center" min-width="80"></el-table-column>
                <el-table-column label="操作" align="center" min-width="80">
                  <template slot-scope="scope">
                    <el-button type="text" class="btnUnderline" @click="edit(scope)">修改</el-button>
                    <el-button type="text" class="btnUnderline" @click="view(scope,'first')">查看</el-button>
                  </template>
                </el-table-column>
                <div slot="control">
                  <el-button icon="el-icon-plus" type="primary" @click="addDialog('add')">新增办证人员</el-button>
                  <el-button icon="el-icon-plus" type="primary" :disabled="batchApplyData.length===0" @click="batchApply">提交申请</el-button>
                </div>
              </kindo-table>
              <div class="batchFormBox">
                <el-form :model="batchForm" inline label-width="110px" size="small" label-position="right">
                  <el-form-item label="期数：">
                    <el-select v-model="batchForm.exhibitionPeriod" placeholder="" clearable>
                      <el-option v-for="item in exhibitionPeriods" :key="item.key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="证件类型：">
                    <el-select v-model="batchForm.badgeTypeCode" placeholder="" clearable @change="handlebadgeTypeCodeChange">
                      <el-option v-for="item in source.dictionary.badgeTypes" :key="item.id" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="工作证类型：">
                    <el-select v-model="batchForm.workBadge" placeholder="" clearable :disabled="batchForm.badgeTypeCode!='6'">
                      <el-option key="1" label="是" value="Y"></el-option>
                      <el-option key="2" label="否" value="N"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="领证地点：">
                    <el-select v-model="batchForm.takeBadgeAddr" placeholder="" clearable>
                      <el-option v-for="item in source.dictionary.takeBadgeAddrs" :key="item.id" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="操作类型：">
                    <el-radio-group v-model="batchForm.operateType" @change="handleOperateTypeChange">
                      <el-radio label="1">普通</el-radio>
                      <el-radio label="2">换证</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="换证号码：">
                    <el-input v-model="batchForm.code" placeholder="" :disabled="batchForm.operateType==='1'"></el-input>
                  </el-form-item>
                  <el-form-item label="进馆日期：">
                    <el-date-picker v-model="batchForm.date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </el-form>
              </div>
            </kindo-box>
          </el-tab-pane>
          <el-tab-pane label="已申请办证列表" name="second">
            <kindo-box>
              <kindo-table ref="secondTable" :height="'500px'" :url="api.getTradeGroupBmApplyPage" :queryParam="getQueryParam">
                <el-table-column label="广交会编码" prop="enterpriceCode" align="center" min-width="80"></el-table-column>
                <el-table-column label="企业名称" prop="enterpriceName" align="center" min-width="80"></el-table-column>
                <el-table-column label="期数" prop="exhibitionPeriod" align="center" min-width="50" :formatter="formatExhibitionPeriod"></el-table-column>
                <el-table-column label="姓名" prop="applyUserName" align="center" min-width="50"></el-table-column>
                <el-table-column label="性别" prop="sex" align="center" min-width="50" :formatter="formatSex"> </el-table-column>
                <el-table-column label="IC卡" prop="icCardNo" align="center" min-width="50">
                  <template slot-scope="scope">
                    <span>{{scope.row.icCardNo?'有':'无'}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="身份证号" prop="idcardNo" align="center" min-width="80"></el-table-column>
                <el-table-column label="证件类型" prop="badgeTypeName" align="center" min-width="80"></el-table-column>
                <el-table-column label="审核" prop="status" align="center" min-width="80" :formatter="formatStatus"></el-table-column>
                <el-table-column label="状态" prop="handleMode" align="center" min-width="80" :formatter="formatHandleMode"></el-table-column>
                <el-table-column label="生效开始" prop="effectStartDate" align="center" min-width="90"></el-table-column>
                <el-table-column label="生效结束" prop="effectEndDate" align="center" min-width="90"></el-table-column>
                <el-table-column label="申请时间" prop="createDate" align="center" min-width="90"></el-table-column>
                <el-table-column label="审核日期" prop="modifyDate" align="center" min-width="90"></el-table-column>
                <el-table-column label="操作" align="center" min-width="80" fixed='right'>
                  <template slot-scope="scope">
                    <el-button type="text" class="btnUnderline" @click="edit(scope)">撤销</el-button>
                    <el-button type="text" class="btnUnderline" @click="view(scope,'second')">查看</el-button>
                  </template>
                </el-table-column>
                <!-- <div slot="control">
                  <el-button icon="el-icon-plus" type="primary" @click="addDialog('add')">新增办证人员</el-button>
                </div> -->
              </kindo-table>
            </kindo-box>
          </el-tab-pane>
        </el-tabs>
      </kindo-box>
      <el-dialog :title="action==='add'?'新增人员证件':'修改人员证件'" :visible.sync="infoDialog" width="50%" top='10vh' @closed="initEditData">
        <add-form :enterpriceCodes='source.dictionary.enterpriceCodes' :idcardTypeCodes='source.dictionary.idcardTypeCodes' ref="addForm" :data='editData' v-if='infoDialog'></add-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="infoDialog=false">关闭</el-button>
          <el-button type="primary" @click="submit" :disabled="reqLoading">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="查看人员证件" :visible.sync="viewDialog" width="50%" top='10vh'>
        <view-table :viewData='viewData' :viewType='viewType'></view-table>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="viewDialog=false">确定</el-button>
        </div>
      </el-dialog>
    </kindo-box>
  </div>
</template>

<script>
import store from '@/scripts/framework/store';
import addForm from '../../components/addForm';
import viewTable from '../../components/viewTable';
const ACTION_TYPE = {
  apply: '1',
  change: '2',
  addInfo: '3'
};
export default {
  components: { addForm, viewTable },
  data() {
    return {
      pageId: "onlineService/netBadge/applyBadgeMgr/badgeTransact/tradeMgr",
      api: {
        uploadFile: kindo.config.api.upms + "/api/fs/save",
        getFile: kindo.config.api.comsUrl + "/api/fs/view/",
        getBmSysUserInfoList: 'http://10.28.124.108:9001/api/personnelBadgeManage/getBmSysUserInfoList',
        updateBmSysUserInfo: "http://10.28.124.108:9001/api/personnelBadgeManage/updateBmSysUserInfo",
        addBmSysUserInfo: "http://10.28.124.108:9001/api/personnelBadgeManage/addBmSysUserInfo",
        getTradeUserEterprise: 'http://10.28.124.108:9001/api/personnelBadgeManage/getTradeUserEterprise',
        getSubTradeUserEterprise: 'http://10.28.124.108:9001/api/personnelBadgeManage/getSubTradeUserEterprise',
        getTradeGroupBmApplyPage: 'http://10.28.124.108:9001/api/transactBmApplyInfo/getTradeGroupBmApplyPage'
        // getTradeGroupBmApplyPage: kindo.config.api.osUrl + '/api/transactBmApplyInfo/getTradeGroupBmApplyPage',
        // getBmSysUserInfoList: kindo.config.api.osUrl + '/api/personnelBadgeManage/getBmSysUserInfoList',
        // getTradeUserEterprise: kindo.config.api.osUrl + '/api/personnelBadgeManage/getTradeUserEterprise',
        // getSubTradeUserEterprise: kindo.config.api.osUrl + '/api/personnelBadgeManage/getSubTradeUserEterprise',
        // updateBmSysUserInfo: kindo.config.api.osUrl + "/agitpi/personnelBadgeManage/updateBmSysUserInfo",
        // addBmSysUserInfo: kindo.config.api.osUrl + "/api/personnelBadgeManage/addBmSysUserInfo"
      },
      store,
      personForm: {},
      secondForm: {},
      batchForm: {
        operateType: '1'
      },
      editForm: {
        enterpriceCode: '',
        userName: '',
        sexTypeCode: ''
      },
      editData: {},
      activeName: 'first',
      infoDialog: false,
      source: {
        dictionary: {
          enterpriceCodes: [],
          idcardTypeCodes: [],
          takeBadgeAddrs: [],
          badgeAuditStatuses: [],
          badgeTypes: []
        }
      },
      imageUrl: {
        badgePhotoUrl: '',
        busiCardFileId: '',
        idcardFrontPhotoUrl: '',
        idcardBackPhotoUrl: ''
      },
      action: 'add',
      isShowViewApplyTable: false,
      viewDialog: false,
      viewData: {},
      viewType: 'first',
      reqLoading: false,
      exhibitionPeriods: [
        {
          key: '1',
          label: '一期',
          value: '1'
        },
        {
          key: '2',
          label: '二期',
          value: '2'
        },
        {
          key: '3',
          label: '三期',
          value: '3'
        },
        {
          key: '4',
          label: '全期',
          value: '0'
        }
      ],
      batchApplyData: []
    };
  },
  methods: {
    initEditData() {
      this.editData = {
        badgePhotoUrl: '',
        idcardFrontPhotoUrl: '',
        idcardBackPhotoUrl: '',
        busiCardFileId: ''
      };
    },
    handleClick(tab, event) {
      console.log(tab, event);
      const tableRef = this.activeName === 'first' ? 'indexTable' : 'secondTable';
      this.query(tableRef);
    },
    addDialog(action) {
      this.infoDialog = true;
      this.initEditData();
      this.action = action;
    },
    submit() {
      this.$refs.addForm.$refs.addForm.validate(valid => {
        if (valid) {
          this.reqLoading = true;
          const req = { ...this.$refs.addForm.addForm };
          req.enterpriceName = this.source.dictionary.enterpriceCodes.find(e => e.code === req.enterpriceCode).name;
          let url = '';
          console.log(req);
          if (this.action === 'add') {
            switch (req.actionType) {
              case ACTION_TYPE.apply:
                console.log('申请办证');
                break;
              case ACTION_TYPE.change:
                console.log('换证');
                break;
              case ACTION_TYPE.addInfo:
                url = this.api.addBmSysUserInfo;
                console.log('人员信息录入');
                break;
              default:
                url = this.api.addBmSysUserInfo;
                console.log('人员信息录入');
                break;
            }
          } else {
            // this.updateBmSysUserInfo(req);
            url = this.api.updateBmSysUserInfo;
          }
          this.$http.postJson(url, req)
            .then(res => {
              console.log(res);
              this.$message.success('操作成功');
              // this.$refs.addForm.$refs.addForm.resetFields();
              // this.infoDialog = false;
              // this.reqLoading = false;
              // this.query();
            })
            .catch(err => {
              console.log(err);
              this.$message.error('操作失败');
            })
            .finally(() => {
              this.initEditData();
              this.infoDialog = false;
              this.reqLoading = false;
              this.query();
            });
        }
      });
    },
    edit(scope) {
      console.log(scope);
      this.action = 'edit';
      this.editData = { ...scope.row };
      this.infoDialog = true;
    },
    view(scope, type) {
      console.log(scope, type);
      const viewData = { ...scope.row };
      viewData.idcardTypeCodeZh = this.source.dictionary.idcardTypeCodes.find(i => i.value === viewData.idcardTypeCode).label;
      this.viewType = type;
      this.viewData = viewData;
      this.viewDialog = true;
    },
    query(tableRef) {
      this.$refs[tableRef].loadData();
    },
    handlebadgeTypeCodeChange(value) {
      if (value !== '6') {
        this.batchForm.workBadge = '';
      }
    },
    handleOperateTypeChange(value) {
      if (value === '1') {
        this.batchForm.code = '';
      }
    },
    async getUserDept() {
      const deptType = await kindo.dictionary.get('deptType');
      const isTradeGroup = this.$store.getters.userInfo.org.deptType === deptType.find(d => d.label === '交易团').value;
      //交易团和分团请求不同的数据
      const url = isTradeGroup ? this.api.getTradeUserEterprise : this.api.getSubTradeUserEterprise;
      const resData = await this.$http.get(url);
      const enterpriceCodes = [];
      resData.forEach(r => {
        enterpriceCodes.push({
          key: r.companyId,
          code: isTradeGroup ? r.cantonCode : r.companyCode,
          name: r.companyName,
          label: isTradeGroup ? `${r.companyName}(${r.cantonCode})` : `${r.companyName}(${r.companyCode})`
        });
      });
      this.source.dictionary.enterpriceCodes = enterpriceCodes;
      // this.$http.get(url)
      //   .then(res => {
      //     this.enterpriceCodes = res;
      //   });
    },
    //统一获取字典参数
    async getDictionary() {
      //商协会不同的证件类型
      this.source.dictionary.badgeTypes = this.$store.getters.userInfo.org.deptType === '5'
        ? [
          { id: '11', label: '会长证', value: '11' },
          { id: '12', label: '副会长证', value: '12' },
          { id: '13', label: '商会工作人员证', value: '13' },
          { id: '14', label: '商会保卫证', value: '14' }
        ]
        : [
          { id: '1', label: '参展商证', value: '9' },
          { id: '2', label: '团部工作证', value: '6' },
          { id: '3', label: '参展代表证', value: '10' },
          { id: '5', label: '筹展证', value: '31' },
          { id: '6', label: '撤展证', value: '32' }
        ];
      this.source.dictionary.idcardTypeCodes = await kindo.dictionary.get('identityType');
      this.source.dictionary.takeBadgeAddrs = await kindo.dictionary.get('takeBadgeAddr');
      this.source.dictionary.badgeAuditStatuses = await kindo.dictionary.get('badge_audit_status');
      this.source.dictionary.badgeInvalidReasons = await kindo.dictionary.get('BADGE_INVALID_DESC');
    },
    formatExhibitionPeriod(cow, column, cellVal) {
      switch (cellVal) {
        case '0':
          return '全期';
        case '1':
          return '一期';
        case '2':
          return '二期';
        case '3':
          return '三期';
        default:
          return '全期';
      }
    },
    formatHandleMode(cow, column, cellVal) {
      switch (cellVal) {
        case 'NEW':
          return '新办证';
        case 'CHANGE':
          return '换证';
        case 'INVALID':
          return '废证重打';
        default:
          return '新办证';
      }
    },
    formatSex(cow, column, cellVal) {
      switch (cellVal) {
        case '1':
          return '男';
        case '2':
          return '女';
        default:
          return '';
      }
    },
    formatStatus(cow, column, cellVal) {
      const obj = this.source.dictionary.badgeAuditStatuses.find(b => b.value === cellVal);
      return obj ? obj.label : cellVal;
    },
    batchApply() {
      console.log(this.batchApplyData.length);
    },
    selectionChange(val) {
      console.log(val);
      this.batchApplyData = [...val];
    }
  },
  computed: {
    getQueryParam() {
      return {
        queryParams: this.activeName === 'first' ? this.personForm : this.secondForm
      };
    }
  },
  mounted() {
    this.$refs.indexTable.loadData();
    this.getDictionary();
  },
  created() {
    this.getUserDept();
  }
};
</script>

<style lang="less" scoped>
.tradeMgrBox {
  .inputWidth {
    width: 280px;
  }
  .batchFormBox {
    margin: 20px 0;
  }
}
</style>


