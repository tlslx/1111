<template>
  <el-container>
    <el-dialog :visible.sync="viewVisible" :close-on-click-modal="false" :close-on-press-escape="false" :fullscreen="isFullScreen"
      width="90%">
      <template slot="title">
        <span class="el-dialog__title">{{language.view}}</span>
        <i class="iconfont icon-zuidahua" @click="onChangeSize" />
      </template>
      <kindo-box>
        <kindo-table :cell-style="isCenter" ref="tempateViewTable" :pagination="false">
          <el-table-column prop="templateGraphName" :label="language.mapname" header-align="center" min-width="140" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="version" :label="language.version" header-align="center" min-width="80" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="creatorName" :label="language.staff" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createDate" :label="language.time" min-width="160" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip></el-table-column>
          <el-table-column prop="pavilionCode" :label="language.hall" header-align="center" min-width="60" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="floorNum" :label="language.floor" header-align="center" min-width="60" show-overflow-tooltip></el-table-column>
          <el-table-column prop="exhibitionHallCode" :label="language.exphall" header-align="center" min-width="100" show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column prop="pavilienRegion" :label="language.pavilienRegion" header-align="center" min-width="60" show-overflow-tooltip></el-table-column> -->
          <el-table-column prop="standardBoothScale" :label="language.statistical" header-align="center" min-width="120" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="boothNum" :label="language.boothNum" header-align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="isHasSpecialStandardBooths" :label="language.hasDiverse" header-align="center" min-width="180"
            :formatter="(row) => row.isHasSpecialStandardBooths === '0' ? language.no : language.have">
          </el-table-column>
          <el-table-column prop="mainChannelWidth" :label="language.main" header-align="center" min-width="100">
          </el-table-column>
          <el-table-column prop="accessoryChannelsNumber" :label="language.subsidiary" header-align="center" min-width="120">
          </el-table-column>
          <el-table-column prop="isHasIslandType" :label="language.island" header-align="center" width="100px"
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
                <!-- <div class="maincenter"><img :src="api.viewpic + pngFileId" alt="map"></div> -->
                 <div class="maincenter">
                   <map-Svg ref="mapSvg" :imgurl="imgurl" :height="450" :costom="false"></map-Svg>
                 </div>
              </el-tab-pane>
              <el-tab-pane label="CAD" name="second">
                <div class="maincenterclass"><img :src="imgurl" alt="map" class="imgclass"></div>
              </el-tab-pane>
              <el-form label-width="80px" inline class="maincenter" :model="viewForm" ref="viewForm">
                <el-form-item :label="language.long">
                  <el-input v-model="viewForm.length" readonly class="input-w">
                    <template slot="append">m</template>
                  </el-input>
                </el-form-item>
                <el-form-item :label="language.wide">
                  <el-input v-model="viewForm.width" readonly class="input-w">
                    <template slot="append">m</template>
                  </el-input>
                </el-form-item>
                <el-form-item :label="language.area">
                  <el-input v-model="viewForm.area" readonly class="input-w">
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
      <kindo-box :title="language.approval" v-show="isEmptyViewTable">
        <kindo-table :cell-style="isCenter" ref="viewTable" :pagination="false" :max-height="400">
          <el-table-column prop="detail" :label="language.demand" header-align="center" show-overflow-tooltip min-width="260">
          </el-table-column>
          <el-table-column :label="language.authorize" prop="valid" align="center" min-width="200">
            <template slot-scope="scope">
              <el-radio v-model="scope.row.valid" label="true" disabled>{{language.pass}}</el-radio>
              <el-radio v-model="scope.row.valid" label="false" disabled>{{language.fail}}</el-radio>
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
      <kindo-box :title="language.opinion" v-show="isEmptyOpinionTable">
        <kindo-table :cell-style="isCenter" ref="opinionTable" :pagination="false" :max-height="400">
          <el-table-column prop="startTime" :label="language.startdate" header-align="center" min-width="160"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="endTime" :label="language.enddate" header-align="center" min-width="160"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="departmentName" :label="language.depart" header-align="center" show-overflow-tooltip
            min-width="120">
          </el-table-column>
          <el-table-column prop="userName" :label="language.auditor" header-align="center" min-width="160">
          </el-table-column>
          <el-table-column prop="actName" :label="language.node" min-width="120" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="submitType" :label="language.operation" min-width="120" :formatter="(row) => (row.submitType === null || row.submitType === '') ? row.actName : kindo.dictionary.getLabel(source.submitTypeOptions, row.submitType)" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="comment" :label="language.explain" header-align="center" min-width="160" show-overflow-tooltip>
          </el-table-column>
        </kindo-table>
      </kindo-box>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewVisible = false">{{language.cancel}}</el-button>
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
    name: 'viewDialog',
    mixins: [common, listPageBase],
    data() {
      return {
        viewVisible: false,
        isEmptyViewTable: false,
        isEmptyOpinionTable: false,
        imgurl: '',
        viewForm: {
          length: '',
          width: '',
          area: ''
        },
        activeName: 'first',
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
      },
      language: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    async created() {
      this._viewForm = Object.assign({}, this.viewForm);
    },
    methods: {
      getView() {
        this.$refs.mapSvg.action = '';
        this.$refs.tempateViewTable.internalData = [];
        this.$refs.viewTable.internalData = [];
        this.$refs.opinionTable.internalData = [];
        this.isEmptyViewTable = false;
        this.isEmptyOpinionTable = false;
        this.viewForm = Object.assign({}, this._viewForm);
        this.$http.get(this.api.getById, { id: this.rowData.templateGraphId }).then(res => {
          this.imgurl = this.api.viewpic + res.pngFileId + '?gridBucket=BOOTH_CAD';
          this.$refs.mapSvg.action = 'add';
          this.viewForm.length = res.length;
          this.viewForm.width = res.width;
          this.viewForm.area = res.area;
          let dataset = [];
          dataset.push(res);
          this.$refs.tempateViewTable.internalData = dataset;
          this.$refs.viewTable.internalData = res.graphAuditItems;
          if (res.opinions) {
            this.$refs.opinionTable.internalData = res.opinions;
          } else {
            this.$refs.opinionTable.internalData = [];
          }
          if (this.$refs.viewTable.internalData.length) {
            this.isEmptyViewTable = true;
            this.$refs.viewTable.internalData.forEach(el => {
              if (el.valid === true || el.valid === false) {
                el.valid = el.valid.toString();
              }
            });
          }
          this.$refs.opinionTable.internalData.length ? this.isEmptyOpinionTable = true : this.isEmptyOpinionTable = false;
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
      "action"(value) {
        switch (value) {
          case "view":
            return this.getView();
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
  .maincenterclass {
    width: 100%;
    text-align: center;
    .imgclass {
      width: 100%;
    }
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