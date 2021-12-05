<template>
  <el-container>
    <el-header>
      <headline :label="languageSource.LocationLang.mainPageLabel" />
    </el-header>
    <el-main v-loading.fullscreen.lock="ladingState">
      <el-row type="flex" justify="center">
        <el-form :inline="true" :model="searchForm" label-position="left" label-width="85px" >
          <el-form-item :label="languageSource.LocationLang.orderBusiness" >
            <el-select v-model="searchForm.businessName" clearable placeholder="" >
              <el-option
                v-for="area in businessRows"
                :key="area.id"
                :label="area.label"
                :value="area.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onBusinessQuery">{{languageSource.LocationLang.lookUpDrawing}}</el-button>
          </el-form-item>
          <el-form-item :label="languageSource.LocationLang.orderCompany">
            <el-input :maxlength='255' v-model="searchForm.companyName" clearable ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onCompanyQuery">{{languageSource.LocationLang.lookUpDrawing}}</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row type="flex" justify="center">
        <div class="border-style">
          <div class="title-style" :style="{ color: colorValue }">
            {{languageSource.LocationLang.on}}{{sessionNumber}}{{languageSource.LocationLang.contentTitle}}
          </div>
          <p class="p-title" >
            {{languageSource.LocationLang.explain}}
          </p>
          <ul class="ul-style">
            <li style="display: none;"></li>
            <li>{{languageSource.LocationLang.firstContent}} </li>
            <li>{{languageSource.LocationLang.downloadAndSet}}<strong>Adobe Reader</strong>{{languageSource.LocationLang.browse}}
              <a class="blue" href="https://get.adobe.com/cn/reader/" target="_blank">{{languageSource.AdjustmentApply.download}} Adobe Reader</a></li>
          </ul>
          <el-row type="flex" justify="center">
            <el-col :span="7" class="last-col">
              <p class="part-title" :style="{ color: colorValue }" >{{languageSource.LocationLang.firstPart}}</p>
              <ul class="part-ul">
                <li v-for="(item, index) in resource['firstPart']" :key="index" class="item-li">
                  <a class="single-item" @click="itemClick(item)">{{item.exhibitionAreaName}}</a>
                </li>
              </ul>
            </el-col>
            <el-col :span="7" class="last-col" >
              <p class="part-title" :style="{ color: colorValue }" >{{languageSource.LocationLang.secondPart}}</p>
              <ul class="part-ul">
                <li v-for="(item, index) in resource['secondPart']" :key="index" class="item-li">
                  <a class="single-item" @click="itemClick(item)">{{item.exhibitionAreaName}}</a>
                </li>
              </ul>
            </el-col>
            <el-col :span="7" class="last-col" >
              <p class="part-title" :style="{ color: colorValue }" >{{languageSource.LocationLang.thirdPart}}</p>
              <ul class="part-ul">
                <li v-for="(item, index) in resource['thirdPart']" :key="index" class="item-li">
                  <a class="single-item" @click="itemClick(item)">{{item.exhibitionAreaName}}</a>
                </li>
              </ul>
            </el-col>
          </el-row>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import config from './index';
export default {
  name: 'publishSum',
  mixins: [listPageBase],
  props: {
    'languageSource': {
      'type': Object
    },
    'colorValue': {
      'type': String
    }
  },
  components: {
    'headline': () => import('../../components/headline.vue')
  },
  data () {
    return {
      config,
      'pageId': 'stallplanDemo/publishSum',
      'searchForm': {
        businessName: '',
        companyName: ''
      },
      'resource': {
        firstPart: [],
        secondPart: [],
        thirdPart: []
      },
      //交易团信息
      businessRows: [],
      ladingState: false,
      //届数信息
      sessionNumber: '',
      //展期信息
      exhibitionPeriodRow: [],
      //数据字典值
      exhibitionPeriodNum: [],
      //展区数据
      regionOfExhibition: [],
      //交易团选择值
      businessSelect: ''
    };
  },
  mounted () {
    this.getSessionNumber();
  },
  async beforeCreate () {
    //读取数据字典
    this.exhibitionPeriodNum = await kindo.dictionary.get('exhibitionPeriodNum'); //展期
    this.regionOfExhibition = await kindo.dictionary.get('exhibitionArea'); //展区
    let businessRows = await kindo.dictionary.get('tradingGroup'); //所属交易团
    let tempArray = [];
    businessRows.forEach((item, index) => {
      let obj = {
        id: item.id,
        label: item.label,
        value: item.label + ',' + item.value
      };
      tempArray.push(obj);
    });
    this.businessRows = tempArray;
  },
  methods: {
    //按交易团查询
    onBusinessQuery () {
      let businessName = this.searchForm.businessName;
      if (!businessName || businessName === '') {
        this.$message.warning(this.languageSource.LocationLang.businessTips);
        return false;
      }
      let itemRow = { sessionNumber: this.sessionNumber, businessDelegation: businessName };
      this.$emit('businessQuery', itemRow);
    },
    //按公司查询
    onCompanyQuery () {
      let companyName = this.searchForm.companyName;
      if (!companyName || companyName === '') {
        this.$message.warning(this.languageSource.LocationLang.companyTips);
        return false;
      }
      let itemRow = { sessionNumber: this.sessionNumber, companyNameCh: companyName };
      this.$emit('companyQuery', itemRow);
    },
    //单个展区点击
    itemClick (row) {
      this.$emit('itemClick', row);
    },
    //获取展会界数
    getSessionNumber () {
      this.ladingState = true;
      this.$http.get(this.config.api.getsessionNumber)
        .then(res => {
          this.sessionNumber = res.exhibitionNum;
          this.getExhibitionArea(res.exhibitionNum);
        });
    },
    //根据展届查展区
    getExhibitionArea (sessionNumber) {
      let param = {
        sessionNumber: sessionNumber
      };
      this.$http.get(this.config.api.getPublishDrawList, param)
        .then(res => {
          this.ladingState = false;
          this.resource.firstPart = res.filter(v => v.exhibitionPeriod === 1);
          this.resource.secondPart = res.filter(v => v.exhibitionPeriod === 2);
          this.resource.thirdPart = res.filter(v => v.exhibitionPeriod === 3);
        });
    }
  }
};
</script>

<style scoped>
.border-style {
  border: 1px solid #ddd;
  width: 746px;
  margin-top: 20px;
  min-height: 500px;
  line-height: 1.5;
  color: #666;
}
/* 颜色部分先用默认的蓝色，等到时候问下怎样获取当前主题颜色 */
.title-style {
  font-size: 22px;
  font-weight: 500;
  color: rgb(45, 146, 236);
  text-align: center;
  line-height: 220%;
  margin: 15px 0;
  font-family: "Microsoft Yahei";
}
.p-title {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
}
.ul-style {
  margin-bottom: 0px;
}
ul, li {
  list-style:none;
}
.blue:hover {
  color: #0066cc;
  line-height: 20px;
  text-decoration: underline;
  cursor: pointer;
}
.blue {
  color: #0497D4;
  line-height: 20px;
  text-decoration: underline;
}
.bg-purple {
  background: #d3dce6;
}
.first-col {
  padding-left: 10px;
}
.second-col {
  padding: 0px 5px;
}
.last-col {
  padding-right: 10px;
}
.part-title {
  padding: 5px 0 5px 20px;
  line-height: 25px;
  height: 25px;
  font-size: 14px;
  color: rgb(45, 146, 236);
  background: #f0f0f0;
}
.single-item {
  color: #333;
  text-decoration: none;
}
.single-item:hover {
  color: rgb(45, 146, 236);
  text-decoration: underline;
  cursor: pointer;
}
.item-li {
  text-decoration: underline;
  width: 190px;
  margin-left: 20px;
  margin-bottom: 5px;
  padding: 10px 0 0 25px;
  font-size: 14px;
  border-top: 1px solid #ffffff;
  background: url(../../../../../static/img/stallplan/ico_download.gif) left 12px no-repeat;
}
.part-ul {
  padding-left: 0px;
}
</style>
