<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="外贸司公布品牌数量安排方案结果" name="first">
      <el-form :model="queryForm" size="small" :inline="true">
        <el-form-item label="商协会">
          <el-select v-model="queryForm.coceralId" clearable>
            <el-option v-for="(item, key) in coceralOpts" :key="key" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-select v-model="queryForm.companyId" clearable>
            <el-option v-for="(item, key) in companyOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公布状态">
          <el-select v-model="queryForm.ifPublish" clearable>
            <el-option v-for="(item, key) in ifPublishOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" size="medium" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="seeArr" ref="multipleTable" v-loading="loading" @select="handleSelectionChange" @select-all="handleSelectionChange" @selection-change="handleCheckedChange" :row-key="getRowKey" border>
        <el-table-column type="selection" :selectable="isSelect" width="48px"></el-table-column>
        <el-table-column align="center" label="地区" prop="area"></el-table-column>
        <el-table-column align="center" label="展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" label="交易团" prop="dealClusterName"></el-table-column>
        <el-table-column align="center" label="商协会" prop="coceralName"></el-table-column>
        <el-table-column align="center" label="品牌企业名称" prop="companyName"></el-table-column>
        <el-table-column align="center" label="品牌企业展位数" prop="brandBoothNumber">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="getNumber" ref="brandBoothNumber" :rules="rules">
                <el-form-item class="item-Num" prop="brandBoothNumber">
                  <el-input type="number" v-model.number="getNumber.brandBoothNumber" oninput="if(value>2)value=value.slice(0,2)"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.brandBoothNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="公布状态" prop="ifPublish">
          <template slot-scope="scope">
            {{ scope.row.ifPublish === '0' ? '未公布' : '已公布' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="toEdit(scope.$index, scope.row)" :disabled="isEditSave(scope.row.ifPublish)">编辑</el-button>
            <el-button type="text" @click="toSave(scope.$index, 'brandBoothNumber', scope.row)" :disabled="!scope.row.edit">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="utils-button" type="danger" size="medium" @click="openPublished" :disabled="isDisabled">公布</el-button>
      <el-button class="utils-button" type="primary" size="medium">下载/打印</el-button>
      <el-form class="pagination-container" :inline="true">
        <el-form-item>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="foreignTradeData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
            :current-page="pageInfo.currentPage"
            :page-size="pageInfo.pageSize">
          </el-pagination>
        </el-form-item>
      </el-form>
      <el-dialog title="公布" :visible.sync="isPublished" v-if="isPublished" width="550px">
        <el-form :model="publishedForm" ref="publishedForm" :rules="publishRules">
          <el-form-item label="发布至：" prop="publishWay">
            <el-checkbox-group v-model="publishedForm.publishWay">
              <el-checkbox v-for="(item, index) in publishedGoOpts" :key="index" :label="item" @change="handleChange((index + 1), publishWayArr)"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="附件：">
            <el-upload ref="upload" action="" :http-request="handleUpload" :limit="1" :on-change="handleFileChange" :auto-upload="false">
              <el-button type="primary" size="medium">选取文件</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="footera">
          <el-button type="primary" size="medium" @click="submitPublish('publishedForm')">确认</el-button>
          <el-button type="info" size="medium" @click="cancelPublished">取消</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { $date } from '@/scripts/project/utils';
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    var needInt = (rule, value, callback) => {
      const reg = /[^\d\$]/g;
      if (value === '') {
        return callback(new Error('请输入>=0的整数'));
      } else if (reg.test(value)) {
        return callback(new Error('请输入>=0的整数'));
      } else {
        return callback();
      }
    };
    return {
      loading: '',
      lastCheckData: [], // 上次保存的值
      selectData: [], // 选中的数据索引
      checkList: [], // 临时选中的值
      seeArr: [],
      lastIndex: '', // 上一次保存的索引
      isPublished: false,
      isDisabled: false,
      coceralOpts: [],
      exhibitionAreaOpts: [],
      companyOpts: [],
      ifPublishOpts: [{ value: '0', label: '未公布' }, { value: '1', label: '已公布' }],
      delegationOpts: [],
      queryForm: {
        coceralId: '',
        exhibitionArea: '',
        companyId: '',
        ifPublish: '',
        dealClusterId: ''
      },
      getNumber: {
        brandBoothNumber: 0
      },
      publishedGoOpts: ['广交会官网', '内部管理系统', '易捷通系统'],
      publishWayArr: [],
      publishedForm: {
        publishWay: []
      },
      rules: {
        brandBoothNumber: [{ required: true, validator: needInt, trigger: 'blur' }]
      },
      publishRules: {
        publishWay: [{ required: true, message: '请选择至少一项发布渠道', trigger: 'change' }]
      },
      tableData: [],
      activeName: "first",
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('numberBrands', ['foreignTradeData', 'deadlineDate']),
    getRowKey (row) { // 获取row的key值
      return row.name; // 这里举例获取姓名
    },
    // 查询的数据
    formQuery() {
      return {
        coceralId: this.queryForm.coceralId,
        exhibitionArea: this.queryForm.exhibitionArea,
        companyId: this.queryForm.companyId,
        ifPublish: this.queryForm.ifPublish,
        dealClusterId: this.queryForm.dealClusterId,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    },
    // 保存的数据
    uploadBrandNum() {
      return {
        publishId: '',
        publicityId: '',
        brandBoothNumber: this.getNumber.brandBoothNumber
      };
    },
    // 公布的数据
    uploadPublish() {
      return {
        publishLog: {
          attachment: '',
          publishWay: ''
        },
        schemePublishList: []
      };
    }
  },
  created() {
    this.loading = true;
    this.getDeadlineDate().then(res => {
      let currentDate = $date.milliseconds($date.dateformatter($date.curDate()).substring(5));
      if ($date.milliseconds(`${res.deadline}`) < currentDate) {
        this.isDisabled = true;
        this.$message.warning('注意：公布时间已截止');
      }
    }).catch(e => {});
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      this.coceralOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.getSchemeForeignTrade({ current: 0, size: 0 }).then(res => {
      this.companyOpts = res.companyOpts;
      this.createdQuery();
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions("numberBrands", ["getSchemeForeignTrade", 'getDeadlineDate', 'postBrandNumEdit', 'postSchemePublishAdd', 'postFileUpload']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getassociationDepartment']),
    // 是否已公布
    isSelect(row) {
      if (row.ifPublish === '0') {
        return true;
      } else {
        return false;
      }
    },
    // 是否可编辑保存
    isEditSave(val) {
      if (val - 0) {
        return false;
      } else {
        return true;
      }
    },
    editData(index, row) { // 编辑数据封装
      this.getNumber.brandBoothNumber = row.brandBoothNumber ? row.brandBoothNumber : 0;
      this.seeArr[index]['edit'] = true;
      this.lastIndex = index;
    },
    // 编辑
    toEdit(index, row) {
      if (this.lastIndex === '' || index === this.lastIndex) {
        this.editData(index, row);
      } else if (index !== this.lastIndex) {
        this.$confirm('是否放弃保存此次修改？', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.seeArr.length; i++) {
            this.seeArr[i]['edit'] = false;
          }
          this.editData(index, row);
        }).catch(() => {
          this.$message.info('已取消此操作!');
        });
      }
    },
    // 保存
    toSave(index, formName, row) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.uploadBrandNum.publishId = row.publishId;
          this.uploadBrandNum.publicityId = row.publicityId;
          let uploadBrandNumArr = [];
          for (let k in this.uploadBrandNum) {
            uploadBrandNumArr.push(`${k}=${this.uploadBrandNum[k]}`);
          }
          let uploadBrandNum = uploadBrandNumArr.join('&');
          this.postBrandNumEdit(uploadBrandNum).then(() => {
            this.$message.success('保存成功');
            this.createdQuery();
          }).catch(e => {
            this.loading = false;
          });
        }
      });
    },
    // 公布
    openPublished() {
      this.publishedForm.publishWay = [];
      this.publishWayArr = [];
      this.lastCheckData[this.pageInfo.currentPage - 1] = this.checkList; // 保存当前页获取的值
      let getList = Array.prototype.concat.apply([], this.lastCheckData);
      this.isPublished = true;
      if (getList.length > 0) {
        this.isPublished = true;
        this.uploadPublish.schemePublishList = getList;
      } else {
        this.$message.warning('请至少选择一项需要公布的数据');
      }
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
    // 发布渠道选择
    handleChange(val, arr) {
      let index = arr.indexOf(val);
      if (index === -1) {
        arr.push(val);
      } else {
        arr.splice(index, 1);
      }
    },
    // 文件选择改变
    handleFileChange(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 10;    //这里做文件大小限制
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
      }
    },
    // 自定义文件上传
    handleUpload(param) {
      let formData = new FormData();
      formData.append('file', param.file);
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.postFileUpload(formData).then(res => {
        this.uploadPublish.publishLog.attachment = res.fileId;
        this.$message.success('上传成功');
        if (this.publishWayArr.length > 1) {
          this.uploadPublish.publishLog.publishWay = this.publishWayArr.join(',');
        } else {
          this.uploadPublish.publishLog.publishWay = this.publishWayArr[0] + '';
        }
        this.postSchemePublishAdd(this.uploadPublish).then(() => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
          this.checkList = [];
          this.lastCheckData = [];
          this.selectData = [];
          this.cancelPublished();
          this.$message.success('发布成功');
          this.createdQuery();
        }).catch(e => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
        });
      }).then(e => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
      });
    },
    // 确定公布
    submitPublish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs.upload.submit();
        }
      });
    },
    handleSelectionChange(selection, row) { // 选中的数据索引获取
      this.selectData[this.pageInfo.currentPage - 1] = []; // 初始化
      this.seeArr.forEach((item, index) => {
        for (let i = 0; i < selection.length; i++) { // 遍历已选的数据重新填充数组
          if (item.publicityId === selection[i].publicityId) {  
            this.selectData[this.pageInfo.currentPage - 1].push(index);
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
    // 取消
    cancelPublished() {
      this.publishWayArr = '';
      this.publishedForm.publishWay = [];
      this.isPublished = false;
    },
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.checkList = [];
      this.lastCheckData = [];
      this.selectData = [];
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val) {
      this.lastCheckData[this.pageInfo.currentPage - 1] = this.checkList; // 保存当前页获取的值
      this.pageInfo.currentPage = val;
      this.loading = true;
      this.getSchemeForeignTrade(this.formQuery).then(res => {
        let seeArrData = JSON.parse(JSON.stringify(res.records));
        for (let i = 0; i < seeArrData.length; i++) {
          seeArrData[i].edit = false;
        }
        this.seeArr = seeArrData;
        this.lastIndex = '';

        // 勾选上次已勾选的数据
        let arr = [];
        if (this.selectData[this.pageInfo.currentPage - 1]) {
          this.selectData[this.pageInfo.currentPage - 1].forEach((item, index) => {
            arr.push(this.seeArr[item]);
          });
        }
        let setTime = new Promise((resolve, reject) => {
          resolve(arr);
        });
        Promise.all([setTime]).then((results) => {
          this.toggleSelection(arr);
        });
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    createdQuery() {
      this.loading = true;
      this.getSchemeForeignTrade(this.formQuery).then(res => {
        this.loading = false;
        let seeArrData = JSON.parse(JSON.stringify(res.records));
        for (let i = 0; i < seeArrData.length; i++) {
          seeArrData[i].edit = false;
          seeArrData[i].publishType = res.records[i].publicityType;
        }
        this.seeArr = seeArrData;
        this.lastIndex = '';
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
.item-Num  >>> .el-form-item__content{
  margin-left: 0 !important;
}
.item-Num >>> input::-webkit-outer-spin-button,
.item-Num >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none!important;
}
.item-Num >>> input[type="number"]{
  -moz-appearance: textfield!important;
}
.el-table >>> .cell{
  overflow: visible !important;
}
.footera{
  text-align: center;
  padding-bottom: 20px;
}
</style>
