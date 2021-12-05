<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="外贸司批复经外贸中心复核的展位数量调整安排方案" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="(item, index) in dealClusterOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input placeholder="请输入" v-model.trim="queryForm.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="rescheduleList.records" v-loading="loading" border>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="拟安排企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="所属交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="拟新增安排展位数" prop="scheduleBoothNumber" align="center"></el-table-column>
        <el-table-column label="拟新增安排展位号" prop="scheduleBooth" align="center"></el-table-column>
        <el-table-column label="是否设计岛型展位" prop="isIsland" align="center">
          <template slot-scope="scope">
            {{ scope.row.isIsland === 0 ? '否' : (scope.row.isIsland === 1 ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="安排理由" prop="scheduleReason" align="center"></el-table-column>
        <el-table-column label="批复" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handlePass(scope.row, '1', '')" :disabled="handleDisabled(scope.row.checkStatus)">通过</el-button>
            <el-button type="text" @click="handlePass(scope.row, '2', '')" :disabled="handleDisabled(scope.row.checkStatus)">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-footer">
        <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="rescheduleList.total">
        </el-pagination>
      </el-row>
      <!-- 不通过弹窗 -->
      <el-dialog title="不通过原因" :visible.sync="passDialog" v-if="passDialog" width="30%">
        <el-form :model="passObj" ref="noPassReasonForm" :rules="passReasonRule">
          <el-form-item label="审核意见：" prop="checkOpinion">
            <el-input v-model="passObj.checkOpinion" type="textarea" :rows="4" maxlength="120"></el-input>
          </el-form-item>
          <div class="dialog-footer">
            <el-button type="primary" size="medium" @click="handlePass('', '2', 'noPassReasonForm')">保存</el-button>
            <el-button size="medium" @click="passDialog = false;">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-tab-pane>
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
      passDialog: false,
      exhibitionAreaOpts: [],
      dealClusterOpts: [],
      companyOpts: [],
      queryForm: {
        exhibitionArea: '',
        dealClusterId: '',
        companyName: ''
      },
      passObj: {
        checkOpinion: ''
      },
      currentScheduleId: '',
      passReasonRule: {
        checkOpinion: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      passRequestData: {}, // 通过不通过传参
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    checkFilter: value => {
      switch (value) {
        case '0':
          return '未审核';
        case '1': 
          return '审核通过';
        case '2':
          return '不通过';  
        default:
          return '';    
      }
    }
  },
  computed: {
    ...mapGetters('adjustmentForeignTradeDivision', ['rescheduleList']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        dealClusterId: this.queryForm.dealClusterId,
        companyName: this.queryForm.companyName,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.dealClusterOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.createdQuery();
  },
  methods: {
    ...mapActions('adjustmentForeignTradeDivision', ['getRescheduleListQueryPage', 'getRescheduleListPage', 'postRescheduleUpdate']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment']),
    // 是否可操作
    handleDisabled(status) {
      if (status === '1' || status === '2') {
        return true;
      } else {
        return false;
      }
    },
    // 通过不通过
    handlePass(row, typeId, formName) {
      this.passRequestData = {
        scheduleId: row.scheduleId,
        checkStatus: typeId,
        checkOpinion: ''
      };
      if (formName === '') {
        if (typeId === '1') { // 通过
          this.$confirm('确定此数据审核通过吗？', '提示', {
            confirmButtonText: '保存',
            cancelBittonText: '取消',
            type: 'warning'
          }).then(() => {
            this.postRescheduleUpdate(this.passRequestData).then(() => {
              this.$message.success('操作成功');
              this.createdQuery();
            }).catch(e => {});
          }).catch(() => {
            this.$message.info('已取消本次操作');
          });
        } else if (typeId === '2') { // 不通过
          this.passObj.checkOpinion = '';
          this.passDialog = true;
          this.currentScheduleId = row.scheduleId;
        }
      } else { // 保存
        this.$refs[formName].validate(valid => {
          if (valid) {
            let fullScreenloading = this.$loading({ fullscreen: true });
            this.passRequestData.scheduleId = this.currentScheduleId;
            this.passRequestData.checkOpinion = this.passObj.checkOpinion;
            this.postRescheduleUpdate(this.passRequestData).then(() => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message.success('操作成功');
              this.passDialog = false;
              this.createdQuery();
            }).catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
          }
        });
      }
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
      this.getRescheduleListPage(this.formQuery).then(() => {
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
