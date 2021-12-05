<style lang="less">
  @import "../../../../../theme/project/css/flex.less";
  #reservation-booth {
    .title{
      font-size: 18px;
      font-weight: 600;
      margin-left: 20px;
    }
    .btn-row{
      margin: 10px;
    }
    .dialog-footer{
      text-align: center;
      margin: 15px 0;
      padding-bottom: 10px;
    }
    .check-item{
      margin: 10px;
    }
    .dialog-userList {
      padding-bottom: 10px;
      height: 32px;
    }
    .li_style {
      float: left;
      list-style: none;
      background-color: rgba(64, 158, 255, 0.1);
      padding: 0 10px;
      margin-right: 5px;
      height: 32px;
      line-height: 30px;
      font-size: 12px;
      color: #409eff;
      border-radius: 4px;
      box-sizing: border-box;
      border: 1px solid rgba(64, 158, 255, 0.2);
    }
    //修改 element样式
    .el-form-item__content {
      width: 60%
    }
  }
</style>

<template>
  <div id="reservation-booth">
    <el-tabs v-model="activeName">
      <el-tab-pane label="申请展位" name="first">
        <!-- 搜索条件 -->
        <div class="bm bm-pc">
          <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
            <el-form-item label="届数:" size="mini">
              <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择" @change="exhibitionNumChange">
                <el-option v-for="(item, index) in exhibitionNum" :key="index"
                  :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="期数:" size="mini">
              <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择" @change="periodCodeChange">
                <el-option v-for="(item, index) in exhibitionSessionArray" :key="index"
                  :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请展区:" size="mini">
              <el-select v-model="ruleForm.exhibitionArea" placeholder="请选择" @change="applyExhibitionRegion">
                <el-option v-for="item in exhibitionAreaArray" :key="item.label"
                  :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专区:" size="mini">
              <el-select v-model="ruleForm.specialArea" placeholder="请选择">
                <el-option v-for="item in specialAreaArray" :key="item.label"
                  :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <el-row class="btn-row">
          <div class="bm bm-pe">
            <el-button type="primary" @click="submitForm()">查询</el-button>
            <el-button type="primary" @click="locationAdd" :disabled ="isShow">新增</el-button>
          </div>
        </el-row>
        <!-- 列表 -->
        <template>
          <el-table
            :data="tableData"
            @selection-change="handleSelectionChange"
            style="width: 100%;"
            @select="handleSelection">
            <el-table-column
              type="selection">
            </el-table-column>
            <el-table-column
              prop="exhibitionNum"
              label="届数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="exhibitionSession"
              label="期数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="exhibitionAreaCode"
              label="申请展区"
              align="center"
              :formatter="formatterRow">
            </el-table-column>
            <el-table-column
              prop="exhibitionRegionId"
              label="专区"
              align="center"
              :formatter="formatterRow">
            </el-table-column>
            <el-table-column
              prop="layout"
              label="展位类型"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.layout==0">光地</span>
                <span v-else-if="scope.row.layout==1">标摊</span>
                <span v-else-if="scope.row.layout==2">豪摊</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="boothNum"
              label="申请展位数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="firstApprove"
              label="审核状态"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.firstApprove==0">未审核</span>
                <span v-else-if="scope.row.firstApprove==1">不通过</span>
                <span v-else-if="scope.row.firstApprove==2 && scope.row.reApprove==0">初审通过</span>
                <span v-else-if="scope.row.firstApprove==2 && scope.row.reApprove==1">不通过</span>
                <span v-else-if="scope.row.firstApprove==2 && scope.row.reApprove==2">审核通过</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="不通过原因"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              fixed="right">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row, scope.index)" type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>

          </el-table>
          <div class="block" style="float:right; margin-top:10px;" >
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      exhibitionSessionArray: [
        {
          label: "1",
          value: 1
        },
        {
          label: "3",
          value: 3
        }
      ],
      exhibitionAreaArray: [],
      specialAreaArray: [],
      activeName: 'first',
      tableData: [],
      ids: [],
      isShow: false,
      expIds: [],
      userIds: [],
      nowUserId: "",
      categories: [],
      idsRow: [],
      currentPage: 1,
      total: 0,
      ruleForm: {
        specialArea: '', // 专区下拉框
        exhibitionNum: '', // 届数下拉框
        exhibitionArea: '', // 展区下拉框
        exhibitionSession: 1 // 期数下拉框
      },
      formLabelWidth: '120px',
      formAward: {
        checkboxGroup: []
      },
      boothParams: {
        "size": 10,
        "current": 1,
        "isAsc": false,
        "orderByField": "apply.create_date"
      }
    };
  },
  computed: {
    ...mapGetters('commonStore', ['exhibitionNum', "currentExhibition"])
  },
  async created() {
    if (!this.exhibitionNum) {
      await this.getExhibitionNum().then(res => {
        if (res) {
          let array = [];
          for (let item of res) {
            array.push({
              label: item.exhibitionNum,
              value: item.exhibitionNum,
              current: item.current
            });
          }
          this.$store.commit('commonStore/EXHIBITION_NUM', array);
          for (let item of this.exhibitionNum) {
            if (item.current) {
              this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
              this.ruleForm.exhibitionNum = this.currentExhibition;
              break;
            }
          }
        }
      });
    } else if (!this.currentExhibition) {
      for (let item of this.exhibitionNum) {
        if (item.current) {
          this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
          this.ruleForm.exhibitionNum = this.currentExhibition;
          break;
        }
      }
    } else {
      this.ruleForm.exhibitionNum = this.currentExhibition;
    }

    this.exhibitionNumChange(this.ruleForm.exhibitionNum);

  },
  mounted() {
    this.getApplicationBooth(this.boothParams).then(res => {
      this.tableData = res.records;
      this.total = res.total;
    });
  },
  methods: {
    ...mapActions("numberBooth", ["getApplyInfo"]), // 用户列表查询
    ...mapActions("numberBooth", ["getApplicationBooth"]), // 用户列表查询
    ...mapActions("commonStore", ["getExhibitionNum", "getExhibitionPlace"]),
    // 格式化
    formatterRow(row, column, cellValue, index) {
      let prop = column.property;
      let value = row[prop];
      let label;
      if (prop === "exhibitionAreaCode") {
        if (this.exhibitionAreaArray.length > 0) {
          for (let item of this.exhibitionAreaArray) {
            if (item.value === value) {
              label = item.label;
              if (this.specialAreaArray.length === 0) {
                this.applyExhibitionRegion(value); 
              }
              break;
            }
          }
          return label; 
        }
      } else if (prop === "exhibitionRegionId") {
        if (this.specialAreaArray.length > 0) {
          for (let item of this.specialAreaArray) {
            if (item.value === value) {
              label = item.label;
              break;
            }
          }
          return label;
        }
      } else {
        return row[prop];
      }
    },
    //届数变化，请求展区
    exhibitionNumChange(param) {
      this.ruleForm.exhibitionArea = "";
      this.ruleForm.specialArea = "";
      let obj = {
        exhibitionNum: param,
        periodCode: this.ruleForm.exhibitionSession,
        exhibitionAreaCode: ""
      };
      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          let array = [];
          for (let item of res) {
            array.push({
              label: item.exhibitionAreaNameCh,
              value: item.exhibitionAreaCode
            });
          }
          if (this.exhibitionAreaArray.length > 0) {
            this.exhibitionAreaArray.splice(0, this.exhibitionAreaArray.length);
          }
          this.exhibitionAreaArray = array;
        }
      });
    },
    //期数变化,请求展区
    periodCodeChange(param) {
      this.ruleForm.exhibitionArea = "";
      this.ruleForm.specialArea = "";
      let obj = {
        exhibitionNum: this.ruleForm.exhibitionNum,
        periodCode: param,
        exhibitionAreaCode: ""
      };
      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          if (res) {
            let array = [];
            for (let item of res) {
              array.push({
                label: item.exhibitionAreaNameCh,
                value: item.exhibitionAreaCode
              });
            }
            if (this.exhibitionAreaArray.length > 0) {
              this.exhibitionAreaArray.splice(0, this.exhibitionAreaArray.length);
            }
            this.exhibitionAreaArray = array;
          }
        }
      });
    },
    //专区
    applyExhibitionRegion(param) {
      this.ruleForm.specialArea = "";
      let obj = {
        exhibitionNum: this.ruleForm.exhibitionNum,
        periodCode: this.ruleForm.exhibitionSession,
        exhibitionAreaCode: param
      };
      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          let array = [];
          for (let item of res[0].exhibitionRegions) {
            array.push({
              label: item.reCh,
              value: item.exhibitionRegionId
            });
          }
          if (this.specialAreaArray.length > 0) {
            this.specialAreaArray.splice(0, this.specialAreaArray.length);
          }
          for (let item of array) {
            this.specialAreaArray.push(item);
          }
        }
      });
    },
    // 搜索框查询
    submitForm() {
      let params = {};
      params = this.boothParams;
      params.specialArea = this.ruleForm.specialArea;
      params.exhibitionNum = this.ruleForm.exhibitionNum;
      params.exhibitionArea = this.ruleForm.exhibitionArea;
      params.exhibitionSession = this.ruleForm.exhibitionSession;

      this.getApplicationBooth(params).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });

    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.json.PageSize = val;
      this.getListPageInfo(this.json).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.json.PageIndex = val;
      this.getListPageInfo(this.json).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 表格多选框选中事件
    handleSelection(selection, row) {
      this.ids.push(row.userId);
      if (row.userType === "0") {
        this.expIds.push(row.userId);
      } else if (row.userType === "1") {
        this.userIds.push(row.userId);
      }
      this.nowUserId = this.$store.getters.userInfo.userId;

    },
    // 跳转到用户新增页面
    locationAdd() {
      this.$router.push('/booth_reservation_add');
    },
    // 修改
    handleEdit(row, index) {
      this.$router.push({
        path: '/booth_reservation_edit',
        query: {
          data: row.boothApplyId
        }
      });
    },
    // 表格多选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
