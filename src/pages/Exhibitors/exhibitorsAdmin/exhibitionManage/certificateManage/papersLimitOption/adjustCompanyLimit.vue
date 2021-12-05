<style lang="less" scoped>
@import "../../../../../../theme/project/css/flex.less";
</style>

<template>
  <el-tabs value="default">
    <el-tab-pane label="调整企业额度" name="default">
      <el-row>
        {{adjustModel}}
      </el-row>
      <el-table :data="tableDataTop" border>
        <el-table-column v-for="(item, index) in tableHeadTop" :key="index"
          :prop="item.prop" :label="item.label" align="center"></el-table-column>
      </el-table>
      <el-form :model="ruleForm" :inline="true">
        <el-form-item label="企业名称">
          <el-input style="width: 90%" v-model="form.companyNameCh"></el-input>
        </el-form-item>
        <el-form-item label="国家/地区">
          <el-select v-model="ruleForm.place" placeholder="请选择">
            <el-option v-for="(item, index) in placeArray" :key="index"
              :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查  询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border>
        <el-table-column v-for="(item, index) in tableHead" :key="index"
          :prop="item.prop" :label="item.label" align="center"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text">设置企业额度</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="ruleForm.current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="ruleForm.size"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-row>

      <!-- 设置招展代理dialog -->
      <el-dialog title="设置招展代理额度" :visible.sync="dialogOption" width="70%" :show-close="false" @close="closeHandle">
        <el-form label-width="114px" :model="form">
          <el-row :getter="10">
            <el-col :span="12">
              <el-form-item label="企业中文名称:" size="small" prop="name">
                <el-select style="width: 90%" v-model="form.companyNameCh" disabled>
                  <el-option v-for="(item, index) in companyNameChArray" :key="index" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :getter="10">
            <el-col :span="12">
              <el-form-item label="企业英文名称:" size="small" prop="name" disabled>
                <el-input style="width: 90%" v-model="form.companyNameEn"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :getter="10">
            <el-col :span="12">
              <el-form-item label="国家/地区:" size="small" prop="name">
                <el-select v-model="ruleForm.place" placeholder="请选择">
                  <el-option v-for="(item, index) in placeArray" :key="index"
                    :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :getter="10">
            <el-col :span="12">
              <el-form-item label="参展商证额度:" size="small">
                <el-input style="width: 90%" v-model="form.combination"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="saveForm">保 存</el-button>
          <el-button @click="dialogOption = false">取 消</el-button>
        </span>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      adjustModel: "分配模式1",
      agentArray: [],
      papersTypeArray: [],
      allocationArray: [],
      placeArray: [],
      ruleFormTop: {
        current: 1,
        size: 10
      },
      tableDataTop: [],
      tableHeadTop: [
        {
          prop: "paperType",
          label: "证件类型"
        },
        {
          prop: "paperType",
          label: "总额度"
        },
        {
          prop: "paperType",
          label: "已使用额度"
        },
        {
          prop: "paperType",
          label: "剩余额度"
        }
      ],
      ruleForm: {
        companyNameCh: "",
        place: "",
        current: 1,
        size: 10
      },
      dialogOption: false,
      total: 0,
      tableData: [],
      tableHead: [
        {
          prop: "agent",
          label: "企业中文名称"
        },
        {
          prop: "agent",
          label: "企业英文名称"
        },
        {
          prop: "agent",
          label: "国家/地区"
        },
        {
          prop: "agent",
          label: "参展商证额度"
        }
      ],
      companyNameChArray: [],
      form: {
        companyNameCh: "",
        companyNameEn: "",
        place: "",
        combination: ""
      }
    };
  },
  methods: {
    getTableList(param) {
      return "";
    },
    handleSizeChange(val) {
      this.ruleForm.size = val;
      this.getTableList(this.ruleForm);
    },
    handleCurrentChange(val) {
      this.ruleForm.current = val;
      this.getTableList(this.ruleForm);
    },
    closeHandle() {
      this.form = {
        agent: "",
        companyNameEn: "",
        papersType: "",
        allocationModel: "",
        combination: ""
      };
    },
    saveForm() {
      return "";
    }
  }
};
</script>
