/**
 * @file 常用文件管理
 */
<template>
  <el-container>
    <el-header>
      <span>设置专区</span>
    </el-header>
    <el-main>
      <el-row style="margin-bottom:20px;margin-left: 30px;">
        <el-button type="danger" @click="addnewExis()">新增</el-button>
        <span style="margin-left: 30px;">
          <el-button type="primary" @click="goback()">返回</el-button>
        </span>
      </el-row>
      <template>
        <el-table border :header-cell-style="tableHeaderColor" :data="tableData" v-loading='loading' style="width: 100%" id="out-table">
          <el-table-column prop="reCh" label="专区中文名称" align="center"></el-table-column>
          <el-table-column prop="reEn" label="专区英文名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="220">
            <template slot-scope="scope">
              <el-button @click="Modfy(scope.row)" type="text">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col :span="18">
          <el-pagination style="float:right; margin-top:20px;" @current-change="handleCurrentChange" background layout="prev, pager, next, jumper" :page-size="pageInfo.pageSize" :current-page="pageInfo.currentPage" :total="pageInfo.total">
          </el-pagination>
        </el-col>
         <!-- 新增 -->
            <el-dialog title="新增" :visible.sync="dialogFormVisible"  width="30%">
              <el-form ref="porm" :rules="rule" :model="porm" label-width="150px">
                <el-form-item label="专区中文名称：" prop="reCh">
                 <el-input v-model="porm.reCh" placeholder="请输入" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="专区英文名称：" prop="reEn">
                  <el-input v-model="porm.reEn" placeholder="请输入" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="专区编码：" prop="reCode">
                 <el-input v-model="porm.reCode" placeholder="请输入" style="width: 300px;"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitUpload('porm')">确 定</el-button>
                <el-button @click="cancelUpload('porm')">取 消</el-button>
              </div>
            </el-dialog>
             <!-- 编辑 -->
            <el-dialog title="新增" :visible.sync="dialogFormVisible2"  width="30%">
              <el-form ref="formData" :rules="rule" :model="formData" label-width="150px">
                <el-form-item label="专区中文名称：" prop="reCh">
                 <el-input v-model="formData.reCh" placeholder="请输入" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="专区英文名称：" prop="reEn">
                  <el-input v-model="formData.reEn" placeholder="请输入" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="专区编码：" prop="reCode">
                 <el-input v-model="formData.reCode" placeholder="请输入" style="width: 300px;"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureUpload('formData')">确 定</el-button>
                <el-button @click="rest('formData')">取 消</el-button>
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
      dialogFormVisible2: false,
      spacials: [], // 专区
      porm: {
        reCode: '', // 专区
        reCh: '', // 专区中文名
        reEn: '', // 专区英文名
        exhibitionAreaArrangeId: '' // 展区code
      },
      formData: {
        reCode: '', // 专区
        reCh: '', // 专区中文名
        reEn: '', // 专区英文名
        exhibitionAreaArrangeId: '' // 展区code
      },
      values: [],
      loading: false,
      form: {
        reCode: '' // 展区code
      },
      // 表格数据
      tableData: [],
      //表单验证
      rule: {
        reCode: [
          { required: true, message: '请输入专区Id', trigger: 'blur' }
        ],
        reCh: [
          { required: true, message: '请输入专区中文名', trigger: 'blur' }
        ],
        reEn: [
          { required: true, message: '请输入专区英文名', trigger: 'blur' }
        ]
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
    this.porm.exhibitionAreaArrangeId = this.$route.query.exhibitionAreaArrangeId;
    this.formData.exhibitionAreaArrangeId = this.$route.query.exhibitionAreaArrangeId;
  },
  computed: {
    ...mapGetters("rpRuleDictionary", ["rpRuleDictionaryData"])
  },
  methods: {
    ...mapActions('rulesOfRewardsPunish', ['getFileManageExport', 'getFileManageTableRow']), // 1.下载 2.单行文件下
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f2f2f2;';
      }
    },
    //获取专区列表
    getCommfileList() {
      let params3 = {
        CustomQueryParams: [
          {
            FindType: "EQ",
            Name: "exhibition_area_arrange_id",
            Values: [this.$route.query.exhibitionAreaArrangeId]
          }
        ],
        OrderModelField: [
          {
            OrderByField: "create_date",
            asc: false
          }
        ],
        PageSize: this.pageInfo.pageSize,
        PageIndex: this.pageInfo.currentPage
      };
      params3 = encodeURI(JSON.stringify(params3));
      http.get(this.baseApi + "/api/ifoExhibitionRegion/getRegionPage?json=" + params3).then(data => {
        this.tableData = data.records;
        this.pageInfo.total = data.total;
      }).catch(error => { });
    },
    // 新增
    addnewExis() {
      this.dialogFormVisible = true;
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
          http.postJson(this.baseApi + "/api/ifoExhibitionRegion/add", this.porm).then(data => {
            this.$message({
              message: '恭喜你，新增成功！',
              type: 'success'
            });
            this.getCommfileList();
            this.dialogFormVisible = false;
            this.$refs[porm].resetFields();
            this.loading = false;
          }).catch(error => { }); 
        } else {
          return false;
        }
      });
    },
    // 编辑
    sureUpload(formData) {
      this.loading = true;
      this.$refs[formData].validate((valid) => {
        if (valid) {
          http.postJson(this.baseApi + "/api/ifoExhibitionRegion/updateRegion", this.formData).then(data => {
            this.$message({
              message: '恭喜你，编辑成功！',
              type: 'success'
            });
            this.getCommfileList();
            this.dialogFormVisible2 = false;
            this.$refs[formData].resetFields();
            this.loading = false;
          }).catch(error => { }); 
        } else {
          return false;
        }
      });
    },
    Modfy(row) {
      this.dialogFormVisible2 = true;
      let datas = row;
      this.formData = datas;
    },
    goback() {
      this.$router.go(-1);
    },
    cancelUpload(porm) {
      this.dialogFormVisible = false;
      this.$refs[porm].resetFields();
    },
    rest(formData) {
      this.dialogFormVisible2 = false;
      this.$refs[formData].resetFields();
    }
  },
  mounted() {
    this.getCommfileList();
  }
};
</script>

