import axios from 'axios';
import { saveAs } from 'file-saver';
export default {
  data () {
    return {
      isFullScreen: false,       // 对话框是否全屏显示
      isSubmit: false,           // 判断数据是否已经提交了
      recordCodeDesc: '',        // 记录根据编码查询的编码名称
      source: {
        status: [],
        language: {},
        assortType: [],          // 目录分类
        revisionType: [],        // 调整类别
        proposedExtension: [],   // 建议展期
        areaCode: [],            // 建议展区
        submitType: []           // 操作类
      },
      count: 0,                  // 点击次数
      isCount: false             // 多次点击按钮置灰
    };
  },
  async created() {
    // 读取数据字典
    // this.source.languageSelection = await kindo.dictionary.get('languageType');
    // 读取国际化
    this.source.language = kindo.util.getLanguage('SeaTariffNumberLang');
    this.source.proposedExtension = await kindo.dictionary.get('exhibitionPeriodNum');  // 展期
    this.source.areaCode = await kindo.dictionary.get('exhibitionArea');                // 展区
    this.source.status = [
      { id: "1", value: "0", label: this.source.language.unsubmitted },             // 未提交
      { id: "2", value: "1", label: this.source.language.pendingReview },           // 待审核
      { id: "3", value: "2", label: this.source.language.auditNotPassed },          // 审核不通过
      { id: "6", value: "6", label: this.source.language.departmentApproval },      // 部门审核通过
      { id: "7", value: "7", label: this.source.language.foreignApproved },         // 外贸司审核通过
      { id: "8", value: "8", label: this.source.language.foreignFailed },           // 外贸司审核不通过
      { id: "9", value: "", label: this.source.language.foreignFailed }             // 等待
    ];
    // 目录分类
    this.source.assortType = [  
      { id: "1", value: "0", label: this.source.language.excludes },                // 剔除
      { id: "2", value: "1", label: this.source.language.commodity }                // 商品
    ];
    // 调整类别
    this.source.revisionType = [ 
      { id: "1", value: "0", label: this.source.language.noChange },                // 无变动
      { id: "2", value: "1", label: this.source.language.editProductName },         // 修改商品名称
      { id: "3", value: "2", label: this.source.language.add },                     // 新增
      { id: "4", value: "3", label: this.source.language.delete }                   // 删除
    ];
    this.source.submitType = [ 
      // { id: "999", value: null, label: this.source.language.pass },              // 通过
      { id: "0", value: "0", label: this.source.language.refuse },                  // 拒绝
      { id: "1", value: "1", label: this.source.language.pass },                    // 通过
      { id: "2", value: "2", label: this.source.language.refuse },                   // 拒绝
      { id: "3", value: "3", label: this.source.language.pass }
    ];
  },
  methods: {
    // 表格内容居中
    isCenter({ row, column, rowIndex, columnIndex }) {
      return "text-align: center";
    },
    // 对话框是否全屏显示
    onChangeSize() {
      this.isFullScreen = !this.isFullScreen;
    },
    // tab栏切换
    handleClick(tab) {
      this.tabIndex = tab.index.toString();
      this.onResetQuery();
    },
    // 公用方法
    onAction(form, action, row) {
      if (this.isSubmit) {
        if (action === 'add') {
          this.$message({
            type: 'warning',
            message: this.source.language.noRequired
          });
          return;
        }
        if (action === 'import') {
          this.$message({
            type: 'warning',
            message: this.source.language.noImport
          });
          return;
        }
      }
      this.$refs[form + 'Dialog'][form + 'Visible'] = true;
      this.$refs[form + 'Dialog']['action'] = action;
      if (row) {
        this.$refs[form + 'Dialog']['rowData'] = row;
      }
    },
    // 日志操作列 对应流程操作
    operationSubmitType(row, column) {
      if (row.actId === 'start' || row.actId === 'submit') {
        return this.source.language.submit;
      } else if (row.actId === 'businessConsultation' || row.actId === 'departmentReview' || row.actId === 'tradeTeamAudit') {
        return kindo.dictionary.getLabel(this.source.submitType, row.submitType);
      } else if (row.actId === 'tradeReview') {
        return this.source.language.pass;
      } else {
        return kindo.dictionary.getLabel(this.source.submitType, row.submitType);
      }
    },
    // 调整申请  日志操作列 对应流程操作
    onApplicationSubmitType(row, column) {
      if (row.actId === 'start' || row.actId === 'submit') {
        return this.source.language.submit;
      } else if (row.submitType === '0') {
        return this.source.language.refuse;
      } else {
        return this.source.language.pass;
      }
    },
    // 申请展区时，验证申请时间是否截止
    onApplication(form, action, row) {
      if (this.time) {
        let date = new Date();
        if (date.getTime() > Date.parse(this.time).getTime()) {
          this.$message({
            type: 'warning',
            message: this.source.language.hasExpired
          });
          return;
        }  
      }
      this.$refs[form + 'Dialog'][form + 'Visible'] = true;
      this.$refs[form + 'Dialog']['action'] = action;
      if (row) {
        this.$refs[form + 'Dialog']['rowData'] = row;
      }
    },
    // 调整建议 判断数据是否已经提交
    isSend() {
      this.$http.get(this.api.isSubmited).then(res => {
        if (res === '1') {
          this.isSubmit = true;   // 已经有数据提交记录
        } else {
          this.isSubmit = false;    // 尚未有数据提交记录
        }
      });  
    },
    // 导出  queryParams 导出时筛选条件（和查询条件一样）
    onExport(queryParams) {
      if (!this.$refs.tableData.internalData.length) {
        this.$message({
          type: 'warning',
          message: this.source.language.empty
        });
        return;
      }
      let params = { json: { "customQueryParams": queryParams, "page": { "current": 999999, "size": 999999 }}};
      const axiosInstance = axios.create({
        responseType: 'blob',
        headers: { 'token': localStorage.getItem("USER_TOKEN") }
      });
      axiosInstance({
        url: this.api.export,
        params: params,
        method: 'get'
      }).then(res => {
        if (res) {
          let fileName = '';
          if (res.headers['content-disposition']) {
            fileName = decodeURIComponent(res.headers['content-disposition'].split('filename=')[1]);
          } else {
            fileName = 'downfile';
          }
          saveAs(res.data, fileName);
        }
      }).catch(result => {
        if (result.response) {
          if (result.response.status === 401) {
            result.message = result.response.data.message;
            kindo.util.alert(this.source.language.error401, '401', 'warning');
          } else {
            result.message = result.response.data.message;
            kindo.util.alert(this.source.language.error404, '404', 'error');
          }
        } else {
          result.message = this.source.language.errorServe;
        }
      });
    },
    // 输入商品编码后 查询到有原商品编码，且商品名称与现在输入的商品名称一致，则调整类别为无变动
    // 未查询到有对应的原商品编码，则调整类别为新增
    codeChange() {
      this.$refs.child.validateField('code', error => {
        if (!error) {
          this.$http.get(this.api.getByCode, { code: this.child.code }).then(res => {
            if (res.code) {
              this.child.codeDesc = res.codeDesc;
              this.child.revisionType = '0';
              this.recordCodeDesc = res.codeDesc;
            } else {
              this.child.revisionType = '2';
              this.recordCodeDesc = '';
            }
          });
        }
      }); 
    },
     // 有匹配的编码时,修改商品名称，则调整类别为 修改商品名称
    codeDescChange() {
      if (this.recordCodeDesc) {
        if (this.child.codeDesc !== this.recordCodeDesc) {
          this.child.revisionType = '1';
        } else {
          this.child.revisionType = '0';
        }
      }  
    },
    // 将对象属性的空字符串改为null
    strToNull(data) {
      for (let k in data) {
        if (data[k] === '') {
          data[k] = null;
        }
      }
      return data;
    }
  },
  computed: {
    form: function () {
      return {
        queryParams: this.queryParams
      };
    }
  }
};
