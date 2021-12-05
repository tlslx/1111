/**
* @file 广交会-归属单位管理
* @author:zhangwenjian
* @date:2019/2/26
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">{{source.language.unitManagement}}</span></p>
    <el-form :inline="true" :model="searchForm" class="demo-ruleForm">
      <el-form-item :label="source.language.unit" size="mini">
        <el-input v-model.trim="searchForm.ascriptionUnitName" :placeholder="source.language.pleaseEnterContent"></el-input>
      </el-form-item>
      <el-form-item :label="source.language.status" size="mini">
        <el-select v-model="searchForm.status" :placeholder="source.language.pleaseSelect">
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="handleSearch()">{{source.language.query}}</el-button>
        <el-button type="primary" @click="resetSearchForm()">{{source.language.reset}}</el-button>
      </el-form-item>
    </el-form>
    <el-row class="btn-row">
      <el-button type="primary" @click="openAddDialog()">{{source.language.add}}</el-button>
      <el-button type="warning" :disabled="deleteBtn" @click="handleMuitlDelete()">{{source.language.delete}}</el-button>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="listDatas"
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
        prop="ascriptionUnitName"
        :label="source.language.unit"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ascriptionOrder"
        :label="source.language.sort"
        align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        :label="source.language.status"
        align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isEnable === 0">{{source.language.enable}}</span>
          <span v-if="scope.row.isEnable === 1">{{source.language.disable}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="source.language.operation"
        align="center"
        fixed="right">
        <template slot-scope="scope">
          <el-button  type="text" size="mini" v-if="scope.row.isEnable === 0" @click="handleforbidden(scope.row, scope.index)">{{source.language.disable}}</el-button>
          <el-button  type="text" size="mini" v-if="scope.row.isEnable === 1" @click="handleStartUse(scope.row, scope.index)">{{source.language.enable}}</el-button>
          <el-button  type="text" size="mini" @click="openUpdateDialog(scope.row, scope.index)">{{source.language.update}}</el-button>
          <el-button  type="text" size="mini" @click="handleSingleDelete(scope.row, scope.index)">{{source.language.delete}}</el-button>
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

    <el-dialog :title="addDialogTitle" :visible.sync="addDialog" :close-on-click-modal="false"  width="400px">
      <el-form :model="addForm" label-position="right" ref="addForm" :rules="rules" label-width="110px">
        <el-form-item :label="source.language.unit"   size="mini" prop="ascriptionUnitName">
          <el-input type="text" maxlength="50" v-model.trim="addForm.ascriptionUnitName" :placeholder="source.language.pleaseEnterContent" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item :label="source.language.sort"  size="mini" prop="ascriptionOrder">
          <el-input  maxlength="10" v-model.trim="addForm.ascriptionOrder" :placeholder="source.language.pleaseEnterContent" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item :label="source.language.status" size="mini" prop="isEnable">
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
    name: "labelManage",
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
        isSubmit: false,
        listDatas: [],
        totalDatas: 0,
        seletIds: [],
        deleteBtn: true,
        isAdd: false,
        addDialogTitle: '新增归属单位',
        searchForm: {
          ascriptionUnitName: '',
          status: '',
          current: 1,
          size: 10
        },
        addForm: {
          ascriptionUnitId: '',
          ascriptionUnitName: '',
          ascriptionOrder: '',
          isEnable: ''
        },
        rules: {
          ascriptionUnitName: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          ascriptionOrder: [
            { required: true, message: '请输入排序信息', trigger: 'blur' },
            { validator: validateNumber, trigger: 'blur' }
          ],
          isEnable: [
            { required: true, message: '请选择状态', trigger: 'blur' }
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
    },
    methods: {
      /*
         搜索重置事件处理
      */
      handleSearch() {
        this.searchForm.current = 1;
        this.searchListData();
      },
      // 列表数据获取
      searchListData() {
        this.$http.get(this.baseApi + '/api/customservice/forum/listAscriptionUnit', this.searchForm).then(res => {
          this.listDatas = res.records;
          this.totalDatas = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 详情数据获取
      getDetailDataById(id) {
        this.$http.get(this.baseApi + '/api/customservice/forum/getAscriptionUnit', { ascriptionUnitId: id }).then(res => {
          this.addForm.ascriptionUnitName = res.ascriptionUnitName;
          this.addForm.ascriptionOrder = res.ascriptionOrder;
          this.addForm.isEnable = res.isEnable + '';
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 表单重置
      resetSearchForm() {
        this.searchForm.ascriptionUnitName = '';
        this.searchForm.status = '';
        this.searchForm.current = 1;
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
          this.seletIds.push(val[i].ascriptionUnitId);
        }
        if (this.seletIds.length <= 0) {
          this.deleteBtn = true;
        } else {
          this.deleteBtn = false;
        }
      },
      // 分页处理
      handleSizeChange(pageSize) {
        this.searchForm.size = pageSize;
        this.searchListData();
      },
      handleCurrentChange(currentPage) {
        this.searchForm.current = currentPage;
        this.searchListData();
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
        this.addForm.ascriptionUnitId = '';
        this.addForm.ascriptionUnitName = '';
        this.addForm.ascriptionOrder = '';
        this.addForm.isEnable = '';
        this.addDialogTitle = '新增归属单位';
      },
      openUpdateDialog(row, index) {
        if (this.$refs.addForm !== undefined) {
          this.$refs.addForm.resetFields();
        }
        this.isAdd = false;
        this.addDialog = true;
        this.addDialogTitle = '更新归属单位';
        this.addForm.ascriptionUnitId = row.ascriptionUnitId;
        this.getDetailDataById(row.ascriptionUnitId);
      },
      confirmSendAddForm() {
        this.$refs["addForm"].validate((valid) => {
          if (valid) {
            if (!this.isSubmit) {
              this.isSubmit = true;
              if (this.isAdd) {
                this.addDataByForm();
              } else {
                this.updateDataById();
              }
            } else {
              this.$message.warning("请勿重复提交!");
            }
          }
        });
      },
      // 增加
      addDataByForm() {
        this.$http.postJson(this.baseApi + '/api/customservice/forum/saveAscriptionUnit', this.addForm).then(res => {
          this.$message.success("新增成功");
          this.addDialog = false;
          this.searchListData();
          this.isSubmit = false;
        }).catch(error => {
          this.$message.error(error);
          this.isSubmit = false;
        });
      },
      // 更新
      updateDataById() {
        this.$http.postJson(this.baseApi + '/api/customservice/forum/updateAscriptionUnit', this.addForm).then(res => {
          this.$message.success("更新成功");
          this.addDialog = false;
          this.isSubmit = false;
          this.searchListData();
        }).catch(error => {
          this.$message.error(error);
          this.isSubmit = false;
        });
      },

      /*
        禁用/启用弹框及数据处理
       */
      handleforbidden(row, index) {
        this.showDialogTips("确认禁用该单位?").then(() => {
          this.startForbiddenRequest(row.ascriptionUnitId, 1);
        }).catch(() => {});
      },
      handleStartUse(row, index) {
        this.showDialogTips("确认启用该单位?").then(() => {
          this.startForbiddenRequest(row.ascriptionUnitId, 0);
        }).catch(() => {});
      },
      // 更新禁用 启用状态  0：启用  1：禁用
      startForbiddenRequest(id, status) {
        this.$http.post(this.baseApi + '/api/customservice/forum/updateAscriptionUnitStatus', {
          ascriptionUnitId: id,
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
        this.showDialogTips("确认删除该数据?").then(() => {
          this.deleteRequest(row.ascriptionUnitId);
        }).catch(() => {});
      },
      handleMuitlDelete() {
        this.showDialogTips("确认删除所选数据?").then(() => {
          this.deleteRequest(this.seletIds.join());
        }).catch(() => {});
      },
      // 通过id删除信息
      deleteRequest(ids) {
        this.$http.post(this.baseApi + '/api/customservice/forum/deleteAscriptionUnits', { ascriptionUnitIds: ids }).then(res => {
          this.$message.success("删除成功!");
          this.searchListData();
        }).catch(error => {
          this.$message.error(error);
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

