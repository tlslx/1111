<template>
  <el-page ref="invitationStatistics">
    <template slot="header">
      <!--按钮栏-->
      <kindo-box title="邀请情况统计查询" icon="fa-search">
        <el-form inline ref="invitStatisticsForms" :model="invitStatisticsForms" label-position="right">
          <el-form-item label="邀请人类型" label-width="110px">
            <el-select v-model="invitStatisticsForms.inviterType" clearable placeholder="请选择" class="inputclass">
              <el-option v-for="item in source.inviterTypeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="目前状态" label-width="100px">
            <el-select v-model="invitStatisticsForms.state" clearable placeholder="请选择" class="inputclass">
              <el-option v-for="item in source.stateOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否办证" label-width="100px">
            <el-select v-model="invitStatisticsForms.hasBadge" clearable placeholder="请选择" class="inputclass">
              <el-option v-for="item in source.badgeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">查询</el-button>
            <el-button type="info" @click="onResetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <kindo-table ref="invitStatisticsTable" :url="api.get" :queryParam="statisticsForm">
          <el-table-column prop="inviterId" label="邀请人广交会编码" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="creatorName" label="邀请人/组织名称" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="inviterType" label="邀请人类型" show-overflow-tooltip min-width="150" :formatter="inviterTypeView"></el-table-column>
          <el-table-column prop="contactName" label="被邀请人姓名" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="enterpriseName" label="企业名称" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="phonenumber" label="手机号" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="state" label="状态" show-overflow-tooltip min-width="150" :formatter="stateView"></el-table-column>
          <el-table-column prop="hasBadge" label="是否办证" show-overflow-tooltip min-width="150" :formatter="badgeView"></el-table-column>
        </kindo-table>
      </kindo-box>
    </template>
  </el-page>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "invitationStatistics",
  mixins: [listPageBase],
  data() {
    return {
      // pageId: "invitationStatistics",
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiInvitationRecord/getCountData"
      },
      invitStatisticsForms: {
        inviterType: "",
        state: "",
        hasBadge: ""
      },
      source: {
        //邀请人类型
        inviterTypeOptions: [],
        //目前状态
        stateOptions: [{
          label: "未激活",
          value: 0
        }, {
          label: "已激活",
          value: 1
        }, {
          label: "未注册",
          value: 2
        }],
        //是否办证
        badgeOptions: [{
          label: "否",
          value: 0
        }, {
          label: "是",
          value: 1
        }]
      }
    };
  },
  computed: {
    statisticsForm: function () {
      return {
        queryParams: this.invitStatisticsForms
      };
    }
  },
  async created() {
    this._invitStatisticsForms = Object.assign({}, this.invitStatisticsForms);
    // 读取数据字典-邀请人类型
    this.source.inviterTypeOptions = await kindo.dictionary.get('templateUserType');
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    onQuery() {
      this.$refs.invitStatisticsTable.loadData();
    },
    onResetQuery() {
      this.invitStatisticsForms = Object.assign({}, this._invitStatisticsForms);
      this.$nextTick(function () {
        this.$refs.invitStatisticsTable.reloadData();
      });
    },
    // 邀请人类型过滤显示
    inviterTypeView(row) {
      let inviterLabel = row.inviterType;
      for (let i = 0; i < this.source.inviterTypeOptions.length; i++) {
        if (this.source.inviterTypeOptions[i].value === row.inviterType) {
          inviterLabel = this.source.inviterTypeOptions[i].label;
        }
      }
      return inviterLabel;
    },
    // 状态过滤显示
    stateView(row) {
      let stateLabel = row.state;
      for (let i = 0; i < this.source.stateOptions.length; i++) {
        if (this.source.stateOptions[i].value === row.state) {
          stateLabel = this.source.stateOptions[i].label;
        }
      }
      return stateLabel;
    },
    // 是否办证过滤显示
    badgeView(row) {
      let badgeLabel = row.hasBadge;
      for (let i = 0; i < this.source.badgeOptions.length; i++) {
        if (this.source.badgeOptions[i].value === row.hasBadge) {
          badgeLabel = this.source.badgeOptions[i].label;
        }
      }
      return badgeLabel;
    }
  }
};
</script>
<style>
</style>
