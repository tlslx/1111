<style lang="less" scoped>
@import "../../../../../theme/project/css/flex.less";
</style>

<template>
  <el-tabs value="default">
    <el-tab-pane label="审核证件申请" name="default">
      <el-form :inline="true" :model="queryForm">
        <el-form-item label="期数" prop="name">
          <el-select style="width: 90%" v-model="queryForm.exhibitionPeriod" placeholder="请选择">
            <el-option label="1" :value="1"></el-option>
            <el-option label="3" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select style="width: 90%" placeholder="请选择" v-model="queryForm.badgeTypeCode" clearable>
            <el-option  v-for="(item, index) in badgeArray" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="初审状态" prop="reviewStatusOne">
          <el-select  placeholder="请选择" v-model="queryForm.reviewStatusOne" clearable>
            <el-option  v-for="item in reviewStatusOneArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="复审状态" prop="reviewStatusTwo">
          <el-select  placeholder="请选择" v-model="queryForm.reviewStatusTwo" clearable >
            <el-option  v-for="item in reviewStatusOneArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称:" size="small">
          <el-input style="width: 90%" v-model="queryForm.companyName" disabled></el-input>
        </el-form-item>
        <el-form-item label="代理名称" prop="agent">
          <el-select  placeholder="请选择" v-model="queryForm.agentName" clearable >
            <el-option  v-for="item in agentArray" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="制证状态">
          <el-select  placeholder="请选择" v-model="queryForm.accreditation" clearable>
            <el-option  v-for="item in accreditationState" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名:" size="small">
          <el-input style="width: 90%" v-model="queryForm.personName" ></el-input>
        </el-form-item>
        <el-form-item label="广交会编码:" size="small">
          <el-input style="width: 90%" v-model="queryForm.gjhNum" ></el-input>
        </el-form-item>
        <el-form-item label="证件号码:" size="small">
          <el-input style="width: 90%" v-model="queryForm.papersNum" ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getTableListCheckPapers(this.queryForm)" size="mini">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" border>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column v-for="(item, index) in tableHead" :key="index"
          :prop="item.prop" :label="item.label" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text">提交修改申请</el-button>
            <el-button type="text" @click="handleEditDialog(scope.row.ifoPersonId)">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.row.ifoPersonId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="bm bm-pj">
        <el-button type="primary">批量审核</el-button>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryForm.current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="queryForm.size"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      reviewStatusOneArr: [
        { value: 0, label: '未审核' }, { value: 1, label: '不通过' }, { value: 2, label: '审核通过' }
      ],
      badgeArray: [],
      agentArray: [],
      accreditationState: [
        {
          label: "已制证",
          value: "y"
        },
        {
          label: "未制证",
          value: "p"
        }
      ],
      queryForm: {
        exhibitionPeriod: "",
        badgeTypeCode: "",
        reviewStatusOne: "",
        reviewStatusTwo: "",
        companyName: "",
        accreditation: "",
        agentName: "",
        personName: "",
        gjhNum: "",
        papersNum: "",

        current: 1,
        size: 10
      },
      total: 0,
      tableData: [],
      tableHead: [
        {
          prop: "a",
          label: "申请单编号"
        },
        {
          prop: "a",
          label: "证件类型"
        },
        {
          prop: "a",
          label: "招展代理"
        },
        {
          prop: "a",
          label: "企业名称"
        },
        {
          prop: "a",
          label: "企业英文名称"
        },
        {
          prop: "a",
          label: "广交会编码"
        },
        {
          prop: "a",
          label: "届数"
        },
        {
          prop: "a",
          label: "期数"
        },
        {
          prop: "a",
          label: "开始日期"
        },
        {
          prop: "a",
          label: "结束日期"
        },
        {
          prop: "a",
          label: "人员"
        },
        {
          prop: "a",
          label: "证件照"
        },
        {
          prop: "a",
          label: "证件号码"
        },
        {
          prop: "a",
          label: "有效期"
        },
        {
          prop: "a",
          label: "扫描件"
        },
        {
          prop: "a",
          label: "领证地点"
        },
        {
          prop: "a",
          label: "初审状态"
        },
        {
          prop: "a",
          label: "复审状态"
        },
        {
          prop: "a",
          label: "制证状态"
        }
      ]
    };
  },
  methods: {
    ...mapActions("certificateManage", ["getFirstCheckPapersList"]),
    getTableListCheckPapers(param) {
      this.getFirstCheckPapersList(param).then(res => {
        this.tableData.splice(0, this.tableData.length);
        if (res && res.records && res.records.length) {
          this.total = res.total;
          this.tableData = res.records;
        }
      });
    },
    handleSizeChange(val) {
      this.queryForm.size = val;
      this.getTableListCheckPapers(this.queryForm);
    },
    handleCurrentChange(val) {
      this.queryForm.current = val;
      this.getTableListCheckPapers(this.queryForm);
    }
  },
  async created() {
    // this.getTableListCheckPapers(this.queryForm);
    this.badgeArray = await kindo.dictionary.get('badgeType');
  }
};
</script>
