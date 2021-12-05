/**
 * @file 常用文件管理
 */
<template>
  <el-container>
    <el-header>
      <span>展品目录维护</span>
    </el-header>
    <el-main>
      <el-row style="margin-bottom:20px">
        <el-col :span="12">
          <div class="grid-content">
            <el-form ref="form" :model="form" inline label-width="100px">
              <el-form-item label="届数：">
                <el-select v-model="form.exhibitionNum" placeholder="请选择" style="width:150px" @change="changeEx">
                  <el-option v-for="item in nums" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="期数：">
                <el-select v-model="form.periodCode" placeholder="请选择" style="width:150px" clearable @change="changeVal">
                  <el-option v-for="item in Sessions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="展区：">
                <el-select v-model="form.exhibitionAreaCode" placeholder="请选择" style="width:150px" clearable @change="changeLevels">
                  <el-option v-for="item in areas" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="一级目录：">
                <el-select v-model="form.firstChName" placeholder="请选择" style="width:150px" clearable>
                  <el-option v-for="item in levelOne" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span>
              <el-button @click="queryList" type="primary">查询</el-button>
            </span>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:20px;margin-left: 30px;">
        <span>
         <el-button type="danger" @click="addlele()">新增一级目录</el-button>
        </span>
        <el-button type="danger" @click="addnewExis()">新增二级目录</el-button>
      </el-row>
      <template>
        <el-table border :header-cell-style="tableHeaderColor" :data="tableData" style="width: 100%" id="out-table">
          <el-table-column prop="exhibitionNum" label="届数" align="center"></el-table-column>
          <el-table-column prop="exhibitionSession" label="期数" align="center"></el-table-column>
          <el-table-column prop="exhibitionAreaNameCh" label="展区" align="center"></el-table-column>
          <el-table-column prop="firstChName" label="一级目录" align="center"></el-table-column>
          <el-table-column prop="secondChName" label="二级目录" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="220">
            <template slot-scope="scope">
              <el-button type="text" @click="opionEntry(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col :span="18">
          <el-pagination style="float:right; margin-top:20px;" @current-change="handleCurrentChange" background layout="prev, pager, next, jumper" :page-size="pageInfo.pageSize" :current-page="pageInfo.currentPage" :total="pageInfo.total">
          </el-pagination>
        </el-col>
         <!-- 新增一级目录 -->
            <el-dialog title="新增一级目录" :visible.sync="dialogFormVisible3"  width="30%">
              <el-form :label-position="labelPosition"  ref="dataPor" :rules="rules" :model="dataPor">
                <el-form-item label="届数：">
                <el-select v-model="dataPor.exhibitionNum" placeholder="请选择" style="width:300px" @change="getVal">
                  <el-option v-for="item in nums" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="期数：" prop="periodCode">
                <el-select v-model="dataPor.periodCode" placeholder="请选择" style="width:300px" clearable @change="getNum">
                  <el-option v-for="item in SessionsPlus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="展区：" prop="exhibitionAreaCode">
                <el-select v-model="dataPor.exhibitionAreaCode" placeholder="请选择" style="width:300px" clearable>
                  <el-option v-for="item in exitPlus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="一级目录：" prop="firstChName" label-width="130px;">
                 <el-input v-model="dataPor.firstChName" placeholder="请输入" style="width:300px" clearable></el-input>
              </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addLevel('dataPor')">保 存</el-button>
                <el-button @click="cancLevel('dataPor')">取 消</el-button>
              </div>
            </el-dialog>
         <!-- 新增二级目录 -->
            <el-dialog title="新增二级目录" :visible.sync="dialogFormVisible"  width="30%">
              <el-form :label-position="labelPosition"  ref="porm" :rules="rule" :model="porm">
                <el-form-item label="届数：">
                <el-select v-model="porm.exhibitionNum" placeholder="请选择" style="width:300px" @change="changeMc">
                  <el-option v-for="item in nums" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="期数：" prop="periodCode">
                <el-select v-model="porm.periodCode" placeholder="请选择" style="width:300px" clearable @change="changeMs">
                  <el-option v-for="item in SessionsPlus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="展区：" prop="exhibitionAreaCode">
                <el-select v-model="porm.exhibitionAreaCode" placeholder="请选择" style="width:300px" clearable @change="changeMd">
                  <el-option v-for="item in areasPlus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="一级目录：" prop="firstChName" label-width="130px;">
                <el-select v-model="porm.firstChName" placeholder="请选择" style="width:300px" clearable>
                  <el-option v-for="item in levelOnePlus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
                <el-form-item label="二级目录：" prop="secondChName" label-width="130px;">
                 <el-input v-model="porm.secondChName" placeholder="请输入" style="width: 300px;"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitUpload('porm')">保 存</el-button>
                <el-button @click="cancelUpload('porm')">取 消</el-button>
              </div>
            </el-dialog>
            <!-- 编辑二级目录e -->
            <el-dialog title="编辑二级目录" :visible.sync="dialogFormVisible2"  width="30%">
              <el-form  ref="oporim" :rules="rule" :model="oporim">
                <el-form-item label="届数：">
                <el-select v-model="oporim.exhibitionNum" placeholder="请选择" style="width:300px" disabled>
                  <el-option v-for="item in nums" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="期数：" prop="periodCode">
                <el-select v-model="oporim.periodCode" placeholder="请选择" style="width:300px" disabled clearable>
                  <el-option v-for="item in SessionsPlus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="展区：" prop="exhibitionAreaCode">
                <el-select v-model="oporim.exhibitionAreaCode" placeholder="请选择" style="width:300px" disabled clearable>
                  <el-option v-for="item in areasPlus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="一级目录：" prop="firstChName" label-width="130px;">
                <el-select v-model="oporim.firstChName" placeholder="请选择" style="width:300px" disabled clearable>
                  <el-option v-for="item in levelOnePlus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
                <el-form-item label="二级目录：" prop="secondChName" label-width="130px;">
                  <el-input v-model="oporim.secondChName" placeholder="请输入" style="width: 300px;"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveUpload('oporim')">保 存</el-button>
                <el-button @click="cancelSaved('oporim')">取 消</el-button>
              </div>
            </el-dialog>
             <!-- 编辑s -->
              <!-- 编辑一级目录e -->
            <el-dialog title="编辑一级目录" :visible.sync="dialogFormVisible4"  width="30%">
               <el-form :label-position="labelPosition"  ref="levelPor" :rules="rules" :model="levelPor">
                <el-form-item label="届数：">
                <el-select v-model="levelPor.exhibitionNum" placeholder="请选择" style="width:300px" disabled>
                  <el-option v-for="item in nums" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="期数：" prop="periodCode">
                <el-select v-model="levelPor.periodCode" placeholder="请选择" style="width:300px" disabled clearable>
                  <el-option v-for="item in SessionsPlus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="展区：" prop="exhibitionAreaCode">
                <el-select v-model="levelPor.exhibitionAreaCode" placeholder="请选择" disabled style="width:300px" clearable>
                  <el-option v-for="item in editPlus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="一级目录：" prop="firstChName" label-width="130px;">
                 <el-input v-model="levelPor.firstChName" placeholder="请输入" style="width:300px" clearable></el-input>
              </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editLevel('levelPor')">保 存</el-button>
                <el-button @click="remove('levelPor')">取 消</el-button>
              </div>
            </el-dialog>
             <!-- 编辑s -->
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
// 引入导出Excel表格依赖
// import FileSaver from "file-saver";
// import XLSX from "xlsx";
export default {
  data() {
    return {
      labelPosition: 'right',
      editPlus: [],
      exitPlus: [], // 展区
      areas: [], // 展区
      nums: [], // 届数
      levelOnePlus: [], // 一级目录
      areasPlus: [], // 展区
      levelOne: [], // 一级目录
      levelTwo: [], // 二级目录
      Sessions: [{
        label: '1',
        value: '1'
      },
      {
        label: '3',
        value: '3'
      }], // 期数
      SessionsPlus: [{
        label: '1',
        value: '1'
      }, 
      {
        label: '3',
        value: '3'
      }], // 期数
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      form: {
        periodCode: '',
        exhibitionNum: "126",
        exhibitionAreaCode: '',
        firstChName: '' // 一级目录
      },
      levelPor: {
        level: 1,  // 编辑一级目录
        periodCode: '',
        exhibitionNum: "",
        exhibitionAreaCode: '',
        firstChName: '', // 一级目录
        catalogId: '' // 主键
      },
      dataPor: {
        level: 1,  // 编辑一级目录
        periodCode: '',
        exhibitionNum: "126",
        exhibitionAreaCode: '',
        firstChName: '' // 一级目录
      },
      porm: {
        level: 2,  // 编辑二级目录
        periodCode: '',
        exhibitionNum: "126",
        exhibitionAreaCode: '',
        firstChName: '', // 一级目录
        secondChName: '' // 二级目录
      },
      oporim: {
        level: 2,    // 编辑二级目录
        periodCode: '',
        exhibitionNum: "",
        exhibitionAreaCode: '',
        firstChName: '', // 一级目录
        secondChName: '', // 二级目录
        catalogId: ''
      },
       //表单验证
      rule: {
        exhibitionNum: [
          { required: true, message: '请选择届数', trigger: 'blur' }
        ],
        periodCode: [
          { required: true, message: '请选择期数', trigger: 'blur' }
        ],
        exhibitionAreaCode: [{
          required: true, message: '请选择展区', trigger: 'blur'
        }],
        firstChName: [{
          required: true, message: '请选择一级目录', trigger: 'blur'
        }],
        secondChName: [{
          required: true, message: '请选择一级目录', trigger: 'blur'
        }]
      },
       //表单验证
      rules: {
        exhibitionNum: [
          { required: true, message: '请选择届数', trigger: 'blur' }
        ],
        periodCode: [
          { required: true, message: '请选择期数', trigger: 'blur' }
        ],
        exhibitionAreaCode: [{
          required: true, message: '请选择展区', trigger: 'blur'
        }],
        firstChName: [{
          required: true, message: '请输入目录', trigger: 'blur'
        }]
      },
      // 表格数据
      tableData: [],
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
    this.getCommfileList();
    this.getDictionary();
  },
  computed: {
    ...mapGetters("rpRuleDictionary", ["rpRuleDictionaryData"]),
    downloadParams() {
      return {
        exhibitionNum: this.sessionValue
      };
    }
  },
  methods: {
    ...mapActions('rulesOfRewardsPunish', ['getFileManageExport', 'getFileManageTableRow']), // 1.下载 2.单行文件下载
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
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f2f2f2;';
      }
    },
    //获取展品目录文件列表
    getCommfileList() {
      let params = {
        exhibitionNum: this.form.exhibitionNum,
        exhibitionAreaCode: this.form.exhibitionAreaCode,
        firstCatalogId: this.form.firstChName,
        orderByField: "arrange.create_date",
        isAsc: false,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
      http.get(this.baseApi + "/api/ifoExhibitsCatalog/getCatalogPage", params).then(data => {
        this.tableData = data.records;
        this.pageInfo.total = data.total;
      }).catch(error => { });
    },
    // 新增
    addnewExis() {
      this.dialogFormVisible = true;
      this.porm.periodCode = '';
      this.porm.exhibitionAreaCode = '';
      this.porm.firstChName = '';
      this.porm.secondChName = '';
    },
    queryList() { // 查询按钮
      this.getCommfileList();
    },
    // 新增一级目录
    addLevel(dataPor) {
      this.$refs[dataPor].validate((valid) => {
        if (valid) {
          let params4 = {
            level: 1,  // 编辑一级目录
            periodCode: this.dataPor.periodCode,
            exhibitionNum: this.dataPor.exhibitionNum,
            parentId: this.dataPor.exhibitionAreaCode,
            chName: this.dataPor.firstChName // 一级目录
          };
          http.postJson(this.baseApi + "/api/ifoExhibitsCatalog/addCatalog", params4).then(data => {
            this.$message({
              message: '恭喜你，新增成功！',
              type: 'success'
            });
            this.getCommfileList();
            this.$refs[dataPor].resetFields();
            this.dialogFormVisible3 = false;
            this.loading = false;
          }).catch(error => { }); 
        } else {
          return false;
        }
      });
    },
    // 新增二级目录接口
    submitUpload(porm) {
      this.$refs[porm].validate((valid) => {
        if (valid) {
          let paramsDa = {
            level: 2,  // 新增二级目录
            periodCode: this.porm.periodCode,
            exhibitionNum: this.porm.exhibitionNum,
            parentId: this.porm.firstChName,
            chName: this.porm.secondChName // 一级目录
          };
          http.postJson(this.baseApi + "/api/ifoExhibitsCatalog/addCatalog", paramsDa).then(data => {
            this.$message({
              message: '恭喜你，新增成功！',
              type: 'success'
            });
            this.getCommfileList();
            this.$refs[porm].resetFields();
            this.dialogFormVisible = false;
            this.loading = false;
          }).catch(error => { }); 
        } else {
          return false;
        }
      });
    },
     // 新增二级目录接口
    saveUpload(oporim) {
      this.$refs[oporim].validate((valid) => {
        if (valid) {
          let paramsDa = {
            level: 2,  // 编辑二级目录
            periodCode: this.oporim.periodCode,
            exhibitionNum: this.oporim.exhibitionNum,
            chName: this.oporim.secondChName, // 二级目录
            catalogId: this.oporim.catalogId
          };
          http.postJson(this.baseApi + "/api/ifoExhibitsCatalog/updateCatalog", paramsDa).then(data => {
            this.$message({
              message: '恭喜你，编辑成功！',
              type: 'success'
            });
            this.getCommfileList();
            this.$refs[oporim].resetFields();
            this.dialogFormVisible2 = false;
            this.loading = false;
          }).catch(error => { }); 
        } else {
          return false;
        }
      });
    },
    // 获取展区
    changeVal(val) {
      this.form.periodCode = val;
      this.areas = [];
      this.levelOne = [];
      this.form.exhibitionAreaCode = '';
      this.form.firstChName = '';
      if (val) {
        let params6 = {
          exhibitionNum: this.form.exhibitionNum,
          periodCode: val
        };
      // 获取展区
        http.get(this.baseApi + "/api/ifoExhibitionRegion/getAreas", params6).then(data => {
          data.forEach(element => {
            this.areas.push({
              value: element.exhibitionAreaArrangeId,
              label: element.exhibitionAreaNameCh
            });
          });
        }).catch(error => { });
      }
    },
    // 获取展区
    changeEx(val) {
      this.areas = [];
      this.levelOne = [];
      this.form.exhibitionNum = val;
      this.form.exhibitionAreaCode = '';
      this.form.firstChName = '';
      if (val) {
        let params6 = {
          exhibitionNum: val,
          periodCode: this.form.periodCode
        };
      // 获取展区
        http.get(this.baseApi + "/api/ifoExhibitionRegion/getAreas", params6).then(data => {
          data.forEach(element => {
            this.areas.push({
              value: element.exhibitionAreaArrangeId,
              label: element.exhibitionAreaNameCh
            });
          });
        }).catch(error => { });
      }
    },
    // 获取一级目录
    changeLevels(val) {
      this.levelOne = [];
      this.form.firstChName = '';
      if (val) {
        let params6 = {
          parentId: val,
          level: 1
        };
      // 获取展区
        http.get(this.baseApi + "/api/ifoExhibitsCatalog/getChildCatalog", params6).then(data => {
          data.forEach(element => {
            this.levelOne.push({
              value: element.catalogId,
              label: element.chName
            });
          });
        }).catch(error => { });
      }
    },
    // 获取展区
    changeMc(val) {
      this.porm.exhibitionNum = val;
      this.areasPlus = [];
      this.porm.exhibitionAreaCode = '';
      if (val) {
        let params6 = {
          exhibitionNum: val,
          periodCode: this.porm.periodCode
        };
      // 获取展区
        http.get(this.baseApi + "/api/ifoExhibitionRegion/getAreas", params6).then(data => {
          data.forEach(element => {
            this.areasPlus.push({
              value: element.exhibitionAreaArrangeId,
              label: element.exhibitionAreaNameCh
            });
          });
        }).catch(error => { });
      }
    },
     // 获取展区
    changeMs(val) {
      this.areasPlus = [];
      this.porm.periodCode = val;
      this.porm.exhibitionAreaCode = '';
      if (val) {
        let params6 = {
          exhibitionNum: this.porm.exhibitionNum,
          periodCode: val
        };
      // 获取展区
        http.get(this.baseApi + "/api/ifoExhibitionRegion/getAreas", params6).then(data => {
          data.forEach(element => {
            this.areasPlus.push({
              value: element.exhibitionAreaArrangeId,
              label: element.exhibitionAreaNameCh
            });
          });
        }).catch(error => { });
      }
    },
    // 获取一级目录
    changeMd(val) {
      this.levelOnePlus = [];
      this.porm.firstChName = '';
      if (val) {
        let params6 = {
          parentId: val,
          level: 1
        };
      // 获取展区
        http.get(this.baseApi + "/api/ifoExhibitsCatalog/getChildCatalog", params6).then(data => {
          data.forEach(element => {
            this.levelOnePlus.push({
              value: element.catalogId,
              label: element.chName
            });
          });
        }).catch(error => { });
      }
    },
    cancelUpload(porm) {
      this.$refs[porm].resetFields();
      this.dialogFormVisible = false;
    },
    // 编辑
    opionEntry(row) {
      this.editPlus = [];
      this.areasPlus = [];
      let params6 = {
        exhibitionNum: row.exhibitionNum,
        periodCode: row.exhibitionSession
      };
       // 获取展区
      http.get(this.baseApi + "/api/ifoExhibitionRegion/getAreas", params6).then(data => {
        data.forEach(element => {
          this.editPlus.push({
            value: element.exhibitionAreaArrangeId,
            label: element.exhibitionAreaNameCh
          });
          this.areasPlus.push({
            value: element.exhibitionAreaArrangeId,
            label: element.exhibitionAreaNameCh
          });
        });
      }).catch(error => { });
      // 获取展区
      if (row.secondChName) {
        this.dialogFormVisible2 = true;
        this.oporim.level = 2;
        this.oporim.periodCode = row.exhibitionSession;
        this.oporim.exhibitionNum = row.exhibitionNum;
        this.oporim.exhibitionAreaCode = row.exhibitionAreaArrangeId;
        this.oporim.firstChName = row.firstChName;
        this.oporim.secondChName = row.secondChName;
        this.oporim.catalogId = row.secondCatalogId;
      } else {
        this.levelPor.level = 1;
        this.levelPor.periodCode = row.exhibitionSession;
        this.levelPor.exhibitionNum = row.exhibitionNum;
        this.levelPor.exhibitionAreaCode = row.exhibitionAreaArrangeId;
        this.levelPor.firstChName = row.firstChName;
        this.levelPor.catalogId = row.firstCatalogId;
        this.dialogFormVisible4 = true;
      }

    },
    // 新增一级目录
    addlele() {
      this.dialogFormVisible3 = true;
      this.dataPor.periodCode = '';
      this.dataPor.exhibitionAreaCode = '';
      this.dataPor.firstChName = '';
    },
     // 获取展区
    getVal(val) {
      this.exitPlus = [];
      this.dataPor.exhibitionNum = val;
      this.dataPor.exhibitionAreaCode = '';
      if (val) {
        let params6 = {
          exhibitionNum: val,
          periodCode: this.dataPor.periodCode
        };
      // 获取展区
        http.get(this.baseApi + "/api/ifoExhibitionRegion/getAreas", params6).then(data => {
          data.forEach(element => {
            this.exitPlus.push({
              value: element.exhibitionAreaArrangeId,
              label: element.exhibitionAreaNameCh
            });
          });
        }).catch(error => { });
      }
    },
    // 获取展区
    getNum(val) {
      this.dataPor.periodCode = val;
      this.exitPlus = [];
      this.dataPor.exhibitionAreaCode = '';
      if (val) {
        let params6 = {
          exhibitionNum: this.dataPor.exhibitionNum,
          periodCode: val
        };
      // 获取展区
        http.get(this.baseApi + "/api/ifoExhibitionRegion/getAreas", params6).then(data => {
          data.forEach(element => {
            this.exitPlus.push({
              value: element.exhibitionAreaArrangeId,
              label: element.exhibitionAreaNameCh
            });
          });
        }).catch(error => { });
      }
    },
    cancelSaved(oporim) {
      this.$refs[oporim].resetFields();
      this.dialogFormVisible2 = false;
    },
    cancLevel(dataPor) {
      this.$refs[dataPor].resetFields();
      this.dialogFormVisible3 = false;
    },
     //翻页
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.getCommfileList();
    },
    // 取消
    remove(levelPor) {
      this.$refs[levelPor].resetFields();
      this.dialogFormVisible4 = false;
    },
    // 编辑一级目录
    editLevel(levelPor) {
      this.$refs[levelPor].validate((valid) => {
        if (valid) {
          let params4 = {
            level: 1,  // 编辑一级目录
            periodCode: this.levelPor.periodCode,
            exhibitionNum: this.levelPor.exhibitionNum,
            parentId: this.levelPor.exhibitionAreaCode,
            chName: this.levelPor.firstChName, // 一级目录
            catalogId: this.levelPor.catalogId
          };
          http.postJson(this.baseApi + "/api/ifoExhibitsCatalog/updateCatalog", params4).then(data => {
            this.$message({
              message: '恭喜你，编辑成功！',
              type: 'success'
            });
            this.getCommfileList();
            this.$refs[levelPor].resetFields();
            this.dialogFormVisible4 = false;
            this.loading = false;
          }).catch(error => { }); 
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
  }
};
</script>

