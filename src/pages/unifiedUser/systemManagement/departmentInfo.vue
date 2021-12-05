<template>
  <el-page ref="sysDepartment">
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" 
        :page="editPage" 
        datagrid="datagrid"></el-page-dialog>
      <!--按钮栏-->
      <!-- <el-page-buttons 
        @refresh="onRefresh"
        @view-change="onViewChange" 
        @del="onDel" 
        @add="onAdd" @edit="onEdit()" 
        @view="onEdit(null,true)" 
        @exp="onExp">
      </el-page-buttons> -->
      <!-- 搜索栏 -->
      <!-- <el-page-query :options="queryOptions" @query="onQuery" 
        :width="200"></el-page-query> -->
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-treegrid ref="datagrid" :height="scope.height-8" 
            :default-sort="gridDefaultSort"
            :tree-query-params="gridQueryParams" 
            row-key="deptId"
            data-url="/api/sysDepartment/getListAll" 
            delete-url="/api/sysDepartment/deleteBatchIds"
            parent-key="parentId"
            :show-checkbox="false" 
            root-id="0"
            :lazy="true"
            :default-expand-keys="defaultExpandKeys">
          <el-table-column label="部门名称" width="300">
            <template slot-scope="scope">
              <el-treegrid-cell :props="scope" field="deptName">
              </el-treegrid-cell>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="deptName" label="部门名称" width="200" sortable="false"></el-table-column> -->
          <el-table-column prop="fullName" label="部门全名" width="200" :sortable="canBeSortable"></el-table-column>
          <!-- <el-table-column prop="parentName" label="上级部门" width="200" sortable="false"></el-table-column> -->
          <!-- <el-table-column prop="parentCode" label="上级部门编码" width="150" sortable="false"></el-table-column> -->
          <el-table-column prop="deptLevel" label="部门层级" width="100" :sortable="canBeSortable" :formatter="dataDict"></el-table-column>
          <el-table-column prop="deptType" label="机构类型" width="100" :sortable="canBeSortable" :formatter="dataDict"></el-table-column>
          <el-table-column prop="orderNo" label="排序" width="80" :sortable="canBeSortable"></el-table-column>
          <template v-if="sd">
            <el-table-column prop="deptCode" label="编码" width="80" sortable="custom"></el-table-column>
          </template>
          <el-table-column prop="deptCode" label="编码" width="80"></el-table-column>
          <!-- <el-table-column prop="isOa" label="是否OA部门" width="120" sortable="false"></el-table-column> -->
          <!-- <el-table-column prop="levelCode" label="层级编码" width="120" sortable="false"></el-table-column> -->
          <el-table-column prop="remark" label="备注" :sortable="canBeSortable"></el-table-column>
          <el-table-column prop="state" label="状态" width="80" :sortable="canBeSortable"
            align="center" :formatter="dataDict"></el-table-column>
          <el-table-column width="50" label="操作" fixed="right">
            <template slot-scope="scope">
              <!-- <el-button v-right.edit icon="el-icon-edit" @click="onEdit(scope.row)"></el-button> -->
              <!-- <el-button v-right.delete icon="el-icon-delete" @click="onDel(scope.row)"></el-button> -->
              <el-button v-right.view icon="el-icon-view" @click="onEdit(scope.row,true)"></el-button>
            </template>
          </el-table-column>
        </el-treegrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from "@/pages/unifiedUser/systemManagement/departmentInfoEdit";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "SysDepartment",
  mixins: [listPageBase],
  data() {
    return {
      canBeSortable: false,
      primaryKey: "deptId",
      sd: true,
      pageId: "sysDepartmentPage",
      editPage,
      dataView: "",
      queryParams: [
        {
          Name: "state",
          FindType: "EQ",
          Values: ["1"]
        }
      ],
      queryOptions: [
        {
          field: "deptName",
          title: "部门名称",
          findType: "LIKE",
          component: "ElInput"
        }
      ],
      orgUrl: process.env.API_COMS_URL + "/api/sysDepartment/getListAll",
      defaultExpandKeys: [
        "cd08bdeb2bd84091901da4f39637c94d",
        "8a706d0898954e4c910fb73769bd4ae9"
      ]
    };
  },
  computed: {
    gridDefaultSort() {
      return { prop: "deptCode", order: "ascending" };
    },
    gridQueryParams() {
      return this.queryParams;
    }
  },
  mounted() {
    // this.getBm();
    // 编码列通过延时隐藏
    this.$nextTick(() => {
      this.sd = false;
    });
    // setTimeout(() => {
    //   this.sd = false;
    // }, 10);
  },
  methods: {
    onTreeNodeClick(data, node, component) {
      var deptId = data["id"];
      this.customQueryParams = [
        {
          Name: "parentId",
          FindType: "IN",
          Values: [deptId]
        }
      ];
      let tempQueryParams = [];
      tempQueryParams = tempQueryParams.concat(this.pageQueryParams);
      tempQueryParams = tempQueryParams.concat(this.customQueryParams);
      this.queryParams = tempQueryParams;
    }
  }
};
</script>
