<template>
  <div class="badgeIndexEditBox">
    <kindo-box title="证件指标调整">
      <kindo-box>
        <el-form :model="indexForm" inline label-width="110px" size="small" label-position="right">
          <el-form-item label="期数：">
            <el-select v-model="indexForm.exhibitionPeriod" placeholder="">
              <el-option v-for="item in numOption" :key="item.id" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业名称：">
            <el-input v-model="indexForm.enterpriceName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="广交会编码：">
            <el-input v-model="indexForm.enterpriceCode" placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
      <kindo-box>
        <kindo-table ref="indexTable" :height="'500px'" :loadFilter='loadFilter' :url="api.getAdjustBadgeList" :queryParam="getQueryParam">
          <el-table-column label="期数" prop="exhibitionPeriodZh" align="center" min-width="80"></el-table-column>
          <el-table-column label="广交会编码" prop="enterpriceCode" align="center" min-width="80"></el-table-column>
          <el-table-column label="企业中文名" prop="enterpriceName" align="center" min-width="80"></el-table-column>
          <el-table-column label="原有指标" prop="indexQuantity" align="center" min-width="80"></el-table-column>
          <el-table-column label="已调整名额" align="center" min-width="80">
            <template slot-scope="scope">
              <span>{{scope.row.indexQuantity-scope.row.adjustIndexQuantity}}</span>
            </template>
          </el-table-column>
          <el-table-column label="目前指标" prop="adjustIndexQuantity" align="center" min-width="80"></el-table-column>
          <el-table-column label="操作" align="center" min-width="80">
            <template slot-scope="scope">
              <el-button type="text" class="btnUnderline" @click="edit(scope)">调整</el-button>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>
      <el-dialog title="指标调整" :visible.sync="editDialog" width="50%">
        <el-form :model="eidtForm" label-position="right" label-width="220px" style="">
          <el-form-item label="广交会编码：">
            <el-input v-model="eidtForm.exhibitionCode" disabled class="inputWidth"></el-input>
          </el-form-item>
          <el-form-item label="企业名称：">
            <el-input v-model="eidtForm.companyCNName" disabled class="inputWidth"></el-input>
          </el-form-item>
          <el-form-item label="调整个数：">
            <el-input v-model="eidtForm.editIndex" class="inputWidth" :disabled="isReadOnly"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="editDialogTips">
              <span>交易团证件配额总数：</span>
              <span>{{editDialogTipsInfo.tradeGroupIndex}}</span> &nbsp;
              <span>企业证件配额总数：</span>
              <span>{{editDialogTipsInfo.enterpriseIndex}}</span> &nbsp;
              <span>余额数：</span>
              <span>{{editDialogTipsInfo.restIndex}}</span>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialog=false">关闭</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </el-dialog>
    </kindo-box>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageId: "onlineService/netBadge/netBadgeSet/badgeModeSet/badgeIndexEdit",
      api: {
        // getAdjustBadgeList:'http://10.28.124.108:9001/api/tradeRestrict/getAdjustBadgeList',
        // getAdjustBadgeIndexDetails:'http://10.28.124.108:9001/api/tradeRestrict/getAdjustBadgeIndexDetails',
        // getCurrentUserTradeInfo:'http://10.28.124.108:9001/api/tradeRestrict/getCurrentUserTradeInfo'
        getAdjustBadgeList: kindo.config.api.osUrl + '/api/tradeRestrict/getAdjustBadgeList',
        getAdjustBadgeIndexDetails: kindo.config.api.osUrl + '/api/tradeRestrict/getAdjustBadgeIndexDetails',
        getCurrentUserTradeInfo: kindo.config.api.osUrl + '/api/tradeRestrict/getCurrentUserTradeInfo'
      },
      editDialog: false,
      eidtForm: {
        id: 1,
        exhibitionNum: '一期',
        exhibitionCode: '2708042',
        companyCNName: '广东省洋缘贸易出口有限公司',
        originIndex: '35',
        editIndex: '5',
        currentIndex: '40'
      },
      isReadOnly: false,
      editDialogTipsInfo: {
        tradeGroupIndex: '',
        restIndex: '',
        enterpriseIndex: ''
      },
      indexForm: {},
      numOption: [
        {
          id: 1,
          name: '一期',
          value: '1'
        },
        {
          id: 2,
          name: '二期',
          value: '2'
        },
        {
          id: 3,
          name: '三期',
          value: '3'
        },
        {
          id: 4,
          name: '全部',
          value: 'ALL'
        }
      ],
      indexTable: [
        {
          id: 1,
          exhibitionNum: '一期',
          exhibitionCode: '2708042',
          companyCNName: '广东省洋缘贸易出口有限公司',
          originIndex: '35',
          editIndex: '5',
          currentIndex: '40'
        },
        {
          id: 2,
          exhibitionNum: '一期',
          exhibitionCode: '2708042',
          companyCNName: '广东省洋缘贸易出口有限公司2',
          originIndex: '24',
          editIndex: '6',
          currentIndex: '30'
        }
      ]
    };
  },
  methods: {
    query() {
      console.log(this.indexForm);
      this.getAdjustBadgeList();
    },
    edit(scope) {
      console.log(scope);
      this.eidtForm = scope.row;
      this.getAdjustBadgeIndexDetails();
      this.editDialog = true;
    },
    submit() {
      console.log(this.eidtForm);
    },
    getAdjustBadgeList() {
      // const req = {
      //   json: {
      //     customQueryParams: {},
      //     page: {
      //       current: 1,
      //       size: 10
      //     }
      //   }
      // };
      // this.$http.get(this.api.getAdjustBadgeList, req)
      //   .then(res => {
      //     console.log(res);
      //   });

      // this.$refs.indexTable.internalData = this.indexTable;
      this.$refs.indexTable.loadData();
    },
    loadFilter(res) {
      const filterData = { ...res };
      if (filterData.records) {
        filterData.records.forEach(r => {
          r.exhibitionPeriodZh = this.formatExhibitionPeriod(r.exhibitionPeriod);
        });
      }
      return filterData;
    },
    formatExhibitionPeriod(str) {
      switch (str) {
        case '1':
          return '一期';
        case '2':
          return '二期';
        case '3':
          return '三期';
        default:
          return '一期';
      }
    },
    getCurrentUserTradeInfo() {
      this.$http.get(this.api.getCurrentUserTradeInfo)
        .then(res => {
          this.isReadOnly = !(res.TradeInfo.modifyEnterpriseIndex === '1');
        });
    },
    getAdjustBadgeIndexDetails() {
      const req = {
        json: {
          customQueryParams: {
            orgIndexId: this.eidtForm.orgIndexId,
            exhibitionPeriod: this.eidtForm.exhibitionPeriod
          }
        }
      };
      this.$http.get(this.api.getAdjustBadgeIndexDetails, req)
        .then(res => {
          console.log(res);
          this.editDialogTipsInfo = res;
        });
    }
  },
  mounted() {
    this.getAdjustBadgeList();
    this.getCurrentUserTradeInfo();
  },
  computed: {
    getQueryParam() {
      return {
        queryParams: this.indexForm
      };
    }
  }
};
</script>
<style lang="less" scoped>
.badgeIndexEditBox {
  .btnUnderline {
    text-decoration: underline;
  }
  .inputWidth {
    width: 280px;
  }
  .editDialogTips {
    // position: relative;
    // right: 220px;
    color: #ccc;
    & > :nth-of-type(2n) {
      color: red;
    }
  }
}
</style>

