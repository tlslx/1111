<template>
  <el-container>
    <el-dialog :visible.sync="reviewVisible" :close-on-click-modal="false" :close-on-press-escape="false" :fullscreen="isFullScreen"
      width="90%">
      <template slot="title">
        <span class="el-dialog__title">{{source.language.departmentReview}}</span>
        <i class="iconfont icon-zuidahua" @click="onChangeSize" />
      </template>
      <kindo-box>
        <kindo-table :cell-style="isCenter" ref="reviewTable" :pagination="false" :height="120">
          <el-table-column v-if="tabIndex ==='0'" prop="seaTariffNumber.year" :label="source.language.year" header-align="center" min-width="100">
          </el-table-column>
          <el-table-column v-else prop="numberEffective.year" :label="source.language.year" header-align="center" min-width="100">
          </el-table-column>

          <el-table-column prop="initiator" :label="tabIndex ==='0' ? source.language.initiator : source.language.enterprise" header-align="center" min-width="160"  show-overflow-tooltip>
          </el-table-column>

          <el-table-column v-if="tabIndex ==='0'" prop="seaTariffNumber.code" :label="source.language.commodityCode" header-align="center" min-width="100" show-overflow-tooltip>
          </el-table-column>
          <el-table-column v-else prop="numberEffective.code" :label="source.language.commodityCode" header-align="center" min-width="100" show-overflow-tooltip>
          </el-table-column>

          <el-table-column v-if="tabIndex ==='0'" prop="seaTariffNumber.codeDesc" :label="source.language.productName" header-align="center" min-width="160"
          show-overflow-tooltip> 
          </el-table-column>
          <el-table-column v-else prop="numberEffective.codeDesc" :label="source.language.productName" header-align="center" min-width="160" show-overflow-tooltip>
          </el-table-column>

          <el-table-column v-if="tabIndex ==='0'" prop="seaTariffNumber.assortType"
          :label="source.language.catalogClassification" header-align="center" min-width="160"
          show-overflow-tooltip  :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.assortType, row.seaTariffNumber.assortType)}">
          </el-table-column>
          <el-table-column v-if="tabIndex ==='0'" prop="seaTariffNumber.revisionType" :label="source.language.category" min-width="160" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.revisionType,row.seaTariffNumber.revisionType)}"></el-table-column>
          <el-table-column v-if="tabIndex ==='0'" prop="seaTariffNumber.changeDescription" :label="source.language.changeDescription" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column v-if="tabIndex ==='0'" prop="seaTariffNumber.originCode" :label="source.language.originalCode" header-align="center" min-width="100" >
          </el-table-column>
          <el-table-column v-if="tabIndex ==='0'" prop="seaTariffNumber.originName" :label="source.language.originalName" header-align="center" min-width="160">
          </el-table-column>

          <el-table-column prop="areaCode" :label="source.language.exhibitionArea" header-align="center" min-width="120" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.areaCode,row.areaCode)}">
          </el-table-column>

          <el-table-column v-if="tabIndex ==='0'" prop="seaTariffNumber.proposedExtension" :label="source.language.extension" header-align="center" min-width="120" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.proposedExtension,row.seaTariffNumber.proposedExtension)}">
          </el-table-column>
          <el-table-column v-else prop="numberEffective.proposedExtension" :label="source.language.extension" header-align="center" min-width="120" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.proposedExtension,row.numberEffective.proposedExtension)}">
          </el-table-column>

          <el-table-column prop="remark" :label="source.language.instructions" header-align="center" min-width="160" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="status" :label="source.language.status" header-align="center" min-width="160" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.status,row.status)}" show-overflow-tooltip>
          </el-table-column>
        </kindo-table>
      </kindo-box>
      <kindo-box :title="source.language.opinion">
        <kindo-table :cell-style="isCenter" ref="opinionTable" :pagination="false" :max-height="400">
          <el-table-column prop="endTime" :label="source.language.endTime" header-align="center" min-width="160"  show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="departmentName" :label="source.language.department" header-align="center" min-width="160"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="userName" :label="source.language.auditor" header-align="center" show-overflow-tooltip
            min-width="120">
          </el-table-column>
          <!-- <el-table-column prop="actName" :label="source.language.operation" min-width="120" show-overflow-tooltip header-align="center"></el-table-column> -->
         <el-table-column prop="submitType" :label="source.language.operation" min-width="160" show-overflow-tooltip header-align="center" :formatter="operationSubmitType"></el-table-column>
          <el-table-column prop="comment" :label="source.language.explain" min-width="120" show-overflow-tooltip header-align="center"></el-table-column>
        </kindo-table>
      </kindo-box>
       <kindo-box>
        <el-form :model="opinionForm" ref="opinionForm" :rules="rules" label-width="150px">
          <el-form-item :label="source.language.review" prop='auditResult'>
            <el-select v-model="opinionForm.auditResult" :placeholder="source.language.selectPlaceholder" style="width: 50%">
              <el-option v-for="item in source.auditResult" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.explain" prop="opinion">
            <el-input type="textarea" :rows="4" :placeholder="source.language.inputPlaceholder" v-model="opinionForm.opinion" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onsubmit('opinionForm')">{{source.language.submit}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </el-dialog>
  </el-container>
</template>
<script>
  import seaTariffNumber from '@/components/project/mixins/seaTariffNumber';
  import listPageBase from '@/components/framework/mixins/listPageBase';
  export default {
    name: 'reviewDialog',
    mixins: [seaTariffNumber, listPageBase],
    data() {
      return {
        reviewVisible: false,
        rowData: {},
        action: '',
        opinionForm: {
          auditResult: 'false',
          opinion: ''
        },
        rules: {
          auditResult: [],
          opinion: []
        },
        source: {
          auditResult: []
        }
      };
    },
    props: {
      api: {
        type: Object,
        default: () => {
          return {};
        }
      },
      tabIndex: {
        type: String,
        default: () => {
          return '';
        }
      }
    },
    async created() {
      this._opinionForm = Object.assign({}, this.opinionForm);
      this.rules.auditResult = [
        { required: true, message: this.source.language.selectPlaceholder, trigger: "change" }
      ];
      this.rules.opinion = [
        { required: false, message: this.source.language.inputPlaceholder, trigger: "change" },
        { min: 1, max: 255, message: this.source.language.max255, trigger: "change" }
      ];
      this.source.auditResult = [
        // { id: "1", value: "true", label: this.source.language.pass },
        { id: "0", value: "false", label: this.source.language.refuse } 
      ];
    },
    methods: {
      getReview() {
        this.$nextTick(function () {
          this.$refs.reviewTable.internalData = [];
          this.$refs.opinionTable.internalData = [];
          this.opinionForm = Object.assign({}, this._opinionForm);
          let url = '';
          if (this.tabIndex === '0') {
            url = this.api.getFeedbackData;
          } else {
            url = this.api.getApplyData;
          }
          this.$http.get(url, { id: this.rowData.id }).then(res => {
            let dataset = [];
            dataset.push(res);
            this.$refs.reviewTable.internalData = dataset;
          });
          this.$http.get(this.api.getLog, { workflowId: this.rowData.workflowId }).then(data => {
            data.forEach(el => {
              if (el.userId) {
                this.$refs.opinionTable.internalData.unshift(el);
              } 
            });
          });
        });
      },
      onsubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.opinionForm.auditResult === 'false' && !this.opinionForm.opinion) {
              this.$message({
                type: 'warning',
                message: this.source.language.explainRequired
              });
              return;
            }
            this.opinionForm.id = this.rowData.id;
            let url = '';
            if (this.tabIndex === '0') {
              url = this.api.auditReject;
            } else {
              url = this.api.auditApplyReject;
            }
            this.rowData.auditResult = this.opinionForm.auditResult;
            this.rowData.opinion = this.opinionForm.opinion;
            // this.opinionForm.id = this.rowData.id;
            // this.opinionForm.taskId = this.rowData.taskId;
            this.$http.postJson(url, this.rowData).then(res => {
              this.$message({
                type: 'success',
                message: this.source.language.successful
              });
              this.$emit('reload');
              this.reviewVisible = false;
            });
          }
        });
      }
    },
    watch: {
      reviewVisible(v) {
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