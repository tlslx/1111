/**
 * @file 查看手工工单
 */
<template>
  <el-card class="box-card">
    <div style="margin:10px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="查看手工工单" name="first">
          <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="demo-ruleForm" :rules="rules">
            <el-form-item label="展览名称：" prop="exhName">
              {{workOrder.exhName}}
            </el-form-item>
            <el-form-item label="标题" prop="workTitle">
              {{workOrder.workTitle}}
            </el-form-item>
            <el-form-item label="内容" prop="workDetails">
              {{workOrder.workDetails}}
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="展厅：" prop="exhibitionHall">
                  {{workOrder.exhibitionHall}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="展区：" prop="exhibitionArea">
                  {{workOrder.exhibitionArea}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="期数：" prop="numberPeriods">
                  {{workOrder.numberPeriods}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="回复内容；" prop="replyContent">
              <el-input type="textarea" v-model="ruleForm.replyContent" placeholder="请输入"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="回复者：" prop="replyUser">
                  <el-input v-model="ruleForm.replyUser" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="回复时间：" prop="replyTime">
                  <el-input v-model="ruleForm.replyTime" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="回复内容；" prop="replyContent">
              <el-input type="textarea" v-model="ruleForm.replyContent"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="回复者：" prop="replyUser">
                  <el-input v-model="ruleForm.replyUser" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="回复时间：" prop="replyTime">
                  <el-input v-model="ruleForm.replyTime" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="text" style="text-decoration:underline;" @click="openCope">查看历史回复记录</el-button>
              <el-dialog title="历史查询记录" :visible.sync="OpenCopeExhibitionReceiver">
                <template>
                  <table v-for="(item,index) in times" :key="index">
                    <tr v-for="(data,k) in item.responseCorrelations" :key="k">
                      <td class="column">{{data.replyUser}}</td>
                      <td>{{data.replyContent}}</td>
                    </tr>
                  </table>
                </template>
              </el-dialog>
            </el-form-item>
            <el-form-item style="text-align:center">
              <el-button class="btn1" @click="submitForm('form')">回复</el-button>
              <el-button class="btn2" @click="closeCope">打印</el-button>
              <el-button class="btn2" @click="revert">返回</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="margin:10px">
      <div slot="header" class="clearfix">
        <span>● 指定负责人</span>
      </div>
      <div>
        <el-table border :data="workOrder" v-loading="loading">
          <el-table-column label="科室班组编码" prop="deptId" align="center"></el-table-column>
          <el-table-column label="科室班组名称" prop="deptName" align="center"></el-table-column>
          <el-table-column label="区域" prop="area" align="center"></el-table-column>
          <el-table-column label="负责人" prop="chargeName" align="center"></el-table-column>
          <el-table-column label="手机" prop="chargePhone" align="center"></el-table-column>
          <el-table-column label="座机" prop="linkTel" align="center"></el-table-column>
          <el-table-column label="操作" prop="operate" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
    <div style="margin:10px">
      <div slot="header" class="clearfix">
        <span>● 附件表</span>
      </div>
      <div style="margin:30px">
        <el-table border :data="workOrder" v-loading="loading">
          <el-table-column label="附件描述" prop="description" align="center"></el-table-column>
        </el-table>
      </div>
      <div style="margin:30px">
        <el-table border :data="workOrder" v-loading="loading">
          <el-table-column label="" prop="sequenceNum" align="center"></el-table-column>
          <el-table-column label="步骤" prop="opr" align="center"></el-table-column>
          <el-table-column label="科室班组名称" prop="deptName" align="center"></el-table-column>
          <el-table-column label="接单员" prop="acceptorId" align="center"></el-table-column>
          <el-table-column label="接单员" prop="acceptorName" align="center"></el-table-column>
          <el-table-column label="手机" prop="chargePhone" align="center"></el-table-column>
          <el-table-column label="座机" prop="linkTel" align="center"></el-table-column>
          <el-table-column label="处理时间" prop="oprTime" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
    <div style="margin:60px;text-align:center">
      <el-form>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm('form')">下载楣版模版</el-button>
          <el-button class="btn2" @click="closeCope">打印参展证明</el-button>
          <el-button class="btn2" @click="revert">下载参展证明</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      loading: '',
      activeName: "first",
      OpenCopeExhibitionReceiver: false,
      workOrderNumber: '',
      times: [],
      responseCorrelations: [],
      ruleForm: {
        exhName: "",
        workTitle: "",
        workDetails: "",
        exhibitionHall: "",
        exhibitionArea: "",
        numberPeriods: "",
        constructionLegend: ""
      }
    };
  },
  created() {
    let _this = this;
    this.selectWorkOrder(this.workOrderNumber).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('OrdersReminders', ['workOrder'])
  },
  methods: {
    ...mapActions('OrdersReminders', ['selectWorkOrder']),
    revert() {
      this.$router.push("/myWorkOrde");
    },
    openCope() {
      this.OpenCopeExhibitionReceiver = true;
    },
    closeCope() {
      this.OpenCopeExhibitionReceiver = false;
    },
    handleClick(tab, event) {

    },
    feedback() {

    }

  }
};
</script>
<style scoped>
.clearfix {
  font-weight: bold;
  margin: 12px;
}
</style>