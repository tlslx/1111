/**
 * @file 工作部 发送通知
 * @author: weiwei
 * @date:2019/6/13
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="通知事件管理" name="first">
      <el-form :model="noticeForm" ref="noticeForm" :rules="rules">
        <el-form-item label="届数" prop="exhibitionNum">
          <el-select placeholder="请选择" v-model="noticeForm.exhibitionNum" clearable style="width: 30%">
            <el-option v-for="item in this.exhibitonNumListAll" :key="item.exhibitionNum" :label="item.exhibitionNum"
              :value="item.exhibitionNum"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会议主题" prop="topic">
          <el-input placeholder="请输入" v-model="noticeForm.topic" clearable style="width: 30%"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input placeholder="请输入" v-model="noticeForm.content" type="textarea" clearable style="width: 30%"></el-input>
        </el-form-item>

        <!-- <el-form-item label="是否添加议题">
          <el-checkbox v-model="noticeForm.ifSendTopic"></el-checkbox>
        </el-form-item> -->

        <el-form-item label="会议议题">
          <el-table :data="noticeForm.meetingData" border style="width: 80%">
            <el-table-column prop="subjectTitle" label="议题">
              <template slot-scope="scope">
                <el-form-item :prop="'meetingData.' + scope.$index + '.subjectTitle'" label-width="0" :rules="rules.subjectTitle">
                  <el-input v-model="scope.row.subjectTitle" placeholder="请输入"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="unionDeptName" label="关联中心部门">
              <template slot-scope="scope">
                <el-form-item :prop="'meetingData.' + scope.$index + '.unionDeptName'" label-width="0" :rules="rules.unionDeptName">
                  <el-select v-model="scope.row.unionDeptName">
                    <el-option v-for="item in centerDeptOptData.records" :key="item.deptId" :value="item.deptName" :label="item.deptName"></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="operate">
              <template slot-scope="scope">
                <!-- <el-button type="text">修改</el-button> -->
                <el-button type="text" @click="handleDelRow(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" class="bottom">
            <el-button type="primary" @click="handleAddRow">添加</el-button>
          </el-row>
        </el-form-item>

        <el-form-item label="发送成员单位">
          <el-select v-model="noticeForm.sendMemberOrg" multiple filterable remote reserve-keyword placeholder="请输入单位名称关键词"
            :remote-method="remoteMethod" @change="sendMemberOrgChange" style="width: 30%">
            <el-option v-for="item in companyOptions" :key="item.orgId" :label="item.orgName" :value="item.orgId"></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="发送短信名单">
          <el-button type="primary">发送成员单位</el-button>
        </el-form-item> -->
        <el-row>
          <el-button type="primary" @click="sendSubmit('noticeForm')">发送</el-button>
          <el-button type="primary" @click="cancelSubmit">取消</el-button>
        </el-row>

      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: 'first',
      noticeForm: { exhibitionNum: '', topic: '', content: '', meetingData: [],
        sendMemberOrg: [] },
      sendMemberOrgNew: [], // 企业名称下拉框选择之后 重新整理的数组
      companyOptions: [], // 动态下拉框数组
      companyOptionsAll: [], // 所有下拉框数组
      rules: { // 验证
        exhibitionNum: [{ required: true, message: '请输入', trigger: 'blur' }],
        topic: [{ required: true, message: '请输入', trigger: 'blur' }],
        content: [{ required: true, message: '请输入', trigger: 'blur' }],
        subjectTitle: [{ required: true, message: '请输入', trigger: 'blur' }],
        unionDeptName: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    };
  },
  computed: {
    ...mapGetters('leaderGroup', ['contactByNameData', 'centerDeptOptData']), // 获取企业名称 中心部门下拉框
    ...mapGetters('subEnterpriseManage', ['exhibitonNumListAll']),
    submitParams() {
      let efSupEvent = {
        topic: this.noticeForm.topic,
        content: this.noticeForm.content
      };
      let efSupSubjectList = this.noticeForm.meetingData;
      let efSupSendMemberEventList = this.sendMemberOrgNew;
      let obj = {
        efSupEvent, efSupSubjectList, efSupSendMemberEventList
      };
      obj.exhibitionNum = this.noticeForm.exhibitionNum;
      return obj;
    }
  },
  created() {
    this.getExhibitionNumListAll().then(res => {
      this.exhibitonNumListAll.forEach(ele => {
        if (ele.current) {
          this.noticeForm.exhibitionNum = ele.exhibitionNum;
          this.getContactByName({ exhibitionNum: ele.exhibitionNum, orgName: '' }).then(result => {
            this.companyOptionsAll = result;
          });
        }
      });
    });
    this.postCenterDeptOpt(); // 中心部门下拉框
  },
  methods: {
    ...mapActions('leaderGroup', ['postSendNotice', 'getContactByName', 'postCenterDeptOpt']), // 2 获取企业名称 3 中心部门下拉框
    ...mapActions('subEnterpriseManage', ['getExhibitionNumListAll']), // 展届
    sendSubmit(formName) {
      this.$confirm('是否确认提交?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消'
      }).then(() => {
        if (this.sendMemberOrgNew.length === 0) {
          this.$message.error('请输入发送成员单位');
        } else {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.sendSubmitFun();
            }
          });
        }
      });
    },
    sendSubmitFun() {
      this.postSendNotice(this.submitParams).then(() => {
        this.$message.success('提交成功');
        this.noticeForm.topic = ''; this.noticeForm.content = ''; this.noticeForm.meetingData = []; this.noticeForm.sendMemberOrg = [];
        this.sendMemberOrgNew = [];
      }).catch(() => {
        this.$message.error('提交失败');
      });
    },
    cancelSubmit() { // 取消提交
      this.$confirm('是否确认取消?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消'
      }).then(() => {
        this.noticeForm.topic = ''; this.noticeForm.content = ''; this.noticeForm.meetingData = []; this.noticeForm.sendMemberOrg = [];
        this.sendMemberOrgNew = [];
      });
    },
    sendMemberOrgChange(val) { // 下拉框变化
      this.sendMemberOrgNew = [];
      val.forEach(item => {
        this.companyOptionsAll.forEach(it => {
          if (item === it.orgId) {
            this.sendMemberOrgNew.push({ sendMemberOrgId: it.orgId, sendMemberOrgName: it.orgName });
          }
        });
      });
    },
    remoteMethod(query) {
      if (query !== '') {
        let obj = { orgName: query, exhibitionNum: this.noticeForm.exhibitionNum };
        this.getContactByName(obj).then(res => {
          this.companyOptions = res;
        }).catch(() => {
          this.companyOptions = [];
        });
      } else {
        this.companyOptions = [];
      }
    },
    handleAddRow() {
      let newRow = { subjectTitle: '', unionDeptName: '' };
      this.noticeForm.meetingData.push(newRow);
    },
    handleDelRow(i) {
      this.noticeForm.meetingData.splice(i, 1);
    }
  }
};
</script>
<style lang='less' scoped>

</style>

