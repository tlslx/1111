<style scoped>
  .append-edit-table >>> .el-form-item__error {
    padding-top: 0;
  }
</style>

<template>
  <div>
    <el-dialog class="vip-edit-screen-condition"
      title="编辑筛选条件"
      :visible.sync="vipEnterpriseEditInfo.dialogVisible">
      <edit-form-rule-table
        ref="vipStand"
        :loading="loading"
        :tableData="tableData"
        :dictionaryData="dictionaryData"
        @add-edit-form-table="addEditFormTable"
        @deal-with-edit-form-table="dealWithEditFormTable">
      </edit-form-rule-table>
      <el-form label-position="right" :inline="true" :rules="vipTimeStandardRules" :model="vipTimeStandardForm" ref="vipTimeStandForm">
        <el-form-item label="评选开始时间：" prop="pxkssj" label-width="180px">
          <el-date-picker
            clearable
            v-model="vipTimeStandardForm.pxkssj"
            type="date"
            size="mini"
            :picker-options="pxkssjPickerOptions"
            @focus="(value) => hintInfo('pxkssj')"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="商协会推荐截止时间：" prop="sxhtjjzsj" label-width="180px">
          <el-date-picker
            clearable
            v-model="vipTimeStandardForm.sxhtjjzsj"
            type="date"
            size="mini"
            :picker-options="sxhtjjzsjPickerOptions"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="交易团推荐截止时间：" prop="jyttjjzsj" label-width="180px">
          <el-date-picker
            clearable
            v-model="vipTimeStandardForm.jyttjjzsj"
            type="date"
            size="mini"
            :picker-options="jyttjjzsjPickerOptions"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="商协会审核截止时间：" prop="sxhshjzsj" label-width="180px">
          <el-date-picker
            clearable
            v-model="vipTimeStandardForm.sxhshjzsj"
            type="date"
            size="mini"
            :picker-options="sxhshjzsjPickerOptions"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="评选结束时间：" prop="pxjssj" label-width="180px">
          <el-date-picker
            clearable
            v-model="vipTimeStandardForm.pxjssj"
            type="date"
            size="mini"
            :picker-options="pxjssjPickerOptions"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="cancle">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import editFormRuleTable from "@/components/project/onlineService/common/editFormRuleTable.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'VIPEnterpriseEdit',
  components: {
    'edit-form-rule-table': editFormRuleTable
  },
  data() {
    return {
      loading: false,
      checkNum: (rule, value, callback) => {},
      tableData: {
        data: [],
        trData: [
          {
            "prop": "phase",
            "label": "期数",
            "type": "select",
            "editable": true,
            "value": ""
          },
          {
            "prop": "extensionCategory",
            "label": "展区类型",
            "type": "select",
            "editable": true,
            "value": ""
          },
          {
            "prop": "digit",
            "label": "品牌展位数（>=标准展位数）",
            "editable": true,
            "value": "",
            "maxlength": "8",
            "type": "number"
          },
          {
            "prop": "operate",
            "label": "操作",
            "editable": true,
            "type": "button",
            "width": "80px",
            "iconArray": [
              {
                "iconName": "el-icon-circle-close-outline",
                "style": "color: #ff0000;cursor: pointer;",
                "iconType": "delete"
              }
            ]
          }
        ],
        rules: {
          phase: [
            { required: true, message: '期数不能为空', trigger: 'change' }
          ],
          extensionCategory: [
            { required: true, message: '展区类型不能为空', trigger: 'change' }
          ],
          digit: [
            { required: true, message: '品牌展位数不能为空', trigger: 'blur' }
          ]
        },
        appendTable: true
      },
      vipTimeStandardForm: {
        "pxkssj": "",
        "sxhtjjzsj": "",
        "jyttjjzsj": "",
        "sxhshjzsj": "",
        "pxjssj": ""
      },
      vipTimeStandardRules: {
        pxkssj: [
          { required: true, message: '评选开始时间不能为空', trigger: 'blur' }
        ],
        pxjssj: [
          { required: true, message: '评选结束时间不能为空', trigger: 'blur' }
        ],
        sxhtjjzsj: [
          { required: true, message: '商协会推荐截止时间不能为空', trigger: 'blur' }
        ],
        sxhshjzsj: [
          { required: true, message: '商协会审核截止时间不能为空', trigger: 'blur' }
        ],
        jyttjjzsj: [
          { required: true, message: '交易团推荐截止时间不能为空', trigger: 'blur' }
        ]
      },
      vipEnterpriseEditParams: {
      }
    };
  },
  props: {
    vipEnterpriseEditInfo: {
      type: Object
    }
  },
  computed: {
    ...mapGetters('common', ['session']),
    ...mapGetters('dictionary', ['dictionaryData']),
    // 评选开始时间设置禁用日期
    pxkssjPickerOptions() {
      let _this = this;
      return {
        disabledDate: (value) => {
          if (_this.vipTimeStandardForm.sxhtjjzsj) {
            // 评选开始时间小于商协会推荐截止时间
            if (value.getTime() > new Date(_this.vipTimeStandardForm.sxhtjjzsj).getTime()) {
              if (_this.vipTimeStandardForm.jyttjjzsj) {
                // 评选开始时间小于交易团推荐截止时间
                if (value.getTime() > new Date(_this.vipTimeStandardForm.sxhtjjzsj).getTime()) {
                  if (_this.vipTimeStandardForm.sxhshjzsj) {
                    // 评选开始时间小于商协会审核截止时间
                    if (value.getTime() > new Date(_this.vipTimeStandardForm.sxhshjzsj).getTime()) {
                      if (_this.vipTimeStandardForm.pxjssj) {
                        // 评选开始时间小于评选结束时间
                        if (value.getTime() > new Date(_this.vipTimeStandardForm.pxjssj).getTime()) {
                          return true;
                        }
                      }
                    }
                  }
                }
              }
              return true;
            }
          }
          return false;
        }
      };
    },
    // 商协会推荐截止时间设置禁用日期
    sxhtjjzsjPickerOptions() {
      let _this = this;
      return {
        disabledDate: (value) => {
          if (_this.vipTimeStandardForm.sxhshjzsj) {
            // 商协会推荐截止时间小于商协会审核截止时间
            if (value.getTime() > new Date(_this.vipTimeStandardForm.sxhshjzsj).getTime()) {
              return true;
            }
          }
          if (_this.vipTimeStandardForm.pxjssj) {
            // 商协会推荐截止时间小于评选结束时间
            if (value.getTime() > new Date(_this.vipTimeStandardForm.pxjssj).getTime()) {
              return true;
            }
          }
          if (_this.vipTimeStandardForm.pxkssj) {
            // 商协会推荐截止时间大于评选开始时间
            if (value.getTime() < new Date(_this.vipTimeStandardForm.pxkssj).getTime()) {
              return true;
            }
          }
          return false;
        }
      };
    },
    // 交易团推荐截止时间设置禁用日期
    jyttjjzsjPickerOptions() {
      let _this = this;
      return {
        disabledDate: (value) => {
          if (_this.vipTimeStandardForm.sxhshjzsj) {
            // 交易团推荐截止时间小于商协会审核截止时间
            if (value.getTime() > new Date(_this.vipTimeStandardForm.sxhshjzsj).getTime()) {
              return true;
            }
          }
          if (_this.vipTimeStandardForm.pxjssj) {
            // 交易团推荐截止时间小于评选结束时间
            if (value.getTime() > new Date(_this.vipTimeStandardForm.pxjssj).getTime()) {
              return true;
            }
          }
          if (_this.vipTimeStandardForm.pxkssj) {
            // 交易团推荐截止时间大于评选开始时间
            if (value.getTime() < new Date(_this.vipTimeStandardForm.pxkssj).getTime()) {
              return true;
            }
          }
          return false;
        }
      };
    },
    // 商协会审核截止时间设置禁用日期
    sxhshjzsjPickerOptions() {
      let _this = this;
      return {
        disabledDate: (value) => {
          if (_this.vipTimeStandardForm.pxjssj) {
            // 商协会审核截止时间小于评选结束时间
            if (value.getTime() > new Date(_this.vipTimeStandardForm.pxjssj).getTime()) {
              return true;
            }
          }
          if (_this.vipTimeStandardForm.jyttjjzsj) {
            // 商协会审核截止时间大于评选结束时间
            if (value.getTime() < new Date(_this.vipTimeStandardForm.jyttjjzsj).getTime()) {
              return true;
            }
          }
          if (_this.vipTimeStandardForm.sxhtjjzsj) {
            // 商协会审核截止时间小于评选结束时间
            if (value.getTime() < new Date(_this.vipTimeStandardForm.sxhtjjzsj).getTime()) {
              return true;
            }
          }
          return false;
        }
      };
    },
    // 评选结束时间设置禁用日期
    pxjssjPickerOptions() {
      let _this = this;
      return {
        disabledDate: (value) => {
          if (_this.vipTimeStandardForm.sxhshjzsj) {
            // 商协会审核截止时间小于评选结束时间
            if (value.getTime() < new Date(_this.vipTimeStandardForm.sxhshjzsj).getTime()) {
              return true;
            }
          }
          return false;
        }
      };
    }
  },
  created() {
    this.getSessionInfo();
  },
  methods: {
    ...mapActions('common', ['getSessionInfo']),
    ...mapActions('generateVIP', ['updateVIPStandards', 'getVIPStandards']),
    // 信息提示
    hintInfo(timeType) {
      if (timeType === 'pxkssj') {
        this.$message('评选开始时间应小于等于商协会推荐截止时间');
      } else if (timeType === 'sxhtjjzsj') {
        this.$message('商协会推荐截止时间应小于等于商协会审核截止时间');
      } else if (timeType === 'jyttjjzsj') {
        this.$message('交易团推荐截止时间应小于等于商协会审核截止时间');
      } else if (timeType === 'sxhshjzsj') {
        this.$message('商协会审核截止时间应小于等于评选结束时间');
      } else if (timeType === 'pxjssj') {
        this.$message('评选结束时间应大于等于商协会审核截止时间');
      }
    },
    // 表格后添加数据
    addEditFormTable() {
      this.tableData.data.push({
        "vipStandardId": null,
        "session": this.session,
        "phase": "01",
        "extensionCategory": "01",
        "digit": null,
        "creatorId": null,
        "creatorName": null
      });
    },
    // 删除添加的筛选条件
    dealWithEditFormTable(index) {
      this.tableData.data.splice(index, 1);
    },
    cancle() {
      this.$emit('close-edit-form-table');
    },
    // 确认编辑
    confirm() {
      this.$refs['vipStand'].$refs['form'].validate((valid) => {
        this.$refs['vipTimeStandForm'].validate((isValid) => {
          if (valid && isValid) {
            if (this.session) {
              this.vipEnterpriseEditParams.session = this.session;
            }
            this.vipEnterpriseEditParams.vipStandard = this.tableData.data;
            let vipTimeStandardFormTemp = [];
            vipTimeStandardFormTemp.push(this.vipTimeStandardForm);
            this.vipEnterpriseEditParams.vipFormStandard = vipTimeStandardFormTemp;
            // 编辑条件表格长度比较大于0
            if (this.vipEnterpriseEditParams.vipStandard.length > 0) {
              this.updateVIPStandards(this.vipEnterpriseEditParams).then(res => {
                this.$message({
                  type: 'success',
                  message: '设置成功'
                });
                this.getVIPStandards(this.session);
              }).catch(e => {
                this.$message({
                  showClose: true,
                  message: e,
                  type: 'error'
                });
              }).then(() => {
                this.$emit('close-edit-form-table');
              });
            } else {
              this.$message({
                showClose: true,
                message: '企业筛选条件不可为空',
                type: 'error'
              });
            }
          }
        });
      });
    }
  },
  watch: {
    'vipEnterpriseEditInfo.dialogVisible'(newVal, oldVal) {
      this.loading = true;
      if (this.vipEnterpriseEditInfo.vipStandard) {
        let temp = JSON.parse(JSON.stringify(this.vipEnterpriseEditInfo.vipStandard));
        this.tableData.data = temp;
      }
      if (this.vipEnterpriseEditInfo.vipTableStandardData) {
        let timeTemp = JSON.parse(JSON.stringify(this.vipEnterpriseEditInfo.vipTableStandardData));
        if (timeTemp && timeTemp.length > 0) {
          this.vipTimeStandardForm = timeTemp[0];
        }

      }
      this.loading = false;
    }
  }
};
</script>


