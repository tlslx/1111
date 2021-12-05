<template>
  <el-page ref="sysMenu">
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" :page="editPage" 
        datagrid="datagrid" :args="args" :after-submit="afterSubmit">
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
        @add="onAdd" 
        @edit="onEdit()" 
        @view="onEdit(null,true)" 
        @exp="onExp">
      </el-page-buttons>
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-treegrid ref="datagrid" :height="scope.height-8" 
          :default-sort="gridDefaultSort"
          :tree-query-params="queryParams" 
          row-key="menuId"
          data-url="/api/sysMenu/getListAll" 
          delete-url="/api/sysMenu/deleteBatchIds"
          parent-key="parentId" lazy
          leaf-field="menuType"
          :leaf-field-values="['2','3']"
          root-id="0" :show-checkbox="true">
          <el-table-column label="菜单名称" width="250" prop="menuName">
            <template slot-scope="scope">
              <el-treegrid-cell :props="scope" field="menuName"></el-treegrid-cell>
            </template>
          </el-table-column>
          <el-table-column prop="menuCode" label="菜单编码" width="100"></el-table-column>
          <el-table-column prop="menuUrl" label="菜单链接" width="150"></el-table-column>
          <el-table-column prop="menuIcon" label="菜单图标" width="90"></el-table-column>
          <el-table-column prop="menuType" label="菜单类型" width="80" :formatter="dataDict"></el-table-column>
          <!-- <el-table-column prop="levelCode" label="层级编码" width="100"></el-table-column> -->
          <el-table-column prop="orderNo" label="排序" width="80" sortable="custom"></el-table-column>
          <!-- <el-table-column prop="remark" label="备注" width="150"></el-table-column> -->
          <!-- <el-table-column prop="imgUrl" label="图片链接" width="100"></el-table-column> -->
          <el-table-column prop="state" label="状态" width="60" :formatter="dataDict"></el-table-column>
          <el-table-column width="118" label="操作">
            <template slot-scope="scope">
              <el-button v-right.edit icon="el-icon-edit" @click="onEdit(scope.row)"></el-button>
              <el-button v-if="scope.row.menuType == '0' || scope.row.menuType == '1'" 
                v-right.add icon="el-icon-plus" @click="onAddSub(scope.row)"></el-button>
              <el-button v-right.delete icon="el-icon-delete" @click="onDel(scope.row)"></el-button>
              <!-- <el-button v-right.view icon="el-icon-view" type="success" @click="onEdit(scope.row,true)"></el-button> -->
            </template>
          </el-table-column>
        </el-treegrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from "@/pages/manager/sysMenuEdit";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "SysMenu",
  mixins: [listPageBase],
  data() {
    return {
      primaryKey: "menuId",
      pageId: "sysMenuPage",
      editPage,
      dataView: "",
      queryParams: [],
      queryOptions: [],
      // dictRelateKeys: [{ from: "yesOrNoCode", to: "isLeaf" }],
      gridDefaultSort: { prop: "orderNo", order: "ascending" },
      args: {},
      parentRow: {},
      submitAndAdd: false,
      showSubmitAndAdd: true
    };
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
    }
  }
};
</script>
