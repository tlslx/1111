<style scoped>
  .edit-form-table {
    margin-bottom: 15px;
  }
  .add-form-table-icon {
    padding: 5px 0;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
  }
  .edit-form-table >>> .is-required {
    margin-bottom: 0;
  }
  .edit-form-table >>> .is-error {
    margin-bottom: 12px;
  }
  .edit-form-table >>> .el-form-item__content {
    width: auto;
    height: 40px;
  }
  .edit-form-table >>> .el-form-item__error {
    padding-top: 0;
  }
</style>
<template>
  <div v-loading="loading">
    <el-form label-position="right" :rules="ruleForm.rules" :model="ruleForm" ref="form">
      <el-table fit highlight-current-row
        class="edit-form-table"
        :data="ruleForm.data"
        border
        size="mini"
        style="width: 100%">
        <el-table-column
          v-for="(item, index) in ruleForm.trData"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center">
          <template slot-scope="scope">
            <template v-if="item.editable || scope.row[item.prop].editable">
              <template v-if="item.type === 'input'">
                <el-form-item :prop="'data.' + scope.$index + '.' + item.prop" :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}" label-width="0">
                  <el-input v-if="tableData.editTable" size="mini" clearable v-model.number="scope.row[item.prop].value" placeholder="请输入内容"></el-input>
                  <el-input v-else size="mini" clearable v-model.number="scope.row[item.prop]" placeholder="请输入内容"></el-input>
                </el-form-item>
              </template>
              <template v-if="item.type === 'number'">
                <el-form-item :prop="'data.' + scope.$index + '.' + item.prop" :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}" label-width="0">
                  <el-input v-if="tableData.editTable" type="text" @input.native="(value) => checkNum(scope.$index, item.prop, $event)" :maxlength="item.maxlength" :max="item.max" size="mini" clearable v-model.number="scope.row[item.prop].value" placeholder="请输入内容"></el-input>
                  <el-input style="" v-else size="mini" type="text" @input.native="(value) => checkNum(scope.$index, item.prop, $event)" :maxlength="item.maxlength" :max="item.max" clearable v-model.number="scope.row[item.prop]" placeholder="请输入内容"></el-input>
                </el-form-item>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-form-item :prop="'data.' + scope.$index + '.' + item.prop" :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}" label-width="0">
                  <el-select v-if="tableData.editTable" size="mini" clearable v-model="scope.row[item.prop].value" placeholder="请选择">
                    <el-option
                      v-for="item in dictionaryData[item.prop]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-else size="mini" clearable v-model="scope.row[item.prop]" placeholder="请选择">
                    <el-option
                      v-for="item in dictionaryData[item.prop]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
              <template v-else-if="item.type === 'time'">
                <el-form-item :prop="'data.' + scope.$index + '.' + item.prop" :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}" label-width="0">
                  <el-date-picker
                    clearable
                    v-if="tableData.editTable"
                    v-model="scope.row[item.prop].value"
                    type="date"
                    size="mini"
                    :picker-options="pickerOptions"
                    placeholder="选择日期">
                  </el-date-picker>
                  <el-date-picker
                    v-else
                    clearable
                    v-model="scope.row[item.prop]"
                    type="date"
                    size="mini"
                    :picker-options="pickerOptions"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </template>
              <span v-else-if="item.type === 'button'">
                <template v-if="tableData.editTable">
                  <span v-if="scope.row[item.prop].type === 'text'" :style="scope.row[item.prop].style" @click="dealWithEditFormData(scope.$index)">
                    {{ scope.row[item.prop].value }}
                  </span>
                  <i v-else :class="scope.row[item.prop].iconName ? scope.row[item.prop].iconName : ''" :style="scope.row[item.prop].style" @click="confirmEditFormData(scope)"></i>
                </template>
                <template v-else>
                  <span v-for="iconItem in item.iconArray" :key="iconItem.iconName">
                    <i :class="iconItem.iconName" :style="iconItem.style" @click="dealWithEditFormData(scope.$index)"></i>
                  </span>
                </template>
              </span>
            </template>
            <span v-else>
              <div v-if="tableData.editTable" >{{ scope.row[item.prop].value }}</div>
              <div v-else>{{ scope.row[item.prop] }}</div>
            </span>
          </template>
        </el-table-column>
        <template slot="append" v-if="tableData.appendTable">
          <div class="add-form-table-icon" @click="addFormTable"><i class="el-icon-plus"></i></div>
        </template>
      </el-table>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'editTable',
  props: {
    tableData: {
      type: Object,
      default: () => {}
    },
    pickerOptions: {
      type: Object
    },
    loading: {
      type: Boolean,
      default: false
    },
    dictionaryData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ruleForm: {
      },
      form: {}
    };
  },
  computed: {

  },
  created() {
    this.ruleForm = this.tableData;
  },
  methods: {
    // 限制输入数字
    checkNum(index, prop, e) {
      this.$nextTick(() => {
        if (e.target.value != null) {
          this.ruleForm.data[index][prop] = e.target.value.replace(/\D+/, '');
        }
      });
    },
    // 向表格添加一条数据
    addFormTable() {
      this.$emit('add-edit-form-table');
    },
    // 文字操作表格
    dealWithEditFormData(dataIndex) {
      this.$emit('deal-with-edit-form-table', dataIndex);
    },
    // icon操作表格
    confirmEditFormData(scope) {
      this.$emit('confirm-edit-form-table', scope);
    }
  }
};
</script>


