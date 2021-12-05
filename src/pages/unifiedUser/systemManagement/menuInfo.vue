<template>
  <el-page ref="sysMenu">
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" :page="editPage" 
        datagrid="datagrid" :args="args" :after-submit="afterSubmit" @refresh="onRefresh">
        <template slot="customButtons" v-if="showSubmitAndAdd">
          <el-button type="primary" 
            @click="submitFormAndAdd(true)">
          <i class="glyphicon glyphicon-floppy-disk"></i>保存并新增
        </el-button>
        </template>  
      </el-page-dialog>
      <!--按钮栏-->
      <el-page-buttons 
        @refresh="onRefresh"
        @view-change="onViewChange" 
        @del="onDel()" 
        @add="onAdd()" 
        @edit="onEdit()" 
        @view="onEdit(null,true)" 
        @exp="onExp">
      </el-page-buttons>
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-treegrid ref="datagrid" :height="scope.height-8" 
          :tree-query-params="queryParams" 
          row-key="menuId"
          data-url="/api/sysMenu/getListAll" 
          delete-url="/api/sysMenu/deleteBatchIds"
          parent-key="parentId" lazy
          leaf-field="menuType"
          :leaf-field-values="['2','3']"
          root-id="0" :show-checkbox="true"
           :default-sort="gridDefaultSort"
           @delete-success="deleteSuccess"
           >
          <el-table-column label="菜单名称" width="250" prop="menuName">
            <template slot-scope="scope">
              <el-treegrid-cell :props="scope" field="menuName"></el-treegrid-cell>
            </template>
          </el-table-column>
          <el-table-column prop="menuCode" label="菜单编码" min-width="180"></el-table-column>
          <el-table-column prop="menuUrl" label="菜单链接" min-width="300"></el-table-column>
          <el-table-column prop="menuType" label="菜单类型" min-width="80" :formatter="dataDict"></el-table-column>
          <el-table-column prop="levelCode" label="层级编码" min-width="100"></el-table-column>
          <el-table-column prop="orderNo" label="排序" min-width="80"></el-table-column>
          <el-table-column prop="state" label="状态" min-width="60" :formatter="dataDict"></el-table-column>
          <el-table-column width="150" label="操作" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button type="text" v-right.edit @click="onEdit(scope.row)">编辑</el-button>
              <el-button type="text" v-if="scope.row.menuType === '0' || scope.row.menuType === '1'" 
                v-right.add @click="onAddSub(scope.row)">新增</el-button>
              <el-button type="text" v-right.delete @click="onDel(scope.row)">删除</el-button>
              <!-- <el-button v-right.view icon="el-icon-view" type="success" @click="onEdit(scope.row,true)"></el-button> -->
            </template>
          </el-table-column>
        </el-treegrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from "@/pages/unifiedUser/systemManagement/menuInfoEdit";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "SysMenu",
  mixins: [listPageBase],
  data() {
    return {
      primaryKey: "menuId",
      pageId: "e8039c3b235a4ee5b508c0452628f9d5",
      editPage,
      dataView: "",
      queryParams: [],
      queryOptions: [],
      // dictRelateKeys: [{ from: "yesOrNoCode", to: "isLeaf" }],
      // gridDefaultSort: { prop: "orderNo", order: "ascending" },
      args: {},
      parentRow: {},
      submitAndAdd: false,
      showSubmitAndAdd: true
    };
  },
  computed: {
    gridDefaultSort() {
      return { prop: "parentId, orderNo", order: "ascending" };
    }
  },
  methods: {
    onAddSub(row) {
      this.showSubmitAndAdd = true;
      this.parentRow = row;
      this.args = { operType: "addSub", row: this.parentRow };
      this.$refs[this.editpageName].open();
    },
    submitFormAndAdd() {
      this.$refs[this.editpageName].submitForm(false);
      this.submitAndAdd = true;
    },
    afterSubmit(data) {
      // this.showSubmitAndAdd = false;
      if (this.submitAndAdd) {
        if (data.menuType === "2" || data.menuType === "3") {
          this.showSubmitAndAdd = true;
        }
        this.args = { operType: "nextAdd", row: data };
        this.$refs[this.editpageName].open();
      }
      this.submitAndAdd = false;
    },
    deleteSuccess() {
      this.$message.success("删除成功！");
    }
  }
};
</script>
