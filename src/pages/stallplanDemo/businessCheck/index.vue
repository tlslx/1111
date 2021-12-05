<template>
  <el-page class="area">
    <!-- 查看页面 -->
    <template v-if="showState" slot="body" >
      <reviewForm :applyEntity='entityData' :languageSource='languageSource' :fileDatas="fileDatas" />
      <approval :itemData='arrData' :currentItem='curItem' :itemFlag='itemFlag' :applyEntity='entityData' :languageSource='languageSource' />
    </template>
    <!-- 修改页面 -->
    <template v-else slot="body" >
      <apply-form :languageSource='languageSource'></apply-form>
      <label-item :data='arrData' :languageSource='languageSource'></label-item>
    </template>
  </el-page>
</template>

<script>
import config from './components';
import { Loading } from 'element-ui';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'businessCheck',
  mixins: [listPageBase],
  components: {
    'reviewForm': () => import('./components/reviewForm.vue'),
    'approval': () => import('./components/approval.vue'),
    'applyForm': () => import('../applyDialog/index.vue'),
    'labelItem': () => import('./components/labelItem.vue')
  },
  data () {
    return {
      'pageId': 'stallplanDemo/businessCheck',
      config,
      arrData: [],
      entityData: {},
      curItem: {},
      itemFlag: true,
      showState: true,  //修改(false)和查看(true)页面显示状态
      fileDatas: [], //文件对象的值
      //国际化内容值
      'languageSource': {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {},
        'AdjustmentApply': {},
        'CheckProgress': {}
      }
    };
  },
  created () {
    this.getDetail();
    //读取国际化
    this.languageSource.LocationLang = kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = kindo.util.getLanguage('AdjustmentApply');
    this.languageSource.CheckProgress = kindo.util.getLanguage('CheckProgress');
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('scroll', this.handleScroll);
    });
    // window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    getDetail () {
      let scopeRow = this.$route.query.scopeRow;
      let tag = this.$route.query.tag ? this.$route.query.tag : '';
      let right = this.$route.query.right ? this.$route.query.right : '';
      let applicationId = scopeRow.applicationId;
      let params = { 'json': { "applicationId": applicationId, "taskEntities": [{ "curActId": (scopeRow.curActId ? scopeRow.curActId : scopeRow.taskEntities[0].curActId) }] }};
      const loading = Loading.service({
        lock: true
      });
      let url = this.config.api.getApplyListDetails; //查看详情请求
      if (right === 'review') { //审核查看详情
        url = this.config.api.getApplyReviewDetails;
      }
      this.$http.get(url, params)
        .then(res => {
          loading.close();
          let resData = res.actLogEntities;
          let resLength = resData.length;
          let lastItem = resData.length > 0 ? resData[resLength - 1] : {};
          this.entityData = res.applying;
          this.itemFlag = res.submit;
          //如果最后一个节点没有结束时间，当前就是最后一个节点
          if (!lastItem.endTime) {
            this.curItem = resData.pop();
          }
          if (tag === 'adjustmentApply') {
            this.showState = !res.submit; //true 就表示是修改页面，false就是查看页面
          } else {
            this.showState = true;
          }
          this.arrData = resData.filter(v => v.endTime !== "");
        });
    },
    handleScroll () {
      // let scrolled = document.documentElement.scrollTop || document.body.scrollTop;
    }
  }
};
</script>

<style scoped>
.area {
  overflow-y: auto;
}
</style>
