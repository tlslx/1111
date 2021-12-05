/**
 * @components 短信收件人
 * @date:2019/5/8
*/
<template>
  <div>
    <div class="table-contain">
      <span>广交会组展业务手机短信接收专员（每交易团填报1-2人，其中一人需为商务主管部门人员）</span>
      <!-- style="width: 100%" max-height="400" v-loading="hasloading" -->
      <el-form :inline="true" :model="queryFormInline" ref="queryFormInline">
        <el-form-item label="单位名称" prop="deptName">
          <el-input placeholder="请输入" v-model="queryFormInline.deptName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="above-table">
        <el-button v-right.exp type="text" class="download" @click="downloadList">下载XLS</el-button>
      </div>
      <el-table border :data="smsListData.records">
        <el-table-column prop="deptName" label="单位名称"></el-table-column>
        <el-table-column prop="smsRecipient" label="姓名"></el-table-column>
        <el-table-column prop="smsPhone" label="手机号"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleMod(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-button v-right.add class="newAddBtn" type="primary" @click="handleRouterPushNew" :disabled="this.buttonVis">新增短信接收专员</el-button>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="smsListData.total">
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SmsRecipient",
  data() {
    return {
      queryFormInline: { deptName: '' },
      pageInfoData: {
        currentPage: 1,
        pageSize: 10
      },
      buttonVis: false // 暂时不禁用
    };
  },
  computed: {
    ...mapGetters('exhibitContact', ['smsListData']),
    queryParams() {
      return {
        deptName: this.queryFormInline.deptName,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  created() {
    this.queryList();
  },
  methods: {
    ...mapActions('exhibitContact', ['getListSms']),
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupSmsReceiving/download?${this.encodeSearchParams(this.queryFormInline)}`);
    },
    handleQuery() {
      this.pageInfoData = { currentPage: 1, pageSize: 10 };
      this.getListSms(this.queryParams).then(res => { // 查询按钮
        if (this.smsListData.records.length >= 2) {
          this.buttonVis = true;
        }
      });
    },
    queryList() { // 方法
      this.getListSms(this.queryParams).then(res => {
        if (this.smsListData.records.length >= 2) {
          this.buttonVis = true;
        }
      });
    },
    // 修改
    handleMod(row) {
      this.$router.push({ path: '/editSmsRecipient', query: { row }});
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getListSms(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getListSms(this.queryParams);
    },
    handleRouterPushNew() {
      this.$router.push({ path: '/addSmsRecipient' });
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
