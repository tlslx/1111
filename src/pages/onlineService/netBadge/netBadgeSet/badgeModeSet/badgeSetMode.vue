<template>
  <div class="badgeSetModeBox">
    <kindo-box title="设置证件限制模式" v-loading="loading">
      <div class="baseInfo">
        <span>交易团编码：</span>
        <span>{{baseInfo.deptCode}}</span>
        <span>现在限制企业方式：</span>
        <span>{{baseInfo.indexJudgeType}}</span>
      </div>
      <kindo-box>
        <el-form :model="modeForm" inline label-width="150px" size="small" label-position="right">
          <el-form-item label="申请名额限制方式：">
            <el-select v-model="modeForm.indexJudgeType" placeholder="" :disabled="isReadOnly">
              <!-- <el-option v-for="item in numOption" :key="item.id" :label="item.name" :value="item.value"></el-option> -->
              <el-option key="1" label="按企业名额指标限制" value="COM"></el-option>
              <el-option key="2" label="按交易团名额指标限制" value="ORG"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit" :disabled="isReadOnly">确定</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
      <div class="tips">
        <p>注意：</p>
        <p>1.证件名额限制方式默认按企业名额限制，设置时只能由按企业名额限制方式改为按交易团名额限制方式；</p>
        <p>2.当证件服务中心已对限制方式进行设置时，交易团不能再进行设置。</p>
      </div>
    </kindo-box>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageId: "onlineService/netBadge/netBadgeSet/badgeModeSet/badgeSetMode",
      api: {
        //   getCurrentUserTradeInfo: 'http://10.28.124.108:9001/api/tradeRestrict/getCurrentUserTradeInfo',
        //   updateCurrentTradeRestrict: 'http://10.28.124.108:9001/api/tradeRestrict/updateCurrentTradeRestrict'
        getCurrentUserTradeInfo: kindo.config.api.osUrl + '/api/tradeRestrict/getCurrentUserTradeInfo',
        updateCurrentTradeRestrict: kindo.config.api.osUrl + '/api/tradeRestrict/updateCurrentTradeRestrict'
      },
      modeForm: {
        indexJudgeType: ''
      },
      baseInfo: {
        deptCode: '',
        indexJudgeType: '',
        id: ''
      },
      loading: false,
      isReadOnly: false
    };
  },
  created() {
    this.getCurrentUserTradeInfo();
  },
  methods: {
    getCurrentUserTradeInfo() {
      this.loading = true;
      this.$http.get(this.api.getCurrentUserTradeInfo)
        .then(res => {
          console.log(res);
          this.baseInfo = {
            deptCode: res.sysDepartment.deptCode,
            indexJudgeType: this.formatJudgeType(res.TradeInfo.indexJudgeType),
            id: res.TradeInfo.id
          };
          this.modeForm.indexJudgeType = res.TradeInfo.indexJudgeType || 'COM';
          this.isReadOnly = !(res.TradeInfo.selfSetting === '1');
          this.loading = false;
        });
    },
    submit() {
      if (this.isReadOnly) {
        kindo.util.alert('没有操作权限');
      }
      console.log(this.modeForm);
      const req = {
        id: this.baseInfo.id,
        indexJudgeType: this.modeForm.indexJudgeType
      };
      this.loading = true;
      this.$http.postJson(this.api.updateCurrentTradeRestrict, req)
        .then(res => {
          console.log(res);
          if (res.sign) {
            kindo.util.alert('操作成功');
            this.getCurrentUserTradeInfo();
          }
          this.loading = false;
        });
    },
    formatJudgeType(type) {
      switch (type) {
        case 'COM':
          return '按企业名额指标限制';
        case 'ORG':
          return '按交易团名额指标限制';
        default:
          return '按企业名额指标限制';
      }
    }
  }
};
</script>
<style lang="less" scoped>
.badgeSetModeBox {
  .baseInfo {
    & > :nth-of-type(2n) {
      color: red;
    }
  }
}
</style>
