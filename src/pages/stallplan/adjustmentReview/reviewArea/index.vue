<template>
  <el-page class="area">
    <template slot="body" >
      <info :languageSource='languageSource'/>
      <business-select-table :tableData='tableData' :languageSource='languageSource'/>
      <gear :languageSource='languageSource'/>
      <checking :languageSource='languageSource'/>
      <approval :applicationIds="applicationIds" :languageSource='languageSource' />
    </template>
  </el-page>
</template>

<script>
import { Loading } from 'element-ui';
import config from '../components';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'areas',
  mixins: [listPageBase],
  components: {
    'info': () => import('./components/info'),
    'businessSelectTable': () => import('./components/businessSelectTable'),
    'gear': () => import('./components/gear'),
    'checking': () => import('./components/checking'),
    'approval': () => import('./components/approval')
  },
  data () {
    return {
      config,
      tableData: [], //关联的表格数据
      applicationIds: [], //applicationId的数组值
      languageSource: {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {},
        'AdjustmentApply': {}
      }
    };
  },
  async created () {
    this.getDetail();
    //读取国际化
    this.languageSource.LocationLang = await kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = await kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = await kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = await kindo.util.getLanguage('AdjustmentApply');
  },
  methods: {
    getDetail () {
      let params = { 'json': {
        "schemeId": this.$route.query.scopeRow.schemeId,
        "workFlowParam": {
          "businessKey": this.$route.query.scopeRow.schemeId
        }
      }};
      const loading = Loading.service({
        lock: true
      });
      this.$http.get(this.config.api.reviewArrangementGetDetail, params)
        .then((res) => {
          loading.close();
          let ids = [];
          this.tableData = res.list;
          for (let i = 0; i < res.list.length; i++) {
            ids.push(res.list[i].applicationId);
          }
          this.applicationIds = ids;
        });
    }
  }
};
</script>

<style scoped>
.area {
  overflow-y: auto;
}
</style>
