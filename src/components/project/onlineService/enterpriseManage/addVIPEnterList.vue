<style scoped>
</style>
<template>
  <div>
    <el-dialog
      title="新增VIP企业名单"
      :visible.sync="addVIPEnterInfo.dialogVisible">
      <cust-table class="add-vip-enterprise-list" :cols="cols" :data="tableData"></cust-table>
      <pagination
        class="page-bar"
        :pageInfo="pageInfo"
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange">
      </pagination>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="cancle">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
export default {
  name: 'addVIPEnterList',
  data() {
    return {
      cols: [
        {
          "prop": "displayArea",
          "label": "展区"
        },
        {
          "prop": "gjhqybm",
          "label": "广交会企业编码"
        },
        {
          "prop": "qymc",
          "label": "企业名称"
        }
      ],
      pageInfo: {
        "curPage": 1,
        "perPage": 10,
        "totalNum": 0,
        "style": "text-align: center;padding: 10px 0;"
      }
    };
  },
  components: {
    'cust-table': custTable,
    'pagination': pagination
  },
  props: {
    addVIPEnterInfo: {
      type: Object
    }
  },
  computed: {
    tableData() {
      return {
        data: [
          {
            "displayArea": "C618",
            "gjhqybm": "328723",
            "qymc": "广东萌果科技有限公司"
          },
          {
            "displayArea": "C618",
            "gjhqybm": "328723",
            "qymc": "广东萌果科技有限公司"
          },
          {
            "displayArea": "C618",
            "gjhqybm": "328723",
            "qymc": "广东萌果科技有限公司"
          },
          {
            "displayArea": "C618",
            "gjhqybm": "328723",
            "qymc": "广东萌果科技有限公司"
          }
        ],
        selection: true
      };
    }
  },
  methods: {
    cancle() {
      this.$emit('close-edit-form-table');
    },
    confirm() {
      this.$emit('close-edit-form-table');
      this.$emit('confirm-enterprise-list');
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {}
  }
};
</script>


