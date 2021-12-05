<template>
<div class="el-page wf-page">
  <div class="wf-page-top">
    <span class="wf-page-top-name">{{wfName}}
      <span class="wf-page-top-node-name">（当前节点：{{wfCurrNodeName}}）</span>
    </span>
    <div class="wf-page-top-buttons">
      <template v-if="customNodeText != ''">
        <el-button type="primary" 
        v-show="isShowSignOn === false"
        v-if="reqParams.action!=='view'"
        @click="onCustomButtonClick()">{{customNodeText}}</el-button>
      </template>
      <template v-else-if="isApprovalNode">
        <el-button type="primary" 
        v-show="isShowSignOn === false"
        v-if="reqParams.action!=='view'"
        @click="onApproval()">审核</el-button>
      </template>
      <template v-else>
      <el-button type="primary" v-show="isShowSignOn === false"
        v-if="reqParams.action!=='view' && nextButtonAlias.length == 1"       
        @click="handleSendCom(nextButtonAlias[0].newname)">{{nextButtonAlias[0].newname}}</el-button>
      <el-dropdown trigger="hover" placement="bottom-start" 
        @command="handleSendCom" 
        v-if="reqParams.action!=='view' && nextButtonAlias.length > 1" 
        v-show="isShowSignOn === false">
        <el-button type="primary">
          发送<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item 
            v-for="(item, index) in nextButtonAlias" 
            :key='index' :command="item.covernodename">{{item.newname}}</el-dropdown-item>
        </el-dropdown-menu>
        <!-- item.covernodename -->
      </el-dropdown>
      </template>
      <el-button type="primary" @click="fnSignOn" 
        v-if="reqParams.action!=='view'" 
        v-show="isShowSignOn">签收</el-button>
      <el-button type="primary" @click="onSaveWfData" 
        v-if="reqParams.action==='add' || reqParams.action==='mod' ">暂存</el-button>
      <el-button type="primary" @click="onClose(true)">关闭</el-button>
    </div>
  </div>
  <div class="wf-page-main">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基本信息" name="1">
        <component ref="dataForm" 
          :is="dataForm" 
          :params="dataFormOpts.formParams" 
          :form-id="dataFormOpts.formId"
          :is-edit="dataFormOpts.isEdit" 
          :is-view="dataFormOpts.isView" 
          :table-name="dataFormOpts.tableName"
          :primary-key="dataFormOpts.primaryKey" 
          :submit="dataFormOpts.submit" 
          v-loading="dataFormOpts.loading" 
          @loading="onLoading"
          @submitted="onSubmitted" 
          @modified="onModified"
          @sendWf="handleSendCom"
          :edit-columns="editColumns" 
          :before-submit="beforeSubmit" 
          :after-submit="afterSubmit"
          :after-add="afterAdd" 
          :after-edit="afterEdit"></component>
      </el-collapse-item>
      <el-collapse-item title="我的意见" name="4" 
        v-show="myopinionVisabled" v-if="isApprovalNode == false">
          <el-form>
            <el-row>
              <el-form-col label="审批意见：" :span="24">
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入审批意见"
                    v-model="wfFormData.opinion">
                    </el-input>
              </el-form-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="流转记录" name="2">
        <el-datagrid ref="approvalOpinionList" :height="200" row-key="id"
          style="margin-bottom:12px;" 
          :show-checkbox="false"
          :data="wfData.approvalOpinion">
            <el-table-column prop="nodename" label="环节名称"></el-table-column>
            <el-table-column prop="content" label="流转意见"></el-table-column>
            <el-table-column prop="createOrgName" label="所在部门"></el-table-column>
            <el-table-column prop="createUserName" label="用户名称"></el-table-column>
            <el-table-column prop="lastupdTime" label="操作时间"></el-table-column>
        </el-datagrid>
      </el-collapse-item>
      <el-collapse-item title="查看流转图" name="3">
          <el-form>
            <el-row>
                <el-col :span="24">
                  <img :src="workFlowChart" />
                </el-col>
            </el-row>
          </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
  <el-dialog title="范围确认" ref="scopeConfirm" 
    v-model="SCFDialogVisible" width="30%">
   <el-form :inline="true">
     <el-form-item label="范围">
       <el-select v-model="scopeValue" 
          @change="onScopeChange"
          placeholder="请选择范围">
          <el-option
            v-for="item in scope"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
     </el-form-item>
   </el-form>
  </el-dialog>
  <el-datagrid-selector ref="orgSelector" 
      dialog-title="机构选择"
      v-model="componentValue" 
      size="50%" 
      :url="fnGenSelectorUrl('sysOrg')"
      value-field="id" 
      text-field="name"
      :multiple="false"
      :columns="orgColumns"
      :sort="selectorSort"
      :default-query-params="defaultQueryParams"
      @selection-change="onSelectionChange">
    </el-datagrid-selector>
    <el-datagrid-selector ref="postSelector" 
      dialog-title="岗位选择"
      v-model="componentValue" 
      size="small" 
      :url="fnGenSelectorUrl('sysPost')"
      value-field="id" 
      text-field="name" 
      :multiple="false"
      :columns="postColumns"
      :sort="selectorSort"
      :default-query-params="defaultQueryParams"
      @selection-change="onSelectionChange">
    </el-datagrid-selector>
    <el-datagrid-selector ref="roleSelector" 
      dialog-title="角色选择"
      v-model="componentValue" 
      size="50%" 
      :url="fnGenSelectorUrl('sysRole')"
      value-field="id" 
      text-field="name" 
      :multiple="false"
      :columns="roleColumns"
      :sort="selectorSort"
      :default-query-params="defaultQueryParams"
      @selection-change="onSelectionChange">
    </el-datagrid-selector><el-datagrid-selector ref="orgSelector" 
      dialog-title="机构选择"
      v-model="componentValue" 
      size="50%" 
      :url="fnGenSelectorUrl('sysOrg')"
      value-field="id" 
      text-field="name" 
      :multiple="false"
      :columns="roleColumns"
      :sort="selectorSort"
      :default-query-params="defaultQueryParams"
      @selection-change="onSelectionChange">
    </el-datagrid-selector>

    <el-dialog title="流程审核" v-model="approvalDialog">
      <el-form> 
        <el-row>
          <el-form-col label="是否同意：" :span="24" >
            <el-radio-group v-model="approvalState" 
              @change="onApprovalStateChange">
              <el-radio label="同意">同意</el-radio>
              <el-radio label="不同意">不同意</el-radio>
            </el-radio-group>
          </el-form-col>
          <el-form-col label="审核意见" :span="24" >
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入审批意见"
                v-model="wfFormData.opinion">
                </el-input>
          </el-form-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onApprovalClick">确 定</el-button>
        <el-button @click="approvalDialog = false">取 消</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import WfProcessPageBase from "@/components/framework/mixins/wfProcessPageBase";
export default {
  name: "ElPageWfProcess",
  mixins: [WfProcessPageBase],
  methods: {
    getNextButtonIndex(nodename) {
      var index = -1;
      for (let i in this.wfData.nextButtonAlias) {
        if (nodename === this.wfData.nextButtonAlias[i].newname) {
          index = i;
        }
      }
      return index;
    },
    onApproval() {
      if (typeof this.$refs["dataForm"].validateForm !== 'undefined') {
        this.$refs["dataForm"].validateForm(r => {
          if (r) {
            if (this.$utility.isEmpty(this.wfFormData.opinion)) {
              this.wfFormData.opinion = this.approvalState;
            }
            this.approvalDialog = true;
          } else {
            this.$message.error("表单验证不通过！");
          }
        });
      }
    },
    onApprovalClick() {
      if (this.approvalState === "") {
        this.$message.error("请选择是否同意");
        return;
      }
      let selectedNode = this.approvalState;
      if (typeof this.beforeApprovalSend === "function") {
        let tempNode = this.beforeApprovalSend(
          this.wfCurrNodeName,
          this.approvalState,
          this.$refs["dataForm"].form
        );
        if (!this.$utility.isEmpty(tempNode)) {
          selectedNode = tempNode;
        }
      }
      this.handleSendCom(selectedNode);
      this.approvalDialog = false;
    },
    onCustomButtonClick() {
      var selectedNode = "";
      if (typeof this.beforeApprovalSend === "function") {
        let tempNode = this.beforeApprovalSend(
          this.wfCurrNodeName,
          "",
          this.$refs["dataForm"].form
        );
        if (!this.$utility.isEmpty(tempNode)) {
          selectedNode = tempNode;
        }
      }
      this.handleSendCom(selectedNode);
    },
    onApprovalStateChange() {
      this.wfFormData.opinion = this.approvalState;
    },
    // 处理发送按钮操作
    handleSendCom(cmd) {
      if (typeof this.$refs["dataForm"].validateForm !== 'undefined') {
        this.$refs["dataForm"].validateForm(r => {
          if (r) {
            let index = this.getNextButtonIndex(cmd);
            // console.info(cmd, this.wfData.nextButtonAlias, index);
            let nextBtnAlias = this.wfData.nextButtonAlias[index];
            let buProcessModeId = this.wfData.params.buProcessModeId;
            let covernodeid = nextBtnAlias.covernodeid;
            this.wfFormData.selected.nodeid = nextBtnAlias.covernodeid;
            this.wfFormData.selected.express = nextBtnAlias.express;
            // 显示确认信息
            let altinfo = nextBtnAlias.altinfo;
            if (altinfo != null) {
              this.$confirm(altinfo, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              })
                .then(() => {
                  this.fnSendAndCheck(covernodeid, buProcessModeId);
                })
                .catch(() => {
                  // console.info("取消");
                  return;
                });
            } else {
              this.fnSendAndCheck(covernodeid, buProcessModeId);
            }
          } else {
            this.$message.error("表单验证不通过！");
          }
        });
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
      if (resultData == null || resultData.code !== "1") {
        return;
      }

      let data = resultData.data;
      let excutionMethod = data.excutionMethod;
      let receiveuserset = data.receiveuserset;
      let selectrange = data.selectrange;
      let selecttype = data.selecttype;
      let selectvalue = data.selectvalue;
      let selectname = data.selectname;
      let selectsectype = data.selectsectype;
      this.selectsectype = selectsectype;
      this.wfParams.approvalParams.isMultiAction = data.isMultiAction;
      this.wfFormData.excutionMethod = data.excutionMethod;
      this.wfFormData.selected.range = "";
      /**
       * receiveuserset: 1=系统设置接收人/2=自定义选择/3=会签。
       * selecttype: 3=用户自定义选择/4=指定范围中选择
       * selectrange: 1=机构/2=人员/3=岗位/4=角色
       * selectsectype: 1=发起人所在部门/2=指定人员/3=指定机构下的人员
       */
      if (excutionMethod) {
        this.fnSaveWfData("", "", "");
        return;
      }

      // 系统设定接收人
      if (receiveuserset === "1") {
        // 为系统设置接收人，根据默认设置发送
        this.wfFormData.systemSetting = true;
        this.fnSaveWfData("", "", "");
        return;
      }

      // 用户自定义选择接收人
      if (receiveuserset === "2") {
        // 用户自定义选择
        if (selecttype === "3") {
          this.fnShowDialog(selectrange, false, selectvalue);
        } else if (selecttype === "6") {
          this.fnShowDialog(6, "", true, selectvalue, selectname);
        } else if (selecttype !== "3" && selecttype !== "6") {
          // selectrange：1机构，2人员，3岗位，4角色
          if (selectrange !== "2") {
            // 机构、岗位、角色选择
            this.fnShowDialog(selectrange, "", true, selectvalue, selectname);
          } else {
            this.wfFormData.selected.range = "6"; // 设置
            // 人员选择
            let currDeptId = this.userInfo.dept.id;
            if (selectsectype === "1") {
              // 发起人所在部门
              this.fnShowDialog("2", currDeptId, true);
            } else if (selectsectype === "2") {
              // 指定人员
              this.fnShowDialog("2", "", true, selectvalue, selectname);
            } else if (selectsectype === "3") {
              // 指定机构下人员
              this.fnShowDialog("2", "", false, selectvalue, selectname);
            } else if (selectsectype === "4") {
              // 发起人所在部门基层管理
              this.fnShowDialog("2", currDeptId, true, 1);
            } else if (selectsectype === "5") {
              // 发起人所在部门中层管理
              this.fnShowDialog("2", currDeptId, true, 2);
            }
          }
        }
      } else if (receiveuserset === "3") {
        // 会签
        if (selectvalue == null || selectvalue === "") {
          let sponsororgid = "";
          this.wfFormData.selected.range = "5"; // 设置
          this.fnShowDialog(
            "1",
            selectsectype,
            false,
            selectvalue,
            sponsororgid,
            "50"
          );
        } else {
          this.fnSaveWfData("5", selectvalue, "");
        }
      }
    },
    // 显示选人界面
    fnShowDialog(
      selectrange,
      defaultByOrgId,
      hiddenOrgTree,
      selectionIds,
      selectionNames,
      maxValue
    ) {
      this.defaultQueryParams = [
        {
          Name: "Status",
          FindType: "EQ",
          Values: ["1"]
        }
      ];
      if (this.$utility.isContains(selectrange, ",")) {
        this.onSCFOpen(selectrange);
        return;
      }
      // 机构
      // if (selectrange === "1") {
      //   this.wfFormData.selected.range = selectrange;
      //   if (this.$utility.isEmpty(selectionIds)) {
      //     this.deptDialog.selection = [];
      //     this.deptDialog.customParams = {
      //       queryType: selectrange,
      //       selectionIds: selectionIds,
      //       selectionNames: selectionNames
      //     };
      //     this.deptDialog.dialogVisible = true;
      //   } else {
      //     this.defaultQueryParams = this.defaultQueryParams.concat({
      //       Name: "ID",
      //       FindType: "IN",
      //       Values: selectionIds.split(",")
      //     });
      //     this.$refs["orgSelector"].dialogVisible = true;
      //   }
      // }
      // 人员


      if (selectrange === "2") {
        this.wfFormData.selected.range = "6";
        this.pickerDialog.selection = [];
        if (this.selectsectype === "1") {
          this.pickerDialog.customParams = {
            queryType: "1",
            selectionIds: defaultByOrgId
          };
        } else if (this.selectsectype === "2") {
          this.pickerDialog.customParams = {
            queryType: "2",
            selectionIds: selectionIds
          };
        } else if (this.selectsectype === "3") {
          this.pickerDialog.customParams = {
            queryType: "1",
            selectionIds: selectionIds
          };
        } else if (this.selectsectype === "4" || this.selectsectype === "5") {
          this.pickerDialog.customParams = {
            queryType: "1",
            selectionIds: defaultByOrgId,
            oaPositionType: selectionIds
          };
        }
        this.pickerDialog.dialogVisible = true;
      } else {
        this.wfFormData.selected.range = "6";
        this.pickerDialog.customParams = {
          queryType: selectrange,
          selectionIds: selectionIds
        };
        this.pickerDialog.dialogVisible = true;
      }
      // 岗位
      // if (selectrange === "3") {
      //   this.wfFormData.selected.range = selectrange;
      //   this.defaultQueryParams = this.defaultQueryParams.concat({
      //     Name: "ID",
      //     FindType: "IN",
      //     Values: selectionIds.split(",")
      //   });
      //   this.$refs["postSelector"].dialogVisible = true;
      // }
      // 角色
      // if (selectrange === "4") {
      //   this.wfFormData.selected.range = selectrange;
      //   this.defaultQueryParams = this.defaultQueryParams.concat({
      //     Name: "ID",
      //     FindType: "IN",
      //     Values: selectionIds.split(",")
      //   });
      //   this.$refs["roleSelector"].dialogVisible = true;
      // }
    },
    onSCFOpen(range) {
      this.scope = [];
      this.scopeValue = null;
      let arr = range.split(",");
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "1") {
          this.scope.push({ value: "1", label: "机构" });
        } else if (arr[i] === "2") {
          this.scope.push({ value: "2", label: "人员" });
        } else if (arr[i] === "3") {
          this.scope.push({ value: "3", label: "岗位" });
        } else if (arr[i] === "4") {
          this.scope.push({ value: "4", label: "角色" });
        }
      }
      this.SCFDialogVisible = true;
    },
    onScopeChange() {
      if (this.scopeValue === "1") {
        this.wfFormData.selected.range = "1";
        this.deptDialog.selection = [];
        this.deptDialog.dialogVisible = true;
        this.SCFDialogVisible = false;
        return;
      }
      if (this.scopeValue === "2") {
        this.wfFormData.selected.range = "6";
        this.pickerDialog.selection = [];
        this.pickerDialog.dialogVisible = true;
        this.SCFDialogVisible = false;
        return;
      }
      if (this.scopeValue === "3") {
        this.wfFormData.selected.range = "3";
        this.$refs["postSelector"].defaultQueryParams = this.defaultQueryParams;
        this.$refs["postSelector"].dialogVisible = true;
        this.SCFDialogVisible = false;
        return;
      }
      if (this.scopeValue === "4") {
        this.wfFormData.selected.range = "4";
        this.$refs["roleSelector"].defaultQueryParams = this.defaultQueryParams;
        this.$refs["roleSelector"].dialogVisible = true;
        this.SCFDialogVisible = false;
        return;
      }
    },
    // 自定义选择界面确认
    onSelectionChange(selection) {
      let temp = selection;
      temp = temp || [];
      let selectedId = "";
      if (temp.length > 0) {
        let values = [];
        temp.forEach(row => {
          values.push(row["id"]);
        });
        selectedId = values.join();
      }
      if (this.$utility.isEmpty(selectedId)) {
        this.$message.error("请选择人员！");
        return;
      }
      // console.info(this.wfFormData.selected.range, selectedId);
      this.fnSaveWfData(this.wfFormData.selected.range, selectedId);
    }
  }
};
</script>

<style>
/* .app-body {
  overflow: auto !important;
} */
.wf-page .wf-page-top {
  height: 42px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
  border-bottom: 1px;
  border-bottom: #ccc;
  border-bottom-style: solid;
  background-color: white;
}
.wf-page .wf-page-main {
  margin-top: 42px;
}
.wf-page .wf-page-top .wf-page-top-name,
.wf-page .wf-page-top .wf-page-top-node-name {
  display: inline-block;
  height: 42px;
  line-height: 42px;
  font-size: 18px;
  color: darkviolet;
}
.wf-page .wf-page-top .wf-page-top-name {
  border-bottom: 3px;
  border-bottom-color: #20a0ff;
  border-bottom-style: solid;
  margin-left: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
.wf-page .wf-page-top .wf-page-top-node-name {
  font-size: 16px;
  font-style: italic;
}
.wf-page .wf-page-top .wf-page-top-buttons {
  height: 42px;
  line-height: 42px;
  float: right;
  margin-right: 20px;
}

.wf-page .wf-page-top .wf-page-top-buttons button {
  margin-left: 0px;
}
</style>
