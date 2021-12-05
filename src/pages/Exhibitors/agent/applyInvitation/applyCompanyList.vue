<style lang="less" scoped>
@import "../../../../theme/project/css/flex.less";
#apply-company-list {

}
</style>

<template>
  <div id="apply-company-list">
    <el-tabs v-model="activeName">
      <el-tab-pane label="企业列表" name="index">
        <div class="bm bm-pj">
          <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
            <el-form-item label="企业名称:" size="mini" placeholder="请选择">
              <el-input v-model="ruleForm.companyName" clearable></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </div>
        <!-- 表格 -->
        <div class="bm bm-pc bm-ver">
          <el-table
            :data="tableData">
            <el-table-column v-for="item in tableHead" :key="item.prop"
              :label="item.label"
              :prop="item.prop"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="250">
              <template slot-scope="scope">
                <el-button @click="invitePP(scope.row)" type="text" size="small">邀请人员</el-button>
                <!-- <el-button @click="deleThis(scope.row.gjhId)" type="text" size="small">删除</el-button> -->
                <!-- <el-button @click="completeMsg(scope.row.gjhId)" type="text" size="small">完善公司信息</el-button> -->
              </template>
            </el-table-column>
          </el-table>
          <div class="bm bm-pj" style="margin-top: 10px">
            <el-button type="primary" size="small" @click="$router.go(-1)">返回</el-button>
            <div class="block bm bm-ac" style="float:right; margin-top:10px;" >
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="current"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>

        <!-- 勾选人员 -->
        <el-dialog
          title="激情人员"
          :visible.sync="dialogTableVisible"
          :show-close="false">
          <p class="remark" v-show="isShow">已达最大额度,不可再选。</p>
          <p class="bm" style="color:red">备注：如果邀请人员超过额度则给予相应提示已达最大额度不可再选</p>
          <p class="bm">企业名称: <span style="color:red">{{ companyName }}</span></p>
          <el-table :data="tablePersonnel" @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column property="name" label="姓名"></el-table-column>
            <el-table-column property="sex" label="性别">
              <template slot-scope="scope">
                <span v-if="scope.row.sex==0">女</span>
                <span v-else>男</span>
              </template>
            </el-table-column>
          </el-table>
          <p class="remark">邀请函额度已用{{this.totalLimit - this.availableLimit}}，总共{{this.totalLimit}}。</p>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="addInvitation">确 定</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      companyName: "",
      dialogTableVisible: false,
      availableLimit: "",
      totalLimit: "",
      isShow: false,
      activeName: "index",
      tablePersonnel: [],
      ruleForm: {
        companyName: '',
        size: 10,
        current: 1 
      },
      ifoPersonId: [],
      // 表头
      tableHead: [
        {
          label: "企业中文名称",
          prop: "companyNameCh"
        },
        {
          label: "企业英文名称",
          prop: "companyNameEn"
        },
        {
          label: "国家/地区",
          prop: "crChName"
        }
      ],
      //企业表格数据
      tableData: [],
      current: 1, //当前页
      total: 0, //总页数,
      invitePersonnel: {
        "companyId": "",
        "orderByField": "ip.create_date",
        "size": 10,
        "current": 1,
        "isAsc": true,
        "exhibitionNum": "",
        "exhibitionSession": ""
      }
    };
  },
  methods: {
    ...mapActions("invitationCard", ["getLimit", "addableList", "createInvitationCard"]), // 显示额度, 可新增邀请函列表\
    ...mapActions('commonStore', ["getCompanyList"]),
    
    requestGetCompanyList(param) {
      this.getCompanyList(param).then(res => {
        // console.log(res);
        if (res && res.records.length > 0) {
          this.total = res.total;
          this.tableData = res.records.slice(0);
        }
      });
    },
    submitForm() {
      this.requestGetCompanyList(this.ruleForm);
    },
    invitePP(param) {
      // console.log(param);
      
      let { companyId, companyNameCh } = param;
      this.companyName = companyNameCh;
      Object.assign(this.invitePersonnel, { companyId });
      // console.log("bianji", param);
      this.dialogTableVisible = true;

      this.addableList(this.invitePersonnel).then(res => {
        // console.log(res);
        if (res.records && res.records.length > 0) {
          this.limitLength = res.records.length;
          this.tablePersonnel = res.records.slice(0);
        }
      }).then(res => {
        // 显示额度
        let showParams = {
          companyId: this.invitePersonnel.companyId,
          exhibitionNum: this.invitePersonnel.exhibitionNum,
          exhibitionSession: this.invitePersonnel.exhibitionSession
        };
        this.getLimit(showParams).then(resp => {
          this.totalLimit = resp.totalLimit;
          this.availableLimit = resp.availableLimit;
        });

        let limitLength = this.limitLength;
        // this.availableLimit;// 可用额度

        if (this.ifoPersonId.length > limitLength) {
          this.isShow = true;
        }

        if (this.ifoPersonId.length || this.ifoPersonId.length > limitLength || this.availableLimit === 0) {
          this.addShow = true;
        }
      });

    },
    //确认的情况
    addInvitation() {
      let array = [];
      if (this.ifoPersonId.length > 0) {
        for (let item of this.ifoPersonId) {
          let obj = {
            userId: item,
            exhibitionNum: this.invitePersonnel.exhibitionNum, // 届数
            exhibitionSession: this.invitePersonnel.exhibitionSession // 期数
          };
          array.push(obj);
        }
        this.createInvitationCard(array).then(res => {
          this.$message({
            type: 'success',
            message: '新增成功!'
          });
          this.dialogTableVisible = false;
          this.$router.go(-1);
        });
      }
    },
    // 人员多选框选中事件
    handleSelectionChange(val) {
      if (this.ifoPersonId.length > 0) {
        this.ifoPersonId.splice(0, this.ifoPersonId.length);
      }
      for (let item of val) {
        this.ifoPersonId.push(item.ifoPersonId);
      }
    },
    // 分页 页面显示数据量切换
    handleSizeChange(param) {
      this.ruleForm.size = param;
      this.requestGetCompanyList(this.ruleForm);
      
    },
    handleCurrentChange(param) {
      this.ruleForm.current = param;
      this.requestGetCompanyList(this.ruleForm);
    }
  },
  created() {
    this.requestGetCompanyList(this.ruleForm);
    let { exhibitionNum, exhibitionSession, companyId } = this.$route.query;
    Object.assign(this.invitePersonnel, { exhibitionNum, exhibitionSession, companyId });
    console.log(this.invitePersonnel);
    
  }
};
</script>
