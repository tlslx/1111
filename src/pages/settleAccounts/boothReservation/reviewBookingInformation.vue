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
    <el-tab-pane label="中心财务部审核预订款信息" name="first">
      <search-param-link :searchParamsForm="searchForm"
        :dictionary="searchDic"
        @select-params="filtrateParams"
      >筛选</search-param-link>
      <!-- 横线 -->
      <!-- <el-divider></el-divider> -->
      <p><span>数据生成时间：{{date}}</span></p>
      <!-- 表格 -->
      <simpleness-table
        :loading="loading"
        :selection="true"
        :isSelectable="isSelect"
        @selectionChange="seChange"
        :tableData="tableData"
        :tableTrData="data"
        @skip="skip"
      ></simpleness-table>
      <div class="paginationTop floatLeft">
        <el-button type="primary" class="formStyle" size="small">通过</el-button>
        <el-button type="primary" class="formStyle" size="small" @click="isnoDia = true">不通过</el-button>
      </div>
      <!-- 不通过弹框 -->
      <el-dialog title="审核" :visible.sync="isnoDia" v-if="isnoDia" :close-on-click-modal="false" width="500px" center>
        <el-form :model="pastb" :rules="rulesnp" :inline="true" ref="npruleForm" size="small" label-width="140px">
          <el-form-item label="不通过原因" prop="examineOpinion">
            <el-input type="textarea" v-model.trim="pastb.examineOpinion" :rows="5" class="widtwo"></el-input>
          </el-form-item>
          <div class="divp">
            <el-button type="primary" @click="handnoSeave('npruleForm')">保存</el-button>
            <el-button @click="handnoCancel">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
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
          label: "标题",
          value: "",
          type: "input"
        },
        {
          prop: "jieshu",
          label: "交易团",
          value: "",
          type: "select"
        },
        {
          prop: "zhanweileix",
          label: "展位类型",
          value: "",
          type: "select"
        },
        {
          prop: "zhanweileix",
          label: "审核状态",
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
          label: "单号",
          type: "string",
          width: "90"
        },
        {
          prop: "danh",
          label: "标题",
          type: "string",
          width: "190"
        },
        {
          prop: "",
          label: "款项",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "交易团",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "展位类型",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "工作部审核结果",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "操作",
          type: "btn",
          width: "90",
          textArray: [
            {
              type: "skip",
              style: "",
              label: "查看"
            }
          ]
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

