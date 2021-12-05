/**
 * @file 设置VIP企业筛选条件
 */
<style scoped>
  .generate-vip-list {
    padding: 10px 0;
    text-align: center;
  }
  .set-vip-list {
    padding: 20px 15%;
  }
  .generate-vip-operation {
    text-align: center;
    width: 100%;
  }
</style>
<template>
  <el-page ref="generateVIP">
    <template slot="body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="设置VIP企业筛选条件" name="0">
          <cust-table class="generate-vip-list" :cols="cols" :data="data" :loading="loading"></cust-table>
          <el-form :inline="true" v-if="hack" :model="formInline" class="set-vip-list">
            <template v-for="(item, index) in vipFormStandard">
              <el-form-item :key="index" :label="item.label + '：'" label-width="160px">
                <date-view
                  v-if="item.type === 'time'"
                  :readonly="readonly"
                  @date-change="dateChange"
                  :defaultValue="item.defaultValue">
                </date-view>
                <el-input v-if="item.type === 'input'" v-model="item.defaultValue" placeholder="请输入内容"></el-input>
              </el-form-item>
            </template>
          </el-form>
          <div class="generate-vip-operation">
            <el-button type="primary" @click="editInfo">编辑</el-button>
            <el-button type="warning" @click="generateInfo">生成</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
      <vip-enterprise-edit
        :vipEnterpriseEditInfo="vipEnterpriseEditInfo"
        @close-edit-form-table="closeEditFormTable">
      </vip-enterprise-edit>
    </template>
  </el-page>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import dateView from "@/components/project/onlineService/common/dateView.vue";
import VIPEnterpriseEdit from "@/components/project/onlineService/enterpriseManage/vipEnterpriseEdit";
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'generateVIP',
  components: {
    'cust-table': custTable,
    'date-view': dateView,
    'vip-enterprise-edit': VIPEnterpriseEdit
  },
  data() {
    return {
      activeName: 0,
      hack: true,
      readonly: true,
      loading: true,
      cols: [
        {
          "prop": "periods",
          "label": "期数"
        },
        {
          "prop": "digit",
          "label": "品牌展位数(>=标准展位数)"
        }
      ],
      formInline: {},
      vipEnterpriseEditInfo: {
        dialogVisible: false,
        vipStandardData: []
      }
    };
  },
  created() {
    let _this = this;
    this.getSessionInfo().then(res => {
      this.getVIPStandards(res.session).then(response => {
        _this.loading = false;
      }).catch(e => {
        _this.loading = false;
      });
    });
  },
  computed: {
    ...mapGetters('generateVIP', ['vipFormStandard', 'vipStandard', 'vipTimeStandard', 'vipConsecutiveSessions', 'vipTableStandard']),
    ...mapGetters('common', ['session']),
    data() {
      return {
        id: 'ef-os_vipczq_scspvip_gzbzsv_',
        data: this.vipStandard
      };
    }
  },
  methods: {
    ...mapActions('common', ['getSessionInfo']),
    ...mapActions('generateVIP', ['getVIPStandards', 'generateVIPEnterprise']),
    handleClick() {

    },
    dateChange(val) {

    },
    editInfo() {
      this.vipEnterpriseEditInfo.dialogVisible = true;
      this.vipEnterpriseEditInfo.vipStandard = this.vipStandard;
      this.vipEnterpriseEditInfo.vipTableStandardData = this.vipTableStandard;
    },
    // 点击生成按钮生成数据
    generateInfo() {
      this.generateVIPEnterprise();
      this.$router.push('/VIPEnterpriseList');
    },
    // 关闭弹出框
    closeEditFormTable() {
      this.vipEnterpriseEditInfo.dialogVisible = false;
    }
  },
  watch: {
    vipFormStandard(newVal) {
      this.hack = false;
      this.$nextTick(() => {
        this.hack = true;
      });
    }
  }
};
</script>
