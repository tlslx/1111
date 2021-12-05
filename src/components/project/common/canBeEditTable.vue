<!--表格组件-->
<style scoped>
.theme-red .el-button--text {
  padding: 0 0 !important;
}
.can-be-edit-table-container .confirm {
  color: #7bc69d;
  font-weight: bold;
}
.underline-operation {
  margin: 0px 4px;
  cursor: pointer;
  text-decoration: underline;
}
.primary {
  color: #2d92ec;
}
.warning {
  color: red;
}
</style>
<template>
  <div v-loading="loading">
    <el-form label-position="right" :rules="ruleForm.rules" :model="ruleForm" ref="form">
      <el-table class="can-be-edit-table-container" :data="ruleForm.data" :show-summary="newSummary" stripe border size="mini" style="width: 100%; height: 100%" ref="multipleTable" @selection-change="handleSelectionChange" @select="selectRow" @select-all="selectAll" @cell-click="cellClick" @cell-mouse-enter='mouseEnter'>
        <el-table-column v-if="selection" :selectable="isSelectable" type="selection" width="55"></el-table-column>
        <template v-for="(item, index) in tableTrData">
          <template v-if="item.type === 'btn'">
            <template v-if="item.show">
              <el-table-column :key="index" :width="item.width" :prop="item.prop" :label="item.label" align="center">
                <template slot-scope="scope">
                  <template v-if="item.event">
                    <i v-if="scope.row.iconType === 'icon'" :class="getIconClass(item, scope.row)" @click="dealWithEvent(item.prop, scope.$index, scope.row)"></i>
                    <span v-if="scope.row.iconType === 'text'" :style="item.style" @click="dealWithEvent(item.prop, scope.$index, scope.row)">{{ item.label }}</span>
                  </template>
                  <template v-if="item.unChangeStatus">
                    <el-button type="text" v-for="textItem in item.operator.textArray" :key="textItem.prop" v-if="item.operator.type === 'text' && scope.row.operating" :style="textItem.style" :disabled="handleDisabled(scope.row)"
                      @click="dealWithOperate(scope, textItem.prop, textItem)">{{ textItem.label }}</el-button>
                    <i v-for="iconItem in item.operator.iconArray" :key="iconItem.prop" v-else :class="iconItem.iconName" :style="iconItem.style" @click="dealWithOperate(scope, iconItem.prop, iconItem)"></i>
                  </template>
                  <!-- 单独控制通过和不通过按钮 item.operator.textArray -->
                  <template v-if="item.twoChangeStatus">
                    <el-button type="text" :key="item.operator.textArray[0].prop" v-if="item.operator.type === 'text' && scope.row.operating" :style="item.operator.textArray[0].style" :disabled="handleDisabled(scope.row)"
                      @click="dealWithOperate(scope, item.operator.textArray[0].prop, item.operator.textArray[0])">{{ item.operator.textArray[0].label }}</el-button>
                    <el-button type="text" :key="item.operator.textArray[1].prop" v-if="item.operator.type === 'text' && scope.row.operating" :style="item.operator.textArray[1].style" :disabled="handleDisabledOne(scope.row)"
                    @click="dealWithOperate(scope, item.operator.textArray[1].prop, item.operator.textArray[1])">{{ item.operator.textArray[1].label }}</el-button>
                  </template>
                  <!-- 改变文字状态开始 -->
                  <template v-if="item.changeStatus">
                    <span v-for="operateItem in item.operations" :key="operateItem.prop">
                      <span v-if="scope.row.operateType === 'text' && operateItem.type === 'text'" :class="operateItem.class + ' underline-operation'" @click="dealWithChangeStatusEvent(scope, operateItem)">{{ operateItem.label }}</span>
                      <i v-if="scope.row.operateType === 'icon' && operateItem.type === 'icon'" :class="operateItem.class + ' ' + operateItem.iconName" @click="dealWithChangeStatusEvent(scope, operateItem)"></i>
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
            <el-table-column v-if="item.type !== 'child'" :key="index" :min-width="item.minWidth !== '' ? item.minWidth : ''" :prop="item.prop" :label="item.label" align="center" :width="item.width">
              <template slot-scope="scope">
                <template v-if="item.type === 'select'">
                  <template v-if="item.userDefined">
                    <el-form-item v-if="scope.row.isEdit" :prop="'data.' + scope.$index + '.' + item.prop" :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}" label-width="0">
                      <el-select size="mini" v-model="scope.row[item.prop]" placeholder="全部类型">
                        <el-option v-for="(userDefinedItem, userDefinedIndex) in dictionaryData[item.prop]" :key="userDefinedIndex" :label="userDefinedItem.text" :value="userDefinedItem.value"></el-option>
                      </el-select>
                    </el-form-item>
                    <span v-else>{{ scope.row[item.prop] }}</span>
                  </template>
                  <template v-else>
                    <el-form-item v-if="scope.row.isEdit" :prop="'data.' + scope.$index + '.' + item.prop" :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}" label-width="0">
                      <el-select size="mini" v-model="scope.row[item.prop]" placeholder="全部类型">
                        <el-option v-for="(dicItem, dicIndex) in dictionaryData[item.prop]" :key="dicIndex" :label="dicItem.text" :value="dicItem.dictCode"></el-option>
                      </el-select>
                    </el-form-item>
                    <span v-else>{{ getDictionaryValue(dictionaryData[item.prop], scope.row[item.prop]) }}</span>
                  </template>
                </template>
                <template v-if="item.type === 'input'">
                  <el-form-item v-if="scope.row.isdEit" :prop="'data.' + scope.$index + '.' + item.prop" :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}" label-width="0">
                    <el-input size="mini" :disabled="item.disabled" :maxlength="item.maxlength" v-model="scope.row[item.prop]" type="text" :placeholder="item.label"></el-input>
                  </el-form-item>
                  <template v-else>{{ scope.row[item.prop] }}</template>
                </template>
                <template v-if="item.type === 'fillinput'">
                  <el-form-item :prop="'data.' + scope.$index + '.' + item.prop" :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}" label-width="0" >
                    <el-input size="mini" :disabled="handleDisabledFill(scope.row, item.disabled)" :maxlength="item.maxlength" v-model.trim.number="scope.row[item.prop]" @blur="value => handleBlur(value, scope.row)" type="text" placeholder="请填入"></el-input>
                  </el-form-item>
                </template>
                <template v-if="item.type === 'number'">
                  <el-form-item :prop="'data.' + scope.$index + '.' + item.prop" :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}"  label-width="0">
                    <el-input v-if="tableData.editTable" size="mini" @input.native="(value) => checkNum(scope.$index, item.prop, $event)" :maxlength="item.maxlength" :max="item.max" clearable v-model.number="scope.row[item.prop].value" placeholder="请输入内容"></el-input>
                    <el-input v-else-if="scope.row.isEdit" size="mini" @input.native="(value) => checkNum(scope.$index, item.prop, $event)" :maxlength="item.maxlength" :max="item.max" clearable v-model.number="scope.row[item.prop]" placeholder="请输入内容"></el-input>
                    <span v-else>{{ scope.row[item.prop] }}</span>
                  </el-form-item>
                </template>
                <template v-if="item.type === 'string'">
                  <span :style="item.style">{{ scope.row[item.prop] }}</span>
                </template>
                <template v-if="item.type === 'img'">
                  <el-form-item v-if="scope.row.isEdit" :prop="'data.' + scope.$index + '.' + item.prop" :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}" label-width="0">
                    <div style="width: 148px; height: 148px; margin-bottom: 4px;">
                      <img style="width: 100%; height: 100%; text-align: center;" :src="scope.row[item.prop]" alt>
                    </div>
                    <el-upload class="upload-demo" :action="scope.row.action" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="fileList2" :on-exceed="handleExceed" :limit="1" list-type="picture-card">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </el-form-item>
                  <template v-else>
                    <img :src="scope.row[item.prop]" alt>
                  </template>
                </template>
                <template v-if="item.type === 'images'">
                  <!-- {{scope.row[item.prop]}} -->
                  <el-form-item v-if="scope.row.isEdit" :prop="'data.' + scope.$index + '.' + item.prop" :rules="ruleForm.rules ? ruleForm.rules[item.prop] : {}" label-width="0">
                    <div style="width: 100%; height: 100%; margin-bottom: 4px;" v-for="imgUrl in scope.row[item.prop]" :key="imgUrl">
                      <img style="width: 100%; height: 100%; text-align: center;" :src="imgUrl">
                    </div>
                  </el-form-item>
                  <template v-else>
                    <img v-for="imgUrl in scope.row[item.prop]" :key="imgUrl" :src="imgUrl" style="width:100%; height: 100%;">
                  </template>
                </template>
              </template>
            </el-table-column>
            <template v-else-if="item.type === 'child'">
              <el-table-column :label="item.label" :key="index">
                <el-table-column v-for="(childVal, childIndex) in item.childen" :key="childIndex" :prop="childVal.prop" :label="childVal.label" :width="childVal.width">
                  <template slot-scope="scope">
                    <template v-if="childVal.type === 'btn'">
                      <span v-for="textItem in childVal.textArray" :key="textItem.prop" :style="textItem.style" @click="childOperate(scope, childVal, textItem)">{{ textItem.label }}</span>
                    </template>
                    <template v-else><span :style="item.style">{{ scope.row[childVal.prop] }}</span></template>
                  </template>
                </el-table-column>
              </el-table-column>
            </template>
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
      default: () => { }
    },
    tableTrData: {
      type: Array,
      default: []
    },
    selectTable: {
      type: Array,
      default: () => { }
    },
    dictionaryData: {
      type: Object,
      default: () => { }
    },
    appendTable: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: () => { }
    },
    selection: {
      type: Boolean,
      default: false
    },
    newSummary: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    isSelectable: {
      type: Function,
      default: () => { }
    },
    rules: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      ruleForm: {
        data: []
      },
      form: {},
      multipleSelection: [],
      fileList2: []
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
    // 输入框鼠标失去焦点事件
    handleBlur(value, row) {
      this.$emit("input-blur", value, row);
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
    // 操作栏按钮是否置灰(通用按钮)
    handleDisabled(row) {
      let flag = '';
      if (row.auditability) {
        if (row.auditability === '0') {
          flag = true;
        } else {
          flag = false;
        }
      } else {
        flag = false;
      }
      let flagg = '';
      if (row.disFlag) {
        if (row.disFlag === '0') {
          flagg = true;
        } else {
          flagg = false;
        }
      } else {
        flagg = false;
      }
      let flaggg = '';
      if (row.newFlag) {
        if (row.newFlag === '0') {
          flaggg = true;
        } else {
          flaggg = false;
        }
      } else {
        flaggg = false;
      }
      if (flag || flagg || flaggg) {
        return true;
      } else {
        return false;
      }
    },
    //控制另一个按钮(非通用)
    handleDisabledOne(row) {
      let flag = '';
      if (row.auditability) {
        if (row.auditability === '0') {
          flag = true;
        } else {
          flag = false;
        }
      } else {
        flag = false;
      }
      let anotherBtn = '';
      if (row.anotherFlag) {
        if (row.anotherFlag === '0') {
          anotherBtn = true;
        } else {
          anotherBtn = false;
        }
      } else {
        anotherBtn = false;
      }
      if (anotherBtn || flag) {
        return true;
      } else {
        return false;
      }
    },
    handleDisabledFill(row, item) {
      if (row[item] !== '1') {
        return true;
      } else {
        return false;
      }
    },
    // 向表格添加一条数据
    addAppendTable() {
      this.$emit("add-edit-form-table");
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
      row.isEdit = !row.isEdit;
    },
    // 全选功能
    selectAll(val) {
      this.$emit("change-all-selection", val);
    },
    // 处理表格中的点击事件
    dealWithOperate(scope, prop, iconItem) {
      this.$emit("deal-with-operate", scope, prop, iconItem);
    },
    // 限制输入数字
    checkNum(index, prop, e) {
      this.$nextTick(() => {
        let reg = /(^[1-9]\d*$)|(^0?$)/;
        if (!reg.test(e.target.value - 0)) {
          this.ruleForm.data[index][prop] = "0";
        } else if (e.target.value === '') {
          this.ruleForm.data[index][prop] = "0";
        }
      });
    },
    // 改变按钮状态
    dealWithChangeStatusEvent(scope, operateItem) {
      this.$emit("deal-with-change-status-event", scope, operateItem);
    },
    handlePreview(file, fileList) {
      // console.log(file, fileList, 'kkk');
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList, 'kkk');
    },
    handleSuccess(response, file) {
      // console.log(response, file, this.fileList2);
    },
    handleExceed() {
      this.$message.warning(`当前限制选择1个文件`);
    },
    // 点击单元格获取数据
    cellClick(row, column, cell, event) {
      // console.log(row, column, cell, event, "kkk");
      this.$emit("cell-click", row, column, cell, event);
    },
    // 鼠标移入单元格
    mouseEnter(row, column, cell, event) {
      this.$emit("mouseEnter", row, column, cell, event);
    },
    // 多级表头中的点击事件
    childOperate(scope, prop, iconItem) {
      this.$emit("childOperate", scope, prop, iconItem);
      // console.log(scope, prop, iconItem, 'kkkk');
    }
  },
  watch: {
    tableData: {
      handler(newVal, oldVal) {
        this.copyTableData(newVal);
      },
      deep: true
    },
    // 根据条件默认勾选
    selectTable: {
      handler(newVal, oldVal) {
        if (newVal && newVal.length !== 0) {
          newVal.forEach(row => {
            for (let key in this.ruleForm.data) {
              if (this.ruleForm.data[key].associateId === row.associateId) {
                this.$nextTick(() => {
                  this.$refs.multipleTable.toggleRowSelection(this.ruleForm.data[key]);
                });
              }
            }
          });
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
