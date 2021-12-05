/**
 * @file 工作领导小组成员单位管理
 * @author: weiwei
 * @date:2019/6/12
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="工作领导小组成员单位管理" name="first">
      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item label="届数" prop="exhibitionNum">
          <el-select placeholder="请选择" v-model="queryForm.exhibitionNum" @change="exhibitNumChange">
            <el-option v-for="item in this.exhibitonNumListAll" :key="item.exhibitionNum" :label="item.exhibitionNum"
              :value="item.exhibitionNum"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位名称" prop="orgName">
          <el-input placeholder="请输入" v-model="queryForm.orgName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQueryReset">查 询</el-button>
        </el-form-item>
      </el-form>

      <div class="above-table">
        <el-button type="text" class="download" @click="downloadList">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border :data="pageLeaderData.records" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="orgName" label="单位名称"></el-table-column>
        <el-table-column prop="sendStatus" label="报送状态">
          <template slot-scope="scope">
            {{ scope.row.sendStatus === 0 ? '未报送' : ( scope.row.sendStatus === 1 ? '已报送' : '' ) }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.sendStatus === 0" @click="handleSend(scope.row.memberOrgId)" :disabled="!exhibitCurrent">报送通知</el-button>
            <el-button type="text" @click="handleDel(scope.row.memberOrgId)" :disabled="!exhibitCurrent">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageLeaderData.total">
        </el-pagination>
      </el-row>
      <el-row>
        <el-button type="primary" :disabled="this.selectArr.length === 0 || !exhibitCurrent" @click="selectDel">批量删除</el-button>
        <el-button type="primary" @click="showMember" :disabled="!exhibitCurrent">选择成员单位</el-button>
        <el-button type="primary" @click="showCompany" :disabled="!exhibitCurrent">手动录入单位</el-button>
        <el-button type="primary" @click="handleAllMemberSend" :disabled="!exhibitCurrent">(当前页)全部成员名单报送</el-button>
      </el-row>
      <p style="color: #FF0000">备注：无法修改往届成员名单</p>

      <el-dialog title="选择成员单位" :visible.sync="memberVis" @close="closeMember">
        <el-form :model="memberForm" ref="memberForm">
          <el-form-item label="交易团" prop="businessDelegation">
            <el-select v-model="memberForm.businessDelegation" style="width: 50%" multiple @change="selectGetJYT">
              <el-option v-for="item in delegationOption" :key="item.deptId" :label="item.deptName" :value="item.deptId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商协会" prop="businessAssociation">
            <el-select v-model="memberForm.businessAssociation" style="width: 50%" multiple @change="selectGetSXH">
              <el-option v-for="item in coceralOption" :key="item.deptId" :label="item.deptName" :value="item.deptId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="wmzx">
            <el-checkbox v-model="memberForm.wmzx">外贸中心</el-checkbox>
          </el-form-item>
          <el-form-item label="" prop="wms">
            <el-checkbox v-model="memberForm.wms">外贸司</el-checkbox>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitMemberForm('memberForm')">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="手动录入单位" :visible.sync="companyVis" @close="closeCompany">
        <el-form :model="companyForm" ref="companyForm">
          <el-form-item label="单位名称" prop="orgName">
            <el-input v-model="companyForm.orgName" style="width: 50%"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitCompanyForm('companyForm')">确 定</el-button>
        </span>
      </el-dialog>

    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { getFTC, getJYT, getSXH, getWMS } from "@/pages/supportNature/dict_request";
export default {
  data() {
    return {
      activeName: 'first', exhibitCurrent: true, // 是否为当前展届
      queryForm: { exhibitionNum: '', orgName: '' },
      pageInfoData: { currentPage: 1, pageSize: 10 },
      memberVis: false, // 选择成员单位
      memberForm: { businessDelegation: [], businessAssociation: [], wmzx: false, wms: false }, // 选择成员单位
      memberFormNew: { businessDelegationList: [], businessAssociationList: [] }, // 提交用
      delegationOption: [], // 交易团
      coceralOption: [], // 商协会
      foreignTradeCenter: {}, // 外贸中心
      foreignTradeDivision: {}, // 外贸司
      companyVis: false,
      companyForm: { orgName: '' }, // 手动录入单位
      selectArr: [] // 批量数组
    };
  },
  computed: {
    ...mapGetters('leaderGroup', ['pageLeaderData']),
    ...mapGetters('subEnterpriseManage', ['exhibitonNumListAll']),
    queryParams() {
      return {
        exhibitionNum: this.queryForm.exhibitionNum, orgName: this.queryForm.orgName,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    },
    memberFormNewParams() {
      let obj = this.memberFormNew;
      obj.exhibitionNum = this.queryForm.exhibitionNum;
      return obj;
    },
    exhibitionNumParams() {
      let obj = this.companyForm;
      obj.exhibitionNum = this.queryForm.exhibitionNum;
      return obj;
    }
  },
  async created() {
    this.getExhibitionNumListAll().then(res => {
      this.exhibitonNumListAll.forEach(ele => {
        if (ele.current) {
          this.queryForm.exhibitionNum = ele.exhibitionNum;
        }
      });
    }).then(() => {
      this.handleQuery(); // 查询列表
    }); // 届数
  },
  methods: {
    ...mapActions('leaderGroup', ['getPageLeader', 'postSelectMember', 'postAddByAuto', 'postDeleteById',
      'postSendStatus', 'postDeleteByIds', 'postUpdateByIds']), // 1.列表 2.选择成员名单3.手动录入4.删除
    // 5.报送单条 6.批量删除 7.全部成员名单报送
    ...mapActions('subEnterpriseManage', ['getExhibitionNumListAll']),
    exhibitNumChange(val) { // 判断是否是当前展届
      for (let i = 0; i < this.exhibitonNumListAll.length; i++) {
        const ele = this.exhibitonNumListAll[i];
        if (val === ele.exhibitionNum) {
          if (ele.current) {
            this.exhibitCurrent = true;
          } else {
            this.exhibitCurrent = false;
          }
          // console.log(this.exhibitCurrent, 'this.exhibitCurrent');
        }
      }
    },

    selectGetJYT(ids) { // 返回对象 - 在提交的时候写
      let newArr = [];
      ids.forEach(id => {
        this.delegationOption.forEach(el => {
          if (id === el.deptId) {
            let item = { deptId: el.deptId, deptName: el.deptName };
            newArr.push(item);
          }
        });
      });
      this.memberFormNew.businessDelegationList = newArr;
      // console.log(this.memberForm.businessDelegation, this.memberFormNew.businessDelegation);
    },
    selectGetSXH(ids) { // 返回对象
      let newArr = [];
      ids.forEach(id => {
        this.coceralOption.forEach(el => {
          if (id === el.deptId) {
            let item = { deptId: el.deptId, deptName: el.deptName };
            newArr.push(item);
          }
        });
      });
      this.memberFormNew.businessAssociationList = newArr;
      // console.log(this.memberForm.businessAssociation, this.memberFormNew.businessAssociation);
    },

    // 提交选择成员单位-start
    showMember() { // 打开弹框 - 选择人员单位
      // this.memberVis = true;
      Promise.all([getFTC(), getJYT(), getSXH(), getWMS()]).then(([tco, jyt, sxh, wms]) => {
        this.foreignTradeCenter = this.fullInOption(tco)[0];
        this.delegationOption = this.fullInOption(jyt);
        this.coceralOption = this.fullInOption(sxh);
        this.foreignTradeDivision = this.fullInOption(wms)[0];
      }).then(() => {
        this.memberVis = true;
      });
    },
    closeMember() {
      this.memberForm = { businessDelegation: [], businessAssociation: [], wmzx: false, wms: false };
      this.memberFormNew = { businessDelegationList: [], businessAssociationList: [] };
    },
    submitMemberForm(formName) { // 添加外贸中心 外贸司参数
      if (this.memberForm.wmzx) {
        this.memberFormNew.foreignTradeCenter = this.foreignTradeCenter;
      } else {
        delete this.memberFormNew.foreignTradeCenter;
      }
      if (this.memberForm.wms) {
        this.memberFormNew.foreignTradeDivision = this.foreignTradeDivision;
      } else {
        delete this.memberFormNew.foreignTradeDivision;
      }
      this.postSelectMember(this.memberFormNewParams).then(() => {
        this.$message.success('提交成功');
        this.$refs[formName].resetFields(); // 清空表单
        this.memberVis = false;
        this.getPageLeader(this.queryParams); // 查询列表
      }).catch(() => {
        this.$message.error('提交失败');
      }); // 提交
    },
    // 提交选择成员单位-end

    // 提交手动录入单位-start
    showCompany() { // 展示公司
      this.companyVis = true;
    },
    submitCompanyForm(formName) { // 提交公司
      this.postAddByAuto(this.exhibitionNumParams).then(() => {
        this.$message.success('提交成功');
        this.$refs[formName].resetFields(); // 清空表单
        this.companyVis = false;
        this.handleQuery(); // 查询列表
      }).catch(() => {
        this.$message.error('提交失败');
      }); // 提交
    },
    closeCompany() {
      this.companyForm.orgName = '';
    },
    // 提交手动录入单位-end

    handleAllMemberSend() {
      // this.$router.push({
      //   path: "/notification",
      //   query: {
      //     // isExpo: "0"
      //   }
      // });
      this.$confirm('是否确认(当前页)全部成员名单报送?', '提示:会报送当前页所有信息', {
        confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
      }).then(() => {
        let arr = this.handleSelectionAll();
        this.postUpdateByIds(arr).then(() => {
          this.$message.success('报送成功');
          this.handleQuery(); // 查询列表
          this.selectArr = [];
        }).catch(() => {
          this.$message.error('报送失败');
        });
      });
    },
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupMemberOrg/downloadLeader?${this.encodeSearchParams(this.queryForm)}`);
    },
    handleQuery() { // 查询列表
      this.getPageLeader(this.queryParams);
    },
    handleQueryReset() {
      this.pageInfoData = { currentPage: 1, pageSize: 10 };
      this.handleQuery();
    },
    handleSend(id) { // 报送
      this.$confirm('是否确认报送?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消'
      }).then(() => {
        this.postSendStatus({ memberOrgId: id }).then(() => {
          this.$message.success('报送成功');
          this.getPageLeader(this.queryParams); // 查询列表
        }).catch(() => {
          this.$message.error('报送失败');
        });
      });
    },
    handleDel(id) { // 删除
      this.$confirm('是否确认删除此条数据?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消'
      }).then(() => {
        this.postDeleteById({ memberOrgId: id }).then(() => {
          this.$message.success('删除成功');
          this.getPageLeader(this.queryParams); // 查询列表
        }).catch(() => {
          this.$message.error('删除失败');
        });
      });
    },
    handleSelectionChange(val) { // 手动勾选的
      // console.log(val, '批量');
      this.selectArr = [];
      val.forEach(ele => {
        this.selectArr.push(ele.memberOrgId);
      });
    },
    handleSelectionAll() { // 勾选全部未报送的
      let bsSelectArr = [];
      this.pageLeaderData.records.forEach(ele => {
        if (ele.sendStatus === 0) {
          bsSelectArr.push(ele.memberOrgId);
        }
      });
      // console.log(bsSelectArr, 'bsSelectArr');
      return bsSelectArr;
    },
    selectDel() { // 批量删除
      this.$confirm('是否确认批量删除?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消'
      }).then(() => {
        this.postDeleteByIds(this.selectArr).then(() => {
          this.$message.success('删除成功');
          this.getPageLeader(this.queryParams); // 查询列表
          this.selectArr = [];
        }).catch(() => {
          this.$message.error('删除失败');
        });
      });
    },

    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.handleQuery(); // 查询列表
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.handleQuery(); // 查询列表
    },
    fullInOption(obj) {
      const option = [];
      for (let key in obj) {
        option.push({
          deptName: obj[key],
          deptId: key
        });
      }
      return option;
    },
    encodeSearchParams(obj) { // 下载用
      const params = [];

      Object.keys(obj).forEach((key) => {
        let value = obj[key];
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
          value = '';
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='));
      });

      return params.join('&');
    }
  }
};
</script>
<style lang='less' scoped>
.el-tabs {
  .el-tab-pane {
    .above-table {
      position: relative;
      height: 30px;
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
    .el-table {
      margin-bottom: 10px;
    }
  }
}
</style>

