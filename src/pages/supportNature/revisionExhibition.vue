/**
 * @file 组展进度设置---修改组展进度计划
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="修改组展进度计划" name="first">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
        <el-form-item label="届数：" prop="exhibitionNum">
          <el-input v-model="ruleForm.exhibitionNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="组展事项：" prop="progressItemRule">
          <el-input v-model="ruleForm.progressItemRule" disabled></el-input>
        </el-form-item>
        <el-form-item label="子项：" prop="progressSubitemRule">
          <el-input v-model="ruleForm.progressSubitemRule" disabled></el-input>
        </el-form-item>
        <el-form-item label="具体业务环节：" prop="businessNode">
          <el-input type="textarea" :rows="5" maxlength="350" :disabled="allDisabled" placeholder="请输入具体业务环节" v-model="ruleForm.businessNode">
          </el-input>
        </el-form-item>
        <!-- :disabled="dateDisabled" -->
        <el-form-item label="计划开始时间：" prop="startTime">
          <el-date-picker class="select-width" v-model="ruleForm.startTime" :picker-options="startPickerOptions" type="date" format="yyyy/MM/dd" placeholder="选择开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="计划完成时间：" prop="endTime">
          <!-- :disabled="dateDisabled" -->
          <el-date-picker class="select-width" v-model="ruleForm.endTime" :picker-options="endPickerOptions" type="date" placeholder="选择完成日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="组展单位标签：" prop="unitTag">
          {{ ruleForm.unitTag }}
          <el-button @click="toWatchUnit" :disabled="allDisabled">查看标签</el-button>
          <!-- {{ ruleForm.unitTag }}
          <el-button @click="editLab" :disabled="allDisabled">编辑标签</el-button> -->
        </el-form-item>
        <el-form-item label="展区标签：" prop="exhibitionAreaTag">
          {{ ruleForm.exhibitionAreaTag }}
          <el-button @click="toWatchTag" :disabled="allDisabled">查看标签</el-button>
          <!-- {{ ruleForm.exhibitionAreaTag }}
          <el-button @click="editZQLab" :disabled="allDisabled">编辑标签</el-button> -->
        </el-form-item>
        <el-form-item label="完成判断：" prop="finishJudgement">
          <el-input v-model="ruleForm.finishJudgement" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="完成进度：" prop="progressValue">
          <el-input v-model="ruleForm.progressValue" :disabled="disabled"></el-input>
        </el-form-item> -->
        <el-form-item label="进度规则：" prop="finishRule">
          <el-input v-model="ruleForm.finishRule" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="纳入本届进度设置：" prop="isInSetting">
          <el-radio-group v-model="ruleForm.isInSetting" @change="insetChange">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="组展单位标签" :visible.sync="unitVisible">
        <cust-table :cols="cols" propName="unitTag" :checkProp="ruleForm.unitTag" :showAble="unitVisible" :data="tableData" :loading="loading" @change-multiple-selection="unitSelection"></cust-table>
        <pagination class="page-bar" :pageInfo="unitPageInfo" @handle-size-change="unitSize" @handle-current-change="unitCurrent"></pagination>
        <div class="dialog-btn">
          <el-button type="danger" @click="addUnit" :disabled="unitDisabled">确 定</el-button>
          <el-button @click="unitVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="展区标签" :visible.sync="tagVisible">
        <cust-table :cols="tagcols" propName="exhibitionAreaTag" :checkProp="ruleForm.exhibitionAreaTag" :showAble="tagVisible" :data="tagData" :loading="tagloading" @change-multiple-selection="tagSelection"></cust-table>
        <pagination class="page-bar" :pageInfo="tagPageInfo" @handle-size-change="tagSize" @handle-current-change="tagCurrent"></pagination>
        <div class="dialog-btn">
          <el-button type="danger" @click="addTag" :disabled="tagDisabled">确 定</el-button>
          <el-button @click="tagVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import http from "@/scripts/framework/http";
import custTable from '@/components/project/common/custTable.vue';
import pagination from '@/components/project/common/pagination.vue';
import { getFTC, getJYT, getSXH, getWMS } from "./dict_request";
// vuex
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    'pagination': pagination,
    'cust-table': custTable
  },
  data() {
    return {
      // 字典
      baseApi: process.env.API_SN_URL,
      //组展单位标签
      dwLabelForm: {
        // 组展单位标签
        unitTag: '',
        // 整合id数组
        orgIds: []
      },
      //展区标签
      zqLabelForm: {
        // 展区标签
        exhibitionAreaTag: '',
        // 选择展区
        exhibitionAreaCodes: []
      },
      codeForm: {
        // 交易团
        delegation: [],
        // 商协会
        coceral: [],
        // 企业
        firm: [],
        // 所有企业
        firmAll: false,
        // 外贸中心
        tradeCenter: [],
        // 外贸司
        tradeDevision: []
      },
      // 新增校验
      addRules: {
        exhibitionAreaTag: [
          { required: true, message: '请输入标签名', trigger: 'blur' }
        ],
        exhibitionAreaCodes: [
          { required: true, message: '请选择展区', trigger: 'change' }
        ]
      },
      tradeCenterOption: [],   //外贸中心
      delegationOption: [],   //交易团
      coceralOption: [],   //商协会
      tradeComOption: [],   //外贸司
      // tsb
      activeName: 'first',
      // loading
      loading: false,
      // 展区标签loading
      tagloading: false,
      // 组展单位标签弹出层
      unitVisible: false,
      // 展区标签弹出层
      tagVisible: false,
      // 展区标签禁用变量
      tagDisabled: false,
      // 组展单位标签禁用变量
      unitDisabled: false,
      // 全部禁用变量
      allDisabled: false,
      // 时间禁用变量
      dateDisabled: false,
      // 时间对象
      dateForm: {
        startTime: '',
        endTime: ''
      },
      // 表单对象
      ruleForm: {
        // 开始时间
        startTime: '',
        // 结束时间
        endTime: '',
        // 届数
        exhibitionNum: '',
        // 组展事项
        progressItemRule: '',
        // 子项
        progressSubitemRule: '',
        // 业务环节
        businessNode: '',
        // 组展单位标签
        unitTag: '',
        // 展区标签
        exhibitionAreaTag: '',
        // 完成判断
        finishJudgement: '',
        // 进度规则
        finishRule: '',
        // 进度
        progressValue: null,
        // 是否纳入本届
        // isInSetting: 0,
        // 是否纳入本届时间
        progressRuleId: '',
        // 历史数组
        progressHistories: []
      },
      // 校验
      rules: {
        // 业务环节必填
        businessNode: [
          { required: true, message: '请输入具体业务环节', trigger: 'change' }
        ],
        // 计划开始时间
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        // 计划结束时间
        endTime: [
          { required: true, message: '请选择完成时间', trigger: 'change' }
        ]
      },
      // 分页数据
      unitPageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: 'padding: 20px 0;text-align: center;'
      },
      // 分页数据
      tagPageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: 'padding: 20px 0;text-align: center;'
      },
      // 表头数据
      cols: [
        {
          prop: "unitTag",
          label: "组展单位标签名称"
        },
        {
          prop: "orgId",
          label: "标签详情"
        }
      ],
      // 表头数据
      tagcols: [
        {
          prop: "exhibitionAreaTag",
          label: "展区标签名称"
        },
        {
          prop: "exhibitionAreaCodeDetail",
          label: "标签详情"
        }
      ],
      tableData: {
        // 可多选
        selection: true,
        data: []
      },
      tagData: {
        // 可多选
        selection: true,
        data: []
      },
      // 初始传参
      unitParams: {
        current: "1",
        size: "10"
      },
      // 初始传参
      tagParams: {
        current: "1",
        size: "10"
      },
      // 多选暂存数据
      multipleSelection: [],
      // 多选展区标签暂存数组
      multipleSelectionTag: []
    };
  },
  watch: {
    // 监听组展单位表格数据
    queryunitTag(newVal) {
      this.tableData.data = JSON.parse(JSON.stringify(newVal));
    },
    // 监听展区标签表格数据
    queryTag(newVal) {
      this.tagData.data = JSON.parse(JSON.stringify(newVal));
    }
  },
  async created() {
    //获取展区
    this.delegationOption = await getJYT().then(dict => this.fullInOption(dict));
    this.coceralOption = await getSXH().then(dict => this.fullInOption(dict));
    this.tradeCenterOption = await getFTC().then(dict => this.fullInOption(dict));
    this.tradeComOption = await getWMS().then(dict => this.fullInOption(dict));

  },
  mounted() {
    // 初始
    this.ruleForm = JSON.parse(JSON.stringify(this.$route.query.row));
    this.ruleForm.progressValue = this.ruleForm.progressHistories[0].progressValue;

    if (this.$route.query.row.startTime) {
      this.ruleForm.startTime = this.$route.query.row.startTime;
      this.ruleForm.endTime = this.$route.query.row.endTime;
    }
    // else {
    //   this.ruleForm.startTime = '';
    //   this.ruleForm.endTime = '';
    // }
    this.getData();
    this.getTagData();
  },

  computed: {
    ...mapGetters('organizationProgress', ['queryunitTag', 'queryTag']),
    startPickerOptions() {
      let _this = this;
      return {
        disabledDate: (value) => {
          if (_this.ruleForm.endTime) {
            if (value.getTime() > new Date(_this.ruleForm.endTime).getTime()) {
              return true;
            }
          }
          return false;
        }
      };
    },
    endPickerOptions() {
      let _this = this;
      return {
        disabledDate: (value) => {
          if (_this.ruleForm.startTime) {
            if (value.getTime() < new Date(_this.ruleForm.startTime).getTime()) {
              return true;
            }
          }
          return false;
        }
      };
    }
  },
  methods: {
    ...mapActions('organizationProgress', ['modifyBeforePublishInfo', 'modifyUnitTagInfo', 'addUnitTagInfo', 'queryUnitTagInfo', 'queryExhAreaTagInfo']),
    // 初始数据
    getData() {
      let _this = this;
      // 开始loading
      _this.loading = true;
      // 查询
      this.queryUnitTagInfo(this.unitParams).then(res => {
        // 查询成功
        // 结束loading
        _this.loading = false;
        // 分页
        if (res.total > 0) {
          this.unitPageInfo.currentPage = res.current;
          this.unitPageInfo.total = res.total;
        } else if (res.total === 0) {
          this.unitPageInfo.currentPage = 1;
          this.unitPageInfo.total = 0;
        }
      }).catch(e => {
        // 查询失败
        // 结束loading
        _this.loading = false;
      });
    },
    // 初始数据
    getTagData() {
      // 开始loading
      this.tagloading = true;
      // 查询
      this.queryExhAreaTagInfo(this.tagParams).then(res => {
        // 查询成功
        // 结束loading
        this.tagloading = false;
        // 分页
        if (res.total > 0) {
          this.tagPageInfo.currentPage = res.current;
          this.tagPageInfo.total = res.total;
        } else if (res.total === 0) {
          this.tagPageInfo.currentPage = 1;
          this.tagPageInfo.total = 0;
        }
      }).catch(e => {
        // 查询失败
        // 结束loading
        this.tagloading = false;
      });
    },
    toWatchUnit() {
      this.unitVisible = true;
    },
    toWatchTag() {
      this.tagVisible = true;
    },
    addUnit() {
      let str = '';
      str = this.multipleSelection[0];
      this.ruleForm.unitTag = str;
      this.unitVisible = false;
    },
    addTag() {
      let str = '';
      str = this.multipleSelectionTag[0];
      this.ruleForm.exhibitionAreaTag = str;
      this.tagVisible = false;
    },
    // 多选事件
    unitSelection(val) {
      this.multipleSelection = [];
      if (val.length > 1) {
        // 提示
        this.$message({
          type: 'error',
          message: '只能选择一个标签'
        });
        this.unitDisabled = true;
      } else {
        this.unitDisabled = false;
        val.map(el => {
          this.multipleSelection.push(el.unitTag);
        });

      }
    },
    //选中项
    checkRow(row, prop) {
      
    },
    // 多选事件
    tagSelection(val) {
      this.multipleSelectionTag = [];
      if (val.length > 1) {
        // 提示
        this.$message({
          type: 'error',
          message: '只能选择一个标签'
        });
        this.tagDisabled = true;
      } else {
        this.tagDisabled = false;
        val.map(el => {
          this.multipleSelectionTag.push(el.exhibitionAreaTag);
        });
      }
    },
    // 分页事件
    unitSize(val) {
      //设置table的loading变量
      this.loading = true;
      this.unitPageInfo.pageSize = val;
      this.unitParams.size = val;
      this.queryUnitTagInfo(this.unitParams).then(res => {
        //设置table的loading变量
        this.loading = false;
      });
    },
    unitCurrent(val) {
      //设置table的loading变量
      this.loading = true;
      this.unitPageInfo.currentPage = val;
      this.unitParams.current = val;
      this.queryUnitTagInfo(this.unitParams).then(res => {
        //设置table的loading变量
        this.loading = false;
      });
    },
    // 分页事件
    tagSize(val) {
      //设置table的loading变量
      this.tagloading = true;
      this.tagPageInfo.pageSize = val;
      this.tagParams.size = val;
      this.queryExhAreaTagInfo(this.tagParams).then(res => {
        //设置table的loading变量
        this.tagloading = false;
      });
    },
    tagCurrent(val) {
      //设置table的loading变量
      this.tagloading = true;
      this.tagPageInfo.currentPage = val;
      this.tagParams.current = val;
      this.queryExhAreaTagInfo(this.tagParams).then(res => {
        //设置table的loading变量
        this.tagloading = false;
      });
    },
    // 时间转换
    dateFmt(val) {
      let date = new Date(val);
      let Y = date.getFullYear();
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      let D = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      return Y + '/' + M + '/' + D;
    },
    resetForm() {
      // this.$router.back();
      this.$router.push({
        path: '/organizeExhibition',
        query: {
          exhibitionNum: this.$route.query.exhibitionNum,
          currentPage: this.$route.query.currentPage
        }
      });
    },
    insetChange(val) {
      if (val === 0) {
        this.allDisabled = true;
        this.dateDisabled = true;
      } else {
        this.allDisabled = false;
        this.dateDisabled = false;
      }
    },
    intimeChange(val) {
      if (val === 0) {
        this.ruleForm.isInSetting = 0;
        this.allDisabled = true;
        this.dateDisabled = true;
      }
    },
    // 表单提交
    submitForm(formName) {
      //
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            businessNode: this.ruleForm.businessNode,
            exhibitionAreaTag: this.ruleForm.exhibitionAreaTag,
            unitTag: this.ruleForm.unitTag,
            // isInSetting: this.ruleForm.isInSetting,
            progressRuleId: this.ruleForm.progressRuleId,
            progressHistories: [
              {
                progressHistoryId: this.ruleForm.progressHistories[0].progressHistoryId,
                progressValue: this.ruleForm.progressValue,
                startTime: this.dateFmt(this.ruleForm.startTime),
                endTime: this.dateFmt(this.ruleForm.endTime)
              }
            ]
          };
          ///
          // let parms = JSON.parse(JSON.stringify(param));
          // param.progressHistories[0].progressValue = (parms.progressHistories[0].progressValue).slice(0, -1);
          this.modifyBeforePublishInfo(param).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            this.$router.push({
              path: '/organizeExhibition',
              query: {
                exhibitionNum: this.$route.query.exhibitionNum,
                currentPage: this.$route.query.currentPage
              }
            });
          });
        } else {
          return false;
        }
      });
    },
    //打开组展单位标签弹窗
    editLab() {
      // 打开弹窗
      this.unitVisible = true;
      if (this.ruleForm.unitTag != null) {  //新增
        this.dwLabelForm.unitTag = this.ruleForm.unitTag;
      }
    },
    //组展单位标签确定
    addDWLab() {
      this.dwLabelForm.orgIds = this.codeForm.coceral.concat(this.codeForm.tradeCenter, this.codeForm.delegation, this.codeForm.tradeDevision, this.codeForm.firm);
      this.$refs.dwLabelForm.validate((valid) => {
        if (valid) {
          if (this.dwLabelForm.orgIds.length < 1) {
            this.$message({
              type: 'error',
              message: '请至少选择一个组展单位'
            });
          } else {
            this.ruleForm.unitTag = this.dwLabelForm.unitTag;
            let param = {
              tag: this.dwLabelForm.unitTag
            };
            http.get(this.baseApi + "/api/progress/tag/getUnitTag", param).then(data => {
              if (data == null) {  // 新增
                this.addUnitTagInfo(this.dwLabelForm).then(res => {
                  this.unitVisible = false;
                });
              } else {  //修改
                this.modifyUnitTagInfo(this.dwLabelForm).then(res => {
                  this.unitVisible = false;
                });
              }
            }).catch(error => { });
          }
        }
      });
    },
    //打开展区标签弹窗
    editZQLab() {
      this.tagVisible = true;
    },

    //展区标签确定
    addZQLab() {
      this.$refs.zqLabelForm.validate((valid) => {
        if (valid) {
          this.ruleForm.exhibitionAreaTag = this.zqLabelForm.exhibitionAreaTag;
          this.addExhAreaTagInfo(this.zqLabelForm).then(res => {
            // 新增成功
            this.tagVisible = false;
          });
        }
      });
    },
    fullInOption(obj) {
      let dict = [];
      for (let key in obj) {
        dict.push({
          label: obj[key],
          value: key
        });
      }
      return dict;
    }
  }
};
</script>
<style scoped>
.el-form-item {
  width: 50%;
  padding: 10px;
}
.select-width {
  width: 100%;
}
</style>
