<template>
  <el-container>
    <el-dialog :visible.sync="reviewVisible" :close-on-click-modal="false" :close-on-press-escape="false" :fullscreen="isFullScreen"
      width="90%">
      <template slot="title">
        <span class="el-dialog__title">{{language.tplapproval}}</span>
        <i class="iconfont icon-zuidahua" @click="onChangeSize" />
      </template>
      <kindo-box>
        <kindo-table :cell-style="isCenter" ref="tempateReviewTable" :pagination="false">
          <el-table-column prop="templateGraphName" :label="language.mapname" header-align="center" min-width="140" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="version" :label="language.version" header-align="center" min-width="80" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="creatorName" :label="language.staff" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createDate" :label="language.time" min-width="160" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip></el-table-column>
          <el-table-column prop="pavilionCode" :label="language.hall" header-align="center" min-width="60" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="exhibitionHallCode" :label="language.exphall" header-align="center" min-width="100" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="floorNum" :label="language.floor" header-align="center" min-width="60" show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column prop="pavilienRegion" :label="language.pavilienRegion" header-align="center" min-width="60" show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column prop="standardBoothScale" :label="language.statistical" header-align="center" min-width="120">
          </el-table-column>
          <el-table-column prop="boothNum" :label="language.boothNum" header-align="center" min-width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="isHasSpecialStandardBooths" :label="language.hasDiverse" header-align="center" min-width="180"
            :formatter="(row) => row.isHasSpecialStandardBooths === '0' ? language.no : language.have">
          </el-table-column>
          <el-table-column prop="mainChannelWidth" :label="language.main" header-align="center" min-width="100" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="accessoryChannelsNumber" :label="language.subsidiary" header-align="center" min-width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="isHasIslandType" :label="language.island" header-align="center" min-width="100"
            :formatter="(row) => row.isHasIslandType === '0' ? language.no : language.have">
          </el-table-column>
          <el-table-column prop="status" :label="language.approvalStatus" min-width="200" align="center" show-overflow-tooltip>
             <template slot-scope="scope">
                <span :style="{ color: scope.row.status === '0' || scope.row.status === '1' ? '#909399' : scope.row.status === '3' ? '#67C23A' : '#F56C6C' }">{{ kindo.dictionary.getLabel(source.status, scope.row.status) }}</span>
              </template>
          </el-table-column>
           <el-table-column prop="buttomGraphName" :label="language.buttomGraphName" header-align="center" min-width="160" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="buttomGraphStatus" :label="language.buttomGraphStatus" min-width="120" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span :style="{ color: scope.row.buttomGraphStatus === '0' || scope.row.buttomGraphStatus === '1' ? '#909399' : scope.row.buttomGraphStatus === '3' ? '#67C23A' : '#F56C6C' }">
                {{kindo.dictionary.getLabel(source.status, scope.row.buttomGraphStatus)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="buttomGraphVersion" :label="language.buttomGraphVersion" header-align="center" min-width="120" show-overflow-tooltip>
          </el-table-column>
        </kindo-table>
      </kindo-box>
      <kindo-box>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="HTML5" name="first">
                <div class="maincenter">
                  <map-Svg ref="mapSvg" :imgurl="imgurl" :height="450" :costom="false"></map-Svg>
                </div>
              </el-tab-pane>
              <el-tab-pane label="CAD" name="second">
                <div class="maincenter"><img :src="imgurl" alt="map"></div>
              </el-tab-pane>
              <el-form label-width="80px" inline class="maincenter" :model="reviewForm" ref="reviewForm">
                <el-form-item :label="language.long">
                  <el-input v-model="reviewForm.length" readonly class="input-w">
                    <template slot="append">m</template>
                  </el-input>
                </el-form-item>
                <el-form-item :label="language.wide">
                  <el-input v-model="reviewForm.width" readonly class="input-w">
                    <template slot="append">m</template>
                  </el-input>
                </el-form-item>
                <el-form-item :label="language.area">
                  <el-input v-model="reviewForm.area" readonly class="input-w">
                    <template slot="append">m^2</template>
                  </el-input>
                </el-form-item>
              </el-form>
              <div class="maincenter">
                <el-button type="primary" icon="el-icon-download" @click="onDownload">{{language.down}}</el-button>
              </div>
            </el-tabs>
          </el-col>
        </el-row>
      </kindo-box>
      <kindo-box :title="language.authorize" v-show="isEmptyReviewTableData">
        <kindo-table :cell-style="isCenter" ref="reviewTable" :pagination="false" :max-height="400">
          <el-table-column prop="detail" :label="language.demand" header-align="center" show-overflow-tooltip min-width="260">
          </el-table-column>
          <el-table-column :label="language.authorize" prop="valid" align="center" min-width="200">
            <template slot-scope="scope">
              <el-radio v-model="scope.row.valid" label="true" :disabled="scope.row.valid !==null && scope.row.id !== null">{{language.pass}}</el-radio>
              <el-radio v-model="scope.row.valid" label="false" :disabled="scope.row.valid !==null && scope.row.id !== null">{{language.fail}}</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="creatorName" :label="language.auditor" header-align="center" min-width="160"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="createDate" :label="language.reviewtime" header-align="center" min-width="160"
            show-overflow-tooltip>
          </el-table-column>
        </kindo-table>
      </kindo-box>
      <kindo-box :title="language.opinion" v-show="isEmptyOpinionTableData">
        <kindo-table :cell-style="isCenter" ref="opinionTable" :pagination="false">
          <el-table-column prop="startTime" :label="language.startdate" header-align="center" min-width="160" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="endTime" :label="language.enddate" header-align="center" min-width="160" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="departmentName" :label="language.depart" header-align="center" show-overflow-tooltip
            min-width="120">
          </el-table-column>
          <el-table-column prop="userName" :label="language.auditor" header-align="center" min-width="160" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="actName" :label="language.node" min-width="120" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="submitType" :label="language.operation" min-width="120" :formatter="(row) => (row.submitType === null || row.submitType === '') ? row.actName : kindo.dictionary.getLabel(source.submitTypeOptions, row.submitType)" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="comment" :label="language.explain" header-align="center" show-overflow-tooltip>
          </el-table-column>
        </kindo-table>
      </kindo-box>
      <kindo-box>
        <el-form :model="opinionForm" ref="opinionForm" :rules="rules" label-width="150px">
          <el-form-item :label="language.authorize" prop='auditResult'>
            <el-select v-model="opinionForm.auditResult" :placeholder="language.selectPlaceholder" style="width: 50%">
              <el-option v-for="item in source.auditResult" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.explain" prop="opinion">
            <el-input type="textarea" :rows="4" :placeholder="language.inputPlaceholder" v-model="opinionForm.opinion" style="width: 50%" class="m-t" maxlength="255" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onsubmit('opinionForm')" class="m-t">{{language.submit}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reviewVisible = false">{{language.cancel}}</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
  import common from '@/components/project/mixins/common';
  import listPageBase from '@/components/framework/mixins/listPageBase';
  import mapSvg from "@/components/project/plugins/mapSvg.vue";
  export default {
    components: {
      "map-Svg": mapSvg
    },
    name: 'reviewDialog',
    mixins: [common, listPageBase],
    data() {
      return {
        reviewVisible: false,
        isEmptyReviewTableData: false,
        isEmptyOpinionTableData: false,
        isTrue: false,
        imgurl: '',
        reviewForm: {
          length: '',
          width: '',
          area: ''
        },
        rowData: {},
        action: '',
        opinionForm: {
          auditResult: '',
          opinion: ''
        },
        activeName: 'first',
        rules: {
          auditResult: [
            //  { required: true, message: "请选择审核结果", trigger: "change" }
          ],
          opinion: [
            //  { required: false, message: "请填写审批意见", trigger: "change" },
            //  { min: 1, max: 255, message: "请输入最多255个字符", trigger: "change" }
          ]
        },
        source: {
          auditResult: [
            // { id: "1", value: "true", label: "通过" },
            // { id: "0", value: "false", label: "拒绝" } 
          ]
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
      language: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    async created() {
      this._reviewForm = Object.assign({}, this.reviewForm);
      this._opinionForm = Object.assign({}, this.opinionForm);
      this.source.auditResult = [
        { id: "1", value: "true", label: this.language.pass },
        { id: "0", value: "false", label: this.language.refuse } 
      ];
      this.rules.auditResult = [
        { required: true, message: this.language.selectPlaceholder, trigger: "change" }
      ];
      this.rules.opinion = [
        { required: false, message: this.language.inputPlaceholder, trigger: "change" }
      ];
    },
    methods: {
      getReview() {
        this.$refs.mapSvg.action = '';
        this.$refs.tempateReviewTable.internalData = [];
        this.$refs.reviewTable.internalData = [];
        this.$refs.opinionTable.internalData = [];
        this.isEmptyReviewTableData = false;
        this.isEmptyOpinionTableData = false;
        this.reviewForm = Object.assign({}, this._reviewForm);
        this.opinionForm = Object.assign({}, this._opinionForm);
        this.$http.get(this.api.getById, { id: this.rowData.templateGraphId }).then(res => {
          this.imgurl = this.api.viewpic + res.pngFileId + '?gridBucket=BOOTH_CAD';
          this.$refs.mapSvg.action = 'add';
          this.reviewForm.length = res.length;
          this.reviewForm.width = res.width;
          this.reviewForm.area = res.area;
          this.pngFileId = res.pngFileId;
          let dataset = [];
          dataset.push(res);
          this.$refs.tempateReviewTable.internalData = dataset;
          this.$refs.opinionTable.internalData = res.opinions;
          this.$refs.reviewTable.internalData = res.graphAuditItems;
          if (this.$refs.opinionTable.internalData) {
            this.$refs.opinionTable.internalData.length ? this.isEmptyOpinionTableData = true : this.isEmptyOpinionTableData = false;
          }
          if (this.$refs.reviewTable.internalData) {
            if (this.$refs.reviewTable.internalData.length > 0) {
              this.isEmptyReviewTableData = true;
              this.$refs.reviewTable.internalData.forEach(el => {
                if (el.valid === true || el.valid === false) {
                  el.valid = el.valid.toString();
                }
              });
            }
          }        
        }).catch(_ => {
          return false;
        });
      },
      onsubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm(this.language.submitSelectedData, this.language.tips, {
              confirmButtonText: this.language.confirm,
              cancelButtonText: this.language.cancel,
              type: 'warning'
            }).then(() => {
              this.isTrue = false;
              if (this.$refs.reviewTable.internalData.length > 0) {
                this.$refs.reviewTable.internalData.forEach(el => {
                  if (el.valid === "false") {
                    this.isTrue = true;
                  }
                });
              }
              if (this.opinionForm.auditResult === 'true' && this.isTrue) {
                this.$message({
                  type: 'warning',
                  message: this.language.notApproved
                });
                return;
              }
              if (this.opinionForm.auditResult === 'false' && !this.opinionForm.opinion) {
                this.$message({
                  type: 'warning',
                  message: this.language.isRejected
                });
                return;
              }
              this.rowData.auditResult = this.opinionForm.auditResult;
              this.rowData.opinion = this.opinionForm.opinion;
              this.rowData.graphAuditItems = this.$refs.reviewTable.internalData;
              this.$http.postJson(this.api.submit, this.rowData).then(res => {
                this.reviewVisible = false;
                this.$emit('reload');
                kindo.util.alert(this.language.submittedSuccessfully, "success");
              }).catch(_ => {
                kindo.util.alert(this.language.submissionFailed, "warning");
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: this.language.cancelledSubmission
              });
            });
          } else {
            return false;
          }
        });
      
      },
      // 图纸下载
      onDownload() {
        this.$emit("down-click", this.rowData);
      },
      // html5 CAD切换
      handleClick(tab) {
      }
    },
    watch: {
      // reviewVisible(val, oldVal) {
      //   if (val === true) {
      //     this.getReview();
      //   }
      // }
      "action"(value) {
        switch (value) {
          case "review":
            return this.getReview();
          default:
            return "";
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .maincenter {
    text-align: center;
  }

  .input-w {
    width: 150px;
  }
  .iconfont.icon-zuidahua {
    float: right;
    margin-right: 23px;
    margin-top: 3px;
  }
</style>