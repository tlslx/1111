<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="外贸司公布方案" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="商协会">
          <el-select v-model="queryForm.coceralId" clearable>
            <el-option v-for="item in coceralOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <!--
        <el-form-item label="地区">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="item in dealClusterOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        -->
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="item in exhibitionAreaOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="届数">
          <el-input placeholder="请输入" v-model="queryForm.exhibitionSession" clearable></el-input>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="item in dealClusterOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery('first')">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="examineResultDataList" v-loading="loading" border>
        <el-table-column label="届数" prop="exhibitionSession" align="center"></el-table-column>
        <el-table-column label="地区" align="center"></el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="商协会" prop="coceralName" align="center"></el-table-column>
        <el-table-column label="品牌企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="品牌企业展位数" prop="brandBoothNumber" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="getBoothNumber" ref="brandBoothNumber" :rules="rules">
                <el-form-item class="item-Num" prop="brandBoothNumber">
                  <el-input v-model="getBoothNumber.brandBoothNumber" maxlength="2"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.brandBoothNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" @click="handleSave(scope.$index, 'brandBoothNumber', scope.row)" :disabled="!scope.row.edit">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="danger" size="medium" @click="openPublished">公示</el-button>
          <el-button type="primary" size="medium">下载</el-button>
        </span>
        <el-pagination 
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-size="pageInfoData.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="publishConditionData.total">
        </el-pagination>
      </el-row>
      <!-- 公示弹框 -->
      <el-dialog title="公示" :visible.sync="isPublished" v-if="isPublished" width="30%">
        <el-form :model="publishedForm" ref="publishedForm" :rules="publishRules">
          <el-form-item label="发布至：" prop="publishWay">
            <el-checkbox-group v-model="publishedForm.publishWay">
              <el-checkbox v-for="(item, index) in publishedGoOpts" :key="index" :label="item" @change="handleChange((index + 1), publishWayArr)"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="附件：">
            <el-button type="primary" size="medium">选取文件</el-button>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" size="medium" @click="submitPublish('publishedForm')">确认</el-button>
          <el-button type="info" size="medium" @click="isPublished = false;">取消</el-button>
        </div>
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
      activeName: 'first',
      loading: '',
      isPublished: false,
      examineResultDataList: [],
      exhibitionAreaOpts: [],
      dealClusterOpts: [],
      companyOpts: [],
      coceralOpts: [],
      backTypeOpts: [],
      queryForm: {
        exhibitionArea: '',
        exhibitionSession: '',
        coceralId: '',
        dealClusterId: ''
      },
      getBoothNumber: {
        brandBoothNumber: ''
      },
      lastIndex: '',
      rules: {
        brandBoothNumber: [{ required: true, validator: needInt, trigger: 'blur' }]
      },
      publishWayArr: [],
      publishedGoOpts: ['广交会官网', '内部管理系统', '易捷通系统'],
      publishedForm: {
        publishWay: []
      },
      publishedData: {}, // 公示传参
      publishRules: {
        publishWay: [{ required: true, message: '请选择至少一项发布渠道', trigger: 'change' }]
      },
      pageInfoData: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('adjustmentForeignTradeDivision', ['publishConditionData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        exhibitionSession: this.queryForm.exhibitionSession,
        coceralId: this.queryForm.coceralId,
        dealClusterId: this.queryForm.dealClusterId,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    },
    uploadBoothNumber() { // 在线编辑保存
      return {
        publicityId: '',
        brandBoothNumber: this.getBoothNumber.brandBoothNumber - 0
      };
    }
  },
  created() {
    this.createdQuery();
  },
  methods: {
    ...mapActions('adjustmentForeignTradeDivision', ['getPublishConditionQuery', 'getPublishCondition', 'postPublishUpdate', 'postPublishAdd']),
    // 编辑数据封装
    editData(index, row) { 
      this.getBoothNumber.brandBoothNumber = row.brandBoothNumber ? row.brandBoothNumber : 0;
      this.examineResultDataList[index]['edit'] = true;
      this.lastIndex = index;
    },
    // 编辑
    handleEdit(index, row) {
      if (this.lastIndex === '' || index === this.lastIndex) {
        this.editData(index, row);
      } else if (index !== this.lastIndex) {
        this.$confirm('是否放弃保存此次编辑？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.examineResultDataList.length; i++) {
            this.examineResultDataList[i]['edit'] = false;
          }
          this.editData(index, row);
        }).catch(() => {
          this.$message.info('已取消此操作!');
        });
      }
    },
    // 保存
    handleSave(index, formName, row) { // 编辑保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.uploadBoothNumber.publicityId = row.publicityId;
          this.postPublishUpdate(this.uploadBoothNumber).then(res => {
            this.examineResultDataList[index]['edit'] = false;
            this.$message.success('保存成功');
            this.createdQuery();
          }).catch(e => {
            this.loading = false;
          });
        }
      });
    },
    // 打开公示弹框
    openPublished() {
      this.publishedData = {
        pubilshWay: '',
        attachment: ''
      },
      this.publishWayArr = [];
      this.publishedForm.pubilshWay = [];
      this.isPublished = true;
    },
    // 发布渠选择
    handleChange(id, arr) {
      let index = arr.indexOf(id);
      if (index === -1) {
        arr.push(id);
      } else {
        arr.splice(index, 1);
      }
    },
    // 确认公布
    submitPublish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.publishedData.pubilshWay = this.publishWayArr.length > 1 ? this.publishWayArr.join(',') : this.publishWayArr[0] + '';
          this.postPublishAdd(this.publishedData).then(() => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
            this.$message.success('公示成功');
            this.isPublished = false;
            this.createdQuery();
          }).catch(e => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
          });
        }
      });
    },
    // 查询
    handleQuery() {
      this.pageInfoData.currentPage = 1;
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getPublishConditionQuery().then(res => {
        this.exhibitionAreaOpts = res.exhibitionAreaOpts;
        this.dealClusterOpts = res.dealClusterOpts;
        this.coceralOpts = res.coceralOpts;
        this.getPublishCondition(this.formQuery).then(data => {
          this.loading = false;
          let reviewInfoData = JSON.parse(JSON.stringify(data.records));
          for (let i = 0; i < reviewInfoData.length; i++) {
            reviewInfoData[i].edit = false;
          }
          this.examineResultDataList = reviewInfoData;
          this.lastIndex = '';
        }).catch(e => {
          this.loading = false;
        });
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}  
.item-Num  >>> .el-form-item__content{
  margin-left: 0 !important;
}
.el-table >>> .cell{
  overflow: visible !important;
}
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
