<style scoped lang="less">
@import "../../../theme/project/css/flex.less";
#company-list-nature{
  
}
</style>

<template>
  <div id="company-list-nature">
    <el-form :model="innerSearchData" :inline="true" v-if="!unitTag">
      <el-form-item label="企业名称" prop="companyName">
        <el-input v-model="innerSearchData.companyName" clearable></el-input>
      </el-form-item>
      <el-form-item label="交易团">
        <el-select v-model="innerSearchData.businessDelegationId" placeholder="请选择交易团" clearable @change="searchInnerCompany">
          <el-option value="" label="全部"></el-option>
          <el-option v-for="item in delegationOption" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchInnerCompany">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="companyInfo.companys" border>
      <el-table-column width="55px" prop="current" label="选择">
        <template slot-scope="scope">
          <div style="width: 16px;overflow-x: hidden;">
            <el-checkbox :checked="scope.row.current" @change='handleFillCompany(scope.row)'></el-checkbox>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="companyId" label="企业ID"></el-table-column>
      <el-table-column prop="companyName" label="企业名称"></el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <el-pagination
        @size-change="innerSizeChange"
        @current-change="innerCurrentChange"
        :current-page="innerSearchData.pageStart"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="innerSearchData.pageSize"
        layout="prev, pager, next, jumper"
        :total="companyInfo.total">
      </el-pagination>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <div class="bm bm-pc" style="padding: 10px 0">
        <el-button type="primary" size="mini" @click="affirm">确认</el-button>
        <el-button size="mini" @click="closeInnerCompany">取消</el-button>
      </div>
    </span>
  </div>
</template>

<script>
import { getCCl } from "../dict_request";
import http from "@/scripts/framework/http";
export default {
  props: {
    showAble: {
      type: Boolean,
      default: false
    },
    delegationOption: {
      type: Array
    },
    checkArray: {
      type: Array,
      default: function() {
        return [];
      }
    },
    unitTag: {
      type: Boolean,
      default: false
    },
    orgIds: {
      type: Array,
      default: function() {
        return [];
      },
      required: false
    }
  },
  data() {
    return {
      baseApC: process.env.API_OS_URL,
      // 搜索表单
      innerSearchData: {
        companyName: "",
        companyId: "",
        businessDelegationId: '',
        pageSize: 10,
        pageStart: 1 
      },
      //表格数据
      companyInfo: {
        companys: [],
        total: 0
      },
      //选中
      checkIds: []
    };
  },
  watch: {
    showAble: {
      handler: function(newV, oldV) {
        let flag = newV;
        if (flag) {
          // console.log(111);
          this.checkIds.splice(0, this.checkIds.length);
          if (this.checkArray.length > 0) {
            for (let item of this.checkArray) {
              this.checkIds.push({
                current: true,
                primary: {
                  companyId: item
                }
              });
            }
          }
          this.getCompany();
        } else {
          // console.log(222);
          this.innerSearchData = { 
            companyName: '',
            pageSize: 10,
            pageStart: 1 
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
    // 获取企数据
    getCompany() {
      if (!this.unitTag) {
        let params4 = encodeURI(JSON.stringify(this.innerSearchData));
        
        this.companyInfo.companys = [];
        http.get(this.baseApC + "/efOS/efOsCompanyInfo/getCompanyInfoOuterTwo?param=" + params4).then(data => {
          this.companyInfo.companys = this.handleTableArray(data.records);
          this.companyInfo.total = data.total;
        }).catch(error => { });
      } else {
        this.getSearchCompany();
      }
    },
    searchInnerCompany() { // 弹框内查询企业
      this.innerSearchData.pageSize = 10;
      this.innerSearchData.pageStart = 1;
      this.getCompany(this.innerSearchData); // 查询企业
    },
    //获取查询IDS下的企业列表
    getSearchCompany() {
      this.companyInfo.companys = [];
      if (this.orgIds.length > 0) {
        let objCompany = {
          param: {
            "companyName": this.innerSearchData.companyName,
            "companyId": this.orgIds.join(),
            "businessDelegationId": this.innerSearchData.businessDelegationId,
            "pageSize": this.innerSearchData.pageSize,
            "pageStart": this.innerSearchData.pageStart
          }
        };
        let results = getCCl(objCompany);
        results.then((item) => {
          // console.log(item);
          this.companyInfo.companys = this.handleTableArray(item.records);
          this.companyInfo.total = item.total;
        });
      }
    },
    handleTableArray(array) {
      let newArray = [].concat(array);
      if (this.checkIds.length === 0) {
        for (let item of newArray) {
          item.current = false;
        }
      } else {
        newArray.forEach((el, index) => {
          for (let item of this.checkIds) {
            let val = item.primary;
            if (el.companyId === val.companyId) {
              el.current = true;
              Object.assign(val, el);
              break;
            } else {
              el.current = false;
            }
          }
        });
      }
      return newArray;
    },
    // 关闭查询企业弹框
    closeInnerCompany() {
      this.$emit("closeInnerCompany", false);
      this.innerSearchData = {
        companyName: '',
        pageSize: 10,
        pageStart: 1 
      };
    },
    handleFillCompany(row) { // 选中单行 赋值
      if (this.checkIds.length === 0) {
        let obj = {
          primary: row,
          current: true
        };
        this.checkIds.push(obj);
      } else {
        let flag = false;
        this.checkIds.forEach((item, index) => {
          let val = item.primary;
          if (row.companyId === val.companyId) {
            this.checkIds.splice(index, 1);
            flag = true;
          }
        });
        if (!flag) {
          let obj = {
            current: true,
            primary: row
          };
          this.checkIds.push(obj);
        }
      }
    },
    affirm() {
      if (this.checkIds.length) {
        let paramObj = {
          param: {
            "companyId": "",
            "pageSize": 10000,
            "pageStart": 1
          }
        };
        let array = [];
        for (let item of this.checkIds) {
          array.push(item.primary.companyId);
        }
        let str = array.join();
        paramObj.param.companyId = str;
        let outArray = [];
        getCCl(paramObj).then((item) => {
          if (item.records) {
            for (let el of item.records) {
              outArray.push({
                current: true,
                primary: el
              });
            }
          }
          this.$emit("affirm-company", outArray);
        });
      } else {
        this.$emit("affirm-company", []);
      }
    },
    //页数
    innerSizeChange(val) {
      this.innerSearchData.pageSize = val;
      this.getCompany(); // 查询企业
    },
    innerCurrentChange(val) {
      this.innerSearchData.pageStart = val;
      this.getCompany(); // 查询企业
    }
  },
  created() {
    this.getCompany();
  }
};
</script>

