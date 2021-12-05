<template>
  <!-- <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="商协会提出品牌展位数量重新安排方案" name="first"> -->
  <div>
    <!-- <div v-if="!containExhibitionPeriod" style="padding: 15px 0;font-size: 17px;font-weight: bold;color: #d80c18;">当前时间不在品牌展位确认期内，不可确认参展，退出参展和编辑参展信息</div> -->
    <el-form :model="queryForm" :inline="true">
      <el-form-item label="展区">
        <el-select v-model="queryForm.exhibitionArea" clearable>
          <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易团">
        <el-select v-model="queryForm.dealClusterId" clearable>
          <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称">
        <el-input placeholder="请输入" v-model.trim="queryForm.companyName" clearable></el-input>
      </el-form-item>
      <el-form-item label="广交会编码">
        <el-input placeholder="请输入" v-model.trim="queryForm.cantonFairCode" clearable></el-input>
      </el-form-item>
      <el-form-item label-width="130px" label="外贸中心复核情况">
        <el-select v-model="queryForm.reviewResult" clearable>
          <el-option v-for="(item, index) in reviewResultOpts" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="130px" label="审定情况">
        <el-select v-model="queryForm.checkStatus" clearable>
          <el-option v-for="(item, index) in checkStatusOpts" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="rescheduleInfoData.records" @selection-change="handleSelectionChange" v-loading="loading" border>
      <el-table-column type="selection" :selectable="isSelectable"></el-table-column>
      <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
      <el-table-column label="拟安排企业名称" prop="companyName" align="center"></el-table-column>
      <el-table-column label="广交会编码" prop="cantonFairCode" align="center"></el-table-column>
      <el-table-column label="所属交易团" prop="dealClusterName" align="center"></el-table-column>
      <el-table-column label="拟新增安排展位数" prop="scheduleBoothNumber" align="center" ></el-table-column>
      <el-table-column label="拟新增安排展位号" prop="scheduleBooth" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="是否涉及岛型展位" prop="isIsland" align="center">
        <template slot-scope="scope">
          {{ scope.row.isIsland === 0 ? '否' : (scope.row.isIsland === 1 ? '是' : '')}}
        </template>
      </el-table-column>
      <el-table-column label="安排理由" prop="scheduleReason" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="调整方案盖章件" prop="attachment" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.attachment">
            <el-button type="text" @click="handleFileDownload(scope.row)">查看</el-button>
            <el-button type="text" @click="openUpload(scope.row.attachment, scope.row.scheduleId)" :disabled="!(scope.row.reviewResult !== '1')">编辑</el-button>
          </div>
          <div v-else>
            <el-button type="text" @click="openUpload('', scope.row.scheduleId)" :disabled="!(scope.row.reviewResult !== '1')">上传</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="外贸中心复核情况" prop="reviewResult" align="center">
        <template slot-scope="scope">
          {{ scope.row.reviewResult | reviewResult }}
        </template>
      </el-table-column>
      <el-table-column label="复核不通过原因" prop="reviewOpinion" align="center"></el-table-column>
      <el-table-column label="审定情况" prop="checkStatus" align="center">
        <template slot-scope="scope">
          {{ scope.row.checkStatus | checkStatus }}
        </template>
      </el-table-column>
      <el-table-column label="审定不通过原因" prop="checkOpinion" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)" :disabled="!(scope.row.reviewResult !== '1' && scope.row.reviewResult !== '0')">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row.scheduleId)" :disabled="!(scope.row.reviewResult !== '1' && scope.row.reviewResult !== '0')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="space-between" class="pagination-footer">
      <span class="add_btn">
        <el-button type="danger" size="small" @click="handleAdd">新增</el-button>
        <el-button type="danger" size="small" @click="handleSubmit">提交</el-button>
        <el-button type="primary" size="small" @click="handleDownload">下载</el-button>
        <el-button type="primary" size="small" @click="handlePrint">打印</el-button>
      </span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        :page-size="pageInfo.pageSize"
        :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="rescheduleInfoData.total">
      </el-pagination>
    </el-row>
    <!-- 上传弹框 -->
    <el-dialog title="上传" :visible.sync="isUp" v-if="isUp">
      <el-form :model="fileForm" ref="fileForm" :rules="fileRule">
        <el-form-item label="文件选择：" prop="chooseFileName">
          <el-upload ref="upload" action="" accept=".jpg, .jpeg, .png, .gif, .bmp, .pdf" :http-request="handleUploadFile" :on-change="handleChange" :auto-upload="false" :show-file-list="false">
            <el-input placeholder="请选择文件" v-model="fileForm.chooseFileName" @change="handleFileChange" clearable></el-input>
            <div slot="tip" class="el-upload__tip">只能上传图片或pdf文件，且不超过3MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" size="medium" @click="toUpload('fileForm')">上传</el-button>
        <el-button size="medium" @click="isUp = false;">取消</el-button>
      </div>
    </el-dialog>
    <!-- 新增弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="isEdit" v-if="isEdit">
      <el-form class="writeForm" :model="writeForm" ref="writeForm" :rules="writeFormRules" label-width="150px">
        <el-form-item label="展区：" prop="exhibitionArea">
          <el-select v-model="writeForm.exhibitionArea" @change="handleExChange" class="sub-select">
            <el-option v-for="(item, index) in exhibitionAreaList" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拟安排企业名称：" prop="companyName">
          <el-autocomplete class="inline-input" placeholder="请输入" v-model.trim="writeForm.companyName" :fetch-suggestions="querySearch" @select="handleComChange" clearable></el-autocomplete>
          <!--
          <el-select v-model="writeForm.companyId" @change="handleComChange" class="sub-select">
            <el-option v-for="item in companyOptsw" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
          -->
        </el-form-item>
        <el-form-item label="所属交易团：" prop="dealClusterName">
          <el-input v-model="writeForm.dealClusterName" class="sub-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="调整前品牌展位数：" prop="arrangeNumberBefore">
          <el-input v-model="writeForm.arrangeNumberBefore" class="sub-select" disabled></el-input>
        </el-form-item>
        <el-form-item label="拟新增安排展位数：" prop="scheduleBoothNumber">
          <el-input v-model="writeForm.scheduleBoothNumber" class="sub-select" @change="handleSNumChange" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="调整后品牌展位数：" prop="arrangeNumberAfter">
          <el-input v-model="writeForm.arrangeNumberAfter" class="sub-select" disabled></el-input>
        </el-form-item>
        <!--//接口开发中暂时不用
        <el-form-item label="拟新增安排展位号：" prop="scheduleBooth">
          <el-select v-model="writeForm.scheduleBooth" multiple @change="handleSBoothChange" class="sub-select">
            <el-option v-for="(item, key) in scheduleBoothOpts" :key="key" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        -->
        <el-form-item label="拟新增安排展位号：" prop="scheduleBooth" @change="handleSBoothChange">
          <el-input v-model="writeForm.scheduleBooth" class="sub-select"></el-input>
        </el-form-item>
        <el-form-item label="是否涉及岛型展位：" prop="isIsland">
          <el-select v-model="writeForm.isIsland" class="sub-select">
            <el-option v-for="item in isIslandOptsw" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安排理由：" prop="scheduleType">
          <el-checkbox-group v-model="writeForm.scheduleType" :max="1">
            <el-checkbox :label="'1'">
              该展区现有品牌企业，安排理由
              <span v-if="!handleCheckboxSelect('1', 'scheduleTextOne')">______</span>
              (请说明)
            </el-checkbox>
            <el-input type="textarea" v-model="scheduleText.scheduleTextOne" :rows="2" v-if="handleCheckboxSelect('1', 'scheduleTextOne')" placeholder="请输入安排理由" maxlength="500" clearable></el-input>
            <el-checkbox class="item-Num" :label="'2'">
              该展区有需求的合格候补企业中排名第
                <span v-if="!handleCheckboxSelect('2', 'scheduleTextTwo')">______</span>
                <el-input v-if="handleCheckboxSelect('2', 'scheduleTextTwo')" type="number" v-model.number="scheduleText.scheduleTextTwo" size="small" oninput="if(value>4)value=value.slice(0,4)" placeholder="请输入" style="width: 70px;"></el-input>
              (请严格按分数高低安排)
            </el-checkbox>
            <el-checkbox :label="'3'">其他理由：(可另文说明)</el-checkbox>
            <el-input v-if="handleCheckboxSelect('3', 'scheduleTextThree')" v-model="scheduleText.scheduleTextThree" class="sub-select" :rows="4" type="textarea" maxlength="500" placeholder="请输入其他理由"></el-input>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" size="medium" @click="submitAdd('writeForm', dialogBtn)">{{ dialogBtn }}</el-button>
        <el-button type="info" size="medium" @click="isEdit = false;">取消</el-button>
      </div>
    </el-dialog>
  </div>
    <!-- </el-tab-pane>
  </el-tabs> -->
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
import store from '../../scripts/framework/store';
// import consortConfList from '../../scripts/project/onlineService/apis/enterpriseServiceResearchManage/consortConfList';
export default {
  mixins: [listPageBase],
  data() {
    let validateBoothNum = (rule, value, callback) => {
      let str = /^[0-9]*$/;
      if (!this.writeForm.exhibitionArea) {
        // if (!num) {
        //   return callback(new Error('请先选择展区'));
        // }
        return callback(new Error('请先选择展区'));
      }
      // if (value > num) {
      //   return callback(new Error('输入展位数不能大于' + num));
      // }
      if (!str.test(value)) {
        return callback(new Error('请输入数字'));
      } else {
        return callback();
      }
    };
    let validateScheduleBooth = (rule, value, callback) => { //单个展位号暂时不判断
      //let str = /^[0-9]*$/;
      //let valScheduleBooth = this.writeForm.scheduleBooth;
      if (value) {
        let schBoothArray = value.split(',');
        // if (schBoothArray.length > 0) {
        //   for (let index = 0; index < schBoothArray.length; index++) {
        //     if (!str.test(schBoothArray[index])) {
        //       return callback(new Error('单个展位号必须为数字'));
        //     }
        //   }
        // } else
        if (schBoothArray.length > 500) {
          return callback(new Error('展位号总数不能大于500'));
        } else {
          return callback();
        }
      } else {
        return callback();
      }
    };
    let validateCompanyName = (rule, value, callback) => {
      //let valCompanyName = this.writeForm.companyName;
      if (value) {
        let comNameArray = value.split('');
        if (comNameArray.length > 50) {
          return callback(new Error('企业名称长度不能大于50'));
        } else {
          return callback();
        }
      }
    };
    return {
      containExhibitionPeriod: true, // 判断是否在参展期内
      obj: [],
      printData: [],
      activeName: 'first',
      loading: '',
      multipleSelection: [],
      store,
      checkReviewResult: false, //用于判断是否有提交数据
      dialogTitle: '', // 弹框标题
      isEdit: false,
      dialogBtn: '',
      esType: '', // 新增编辑类型
      resData: '',
      restaurant: [], //企业可查询
      checkScheduleBoothNumber: '', //校验展位数
      scheduleText: {
        scheduleTextOne: '',
        scheduleTextTwo: '',
        scheduleTextThree: ''
      },
      // 外贸中心复核情况
      reviewResultOpts: [
        { label: '未复核', value: '0' },
        { label: '通过', value: '1' },
        { label: '不通过', value: '2' }
      ],
      // 外贸司审定情况
      checkStatusOpts: [
        { label: '未审定', value: '0' },
        { label: '通过', value: '1' },
        { label: '不通过', value: '2' }
      ],
      // 上传
      isUp: false,
      fileForm: {
        chooseFileName: '', // 文件选择名称
        scheduleId: '',
        attachment: ''
      },
      fileRule: {
        chooseFileName: [{ required: true, message: '请选择需上传的文件', trigger: 'change' }]
      },
      exhibitionAreaOpts: [],
      exhibitionAreaList: [], //新增页面展区数据
      delegationOpts: [],
      companyOpts: [],
      companyOptsw: [],
      scheduleBoothOpts: [],
      isIslandOptsw: [{ value: 0, label: '否' }, { value: 1, label: '是' }],
      scheduleReasonOptsw: [{ value: '1', label: '该展区现有品牌企业，安排理由______(请说明)' }, { value: '2', label: '该展区有需求的合格候补企业中排名第______(请严格按分数高低安排)' }, { value: '3', label: '其他理由：(可另文说明)' }],
      queryForm: {
        exhibitionArea: '',
        coceralId: '',
        dealClusterId: '',
        companyName: '',
        cantonFairCode: '',
        multipleSelection: '',
        reviewResult: '',
        checkStatus: ''
      },
      writeForm: {
        scheduleId: '',
        exhibitionArea: '',
        exhibitionAreaName: '',
        companyId: '',
        companyName: '',
        companyCode: '',
        cantonFairCode: '',
        dealClusterId: '',
        dealClusterCode: '',
        dealClusterName: '',
        scheduleBoothNumber: '',
        //scheduleBooth: [],
        arrangeNumberBefore: '', //调整前品牌展位数
        arrangeNumberAfter: '', //调整后品牌展位数
        scheduleBooth: '',
        arrangableBoothNumber: '',
        isIsland: '',
        scheduleType: [],
        scheduleReason: '',
        isNewEnterprises: '',
        coceralId: this.$store.getters.userInfo.org.deptId,
        coceralName: this.$store.getters.userInfo.org.deptName
      },
      reasonArr: [],
      writeFormRules: {
        exhibitionArea: [{ required: true, message: '请选择展区', trigger: 'change' }],
        companyName: [
          { validator: validateCompanyName, trigger: 'blur' },
          { required: true, message: '请选择展区后再选择企业', trigger: 'change' }
        ],
        scheduleBoothNumber: [
          { validator: validateBoothNum, trigger: 'blur' },
          { required: true, message: '请输入展位数', trigger: 'blur' }
        ],
        scheduleBooth: [
           { validator: validateScheduleBooth, trigger: 'blur' }
         // { required: true, message: '请选择展区后再选择展位号', trigger: 'change' }
        ],
        isIsland: [{ required: true, message: '请选择是或否', trigger: 'change' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    reviewResult(value) {
      switch (value) {
        case '0':
          return '未复核';
        case '1':
          return '通过';
        case '2':
          return '不通过';
        default:
          return '';
      }
    },
    checkStatus(value) {
      switch (value) {
        case '0':
          return '未审定';
        case '1':
          return '通过';
        case '2':
          return '不通过';
        default:
          return '';
      }
    }
  },
  computed: {
    ...mapGetters('workDepartReturn', ['rescheduleInfoData']),
    ...mapGetters("nainformation", ["getCes"]),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        dealClusterId: this.queryForm.dealClusterId,
        companyName: this.queryForm.companyName,
        cantonFairCode: this.queryForm.cantonFairCode,
        reviewResult: this.queryForm.reviewResult,
        checkStatus: this.queryForm.checkStatus,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize,
        coceralId: this.$store.getters.userInfo.org.deptId
      };
    },
    // 查询拟定企业
    companyQuery() {
      return {
        exhibitionArea: this.writeForm.exhibitionArea,
        coceralId: this.$store.getters.userInfo.org.deptId
      };
    },
    // 新增添加
    addData() {
      return {
        scheduleId: this.writeForm.scheduleId,
        exhibitionArea: this.writeForm.exhibitionArea,
        exhibitionAreaName: this.writeForm.exhibitionAreaName,
        companyId: this.writeForm.companyId,
        companyName: this.writeForm.companyName,
        companyCode: this.writeForm.companyCode,
        cantonFairCode: this.writeForm.cantonFairCode,
        scheduleBoothNumber: this.writeForm.scheduleBoothNumber,
        scheduleBooth: this.writeForm.scheduleBooth,
        isIsland: this.writeForm.isIsland,
        scheduleType: this.writeForm.scheduleType,
        scheduleReason: this.writeForm.scheduleReason,
        isNewEnterprises: this.writeForm.isNewEnterprises,
        dealClusterId: this.writeForm.dealClusterId,
        dealClusterCode: this.writeForm.dealClusterCode,
        dealClusterName: this.writeForm.dealClusterName,
        coceralId: this.writeForm.coceralId,
        coceralCode: this.writeForm.coceralCode,
        coceralName: this.writeForm.coceralName,
        creatorId: this.$store.getters.userInfo.userId,
        creatorName: this.$store.getters.userInfo.userName
       // reviewResult: '0'
      };
    },
    // 删除
    delData() {
      return {
        scheduleId: ''
      };
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.originQuery();
  },
  mounted() {
    // 当前展届
    this.getcurrentExhibitionSession().then(res => {
      if (res) {
        // 修改人： 李康    增加了下面的判断
        // 获取参展时间段
        // this.getRuleInfos(ruleParam).then(resp => {
        this.$http.get(process.env.API_SN_URL + "/api/ot/progress/getProgressTime?exhibitionNum=" + res + "&subKey=BUSINESS_ASSOCIATIONS_SUBMIT_BRAND_BOOTHS").then(progressRes => {
          // 当前时间在参展时间段内可确认参展和编辑
          if (progressRes && progressRes.startTime && progressRes.endTime) {
            let startTime = new Date(progressRes.startTime).getTime();
            let endTime = new Date(progressRes.endTime).getTime() + 24 * 60 * 60 * 1000 - 1;
            let nowTime = new Date().getTime();
            if (nowTime >= startTime && nowTime <= endTime) {
              this.containExhibitionPeriod = true;
            } else {
              // 获取参展时间段
              // this.getProgressTimeInfo(progressParam).then(progressRes => {
              this.$http.get(process.env.API_SN_URL + "/api/ot/progress/extra/getRuleInfo?exhibitionNum=" + res + "&subKey=BUSINESS_ASSOCIATIONS_SUBMIT_BRAND_BOOTHS" + "&orgId=" + this.$store.getters.userInfo.org.deptId).then(resp => {
                // 当前时间在参展时间段内可确认参展和编辑
                if (resp && resp[0] && resp[0].startTime && resp[0].endTime) {
                  let ruleStartTime = new Date(resp[0].startTime).getTime();
                  let ruleEndTime = new Date(resp[0].endTime).getTime() + 24 * 60 * 60 * 1000 - 1;
                  let ruleNowTime = new Date().getTime();
                  if (ruleNowTime >= ruleStartTime && nowTime <= ruleEndTime) {
                    this.containExhibitionPeriod = true;
                  } else {
                    this.containExhibitionPeriod = false;
                  }
                } else {
                  // 未拿到参展时间段也暂时可以确认参展和编辑
                  this.containExhibitionPeriod = false;
                }
              }).catch(e => {
                // 未拿到参展时间段也暂时可以确认参展和编辑
                this.containExhibitionPeriod = true;
              });
            }
          } else {
            // 未拿到参展时间段也暂时可以新增，编辑和删除展位
            this.containExhibitionPeriod = true;
          }
        }).catch(e => {
          // 未拿到参展时间段也暂时可以新增，编辑和删除展位
          this.containExhibitionPeriod = true;
        });
      }
    });
  },
  methods: {
    ...mapActions('workDepartReturn', ['getBoothArrangeNumber', 'getRescheduleInfo', 'getCompanyInfo', 'getArrangableBooth', 'postAddRescheduleInfo', 'postUpdateRescheduleInfo', 'getDelRescheduleInfo', 'postSubmitRescheduleInfo']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getcurrentExhibitionSession']),
    ...mapActions('specificAreaboothTradegroup', ['uploadfile', 'deleteFile']),
    ...mapActions('companyInfomation', ['getSchemePublish']),

    // 打开上传弹框
    openUpload(name, id, fileId) {
      this.fileForm.scheduleId = id;
      this.fileForm.attachment = name;
      this.fileForm.chooseFileName = name;
      this.isUp = true;
    },
    // 附件下载
    handleFileDownload(row) {
      window.open(`${process.env.API_NA_URL}/api/file/get?fileId=${row.attachment}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
    },
    // 文件删除
    handleFileChange(val) {
      if (val === '' && this.fileForm.attachment !== '') {
        let submitData = {
          fileId: this.fileForm.attachment
        };
        this.deleteFile(submitData).then(() => {
          let subData = {
            scheduleId: this.fileForm.scheduleId,
            attachment: '0'
          };
          this.postUpdateRescheduleInfo(subData).then(() => {
            this.$message.success('附件已删除');
          }).catch(e => {});
        }).catch(e => {});
      }
    },
    // 文件改变
    handleChange(file, fileList) {
      this.fileForm.chooseFileName = file.name;
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
      const extension = testmsg === 'jpg';
      const extension2 = testmsg === 'png';
      const extension3 = testmsg === 'jpeg';
      const extension4 = testmsg === 'bmp';
      const extension5 = testmsg === 'gif';
      const extension6 = testmsg === 'pdf';
      const isLt2M = file.size / 1024 / 1024 < 3;    //这里做文件大小限制
      if (!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6) {
        this.$message({
          message: '上传文件只能是图片或pdf格式!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
        this.fileForm.chooseFileName = '';
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 3MB!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
        this.fileForm.chooseFileName = '';
      }
    },
    // 自定义上传方式
    handleUploadFile(param) {
      let formData = new FormData();
      formData.append('file', param.file);
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.uploadfile(formData).then(res => {
        let subData = {
          scheduleId: this.fileForm.scheduleId,
          attachment: res.fileId
        };
        this.postUpdateRescheduleInfo(subData).then(() => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          this.$message.success('上传成功');
          this.isUp = false;
          this.originQuery();
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      }).catch(e => {
        this.$nextTick(() => {
          fullScreenloading.close();
        });
      });
    },
    // 文件上传
    toUpload(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs.upload.submit();
        }
      });
    },
    // 新增
    handleAdd() {
      //获取新增页面的展区信息(根据商协会)
      this.$http.get(`${process.env.API_NA_URL}/api/backArrange/getExhibitionAreaInfomation?coceralId=${this.writeForm.coceralId}`).then(res => {
        this.exhibitionAreaList = [];
        this.options = res;
        this.options.forEach(element => {
          let data = {
            "exhibitionAreaCode": element.exhibitionAreaCode,
            "exhibitionAreaName": element.exhibitionAreaName,
            "exhibitionArea": element.exhibitionArea
          };
          this.exhibitionAreaList.push(data);
        });
      });
      this.dialogTitle = '新增';
      this.dialogBtn = '提交';
      this.writeForm = {
        scheduleId: '',
        exhibitionArea: '',
        exhibitionAreaName: '',
        companyId: '',
        companyName: '',
        companyCode: '',
        cantonFairCode: '',
        dealClusterId: '',
        dealClusterName: '',
        scheduleBoothNumber: '',
        //scheduleBooth: [],
        arrangeNumberBefore: '', //调整前品牌展位数
        arrangeNumberAfter: '', //调整后品牌展位数
        scheduleBooth: '',
        isIsland: '',
        scheduleType: [],
        scheduleReason: '',
        isNewEnterprises: '',
        coceralId: this.$store.getters.userInfo.org.deptId,
        coceralCode: this.$store.getters.userInfo.org.deptCode,
        coceralName: this.$store.getters.userInfo.org.deptName
      };
      this.scheduleText = {
        scheduleTextOne: '',
        scheduleTextTwo: '',
        scheduleTextThree: ''
      };
      this.isEdit = true;
    },
    // 企业可选建议搜索
    querySearch(queryString, cb) {
      let restaurant = this.restaurant;
      let results = queryString ? restaurant.filter(this.createFilte(queryString)) : restaurant;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 企业调用的方法
    createFilte(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);//实现模糊查询
      };
    },
    // 判断是否可选(为0时是已提交状态不可再提交)
    isSelectable(row, index) {
    //  console.log(row, 'row');
      if (row.reviewResult === '1') {
        return false;
      } else {
        return true;
      }
    },
    // 编辑
    handleEdit(row) {
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.dialogTitle = '编辑';
      this.dialogBtn = '保存';
      this.writeForm = {
        scheduleId: row.scheduleId,
        exhibitionArea: row.exhibitionArea,
        exhibitionAreaName: row.exhibitionAreaName,
        companyId: row.companyId,
        companyName: row.companyName,
        companyCode: row.companyCode,
        cantonFairCode: row.cantonFairCode,
        dealClusterId: row.dealClusterId,
        dealClusterName: row.dealClusterName,
        scheduleBoothNumber: row.scheduleBoothNumber,
        arrangeNumberBefore: '', //调整前品牌展位数
        arrangeNumberAfter: '', //调整后品牌展位数
        //scheduleBooth: [],
        scheduleBooth: row.scheduleBooth,
        isIsland: row.isIsland,
        scheduleType: row.scheduleType,
        scheduleReason: '',
        isNewEnterprises: row.isNewEnterprises,
        coceralId: this.$store.getters.userInfo.org.deptId,
        coceralName: this.$store.getters.userInfo.org.deptName
      };
      this.reasonArr = [];
      // 根据商协会和展区获取可安排展位数
      this.$http.get(`${process.env.API_NA_URL}/api/backArrange/getArrangableBooth?coceralId=${this.writeForm.coceralId}&exhibitionArea=${this.writeForm.exhibitionArea}`);
      // 获取调整前展位数
      this.$http.get(`${process.env.API_NA_URL}/api/backArrange/getBoothReorderInfo?companyId=${this.writeForm.coceralId}&exhibitionArea=${this.writeForm.exhibitionArea}&current=0&size=0`).then((res) => {
        //console.log(res);
        if (res && res.records.length > 0) {
          this.writeForm.arrangeNumberBefore = res.records[0].beforeBoothNumber;
        } else {
          this.writeForm.arrangeNumberBefore = 0;
        }
        this.writeForm.arrangeNumberAfter = this.writeForm.arrangeNumberBefore + this.writeForm.scheduleBoothNumber - 0;
      });
      /*
      // 取出展位号 //数组形式
      let boothIndex = row.scheduleBooth ? row.scheduleBooth.indexOf(',') : '';
      if (boothIndex === -1) { // 只有一项
      //  this.writeForm.scheduleBooth.push(row.scheduleBooth); //数组形式(等待接口调通)
      } else if (boothIndex > -1) { // 不止一项
        this.writeForm.scheduleBooth = row.scheduleBooth.split(',');
      }
      */
      this.writeForm.scheduleBooth = row.scheduleBooth; //展位数只有一项
      // 取出安排理由选项 安排理由多项
      let scheduleIndex = row.scheduleType ? row.scheduleType.indexOf(',') : '';
      if (scheduleIndex === -1) { // 只有一项
        this.writeForm.scheduleType = [];
        this.writeForm.scheduleType.push(row.scheduleType);
        this.reasonArr.push(row.scheduleReason);
      }
      /* else if (scheduleIndex > -1) { // 不止一项
        this.writeForm.scheduleType = row.scheduleType.split(',');
        this.reasonArr = row.scheduleReason.split(',');
      }
      */

      if (this.writeForm.scheduleType) {
        // 填充安排理由内容
        for (let i = 0; i < this.writeForm.scheduleType.length; i++) {
          let filterArr = ['1', '2', '3'];
          if (scheduleIndex === -1) { // 只有一项
            this.switchFilter(this.writeForm.scheduleType[0], this.reasonArr[0], filterArr);
          } else if (scheduleIndex > -1) {
            this.switchFilter(this.writeForm.scheduleType[i], this.reasonArr[i], filterArr);
          }
        }
      }
      // this.writeForm.scheduleType = [];
      /* //
      this.getCompanyInfo(this.companyQuery).then(res => {
        this.companyOptsw = res.companyOpts;
        this.getArrangableBooth({ exhibitionArea: this.writeForm.exhibitionArea, coceralId: this.writeForm.coceralId }).then(data => {
          this.checkScheduleBoothNumber = data;
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          this.scheduleBoothOpts = data;
          this.isEdit = true;
          this.isSave = !this.isSave;
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      }).catch(e => {
        this.$nextTick(() => {
          fullScreenloading.close();
        });
      });
      */
      // 获取重新安排企业信息(根据商协会和展区)
      this.$http.get(`${process.env.API_NA_URL}/api/backArrange/getCompanyInformation?coceralId=${this.writeForm.coceralId}&exhibitionArea=${this.writeForm.exhibitionArea}`).then((res) => {
        this.restaurant = [];
        this.options = res;
        //console.log(res);
        this.options.forEach(element => {
          let data = {
            "value": element.companyName,
            "address": element.companyId,
            "dealClusterName": element.dealClusterName,
            "dealClusterCode": element.dealClusterCode,
            "dealClusterId": element.dealClusterId,
            "companyCode": element.cantonFairCode,
            "cantonFairCode": element.cantonFairCode
          };
          this.restaurant.push(data);
        });
        this.$nextTick(() => {
          fullScreenloading.close();
        });
        this.isEdit = true;
        this.isSave = !this.isSave;
      }).catch(e => {
        this.$nextTick(() => {
          fullScreenloading.close();
        });
      });
    },
    // 理由内容过滤
    switchFilter(conditions, result, filterArr) {
      switch (conditions) {
        case filterArr[0]:
          this.scheduleText.scheduleTextOne = result.substring(15, result.length);
          break;
        case filterArr[1]:
          this.scheduleText.scheduleTextTwo = result.substring(17, result.length);
          break;
        case filterArr[2]:
          this.scheduleText.scheduleTextThree = result.substring(5, result.length);
          break;
        default:
          break;
      }
    },
    // 展区更换
    handleExChange(val) {
      this.$refs['writeForm'].resetFields();
      this.writeForm.companyName = "";
      this.exhibitionAreaList.forEach(el => {
        if (el.exhibitionAreaCode === val) {
          this.writeForm.exhibitionAreaName = el.exhibitionAreaName;
          this.writeForm.exhibitionArea = el.exhibitionArea;
        }
      });
      this.getBoothArrangeNumber({ exhibitionArea: this.writeForm.exhibitionArea }).then(res => {
        this.writeForm.arrangableBoothNumber = res.arrangableBoothNumber;
      }).catch(e => {});
      /*
      for (let i = 0; i < this.exhibitionAreaOpts.length; i++) {
        if (this.exhibitionAreaOpts[i].exhibitionAreaCode === val) {
          this.writeForm.exhibitionAreaName = this.exhibitionAreaOpts[i].exhibitionAreaName;
          break;
        }
      }
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.getCompanyInfo(this.companyQuery).then(res => {
        this.companyOptsw = res.companyOpts;
        this.writeForm.dealClusterName = res.length > 0 ? res[0].dealClusterName : '';
        this.resData = JSON.parse(JSON.stringify(res));
        this.getArrangableBooth({ exhibitionArea: this.writeForm.exhibitionArea, coceralId: this.writeForm.coceralId }).then(data => {
          this.checkScheduleBoothNumber = data; //取出展位数数据用于校验
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          this.scheduleBoothOpts = data;
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      }).catch(e => {
        this.$nextTick(() => {
          fullScreenloading.close();
        });
      });
      */
      this.writeForm.exhibitionArea = val;
      let fullScreenloading = this.$loading({ fullscreen: true });
      // 获取重新安排企业信息(根据商协会和展区)
      this.$http.get(`${process.env.API_NA_URL}/api/backArrange/getCompanyInformation?coceralId=${this.writeForm.coceralId}&exhibitionArea=${val}`).then((res) => {
        this.restaurant = [];
        this.options = res;
        //console.log(res);
        this.options.forEach(element => {
          let data = {
            "value": element.companyName,
            "address": element.companyId,
            "dealClusterName": element.dealClusterName,
            "dealClusterCode": element.dealClusterCode,
            "dealClusterId": element.dealClusterId,
            "companyCode": element.cantonFairCode,
            "cantonFairCode": element.cantonFairCode
          };
          this.restaurant.push(data);
        });
        this.$nextTick(() => {
          fullScreenloading.close();
        });
      }).catch(e => {
        this.$nextTick(() => {
          fullScreenloading.close();
        });
      });
    },
    // 拟企业选择
    handleComChange(val) {
      //console.log(val);
      this.writeForm.companyCode = val.companyCode;
      this.writeForm.companyId = val.address;
      this.writeForm.cantonFairCode = val.cantonFairCode;
      this.writeForm.dealClusterName = val.dealClusterName;
      this.writeForm.dealClusterCode = val.dealClusterCode;
      this.writeForm.dealClusterId = val.dealClusterId;
      // 根据商协会和展区获取可安排展位数
      this.$http.get(`${process.env.API_NA_URL}/api/backArrange/getArrangableBooth?coceralId=${this.writeForm.coceralId}&exhibitionArea=${this.writeForm.exhibitionArea}`);
      // 获取调整前展位数
      this.$http.get(`${process.env.API_NA_URL}/api/backArrange/getBoothReorderInfo?companyId=${this.writeForm.companyId}&exhibitionArea=${this.writeForm.exhibitionArea}&current=0&size=0`).then((res) => {
        //console.log(res);
        if (res && res.records.length > 0) {
          this.writeForm.arrangeNumberBefore = res.records[0].beforeBoothNumber;
        } else {
          this.writeForm.arrangeNumberBefore = 0;
        }
      });
      /*
      this.companyOptsw.forEach((item, index) => {
        if (this.writeForm.companyId === item.value) {
          this.writeForm.companyName = item.label;
          this.writeForm.companyCode = this.resData[index].companyCode;
          this.writeForm.cantonFairCode = this.resData[index].cantonFairCode;
          this.writeForm.isNewEnterprises = this.resData[index].isNewEnterprises;
          this.writeForm.dealClusterId = this.resData[index].dealClusterId;
        }
      });
      */
    },
    // 拟展位号选择
    handleSBoothChange() {
      this.writeForm.scheduleBoothNumber = this.writeForm.scheduleBooth.length;
    },
    //
    handleSNumChange(val) {
      this.writeForm.arrangeNumberAfter = (this.writeForm.arrangeNumberBefore - 0) + (val - 0);
    },
    // 安排理由选择
    handleCheckboxSelect(num, checkName) {
      let index = this.writeForm.scheduleType.indexOf(num);
      if (index === -1) {
        this.handleClearReason(checkName);
        return false;
      } else {
        return true;
      }
    },
    // 安排理由清空
    handleClearReason(checkName) {
      let filterArr = ['scheduleTextOne', 'scheduleTextTwo', 'scheduleTextThree'];
      switch (checkName) {
        case filterArr[0]:
          this.scheduleText.scheduleTextOne = '';
          break;
        case filterArr[1]:
          this.scheduleText.scheduleTextTwo = '';
          break;
        case filterArr[2]:
          this.scheduleText.scheduleTextThree = '';
          break;
        default:
          break;
      }
    },
    // 新增添加与保存按钮
    submitAdd(formName, type) {
      if (this.scheduleText.scheduleTextOne) {
        this.writeForm.scheduleReason = `该展区现有品牌企业，安排理由：${this.scheduleText.scheduleTextOne}`;
      } else {
        this.writeForm.scheduleReason = '';
      }
      if (this.scheduleText.scheduleTextTwo) {
        this.writeForm.scheduleReason = this.writeForm.scheduleReason + `该展区有需求的合格候补企业中排名第${this.scheduleText.scheduleTextTwo}`;
      }
      if (this.scheduleText.scheduleTextThree) {
        this.writeForm.scheduleReason = this.writeForm.scheduleReason + `其他理由：${this.scheduleText.scheduleTextThree}`;
      }
      let flag = true;
      let textList = ['scheduleTextOne', 'scheduleTextTwo', 'scheduleTextThree'];
      for (let i = 1; i < 4; i++) {
        if (this.writeForm.scheduleType[0] === `${i}` && this.scheduleText[textList[i - 1]] === '') {
          flag = false;
          break;
        }
      }
      if (flag) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let fullScreenloading = this.$loading({ fullscreen: true });
            //this.addData.scheduleBooth = this.writeForm.scheduleBooth.join(','); //scheduleBooth数组形式
            this.addData.companyName = this.writeForm.companyName;
            this.addData.companyCode = this.writeForm.companyCode;
            this.addData.companyId = this.writeForm.companyId;
            this.addData.exhibitionAreaName = this.writeForm.exhibitionAreaName;
            this.addData.scheduleBooth = this.writeForm.scheduleBooth; //非数组形式
            this.addData.scheduleType = this.writeForm.scheduleType;
            this.addData.scheduleBoothNumber = parseInt(this.writeForm.scheduleBoothNumber);
            if (type === '提交') {
              this.addData.scheduleType = this.writeForm.scheduleType[0];
              this.$http.postJson(`${process.env.API_NA_URL}/api/backArrange/addRescheduleInfo`, this.addData).then(res => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
                this.$message.success('添加成功');
                this.isEdit = false;
                this.originQuery();
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
            } else if (type === '保存') {
              this.writeForm.scheduleType = this.writeForm.scheduleType[0];
              this.$http.postJson(`${process.env.API_NA_URL}/api/backArrange/updateRescheduleInfo`, this.writeForm).then(res => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
                this.$message.success('编辑成功');
                this.isEdit = false;
                this.originQuery();
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
            }
          }
        });
      } else {
        this.$message.warning('请确认所有须填写的信息已填写完整');
      }
    },
    // 删除
    handleDelete(id) {
      this.$confirm('确定删除此方案吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //this.delData.scheduleId = id;
        this.$http.postJson(`${process.env.API_NA_URL}/api/backArrange/delRescheduleInfo`, id).then(res => {
          this.$message.success('删除成功');
          this.originQuery();
        }).catch(e => {});
      //  this.getDelRescheduleInfo(this.delData).then(() => {
      //    this.$message.success('删除成功');
      //    this.originQuery();
      //  }).catch(e => {});
      }).catch(() => {
        this.$message.info('已取消此操作');
      });
    },
    //
    handleSelectionChange (val) {
      this.checkReviewResult = false;
      this.obj = [];
      this.printData = [];
      for (let i = 0; i < val.length; i++) {
        if (val[i].reviewResult === '0' || val[i].reviewResult === '1') {
          this.checkReviewResult = true;
        }
        this.obj.push(val[i].scheduleId);
        this.printData.push(val[i]);
      }
    },
    /*
    // 提交
    handleSubmit(writeForm) {
      this.loading = true;
      if (this.obj.length === 0) {
        this.$message.error('请勾选需要提交的数据');
        this.loading = false;
      } else {
        this.$http.postJson(`${process.env.API_NA_URL}/api/backArrange/addRescheduleInfo`, writeForm).then(res => {
          this.$message.success('提交成功');
          this.handleQuery();
        }).catch(e => {
          this.loading = false;
        });
      //  this.postSubmitRescheduleInfo(this.obj).then(() => {
      //    this.$message.success('提交成功');
      //    this.handleQuery();
      //  }).catch(e => {
      //    this.loading = false;
      //  });
      }
    },
    */
   // 提交
    handleSubmit() {
      this.loading = true;
      if (this.obj.length === 0) {
        this.$message.error('请勾选需要提交的数据');
        this.loading = false;
      } else if (this.obj.length > 0) {
        if (this.checkReviewResult) {
          this.$message.error('有重复提交的数据');
          this.loading = false;
        } else if (this.containExhibitionPeriod) {
        // 修改人： 李康 修改时间 2019/06/18 增加了下面的方法
          this.postSubmitRescheduleInfo(this.obj).then(() => {
            this.$message.success('提交成功');
            this.handleQuery();
          }).catch(e => {
            this.loading = false;
          });
        } else {
          this.$message.error("当前时间不在工作部设定的提交时间范围内，如有疑问，请联系工作部。");
          this.loading = false;
        }
      }
        // 修改人： 李康 修改时间 2019/06/18 将下面的方法注释
        // this.postSubmitRescheduleInfo(this.obj).then(() => {
        //   this.$message.success('提交成功');
        //   this.handleQuery();
        // }).catch(e => {
        //   this.loading = false;
        // });

    },
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.originQuery();
    },
    // 下载
    handleDownload() {
      let url = `exhibitionArea=${this.queryForm.exhibitionArea}&dealClusterId=${this.queryForm.dealClusterId}&companyName=${this.queryForm.companyName}&cantonFairCode=${this.queryForm.cantonFairCode}&coceralId=${this.writeForm.coceralId}&deptId=${this.$store.getters.userInfo.org.deptId}&deptName=${this.$store.getters.userInfo.org.deptName}&deptType=${this.$store.getters.userInfo.org.deptType}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/backArrange/exportRescheduleInfo/download?${url}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
    },
    // 打印
    handlePrint() {
      if (this.printData.length === 0) {
        this.$message.error('请勾选需要打印的数据');
      } else {
        let paramData = JSON.parse(JSON.stringify(this.printData));
        window.open(window.location.origin + '/#/submitReschedulProposalPrint?data=' + encodeURI(JSON.stringify(paramData)));
      }
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.originQuery();
    },
    handleSizeChange(val) {
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = val;
      this.originQuery();
    },
    // 初始查询封装
    originQuery() {
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getRescheduleInfo(this.formQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.add_btn{
  margin-left: 30px;
  display: inline-block;
}
.pagination-footer{
  margin-top: 20px;
}
.item-Num >>> input::-webkit-outer-spin-button,
.item-Num >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none!important;
}
.item-Num >>> input[type="number"]{
  -moz-appearance: textfield!important;
}
.writeForm{
  width: 70%;
  margin: 0 auto;
}
.writeForm >>> .el-form-item{
  margin-bottom: 22px;
}
.sub-select{
  width: 100%;
  max-width: 300px;
}
.inline-input{
  width: 100%;
  max-width: 300px;
}
.el-checkbox-group >>> .el-checkbox{
  margin-left: 0!important;
}
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
