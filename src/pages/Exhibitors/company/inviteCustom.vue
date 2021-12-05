/*
* @file 邀请参展商与采购商
* @author: weiwei
* @date:2019/3/26
*/
<template>
  <div class="page-contain">
    <!-- 邀请采购商 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="邀请参展商与采购商" name="first">
        <el-form :inline="true" :model="queryForm">
          <el-form-item label-width="110px" label="被邀请企业名称" size="mini" prop="company">
            <el-input placeholder="请选择" v-model="queryForm.company" clearable></el-input>
          </el-form-item>
          <el-form-item label="邀请人员类型" size="mini" prop="type">
            <el-select placeholder="请选择" v-model="queryForm.type" clearable>
              <el-option v-for="item in this.invitePeopleTypeArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="届数" size="mini" prop="type">
            <el-select v-model="queryForm.exhibitionNum" placeholder="请选择">
              <el-option v-for="item in this.exhibitonNumListAll" :key="item.exhibitionNum" :value="item.exhibitionNum"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="handleListQuery" size="mini">查询</el-button>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="handleAddList" size="mini">新增</el-button>
          </el-form-item>
        </el-form>
        <!-- 新增弹框 -->
        <el-dialog title="新增" :visible.sync="dialogAdd" width="50%" :show-close="false">
          <el-form :model="addListForm" label-width="114px">
            <el-form-item label="被邀请企业名称:" size="small" prop="company">
              <el-input v-model="addListForm.company" placeholder="请输入" clearable></el-input>
            </el-form-item>
            <el-form-item label="姓名:" size="small" prop="name">
              <el-input v-model="addListForm.name" placeholder="请输入" clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" size="small" prop="mail">
              <el-input v-model="addListForm.mail" placeholder="请输入" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机:" size="small" prop="phone">
              <el-input v-model="addListForm.phone" placeholder="请输入" clearable></el-input>
            </el-form-item>
            <el-form-item label="邀请人员类型:" size="small" prop="type">
              <el-select v-model="addListForm.type" clearable>
                <el-option v-for="item in this.invitePeopleTypeArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="submitAddList">保 存</el-button>
            <el-button @click="dialogAdd = false">取 消</el-button>
          </span>
        </el-dialog>
        <!-- 表格 -->
        <el-table :data="inviteListData.records" border>
          <el-table-column label="届数" width="55" prop="exhibitionNum" align="center"></el-table-column>
          <el-table-column label="被邀请企业名称" prop="company" align="center"></el-table-column>
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="邮箱" prop="mail" align="center"></el-table-column>
          <el-table-column label="手机" prop="phone" align="center"></el-table-column>
          <el-table-column label="邀请人员类型" prop="type" align="center">
            <template slot-scope="scope">
              {{ scope.row.type | typeFilter }}
            </template>
          </el-table-column>
          <el-table-column label="邀请成功届数" prop="exhibitionSuccessNum" align="center"></el-table-column>
          <el-table-column label="状态" prop="status" align="center">
            <template slot-scope="scope">
              {{ scope.row.status | statusFilter }}
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="operate" align="center">
            <el-button type="text">发送邮件</el-button>
            <el-button type="text">发送短信</el-button>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" class="pagination-contain">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page = pageInfoData.currentPage
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageInfoData.pageSize"
            layout="prev, pager, next, jumper"
            :total="inviteListData.total">
          </el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      activeName: 'first',
      API_POT_URL: process.env.API_POT_URL,
      invitePeopleTypeArr: [],
      queryForm: {
        company: '',
        type: '',
        exhibitionNum: ''
      },
      requireQuery: { // 必传
        isAsc: false,
        // loginId: 'aaa',
        loginType: '0',
        orderByField: 'invite.create_date'
      },
      pageInfoData: { currentPage: 1, pageSize: 10 },
      typeOption: [{ name: '境内采购商', value: '0' }, { name: '境外采购商', value: '1' }, { name: '境外参展商', value: '2' }],
      dialogAdd: false,
      addListForm: { // 新增
        company: '',
        name: '',
        mail: '',
        phone: '',
        type: ''
      }
    };
  },
  computed: {
    ...mapGetters('inviteCustom', ['inviteListData', 'exhibitonNumListAll']),
    queryFormParams() { // 合并表单查询和必传项
      let queryParams = Object.assign(this.queryForm, this.requireQuery);
      queryParams.current = this.pageInfoData.currentPage;
      queryParams.size = this.pageInfoData.pageSize;
      return queryParams;
    },
    // requireMod: { // 新增必传
      //   inviteOrgId: 'aaa'
      //   inviteOrgType: '0'
      // }
    addParams() {
      let _addParams = this.addListForm;
      _addParams.exhibitionNum = this.queryForm.exhibitionNum;
      // _addParams.inviteOrgId = this.requireQuery.loginId;
      _addParams.inviteOrgType = this.requireQuery.loginType;
      return _addParams;
    }
  },
  filters: {
    typeFilter: value => {
      let invitePeopleTypeArr = kindo.dictionary.get('ifoInvitePeopleType');
      for (let i = 0; i < invitePeopleTypeArr.length; i++) {
        let item = invitePeopleTypeArr[i];
        if (value === item.value) {
          return item.label;
        }
      }
    },
    statusFilter: value => {
      switch (value) {
        case '0':
          return '等待中';
        case '1':
          return '已注册';
        case '2':
          return '已办证';
        case '3':
          return '邀请成功';
        default:
          '';
      }
    }
  },
  methods: {
    ...mapActions('inviteCustom', ['getInviteList', 'getUpdateOrAddInvite', "getExhibitionNumListAll"]),
    handleListQuery() { // 查询列表
      this.getInviteList(this.queryFormParams); // 查询列表
    },
    handleAddList() { // 新增
      this.dialogAdd = true;
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getInviteList(this.queryFormParams); // 查询列表
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getInviteList(this.queryFormParams); // 查询列表
    },
    submitAddList() { // 提交新增
      this.getUpdateOrAddInvite(this.addParams).then(res => {
        var key;
        for (key in this.addListForm) {
          this.addListForm[key] = '';
        }
        this.dialogAdd = false;
        this.getInviteList(this.queryFormParams); // 刷新列表
      });
    }
  },
  async created() {
    this.invitePeopleTypeArr = await kindo.dictionary.get('ifoInvitePeopleType');
    this.getExhibitionNumListAll().then(res => {
      for (let i = 0; i < this.exhibitonNumListAll.length; i++) {
        const ele = this.exhibitonNumListAll[i];
        if (ele.current) {
          this.queryForm.exhibitionNum = ele.exhibitionNum;
          return;
        }
      }
    }).then(() => {
      this.getInviteList(this.queryFormParams);
    });
  }
};
</script>
<style lang='less' scoped>
// .page-contain {

// }
</style>

