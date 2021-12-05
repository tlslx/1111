<template>
  <!-- <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="登记反馈意见" name="first"> -->
  <div>
    <el-form :model="queryForm" :inline="true" size="small">
      <el-form-item label="商协会">
        <el-select v-model="queryForm.coceralId" clearable>
          <el-option v-for="(item, index) in coceralOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展区">
        <el-select v-model="queryForm.exhibitionArea" clearable>
          <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评审企业">
        <el-input placeholder="请输入" v-model="queryForm.companyName" clearable></el-input>
      </el-form-item>
      <el-form-item label="交易团">
        <el-select v-model="queryForm.dealClusterId" clearable>
          <el-option v-for="(item, index) in dealClusterOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="getLpf.records" v-loading="loading" border>
      <el-table-column label="评审企业" prop="companyName" align="center"></el-table-column>
      <el-table-column label="所属交易团" prop="dealClusterName" align="center"></el-table-column>
      <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
      <el-table-column label="商协会" prop="coceralName" align="center"></el-table-column>
      <el-table-column label="原安排展位数" prop="beforeNumber" align="center"></el-table-column>
      <el-table-column label="异议内容" prop="objectionContent" align="center"></el-table-column>
      <el-table-column label="处理意见" prop="disposeOpinion" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="openAddOrEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row.publicityId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="space-between" class="pagination-footer">
      <span class="add_btn">
        <el-button type="danger" size="medium" @click="openAddOrEdit('')">新增</el-button>
        <el-button type="primary" size="medium" @click="onprint">打印</el-button>
      </span>
      <el-pagination 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        :page-size="pageInfo.pageSize"
        :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="getLpf.total">
      </el-pagination>
    </el-row>
    <!-- 新增编辑弹框 -->
    <el-dialog :title="dialogTitle" :visible.sync="contrastDialog" :close-on-click-modal="false" v-if="contrastDialog" width="550px">
      <el-form class="contrastForm" :model="contrastObj" ref="contrastForm" :rules="contrastRule" label-width="120px">
        <el-form-item label="评审企业：" prop="companyCode">
          <el-select v-model="contrastObj.companyCode" :disabled="isDisabled" @change="companyChange" clearable>
            <el-option v-for="(item, index) in companyOpts" :key="index" :value="item.companyCode" :label="item.companyName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属交易团：" prop="dealClusterId">
          <el-select v-model="contrastObj.dealClusterId" disabled>
            <el-option v-for="(item, index) in dealClusterOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区：" prop="exhibitionArea" clearable>
          <el-select v-model="contrastObj.exhibitionArea" :disabled="isDisabled">
            <el-option v-for="(item, index) in exhibitionAreaOptions" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商协会：" prop="coceralId">
          <el-select v-model="contrastObj.coceralId" disabled>
            <el-option v-for="(item, index) in coceralOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原安排展位数：" prop="beforeNumber">
          <el-input placeholder="请输入" v-model="contrastObj.beforeNumber" maxlength="2" clearable></el-input>
        </el-form-item>
        <el-form-item label="异议内容：" prop="objectionContent">
          <el-input placeholder="请输入" type="textarea" :rows="4" v-model="contrastObj.objectionContent" maxlength="120" clearable></el-input>
        </el-form-item>
        <div class="dialog-footer">
          <el-button type="primary" size="medium" @click="handleSave('contrastForm')">保存</el-button>
          <el-button size="medium" @click="contrastDialog = false;">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
    <!-- </el-tab-pane>
  </el-tabs> -->
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    var needInt = (rule, value, callback) => {
      const reg = /[^\d\$]/g;
      if (value === '') {
        return callback(new Error('请输入>=0的整数'));
      } else if (reg.test(value)) {
        return callback(new Error('请输入>=0的整数'));
      } else {
        return callback();
      }
    };
    return {
      activeName: 'first',
      loading: '',
      contrastDialog: false,
      isDisabled: false,
      dialogTitle: '',
      type: '', // 新增or编辑
      exhibitionAreaOpts: [],
      exhibitionAreaOptions: [], // 新增
      dealClusterOpts: [],
      companyOpts: [],
      coceralOpts: [],
      queryForm: {
        exhibitionArea: '',
        dealClusterId: '',
        companyName: '',
        coceralId: ''
      },
      contrastObj: {
        publicityId: '',
        companyCode: '',
        dealClusterId: '',
        exhibitionArea: '',
        coceralId: '',
        beforeNumber: '',
        objectionContent: ''
      },
      contrastRule: {
        companyCode: [{ required: true, message: '请选择', trigger: 'change' }],
        dealClusterId: [{ required: true, message: '请选择', trigger: 'change' }],
        exhibitionArea: [{ required: true, message: '请选择', trigger: 'change' }],
        coceralId: [{ required: true, message: '请选择', trigger: 'change' }],
        beforeNumber: [{ required: true, validator: needInt, trigger: 'blur' }],
        objectionContent: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('brandBooth', [
      'getLpf' // 查看交易团反馈意见
      // 'getPrd' // 查看调整安排方案
    ]),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        companyName: this.queryForm.companyName,
        coceralId: this.queryForm.coceralId,
        dealClusterId: this.$store.getters.userInfo.org.deptId,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    },
    contrastData() {
      return {
        publicityId: this.contrastObj.publicityId,
        companyCode: this.contrastObj.companyCode,
        companyName: this.contrastObj.companyName,
        dealClusterId: this.$store.getters.userInfo.org.deptId,
        dealClusterCoce: this.$store.getters.userInfo.org.deptCoce,
        dealClusterName: this.$store.getters.userInfo.org.deptName,
        exhibitionArea: this.contrastObj.exhibitionArea,
        exhibitionAreaName: this.contrastObj.exhibitionAreaName,
        coceralId: this.contrastObj.coceralId,
        coceralCode: this.contrastObj.coceralCode,
        coceralName: this.contrastObj.coceralName,
        beforeNumber: this.contrastObj.beforeNumber,
        objectionContent: this.contrastObj.objectionContent
      };
    }
  },
  created() {
    // this.getlistPageReschedule({
    //   dealClusterId: this.$store.getters.userInfo.org.deptId
    // }).then(res => {
    //   for (let i = 0; i < res.records.length; i++) {
    //     if (res.records[i].publicityId !== "" && status === "1" && res.records[i].publicityId != null) {
    //       this.companyOpts.push(JSON.parse(JSON.stringify(res.records[i])));
    //     }
    //   }
    //   // 数组去重
    //   let hasd = {};
    //   this.companyOpts = this.companyOpts.reduce(function(item, next) {
    //     hasd[next.companyCode] ? '' : hasd[next.companyCode] = true && item.push(next);
    //     return item;
    //   }, []);
    // }); // 获取新增时候的数据
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.dealClusterOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      this.coceralOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  mounted() {
    this.createdQuery();
  },
  methods: {
    ...mapActions('brandBooth', [
      "getlistPageReschedule", // 查看调整安排方案
      "addfeedback", // 交易团新增反馈意见
      "deletebyIdFeedback", // 交易团删除反馈意见
      "getlistPageFeedback", // 查看交易团反馈意见
      "updatebyIdFeedback" // 交易团更新反馈意见
    ]),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getassociationDepartment']),
    // 新增编辑弹框
    openAddOrEdit(row) {
      if (row === '') { // 新增
        this.getlistPageReschedule({
          dealClusterId: this.$store.getters.userInfo.org.deptId
        }).then(res => {
          for (let i = 0; i < res.records.length; i++) {
            if (res.records[i].publicityId !== "" && res.records[i].status === "1" && res.records[i].publicityId != null) {
              this.companyOpts.push(JSON.parse(JSON.stringify(res.records[i])));
            }
          }
          // 数组去重
          let hasd = {};
          this.companyOpts = this.companyOpts.reduce(function(item, next) {
            hasd[next.companyCode] ? '' : hasd[next.companyCode] = true && item.push(next);
            return item;
          }, []);
        }); // 获取新增时候的数据
        this.contrastObj = {
          companyCode: '',
          dealClusterId: '',
          exhibitionArea: '',
          coceralId: '',
          beforeNumber: '',
          objectionContent: ''
        };
        this.isDisabled = false;
        this.dialogTitle = '新增';
        this.type = 'add';
      } else { // 编辑
        this.contrastObj = {
          publicityId: row.publicityId,
          companyCode: row.companyCode,
          companyId: row.companyId,
          companyName: row.companyName,
          dealClusterId: row.dealClusterId,
          exhibitionArea: row.exhibitionArea,
          coceralId: row.coceralId,   
          beforeNumber: row.beforeNumber,
          objectionContent: row.objectionContent
        };
        this.isDisabled = true;
        this.dialogTitle = '编辑';
        this.type = 'edit';
      }
      this.contrastDialog = true;
    },
    // 保存
    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.type === 'add') {
            this.getlistPageReschedule({
              companyId: this.contrastObj.companyCode,
              dealClusterId: this.$store.getters.userInfo.org.deptId
            }).then(res => {
              // this.contrastObj["publicityId"] = res.records[0].publicityId;
              // this.contrastObj.dealClusterId = res.records[0].dealClusterId;
              // this.contrastObj["dealClusterCode"] = res.records[0].dealClusterCode;
              // this.contrastObj["dealClusterName"] = res.records[0].dealClusterName;
              // this.contrastObj.coceralId = res.records[0].coceralId;
              // this.contrastObj["coceralCode"] = res.records[0].coceralCode;
              // this.contrastObj["coceralName"] = res.records[0].coceralName;
              // this.contrastObj.beforeNumber = res.records[0].beforeNumber;
              for (let i = 0; i < res.records.length; i++) {
                if (this.contrastObj.exhibitionArea === res.records[i].exhibitionArea) {
                  this.contrastObj["exhibitionAreaName"] = res.records[i].exhibitionAreaName;
                }
              }
            });
            let fullScreenloading = this.$loading({ fullscreen: true });
            this.addfeedback(this.contrastData).then(() => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message.success('保存成功');
              this.contrastDialog = false;
              this.createdQuery();
            }).catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
          } else if (this.type === 'edit') {
            let fullScreenloading = this.$loading({ fullscreen: true });
            this.updatebyIdFeedback(this.contrastData).then(() => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message.success('保存成功');
              this.contrastDialog = false;
              this.createdQuery();
            }).catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
          }
        }
      });
    },
    // 删除
    handleDelete(id) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletebyIdFeedback({ publicityId: id }).then(() => {
          this.$message.success('删除成功');
          this.createdQuery();
        }).catch(e => {});
      }).catch(() => {
        this.$message.info('已取消此操作');
      });
    },
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    handleSizeChange(val) {
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getlistPageFeedback(this.formQuery).then(res => {
        this.paginationData.total = res.total;
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 新增 企业 change
    companyChange() {
      this.getlistPageReschedule({
        companyId: this.contrastObj.companyCode,
        dealClusterId: this.$store.getters.userInfo.org.deptId
      }).then(res => {
        this.contrastObj["publicityId"] = res.records[0].publicityId;
        this.contrastObj.dealClusterId = res.records[0].dealClusterId;
        this.contrastObj["dealClusterCode"] = res.records[0].dealClusterCode;
        this.contrastObj["dealClusterName"] = res.records[0].dealClusterName;
        this.contrastObj.coceralId = res.records[0].coceralId;
        this.contrastObj["coceralCode"] = res.records[0].coceralCode;
        this.contrastObj["coceralName"] = res.records[0].coceralName;
        this.contrastObj["companyName"] = res.records[0].companyName;
        this.contrastObj.beforeNumber = res.records[0].beforeNumber;
        for (let i = 0; i < res.records.length; i++) {
          let adata = {
            exhibitionAreaName: res.records[i].exhibitionAreaName,
            exhibitionAreaCode: res.records[i].exhibitionArea
          };
          this.exhibitionAreaOptions.push(adata);
          // 数组去重
          let hasd = {};
          this.exhibitionAreaOptions = this.exhibitionAreaOptions.reduce(function(item, next) {
            hasd[next.exhibitionAreaCode] ? '' : hasd[next.exhibitionAreaCode] = true && item.push(next);
            return item;
          }, []);
        }
      });
    },
    //打印
    onprint() {
      let url = `${this.paginationData.currentPage}&size=${this.paginationData.total}&exhibitionArea=${this.formData.exhibitionArea}&dealClusterId=${this.$store.getters.userInfo.org.deptId}&cantonFairCode=${this.formData.cantonFairCode}&coceralId=${this.formData.coceralId}&token=${localStorage.getItem("USER_TOKEN")}`;
      window.open(process.env.API_NA_URL + "/api/SchemePublicity/feedback/download?current=" + url, "_parent");
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
