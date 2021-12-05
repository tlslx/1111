/**
* @file 承运商-企业资料详情
* @author:zhangwenjian
* @date:2019/3/21
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">承运商企业资料详情</span></p>
      <el-row class="item">
        <el-col :span="2">
          <span class="itemtitle"></span>
        </el-col>
        <el-col :span="10">
          <span class="itemtitle">企业名称:</span>
          <span class="content">{{companyInfoForm.carrierName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="itemtitle">公司省市:</span>
          <span v-for="(item,index) in provinceDatas" :key="index" v-if="item.dataDictItemId === companyInfoForm.companyProvince"  class="content">{{item.itemText}}</span>
          <span v-for="(item,index) in cityDatas" :key="index" v-if="item.dataDictItemId === companyInfoForm.companyCity"  class="content">{{item.itemText}}</span>
        </el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="2">
          <span class="itemtitle"></span>
        </el-col>
        <el-col :span="10">
          <span class="itemtitle">法人代表:</span>
          <span class="content">{{companyInfoForm.legalRepresent}}</span>
        </el-col>
        <el-col :span="12">
          <span class="itemtitle">详细地址:</span>
          <span class="content">{{companyInfoForm.companyAddress}}</span>
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="2">
          <span class="itemtitle"></span>
        </el-col>
        <el-col :span="10">
          <span class="itemtitle">企业联络人:</span>
          <span class="content">{{companyInfoForm.contactName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="itemtitle">手机号:</span>
          <span class="content">{{companyInfoForm.contactMobile}}</span>
        </el-col>
      </el-row>

      <el-row class="item">
        <el-col :span="2">
          <span class="itemtitle"></span>
        </el-col>
        <el-col :span="10">
          <span class="itemtitle">营业执照:</span>
          <img :src="showImg(companyInfoForm.businessLicense)" class="img" @click="showImgDialog(companyInfoForm.businessLicense)"></img>
        </el-col>
        <el-col :span="12">
          <el-row>
            <span class="itemtitle">业务范围:</span>
            <span class="content">{{companyInfoForm.businessScope}}</span>
          </el-row>
          <el-row class="item">
              <span class="itemtitle">其它附件:</span>
              <a style="display: block;margin-left: 103px" v-for="(item,index) in companyInfoForm.attachmentList"  target="_blank" :href="showImg(item.filePath)">{{item.fileName}}</a>
          </el-row>
        </el-col>
      </el-row>

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
    name: "cmApplyLogisticsDetail",
    data() {
      return {
        carrierId: '',
        enterRouter: '',

        dialogVisible: false,
        dialogImageUrl: '',

        companyInfoForm: {
          carrierId: '',
          carrierName: '',
          companyProvince: '',
          companyCity: '',
          companyAddress: '',
          legalRepresent: '',
          contactName: '',
          businessLicense: '',
          contactMobile: '',
          businessScope: '',
          attachmentList: []
        },
        provinceDatas: [],
        cityDatas: [],
        companyCategory: [],
        baseApi: process.env.API_MB_URL,
        baseApi2: process.env.API_DICT_URL
      };
    },
    mounted() {
      this.enterRouter = this.$route.query.enterRouter;
      this.carrierId = this.$route.query.carrierId;
      if (this.$route.query.carrierId) {
        this.getCarrierInfoById(this.carrierId);
      } else {
        this.getCarrierInfo();
      }
      this.getCompanyArea();
    },
    methods: {
      // 获取企业信息详情
      getCarrierInfo() {
        this.$http.get(this.baseApi + '/api/customservice/carrier/getCarrierByCurrentUser').then(res => {
          this.initFormData(res);
        }).catch(error => {
          this.$message.error(error);
        });
      },
      getCarrierInfoById(carrierId) {
        this.$http.get(this.baseApi + '/api/customservice/carrier/getCarrierById', { carrierId: carrierId }).then(res => {
          this.initFormData(res);
        }).catch(error => {
          this.$message.error(error);
        });
      },
      initFormData(res) {
        for (let item in this.companyInfoForm) {
          this.companyInfoForm[item] = res[item];
        }

        this.fileList = [];
        this.companyInfoForm.attachmentList = [];

        this.getCityData(res.companyProvince);
        if (res.businessLicense) {
          this.businessLicenseUrl = this.showImg(res.businessLicense);
        }

        for (let i = 0, length = res.attachmentList.length; i < length; i++) {
          let params = {
            name: res.attachmentList[i].fileName,
            url: res.attachmentList[i].filePath
          };
          let paramsMy = {
            fileName: res.attachmentList[i].fileName,
            filePath: res.attachmentList[i].filePath
          };
          this.companyInfoForm.attachmentList.push(paramsMy);
          this.fileList.push(params);
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
      showImgDialog(path) {
        this.dialogVisible = true;
        this.dialogImageUrl = this.baseApi + "/api/customservice/multiBusi/viewImage/" + path;
      },
      // 企业地区字典信息获取
      getCompanyArea() {
        this.$http.get(this.baseApi2 + '/api/sysDataDictItem/findDicItemList?dictCode=province').then(data => {
          this.provinceDatas = data.records;
        }).catch(error => {
        });
      },
      // 通过省份获取城市信息
      getCityData(dataDictItemId) {
        this.$http.get(this.baseApi2 + '/api/sysDataDictItem/getChildDicItemList?dataDictItemId=' + dataDictItemId).then(data => {
          this.cityDatas = data.records;
        }).catch(error => {
        });
      },
      // 返回列表
      toApplyList() {
        if (this.enterRouter) {
          this.$router.push({ path: this.enterRouter });
        } else {
          this.$message.warning("请点击其他tab进行页面切换!");
        }
      },
      // 跳转到修改页面
      toUpdate() {

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
    height: 80px;
    width: 160px;
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
<style lang="scss" scoped>
  /deep/.el-input--mini .el-input__inner {
    height: 40px;
    line-height: 40px;
    width: 180px;
  }
  /deep/.el-input--small .el-input__inner {
    height: 36px;
    line-height: 36px;
    width: 280px;
  }
  /deep/.el-select--mini .el-input  .el-input__inner{
    height: 40px;
    line-height: 40px;
    width: 160px;
  }
  /deep/.el-select--small{
    line-height: 36px;
    width: 280px;
  }
  /deep/.el-select--small   .el-input  .el-input__inner{
    height: 36px;
    line-height: 36px;
    width: 280px;
  }
  /deep/.el-pagination .el-select .el-input .el-input__inner{
    height: 28px;
    line-height: 28px;
    width: 100px;
  }
  /deep/.el-form-item--mini .el-form-item__label{
    line-height: 20px;
  }
  /deep/.el-form-item--small .el-form-item__label{
    line-height: 18px;
  }
  /deep/.el-form-item--mini{
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
  }
  /deep/.el-form-item--small{
    height: 36px;
    line-height: 36px;
    vertical-align: middle;
  }
  /deep/.el-dialog__body{
    padding: 20px 0;
    border-top: 1px solid #cccccc;
  }
  /deep/.el-table__header tr,
  /deep/.el-table__header th {
    padding: 0;
    height: 42px;
  }
  /deep/.el-table__body tr,
  /deep/.el-table__body td {
    padding: 0;
    height: 40px;
  }
</style>
<style>
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 42px;
  }
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
  }
</style>
