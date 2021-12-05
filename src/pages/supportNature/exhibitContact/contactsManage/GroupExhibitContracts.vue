/**
 * @components 组展单位联系人组件
 * @date:2019/5/8
 */
<template>
  <div class="inner-contain">
    <el-tabs v-model="activeName">
    <el-tab-pane label="组展单位联系人" name="first">
      <el-form :inline="true" :model="queryFormInline" ref="queryFormInline" class="query-form-inline">
        <el-form-item label="单位名称" prop="workUnitName">
          <el-input placeholder="请输入" v-model="queryFormInline.workUnitName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="table-contain">
      <span>商务主管部门（本表为商务主管部门人员的信息)</span>
      <div class="above-table">
        <el-button v-right.exp type="text" class="download" @click="downloadList">下载XLS</el-button>
      </div>
      <!-- style="width: 100%" max-height="400" v-loading="hasloading" -->
      <el-table border :data="groupExhibitContractsListData.records">
        <el-table-column prop="workUnitName" label="单位全称"></el-table-column>
        <el-table-column prop="" label="处级联系人">
          <el-table-column prop="departmentalContact" label="姓名"></el-table-column>
          <el-table-column prop="departmentalPosition" label="行政职务"></el-table-column>
          <el-table-column prop="departmentalFixedTelephone" label="固定电话">
            <el-table-column prop="departAreaNum" label="区号"></el-table-column>
            <el-table-column prop="departTelNum" label="号码"></el-table-column>
          </el-table-column>
        </el-table-column>

        <el-table-column prop="" label="第一联系人">
          <el-table-column prop="firstContact" label="姓名"></el-table-column>
          <el-table-column prop="firstContactPosition" label="行政职务"></el-table-column>
          <el-table-column prop="firstContactFixedTelephone" label="固定电话 "></el-table-column>
          <el-table-column prop="firstContactPhoneNumber" label="手机"></el-table-column>
          <el-table-column prop="firstContactFaxNumber" label="传真号码"></el-table-column>
          <el-table-column prop="firstContactMailingAddress" label="邮编地址"></el-table-column>
          <el-table-column prop="firstContactQq" label="QQ(选填)"></el-table-column>
          <el-table-column prop="firstContactWechat" label="微信号(选填)"></el-table-column>
        </el-table-column>

        <el-table-column prop="" label="第二联系人（商务主管部门人员，选填）">
          <el-table-column prop="secondContact" label="姓名"></el-table-column>
          <el-table-column prop="secondContactPosition" label="行政职务 "></el-table-column>
          <el-table-column prop="secondContactFixedTelephone" label="固定电话"></el-table-column>
          <el-table-column prop="secondContactPhoneNumber" label="手机"></el-table-column>
        </el-table-column>

        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleMod(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-button v-right.add class="newAddBtn" type="primary" @click="handleRouterPushNew" :disabled="this.buttonVis">新增组展单位联系人</el-button>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="groupExhibitContractsListData.total">
        </el-pagination>
      </el-row>
      </div>
    </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "GroupExhibitContracts",
  mixins: [listPageBase],
  data() {
    return {
      pageId: 'GroupExhibitContracts',
      activeName: 'first',
      queryFormInline: { workUnitName: '' },
      pageInfoData: {
        currentPage: 1,
        pageSize: 10
      },
      buttonVis: false
    };
  },
  computed: {
    ...mapGetters('exhibitContact', ['groupExhibitContractsListData']),
    queryParams() {
      return {
        workUnitName: this.queryFormInline.workUnitName,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  created() {
    this.getGroupExhibitContractsList(this.queryParams).then(() => {
      if (this.groupExhibitContractsListData.records.length >= 1) {
        this.buttonVis = true;
      }
    });
  },
  methods: {
    ...mapActions('exhibitContact', ['getGroupExhibitContractsList']),
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupContact/download?${this.encodeSearchParams(this.queryFormInline)}`);
    },
    handleQuery() {
      this.getGroupExhibitContractsList(this.queryParams);
    },
    // 修改
    handleMod(row) {
      this.$router.push({ path: '/editGroupExhibitContracts', query: { row }});
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getGroupExhibitContractsList(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getGroupExhibitContractsList(this.queryParams);
    },
    handleRouterPushNew() {
      this.$router.push({ path: '/addGroupExhibitContracts' });
    },
    encodeSearchParams(obj) { // 下载用
      const params = [];

      Object.keys(obj).forEach((key) => {
        let value = obj[key];
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
          value = '';
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='));
      });

      return params.join('&');
    }
  }
};
</script>
<style lang='less' scoped>
.pagination-contain {
  position: relative;
  padding: 10px 0;
  .newAddBtn {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
}
.above-table {
  position: relative;
  height: 30px;
  /deep/ .el-button {
    position: absolute;
    &.download {
      right: 0px;
    }
  }
}
</style>
