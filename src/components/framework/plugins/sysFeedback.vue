<template>
  <div class="el-feedbak">
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
            <el-button type="primary" @click.stop="onRateClick">提交</el-button>
            <el-button type="default" @click.stop="dialogVisible=false">取消</el-button>
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
            <el-button type="primary" @click.stop="onBugClick">提交</el-button>
            <el-button type="default" @click.stop="dialogVisible=false">取消</el-button>
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
  name: "ElFeedback",
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
      },
      dataLoadHandler: { type: Function }
    };
  },
  created() {},
  methods: {
    onClick() {
      this.dialogVisible = true;
    },
    onRateClick() {
      if (this.rate.remark.length < 10 && this.rate.score < 4) {
        this.$message({
          message: "能多写点内容吗，我们好改进一下！",
          type: "warning"
        });
        return;
      }
      // 设置服务路径
      let url = this.$utility.getUrl(process.env.API_BASE_URL + "/api/sysFeedbackRate/module/rate");
      this.$http
        .postJson(url,
        JSON.stringify({
          moduleName: this.$route.fullPath,
          modulePath: this.$route.name,
          remark: this.rate.remark,
          score: this.rate.score,
          sysCode: "未知",
          sysName: "未知"
        })
        )
        .then(data => {
          this.$message({
            message: "你的评价，是我们前进的动力，多谢！",
            type: "success"
          });
          this.dialogVisible = false;
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  },
  onBugClick() {
    this.$refs["bugForm"].validate(r => {
      if (r) {
        this.dialogVisible = false;
      }
    });
  }
};
</script>

<style>
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
