<template>
  <div>
    <!--查看详情-->
    <el-dialog :title="language.audit" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="90%">
      <kindo-box>
        <kindo-table ref="childTable" :pagination="false">
          <el-table-column :label="language.mapname" min-width="200" prop="schemeGraphName" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="version" :label="language.version" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="creatorName" :label="language.staff" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createDate" :label="language.time" min-width="200" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip></el-table-column>
            <el-table-column prop="pavilionCode" :label="language.hall" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exhibitionHallCode" :label="language.exphall" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exhibitionAreaCode" :label="language.areacode" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exhibitinNum" :label="language.expnum" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exhibitionPeriodCode" :label="language.expcode" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="standardBoothSize" :label="language.stand" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="boothsNumber" :label="language.boothnum" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isHasProfiledStandardBooth" :label="language.isprostand" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mainChannelWidth" :label="language.mainwidth" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mainViceChannelNum" :label="language.mainnum" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isHasIsland" :label="language.island" min-width="200" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="status" :label="language.state" min-width="200" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.parentDictOptions,row.status)}" align="center" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="isUseBaseMap" :label="language.isbase" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isUseTemplateMap" :label="language.istemp" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="baseMapStatus" :label="language.basestate" min-width="200" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.parentDictOptions,row.baseMapStatus)}" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="templateStatus" :label="language.tempstate" min-width="200" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.parentDictOptions,row.templateStatus)}" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" :label="language.state" min-width="200" header-align="center" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span :style="{ color: scope.row.status === '0' || scope.row.status === '1' ? '#909399' : scope.row.status === '3' ? '#67C23A' : '#F56C6C' }">{{ kindo.dictionary.getLabel(source.parentDictOptions, scope.row.status) }}</span>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>
      <kindo-box>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="HTML5" name="first">
                <div class="maincenter magb">
                  <map-Svg ref="mapSvg" :imgurl="imgurl" :height="450" :costom="false"></map-Svg>
                  <!-- <img :src="api.viewpic + child.pngFileId" alt="map"> -->
                </div>
                <el-form label-width="80px" inline class="maincenter">
                  <el-form-item :label="language.long">
                    <span v-text="child.length"></span>
                  </el-form-item>
                  <el-form-item :label="language.wide">
                    <span v-text="child.width"></span>
                  </el-form-item>
                  <el-form-item :label="language.area">
                    <span v-text="child.area"></span>
                  </el-form-item>
                </el-form>
                <div class="maincenter"><el-button type="primary" icon="el-icon-download" @click="onDownload">{{language.down}}</el-button></div>
              </el-tab-pane>
              <el-tab-pane label="CAD" name="second">
                <div class="maincenterclass">
                <viewer :images="imgList">
                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="4" v-for="(item, index) in imgList" :key="index"><div class="grid-content bg-purple"><img class="imgclass" :src="item.url" :alt="item.name"><span>{{item.name}}</span></div></el-col>
                  </el-row>
                </viewer>
                </div>
                <el-form label-width="80px" inline class="maincenter">
                  <el-form-item :label="language.long">
                    <span v-text="child.length"></span>
                  </el-form-item>
                  <el-form-item :label="language.wide">
                    <span v-text="child.width"></span>
                  </el-form-item>
                  <el-form-item :label="language.area">
                    <span v-text="child.area"></span>
                  </el-form-item>
                </el-form>
                <div class="maincenter"><el-button type="primary" icon="el-icon-download" @click="onDownload">{{language.down}}</el-button></div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </kindo-box>
      <kindo-box v-show="reviewTableData.length>0" :title="language.authorize">
        <kindo-table :cell-style="isCenter" ref="reviewTable" :pagination="false" :height="300">
          <el-table-column prop="detail" :label="language.demand" header-align="center">
          </el-table-column>
          <el-table-column :label="language.authorize" prop="valid" align="center" width="200px">
            <template slot-scope="scope">
              <el-radio v-model="scope.row.valid" label="true" :disabled="scope.row.id !== null && scope.row.valid !== null">{{language.pass}}</el-radio>
              <el-radio v-model="scope.row.valid" label="false" :disabled="scope.row.id !== null && scope.row.valid !== null">{{language.fail}}</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="creatorName" :label="language.auditor" header-align="center">
          </el-table-column>
          <el-table-column prop="createDate" :label="language.reviewtime" header-align="center">
          </el-table-column>
        </kindo-table>
      </kindo-box>
      <kindo-box v-show="opiniondata.length>0" :title="language.opinion">
        <kindo-table ref="opinionTable" :pagination="false">
          <el-table-column prop="startTime" :label="language.startdate" min-width="180" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="endTime" :label="language.enddate" min-width="180" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="departmentName" :label="language.depart" min-width="120" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="userName" :label="language.auditor" min-width="120" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="actName" :label="language.node" min-width="120" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="submitType" :label="language.operation" min-width="120" :formatter="(row) => (row.submitType === null || row.submitType === '') ? row.actName : kindo.dictionary.getLabel(source.submitTypeOptions, row.submitType)" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="comment" :label="language.explain" min-width="200" show-overflow-tooltip header-align="center"></el-table-column>
        </kindo-table>
      </kindo-box>
      <kindo-box>
        <el-form ref="variables" :model="variables" :rules="rules" label-width="150px">
          <el-form-item :label="language.flag" prop="passFlag" class="row-margin">
            <el-select v-model="variables.passFlag" @change="selectChange" :placeholder="language.common.select" style="width: 50%;">
              <el-option :label="language.falgpass" value="1"></el-option>
              <el-option :label="language.falgredo" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.reviewComment" prop="reviewComment" class="row-margin">
            <el-input type="textarea" v-model="variables.reviewComment" rows="6" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="checkSubmit('variables')">{{language.submit}}</el-button>
            <!-- <confirm-button message="返回则当前审核信息会丢失，确定是否返回？" button-type="default" @remove="backTo">返回</confirm-button> -->
          </el-form-item>
        </el-form>
      </kindo-box>
      <span slot="footer" class="dialog-footer">
        <el-button @click="childVisible = false">{{language.cancel}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import mapSvg from "@/components/project/plugins/mapSvg.vue";
export default {
  components: {
    "map-Svg": mapSvg
  },
  name: 'childdialog',
  mixins: [tableMixIn],
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
  data () {
    return {
      action: "",
      rowdata: {},
      child: {},
      imgurl: "",
      imgList: [],
      baList: [],
      curItem: {},
      reviewTableData: [],
      opiniondata: [],
      variables: {
        passFlag: '',
        reviewComment: ''
      },
      rules: {
        passFlag: [],
        reviewComment: []
      },
      source: {
        parentDictOptions: [],
        submitTypeOptions: []
      },
      activeName: 'first',
      childVisible: false
    };
  },
  created () {
  },

  mounted() {
    this.$nextTick(function () {
    });
  },
  methods: {
    getView() {
      this.createLang();
      this.$refs.mapSvg.action = '';
      this.$refs.childTable.internalData = [];
      this.$refs.opinionTable.internalData = [];
      this.imgList = [];
      this.variables.passFlag = "";
      this.variables.reviewComment = "";
      
      let params = {
        schemeGraphId: this.rowdata.schemeGraphId
      };
      // let busparams = {
      //   businessKey: this.rowdata.schemeGraphId
      // };
      this.$http.get(this.api.getbyid, params).then(res => {
        let dataset = [];
        let datawork = [];
        this.child = res.graph;
        this.imgurl = this.api.viewpic + res.graph.pngFileId + '?gridBucket=BOOTH_CAD';
        this.baList = res.imageList;
        if (this.baList) {
          this.baList.map((item, index) => {
            let map = {
              name: item.exhibitionAreaName,
              url: this.api.viewpic + item.pngFileId + '?gridBucket=BOOTH_CAD'
            };
            this.imgList.push(map);
          });
        }
        this.$refs.mapSvg.action = 'add';
        // this.child.length = res.length;
        // this.child.width = res.width;
        // this.child.area = res.area;

        dataset.push(res.graph);
        // console.log(dataset);
        this.$refs.childTable.internalData = dataset;
        this.$refs.reviewTable.internalData = res.auditList;
        this.reviewTableData = res.auditList;
        if (this.$refs.reviewTable.internalData.length > 0) {
          this.$refs.reviewTable.internalData.forEach(el => {
            if (el.valid === true || el.valid === false) {
              el.valid = el.valid.toString();
            }
          });
        }
        res.workflowLogs.map((item, index) => {
          // 判断前一列值
          if (index > 0 && res.workflowLogs[index - 1].submitType === '-1') {
            item.submitType = '2';
          }
          datawork.push(item);
        });
        let resLength = res.workflowLogs.length;
        let lastItem = res.workflowLogs.length > 0 ? res.workflowLogs[resLength - 1] : {};
        //如果最后一个节点没有结束时间，当前就是最后一个节点
        if (!lastItem.endTime) {
          // this.curItem = res.pop();
          datawork = datawork.filter(v => v.endTime !== "");
        }
        // console.log(datawork);
        this.opiniondata = datawork;
        this.$refs.opinionTable.internalData = this.opiniondata;
        // console.log(this.opiniondata);
      });
    },
    createLang () {
      const sessions = [this.language.unaudited, this.language.beaudited, this.language.auditfail, this.language.auditpass, this.language.withdrawn, this.language.waitaudit];
      sessions.forEach((s, i) => {
        this.source.parentDictOptions.push({ value: i.toString(), label: s });
      });
      const submittype = [this.language.recall, this.language.falgredo, this.language.falgpass, this.language.submit];
      submittype.forEach((s, i) => {
        this.source.submitTypeOptions.push({ value: (i - 1).toString(), label: s });
      });
      this.rules.passFlag = [
        { required: true, message: this.language.common.mustwrite, trigger: 'change' }
      ];
      this.rules.reviewComment = [
        { required: true, message: this.language.common.mustwrite, trigger: 'change' }
      ];
    },
    checkSubmit (formName) {
      kindo.util.confirm(this.language.common.istrue, this.language.common.tips, "warning", async () => {
        let redata = [];
        this.$refs.reviewTable.internalData.map(item => {
          if (!item.id && item.valid) {
            let param = {
              detail: item.detail,
              graphAuditCode: item.graphAuditCode,
              graphId: this.rowdata.schemeGraphId,
              valid: item.valid
            };
            redata.push(param);
          }
        });
        let jsonData = {
          schemeGraphId: this.rowdata.schemeGraphId,
          taskId: this.rowdata.taskId,
          variables: this.variables,
          auditItems: redata
        };
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http
            .postJson(this.api.submit, jsonData)
            .then(data => {
              this.childVisible = false;
              this.$emit('reload');
              kindo.util.alert(this.language.common.successfully, this.language.common.tips, 'success');
            });
          }
        });
      });
    },
    isCenter({ row, column, rowIndex, columnIndex }) {
      return "text-align: center";
    },
    // 下拉时更新必填
    selectChange(val, type) {
      if (val === "0") {
        this.rules.reviewComment = [
          { required: true, message: this.language.common.mustwrite, trigger: 'change' }
        ];
      } else {
        this.rules.reviewComment = [];
      }
    },
    handleClick(tab) {
    },
    onDownload() {
      this.rowdata.imageList = this.baList ? this.baList : [];
      this.$emit("down-click", this.rowdata);
      // kindo.util.alert('下载成功', '提示', 'success');
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
  .maincenter{
    text-align: center;
  }
  .magb {
    float: left;
    width: 100%;
    margin-bottom: 20px;
  }
  .maincenterclass {
    width: 100%;
    text-align: center;
  }
  /deep/ .el-input-group>.el-input__inner {
    height: 30px;
  }
  .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .imgclass {
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
