<style lang="less" scoped>
.checkSupplementary {
  height: 100%;
}
</style>
<template>
  <div class="checkSupplementary">
    <canBeEdit-table
      :loading="loading"
      :tableTrData="reviewTrDate"
      :tableData="fatDate"
    ></canBeEdit-table>
    <div style="margin: 10px 0; text-align: center;">
      <el-button @click="closeModel">返回</el-button>
    </div>
  </div>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
export default {
  components: {
    "canBeEdit-table": canBeEditTable
  },
  props: ["fatDate"],
  data() {
    return {
      loading: false,
      selection: true,
      btnDialogVisible: false,
      NoticeDate: [],
      // 表头数据
      reviewTrDate: [
        {
          prop: "nameCh",
          label: "企业名称(中文)",
          type: "input",
          userDefined: true
        },
        {
          prop: "nameEn",
          label: "企业名称(英文)",
          type: "input",
          userDefined: true
        },
        {
          prop: "addressCh",
          label: "地址(中文)",
          type: "input",
          userDefined: true
        },
        {
          prop: "addressEn",
          label: "地址(英文)",
          type: "input",
          userDefined: true
        },
        {
          prop: "businessLicenceNo",
          label: "企业营业执照注册号",
          type: "input",
          userDefined: true
        },
        {
          prop: "legalPerson",
          label: "法人代表",
          type: "input",
          userDefined: true
        },
        {
          prop: "companyTypeName",
          label: "企业类型",
          type: "input",
          userDefined: true
        },
        {
          prop: "companyAttributeName",
          label: "企业属性",
          type: "input",
          userDefined: true
        },
        {
          prop: "contacts",
          label: "联系人",
          type: "input",
          userDefined: true
        },
        {
          prop: "telephone",
          label: "电话",
          type: "input",
          userDefined: true
        },
        {
          prop: "phone",
          label: "手机",
          type: "input",
          userDefined: true
        },
        {
          prop: "fax",
          label: "传真",
          type: "input",
          userDefined: true
        },
        {
          prop: "email",
          label: "电子邮箱",
          type: "input",
          userDefined: true
        },
        {
          prop: "website",
          label: "网址",
          type: "input",
          userDefined: true
        },
        {
          prop: "responsiblePerson",
          label: "联营企业展位负责人",
          type: "input",
          userDefined: true
        }
      ]
    };
  },
  mounted() {},
  methods: {
    // 关闭新增弹框
    closeModel() {
      this.$emit("closeModal", false);
    }
  }
};
</script>
