/**
* @file 展区管理
* @author:wanglifeng
* @date:2019/1/16
*/
<template>
  <div class="exhibition-area">
    <p><span class="title">展区管理</span></p>
    <hr>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
      <el-form-item label="活动编号:" size="mini">
        <el-select v-model="ruleForm.activityCode" placeholder="请选择">
             <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.activityCode"
              :value="item.activityCode">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="submitForm()">查询</el-button>
        <el-button type="primary" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row class="btn-row">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button type="primary" @click="handleImports">一键导入</el-button>
    </el-row>

    <template>
      <div id="table2">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column type="expand" width="50">
            <template slot-scope="props">
              <el-table
                :data="props.row.infoCsExhibitionAreaList"
                :show-header=false>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="大类/展区"
                  align="center">
                  <template slot-scope="oscope">{{oscope.row.exhibitionAreaNameCn}}</template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="产品大类编号/展区编码"
                  align="center">
                  <template slot-scope="oscope">
                    <span style="margin-left: 40px">{{oscope.row.exhibitionAreaCode}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="权限类型"
                  align="center">
                  <template slot-scope="oscope" >{{oscope.row.operType}}</template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="状态"
                  align="center">
                  <template slot-scope="oscope" >
                    <div v-if="oscope.row.isEnable == 1"> 启用</div>
                    <div v-else-if="oscope.row.isEnable == 0">禁用</div>
                  </template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="操作"
                  width="220"
                  align="center">
                  <template slot-scope="oscope">
                    <el-button type="text" @click.stop="forbidden(oscope.row, oscope.index)" v-if="oscope.row.isEnable == 1">禁用</el-button>
                    <el-button type="text" @click.stop="forbidden(oscope.row, oscope.index)" v-else-if="oscope.row.isEnable == 0">启用</el-button>
                    <el-button type="text" @click.stop="handleEdit(oscope.row, oscope.index)">修改</el-button>
                    <el-button type="text" @click.stop="handleDelete(oscope.row, oscope.index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            label="大类/展区"
            prop="productCategoryNameCn"
            align="left">
          </el-table-column>
          <el-table-column
            label="产品大类编号/展区编码"
            align="center"
            prop="productCategoryCode">
          </el-table-column>
          <el-table-column
            label="权限类型"
            align="center"
            prop="operType">
          </el-table-column>
          <el-table-column
            label="状态"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="250">
          </el-table-column>
        </el-table>
      </div>
    </template>

    <!--新增(展区信息)-->
    <el-dialog title="展区信息" :visible.sync="dialogProduct" class="formProduct">
      <el-form
      ref="formProduct"
      :model="formProduct"
      :rules="formRules"
      >
        <el-form-item label="展区代码"  prop="exhibitionAreaCode" class="elForm">
          <el-select v-model="formProduct.exhibitionAreaCode" placeholder="请选择" @change="codeChange">
            <el-option
              v-for="(item,index) in exhibitions"
              :key="index"
              :label="item.itemCode"
              :value="item.itemCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区中文名"  prop="exhibitionAreaNameCn" class="elForm">
          <el-input :disabled="true" v-model="formProduct.exhibitionAreaNameCn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="展区英文名"  prop="exhibitionAreaNameEn" class="elForm">
          <el-input v-model="formProduct.exhibitionAreaNameEn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属大类"  prop="productCategoryId" class="elForm">
          <el-select v-model="formProduct.productCategoryId" placeholder="请选择">
            <el-option
              v-for="item in productCategory"
              :key="item.value"
              :label="item.productCategoryNameCn"
              :value="item.productCategoryId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="isEnable" class="elForm">
          <el-select v-model="formProduct.isEnable" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitAdd('formProduct')">确 定</el-button>
        <el-button @click="dialogProduct = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "productCategories",
  data() {
    return {
      options: [],
      msg: '',
      succ: '',
      info: '',
      tableData: [],
      submitCon: '',
      productCategory: [],
      exhibitions: [],
      ruleForm: {
        activityCode: '',
        multipleSelection: ''
      },
      classOptions: [],
      statusOptions: [{
        value: 0,
        label: '禁用'
      }, {
        value: 1,
        label: '启用'
      }],
      dialogProduct: false, // 产品列表弹窗
      dialogAwardSetting: false, // 奖项设置弹窗
      formLabelWidth: '120px',
      formProduct: {
        activityCode: '',
        companyId: null,
        productCategoryId: '',
        exhibitionAreaCode: '',
        exhibitionAreaNameCn: '',
        exhibitionAreaNameEn: '',
        isEnable: '',
        isDelete: '0'
      },
      baseApi: process.env.API_CF_URL,
      baseApi2: process.env.API_DICT_URL,
      formRules: {
        exhibitionAreaNameCn: [{ required: true, message: "请输入正确的中文名", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$/;
              if (!regRule.test(value) && value !== "") {
                errors.push(new Error("请输入正确的中文名"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
          { message: "长度超过限制（32）", trigger: "blur", max: 32 }
        ],
        exhibitionAreaNameEn: [{ required: true, message: "请输入正确的英文名", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^[a-zA-Z]+$/;
              if (!regRule.test(value) && value !== "") {
                errors.push(new Error("请输入正确的英文名"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
          { message: "长度超过限制（32）", trigger: "blur", max: 32 }
        ],
        exhibitionAreaCode: [{ required: true, message: "请输入正确的展区代码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^[a-zA-Z0-9]{4}$/;
              if (!regRule.test(value) && value !== "") {
                errors.push(new Error("请输入4位数字、字母组成的展区代码"));
              }
              callback(errors);
            },
            trigger: "blur"
          }
        ],
        productCategoryId: [{ required: true, message: "请选择所属大类", trigger: "blur" }],
        isEnable: [{ required: true, message: "请选择是否启用", trigger: "blur" }]

      },
      pageModel: {
        current: '1',
        size: '10',
        activityCode: ''
      },
      currentCode: ''
    };
  },
  created() {
    let _this = this;

    // 获取最新活动编号
    this.getLastActivityCodeInfo().then(res => {
      _this.pageModel.activityCode = res.activityCode;
      _this.currentCode = res.activityCode;
      _this.ruleForm.activityCode = res.activityCode;
      // 查询展品管理列表
      this.getListExhibitionAreaInfo(this.pageModel).then(res2 => {
        _this.tableData = res2.records;
      });

    });
    this.getExhibitions();
    // 获取活动编号
    this.getCfActivityCodeInfo().then(res => {
      _this.options = res.records;
    });
  },
  computed: {
    ...mapGetters('getLastActivityCode', ['getcfCode']),   // 获取活动编号
    ...mapGetters('getLastActivityCode', ['getLastCode']),   // 获取最新活动编号
    ...mapGetters('getExhibitionAreaManagementInfo', ['getExhibitionAreaList']),   // 展区管理列表
    ...mapGetters('getExhibitionAreaManagementInfo', ['saveExhArea']),   // 展区管理新增
    ...mapGetters('getExhibitionAreaManagementInfo', ['exhAreaUpdate']),   // 展区管理修改
    ...mapGetters('getExhibitionAreaManagementInfo', ['delExhArea']),   // 展区管理删除
    ...mapGetters('getLastActivityCode', ['getListCategory'])   // 查询产品大类列表
  },
  methods: {
    ...mapActions('getLastActivityCode', ['getCfActivityCodeInfo']),   // 获取活动编号
    ...mapActions('getLastActivityCode', ['getLastActivityCodeInfo']),   // 获取最近活动编号
    ...mapActions('getExhibitionAreaManagementInfo', ['getListExhibitionAreaInfo']),   // 展区管理列表
    ...mapActions('getExhibitionAreaManagementInfo', ['saveExhibitionAreaInfo']),   // 展区管理新增
    ...mapActions('getLastActivityCode', ['getListProductCategoryInfo']),   // 查询产品大类列表
    ...mapActions('getExhibitionAreaManagementInfo', ['updateExhibitionAreaInfo']),   // 展区管理修改
    ...mapActions('getExhibitionAreaManagementInfo', ['deleteExhibitionAreaInfo']),   // 展区管理删除
    submitForm() {
      this.pageModel.activityCode = this.ruleForm.activityCode;
      // 按活动编号查询展品管理列表
      this.getListExhibitionAreaInfo(this.pageModel).then(res2 => {
        this.tableData = res2.records;
      });
    },
    //启用 禁用
    forbidden(row, index) {
      this.formProduct.productCategoryId = row.productCategoryId;
      this.formProduct.exhibitionAreaCode = row.exhibitionAreaCode;
      this.formProduct.exhibitionAreaNameCn = row.exhibitionAreaNameCn;
      this.formProduct.exhibitionAreaNameEn = row.exhibitionAreaNameEn;
      if (row.isEnable === 1) {
        this.formProduct.isEnable = 0;
        this.msg = '确认禁用？';
        this.succ = '禁用成功';
        this.info = '取消禁用';
      } else if (row.isEnable === 0) {
        this.formProduct.isEnable = 1;
        this.msg = '确认启用？';
        this.succ = '启用成功';
        this.info = '取消启用';
      }

      this.formProduct.exhibitionAreaId = row.exhibitionAreaId;
      this.$confirm(this.msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateExhibitionAreaInfo(this.formProduct).then(res => {
          this.getListExhibitionAreaInfo(this.pageModel).then(res2 => {
            this.tableData = res2.records;
          });
          this.$message({
            type: 'success',
            message: this.succ
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.info
        });
      });
    },
      // 修改之前
    handleEdit(row, index) {
      // 查询产品大类列表
      let _this = this;
      this.getListProductCategoryInfo(this.pageModel.activityCode).then(res => {
        _this.productCategory = res.records;
      });
      this.formProduct.productCategoryId = row.productCategoryId;
      this.formProduct.exhibitionAreaCode = row.exhibitionAreaCode;
      this.formProduct.exhibitionAreaNameCn = row.exhibitionAreaNameCn;
      this.formProduct.exhibitionAreaNameEn = row.exhibitionAreaNameEn;
      this.formProduct.isEnable = row.isEnable;
      this.formProduct.exhibitionAreaId = row.exhibitionAreaId;
      this.dialogProduct = true;
      this.submitCon = 'edit';
    },
    codeChange(val) {
      let result = this.exhibitions.filter(function(item) {
        return item.itemCode === val;
      });
      this.formProduct.exhibitionAreaNameCn = result[0].itemText;
    },
      // 删除
    handleDelete(row, index) {
      let exhibitionAreaId = row.exhibitionAreaId;
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteExhibitionAreaInfo(exhibitionAreaId).then(res => {
          this.getListExhibitionAreaInfo(this.pageModel).then(res2 => {
            this.tableData = res2.records;
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    submitAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formProduct.activityCode = this.pageModel.activityCode;
          if (this.submitCon === 'add') {
            this.saveExhibitionAreaInfo(this.formProduct).then(res => {
              this.dialogProduct = false;
              this.getListExhibitionAreaInfo(this.pageModel).then(res2 => {
                this.tableData = res2.records;
              }).catch(e => {
                this.$message.error(e);
                return false;
              });
              this.$message({
                message: '新增成功',
                type: 'success'
              });
            }).catch(e => {
              this.$message.error(e);
              return false;
            });
          } else if (this.submitCon === 'edit') {
            this.updateExhibitionAreaInfo(this.formProduct).then(res => {
              this.dialogProduct = false;
              this.getListExhibitionAreaInfo(this.pageModel).then(res2 => {
                this.tableData = res2.records;
              }).catch(e => {
                this.$message.error(e);
                return false;
              });
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            }).catch(e => {
              this.$message.error(e);
              return false;
            });
          }
        } else {
          return false;
        }
      });

    },
    // 获取所有展区信息
    getExhibitions() {
      this.$http.get(this.baseApi2 + '/api/sysDataDictItem/findDicItemList?dictCode=exhibitionArea').then(data => {
        this.exhibitions = data.records;
      }).catch(err => {
      });
    },
    // 新增之前
    handleAdd() {
      this.formProduct = {
        activityCode: '',
        companyId: null,
        productCategoryId: '',
        exhibitionAreaCode: '',
        exhibitionAreaNameCn: '',
        exhibitionAreaNameEn: '',
        isEnable: '',
        isDelete: '0'
      };
      this.dialogProduct = true;
      // 查询产品大类列表
      this.getListProductCategoryInfo(this.pageModel.activityCode).then(res => {
        this.productCategory = res.records;
      });
      this.submitCon = 'add';
    },
      // 一键导入 saveExhibitionAreaByLastest
    handleImports() {
      this.showDialogTips("确认导入数据吗?").then(() => {
        this.$http.post(this.baseApi + '/api/customservice/cf/saveExhibitionAreaByLastest', { activityCode: this.ruleForm.activityCode }).then(res => {
          this.$message.success("导入成功");
          // 查询展品管理列表
          this.pageModel.activityCode = this.ruleForm.activityCode;
          this.getListExhibitionAreaInfo(this.pageModel).then(res2 => {
            this.tableData = res2.records;
          });
        }).catch(error => {
          this.$message.error(error);
        });
      }).catch(() => {});
    },
      // 表格多选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    resetForm() {
      this.ruleForm.activityCode = this.currentCode;
    },
    // 消息提示
    showDialogTips(tipMessage) {
      return this.$confirm(tipMessage, '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      });
    }
  }
};
</script>
<style scoped>
  .title{
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
  }
  .btn-row{
    margin-top: 10px;
  }
  .dialog-footer{
    text-align: center;
    margin: 15px 0;
    padding-bottom: 10px;
  }
  .elForm{
    margin-bottom: 30px;
  }
  .custom_btn{
    padding:7px 10px;
    background-color: #409EFF;
    cursor: pointer;
    border:none;
    border-radius: 3px;
    color: #FFFFFF
  }

</style>
<style>
.exhibition-area .el-table__expanded-cell[class*=cell]{
  padding: 0;
}
</style>

