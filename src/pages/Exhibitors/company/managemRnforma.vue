<style scoped>

</style>
<template>
  <el-tabs v-model="activeName" class="businessReview">
    <el-tab-pane label="管理招展代理信息" name="first"></el-tab-pane>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="招展代理">
        <el-select v-model="formInline.region" placeholder="请选择" :clearable='true' @change="handelChange">
          <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option>
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="increase">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- :loading="loading" -->
    <canBeEdit-table  :tableTrData="reviewTrDate" :tableData="dataTima" :selection='selection' :isSelectable='isSelectable' @change-multiple-selection='selectAll' @deal-with-operate="customsEvent"></canBeEdit-table>
    <el-row type="flex" justify="space-between" class="pagination-contain">
      <div style="margin-top:8px;">

        <el-button type="danger" size="medium" @click="handelStop">停用</el-button>
        <el-button type="danger" size="medium" @click="handelStart">启用</el-button>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfoData.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfoData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfoData.total">
      </el-pagination>
    </el-row>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import { mapActions } from "vuex";
// import stationInfoSum from '../../../scripts/project/supportNature/apis/supportNature/stationInfoSum';
export default {
  components: {
    "canBeEdit-table": canBeEditTable
  },
  data() {
    return {
      activeName: 'first',
      selection: true,
      formInline: {
        region: ''
      },
      reviewTrDate: [
        {
          prop: "agentCh",
          label: "招展代理",
          type: "string"
        },
        {
          prop: "agentEn",
          label: "招展代理英文名称",
          type: "string"
        },
        {
          prop: "crChName",
          label: "国家/地区",
          type: "string"
        },
        {
          prop: "isEnabled",
          label: "状态",
          type: "string"
        },
        {
          type: "btn",
          label: "操作",
          show: true,
          unChangeStatus: true,
          width: "160",
          operator: {
            type: "text",
            textArray: [
              {
                prop: "pass",
                label: "编辑",
                style:
                  "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
              }
            ]
          }
        }
      ],
      dataTima: [
      ],
      pageInfoData: {
        currentPage: 1,
        pageSize: 0,
        total: 1
      },
      obj: {
        current: 1,
        size: 10,
        orderByField: 'agent.create_date',
        isAsc: false,
        agentId: ''
      },
      dataList: []
    };
  },
  created() {
    this.handelGetAgentManagement(this.obj);
    this.getRecruiAgentsDrop().then(res => {
      // console.log(res, '7878');
      this.dataList = [];
      res.forEach(el => {
        let obj = {
          label: el.agentCh,
          value: el.exhibitionAgentId
        };
        this.dataList.push(obj);
      });
    });
  },
  methods: {
    ...mapActions("managemeAgentnt", [
      "getAgentManagement",   // 初始化页面
      "getRecruiAgentsDrop"   // 获取招展代理下拉
    ]),
    // 初始化页面
    handelGetAgentManagement(obj) {
      this.getAgentManagement(obj).then(res => {
        // this.dataTima['operating'] = true;
        let list = JSON.parse(JSON.stringify(res.records));
        list.forEach((el, index) => {
          this.dataList.forEach((item, indexed) => {
            if (el.exhibitionAgentId === item.exhibitionAgentId) {
              list[index].agentCh = item.agentCh;
            }
          });
        });
        this.dataTima = list;
        this.pageInfoData.currentPage = res.current;
        this.pageInfoData.pageSize = res.size;
        this.pageInfoData.total = res.total;
      });
    },
    // 选择招商代理
    handelChange(val) {
      this.obj.agentId = val;
    },
    // 停用
    handelStop() {},
    // 启用
    handelStart() {},
    // 查询
    onSubmit() {
      this.handelGetAgentManagement(this.obj);
    },
    // 操作页面分页
    handleSizeChange() {},
    // 分页按钮
    handleCurrentChange() {},
    // 新增
    increase() {
      this.$router.push("/fillRnforma");
    },
    // selection() {},
    selectAll() {},
    // 全选
    isSelectable(row, index) {
      // console.log(row, 'row');
      
      return true;
    },
    // 操作按钮 lacalStorage.setItem('username','zxy');设置  localStorage.getItem('username');获取
    customsEvent(scope, operateItem, operate) {
      JSON.stringify(localStorage.setItem('exhibitionAgentId', scope.row.exhibitionAgentId));
      this.$router.push({
        path: '/fillRnformas',
        query: scope.row
      });
    }
  }
};
</script>

