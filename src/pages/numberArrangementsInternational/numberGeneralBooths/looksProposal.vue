<template>
  <div>
    <el-tabs v-model="activeName" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(225, 225, 225)">
      <el-tab-pane label="调整后最终展位数" name="first"></el-tab-pane>
      <el-form :inline="true" :model="ruleForm" class="demo-form-inline">
        <el-form-item label="展区">
          <el-select size="small" class="inpu" v-model="ruleForm.exhibitionAreaCode" clearable>
            <el-option v-for="(item, index) in this.exhibitionAreaOpts" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商会">
            <el-input size="small" class="inpu" clearable maxlength="24" v-model.trim="ruleForm.coceralName"></el-input>
          <!-- <el-select size="small" class="inpu" v-model="ruleForm.coceralName" clearable>
            <el-option v-for="item in localstora.coceral" :value="item.value" :label="item.text" :key="item.value">
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="类别">
          <el-select size="small" class="inpu" clearable v-model="ruleForm.boothType">
            <el-option label="一般性展位" value="1"></el-option>
            <el-option label="中央通道" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-select size="small" class="inpu" clearable v-model="ruleForm.delegationName"> -->
        <!-- <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option> -->
        <!-- </el-select> v-loading="loadinga"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(225, 225, 225)"-->
        <el-form-item label="展期">
          <el-select size="small" class="inpu" clearable v-model="ruleForm.exhibitionPeriod">
            <el-option v-for="(item, index) in this.exhibitionPeriod" :key="index" :value="item.value" :label="item.label"></el-option>
            <!-- <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item class="but">
          <el-button type="primary" @click="handleQuery" class="btut">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%" show-summary :summary-method="getSummaries">
        <el-table-column prop="boothType" align="center" label="类别">
          <template slot-scope="scope">
            {{scope.row.boothType === '1' ? '一般性展位' : '中央通道展位'}}
          </template>
        </el-table-column>
        <el-table-column prop="delegationName" align="center" label="交易团">
        </el-table-column>
        <el-table-column prop="exhibitionPeriod" align="center" label="展期">
        </el-table-column>
        <el-table-column prop="coceralName" align="center" label="商会">
        </el-table-column>
        <el-table-column prop="exhibitionAreaName" align="center" label="展区">
        </el-table-column>
        <el-table-column prop="boothNumberBefore" align="center" :label="listBase + '届最终展位数'">
        </el-table-column>
        <el-table-column prop="equalExchangeNumber" label="等量调换">
          <template slot-scope="scope">
            {{scope.row.equalExchangeNumber != null ? scope.row.equalExchangeNumber : 0}}
          </template>
        </el-table-column>
        <el-table-column prop="unequalExchangeNumber" align="center" label="不等量调换">
          <template slot-scope="scope">
            {{scope.row.unequalExchangeNumber != null ? scope.row.unequalExchangeNumber : 0}}
          </template>
        </el-table-column>
        <el-table-column prop="restoreExchangeNumber" align="center" label="还原整数">
          <template slot-scope="scope">
            {{scope.row.restoreExchangeNumber != null ? scope.row.restoreExchangeNumber : 0}}
          </template>
        </el-table-column>
        <el-table-column prop="refundNumber" align="center" label="退回展位">
          <template slot-scope="scope">
            {{scope.row.refundNumber != null ? scope.row.refundNumber : 0}}
          </template>
        </el-table-column>
        <el-table-column prop="newExhibitionNumber" align="center" label="新增展位">
          <template slot-scope="scope">
            {{scope.row.newExhibitionNumber != null ? scope.row.newExhibitionNumber : 0}}
          </template>
        </el-table-column>
        <el-table-column prop="recoveryNumber" align="center" label="回收展位">
          <template slot-scope="scope">
              {{scope.row.recoveryNumber != null ? scope.row.recoveryNumber : 0}}
          </template>
        </el-table-column>
        <el-table-column prop="typeExchangeNumber" align="center" label="展位类型调整">
          <template slot-scope="scope">
            {{scope.row.typeExchangeNumber != null ? scope.row.typeExchangeNumber : 0}}
          </template>
        </el-table-column>
        <el-table-column prop="otherNumber" align="center" label="其他调整">
          <template slot-scope="scope">
            {{scope.row.otherNumber != null ? scope.row.otherNumber : 0}}
          </template>
        </el-table-column>
        <el-table-column prop="boothNumberFinal" align="center" :label="listTase + '届最终展位数'">
        </el-table-column>
      </el-table>
      <el-form :inline="true" style="float: right;">
        <el-form-item>
          <el-pagination style="margin-top: 20px;" background layout="total, prev, pager, next, jumper"
            :total="pagaData.total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pagaData.current" :page-size="pagaData.size">
          </el-pagination>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="btut">下载</el-button>
    </el-tabs>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from "vuex";
  import listPageBase from "@/components/framework/mixins/listPageBase";
  export default {
    mixins: [listPageBase],
    data() {
      return {
        activeName: "first",
        ruleForm: {},
        pagaData: {
          current: 1,
          size: 10,
          total: 0
        },
        tableData: [],
        listBase: '',
        listTase: '',
        localstora: {},
        loading: true,
        exhibitionAreaOpts: [],
        exhibitionPeriod: []
      };
    },
    async created() {
      // this.exhibitionAreaOpts = await kindo.dictionary.get('exhibitionArea'); // 展区
      // 展区
      this.getexhibitionArea().then(res => {
        this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
      }).catch(e => {});
      this.exhibitionPeriod = await kindo.dictionary.get('exhibitionPeriodNum'); // 展期
    },
    mounted() {
      this.localstora = JSON.parse(localStorage.getItem("dictData"));
      this.createdQuery();
    },
    computed: {
      ...mapGetters("numberGeneralBooths", ["getView"]),
      ...mapActions('nainformation', ['getexhibitionArea']),
      formQuery() {
        return {
          coceralName: this.ruleForm.coceralName,
          exhibitionAreaCode: this.ruleForm.exhibitionAreaCode,
          exhibitionAreaName: this.ruleForm.exhibitionAreaName,
          boothType: this.ruleForm.boothType,
          exhibitionPeriod: this.ruleForm.exhibitionPeriod,
          current: this.pagaData.current,
          size: this.pagaData.size
        };
      }
    },
    methods: {
      ...mapActions("numberGeneralBooths", ["getViewArrangement"]),
      // 处初始化封装
      createdQuery() {
        this.loading = true;
        this.getViewArrangement(this.formQuery).then(res => {
          this.tableData = res.ordinaryBrandNumberDTO.records;
          this.pagaData.current = res.ordinaryBrandNumberDTO.current;
          this.pagaData.size = res.ordinaryBrandNumberDTO.size;
          this.pagaData.total = res.ordinaryBrandNumberDTO.total;
          this.listBase = res.exhibitionSession - 1;
          this.listTase = res.exhibitionSession;
          this.loading = false;
        }).catch(e => {
          this.loading = false;
        });
      },
      // 查询
      handleQuery() {
        this.pagaData.current = 1;
        for (let key in this.exhibitionAreaOpts) {
          if (this.ruleForm.exhibitionAreaCode !== '') {
            if (this.exhibitionAreaOpts[key].value === this.ruleForm.exhibitionAreaCode) {
              this.ruleForm.exhibitionAreaName = this.exhibitionAreaOpts[key].label;
            }
          } else {
            this.ruleForm.exhibitionAreaName = '';
          }
        }
        this.createdQuery();
      },
      // 分页
      handleCurrentChange(current) {
        this.pagaData.current = current;
        this.createdQuery();
      },
      handleSizeChange() { },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index === 2) {
            sums[index] = '';
            return;
          }
          if (index === 3) {
            sums[index] = '';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        });
        return sums;
      }
    }
  };
</script>
<style scoped>
  .but {
    float: right;
    /* margin-right: 190px; */
  }

  .inpu {
    width: 130px;
  }

  .btut {
    padding: 10px 20px !important;
  }
</style>