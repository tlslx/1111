/**
* @file 箱号列表
* @author:heli
* @date:2019/3/29
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="箱号列表" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="箱号:" size="mini" prop="boxNo">
          <el-input v-model="ruleForm.boxNo"></el-input>
        </el-form-item>
        <el-form-item label="届数:" size="mini" prop="exhibitionNum">
          <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择" @change="handleExhibitionNumChange">
            <el-option v-for="item in this.exhibitonNumListAll" :key="item.exhibitionNum" :value="item.exhibitionNum"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="queryPayment()">查询</el-button>
        </el-form-item>
        <el-row size="mini">
          <el-button type="primary" @click="boxAdd">新增</el-button>
        </el-row>
      </el-form>

      <el-table :data="tableData" @selection-change="handleSelectionChange" border @select="handleSelection">
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          prop="boxNo"
          label="箱号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="exhibitionNum"
          label="届数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="companyNameCh"
          label="参展商名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="crNameCh"
          label="国别/地区"
          align="center">
        </el-table-column>
        <el-table-column
          prop="sourceArea"
          label="原产地"
          align="center">
        </el-table-column>
        <el-table-column
          prop="pavilionCode"
          label="展馆/展台号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="totalNum"
          label="总件数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="logisticsCpName"
          label="运输公司名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="logisticsCpContact"
          label="运输联系人"
          align="center">
        </el-table-column>
        <el-table-column
          prop="logisticsCpFixed"
          label="联系电话"
          align="center">
        </el-table-column>
        <el-table-column
          prop="logisticsCpPhone"
          label="手机"
          align="center">
        </el-table-column>
        <el-table-column
          prop="logisticsCpMail"
          label="邮箱"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作" width="200"
          fixed="right">
          <template slot-scope="scope">
            <el-button @click="editBoxList(scope.row, scope.$index)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteBoxList(scope.row, scope.$index)" type="text" size="small">删除</el-button>
            <el-button @click="lookOver(scope.row, scope.$index)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button type="primary" style="margin-top:10px;" @click="pointsUpload">生成运输备案表</el-button>
      <div class="block" style="float:right; margin-top:10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="boxParams.size"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="boxParams.current"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"></el-pagination>
      </div>

      <el-dialog title="新增" :visible.sync="dialogVisibleAdd" width="50%">
        <el-form :model="addForm" ref="addForm" :label-width="formLabelWidth" :rules="addFormRules">
          <el-form-item label="箱号:">
            <el-col :span="12">
              <el-input v-model="addForm.boxNo"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="参展商名称:">
            <el-col :span="12">
              <el-input v-model="addForm.companyNameCh" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="国别/地区:">
            <el-col :span="12">
              <el-input v-model="addForm.crNameCh" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="原产地:">
            <el-col :span="12">
              <el-input v-model="addForm.sourceArea" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="展馆/展台号:">
            <el-col :span="12">
              <el-input v-model="addForm.pavilionCode"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="总件数:">
            <el-col :span="12">
              <el-input v-model="addForm.totalNum"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="运输公司名称:">
            <el-col :span="12">
              <el-input v-model="addForm.logisticsCpName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="运输联系人:">
            <el-col :span="12">
              <el-input v-model="addForm.logisticsCpContact"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="联系电话:" prop="logisticsCpFixed">
            <el-col :span="12">
              <el-input v-model="addForm.logisticsCpFixed"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="手机:" prop="logisticsCpPhone">
            <el-col :span="12">
              <el-input v-model="addForm.logisticsCpPhone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="邮箱:" prop="logisticsCpMail">
            <el-col :span="12">
              <el-input v-model="addForm.logisticsCpMail"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="addConfirm('addForm')">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="编辑" :visible.sync="dialogVisibleEdit" width="50%">
        <el-form :model="editForm" :label-width="formLabelWidth">
          <el-form-item label="箱号:">
            <el-col :span="12">
              <el-input v-model="editForm.boxNo" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="参展商名称:">
            <el-col :span="12">
              <el-input v-model="editForm.companyNameCh" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="国别/地区:">
            <el-col :span="12">
              <el-input v-model="editForm.crNameCh" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="原产地:">
            <el-col :span="12">
              <el-input v-model="editForm.sourceArea" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="展馆/展台号:">
            <el-col :span="12">
              <el-input v-model="editForm.pavilionCode"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="总件数:">
            <el-col :span="12">
              <el-input v-model="editForm.totalNum"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="运输公司名称:">
            <el-col :span="12">
              <el-input v-model="editForm.logisticsCpName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="运输联系人:">
            <el-col :span="12">
              <el-input v-model="editForm.logisticsCpContact"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="联系电话:" prop="logisticsCpFixed">
            <el-col :span="12">
              <el-input v-model="editForm.logisticsCpFixed"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="手机:" prop="logisticsCpPhone">
            <el-col :span="12">
              <el-input v-model="editForm.logisticsCpPhone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="邮箱:" prop="logisticsCpMail">
            <el-col :span="12">
              <el-input v-model="editForm.logisticsCpMail"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="editConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>

</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "boxNumberList",
  data() {
    return {
      activeName: 'first',
      ids: [],
      total: 0,
      addForm: {
        exhibitionNum: '',
        boxNo: '',
        crNameCh: '',
        totalNum: '',
        sourceArea: '',
        pavilionCode: '',
        companyNameCh: '',
        logisticsCpName: '',
        logisticsCpMail: '',
        logisticsCpPhone: '',
        logisticsCpFixed: '',
        logisticsCpContact: ''
      },
      editForm: {
        boxNo: '',
        crNameCh: '',
        totalNum: '',
        sourceArea: '',
        pavilionCode: '',
        companyNameCh: '',
        logisticsCpName: '',
        logisticsCpMail: '',
        logisticsCpPhone: '',
        logisticsCpFixed: '',
        logisticsCpContact: ''
      },
      expIds: [],
      idsRow: [],
      userIds: [],
      fileIds: [],
      fileList: [],
      PageSize: 0,
      PageIndex: 1,
      isShow: true,
      tableData: [],
      // companyId: "aaa",
      nowUserId: "",
      categories: [],
      remittance: '',
      currentPage: 1,
      // creatorId: "test", // 创建人
      // creatorName: "test", // 创建人
      productRecordId: '',
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      formLabelWidth: '120px',
      notificationFileId: '',
      ruleForm: {
        boxNo: '', // 箱号
        exhibitionNum: ''
      },
      boxParams: {
        "size": 10,
        "current": 1,
        "isAsc": true,
        "loginType": "0",
        // "loginId": 'aaa',
        "orderByField": "ipr.create_date"
      },
      addFormRules: { // 校验
        logisticsCpFixed: [{ required: true, message: "联系电话号不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的联系电话号"));
              }
              callback(errors);
            },
            trigger: "blur"
          }
        ],
        logisticsCpPhone: [{ required: true, message: "手机号不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的手机号"));
              }
              callback(errors);
            },
            trigger: "blur"
          }
        ],
        logisticsCpMail: [{ required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的邮箱格式"));
              }
              callback(errors);
            },
            trigger: "blur"
          }
        ]

      }
    };
  },
  computed: {
    // ...mapGetters("subEnterpriseManage", ["exhibitonNumListAll"]),
    ...mapGetters('inviteCustom', ['exhibitonNumListAll']),
    queryParams() {
      let params = this.boxParams;
      params.boxNo = this.ruleForm.boxNo;
      params.exhibitionNum = this.ruleForm.exhibitionNum;
      return params;
    }
  },
  created() {

  },
  mounted() {
    this.getExhibitionNumListAll().then(res => {
      for (let i = 0; i < this.exhibitonNumListAll.length; i++) {
        const ele = this.exhibitonNumListAll[i];
        if (ele.current) {
          this.ruleForm.exhibitionNum = ele.exhibitionNum;
          this.addForm.exhibitionNum = ele.exhibitionNum;
          return;
        }
      }
    }).then(res => {
      let queryParams = {};
      queryParams = this.boxParams;
      queryParams.boxNo = this.ruleForm.boxNo;// 箱号
      queryParams.exhibitionNum = this.ruleForm.exhibitionNum;// 届数

      this.getRecords(queryParams).then(_res => {
        this.total = _res.total;
        this.tableData = _res.records;

        // this.tableData.forEach(item => {
        //   this.companyId = item.companyId;
          // this.addForm.companyNameCh = item.companyNameCh; // 参展商名称
          // this.addForm.sourceArea = item.sourceArea; // 原产地
        // });
      });

    });
  },
  methods: {
    ...mapActions("boxNumberList", ["addRecord"]), // 新增展品运输备案
    ...mapActions("boxNumberList", ["getRecords"]), // 查看付款通知书
    ...mapActions("boxNumberList", ["removeRecord"]), // 删除展品运输备案
    ...mapActions("boxNumberList", ["updateRecord"]), // 编辑展品运输备案
    ...mapActions("boxNumberList", ["getLoginInfo"]), // 点击新增时显示当前登录的企业的名称，原产地和国别地区
    ...mapActions('inviteCustom', ["getExhibitionNumListAll"]),
    handleExhibitionNumChange(val) {
      this.addForm.exhibitionNum = val;
    },
    // 搜索框查询
    queryPayment() {
      this.boxParams.size = 10;
      this.boxParams.current = 1;
      this.getRecords(this.queryParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    queryRefresh() {
      // let queryParams = {};
      // queryParams = this.boxParams;
      // queryParams.boxNo = this.ruleForm.boxNo;// 箱号
      // queryParams.exhibitionNum = this.ruleForm.exhibitionNum;// 届数
      this.getRecords(this.queryParams).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      // this.json.PageSize = val; ?
      this.boxParams.size = val;
      // this.getListPageInfo(this.json).then(res => {
      //   this.tableData = res.records;
      //   this.total = res.total;
      // });
      this.queryRefresh();
    },
    // 分页 下一页
    handleCurrentChange(val) {
      // this.json.PageIndex = val; ?
      this.boxParams.current = val;
      // this.getListPageInfo(this.json).then(res => {
      //   this.tableData = res.records;
      //   this.total = res.total;
      // });
      this.queryRefresh();
    },
    // 表格多选框选中事件
    handleSelection(selection, row) {
      this.ids.push(row.notificationFileId);
    },
    // 生成运输备案表
    pointsUpload() {

    },
    // 修改
    handleEdit(row, index) {
      this.$router.push({
        path: '/applicationBoothEdit',
        query: {
          data: row.boothApplyId
        }
      });
    },
    // 表格多选框选中事件
    handleSelectionChange(val) {
      // this.multipleSelection = val;
    },
    // 删除
    deleteBoxList(row, index) {
      let queryParams = {
        recordId: row.productRecordId
      };

      this.$confirm('确定要删除此条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeRecord(queryParams).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.queryRefresh();
          // let deleteParams = {};
          // deleteParams = this.boxParams;
          // deleteParams.boxNo = this.ruleForm.boxNo;// 箱号
          // deleteParams.exhibitionNum = this.ruleForm.exhibitionNum;// 届数

          // // 刷新页面
          // this.getRecords(deleteParams).then(respon => {
          //   this.tableData = respon.records;
          //   this.total = respon.total;
          // });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // handleClose(done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => {});
    // },
    // 编辑弹框
    editBoxList(row, index) {
      this.dialogVisibleEdit = true;
      this.editForm.exhibitionNum = row.exhibitionNum;
      this.productRecordId = row.productRecordId;
      this.editForm.boxNo = row.boxNo;
      this.editForm.totalNum = row.totalNum;
      this.editForm.crNameCh = row.crNameCh;
      this.editForm.sourceArea = row.sourceArea;
      this.editForm.pavilionCode = row.pavilionCode;
      this.editForm.companyNameCh = row.companyNameCh;
      this.editForm.logisticsCpName = row.logisticsCpName;
      this.editForm.logisticsCpMail = row.logisticsCpMail;
      this.editForm.logisticsCpPhone = row.logisticsCpPhone;
      this.editForm.logisticsCpFixed = row.logisticsCpFixed;
      this.editForm.logisticsCpContact = row.logisticsCpContact;
    },
    // 编辑内容
    editConfirm() {
      let editParams = {
        note: '',
        modifierId: '',
        pavilionCode: '',
        modifierName: '',
        // companyId: this.companyId,
        // creatorId: this.creatorId,
        creatorName: this.creatorName,
        productRecordId: this.productRecordId
      };
      editParams.exhibitionNum = this.editForm.exhibitionNum;
      editParams.boxNo = this.editForm.boxNo;
      editParams.totalNum = this.editForm.totalNum;
      editParams.crNameCh = this.editForm.crNameCh;
      editParams.pavilionCode = this.editForm.pavilionCode;
      editParams.logisticsCpName = this.editForm.logisticsCpName;
      editParams.logisticsCpMail = this.editForm.logisticsCpMail;
      editParams.logisticsCpPhone = this.editForm.logisticsCpPhone;
      editParams.logisticsCpFixed = this.editForm.logisticsCpFixed;
      editParams.logisticsCpContact = this.editForm.logisticsCpContact;

      this.updateRecord(editParams).then(res => {
        this.$message({
          type: 'success',
          message: '编辑成功!'
        });
        this.dialogVisibleEdit = false;
        this.queryRefresh();
        // let freshParams = {};//刷新页面
        // freshParams = this.boxParams;
        // freshParams.boxNo = this.ruleForm.boxNo;// 箱号
        // freshParams.exhibitionNum = this.ruleForm.exhibitionNum;// 届数

        // this.getRecords(freshParams).then(respon => {
        //   this.tableData = respon.records;
        //   this.total = respon.total;
        // });
      }).catch(e => {
        this.$message.error(e);
        return false;
      });
    },
    // 新增
    boxAdd() {
      this.dialogVisibleAdd = true;

      let loginParams = {
        companyId: this.companyId
      };
      this.getLoginInfo(loginParams).then(res => {
        this.addForm.crNameCh = res.crChName;
        this.addForm.sourceArea = res.sourceArea;
        this.addForm.companyNameCh = res.companyNameCh;
      });
    },
    // 新增的确定
    addConfirm(addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          let addParams = {
            note: '',
            modifierId: '',
            pavilionCode: '',
            modifierName: ''
          };
          addParams = this.addForm;
          // addParams.companyId = this.companyId;
          // addParams.creatorId = this.creatorId;
          addParams.creatorName = this.creatorName;

          this.addRecord(addParams).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功!'
            });
            // 清除上一次的新增记录
            let key;
            for (key in this.addForm) {
              this.addForm[key] = '';
            }
            this.dialogVisibleAdd = false;
            this.queryRefresh();
            // let freshParams = {};//刷新页面
            // freshParams = this.boxParams;
            // freshParams.boxNo = this.ruleForm.boxNo;// 箱号
            // freshParams.exhibitionNum = this.ruleForm.exhibitionNum;// 届数

            // // 刷新页面
            // this.getRecords(freshParams).then(respon => {
            //   this.tableData = respon.records;
            //   this.total = respon.total;
            // });
          }).catch(e => {
            this.$message.error(e);
            return false;
          });
        } else {
          return false;
        }
      });
    },
    // 查看
    lookOver(row, index) {
      this.$router.push({
        path: '/exhibitionManage',
        query: {
          data: row
        }
      });
    }

  }
};
</script>
<style scoped>
.title{
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
}
.btn-row{
  margin: 10px;
}
.dialog-footer{
  text-align: center;
  margin: 15px 0;
  padding-bottom: 10px;
}
.check-item{
  margin: 10px;
}
.dialog-userList {
  padding-bottom: 10px;
  height: 32px;
}
.li_style {
  float: left;
  list-style: none;
  background-color: rgba(64, 158, 255, 0.1);
  padding: 0 10px;
  margin-right: 5px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid rgba(64, 158, 255, 0.2);
}
.waterCertificate {
  float: left;
}
.upload-demo {
  float: left;
  padding: 0 0 0 20px;
  line-height: 40px
}
.el-form-item{
  margin-bottom: 30px;
}

</style>
