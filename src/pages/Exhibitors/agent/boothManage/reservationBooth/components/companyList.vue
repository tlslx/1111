<style scoped lang="less">
#company-list-booth{
  
}
</style>

<template>
  <div id="company-list-booth">
    <el-form :model="innerSearchData" :inline="true">
      <el-form-item label="企业名称" prop="companyName">
        <el-input v-model="innerSearchData.companyName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchInnerCompany">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="companyInfo.companys" border>
      <el-table-column width="35px">
        <template slot-scope="scope">
          <div style="width: 16px;overflow-x: hidden;">
            <el-radio :label="scope.$index" v-model="radio" @change.native="handleFillCompany(scope.row)"></el-radio>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="companyId" label="企业ID"></el-table-column>
      <el-table-column prop="companyNameCh" label="企业名称"></el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <el-pagination
        @size-change="innerSizeChange"
        @current-change="innerCurrentChange"
        :current-page="innerSearchData.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="innerSearchData.size"
        layout="prev, pager, next, jumper"
        :total="companyInfo.total">
      </el-pagination>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeInnerCompany">关 闭</el-button>
    </span>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    showAble: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ableDialog: this.showAble,
      // 搜索表单
      innerSearchData: { 
        companyName: '',
        size: 10,
        current: 1 
      },
      //表格数据
      companyInfo: {
        companys: [],
        total: 0
      },
      //单选
      radio: ""
    };
  },
  watch: {
    ableDialog: {
      handler: function(newV, oldV) {
        let flag = newV;
        if (flag) {
          this.getCompanyList(this.innerSearchData).then(res => {
            if (res && res.records.length > 0) {
              this.companyInfo.companys.splice(0, this.companyInfo.companys.length);
              this.companyInfo.total = res.total;
              for (let item of res.records) {
                this.companyInfo.companys.push(item);
              }
            }
          });
        } else {
          this.innerSearchData = { 
            companyName: '',
            size: 10,
            current: 1 
          };
          this.companyInfo = {
            companys: [],
            total: 0
          };
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions('commonStore', ["getCompanyList"]),
    getCompanyListData(param) {
      this.getCompanyList(param).then(res => {
        // console.log(res);
        if (res && res.records.length > 0) {
          this.companyInfo.companys.splice(0, this.companyInfo.companys.length);
          this.companyInfo.total = res.total;
          for (let item of res.records) {
            this.companyInfo.companys.push(item);
          }
        }
      });
    },
    searchInnerCompany() { // 弹框内查询企业
      this.innerSearchData.size = 10;
      this.innerSearchData.current = 1;
      this.getCompanyListData(this.innerSearchData); // 查询企业
    },
    // 关闭查询企业弹框
    closeInnerCompany() {
      this.$emit("closeInnerCompany", false);
      this.innerSearchData = {
        companyName: '',
        size: 10,
        current: 1 
      };
    },
    handleFillCompany(row) { // 选中单行 赋值
      let obj = {
        show: false,
        primary: row
      };
      this.$emit("radio-company", obj);
    },
    //页数
    innerSizeChange(val) {
      this.innerSearchData.size = val;
      this.getCompanyListData(this.innerSearchData);
    },
    innerCurrentChange(val) {
      this.innerSearchData.current = val;
      this.getCompanyListData(this.innerSearchData);
    }
  },
  created() {
    this.getCompanyListData(this.innerSearchData);
  }
};
</script>

