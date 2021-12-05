<style lang="less">
  @import "../../../theme/project/css/flex.less";
  #check-download {

  }
</style>

<template>
  <div id="check-download">
    <el-tabs v-model="activeName">
      <el-tab-pane label="下载管理" name="index">
        <!-- <div class="bm bm-pj">
          <el-form :inline="true" :model="paramsTB" class="demo-ruleForm">
            <el-form-item label="下载名称:" size="mini" placeholder="请输入">
              <el-input v-model="paramsTB.fileName" clearable></el-input>
            </el-form-item>
            <el-form-item label="下载状态:" size="mini" placeholder="请选择">
              <el-select v-model="paramsTB.saveStatus" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in downStateArray" :key="item.label"
                :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="submitForm">查询</el-button>
        </div> -->
        <!-- 表格 -->
        <div class="bm bm-pc bm-ver">
          <el-table
            :data="tableData">
            <el-table-column v-for="item in tableHead" :key="item.prop"
              :formatter="formatterRow"
              :label="item.label"
              :prop="item.prop"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="250">
              <template slot-scope="scope">
                <el-button @click="downLink(scope.row.filePath)" type="text" size="small" 
                  v-if="scope.row.saveStatus === 1">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="bm bm-pe" style="margin-top: 10px">
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
    </el-tabs>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      downUrl: "",
      paramsTB: {
        current: 1,
        size: 10,
        saveStatus: "",
        fileName: ""
      },
      activeName: "index",
      downStateArray: [
        {
          label: "已完成",
          value: 1
        },
        {
          label: "进行中",
          value: 0
        }
      ],
      // 表头
      tableHead: [
        {
          label: "下载名称",
          prop: "fileName"
        },
        {
          label: "创建时间",
          prop: "createDate"
        },
        {
          label: "状态",
          prop: "saveStatus"
        }
      ],
      //企业表格数据
      tableData: [
        {
          id: "1",
          downName: '软通动力',
          downTime: "ifonsort",
          downState: 1
        }
      ],
      currentPage: 1, //当前页
      total: 0 //总页数
    };
  },
  methods: {
    ...mapActions('downTotal', ['getDownList']),
    getTableList(param) {
      this.getDownList(param).then(res => {
        // console.log(res);
        if (res && res.records && res.records.length > 0) {
          this.tableData.splice(0, this.tableData.length);
          this.tableData = res.records;
          this.total = res.total; 
        }
      });
    },
    formatterRow(row, column, cellValue, index) {
      let prop = column.property;
      let value = row[prop];
      if (prop === "saveStatus") {
        if (value === 1) {
          return "已完成";
        } else {
          return "进行中";
        }
      } else {
        return row[prop];
      }
    },
    submitForm() {
      this.getTableList(this.paramsTB);
      // this.getDownList(this.paramsTB).then(res => {
      //   console.log(res);
        
      //   if (res && res.records && res.records.length > 0) {
      //     this.tableData.splice(0, this.tableData.length);
      //     this.tableData = res.records;
      //     this.total = res.total; 
      //   }
      // });
    },
    downLink(param) {
      // window.location.href = this.downUrl + `?filePath=${param}`;
      kindo.util.getdown(this.downUrl + `/api/file/get?fileId=${param}`);
      // this.downFileMethods(url);
    },
    // 分页 页面显示数据量切换
    handleSizeChange(param) {
      this.paramsTB.size = param;
      this.getTableList(this.paramsTB);
      // this.getDownList(this.paramsTB).then(res => {
      //   if (res) {
      //     this.tableData.splice(0, this.tableData.length);
      //     this.tableData = res.records; 
      //   }
      // });
    },
    handleCurrentChange(param) {
      this.paramsTB.current = param;
      this.getTableList(this.paramsTB);
      // this.getDownList(this.paramsTB).then(res => {
      //   if (res) {
      //     this.tableData.splice(0, this.tableData.length);
      //     this.tableData = res.records; 
      //   }
      // });
    }
  },
  created() {
    this.downUrl = process.env.API_REPORT_URL;
    this.getTableList(this.paramsTB);
    // this.getDownList(this.paramsTB).then(res => {
    //   if (res) {
    //     // console.log("liebiao", res);
    //     this.tableData = res.records; 
    //   }
    // });
  }
};
</script>
