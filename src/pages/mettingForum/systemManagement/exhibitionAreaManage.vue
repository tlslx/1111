/**
* @file 广交会-展区管理
* @author:zhangwenjian
* @date:2019/2/26
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">{{source.language.exhibitionManagement}}</span></p>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
      <el-form-item :label="source.language.industryName" size="mini" label-width="90px">
        <el-input v-model.trim="ruleForm.industryName" :placeholder="source.language.pleaseSelect"></el-input>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="handleSearch()">{{source.language.query}}</el-button>
        <el-button type="primary" @click="resetSearchForm()">{{source.language.reset}}</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button type="primary" @click="openAddDialog()">{{source.language.add}}</el-button>
    </el-row>
    <template>
      <el-table
        :data="listDatas"
        stripe
        style="width: 100%">
        <el-table-column type="expand" width="50">
          <template slot-scope="props">
            <el-table
              class="table"
              :data="props.row.exhibitions"
              :show-header=false>
              <el-table-column
                :label="source.language.index"
                type="index"
                width="80">
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                :label="source.language.industry  + '/' +source.language.exhibition"
                align="center">
                <template slot-scope="scope"><span style="margin-right: 28px">{{scope.row.exhibitionName}}</span></template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                :label="source.language.sort"
                align="center">
                <template slot-scope="scope" ><span style="margin-right: 4px">{{scope.row.exhibitionOrder}}</span></template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                :label="source.language.status"
                align="center">
                <template slot-scope="scope" >
                  <div style="margin-left: 26px" v-if="scope.row.isEnable === 0"> {{source.language.enable}}</div>
                  <div style="margin-left: 26px" v-else-if="scope.row.isEnable === 1">{{source.language.disable}}</div>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                :label="source.language.operation"
                width="220"
                align="center">
                <template slot-scope="scope">
                  <div style="margin-left: 64px">
                    <el-button type="text" @click.stop="handleforbidden(scope.row, scope.index)" v-if="scope.row.isEnable === 0">{{source.language.disable}}</el-button>
                    <el-button type="text" @click.stop="handleStartUse(scope.row, scope.index)" v-else-if="scope.row.isEnable === 1">{{source.language.enable}}</el-button>
                    <el-button type="text" @click.stop="openUpdateDialog(scope.row, scope.index)">{{source.language.update}}</el-button>
                    <el-button type="text" @click.stop="handleSingleDelete(scope.row, scope.index)">{{source.language.delete}}</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          :label="source.language.index"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          :label="source.language.industry  + '/' + source.language.exhibition"
          prop="industryName"
          align="center">
        </el-table-column>
        <el-table-column
          :label="source.language.sort"
          align="center"
          prop="industryOrder">
        </el-table-column>
        <el-table-column
          :label="source.language.status"
          align="center">
          <template slot-scope="scope" >
            <div v-if="scope.row.isEnable === 0"> {{source.language.enable}}</div>
            <div v-else-if="scope.row.isEnable === 1">{{source.language.disable}}</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="source.language.operation"
          align="center"
          width="250">
        </el-table-column>
      </el-table>
      <el-pagination
        background
        class="pagination"
        @size-change="handleRepeatListSizeChange"
        @current-change="handleRepeatListCurrentChange"
        :current-page.sync="ruleForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="ruleForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalDatas"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
    </template>

    <el-dialog :title="addDialogTitle" :visible.sync="addDialog" :close-on-click-modal="false"  width="400px">
      <el-form :model="addForm" label-position="right" ref="addForm" :rules="rules" label-width="110px">
        <el-form-item :label="source.language.exhibitionName"  size="mini" prop="exhibitionName">
          <el-input type="text" maxlength="50" v-model.trim="addForm.exhibitionName" :placeholder="source.language.pleaseEnterContent" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item :label="source.language.sort"  size="mini" prop="exhibitionOrder">
          <el-input  maxlength="10" v-model.trim="addForm.exhibitionOrder" :placeholder="source.language.pleaseEnterContent"class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item :label="source.language.industryUnit"  size="mini" prop="industryId">
          <el-select v-model="addForm.industryId" :placeholder="source.language.pleaseSelect" class="dialog_item">
            <el-option v-for="(profession,index) in allProfessions" :key="index" :label="profession.industryName" :value="profession.industryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="source.language.isEnable"  size="mini" prop="isEnable">
          <el-select v-model="addForm.isEnable" :placeholder="source.language.pleaseSelect" class="dialog_item">
            <el-option label="启用" value="0"></el-option>
            <el-option label="禁用" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="confirmSendAddForm()">{{source.language.confirm}}</el-button>
        <el-button @click="addDialog = false">{{source.language.cancel}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import dialogMixin from '@/components/project/mixins/mettingForumDialogMixin';
  export default {
    name: "exhibitionAreaManage",
    mixins: [dialogMixin],
    data() {
      const validateNumber = (rule, value, callback) => {
        let MOBILE = /^[0-9]\d*$/;
        if (!MOBILE.test(value)) {
          return callback(new Error("请输入0或正整数"));
        } else {
          return callback();
        }
      };
      return {
        source: {
          language: []
        },
        addDialog: false,
        listDatas: [],
        totalDatas: 0,
        seletIds: [],
        ruleForm: {
          industryName: '',
          current: 1,
          size: 10
        },
        isAdd: false,
        addDialogTitle: '新增展区',
        addForm: {
          exhibitionId: '',
          industryId: '',
          exhibitionName: '',
          exhibitionOrder: '',
          isEnable: 0
        },
        allProfessions: [],
        rules: {
          exhibitionName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          exhibitionOrder: [
            { required: true, message: '请输入排序信息', trigger: 'blur' },
            { validator: validateNumber, trigger: 'blur' }
          ],
          isEnable: [
            { required: true, message: '请选择状态', trigger: 'blur' }
          ],
          industryId: [
            { required: true, message: '请选择行业', trigger: 'blur' }
          ]
        },
        baseApi: process.env.API_FF_URL
      };
    },
    async created() {
      this.source.language = await kindo.util.getLanguage('MettingForumLang');
    },
    mounted() {
      this.searchListData();
      this.getProfessionList();
    },
    methods: {
      /*
         搜索重置事件处理
      */
      // 列表数据获取
      searchListData(flag) {
        if (flag === '1') {
          this.ruleForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/forum/listExhibition', this.ruleForm).then(res => {
          this.listDatas = res.records;
          this.totalDatas = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 详情数据获取
      getDetailDataById(id) {
        this.$http.get(this.baseApi + '/api/customservice/forum/getExhibition', { exhibitionId: id }).then(res => {
          this.addForm.exhibitionName = res.exhibitionName;
          this.addForm.exhibitionOrder = res.exhibitionOrder;
          this.addForm.industryId = res.industryId;
          this.addForm.isEnable = res.isEnable + '';
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 列表数据获取
      getProfessionList() {
        this.$http.get(this.baseApi + '/api/customservice/forum/listIndustry', { size: 30 }).then(res => {
          this.allProfessions = res.records;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      handleSearch() {
        this.searchListData();
        this.ruleForm.current = 1;
      },
      // 表单重置
      resetSearchForm() {
        this.ruleForm.industryName = '';
        this.ruleForm.current = 1;
      },

      /*
        新增修改弹框及数据处理
       */
      openAddDialog() {
        if (this.$refs.addForm !== undefined) {
          this.$refs.addForm.resetFields();
        }
        this.isAdd = true;
        this.addDialog = true;
        this.addForm.exhibitionName = '';
        this.addForm.exhibitionOrder = '';
        this.addForm.isEnable = '';
        this.addForm.industryId = '';
        this.addForm.exhibitionId = '';
        this.addDialogTitle = '新增展区';
      },
      openUpdateDialog(row, index) {
        if (this.$refs.addForm !== undefined) {
          this.$refs.addForm.resetFields();
        }
        this.isAdd = false;
        this.addDialog = true;
        this.addDialogTitle = '更新展区';
        this.addForm.exhibitionName = '';
        this.addForm.exhibitionOrder = '';
        this.addForm.isEnable = '';
        this.addForm.industryId = '';
        this.addForm.exhibitionId = row.exhibitionId;
        this.getDetailDataById(row.exhibitionId);
      },
      confirmSendAddForm() {
        this.$refs["addForm"].validate((valid) => {
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
        this.$http.postJson(this.baseApi + '/api/customservice/forum/saveExhibition', this.addForm).then(res => {
          this.$message.success("新增成功");
          this.addDialog = false;
          this.searchListData();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 更新
      updateDataById() {
        this.$http.postJson(this.baseApi + '/api/customservice/forum/updateExhibition', this.addForm).then(res => {
          this.$message.success("更新成功");
          this.addDialog = false;
          this.searchListData();
        }).catch(error => {
          this.$message.error(error);
        });
      },

      /*
        禁用/启用弹框及数据处理
       */
      handleforbidden(row, index) {
        this.showDialogTips("确认禁用?").then(() => {
          this.startForbiddenRequest(row.exhibitionId, 1);
        }).catch(() => {});
      },
      handleStartUse(row) {
        this.showDialogTips("确认启用?").then(() => {
          this.startForbiddenRequest(row.exhibitionId, 0);
        }).catch(() => {});
      },
      // 更新禁用 启用状态  0：启用  1：禁用
      startForbiddenRequest(id, status) {
        this.$http.post(this.baseApi + '/api/customservice/forum/updateExhibitionStatus', {
          exhibitionId: id,
          status: status
        }).then(res => {
          this.searchListData();
          if (status === 0) {
            this.$message.success("启用成功!");
          } else {
            this.$message.success("禁用成功!");
          }
        }).catch(error => {
          this.$message.error(error);
        });
      },

      /*
        单个/批量删除弹框及数据处理
       */
      handleSingleDelete(row, index) {
        this.showDialogTips("确认删除?").then(() => {
          this.deleteRequest(row.exhibitionId);
        }).catch(() => {});
      },
      // 通过id删除信息
      deleteRequest(ids) {
        this.$http.post(this.baseApi + '/api/customservice/forum/deleteExhibition', { exhibitionId: ids }).then(res => {
          this.$message.success("删除成功");
          this.searchListData();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      handleRepeatListSizeChange(pageSize) {
        this.ruleForm.size = pageSize;
        this.searchListData();
      },
      handleRepeatListCurrentChange(currentPage) {
        this.ruleForm.current = currentPage;
        this.searchListData();
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
  .dialog-footer{
    text-align: center;
    margin-top: 10px;
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
  .el-table__expanded-cell[class*=cell] {
    padding: 0px 50px;
  }
</style>

