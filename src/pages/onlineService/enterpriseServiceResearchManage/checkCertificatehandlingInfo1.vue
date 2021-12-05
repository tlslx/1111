/**
 * @file 审核办证人员资料
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="审核办证人员资料" name="0">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="dictionary"
        @select-params="selectParams"
      ></search-param-link>
      <cust-table
        :cols="cols"
        :data="tableData"
        @deal-with-operate="dealWithOperate"
        @change-multiple-selection="changeMultipleSelection"
      ></cust-table>
      <div class="associa-recom-btn-container">
        <div class="btn-bar">
          <el-button class="recommend-btn" @click="pass">通过</el-button>
          <el-button class="recommend-btn" @click="noPass">不通过</el-button>
        </div>
        <pagination
          class="page-bar"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    "cust-table": custTable,
    "search-param-link": searchParamLinkage,
    pagination: pagination
  },
  data() {
    return {
      activeName: 0,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "companyName",
        data: [
          {
            prop: "isIcCardId",
            label: "是否有IC卡证件",
            value: "",
            type: "select"
          },
          {
            prop: "enterpriseCode",
            label: "企业编码",
            value: "",
            type: "input"
          },
          {
            prop: "name",
            label: "姓名",
            value: "",
            type: "input"
          }
        ]
      },
      // 字典数据
      dictionary: {
        // 总团人员审核
        "isIcCardId": [
          {
            "label": "有",
            "code": "01",
            "value": "01",
            "companyName": "企业1"
          }
        ]
      },
      cols: [
        {
          prop: "enterpriseGjhCode",
          label: "广交会企业编码",
          type: "string"
        },
        {
          prop: "icCardId",
          label: "IC卡证件",
          type: "string"
        },
        {
          prop: "name",
          label: "姓名",
          type: "string"
        },
        {
          prop: "sex",
          label: "性别",
          type: "string"
        },
        {
          prop: "documentType",
          label: "证件类型",
          type: "string"
        },
        {
          prop: "idCard",
          label: "身份证号码",
          type: "string"
        },
        {
          prop: "phoneNum",
          label: "电话",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          btns: [
            {
              type: "underlineText",
              label: "开始审核",
              style: "cursor: pointer;text-decoration: underline;color: blue;"
            },
            {
              type: "underlineText",
              label: "通过",
              style:
                "cursor: pointer;text-decoration: underline;color: green;margin: 0px 8px;"
            },
            {
              type: "underlineText",
              label: "不通过",
              style: "cursor: pointer;text-decoration: underline;color: red;"
            }
          ]
        }
      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 800,
        style: "padding: 20px 0;text-align: center;"
      },
      multipleSelection: [] //保存勾选到的数据
    };
  },
  computed: {
    tableData() {
      return {
        data: [
          {
            enterpriseGjhCode: "328723",
            icCardId: "有",
            name: "张雪",
            sex: "女",
            documentType: "身份证",
            idCard: "318*********36723",
            phoneNum: "187****3717"
          },
          {
            enterpriseGjhCode: "328723",
            icCardId: "有",
            name: "张雪",
            sex: "女",
            documentType: "身份证",
            idCard: "318*********36723",
            phoneNum: "187****3717"
          },
          {
            enterpriseGjhCode: "328723",
            icCardId: "有",
            name: "张雪",
            sex: "女",
            documentType: "身份证",
            idCard: "318*********36723",
            phoneNum: "187****3717"
          },
          {
            enterpriseGjhCode: "328723",
            icCardId: "有",
            name: "张雪",
            sex: "女",
            documentType: "身份证",
            idCard: "318*********36723",
            phoneNum: "187****3717"
          },
          {
            enterpriseGjhCode: "328723",
            icCardId: "有",
            name: "张雪",
            sex: "女",
            documentType: "身份证",
            idCard: "318*********36723",
            phoneNum: "187****3717"
          },
          {
            enterpriseGjhCode: "328723",
            icCardId: "有",
            name: "张雪",
            sex: "女",
            documentType: "身份证",
            idCard: "318*********36723",
            phoneNum: "187****3717"
          },
          {
            enterpriseGjhCode: "328723",
            icCardId: "有",
            name: "张雪",
            sex: "女",
            documentType: "身份证",
            idCard: "318*********36723",
            phoneNum: "187****3717"
          },
          {
            enterpriseGjhCode: "328723",
            icCardId: "有",
            name: "张雪",
            sex: "女",
            documentType: "身份证",
            idCard: "318*********36723",
            phoneNum: "187****3717"
          },
          {
            enterpriseGjhCode: "328723",
            icCardId: "有",
            name: "张雪",
            sex: "女",
            documentType: "身份证",
            idCard: "318*********36723",
            phoneNum: "187****3717"
          },
          {
            enterpriseGjhCode: "328723",
            icCardId: "有",
            name: "张雪",
            sex: "女",
            documentType: "身份证",
            idCard: "318*********36723",
            phoneNum: "187****3717"
          }
        ],
        selection: true
      };
    }
  }
};
</script>
<style scoped>
.associa-recom-btn-container {
  display: table;
  padding: 10px 20px;
  width: 100%;
}
.btn-bar {
  display: table-cell;
  text-align: left;
  vertical-align: middle;
}
.recommend-btn {
  background-color: #ff0033;
  color: #fff;
  outline: none;
  border: 0;
}
.page-bar {
  display: table-cell;
  vertical-align: middle;
}
</style>
