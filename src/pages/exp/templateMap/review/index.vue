<template>
  <el-page>
    <template slot="header">
      <!-- 下载弹框 -->
      <down-dialog ref="downDialog" :api="api" :language="source.language"/>
      <!-- 模板图审批弹框 -->
      <review-dialog ref="reviewDialog"  @down-click="onDownload" :api="api" :language="source.language" @reload="onResetQuery"/>
      <!--查询按钮栏-->
      <kindo-box :title="source.language.audit" icon="fa-search">
        <el-form :model="queryParams" ref="queryParams" label-position="right" inline label-width="90px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.mapname">
            <el-input v-model="queryParams.templateGraphName" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.staff">
            <el-input v-model="queryParams.creatorName" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" plain @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table :cell-style="isCenter" :url="api.get" ref="tempateTable" :queryParam="form" @selection-change="handleSelectionChange">
            <el-table-column width="50" type="selection" header-align="center">
            </el-table-column>
            <el-table-column prop="templateGraphName" :label="source.language.mapname" header-align="center" min-width="160" show-overflow-tooltip>
              <!-- <template slot-scope="scope">
                <el-button @click="onAction('review', scope.row)" type="text">{{scope.row.templateGraphName}}</el-button>
             </template> -->
            </el-table-column>
             <el-table-column prop="status" :label="source.language.approvalStatus" min-width="120"  align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span :style="{ color: scope.row.status === '0' || scope.row.status === '1' ? '#909399' : scope.row.status === '3' ? '#67C23A' : '#F56C6C' }">{{ kindo.dictionary.getLabel(source.status, scope.row.status) }}</span>
              </template>
            </el-table-column>
             <el-table-column prop="creatorName" :label="source.language.staff" min-width="160" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="pavilionCode" :label="source.language.hall" header-align="center" min-width="60" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="exhibitionHallCode" :label="source.language.exphall" header-align="center" min-width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="floorNum" :label="source.language.floor" header-align="center" min-width="60" show-overflow-tooltip>
            </el-table-column> -->
            <!-- <el-table-column prop="pavilienRegion" :label="source.language.pavilienRegion" header-align="center" min-width="60">
            </el-table-column> -->
            <el-table-column prop="standardBoothScale" :label="source.language.statistical" header-align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="boothNum" :label="source.language.boothNum" header-align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="isHasSpecialStandardBooths" :label="source.language.hasDiverse" header-align="center" min-width="180" show-overflow-tooltip
            :formatter="(row) => row.isHasSpecialStandardBooths === '0' ? source.language.no : source.language.have">
            </el-table-column>
            <el-table-column prop="mainChannelWidth" :label="source.language.main" header-align="center" min-width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="accessoryChannelsNumber" :label="source.language.subsidiary" header-align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="isHasIslandType" :label="source.language.island" header-align="center" min-width="100" show-overflow-tooltip
            :formatter="(row) => row.isHasIslandType === '0' ? source.language.no : source.language.have">
            </el-table-column>
            <el-table-column prop="version" :label="source.language.version" header-align="center" min-width="80" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="createDate" :label="source.language.time" min-width="160" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip></el-table-column>
             <el-table-column prop="buttomGraphName" :label="source.language.buttomGraphName" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="buttomGraphStatus" :label="source.language.buttomGraphStatus" min-width="120" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span :style="{ color: scope.row.buttomGraphStatus === '0' || scope.row.buttomGraphStatus === '1' ? '#909399' : scope.row.buttomGraphStatus === '3' ? '#67C23A' : '#F56C6C' }">
                  {{kindo.dictionary.getLabel(source.status, scope.row.buttomGraphStatus)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="buttomGraphVersion" :label="source.language.buttomGraphVersion" header-align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column :label="source.language.operation" fixed='right' min-width="160" align="center">
              <template slot-scope="scope">
                <el-button v-if="right('approval')" type="text" @click="onAction('review',scope.row)">{{source.language.viewApproval}}</el-button>
                <el-button v-if="right('download')" type="text" @click="onAction('down',scope.row)">{{source.language.download}}</el-button>
              </template>
            </el-table-column>
              <div slot="control">
                <el-button v-if="right('batchDownload')" type="primary" icon="el-icon-download" @click="onAction('down', selectedData)">{{source.language.batchDownload}}</el-button>
              </div>
          </kindo-table>
          
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>
<script>
  import common from '@/components/project/mixins/common';
  import listPageBase from '@/components/framework/mixins/listPageBase';
  export default {
    name: 'review',
    mixins: [common, listPageBase],
    data() {
      return {
        pageId: 'review',
        api: {
          get: kindo.config.api.expUrl + "/api/exp/templategraph/getAuditListPage",
          getById: kindo.config.api.expUrl + "/api/exp/templategraph/getById",
          submit: kindo.config.api.expUrl + "/api/exp/templategraph/auditTemplateGraph",
          viewpic: kindo.config.api.comsUrl + "/api/fs/view/"      // 查询图片
        },
        selectedData: [],
        queryParams: {
          templateGraphName: '',
          creatorName: '',
          status: ''
        }
        // source: {
        //   language: {}
        // }
      };
    },
    async created() {
      this._queryParams = Object.assign({}, this.queryParams);
    // 读取数据字典
    //   this.source.languageSelection = await kindo.dictionary.get('languageType');
    // 读取国际化
      // this.source.language = kindo.util.getLanguage('TemplateMapLang');
    },
    components: {
      'downDialog': () => import('../components/downDialog'),
      'reviewDialog': () => import('./components/reviewDialog')
    },
    mounted() {
      this.$nextTick(function () {
        this.onQuery();
      });
    },  
    methods: {
      onQuery() {
        this.$refs.tempateTable.reloadData();
      },
        // 重置
      onResetQuery() {
        this.queryParams = Object.assign({}, this._queryParams);
        this.$nextTick(function () {
          this.$refs.tempateTable.reloadData();
        });
      },
      handleSelectionChange(val) {
        this.selectedData = val;
      },
      // 公用触发方法
      onAction(form, row) {
        this.$refs[form + 'Dialog']['action'] = ''; 
        if (!(row instanceof Array) || this.selectedData.length > 0) {
          this.$refs[form + 'Dialog']['rowData'] = row;
          this.$refs[form + 'Dialog'][form + 'Visible'] = true;
        } else {
          this.$message({
            type: 'warning',
            message: this.source.language.selectedNeedData
          });
        }
        this.$nextTick(function () {
          this.$refs[form + 'Dialog']['action'] = form;
        });
      },
      // 下载
      onDownload(val) {
        this.$refs.downDialog.downVisible = true;
        this.$nextTick(function () {
          this.$refs.downDialog.rowData = val;
        });
      }
    },
    computed: {
      form: function () {
        return {
          queryParams: this.queryParams
        };
      }
    }
  };
</script>
<style lang="scss" scope>
</style>