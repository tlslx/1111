<template>
  <el-page>
    <!-- 建议反馈 -->
    <template slot="header">
      <child-dialog :api="api" @reload="onResetQuery" ref="childDialog" />
      <review-dialog :api="api" @reload="onResetQuery" ref="reviewDialog" />
    </template>
    <!--数据区域-->
    <template slot="body">
      <el-page-data>
        <kindo-box>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="source.language.seaTariff" name="first">
              <kindo-box>
                <el-form :model="queryParams" ref="queryParams" label-position="right" size="small" inline label-width="90px" @submit.native.prevent @keyup.enter.native="onQuery">
                  <el-form-item :label="source.language.commodityCode">
                    <el-input v-model="queryParams.code" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()" clearable></el-input>
                  </el-form-item>
                  <el-form-item :label="source.language.productName">
                    <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="queryParams.codeDesc" class="inputclass" clearable></el-input>
                  </el-form-item>
                  <el-form-item :label="source.language.catalogClassification">
                    <el-select v-model="queryParams.assortType" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
                      <el-option v-for="item in source.assortType" :key="item.id" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onQuery">{{source.language.query}}</el-button>
                    <el-button type="info" plain @click="onResetQuery">{{source.language.reset}}</el-button>
                  </el-form-item>
                </el-form>
                <el-form :model="queryParams" label-width="90px" inline @submit.native.prevent @keyup.enter.native="onQuery" size="small">
                  <el-form-item :label="source.language.category">
                    <el-select v-model="queryParams.revisionType" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
                      <el-option v-for="item in source.revisionTypes" :key="item.id" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="source.language.extension">
                    <el-select v-model="queryParams.proposedExtension" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
                      <el-option v-for="item in source.proposedExtension" :key="item.id" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-button type="text" v-if="isTime" icon="el-icon-warning" class="timeclass">{{source.language.isDeadline}} {{time}}</el-button>
              </kindo-box>
              <kindo-box>
                <kindo-table :cell-style="isCenter" :url="api.getFeedback" ref="feedbackTable" :queryParam="form">
                  <el-table-column prop="year" :label="source.language.year" header-align="center" min-width="100">
                  </el-table-column>
                  <el-table-column prop="code" :label="source.language.commodityCode" header-align="center" min-width="100" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="codeDesc" :label="source.language.productName" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="assortType" :label="source.language.catalogClassification" header-align="center" min-width="100" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.assortType,row.assortType)}" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="revisionType" :label="source.language.category" min-width="160" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.revisionType,row.revisionType)}" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="changeDescription" :label="source.language.changeDescription" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="originCode" :label="source.language.originalCode" header-align="center" min-width="100" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="originName" :label="source.language.originalName" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="proposedExtension" :label="source.language.extension" header-align="center" min-width="100" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.proposedExtension,row.proposedExtension)}" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="revisionDesc" :label="source.language.reason" header-align="center" min-width="120" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column :label="source.language.operation" fixed='right' min-width="160" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" v-if="right('view')" @click="onAction('child','view',scope.row)">{{source.language.view}}</el-button>
                      <el-button type="text" v-if="right('add')" @click="onApplication('child','add',scope.row)" v-show="scope.row.revisionType !=='3'">{{source.language.newExhibitionArea}}</el-button>
                    </template>
                  </el-table-column>
                </kindo-table>
              </kindo-box>
            </el-tab-pane>

            <el-tab-pane :label="source.language.suggestedFeedback" name="second">
              <kindo-box>
                <kindo-table :cell-style="isCenter" :url="api.getAuditFeedback" ref="auditFeedbackTable" :queryParam="form">
                  <el-table-column prop="seaTariffNumber.year" :label="source.language.year" header-align="center" min-width="100">
                  </el-table-column>
                  <el-table-column prop="initiator" :label="source.language.initiator" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="seaTariffNumber.code" :label="source.language.commodityCode" header-align="center" min-width="100">
                  </el-table-column>
                  <el-table-column prop="seaTariffNumber.codeDesc" :label="source.language.productName" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="seaTariffNumber.assortType" :label="source.language.catalogClassification" header-align="center" min-width="100" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.assortType,row.seaTariffNumber.assortType)}" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="seaTariffNumber.revisionType" :label="source.language.category" min-width="140" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.revisionType,row.seaTariffNumber.revisionType)}" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="areaCode" :label="source.language.exhibitionArea" header-align="center" min-width="120" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.areaCode,row.areaCode)}" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="seaTariffNumber.proposedExtension" :label="source.language.extension" header-align="center" min-width="120" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.proposedExtension,row.seaTariffNumber.proposedExtension)}">
                  </el-table-column>
                  <el-table-column prop="remark" :label="source.language.instructions" header-align="center" min-width="160" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="status" :label="source.language.status" header-align="center" min-width="160" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.status,row.status)}" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column :label="source.language.operation" fixed='right' min-width="160" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" v-if="right('refuse')" @click="onAction('review','review',scope.row)">{{source.language.refuse}}</el-button>
                    </template>
                  </el-table-column>
                  <div slot="control">
                    <el-button type="primary" v-if="right('submit')" @click="onSubmit" size="small">{{source.language.submit}}</el-button>
                  </div>
                </kindo-table>
              </kindo-box>
            </el-tab-pane>
          </el-tabs>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>
<script>
import seaTariffNumber from '@/components/project/mixins/seaTariffNumber';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'feedback',
  mixins: [seaTariffNumber, listPageBase],
  components: {
    'childDialog': () => import('./components/childDialog'),
    'reviewDialog': () => import('./components/reviewDialog')
  },
  data() {
    return {
      pageId: 'feedback',
      api: {
        getFeedback: kindo.config.api.expUrl + "/api/exp/tariff/feedback/getFeedbackListPage",  // 海关税则号的列表
        getAuditFeedback: kindo.config.api.expUrl + "/api/exp/tariff/feedback/getAuditFeedbackListPage", // 建议反馈审核列表
        add: kindo.config.api.expUrl + "/api/exp/tariff/feedback/add", // 新增展区
        getById: kindo.config.api.expUrl + "/api/exp/tariff/recommend/get",
        getAuthAreas: kindo.config.api.expUrl + "/api/exp/exhibitionschemes/getAuthAreas",  // 获取展区
        reject: kindo.config.api.expUrl + "/api/exp/tariff/feedback/reject",  // 拒绝
        getReviewData: kindo.config.api.expUrl + "/api/exp/tariff/feedback/get",   // 获取待审核数据
        getLog: kindo.config.api.expUrl + "/api/exp/workflow/getLog", // 待审核界面 查看日志
        refer: kindo.config.api.expUrl + "/api/exp/tariff/feedback/refer", // 建议反馈待审核 提交
        getByCode: kindo.config.api.expUrl + "/api/exp/tariff/recommend/getEffectiveByCode", // 新增、编辑时根据编码的改变查询是否有已存在的编码数据
        setTime: kindo.config.api.expUrl + "/api/exp/setting/get"  // 获取设置的截止时间
      },
      queryParams: {
        code: null,
        codeDesc: null,
        assortType: null,
        revisionType: null,
        proposedExtension: null
      },
      activeName: 'first',
      tabIndex: '0',
      source: {
        revisionTypes: []     // 调整类别
      },
      isTime: false,
      time: null
    };
  },
  async created() {
    this._queryParams = Object.assign({}, this.queryParams);
    this.source.revisionTypes = [
      { id: "1", value: "1", label: this.source.language.editProductName }, // 修改商品名称
      { id: "2", value: "2", label: this.source.language.add },             // 新增
      { id: "3", value: "3", label: this.source.language.delete }           // 删除
    ];
    // 读取数据字典
    // this.source.languageSelection = await kindo.dictionary.get('languageType');
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
      this.$http.get(this.api.setTime, { item: 'seaTariffNumberEndDate' }).then(res => {
        if (res) {
          this.time = res;
          this.isTime = true;
        }
      });
    });
  },
  methods: {
    onQuery() {
      this.tabIndex === '0' ? this.$refs.feedbackTable.reloadData() : this.$refs.auditFeedbackTable.reloadData();
    },
    // 重置
    onResetQuery() {
      this.queryParams = Object.assign({}, this._queryParams);
      this.$nextTick(function () {
        this.tabIndex === '0' ? this.$refs.feedbackTable.reloadData() : this.$refs.auditFeedbackTable.reloadData();
      });
    },
    // 建议反馈 提交
    onSubmit() {
      if (!this.$refs.auditFeedbackTable.internalData.length) {
        this.$message({
          type: 'warning',
          message: this.source.language.empty
        });
        return;
      }
      this.$http.post(this.api.refer).then(res => {
        this.$message({
          type: 'success',
          message: this.source.language.submitWait
        });
      }).then(_ => {
        setTimeout(() => {
          this.onResetQuery();
        }, 500);
      });
    }
  },
  watch: {
    "queryParams": {
      handler(oldVal, newVal) {
        this.strToNull(newVal);     // 将对象属性的空字符串改为null
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scope>
.theme-blue .el-tabs__content {
  padding: 0 !important;
}
.theme-red .el-tabs__content {
  padding: 0 !important;
}
.timeclass {
  color: #e6a23c !important;
  height: 20px !important;
}
</style>