<template>
  <el-container>
    <!-- 主页面 -->
    <main-page
      v-if="checkShow === 'mainPage'"
      :languageSource="languageSource"
      :colorValue='colorValue'
      @itemClick="itemClick"
      @businessQuery="businessQuery"
      @companyQuery="companyQuery"
    />
    <!-- 单个记录详情页面 -->
    <detail-table
      ref="detailTable"
      v-if="checkShow === 'detailTable'"
      :languageSource="languageSource"
      :colorValue='colorValue'
      :itemRow='itemRow'
      @back="backToMain"
    />
    <!-- 交易团查询表格 -->
    <business-table
      v-if="checkShow === 'businessTable'"
      :languageSource="languageSource"
      :colorValue='colorValue'
      :item='businessItem'
      :currentType="currentType"
      @back="backToMain"
    />

    <!-- 公司名称查询表格 -->
    <company-table
      v-if="checkShow === 'companyTable'"
      :languageSource="languageSource"
      :colorValue='colorValue'
      :item='companyItem'
      @back="backToMain"
      @companyClick="companyClick"
    />
  </el-container>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import config from './components/index';
export default {
  name: 'publishSum',
  mixins: [listPageBase],
  components: {
    'mainPage': () => import('./components/mainPage.vue'),
    'detailTable': () => import('./components/detailTable.vue'),
    'businessTable': () => import('./components/businessTable.vue'),
    'companyTable': () => import('./components/companyTable.vue')
  },
  data () {
    return {
      config,
      'pageId': 'stallplanDemo/publishSum',
      'languageSource': {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {},
        'AdjustmentApply': {},
        'CheckProgress': {}
      },
      colorValue: '', //获取默认的主题颜色
      currentPage: 'mainPage', //当前页面显示
      itemRow: {}, //点击的单条记录
      businessItem: {}, //交易团记录
      currentType: '', //当前状态
      companyItem: {} //公司信息
    };
  },
  created () {
    //读取国际化
    this.languageSource.LocationLang = kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = kindo.util.getLanguage('AdjustmentApply');
    this.languageSource.CheckProgress = kindo.util.getLanguage('CheckProgress');

    let primarycolor = this.$router.history.current.query.primarycolor;
    this.colorValue = '#' + primarycolor;
  },
  computed: {
    checkShow: function () {
      return this.currentPage;
    }
  },
  methods: {
    //单个展区点击
    itemClick (row) {
      this.itemRow = row;
      this.currentPage = 'detailTable';
    },
    //切换到主页面
    backToMain (currentType) {
      if (currentType && currentType === 'companyItem') {
        this.currentType = 'company';
        this.currentPage = 'companyTable';
      } else {
        this.currentPage = 'mainPage';
      }
    },
    //交易团查询点击
    businessQuery (item) {
      this.businessItem = item;
      this.currentType = 'business';
      this.currentPage = 'businessTable';
    },
    //公司名称查询点击
    companyQuery (item) {
      this.companyItem = item;
      this.currentType = 'company';
      this.currentPage = 'companyTable';
    },
    //单个公司点击
    companyClick (row) {
      this.businessItem = row;
      this.currentType = 'companyItem';
      this.currentPage = 'businessTable';
    }
  }
};
</script>

<style scoped>

</style>
