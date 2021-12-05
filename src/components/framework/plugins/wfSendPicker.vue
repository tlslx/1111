<template>
  <el-dropdown trigger="hover" placement="bottom-start" 
    @command="handleSendCom">
    <el-button type="primary">
      流程发送<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item 
        v-for="(item, index) in wfData.nextButtonAlias" 
        :key='index' :command="index">{{item.newname}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: "ElWfSendPicker",
  data() {
    return {
      wfData: {},
      componentValue: "",
      url: "/api/sysUser/getListPage",
      valueField: "id",
      textField: "name",
      treeUrl: "/api/sysOrg/getListAll",
      treeValueField: "id",
      treeTextField: "name",
      treeParentField: "parentId",
      treeRootId: "",
      treeDefaultExpandKeys: ["51B09512E4994831B7F7D899D7FCF002"],
      columns: [
        { field: "name", title: "姓名", width: "120", sortable: true },
        {
          field: "sex",
          title: "性别",
          width: "70",
          sortable: true,
          formatter: this.sexFormatter
        },
        { field: "workDeptname", title: "部门", sortable: true },
        {
          field: "oaPositionType",
          title: "岗位类型",
          width: "100",
          sortable: true
        }
      ]
    };
  },
  methods: {
    handleSendCom(cmd) {
      var nextBtnAlias = this.wfData.nextButtonAlias[cmd];
      var buProcessModeId = this.wfData.params.buProcessModeId;
      var covernodeid = nextBtnAlias.covernodeid;
      var express = nextBtnAlias.express;
      // 显示确认信息
      var altinfo = nextBtnAlias.altinfo;
      if (altinfo != null) {
        this.$confirm(altinfo, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.fnSendAndCheck(covernodeid, buProcessModeId, express);
          })
          .catch(() => {
            return;
          });
      } else {
        this.fnSendAndCheck(covernodeid, buProcessModeId, express);
      }
    },
    // 发送并检测
    fnSendAndCheck(covernodeid, buProcessModeId, express, callback) {
      this.wfFormData.selected.nodeid = covernodeid;
      this.wfFormData.selected.express = express;
      let servUrl = this.fnGenWFServUrl("/api/loadSendToInfo");
      let urlParams = {
        nodeid: covernodeid,
        processmodelId: buProcessModeId
      };
      servUrl = this.$utility.getUrl(servUrl, urlParams);
      this.$http
        .post(servUrl, {})
        .then(resultData => {
          if (this.$utility.isFunction(callback)) {
            return callback(resultData);
          } else {
            this.fnSendAndCheckCallback(resultData);
          }
        })
        .catch(() => {});
    },
    // 发送并检测回调函数
    fnSendAndCheckCallback(resultData) {
      if (resultData != null && resultData.code === "1") {
        let data = resultData.data;
        this.wfFormData.excutionMethod = data.excutionMethod;
        /**
         * data.receiveuserset：1=系统设置接收人/2=自定义选择/3=会签。
         * data.selecttype：3=用户自定义选择/4=指定范围中选择
         * data.selectrange：1=机构/2=人员/3=岗位/4=角色
         * data.selectsectype：1=发起人所在部门/2=指定人员/3=指定机构下的人员
         */
        if (data.excutionMethod) {
          this.fnSaveWfData("", "", "");
        } else if (data.receiveuserset === "1") {
          // 为系统设置接收人，根据默认设置发送
          this.wfFormData.systemSetting = true;
          this.fnSaveWfData("", "", "");
        } else if (data.receiveuserset === "2") {
          // 用户自定义选择
          if (data.selecttype === "3") {
            this.fnShowProcessSelectDialog(
              data.selectrange,
              null,
              data.selectvalue
            );
          } else if (data.selecttype !== "3") {
            // selectrange：1机构，2人员，3岗位，4角色
            if (data.selectrange !== "2") {
              this.fnShowProcessSelectDialog(
                data.selectrange,
                "",
                true,
                data.selectvalue,
                data.selectname
              );
            } else if (data.selectsectype === "1" && data.selectsectype === "2") {
              if (data.selectsectype === "1") {
                // 发起人所在部门
                this.fnShowProcessSelectDialog(
                  data.selectrange,
                  "{globalAttrs.getOrgId()}",
                  true
                );
              } else if (data.selectsectype === "2") {
                // 指定人员
                this.fnShowProcessSelectDialog(
                  data.selectrange,
                  "",
                  true,
                  data.selectvalue,
                  data.selectname
                );
              } else if (data.selectsectype === "3") {
                // 指定机构下人员
                this.fnShowProcessSelectDialog("2", "", false);
              }
            }
          }
        } else if (data.receiveuserset === "3") {
          // 会签
          if (data.selectvalue == null || data.selectvalue === "") {
            let sponsororgid = "";
            this.fnShowProcessSelectDialog(
              "1",
              data.selectsectype,
              false,
              data.selectvalue,
              sponsororgid,
              "50"
            );
          } else {
            this.fnSaveWfData("5", data.selectvalue, data.selectname);
          }
        }
      }
    },
    // 显示选人界面
    fnShowProcessSelectDialog(
      selectrange,
      defaultByOrgId,
      hiddenOrgTree,
      electionIds,
      electionNames,
      maxValue
    ) {
      // this.fnSaveWfData("2", "31f9d476c54d444aa370a47b1f6f1f3f");
    },
    onSelectionChange() {},
    loadSelection() {}
  },
  mounted() {
    let DatagridDialog = Vue.component("ElDatagridDialog");
    this.pickerDialog = new DatagridDialog({
      propsData: {
        url: this.url,
        valueField: this.valueField,
        textField: this.textField,
        treeUrl: this.treeUrl,
        treeValueField: this.treeValueField,
        treeTextField: this.treeTextField,
        treeParentField: this.treeParentField,
        treeRootId: this.treeRootId,
        treeDefaultExpandKeys: this.treeDefaultExpandKeys,
        columns: this.columns,
        multiple: this.multiple,
        pagination: this.pagination,
        dialogTitle: this.dialogTitle
      }
    }).$mount();
    document
      .getElementsByClassName("el-page")[0]
      .appendChild(this.pickerDialog.$el);
    this.pickerDialog.$on("selection-change", this.onSelectionChange);
    this.loadSelection(this.value);
  }
};
</script>

<style>

</style>
