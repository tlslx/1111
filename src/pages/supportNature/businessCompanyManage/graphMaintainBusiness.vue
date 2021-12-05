/**
 * @file 企业分团关系表维护(交易团)
 * @author: weiwei
 * @date:2019/4/12
 */
<template>
  <el-container>
    <el-header>
      <span>企业分团关系表维护(交易团)</span>
    </el-header>
    <el-main>
      <el-row style="padding-bottom: 10px;">
        <el-form :model="savedFormData">
          <el-form-item label="保存的届数" prop="savedExhibitionNum">
            <el-select v-model="savedFormData.savedExhibitionNum" style="width: 300px;">
              <el-option v-for="item in this.saveCompanyExhibitonNumList" :key="item.value" :label="item.lable"
              :value="item.value" @click.native="handleQueryList"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>

      <el-table :data="subGroupCompanyListData.records" border id="subGroupCompanyList">
        <el-table-column label="企业名称" prop="companyName"></el-table-column>
        <el-table-column label="所属分团" prop="subgropName"></el-table-column>
        <el-table-column label="所属交易团" prop="getDelegationName"></el-table-column>
        <el-table-column label="所属区域" prop="areaName"></el-table-column>
        <el-table-column label="状态" prop="state">
          <template slot-scope="scope">
            <span>{{scope.row.state == 0 ? '禁用' : (scope.row.state == 1 ? '启用' : '')}}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-row type="flex" justify="end">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="prev, pager, next, jumper"
          :total="subGroupCompanyListData.total">
        </el-pagination>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// import FileSaver from 'file-saver'; // 下载用
// import XLSX from 'xlsx';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  mixins: [listPageBase],
  data() {
    return {
      pageInfoData: { pageSize: 10, currentPage: 1 },
      // 历史展届
      savedFormData: {
        savedExhibitionNum: null // 已保存之后的列表
      },
      beforeExhibitDisable: false // 之前展览不操作
    };
  },
  computed: {
    ...mapGetters("subEnterpriseManage", ['areaDelegationSubLinkData', 'companyTableData', 'delegationMenuListLeftData',
      'subGroupCompanyListData', 'exhibitonNumList', 'saveCompanyExhibitonNumList']),
    subGroupCompanyListParams() {
      return {
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
        // exhibitionNum: this.savedFormData.savedExhibitionNum // null为本届
      };
    },
    savedExhibitionNum() { // 以前展届
      return this.savedFormData.savedExhibitionNum;
    }
  },
  watch: {
    savedExhibitionNum(val) {
      if (val == null) {
        this.beforeExhibitDisable = false;
      } else {
        this.beforeExhibitDisable = true;
      }
    }
  },
  methods: {
    ...mapActions('subEnterpriseManage', ['getSubGroupCompanyList', 'getSavedCompanyExhibitionNumList', 'getSaveCompanyExcel']),
    handleQueryList() { // 查询表单
      if (this.savedFormData.savedExhibitionNum) {
        this.subGroupCompanyListParams.exhibitionNum = this.savedFormData.savedExhibitionNum;
      }
      this.getSubGroupCompanyList(this.subGroupCompanyListParams).then(() => { // 清空以前展届
        delete this.subGroupCompanyListParams.exhibitionNum;
      }).catch(() => {
        delete this.subGroupCompanyListParams.exhibitionNum;
      });
    },
// 页面页码
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      // this.getSubGroupCompanyList(this.subGroupCompanyListParams); // 刷新列表
      this.handleQueryList();
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      // this.getSubGroupCompanyList(this.subGroupCompanyListParams); // 刷新列表
      this.handleQueryList();
    },
    downloadTableList() { // 下载
      /* generate workbook object from table */
      // var wb = XLSX.utils.table_to_book(document.querySelector('#subGroupCompanyList'));
      // /* get binary string as output */
      // var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      // try {
      //   FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '企业分团关系表.xls');
      // } catch (e) {
      //   // if (typeof console !== 'undefined') console.log(e, wbout)
      //   this.$message.error('下载失败');
      // }
      // return wbout;
      let params = {};
      if (this.savedFormData.savedExhibitionNum) {
        params.exhibitionNum = this.savedFormData.savedExhibitionNum;
      }
      this.getSaveCompanyExcel(params); // 下载
    }
  },
  created() {
    // this.getAreaDelegationSubLink(); // 三级联动

    this.handleQueryList();

    this.getSavedCompanyExhibitionNumList(); // 获取企业展届
  }
};
</script>
<style lang='less' scoped>
.el-header {
  border-bottom: 1px solid #ddd;
  span {
    font-size: 16px;
    font-weight: 700;
    color: #333;
    height: 58px;
    line-height: 58px;
    display: block;
    float: left;
    border-bottom: 2px solid #2b579a;
  }
}
</style>
