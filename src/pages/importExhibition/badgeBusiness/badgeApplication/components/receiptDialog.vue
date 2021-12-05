<template>
  <div>
    <el-dialog :title="language.receiptContent" :close-on-click-modal="false" :visible.sync="dialogVisible" width="50%">
      <kindo-box>
        <el-form :model="receiptForm" ref="receiptForm" label-width="100px">
          <el-row>
            <el-col :span="10">
              <el-form-item :label="language.licenseLocation">
                <el-input v-model="receiptForm.takeBadgeAddr" class="inputclass" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item :label="language.name">
                <el-input v-model="receiptForm.applyUserName" class="inputclass" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item :label="language.idCardNo">
                <el-input v-model="receiptForm.idcardNo" class="inputclass" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item :label="language.dayNumber">
                <el-input v-model="receiptForm.feeType" class="inputclass" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item :label="language.applyTime">
                <el-input v-model="receiptForm.createDate" class="inputclass" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item :label="language.fee">
                <el-input v-model="receiptForm.feeLevel" class="inputclass" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item :label="language.certificate">
                <barcode :value="receiptForm.applyId" :options="barcodeOption"></barcode>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button icon="el-icon-close" @click="dialogVisible = false">{{language.cancel}}</el-button>
            <el-button icon="el-icon-printer" type="primary" @click="print">{{language.print}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </el-dialog>
  </div>
</template>
<script>
import barcode from '@xkeshi/vue-barcode';
export default {
  name: "",
  props: {
    receiptForm: {
      type: Object,
      default: () => {
        return {};
      }
    },
    language: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      barcodeOption: {
        displayValue: false,
        width: '1px', //单个条形码的宽度
        height: '55px',
        fontSize: '12px' //字体大小
      }
    };
  },
  methods: {
    // 打印
    print() {
      this.dialogVisible = false;
    }
  },
  components: {
    barcode
  }
};
</script>
<style>
</style>
