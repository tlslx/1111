<!--表格组件-->
<style scoped>
  .can-be-edit-table-container
  .confirm {
    color: #7bc69d;
    font-weight: bold;
  }
  .can-be-edit-table-container >>> .el-form-item__content {
    width: auto;
    height: 40px;
  }
  .underline-operation {
    margin: 0px 4px;
    cursor: pointer;
    text-decoration: underline;
  }
  .primary {
    color: #d80c18;
    cursor: pointer;
  }
  .warning {
    color: #d80c18;
  }
</style>
<template>
  <div v-loading="loading">
    <el-form label-position="right" :rules="ruleForm.rules" :model="ruleForm" ref="form">
      <el-table
        class="can-be-edit-table-container"
        :data="ruleForm.data"
        stripe
        border
        size="mini"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @select="selectRow"
        @select-all="selectAll">
        <el-table-column
          v-if="selection"
          :selectable="isSelectable"
          type="selection"
          width="55">
        </el-table-column>
        <template v-for="(item, index) in tableTrData">
          <template v-if="item.type === 'btn'">
            <template v-if="item.show">
              <el-table-column
                  :key="index"
                  :prop="item.prop"
                  :label="item.label"
                  align="center">
                <template slot-scope="scope">
                  <template v-if="item.event">
                    <i v-if="scope.row.iconType === 'icon'" :class="getIconClass(item, scope.row)" @click="dealWithEvent(item.prop, scope.$index, scope.row)"></i>
                    <span v-if="scope.row.iconType === 'text'" :style="item.style" @click="dealWithEvent(item.prop, scope.$index, scope.row)">{{ item.label }}</span>
                  </template>
                  <template v-if="item.unChangeStatus">
                    <span v-for="textItem in item.operator.textArray"
                      :key="textItem.prop"
                      v-if="item.operator.type === 'text' && scope.row.operating"
                      :style="textItem.style"
                      @click="dealWithOperate(scope, textItem.prop)">
                        {{ textItem.label }}
                    </span>
                    <i v-for="iconItem in item.operator.iconArray"
                      :key="iconItem.prop"
                      v-else
                      :class="iconItem.iconName"
                      :style="iconItem.style"
                      @click="dealWithOperate(scope, iconItem.prop)">
                    </i>
                  </template>
                  <!-- 根据不同条件显示不同按钮绑定不同点击事件开始 -->
                  <template v-if="item.changeByCondition">
                    <span v-for="btnValue in item.btns"
                      :key="btnValue.type"
                      v-if="scope.row[btnValue.type]"
                      :class="scope.row.class"
                      @click="dealWithDiffEvent(btnValue.type, scope)">
                      {{ btnValue.label }}
                    </span>
                  </template>
                  <!-- 根据不同条件显示不同按钮绑定不同点击事件结束 -->
                  <!-- 改变文字状态开始 -->
                  <template v-if="item.changeStatus">
                    <span v-for="operateItem in item.operations" :key="operateItem.prop">
                      <span v-if="scope.row.operateType === 'text' && operateItem.type === 'text'"
                        :class="operateItem.class + ' underline-operation'"
                        @click="dealWithChangeStatusEvent(scope, operateItem)">
                        {{ operateItem.label }}
                      </span>
                      <i v-if="scope.row.operateType === 'icon' && operateItem.type === 'icon'"
                        :class="operateItem.class + ' ' + operateItem.iconName"
                        @click="dealWithChangeStatusEvent(scope, operateItem)">
                      </i>
                    </span>
                  </template>
                  <!-- 改变文字状态结束 -->
                  <template v-else>
                    <i class="iconfont" :class="item.iconName"></i>
                  </template>
                </template>
              </el-table-column>
            </template>
          </template>
          <template v-else-if="item.type !== 'btn'">
            <el-table-column :key="index"
              :min-width="item.minWidth !== '' ? item.minWidth : ''"
              :prop="item.prop"
              :label="item.label"
              align="center">
              <template slot-scope="scope">
                <template v-if="item.type === 'select'">
                  <template v-if="item.userDefined">
                    <el-form-item v-if="scope.row.isEdit" :prop="'data.' + scope.$index + '.' + item.prop" :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}" label-width="0">
                      <el-select size="mini" v-model="scope.row[item.prop]" placeholder="全部类型" >
                        <el-option
                            v-for="(userDefinedItem, userDefinedIndex) in dictionaryData[item.prop]"
                            :key="userDefinedIndex"
                            :label="userDefinedItem.text"
                            :value="userDefinedItem.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <span v-else>{{ scope.row[item.prop] }}</span>
                  </template>
                  <template v-else>
                    <el-form-item v-if="scope.row.isEdit" :prop="'data.' + scope.$index + '.' + item.prop" :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}" label-width="0">
                      <el-select size="mini" v-model="scope.row[item.prop]" placeholder="全部类型">
                        <el-option
                            v-for="(dicItem, dicIndex) in dictionaryData[item.prop]"
                            :key="dicIndex"
                            :label="dicItem.text"
                            :value="dicItem.dictCode">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <span v-else>{{ getDictionaryValue(dictionaryData[item.prop], scope.row[item.prop]) }}</span>
                  </template>
                </template>
                <template v-if="item.type === 'input'">
                  <el-form-item v-if="scope.row.isEdit" :prop="'data.' + scope.$index + '.' + item.prop" :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}" label-width="0">
                    <el-input size="mini" :disabled="item.disabled" :maxlength="item.maxlength" v-model="scope.row[item.prop]" type="text" :placeholder="item.label"></el-input>
                  </el-form-item>
                  <template v-else>{{ scope.row[item.prop] }}</template>
                </template>
                <template v-if="item.type === 'number'">
                  <el-form-item :prop="'data.' + scope.$index + '.' + item.prop" :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}" label-width="0">
                    <el-input v-if="tableData.editTable" size="mini" @input.native="(value) => checkNum(scope.$index, item.prop, $event)" :maxlength="item.maxlength" :max="item.max" clearable v-model.number="scope.row[item.prop].value" placeholder="请输入内容"></el-input>
                    <el-input v-else size="mini" @input.native="(value) => checkNum(scope.$index, item.prop, $event)" :maxlength="item.maxlength" :max="item.max" clearable v-model.number="scope.row[item.prop]" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </template>
                <template v-if="item.type === 'string'">
                  <span :style="item.style">{{ scope.row[item.prop] }}</span>
                </template>
              </template>
            </el-table-column>
          </template>
        </template>
        <template slot="append" v-if="appendTable">
          <div class="add-form-table-icon" @click="addAppendTable"><i class="el-icon-plus"></i></div>
        </template>
      </el-table>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: "canBeEditTable",
    components: {
    },
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
        default: () => {}
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
    computed: {
    },
    methods: {
      // 获取字典数据
      getDictionaryValue(dicArray, dicCode) {
        let dicValue = '';
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
        if (item.prop === 'edit') {
          if (row.iconName === '') {
            return item.iconName;
          } else {
            return row.iconName;
          }
        } else {
          return item.iconName;
        }
      },
      // 事件处理
      dealWithEvent(prop, rowIndex, row) {
        switch (prop) {
          case 'edit':
            if (row.iconName === 'el-icon-check btn') {
              this.changeData(rowIndex, row);
            } else {
              this.changeStatus(rowIndex);
            }
            break;
          case 'del':
            this.$emit('del-table-data', row.id);
            break;
          default:
            break;
        }
      },
      // 根据不同的按钮处理不同的事件
      dealWithDiffEvent(eventType, scope) {
        this.$emit('deal-with-diff-event', eventType, scope);
      },
      changeData(index, row) {
        if (row.isEdit) {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$emit('edit-table-data', row);
              // let temp = Object.assign({}, this.ruleForm.data[index]);
              // temp.isEdit = false;
              // this.$set(this.ruleForm.data, index, temp);
            } else {
              this.$message({
                showClose: true,
                message: '您输入的信息有误',
                type: 'error'
              });
            }
          });
        }
      },
      changeStatus(index) {
        let temp = Object.assign({}, this.ruleForm.data[index]);
        temp.isEdit = true;
        temp.iconType = 'icon';
        temp.iconName = 'el-icon-check btn';
        this.$set(this.ruleForm.data, index, temp);
      },
      // 向表格添加一条数据
      addAppendTable() {
        this.$emit('add-edit-form-table');
      },
      // 拷贝表格并添加相关属性
      copyTableData(newVal) {
        if (newVal) {
          let temp = JSON.parse(JSON.stringify(newVal));
          temp.forEach((value, index, array) => {
            temp[index].isEdit = false;
            temp[index].iconType = 'text';
            temp[index].iconName = '';
          });
          this.ruleForm.data = temp;
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.$emit('change-multiple-selection', val);
      },
      selectRow(selection, row) {
        row.isEdit = !row.isEdit;
      },
      // 全选功能
      selectAll(val) {
        this.$emit('change-all-selection', val);
      },
      // 处理表格中的点击事件
      dealWithOperate(scope, prop) {
        this.$emit('deal-with-operate', scope, prop);
      },
      // 限制输入数字
      checkNum(index, prop, e) {
        this.$nextTick(() => {
          let reg = /(^[1-9]\d*$)|(^0?$)/;
          if (!reg.test(e.target.value)) {
            this.ruleForm.data[index][prop] = '0';
          }
        });
      },
      // 改变按钮状态
      dealWithChangeStatusEvent(scope, operateItem) {
        this.$emit('deal-with-change-status-event', scope, operateItem);
      }
    },
    watch: {
      "tableData": {
        handler(newVal, oldVal) {
          this.copyTableData(newVal);
        },
        deep: true
      }
    }
  };
</script>
