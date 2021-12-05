<style scoped>
.floatRight {
  float: right;
  margin-right: 50px;
}
.formStyle {
  padding: 8px 30px;
}
.paginationTop {
  margin-top: 10px;
}
.floatLeft {
  float: left;
}
.widtwo {
  width: 215px;
}
.divp {
  text-align: center;
  padding: 20px 0;
}
</style>

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="交易团预订款汇总" name="first">
      <search-param-link :searchParamsForm="searchForm"
        :dictionary="searchDic"
        @select-params="filtrateParams"
      >筛选</search-param-link>
      <div class="paginationTop floatLeft">
        <el-button type="primary" class="formStyle" size="small">打印</el-button>
        <el-button type="primary" class="formStyle" size="small" @click="isnoDia = true">导出</el-button>
      </div>
      <!-- 横线 -->
      <!-- <el-divider></el-divider> -->
      <!-- <p><span>数据生成时间：{{date}}</span></p> -->
      <!-- 表格 -->
      <simpleness-table
        :loading="loading"
        :tableData="tableData"
        :tableTrData="data"
      ></simpleness-table>
      <!-- 分页 -->
      <div style="padding-top: 10px;float: right;">
        <pagination :pageInfo="paginationData" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import SearchParamLinkage from "@/components/project/common1/searchParamLinkage";
import SimplenessTable from "@/components/project/common1/simplenessTable";
import pagination from "@/components/project/common1/pagination";
import { mapActions } from "vuex";
export default {
  components: {
    "search-param-link": SearchParamLinkage,
    "simpleness-table": SimplenessTable,
    pagination
  },
  data() {
    let myDate = new Date();
    let date = myDate.toLocaleString();
    return {
      isnoDia: false,
      date,
      loading: false,
      tableData: [
        {
          danh: "132"
        }
      ],
      checkList: [],
      isSelection: true,
      searchForm: [
        {
          prop: "biaoti",
          label: "届数",
          value: "",
          type: "input"
        },
        {
          prop: "jieshu",
          label: "交易团",
          value: "",
          type: "select"
        }
      ],
      searchDic: {
        jieshu: [
          {
            label: "北京",
            value: "010"
          },
          {
            label: "江苏",
            value: "140"
          }
        ],
        zhanweileix: []
      },
      data: [
        {
          prop: "danh",
          label: "届数",
          type: "string",
          width: "90"
        },
        {
          prop: "danh",
          label: "交易团",
          type: "string",
          width: "190"
        },
        {
          prop: "",
          label: "品牌展位数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "一般性展位数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "合计",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "应缴展位预订款（万元）",
          type: "string",
          width: "90"
        }
      ],
      pastb: {
        examineOpinion: ""
      },
      rulesnp: {
        examineOpinion: [{ required: true, message: '请输入...', trigger: 'blur' }]
      },
      paginationData: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      exhibitionSessionOpts: [],
      delegationOpts: [],
      exhibitionAreaOpts: [],
      queryForm: {
        exhibitionSession: '',
        delegationId: '',
        exhibitionAreaCode: '',
        boothType: '',
        companyName: ''
      },
      activeName: "first"
    };
  },
  created() {
    // 获取届数
    this.getsysExhibitions().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.exhibitionSessionOpts.push(res.data[i].exhibitionNum - 0);
      }
      let rul = (a, b) => a - b;
      this.exhibitionSessionOpts = this.exhibitionSessionOpts.sort(rul);
    });
    // 获取交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 获取展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  methods: {
    ...mapActions("exhibitionSettlement", [
      "getOrdinaryAdjustCompany"
    ]),
    ...mapActions("nainformation", [
      "getsysExhibitions", //获取展届信息
      "getdelegationDepartment", // 获取所有交易团
      "getexhibitionArea" // 获取展区
    ]),
    // 获取页面初始数据
    getListPage(url) {

    },
    // 是否可勾选
    isSelect(row, inde) {
      return true;
    },
    // 组件打钩事件
    seChange(val) {
    },
    // 筛选
    filtrateParams() {
      let formData = {};
      this.searchForm.forEach((val, index) => {
        if (val.prop === "jieshu") {
          formData["jieshu"] = val.value;
        }
      });
      let obj = {
        current: 1,
        size: 10
      };
      let key = Object.keys(formData);
      for (let i = 0; i < key.length; i++) {
        let aFirst = key[i];
        let bSecend = formData[key[i]];
        if (bSecend !== "") {
          obj[aFirst] = bSecend;
        }
      }
      this.getListPage(obj);
    },
    // 查看调转
    skip(val) {
      this.$router.push({
        path: "/reviewBookingInformationView",
        query: {
          data: val
        }
      });
    },
    // 不通过 确定
    handnoSeave() {
      // this.pastb.examineStatus = "2";
      // this.$refs[fnamen].validate((valid) => {
      //   if (valid) {
      //     this.updatecoceralCheck(this.pastb).then(res => {
      //       this.isnoDia = false;
      //       this.$message({
      //         message: "不通过成功",
      //         type: "success"
      //       });
      //       this.pastb = {
      //         recommendId: "",
      //         examineStatus: "",
      //         examineOpinion: ""
      //       };
      //       this.getListPage(this.obj); // 调用初始加载页面方法
      //     }).catch(e => {});
      //   } else {
      //     return false;
      //   }
      // });
    },
    // 不通过 取消
    handnoCancel() {},
    // 分条/页
    handleSizeChange(val) {
      this.obj.size = val;
      this.getListPage(this.obj);
    },
    // 分页
    handleCurrentChange(val) {
      this.obj.current = val;
      this.getListPage(this.obj);
    }
  }
};
</script>

