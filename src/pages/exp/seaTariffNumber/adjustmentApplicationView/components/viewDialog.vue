<template>
  <el-container>
    <el-dialog :visible.sync="viewVisible" :close-on-click-modal="false" :close-on-press-escape="false" :fullscreen="isFullScreen"
      width="90%">
      <template slot="title">
        <span class="el-dialog__title">{{source.language.applicationView}}</span>
        <i class="iconfont icon-zuidahua" @click="onChangeSize" />
      </template>
      <kindo-box>
         <kindo-table :cell-style="isCenter" ref="viewTable" :pagination="false">
            <el-table-column prop="numberEffective.year" :label="source.language.year" header-align="center" min-width="100">
            </el-table-column>
            <el-table-column prop="initiator" :label="source.language.enterprise" header-align="center" min-width="160">
            </el-table-column>
            <el-table-column prop="numberEffective.code" :label="source.language.commodityCode" header-align="center" min-width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="numberEffective.codeDesc" :label="source.language.productName" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="areaCode" :label="source.language.exhibitionArea" header-align="center" min-width="120" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.areaCode,row.areaCode)}">
            </el-table-column>
            <el-table-column prop="numberEffective.proposedExtension" :label="source.language.extension" header-align="center" min-width="120" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.proposedExtension,row.numberEffective.proposedExtension)}">
            </el-table-column>
            <el-table-column prop="remark" :label="source.language.instructions" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" :label="source.language.status" header-align="center" min-width="160" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.status,row.status)}" show-overflow-tooltip>
            </el-table-column>
        </kindo-table>
      </kindo-box>
      <kindo-box :title="source.language.opinion">
        <kindo-table :cell-style="isCenter" ref="opinionTable" :pagination="false" :max-height="400">
          <!-- <el-table-column prop="startTime" :label="source.language.startTime" header-align="center" min-width="160" show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column prop="endTime" :label="source.language.endTime" header-align="center" min-width="160" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="departmentName" :label="source.language.department" header-align="center" min-width="160" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="userName" :label="source.language.auditor" header-align="center" show-overflow-tooltip min-width="120">
          </el-table-column>
          <el-table-column prop="submitType" :label="source.language.operation" min-width="160" show-overflow-tooltip header-align="center" :formatter="onApplicationSubmitType"></el-table-column>
          <el-table-column prop="comment" :label="source.language.explain" min-width="160" show-overflow-tooltip header-align="center"></el-table-column>
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
        rowData: {},
        action: ''
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
      getReview() {
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
          this.getReview();
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