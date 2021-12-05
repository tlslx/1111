<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="未读消息" name="notread" type="card">
                <el-datagrid ref="datagrid" :height=300 
                    :query-params="queryParams" row-key="inmailRecordId"
                    data-url="/api/sysInmail/Record/getListPage" 
                    delete-url="/api/sysInmail/Record/deleteInmailRecord"
                    :showCheckbox=false :clickRowToSelect=true 
                    :singleSelect=true :highlightCurrentRow=true
                    :showHeader=false :showBorder=false 
                    :showBottom=false :setStripe=false>
                    <!-- <el-table-column prop="inmailClassifier" label="类型" width="100" sortable="custom"></el-table-column> -->
                    <el-table-column prop="title" label="标题"  sortable="custom"></el-table-column>
                    <!-- <el-table-column prop="content" label="内容"  sortable="custom"></el-table-column> -->
                    <el-table-column prop="status" label="状态" width="100" sortable="custom" :formatter="statusFormater"></el-table-column>
                    <el-table-column width="108" label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button  v-right.delete icon="el-icon-delete" @click="onDel(scope.row)"></el-button>
                        <el-button  v-right.view icon="el-icon-view" @click="onView(scope.row,true)"></el-button>
                    </template>
                    </el-table-column>
                </el-datagrid>
            </el-tab-pane>
        </el-tabs>
        <immal-view ref="inmailview" 
          :showView="showinmailView"
          @CloseView="onCloseView"
          @OpenView="onOpenView"></immal-view>
    </div>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import immalView from "@/components/project/plugins/immalView.vue";
export default {
  name: 'Inmail',
  mixins: [listPageBase],
  data () {
    return {
      pageId: 'sysInmailRecordPage',
      activeName: "notread",
      dataView: '',
      queryParams: [{
        Name: "Status",
        FindType: "NOT_EQ",
        Values: ["2"]
      },
      {
        Name: "receiverId",
        FindType: "EQ",
        Values: [this.$store.getters.userInfo.userId]
      }],
      queryOptions: [],
      showinmailView: false
    };
  },
  methods: {
    handleClick(tab, event) {
      // this.getHotArticle(this.activeName);
    },    
    statusFormater(row, column, val) {
      if (String(val) === "0") {
        return "未读";
      } else if (String(val) === "1") {
        return "已读";
      } else {
        return "";
      }
    },
    onView(row) {
      this.imailId = row.inmailId;
      this.inmailRecordId = row.inmailRecordId;
      this.showinmailView = true;
    },
    onCloseView() {
      this.showinmailView = false;
    },
    onOpenView() {
      this.$refs.inmailview.getContent(this.imailId, this.inmailRecordId);
    },
    onDel(row) {
      if (this.$utility.isEmpty(row.inmailRecordId)) {
        return;
      }
      let paramData = {
        inmailRecordId: row.inmailRecordId
      };
      // 设置站内信已读()
      this.$http
        .get("/api/sysInmail/setInmailDeleted", paramData)
        .then(function (resultData) {
          // console.info(resultData);
        })
        .catch(function (msg) {
          // 错误捕捉
        });

    }
  },
  components: {
    immalView
  }
};
</script>