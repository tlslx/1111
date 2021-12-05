import PageBase from './pageBase';
import Vue from "@/scripts/framework/config";
export default {
  mixins: [PageBase],
  props: {
    dataForm: {},
    params: {},
    // 模板页设置开始
    tableName: String,
    primaryKey: String,
    editColumns: {},
    beforeSubmit: Function,
    afterSubmit: Function,
    afterAdd: Function,
    afterEdit: Function,
    defaultBuModel: String,
    defaultWfName: String,
    systemId: String,
    taskUrl: String,
    fnCurstomInitPage: Function,
    approvalNodes: { type: Array, default: [] },
    customNodes: {},
    beforeApprovalSend: Function
    // 模板页设置结束
  },
  data() {
    return {
      wfTipMsg: "",
      approvalState: "同意",
      approvalDialog: false,
      nextButtonAlias: [],
      pickerDialog: {},
      deptDialog: {},
      SCFDialogVisible: false,
      activeNames: ["1", "4"],
      myopinionVisabled: false,
      reqParams: { action: "", buModel: "", todoId: "", busiId: "" },
      wfData: {},
      wfFormData: {
        excutionMethod: false,
        systemSetting: false,
        uniteTaskType: 1,
        nextAction: "pro",
        taskUrl: "",
        title: "",
        opinion: "",
        systemId: this.systemId,
        selected: {
          nodeid: "",
          express: "",
          userId: "",
          range: ""
        }
      },
      wfName: this.defaultWfName,
      // wfCurrNodeId: "",
      wfCurrNodeName: "",
      wfParams: {
        approvalParams: {
          processParm: {}
        },
        data: {
          id: "" // user id
        }
      },
      workFlowChart: "",
      dataFormOpts: {
        formParams: this.params,
        formId: "",
        loading: false,
        submit: false,
        isEdit: false,
        isView: false,
        modified: false
      },
      isShowSignOn: false,
      saveState: 0,
      selectsectype: "",
      scope: [],
      scopeValue: null,
      orgColumns: [{ field: "name", title: "名称", width: "200", sortable: true }, { field: "descreption", title: "描述", width: "350", sortable: true }],
      postColumns: [{ field: "name", title: "名称", width: "200", sortable: true }, { field: "descreption", title: "描述", width: "350", sortable: true }],
      roleColumns: [{ field: "name", title: "名称", width: "200", sortable: true }, { field: "descreption", title: "描述", width: "350", sortable: true }],
      componentValue: "",
      selectorSort: { prop: "name", order: "ascending" },
      defaultQueryParams: [{
        Name: "Status",
        FindType: "EQ",
        Values: ["1"]
      }]
    };
  },
  mounted() {
    let DatagridDialog = Vue.component("ElDatagridDialog");
    this.pickerDialog = new DatagridDialog({
      propsData: {
        url: process.env.API_COMS_URL + "/api/common/sysUser/getListPage",
        valueField: "id",
        textField: "name",
        treeGridRelateKey: "TopDeptId",
        multiple: false,
        dialogTitle: "用户选择",
        treeUrl: process.env.API_COMS_URL + "/api/common/sysOrg/getListAll",
        treeValueField: "id",
        treeTextField: "name",
        treeParentField: "parentId",
        treeRootId: "0",
        treeDefaultExpandKeys: ["51B09512E4994831B7F7D899D7FCF002"],
        columns: [
          { field: "name", title: "姓名", width: "120", sortable: true },
          { field: "sex", title: "性别", width: "70", formatter: this.sexFt },
          { field: "oaDeptName", title: "部门", sortable: true },
          { field: "oaPositionType", title: "职别", width: "100", sortable: true, formatter: this.$formatter.dataDictionary }
        ]
        // pagination: ""
      }
    }).$mount();
    document
      .getElementsByClassName("wf-page")[0]
      .appendChild(this.pickerDialog.$el);
    this.pickerDialog.$on("selection-change", this.onSelectionChange);

    let TreeDialog = Vue.component("ElTreeDialog");
    this.deptDialog = new TreeDialog({
      propsData: {
        url: process.env.API_COMS_URL + "/api/common/sysOrg/getListAll",
        valueField: "id",
        textField: "name",
        parentField: "parentId",
        rootId: "0",
        multiple: false,
        mergeCheckedNodes: false,
        showCheckbox: true,
        dialogTitle: "机构选择"
      }
    }).$mount();
    document
      .getElementsByClassName("wf-page")[0]
      .appendChild(this.deptDialog.$el);
    this.deptDialog.$on("selection-change", this.onSelectionChange);
  },
  created() {
    this.reqParams.action = this.$utility.getUrlParam("action");
    this.reqParams.todoId = this.$utility.getUrlParam("todoId");
    this.reqParams.buModel = this.$utility.getUrlParam("buModel");
    this.reqParams.busiId = this.$utility.getUrlParam("busiId");
    if (this.reqParams.todoId === "0") {
      this.reqParams.todoId = "";
    }
    if (this.$utility.isEmpty(this.reqParams.buModel)) {
      this.reqParams.buModel = this.defaultBuModel;
    }
    this.fnLoadProcess(
      this.reqParams.action,
      this.reqParams.todoId,
      this.reqParams.buModel,
      this.reqParams.busiId
    );
    this.dataFormOpts.formParams = {};
    this.dataFormOpts.formId = this.reqParams.busiId;

    this.dataFormOpts.isEdit = this.reqParams.action !== "add";
    this.dataFormOpts.isView = this.reqParams.action === "view";

    if (!this.$utility.isEmpty(this.taskUrl)) {
      this.wfFormData.taskUrl = this.taskUrl;
    } else {
      // this.wfFormData.taskUrl = window.location.href.split("?")[0];
      this.wfFormData.taskUrl = window.location.hash.split("?")[0];
    }
  },
  methods: {
    // 创建服务URL
    fnGenWFServUrl(path) {
      return process.env.GJH_INFRA_URL + "/land/md/business/buApproval" + path;
    },
    // 创建选择器服务URL
    fnGenSelectorUrl(selectorName) {
      return process.env.API_COMS_URL + "/api/common/" + selectorName + "/getListPage";
    },
    // 创建工作流表单参数
    fnGenWfParams(userId, action) {
      this.wfParams.data.id = this.$store.getters.userInfo.id;
      this.wfParams.data["5:context"] = this.wfFormData.opinion;
      this.wfParams.approvalParams.action = action;
      this.wfParams.approvalParams.autoTitle 
      = this.$refs["dataForm"].getWfTitle() || this.wfFormData.title;
      this.wfParams.approvalParams.activitiTaskId = this.wfData.params.activitiTaskId;
      this.wfParams.approvalParams.buProcessDefinitionId = this.wfData.params.buProcessDefinitionId;
      this.wfParams.approvalParams.buProcessInstanceId = this.wfData.params.buProcessInstanceId;
      this.wfParams.approvalParams.buProcessModeId = this.wfData.params.buProcessModeId;
      this.wfParams.approvalParams.busiId = this.wfData.params.busiId;
      this.wfParams.approvalParams.processType = this.wfData.params.processType;
      this.wfParams.approvalParams.systemId = this.wfFormData.systemId;
      this.wfParams.approvalParams.taskUrl = this.wfFormData.taskUrl;
      this.wfParams.approvalParams.todoId = this.wfData.params.todoId;
      this.wfParams.approvalParams.processParm.currentNodeId = this.wfData.params.processParm.currentNodeId;
      this.wfParams.approvalParams.processParm.currentNodeName = this.wfData.params.processParm.currentNodeName;
      this.wfParams.approvalParams.excutionMethod = this.wfFormData.excutionMethod;
      this.wfParams.approvalParams.systemSetting = this.wfFormData.systemSetting;
      this.wfParams.approvalParams.uniteTaskType = this.wfFormData.uniteTaskType;
      this.wfParams.approvalParams.covernodeid = this.wfFormData.selected.nodeid; // nextButtonAlias[i].covernodeid
      this.wfParams.approvalParams.processParm.targetNodeId = this.wfFormData.selected.nodeid; // nextButtonAlias[i].covernodeid
      this.wfParams.approvalParams.processParm.express = this.wfFormData.selected.express;
      this.wfParams.approvalParams.processParm.nextNodeuserId = userId || "";
      return this.wfParams;
    },
    // 获取工作流转图
    fnGetWorkFlowChart() {
      var chartUrl = process.env.GJH_INFRA_URL + "/land/md/busi/activitiConfig";
      if (
        this.wfData.params.action === "add" 
        || this.wfData.params.action !== "pro"
      ) {
        let definitionId = this.wfData.params.buProcessDefinitionId;
        chartUrl 
        = chartUrl + "/read?processId=" + definitionId + "&resourceType=image";
      } else {
        let instanceId = this.wfData.params.buProcessInstanceId;
        chartUrl = chartUrl + "/trace?processInstId=" + instanceId;
      }
      return chartUrl;
    },
    // 初始化页面UI
    fnInitPageUI() {
      this.myopinionVisabled = this.wfData.params.action !== "view";
      this.workFlowChart = this.fnGetWorkFlowChart();
      if (this.wfData.task.dealType === '10' && this.wfData.task.status === '10') {
        this.isShowSignOn = true;
      }
      let currentNodeId = this.wfData.params.processParm.currentNodeId;
      let currentNodeName = this.wfData.params.processParm.currentNodeName;
      // this.wfCurrNodeId = currentNodeId;
      this.wfCurrNodeName = currentNodeName;
      this.$refs["dataForm"].setBusiId(this.reqParams.busiId);
      this.$refs["dataForm"].setcurrNodeId(currentNodeId);
      this.$refs["dataForm"].setcurrNodeName(currentNodeName);
      this.$refs["dataForm"].initElementDisabled(currentNodeName);
      if (typeof this.fnCurstomInitPage === "function") {
        this.fnCurstomInitPage(this.wfData);
      }
    },
    // 加载流程数据
    fnLoadProcess(action, todoId, buModel, busiId) {
      // 获取用户Id
      var userId = this.$store.getters.userInfo.id;
      // 初始化获取流程数据服务URL
      var servUrl = this.fnGenWFServUrl("/api/process");
      // 初始化服务参数
      var paramData = {
        action: action,
        todoid: todoId,
        buModel: buModel,
        busiId: busiId,
        userid: userId
      };
      this.$http
        .get(servUrl, paramData)
        .then(resultData => {
          if (resultData.code === "1") {
            // 获取流程数据成功，缓存在页面中
            this.wfData = resultData.data;
            this.nextButtonAlias = this.wfData.nextButtonAlias;
            // console.info(this.wfData);
            // 初始化页面
            this.fnInitPageUI();
          } else {
            // 获取流程数据失败
            this.$message.error(resultData.errMessage);
          }
        })
        .catch(msg => {
          // 错误捕捉
          this.$message.error(msg);
        });
    },
    fnSignOn() {
      var approvalId = this.reqParams.busiId;
      var todoId = this.reqParams.todoId;
      var currentNodeId = this.wfData.params.processParm.currentNodeId;
      var currentNodeName = this.wfData.params.processParm.currentNodeName;
      // 获取用户信息
      var userId = this.$store.getters.userInfo.id;
      var userName = this.$store.getters.userInfo.name;
      // 初始化获取流程数据服务URL
      var servUrl = this.fnGenWFServUrl("/api/signOn");
      var paramData = {
        approvalId,
        todoId,
        currentNodeId,
        currentNodeName,
        userId,
        userName
      };
      this.$http
        .post(servUrl, paramData)
        .then(resultData => {
          if (resultData.code === "1") {
            this.isShowSignOn = false;
          }
        }).catch(msg => {
          // 错误捕捉
          this.$message.error(msg);
        });
    },
    // 保存流程数据
    fnSaveWfData(range, userId, action) {
      let _action = action;
      if (typeof (this.$refs["dataForm"].validateForm) !== 'undefined') {
        this.$refs["dataForm"].validateForm(r => {
          if (r) {
            // 表单状态
            if (this.$utility.isEmpty(_action)) {
              _action = this.wfFormData.nextAction;
            }
            // 事务类型
            this.wfFormData.uniteTaskType = range;
            // 初始化工作流服务URL
            let servUrl = this.fnGenWFServUrl("/api/saveData");
            // console.info(servUrl);
            // 初始化工作流表单保存参数
            let params = this.fnGenWfParams(userId, _action);
            // console.info(params);
            // 执行保存流程数据
            this.saveState = 0;
            this.$http
              .postJson(servUrl, params)
              .then(resultData => {
                if (resultData.code === "1") {
                  // this.wfCurrNodeId = resultData.data.taskId;
                  // this.wfCurrNodeName = resultData.data.taskName;

                  let busiId = resultData.data.map.busiId || " ";
                  let taskId = resultData.data.map.taskId || " ";
                  let taskName = resultData.data.map.taskName || " ";
                  let taskHandles = resultData.data.map.taskHandles || " ";
                  this.$refs["dataForm"].setBusiId(busiId);
                  this.$refs["dataForm"].setcurrNodeId(taskId);
                  this.$refs["dataForm"].setcurrNodeName(taskName);
                  this.$refs["dataForm"].setTaskHandles(taskHandles);
                  if (action !== "pro") {
                    this.$refs["dataForm"].setcurrNodeId("0");
                    this.$refs["dataForm"].setcurrNodeName(this.wfData.params.processParm.currentNodeName);
                  }
                  // this.$refs["dataForm"].fnWFSaveed(resultData.data, params, action, this.wfCurrNodeName);
                  this.$refs["dataForm"].fnWFSaveed(resultData.data, params, action, this.wfCurrNodeName,
                    this.$refs["dataForm"].getForm());
                  this.wfTipMsg = resultData.data.msg;
                  this.fnSaveDataForm();
                  // var busiId = resultData.data.busiId;
                  // 保存成功
                } else {
                  // 保存失败
                  this.$message.error(resultData.errMessage);
                }
              })
              .catch(result => {
                // console.info(result);
              });
          } else {
            this.$message.error("表单验证不通过！");
          }
        });
      }
    },
    // 保存表单数据
    fnSaveDataForm() {
      var formId = this.$refs["dataForm"].getFormId();
      if (
        this.reqParams.action === "add"
        && this.$utility.isEmpty(formId)
      ) {
        this.$refs["dataForm"].setFormId(this.wfData.params.busiId);
      }
      this.dataFormOpts.submit = true;
      this.dataFormOpts.loading = true;
    },
    onSubmitted(r) {
      this.dataFormOpts.submit = false;
      this.dataFormOpts.loading = false;
      this.$nextTick(() => {
        // 因为保存完数据后，会重新给form赋值导致该操作无效，只能在下一帧修改状态
        this.dataFormOpts.modified = false;
      });
      if (r) {
        this.dataFormOpts.isEdit = true;
        this.$message.success(this.wfTipMsg);
        let _this = this;
        setTimeout(() => {
          _this.onClose();
        }, 3000);
      }
    },
    onLoading(flag) {
      this.dataFormOpts.loading = flag;
    },
    onClose(flag) {
      var closeUrl = process.env.GJH_INFRA_URL + "/mg/closeframe";
      if (flag === true) {
        try { 
          window.close(); 
        } catch (ex) { 
          return;
        }
        window.location.href = closeUrl;
      }
      // this.saveState = this.saveState + 1;
      // if (this.saveState === 2) {
      //   // console.info("save and close");
      // }
      try { 
        window.close(); 
      } catch (ex) { 
        return;
      }
      window.location.href = closeUrl;
    },
    onSaveWfData() {
      var action = this.wfData.params.action;
      if (action !== "add") {
        action = "mod";
      }
      this.fnSaveWfData("", "", action);
    },
    fnGetWfFormData() {
      return this.wfFormData;
    },
    onModified() { },
    loadSelection() { },
    sexFt(row) {
      if (row.sex === "1") {
        return "男";
      } else if (row.sex === "0") {
        return "女";
      } else {
        return "未知";
      }
    }
  },
  computed: {
    isApprovalNode() {
      var flag = false;
      if (this.approvalNodes != null && typeof this.approvalNodes !== 'undefined') {
        this.approvalNodes.forEach(e => {
          if (e === this.wfCurrNodeName) {
            flag = true;
          }
        });
      }
      return flag;
    },
    customNodeText() {
      var customText = "";
      if (!this.$utility.isEmpty(this.customNodes)) {
        this.customNodes.forEach(e => {
          if (e.nodeName === this.wfCurrNodeName) {
            customText = e.buttonName;
          }
        });
      }
      return customText;
    }
  }
};
