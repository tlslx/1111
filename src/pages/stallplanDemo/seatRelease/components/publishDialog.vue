<template>
  <el-dialog
    :title="languageSource.LocationLang.publish"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="clear"
    width="60%">
    <el-form ref="gearPublish" :model="gearPublish" :inline="false" label-width="125px" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <el-form-item :label="languageSource.LocationLang.iImmediatePublish" prop="radio">
            <el-switch v-model="gearPublish.publish"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="!gearPublish.publish">
        <el-col :span="16" :offset="4">
          <el-form-item :label="languageSource.LocationLang.publishBatch" prop="batch">
            <el-select v-model="gearPublish.batch" :placeholder="languageSource.CommonLang.select" @change="selectChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="!gearPublish.publish">
        <el-col :span="16" :offset="4">
          <el-form-item :label="languageSource.LocationLang.timingPublish" >
            <el-col :span="11" class="date-span">
              <el-form-item class="date-item">
                <el-date-picker
                  type="date"
                  :placeholder="languageSource.LocationLang.startDate"
                  v-model="gearPublish.startTime"
                  style="width: 100%;"
                  disabled>
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11" class="date-span">
              <el-form-item class="date-item">
                <el-date-picker
                  type="date"
                  :placeholder="languageSource.LocationLang.endDate"
                  v-model="gearPublish.endTime"
                  style="width: 100%;"
                  disabled>
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="16" :offset="4">
          <el-form-item :label="languageSource.LocationLang.publishExplain" prop="publishNotice">
            <el-input
              type="textarea"
              :rows="4"
              :placeholder="languageSource.LocationLang.publishTips"
              v-model="gearPublish.publishNotice">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">{{languageSource.CommonLang.cancel}}</el-button>
      <el-button type="primary" @click="submitFunc('gearPublish', multipleSelection)">{{languageSource.LocationLang.releasePublish}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'publishDialog',
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
    return {
      config,
      rules: {
        // batch: [
        //   { required: true, message: '请选择公布批次', trigger: 'change' }
        // ],
        // publishNotice: [
        //   { max: 255, message: '长度不能超过255个字符', trigger: 'blur' }
        // ]
      },
      'dialogVisible': false,
      'gearPublish': {
        publish: false
      },
      'options': [
        {
          value: '1',
          label: '第一批'
        }, {
          value: '2',
          label: '第二批'
        }
      ]
    };
  },
  created () {
    let languageSource = this.languageSource;
    this.rules = {
      batch: [
        { required: true, message: languageSource.LocationLang.batchMsg, trigger: 'change' }
      ],
      publishNotice: [
        { max: 255, message: languageSource.LocationLang.toLongMsg, trigger: 'blur' }
      ]
    };
  },
  methods: {
    submitFunc (formName, multipleSelection) {
      let gearPublish = this.gearPublish;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {};
          if (!gearPublish.publish) {
            data = {
              schemeId: multipleSelection[0].schemeId, //方案id
              batch: gearPublish.batch, //方案批次（显示为下拉框第一批、第二批）
              publishStartDate: gearPublish.startTime, //公布开始时间
              publishEndDate: gearPublish.endTime,    //公布结束时间
              publishNotice: gearPublish.publishNotice, //公布说明
              publishImmediate: 0 //即时公布,选中为1，不选中为0
            };
          } else {
            data = {
              schemeId: multipleSelection[0].schemeId, //方案id
              publishNotice: gearPublish.publishNotice, //公布说明
              publishImmediate: 1 //即时公布,选中为1，不选中为0
            };
          }
          this.$http.postJson(this.config.api.updatePublishStatus, data)
            .then(res => {
              this.$message.success(this.languageSource.LocationLang.publishMsg);
              this.$emit('publishReload');
            });
          this.dialogVisible = false;
        } else {
          return false;
        }
      });
    },
    clear () {
      this.gearPublish = {};
      this.$refs.gearPublish.resetFields();
    },
    selectChange (value) {
      this.gearPublish.startTime = "2018-11-25 00:00:00";
      this.gearPublish.endTime = "2019-1-24 00:00:00";
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
