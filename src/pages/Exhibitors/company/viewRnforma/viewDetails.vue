<style lang="less">
  @import "../../../../theme/project/css/flex.less";
  #company-check {
    
  }
</style>

<template>
  <div id="company-check">
    <el-tabs v-model="activeName">
      <el-tab-pane label="审核企业申请" name="index">
        <div class="bm bm-pj">
          <el-form :inline="true" :rules="rules" ref="ruleForm" :model="ruleForm" class="demo-ruleForm" style="width:100%" label-width="200px">
            <el-row>
              <el-col :span="12">
                <div class="bm bm-ver">
                  <el-form-item label="审核:" size="mini"  prop="firstApprove">
                    <el-select v-model="ruleForm.firstApprove" placeholder="请选择">
                      <el-option v-for="item in newCheckArray" :label="item.label"
                      :value="item.value" :key="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item v-if="isDshoe" require label="不通过原因:" size="mini" >
                    <el-select v-model="ruleForm.reason" placeholder="请选择">
                      <el-option v-for="item in reasonArray" :label="item.label"
                      :value="item.value" :key="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item v-if="isDshoe" label=" " size="mini" >
                    <el-input
                      style="min-width:250px"
                      type="textarea"
                      :rows="3"
                      placeholder="请输入原因"
                      v-model="ruleForm.reasonElse">
                    </el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="bm bm-ver">
                  <el-form-item require label="是否财富五百强企业或子公司:" size="mini"  prop="firstFivehundredApprove">
                    <el-select v-model="ruleForm.firstFivehundredApprove" placeholder="请选择">
                      <el-option label="是" :value="1"></el-option>
                      <el-option label="否" :value="0"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item require label="是否参加其他国际展会:" size="mini"  prop="firstOtherExhibitorApprove">
                    <el-select v-model="ruleForm.firstOtherExhibitorApprove" placeholder="请选择">
                      <el-option label="是" :value="1"></el-option>
                      <el-option label="否" :value="0"></el-option>
                    </el-select>
                  </el-form-item>
                  <!-- <el-form-item label="是否重点企业:" size="mini" placeholder="请选择">
                    <el-select v-model="ruleForm.emphasisCompany" placeholder="请选择">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item> -->
                  <div class="bm" style="padding-left:200px">
                    <el-button :disabled="isShow" type="danger" @click="checkCompany">确认</el-button>
                    <el-button @click="$router.go(-1)">取消</el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 公司&产品切换Tab -->
    <el-tabs v-model="activeNameChild" style="padding: 0 10px">
      <!-- 完善企业信息 -->
      <el-tab-pane label="查看企业信息" name="first" class="tabs">
        <components-companyMessage></components-companyMessage>
      </el-tab-pane>

      <!-- 信息修改记录 -->
      <el-tab-pane label="查看产品信息" name="second" class="tabs">
        <components-productMessage></components-productMessage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import componentsCompanyMessage from "./components/companyMessage.vue";
import componentsProductMessage from "./components/productMessage.vue";
export default {
  components: {
    "components-companyMessage": componentsCompanyMessage,
    "components-productMessage": componentsProductMessage
  },
  data() {
    return {
      rowCompany: null,
      isShow: true,
      isDshoe: false,
      activeName: "index",
      activeNameChild: "first",
      ruleForm: {
        boothNum: "",
        boothApplyId: "",
        companyId: "",
        firstApprove: "",
        reason: "",
        reasonElse: "",
        firstFivehundredApprove: "",
        firstOtherExhibitorApprove: ""
      },
      reApproveArray: [],
      reasonArray: [],
      rules: {
        "firstApprove": [
          { required: true, message: "请选择审核状态" }
        ],
        // "reason": [
        //   { required: true, message: "请选择不通过原因" }
        // ],
        "firstFivehundredApprove": [
          { required: true, message: "请选择是否财富五百强企业或子公司" }
        ],
        "firstOtherExhibitorApprove": [
          { required: true, message: "请选择是否参加其他国际展会" }
        ]
      }
    };
  },
  computed: {
    newCheckArray() {
      let array = this.reApproveArray.slice(0);
      if (array.length > 0) {
        array.forEach((item, index) => {
          if (item.value === "0") {
            array.splice(index, 1);  
          }
        });
      }
      return array;
    }
  },
  methods: {
    ...mapActions("agents", [
      "getReserveCompanyList",    // 审核企业列表
      "postAdministratorReviews"  // 管理员审核展位申请
    ]),
    // 审核（确定）
    checkCompany() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.postAdministratorReviews(this.ruleForm).then(res => {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.$router.go(-1);
          });
        }
      });
    }
  },
  async created() {
    let { boothApplyId, companyId, boothNum, firstApprove, reApprove, reason, reasonElse, reFivehundreadApprove, reOtherExhibitorApprove } = JSON.parse(this.$route.query.row);
    Object.assign(this.ruleForm, { boothApplyId, companyId, boothNum, firstApprove, reApprove, reason, reasonElse, reFivehundreadApprove, reOtherExhibitorApprove });
    if (this.ruleForm.firstApprove === '2') {
      this.isShow = false;
    }
    if (this.ruleForm.reApprove === '2' || this.ruleForm.reApprove === '0') {
      this.isDshoe = true;
    }
    this.reApproveArray = await kindo.dictionary.get('ifoCommonApproveStatus');
    this.reasonArray = await kindo.dictionary.get('ifoBoothApplyRefuseReason');
  }
};
</script>
