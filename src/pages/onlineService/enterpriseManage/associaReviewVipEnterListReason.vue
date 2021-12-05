/**
 * @file 商协会审核VIP企业原因
 */
<style scoped>

</style>

<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="商协会审核VIP企业" name="first" v-loading="loading">
      <!-- form表单 -->
      <el-form :model="formData" label-width="60%" label-position="right" style="width: 50%; margin-top: 30px;" size="mini">
        <el-form-item label="企业名称：">
          <span>{{ formData.companyName }}</span>
        </el-form-item>
        <el-form-item label="广交会企业编码：">
          <span>{{ formData.cantonCode }}</span>
        </el-form-item>
        <el-form-item label="商协会：">
          <span>{{formData.businessAssociation}}</span>
        </el-form-item>
        <el-form-item label="交易团：">
          <span>{{formData.businessDelegation}}</span>
        </el-form-item>
        <el-form-item label="推荐来源：">
          <span>{{formData.recommendSource}}</span>
        </el-form-item>
        <el-form-item label="审核意见：" prop="approveResult">
          <el-input type="textarea" :rows="5" v-model="formData.approveResult"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pass">通过</el-button>
          <el-button @click="noPass">不通过</el-button>
          <el-button @click="cancelReview">取消评审</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      aa: 'right',
      rules: [],
      activeName: 'first',
      formData: {},
      loading: false,
      date: null,
      // 审核VIP企业传参
      reviewEnterParams: {
        "efOsVipCompanyInfos": []
      },
      initParams: {
        "orderModelField": [
          {
            "orderByField": "",
            "asc": false
          }
        ],
        "customQueryParams": [
          {
            "name": "session",
            "findType": "EQ",
            "joinType": "And",
            "values": []
          }
        ],
        "pageIndex": 0,
        "pageSize": 10
      }
    };
  },
  mounted() {
    if (this.$route.query) {
      this.formData = JSON.parse(JSON.stringify(this.$route.query)).row;
      if (JSON.parse(JSON.stringify(this.$route.query)).date) {
        this.date = JSON.parse(JSON.stringify(this.$route.query)).date;
      }
    }
  },
  computed: {
  },
  methods: {
    ...mapActions('reviewVipEnterList', ['reviewVipEnterInfo']),
    ...mapActions('generateVIP', ['selectVIPEnterList']),
    handleClick() {
    },
    // 通过
    pass() {
      this.loading = true;
      let canBePass = true;
      if (new Date().getTime() > new Date(this.date).getTime()) {
        canBePass = false;
      }
      if (canBePass) {
        this.reviewEnterParams.efOsVipCompanyInfos.push(JSON.parse(JSON.stringify(this.formData)));
        if (this.reviewEnterParams.efOsVipCompanyInfos.length > 0) {
          this.reviewEnterParams.efOsVipCompanyInfos.forEach((value, index, array) => {
            value.businessApproveResult = '1';
            value.recommendStatus = value.recommendStatus === '已推荐' ? '1' : '2';
            value.recommendSource = '1';
          });
        }
        this.reviewVipEnterInfo(this.reviewEnterParams).then(res => {
          this.$message({
            type: 'success',
            message: '设置成功'
          });
        }).catch(e => {
          this.$message({
            showClose: true,
            message: '失败',
            type: 'error'
          });
        });
      } else {
        this.$message({
          showClose: true,
          message: '超出评选时间，审核失败',
          type: 'error'
        });
      }
      this.loading = false;
      this.$router.push('/associaReviewVipEnterList');
    },
    // 不通过
    noPass() {
      let canBePass = true;
      if (new Date().getTime() > new Date(this.date).getTime()) {
        canBePass = false;
      }
      if (canBePass) {
        this.reviewEnterParams.efOsVipCompanyInfos.push(JSON.parse(JSON.stringify(this.formData)));
        if (this.reviewEnterParams.efOsVipCompanyInfos.length > 0) {
          this.reviewEnterParams.efOsVipCompanyInfos.forEach((value, index, array) => {
            value.businessApproveResult = '2';
            value.recommendStatus = value.recommendStatus === '已推荐' ? '1' : '2';
            value.recommendSource = '1';
          });
        }
        this.reviewVipEnterInfo(this.reviewEnterParams).then(res => {
          this.$message({
            type: 'success',
            message: '设置成功'
          });
        }).catch(e => {
          this.$message({
            showClose: true,
            message: '失败',
            type: 'error'
          });
        });
      } else {
        this.$message({
          showClose: true,
          message: '超出评选时间，审核失败',
          type: 'error'
        });
      }
      this.$router.push('/associaReviewVipEnterList');
    },
    // 取消评审
    cancelReview() {
      this.$router.push('/associaReviewVipEnterList');
    }
  }
};
</script>

