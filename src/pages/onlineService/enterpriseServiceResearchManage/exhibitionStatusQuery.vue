/**
 * @file 展品情况查询
 */
 <style scoped>
  .exhibition-status-query-title {
    margin: 15px 10px;
    color: red;
  }
 </style>
 <template>
   <div>
     <div class="exhibition-status-query-title">！第{{session}}届广交会展品情况</div>
      <cust-table
        :cols="cols"
        :data="tableData"
        @deal-with-operate="dealWithOperate"
        @change-multiple-selection="changeMultipleSelection"
        :loading="loading"
      ></cust-table>
      <!-- <pagination
        class="page-bar"
        :pageInfo="pageInfo"
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"
      ></pagination> -->
   </div>
 </template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
// import pagination from "@/components/project/onlineService/common/pagination.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: true,
      session: "",
      cols: [
        {
          prop: "totalCount",
          label: "总产品数",
          type: "string"
        },
        {
          prop: "newCount",
          label: "新产品数",
          type: "string"
        },
        {
          prop: "modifyCount",
          label: "修改产品数",
          type: "string"
        },
        {
          prop: "oldToNewCount",
          label: "往届转当届产品数",
          type: "string"
        },
        {
          prop: "noUpdateCount",
          label: "超过更新年限产品数",
          type: "string"
        }
      ],
      initParams: {
        "exhibitQuerySession": { "companyId": localStorage.getItem("getComPanyId") }
      }
    };
  },
  components: {
    "cust-table": custTable
    // "pagination": pagination
  },
  computed: {
    ...mapGetters('exhibitionStatusQuery', ['getExhSts', "getSess"]),
    tableData() {
      return {
        data: this.getExhSts
      };
    }
  },
  created() {
    let _this = this;
    this.getExhibitsStatistics(_this.initParams).then(res => {
      _this.loading = false;
    });
    this.getSession().then(res => {
      _this.session = res.session;
    });
  },
  methods: {
    ...mapActions('exhibitionStatusQuery', ['getSession', "getExhibitsStatistics"]),
    // companyData() {
    //   return {
    //     data: this.getExhibitsStatistics(this.initParams)
    //   };
    // },

    dealWithOperate() {},
    changeMultipleSelection() {},
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>


