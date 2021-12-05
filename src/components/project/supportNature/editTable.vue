<!--表格组件-->
<style scoped>
  .can-be-edit-table-container .confirm {
    color: #7bc69d;
    font-weight: bold;
  }
  .underline-operation {
    margin: 0px 4px;
    cursor: pointer;
    color: #409EFF;
    text-decoration: underline;
  }
  .primary {
    color: #2d92ec;
  }
  .warning {
    color: red;
  }
  .el-form-item {
    margin-bottom: 22px;
  }
</style>
<style>
  .el-table__empty-selection .el-table__header-wrapper .el-table-column--selection .cell span{
    display: none !important;
  }
</style>
<template>
  <div v-loading="loading">
    <el-form label-position="right" :rules="ruleForm.rules" :model="ruleForm" ref="form">
      <el-table
        class="can-be-edit-table-container el-table__empty-selection"
        :data="ruleForm.data"
        ref="table"
        stripe
        border
        size="mini"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @select="selectRow"
        @select-all="selectAll"
      >
        <template v-if="selection">
          <el-table-column :selectable="isSelectable" type="selection" :disabled="true" width="55"></el-table-column>
        </template>
        <template v-for="(item, index) in tableTrData">
          <template v-if="item.type === 'btn'">
            <template v-if="item.show">
              <el-table-column :key="index"
                :prop="item.prop"
                :label="item.label" align="center"
                :width="item.width"
                :fixed="item.fixed">
                <template slot-scope="scope">
                  <template v-if="item.event">
                    <i
                      v-if="scope.row.iconType === 'icon'"
                      :class="getIconClass(item, scope.row)"
                      @click="dealWithEvent(item.prop, scope.$index, scope.row)"
                    ></i>
                    <span
                      v-if="scope.row.iconType === 'text'"
                      :style="item.style"
                      @click="dealWithEvent(item.prop, scope.$index, scope.row)"
                    >{{ item.label }}</span>
                  </template>
                  <template v-if="item.unChangeStatus">
                    <span
                      v-for="textItem in item.operator.textArray"
                      :key="textItem.prop"
                      v-if="item.operator.type === 'text' && scope.row.operating"
                      :style="textItem.style"
                      @click="dealWithOperate(scope, textItem.prop)"
                    >{{ textItem.label }}</span>
                    <i
                      v-for="iconItem in item.operator.iconArray"
                      :key="iconItem.prop"
                      v-else
                      :class="iconItem.iconName"
                      :style="iconItem.style"
                      @click="dealWithOperate(scope, iconItem.prop)"
                    ></i>
                  </template>
                  <!-- 改变文字状态开始 -->
                  <template v-if="item.changeStatus">
                    <span v-for="operateItem in item.operations" :key="operateItem.prop">
                      <span
                        v-if="operateItem.label === '修改' ? (scope.row.operateType === 'text' && operateItem.type === 'text'): (scope.row.involveType !== '9')"
                        :class="operateItem.class + ' underline-operation'"
                        @click="dealWithChangeStatusEvent(scope, operateItem)"
                      >{{ operateItem.label }}</span>
                      <i
                        v-if="scope.row.operateType === 'icon' && operateItem.type === 'icon'"
                        :class="operateItem.class + ' ' + operateItem.iconName"
                        @click="dealWithChangeStatusEvent(scope, operateItem)"
                      ></i>
                    </span>
                  </template>
                  <!-- 改变文字状态结束 -->
                  <template v-if="item.textBtn">
                    <span>{{scope.row[item.prop] }}</span>
                    
                    <!-- <span
                      v-if="scope.row.isEdit"
                      :class="' underline-operation'"
                      @click="dealTextBtn(scope, item.prop)"
                    >{{ item.oper }}</span> -->
                    <el-form-item
                      v-if="scope.row.isEdit && scope.row.finishJudgement === '人工判断'"
                      :prop="'data.' + scope.$index + '.' + item.prop"
                      label-width="0">
                        <el-select v-model="scope.row[item.prop]" placeholder="全部类型">
                          <el-option :value="0" label="未完成"></el-option>
                          <el-option :value="100" label="已完成"></el-option>
                        </el-select>
                      </el-form-item>
                  
                    <span v-for="textItem in item.textData" :key="textItem.prop" v-if="scope.row.isEdit">
                      <span
                        v-if="scope.row.textType === 'text' && textItem.type === 'text' && scope.row.isAI"
                        :class="' underline-operation'"
                        @click="dealTextBtn(scope, textItem)"
                      >{{ textItem.label }}</span>
                      <i
                        v-if="scope.row.textType === 'icon' && textItem.type === 'icon'"
                        :class="textItem.class + ' ' + textItem.iconName"
                        @click="dealTextBtn(scope, textItem)"
                      ></i>
                    </span>
                  </template>
                  <template v-else>
                    <i class="iconfont" :class="item.iconName"></i>
                  </template>
                </template>
              </el-table-column>
            </template>
          </template>
          <template v-else-if="item.type !== 'btn'">
            <el-table-column
              :key="index"
              :min-width="item.minWidth !== '' ? item.minWidth : ''"
              :prop="item.prop"
              :width="item.width"
              :label="item.label"
              align="center"
            >
              <template slot-scope="scope">
                <template v-if="item.type === 'select'">
                  <template v-if="item.userDefined">
                    <el-form-item
                      v-if="scope.row.isEdit"
                      :prop="'data.' + scope.$index + '.' + item.prop"
                      :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}"
                      label-width="0"
                    >
                      <el-select size="mini" v-model="scope.row[item.prop]" placeholder="全部类型">
                        <el-option
                          v-for="(userDefinedItem, userDefinedIndex) in dictionaryData[item.prop]"
                          :key="userDefinedIndex"
                          :label="userDefinedItem.text"
                          :value="userDefinedItem.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <span v-else>{{ scope.row[item.prop] }}</span>
                  </template>
                  <template v-else>
                    <el-form-item
                      v-if="scope.row.isEdit"
                      :prop="'data.' + scope.$index + '.' + item.prop"
                      :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}"
                      label-width="0"
                    >
                      <el-select size="mini" v-model="scope.row[item.prop]" placeholder="全部类型">
                        <el-option
                          v-for="(dicItem, dicIndex) in dictionaryData[item.prop]"
                          :key="dicIndex"
                          :label="dicItem.text"
                          :value="dicItem.dictCode"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <span
                      v-else
                    >{{ getDictionaryValue(dictionaryData[item.prop], scope.row[item.prop]) }}</span>
                  </template>
                </template>
                <template v-if="item.type === 'input'">
                  <el-form-item
                    v-if="scope.row.isEdit"
                    :prop="'data.' + scope.$index + '.' + item.prop"
                    :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}"
                    label-width="0"
                  >
                    <el-input
                      size="mini"
                      :disabled="item.disabled"
                      :maxlength="item.maxlength"
                      v-model="scope.row[item.prop]"
                      type="text"
                      :placeholder="item.label"
                    ></el-input>
                  </el-form-item>
                  <template v-else>{{ scope.row[item.prop] }}</template>
                </template>
                <template v-if="item.type === 'datepicker'">
                  <!-- :prop="'data.' + scope.$index + '.' + item.prop" -->
                  <el-form-item
                    v-if="scope.row.isEdit"
                    :prop="'data.' + scope.$index + '.' + item.prop"
                    :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}"
                    label-width="0"
                  >
                    <el-date-picker
                      v-if="item.start"
                      :format="item.format"
                      :disabled="scope.row.dateDisabled"
                      v-model="scope.row[item.prop]"
                      type="date"
                      clearable
                      @change="startPickerOptions(scope.row, item.prop)"
                      placeholder="选择开始时间">
                    </el-date-picker>
                    <!-- :picker-options="startPickerOption" -->
                    <el-date-picker
                      v-else
                      clearable
                      :format="item.format"
                      v-model="scope.row[item.prop]"
                      type="date"
                      @change="endPickerOptions(scope.row, item.prop)"
                      placeholder="选择结束时间">
                    </el-date-picker>
                  </el-form-item>
                  <!-- :picker-options="startPickerOptions(scope.row[item.prop], item.prop)" -->
                  <template v-else>{{ scope.row[item.prop] }}</template>
                </template>
                <template v-if="item.type === 'number'">
                    <!-- :prop="'data.' + scope.$index + '.' + item.prop" -->
                  <el-form-item
                    v-if="scope.row.isEdit"
                    :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}"
                    label-width="0"
                  >
                    <el-input
                      v-if="tableData.editTable"
                      size="mini"
                      @input.native="(value) => checkNum(scope.$index, item.prop, $event)"
                      :maxlength="item.maxlength"
                      :max="item.max"
                      clearable
                      v-model.number="scope.row[item.prop].value"
                      placeholder="请输入内容"
                    ></el-input>
                    <el-input
                      v-else
                      size="mini"
                      @input.native="(value) => checkNum(scope.$index, item.prop, $event)"
                      :maxlength="item.maxlength"
                      :max="item.max"
                      :disabled="scope.row.inputDisabled"
                      clearable
                      v-model.number="scope.row[item.prop]"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </template>
                <template v-if="item.type === 'string'">
                  <template v-if="item.child">
                    <el-table-column
                      :prop="item.prop"
                      :label="item.label"
                    >
                    <el-table-column
                      v-for="(childVal, childIndex) in item.child"
                      :key ="childIndex"
                      :prop="childVal.prop"
                      :label="childVal.label"
                    ></el-table-column>
                    </el-table-column>
                  </template>
                  <span v-else :style="item.style">{{ scope.row[item.prop] }}</span>
                </template>
              </template>
            </el-table-column>
          </template>
        </template>
        <template slot="append" v-if="appendTable">
          <div class="add-form-table-icon" @click="addAppendTable">
            <i class="el-icon-plus"></i>
          </div>
        </template>
      </el-table>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "canBeEditTable",
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => {}
    },
    tableTrData: {
      type: Array,
      default: []
    },
    dictionaryData: {
      type: Object,
      default: () => {}
    },
    appendTable: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    isSelectable: {
      type: Function,
      default: () => {
        return true;
      }
    },
    rules: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ruleForm: {
        data: []
      },
      form: {},
      multipleSelection: []
    };
  },
  created() {
    this.ruleForm.rules = this.rules;
    this.copyTableData(this.tableData);
  },
  computed: {},
  methods: {
    // 获取字典数据
    getDictionaryValue(dicArray, dicCode) {
      let dicValue = "";
      if (dicArray) {
        for (let i = 0; i < dicArray.length; i++) {
          if (dicCode === dicArray[i].dicItemCode) {
            dicValue = dicArray[i].dicItemName;
          }
        }
      }
      return dicValue;
    },
    // 获取ICON的类名
    getIconClass(item, row) {
      if (item.prop === "edit") {
        if (row.iconName === "") {
          return item.iconName;
        } else {
          return row.iconName;
        }
      } else {
        return item.iconName;
      }
    },
    // startPickerOption () {
    //   let _this = this;
    //   return {
    //     disabledDate: (value) => {
    //       if (_this.dateForm.endTime) {
    //         if (value.getTime() > new Date(_this.dateForm.endTime).getTime()) {
    //           return true;
    //         }
    //       }
    //       return false;
    //     }
    //   };
    // },
    // 事件处理
    dealWithEvent(prop, rowIndex, row) {
      switch (prop) {
        case "edit":
          if (row.iconName === "el-icon-check btn") {
            this.changeData(rowIndex, row);
          } else {
            this.changeStatus(rowIndex);
          }
          break;
        case "del":
          this.$emit("del-table-data", row.id);
          break;
        default:
          break;
      }
    },
    changeData(index, row) {
      if (row.isEdit) {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$emit("edit-table-data", row);
            // let temp = Object.assign({}, this.ruleForm.data[index]);
            // temp.isEdit = false;
            // this.$set(this.ruleForm.data, index, temp);
          } else {
            this.$message({
              showClose: true,
              message: "您输入的信息有误",
              type: "error"
            });
          }
        });
      }
    },
    changeStatus(index) {
      let temp = Object.assign({}, this.ruleForm.data[index]);
      temp.isEdit = true;
      temp.iconType = "icon";
      temp.iconName = "el-icon-check btn";
      this.$set(this.ruleForm.data, index, temp);
    },
    // 向表格添加一条数据
    addAppendTable() {
      this.$emit("add-edit-form-table");
    },
    startPickerOptions(scope, prop) {
      this.$emit("start-picker-option", scope, prop);
    },
    endPickerOptions(scope, prop) {
      this.$emit("end-picker-option", scope, prop);
    },
    // 拷贝表格并添加相关属性
    copyTableData(newVal) {
      if (newVal) {
        let temp = JSON.parse(JSON.stringify(newVal));
        temp.forEach((value, index, array) => {
          temp[index].isEdit = false;
          temp[index].iconType = "text";
          temp[index].iconName = "";
        });
        this.ruleForm.data = temp;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("change-multiple-selection", val);
    },
    selectRow(selection, row) {
      // row.isEdit = !row.isEdit;
      this.$emit('select-row', selection, row);
    },
    // 全选功能
    selectAll(val) {
      this.$emit("change-all-selection", val);
    },
    // 处理表格中的点击事件
    dealWithOperate(scope, prop) {
      this.$emit("deal-with-operate", scope, prop);
    },
    // 限制输入数字
    checkNum(index, prop, e) {
      this.$nextTick(() => {
        let reg = /^((\d{1,2})|100)$/;
        if (!reg.test(e.target.value)) {
          this.ruleForm.data[index][prop] = "0";
        }
      });
    },
    // 改变按钮状态
    dealWithChangeStatusEvent(scope, operateItem) {
      this.$emit("deal-with-change-status-event", scope, operateItem);
    },
    dealTextBtn(scope, textItem) {
      this.$emit("deal-text-btn", scope, textItem);
    },
    //默认选中方法
    selectionRow(index) {
      this.$nextTick(() => {
        this.$refs.table.toggleRowSelection(this.ruleForm.data[index]);   //默认选中
      });
    }
  },
  watch: {
    tableData: {
      handler(newVal, oldVal) {
        this.copyTableData(newVal);
      },
      deep: true
    }
  }
};
</script>

