<template>
  <!-- <div> -->
    <!-- 首页 -->
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="交易团提交推荐方案" name="first">
      <!-- form表单 -->
      <el-form :model="reviewQueryForm" size="small" label-width="110px" :inline="true">
        <el-form-item label="企业出口额得分">
          <el-select v-model="reviewQueryForm.exportRatioScoreCode" clearable>
            <el-option :label="getScoreItems[0].label" :value="getScoreItems[0].value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="境外商标得分">
          <el-select v-model="reviewQueryForm.beyondScoreCode" clearable >
            <el-option :label="getScoreItems[1].label" :value="getScoreItems[1].value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="总分">
          <el-select v-model="reviewQueryForm.totalScoreCode" clearable>
            <el-option :label="getScoreItems[2].label" :value="getScoreItems[2].value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商协会">
          <el-select v-model="reviewQueryForm.coceralId" clearable>
            <el-option v-for="(item, index) in coceralNameOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="reviewQueryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaNameOpts" :key="item.value" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input placeholder="请输入" v-model="reviewQueryForm.cantonFairCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="企业编码">
          <el-input placeholder="请输入" v-model="reviewQueryForm.companyCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-select v-model="reviewQueryForm.companyId" clearable>
            <el-option v-for="(item, index) in companyOpts" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐状态">
          <el-select v-model="reviewQueryForm.isSubmitRecommend" clearable>
            <el-option v-for="item in recommendStateOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="businessList.records" ref="multipleTable" v-loading="loading" @select="handleSelectionChange" @select-all="handleSelectionChange" @selection-change="handleCheckedChange" :row-key="getRowKey" border>
        <el-table-column type="selection" fixed :selectable="isSelect" width="38px"></el-table-column>
        <el-table-column align="center" label="推荐状态" prop="isSubmitRecommend">
          <template slot-scope="scope">
            {{ scope.row.isSubmitRecommend | reviewResult }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="企业基本信息">
          <el-table-column align="center" label="推荐编号" prop="recommendCode" width="100"></el-table-column>
          <el-table-column align="center" label="交易团" prop="dealClusterName" width="100"></el-table-column>
          <el-table-column align="center" label="商协会" prop="coceralName" width="100"></el-table-column>
          <el-table-column align="center" label="展区" prop="exhibitionAreaName" width="100"></el-table-column>
          <el-table-column align="center" label="广交会编码" prop="cantonFairCode" width="100"></el-table-column>
          <el-table-column align="center" label="申请企业名称" prop="companyName" width="100"></el-table-column>
          <el-table-column align="center" label="企业属性" prop="companyAttribute" width="100"></el-table-column>
          <el-table-column align="center" label="企业类型" prop="companyType" width="100"></el-table-column>
          <el-table-column align="center" label="海关编码" prop="customCode" width="100"></el-table-column>
          <el-table-column align="center" label="申请展位数" prop="applyBoothNumber" width="100"></el-table-column>
          <el-table-column align="center" label="上届品牌展位数" prop="lastBoothNumber" width="100"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="总分" prop="totalScore"></el-table-column>
        <el-table-column align="center" label="出口额">
          <el-table-column align="center" label="出口额占所属大类出口额比例" prop="exportRatio" width="150"></el-table-column>
          <el-table-column align="center" label="按比例计算后的出口额项目得分" prop="exportRatioScore" width="150"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="品牌建设项目得分" prop="brandBuildScore"></el-table-column>
        <el-table-column align="center" label="研发创新和自主知识产权">
          <el-table-column align="center" label="专利与版权得分" prop="patentScore" width="120"></el-table-column>
          <el-table-column align="center" label="国家级高新技术得分" prop="newHighScore" width="120"></el-table-column>
          <el-table-column align="center" label="国家/行业标准得分" prop="standardScore" width="120"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="国际通行认证">
          <el-table-column align="center" label="质量、环境管理体系认证项目得分" prop="qualityScore" width="150"></el-table-column>
          <el-table-column align="center" label="面向企业的行业认证项目得分" prop="industryScore" width="150"></el-table-column>
          <el-table-column align="center" label="面向产品或生产线的行业认证项目得分" prop="productionScore" width="150"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="境内外商标">
          <el-table-column align="center" label="境内商标得分" prop="territoryScore" width="120"></el-table-column>
          <el-table-column align="center" label="境外商标得分" prop="beyondScore" width="120"></el-table-column>
        </el-table-column>
          <el-table-column align="center" label="是否达标" prop="isStandard" width="120">
            <template slot-scope="scope">
              {{ scope.row.isStandard == '0' ? '否' : '是' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="授权子公司名称" prop="correlationCompanyName" width="120"></el-table-column>
          <el-table-column align="center" label="备注" prop="remarks" width="120"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-button class="utils-button" type="danger" @click="submitRecommend">推荐</el-button>
      <el-button class="utils-button" type="primary" @click="submitPresent">提交推荐方案</el-button>
      <el-button class="utils-button" type="primary" @click="submitPrint">下载/打印</el-button>
      <el-form class="pagination-container" :inline="true">
        <el-form-item>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="businessList.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.currentPage"
            :page-size="pageInfo.pageSize"
            :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
            >
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
    return {
      loading: '',
      pageInfo: { currentPage: 1, pageSize: 10 },
      getScoreItems: [
        { label: '', value: 'exportRatioScore' }, // 企业出口额得分
        { label: '', value: 'beyondScore' }, // 境外商标得分
        { label: '', value: 'totalScore' } // 总分
      ],
      coceralNameOpts: [], // 商协会
      exhibitionAreaNameOpts: [], // 展区
      companyOpts: [], // 企业
      recommendStateOpts: [{ value: 1, label: '未推荐' }, { value: 2, label: '已推荐' }, { value: 3, label: '已提交' }],
      reviewQueryForm: {
        exportRatioScoreCode: '', // 企业出口额得分
        beyondScoreCode: '', // 境外商标得分
        totalScoreCode: '', // 总分
        dealClusterId: this.$store.getters.userInfo.org.deptId,
        coceralId: '', // 商协会
        exhibitionArea: '', // 展区
        cantonFairCode: '', // 广交会编码
        companyCode: '', // 企业编码
        companyId: '', // 企业id
        isSubmitRecommend: '' // 推荐状态
      },
      activeName: "first",
      lastCheckData: [], // 上次保存的值
      selectData: [], // 选中的数据索引
      checkList: [] // 临时选中的值
    };
  },
  filters: {
    reviewResult(value) {
      switch (value) {
        case 1:
          return '未推荐';
        case 2:
          return '已推荐';
        case 3:
          return '已提交';
        default:
          return '';
      }
    }
  },
  computed: {
    ...mapGetters('brandEvaluation', ['businessList']),
    recommendQuery() {
      return {
        exportRatioScoreCode: this.reviewQueryForm.exportRatioScoreCode,
        beyondScoreCode: this.reviewQueryForm.beyondScoreCode,
        totalScoreCode: this.reviewQueryForm.totalScoreCode,
        coceralId: this.reviewQueryForm.coceralId,
        dealClusterId: this.reviewQueryForm.dealClusterId,
        exhibitionArea: this.reviewQueryForm.exhibitionArea,
        cantonFairCode: this.reviewQueryForm.cantonFairCode,
        companyCode: this.reviewQueryForm.companyCode,
        companyId: this.reviewQueryForm.companyId,
        isSubmitRecommend: this.reviewQueryForm.isSubmitRecommend,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    },
    getRowKey (row) { // 获取row的key值
      return row.isSubmitRecommend;
    }
  },
  created() {
    // 获取得分项
    for (let i = 1; i < 4; i++) {
      this.getConfigItem({ configId: i }).then(res => {
        let configStr = `${res.conditionCode}${res.score}`;
        this.getScoreItems[i - 1].label = configStr;
      }).catch(e => {});
    }
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaNameOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      this.coceralNameOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 获取企业名称
    this.getBusinessList({ current: 0, size: 10 }).then(res => {
      this.companyOpts = res.companyOpts;
    });
    this.loading = true;
    //初始查询
    this.getBusinessList(this.recommendQuery).then(() => {
      this.loading = false;
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('brandEvaluation', ['getConfigItem', 'getBusinessList', 'postSubmitRecommend']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getassociationDepartment']),
    isSelect(row) { // 判断是否为已提交
      if (row.isSubmitRecommend === 3) {
        return false;
      } else {
        return true;
      }
    },
    handleCheckedChange(rows) { // 选中的数据获取
      this.checkList = []; // 初始化，防止重复添加
      if (rows) {
        rows.forEach(row => { // 遍历已选择的数据
          if (row) {
            this.checkList.push({
              brandApplyId: row.brandApplyId,
              isSubmitRecommend: row.isSubmitRecommend
            });
          }
        });
      }
    },
    submitData(num, subNum, word, errorWord) { // 提交推荐方案封装
      this.lastCheckData[this.pageInfo.currentPage - 1] = this.checkList; // 保存当前页获取的值
      // 降维 --- 二维数组降至一维数组
      let getList = Array.prototype.concat.apply([], this.lastCheckData);
      let flag = false;
      // 判断选中的都为 未推荐
      for (let i = 0; i < getList.length; i++) {
        if (getList[i].isSubmitRecommend === num) {
          getList[i].isSubmitRecommend = subNum;
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag) {
        this.loading = true;
        this.postSubmitRecommend(getList).then(() => {
          this.$message.success(word);
          this.checkList = '';
          this.selectData = '';
          this.getBusinessList(this.recommendQuery).then(() => {
            this.loading = false;
          }).catch(e => {
            this.loading = false;
          });
        }).catch(e => {
          this.loading = false;
        });
      } else {
        this.$message.warning(errorWord);
      }
    },
    submitRecommend() { // 点击推荐
      this.submitData(1, 2, '推荐申请发送成功', '请确认选择的方案都为未推荐');
    },
    submitPresent() { // 点击提交推荐方案
      this.submitData(2, 3, '推荐方案提交申请发送成功', '请确认选择的方案都为已推荐');
    },
    submitPrint() { // 点击下载/打印
      
    },
    // 打印
    handlePrint() {
      let paramData = JSON.parse(JSON.stringify(this.recommendCoceralData));
      window.open(window.location.origin + '/#/recommendApplyCompanyPrint?data=' + encodeURI(JSON.stringify(paramData)));
    },
    handleSelectionChange(selection, row) { // 选中的数据索引获取
      this.selectData[this.pageInfo.currentPage - 1] = []; // 初始化
      this.businessList.records.forEach((item, index) => {
        for (let i = 0; i < selection.length; i++) { // 遍历已选的数据重新填充数组
          if (item.recommendCode === selection[i].recommendCode) {
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
    handleQuery() {
      this.loading = true;
      this.pageInfo.currentPage = 1;
      this.getBusinessList(this.recommendQuery).then(() => {
        this.loading = false;
        this.checkList = '';
        this.selectData = '';
      }).catch(e => {
        this.loading = false;
        this.checkList = '';
        this.selectData = '';
      });
    },
    handleCurrentChange(val) {
      this.lastCheckData[this.pageInfo.currentPage - 1] = this.checkList; // 保存当前页获取的值
      this.pageInfo.currentPage = val;
      this.loading = true;
      this.getBusinessList(this.recommendQuery).then(res => {
        this.loading = false;
        let arr = [];
        if (this.selectData[this.pageInfo.currentPage - 1]) {
          this.selectData[this.pageInfo.currentPage - 1].forEach((item, index) => {
            arr.push(res.records[item]);
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
      this.loading = true;
      this.pageInfo.pageSize = 1;
      this.getBusinessList(this.recommendQuery).then(() => {
        this.loading = false;
        this.checkList = '';
        this.selectData = '';
      }).catch(e => {
        this.loading = false;
        this.checkList = '';
        this.selectData = '';
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
</style>
