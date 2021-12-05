<template>
  <el-dialog
    title="公布"
    :visible.sync="dialogVisible"
    @close="clear"
    width="60%">
    <el-form ref="gearPublish" :model="gearPublish" :inline="false" size="small" label-width="125px" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <el-form-item label="即时公布：" prop="radio">
            <el-switch v-model="gearPublish.publish"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="!gearPublish.publish">
        <el-col :span="16" :offset="4">
          <el-form-item label="公布批次：" prop="batch">
            <el-select v-model="gearPublish.batch" placeholder="请选择">
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
          <el-form-item label="定时公布：" >
            <el-col :span="11" class="date-span">
              <el-form-item class="date-item">
                <el-date-picker
                  type="date"
                  placeholder="开始日期"
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
                  placeholder="结束日期"
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
          <el-form-item label="公布说明：" >
            <el-input
              maxlength="255"
              type="textarea"
              :rows="4"
              placeholder="填写要改装的具体要求说明"
              v-model="gearPublish.publishNotice">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitFunc('gearPublish', multipleSelection)">发布公布</el-button>
    </span>
  </el-dialog>
</template>

<script>
import config from '../../components';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'publishDialog',
  mixins: [listPageBase],
  props: {
    'multipleSelection': {
      'type': Array,
      'required': true
    }
  },
  data () {
    return {
      config,
      rules: {
        batch: [
          { required: true, message: '请选择公布批次', trigger: 'change' }
        ]
      },
      'dialogVisible': false,
      'gearPublish': {
        publish: false,
        startTime: "2018/11/25 0:00:00",
        endTime: "2019/1/24 0:00:00"
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
              this.$message.success('公布成功');
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
