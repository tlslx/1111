<template>
  <div class="kindo-table">
    <el-table
      ref="table"
      v-bind="$attrs"
      v-on="$listeners"
      v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.5)"
      :height="internalHeight"
      :data="internalData"
      :border="internalBorder"
      :highlight-current-row="internalHighlightCurrentRow"
      :stripe="internalStripe"
      @sort-change="internalSortChange"
    >
      <!-- 行号 -->
      <el-table-column
        v-if="pageIndex"
        type="index"
        align="center"
        width="60px"
        :fixed="fixed"
        :label="code"
        class-name="rowNumber"
      >
        <template slot-scope="scope">
          <span v-text="(internalCurrentPage - 1) * internalPageSize + scope.$index + 1"></span>
        </template>
      </el-table-column>

      <slot></slot>
    </el-table>
    <div class="pagination-block">
      <div class="mian-control">
        <slot name="control"> </slot>
      </div>
      <span v-if="pagination" class="pages">{{alltotal}} {{internalTotalPage}} </span> 
      <el-pagination
        v-if="pagination"
        v-bind="$attrs"
        v-on="$listeners"
        :total="internalTotal"
        :current-page.sync="internalCurrentPage"
        :page-sizes="internalPageSizes"
        :page-size="internalPageSize"
        @size-change="_internalSizeChange"
        @current-change="_internalCurrentChange"
        layout="total, sizes, prev, pager, next, jumper, ->, slot"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-return-await */
/* eslint-disable no-unexpected-multiline */

import $ from "jquery";
export default {
  name: "kindo-talbe",

  mixins: [
    {
      methods: {
        trigger(method, ...args) {
          const {
            $refs: { table }
          } = this;
          if (table && table[method]) {
            table[method](...args);
          }
        },
        toggleRowSelection(...args) {
          this.trigger("toggleRowSelection", ...args);
        },

        toggleRowExpansion(...args) {
          this.trigger("toggleRowExpansion", ...args);
        },

        setCurrentRow(...args) {
          this.trigger("setCurrentRow", ...args);
        },

        clearSort() {
          this.trigger("clearSort");
        },

        clearFilter() {
          this.trigger("clearFilter");
        },

        clearSelection(...args) {
          this.trigger("clearSelection", ...args);
        },

        setCurrentRowIndex(rowIndex) {
          this.setCurrentRow(this.internalData[rowIndex]);
        }
      }
    }
  ],

  props: {
    // 属性扩展, 是否分页
    pagination: { type: Boolean, default: true },
    // 属性扩展, 是否启用行号
    pageIndex: { type: Boolean, default: true },
    // 属性扩展, 是否固定编号
    fixed: { type: Boolean, default: true },
    // 属性扩展, 是否自定义传参
    custom: { type: Boolean, default: true },
    // 属性扩展, 从远程站点请求数据的 URL
    url: String,
    // 属性扩展, 当请求远程数据时，发送的额外参数
    queryParam: Object,
    // step 1, 属性扩展, 当获取远程数据后, 返回要显示的过滤数据
    loadFilter: Function,
    // step 2, 属性扩展, 当获取远程数据后, 并且进行了 step 1, 定义如何加载数据
    loader: Function,
    // step 3, 属性扩展, 当获取远程数据后, 并且进行了 step 2, 定义加载完毕后如何操作
    loaded: Function
  },

  data() {
    return {
      // el-table 的 loading 展示
      loading: false,
      code: '序号',
      alltotal: '总页数',
      // 重载 el-table的 props : data
      internalData: this.$attrs.data || [],
      // 重载 el-table的 props : border
      internalBorder: this.$attrs.border || true,
      // 重载 el-table的 props : highLightCurrentRow
      internalHighlightCurrentRow: this.$attrs.highLightCurrentRow || true,
      // 重载 el-table的 props : stripe
      internalStripe: this.$attrs.stripe || true,
      // 重载 el-table的 props : height
      internalHeight: this.$attrs.height,
      // 重载 el-table的 event : sortChange
      internalSortChange:
        this.$listeners.sortChange || this._internalSortChange,

      // 重载 el-pagination props : total, 组件内部或外部可能会使用
      internalTotal: this.$attrs.total || 0,
      // 重载 el-pagination props : currentPage, 组件内部或外部可能会使用
      internalCurrentPage: this.$attrs.currentPage || 1,
      // 重载 el-pagination props : pageSizes, 组件内部或外部可能会使用
      internalPageSizes: this.$attrs.pageSizes || [5, 10, 15, 20, 30, 50, 100],
      // 重载 el-pagination props : pageSize, 组件内部或外部可能会使用
      internalPageSize: this.$attrs.pageSize || 10,
      
      internalTotalPage: this.$attrs.pages || 0,

      // 自定义表格数据筛选方法
      internalLoadFilter: this.loadFilter || this._loadFilterFunc,
      // 高级用法, 自定义表格数据加载及展示方法(非特殊要求, 不做更改)
      internalLoader: this.loader || this._loaderFunc,
      // 高级用法, 定义加载完毕后如何操作(非特殊要求, 不做更改)
      internalLoaded: this.loaded || this._loadedFunc,
      
      userheight: 120
    };
  },

  mounted() {
    this.$nextTick(function () {
      this.computeStyle();
    });
  },

  created() {
    let _this = this;
    let that = _this;
    
    let language = kindo.cache.get('language');
    if (language === 'en') {
      this.code = 'index';
      this.alltotal = 'total';
    }
    this.resizeHandler = function () {
      that.computeStyle();
    };
    window.addEventListener("resize", this.resizeHandler);
  },

  methods: {
    computeStyle() {
      let _this = this;
      setTimeout(function() {
        let height = 0;
        let diagheight = $(".el-dialog__body").height();
        let pageheight = $(".el-layout-item.center").height();
        let minheight = 0;
        let pagewidth = $(".pagination-block .mian-control");
        let paginationwidth = $(".el-pagination");
        if (pagewidth.width() + paginationwidth.width() > 1400) {
          pagewidth.css('float', 'none');
          minheight = 40;
        } else {
          pagewidth.css('float', 'left');
        }
        if (typeof diagheight === 'undefined' || diagheight < 0) {
          // console.log(_this.$attrs);
          // console.log(_this.internalHeight);
          height = window.document.documentElement.clientHeight;
          let topheight = _this.getItemHeight("top");
          $(".el-layout-item.center").height(height - topheight);
          // if (_this.$el.parentNode.className === "main" || _this.$el.parentNode.className === "el-page-data" || _this.$el.parentNode.className === "el-col el-col-18") {
          try {
            if (pageheight && !_this.$attrs.height) {
              let conheight = $(".notitle-control").height();
              // let topheight = document.querySelector(
              //   ".el-layout-item.top"
              // ).clientHeight;
              if (conheight) {
                _this.internalHeight = height - topheight - _this.userheight;
              } else {
                _this.internalHeight = height - topheight - _this.userheight + 48 - minheight;
              }
            } else {
              return _this.internalHeight;
            }
          } catch (e) {
            return _this.internalHeight;
          }
        } else {
          // console.log(2222);
          // _this.dynamicHeight();
        }
      }, 100);
    },

    getItemHeight(itemName) {
      let matches = document.querySelectorAll(".top");
      // console.log(matches);
      let count = 0;
      for (let i = 0, len = matches.length; i < len; i++) {
        let node = matches[i];
        if (
          this.hasClass(node.classList, "el-layout-item") 
          && this.hasClass(node.classList, itemName)
        ) {
          count += node.clientHeight;
        }
      }
      if (count > 0) {
        return count;
      }
      return 0;
    },

    hasClass(classList, className) {
      if (typeof classList === 'undefined') {
        return false;
      }
      for (let i = 0, len = classList.length; i < len; i++) {
        if (classList[i] === className) {
          return true;
        }
      }
      return false;
    },
    dynamicHeight() {
      if (!this.$attrs.hasOwnProperty("height")) {
        // 获取 header 高度
        // this.internalHeight = document.querySelector(
        //   ".el-layout-item.center"
        // ).clientHeight;
        // 设定行数高度
        this.internalHeight = this.internalHeight + this.internalPageSize * 40 + this.userheight;
        // 设定可能存在的横向滚动条高度
        // this.internalHeight = this.internalHeight - 300;
      }
    },

    _loadFilterFunc(res) {
      return res;
    },

    _loaderFunc(res) {
      if (res.records) {
        this.internalData = res.records.rows || res.records;
        this.internalTotal = res.total || 0;
        this.internalTotalPage = res.pages || 0;
      }

      return res;
    },

    _loadedFunc(res) {
      this.loading = false;

      return res;
    },

    _internalSizeChange(pageSize) {
      this.internalPageSize = pageSize;
      this.loadListData();
    },

    _internalCurrentChange(currentPage) {
      this.internalCurrentPage = currentPage;
      this.loadListData();
    },

    _internalSortChange(obj) {
      this.sort = obj.prop || undefined;
      let orderlist;

      switch (obj.order) {
        case "ascending":
          this.order = "asc";
          break;

        case "descending":
          this.order = "desc";
          break;

        default:
          this.order = undefined;
          break;
      }
      this.order = orderlist;
      this.loadListData();

      if (this.sortChange) {
        this.sortChange.apply(this, arguments);
      }
    },

    /**
     * 向远程服务器请求数据
     */

    async load(url, queryParam, type) {
      if (!url) {
        throw new Error("尚未配置url, 无法获取远程服务器数据");
      }

      // 启动加载中提示
      this.loading = true;

      // 组织请求参数
      let param = type === "post" ? queryParam : { json: queryParam };
      if (this.custom) {
        let queryList = {};
        queryList = queryParam.queryParams;
        // console.log(queryList);
        if (queryList) {
          param = {
            json: {
              customQueryParams: queryList,
              page: {
                current: queryParam.page,
                size: queryParam.rows
              }
            }
          };
        } else {
          param = {
            json: {
              PageIndex: queryParam.page,
              PageSize: queryParam.rows
            }
          };
        }
      } else {
        param = queryParam;
      }

      // 返回请求结果
      return await this.$http[type](url, param)
        .then(this.internalLoadFilter)
        .then(this.internalLoader)
        .then(this.internalLoaded);
    },

    /**
     * 重新加载数据, 保持在当前页
     */

    async loadListData(config = {}) {
      const type = (this.type || "get").toLocaleLowerCase();
      const url = config.url || this.url;
      let queryParam;
      if (this.custom) {
        queryParam = Object.assign(
          {},
          {
            sort: this.sort,
            order: this.order,
            page: this.pagination && this.internalCurrentPage,
            rows: this.pagination && this.internalPageSize
          },
          config.queryParam || this.queryParam
        );
      } else {
        queryParam = Object.assign(
          {},
          config.queryParam || this.queryParam
        );
      }
      return await this.load(url, queryParam, type);
    },

    /**
     * 重新加载数据, 保持在第一页
     */

    async loadData(config = {}) {
      this.internalCurrentPage = 1;
      return await this.loadListData(config);
    },

    /**
     * 重新加载数据, 保持在第一页
     */

    async reloadData(config = {}) {
      this.internalCurrentPage = 1;
      return await this.loadListData(config);
    }
  }
};
</script>

<style lang="scss">
.kindo-table {
  .el-table th {
    padding: 9px 0;
    background-color: #f5f5f5;
  }
  .el-table th > .cell {
    text-align: center;
  }
  .el-table td {
    padding: 8px 0;
  }
  .el-pagination {
    white-space: pre;
    text-align: right;
    padding: 3px;
    background-color: #fff;
    border: 0px solid #ddd;
    border-top: 0px;
  }
  .mian-control {
    margin: 5px 0 0 8px;
    float: left;
  }
  .pages {
    float: right;
    margin-top: 8px;
    margin-left: 10px;
  }
  @-moz-document url-prefix() {
    .pages {
      margin-top: 22px;
    }
  }
  // .el-pager{
  //   display: none;
  // }
  .el-table--border {
    .rowNumber {
      .cell {
        padding: 0 2px;
      }
    }
  }
}
</style>

