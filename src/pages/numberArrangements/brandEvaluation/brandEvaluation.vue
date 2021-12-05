<template>
  <!-- <div> -->
    <!-- 首页 -->
  <el-tabs v-model="activeName">
    <el-tab-pane label="交易团品牌评审打分" name="first">
      <!-- form表单 -->
      <el-form size="small" :inline="true">
        <el-form-item label="企业名称">
          <el-select class="company-name" v-model="companyId" clearable>
            <el-option v-for="(item, key) in companyOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" @click="companyQuery">查询</el-button>
          <el-button type="primary">上传</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table class="review-info-table" :data="reviewInfoListQuery" v-loading="loading">
        <el-table-column align="center" prop="companyName" label="企业名称" width="150"></el-table-column>
        <el-table-column align="center" prop="exhibitionAreaName" label="展区" width="150"></el-table-column>
        <el-table-column align="center" prop="lastBoothNumber" label="123届品牌数" width="150"></el-table-column>
        <el-table-column align="center" prop="applyBoothNumber" label="申请展位数" width="150"></el-table-column>
        <el-table-column align="center" prop="totalScore" label="总分" width="150">
          <template slot-scope="scope">
            {{ scope.row.dealGradeList.length === 0 ? '' : scope.row.dealGradeList[0].totalScore }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="checkStatus" label="是否通过品牌展位条件审核" width="150">
          <template slot-scope="scope">
            {{ scope.row.checkStatus === '0' ? '未通过' : (scope.row.checkStatus === '1' ? '已通过' : '') }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="exportRatio" label="出口额占所属大类出口额比例" width="150">
          <template slot-scope="scope">
            {{ scope.row.exportRatio }}%
          </template>
        </el-table-column>
        <el-table-column align="center" prop="exportRatioScore" label="按比例计算后的出口额项目得分" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="getScore" ref="exportRatioScore" :rules="rules">
                <el-form-item class="item-Num" prop="exportRatioScore">
                  <el-input v-model="getScore.exportRatioScore" maxlength="2"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.dealGradeList.length === 0 ? '' : scope.row.dealGradeList[0].exportRatioScore }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="brandBuildScore" label="品牌建设项目得分" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="getScore" ref="brandBuildScore" :rules="rules">
                <el-form-item class="item-Num" prop="brandBuildScore">
                  <el-input v-model="getScore.brandBuildScore" maxlength="2"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.dealGradeList.length === 0 ? '' : scope.row.dealGradeList[0].brandBuildScore }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="patentScore" label="专利与版权得分" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="getScore" ref="patentScore" :rules="rules">
                <el-form-item class="item-Num" prop="patentScore">
                  <el-input v-model="getScore.patentScore" maxlength="2"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.dealGradeList.length === 0 ? '' : scope.row.dealGradeList[0].patentScore }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="newHighScore" label="国家级高新技术得分" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="getScore" ref="newHighScore" :rules="rules">
                <el-form-item class="item-Num" prop="newHighScore">
                  <el-input v-model="getScore.newHighScore" maxlength="2"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.dealGradeList.length === 0 ? '' : scope.row.dealGradeList[0].newHighScore }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="standardScore" label="国家/行业标准得分" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="getScore" ref="standardScore" :rules="rules">
                <el-form-item class="item-Num" prop="standardScore">
                  <el-input v-model="getScore.standardScore" maxlength="2"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.dealGradeList.length === 0 ? '' : scope.row.dealGradeList[0].standardScore }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="qualityScore" label="质量、环境管理体系认证项目得分" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="getScore" ref="qualityScore" :rules="rules">
                <el-form-item class="item-Num" prop="qualityScore">
                  <el-input v-model="getScore.qualityScore" maxlength="2"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.dealGradeList.length === 0 ? '' : scope.row.dealGradeList[0].qualityScore }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="industryScore" label="面向企业的行业认证项" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="getScore" ref="industryScore" :rules="rules">
                <el-form-item class="item-Num" prop="industryScore">
                  <el-input v-model="getScore.industryScore" maxlength="2"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.dealGradeList.length === 0 ? '' : scope.row.dealGradeList[0].industryScore }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="productionScore" label="面向产品或生产线的行业认证项目得分" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="getScore" ref="productionScore" :rules="rules">
                <el-form-item class="item-Num" prop="productionScore">
                  <el-input v-model="getScore.productionScore" maxlength="2"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.dealGradeList.length === 0 ? '' : scope.row.dealGradeList[0].productionScore }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="territoryScore" label="境内商标得分" width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="getScore" ref="territoryScore" :rules="rules">
                <el-form-item class="item-Num" prop="territoryScore">
                  <el-input v-model="getScore.territoryScore" maxlength="2"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.dealGradeList.length === 0 ? '' : scope.row.dealGradeList[0].territoryScore }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="beyondScore" label="境外商标得分" width="150">
         <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="getScore" ref="beyondScore" :rules="rules">
                <el-form-item class="item-Num" prop="beyondScore">
                  <el-input v-model="getScore.beyondScore" maxlength="2"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.dealGradeList.length === 0 ? '' : scope.row.dealGradeList[0].beyondScore }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="备注" width="150"></el-table-column>
        <el-table-column align="center" prop="" label="操作" width="150">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="toEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" @click="toSave(scope.$index, 
              ['exportRatioScore', 'brandBuildScore', 'patentScore', 'newHighScore', 'standardScore', 'qualityScore', 'industryScore', 'productionScore', 'territoryScore', 'beyondScore'], 
              scope.row)" :disabled="!scope.row.edit">保存</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 下载模板 -->
      <el-button class="download" type="primary">下载模板</el-button>
      <!-- 分页 -->
      <el-form class="pagination-container" :inline="true">
        <el-form-item>
          <el-pagination
            background
            layout="prev, pager, next, jumper, total"
            :total="reviewInfoList.total"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.currentPage"
            :page-size="pageInfo.pageSize">
          </el-pagination>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
  <!-- </div> -->
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
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
      pageInfo: { currentPage: 1, pageSize: 10 },
      companyOpts: [], // 企业数组
      companyId: '', // 企业Id查询
      reviewInfoListQuery: [], 
      getScore: {
        exportRatioScore: 0, // 按比例计算后的出口额项目得分
        brandBuildScore: 0, // 品牌建设项目得分
        patentScore: 0, // 专利与版权得分
        newHighScore: 0, // 国家级高新技术得分
        standardScore: 0, // 国家/行业标准得分
        qualityScore: 0, // 质量、环境管理体系认证项目得分
        industryScore: 0, // 面向企业的行业认证项目得分
        productionScore: 0, // 面向产品或生产线的行业认证项目得分
        territoryScore: 0, // 境内商标得分
        beyondScore: 0 // 境外商标得分
      },
      lastIndex: '', // 上一次的索引
      rules: {
        exportRatioScore: [
          { required: true, validator: needInt, trigger: 'blur' }
        ],
        brandBuildScore: [
          { required: true, validator: needInt, trigger: 'blur' }
        ],
        patentScore: [
          { required: true, validator: needInt, trigger: 'blur' }
        ],
        newHighScore: [
          { required: true, validator: needInt, trigger: 'blur' }
        ],
        standardScore: [
          { required: true, validator: needInt, trigger: 'blur' }
        ],
        qualityScore: [
          { required: true, validator: needInt, trigger: 'blur' }
        ],
        industryScore: [
          { required: true, validator: needInt, trigger: 'blur' }
        ],
        productionScore: [
          { required: true, validator: needInt, trigger: 'blur' }
        ],
        territoryScore: [
          { required: true, validator: needInt, trigger: 'blur' }
        ],
        beyondScore: [
          { required: true, validator: needInt, trigger: 'blur' }
        ]
      },
      activeName: "first"
    };
  },
  computed: {
    ...mapGetters('brandEvaluation', ['reviewInfoList']),
    reviewQuery() { // 初始化查询
      return {
        companyId: this.companyId,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    },
    uploadScore() { // 在线打分保存
      return {
        beyondScore: this.getScore.beyondScore,
        brandApplyId: '', // 申请Id
        brandBuildScore: this.getScore.brandBuildScore,
        checkStatus: '0',
        exportRatioScore: this.getScore.exportRatioScore,
        industryScore: this.getScore.industryScore,
        newHighScore: this.getScore.newHighScore,
        patentScore: this.getScore.patentScore,
        productionScore: this.getScore.productionScore,
        qualityScore: this.getScore.qualityScore,
        recommendCode: '', // 推荐编号
        standardScore: this.getScore.standardScore,
        territoryScore: this.getScore.territoryScore
      };
    }
  },
  created() {
    this.getReviewInfoList({ current: 0, size: 10 }).then(res => { // 企业查询
      this.companyOpts = res.companyList;
      this.createdQuery(this.reviewQuery);
    });
  },
  methods: {
    ...mapActions('brandEvaluation', ['getReviewInfoList', 'postOnlineAddScore', 'postOnlineScore']),
    companyQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery(this.reviewQuery);
    },
    editData(index, row) { // 编辑数据封装
      if (row.dealGradeList.length !== 0) {
        this.getScore = {
          exportRatioScore: row.dealGradeList[0].exportRatioScore, // 按比例计算后的出口额项目得分
          brandBuildScore: row.dealGradeList[0].brandBuildScore, // 品牌建设项目得分
          patentScore: row.dealGradeList[0].patentScore, // 专利与版权得分
          newHighScore: row.dealGradeList[0].newHighScore, // 国家级高新技术得分
          standardScore: row.dealGradeList[0].standardScore, // 国家/行业标准得分
          qualityScore: row.dealGradeList[0].qualityScore, // 质量、环境管理体系认证项目得分
          industryScore: row.dealGradeList[0].industryScore, // 面向企业的行业认证项目得分
          productionScore: row.dealGradeList[0].productionScore, // 面向产品或生产线的行业认证项目得分
          territoryScore: row.dealGradeList[0].territoryScore, // 境内商标得分
          beyondScore: row.dealGradeList[0].beyondScore // 境外商标得分
        };
      } else {
        this.getScore = {
          exportRatioScore: 0, // 按比例计算后的出口额项目得分
          brandBuildScore: 0, // 品牌建设项目得分
          patentScore: 0, // 专利与版权得分
          newHighScore: 0, // 国家级高新技术得分
          standardScore: 0, // 国家/行业标准得分
          qualityScore: 0, // 质量、环境管理体系认证项目得分
          industryScore: 0, // 面向企业的行业认证项目得分
          productionScore: 0, // 面向产品或生产线的行业认证项目得分
          territoryScore: 0, // 境内商标得分
          beyondScore: 0 // 境外商标得分
        };
      }
      this.reviewInfoListQuery[index]['edit'] = true;
      this.lastIndex = index;
    },
    toEdit(index, row) { // 打分编辑
      if (this.lastIndex === '' || index === this.lastIndex) {
        this.editData(index, row);
      } else if (index !== this.lastIndex) {
        this.$confirm('是否放弃保存此次打分？', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.reviewInfoListQuery.length; i++) {
            this.reviewInfoListQuery[i]['edit'] = false;
          }
          this.editData(index, row);
        }).catch(() => {
          this.$message.info('已取消此操作!');
        });
      }
    },
    toSave(index, formNameList, row) { // 打分保存
      let validArr = [];
      let flag = '';
      for (let i = 0; i < formNameList.length; i++) {
        this.$refs[formNameList[i]].validate(valid => {
          validArr.push(valid);
        });
      }
      for (let f = 0; f < validArr.length; f++) {
        if (validArr[f]) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag) {
        this.loading = true;
        // this.uploadScore.checkStatus = row.dealGradeList[0].checkStatus;
        this.uploadScore.brandApplyId = row.brandApplyId;
        this.uploadScore.recommendCode = row.brandApplyId;
        if (row.dealGradeList.length !== 0) {
          this.postOnlineScore(this.uploadScore).then(res => {
            this.createdQuery(this.reviewQuery);
            this.reviewInfoListQuery[index]['edit'] = false; 
            this.lastIndex = '';
            this.$message.success('保存成功');
          }).catch(e => {
            this.loading = false;
          });
        } else {
          this.postOnlineAddScore(this.uploadScore).then(res => {
            this.createdQuery(this.reviewQuery);
            this.reviewInfoListQuery[index]['edit'] = false;
            this.lastIndex = '';
            this.$message.success('保存成功');
          }).catch(e => {
            this.loading = false;
          });
        }
      } else {
        this.$message.error('请确认打分正确');
      }
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery(this.reviewQuery);
    },
    createdQuery(data) {
      this.loading = true;
      this.getReviewInfoList(data).then(res => {
        this.loading = false;
        let reviewInfoData = JSON.parse(JSON.stringify(res.records));
        for (let i = 0; i < reviewInfoData.length; i++) {
          reviewInfoData[i].edit = false;
        }
        this.reviewInfoListQuery = reviewInfoData;
        this.lastIndex = '';
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
/* *{
  float: right;
} */
.company-name{
  width: 150px;
}
.item-Num  >>> .el-form-item__content{
  margin-left: 0 !important;
}
.el-table >>> .cell{
  overflow: visible !important;
}
.queryBtn, .pagination-container{
  float: right;
}
.download, .pagination-container{
  margin-top: 20px;
}
</style>


