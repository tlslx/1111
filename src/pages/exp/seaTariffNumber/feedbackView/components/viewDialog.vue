<template>
  <el-container>
    <el-dialog :visible.sync="viewVisible" :close-on-click-modal="false" :close-on-press-escape="false" :fullscreen="isFullScreen"
      width="90%">
      <template slot="title">
        <span class="el-dialog__title">{{source.language.feedbackView}}</span>
        <i class="iconfont icon-zuidahua" @click="onChangeSize" />
      </template>
      <kindo-box>
        <kindo-table :cell-style="isCenter" ref="viewTable" :pagination="false">
            <el-table-column prop="seaTariffNumber.year" :label="source.language.year" header-align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="initiator" :label="source.language.initiator" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.code" :label="source.language.commodityCode" header-align="center" min-width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.codeDesc" :label="source.language.productName" header-align="center" min-width="160"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="seaTariffNumber.assortType" :label="source.language.catalogClassification" header-align="center" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.assortType,row.seaTariffNumber.assortType)}" min-width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.revisionType" :label="source.language.category" min-width="160" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.revisionType,row.seaTariffNumber.revisionType)}" show-overflow-tooltip></el-table-column>
             <el-table-column prop="seaTariffNumber.changeDescription" :label="source.language.changeDescription" min-width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="seaTariffNumber.originCode" :label="source.language.originalCode" header-align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="seaTariffNumber.originName" :label="source.language.originalName" header-align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="areaCode" :label="source.language.exhibitionArea" header-align="center" min-width="120" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.areaCode,row.areaCode)}" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.proposedExtension" :label="source.language.extension" header-align="center" min-width="120" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.proposedExtension,row.seaTariffNumber.proposedExtension)}"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remark" :label="source.language.instructions" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" :label="source.language.status" header-align="center" min-width="120" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.status,row.status)}">
            </el-table-column>
        </kindo-table>
      </kindo-box>
      <kindo-box :title="source.language.opinion">
        <kindo-table :cell-style="isCenter" ref="opinionTable" :pagination="false">
          <!-- <el-table-column prop="startTime" :label="source.language.startTime" header-align="center" min-width="160" show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column prop="endTime" :label="source.language.endTime" header-align="center" min-width="160" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="departmentName" :label="source.language.department" header-align="center" min-width="160" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="userName" :label="source.language.auditor" header-align="center" show-overflow-tooltip min-width="120">
          </el-table-column>
          <!-- <el-table-column prop="actName" :label="source.language.operation" min-width="120" show-overflow-tooltip header-align="center"></el-table-column> -->
         <el-table-column prop="submitType" :label="source.language.operation" min-width="160" show-overflow-tooltip header-align="center" :formatter="operationSubmitType"></el-table-column>
          <el-table-column prop="comment" :label="source.language.explain" min-width="120" show-overflow-tooltip header-align="center"></el-table-column>
        </kindo-table>
      </kindo-box>
    </el-dialog>
  </el-container>
</template>
<script>
  import seaTariffNumber from '@/components/project/mixins/seaTariffNumber';
  import listPageBase from '@/components/framework/mixins/listPageBase';
  export default {
    name: 'viewDialog',
    mixins: [seaTariffNumber, listPageBase],
    data() {
      return {
        viewVisible: false,
        action: '',
        rowData: {}
      };
    },
    props: {
      api: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    async created() {
    },
    methods: {
      getView() {
        this.$nextTick(function () {
          this.$refs.viewTable.internalData = [];
          this.$refs.opinionTable.internalData = [];
          this.$http.get(this.api.getViewData, { id: this.rowData.id }).then(res => {
            let dataset = [];
            dataset.push(res);
            this.$refs.viewTable.internalData = dataset;
          });
          this.$http.get(this.api.getLog, { workflowId: this.rowData.workflowId }).then(data => {
            data.forEach(el => {
              if (el.userId) {
                this.$refs.opinionTable.internalData.unshift(el);
              } 
            });
          });
        });

      }
    },
    watch: {
      viewVisible(v) {
        if (v === true) {
          this.getView();
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .iconfont.icon-zuidahua {
    float: right;
    margin-right: 23px;
    margin-top: 3px;
  }
</style>