<template>
  <div class="el-feedback">
    <el-dialog title="评价与报障" :visible.sync="dialogVisible" width="50%">
      <el-tabs v-model="activeName" style="margin-top:-12px;">
        <el-tab-pane label="评价" name="first">
          <el-form ref="rateForm" :model="rate" 
          data-url="/api/sysFeedbackRate/getSingleById" 
          update-url="/api/sysFeedbackRate/updateById" 
          add-url="/api/sysFeedbackRate/add">
            <el-row>
              <el-form-col label="评分：" prop="score" :span="24" required>
                <el-rate v-model="rate.score" show-text></el-rate>
              </el-form-col>
            </el-row>
            <el-row>
              <el-form-col label="备注：" prop="remark" :span="24">
                <el-input type="textarea" v-model="rate.remark" :rows="6"></el-input>
              </el-form-col>
            </el-row>
          </el-form>
          <div class="system-rate-buttons">
            <el-button type="primary" @click="onRateClick">提交</el-button>
            <el-button type="default" @click="dialogVisible=false">取消</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="报障" name="second">
          <el-form ref="bugForm" :model="bug">
            <el-row>
              <el-form-col label="类型：" prop="type" :span="24" required>
                <el-radio-list :options="bugsOptions" v-model="bug.type" button-view></el-radio-list>
              </el-form-col>
            </el-row>
            <el-row>
              <el-form-col label="描述：" prop="remark" :span="24">
                <el-input type="textarea" v-model="bug.remark" :rows="6"></el-input>
              </el-form-col>
            </el-row>
          </el-form>
          <div class="system-rate-buttons">
            <el-button type="primary" @click="onBugClick">提交</el-button>
            <el-button type="default" @click="dialogVisible=false">取消</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <i class="el-icon-star-off" @click="onClick"></i>
  </div>
</template>

<script>
import dialogPageBase from "@/components/framework/mixins/dialogPageBase";
export default {
  mixins: [dialogPageBase],
  name: "ElsysFeedback",
  data() {
    return {
      dialogVisible: false,
      activeName: "first",
      bugsOptions: [
        { value: "0", text: "系统错误" },
        { value: "1", text: "使用不方便" },
        { value: "2", text: "缺少功能" }
      ],
      rate: {
        score: 0,
        remark: ""
      },
      bug: {
        type: "0",
        remark: ""
      }
    };
  },
  created() {},
  methods: {
    onClick() {
      this.dialogVisible = true;
    },
    onRateClick() {
      this.$refs["rateForm"].validate(r => {
        if (r) {
          this.dialogVisible = false;
        }
      });
    },
    onBugClick() {
      this.$refs["bugForm"].validate(r => {
        if (r) {
          this.dialogVisible = false;
        }
      });
    }
  }
};
</script>

<style>
.el-feedback {
  position: absolute;
  bottom: 8px;
  left: 18px;
}
.el-icon-star-off {
  font-size: 18px;
}
.el-icon-star-off:hover {
  color: #f3a006;
}

.system-rate-buttons {
  text-align: center;
  margin: 10px;
}

.el-form-item .el-rate {
  margin-top: 6px;
}
</style>
