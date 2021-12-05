/**
 * @file 企业展品管理---安全管理通知
*/
<style scoped>
.notice-wapper {
  width: 80%;
  margin: 0 auto;
}
.notice-wapper h3 {
  color: red;
  text-align: center;
}
.notice-wapper p {
  text-indent: 2em;
  line-height: 2;
}
.tonext {
  margin: 10px auto;
  width: 100%;
  text-align: center;
}
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="安全管理通知" name="first">
      <div class="notice-wapper">
        <h3>关于切实做好中国进出口商品交易会刀具展样品参展安全管理工作的通知</h3>
        <p>各交易团、商/协会：</p>
        <p>为进一步加强广交会安全管理工作，切实做好广交会参展刀具展样品的申报、保管、检查、管理和防控，现将广交会刀具展样品安全管理的相关要求，通知如下：</p>
        <p>一、广交会所有刀具参展样品必须实行报备登记，指定专人管理，落实安全防范管理措施。</p>
        <p>二、参展之前，刀具类参展企业须如实填报《广交会刀具展样品报备登记表》，并在筹展工作开始前提交各自交易团。请参展企业尽量采用替代品或图片、视频等展示，减少实物刀具数量。</p>
        <p>三、展会期间，刀具展样品从进馆筹展开始至撤展包装离场，企业须指定专人负责管理，每天做好刀具数量的清点，如有遗失及时报告大会保卫办。开展期间，不得再携带刀具展样品进馆。</p>
        <p>四、展示期间，参展刀具样品均须入柜，存放刀具的展柜必须带锁。不得在展馆内赠送、买卖刀具展样品。</p>
        <p>五、请各交易团配合保卫办落实好刀具管理的相关工作。</p>
        <p>（一）做好本团刀具展样品管理的安全防范宣传教育。</p>
        <p>（二）做好本团刀具类参展企业的信息采集工作，每期开幕前3天上午10:00将本期刀具参展企业填报的纸质《广交会刀具展样品报备登记表》收集并复核盖章后，连同本团填报的《中国进出口商品交易会刀具展览企业情况汇总表》，统一报大会保卫办备案（可以快递报送，不接受企业自行报表），电子版本《汇总表》请提前发大会保卫办电子邮箱。 </p>
        <p>（三）做好展会期间刀具管理的自查自纠工作，督促企业落实防范措施，配合大会保卫办进行现场检查。 </p>
        <p>六、大会保卫办负责检查刀具参展企业申报和防范措施落实情况。如有以下情形：</p>
        <p>（一）未提前申报刀具展品；</p>
        <p>（二）申报情况不实；</p>
        <p>（三）未按要求将刀具展样品入柜上锁；</p>
        <p>（四）现场赠送、买卖刀具。</p>
        <p>大会保卫办将依照大会相关规定，责令现场整改或清理展样品出馆。情节严重或涉嫌违反相关法律法规，大会保卫办将依法追究相关企业及责任人法律责任。</p>
        <p>七、参展企业有向大会保卫办反映敏感地区人员或可疑人员询问、订购、采买管制刀具从事不法活动的线索的义务和权利。</p>
        <p>八、请各交易团将1名配合大会保卫办落实刀具展览管理的工作人员名单10月8日前报大会保卫办电子邮箱，内容是姓名、手机号、微信号、电子邮箱号。</p>
        <p>九、弓弩、园艺刀剪等带有杀伤性工具参照刀具管理办法。</p>
        <p>大会保卫办电子邮箱 747954208@qq.com，保卫办电话：83129905,  联系人：区志鹏、手机号13802749990，孙文益,手机号13924013020。</p>
        <p>特此通知。</p>
      </div>
      <div class="tonext">
        <el-checkbox v-model="checked" @change="handleRead">已阅读</el-checkbox>
        <el-button type="primary" @click="toNext" :disabled="disabled">下一步</el-button>
        <el-button type="info" @click="toBack">取消</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      checked: false,
      disabled: true
    };
  },
  methods: {
    // 是否勾选已阅读
    handleRead(val) {
      if (val) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    // 勾选已阅读后去下一页
    toNext() {
      this.$router.push({
        path: "/registForm",
        query: this.$route.query
      });
    },
    // 返回上一页
    toBack() {
      this.$router.back();
    }
  }
};
</script>
