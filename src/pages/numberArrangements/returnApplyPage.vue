<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="交易团发起申请" name="first" style="padding-left: 70px; padding-right: 200px;">
      <el-form ref="dataForm" :model="formData" label-position="right" :rules="rules" label-width="180px">
        <el-form-item label="企业名称：" prop="companyName">
          <el-autocomplete class="inline-input" placeholder="请输入" v-model.trim="formData.companyName" style="width: 400px; " :fetch-suggestions="querySearch" @select="handleCompanyChange" clearable></el-autocomplete>
           <!-- <el-select v-model="formData.companyName" @change="handleCompanyChange" placeholder="请选择" style="width: 400px; ">
            <el-option
              v-for="item in options"
              :key="item.companyId"
              :label="item.companyName"
              :value="item.companyName">
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="展区：" prop="exhibitionAreaName">
          <!--
          <el-autocomplete class="inline-input" placeholder="请输入" v-model.trim="formData.exhibitionAreaName" style="width: 400px; " :fetch-suggestions="querySearch2" @select="handleCompanyChangea" clearable></el-autocomplete>
          -->
          <el-select v-model="formData.exhibitionAreaName" @change="handleCompanyChangea" clearable style="width: 400px; ">
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionArea" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码：" prop="cantonFairCode">
          <el-input v-model="formData.cantonFairCode" disabled style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="交易团：" prop="dealClusterName">
          <el-input v-model="formData.dealClusterName" disabled style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="展期：" prop="exhibitionPeriod">
          <el-input v-model="formData.exhibitionPeriod" disabled style="width: 400px; margin-top: 8px">
          </el-input>
        </el-form-item>
        <el-form-item label="退回前品牌展位数：" prop="lastBoothNumber">
          <el-input v-model.number="formData.lastBoothNumber" @change="handleCheckedCitiesChange" disabled style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="退回展位号：" prop="backCooth">
          <el-checkbox-group v-model="formData.backCooth" @change="handleCheckedCitiesChange">
            <el-checkbox :label="item" v-for='(item,key) in backAooth' :key='key'>{{item}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item label="退回品牌展位数：" prop="backBoothNumber">
          <el-input placeholder="请输入" v-model.trim.number="formData.backBoothNumber" @change="handleCheckedCitiesChange" style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="保留品牌展位数：" prop="currentReserveNumber">
          <el-input v-model.number="formData.currentReserveNumber" @change="handleInputChange" disabled style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="情况分类：" prop="backType">
          <!--
           <el-input disabled v-model="formData.backType" style="width: 400px; margin-top: 8px" placeholder="全部退回"></el-input>
          -->
          <el-select placeholder="" v-model="formData.backType" disabled style="width: 400px; margin-top: 8px">
            <el-option label="全部退回" value="1"></el-option>
            <el-option label="部分退回" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业退回原因：" prop="backReason">
          <el-input v-model="formData.backReason" style="margin-top: 8px" maxlength="120" type="textarea" rows="3"></el-input>
        </el-form-item>
        <el-form-item prop="fileId">
          <el-upload
            class="upload-demo floatLeft"
            action=""
            :limit="1"
            :on-change="handleFileChange"
            :http-request="uploadFileMethod">
            <el-button size="small" type="primary">上传企业退回申请书</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <!--
      <p style="text-align: center;">关于退展位收费约束机制的时间机制</p>
      <textarea v-model="aboutDetails" id="" disabled cols="" style="background: #ebebeb; width: 100%" rows="5"></textarea>
      <div>
        <el-checkbox v-model="checked">本司已读并确认以上所述内容</el-checkbox>
        <div style="float: right;">
          <el-button type="danger" @click="toDemplate" class="floatLeft">打印模板</el-button>
        </div>
      </div>
      -->
      <div style="text-align: center;">
        <el-button type="primary" :disabled="!checked" @click="onSubmit('dataForm')">提交</el-button>
        <el-button @click="handSuer">取消</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import { mapActions, mapGetters } from "vuex";
  import listPageBase from "@/components/framework/mixins/listPageBase";
  export default {
    mixins: [listPageBase],
    data() {
      var needInt = (rule, value, callback) => {
        const reg = /[^\d\$]/g;
        if (value === '') {
          return callback(new Error('请输入>=0的整数'));
        } else if (reg.test(value)) {
          return callback(new Error('请输入>=0的整数'));
        } else if (value > this.formData.lastBoothNumber) {
          return callback(new Error('请输入小于或等于上届品牌展位数量的数字'));
        } else {
          return callback();
        }
      };
      return {
        options: [],
        exhibitionAreaOpts: [],
        formData: {
          boothAffirmId: '',
          backBoothNumber: '',
          companyName: '',
          exhibitionAreaName: '',
          cantonFairCode: '',
          companyId: '',
          companyCode: '',
          exhibitionArea: '',
          dealClusterName: '',
          exhibitionPeriod: '',
          lastBoothNumber: '',
          dealClusterId: '',
          currentChangeNumber: '',
          currentReserveNumber: '',
          backType: '',
          backReason: '',
          fileId: ''
        },
        rules: {
          companyName: [{ required: true, message: "请输入", trigger: "change" }],
          //exhibitionAreaName: [{ required: true, message: "请输入", trigger: "change" }],
          backReason: [{ required: true, message: "请输入", trigger: "blur" }],
          currentChangeNumber: [{ required: true, validator: needInt, trigger: "blur" }]
          //fileId: [{ required: true, message: '请上传', trigger: 'change' }]
        },
        restaurant: [], // 带建议的输入框  企业
        restaurants: [], // 带建议的输入框   展区
        aboutDetails: '',
        activeName: "first",
        checked: true
      };
    },
    created() {
      /*
      // 展区
      this.getexhibitionArea().then(res => {
        this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
        this.exhibitionAreaOpts.forEach(element => {
          let data = {
            "value": element.exhibitionAreaName,
            "address": element.exhibitionAreaCode
          };
          this.restaurants.push(data);
        });
      }).catch(e => {});
      */
     // 当前展届
      this.$http.get(`${process.env.API_NA_URL}/api/common/currentExhibitionSession/get`).then(resa => {
        let exhibitionSession = resa;
        //获取当前页面公司名称数据
        this.$http.get(`${process.env.API_NA_URL}/api/numberAffirm/getCompanyList?dealClusterId=${this.$store.getters.userInfo.org.deptId}&exhibitionSession=${exhibitionSession}`).then((res) => {
          this.options = res;
          this.options.forEach(element => {
            let data = {
              "value": element.companyName,
              "address": element.companyId
            };
            this.restaurant.push(data);
          });
        });
      });

      /*  退展位约束机制文字数据请求
      this.getExplainSet().then(res => {
        this.aboutDetails = res.projectContent;
      }).catch(e => {});
      */
      /*
      this.getEnterprisename(this.$store.getters.userInfo.org.deptId).then((res) => {
        this.options = res;
        this.options.forEach(element => {
          let data = {
            "value": element.companyName,
            "address": element.companyId
          };
          this.restaurant.push(data);
        });
      });
      */
    },
    computed: {
      ...mapGetters("enterpriseReturnApply", [
        "enterpriseNameList" // 企业名称
      ]),
      ...mapGetters("nainformation", ["getCes"])//获取展届
    },
    methods: {
      ...mapActions("enterpriseReturnApply", [
        "getAffirmCompanyInfo", // 根据企业、展区获取品牌确认信息
        "postConfirmDetailUpload", // 上传确认书
        "postAddApplySubmit", // 新增提交
        'getEnterprisename',  //企业名称
        'getExhibitionname'   //交易团发起申请(联想展区)
      ]),
      ...mapActions('nainformation', ['getexhibitionArea', 'getcurrentExhibitionSession']), //展届
      ...mapActions('numberBrands', ['getExplainSet']),
      // 企业可选建议搜索
      querySearch(queryString, cb) {
        let restaurant = this.restaurant;
        let results = queryString ? restaurant.filter(this.createFilte(queryString)) : restaurant;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      // 企业调用的方法
      createFilte(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);//实现模糊查询
        };
      },
      // 打印
      // handleSelect(item) {
      //   console.log(item, "展区");
      // },
      // 展区可选建议搜索
      querySearch2(queryString, cb) {
        let restaurants = this.restaurants;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      // 展区调用的方法
      createFilter(queryString) {
        return (restaurants) => {
          return (restaurants.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      // 打印
      // handleSelect2(item) {
      //   console.log(this.formData.exhibitionAreaName, "展区name");
      //   console.log(item, "展区");
      // },
      // 根据企业、展区获取品牌确认信息
      handleCompanyChange(val) {
        //获取页面信息
       // console.log(val);
        this.$http.get(`${process.env.API_NA_URL}/api/numberAffirm/exhibitionAreaByCompanyId/get?companyId=${val.address}`).then((res) => {
          // console.log(res);
          this.companyData = res;
          this.formData.companyId = res[0].companyId;
          this.formData.companyName = res[0].companyName;
          this.formData.companyCode = res[0].companyCode;
          if (res[0].cantonFairCode == null || res[0].cantonFairCode === 'null') {
            this.formData.cantonFairCode = '';
          } else {
            this.formData.cantonFairCode = res[0].cantonFairCode;
          }
          this.formData.dealClusterName = res[0].dealClusterName;
          this.formData.dealClusterId = res[0].dealClusterId;
          let exhibitionAreaList = [];
          for (let i = 0; i < res.length; i++) {
            exhibitionAreaList.push({ 'exhibitionArea': res[i].exhibitionArea, 'exhibitionAreaName': res[i].exhibitionAreaName });
          }
          this.exhibitionAreaOpts = exhibitionAreaList;
        }).catch(e => {});
        // if (val) {
        /*
        if (this.formData.companyName && this.formData.exhibitionAreaName) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.getAffirmCompanyInfo({ companyName: this.formData.companyName, exhibitionAreaName: this.formData.exhibitionAreaName }).then(res => {
            let resData = JSON.parse(JSON.stringify(res));
            this.formData.cantonFairCode = resData.cantonFairCode;
            this.formData.dealClusterName = resData.dealClusterName;
            this.formData.companyId = resData.companyId;
            this.formData.companyCode = resData.companyCode;
            this.formData.exhibitionArea = resData.exhibitionArea;
            this.formData.exhibitionPeriod = resData.exhibitionPeriod;
            this.formData.lastBoothNumber = resData.lastBoothNumber;
            this.formData.dealClusterId = resData.dealClusterId;
            this.formData.boothAffirmId = resData.boothAffirmId;
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
        }
        */
        // }
      },
      handleCompanyChangea(item) {
        /*
        if (this.formData.companyName && this.formData.exhibitionAreaName) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.getAffirmCompanyInfo({ companyName: this.formData.companyName, exhibitionAreaName: this.formData.exhibitionAreaName }).then(res => {
            let resData = JSON.parse(JSON.stringify(res));
            this.formData.cantonFairCode = resData.cantonFairCode;
            this.formData.dealClusterName = resData.dealClusterName;
            this.formData.companyId = resData.companyId;
            this.formData.companyCode = resData.companyCode;
            this.formData.exhibitionArea = resData.exhibitionArea;
            this.formData.exhibitionPeriod = resData.exhibitionPeriod;
            this.formData.lastBoothNumber = resData.lastBoothNumber;
            this.formData.dealClusterId = resData.dealClusterId;
            this.formData.boothAffirmId = resData.boothAffirmId;
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
        }
        */
        if (this.formData.companyName && this.formData.exhibitionAreaName) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          for (let i = 0; i < this.companyData.length; i++) {
            if (item === this.companyData[i].exhibitionArea) {
              this.formData.lastBoothNumber = this.companyData[i].affirmBoothNumber;
              this.formData.currentChangeNumber = this.companyData[i].affirmBoothNumber;
              this.formData.exhibitionArea = this.companyData[i].exhibitionArea;
              this.formData.boothAffirmId = this.companyData[i].boothAffirmId;
              this.formData.exhibitionAreaName = this.companyData[i].exhibitionAreaName;
            }
          }
          this.$http.get(`${process.env.API_NA_URL}/api/common/currentExhibitionPeriod/get?exhibitionAreaCode=${item}`).then((res) => {
            this.formData.exhibitionPeriod = res;
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });

        }
      },
      // 情况分类
      handleInputChange(val) {
        if (this.formData.currentReserveNumber === 0) {
          this.formData.backType = '1';
        } else if (this.formData.currentReserveNumber > 0) {
          this.formData.backType = '2';
        } else {
          this.formData.backType = '';
        }
      },
      // 上传文件改变
      handleFileChange(file, fileList) {
        const isLt2M = file.size / 1024 / 1024 < 10;    //这里做文件大小限制
        if (!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 10MB!',
            type: 'warning'
          });
          fileList.splice(0, fileList.length);
          this.fileForm.chooseFileName = '';
        }
      },
      // 上传确认书
      uploadFileMethod(param) {
        let fileObject = param.file;
        let formData = new FormData();
        formData.append("file", fileObject);
        formData.append('boothAffirmId', '');
        formData.append('attachmentType', 1); // 上传附件类型，1-企业退回附件确认书，2-交易团确认书附件
        let fullScreenloading = this.$loading({ fullscreen: true });
        this.postConfirmDetailUpload(formData).then(res => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          this.formData.fileId = res.fileId;
          this.$message.success('上传成功');
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      },
      // 复选改变值
      handleCheckedCitiesChange(value) {
        if (this.formData.lastBoothNumber && this.formData.backBoothNumber && (this.formData.lastBoothNumber > this.formData.backBoothNumber || this.formData.lastBoothNumber === this.formData.backBoothNumber)) {
          this.formData.currentReserveNumber = this.formData.lastBoothNumber - this.formData.backBoothNumber;
        } else {
          this.formData.currentReserveNumber = 0;
        }
        if (this.formData.currentReserveNumber === 0) {
          this.formData.backType = '1';
        } else if (this.formData.currentReserveNumber > 0) {
          this.formData.backType = '2';
        } else {
          this.formData.backType = '';
        }
      },
      // 提交
      onSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let submitObj = {
              boothAffirmId: this.formData.boothAffirmId,
              companyId: this.formData.companyId,
              companyCode: this.formData.companyCode,
              companyName: this.formData.companyName,
              exhibitionArea: this.formData.exhibitionArea,
              exhibitionAreaName: this.formData.exhibitionAreaName,
              cantonFairCode: this.formData.cantonFairCode,
              dealClusterId: this.formData.dealClusterId,
              dealClusterName: this.formData.dealClusterName,
              exhibitionPeriod: this.formData.exhibitionPeriod,
              lastBoothNumber: this.formData.lastBoothNumber,
              backBoothNumber: this.formData.backBoothNumber,
              currentReserveNumber: this.formData.currentReserveNumber,
              backType: this.formData.backType,
              backReason: this.formData.backReason,
              //dealAffirmAttachment: this.formData.fileId,
              attachment: this.formData.fileId
            };
            let fullScreenloading = this.$loading({ fullscreen: true });
            this.postAddApplySubmit(submitObj).then(() => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
              this.$message.success('操作成功');
              this.$router.push({ path: '/enterpriseReturnApply' });
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
          }
        });
      },
      // 打印
      toDemplate() {
        let printObj = {
          options: this.options,
          exhibitionAreaOpts: this.exhibitionAreaOpts,
          boothAffirmId: this.formData.boothAffirmId,
          companyName: this.formData.companyName,
          exhibitionAreaName: this.formData.exhibitionAreaName,
          cantonFairCode: this.formData.cantonFairCode,
          dealClusterName: this.formData.dealClusterName,
          exhibitionPeriod: this.formData.exhibitionPeriod,
          lastBoothNumber: this.formData.lastBoothNumber,
          aboutDetails: this.aboutDetails,
          currentChangeNumber: this.formData.currentChangeNumber,
          currentReserveNumber: this.formData.currentReserveNumber,
          backType: this.formData.backType,
          backReason: this.formData.backReason
        };
        let paramData = JSON.parse(JSON.stringify(printObj));
        window.open(window.location.origin + '/#/returnApplyPagePrint?data=' + encodeURI(JSON.stringify(paramData)));
      },
      // 取消
      handSuer() {
        this.$router.go(-1);
      }
    }
  };
</script>
<style scoped>
.floatLeft {
  margin-left: 10px;
  float: left;
}
</style>
