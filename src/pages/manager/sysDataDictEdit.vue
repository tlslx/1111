<template>
  <el-form :ref="name" :model="form" :sub-data="subData" :data-url="api.dataUrl"
    :update-url="api.updateUrl" :add-url="api.addUrl">
    <!-- <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo"> -->
        <el-row>
          <el-form-col label="字典名称：" prop="dictName" :span="12" >
            <el-input v-model="form.dictName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="字典编码：" prop="dictCode" :span="12" >
            <el-input v-model="form.dictCode" :disabled="isView"></el-input>
          </el-form-col>
          <!-- <el-form-col label="可编辑：提供给业务部门编辑：" prop="isedit" :span="12" >
            <el-input v-model="form.isedit" :disabled="isView"></el-input>
          </el-form-col> -->
          <el-form-col label="状态：" prop="state" :span="12" >
            <el-dropdown-list v-model="form.state" :disabled="isView"
              data-dictionary="state"></el-dropdown-list>
          </el-form-col>
          <el-form-col label="排序：" prop="orderNo" :span="12" >
            <el-input v-model="form.orderNo" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="备注：" prop="remark" :span="24" >
            <el-input type="textarea" v-model="form.remark" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
        <el-row>
          <el-datagrid ref="detailtable" :height="250"
            :query-params="queryParams"
            row-key="dataDictItemId"
            :data-url="api.getList"
            style="margin-bottom:12px;"
            :after-row-save="afterRowSave"
            v-model="subData[0].data"
            :editable="!isView"
            :validator="validator"
            :show-checkbox="false"
            :default-row-data="subData[0].defaultRowData"
            :default-sort="{ prop: 'orderNo', order: 'ascending' }">
            <el-table-column prop="itemText" label="文本" min-width="100" sortable="custom">
              <el-datagrid-edit-cell slot-scope="scope" :props="scope">
                <el-input v-model="scope.row['itemText']" size="small"></el-input>
              </el-datagrid-edit-cell>
            </el-table-column>
            <el-table-column prop="itemCode" label="编码" min-width="100" sortable="custom">
              <el-datagrid-edit-cell slot-scope="scope" :props="scope">
                <el-input v-model="scope.row['itemCode']" size="small"></el-input>
              </el-datagrid-edit-cell>
            </el-table-column>
            <el-table-column prop="orderNo" label="排序" min-width="100" sortable="custom">
              <el-datagrid-edit-cell slot-scope="scope" :props="scope">
                <el-input v-model="scope.row['orderNo']" size="small"></el-input>
              </el-datagrid-edit-cell>
            </el-table-column>
            <!-- <el-table-column prop="itemRgb" label="RGB" width="100" sortable="custom">
              <el-datagrid-edit-cell slot-scope="scope" :props="scope">
                <el-input v-model="scope.row['itemRgb']" size="small"></el-input>
              </el-datagrid-edit-cell>
            </el-table-column> -->
            <el-table-column prop="remark" label="备注" min-width="150" sortable="custom">
              <el-datagrid-edit-cell slot-scope="scope" :props="scope">
                <el-input v-model="scope.row['remark']" size="small"></el-input>
              </el-datagrid-edit-cell>
            </el-table-column>
            <el-table-column prop="state" label="状态" min-width="120" sortable="custom">
              <el-datagrid-edit-cell slot-scope="scope" :props="scope">
                <el-dropdown-list v-model="scope.row['state']"
                  data-dictionary="state"></el-dropdown-list>
              </el-datagrid-edit-cell>
            </el-table-column>
          </el-datagrid>
        </el-row>
      <!-- </el-tab-pane>
    </el-tabs> -->
  </el-form>
</template>

<script>
import dialogPageBase from "@/components/framework/mixins/dialogPageBase";
export default {
  mixins: [dialogPageBase],
  data() {
    return {
      api: {
        baseUrl: kindo.config.api.upms,
        dataUrl: kindo.config.api.upms + "/api/sysDataDict/getSingleById",
        updateUrl: kindo.config.api.upms + "/api/sysDataDict/updateById",
        addUrl: kindo.config.api.upms + "/api/sysDataDict/add",
        getList: kindo.config.api.upms + "/api/sysDataDictItem/getListPage"
      },
      submitType: "json",
      activeTab: "baseInfo",
      form: {
        createDate: "",
        creatorId: "",
        creatorName: "",
        dataDictId: "",
        dictCode: "",
        dictName: "",
        isedit: "",
        modifierId: "",
        modifierName: "",
        modifyDate: "",
        orderNo: "0",
        remark: "",
        state: "1",
        systemId: ""
      },
      subData: [
        {
          name: "SysDataDictItem",
          data: [],
          defaultRowData: { state: "1", orderNo: "0" }
        }
      ]
    };
  },
  computed: {
    queryParams() {
      // 指定子表与主表关联的字段
      return [{ Name: "data_dict_id", FindType: "EQ", Values: [this.params.id] }];
    }
  },
  methods: {
    pageLoad() {
      this.activeTab = "baseInfo";
    },
    validator(row) {},
    afterRowSave(row) {}
  }
};
</script>
