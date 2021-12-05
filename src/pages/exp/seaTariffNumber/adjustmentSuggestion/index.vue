<template>
  <el-page>
    <!-- 调整建议 -->
    <template slot="header">
      <!--新增编辑对话框-->
      <child-dialog :api="api" :year="queryParams.seaTariffNumber.year" @reload="onReload" ref="childDialog" />
      <!--导入对话框-->
      <import-dialog :api="api" :language="source.language" @reload="onReload" ref="importDialog" />
      <!-- 设置调整申请和建议反馈的截止日期 -->
      <deadline-dialog :api="api" :language="source.language" @reload="onResetQuery" ref="deadlineDialog" />
      <!--查询按钮栏-->
      <kindo-box :title="source.language.suggestion" icon="fa-search">
        <el-form :model="queryParams" ref="queryParams" label-position="right" size="small" inline label-width="85px" @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.year">
            <el-date-picker v-model="queryParams.seaTariffNumber.year" type="year" :placeholder="source.language.selectPlaceholder + source.language.year" class="inputclass" :editable="false" value-format="yyyy" format="yyyy" :clearable='false'>
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="source.language.commodityCode">
            <el-input v-model="queryParams.seaTariffNumber.code" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()" clearable></el-input>
          </el-form-item>
          <el-form-item :label="source.language.productName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="queryParams.seaTariffNumber.codeDesc" class="inputclass" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" plain @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="queryParams" label-width="90px" inline @submit.native.prevent @keyup.enter.native="onQuery" size="small">
          <el-form-item :label="source.language.catalogClassification">
            <el-select v-model="queryParams.seaTariffNumber.assortType" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.assortType" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.category">
            <el-select v-model="queryParams.seaTariffNumber.revisionType" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.revisionType" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.extension">
            <el-select v-model="queryParams.seaTariffNumber.proposedExtension" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.proposedExtension" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.exhibitionArea">
            <el-select v-model="queryParams.areaCode" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.areaCode" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">

      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table :cell-style="isCenter" :url="api.get" ref="tableData" :queryParam="form">
            <el-table-column prop="seaTariffNumber.year" :label="source.language.year" header-align="center" min-width="100">
            </el-table-column>
            <!-- <el-table-column prop="initiator" :label="source.language.initiator" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column> -->
            <el-table-column prop="seaTariffNumber.code" :label="source.language.commodityCode" header-align="center" min-width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.codeDesc" :label="source.language.productName" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.assortType" :label="source.language.catalogClassification" header-align="center" min-width="100" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.assortType,row.seaTariffNumber.assortType)}" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.revisionType" :label="source.language.category" min-width="140" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.revisionType,row.seaTariffNumber.revisionType)}" show-overflow-tooltip></el-table-column>
            <el-table-column prop="seaTariffNumber.changeDescription" :label="source.language.changeDescription" min-width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="seaTariffNumber.originCode" :label="source.language.originalCode" header-align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.originName" :label="source.language.originalName" header-align="center" min-width="120" show-overflow-tooltip>
            </el-table-column>
            </el-table-column>
            <el-table-column prop="areaCode" :label="source.language.exhibitionArea" header-align="center" min-width="120" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.areaCode,row.areaCode)}" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="seaTariffNumber.proposedExtension" :label="source.language.extension" header-align="center" min-width="120" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.proposedExtension,row.seaTariffNumber.proposedExtension)}" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remark" :label="source.language.reason" header-align="center" min-width="160" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="status" :label="source.language.status" header-align="center" min-width="160" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.status,row.status)}">
            </el-table-column>
            <el-table-column :label="source.language.operation" fixed='right' min-width="160px" align="center">
              <template slot-scope="scope">
                <el-button type="text" v-if="right('edit')" v-show="scope.row.seaTariffNumber.revisionType !== '3' && scope.row.seaTariffNumber.assortType !== '0' && scope.row.seaTariffNumber.processed === null" @click="onAction('child','edit',scope.row)">{{source.language.edit}}</el-button>
                <el-button type="text" v-if="right('view')" @click="onAction('child','view',scope.row)">{{source.language.view}}</el-button>
                <el-button type="text" v-if="right('delete')" v-show="scope.row.seaTariffNumber.revisionType !== '3' && scope.row.seaTariffNumber.assortType !== '0' && scope.row.seaTariffNumber.processed === null " @click="onDelete(scope.row)">{{source.language.delete}}</el-button>
              </template>
            </el-table-column>
            <div slot="control">
              <el-button type="primary" v-if="right('import')" @click="onAction('import','import')" size="small">{{source.language.import}}</el-button>
              <el-button type="primary" v-if="right('add')" @click="onAction('child','add')" size="small">{{source.language.add}}</el-button>
              <el-button type="primary" v-if="right('export')" @click="onExport(queryParams)" size="small">{{source.language.export}}</el-button>
              <el-button type="primary" v-if="right('submit')" @click="onSubmit" size="small">{{source.language.submit}}</el-button>
              <el-button type="primary" v-if="right('deadline')" @click="onAction('deadline','deadline')" size="small">{{source.language.setDeadline}}</el-button>
            </div>
          </kindo-table>

        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>
<script>
import seaTariffNumber from '@/components/project/mixins/seaTariffNumber';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'adjustmentSuggestion',
  mixins: [seaTariffNumber, listPageBase],
  components: {
    'childDialog': () => import('./components/childDialog'),
    'importDialog': () => import('./components/importDialog'),
    'deadlineDialog': () => import('./components/deadlineDialog')
  },
  data() {
    return {
      pageId: 'adjustmentSuggestion',
      api: {
        get: kindo.config.api.expUrl + "/api/exp/tariff/recommend/getNumberAreaListPage",  // 获取列表数据
        add: kindo.config.api.expUrl + "/api/exp/tariff/recommend/addSeaTariffNumber", // 新增
        edit: kindo.config.api.expUrl + "/api/exp/tariff/recommend/updateSeaTariffNumber", // 编辑
        delSeaTariffNumber: kindo.config.api.expUrl + "/api/exp/tariff/recommend/delSeaTariffNumber", // 没有展区，删除是调整类别改为删除
        delSeaTariffNumberArea: kindo.config.api.expUrl + "/api/exp/tariff/recommend/delSeaTariffNumberArea",  // 展区存在删除
        getListByTariffNumberId: kindo.config.api.expUrl + "/api/exp/tariff/recommend/getListByTariffNumberId", // 删除展区时，先查看商品编码下有多少展区 
        getById: kindo.config.api.expUrl + "/api/exp/tariff/recommend/getWorkDepartArea",  // 编辑、查看数据
        getByCode: kindo.config.api.expUrl + "/api/exp/tariff/recommend/getEffectiveByCode", // 新增、编辑时根据改变的编码查询是否有已存在的编码数据 
        uploadUrl: kindo.config.api.expUrl + "/api/exp/tariff/recommend/importFile",  //上传文件
        getSchedule: kindo.config.api.expUrl + "/api/exp/tariff/recommend/getSchedule",  // 查看导入进度
        tariffNumberStart: kindo.config.api.expUrl + "/api/exp/tariff/recommend/tariffNumberStart", // 提交
        export: kindo.config.api.expUrl + "/api/exp/tariff/recommend/export",  // 导出
        deadline: kindo.config.api.expUrl + "/api/exp/setting/add",  // 设置截止日期
        isSubmited: kindo.config.api.expUrl + "/api/exp/tariff/recommend/getIsSend",   // 在渲染列表数据前先判断数据是否已经提交
        setTime: kindo.config.api.expUrl + "/api/exp/setting/get"  // 获取设置的截止时间
      },
      queryParams: {
        seaTariffNumber: {
          year: (new Date()).getFullYear().toString(),
          code: null,
          codeDesc: null,
          assortType: null,        // 目录分类
          revisionType: null,       // 调整类别
          proposedExtension: null // 建议展期
        },
        areaCode: null            // 建议展区
      },
      tariffNumberData: [] // 删除时，接收当前编码的展区数据
    };
  },
  async created() {
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    // 查询
    onQuery() {
      this.$refs.tableData.reloadData();
      this.isSend();    // 判断数据是否已经提交
    },
    // 重置
    onResetQuery() {
      this.queryParams = {
        seaTariffNumber: {
          year: (new Date()).getFullYear().toString(),
          code: null,
          codeDesc: null,
          assortType: null,        // 目录分类
          revisionType: null,       // 调整类别
          proposedExtension: null // 建议展期
        },
        areaCode: null            // 建议展区
      };
      this.$nextTick(function () {
        this.$refs.tableData.reloadData();
        this.isSend();    // 判断数据是否已经提交
      });
    },
    // 删除
    onDelete(row) {
      // 查询商品编码下有多少展区
      this.$http.get(this.api.getListByTariffNumberId, { id: row.seaTariffNumber.id }).then(res => {
        this.tariffNumberData = res;
      }).then(() => {
        // 无展区时，选择删除，若调整类别不是新增，则调整类别改为删除，操作列的修改和删除按钮隐藏，否则删除当前数据
        if (!this.tariffNumberData.length) {
          this.$confirm(row.seaTariffNumber.revisionType === '2' ? this.source.language.delData : this.source.language.changedToDelete, this.source.language.tips, {
            confirmButtonText: this.source.language.confirm,
            cancelButtonText: this.source.language.cancel,
            type: 'warning'
          }).then(() => {
            this.$http.get(this.api.delSeaTariffNumber, { id: row.seaTariffNumber.id }).then(data => {
              kindo.util.alert(this.source.language.successful, this.source.language.tips, 'success');
              this.onResetQuery();
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.source.language.undelete
            });
          });
          return;
        }
        // 有展区，选择删除，若当前展区只剩一个，则目录分类改变为剔除，否则只删除当前展区
        this.$confirm(this.tariffNumberData.length === 1 ? this.source.language.changedToCull : this.source.language.delData, this.source.language.tips, {
          confirmButtonText: this.source.language.confirm,
          cancelButtonText: this.source.language.cancel,
          type: 'warning'
        }).then(() => {
          this.$http.get(this.api.delSeaTariffNumberArea, { id: row.id }).then(data => {
            kindo.util.alert(this.source.language.successful, this.source.language.tips, 'success');
            this.onResetQuery();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.source.language.undelete
          });
        });
      });
    },
    // 提交
    onSubmit() {
      this.$confirm(this.source.language.isSubmit, this.source.language.tips, {
        confirmButtonText: this.source.language.confirm,
        cancelButtonText: this.source.language.cancel,
        type: 'warning'
      }).then(() => {
        this.$http.post(this.api.tariffNumberStart).then(res => {
          this.isSubmit = true;  // 有未完成流程的数据提交记录
          this.$message({
            type: 'success',
            message: this.source.language.successful
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.source.language.cancelledSubmission
        });
      });
    },
    onReload(year) {
      this.queryParams = {
        seaTariffNumber: {
          year: year,
          code: null,
          codeDesc: null,
          assortType: null,        // 目录分类
          revisionType: null,       // 调整类别
          proposedExtension: null // 建议展期
        },
        areaCode: null            // 建议展区
      };
      this.onQuery();
    }
  },
  watch: {
    "queryParams.seaTariffNumber.year"(v) {
      this.queryParams.seaTariffNumber.year = kindo.util.formatDate(v, "yyyy");
    },
    "queryParams.areaCode"(v) {
      this.queryParams.areaCode ? this.queryParams.areaCode = this.queryParams.areaCode : this.queryParams.areaCode = null;
    },
    "queryParams.seaTariffNumber": {
      handler(oldVal, newVal) {
        this.strToNull(newVal);     // 将对象属性的空字符串改为null
      },
      deep: true 
    }
  }
};
</script>
<style lang="scss" scope>
</style>