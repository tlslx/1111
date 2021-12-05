/**
 * @file 组展进度设置---展区标签管理
 */

<style scoped>
.el-form-item {
  margin-bottom: 22px;
}
.table-margin {
  margin: 10px 0;
}
.top-btns {
  float: right;
  text-decoration: underline;
  color: #409eff;
}
.top-btn {
  width: 96%;
  padding: 0 2%;
}
.bom-btn-del {
  margin: 20px 0;
}
.bom-btn {
  width: 96%;
  padding: 0 2%;
}
.dialog-btn {
  margin-left: 120px;
  padding-bottom: 22px;
}
.page-bar {
  float: right;
}
</style>

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展区标签管理" name="first">
      <div class="top-btn">
        <el-button type="primary" @click="toAdd" icon="el-icon-plus">新增展区标签</el-button>
        <el-button type="text" @click="toDownload" class="top-btns">下载</el-button>
        <!-- <el-button type="text" @click="toPrint" class="top-btns">打印</el-button> -->
      </div>
      <default-table class="table-margin" :cols="cols" :data="tableData" :loading="loading" :isSelectable="isSelectable" @deal-with-operate="dealWithOperate" @change-multiple-selection="handleSelectionChange"></default-table>
      <div class="bom-btn">
        <el-button type="primary" @click="toDelet" class="bom-btn-del">删除</el-button>
        <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
      </div>
      <el-dialog title="新增展区标签" :visible.sync="dialogAddVisible">
        <el-form :model="addForm" label-width="120px" :rules="addRules" ref="addForm">
          <el-form-item label="展区标签" prop="exhibitionAreaTag">
            <el-input v-model="addForm.exhibitionAreaTag" maxlength="10" clearable></el-input>
          </el-form-item>
          <el-form-item label="选择展区" prop="exhibitionAreaCodes">
            <el-select v-model="addForm.exhibitionAreaCodes" clearable multiple>
              <el-option v-for="item in addData" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="dialog-btn">
          <el-button type="danger" @click="addParams('addForm')">确 定</el-button>
          <el-button @click="dialogAddVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改展区标签" :visible.sync="dialogEditVisible">
        <el-form :model="editForm" label-width="120px" :rules="editRules" ref="editForm">
          <el-form-item label="展区标签" prop="exhibitionAreaTag">
            <el-input v-model="editForm.exhibitionAreaTag" maxlength="10" clearable></el-input>
          </el-form-item>
          <el-form-item label="选择展区" prop="exhibitionAreaCodes">
            <el-select v-model="editForm.exhibitionAreaCodes" multiple clearable>
              <el-option v-for="item in editData" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="dialog-btn">
          <el-button type="danger" @click="editParams('editForm')">确 定</el-button>
          <el-button @click="dialogEditVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import defaultTable from '@/components/project/supportNature/defaultTable.vue';
import pagination from "@/components/project/common/pagination.vue";
import { getExhibitionAreaDict } from './dict_request';
import http from "@/scripts/framework/http";
// vuex
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    'pagination': pagination,
    'default-table': defaultTable
  },
  data() {
    return {
      //展区字典
      currentDict: [],
      // tab
      activeName: 'first',
      // loading
      loading: false,
      // 新增弹出层
      dialogAddVisible: false,
      // 弹出层表单对象
      addForm: {
        // 展区标签
        exhibitionAreaTag: '',
        // 选择展区
        exhibitionAreaCodes: []
      },
      // 编辑弹出层
      dialogEditVisible: false,
      // 编辑弹出层表单对象
      editForm: {
        // 展区标签
        exhibitionAreaTag: '',
        // 选择展区
        exhibitionAreaCodes: []
      },
      //展届
      exhibitionNum: '',
      // 新增选择展区数组
      addData: [],
      // 编辑选择展区数组
      editData: [],
      // 新增校验
      addRules: {
        exhibitionAreaTag: [
          { required: true, message: '请输入标签名', trigger: 'blur' }
        ],
        exhibitionAreaCodes: [
          { required: true, message: '请选择展区', trigger: 'change' }
        ]
      },
      // 编辑校验
      editRules: {
        exhibitionAreaTag: [
          { required: true, message: '请输入标签名', trigger: 'blur' }
        ],
        exhibitionAreaCodes: [
          { required: true, message: '请选择展区', trigger: 'change' }
        ]
      },
      // 分页数据
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: center;"
      },
      // 表头数据
      cols: [
        {
          prop: "exhibitionAreaTag",
          label: "展区标签名称"
        },
        {
          prop: "exhibitionAreaCodeDetail",
          label: "标签详情"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          btns: [
            {
              type: "underlineText",
              prop: "edit",
              label: "修改",
              style: "cursor: pointer;text-decoration: underline;color: #67c23a;"
            },
            {
              type: "underlineText",
              prop: "del",
              label: "删除",
              style:
                "cursor: pointer;text-decoration: underline;color: #f56c6c;margin: 0px 8px;"
            }
          ]
        }
      ],
      // 表格数据
      tableData: {
        // 可多选
        selection: true,
        data: []
      },
      // 多选暂存数组
      multipleSelection: [],
      // 初始传参
      queryParams: {
        current: "1",
        size: "10"
      },
      baseApi: process.env.API_SN_URL
    };
  },
  computed: {
    ...mapGetters('organizationProgress', ['queryTag'])
  },
  async created() {
    //获取当前展届
    this.exhibitionNum = await this.getZHANJIE();
  },
  mounted() {
    this.getData();
    this.areaList();
  },
  methods: {
    ...mapActions('organizationProgress', ['currentSessionInfo', 'queryExhAreaTagInfo', 'addExhAreaTagInfo', 'deletExhAreaTagInfo', 'modifyExhAreaTagInfo']),
    areaList() {
      return http.get(this.baseApi + "/api/sysDataDictItem/findDicItemListByExhibitionArea");
    },
    // 初始数据
    getData() {
      // 开始loading
      this.loading = true;
      Promise.all([getExhibitionAreaDict(), this.queryExhAreaTagInfo(this.queryParams)])
        .then(([eaData, areaTag]) => {
          for (let i in eaData) {
            this.addData.push({
              value: i,
              label: eaData[i]
            });
          }
          this.editData = this.addData;
          if (areaTag.total > 0) {
            this.pageInfo.currentPage = areaTag.current;
            this.pageInfo.total = areaTag.total;
            areaTag.records.forEach(item => {
              let exhDetail = [];
              item.exhibitionAreaCodes.forEach(i => exhDetail.push(eaData[i]));
              item.exhibitionAreaCodeDetail = exhDetail.join(',');
            });
          } else if (areaTags.total === 0) {
            this.pageInfo.currentPage = 1;
            this.pageInfo.total = 0;
          }
          this.tableData.data = areaTag.records;
          this.loading = false;
        }).catch(e => {
          this.loading = false;
        });
    },
    isSelectable(row) {
      if (row.referredByRule === true) {
        return false;
      } else {
        return true;
      }
    },
    // 新增点击事件
    toAdd() {
      // 弹出层表单对象
      this.addForm.exhibitionAreaTag = '';
      this.addForm.exhibitionAreaCodes = [];
      // 弹出层显示
      this.dialogAddVisible = true;
    },
    // 多选删除
    toDelet() {
      // 判断多选数组是否有值
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除参数
          let exhAreaTags = this.multipleSelection;
          // 删除接口
          this.deletExhAreaTagInfo(exhAreaTags).then(res => {
            // 删除成功提示
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            // 删除成功刷新表格
            this.getData();
          });
        }).catch(() => { });
      } else {
        // 多选数组无值
        this.$message({
          type: 'error',
          message: '请至少选择一条数据'
        });
      }
    },
    //获取当前展届
    getZHANJIE() {
      return this.currentSessionInfo().then(function (reso) {
        return reso.exhibitionNum;
      });
    },

    // 打印
    toPrint() { },
    // 下载
    toDownload() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/progress/tag/exportExhAreaTag`, '展区标签.xls');
    },
    // 新增确认
    addParams(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.addExhAreaTagInfo(this.addForm).then(res => {
            // 新增成功
            // 弹出层隐藏
            this.dialogAddVisible = false;
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            // 刷新表格
            this.getData();
          });
        } else {
          this.$message({
            type: 'error',
            message: '新增失败'
          });
          return false;
        }
      });
    },
    // 编辑提交
    editParams(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 编辑
          this.modifyExhAreaTagInfo(this.editForm).then(res => {
            // 编辑成功
            // 弹出层隐藏
            this.dialogEditVisible = false;
            this.$message({
              type: 'success',
              message: '编辑成功'
            });
            // 刷新表格
            this.getData();
          });
        } else {
          this.$message({
            type: 'error',
            message: '编辑失败'
          });
          return false;
        }
      });
    },
    // 多选事件
    handleSelectionChange(val) {
      this.multipleSelection = [];
      val.map(el => {
        this.multipleSelection.push(el.exhibitionAreaTag);
      });
    },
    // 分页事件
    handleSizeChange(val) {
      //设置table的loading变量
      this.pageInfo.pageSize = val;
      this.queryParams.size = val;
      this.getData();
    },
    handleCurrentChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.queryParams.current = val;
      this.getData();
    },
    //操作方法
    dealWithOperate(scope, prop) {
      // if (scope.row.referredByRule === true) {
      //   this.$message({
      //     type: 'error',
      //     message: '该标签正在使用，不可操作'
      //   });
      // } else {
      //编辑点击事件
      if (prop === 'edit') {
        this.editForm.exhibitionAreaTag = scope.row.exhibitionAreaTag;
        this.editForm.originalExhiAreaTag = scope.row.exhibitionAreaTag;
        this.editForm.exhibitionAreaCodes = scope.row.exhibitionAreaCodes;
        this.dialogEditVisible = true;
      }
      //删除点击事件
      if (prop === 'del') {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除参数
          let exhAreaTags = [scope.row.exhibitionAreaTag];
          // 删除接口
          this.deletExhAreaTagInfo(exhAreaTags).then(res => {
            // 删除成功提示
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            // 删除成功刷新表格
            this.getData();
          });
        }).catch(() => { });
      }
      // }
    }
  }
};
</script>
