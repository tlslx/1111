/**
* @file 广交会-会议赞助管理
* @author:zhangwenjian
* @date:2019/2/26
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">{{source.language.sponsorManagement}} </span></p>
    <el-row class="btn-row">
      <el-button type="primary" @click="addSponsorDialog()" >{{source.language.add}}</el-button>
      <el-button type="warning" :disabled="deleteBtn" @click="deleteMutilData()" >{{source.language.delete}}</el-button>
    </el-row>
    <el-table
      ref="multipleTable"
      class="table"
      :data="sponsorsData"
      border
      @select-all="handleTabSelectAll"
      @selection-change="handleSelectionChange"
      style="width: 100%;">
      <el-table-column
        type="selection"
        label="序号"
        width="80">
      </el-table-column>

      <el-table-column
        prop="supportLevel"
        :label="source.language.sponsorLevel"
        align="center">
      </el-table-column>
      <el-table-column
        prop="supportCost"
        :label="source.language.sponsorForumCost"
        align="center">
      </el-table-column>
      <el-table-column
        prop="supportRight"
        :label="source.language.sponsorProfit"
        align="center">
      </el-table-column>
      <el-table-column
        :label="source.language.operation"
        align="center"
        fixed="right"
        width="200">
        <template slot-scope="scope">
          <el-button  type="text" size="mini" @click="updateSponsorDialog(scope.row,scope.index)">{{source.language.update}}</el-button>
          <el-button  type="text" size="mini" @click="deleteSponsor(scope.row,scope.index)">{{source.language.delete}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageInfo.current"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageInfo.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalDatas"
      prev-text="上一页"
      next-text="下一页">
    </el-pagination>

    <el-dialog :title="addDialogTitle" :visible.sync="addDialog" :close-on-click-modal="false" width="400px">
      <el-form :model="addSponsorForm" ref="addSponsorForm" :rules="rules" label-position="right"  :inline="true" style="text-align: center">
        <el-form-item :label="source.language.sponsorLevel" label-width="100" size="small" prop="supportLevel">
          <el-input maxlength="2"  v-model.trim="addSponsorForm.supportLevel" :placeholder="source.language.pleaseEnterContent" style="width: 230px"></el-input>
        </el-form-item>
        <el-form-item :label="source.language.sponsorForumCost" label-width="100" size="small" prop="supportCost">
          <el-input maxlength="14"  v-model.trim="addSponsorForm.supportCost" :placeholder="source.language.pleaseEnterContent" style="width: 230px"></el-input>
        </el-form-item>
        <el-form-item :label="source.language.sponsorProfit" label-width="100" size="small" prop="supportRight">
          <el-input type="text" maxlength="50"  v-model.trim="addSponsorForm.supportRight" :placeholder="source.language.pleaseEnterContent" style="width: 230px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center" >
        <el-button type="primary" @click="confirmSendAddForm">{{source.language.confirm}}</el-button>
        <el-button @click="addDialog = false">{{source.language.cancel}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
    import dialogMixin from '@/components/project/mixins/mettingForumDialogMixin';
    export default {
      name: "sponsorsManage",
      mixins: [dialogMixin],
      data() {
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
        const check100 = (rule, value, callback) => {
          let reg = /^(?:0|[1-9][0-9]?|99)$/;
          let match = reg.test(value);
          if (!match) {
            return callback(new Error('只能输入2位及2位以内的数字!'));
          } else {
            return callback();
          }
        };
        const checkFee = (rule, value, callback) => {
          let reg = /^\d+(\.\d+)?$/;
          let match = reg.test(value);
          if (!match) {
            return callback(new Error('请输入数字类型!'));
          }
          let decimal = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/;
          let matchDecimal = decimal.test(value);
          if (!matchDecimal) {
            return callback(new Error('只能保留两位小数!'));
          }
          let data = (value + '').split('.')[0];
          if (data.length > 10) {
            return callback(new Error('输入的数字过大!'));
          }
          return callback();
        };
        return {
          source: {
            language: []
          },
          sponsorsData: [],
          addDialog: false,
          addDialogTitle: '新增赞助商',
          isAdd: false,
          selectIds: [],
          totalDatas: 0,
          deleteBtn: true,

          pageInfo: {
            current: 1,
            size: 10
          },
          addSponsorForm: {
            supportPlanId: '',
            supportLevel: '',
            supportCost: '',
            supportRight: ''
          },
          rules: {
            supportLevel: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: check100, trigger: 'blur' }
            ],
            supportCost: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: checkFee, trigger: 'blur' }
            ],
            supportRight: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: validateSpecial, trigger: 'blur' }
            ]
          },
          baseApi: process.env.API_FF_URL
        };
      },
      async created() {
        this.source.language = await kindo.util.getLanguage('MettingForumLang');
      },
      mounted() {
        this.getSponsorsList();
      },
      methods: {
        handleSearch() {
          this.pageInfo.current = 1;
          this.getSponsorsList();
        },
        // 获取赞助管理列表
        getSponsorsList() {
          this.$http.get(this.baseApi + '/api/customservice/forum/listSupportPlan', this.pageInfo).then(res => {
            this.sponsorsData = res.records;
            this.totalDatas = res.total;
          }).catch(error => {
            this.$message.error(error);
          });
        },
        // 获取赞助详情
        getSponsorsInfo(supportPlanId) {
          this.$http.get(this.baseApi + '/api/customservice/forum/getSupportPlan', { supportPlanId: supportPlanId }).then(res => {
            this.addSponsorForm.supportCost = res.supportCost;
            this.addSponsorForm.supportLevel = res.supportLevel;
            this.addSponsorForm.supportRight = res.supportRight;
          }).catch(error => {
            this.$message.error(error);
          });
        },
        // 新增赞助商
        addSponsorDialog() {
          if (this.$refs.addSponsorForm !== undefined) {
            this.$refs.addSponsorForm.resetFields();
          }
          this.addSponsorForm.supportPlanId = '';
          this.addSponsorForm.supportCost = '';
          this.addSponsorForm.supportLevel = '';
          this.addSponsorForm.supportRight = '';
          this.addDialog = true;
          this.isAdd = true;
          this.addDialogTitle = "新增赞助商";
        },
        // 更新赞助商弹框
        updateSponsorDialog(row, index) {
          if (this.$refs.addSponsorForm !== undefined) {
            this.$refs.addSponsorForm.resetFields();
          }
          this.addDialog = true;
          this.isAdd = false;
          this.addDialogTitle = "更新赞助商";
          this.addSponsorForm.supportPlanId = row.supportPlanId;
          this.getSponsorsInfo(row.supportPlanId);
        },
        confirmSendAddForm() {
          this.$refs["addSponsorForm"].validate((valid) => {
            if (valid) {
              if (this.isAdd) {
                this.addDataByForm();
              } else {
                this.updateDataById();
              }
            }
          });
        },
        // 增加
        addDataByForm() {
          this.$http.postJson(this.baseApi + '/api/customservice/forum/saveSupportPlan', this.addSponsorForm).then(res => {
            this.$message.success("新增成功!");
            this.addDialog = false;
            this.getSponsorsList();
          }).catch(error => {
            this.$message.error(error);
          });
        },
        // 更新
        updateDataById() {
          this.$http.postJson(this.baseApi + '/api/customservice/forum/updateSupportPlan', this.addSponsorForm).then(res => {
            this.$message.success("更新成功!");
            this.addDialog = false;
            this.getSponsorsList();
          }).catch(error => {
            this.$message.error(error);
          });
        },

        // 删除赞助商
        deleteSponsor(row, index) {
          this.showDialogTips("确认删除该信息?").then(() => {
            this.$http.post(this.baseApi + '/api/customservice/forum/deleteSupportPlans', { supportPlanIds: row.supportPlanId }).then(res => {
              this.$message.success("删除成功!");
              this.getSponsorsList();
            }).catch(error => {
              this.$message.error(error);
            });
          }).catch(() => {});
        },
        deleteMutilData() {
          this.showDialogTips("确认删除所选信息?").then(() => {
            this.$http.post(this.baseApi + '/api/customservice/forum/deleteSupportPlans', { supportPlanIds: this.seletIds.join() }).then(res => {
              this.$message.success("删除成功!");
              this.getSponsorsList();
            }).catch(error => {
              this.$message.error(error);
            });
          }).catch(() => {});
        },
        /*
           分页处理
         */
        handleSizeChange(pageSize) {
          this.pageInfo.size = pageSize;
          this.getSponsorsList();
        },
        handleCurrentChange(currentPage) {
          this.pageInfo.current = currentPage;
          this.getSponsorsList();
        },
        /*
         列表选择及分页处理函数
        */
        handleTabSelectAll(val) {
          this.pushSelectIds(val);
        },
        handleSelectionChange(val) {
          this.pushSelectIds(val);
        },
        pushSelectIds(val) {
          this.seletIds = [];
          for (let i = 0, length = val.length; i < length; i++) {
            this.seletIds.push(val[i].supportPlanId);
          }
          if (this.seletIds.length <= 0) {
            this.deleteBtn = true;
          } else {
            this.deleteBtn = false;
          }
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
    width: 230px;
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
