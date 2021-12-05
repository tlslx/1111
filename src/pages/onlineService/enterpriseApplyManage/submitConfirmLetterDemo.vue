/**
 * @file 提交确认书
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="提交确认书" name="first" style="padding-left: 70px; padding-right: 200px;">
      <el-form :model="formData" label-position="right" :rules="rules" label-width="180px">
        <el-form-item label="企业名称：" prop="companyName">
          <el-input v-model="formData.companyName" disabled value="宝芝林" style="width: 400px; "></el-input>
        </el-form-item>
        <el-form-item label="广交会编码：" prop="cantonFairCode">
          <el-input v-model="formData.cantonFairCode" disabled style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="交易团：" prop="dealClusterName">
          <el-input v-model="formData.dealClusterName" disabled style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="展区：" prop="exhibitionAreaName">
          <el-input v-model="formData.exhibitionAreaName" disabled style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="展期：" prop="exhibitionPeriod">
          <el-input v-model="formData.exhibitionPeriod" disabled style="width: 400px; margin-top: 8px">
          </el-input>
        </el-form-item>
        <el-form-item label="上届品牌展位数量：" prop="lastBoothNumber">
          <el-input v-model="formData.lastBoothNumber" disabled style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="退回展位号：" prop="backBooth">
          <el-checkbox-group v-model="backCooth" @change="handleCheckedCitiesChange">
            <el-checkbox :label="item" v-for='(item,key) in backAooth' :key='key'>{{item}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="本届品牌展位数变化量：" prop="currentChangeNumber">
          <el-input v-model="formData.currentChangeNumber" disabled style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="本届保留品牌展位数：" prop="currentReserveNumber">
          <el-input v-model="formData.currentReserveNumber" disabled style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="情况分类：" prop="backType">
          <el-select v-model="formData.backType" style="width: 400px; margin-top: 8px">
            <el-option label="请选择" value=""></el-option>
            <el-option label="全部退回" value="1"></el-option>
            <el-option label="部分退回" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退回原因：" prop="backReason">
          <el-input v-model="formData.backReason" style="margin-top: 8px" maxlength="120" type="textarea" rows="3"
            value="宝芝林"></el-input>
        </el-form-item>
      </el-form>
      <p style="text-align: center;">关于退展位收费约束机制的时间机制</p>
      <textarea v-model="name" id="" disabled cols="" style="background: #ebebeb; width: 100%" rows="5"></textarea>
      <div>
        <el-checkbox v-model="checked">本司已读并确认以上所述内容</el-checkbox>
        <div style="float: right;">
          <el-button @click="toDemplate">打印模板</el-button>
          <el-button>上传确认书</el-button>
        </div>
      </div>
      <div style="text-align: center;">
        <el-button type="primary" :disabled="!checked" @click="onSubmit">提交</el-button>
        <el-button type="info" @click="handSuer">取消</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import { mapActions } from "vuex";
  export default {
    data() {
      return {
        formData: {
          currentChangeNumber: "",
          currentReserveNumber: "",
          backType: "",
          backReason: ""
        },
        explainType: '',
        backCooth: [],
        rules: {
          backType: [{ required: true, message: "请选择", trigger: "change" }],
          backReason: [{ required: true, message: "请输入", trigger: "change" }],
          backCooth: [{ required: true, message: "请选择", trigger: "change" }]
        },
        backAooth: [],
        activeName: "first",
        name: "",
        id: "",
        checked: true
      };
    },
    created() {
      this.id = this.$router.history.current.query.id;
      this.explainType = this.$router.history.current.query.explainType;
      this.handleList();
    },
    methods: {
      ...mapActions("enterprisesConfirm", [
        "getEnterprisesSubmit",
        "postSummarized",
        "getEnterprisesAubmit"
      ]),
      // 获去后台数据
      handleList() {
        let obj = {
          boothAffirmId: this.id
        };
        this.getEnterprisesAubmit(obj)
          .then(res => {
            let atr = JSON.parse(JSON.stringify(res));
            let arr = atr.backBooth;
            this.formData = Object.assign(this.formData, atr);
            let abb = arr.substring(1, arr.length - 1).split(",");
            this.backAooth = abb;
          })
          .catch(e => { });
        let explain = {
          explainType: this.explainType
        };
        this.getEnterprisesSubmit(explain)
          .then(res => {
            this.name = res.projectContent;
          })
          .catch(e => { });
      },
      // 复选改变值
      handleCheckedCitiesChange(value) {
        // console.log(value);
        if (value.length) {
          this.formData.currentChangeNumber = value.length;
        } else {
          this.formData.currentChangeNumber = "";
        }
        if (this.formData.currentChangeNumber) {
          this.formData.currentReserveNumber = this.formData.lastBoothNumber - this.formData.currentChangeNumber;
        } else {
          this.formData.currentReserveNumber = "";
        }
      },
      // 提交
      onSubmit() {
        if (this.backCooth.length === 0) {
          this.$message("退回展位号不能为空");
        } else if (this.formData.backType === "") {
          this.$message("情况分类不能为空");
        } else if (this.formData.backReason === "") {
          this.$message("退回原因不能为空");
        } else {
          let forMata = this.backCooth.join(",");
          let objw = {
            cantonFairCode: this.formData.cantonFairCode,
            backType: this.formData.backType,
            backReason: this.formData.backReason,
            exhibitionPeriod: this.formData.exhibitionPeriod,
            dealClusterName: this.formData.dealClusterName,
            backBooth: forMata,
            exhibitionAreaName: this.formData.exhibitionAreaName,
            companyName: this.formData.companyName,
            lastBoothNumber: this.formData.lastBoothNumber,
            currentChangeNumber: this.formData.currentChangeNumber,
            currentReserveNumber: this.formData.currentReserveNumber,
            boothAffirmId: this.id
          };
          this.formData = objw;     
          this.postSummarized(this.formData)
            .then(res => {
              this.$router.push("/derpaid_deposit");
            })
            .catch(e => { });
        }
      },
      toDemplate() { },
      // 取消
      handSuer() {
        this.$router.push({
          path: "/derpaid_deposit"
          // query: {
          //   id
          // }
        });
      }
    }
  };
</script>
<style scoped>
</style>