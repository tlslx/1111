<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="登记企业母子关系及类别表" name="first">
      <el-form :model="queryForm" size="small" :inline="true">
        <el-form-item label="资质使用展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资质来源">
          <el-select v-model="queryForm.aptitudeSource" clearable>
            <el-option v-for="(item, key) in aptitudeSourceOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资质类型">
          <el-select v-model="queryForm.aptitudeType" clearable>
            <el-option v-for="(item, key) in aptitudeTypeOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-select v-model="queryForm.companyName" clearable>
            <el-option v-for="(item, key) in companyOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input v-model="queryForm.cantonFairCode" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="材料编码">
          <el-input v-model="queryForm.materialCode" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" class="floatlaf" size="medium" @click="handleQuery">查询</el-button>
          <!-- <el-button type="primary" size="medium">上传</el-button> -->
          <el-upload
            class="floatlaf"
            action=""
            :limit="1"
            :http-request="uploadFileMethod">
            <el-button class="formStyle" type="primary">上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-table :data="motherChildRelationList.records" ref="multipleTable" v-loading="loading" @select="handleSelectionChange" @select-all="handleSelectionChange" @selection-change="handleCheckedChange" :row-key="getRowKey" border>
        <el-table-column type="selection" width="38px"></el-table-column>
        <el-table-column align="center" label="广交会编码" prop="cantonFairCode"></el-table-column>
        <el-table-column align="center" label="申请企业名称" prop="companyName"></el-table-column>
        <el-table-column align="center" label="资质类型" prop="aptitudeType">
          <template slot-scope="scope">
            {{ scope.row.aptitudeType | aptitudeTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="资质来源" prop="aptitudeSource">
          <template slot-scope="scope">
            {{ scope.row.aptitudeSource | aptitudeSourceFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="资质对应企业名称" prop="correlationCompanyName"></el-table-column>
        <el-table-column align="center" label="资质使用展区" prop="exhibitionArea"></el-table-column>
        <el-table-column align="center" label="交易团审核情况" prop="checkDescribe"></el-table-column>
        <el-table-column align="center" label="材料编码" prop="materialCode"></el-table-column>
        <el-table-column align="center" label="公示" prop="isPublicity">
          <template slot-scope="scope">
            {{ scope.row.isPublicity === '0' ? '未公示' : (scope.row.isPublicity === '1' ? '已公示' : '') }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.row.registerId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="utils-button" type="danger" size="medium" @click="handleRegistDialog">登记</el-button>
      <el-button class="utils-button" type="primary" size="medium" @click="handDownload">下载模板</el-button>
      <el-button class="utils-button" type="danger" size="medium" @click="handlePublicity('1')">公示</el-button>
      <el-button class="utils-button" type="primary" size="medium" @click="handlePublicity('0')">撤回公示</el-button>
      <el-form class="pagination-container" :inline="true">
        <el-form-item>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="motherChildRelationList.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
            :current-page="pageInfoData.currentPage"
            :page-size="pageInfoData.pageSize">
          </el-pagination>
        </el-form-item>
      </el-form>
      <!-- 登记弹窗 -->
      <el-dialog title="登记" :visible.sync="isRegist" v-if="isRegist">
        <el-form :model="registForm" ref="registForm" :rules="registFormRule" label-width="150">
          <div class="regist-box">
            <el-form-item class="regist-item" label="广交会编码：" prop="cantonFairCode">
              <el-input placeholder="请输入" v-model="registForm.cantonFairCode" :disabled="isEdit" clearable></el-input>
            </el-form-item>
            <el-form-item class="regist-item" label="资质对应企业名称：" prop="correlationCompanyName">
              <el-input placeholder="请输入" v-model="registForm.correlationCompanyName" clearable></el-input>
            </el-form-item>
          </div>
          <div class="regist-box">
            <el-form-item class="regist-item" label="申请企业名称：" prop="companyName">
              <el-input placeholder="请输入" v-model="registForm.companyName" :disabled="isEdit" clearable></el-input>
            </el-form-item>
            <el-form-item class="regist-item" label="资质使用展区：" prop="exhibitionArea">
              <el-select v-model="registForm.exhibitionArea">
                <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="regist-box">
            <el-form-item class="regist-item" label="资质类型：" prop="aptitudeType">
              <el-select v-model="registForm.aptitudeType">
                <el-option v-for="(item, index) in aptitudeTypeOpts" :key="index" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="regist-item" label="材料编码：" prop="materialCode">
              <el-input placeholder="请输入" v-model="registForm.materialCode" :disabled="isEdit" clearable></el-input>
            </el-form-item>
          </div>
          <div class="regist-box">
            <el-form-item class="regist-item" label="资质来源：" prop="aptitudeSource">
              <el-select v-model="registForm.aptitudeSource">
                <el-option v-for="(item, index) in aptitudeSourceOpts" :key="index" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="dialogFooter">
            <el-button type="primary" size="medium" @click="handleRegistSave('registForm')">保存</el-button>
            <el-button size="medium" @click="isRegist = false;">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      loading: '',
      isRegist: false,
      isEdit: false,
      saveOrEdit: true, // true为save, false为edit
      lastCheckData: [], // 上次保存的值
      selectData: [], // 选中的数据索引
      checkList: [], // 临时选中的值
      list: [],
      exhibitionAreaOpts: [],
      companyOpts: [],
      aptitudeTypeOpts: [{ value: '1', label: '出口额' }, { value: '2', label: '境内商标' }, { value: '3', label: '境外商标' }, 
      { value: '4', label: '品牌建设' }, { value: '5', label: '研发创新和自主知识产权' }, { value: '6', label: '国际通行认证' }, { value: '7', label: '行业自律' },
      { value: '8', label: '广交会参展表现' }, { value: '9', label: '国家或行业标准' }], // 资质类型
      aptitudeSourceOpts: [{ value: '2', label: '绝对控股子公司所有' }, { value: '3', label: '相对控股子公司所有' }, 
      { value: '4', label: '绝对控股母公司所有' }, { value: '5', label: '绝对控股母公司的其他绝对控股子公司所有' }], // 资质来源
      queryForm: {
        coceralId: this.$store.getters.userInfo.org.deptCode, // 商协会id
        cantonFairCode: '', // 广交会编码
        exhibitionArea: '', // 资质使用展区
        aptitudeType: '', // 资质类型
        companyName: '', // 企业id
        materialCode: '', // 材料编码
        aptitudeSource: '' // 资质来源
      },
      registForm: { // 登记参数
        cantonFairCode: '',
        correlationCompanyName: '',
        companyName: '',
        exhibitionArea: '',
        aptitudeType: '',
        materialCode: '',
        aptitudeSource: ''
      },
      registFormRule: { // 登记表单校验规则
        cantonFairCode: [{ required: true, message: '请输入', trigger: 'blur' }],
        correlationCompanyName: [{ required: true, message: '请输入', trigger: 'blur' }],
        companyName: [{ required: true, message: '请输入', trigger: 'blur' }],
        exhibitionArea: [{ required: true, message: '请输入', trigger: 'blur' }],
        aptitudeType: [{ required: true, message: '请选择', trigger: 'change' }],
        materialCode: [{ required: true, message: '请输入', trigger: 'blur' }],
        aptitudeSource: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      publicityList: [], // 公示or撤回公示传参
      pageInfoData: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    aptitudeTypeFilter: value => {
      switch (value) {
        case '1':
          return '出口额';
        case '2': 
          return '境内商标';
        case '3':
          return '境外商标'; 
        case '4':
          return '品牌建设';
        case '5': 
          return '研发创新和自主知识产权';
        case '6':
          return '国际通行认证'; 
        case '7':
          return '行业自律';
        case '8': 
          return '广交会参展表现';
        case '9':
          return '国家或行业标准';      
        default:
          return '';    
      }
    },
    aptitudeSourceFilter: value => {
      switch (value) {
        case '1':
          return '本企业所有';
        case '2': 
          return '绝对控股子公司所有';
        case '3':
          return '相对控股子公司所有'; 
        case '4':
          return '绝对控股母公司所有';
        case '5': 
          return '绝对控股母公司的其他绝对控股子公司所有';     
        default:
          return '';    
      }
    }
  },
  computed: {
    ...mapGetters('checkRecommendCompany', ['motherChildRelationList']),
    formQuery() {
      return {
        cantonFairCode: this.queryForm.cantonFairCode,
        coceralId: this.queryForm.coceralId,
        exhibitionArea: this.queryForm.exhibitionArea, 
        aptitudeType: this.queryForm.aptitudeType,
        companyName: this.queryForm.companyName, 
        materialCode: this.queryForm.materialCode,
        aptitudeSource: this.queryForm.aptitudeSource,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    },
    getRowKey (row) { // 获取row的key值
      return row.registerId;
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.loading = true;
    this.getMotherChildRelationCondition().then(res => {
      this.companyOpts = res.companyOpts;
      this.createdQuery();
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('checkRecommendCompany', ['getMotherChildRelationCondition', 'getMotherChildRelationList', 
      'postCoceralGradeUpdate', 'postMotherChildRelationshipAdd', 'postMotherChildRelationshipUpdate', 'postMotherChildRelationshipDelete',
      'uploadmotherChildRelation' // 上传
    ]),
    ...mapActions('nainformation', ['getexhibitionArea']),
    // 登记弹框
    handleRegistDialog() {
      this.registForm = { // 初始化
        cantonFairCode: '',
        correlationCompanyName: '',
        companyName: '',
        exhibitionArea: '',
        aptitudeType: '',
        materialCode: '',
        aptitudeSource: ''
      };
      this.isEdit = false;
      this.isRegist = true;
      this.saveOrEdit = true;
    },
    // 编辑
    handleEdit(row) {
      this.registForm = { // 初始化
        registerId: row.registerId,
        cantonFairCode: row.cantonFairCode,
        correlationCompanyName: row.correlationCompanyName,
        companyName: row.companyName,
        exhibitionArea: row.exhibitionArea,
        aptitudeType: row.aptitudeType,
        materialCode: row.materialCode,
        aptitudeSource: row.aptitudeSource
      };
      this.isEdit = true;
      this.isRegist = true;
      this.saveOrEdit = false;
    },
    // 删除
    handleDelete(id) {
      this.$confirm('是否删除此数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postMotherChildRelationshipDelete({ registerId: id }).then(() => {
          this.$message.success('删除成功');
          this.createdQuery();
        }).catch(e => {});
      }).catch(() => {
        this.$message.info('已取消本次操作');
      });
    },
    // 登记保存
    handleRegistSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          if (this.saveOrEdit) { // 保存
            this.postMotherChildRelationshipAdd(this.registForm).then(() => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message.success('登记成功');
              this.isRegist = false;
              this.createdQuery();
            }).catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
          } else { // 编辑
            this.postMotherChildRelationshipUpdate(this.registForm).then(() => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message.success('登记成功');
              this.isRegist = false;
              this.createdQuery();
            }).catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
          }
        }
      });
    },
    handleCheckedChange(rows) { // 选中的数据获取
      this.checkList = []; // 初始化，防止重复添加
      if (rows) {
        rows.forEach(row => { // 遍历已选择的数据
          if (row) {
            this.checkList.push(row);
          }
        });
      }
    },
    // 点击公示or撤回公示
    handlePublicity(typeId) {
      this.lastCheckData[this.pageInfoData.currentPage - 1] = this.checkList; // 保存当前页获取的值
      //降维 --- 二维数组降至一维数组
      let getList = Array.prototype.concat.apply([], this.lastCheckData);
      this.publicityList = JSON.parse(JSON.stringify(getList));
      if (this.publicityList.length > 0) {
        let flag = true;
        for (let i = 0; i < this.publicityList.length; i++) {
          if (this.publicityList[i].isPublicity === typeId) {
            flag = false;
            break;
          }
        }
        if (flag) {
          this.$confirm('确定进行此操作吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            for (let i = 0; i < this.publicityList.length; i++) {
              this.publicityList[i].isPublicity = typeId;
            }
            this.postCoceralGradeUpdate(this.publicityList).then(() => {
              this.$message.success('操作成功');
              this.createdQuery();
            }).catch(e => {});
          }).catch(() => {
            this.$message.info('已取消此操作');
          });
        } else {
          switch (typeId) {
            case '0':
              return this.$message.error('请确认选择的数据中，其公示状态都为已公示');
            case '1':
              return this.$message.error('请确认选择的数据中，其公示状态都为未公示');  
            default:
              return '';  
          }
        }
      } else {
        this.$message.warning('请至少选择一项');
      }
    },
    handleSelectionChange(selection, row) { // 选中的数据索引获取
      this.selectData[this.pageInfoData.currentPage - 1] = []; // 初始化
      this.motherChildRelationList.records.forEach((item, index) => {
        for (let i = 0; i < selection.length; i++) { // 遍历已选的数据重新填充数组
          if (item.registerId === selection[i].registerId) {
            this.selectData[this.pageInfoData.currentPage - 1].push(index);
          } 
        }
      });
    },
    toggleSelection(rows) { // 判断是否选中
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 查询
    handleQuery() {
      this.pageInfoData.currentPage = 1;
      this.createdQuery();
    },
    // 导入（上传）
    uploadFileMethod(param) {
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      this.uploadmotherChildRelation(formData).then(res => {
        this.$message({
          type: "success",
          message: "导入成功"
        });
      }).catch(e => {});
    },
    // 下载
    handDownload() {
      // // // // let url = "exhibitionArea=" + this.queryForm.exhibitionArea + "&boothType=" + this.queryForm.boothType + "&exhibitionPeriod=" + this.queryForm.exhibitionPeriod + "&exhibitionAreaCode=" + this.queryForm.exhibitionAreaCode;
      // url = url.replace(/undefined/g, "");
      window.open(process.env.API_NA_URL + "/api/motherChildRelationship/motherChildRelation/download?token=" + localStorage.getItem("USER_TOKEN"), "_parent");
    },
    // 操作页面
    handleCurrentChange(val) {
      this.lastCheckData[this.pageInfoData.currentPage - 1] = this.checkList; // 保存当前页获取的值
      this.pageInfoData.currentPage = val;
      this.loading = true;
      this.getMotherChildRelationList(this.formQuery).then(() => {
        this.loading = false;

        let arr = [];
        if (this.selectData[this.pageInfoData.currentPage - 1]) {
          this.selectData[this.pageInfoData.currentPage - 1].forEach((item, index) => {
            arr.push(this.motherChildRelationList.records[item]);
          });
        }
        let setTime = new Promise((resolve, reject) => {
          resolve(arr);
        });
        Promise.all([setTime]).then((results) => {
          this.toggleSelection(arr);
        });
      }).catch(e => {
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      this.pageInfoData.currentPage = 1;
      this.pageInfoData.pageSize = val;
      this.createdQuery();
    },
    //查询封装
    createdQuery() {
      this.loading = true;
      this.getMotherChildRelationList(this.formQuery).then(() => {
        this.loading = false;
        this.publicityList = [];
        this.checkList = [];
        this.selectData = [];
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.queryBtn, .pagination-container{
  float: right;
}
.utils-button, .pagination-container{
  margin-top: 20px;
} 
.regist-box{
  display: flex;
}
.regist-box .regist-item{
  width: 50%;
  padding: 0 20px;
  box-sizing: border-box;
}
.dialogFooter{
  text-align: center;
  padding: 20px 0;
}
.floatlaf {
  margin: 0 10px;
  float: left;
}
</style>
