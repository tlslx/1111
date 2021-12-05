<template>
  <el-container>
    <el-main >
      <el-row type="flex" justify="center">
        <div class="title" :style="{ color: colorValue }">
          <span>{{detailInfo.exhibitionAreaName}}</span>
        </div>
      </el-row>
      <el-row type="flex" justify="center" class="m-content" v-loading.fullscreen.lock="ladingState">
        <table width="400" align="center" style="margin:0 auto;">
          <tbody>
            <tr>
              <td width="100" height="30" align="right">{{languageSource.LocationLang.introduce}}</td>
              <td width="300">
                <span>{{detailInfo.desc}}</span>
              </td>
            </tr>
            <tr>
              <td height="30" align="right">{{languageSource.LocationLang.session}}</td>
              <td>
                <span>{{detailInfo.sessionNumber}}</span>
              </td>
            </tr>
            <tr>
              <td height="30" align="right">{{languageSource.LocationLang.updateTime}}</td>
              <td>
                <span>{{detailInfo.modifyDate}}</span>
              </td>
            </tr>
            <tr>
              <td height="30" align="right">{{languageSource.LocationLang.drawingType}}</td>
              <td>
                <img title="pdf" src="../../../../../static/img/stallplan/pdf.gif">
              </td>
            </tr>
            <tr>
              <td height="30" align="right">{{languageSource.LocationLang.fileSize}}</td>
              <td>
                <span >{{detailInfo.fileSize}}</span>
              </td>
            </tr>
            <tr>
              <td height="30" align="right"></td>
              <td>
                <img src="../../../../../static/img/stallplan/download.gif" width="13" height="12">
                <span class="downLoad">{{languageSource.AdjustmentApply.download}}</span>
                <!-- <span ><a href="/fileserver/cantonfair/tezhuang/paper/125_Chemical Products_201902150253515351479_0.pdf">下载</a></span> -->
              </td>
            </tr>
          </tbody>
        </table>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 20px">
        <el-button @click="backMain" >{{languageSource.AdjustmentApply.backBtn}}</el-button>
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
    'itemRow': {
      'type': Object
    }
  },
  data() {
    return {
      config,
      ladingState: false,
      detailInfo: {}
    };
  },
  mounted () {
    this.getDetailInfo(this.itemRow);
  },
  methods: {
    //返回主页面
    backMain () {
      this.$emit('back');
    },
    //查询详情记录
    getDetailInfo (row) {
      this.ladingState = true;
      let param = {
        sessionNumber: row.sessionNumber,
        exhibitionAreaName: row.exhibitionAreaName
      };
      this.$http.get(this.config.api.getPublishDrawDetail, param)
        .then(res => {
          this.detailInfo = res;
          this.ladingState = false;
        });
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
.m-content table, .m-content td {
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #CCC;
  padding: 5px;
  text-align: center;
  font-size: 14px;
}
.downLoad {
  text-decoration: underline;
}
.downLoad:hover {
  cursor: pointer;
}
</style>

