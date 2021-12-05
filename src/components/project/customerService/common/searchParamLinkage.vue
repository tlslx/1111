/**
 * @file 搜索联动组件
 */
<style scoped>
</style>
<template>
  <div>
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item v-for="(item, index) in data" :key="index" :label="item.label" :label-width="item.width">
        <el-input :id="item.id" clearable v-if="item.type === 'input'" v-model="item.value" placeholder="" onkeyup="this.value=this.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\. @~（）_《》。？?【】：：:;]/g,'')">
        </el-input>
        <!-- @change="(value) => changeValue(value, item.prop)" -->
        <el-select :id="item.id" v-if="item.type === 'select'" clearable v-model="item.value" placeholder="" @change="selectChange">
          <!-- @change="(value) => changeValue(value, item.prop)" -->
          <el-option v-for="selectItem in temp[item.prop]" :key="selectItem.code" :label="selectItem.label" :value="selectItem.value">
          </el-option>
        </el-select>
        <el-select :id="item.id" v-if="item.type === 'unClearSelect'" v-model="item.value" placeholder="请选择" @change="selectChange">
          <!-- @change="(value) => changeValue(value, item.prop)" -->
          <el-option v-for="selectItem in temp[item.prop]" :key="selectItem.code" :label="selectItem.label" :value="selectItem.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="warning" @click="onadd">添加</el-button>
        <el-button v-if="newSummary" type="primary" @click="newSubmit">获取</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "searchParamLinkage",
  data() {
    return {
      formInline: {},
      data: this.searchParamsForm,
      // temp: []
      temp: {}
    };
  },
  props: {
    searchParamsForm: {
      type: Array,
      default: []
    },
    variate: {
      type: String
    },
    dictionary: {
      type: Object
    },
    newSummary: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    'dictionary': {
      handler(newVal) {
        if (this.dictionary) {
          this.temp = JSON.stringify(this.dictionary);
        }
        if (this.temp) {
          this.temp = JSON.parse(this.temp);
        }
      },
      deep: true,
      immediate: true
    }
  },
  // created() {
  //   this.temp = JSON.stringify(this.dictionary);
  //   this.temp = JSON.parse(this.temp);
  // },
  methods: {
    // 修改输入框的值
    changeValue(value, prop) {
      let _this = this;
      const temp = JSON.parse(JSON.stringify(this.dictionary));
      if (value && prop === this.variate) {
        for (let key in temp) {
          this.temp[key] = temp[key].filter(elem => {
            return elem[_this.variate] === value;
          });
        }
      }
      this.temp[this.variate] = temp[this.variate];
    },
    // 查询
    onSubmit() {
      this.$emit("select-params");
    },
    onadd() {
      this.$emit("add-params");
    },
    newSubmit() {
      this.$emit("new-params");
    },
    selectChange(value) {
      this.$emit("select-change", value);
    }
  }
};
</script>


