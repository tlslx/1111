<template>
  <el-container>
    <el-main >
      <el-row type="flex" justify="center">
        <div class="title" :style="{ color: colorValue }">
          <span>{{languageSource.LocationLang.companyLabel}}</span>
        </div>
      </el-row>
      <el-row type="flex" justify="center" v-loading.fullscreen.lock="ladingState">
        <el-form :inline="true" :model="searchForm" label-position="left" label-width="85px" >
          <el-form-item :label="languageSource.LocationLang.companyName">
            <el-input :maxlength='255' v-model="searchForm.companyName" clearable ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onCompanyQuery">{{languageSource.LocationLang.lookUpDrawing}}</el-button>
            <el-button @click="backMain" >{{languageSource.AdjustmentApply.backBtn}}</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row type="flex" justify="center" >
        <div class="m-content">
          <p class="blue" :style="{ color: colorValue }">{{languageSource.LocationLang.companyPartTips}}</p>
          <ul class="part-ul">
            <li v-for="(item, index) in resultData" :key="index" class="item-li">
              <a class="single-item" @click="itemClick(item)">{{item.companyNameCh}}</a>
            </li>
          </ul>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import config from './index';
export default {
  mixins: [listPageBase],
  props: {
    'languageSource': {
      'type': Object
    },
    'colorValue': {
      'type': String
    },
    'item': {
      'type': Object
    }
  },
  data() {
    return {
      config,
      resultData: [],
      'searchForm': {
        companyName: ''
      },
      ladingState: false
    };
  },
  mounted() {
    this.searchForm.companyName = this.item.companyNameCh;
    this.onCompanyQuery();
  },
  methods: {
    //返回到主页面
    backMain () {
      this.$emit('back');
    },
    //公司查询
    onCompanyQuery () {
      let companyName = this.searchForm.companyName;
      if (!companyName || companyName === '') {
        this.$message.warning(this.languageSource.LocationLang.companyTips);
        return false;
      }
      let param = {
        sessionNumber: this.item.sessionNumber,
        companyNameCh: companyName
      };
      this.ladingState = true;
      this.$http.get(this.config.api.getPublishDrawList, param)
        .then(res => {
          this.ladingState = false;
          this.resultData = res;
        });
    },
    //单条公司记录点击
    itemClick (row) {
      this.$emit('companyClick', row);
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 22px;
  font-weight: 500;
  color: rgb(45, 146, 236);
  text-align: center;
  line-height: 220%;
  margin: 15px 0;
  font-family: "Microsoft Yahei";
}
.m-content {
  font-family: "Microsoft Yahei";
  width: 340px;
  padding: 20px 20px 20px 80px;
  background: #f7f7f7;
}
.blue {
  font-size: 14px;
  color: #0497D4;
  line-height: 20px;
  font-weight: bold;
}
ul, li {
  list-style:none;
}
.part-ul {
  padding-left: 0px;
}
.item-li {
  background: url(../../../../../static/img/stallplan/ico_O.gif) left no-repeat;
  padding-left: 30px;
  font-size: 14px;
  line-height: 30px;
  text-decoration: underline;
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
</style>
