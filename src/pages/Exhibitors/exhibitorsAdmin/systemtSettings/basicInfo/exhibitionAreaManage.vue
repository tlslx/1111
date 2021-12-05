/**
 * @file 常用文件管理
 */
<template>
  <el-container>
    <el-header>
      <span>展区管理</span>
    </el-header>
    <el-main>
      <el-row style="margin-bottom:20px">
        <el-col :span="12">
          <div class="grid-content">
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="届数：">
                <el-select v-model="form.exhibitionNum" placeholder="请选择" style="width:150px" clearable>
                  <el-option v-for="item in nums" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                 <span style="margin-left:30px">期数：</span>
                 <el-select v-model="form.exhibitionSession" placeholder="请选择" style="width:150px" clearable>
                  <el-option v-for="item in Sessions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span>
              <el-button @click="queryList" type="text">查询</el-button>
            </span>
             <span>
              <el-button type="text">导入上次方案</el-button>
            </span>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:20px;margin-left: 30px;">
        <el-button type="danger" @click="addnewExis()">新增</el-button>
      </el-row>
      <template>
        <el-table border :header-cell-style="tableHeaderColor" :data="tableData" v-loading='loading' style="width: 100%" id="out-table">
          <el-table-column fixed="left" align="center" width="50">
            <template>
              <el-checkbox></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="exhibitionNum" label="届数" align="center"></el-table-column>
          <el-table-column prop="exhibitionSession" label="期数" align="center"></el-table-column>
          <el-table-column prop="exhibitionAreaNameCh" label="展区中文名称" align="center"></el-table-column>
          <el-table-column prop="exhibitionAreaNameEn" label="展区英文名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="220">
            <template slot-scope="scope">
              <el-button @click="setExbition(scope.row)" type="text">设置专区</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col :span="18">
          <el-pagination style="float:right; margin-top:20px;" @current-change="handleCurrentChange" background layout="prev, pager, next, jumper" :page-size="pageInfo.pageSize" :current-page="pageInfo.currentPage" :total="pageInfo.total">
          </el-pagination>
        </el-col>
         <!-- 新增 -->
            <el-dialog title="新增" :visible.sync="dialogFormVisible"  width="30%">
              <el-form ref="porm" :rules="rule" :model="porm" label-width="130px">
                <el-form-item label="届数：" prop="exhibitionNum">
                  <el-select v-model="porm.exhibitionNum" placeholder="请选择" style="width: 300px">
                    <el-option v-for="item in nums" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="期数：" prop="exhibitionSession">
                  <el-select v-model="porm.exhibitionSession" placeholder="请选择" style="width: 300px;">
                    <el-option v-for="item in Sessions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="展区：" prop="exhibitionAreaCode">
                  <el-select v-model="porm.exhibitionAreaCode" placeholder="请选择" style="width: 300px;" @change="changeVal">
                    <el-option v-for="item in areas" :key="item.code" :label="item.label" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="展区中文名称：" prop="exhibitionAreaNameCh">
                 <el-input v-model="porm.exhibitionAreaNameCh" placeholder="请输入" style="width: 300px;" disabled></el-input>
                </el-form-item>
                <el-form-item label="展区英文名称：" prop="exhibitionAreaNameEn">
                  <el-input v-model="porm.exhibitionAreaNameEn" placeholder="请输入" style="width: 300px;"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitUpload('porm')">确 定</el-button>
                <el-button @click="cancelUpload('porm')">取 消</el-button>
              </div>
            </el-dialog>
      </template>
    </el-main>
  </el-container>
</template>

<style>
.el-header {
  border-bottom: 1px solid #ddd;
}
.el-header > span {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  height: 58px;
  line-height: 58px;
  display: block;
  float: left;
  border-bottom: 2px solid #2b579a;
}
.el-table th > .cell,
.el-table .cell {
  font-size: 12px;
}
</style>

<script>
import http from "@/scripts/framework/http";
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
// 引入导出Excel表格依赖
// import FileSaver from "file-saver";
// import XLSX from "xlsx";
export default {
  data() {
    return {
      dialogFormVisible: false,
      nums: [],  // 届数
      areas: [], // 展区
      Sessions: [{
        label: '1',
        value: '1'
      },
      {
        label: '3',
        value: '3'
      }], // 期数
      porm: {
        exhibitionSession: '', // 期数
        exhibitionNum: "126", // 届数
        exhibitionAreaNameCh: '', // 展区中文名字
        exhibitionAreaNameEn: '' // 展区英文文名字
      },
      loading: false,
      form: {
        exhibitionSession: '', // 期数
        exhibitionNum: "126" // 届数
      },
      // 表格数据
      tableData: [],
      //表单验证
      rule: {
        exhibitionNum: [
          { required: true, message: '请选择届数', trigger: 'blur' }
        ],
        exhibitionSession: [
          { required: true, message: '请选择期数', trigger: 'blur' }
        ],
        exhibitionAreaCode: [{
          required: true, message: '请选择展区', trigger: 'blur'
        }]
      },
      //页面信息
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      baseApi: process.env.API_POT_URL,
      baseApFile: process.env.API_COMS_URL
    };
  },
  created() {
    this.getDictionary();
    this.getCommfileList();
  },
  computed: {
    ...mapGetters("rpRuleDictionary", ["rpRuleDictionaryData"])
  },
  methods: {
    ...mapActions('rulesOfRewardsPunish', ['getFileManageExport', 'getFileManageTableRow']), // 1.下载 2.单行文件下载
    // 获取下拉数据
    getDictionary() {
       // 获取届数
      http.get(this.baseApi + "/api/exp/exhibitions/getListAll").then(data => {
        data.forEach(element => {
          this.nums.push({
            value: element.exhibitionNum,
            label: element.exhibitionNum
          });
        });
      }).catch(error => { });
      // 获取展区
      http.get(this.baseApi + "/api/dataDictItem/findDicItemListByIfoExhibitionArea").then(data => {
        data.records.forEach(element => {
          this.areas.push({
            code: element.itemCode,
            label: element.itemText
          });
        });
      }).catch(error => { });
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f2f2f2;';
      }
    },
    //获取展区列表
    getCommfileList() {
      let params = {
        current: this.pageInfo.currentPage,
        exhibitionNum: this.form.exhibitionNum,
        exhibitionSession: this.form.exhibitionSession,
        size: this.pageInfo.pageSize
      };
      http.get(this.baseApi + "/api/ifoExhibitionRegion/getArrangePage", params).then(data => {
        this.tableData = data.records;
        this.pageInfo.total = data.total;
      }).catch(error => { });
    },
    // 新增
    addnewExis() {
      this.dialogFormVisible = true;
    },
    queryList() { // 查询按钮
      this.getCommfileList();
    },
    //翻页
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.getCommfileList();
    },
    changeVal(val) {
      let reValue = $helper.getDicLabel(this.areas, val);
      this.porm.exhibitionAreaNameCh = reValue;
    },
    // 提交
    submitUpload(porm) {
      this.loading = true;
      this.$refs[porm].validate((valid) => {
        if (valid) {
          http.postJson(this.baseApi + "/api/ifoExhibitionRegion/addExhibitionAreaArrange", this.porm).then(data => {
            this.$message({
              message: '恭喜你，新增成功！',
              type: 'success'
            });
            this.getCommfileList();
            this.dialogFormVisible = false;
            this.loading = false;
            this.$refs[porm].resetFields();
          }).catch(error => { }); 
        } else {
          return false;
        }
      });
    },
    setExbition(row) {
      this.$router.push({
        path: '/setExbiton',
        query: row
      });
    },
    cancelUpload(porm) {
      this.dialogFormVisible = false;
      this.$refs[porm].resetFields();
    }
  },
  mounted() {
  }
};
</script>

