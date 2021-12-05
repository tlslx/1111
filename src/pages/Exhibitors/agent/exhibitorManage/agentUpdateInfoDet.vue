/**
* @file 招展代理 信息修改详情
* @author:
* @date:2019/6/6
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="信息修改详情" name="first">
      <el-form :inline="true" :model="searchForm" class="demo-ruleForm" >
        <el-form-item label="修改项:" prop="colname">
          <el-select placeholder="请选择" v-model="searchForm.colname" clearable>
             <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button @click="submitForm()" type="primary">查询</el-button>
        </el-form-item>
        <el-button @click="handleToInfoUpdate" type="primary" class="backRow">返回</el-button>
      </el-form>
      <template>
        <el-table
          :data="ruleForm"
          style="width: 100%;" border
          >
          <el-table-column
            prop="colnameCh"
            label="修改项"
            align="center"
            >
          </el-table-column>
          <el-table-column
            prop="oldContent"
            label="旧内容"
            align="center"
            >
          </el-table-column>
          <el-table-column
            prop="newContent"
            label="新内容"
            align="center"
            >
          </el-table-column>
        </el-table>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
import tableMixIn from "@/utils/helper/tableMixIn";
import { mapActions } from "vuex";
export default {
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      activeName: "first",
      searchForm: {
        colname: ""
      },
      options: [],
      modifyId: "",
      ruleForm: [],
      companyInfo: { companyId: '' }
    };
  },
  mounted() {
    // 修改信息详情 页面初始化
    this.modifyId = JSON.parse(this.$route.query.data);
    this.companyInfo.companyId = this.$route.query.companyId;
    let params = {
      "customQueryParams": [
        {
          "findType": "EQ",
          "joinType": "And",
          "name": "history_modify_id",
          "values": [
            JSON.parse(this.$route.query.data)
          ]
        }
      ]
    };
    this.getCompanyUpdateHistoryDetailInfo(params).then(res => {
      this.ruleForm = res.records;
      for (let items in res.records) {
        this.options.push({ value: res.records[items].colname, label: res.records[items].colnameCh });
      }
    });

  },
  methods: {
    ...mapActions('companyInfo', ['getCompanyUpdateHistoryDetailInfo']),   // 获取最近活动编号
    submitForm() {
      let params = {
        "customQueryParams": [

          {
            "findType": "EQ",
            "joinType": "And",
            "name": "history_modify_id",
            "values": [
              this.modifyId
            ]
          }
        ]
      };
      if (this.searchForm.colname !== "") {
        params.customQueryParams[1] = {
          "findType": "EQ",
          "joinType": "And",
          "name": "colname",
          "values": [
            this.searchForm.colname
          ]
        };
      }
      this.getCompanyUpdateHistoryDetailInfo(params).then(res => {
        this.ruleForm = res.records;
      });
    },
    handleToInfoUpdate() {
      this.$router.push({
        path: '/agentInfoUpdate',
        query: {
          companyId: this.companyInfo.companyId
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
  .dialog-footer{
    text-align: center;
    margin: 15px 0;
    padding-bottom: 10px;
  }
  .paging{
    margin: 10px auto;
    text-align: center;
  }
  .el-form {
    position: relative;
    .backRow {
      position: absolute;
    }
  };
</style>
