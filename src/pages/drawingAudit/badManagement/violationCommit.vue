/**
* @file  巡检组-提交施工企业违规报告-核实施工企业违规报告
* @author: llluj
*/
<style scoped>
</style> 

<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="违规报告" name="0">
        <el-form :inline="true" :model="violaCommitForm" class="viola-commit-form-inline">
          <el-form-item label="届数">
            <el-select v-model="violaCommitForm.session" clearable>
              <el-option v-for="(item, index) in sessionList" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期数">
            <el-select v-model="violaCommitForm.phase" clearable>
              <el-option v-for="(item, index) in exhibitionPeriodNum" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展位号">
            <el-select v-model="violaCommitForm.standNo" clearable>
              <el-option v-for="(item, index) in standNoList" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参展企业">
            <el-input v-model="violaCommitForm.exhibitorName" clearable maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="施工企业">
            <el-input v-model="violaCommitForm.constructionCompanyName" clearable maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="申述状态">
            <el-select v-model="violaCommitForm.appealStatus" clearable>
              <el-option v-for="(item, index) in appealStatusList" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="复审状态">
            <el-select v-model="violaCommitForm.approveStatus" clearable>
              <el-option v-for="(item, index) in approveStatusList" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addViolationCommit">新增违规报告</el-button>
          </el-form-item>
        </el-form>
        <el-table border :data="violationCommitList" style="width: 100%" v-loading="loading">
          <el-table-column prop="sequenceNum" label="序号"></el-table-column>
          <el-table-column prop="session" label="届数"></el-table-column>
          <el-table-column prop="phase" label="期数"></el-table-column>
          <el-table-column prop="standNo" label="展位号"></el-table-column>
          <el-table-column prop="exhibitorName" label="参展商名称"></el-table-column>
          <el-table-column prop="constructionCompanyName" label="施工企业名称"></el-table-column>
          <el-table-column prop="appealStatus" label="申述状态">
            <template slot-scope="scope">
              <span>{{ dealWithStatus(appealStatusList, scope.row.appealStatus) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="approveStatus" label="复审状态">
            <template slot-scope="scope">
              <span>{{ dealWithStatus(approveStatusList, scope.row.approveStatus) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="verify" label="评估科核实状态">
            <template slot-scope="scope">
              <span>{{ dealWithStatus(verifyList, scope.row.verify) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">

          </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange">
        </pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { $helper } from "@/scripts/project/utils";
export default {
  name: 'violationCommit',
  components: {
    "pagination": pagination
  },
  data() {
    return {
      activeName: '0',
      loading: false,
      violaCommitForm: {
        session: '', // 届数
        phase: '', // 期数
        standNo: '', // 展位号
        exhibitorName: '', // 参展企业
        constructionCompanyName: '', // 施工企业
        appealStatus: '', // 申述状态
        approveStatus: '' // 复审状态
      },
      sessionList: [], // 届数集合
      exhibitionPeriodNum: [], // 期数集合
      // 展位号集合，暂时模拟
      standNoList: [
        {
          label: 'A4010',
          value: '1'
        },
        {
          label: 'B2121',
          value: '2'
        }
      ],
      // 申述状态集合
      appealStatusList: [
        {
          label: '未申述',
          value: '0'
        },
        {
          label: '已申述',
          value: '1'
        }
      ],
      // 复审状态
      approveStatusList: [
        {
          label: '待复审',
          value: '0'
        },
        {
          label: '确认违规',
          value: '1'
        },
        {
          label: '确认未违规',
          value: '2'
        }
      ],
      // 评估科核实状态
      verifyList: [
        {
          label: '未核实',
          value: '0'
        },
        {
          label: '已核实',
          value: '1'
        }
      ],
      // 初始化分页
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "margin-top: 10px;text-align: right;"
      },
      // 初始查询参数
      initParams: {
        "queryCondition": {},
        "pageStart": "1",
        "pageSize": "10"
      }
    };
  },
  async beforeCreate() {
    this.exhibitionPeriodNum = await kindo.dictionary.get('exhibitionPeriodNum');
  },
  computed: {
    ...mapGetters('common', ['session']), // 获取届数
    ...mapGetters('violationCommit', ['violationCommitList', 'violationCommitCol']),
    // 查询参数
    queryParams() {
      return {
        "queryCondition": {
          "session": this.violaCommitForm.session,
          "phase": this.violaCommitForm.phase,
          "standNo": this.violaCommitForm.standNo,
          "exhibitorName": this.violaCommitForm.exhibitorName,
          "constructionCompanyName": this.violaCommitForm.constructionCompanyName,
          "appealStatus": this.violaCommitForm.appealStatus,
          "approveStatus": this.violaCommitForm.approveStatus
        },
        "pageStart": "1",
        "pageSize": "10"
      };
    }
  },
  created() {
    this.getSessionInfo().then(res => {
      if (res.session && res.session > 0) {
        for (let i = 0; i < res.session; i++) {
          let currentSessionObj = {
            label: '第' + (i + 1) + '届',
            value: i + 1
          };
          this.sessionList.push(currentSessionObj);
        }
        this.sessionList.sort((x, y) => {
          return y.value - x.value;
        });
        this.loading = true;
        this.getViolationCommitList(this.initParams).then((response) => {
          if (response) {
            this.pageInfo.total = response.total;
          }
          this.loading = false;
        }).catch(e => {
          this.loading = false;
        });
      }
    });
  },
  methods: {
    ...mapActions('common', ['getSessionInfo']),
    ...mapActions('violationCommit', ['getViolationCommitList', 'getOneLineViolationCommit', 'addViolationCommit']),
    // 处理申述状态
    dealWithStatus(dicList, value) {
      if (value !== '') {
        return $helper.getDictLabel(dicList, value);
      } else {
        return '';
      }
    },
    // 处理传参
    dealWithQueryParams() {
      if ($helper.paramsValidate(this.queryParams.queryCondition)) {
        return this.initParams;
      } else {
        return this.queryParams;
      }
    },
    // 修改每页显示条数
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      let queryParams = this.dealWithQueryParams();
      queryParams.pageSize = String(val);
      this.loading = true;
      this.getViolationCommitList(queryParams).then((res) => {
        if (res) {
          this.pageInfo.total = res.total;
        }
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 修改当前页
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      let queryParams = this.dealWithQueryParams();
      queryParams.pageStart = String(val);
      this.loading = true;
      this.getViolationCommitList(queryParams).then((res) => {
        if (res) {
          this.pageInfo.total = res.total;
        }
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 查询
    onSubmit() {
      let queryParams = this.dealWithQueryParams();
      this.pageInfo.currentPage = 1;
      queryParams.pageStart = "1";
      queryParams.pageSize = this.pageInfo.pageSize;
      this.loading = true;
      this.getViolationCommitList(queryParams).then((res) => {
        if (res) {
          this.pageInfo.total = res.total;
        }
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 新增违规报告
    addViolationCommit() { }
  }
};
</script>



