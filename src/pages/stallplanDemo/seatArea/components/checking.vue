<template>
  <el-container>
    <el-header>
      <headline :label="languageSource.LocationLang.seatCheckLabel" />
    </el-header>
    <el-main class="p-b-n">
      <el-table :data="tableData" border>
        <el-table-column prop="violation" :label="languageSource.LocationLang.violationRuleType"></el-table-column>
        <el-table-column prop="type" :label="languageSource.LocationLang.ruleType"></el-table-column>
        <el-table-column prop="boothCode" :label="languageSource.AdjustmentApply.boothCodeTable"></el-table-column>
        <el-table-column prop="state" :label="languageSource.LocationLang.checkResult" align="center">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.violate" type="success" icon="el-icon-check" class="b-w" circle></el-button>
            <el-button v-else type="danger" icon="el-icon-close" class="b-w"  circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="infoData" border>
        <el-table-column prop="violation" :label="languageSource.LocationLang.violationRuleType"></el-table-column>
        <el-table-column prop="type" :label="languageSource.LocationLang.ruleType"></el-table-column>
        <el-table-column prop="boothCode" :label="languageSource.AdjustmentApply.boothCodeTable"></el-table-column>
        <el-table-column prop="state" :label="languageSource.LocationLang.checkResult" align="center">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.violate" type="success" icon="el-icon-check" class="b-w" circle></el-button>
            <el-button v-else type="danger" icon="el-icon-close" class="b-w"  circle></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="content" :label="languageSource.LocationLang.forceReason" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.violate" type="text" size="small" :id="scope.row.companyId" @click="showTextInput" >
              {{(tabMsg !== '') ? tabMsg : languageSource.CommonLang.edit1}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
       <el-table :data="reevaluationData" border v-if="reevaluationState">
        <el-table-column prop="violation" :label="languageSource.LocationLang.violationRuleType"></el-table-column>
        <el-table-column prop="state" :label="languageSource.LocationLang.checkResult" align="center">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.state" type="success" icon="el-icon-check" class="b-w" circle></el-button>
            <el-button v-else type="danger" icon="el-icon-close" class="b-w"  circle></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="operation" :label="languageSource.LocationLang.forceReason" :min-width="200" align="center">
          <el-upload
            v-if="showOperation"
            ref="upload"
            accept=".xls, .xlsx"
            :limit="1"
            :action="config.api.uploadReappraisal"
            :headers="{ 'Token': store.getters.token }"
            :file-list="fileList"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-remove="beforeRemove"
            :auto-upload="true">
            <el-button type="primary" v-show="showOperation" class="float-left" @click="downloadTemplate">{{languageSource.LocationLang.downloadExcel}}</el-button>
            <el-button slot="trigger" v-show="showOperation" type="primary">{{languageSource.LocationLang.selectFile}}</el-button>
            <span slot="tip" v-show="showOperation"><span class="tip-margin">{{languageSource.RuleSettingLang.tips}}</span></span>
          </el-upload>
          <div v-else>
            <!-- <el-button type="primary"  @click="downloadFile">{{languageSource.AdjustmentApply.download}}</el-button> -->
            <label @click="downloadFile" class="download-label" style="text-decoration: underline;">{{fileName}}</label>
            <span v-show="newFileState" style="margin-left: 10px;" ><i class="el-icon-close download-label" @click="removeFile"></i></span>
          </div>
          <!--<template slot-scope="scope">
            <el-button v-if="scope.row.violate" type="text" size="small" :id="scope.row.companyId" @click="showTextInput" >
              {{(tabMsg !== '') ? tabMsg : languageSource.CommonLang.edit1}}
            </el-button>
          </template>-->
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog
      :title="languageSource.CommonLang.detaiInfo"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="50%">
      <el-form :model="messageForm" ref="messageForm" label-position="left" label-width="92px" :rules="rules">
        <el-form-item :label="languageSource.LocationLang.explainReason" prop="messageText" class="m-b">
          <el-input type="textarea" v-model="messageForm.messageText" rows="6" :maxlength="256"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="clear">{{languageSource.CommonLang.cancel}}</el-button>
        <el-button type="primary" @click="submitFunc" >{{languageSource.CommonLang.confirm}}</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import store from '../../../../scripts/framework/store';
import config from './index';
import bridge from './bridge';
import axios from 'axios';
const http = axios.create({
  headers: { Token: localStorage.getItem('USER_TOKEN') },
  responseType: 'blob',
  timeout: 60000
});
export default {
  name: 'checking',
  mixins: [listPageBase],
  components: {
    'headline': () => import('../../components/headline')
  },
  props: {
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      config,
      store,
      'tableData': [],
      'uploadShow': false, //文件上传按钮显示状态
      'dialogVisible': false, //弹框显示状态
      'messageForm': {
        'messageText': ''
      },
      //校验规则
      'rules': {
        messageText: []
      },
      'infoData': [],
      'tabMsg': '',
      'reevaluationData': [{
        'violation': '企业是否需要重评',
        state: true
      }], //企业重评信息数据
      'reevaluationState': false, //企业重评表格是否显示状态,
      'schemeInfo': {}, // 方案基本信息
      fileList: [],
      'showOperation': true,
      paSchemeEnterpriseList: [],
      fileId: "",
      fileName: "",
      newFileState: true  //是否是新增或修改方案的文件上传
    };
  },
  created () {
    let languageSource = this.languageSource;
    let scopeRow = this.$route.query.scopeRow;
    let tag = this.$route.query.tag;
    //判断是否是位置调整页面，位置调整页面不展示企业重评表格
    let tagState = (tag === 'businessArrange' || tag === 'patchSchemeAdd' || tag === 'patchSchemeReview');
    // scopeRow && scopeRow.reevaluationState &&
    if (scopeRow.exhibitionProperty.indexOf('品牌') >= 0 && !tagState) {
      this.reevaluationState = true;
    } else {
      this.reevaluationState = false;
    }
    this.rules = {
      messageText: [
        { required: true, message: languageSource.LocationLang.explainReasonTips, trigger: 'change' },
        { max: 255, message: languageSource.LocationLang.toLongMsg, trigger: 'change' }
      ]
    };
    this.schemeInfo = {
      exhibitionAreaName: scopeRow.exhibitionAreaName,
      exhibitionAreaCode: scopeRow.exhibitionAreaCode,
      sessionNumber: scopeRow.sessionNumber,
      isCentralPassage: scopeRow.isCentralPassage,
      exhibitionPeriod: scopeRow.exhibitionPeriod,
      exhibitionProperty: scopeRow.exhibitionProperty,
      exhibitionKind: scopeRow.exhibitionKind
    };
  },
  mounted () {
    // 订阅gear组件的事件,获取企业分配的展位数据
    bridge.$on('data-to-checkeing', (data) => {
      this.paSchemeEnterpriseList = Object.values(data);
    });
    const scopeRow = this.$route.query.scopeRow;
    if (this.$route.query.tag === "seatApply" && scopeRow.fileId && scopeRow.delete) {
      this.fileList.push({
        name: scopeRow.fileName
      });
      this.fileId = scopeRow.fileId;
      this.fileName = scopeRow.fileName;
      this.showOperation = false;
      this.reevaluationData[0].state = false;
      this.newFileState = true;
    } else if (scopeRow.fileId) { // 企业是否上传文件
      this.fileList.push({
        name: scopeRow.fileName
      });
      this.fileId = scopeRow.fileId;
      this.fileName = scopeRow.fileName;
      this.showOperation = false;
      this.reevaluationData[0].state = false;
      this.newFileState = false;
    } else {
      this.newFileState = true;
    }
  },
  methods: {
    //显示强制说明输入框
    showTextInput () {
      this.messageForm.messageText = this.tabMsg;
      this.dialogVisible = true;
    },
    //取消方法
    clear () {
      this.$refs.messageForm.resetFields();
      this.dialogVisible = false;
    },
    //确定方法
    submitFunc () {
      this.$refs.messageForm.validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          this.tabMsg = this.messageForm.messageText;
        }
      });
    },
    downloadFunc (blobData, fileName) {
      const blob = new Blob([blobData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
      if (window.navigator.msSaveOrOpenBlob) {
        //如果是ie浏览器
        navigator.msSaveBlob(blob, fileName); //下载路径为默认路径
      } else {
        let downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.download = fileName; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      }
    },
    // 企业重评模板下载
    downloadTemplate () {
      http.post(this.config.api.downloadReappraisal,
       Object.assign({ "paSchemeEnterpriseList": this.paSchemeEnterpriseList }, this.schemeInfo))
      .then(res => {
        this.downloadFunc(res.data, '企业重评模板模板.xls');
      });
    },
    // 企业上传文件下载
    downloadFile () {
      window.location.href = `${this.config.api.downloadFile}/${this.fileId}?gridBucket=EXP_EXHIBITION`;
      /*this.$http.get(`${this.config.api.downloadFile}/${this.fileId}?gridBucket=EXP_EXHIBITION`)
      .then(res => {
        this.downloadFunc(res.data, this.fileName);
      });*/
    },
    beforeRemove () {
      const scopeRow = this.$route.query.scopeRow;
      if (!scopeRow.status || scopeRow.status === 1) {
        return true;
      }
      return false;
    },
    handleRemove (file, fileList) {
      if (!fileList.length) {
        this.fileList = fileList;
        this.showOperation = true;
        this.reevaluationData[0].state = true;
      }
    },
    handleSuccess (response, file, fileList) {
      if (response.errorCode === 'OTHER') {
        this.fileList = [];
        this.fileId = '';
        this.fileName = '';
        this.showOperation = true;
        this.reevaluationData[0].state = true;
        this.$message.error(response.data);
      } else if (response.flag === '0') {
        this.showOperation = true;
        this.fileList = [];
        this.fileId = '';
        this.fileName = '';
        this.reevaluationData[0].state = true;
        this.$message.error(this.languageSource.LocationLang.reappraisalFial);
      } else {
        this.showOperation = false;
        this.fileList = fileList;
        this.fileId = response.data;
        this.fileName = fileList[0].name;
        this.reevaluationData[0].state = false;
      }
    },
    //删除已上传文件
    removeFile () {
      this.fileList = [];
      this.showOperation = true;
      this.reevaluationData[0].state = true;
    }
  }
};
</script>

<style scoped>
.p-b-n {
  padding-bottom: 0px;
}
.b-w {
  width: 40px
}
.tip-margin {
  margin-left: 10px;
}
.float-left {
  /*float: left;*/
  margin-left: 10px;
}
.download-label {
  cursor: pointer;
}
</style>
