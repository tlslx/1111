/**
 * @file 设置VIP企业服务范围
 */
<style scoped>
  .generate-vip-list {
    padding: 10px 0;
    text-align: center;
  }
  .set-vip-service-scope {
    padding: 20px 0;
  }
  .vip-service-scope-operation {
    text-align: center;
    width: 100%;
  }
  .vip-service-scope-checks {
    margin-left: 152px;
  }
  .scope-item {
    padding: 20px 0;
  }
</style>
<template>
  <el-page ref="setServiceScope">
    <template slot="body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="设置VIP企业服务范围" name="0" v-loading="loading">
          <div class="scope-item">
            <span>设置VIP企业服务范围：</span>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          </div>
          <el-checkbox-group class="scope-item vip-service-scope-checks" v-model="checkedServices" @change="handleCheckedChange">
            <el-checkbox v-for="service in serviceScopeList" :label="service" :key="service">{{service}}</el-checkbox>
          </el-checkbox-group>
          <div class="vip-service-scope-operation scope-item">
            <el-button type="danger" @click="confirm">确认</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </el-page>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'setEnterServiceScope',
  components: {
  },
  data() {
    return {
      activeName: 0,
      isIndeterminate: true,
      checkAll: false,
      checkedServices: [],
      serviceScopeList: ["联系人登记", "证件申请", "申请会议室", "参加论坛/活动", "推荐采购商", "调查问卷", "VIP参展商活动申请"],
      loading: false,
      serviceScopeData: [
        {
          "label": "联系人登记",
          "value": "1"
        },
        {
          "label": "证件申请",
          "value": "2"
        },
        {
          "label": "申请会议室",
          "value": "3"
        },
        {
          "label": "参加论坛/活动",
          "value": "4"
        },
        {
          "label": "推荐采购商",
          "value": "5"
        },
        {
          "label": "调查问卷",
          "value": "6"
        },
        {
          "label": "VIP参展商活动申请",
          "value": "7"
        }
      ]
    };
  },
  created() {
    this.loading = true;
    this.getSessionInfo().then(res => {
      this.selectVIPEnterServiceScope(res.session).then(response => {
        this.loading = false;
        this.getScopeServices();
      });
    });
  },
  computed: {
    ...mapGetters('common', ['session']),
    ...mapGetters('setEnterServiceScope', ['vipEnterServiceScopes'])
  },
  methods: {
    ...mapActions('common', ['getSessionInfo']),
    ...mapActions('setEnterServiceScope', ['addVIPEnterServiceScope', 'selectVIPEnterServiceScope']),
    getScopeServices() {
      let serviceScopeArray = [];
      if (this.vipEnterServiceScopes.serviceRage) {
        serviceScopeArray = this.vipEnterServiceScopes.serviceRage.split(',');
        if (serviceScopeArray.length > 0) {
          serviceScopeArray.forEach((value, index, array) => {
            this.serviceScopeData.forEach((optValue, optIndex, optArray) => {
              if (value.toString() === optValue.value) {
                this.checkedServices.push(optValue.label);
              }
            });
          });
        }
      }
    },
    handleClick() {

    },
    // 全选
    handleCheckAllChange(val) {
      this.checkedServices = val ? this.serviceScopeList : [];
      this.isIndeterminate = false;
    },
    // 选中
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.serviceScopeList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.serviceScopeList.length;
    },
    // 确认
    confirm() {
      let str = '';
      this.checkedServices.forEach((value, index, array) => {
        this.serviceScopeData.forEach((labelVal, labelIndex, labelArray) => {
          if (value === labelVal.label) {
            str += index !== (this.checkedServices.length - 1) ? labelVal.value + ',' : labelVal.value;
          }
        });
      });
      let currentObject = {};
      currentObject.session = this.session;
      currentObject.serviceRage = str;
      currentObject.vipCompanyServiceId = this.vipEnterServiceScopes.vipCompanyServiceId === "" ? "" : this.vipEnterServiceScopes.vipCompanyServiceId;
      this.loading = true;
      this.addVIPEnterServiceScope(currentObject).then(res => {
        this.loading = false;
        this.$message({
          type: 'success',
          message: '设置成功'
        });
        this.selectVIPEnterServiceScope(this.session);
      }).catch(e => {
        this.$message({
          showClose: true,
          message: '错误',
          type: 'error'
        });
      });
    }
  }
};
</script>
