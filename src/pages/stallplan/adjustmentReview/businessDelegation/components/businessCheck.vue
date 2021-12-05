<template>
  <el-page class="area">
    <!-- 查看页面 -->
    <template v-if="showState" slot="body" >
      <reviewForm :applyEntity='entityData' :languageSource='languageSource'/>
      <approval :itemData='arrData' :currentItem='curItem' :itemFlag='itemFlag' :applyEntity='entityData' :languageSource='languageSource' />
    </template>
    <!-- 修改页面 -->
    <template v-else slot="body" >
      <apply-form :updateRow='entityData' :currentItem='curItem' :languageSource='languageSource'></apply-form>
      <label-item :data='arrData' :languageSource='languageSource'></label-item>
    </template>
  </el-page>
</template>

<script>
import config from '../../components';
import { Loading } from 'element-ui';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'businessCheck',
  mixins: [listPageBase],
  components: {
    'reviewForm': () => import('./reviewForm'),
    'approval': () => import('./approval'),
    'applyForm': () => import('../../../adjustmentApplition/components/applyDialog'),
    'labelItem': () => import('./labelItem')
  },
  data () {
    return {
      config,
      arrData: [],
      entityData: {},
      curItem: {},
      itemFlag: true,
      showState: true,  //修改(false)和查看(true)页面显示状态
      //国际化内容值
      'languageSource': {
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
      let scopeRow = this.$route.query.scopeRow;
      let tag = this.$route.query.tag ? this.$route.query.tag : '';
      let applicationId = scopeRow.applicationId;
      if (tag === 'adjustmentApply') {
        this.showState = scopeRow.applyStatus !== 4;
      } else {
        this.showState = true;
      }
      let params = { 'json': { "applicationId": applicationId, "workFlowParam": { "businessKey": applicationId }}};
      const loading = Loading.service({
        lock: true
      });
      let url = this.config.api.getApplyListDetails;
      if (tag === 'businessAssociation') { //商协会查看详情
        url = this.config.api.businessGetDetail;
      }
      this.$http.get(url, params)
        .then(res => {
          loading.close();
          let resData = res.workFlowLogData.data;
          let resLength = resData.length;
          let lastItem = resData.length > 0 ? resData[resLength - 1] : {};
          this.entityData = res.myApplyEntity;
          this.itemFlag = res.myFlag;
          //如果最后一个节点没有结束时间，当前就是最后一个节点
          if (!lastItem.endTime) {
            this.curItem = resData.pop();
          }
          this.arrData = resData.filter(v => v.endTime !== "");
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
