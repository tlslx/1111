<template>
  <el-dialog
    :title="languageSource.LocationLang.publicity"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="clear"
    width="60%">
    <el-form ref="gearPublicity" :model="gearPublicity" :inline="false" label-width="125px" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <el-form-item :label="languageSource.LocationLang.publicityDeadline" required>
            <el-col :span="11" class="date-span">
              <el-form-item prop="startTime" class="date-item">
                <el-date-picker
                  type="date"
                  :placeholder="languageSource.LocationLang.startDate"
                  v-model="gearPublicity.startTime"
                  style="width: 100%;"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11" class="date-span">
              <el-form-item prop="endTime" class="date-item">
                <el-date-picker
                  type="date"
                  :placeholder="languageSource.LocationLang.endDate"
                  v-model="gearPublicity.endTime"
                  style="width: 100%;"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="16" :offset="4">
          <el-form-item :label="languageSource.LocationLang.publicityExplain" prop="publicityNotice">
            <el-input
              type="textarea"
              :rows="4"
              :placeholder="languageSource.LocationLang.publishTips"
              v-model="gearPublicity.publicityNotice">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">{{languageSource.CommonLang.cancel}}</el-button>
      <el-button type="primary" @click="submitFunc('gearPublicity', multipleSelection)">{{languageSource.LocationLang.releasePublicity}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'publicityDialog',
  mixins: [listPageBase],
  props: {
    'multipleSelection': {
      'type': Array,
      'required': true
    },
    'languageSource': {
      'type': Object
    }
  },
  data () {
    // let validateStartTime = (rule, value, callback) => {
    //   let endTime = this.gearPublicity.endTime;
    //   if (value === '' || value === undefined) {
    //     return callback(new Error('请选择开始日期'));
    //   } else if (endTime !== '' || endTime !== undefined) {
    //     if (new Date(value).getTime() > new Date(endTime).getTime()) {
    //       return callback(new Error('开始日期不能大于结束日期'));
    //     } else {
    //       return callback();
    //     }
    //   } else {
    //     return callback();
    //   }
    // };
    // let validateEndTime = (rule, value, callback) => {
    //   let startTime = this.gearPublicity.startTime;
    //   if (value === '' || value === undefined) {
    //     return callback(new Error('请选择结束日期'));
    //   } else if (startTime !== '' || startTime !== undefined) {
    //     if (new Date(startTime).getTime() > new Date(value).getTime()) {
    //       return callback(new Error('结束日期不能小于开始日期'));
    //     } else {
    //       return callback();
    //     }
    //   } else {
    //     return callback();
    //   }
    // };
    return {
      config,
      'dialogVisible': false,
      'gearPublicity': {},
      "pickerOptions": {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      rules: {
        // startTime: [
        //   { validator: validateStartTime, trigger: 'change' }
        // ],
        // endTime: [
        //   { validator: validateEndTime, trigger: 'change' }
        // ],
        // publicityNotice: [
        //   { max: 255, message: '长度不能超过255个字符', trigger: 'blur' }
        // ]
      }
    };
  },
  created () {
    let languageSource = this.languageSource;
    this.rules = {
      startTime: [
        { validator: this.validateStartTime, trigger: 'change' }
      ],
      endTime: [
        { validator: this.validateEndTime, trigger: 'change' }
      ],
      publicityNotice: [
        { max: 255, message: languageSource.LocationLang.toLongMsg, trigger: 'blur' }
      ]
    };
  },
  methods: {
    //校验开始时间
    validateStartTime (rule, value, callback) {
      let languageSource = this.languageSource;
      let endTime = this.gearPublicity.endTime;
      if (value === '' || value === undefined) {
        return callback(new Error(languageSource.LocationLang.startDateTips));
      } else if (endTime !== '' || endTime !== undefined) {
        if (new Date(value).getTime() > new Date(endTime).getTime()) {
          return callback(new Error(languageSource.LocationLang.startDateMsg));
        } else {
          return callback();
        }
      } else {
        return callback();
      }
    },
    //校验结束时间
    validateEndTime (rule, value, callback) {
      let languageSource = this.languageSource;
      let startTime = this.gearPublicity.startTime;
      if (value === '' || value === undefined) {
        return callback(new Error(languageSource.LocationLang.endDateTips));
      } else if (startTime !== '' || startTime !== undefined) {
        if (new Date(startTime).getTime() > new Date(value).getTime()) {
          return callback(new Error(languageSource.LocationLang.endDateMsg));
        } else {
          return callback();
        }
      } else {
        return callback();
      }
    },
    submitFunc (formName, multipleSelection) {
      let gearPublicity = this.gearPublicity;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            schemeId: multipleSelection[0].schemeId, //方案id
            publicityStartDate: gearPublicity.startTime, //公示开始时间
            publicityEndDate: gearPublicity.endTime,    //公示结束时间
            publicityNotice: gearPublicity.publicityNotice //公示说明
          };
          this.$http.postJson(this.config.api.updatePublicityStatus, data)
            .then(res => {
              this.$message.success(this.languageSource.LocationLang.publicityMsg);
              this.$emit('publicityReload');
            });
          this.dialogVisible = false;
        } else {
          return false;
        }
      });
    },
    clear () {
      this.gearPublicity = {};
      this.$refs.gearPublicity.resetFields();
    }
  }
};
</script>

<style scoped>
.date-span {
  padding: 0 !important;
}
.date-item {
  margin-bottom: 0;
}
</style>
