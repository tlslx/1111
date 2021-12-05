<template>
  <el-container>
    <!--页面对话框-->
    <el-dialog :visible.sync="deadlineVisible" :close-on-press-escape="false" :close-on-click-modal="false">
      <template slot="title">
        <span class="el-dialog__title">{{language.setDeadline}}</span>
      </template>
       <kindo-box style="height: 150px">
          <el-form :model="deadlineForm" ref="deadlineForm" label-width="130px" inline label-position="right" :rules="rules">
            <el-form-item :label="language.setDeadline" prop="time">
              <el-date-picker v-model="deadlineForm.time" type="datetime" :placeholder="language.selectPlaceholder" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions" class="normalclass">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </kindo-box>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deadlineVisible = false">{{language.cancel}}</el-button>
          <el-button type="primary" @click="onSubmit('deadlineForm')">{{language.confirm}}</el-button>
        </div>
     
    </el-dialog>
  </el-container>
</template>
<script>
  import listPageBase from '@/components/framework/mixins/listPageBase';
  export default {
    name: "deadlineDialog",
    mixins: [listPageBase],
    props: {
      api: {
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
        deadlineVisible: false,
        action: '',
        deadlineForm: {
          time: null
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        rules: {
          time: [
            { required: true, message: '', trigger: "change" }
          ]
        }
      };
    },
    async created() {
      this._deadlineForm = Object.assign({}, this.deadlineForm);
      this.rules.time = [
        { required: true, message: this.language.selectPlaceholder, trigger: "change" }
      ];
    },
    watch: {
      "deadlineForm.time"(v) {
        this.deadlineForm.time = kindo.util.formatDate(v, "yyyy-MM-dd HH:mm:ss");
      },
      deadlineVisible(v) {
        if (v === true) {
          this.getDeadline();
        }
      }
    },
    methods: {
      getDeadline() {
        this.$nextTick(function () {
          this.deadlineForm = Object.assign({}, this._deadlineForm);
          this.$refs.deadlineForm.resetFields();
          this.$http.get(this.api.setTime, { item: 'seaTariffNumberEndDate' }).then(res => {
            this.deadlineForm.time = res;
          });
        });
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = { item: 'seaTariffNumberEndDate', code: this.deadlineForm.time };
            this.$http.postJson(this.api.deadline, params).then(res => {
              this.$message({
                type: 'success',
                message: this.language.successful
              });
            }).then(_ => {
              this.deadlineVisible = false;
            });
          }
        });
      }
    }
  };
</script>
<style scoped>
</style>