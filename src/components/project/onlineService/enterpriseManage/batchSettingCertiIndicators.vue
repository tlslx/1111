<style scoped>
  .batch-setting-form-item {
    padding: 10px;
  }
</style>
<template>
  <div>
    <el-dialog
      title="设置VIP企业证件指标："
      :visible.sync="batchSettingInfo.dialogVisible">
      <el-form :inline="true" :model="batchSettingForm" :rules="batchSettingRules" ref="batchSettingForm" class="set-vip-service-scope">
        <el-form-item class="batch-setting-form-item"
          label="筹展证："
          prop="exhibitionCert">
          <el-input
            v-model.number="batchSettingForm.exhibitionCert"
            clearable
            @input.native="(value) => checkNum('exhibitionCert', $event)"
            maxlength="8"
            placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item class="batch-setting-form-item"
          label="撤展证："
          prop="rebackExhibitionCert">
          <el-input
            v-model.number="batchSettingForm.rebackExhibitionCert"
            clearable
            @input.native="(value) => checkNum('rebackExhibitionCert', $event)"
            maxlength="8"
            placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item class="batch-setting-form-item"
          label="内接待证："
          prop="receptionCert">
          <el-input
            v-model.number="batchSettingForm.receptionCert"
            clearable
            @input.native="(value) => checkNum('receptionCert', $event)"
            maxlength="8"
            placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item class="batch-setting-form-item"
          label="内停车证："
          prop="parkingCert">
          <el-input
            v-model.number="batchSettingForm.parkingCert"
            clearable
            @input.native="(value) => checkNum('parkingCert', $event)"
            maxlength="8"
            placeholder="请输入">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="confirm">确 定</el-button>
        <el-button type="info" @click="cancel">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'batchSettingCertiIndicators',
  data() {
    return {
      batchSettingForm: {
        "exhibitionCert": '',
        "rebackExhibitionCert": '',
        "parkingCert": '',
        "receptionCert": ''
      },
      batchSettingRules: {
        // 筹展证证件指标
        exhibitionCert: [
          { validator: this.check, trigger: 'blur' }
        ],
        // 撤展证证件指标
        rebackExhibitionCert: [
          { validator: this.check, trigger: 'blur' }
        ],
        // 内停车证证件指标
        parkingCert: [
          { validator: this.check, trigger: 'blur' }
        ],
        // 接待证证件指标
        receptionCert: [
          { validator: this.check, trigger: 'blur' }
        ]
      }
    };
  },
  components: {
  },
  props: {
    batchSettingInfo: {
      type: Object
    }
  },
  computed: {
  },
  methods: {
    check(rule, value, callback) {
      if (!Number.isInteger(Number(value))) {
        return callback(new Error('请输入正整数'));
      } else {
        return callback();
      }
    },
    checkNum(prop, e) {
      this.$nextTick(() => {
        let reg = /(^[1-9]\d*$)|(^0?$)/;
        if (!reg.test(e.target.value)) {
          this.batchSettingForm[prop] = '';
        }
      });
    },
    confirm() {
      this.$emit('batch-setting', this.batchSettingForm);
    },
    cancel() {
      this.$emit('close-batch-setting');
    }
  }
};
</script>


