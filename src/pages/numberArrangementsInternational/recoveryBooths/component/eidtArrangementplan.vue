<style lang="less" scoped>
.openApplication {
  height: 100%;
  /deep/.el-form-item {
    margin-bottom: 22px;
  }
}
</style>
<template>
  <div class="openApplication">
    <el-form ref="form" :model="fatDate" label-width="100px" class="demo-ruleForm">
      <el-table :data="fatDate.label" stripe border style="width: 100%">
        <el-table-column prop="exhibitionArea" label="展位类别"></el-table-column>
        <el-table-column prop="newVal" label="是否有需求"></el-table-column>
        <el-table-column prop="sequenceIndex" label="申报优先次序(A/B/C/D/E/F/G/H/I)"></el-table-column>
        <el-table-column label="安排数量" prop="boothNumber">
          <template slot-scope="scope">
            <el-form-item
              v-if="scope.row.newVal === '是'"
              :prop="'label.' + scope.$index + '.boothNumber' "
              label-width="0"
              :rules="[
                { required: true, message: '安排数量不能为空'},
                { type: 'number', message: '安排数量必须为数字值'}
              ]"
            >
              <el-input
                type="boothNumber"
                v-model.number="scope.row.boothNumber"
                autocomplete="off"
                maxlength="11"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;">
        <el-button type="primary" @click="onSubmit(fatDate)">保存</el-button>
        <el-button @click="closeModel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["fatDate"],
  data() {
    // //验证申请面积
    // let validateNum = (rule, value, callback) => {
    //   let str = /^\+?(0|[1-9][0-9]*)$/;
    //   if (!str.test(value)) {
    //     return callback(new Error('请输入正整数'));
    //   } else {
    //     return callback();
    //   }
    // };
    return {
    };
  },
  mounted() {},
  computed: {
    ...mapGetters("boothNumrange", ["editingplan"])
  },
  watch: {
    fatDate(val) {
      // console.log(val, 'val');
    }
  },
  methods: {
    ...mapActions("boothNumrange", ["getEditingplan"]),
    // 保存按钮
    onSubmit(formName) {
      this.$refs.form.validate(valid => {
        if (valid) {
          for (let key in formName.label) {
            formName.label[
              key
            ].operatorId = this.$store.getters.userInfo.userId;
            formName.label[
              key
            ].operatorName = this.$store.getters.userInfo.userName;
            formName.label[
              key
            ].token = this.$store.state.token;
          }
          this.getEditingplan(formName.label).then(res => {
            this.$message({
              type: "success",
              message: "编辑成功!"
            });
            this.closeModel();
          });
        }
      });
    },
    // 关闭新增弹框
    closeModel() {
      this.$emit("closeModel", false);
    }
  }
};
</script>
