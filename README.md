## 说明

## 特性

[vue-cli 支持](https://cli.vuejs.org/)

## 预览

## 安装部署

```sh
npm install
npm run dev
npm run build
```

## 更新日志

> 本插件库严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

```
* 主版本号：含有破坏性更新和新特性。
* 次版本号：向下兼容的功能性新增。
* 修订版本号：向下兼容的问题修正。
```

---

### v0.0.1(Beta)

`2019-01-11`

- Components(组件)

  - 🌟 kindo-box(自定义布局框架,参考src/pages/exhibitionplan/extension)
  - 🌟 kindo-table (自定义翻页控件,参考src/pages/exhibitionplan/extension,方法详见 [element-table](http://element.eleme.io/#/zh-CN/component/table))

- Helper(帮助类,参考utils/helper/)

  - config(全局方法)

    - 🌟 kindo.config.api

  - tableMixIn(混合方法)

    - 🌟 getDict         : 数据字典,表内筛选字典转化获取
    - 🌟 selectionChange : 当表格中选择项发生变化时调用此方法赋值
    - 🌟 get             ：获取表格数据
    - 🌟 filterChange    ：表内筛选
    - 🌟 selectionChange ：表格勾选项目发生变化时触发
    - 🌟 filterHandler   ：element-ui表格列原生属性，数据过滤使用的方法
    - 🌟 resetForm       ：对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    - 🌟 insert          ：表格新增数据新增
    - 🌟 edit            ：表格编辑方法
    - 🌟 save            ：表格新增、编辑后保存
    - 🌟 deleteOne       ：表格单条数据删除
    - 🌟 batch           ：表格批量操作:批量删除、批量审核

  - cache(缓存方法)

    - 🌟 kindo.cache.set
    - 🌟 kindo.cache.get
    - 🌟 kindo.cache.remove
    - 🌟 kindo.cache.clear

  - dictionary(字典方法)

    - 🌟 kindo.dictionary.get         : 调用方法await kindo.dictionary.get('languageType');
    - 🌟 kindo.dictionary.getOpen     : 调用方法await kindo.dictionary.getOpen('languageType');
    - 🌟 kindo.dictionary.getItem     : 调用方法await kindo.dictionary.getItem(source.options, value);
    - 🌟 kindo.dictionary.getLabel
    - 🌟 kindo.dictionary.getValue

  - util(辅助方法)

    - 🌟 kindo.util.getLanguage       : 调用方法await kindo.util.getLanguage('BaseMapLang');
    - 🌟 kindo.util.queryUrlParam
    - 🌟 kindo.util.setUri
    - 🌟 kindo.util.toTree
    - 🌟 kindo.util.formatDate
    - 🌟 kindo.util.formatTime
    - 🌟 kindo.util.alert
    - 🌟 kindo.util.confirm
    - 🌟 kindo.util.notify
    - 🌟 kindo.util.downloadFile
    - 🌟 kindo.util.encode
    - 🌟 kindo.util.decode

  - valid(验证方法)

    - 🌟 kindo.valid.isEmpty
    - 🌟 kindo.valid.length
    - 🌟 kindo.valid.lengthForByte
    - 🌟 kindo.valid.range
    - 🌟 kindo.valid.url
    - 🌟 kindo.valid.number
    - 🌟 kindo.valid.numerical
    - 🌟 kindo.valid.pNumerical
    - 🌟 kindo.valid.interger
    - 🌟 kindo.valid.pInterger
    - 🌟 kindo.valid.nInterger
    - 🌟 kindo.valid.mobile
    - 🌟 kindo.valid.telephone
    - 🌟 kindo.valid.idCard
    - 🌟 kindo.valid.email
