/**
* @file  广交会-车证申请信息
* @author:zhangwenjian
* @date:2019/3/18
*/
<template>
    <div class="container">
      <p class="top_line"><span class="title">广交会车证申请信息</span></p>
      <div v-for="(addCertificateForm, index) in addCertificateForms" :key="index">
        <div v-if="index !== 0" style="width: 100%;height: 1px;margin-bottom: 15px;background-color: #c1c1c1"></div>
        <el-row class="item">
          <el-col :span="4">
            <span class="tip">1</span>
          </el-col>
          <el-col :span="8">
            <span class="itemtitle">驾驶员姓名:</span>
            <span class="content">{{addCertificateForm.driverName}}</span>
          </el-col>
          <el-col :span="12">
            <span class="itemtitle">驾驶员电话:</span>
            <span class="content">{{addCertificateForm.driverPhone}}</span>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="4">
            <span class="itemtitle"></span>
          </el-col>
          <el-col :span="8">
            <span class="itemtitle">身份证号:</span>
            <span class="content">{{addCertificateForm.driverIdCard}}</span>
          </el-col>
          <el-col :span="12">
            <span class="itemtitle">车牌号码:</span>
            <span class="content">{{addCertificateForm.plateNumber}}</span>
          </el-col>
        </el-row>

        <el-row class="item">
          <el-col :span="4">
            <span class="itemtitle"></span>
          </el-col>
          <el-col :span="8">
            <span class="itemtitle">货车(车长):</span>
            <span class="content">{{addCertificateForm.carLeader}}米</span>
          </el-col>
          <el-col :span="12">
            <span class="itemtitle">车证时间:</span>
            <span class="content">{{addCertificateForm.cardDate}}</span>
          </el-col>
        </el-row>

        <el-row class="item">
          <el-col :span="4">
            <span class="itemtitle"></span>
          </el-col>
          <el-col :span="8">
            <span class="itemtitle">行驶证照片:</span>
            <img :src="showImg(addCertificateForm.runLicenseImage)" @click="showImgDialog(addCertificateForm.runLicenseImage)" class="img"/>
          </el-col>
          <el-col :span="12">
            <span class="itemtitle">驾驶证照片:</span>
            <img :src="showImg(addCertificateForm.driverLicenseImage)" @click="showImgDialog(addCertificateForm.driverLicenseImage)" class="img"/>
          </el-col>
        </el-row>

        <el-row class="item">
          <el-col :span="4">
            <span class="itemtitle"></span>
          </el-col>
          <el-col :span="8">
            <span class="itemtitle">司机头像照片:</span>
            <img :src="showImg(addCertificateForm.driverImage)" @click="showImgDialog(addCertificateForm.driverImage)" class="img"/>
          </el-col>
          <el-col :span="12">
            <span class="itemtitle">身份证照片:</span>
            <img :src="showImg(addCertificateForm.idCardImage)" @click="showImgDialog(addCertificateForm.idCardImage)" class="img"/>
          </el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="4">
            <span class="itemtitle"></span>
          </el-col>
          <el-col :span="8">
            <span class="itemtitle">车险照片:</span>
            <img :src="showImg(addCertificateForm.carInsuranceImage)" @click="showImgDialog(addCertificateForm.carInsuranceImage)" class="img"/>
          </el-col>
          <el-col :span="12" >
            <span class="itemtitle" v-if="cardType === '2'">出厂合格证:</span>
            <img v-if="cardType === '2'" :src="showImg(addCertificateForm.passCertificate)" @click="showImgDialog(addCertificateForm.passCertificate)" class="img"/>
          </el-col>
        </el-row>
        <el-row class="item" v-if="cardType === '2'">
          <el-col :span="4">
            <span class="itemtitle"></span>
          </el-col>
          <el-col :span="8">
            <span class="itemtitle">特种使用登记证:</span>
            <img :src="showImg(addCertificateForm.registrationCertificate)" @click="showImgDialog(addCertificateForm.registrationCertificate)" class="img"/>
          </el-col>
          <el-col :span="12">
            <span class="itemtitle">检验报告和检验合格标记:</span>
            <img :src="showImg(addCertificateForm.testReport)" @click="showImgDialog(addCertificateForm.testReport)" class="img"/>
          </el-col>
        </el-row>
        <el-row class="item" v-if="cardType === '2'">
          <el-col :span="4">
            <span class="itemtitle"></span>
          </el-col>
          <el-col :span="8">
            <span class="itemtitle">特种作业人员证:</span>
            <img :src="showImg(addCertificateForm.operationCard)" @click="showImgDialog(addCertificateForm.operationCard)" class="img"/>
          </el-col>
          <el-col :span="12">
            <span class="itemtitle">保险:</span>
            <img :src="showImg(addCertificateForm.insurance)" @click="showImgDialog(addCertificateForm.insurance)" class="img"/>
          </el-col>
        </el-row>
      </div>
      <div style="text-align: center">
        <el-button @click="toApplyList()">返回</el-button>
      </div>

      <el-dialog :visible.sync="dialogVisible" width="550px">
        <img style="width: 100%;height: 360px"  :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "cantonFairCarCertificatesDetail",
      data() {
        return {
          addCertificateForms: [],
          vehicleCardId: '',
          dialogVisible: false,
          dialogImageUrl: '',
          cardType: '0',
          enterRouter: '',
          baseApi: process.env.API_MB_URL
        };
      },
      mounted() {
        this.vehicleCardId = this.$route.query.vehicleCardId;
        this.enterRouter = this.$route.query.enterRouter;
        if (this.vehicleCardId) {
          this.getDetailById(this.vehicleCardId);
        }
      },
      methods: {
        getDetailById(vehicleCardId) {
          this.$http.get(this.baseApi + '/api/customservice/carrier/adminGetVehicleCard', { vehicleCardId: vehicleCardId }).then(res => {
            this.addCertificateForms = res.cardDetailList;
            this.cardType = res.cardType;
          }).catch(error => {
            this.$message.error(error);
          });
        },
        showImgDialog(path) {
          if (path !== '' && path != null) {
            this.dialogVisible = true;
            this.dialogImageUrl = this.baseApi + "/api/customservice/multiBusi/viewImage/" + path;
          }
        },
        showImg(path) {
          if (path !== '' && path != null) {
            let url = this.baseApi + "/api/customservice/multiBusi/viewImage/" + path;
            return url;
          } else {
            return '';
          }
        },
        // 返回列表
        toApplyList() {
          this.$router.push({ path: this.enterRouter });
        }
      }
    };
</script>

<style scoped>
  .container {
    margin: 10px;
  }

  .top_line {
    border-bottom: 1px solid #cdcdcd;
    margin-left: 20px;
  }

  .top_line .title {
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid #8a8a8a;
  }
  .item{
    margin: 25px 0;
  }
  .itemtitle{
    display: inline-block;
    width: 100px;
    vertical-align: top;
    text-align: right;
  }
  .tip{
    display: inline-block;
    width: 20px;
    height: 20px;
    color: #FFFFFF;
    line-height: 20px;
    text-align: center;
    border-radius: 10px;
    background-color: red;
    margin-left: 70%;
  }
  .img{
    height: 50px;
    width: 90px;
    margin-left: 5px;
    background-color: #8b8b8b;
  }
  .content{
    display: inline-block;
    text-align: left;
    margin-left: 5px;
    vertical-align: top;
  }
</style>
