<style lang="less">
  @import "../../../../../theme/project/css/flex.less";
  #booth-allot {
    .num-show {
      margin: 10px 0;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    input[type="number"]{
      -moz-appearance: textfield;
    }
  }
</style>

<template>
  <div id="booth-allot">
    <el-tabs v-model="activeName">
      <el-tab-pane label="展位预分配" name="index">
        <el-row :gutter="10" class="num-show">
          <el-col :span="8">
            <div class="bm bm-pc">
              <span>已分配数量:{{boothNum.haveNum}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bm bm-pc">
              <span>未分配数量:{{boothNum.noneNum}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bm bm-pc">
              <span>已分配百分比:{{boothNum.percent}}</span>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeNameChild" style="padding: 10px">
      <!-- 列表模式 -->
      <el-tab-pane label="列表模式" name="table">
        <!-- 搜索条件 -->
        <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
          <el-form-item label="展位号:" size="mini" placeholder="请选择">
            <el-input type="number" v-model="ruleForm.exhibitionCode" clearable></el-input>
          </el-form-item>
          <el-form-item label="布展类型:" size="mini" placeholder="请选择">
            <el-select v-model="ruleForm.layout" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in layoutArray" :key="item.label"
              :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展区:" size="mini" placeholder="请选择">
            <el-select v-model="ruleForm.booth" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in boothNumArray" :key="item.label"
              :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="届数" size="mini" placeholder="请选择">
            <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
              <el-option v-for="(item, index) in exhibitionNum" :key="index"
              :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期数" size="mini" placeholder="请选择">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option v-for="item in exhibitionSessionArray" :key="item.value"
              :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="bm bm-pe">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </div>
        <!-- 表格 -->
        <div class="bm bm-pc bm-ver">
          <el-table
            :data="tableData">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column v-for="item in tableHead" :key="item.prop"
              :formatter="formatterRow"
              :label="item.label"
              :prop="item.prop"
              align="center">
            </el-table-column>
            <!-- <el-table-column
              label="操作"
              align="center"
              width="150">
              <template slot-scope="scope">
                <div class="bm bm-pc">
                  <el-button @click="checkThis(scope.row.gjhId)" type="text" size="small">查看</el-button>
                  <el-button @click="chcekThis(scope.row.gjhId)" type="text" size="small">审核</el-button>
                </div>
              </template>
            </el-table-column> -->
          </el-table>
          <div class="bm bm-pj" style="margin-top: 10px">
            <div class="bm">
              <el-button type="danger" size="small" @click="submitForm">分配</el-button>
              <el-button type="danger" size="small" @click="submitForm">取消分配</el-button>
            </div>
            <div class="block bm bm-ac" style="float:right; margin-top:10px;" >
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
          </div>
        </div>
      </el-tab-pane>
      <!-- 图纸模式 -->
      <el-tab-pane label="图纸模式" name="img">
        <!-- 搜索条件 -->
        <div class="bm bm-pc">
          <el-form :inline="true" :model="ruleFormImg" class="demo-ruleForm" style="width:100%">
            <el-form-item label="届数" size="mini" placeholder="请选择">
              <el-select v-model="ruleFormImg.exhibitionNum" placeholder="请选择">
                <el-option v-for="(item, index) in exhibitionNum" :key="index"
                  :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="期数" size="mini" placeholder="请选择">
              <el-select v-model="ruleFormImg.exhibitionSession" placeholder="请选择">
                <el-option v-for="item in exhibitionSessionArray" :key="item.value"
                :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展厅" size="mini" placeholder="请选择">
              <el-select v-model="ruleFormImg.exhibitionRegionId" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in exhibitionRegionIdArray" :key="item.label"
                :value="item.deptId" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </div>
        <!-- 图纸 -->
        <div class="bm bm-pc bm-ver">
          <div>todo</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: "index",
      activeNameChild: "table",
      boothNum: {
        haveNum: "1",
        noneNum: "2",
        percent: "30%"
      },
      boothNumArray: [
        {
          label: "1",
          value: "1"
        },
        {
          label: "2",
          value: "2"
        }
      ],
      layoutArray: [
        {
          label: "1",
          value: "1"
        },
        {
          label: "2",
          value: "2"
        },
        {
          label: "3",
          value: "3"
        }
      ],
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
      exhibitionRegionIdArray: [
        {
          label: "1",
          value: "1"
        },
        {
          label: "2",
          value: "2"
        }
      ],
      ruleForm: {
        exhibitionCode: "",
        layout: "",
        booth: "",
        exhibitionNum: "",
        exhibitionSession: 1
      },
      ruleFormImg: {
        exhibitionNum: "",
        exhibitionSession: "",
        exhibitionRegionId: ""
      },
      // 表头
      tableHead: [
        {
          label: "届数",
          prop: "exhibitionNum"
        },
        {
          label: "期数",
          prop: "exhibitionSession"
        },
        {
          label: "展位号",
          prop: "modifierId"
        },
        {
          label: "展区",
          prop: "boothPlace"
        },
        {
          label: "布展类型",
          prop: "layout"
        },
        {
          label: "企业名称",
          prop: "companyName"
        }
      ],
      //企业表格数据
      tableData: [],
      currentPage: 1, //当前页
      total: 0 //总页数
    };
  },
  computed: {
    ...mapGetters('commonStore', ['exhibitionNum', "currentExhibition"])
  },
  methods: {
    ...mapActions("commonStore", ["getExhibitionNum", "getExhibitionPlace", "downFileMethods"]),
    formatterRow(row, column, cellValue, index) {
      // console.log("lie", row, column);
      let prop = column.property;
      if (prop === "checkState") {
        let value = row[prop];
        if (value === "1") {
          return "";
        } else {
          return "未审核";
        }
      } else {
        return row[prop];
      }
    },
    submitForm() {
      console.log(this.ruleForm);
    },
    gotoEdit(param) {
      // console.log("bianji", param);
      this.$router.push("/agent_company_completeMsg/" + param);
    },
    deleThis(param) {
      console.log("shanchu", param);
    },
    completeMsg(param) {
      console.log("wanshan", param);
    },
    // 分页 页面显示数据量切换
    handleSizeChange(param) {
      console.log("页面显示", param);
      
    },
    handleCurrentChange(param) {
      console.log("页面显示2", param);
    }
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
  }
};
</script>
