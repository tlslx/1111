<template>
  <el-page ref="sysDataDict">
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" :page="editPage"
        datagrid="datagrid"></el-page-dialog>
      <!--按钮栏-->
      <el-page-buttons
        @view-change="onViewChange"
        @del="onDel" @add="onAdd"
        @edit="onEdit()"
        @view="onEdit(null,true)"
        @exp="onExp">
      </el-page-buttons>
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-datagrid ref="datagrid"
          :height="scope.height-8"
          :query-params="queryParams"
          row-key="dataDictId"
          :data-url="api.dataUrl"
          :delete-url="api.deleteUrl">
          <!-- <el-table-column prop="dataDictId" label="主键（取公共框架生成的GUID）" width="100" sortable="custom"></el-table-column> -->
          <el-table-column prop="dictName" label="字典名称" width="200" sortable="custom"></el-table-column>
          <el-table-column prop="dictCode" label="字典编码" width="120" sortable="custom"></el-table-column>
          <!-- <el-table-column prop="isedit" label="可编辑" width="100" sortable="custom"></el-table-column> -->
          <el-table-column prop="orderNo" label="排序" width="100" sortable="custom" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" width="100" sortable="custom" align="center" :formatter="dataDict"></el-table-column>
          <el-table-column prop="remark" label="备注" width="200" sortable="custom"></el-table-column>
          <!-- <el-table-column prop="systemId" label="SYS_SYSTEM_INFO/SYSTEM_id" width="100" sortable="custom"></el-table-column> -->
          <!-- <el-table-column width="118">
            <template slot-scope="scope">
              <el-button v-right.edit icon="el-icon-edit" type="primary"
                @click="onEdit(scope.row)"></el-button>
              <el-button v-right.delete icon="el-icon-delete" type="danger"
                @click="onDel(scope.row)"></el-button>
              <el-button v-right.view icon="el-icon-view" type="success"
                @click="onEdit(scope.row,true)"></el-button>
            </template>
          </el-table-column> -->
          <el-table-column width="108" label="操作">
            <template slot-scope="scope">
              <el-button  v-right.edit icon="el-icon-edit" @click="onEdit(scope.row)"></el-button>
              <el-button  v-right.delete icon="el-icon-delete" @click="onDel(scope.row)"></el-button>
              <el-button  v-right.view icon="el-icon-view" @click="onEdit(scope.row,true)"></el-button>
            </template>
          </el-table-column>
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from "./sysDataDictEdit";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "SysDataDict",
  mixins: [listPageBase],
  data() {
    return {
      api: {
        baseUrl: kindo.config.api.upms,
        dataUrl: kindo.config.api.upms + "/api/sysDataDict/getListPage",
        deleteUrl: kindo.config.api.upms + "/api/sysDataDict/deleteBatchIds"
      },
      primaryKey: "dataDictId",
      pageId: "sysDataDictPage",
      editPage,
      dataView: "",
      queryParams: [],
      queryOptions: []
    };
  },
  methods: {}
};
</script>
