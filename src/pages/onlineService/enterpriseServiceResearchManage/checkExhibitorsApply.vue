/**
 * @file 审核展商动态申请
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="参展商企业动态" name="0">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="dictionaryData"
        @select-params="selectParams">
      </search-param-link>
      <cust-table
        :cols="cols"
        :data="tableData"
        @deal-with-operate="dealWithOperate"
        @change-multiple-selection="changeMultipleSelection"
        @to-boost="toBoost"
      ></cust-table>
      <el-dialog title="图片预览" :visible.sync="dialogVisible">
        <img :src="imgSrc" width="100%">
      </el-dialog>
      <div class="associa-recom-btn-container">
        <div>
          <pagination
            class="page-bar"
            :pageInfo="pageInfo"
            @handle-size-change="handleSizeChange"
            @handle-current-change="handleCurrentChange"
          ></pagination>
        </div>
        <el-form ref="form" :model="form" label-width="260px">
          <el-form-item label="审核意见：" label-width="240px">
            <el-select style="width: 260px;" v-model="form.approveResult" placeholder="请选择" @change="passChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核不通过原因(不超过200字符)：" label-width="240px" v-if="isNot">
            <el-input style="width: 260px;" type="textarea" :rows="5" v-model="form.approveExplain" clearable maxlength="200"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn-bar">
          <el-button type="primary" v-if="form.approveResult === '1'" @click="pass" :disabled="disabled">审核通过</el-button>
          <el-button type="danger" v-if="form.approveResult === '0'" @click="noPass" :disabled="disabled">审核不通过</el-button>
          <el-button type="warning" v-if="form.approveResult === '1'" @click="toGreat" :disabled="disabled">审核通过并标为优秀文章</el-button>
          <el-button type="success" @click="remGreat" :disabled="disabled">移除优秀文章</el-button>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { $helper } from '@/scripts/project/utils';
import { mapGetters, mapActions } from "vuex";
const COMPANYID = localStorage.getItem("getComPanyId");
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    "cust-table": custTable,
    "search-param-link": searchParamLinkage,
    "pagination": pagination
  },
  data() {
    return {
      // 禁用变量
      disabled: true,
      dialogVisible: false,
      imgSrc: "",
      // 审核不通过变量
      isNot: false,
      // 审核意见对象
      form: {
        approveResult: "",
        approveExplain: ""
      },
      // 审核意见选项
      options: [
        {
          value: "1",
          label: "审核通过"
        },
        {
          value: "0",
          label: "审核不通过"
        }
      ],
      // 搜索框联动设置
      searchParamsForm: {
        variate: "companyName",
        data: [
          {
            prop: "companyName",
            label: "企业名称",
            value: "",
            type: "input"
          },
          {
            prop: "approverResult",
            label: "审核状态",
            value: "",
            type: "select"
          },
          {
            prop: "releaseDate",
            label: "发布时间",
            value: new Date(),
            type: "date"
          }
        ]
      },
      // 字典数据
      dictionaryData: {
        approverResult: [
          {
            value: "1",
            label: "审核通过"
          },
          {
            value: "0",
            label: "审核不通过"
          },
          {
            value: "9",
            label: "待审核"
          }
        ]
      },
      // 多选审核通过数据
      selectPass: [],
      // 多选审核不通过数据
      selectNotPass: [],
      // tab
      activeName: 0,
      // 表头数据
      cols: [
        {
          prop: "companyName",
          label: "企业名称"
        },
        {
          prop: "contentTitle",
          label: "新闻标题"
        },
        {
          prop: "contentText",
          label: "新闻内容"
        },
        {
          prop: "imgUrl",
          type: "img",
          label: "图片预览"
        },
        {
          prop: "releaseDate",
          label: "发布时间"
        },
        {
          prop: "approverResult",
          label: "审核状态"
        }
        // {
        //   prop: "modifyDate",
        //   label: "点击情况"
        // },
        // {
        //   prop: "operation",
        //   type: "operator",
        //   label: "操作",
        //   btns: [
        //     {
        //       type: "underlineText",
        //       prop: "edit",
        //       label: "修改",
        //       style: "cursor: pointer;text-decoration: underline;color: #409EFF;margin: 0px 8px;"
        //     },
        //     {
        //       type: "underlineText",
        //       prop: "del",
        //       label: "删除",
        //       style: "cursor: pointer;text-decoration: underline;color: #f56c6c;margin: 0px 8px;"
        //     }
        //   ]
        // }
      ],
      // 分页信息
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: right;"
      },
      // 表格数据
      tableData: {
        data: [],
        selection: true
      },
      // 传参
      searchParams: {
        "reviewPublishExhibitionSession": {
          "companyId": COMPANYID,
          "approverResult": "9"
        },
        "pageStart": "1",
        "pageSize": "10"
      },
      multipleSelection: [] //保存勾选到的数据
    };
  },
  watch: {
    // 监听表格数据
    getPubExh(newVal) {
      this.tableData.data = JSON.parse(JSON.stringify(newVal));
    }
  },
  computed: {
    ...mapGetters('exhibitorDynamicInfo', ['getPubExh'])
  },
  mounted() {
    // 日期选择器初始置空
    // this.searchParamsForm.data[2].value = new Date();
  },
  created() {
    this.searchParamsForm.data[1].value = "9";
    // 初始化数据
    this.getData();
  },
  methods: {
    ...mapActions('exhibitorDynamicInfo', ['getPublishExhibition', 'removeExcellentArticleMarkInfo', 'reviewExpoDynamicInfo', 'deleteDynamicTrade']),
    // 初始数据
    getData() {
      this.loading = true;
      this.getPublishExhibition(this.searchParams).then(response => {
        if (response.total > 0) {
          this.pageInfo.currentPage = response.current;
          this.pageInfo.total = response.total;
        } else if (response.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 审核意见下拉改变事件
    passChange(val) {
      if (val === "0") {
        this.isNot = true;
      } else {
        this.isNot = false;
      }
    },
    // 操作
    dealWithOperate(scope, prop) {
      //编辑点击事件
      if (prop === "edit") {
        // 跳转页面并传值
        this.$router.push({
          path: "/enterprisePutExhibitorState",
          query: {
            contentTitle: scope.row.contentTitle,
            contentText: scope.row.contentText,
            contentTitleEn: scope.row.contentTitleEn,
            contentTextEn: scope.row.contentTextEn,
            exhibitorDynamicId: scope.row.exhibitorDynamicId,
            imageEnclosure: scope.row.imageEnclosure,
            companyName: scope.row.companyName,
            companyId: scope.row.companyId,
            isAudit: "2"
          }
        });
      }
      // 删除点击事件
      if (prop === "del") {
        let exhibitorDynamicId = scope.row.exhibitorDynamicId;
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteDynamicTrade(exhibitorDynamicId).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getData();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    },
    // 多选事件
    changeMultipleSelection(val) {
       // 获取多选值并保留传参所需字段
      this.multipleSelection = val;
      if (val.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    // 修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.pageSize = val;
      this.getPublishExhibition(this.searchParams).then(res => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 修改当前页信息
    handleCurrentChange(val) {
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.pageStart = val;
      this.getPublishExhibition(this.searchParams).then(res => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 审核通过
    pass() {
      // 多选审核通过数组
      this.selectPass = this.multipleSelection.map(el => {
        return {
          "businessId": el.exhibitorDynamicId,
          "approveExplain": "同意",
          "approveResult": "1",
          "approverResult": "1",
          "exhibitorDynamicId": el.exhibitorDynamicId
        };
      });
      let param = {
        "reviewExpoDynamicSession": this.selectPass
      };
      this.reviewExpoDynamicInfo(param).then(res => {
        this.$message({
          type: 'success',
          message: '审核通过!'
        });
        this.getData();
      });
    },
    // 审核不通过
    noPass() {
       // 多选审核不通过数组
      this.selectNotPass = this.multipleSelection.map(el => {
        if (this.form.approveExplain === "") {
          this.form.approveExplain = "不同意";
        }
        return {
          "businessId": el.exhibitorDynamicId,
          "approveExplain": this.form.approveExplain,
          "approveResult": "0",
          "approverResult": "0",
          "exhibitorDynamicId": el.exhibitorDynamicId
        };
      });
      let param = {
        "reviewExpoDynamicSession": this.selectNotPass
      };
      this.reviewExpoDynamicInfo(param).then(res => {
        this.$message({
          type: 'error',
          message: '审核不通过!'
        });
        this.getData();
      });
    },
    // 移除优秀文章
    remGreat() {
      this.selectPass = this.multipleSelection.map(el => {
        return {
          "modifierId": this.$store.getters.userInfo.userId,
          "modifierName": this.$store.getters.userInfo.userName,
          "exhibitorDynamicId": el.exhibitorDynamicId
        };
      });
      let param = {
        "articleMarkSession": this.selectPass
      };
      this.removeExcellentArticleMarkInfo(param).then(res => {
        this.$message({
          type: 'success',
          message: '移除优秀文章!'
        });
        this.getData();
      });
    },
    // 标注为优秀文章
    toGreat() {
      this.selectPass = this.multipleSelection.map(el => {
        return {
          "businessId": el.exhibitorDynamicId,
          "approveExplain": "同意",
          "approveResult": "1",
          "approverResult": "1",
          "excellentArticleMark": "1",
          "exhibitorDynamicId": el.exhibitorDynamicId
        };
      });
      let param = {
        "reviewExpoDynamicSession": this.selectPass
      };
      this.reviewExpoDynamicInfo(param).then(res => {
        this.$message({
          type: 'success',
          message: '审核通过并标记为优秀文章!'
        });
        this.getData();
      });
    },
    // 模糊查询
    selectParams() {
      this.searchParamsForm.data[2].value = new Date(this.searchParamsForm.data[2].value).getTime();
      this.searchParams.reviewPublishExhibitionSession = {
        'companyId': COMPANYID,
        'releaseStatus': '1'
      };
      this.searchParamsForm.data.map(el => {
        if (el.value !== "" && el.value !== 0) {
          el.value = el.value ? $helper.trim(el.value) : null;
          this.searchParams.reviewPublishExhibitionSession[el.prop] = el.value;
        }
      });
      this.getData();
    },
    // 预览大图
    toBoost(scope) {
      this.imgSrc = scope.row.imageUrl;
      this.dialogVisible = true;
    }
  }
};
</script>
<style scoped>
.associa-recom-btn-container {
  padding: 10px 20px;
  width: 100%;
}
.recommend-btn {
  background-color: #ff0033;
  color: #fff;
  outline: none;
  border: 0;
}
.el-form-item {
  width: 300px;
  margin-bottom: 22px;
}
.btn-bar {
  margin-left: 200px;
}
</style>
