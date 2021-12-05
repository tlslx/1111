/**
 * @file 工作领导小组成员通信录
 * @date:2019/6/12
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="工作领导小组成员通信录" name="first">
      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item label="届数" prop="exhibitionNum">
          <el-select placeholder="请选择" v-model="queryForm.exhibitionNum" @change="exhibitNumChange">
            <el-option v-for="item in this.exhibitonNumListAll" :key="item.exhibitionNum" :label="item.exhibitionNum"
              :value="item.exhibitionNum"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位名称" prop="unitChineseName">
          <el-input placeholder="请输入" v-model="queryForm.unitChineseName" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入" v-model="queryForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="cellphoneNumber">
          <el-input placeholder="请输入" v-model="queryForm.cellphoneNumber" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery('queryForm')">查 询</el-button>
        </el-form-item>
      </el-form>

      <div class="above-table">
        <el-button type="text" class="download" @click="downloadList">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border :data="pageByConditionData.records" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="unitChineseName" label="单位名称"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="job" label="职务"></el-table-column>
        <el-table-column prop="cellphoneNumber" label="手机"></el-table-column>
        <el-table-column prop="workNumber" label="办公电话"></el-table-column>
        <el-table-column prop="fax" label="传真"></el-table-column>
        <el-table-column prop="email" label="电子邮箱"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleMod(scope.row)" :disabled="!exhibitCurrent">修改</el-button>
            <el-button type="text" @click="handleDel(scope.row.memberContactId)" :disabled="!exhibitCurrent">删除</el-button>
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
          :total="{}.total">
        </el-pagination>
      </el-row>
      <el-row>
        <el-button type="primary" @click="selectDel" :disabled="!exhibitCurrent">批量删除</el-button>
        <el-button type="primary" @click="showAdd" :disabled="!exhibitCurrent">新增成员名单</el-button>
      </el-row>

      <el-dialog title="新增成员名单" :visible.sync="addVis" @close="closeAdd">
        <el-form :model="addForm" ref="addForm" :rules="rules">
          <el-form-item label="单位名称" prop="unitChineseName">
            <!-- <el-input v-model="addForm.unitChineseName"></el-input> -->
            <el-select v-model="addForm.unitChineseName" filterable remote reserve-keyword placeholder="请输入单位名称关键词"
              :remote-method="remoteMethodAdd">
              <el-option v-for="item in optionsAdd" :key="item.memberOrgId" :label="item.orgName" :value="item.orgName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="name"><el-input v-model="addForm.name"></el-input></el-form-item>
          <el-form-item label="职务" prop="job"><el-input v-model="addForm.job"></el-input></el-form-item>
          <el-form-item label="手机" prop="cellphoneNumber"><el-input v-model="addForm.cellphoneNumber"></el-input></el-form-item>
          <el-form-item label="办公电话" prop="workNumber"><el-input v-model="addForm.workNumber"></el-input></el-form-item>
          <el-form-item label="传真" prop="fax"><el-input v-model="addForm.fax"></el-input></el-form-item>
          <el-form-item label="电子邮箱" prop="email"><el-input v-model="addForm.email"></el-input></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitAddForm('addForm')">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="编辑成员名单" :visible.sync="editVis" @close="closeAdd">
        <el-form :model="editForm" ref="editForm" :rules="rules">
          <el-form-item label="单位名称" prop="unitChineseName">
            <!-- <el-input v-model="editForm.unitChineseName"></el-input> -->
            <el-select v-model="editForm.unitChineseName" filterable remote reserve-keyword placeholder="请输入关键词"
              :remote-method="remoteMethodEdit">
              <el-option v-for="item in optionsEdit" :key="item.memberOrgId" :label="item.orgName" :value="item.orgName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="name"><el-input v-model="editForm.name"></el-input></el-form-item>
          <el-form-item label="职务" prop="job"><el-input v-model="editForm.job"></el-input></el-form-item>
          <el-form-item label="手机" prop="cellphoneNumber"><el-input v-model="editForm.cellphoneNumber"></el-input></el-form-item>
          <el-form-item label="办公电话" prop="workNumber"><el-input v-model="editForm.workNumber"></el-input></el-form-item>
          <el-form-item label="传真" prop="fax"><el-input v-model="editForm.fax"></el-input></el-form-item>
          <el-form-item label="电子邮箱" prop="email"><el-input v-model="editForm.email"></el-input></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitEditForm('editForm')">确 定</el-button>
        </span>
      </el-dialog>

    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    let telephone = (rule, value, callback) => {
      let phoneTest = this.$store.state.common.CHECK_CONST_DATA.telephone;
      if (!phoneTest.test(value)) {
        return callback(new Error("请输入正确格式的电话号码"));
      }
      return callback();
    };
    let email = (rule, value, callback) => {
      let phoneTest = this.$store.state.common.CHECK_CONST_DATA.email;
      if (!phoneTest.test(value)) {
        return callback(new Error("请输入正确格式的邮箱"));
      }
      return callback();
    };
    return {
      activeName: 'first', exhibitCurrent: true, // 是否为当前展届
      queryForm: { exhibitionNum: '', unitChineseName: '', name: '', cellphoneNumber: '' },
      pageInfoData: { currentPage: 1, pageSize: 10 },
      addVis: false, editVis: false,
      addForm: { unitChineseName: '', name: '', job: '', cellphoneNumber: '', workNumber: '', fax: '', email: '' },
      editForm: {}, // 编辑用
      rules: {
        unitChineseName: [{ required: true, message: '请输入', trigger: 'blur' }],
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        job: [{ required: true, message: '请输入', trigger: 'blur' }],
        cellphoneNumber: [{ required: true, message: '请输入', trigger: 'blur' }, { validator: telephone, trigger: "blur" }],
        workNumber: [{ required: true, message: '请输入', trigger: 'blur' }],
        fax: [{ required: true, message: '请输入', trigger: 'blur' }],
        email: [{ required: true, message: '请输入', trigger: 'blur' }, { validator: email, trigger: "blur" }]
      },
      selectArr: [], // 批量数组
      optionsAdd: [], // 模糊查询
      optionsEdit: [] // 模糊查询
    };
  },
  computed: {
    ...mapGetters('leaderGroup', ['pageByConditionData', 'contactByNameData']),
    // 1.列表
    ...mapGetters('subEnterpriseManage', ['exhibitonNumListAll']),
    queryParams() {
      let obj = this.queryForm;
      obj.current = this.pageInfoData.currentPage;
      obj.size = this.pageInfoData.pageSize;
      return obj;
    },
    companyAddParams() {
      return {
        orgName: '',
        exhibitionNum: this.queryForm.exhibitionNum
      };
    },
    companyEditParams() {
      return {
        orgName: '',
        exhibitionNum: this.queryForm.exhibitionNum
      };
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
      this.getPageByCondition(this.queryParams); // 查询列表
    }); // 届数
  },
  methods: {
    ...mapActions('leaderGroup', ['getPageByCondition', 'postAddContact', 'postEditContact', 'postContactDeleteById',
      'postContactDeleteByIds', 'getContactByName']),
    // 1.列表 最后：查询企业名称
    ...mapActions('subEnterpriseManage', ['getExhibitionNumListAll']),
    remoteMethodAdd(query) {
      if (query !== '') {
        this.companyAddParams.orgName = query;
        this.getContactByName(this.companyAddParams).then(res => {
          this.optionsAdd = res;
        }).catch(() => {
          this.optionsAdd = [];
        });
      } else {
        this.optionsAdd = [];
      }
    },
    remoteMethodEdit(query) {
      if (query !== '') {
        this.companyEditParams.orgName = query;
        this.getContactByName(this.companyEditParams).then(res => {
          this.optionsEdit = res;
        }).catch(() => {
          this.optionsEdit = [];
        });
      } else {
        this.optionsEdit = [];
      }
    },

    closeAdd() {
      for (const key in this.addForm) {
        this.addForm[key] = '';
      }
    },
    showAdd() {
      this.addVis = true;
    },
    submitAddForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addForm.exhibitionNum = this.queryForm.exhibitionNum;
          this.postAddContact(this.addForm).then(() => {
            this.$message.success('提交成功');
            this.$refs[formName].resetFields(); // 清空表单
            this.addVis = false;
            this.getPageByCondition(this.queryParams); // 查询列表
          }).catch(() => {
            this.$message.error('提交失败');
          }); // 提交
        } else {
          this.$message.error('请将表单写完整');
        }
      });
    },

    handleMod(row) {
      this.editVis = true;
      this.editForm = JSON.parse(JSON.stringify(row)); // 给编辑菜单赋值
    },
    submitEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postEditContact(this.editForm).then(() => {
            this.$message.success('修改成功');
            this.$refs[formName].resetFields(); // 清空表单
            this.editVis = false;
            this.getPageByCondition(this.queryParams); // 查询列表
          }).catch(() => {
            this.$message.error('修改失败');
          }); // 提交
        } else {
          this.$message.error('请将表单写完整');
        }
      });
    },
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupMemberContact/downloadContact?${this.encodeSearchParams(this.queryForm)}`);
    },
    handleQuery() { // 查询列表
      this.getPageByCondition(this.queryParams); // 查询列表
    },
    handleQueryReset() {
      this.pageInfoData = { currentPage: 1, pageSize: 10 };
      this.getPageByCondition(this.queryParams);
    },
    handleDel(id) {
      this.$confirm('是否确认删除此条数据?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消'
      }).then(() => {
        this.postContactDeleteById({ memberContactId: id }).then(() => {
          this.$message.success('删除成功');
          this.getPageByCondition(this.queryParams); // 查询列表
        }).catch(() => {
          this.$message.error('删除失败');
        });
      });
    },
    handleSelectionChange(val) { // 手动勾选的
      // console.log(val, '批量');
      this.selectArr = [];
      val.forEach(ele => {
        this.selectArr.push(ele.memberContactId);
      });
    },
    selectDel() { // 批量删除
      this.$confirm('是否确认批量删除?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消'
      }).then(() => {
        this.postContactDeleteByIds(this.selectArr).then(() => {
          this.$message.success('删除成功');
          this.getPageByCondition(this.queryParams); // 查询列表
          this.selectArr = [];
        }).catch(() => {
          this.$message.error('删除失败');
        });
      });
    },

    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getPageByCondition(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getPageByCondition(this.queryParams);
    },
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
