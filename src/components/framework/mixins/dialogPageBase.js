import PageBase from './pageBase';
export default {
  mixins: [PageBase],
  props: {
    params: {},
    args: {},
    beforeSubmit: Function,
    afterSubmit: Function,
    submit: Boolean,
    isEdit: Boolean,
    isView: Boolean,
    formId: String,
    currNodeId: String,
    currNodeName: String
  },
  data() {
    return {
      primaryKey: "id",
      submitType: "default",
      loading: false,
      name: 'editForm',
      isDialogPage: true,
      form: {},
      formOrginal: "",
      subData: [],
      disableds: {},
      wf: {
        data: {},
        params: {},
        action: "",
        wfCurrNodeName: ""
      }
    };
  },
  created() {
    this.formDefault = this.form;
    if (this.$utility.isEmpty(this.disableds)) {
      for (let item in this.formDefault) {
        this.disableds[item] = false;
      }
    }
    this.loading = true;
    if (this.$utility.isFunction(this.pageLoad)) {
      this.pageLoad();
    }
  },
  computed: {
    dialog() {
      return this.$parent.$parent;
    }
  },
  methods: {
    loadForm() {
      if (!this.isEdit) {
        this.form = Object.assign({}, this.$utility.isEmpty(this.params) ? this.formDefault : this.params);
        this.$nextTick(() => {
          let _this = this;
          setTimeout(() => {
            _this.loading = false;
            if (this.$utility.isFunction(this.pageLoad)) {
              this.pageLoad();
              this.loadSuccess();
            }
          }, 100);
        });
        return;
      }
      let loadParams = this.params;
      if (this.$utility.isEmpty(loadParams)
      && !this.$utility.isEmpty(this.formId)) {
        loadParams = {};
        loadParams["id"] = this.formId;
      }
      // 加载数据
      this.$refs[this.name].load(loadParams).then((data) => {
        this.form = data;
        this.resetForm();
        this.$refs[this.name].$emit('load-success', data);
        this.$nextTick(() => {
          this.loading = false;
          if (this.$utility.isFunction(this.pageLoad)) {
            this.pageLoad();
            this.loadSuccess();
          }
        });
      }).catch((msg) => {
        this.loading = false;
        this.$message.error(msg);
      });
    },
    loadSuccess() {
      // 等页面初始化完成，数据加载成功，记录当前form的原始数据
      this.formOrginal = JSON.stringify(this.form);
    },
    submitForm() {
      // debugger
      if (this.$utility.isFunction(this.submitHandler)) {
        // 自定义提交处理
        (new Promise((resolve, reject) => {
          this.submitHandler(this.form, resolve, reject);
        })).then(data => {
          if (this.subData.length > 0) {
            this.subData.forEach(item => {
              if (item.data) {
                item.data = [];
              }
            });
          }
          this.submitSuccess(data);
        }).catch(msg => {
          this.submitError(msg);
        });
      } else {
        // 提交数据
        this.$refs[this.name].submit(this.isEdit, this.submitType)
          .then((data) => {
            if (this.subData.length > 0) {
              this.subData.forEach(item => {
                if (item.data) {
                  item.data = [];
                }
              });
            }
            this.submitSuccess(data);
          }).catch((msg) => {
            this.submitError(msg);
          });
      }
    },
    resetForm() {
      this.$refs[this.name].resetFields();
    },
    validateForm(fn) {
      this.$refs[this.name].validate(fn);
    },
    // 编辑窗口关闭前调用，默认返回true，返回false则不能立刻关闭
    beforeClose() {
      return true;
    },
    formChanged() {
      // 判断form数据是否改变
      if (JSON.stringify(this.form) !== this.formOrginal) {
        return true;
      } else {
        return false;
      }
    },
    submitSuccess(data) {
      Object.assign(this.form, data);
      this.loading = false;
      this.$emit('submitted', true);
      this.$refs[this.name].$emit('submit-success', data);
    },
    submitError(msg) {
      this.loading = false;
      if (!String.isNullOrEmpty(msg)) {
        this.$message.error(msg);
      }
      this.$emit('submitted', false);
      this.$refs[this.name].$emit('submit-error', msg);
    },
    getWfTitle() {
      return "";
    },
    getFormId() {
      return this.form[this.primaryKey];
    },
    getForm() {
      return this.form;
    },
    setFormId(id) {
      this.form[this.primaryKey] = id;
    },
    setcurrNodeId(taskId) {
      this.form["taskId"] = taskId;
    },
    setcurrNodeName(taskName) {
      this.form["taskName"] = taskName;
    },
    setTaskHandles(taskHandles) {
      this.form["taskHandles"] = taskHandles;
    },
    setBusiId(busiId) {
      this.form["busiId"] = busiId;
    },
    initElementDisabled(nodeName) {
      // this.disableds.forEach(item => {
      //   console.info(item)
      // })
      for (let prop in this.disableds) {
        let item = this.disableds[prop];
        if (item.nodeName) {
          let flag = this.$utility.isContains(item.nodeName, nodeName, "|");
          this.disableds[prop].disabled = flag;
        }
      }
      // if (this.isView) { return true }
      // var formRef = this.$refs[this.name];
      // if (typeof formRef !== 'undefined') {
      //   for (var i = 0; i < formRef.fields.length; i++) {
      //     try {
      //       var item = formRef.fields[i];
      //       var prop = item.prop;
      //       var disabledName = item.$children[0].$attrs.disabledName;
      //       var flag = this.$utility.isContains(disabledName, nodeName, "|");
      //       this.disableds[prop] = flag;
      //     } catch (ex) { }
      //   }
      // }
    },
    fnWFSaveed(data, params, action, wfCurrNodeName) {
      this.wf.data = data;
      this.wf.params = params;
      this.wf.action = action;
      this.wf.wfCurrNodeName = wfCurrNodeName;
    }
  },
  watch: {
    params(newValue) {
      this.resetForm();
      if (this.subData) {
        this.subData.forEach(item => {
          if (item.data) {
            item.data = [];
          }
        });
      }
      this.loading = true;
    },
    loading(newValue) {
      if (newValue) {
        this.loadForm();
      }
      this.$emit('loading', newValue);
    },
    submit(newValue) {
      if (newValue) {
        this.submitForm();
      }
    },
    form: {
      deep: true,
      handler: function (newValue) {
        // console.info(newValue)
        if (!this.loading) {
        //  this.$emit('modified')
        }
      }
    },
    subData: {
      deep: true,
      handler: function (newValue) {
        if (!this.loading) {
          this.$emit('modified');
        }
      }
    }
  }
};
