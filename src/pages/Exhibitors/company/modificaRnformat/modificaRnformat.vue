<style>

</style>
<template>
  <div>
    <el-tabs v-model="activeName" class="businessReview">
      <el-tab-pane label="审核企业重要信息修改" name="first"></el-tab-pane>
        <el-form :inline="true" :model="formInline" :rules="ruleted" ref="ruleFormsed"  class="demo-form-inline">
          <el-form-item label="企业名称:" prop="enNames">
            <el-input v-model="formInline.companyName" clearable></el-input>
          </el-form-item>
          <el-form-item label="审核状态：">
            <el-select v-model="formInline.finalApproveStatus" placeholder="请选择" :clearable='true'>
              <!-- <el-option v-for="(item, index) in dataList" :key="index" @change="handelChange"  :label="item.label" :value="item.value"></el-option> -->
              <el-option label="未审核" value="0"></el-option>  
              <el-option label="审核通过" value="2"></el-option>  
              <el-option label="审核不通过" value="1"></el-option>  
              <!-- <el-option label="审核不通过" value="2"></el-option>   -->
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <!-- <el-button type="primary" @click="increase">新增</el-button> -->
          </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="companyNameCh" label="企业名称" align="center">
          </el-table-column>
          <el-table-column prop="applyModifyTime" label="申请修改时间" align="center" width="150">
          </el-table-column>
          <el-table-column prop="finalApproveStatus" label="审核状态" align="center">
            <template slot-scope="scope">
              {{ scope.row.finalApproveStatus | statusFilter }}
            </template>
          </el-table-column>
          <el-table-column  label="操作" align="center" width="180">
            <template slot-scope="scope">
              <div class="bm bm-pc">
                <el-button type="text"  @click="compile(scope.row, scope.$index)" >查看详情</el-button>
                <el-button type="text"  @click="onServe(scope.row, scope.$index)">审核</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="审核" :visible.sync="dialogFormVisible" :before-close="handleClose" width="35%">
          <el-form :model="formList" :label-width="formLabelWidth" :rules="rules" ref="ruleForm">
            
            <el-form-item label="审核：" >
              <el-select style="width:200px;" v-model="formList.region" :clearable="true" @change="checkd" placeholder="请选择">
                <el-option label="通过" value="1"></el-option>
                <el-option label="不通过" value="2"></el-option>
                <!-- <el-option label="不通过" value=""></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item v-if="isShow" label="不通过原因：">
              <el-input style="width:200px;" v-model="formList.reasons" type="textarea" :rows="2" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="fetch">取消</el-button>
            <el-button type="primary" @click="decide">确定</el-button>
          </div>
        </el-dialog>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfoData.total">
        </el-pagination>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialogFormVisible: false,
      isShow: false,
      formLabelWidth: '100px',
      activeName: 'first',
      dataList: [],
      ruleted: {},
      rules: {},
      formInline: {
        companyName: '',
        finalApproveStatus: ''
      },
      formList: {
        region: '',
        reasons: ''
      },
      tableData: [],
      pageInfoData: {
        currentPage: 1,
        pageSize: 10,
        total: 1
      },
      obj: {
        current: 1,
        size: 10,
        companyName: '',
        orderByField: 'ihm.create_date',
        finalApproveStatus: '',
        isAsc: false
      }
    };
  },
  filters: {
    statusFilter: value => {
      switch (value) {
        case '0':
          return '未审核';
        case '1':
          return '审核不通过';
        case '2':
          return '审核通过';
        default:
          return;
      }
    }
  },
  created() {
    this.handelGetEnterpriseRnformaModifica(this.obj);
  },
  methods: {
    ...mapActions("modificaRnformat", [
      "getEnterpriseRnformaModifica",   // 查看审核企业重要信息修改列表
      "postReviewRmportant"             // 审核重要修改信息
    ]),
    handelGetEnterpriseRnformaModifica(obj) {
      this.getEnterpriseRnformaModifica(obj).then(res => {
        this.pageInfoData.currentPage = res.current;
        this.pageInfoData.pageSize = res.size;
        this.pageInfoData.total = res.total;
        this.tableData = res.records;
      });
    },
    // 审核通过不通过
    checkd(val) {
      if (val === '2') {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    // 分页
    handleSizeChange(val) {
      this.obj.size = val;
      this.handelGetEnterpriseRnformaModifica(this.obj);
    },
    // 分页按钮
    handleCurrentChange(val) {
      this.obj.current = val;
      this.handelGetEnterpriseRnformaModifica(this.obj);
    },
    // 查询
    onSubmit() {
      let obj = {
        current: 1,
        size: this.obj.size,
        companyName: this.formInline.companyName,
        orderByField: 'ihm.create_date',
        finalApproveStatus: this.formInline.finalApproveStatus,
        isAsc: false
      };
      this.handelGetEnterpriseRnformaModifica(obj);
    },
    // 弹出取消
    fetch() {
      this.dialogFormVisible = false;
      this.formList = {};
      this.isShow = false;
    },
    // 弹出确定
    decide() {
      let obj = {
        historyModifyId: this.id,
        finalApproveStatus: this.formList.region,
        objectId: this.formList.reasons
      };
      this.postReviewRmportant(obj).then(res => {
        this.handelGetEnterpriseRnformaModifica(this.obj);
        this.dialogFormVisible = false;
        this.isShow = false;
      });
    },
    // 点击空白处关闭
    handleClose() {
      this.dialogFormVisible = false;
      this.isShow = false;
      this.formList = {};
    },
    // 查看详情
    compile(data) {
      this.$router.push({
        path: '/viewModificaDetails',
        query: data
      });
    },
    // 审核
    onServe(data) {
      this.id = data.historyModifyId;
      this.dialogFormVisible = true;
    }
  }
};
</script>
