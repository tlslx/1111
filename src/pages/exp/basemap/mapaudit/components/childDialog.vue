<template>
  <div>
    <!--查看详情-->
    <el-dialog :title="language.audit" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="90%">
      <kindo-box>
        <kindo-table ref="childTable" :pagination="false">
          <el-table-column prop="buttomGraphName" :label="language.mapname" min-width="200" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="version" :label="language.version" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="pavilionCode" :label="language.hall" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="floorNum" :label="language.floor" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="description" :label="language.exphall" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="pillarNum" :label="language.posts" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createDate" :label="language.time" min-width="200" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip></el-table-column>
          <el-table-column prop="creatorName" :label="language.staff" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="isDefault" :label="language.default" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="isSpecial" :label="language.special" min-width="200" show-overflow-tooltip></el-table-column>
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
                <div class="maincenterclass"><img class="imgclass" :src="imgurl" alt="map"></div>
                <!-- <div class="maincenterclass">
                <viewer :images="imgList">
                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="4" v-for="src in imgList" :key="src"><div class="grid-content bg-purple"><img class="imgclass" :src="src" alt="map"></div></el-col>
                  </el-row>
                </viewer>
                </div> -->
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
      baList: ['5d19cf2b52faff00012257de', '5d1ac7c052faff0001225c01', '5d1aef2b52faff0001225d30'],
      curItem: {},
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
      this.variables.passFlag = "";
      this.variables.reviewComment = "";

      let params = {
        buttomGraphId: this.rowdata.buttomGraphId
      };
      let busparams = {
        businessKey: this.rowdata.buttomGraphId
      };
      this.$http.get(this.api.getbyid, params).then(res => {
        let dataset = [];
        this.child = res;
        this.imgurl = this.api.viewpic + res.pngFileId + '?gridBucket=BOOTH_CAD';
        // this.baList.map((item, index) => {
        //   let map = this.api.viewpic + item + '?gridBucket=BOOTH_CAD';
        //   this.imgList.push(map);
        // });

        this.$refs.mapSvg.action = 'add';
        this.child.length = res.length;
        this.child.width = res.width;
        this.child.area = res.area;

        dataset.push(res);
        this.$refs.childTable.internalData = dataset;
      }).then(() => {
        this.$http.get(this.api.getapprove, busparams).then(res => {
          let dataset = [];
          if (res.length) {
            res.map((item, index) => {
              // 判断前一列值
              if (index > 0 && res[index - 1].submitType === '-1') {
                item.submitType = '2';
              }
              dataset.push(item);
            });
            let resLength = res.length;
            let lastItem = res.length > 0 ? res[resLength - 1] : {};
            //如果最后一个节点没有结束时间，当前就是最后一个节点
            if (!lastItem.endTime) {
              this.curItem = res.pop();
              dataset = dataset.filter(v => v.endTime !== "");
            }
            this.opiniondata = dataset;
            this.$refs.opinionTable.internalData = this.opiniondata;
          } else {
            this.opiniondata = dataset;
            this.$refs.opinionTable.internalData = this.opiniondata;
          }
        });
      });
    },
    createLang () {
      const sessions = [this.language.unaudited, this.language.beaudited, this.language.auditfail, this.language.auditpass, this.language.withdrawn];
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
        let jsonData = {
          "buttomGraphId": this.rowdata.buttomGraphId,
          "businessKey": this.rowdata.workflowId,
          "id": this.rowdata.taskId,
          "actId": this.rowdata.actId,
          "variables": this.variables
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
