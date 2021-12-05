<template>
  <div id="pagequery" class="el-page-query" :style="{width: width + 'px'}">
    <el-dialog title="高级查询" :visible.sync="dialogVisible" class="el-advanced-query-dialog" width="900px">
      <el-button class="btn-add-item" type="success" @click="addQueryItem" icon="el-icon-plus"></el-button>
      <el-row class="el-advanced-query-item" v-for="(item, index) in queryItems" :key="item.index">
        <el-col :span="1">
          <div class="query-item-bracket" @click="toggleLeftBracket(item, index)" :class="{'selected': item.leftBracket}"><span v-show="item.leftBracket">(</span></div>
        </el-col>
        <el-col :span="6" class="left">
          <el-dropdown-list v-model="item.field" :options="options" text-field="title" value-field="field" :clearable="false"></el-dropdown-list>
        </el-col>
        <el-col :span="3" class="middle">
          <el-dropdown-list v-model="item.findType" :options="findTypeOptions" :clearable="false"></el-dropdown-list>
        </el-col>
        <el-col :span="9" class="right">
           <component :is="item.queryOption.component" v-model="item.queryContent" :options="item.queryOption.options" :data-dictionary="item.queryOption.dataDictionary"></component>
        </el-col>
        <el-col :span="1">
          <div class="query-item-bracket" @click="toggleRightBracket(item, index)" :class="{'selected': item.rightBracket}"><span v-show="item.rightBracket">)</span></div>
        </el-col>
        <el-col :span="3" style="text-align:center;">
          <el-radio-list v-if="(index + 1) !== queryItems.length" class="query-item-jointype" v-model="item.joinType" :options="joinTypeOptions" button-view button-size="mini"></el-radio-list>
        </el-col>
        <el-col :span="1" style="text-align:center;">
          <i @click="removeQueryItem(index)" class="el-icon-delete btn-remove" title="删除"></i>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="onAdvancedQuery" size="medium">确 定</el-button>
      </span>
    </el-dialog>

    <div class="item left" :style="{width: width / 2 - 34 + 'px'}">
      <el-select id="queryItem" v-model="queryField" placeholder="请选择" @change="onFieldChange" size="small">
        <el-option v-for="item in options" :label="item.title" :value="item.field" :key="item.field"></el-option>
        <el-option label="高级" value="advancedQuery"></el-option>
      </el-select>
    </div>
    <div class="item middle" :style="{width: width / 2 + 'px'}">
      <component :is="queryOption.component" v-model="queryContent" :options="queryOption.options" :data-dictionary="queryOption.dataDictionary" size="small"></component>
    </div>
    <div class="item right">
      <el-button id="queryButton" icon="el-icon-search" @click="onQuery" size="small"></el-button>
    </div>

  </div>
</template>

<script>


/**
 * getQueryItem
 * @param {*} item
 * @returns {*} query item
 */
function getQueryItem(item) {
  let queryContent = item.queryContent;
  if (
    item.queryOption.component === "ElDatePicker" 
    && !String.isNullOrEmpty(queryContent)
  ) {
    queryContent = Date.format(item.queryContent, "yyyy-MM-dd");
  }
  if (typeof queryContent === "string" && queryContent.indexOf(",") > -1) {
    queryContent = queryContent.split(",");
  } else {
    queryContent = [queryContent];
  }
  return {
    Name: item.field,
    FindType: item.findType,
    Values: queryContent
  };
}

/**
 * hasMatchRightBracket
 * @param {*} queryItems
 * @param {*} index 
 * @returns {*} matchIndex
 */
function hasMatchRightBracket(queryItems, index) {
  let matchIndex = -1;
  for (let i = index, len = queryItems.length; i < len; i++) {
    if (
      (i === index && queryItems[i].rightBracket) 
      || (!queryItems[i].leftBracket && queryItems[i].rightBracket)
    ) {
      matchIndex = i;
      break;
    }
    if (i !== index && queryItems[i].leftBracket) {
      break;
    }
  }
  return matchIndex;
}

/**
 * hasMatchLeftBracket
 * @param {*} queryItems
 * @param {*} index 
 * @returns {*} matchIndex
 */
function hasMatchLeftBracket(queryItems, index) {
  let matchIndex = -1;
  for (let i = index; i >= 0; i--) {
    if (queryItems[i].leftBracket) {
      matchIndex = i;
      break;
    }
  }
  return matchIndex;
}

/**
 * cancelInvalidLeftBracket
 * @param {*} queryItems
 * @param {*} index 
 */
function cancelInvalidLeftBracket(queryItems, index) {
  for (let i = index - 1; i >= 0; i--) {
    if (queryItems[i].leftBracket) {
      queryItems[i].leftBracket = false;
      break;
    }
    if (queryItems[i].rightBracket) {
      break;
    }
  }
}
/**
 * cancelInvalidRightBracket
 * @param {*} queryItems
 * @param {*} index 
 */
function cancelInvalidRightBracket(queryItems, index) {
  for (let i = index; i >= 0; i--) {
    if (i !== index && queryItems[i].rightBracket) {
      queryItems[i].rightBracket = false;
      break;
    }
    if (queryItems[i].leftBracket) {
      break;
    }
  }
  for (let i = index + 1, len = queryItems.length; i < len; i++) {
    if (queryItems[i].rightBracket) {
      queryItems[i].rightBracket = false;
      break;
    }
    if (queryItems[i].leftBracket) {
      break;
    }
  }
}
export default {
  name: "ElPageQuery",
  props: {
    options: Array,
    width: { default: 280 }
  },
  data() {
    return {
      dialogVisible: false,
      queryField: "",
      queryContent: "",
      queryOption: null,
      joinTypeOptions: [
        { text: "AND", value: "And" },
        { text: "OR", value: "Or" }
      ],
      findTypeOptions: [
        { text: "等于", value: "EQ" },
        { text: "不等于", value: "NOT_EQ" },
        { text: "大于", value: "GT" },
        { text: "大于等于", value: "GTE" },
        { text: "小于", value: "LT" },
        { text: "小于等于", value: "LTE" },
        { text: "包含", value: "LIKE" },
        // { text: "不包含", value: "NOT_LIKE" },
        // { text: "范围", value: "BETWEEN" },
        // { text: "包含", value: "IN" },
        // { text: "不包含", value: "NOT_IN" },
        { text: "为空", value: "IS_NULL" },
        { text: "不为空", value: "IS_NOT_NULL" }
      ],
      queryItems: []
    };
  },
  created() {
    this.queryOption = this.options[0];
    this.queryField = this.queryOption.field;
    this.addQueryItem();
  },
  methods: {
    toggleLeftBracket(item, index) {
      item.leftBracket = !item.leftBracket;
      let matchIndex = hasMatchRightBracket(this.queryItems, index);
      if (item.leftBracket) {
        // 选中左括号
        if (matchIndex !== -1) {
          // 取消前面无效的左括号
          cancelInvalidLeftBracket(this.queryItems, index);
        } else {
          this.queryItems[index].rightBracket = true;
        }
      } else if (matchIndex !== -1) {
        // 取消选中左括号
        this.queryItems[matchIndex].rightBracket = false;
      }
    },
    toggleRightBracket(item, index) {
      item.rightBracket = !item.rightBracket;
      let matchIndex = hasMatchLeftBracket(this.queryItems, index);
      if (item.rightBracket) {
        // 选中右括号
        if (matchIndex !== -1) {
          // 取消无效的右括号
          cancelInvalidRightBracket(this.queryItems, index);
        } else {
          this.queryItems[index].leftBracket = true;
        }
      } else if (matchIndex !== -1) {
        // 取消选中右括号
        this.queryItems[matchIndex].leftBracket = false;
      }
    },
    addQueryItem() {
      this.queryItems.push({
        field: this.options[0].field,
        findType: "EQ",
        queryContent: "",
        queryOption: this.options[0],
        joinType: "And",
        leftBracket: false,
        rightBracket: false
      });
    },
    removeQueryItem(index) {
      let item = this.queryItems[index];
      if (item.leftBracket && !item.rightBracket) {
        let matchIndex = hasMatchRightBracket(this.queryItems, index);
        if (matchIndex !== -1) {
          this.queryItems[matchIndex].rightBracket = false;
        }
      } else if (!item.leftBracket && item.rightBracket) {
        let matchIndex = hasMatchLeftBracket(this.queryItems, index);
        if (matchIndex !== -1) {
          this.queryItems[matchIndex].leftBracket = false;
        }
      }
      this.queryItems.splice(index, 1);
    },
    getQueryOption(field) {
      for (let i = 0, len = this.options.length; i < len; i++) {
        if (this.options[i].field === field) {
          return this.options[i];
        }
      }
    },
    onFieldChange(field) {
      if (field === "advancedQuery") {
        this.dialogVisible = true;
        this.queryField = this.queryOption.field;
      } else {
        this.queryContent = "";
        this.queryOption = this.getQueryOption(field);
      }
    },
    onQuery() {
      let queryParams = [];
      if (!String.isNullOrEmpty(this.queryContent)) {
        let queryContent = this.queryContent;
        if (this.queryOption.component === "ElDatePicker") {
          queryContent = Date.format(this.queryContent, "yyyy-MM-dd");
        }
        queryParams.push({
          Name: this.queryOption.field,
          FindType: this.queryOption.findType,
          Values: [queryContent]
        });
      }
      this.$emit("query", queryParams);
    },
    onAdvancedQuery() {
      let queryParams = [];
      let queryItem = { Conditions: [] };
      for (let i = 0, len = this.queryItems.length; i < len; i++) {
        let item = this.queryItems[i];
        if (
          !item.leftBracket 
          && !item.rightBracket 
          && queryItem.Conditions.length === 0
        ) {
          // 单项查询
          let conditionItem = getQueryItem(item);
          if (i !== 0) {
            conditionItem.JoinType = this.queryItems[i - 1].joinType;
          }
          queryParams.push(conditionItem);
        } else {
          // 拼接查询
          if (item.leftBracket) {
            queryItem = { Conditions: [] };
            if (i !== 0) {
              queryItem.JoinType = this.queryItems[i - 1].joinType;
            }
          }
          let conditionItem = getQueryItem(item);
          if (i !== 0 && !item.leftBracket) {
            conditionItem.JoinType = this.queryItems[i - 1].joinType;
          }
          queryItem.Conditions.push(conditionItem);
          if (item.rightBracket) {
            queryParams.push(queryItem);
          }
        }
      }
      this.$emit("query", queryParams);
      this.dialogVisible = false;
    }
  },
  watch: {
    queryItems: {
      deep: true,
      handler: function() {
        this.queryItems.forEach(item => {
          if (item.field !== item.queryOption.field) {
            item.queryOption = this.getQueryOption(item.field);
          }
        });
      }
    }
  }
};
</script>

<style>
.el-page-query {
  display: inline-block;
  position: absolute;
  right: 8px;
  top: 6px;
  /* width: 280px; */
}
.el-page-query > .item {
  float: left;
  box-sizing: border-box;
}

.el-page-query > .left .el-select input {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.el-page-query > .middle {
  /* width: 128px; */
  padding: 0px;
  margin: 0px -1px;
}

.el-page-query > .middle .el-input > input {
  border-radius: 0px;
}

.el-page-query > .right > button {
  padding: 9px 10px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.el-advanced-query-dialog .el-dialog__body {
  padding: 8px 8px 0px 8px;
}
.el-advanced-query-item {
  margin-bottom: 8px;
}
.el-advanced-query-item .btn-remove {
  padding: 7px;
  margin-top: 4px;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.3s;
  color: #777777;
}
.el-advanced-query-item .btn-remove:hover {
  color: #fff;
  background-color: #ff4949;
  border-color: #ff4949;
}

.el-advanced-query-item .left .el-input__inner {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.el-advanced-query-item .middle {
  margin: 0px -1px;
}
.el-advanced-query-item .middle .el-input__inner {
  border-radius: 0px;
}
.el-advanced-query-item .right .el-input__inner {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.el-advanced-query-dialog .el-dialog__body .el-row:first-of-type {
  margin-bottom: 8px;
}

.el-advanced-query-dialog .el-dialog__body .el-row:first-of-type > button {
  padding: 7px;
}

.el-page-query .el-advanced-query-item .el-select .el-input__inner:focus,
.el-page-query .el-advanced-query-item .el-select .el-input__inner:hover,
.el-page-query .el-advanced-query-item .el-input__inner:focus,
.el-page-query .el-advanced-query-item .el-input__inner:hover,
.el-page-query .el-advanced-query-item .el-button:focus,
.el-page-query .el-advanced-query-item .el-button:hover {
  border-color: #bfcbd9;
}

.el-page-query .query-item-bracket {
  display: block;
  text-align: center;
  line-height: 26px;
  height: 28px;
  margin: 4px 7px;
  background-color: #e8e8e8;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid #ddd;
}
.el-page-query .query-item-bracket.selected {
  border-color: #20a0ff;
  background-color: #20a0ff;
}

.el-page-query .query-item-jointype {
  margin-top: 4px;
}

.el-page-query .btn-add-item {
  position: absolute;
  right: 15px;
  bottom: 62px;
  padding: 5px;
  margin-left: -10px;
  z-index: 999;
}

@media screen and (max-width: 900px) {
  .el-page-query {
    display: none;
  }
}
</style>
