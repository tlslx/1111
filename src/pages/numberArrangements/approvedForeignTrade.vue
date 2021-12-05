<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="外贸司审定品牌展位调整安排方案" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" size="small" :model="formData" label-width="120px">
          <el-form-item label="商会">
            <el-select v-model="formData.coceralId" class="widtwo" clearable>
              <el-option
                v-for="(item, index) in localstora.businessAssociation"
                :key="index"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展区">
            <el-select v-model="formData.exhibitionArea" class="widtwo" clearable>
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.exhibitionAreaName"
                :value="item.exhibitionAreaCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易团">
            <el-select v-model="formData.dealClusterId" class="widtwo" clearable>
              <el-option
                v-for="(item, index) in localstora.delegation"
                :key="index"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展期">
            <el-select size="small" class="widtwo" clearable v-model="formData.exhibitionPeriod">
              <el-option v-for="(item, index) in this.exhibitionPeriod" :key="index" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广交会编码">
            <el-input placeholder="请输入" v-model.trim="formData.cantonFairCode" clearable class="widtwo"></el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input placeholder="请输入" v-model.trim="formData.companyName" clearable class="widtwo"></el-input>
          </el-form-item>
          <el-form-item label="外贸司复核结果">
            <el-select class="widtwo" clearable v-model="formData.checkStatus">
              <el-option label="未审核" value="0"></el-option>
              <el-option label="审核通过" value="1"></el-option>
              <el-option label="审核不通过" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle floatlaf" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="rescheduleList.records" v-loading="loading" border>
          <el-table-column label="展期" align="center" prop="exhibitionPeriod"></el-table-column>
          <el-table-column label="展区" align="center" prop="exhibitionAreaName"></el-table-column>
          <el-table-column label="交易团" align="center" prop="dealClusterName"></el-table-column>
          <el-table-column label="广交会编码" align="center" prop="cantonFairCode"></el-table-column>
          <el-table-column label="企业名称" align="center" prop="companyName"></el-table-column>
          <el-table-column label="原展位数" align="center" prop="sourceBoothNumber"></el-table-column>
          <el-table-column label="调整展位数" align="center" prop="adjustBoothNumber"></el-table-column>
          <el-table-column label="调整后展位数" align="center" prop="ajustAfterBoothNumber"></el-table-column>
          <el-table-column label="拟新增品牌展位位置" align="center" prop="scheduleBooth"></el-table-column>
          <el-table-column label="原因" align="center" prop="companyBackInfo"></el-table-column>
          <el-table-column label="交易团审核结果" align="center" prop="companyBackInfo"></el-table-column>
          <el-table-column label="商协会安排理由" align="center" prop="scheduleReason"></el-table-column>
          <el-table-column label="工作部复核结果" align="center" prop="reviewResult"></el-table-column>
          <el-table-column label="外贸司审定" align="center" prop="checkStatus" width="125px">
            <template slot-scope="scope">
              <div v-if="scope.row.rescheduleFlag === '1'">
                <el-select v-model="scope.row.checkStatus" @change="handleSelect(scope.row, $event)">
                  <el-option v-for="(item, index) in checkOpts" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div style="line-height: 68px;">
        <el-row type="flex" justify="space-between" class="pagination-footer">
          <span class="add_btn">
            <el-button type="danger" size="medium" @click="handleDownload">下载</el-button>
            <el-button type="danger" size="medium" @click="handleSubmit">提交</el-button>
          </span>
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
      </div>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      localstora: {
        exhibitionArea: [],
        delegation: [],
        businessAssociation: []
      },
      isRepeat: true, //用于判断数据是否重复
      exhibitionPeriod: [], // 展期
      checkOpts: [{ value: '0', label: '未审核' }, { value: '1', label: '通过' }, { value: '2', label: '不通过' }],
      loading: false,
      rescheduleList: {},
      reschedules: [],
      formData: {
        exhibitionArea: '',
        coceralId: '',
        dealClusterId: '',
        exhibitionPeriod: '',
        cantonFairCode: '',
        companyName: '',
        checkStatus: ''
      },
      pageInfo: { current: 1, size: 10 },
      activeName: "first"
    };
  },
  computed: {
    ...mapGetters('workDepartReturn', ['selectRescheduleList']),
    formQuery() {
      return {
        exhibitionArea: this.formData.exhibitionArea,
        coceralId: this.formData.coceralId,
        dealClusterId: this.formData.dealClusterId,
        exhibitionPeriod: this.formData.exhibitionPeriod,
        cantonFairCode: this.formData.cantonFairCode,
        companyName: this.formData.companyName,
        checkStatus: this.formData.checkStatus,
        current: this.pageInfo.current,
        size: this.pageInfo.size
      };
    }
  },
  async beforeCreate() {
    this.exhibitionPeriod = await kindo.dictionary.get('exhibitionPeriodNum'); // 展期
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      this.localstora.businessAssociation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  methods: {
    ...mapActions('workDepartReturn', ['getSelectRescheduleList', 'postSelectRescheduleList']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getassociationDepartment']),
    // 获取页面初始数据
    getListPage() {
      this.loading = true;
      this.getSelectRescheduleList(this.formQuery).then(res => {
        this.loading = false;
        this.rescheduleList = JSON.parse(JSON.stringify(this.selectRescheduleList));
        for (let i = 0; i < this.rescheduleList.records.length; i++) {
          if (this.rescheduleList.records[i].cantonFairCode == null || this.rescheduleList.records[i].cantonFairCode === 'null') {
            this.rescheduleList.records[i].cantonFairCode = '';
          }
        }
      }).catch(e => {
        this.loading = false;
      });
    },
    //选定外贸司审定
    handleSelect(items, $event) {
     // this.reschedules = [];
      let obj = {
        'scheduleId': items.scheduleId,
        'checkStatus': $event,
        'companyId': items.companyId
      };
      if (this.reschedules.length === 0) {
        this.reschedules.push(obj);
      } else {
        for (let i = 0; i < this.reschedules.length; i++) {
          if (obj.companyId === this.reschedules[i].companyId) {
            this.reschedules[i] = obj;
            this.isRepeat = false; //判断是否重复
          }
        }
        if (this.isRepeat) {
          this.reschedules.push(obj);
          this.isRepeat = true;
        }
      }
      console.log(this.reschedules, "reschedules");
    },
    //提交
    handleSubmit() {
      if (this.reschedules.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择需要提交的数据'
        });
      } else {
        this.loading = true;
        this.$http.postJson(`${process.env.API_NA_URL}/api/reschedule/batchUpdate`, this.reschedules).then((res) => {
          this.reschedules = [];
          this.loading = false;
          this.$message({
            type: 'success',
            message: '提交成功'
          });
          this.getListPage();
        }).catch(e => {
          this.loading = false;
        });
      }
    },
    // 下载
    handleDownload() {

    },
    // 筛选
    onSearch() {
      this.pageInfo.current = 1;
      this.getListPage();
    },
    // 编辑
    edit(a) {
    },
    // 分条/页
    handleSizeChange(val) {
      this.pageInfo.size = val;
      this.getListPage();
    },
    // 分页
    handleCurrentChange(val) {
      this.pageInfo.current = val;
      this.getListPage();
    }
  }
};
</script>

<style scoped>
.formStyle {
  padding: 8px 30px;
}
.paginationTop {
  margin-top: 10px;
}
.floatLeft {
  float: left;
}
.floatRight {
  float: right;
  margin-right: 50px;
}
.widtwo {
  width: 215px;
}
.acentsty {
  text-align: center;
  /* padding: 20px; */
}
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}
</style>

