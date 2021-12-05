/**
 * @file 组展进度设置---组展单位-查看当前进度计划
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="组展单位-查看当前进度计划" name="first">
      <div class="top-btn">
        <div class="top-session">
          第
          <el-select v-model="session" placeholder="请选择届数" class="top-select" @change="sessionChange">
            <el-option
              v-for="item in sessionOption"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          届广交会出口展组展工作时间进度计划表
        </div>
        <el-button type="text" @click="toDownload" class="top-btns">下载</el-button>
      </div>
      <default-table
        class="table-margin"
        :cols="cols"
        :data="tableData"
        :loading="loading"
        :stripe="stripe"
      ></default-table>
      <pagination
        class="page-bar"
        :pageInfo="pageInfo"
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"
      ></pagination>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import defaultTable from '@/components/project/supportNature/defaultTable.vue';
import pagination from '@/components/project/common/pagination.vue';
// vuex
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    'pagination': pagination,
    'default-table': defaultTable
  },
  data () {
    return {
      // tab
      activeName: 'first',
      // 可编辑表格loading
      loading: false,
      stripe: false,
      // 届数 假值
      session: '',
      // // 届数数组
      sessionOption: [],
      // // 假的最新一届
      // newSession: [7],
      // 表头数据
      cols: [
        {
          prop: 'progressItemRule',
          label: '组展事项'
        },
        {
          prop: 'progressSubitemRule',
          label: '子项'
        },
        {
          prop: 'businessNode',
          label: '具体业务环节'
        },
        {
          prop: 'startTime',
          label: '计划开始时间'
        },
        {
          prop: 'endTime',
          label: '计划完成时间'
        },
        {
          prop: 'workday',
          label: '工作日'
        },
        {
          prop: 'naturalday',
          label: '自然日'
        },
        {
          prop: 'progressValue',
          label: '完成进度'
        }
      ],
      // 发布前表格数据
      tableData: {
        data: []
      },
      // 分页数据
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: 'padding: 20px 0;text-align: center;'
      },
      // 初始传参
      queryParams: {
        current: "1",
        // 此字段目前为假，后期由用户进入获取
        exhibitionNum: "1",
        orgId: '150',
        size: "10"
      }
    };
  },
  computed: {
    ...mapGetters('organizationProgress', ['organinfo'])
  },
  async created() {
    this.session = await this.currentSessionInfo().then(reso => reso.exhibitionNum);

    let exhibitions = await this.queryExhibitionNumInfo();

    // let newArr = Array.from(new Set([].concat(this.session, exhibitions))).sort((a, b) => a - b);
    exhibitions.forEach(item => {
      this.sessionOption.push(item.exhibitionNum);
    });
    this.getData();
  },
  methods: {
    ...mapActions('organizationProgress', ['queryOrganizerInfo', 'currentSessionInfo']),
    toDownload() {
      // kindo.util.getdown(`${process.env.API_SN_URL}/api/progress/see/org/export?exhibitionNum=${this.session}`, '组展进度情况查阅(组展单位).xls');
    },
    // 初始列表
    getData() {
      // 开始loading
      this.loading = true;
      this.queryOrganizerInfo(this.queryParams).then(res => {
        // 查询成功
        // 分页
        if (res.total > 0) {
          this.pageInfo.currentPage = res.current;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
        this.tableData.data = res.records;
        // 结束loading
        this.loading = false;
      }).catch(e => {
        // 查询失败
        // 结束loading
        this.loading = false;
      });
    },
    // // 届数改变
    // sessionChange(val) {
    //   // 传参改变，刷新表格
    //   this.queryParams.exhibitionNum = val;
    //   this.session = val;
    //   this.getData();
    // },
     // 发布后分页事件
    handleSizeChange(val) {
      //设置table的loading变量
      this.pageInfo.pageSize = val;
      this.queryParams.size = val;
      this.getData();
    },
    // 发布后
    handleCurrentChange(val) {
      //设置table的loading变量
      this.pageInfo.currentPage = val;
      this.queryParams.current = val;
      this.getData();
    }
  }
};
</script>
<style scoped>
  .table-margin {
    margin: 10px 0;
  }
  .top-select {
    width:200px;
    margin: 0 5px;
  }
  .top-btns {
    float: right;
    text-decoration: underline;
    color: #409EFF;
  }
  .top-session {
    float: left;
    display: flex;
  }
  .top-btn {
    width: 96%;
    height: 40px;
    line-height: 40px;
  }
  .bom-btn {
    width: 96%;
    padding: 0 2%;
  }
</style>
