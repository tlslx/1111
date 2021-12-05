/**
* @file 广交会-嘉宾信息管理
* @author:zhangwenjian
* @date:2019/2/26
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">{{source.language.guestInfoManagement}} </span></p>
    <el-form :inline="true" :model="searchForm" class="demo-ruleForm">
      <el-form-item :label="source.language.name" size="mini" label-width="60px">
        <el-input v-model.trim="searchForm.guestName" :placeholder="source.language.pleaseEnterContent"></el-input>
      </el-form-item>
      <el-form-item :label="source.language.orgName"size="mini">
        <el-input v-model.trim="searchForm.orgName" :placeholder="source.language.pleaseEnterContent"></el-input>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="handleSearch()">{{source.language.query}}</el-button>
        <el-button type="primary" @click="resetSearchForm()">{{source.language.reset}}</el-button>
      </el-form-item>
    </el-form>
    <el-row class="btn-row">
      <!--<el-checkbox v-model="handleSelectionChange">全选/全不选</el-checkbox>-->
      <el-button type="primary" @click="showAddDialog()">{{source.language.add}}</el-button>
      <el-button type="warning" :disabled="deleteBtn" @click="deleteMuitlGuestInfo()">{{source.language.delete}}</el-button>
    </el-row>
    <template>
      <el-table
        ref="multipleTable"
        :data="guestData"
        border
        class="table"
        @select-all="handleTabSelectAll"
        @selection-change="handleSelectionChange"
        style="width: 100%;">

        <el-table-column
          type="selection"
          width="80">
        </el-table-column>

        <el-table-column
          prop="guestName"
          :label="source.language.guestName"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orgName"
          :label="source.language.orgName"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="guestPosition"
          :label="source.language.position"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          :label="source.language.mobile"
          width="150"
          align="center"
          prop="guestPhone">
        </el-table-column>
        <el-table-column
          prop="guestEmail"
          :label="source.language.email"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="contactName"
          :label="source.language.guestAssistant"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="contactPosition"
          :label="source.language.assistantPosition"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          :label="source.language.assistantMobile"
          width="160"
          align="center"
          prop="contactPhone">
        </el-table-column>
        <el-table-column
          :label="source.language.assistantEmail"
          width="180"
          align="center"
          prop="contactEmail">
        </el-table-column>
        <el-table-column
          :label="source.language.operation"
          align="center"
          fixed="right"
          width="200">
          <template slot-scope="scope">
            <el-button  type="text" size="mini" @click="showUpdateDialog(scope.row,scope.index)">{{source.language.update}}</el-button>
            <el-button  type="text" size="mini" @click="deleteSingleGuestInfo(scope.row, scope.index)">{{source.language.delete}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="searchForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="searchForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalDatas"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
    </template>
    <el-dialog :title="addDialogTitle" :visible.sync="addDialog" :close-on-click-modal="false" width="700px" label-width="190px">
      <el-form :model="addGuestForm" label-position="right"  :inline="true" style="text-align: center" :rules="rules" ref="addGuestForm">
        <el-form-item  :label="source.language.guestName" label-width="90px" size="mini" class="dialog_item" prop="guestName">
          <el-input type="text" maxlength="50" v-model.trim="addGuestForm.guestName" :placeholder="source.language.pleaseEnterContent"></el-input>
        </el-form-item>
        <el-form-item :label="source.language.orgName" label-width="90px" size="mini" class="dialog_item" prop="orgName">
          <el-input type="text" maxlength="50" v-model.trim="addGuestForm.orgName" :placeholder="source.language.pleaseEnterContent" ></el-input>
        </el-form-item>
        <el-form-item :label="source.language.position" label-width="90px" size="mini" class="dialog_item" prop="guestPosition">
          <el-input type="text" maxlength="32" v-model.trim="addGuestForm.guestPosition" :placeholder="source.language.pleaseEnterContent"></el-input>
        </el-form-item>
        <el-form-item :label="source.language.mobile" label-width="90px" size="mini" class="dialog_item" prop="guestPhone">
          <el-input v-model.trim="addGuestForm.guestPhone" :placeholder="source.language.pleaseEnterContent"></el-input>
        </el-form-item>
        <el-form-item :label="source.language.email" label-width="95px" size="mini" style="display: block;width:50%" prop="guestEmail">
          <el-input v-model.trim="addGuestForm.guestEmail":placeholder="source.language.pleaseEnterContent"></el-input>
        </el-form-item>
        <el-form-item :label="source.language.guestAssistant" label-width="90px" size="mini" class="dialog_item" prop="contactName">
          <el-input type="text" maxlength="50" v-model.trim="addGuestForm.contactName" :placeholder="source.language.pleaseEnterContent"></el-input>
        </el-form-item>
        <el-form-item :label="source.language.assistantPosition" label-width="90px" size="mini" class="dialog_item" prop="contactPosition">
          <el-input type="text" maxlength="32" v-model.trim="addGuestForm.contactPosition" :placeholder="source.language.pleaseEnterContent" ></el-input>
        </el-form-item>
        <el-form-item :label="source.language.assistantMobile" label-width="90px" size="mini" class="dialog_item" prop="contactPhone">
          <el-input v-model.trim="addGuestForm.contactPhone" :placeholder="source.language.pleaseEnterContent"></el-input>
        </el-form-item>
        <el-form-item :label="source.language.assistantEmail" label-width="90px" size="mini" class="dialog_item" prop="contactEmail">
          <el-input v-model.trim="addGuestForm.contactEmail" :placeholder="source.language.pleaseEnterContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center" >
        <el-button type="primary" @click="confirmPutGuestData()">{{source.language.confirm}}</el-button>
        <el-button @click="addDialog = false">{{source.language.cancel}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import dialogMixin from '@/components/project/mixins/mettingForumDialogMixin';
  export default {
    name: "guestInformationManage",
    mixins: [dialogMixin],
    data() {
      const validateMobile = (rule, value, callback) => {
        let MOBILE = /^([1][3-9])+\d{9}$|^([9][28])+\d{9}$/;
        if (!MOBILE.test(value)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          return callback();
        }
      };
      const validateMobileNoMust = (rule, value, callback) => {
        let MOBILE = /^([1][3-9])+\d{9}$|^([9][28])+\d{9}$/;
        if (value == null || value === '') {
          return callback();
        }
        if (!MOBILE.test(value)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          return callback();
        }
      };
      const validateSpecial = (rule, value, callback) => {
        let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

        if (value == null || value === '') {
          return callback();
        }
        if (regEn.test(value) || regCn.test(value)) {
          return callback(new Error("输入不能包含特殊字符!"));
        } else {
          return callback();
        }
      };
      return {
        source: {
          language: []
        },
        addDialog: false,
        deleteBtn: true,
        totalDatas: 0,
        forumGuestIds: [],
        addDialogTitle: '新增嘉宾',
        addGuestForm: {
          guestId: '',
          guestName: '',
          orgName: '',
          guestPosition: '',
          guestPhone: '',
          guestEmail: '',
          contactName: '',
          contactPosition: '',
          contactPhone: '',
          contactEmail: ''
        },
        searchForm: {
          current: 1,
          size: 10,
          guestName: '',
          orgName: ''
        },
        isUpdate: false,
        guestData: [],
        rules: {
          guestName: [
            { required: true, message: '不能为空', trigger: 'change' },
            { validator: validateSpecial, trigger: 'change' }
          ],
          contactPosition: [
            { validator: validateSpecial, trigger: 'change' }
          ],
          contactName: [
            { validator: validateSpecial, trigger: 'change' }
          ],
          guestPosition: [
            { validator: validateSpecial, trigger: 'change' }
          ],
          orgName: [
            { required: true, message: '不能为空', trigger: 'change' },
            { validator: validateSpecial, trigger: 'change' }
          ],
          guestPhone: [
            { required: true, message: '不能为空', trigger: 'change' },
            { validator: validateMobile, trigger: 'change' }
          ],
          contactPhone: [
            { validator: validateMobileNoMust, trigger: 'change' }
          ],
          guestEmail: [
            { required: true, message: '请输入邮箱地址', trigger: 'change' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
          ],
          contactEmail: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
          ]
        },
        baseApi: process.env.API_FF_URL
      };
    },
    async created() {
      this.source.language = await kindo.util.getLanguage('MettingForumLang');
    },
    mounted() {
      this.getGuestList();
    },
    methods: {
      /*
        前后台数据交互
       */
      handleSearch() {
        this.searchForm.current = 1;
        this.getGuestList();
      },
      // 获取嘉宾信息列表
      getGuestList() {
        this.$http.get(this.baseApi + '/api/customservice/forum/listForumGuests', this.searchForm).then(res => {
          this.guestData = res.records;
          this.totalDatas = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取单个嘉宾信息
      getGuestById(forumGuestId) {
        this.$http.get(this.baseApi + '/api/customservice/forum/getForumGuest', { forumGuestId: forumGuestId }).then(res => {
          this.addGuestForm.guestId = res.guestId;
          this.addGuestForm.guestName = res.guestName;
          this.addGuestForm.orgName = res.orgName;
          this.addGuestForm.guestPosition = res.guestPosition;
          this.addGuestForm.guestPhone = res.guestPhone;
          this.addGuestForm.guestEmail = res.guestEmail;
          this.addGuestForm.contactName = res.contactName;
          this.addGuestForm.contactPosition = res.contactPosition;
          this.addGuestForm.contactPhone = res.contactPhone;
          this.addGuestForm.contactEmail = res.contactEmail;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 新增嘉宾
      addGuestInfo() {
        this.$http.postJson(this.baseApi + '/api/customservice/forum/saveForumGuest', this.addGuestForm).then(res => {
          this.$message.success("新增成功!");
          this.addDialog = false;
          this.getGuestList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 修改嘉宾
      updateGuestInfo() {
        this.$http.postJson(this.baseApi + '/api/customservice/forum/updateForumGuest', this.addGuestForm).then(res => {
          this.$message.success("更新成功!");
          this.addDialog = false;
          this.getGuestList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 删除嘉宾
      deleteGuestRequest(params) {
        this.$http.post(this.baseApi + '/api/customservice/forum/deleteForumGuests', { forumGuestIds: params }).then(res => {
          this.$message.success("删除成功!");
          this.getGuestList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 单个删除嘉宾
      deleteSingleGuestInfo(row, index) {
        this.showDialogTips("确认删除该信息?").then(() => {
          this.deleteGuestRequest(row.guestId);
        }).catch(() => {});
      },
      // 多个删除嘉宾
      deleteMuitlGuestInfo() {
        this.showDialogTips("确认删除该信息?").then(() => {
          this.deleteGuestRequest(this.forumGuestIds.join());
        }).catch(() => {});
      },
      /*
        页面事件处理
       */
      // 表单重置
      resetSearchForm() {
        this.searchForm.guestName = '';
        this.searchForm.orgName = '';
        this.searchForm.current = 1;
      },
      // 分页信息处理
      handleSizeChange(pageSize) {
        this.searchForm.size = pageSize;
        this.getGuestList();
      },
      handleCurrentChange(currentPage) {
        this.searchForm.current = currentPage;
        this.getGuestList();
      },
      // 选择事件
      handleTabSelectAll(val) {
        this.forumGuestIds = [];
        for (let i = 0, length = val.length; i < length; i++) {
          this.forumGuestIds.push(val[i].guestId);
        }
        if (this.forumGuestIds.length <= 0) {
          this.deleteBtn = true;
        } else {
          this.deleteBtn = false;
        }

      },
      handleSelectionChange(val) {
        this.forumGuestIds = [];
        for (let i = 0, length = val.length; i < length; i++) {
          this.forumGuestIds.push(val[i].guestId);
        }
        if (this.forumGuestIds.length <= 0) {
          this.deleteBtn = true;
        } else {
          this.deleteBtn = false;
        }
      },
      checkboxInit(row, index) {},
      showAddDialog() {
        if (this.$refs.addGuestForm !== undefined) {
          this.$refs.addGuestForm.resetFields();
        }
        this.addDialog = true;
        this.isUpdate = false;
        this.addDialogTitle = '新增嘉宾';
        this.addGuestForm.guestId = '';
        this.addGuestForm.guestName = '';
        this.addGuestForm.orgName = '';
        this.addGuestForm.guestPosition = '';
        this.addGuestForm.guestPhone = '';
        this.addGuestForm.guestEmail = '';
        this.addGuestForm.contactName = '';
        this.addGuestForm.contactPosition = '';
        this.addGuestForm.contactPhone = '';
        this.addGuestForm.contactEmail = '';
      },
      showUpdateDialog(row, index) {
        if (this.$refs.addGuestForm !== undefined) {
          this.$refs.addGuestForm.resetFields();
        }
        this.isUpdate = true;
        this.addDialog = true;
        this.addDialogTitle = '更新嘉宾';
        this.getGuestById(row.guestId);
      },
      // dialog确认发送数据到后台
      confirmPutGuestData() {
        this.$refs["addGuestForm"].validate((valid) => {
          if (valid) {
            if (this.isUpdate) {
              this.updateGuestInfo();
            } else {
              this.addGuestInfo();
            }
          }
        });
      }
    }

  };
</script>

<style scoped>
  .container{
    margin: 10px;
  }
  .top_line{
    border-bottom: 1px solid #cdcdcd;
    margin-left: 20px;
  }
  .top_line .title {
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid #8a8a8a;
  }
  .dialog_item{
    width: 300px;
  }
  .pagination{
    margin: 10px auto;
    text-align: center;
  }
  .btn-row{
    margin-left: 20px;
    margin-bottom: 20px;
  }
</style>
<style>
  .el-dialog__body{
    padding: 20px 0;
    border-top: 1px solid #cccccc;
  }
  .table{
    width: 98%;
    margin:0 20px;
  }
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 42px;
  }
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
  }
</style>
