/*
 * updated by zhangwenqi
 * -------------------------------------------------
 * 方法类:
 * 提供表格、表单相关常用方法处理
 * -------------------------------------------------
 * getDict       : 数据字典,表内筛选字典转化获取
 * selectionChange : 当表格中选择项发生变化时调用此方法赋值
 * get         ：获取表格数据
 * filterChange    ：表内筛选
 * selectionChange ：表格勾选项目发生变化时触发
 * filterHandler   ：element-ui表格列原生属性，数据过滤使用的方法
 * resetForm       ：对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
 * insert        ：表格新增数据新增
 * edit        ：表格编辑方法
 * save        ：表格新增、编辑后保存
 * deleteOne       ：表格单条数据删除
 * batch        ：表格批量操作:批量删除、批量审核
 */

/*
 * 工具类常用方法实现
 */

export const tableMixIn = {
  data() {
    return {
      timeout: null
    };
  },
  created() {},
  methods: {
    /*
     * 远程搜索框的清空下拉list
     * ev        ->   事件对象
     * form      ->   表单对象
     * filed       ->   表单的字段
     * gName      ->   下拉list包含的数组
     */

    blurSel(ev, form, filed, gName) {
      setTimeout(() => {
        if (form[filed] === '') {
          this.list[gName] = [];
        }
      }, 500);
    },

    /*
     * 数据字典获取
     * dict      ->   数据字典对象集
     * filtersDict ->   字典转换后表内筛选数据集[可选]
     */

    getDict(dict, filtersDict) {
      for (let k in dict) {
        if (dict.hasOwnProperty(k)) {
          kindo.dictionary
            .getDictionary(k)
            .then(res => {
              dict[k] = res || [];
            })
            .then(() => {
              // 表内筛选数据字典字段名转换
              if (filtersDict && filtersDict.hasOwnProperty(k)) {
                for (let i = 0; i < dict[k].length; i++) {
                  filtersDict[k].push({
                    text: dict[k][i].label,
                    value: dict[k][i].value
                  });
                }
              }
            });
        }
      }
    },

    /*
     * 获取表格数据
     * tableName   ->   表格ref属性值
     */

    get(tableName) {
      // console.log(tableName);
      if (this.$refs[tableName]) {
        this.$refs[tableName].reloadData();
      } else {
        this.$emit('reload');
      }
    },

    /*
     * 获取表格数据
     * form   ->   表格ref属性值
     */

    reset(form) {
      this.$refs[form].resetFields();
    },

    /*
     * 表内筛选
     * filters  ->   表格筛选条件发生变化时方法自身传入数据对象
     * table    ->   表格ref属性值
     * search   ->   表格关联查询数据对象
     */

    filterChange(filters, table, search) {
      for (let k in filters) {
        if (filters.hasOwnProperty(k)) {
          this[search][k] = String(filters[k]);
        }
      }
      this.get(table);
    },

    /*
     * 表格勾选项目发生变化时触发
     * selection      ->   表格勾选框变化时方法自生传入数据对象
     * selectionData  ->   本地表格定义的已勾选数据集变量名称
     */

    selectionChange(selection, selectionData) {
      this[selectionData] = selection;
    },

    /*
     * element-ui表格列原生属性，数据过滤使用的方法
     */

    filterHandler(value, row, column) {
      const property = column['property'];
      if (row[property] !== undefined) {
        // 如果返回数组里不存在对象包裹的属性
        return row[property] === value;
      } else {
        // 如果返回数组里面含有对象包裹的属性
        return row[column['property'].split('.')[0]][column['property'].split('.')[1]];
      }
    },

    /*
     * 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
     * formName     ->   需要重置的表单ref名称
     */

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    /*
     * 表格编辑方法(含内部列表)
     * row       ->   当前行的数据
     * keyid     ->   关键id
     * form      ->   编辑操作的表单实体对象,form要和ref值一致
     * url       ->   获取路径
     */

    addList(form) {
      this[form]['action'] = 'add';
      if (this.$refs[form + 'Table'].internalData.length) {
        this.$refs[form + 'Table'].internalData = [];
      }
    },

    editList(row, keyid, form, url) {
      this[form]['action'] = 'edit';
      this.getList(row, keyid, form, url);
    },

    cloneList(row, keyid, form, url) {
      this[form]['action'] = 'clone';
      this.getList(row, keyid, form, url);
    },

    viewList(row, keyid, form, url) {
      this[form]['action'] = 'view';
      this.getList(row, keyid, form, url);
    },

    deleteList(row, keyid, form, url) {
      this[form]['action'] = '';
      this.deleteOne(row, keyid, 'table', url);
    },

    /*
     * 表格操作(含内部列表)
     * row       ->   当前行的数据
     * keyid     ->   关键id
     * form      ->   编辑操作的表单实体对象,form要和ref值一致
     * url       ->   获取路径
     */

    getList(row, keyid, form, url) {
      kindo.util
        .promise(() => {
          this[form + 'Visible'] = true;
        })
        .then(() => {
          // 初始化，去除校验提示并清空实体
          this.$refs[form].resetFields();
        })
        .then(() => {
          let data = [];
          this.$http.get(url, { [keyid]: row[keyid] }).then(res => {
            data = res;
            // 根据ID查询数据
            for (let key in data) {
              if (this[form].hasOwnProperty(key) === true) {
                this[form][key] = data[key];
                if (Array.isArray(data[key])) {
                  this.$refs[form + 'Table'].internalData = data[key];
                  this['editexp'] = data['exhibitionPeriodNum'] + 1;
                }
              }
            }
          });
        });
    },

    /*
     * 表格新增数据新增
     * visible     ->   新增弹框是否显示变量
     * form      ->   新增操作的表单实体对象
     * fn        ->  函数
     */

    insert(visible, form, fn) {
      kindo.util
        .promise(() => {
          this[visible] = true;
        })
        .then(() => {
          this.$refs[form].resetFields();
        })
        .then(() => {
          this[form] = Object.assign(this[form], this['_' + form]);
        })
        .then(() => {
          if (!kindo.validate.isEmpty(fn)) {
            this[fn]();
          }
        });
    },

    /*
     * 表格编辑方法
     * row       ->   当前行的数据
     * form      ->   编辑操作的表单实体对象,form要和ref值一致
     * visible   ->   编辑弹框是否显示变量
     * fn      ->  函数
     */

    edit(row, form, visible, fn) {
      kindo.util
        .promise(() => {
          this[visible] = true;
        })
        .then(() => {
          // 初始化，去除校验提示并清空实体
          this.$refs[form].resetFields();
        })
        .then(() => {
          for (let key in row) {
            if (this[form].hasOwnProperty(key) === true) {
              this[form][key] = row[key];
            }
          }
        })
        .then(() => {
          if (!kindo.validate.isEmpty(fn)) {
            this[fn](row);
          }
        });
    },

    /*
     * 保存
     * form      ->   要保存数据的表单实体对象
     * table     ->   要保存数据的表格refs属性值
     * visible   ->   要保存数据的弹框是否显示变量
     * url       ->   要保存数据的url,如果传递这个url，就以这个url为准
     */

    save(form, table, visible, url) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let mainUrl = this.$refs[table].url;
          let requestType = 'post';
          // 若有id则为编辑保存
          if (this[form].id) {
            requestType = 'put';
          }
          if (!kindo.validate.isEmpty(url)) {
            mainUrl = url;
          }
          this.$http[requestType](mainUrl, this[form]).then(res => {
            kindo.util.alert(res.message, '提示', 'success');
            this[visible] = false;
            this.get(table);
          });
        }
      });
    },

    /*
     * 单条数据删除
     * id      ->   删除数据的id
     * table     ->   要保存数据的表格refs属性值
     * url       ->   要保存数据的url,如果传递这个url，就以这个url为准
     */

    deleteOne(row, keyid, form, url) {
      let mainUrl = url;
      const commonLang = kindo.util.getLanguage('CommonLang');
      kindo.util.confirm(commonLang.confirmDelete, commonLang.tips, undefined, () => {
        if (!kindo.validate.isEmpty(url)) {
          mainUrl = url;
        }
        this.$http.postJson(mainUrl, { [keyid]: row[keyid] }).then(res => {
          kindo.util.alert(commonLang.deleteSuccess, commonLang.tips, 'success');
          this.get(form);
        });
      });
    },

    /*
     * 表格批量操作:批量删除、批量审核
     * selection   ->   本地定义的表格已勾选数据集
     * table       ->   批量操作对象表格的refs属性值
     * proType     ->   批量操作属性标识，是删除还是审核
     * url       ->   要保存数据的url,如果传递这个url，就以这个url为准
     */

    batch(selection, table, proType, url) {
      let prompt = '';
      let requestType = 'post';
      let urlType = '';
      let ids = this[selection].map(item => {
        return item.id;
      });
      let mainUrl = this.$refs[table].url;
      let params = {
        ids: ids
      };
      switch (proType) {
        case 'delete':
          prompt = '请确定是否批量删除';
          requestType = 'post';
          params = {
            data: {
              ids: ids
            }
          };
          break;
        case 'audit':
          prompt = '请确定是否通过审核';
          urlType = 'batchAudit';
          params = ids.map(item => {
            return {
              id: item
            };
          });
          break;
        default:
          return;
      }
      if (this[selection].length > 0) {
        kindo.util.confirm(prompt, undefined, undefined, () => {
          if (!kindo.validate.isEmpty(url)) {
            mainUrl = url;
          }
          this.$http[requestType](mainUrl + urlType, params).then(res => {
            kindo.util.alert(res.message, '提示', 'success');
            this.get(table);
          });
        });
      } else {
        kindo.util.alert('请至少勾选一条数据', '提示', 'warning');
      }
    },
    // 表格内容居中
    isCenter({ row, column, rowIndex, columnIndex }) {
      return "text-align: center";
    }
  }
};

export default tableMixIn;
