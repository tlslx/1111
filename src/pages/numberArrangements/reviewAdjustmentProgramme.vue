<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="复核调整安排方案" name="first">
      <el-form :model="queryForm" :inline="true" label-width="120">
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptCode" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input placeholder="请输入" v-model.trim="queryForm.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item label="商协会">
          <el-select v-model="queryForm.coceralId" clearable>
            <el-option v-for="(item, index) in coceralOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input placeholder="请输入" v-model.trim="queryForm.cantonFairCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="外贸中心复核情况">
          <el-select v-model="queryForm.reviewResult" clearable>
            <el-option v-for="item in reviewResultOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审定情况">
          <el-select v-model="queryForm.checkStatus" clearable>
            <el-option v-for="item in checkStatusOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="checkBrandBoothPlan.records" v-loading="loading" border ref="multipleTable"
      @select="handleSelectionChange"
      @select-all="handleSelectionChange"
      @selection-change="handleCheckedChange"
      :row-key="getRowKey"
      >
        <el-table-column type="selection" width="40px"></el-table-column>
        <el-table-column label="商协会" prop="coceralName" align="center"></el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="拟安排企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="广交会编码" prop="cantonFairCode" align="center"></el-table-column>
        <el-table-column label="交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="拟新增安排展位数" prop="scheduleBoothNumber" align="center"></el-table-column>
        <el-table-column label="拟新增安排展位号" prop="scheduleBooth" align="center"></el-table-column>
        <el-table-column label="是否涉及岛型展位" prop="isIsland" align="center">
          <template slot-scope="scope">
            {{ scope.row.isIsland | isFilter }}
          </template>
        </el-table-column>
        <el-table-column label="安排理由" prop="scheduleReason" align="center"></el-table-column>
        <el-table-column label="调整方案盖章件" prop="attachment" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.attachment"><a href="javascript:;" @click="handleDownloadFile(scope.row.attachment)">查看文件</a></div>
          </template>
        </el-table-column>
        <el-table-column label="外贸中心复核情况" prop="reviewResult" align="center">
          <template slot-scope="scope">
            {{ scope.row.reviewResult | resultFilter }}
          </template>
        </el-table-column>
        <el-table-column label="复核不通过原因" prop="reviewOpinion" align="center"></el-table-column>
        <el-table-column label="审定情况" prop="checkStatus" align="center">
          <template slot-scope="scope">
            {{ scope.row.checkStatus | checkFilter }}
          </template>
        </el-table-column>
        <el-table-column label="审定不通过原因" prop="checkOpinion" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="openCheck(scope.row)" :disabled="handleDisabled(scope.row.checkStatus)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium" @click="handleDownload">下载</el-button>
          <el-button type="primary" size="medium" @click="sendTrade" :disabled="handleBtnDisabled()">发外贸司审定</el-button>
        </span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="checkBrandBoothPlan.total">
        </el-pagination>
      </el-row>
    </el-tab-pane>
    <!-- 通过不通过弹框 -->
    <el-dialog title="提示" :visible.sync="isPass" v-if="isPass" width="30%">
      <el-form :model="checkData" ref="passReasonForm" :rules="reasonFormRule">
        <el-form-item label="审核结果：" prop="reviewResult">
          <el-select v-model="checkData.reviewResult" clearable>
            <el-option v-for="item in checkResultOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核意见：" v-if="this.checkData.reviewResult === '2' || this.checkData.reviewResult === '0'" prop="reviewOpinion">
          <el-input type="textarea" v-model="checkData.reviewOpinion" :rows="4" maxlength="120"></el-input>
        </el-form-item>
        <div class="dialog-footer">
          <el-button type="primary" size="medium" @click="handleSave('passReasonForm')">保存</el-button>
          <el-button size="medium" @click="isPass = false;">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      loading: '',
      isPass: false,
      lastCheckData: [], // 上次保存的值
      selectData: [], // 选中的数据索引
      checkList: [], // 临时选中的值
      exhibitionAreaOpts: [],
      delegationOpts: [],
      companyOpts: [],
      coceralOpts: [],
      checkResultOpts: [{ value: '1', label: '通过' }, { value: '2', label: '不通过' }],
      reviewResultOpts: [{ value: '0', label: '未复核' }, { value: '1', label: '通过' }, { value: '2', label: '不通过' }],
      checkStatusOpts: [{ value: '0', label: '未审定' }, { value: '1', label: '通过' }, { value: '2', label: '不通过' }],
      queryForm: {
        exhibitionArea: '',
        dealClusterId: '',
        coceralId: '',
        companyName: '',
        reviewResult: '',
        cantonFairCode: '',
        checkStatus: ''
      },
      reasonFormRule: {
        reviewResult: [{ required: true, message: '请选择', trigger: 'change' }],
        reviewOpinion: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      checkData: {
        scheduleId: '',
        reviewResult: '',
        reviewOpinion: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    resultFilter: value => {
      let val = value + '';
      switch (val) {
        case '0':
          return '未复核';
        case '1':
          return '通过';
        case '2':
          return '不通过';
        default:
          return;
      }
    },
    checkFilter: value => {
      let val = value + '';
      switch (val) {
        case '0':
          return '未审定';
        case '1':
          return '通过';
        case '2':
          return '不通过';
        default:
          return;
      }
    },
    isFilter: value => {
      let val = value + '';
      switch (val) {
        case '0':
          return '否';
        case '1':
          return '是';
        default:
          return;
      }
    }
  },
  computed: {
    ...mapGetters('workDepartReturn', ['checkBrandBoothPlan']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        dealClusterId: this.queryForm.dealClusterId,
        coceralId: this.queryForm.coceralId,
        companyName: this.queryForm.companyName,
        reviewResult: this.queryForm.reviewResult,
        cantonFairCode: this.queryForm.cantonFairCode,
        checkStatus: this.queryForm.checkStatus,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    },
    getRowKey (row) { // 获取row的key值
      return row.scheduleId;
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商会
    this.getassociationDepartment().then(res => {
      this.coceralOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.createdQuery();
  },
  methods: {
    ...mapActions('workDepartReturn', ['getCheckBrandBoothPlan', 'postCheckBrandBoothPlan', 'postSendTradeCheck']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getassociationDepartment']),
    // 下载附件
    handleDownloadFile(id) {
      window.open(`${process.env.API_NA_URL}/api/file/get?fileId=${id}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 能否审核
    handleDisabled(status) {
      if (status === '1' || status === '2') {
        return true;
      } else {
        return false;
      }
    },
    // 能否发外贸司审定
    handleBtnDisabled() {
      if (this.checkList.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    // 打开审核弹框
    openCheck(row) {
      this.checkData = {
        scheduleId: row.scheduleId,
        reviewResult: '',
        reviewOpinion: ''
      };
      this.isPass = true;
    },
    // 点击保存
    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.postCheckBrandBoothPlan(this.checkData).then(() => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
            this.$message.success('操作成功');
            this.isPass = false;
            this.createdQuery();
          }).catch(e => {
            this.isPass = false;
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
        }
      });
    },
    handleCheckedChange(rows) { // 选中的数据获取
      this.checkList = []; // 初始化，防止重复添加
      if (rows) {
        rows.forEach(row => { // 遍历已选择的数据
          if (row) {
            this.checkList.push({
              scheduleId: row.scheduleId,
              checkStatus: '0'
            });
          }
        });
      }
    },
    // 发外贸司审定
    sendTrade() {
      this.lastCheckData[this.pageInfo.currentPage - 1] = this.checkList; // 保存当前页获取的值
      this.postSendTradeCheck(this.checkList).then(res => {
        this.$message.success("您已成功发送外贸司");
      });
      //降维 --- 二维数组降至一维数组
      // let getList = this.lastCheckData.flat();
    },
    handleSelectionChange(selection, row) { // 选中的数据索引获取
      this.selectData[this.pageInfo.currentPage - 1] = []; // 初始化
      this.checkBrandBoothPlan.records.forEach((item, index) => {
        for (let i = 0; i < selection.length; i++) { // 遍历已选的数据重新填充数组
          if (item.scheduleId === selection[i].scheduleId) {
            this.selectData[this.pageInfo.currentPage - 1].push(index);
          }
        }
      });
    },
    toggleSelection(rows) { // 判断是否选中
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 下载
    handleDownload() {
      console.log(this.queryForm);
      let url = `exhibitionArea=${this.queryForm.exhibitionArea}&dealClusterId=${this.queryForm.dealClusterId}&cantonFairCode=${this.queryForm.cantonFairCode}&coceralId=${this.queryForm.coceralId}&companyName=${this.queryForm.companyName}&reviewResult=${this.queryForm.reviewResult}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/reschedule/checkByWork/download?${url}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
    },
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val) {
      this.lastCheckData[this.pageInfo.currentPage - 1] = this.checkList;
      this.pageInfo.currentPage = val;
      this.loading = true;
      this.getCheckBrandBoothPlan(this.formQuery).then(res => {
        this.loading = false;

        // 勾选上次已勾选的数据
        let arr = [];
        if (this.selectData[this.pageInfo.currentPage - 1]) {
          this.selectData[this.pageInfo.currentPage - 1].forEach((item, index) => {
            arr.push(this.checkBrandBoothPlan.records[item]);
          });
        }
        let setTime = new Promise((resolve, reject) => {
          resolve(arr);
        });
        Promise.all([setTime]).then((results) => {
          this.toggleSelection(arr);
        });
      }).catch(e => {
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getCheckBrandBoothPlan(this.formQuery).then(res => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
