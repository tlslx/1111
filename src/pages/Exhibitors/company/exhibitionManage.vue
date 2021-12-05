/**
* @file 展品管理
* @author:heli
* @date:2019/3/30
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展品管理" name="first">
      <p class="boxNumber">箱号: {{boxNo}}</p>
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="展品名称:" size="mini" prop="productName">
          <el-input v-model="ruleForm.productName" placeholder="请选择"></el-input>
        </el-form-item>
        <!-- <el-form-item label="展品类别:" size="mini" prop="secCatalogId">
          <el-select v-model="ruleForm.secCatalogId" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="124" value="124"></el-option>
            <el-option label="125" value="125"></el-option>
            <el-option label="126" value="126"></el-option>
            <el-option label="127" value="127"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="展品类别" size="small">
          <components-changeBoothChild @change-child="acceptRuleForm"></components-changeBoothChild>
        </el-form-item>
        <el-form-item label="展后处理:" size="mini" prop="afterHandleMethod">
          <el-select v-model="ruleForm.afterHandleMethod" placeholder="请选择">
            <el-option v-for="item in this.ifoHandleAfterEx" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="queryPayment()">查询</el-button>
        </el-form-item>
        <el-row size="mini">
          <el-button type="primary" @click="exhibitionAdd">新增</el-button>
        </el-row>
      </el-form>
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%;"
        @select="handleSelection">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="展品名称"
          align="center">
        </el-table-column>
        <el-table-column prop="secNameCh" label="展品类别" align="center"></el-table-column>
        <!-- <el-table-column
          prop="secCatalogId"
          label="展品类别"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status==0">未支付</span>
            <span v-else-if="scope.row.status==1">部分支付</span>
            <span v-else-if="scope.row.status==2">已核销</span>
            <span v-else-if="scope.row.status==3">价格</span>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="weight"
          label="毛重(千克)"
          align="center">
        </el-table-column>
        <el-table-column
          prop="version"
          label="展品内容规格型号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="productNum"
          label="数量/单位"
          align="center">
        </el-table-column>
        <el-table-column
          prop="productPrice"
          label="单价"
          align="center">
        </el-table-column>
        <el-table-column
          label="总价"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.productNum * scope.row.productPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="productCode"
          label="商品代码"
          align="center">
        </el-table-column>
        <el-table-column
          prop="afterHandleMethod"
          label="展后处理"
          align="center">
          <template slot-scope="scope">
            {{ scope.row.afterHandleMethod | afterHandleFilter}}
          </template>
        </el-table-column>
        <el-table-column
          prop="leaveTime"
          label="离馆时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作" width="200"
          align="center"
          fixed="right">
          <template slot-scope="scope">
            <el-button @click="exhibitionEdit(scope.row, scope.$index)" type="text" size="small">编辑</el-button>
            <el-button @click="exhibitionDelete(scope.row, scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="float:right; margin-top:10px;" >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="checkParams.current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="checkParams.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"></el-pagination>
      </div>

      <el-dialog title="新增" :visible.sync="dialogVisibleAdd" width="600px" @close="handleCloseAdd">
        <el-form :model="addForm" ref="addForm" :label-width="formLabelWidth">
          <el-form-item label="箱号:">
            <el-col :span="12">
              <el-input v-model="addForm.boxNo" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="展品名称:">
            <el-col :span="12">
              <el-input v-model="addForm.productName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="展品类别" size="small" prop="secCatalogId">
            <components-changeBoothChild :editData="transData" @change-child="acceptAddForm"></components-changeBoothChild>
          </el-form-item>
          <!-- <el-form-item label="展品类别:">
            <el-col :span="16">
              <div class="secCatalog">
                <el-select v-model="addForm.exAreaId" placeholder="请选择展区">
                  <el-option label="0" value="0"></el-option>
                </el-select>
              </div>
              <div class="secCatalog">
                <el-select v-model="addForm.fstCatalogId" placeholder="请选择一级目录">
                  <el-option label="1" value="1"></el-option>
                </el-select>
              </div>
              <div class="secCatalog">
                <el-select v-model="addForm.secCatalogId" placeholder="请选择二级目录">
                  <el-option label="2" value="2"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-form-item> -->
          <el-form-item label="毛重(千克):">
            <el-col :span="12">
              <el-input v-model="addForm.weight"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="展品内容规格型号:">
            <el-col :span="12">
              <el-input v-model="addForm.version"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="数量/单价:">
            <el-col :span="12">
              <el-input v-model="addForm.productNum"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="单价:">
            <el-col :span="12">
              <el-input v-model="addForm.productPrice"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="总价:">
            <el-col :span="12">
              <el-input :value="addForm.productNum * addForm.productPrice" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="商品代码:">
            <el-col :span="12">
              <el-input v-model="addForm.productCode"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="展后处理:">
            <el-col :span="12">
              <el-select v-model="addForm.afterHandleMethod">
                <el-option v-for="item in this.ifoHandleAfterEx" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="离馆时间:">
            <el-col :span="12">
              <el-date-picker v-model="addForm.leaveTime" align="right" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="备注:">
            <el-col :span="12">
              <el-input v-model="addForm.note"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="addConfirm('addForm')">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="编辑" :visible.sync="dialogVisibleEdit" width="600px" @close="handleCloseEdit">
        <el-form :model="editForm" :label-width="formLabelWidth">
          <el-form-item label="箱号:">
            <el-col :span="12">
              <el-input v-model="editForm.boxNo" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="展品名称:">
            <el-col :span="12">
              <el-input v-model="editForm.productName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="展品类别" size="small" prop="secCatalogId">
            <components-changeBoothChild :editData="transData" @change-child="acceptEditForm"></components-changeBoothChild>
          </el-form-item>
          <!-- <el-form-item label="展品类别:">
            <el-col :span="16">
              <div class="secCatalog">
                <el-select v-model="editForm.exAreaId" placeholder="请选择展区">
                  <el-option label="0" value="0"></el-option>
                </el-select>
              </div>
              <div class="secCatalog">
                <el-select v-model="editForm.fstCatalogId" placeholder="请选择一级目录">
                  <el-option label="1" value="1"></el-option>
                </el-select>
              </div>
              <div class="secCatalog">
                <el-select v-model="editForm.secCatalogId" placeholder="请选择二级目录">
                  <el-option label="2" value="2"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-form-item> -->
          <el-form-item label="毛重(千克):">
            <el-col :span="12">
              <el-input v-model="editForm.weight"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="展品内容规格型号:">
            <el-col :span="12">
              <el-input v-model="editForm.version"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="数量/单价:">
            <el-col :span="12">
              <el-input v-model="editForm.productNum"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="单价:">
            <el-col :span="12">
              <el-input v-model="editForm.productPrice"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="总价:">
            <el-col :span="12">
              <el-input :value="editForm.productNum * editForm.productPrice" :disabled="true"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="商品代码:">
            <el-col :span="12">
              <el-input v-model="editForm.productCode"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="展后处理:">
            <el-col :span="12">
              <el-select v-model="editForm.afterHandleMethod">
                <el-option v-for="item in this.ifoHandleAfterEx" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="离馆时间:">
            <el-col :span="12">
              <el-date-picker v-model="editForm.leaveTime" align="right" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="备注:">
            <el-col :span="12">
              <el-input v-model="editForm.note"></el-input>
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
import { mapActions } from "vuex";
import componentsChangeBoothChild from "@/components/project/common/changeboothChild";
export default {
  name: "exhibitionManage",
  components: {
    "components-changeBoothChild": componentsChangeBoothChild
  },
  data() {
    return {
      activeName: 'first',
      transData: {
        exAreaId: "",
        fstCatalogId: "",
        secCatalogId: ""
      },
      ifoHandleAfterEx: [], // 展后处理下拉框
      ids: [],
      total: 0,
      addForm: {
        boxNo: '',
        productName: '',
        exAreaId: '',
        fstCatalogId: '',
        secCatalogId: '',
        weight: '',
        version: '',
        productNum: '',
        productPrice: '',
        // totalPrice: '',
        productCode: '',
        afterHandleMethod: '',
        leaveTime: '',
        note: ''
      },
      editForm: {
        boxNo: '',
        productName: '',
        exAreaId: '',
        fstCatalogId: '',
        secCatalogId: '',
        weight: '',
        version: '',
        productNum: '',
        productPrice: '',
        // totalPrice: '',
        productCode: '',
        afterHandleMethod: '',
        leaveTime: '',
        note: ''
      },
      boxNo: '',
      tableData: [], // 列表展示
      // creatorId: "test", // 创建人
      // creatorName: "test", // 创建人
      dialogVisible: false,
      formLabelWidth: '140px',
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      productRecordLkId: '',
      // notificationFileId: '',
      ruleForm: {
        productName: '', // 展品名称
        secCatalogId: '', // 展品类别
        afterHandleMethod: '' // 展后处理
      },
      checkParams: {
        "size": 10,
        "current": 1,
        "isAsc": true,
        // "loginType": "0",
        // "loginId": 'aaa',
        "productRecordId": "",
        "orderByField": "lk.create_date"
      }
    };
  },
  computed: {
    // ...mapGetters('commonStore', ['exhibitionsAreas']), // 获取展区
  },
  filters: {
    afterHandleFilter: value => {
      let ifoHandleAfterEx = kindo.dictionary.get('ifoHandleAfterEx');
      for (let i = 0; i < ifoHandleAfterEx.length; i++) {
        let item = ifoHandleAfterEx[i];
        if (value.toString() === item.value.toString()) {
          return item.label;
        }
      }
      if (!value) {
        return '';
      }
    }
  },
  created() {
    this.ifoHandleAfterEx = kindo.dictionary.get('ifoHandleAfterEx');
  },
  mounted() {
    if (this.$route.query.data) {
      this.boxNo = this.$route.query.data.boxNo;
      this.checkParams.productRecordId = this.$route.query.data.productRecordId;
      let queryParams = {};
      queryParams = this.checkParams;
      // queryParams.productRecordId = this.$route.query.data.productRecordId;
      queryParams.productName = this.ruleForm.productName;
      queryParams.secCatalogId = this.ruleForm.secCatalogId;
      queryParams.afterHandleMethod = this.ruleForm.afterHandleMethod;

      this.getRecordLks(queryParams).then(res => {
        if (res.records.length > 0) {
          res.records.forEach(item => {
            item.totalPrice = (item.productNum * item.productPrice).toFixed(2);
          });
        }
        this.total = res.total;
        this.tableData = res.records;
      });
    }

  },
  methods: {
    ...mapActions("exhibitionManage", ["addRecordLk"]), // 新增展品运输备案关联
    ...mapActions("exhibitionManage", ["getRecordLks"]), // 查看运输备案关联列表
    ...mapActions("exhibitionManage", ["updateRecordLk"]), // 编辑展品运输备案关联
    ...mapActions("exhibitionManage", ["removeRecordLk"]), // 删除展品运输备案关联
    // ...mapActions('commonStore', ['getExhibitionschemesGetAreas']), // 获取展
    acceptRuleForm(param) {
      return Object.assign(this.ruleForm, param);
    },
    acceptAddForm(param) {
      return Object.assign(this.addForm, param);
    },
    acceptEditForm(param) {
      return Object.assign(this.editForm, param);
    },
    // 搜索框查询
    queryPayment() {
      if (this.$route.query.data) {
        // this.boxNo = this.$route.query.data.boxNo;

        let queryParams = {};
        queryParams = this.checkParams;
        // queryParams.productRecordId = this.$route.query.data.productRecordId;
        queryParams.productName = this.ruleForm.productName;
        queryParams.secCatalogId = this.ruleForm.secCatalogId;
        queryParams.afterHandleMethod = this.ruleForm.afterHandleMethod;

        this.getRecordLks(queryParams).then(res => {
          this.total = res.total;
          this.tableData = res.records;
        });
      }
    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.checkParams.size = val;
      this.queryPayment();
      // this.getListPageInfo(this.json).then(res => {
      //   this.tableData = res.records;
      //   this.total = res.total;
      // });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.checkParams.current = val;
      this.queryPayment();
      // this.getListPageInfo(this.json).then(res => {
      //   this.tableData = res.records;
      //   this.total = res.total;
      // });
    },
    // 表格多选框选中事件
    handleSelection(selection, row) {

    },
    // 表格多选框选中事件
    handleSelectionChange(val) {

    },
    // 汇款水单
    paymentEdit(row, index) {
      this.dialogVisible = true;
      this.form.paymentNotificationId = row.paymentNotificationId;
    },
    handleCloseAdd() {
      for (const key in this.addForm) {
        this.addForm[key] = '';
      }
    },
    handleCloseEdit() {

    },
    // 单行删除
    exhibitionDelete(row, index) {
      let queryParams = {
        recordLkId: row.productRecordLkId
      };

      this.$confirm('确定要删除此条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeRecordLk(queryParams).then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.queryPayment(); //刷新页面
          // let freshParams = {};//刷新页面
          // freshParams = this.checkParams;
          // // freshParams.productRecordId = this.$route.query.data.productRecordId;
          // freshParams.productName = this.ruleForm.productName;
          // freshParams.secCatalogId = this.ruleForm.secCatalogId;
          // freshParams.afterHandleMethod = this.ruleForm.afterHandleMethod;

          // this.getRecordLks(freshParams).then(respon => {
          //   this.total = respon.total;
          //   this.tableData = respon.records;
          // });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 编辑
    exhibitionEdit(row, index) {
      this.dialogVisibleEdit = true;
      if (this.$route.query.data) {
        this.editForm.boxNo = this.$route.query.data.boxNo;
      }

      this.productRecordLkId = row.productRecordLkId;
      this.editForm.productName = row.productName;
      this.editForm.exAreaId = row.exAreaId;
      this.editForm.fstCatalogId = row.fstCatalogId;
      this.editForm.secCatalogId = row.secCatalogId;
      this.editForm.weight = row.weight;
      this.editForm.version = row.version;
      this.editForm.productNum = row.productNum;
      this.editForm.productPrice = row.productPrice;
      this.editForm.productCode = row.productCode;
      this.editForm.afterHandleMethod = row.afterHandleMethod;
      this.editForm.leaveTime = row.leaveTime;
      this.editForm.note = row.note;

      //处理 展品类别
      Object.assign(this.transData, {
        exAreaId: row.exAreaId,
        fstCatalogId: row.fstCatalogId,
        secCatalogId: row.secCatalogId
      });
    },
    // 编辑 确定
    editConfirm() {
      let editParams = {
        note: '',
        modifierId: '',
        pavilionCode: '',
        modifierName: '',
        // companyId: this.companyId,
        // creatorId: this.creatorId,
        // creatorName: this.creatorName,
        productRecordLkId: this.productRecordLkId
      };
      editParams.boxNo = this.editForm.boxNo;
      editParams.productName = this.editForm.productName;
      editParams.exAreaId = this.editForm.exAreaId;
      editParams.fstCatalogId = this.editForm.fstCatalogId;
      editParams.secCatalogId = this.editForm.secCatalogId;
      editParams.weight = this.editForm.weight;
      editParams.version = this.editForm.version;
      editParams.productNum = this.editForm.productNum;
      editParams.productPrice = this.editForm.productPrice;
      editParams.productCode = this.editForm.productCode;
      editParams.afterHandleMethod = this.editForm.afterHandleMethod;
      editParams.leaveTime = this.editForm.leaveTime;
      editParams.note = this.editForm.note;

      this.updateRecordLk(editParams).then(res => {
        this.$message({
          type: 'success',
          message: '编辑成功!'
        });
        this.dialogVisibleEdit = false;
        this.queryPayment(); //刷新页面
        // let freshParams = {};//刷新页面
        // freshParams = this.checkParams;
        // freshParams.productRecordId = this.$route.query.data.productRecordId;
        // freshParams.productName = this.ruleForm.productName;
        // freshParams.secCatalogId = this.ruleForm.secCatalogId;
        // freshParams.afterHandleMethod = this.ruleForm.afterHandleMethod;

        // this.getRecordLks(freshParams).then(respon => {
        //   if (respon.records.length > 0) {
        //     respon.records.forEach(item => {
        //       item.totalPrice = (item.productNum * item.productPrice).toFixed(2);
        //     });
        //   }
        //   this.total = respon.total;
        //   this.tableData = respon.records;
        // });
      }).catch(e => {
        this.$message.error(e);
        return false;
      });
    },
    // 新增 弹框
    exhibitionAdd() {
      this.dialogVisibleAdd = true;
      this.transData = { // 新增的时候初始化
        exAreaId: "",
        fstCatalogId: "",
        secCatalogId: ""
      };
      if (this.$route.query.data) {
        this.addForm.boxNo = this.$route.query.data.boxNo;
      }
    },
    // 新增 确定
    addConfirm() {
      // let addParams = {
      //   note: '',
      //   modifierId: '',
      //   pavilionCode: '',
      //   modifierName: ''
      // };
      let addParams = this.addForm;
      // addParams.companyId = this.companyId;
      // addParams.creatorId = this.creatorId;
      // addParams.creatorName = this.creatorName;
      addParams.productRecordId = this.checkParams.productRecordId;

      this.addRecordLk(addParams).then(res => {
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
        this.queryPayment(); //刷新页面
        // let freshParams = {};//刷新页面
        // freshParams = this.checkParams;
        // freshParams.productRecordId = this.$route.query.data.productRecordId;
        // freshParams.productName = this.ruleForm.productName;
        // freshParams.secCatalogId = this.ruleForm.secCatalogId;
        // freshParams.afterHandleMethod = this.ruleForm.afterHandleMethod;

        // this.getRecordLks(freshParams).then(respon => {
        //   if (respon.records.length > 0) {
        //     respon.records.forEach(item => {
        //       item.totalPrice = (item.productNum * item.productPrice).toFixed(2);
        //     });
        //   }
        //   this.total = respon.total;
        //   this.tableData = respon.records;
        // });
      }).catch(e => {
        this.$message.error(e);
        return false;
      });
    }

  }
};
</script>
<style scoped>
.secCatalog{
  float: left;
  width: 120px;
  margin: 0 0 0 10px
}
.boxNumber{
  margin-left: 30px;
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

</style>
