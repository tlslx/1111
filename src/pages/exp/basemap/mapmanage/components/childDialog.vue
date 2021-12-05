<template>
  <div>
    <!--查看详情-->
    <el-dialog :title="language.view" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="90%">
      <kindo-box>
        <kindo-table ref="childTable" :pagination="false" :cell-style="isCenter">
          <el-table-column prop="buttomGraphName" :label="language.mapname" min-width="200" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="version" :label="language.version" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="pavilionCode" :label="language.hall" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="floorNum" :label="language.floor" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="exhibitionHallCode" :label="language.exphall" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="pillarNum" :label="language.posts" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createDate" :label="language.time" min-width="200" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip></el-table-column>
          <el-table-column prop="creatorName" :label="language.staff" min-width="200" show-overflow-tooltip></el-table-column>
          <el-table-column prop="isDefault" :label="language.default" min-width="200" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="isSpecial" :label="language.special" min-width="200" show-overflow-tooltip></el-table-column> -->
          <el-table-column prop="status" :label="language.state" min-width="200" header-align="center" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span :style="{ color: scope.row.status === '0' || scope.row.status === '1' ? '#909399' : scope.row.status === '3' ? '#67C23A' : '#F56C6C' }">{{ kindo.dictionary.getLabel(parentDictOptions, scope.row.status) }}</span>
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
                <!-- <el-form label-width="80px" inline class="maincenter">
                  <el-form-item :label="language.long">
                    <span v-text="child.length"></span>
                  </el-form-item>
                  <el-form-item :label="language.wide">
                    <span v-text="child.width"></span>
                  </el-form-item>
                  <el-form-item :label="language.area">
                    <span v-text="child.area"></span>
                  </el-form-item>
                </el-form> -->

                <!-- <div class="maincenter"><el-button type="primary" icon="el-icon-download" @click="onDownload">{{language.down}}</el-button></div> -->
              </el-tab-pane>
              <el-tab-pane label="CAD" name="second">
                <!-- <div class="maincenterclass">
                <viewer :images="imgList">
                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col :span="4" v-for="src in imgList" :key="src"><div class="grid-content bg-purple"><img class="imgclass" :src="src" alt="map"></div></el-col>
                  </el-row>
                </viewer>
                </div> -->
                <div class="maincenterclass"><img class="imgclass" :src="imgurl" alt="map"></div>
                <!-- <el-row type="flex" class="row-bg" justify="space-between">
                  <el-col :span="4"><div class="grid-content bg-purple"><img class="imgclass" :src="imgurl" alt="map"></div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple"><img class="imgclass" :src="imgurl" alt="map"></div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple"><img class="imgclass" :src="imgurl" alt="map"></div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple"><img class="imgclass" :src="imgurl" alt="map"></div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple"><img class="imgclass" :src="imgurl" alt="map"></div></el-col>
                </el-row> -->
                <!-- <el-form label-width="80px" inline class="maincenter">
                  <el-form-item :label="language.long">
                    <span v-text="child.length"></span>
                  </el-form-item>
                  <el-form-item :label="language.wide">
                    <span v-text="child.width"></span>
                  </el-form-item>
                  <el-form-item :label="language.area">
                    <span v-text="child.area"></span>
                  </el-form-item>
                </el-form> -->
              </el-tab-pane>
              <el-form label-width="80px" inline class="maincenter" :model="child" ref="child">
                  <el-form-item :label="language.long">
                    <el-input v-model="child.length" readonly class="input-w">
                      <template slot="append">m</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item :label="language.wide">
                    <el-input v-model="child.width" readonly class="input-w">
                      <template slot="append">m</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item :label="language.area">
                    <el-input v-model="child.area" readonly class="input-w">
                      <template slot="append">m^2</template>
                    </el-input>
                  </el-form-item>
                </el-form>
                <div class="maincenter"><el-button type="primary" icon="el-icon-download" @click="onDownload">{{language.down}}</el-button></div>
            </el-tabs>
          </el-col>
        </el-row>
      </kindo-box>
      <kindo-box v-show="opiniondata.length>0" :title="language.opinion">
        <kindo-table ref="opinionTable" :pagination="false" :cell-style="isCenter">
          <el-table-column prop="startTime" :label="language.startdate" min-width="180" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="endTime" :label="language.enddate" min-width="180" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="departmentName" :label="language.depart" min-width="120" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="userName" :label="language.auditor" min-width="120" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="actName" :label="language.node" min-width="120" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="submitType" :label="language.operation" min-width="120" :formatter="(row) => (row.submitType === null || row.submitType === '') ? row.actName : kindo.dictionary.getLabel(submitTypeOptions, row.submitType)" show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column prop="comment" :label="language.explain" min-width="200" show-overflow-tooltip header-align="center"></el-table-column>
        </kindo-table>
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
    },
    parentDictOptions: {
      type: Array,
      default: () => {
        return [];
      }
    },
    submitTypeOptions: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data () {
    return {
      action: "",
      rowdata: {},
      child: {
        length: '',
        width: '',
        area: ''
      },
      imgurl: "",
      imgList: [],
      baList: ['5d19cf2b52faff00012257de', '5d1ac7c052faff0001225c01', '5d1aef2b52faff0001225d30'],
      curItem: {},
      opiniondata: [],
      // source: {
      //   parentDictOptions: [],
      //   submitTypeOptions: []
      // },
      activeName: 'first',
      childVisible: false
    };
  },
  created () {
    // const sessions = [this.language.unaudited, this.language.beaudited, this.language.auditfail, this.language.auditpass, this.language.withdrawn];
    // sessions.forEach((s, i) => {
    //   this.source.parentDictOptions.push({ value: i.toString(), label: s });
    // });
    // const submittype = [this.language.recall, this.language.falgredo, this.language.falgpass];
    // submittype.forEach((s, i) => {
    //   this.source.submitTypeOptions.push({ value: (i - 1).toString(), label: s });
    // });
  },

  mounted() {
    this.$nextTick(function () {
    });
  },
  methods: {
    getView() {
      this.$refs.mapSvg.action = '';
      this.$refs.childTable.internalData = [];
      this.$refs.opinionTable.internalData = [];
      this.imgurl = '';
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
              // this.curItem = res.pop();
              dataset = dataset.filter(v => v.endTime !== "");
            }
            // console.log(dataset);
            this.opiniondata = dataset;
            this.$refs.opinionTable.internalData = this.opiniondata;
          } else {
            this.opiniondata = dataset;
            this.$refs.opinionTable.internalData = this.opiniondata;
          }
        });
      });
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
  .maincenter {
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
  .input-w {
    width: 150px;
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
