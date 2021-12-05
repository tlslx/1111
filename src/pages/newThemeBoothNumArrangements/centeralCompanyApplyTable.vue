<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="企业申请情况查询" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="申请展区">
          <el-select v-model="queryForm.exhibitionArea" @change="handleProductAreaQuery" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请专区">
          <el-select v-model="queryForm.productType" clearable>
            <el-option v-for="(item, index) in productTypeOpts" :key="index" :value="item.specialAreaCode" :label="item.specialAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属交易团">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input placeholder="请输入" v-model.trim="queryForm.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input placeholder="请输入" v-model.trim="queryForm.cecfCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否标注">
          <el-select v-model="queryForm.isLabel" clearable>
            <el-option v-for="item in isLabelOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="布展类型">
          <el-select v-model="queryForm.exhibitionType" clearable>
            <el-option v-for="item in exhibitionTypeOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请展位数较上届变化" label-width="170px">
          <el-select v-model="queryForm.changeNum" clearable>
            <el-option v-for="item in changeNumOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上届是否参展">
          <el-select v-model="queryForm.ifLastJoin" clearable>
            <el-option v-for="item in isLabelOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table class="trade-table" v-loading="loading" :data="tradeCenterApplyData.records" height="550" border>
        <el-table-column fixed label="企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="所属交易团" prop="delegationName" align="center"></el-table-column>
        <el-table-column label="广交会编码" prop="cecfCode" align="center"></el-table-column>
        <el-table-column label="申请展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="申请专区" prop="productTypeName" align="center"></el-table-column>
        <el-table-column label="布展类型" prop="exhibitionType" align="center">
          <template slot-scope="scope">
            {{ scope.row.exhibitionType | exhibitionTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column label="申请数量" prop="boothNumber" align="center"></el-table-column>
        <el-table-column label="上届是否参展" prop="ifLastJoin" align="center">
          <template slot-scope="scope">
            {{ scope.row.ifLastJoin === '0' ? '否' : (scope.row.ifLastJoin === '1' ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="上届专区" prop="lastSpecialBooth" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.ifLastJoin === '1'">
              {{ scope.row.lastSpecialBooth }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="上届布展类型" prop="lastExhibitionType" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.ifLastJoin === '1'">
              {{ scope.row.lastExhibitionType }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="上届安排展位数量" prop="boothNumberLast" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.ifLastJoin === '1'">
              {{ scope.row.boothNumberLast }}
            </div>
          </template>
        </el-table-column>
        <!--<el-table-column label="上届申请展位数量" prop="lastApplyNum" align="center"></el-table-column>-->
        <el-table-column label="申请展位数较上届变化" prop="changeNum" align="center">
          <template slot-scope="scope">
            {{ scope.row.changeNum }}
          </template>
        </el-table-column>
        <el-table-column label="标注情况" align="center" prop="isLabel">
          <template slot-scope="scope">
            <div v-if="!scope.row.isLabel || scope.row.isLabel === '0'"><a href="javascript:;" @click="handleLabel(scope.row, '1')" style="color:#2b579a;text-decoration:none;">☆</a></div>
            <div v-if="scope.row.isLabel === '1'"><a href="javascript:;" @click="handleLabel(scope.row, '0')" style="color:#2b579a;text-decoration:none;">★</a></div>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium" @click="handleDownload">下载</el-button>
        </span>
        <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tradeCenterApplyData.total">
        </el-pagination>
      </el-row>
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
      exhibitionAreaOpts: [],
      delegationOpts: [],
      productTypeOpts: [],
      companyOpts: [],
      isLabelOpts: [{ value: '0', label: '否' }, { value: '1', label: '是' }],
      exhibitionTypeOpts: [{ value: 'SPECIAL_BOOTH', label: '绿色特装' }, { value: 'STANDARD_BOOTH', label: '标摊' }],
      changeNumOpts: [{ value: '1', label: '增加' }, { value: '0', label: '不变' }, { value: '-1', label: '减少' }],
      queryForm: {
        exhibitionArea: '',
        delegationId: '',
        companyName: '',
        cecfCode: '',
        productType: '',
        exhibitionType: '',
        changeNum: '',
        ifLastJoin: '',
        isLabel: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    changeNumFilter: value => {
      switch (value) {
        case '0':
          return '不变';
        case '1':
          return '增加';
        case '-1':
          return '减少';
        default:
          return;      
      }
    },
    exhibitionTypeFilter: value => {
      switch (value) {
        case 'UNIFICATION_BOOTH':
          return '统一布展';
        case 'SPECIAL_BOOTH':
          return '绿色特装';
        case 'STANDARD_BOOTH':
          return '标摊';
        case 'CENTER_CHANNELL_BOOTH':
          return '中央通道';
        default:
          return;      
      }
    }
  },
  computed: {
    ...mapGetters('newThemeCompanyApply', ['tradeCenterApplyData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        delegationId: this.queryForm.delegationId,
        companyName: this.queryForm.companyName,
        cecfCode: this.queryForm.cecfCode,
        productType: this.queryForm.productType,
        exhibitionType: this.queryForm.exhibitionType,
        changeNum: this.queryForm.changeNum,
        ifLastJoin: this.queryForm.ifLastJoin,
        isLabel: this.queryForm.isLabel,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    this.exhibitionAreaOpts = [];
    // 展区
    this.getexhibitionArea().then(resa => {
      this.exhibitionArea = JSON.parse(JSON.stringify(resa));
      // this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
      // 新题材展区
      this.getexhibitionAreaDTOList().then(res => {
        this.arr = JSON.parse(JSON.stringify(res.records));
        this.arr.forEach((item, index, ar) => {
          if (item.isNewThemeArea) { // 是新题材
            for (let i = 0; i < this.exhibitionArea.length; i++) {
              if (item.exhibitionAreaCode === this.exhibitionArea[i].exhibitionAreaCode) {
                let exare = {
                  exhibitionAreaCode: this.exhibitionArea[i].exhibitionAreaCode,
                  exhibitionAreaName: this.exhibitionArea[i].exhibitionAreaName
                };
                this.exhibitionAreaOpts.push(exare);
              }
            }
          }
        });
      });
    }).catch(e => {});
    // 数组去重
    let hash = {};
    this.exhibitionAreaOpts = this.exhibitionAreaOpts.reduce(function(item, next) {
      hash[next.exhibitionAreaCode] ? '' : hash[next.exhibitionAreaCode] = true && item.push(next);
      return item;
    }, []);
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.createdQuery();
  },
  methods: {
    ...mapActions('newThemeCompanyApply', ['getTradeCenterApply', 'postTradeCenterLabel']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getexhibitionInfoByCode', 'getexhibitionAreaDTOList']),
    // 根据展区查询专区
    handleProductAreaQuery(val) {
      this.queryForm.productType = '';
      this.productTypeOpts = [];
      if (val) {
        let fullScreenloading = this.$loading({ fullscreen: true });
        this.getexhibitionInfoByCode({ exhibitionAreaCode: val }).then(res => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
          this.productTypeOpts = JSON.parse(JSON.stringify(res));
        }).catch(e => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
        });
      }
    },
    // 下载
    handleDownload() {
      let url = `changeNum=${this.queryForm.changeNum}&exhibitionArea=${this.queryForm.exhibitionArea}&delegationId=${this.queryForm.delegationId}&companyName=${this.queryForm.companyName}&productType=${this.queryForm.productType}&cecfCode=${this.queryForm.cecfCode}&exhibitionType=${this.queryForm.exhibitionType}`;
      url = url.replace(/undefined/g, '');
      window.open(`${process.env.API_NA_URL}/api/ordinaryCompanyDemandRecord/tradeCenter/download?${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 点击标注
    handleLabel(row, id) {
      let labelObj = {
        demandRecordId: row.demandRecordId,
        isLabel: id
      };
      this.postTradeCenterLabel(labelObj).then(() => {
        this.$message.success('标注成功');
        this.createdQuery();
      }).catch(e => {});
    },
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getTradeCenterApply(this.formQuery).then(data => {
        this.loading = false;
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
.add_btn{
  margin-left: 30px;
}
.item-Num  >>> .el-form-item__content{
  margin-left: 0 !important;
}
.el-table >>> .cell{
  overflow: visible !important;
}
.item-Num >>> input::-webkit-outer-spin-button,
.item-Num >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none!important;
}
.item-Num >>> input[type="number"]{
  -moz-appearance: textfield!important;
}
.pagination-footer{
  margin-top: 20px;
}  
.total-footer{
  text-align: center;
  padding: 20px 0;
}
</style>
