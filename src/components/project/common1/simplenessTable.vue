<!--表格组件-->
<style scoped>
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
  cursor: pointer;
  color: #2d92ec;
}
.styEdit {
  cursor: pointer;
  text-decoration: underline;
  color: #409EFF;
  margin-right: 10px;
}
.styDelt {
  cursor: pointer;
  text-decoration: underline;
  color: #FF0000;
  margin-right: 10px;
}
.warning {
  color: red;
}
</style>

<template>
  <div v-loading="loading">
    <el-form label-position="right" size="small" :rules="ruleForm.rules" :model="ruleForm" ref="form">
      <el-table class="can-be-edit-table-container" :data="tableData" border :show-summary="newSummary" :summary-method="getSummaries" @selection-change="selectionChange">
        <el-table-column v-if="selection" fixed="left" :selectable="isSelectable" type="selection" width="55"></el-table-column>
        <template v-for="(item, index) in tableTrData">
          <template v-if="item.type === 'btn'">
            <el-table-column :key="index" :min-width="item.width" :prop="item.prop" :label="item.label" align="center">
              <template slot-scope="scope">
                <span v-for="textItem in item.textArray" :key="textItem.type">
                  <span v-show="textItem.type === 'edit'" class="styEdit" :style="textItem.style" @click="edit(scope.row)">{{textItem.label}}</span>
                  <span v-show="textItem.type === 'delt'" class="styDelt" :style="textItem.style" @click="delt(scope.row)">{{textItem.label}}</span>
                  <span v-show="textItem.type === 'preview'" class="primary" :style="textItem.style" @click="preview(scope.row)">{{textItem.label}}</span>
                  <span v-show="textItem.type === 'skip'" class="primary" :style="textItem.style" @click="skip(scope.row)">{{textItem.label}}</span>
                  <span v-show="textItem.type === 'send'" class="primary" :style="textItem.style" @click="skip(scope.row)">{{textItem.label}}</span>
                </span>
              </template>
            </el-table-column>
          </template>
          <template v-if="item.type === 'index'">
            <el-table-column type="index" :key="index" :label="item.label" :width="item.width" align="center"></el-table-column>
          </template>
          <template v-if="item.type === 'selection'">
            <el-table-column :key="index" :label="item.label" :min-width="item.width" align="center">
              <template slot-scope="scope">
                <el-select v-model="selectValue" @change="selectChange(scope.row)">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </template>
          <template v-if="item.type === 'string'">
            <el-table-column :key="index" :min-width="item.width" :prop="item.prop" :label="item.label" align="center"></el-table-column>
          </template>
        </template>
      </el-table>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "simplenessTable",
  components: {},
  props: {
    tableData: {
      type: Array,
      default: () => { }
    },
    tableTrData: {
      type: Array,
      default: () => { }
    },
    newSummary: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Boolean,
      default: false
    },
    // 用来决定这一行的 CheckBox 是否可以勾选
    isSelectable: {
      type: Function,
      default: () => {
        return true;
      }
    },
    // 自定义合计
    getSummaries: {
      type: Function,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      selectValue: "",
      ruleForm: {
        data: []
      }
    };
  },
  created() {
    // this.ruleForm.data = this.tableData;
  },
  methods: {
    // 编辑
    edit(val) {
      this.$emit("edit", val);
    },
    // 删除
    delt(val) {
      this.$emit("delt", val);
    },
    // 查看
    preview(val) {
      this.$emit("preview", val);
    },
    // 打钩时 的数据
    selectionChange(val) {
      this.$emit("selectionChange", val);
    },
    // 页面跳转
    skip(val) {
      this.$emit("skip", val);
    },
    // 发送/寄送
    send(val) {
      this.$emit("send", val);
    },
    // 下拉框审核
    selectChange(val) {
      this.$emit("selectChange", this.selectValue);
    }
  }
};
</script>


