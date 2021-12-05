<template>
  <div>
    <el-tabs v-model="activeName" v-loading="loadinga" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225)">
      <el-tab-pane label="调整记录表" name="first"></el-tab-pane>

      <el-form :inline="true" :model="ruleForm"  class="demo-form-inline">
        <el-form-item label="展区">
          <el-select v-model="ruleForm.exhibitionAreaCode" clearable size="small" class="inpu">
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
          <!-- <el-input maxlength="24" size="small" clearable class="inpu" v-model.trim="ruleForm.exhibitionAreaName"></el-input> -->
        </el-form-item>
        <el-form-item label="交易团">
          <el-input size="small" class="inpu" clearable maxlength="24" v-model.trim="ruleForm.delegationName"></el-input>
        </el-form-item>
        <el-form-item label="展期">
          <el-select size="small" class="inpu" clearable v-model="ruleForm.exhibitionPeriod">
            <el-option v-for="(item, index) in this.exhibitionPeriod" :key="index" :value="item.value" :label="item.label"></el-option>
            <!-- <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="展位类别">
          <el-select size="small" class="inpu" clearable v-model="ruleForm.boothType">
            <el-option label="一般性展位" value="1"></el-option>
            <el-option label="中央通道" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="but">
          <el-button type="primary" @click="onSubmit" class="btut">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="boothType" align="center" label="展位类别">
          <template slot-scope="scope">
            {{scope.row.boothType === '1' ? '一般性展位' : '中央通道展位' }}
          </template>
        </el-table-column>
        <el-table-column prop="serialNumber" align="center" label="序号">
        </el-table-column>
        <el-table-column class="widths" prop="createDate" align="center" label="录入日期">
        </el-table-column>
        <el-table-column prop="delegationName" align="center" label="交易团">
        </el-table-column>
        <el-table-column prop="exhibitionAreaName" align="center" label="展区">
        </el-table-column>
        <el-table-column prop="exhibitionPeriod" align="center" label="展期">
        </el-table-column>
        <el-table-column prop="adjustNumber" align="center" label="调整展位数">
        </el-table-column>
        <el-table-column prop="adjustType" align="center" label="调整类型">
          <template slot-scope="scope">
            {{ scope.row.adjustType | adjustTypeAdjust }}
          </template>
        </el-table-column>
        <el-table-column prop="adjustDelegationName" width="200" align="center" label="与之互调的交易团">
        </el-table-column>
        <el-table-column prop="isJoinBase" align="center" label="计入基数">
          <template slot-scope="scope">
            {{scope.row.isJoinBase === 'NO' ? '否' : '是'}}
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="handDownload">下载</el-button>
      <el-form :inline="true" style="float: right;">
        <el-form-item>
          <el-pagination style="margin-top: 20px;" background layout="total, prev, pager, next, jumper"
            :total="pageDataIndex.total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pageDataIndex.current" :page-size="pageDataIndex.size">
          </el-pagination>
        </el-form-item>
      </el-form>
    </el-tabs>
  </div>
</template>
<script>
  import { mapActions } from "vuex";
  export default {
    data() {
      return {
        activeName: "first",
        ruleForm: {},
        pageDataIndex: {
          current: 1,
          size: 10,
          total: 0
        },
        loadinga: true,
        pagaData: {
          pageIndex: 1,
          pageSize: 10
        },
        exhibitionPeriod: [],
        exhibitionAreaOpts: [],
        tableData: []
      };
    },
    async created() {
      // this.exhibitionAreaOpts = await kindo.dictionary.get('exhibitionArea'); // 展区
      // 展区
      this.getexhibitionArea().then(res => {
        let newRes = JSON.parse(JSON.stringify(res));
        this.exhibitionAreaOpts = newRes;
      }).catch(e => {});
      this.exhibitionPeriod = await kindo.dictionary.get('exhibitionPeriodNum'); // 展期
    },
    mounted() {
      this.handleReceivingData(this.pagaData);
    },
    filters: {
      adjustTypeAdjust(val) {
        switch (val) {
          case "REFUND":
            return "退回展位";
          case "NEW_EXHIBITION":
            return "新增展位";
          case "EQUAL_EXCHANGE":
            return "等量调换";
          case "RECOVERY":
            return "回收展位";
          case "TYPE_EXCHANGE":
            return "展位类别调整";
          case "UNEQUAL_EXCHANGE":
            return "不等量调换";
          case "RESTORE_EXCHANGE_EQUAL":
            return "等量调换";
          case "RESTORE_EXCHANGE_UNEQUAL":
            return "还原";
          case "OTHER":
            return " 其他";
          default: 
            return "";
        }
      }
    },
    methods: {
      ...mapActions("generalApplication", ["getAutomaticallyAdjustment"]),
      ...mapActions('nainformation', ['getexhibitionArea']),
      // 接收后台数据
      handleReceivingData(val) {
        let getUrl = encodeURI(JSON.stringify(val));
        this.getAutomaticallyAdjustment(getUrl).then(res => {
          // console.log(res);
          this.tableData = res.records;
          this.pageDataIndex.current = res.current;
          this.pageDataIndex.size = res.size;
          this.pageDataIndex.total = res.total;
          this.loadinga = false;
        }).catch(e => { });
      },
      // 查询
      onSubmit() {
        if (this.ruleForm.exhibitionAreaCode !== '') {
          for (let key in this.exhibitionAreaOpts) {
            if (this.exhibitionAreaOpts.value === this.ruleForm.exhibitionAreaCode) {
              this.ruleForm.exhibitionAreaName = this.exhibitionAreaOpts[key].label;
            }
          }
        } else {
          this.ruleForm.exhibitionAreaName = '';
        }
        let objOne = {
          "customQueryParams": [
          ],
          "pageIndex": 1,
          "pageSize": 10
        };
        let key = Object.keys(this.ruleForm);
        for (let i = 0; i < key.length; i++) {
          if (this.ruleForm[key[i]] !== "") {
            let listb = {
              "name": key[i],
              "findType": "LIKE",
              "joinType": "And",
              "dataType":
                "Default",
              "values": [
                this.ruleForm[key[i]]
              ],
              "description": ""
            };
            objOne.customQueryParams.push(listb);
          }
        }
        this.handleReceivingData(objOne);
      },
      // 下载
      handDownload() {
        let url = "delegationName=" + this.ruleForm.delegationName + "&boothType=" + this.ruleForm.boothType + "&exhibitionPeriod=" + this.ruleForm.exhibitionPeriod + "&exhibitionAreaCode=" + this.ruleForm.exhibitionAreaCode + "&adjustType=REFUND" + "&boothSource=0";
        url = url.replace(/undefined/g, "");
        window.open(process.env.API_NA_URL + "/api/ordinaryAdjustApplyDelegation/scheduleRecord/download?" + url + "&token=" + localStorage.getItem("USER_TOKEN"), "_parent");
      },
      // 分页
      handleCurrentChange(current) {

        let objAne = {
          "customQueryParams": [
          ],
          "pageIndex": current,
          "pageSize": 10
        };
        let key = Object.keys(this.ruleForm);
        for (let i = 0; i < key.length; i++) {
          if (this.ruleForm[key[i]] !== "") {
            let listb = {
              "name": key[i],
              "findType": "LIKE",
              "joinType": "And",
              "dataType":
                "Default",
              "values": [
                this.ruleForm[key[i]]
              ],
              "description": ""
            };
            objAne.customQueryParams.push(listb);
          }
        }
        this.handleReceivingData(objAne);
      },
      handleSizeChange() { }
    }
  };
</script>
<style scoped>
  .widths {
    width: 120
  }

  .btut {
    padding: 10px 20px !important;
  }

  .inpu {
    width: 150px;
  }

  .but {
    float: right;
    /* margin-right: 190px; */
  }
</style>