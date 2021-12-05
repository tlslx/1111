/**
* @file  品牌展位确认
* @author:zhangwenjian
* @date:2019/4/14
*/
<template>
  <el-tabs v-model="activeName" v-loading="loading">
    <el-tab-pane label="品牌展位确认申请" name="first">
        <el-form class="write-form" :model="writeForm" ref="writeForm" :rules="rules"  label-width="190px">
          <el-form-item label="展区：">
            <el-select
              :disabled="true"
              v-model="writeForm.exhibitionArea"
              class="select-width"
            >
              <el-option
                v-for="(item, key) in exhibitionAreaOpts"
                :key="key"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展品分类：" v-if="showProductType" prop="productType">
            <el-radio-group v-model="writeForm.productType">
              <el-radio
                class="zhanpin"
                :disabled="isView"
                v-for="(item, key) in productTypeOpts"
                :key="key"
                :label="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="主要展示产品：" prop="domains" >
          <div
            style="float: left;width:100%;"
            v-for="(domain, index) in writeForm.domains"
            :key="domain.key"
            :prop="'domain.' + index + '.value'"
          >
            <el-select
              :disabled="isView"
              class="small-select-width"
              v-model="writeForm.domains[index].products"
              @change="handleChangeOne"
            >
              <el-option
                v-for="(item, key) in getExhibit"
                :key="key"
                :value="item.exhibitId"
                :label="item.exhibitNameCh"
              ></el-option>
            </el-select>
              <span  class="addProduct" v-if="writeForm.domains[0].products != '' && isToAddition && writeForm.domains.length < 2" @click="addDomain">添加</span>
              <span  class="addProduct" v-if="writeForm.domains.length > 1" @click.prevent="removeDomain(domain)">删除</span>
          </div>
             <span  class="addProduct"  @click="submitApplyConfirm('writeForm', 'toAddition')">(点此添加新的展品)</span>

        </el-form-item>
          <el-form-item class="item-Num" label="产品HS编码：" prop="hscode">
            <el-input
              placeholder="请填写8位产品hs编码"
              type="text"
              maxlength="8"
              :disabled="isView"
              v-model="writeForm.hscode"
              class="input-width"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="上届品牌展位数：">
            <el-input :disabled="isEdit" style="" v-model="writeForm.brandBoothNumber"></el-input>
          </el-form-item>
          <el-form-item label="上届大会收回品牌展位数：" >
            <el-input :disabled="isEdit" style="" v-model="writeForm.violationBoothNum"></el-input>
          </el-form-item>
          <el-form-item label="本届可确认品牌展位数：">
            <el-input :disabled="isEdit" v-model="writeForm.initialBoothNum"></el-input>
          </el-form-item>
          <el-form-item label="本届展区品牌展位数：" prop="currentReserveNumber">
            <el-input :disabled="isAll" v-model="writeForm.currentReserveNumber" @change="handleBoothNumBlur"></el-input>
          </el-form-item>
          <el-form-item label="折合面积：">
            <el-input :disabled="isEdit" style="" v-model="writeForm.boothAcreage" @change="handleAcreageBlur"></el-input>
          </el-form-item>
          <el-form-item label="是否愿意接洽国内采购商：" prop="isContacted">
            <el-radio-group v-model="writeForm.isContacted" @change="handleIsContracted">
              <el-radio
                :disabled="isView"
                v-for="(item, key) in isContactedOpts"
                :key="key"
                :label="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="展会期间开展的内贸业务：" v-if="isContractFlag" prop="isCarryOut">
            <el-radio-group v-model="writeForm.isCarryOut">
              <el-radio
                v-for="(item, key) in isCarryOutOpts"
                :key="key"
                :label="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="我司参展商品为：" v-if="isContractFlag" prop="joinProductType">
            <el-radio-group v-model="writeForm.joinProductType">
              <el-radio
                v-for="(item, key) in joinProductTypeOpts"
                :key="key"
                :label="item.value"
                name="joinProductType"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <!--<p class="red-font">本届展区品牌展位数少于上届展区品牌展位数！</p>-->
        <p class="red-font" v-if="isShowTip">未足额确认品牌展位，提交后将转入未确认展位的退回流程，提交退回确认后方可生效！</p>
        <div class="brand-footer">
          <el-button v-if="!isView" type="primary" v-loading.fullscreen.lock="fullscreenLoading" @click="handleSubmit">提交</el-button>
          <el-button v-if="!isView" type="info" @click="handleCancel">取消</el-button>
          <el-button v-if="isView" type="info" @click="handleCancel">返回</el-button>
        </div>
    </el-tab-pane>
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close='showClose'
      width="60%"
      >
      <p>提交成功！请点击“打印”，打印相关申请材料并盖章后，提交给所属交易团，确认申请方正式生效！</p>
      <span slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="onprint">打印</el-button>
      </span>
    </el-dialog>
  </el-tabs>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    export default {
      name: "brandBoothConfirm",
      data() {
        // 产品HS编码
        let productesd = (rule, value, callback) => {
          if (value.length !== 8) {
            return callback(new Error("请填写8位产品hs编码!"));
          } else {
            return callback();
          }
        };
        // 主要展示产品校验
        let checkProduct = (rule, value, callback) => {
          if (value.length > 1) {
            for (let i = 0; i < value.length - 1; i++) {
              if (value[i].products === value[value.length - 1].products) {
                return callback(new Error("主要展示产品不能重复"));
              }
            }
          }
          if (value[value.length - 1].products === "") {
            return callback(new Error("主要展示产品不能为空"));
          } else {
            return callback();
          }
        };
        const validateNumber = (rule, value, callback) => {
          let MOBILE = /^[0-9]\d*$/;
          if (!MOBILE.test(value)) {
            return callback(new Error("请输入0或正整数"));
          } else if (this.$route.query.maxNum) {
            let maxCurrentReserveNum = this.$route.query.maxNum;
            if (value > maxCurrentReserveNum) {
              return callback(new Error("您当前为黑名单用户，最大可申请展位数位为" + maxCurrentReserveNum));
            } else {
              return callback();
            }
          } else {
            return callback();
          }
        };
        return {
          activeName: 'first',
          isView: false,
          isEdit: true,
          isAll: false,
          isShowTip: false,
          loading: false,
          dialogVisible: false,
          fullscreenLoading: false,
          showClose: false,
          dataList: [],
          domains: [
            // 主要展示产品
            {
              products: ""
            }
          ],
          isContactedOpts: [
            { label: "是", value: "1" },
            { label: "否", value: "0" }
          ],
          isShow: false,
          isMechanical: false, // 是否为大型机械等
          isContractFlag: false, // 是否愿意接洽国内采购商
          isMechan: false, // 宠物是否显影
          isToAddition: true,
          isSameProduct: false,
          isShowComInfo: false,
          isnew: false,
          appData: "",
          resData: {},
          id: "",
          exhibitionAreaOpts: [],
          isCarryOutOpts: [
            { label: "由内贸人员专项负责", value: "1" },
            { label: "由外贸人员兼顾", value: "0" }
          ],
          joinProductTypeOpts: [
            { label: "外销设计，但也可兼顾境内销售", value: "1" },
            { label: "全面面向境外市场", value: "0" },
            { label: "有部分主要针对境内市场", value: "2" }
          ],
          schemePublishList: [],
          demandRecordId: '',
          showProductType: true,
          writeForm: {
            domains: [
              // 主要展示产品
              {
                products: ""
              }
            ],
            companyProductList: [],
            listChang: "", // 展示产品(增加)
            exhibitionArea: "", // 展区id
            exhibitionSession: '',
            exhibitionAreaName: '',
            dealClusterName: '',
            productType: "", // 展品分类
            productTypeName: '',
            hscode: "", // 主要海关编码
            productList: [], // 产品暂存
            brandBoothNumber: '',
            companyId: '',
            companyName: '',
            companyCode: '',
            boothType: '02',
            initialBoothNum: '',
            canEdit: false,
            boothAffirmId: '',
            demandRecordId: '',
            currentReserveNumber: '', // 本届品牌展位数
            lastBoothNum: '',
            boothNumber: "", // 申请数量
            boothNumberLast: '', // 上届申请数量
            boothAcreage: "", // 申请折合面积
            isContacted: "0", // 是否愿意接洽国内采购商
            isCarryOut: '',  // 展位期间开展的内贸业务
            joinProductType: '' // 我司参展展品为
          },
          newDate: {},
          canEdit: '',
          productTypeOpts: [],
          baseApi: process.env.API_OS_URL,
          rules: {
            exhibitionArea: [
              { required: true, message: "展区不能为空", trigger: "change" }
            ],
            productType: [],
            hscode: [
              { required: true, message: 'hs编码不能为空', trigger: "blur" },
              { validator: productesd, trigger: "blur" }
            ],
            domains: [
              { required: true, message: "主要展示产品不能为空", trigger: "change" },
              { validator: checkProduct, trigger: "change" }
            ],
            isContacted: [
              { required: true, message: "是否愿意接洽国内采购商不能为空", trigger: "blur" }
            ],
            brandBoothNumber: [
              { required: true, message: "上届品牌展位数不能为空", trigger: "blur" }
            ],
            initialBoothNum: [
              { required: true, message: "本届可确认品牌展位数不能为空", trigger: "blur" }
            ],
            violationBoothNum: [
              { required: true, message: "上届大会收回品牌展位数不能为空", trigger: "blur" }
            ],
            currentReserveNumber: [
              { required: true, message: "本届展区品牌展位数不能为空", trigger: "blur" },
              { validator: validateNumber, trigger: "blur" }
            ],
            isCarryOut: [
            ],
            dataPas: "", // 打印的id
            joinProductType: [
            ]
          }
        };
      },
      async created () {
        this.exhibitionAreaOpts = await kindo.dictionary.get('exhibitionArea'); // 展区
        // 前端将贫困展区删除
        let deleteIndex = 0;
        this.exhibitionAreaOpts.forEach((val, index) => {
          if (val.value === 'LD01') {
            deleteIndex = index;
            this.exhibitionAreaOpts.splice(deleteIndex, 1);
          }
        });
      },
      computed: {
        ...mapGetters("companyInfomation", [
          "getBrandFlag",
          "getAddit",
          "getExhibit",
          "postRemove",
          "fileSelect"
        ]),
        ...mapGetters('common', ['session']) // 获取届数
      },
      mounted() {
        this.getSessionInfo(); // 获取届数
        let _this = this;
        if (_this.$route.query.schemeDetail) {
          let arr = JSON.parse(_this.$route.query.schemeDetail);
          for (let i in _this.writeForm) {
            for (let j in arr) {
              if (i === j) {
                _this.$set(_this.writeForm, [i], arr[j]);
              }
            }
            if (arr.schemePublish) {
              _this.writeForm.initialBoothNum = arr.schemePublish.initialBoothNum;
              _this.writeForm.violationBoothNum = arr.schemePublish.violationBoothNum;
              this.writeForm.exhibitionSession = arr.schemePublish.exhibitionSession;
            } else {
              _this.writeForm.initialBoothNum = arr.initialBoothNum;
              this.writeForm.exhibitionSession = arr.exhibitionSession;
            }
          }
          if (arr.isContacted) {
            this.writeForm.isContacted = arr.isContacted + '';
            this.writeForm.isCarryOut = arr.isCarryOut + '';
            this.writeForm.joinProductType = arr.joinProductType ? (arr.joinProductType + '') : '';
            this.handleIsContracted(this.writeForm.isContacted);
          }
        }
        this.getSessionInfo().then(response => {
          // 获取展品大类
          let parms = {
            "areaCode": "",
            "session": response.session
          };
          if (_this.$route.query.schemeDetail) {
            parms.areaCode = JSON.parse(_this.$route.query.schemeDetail).exhibitionArea;
          }
          _this.getAreaCodeInfo(parms).then(res => {
            for (let m = 0; m < res.length; m++) {
              if (res[m].specialAreas) {
                for (let i = 0; i < res[m].specialAreas.length; i++) {
                  for (let j = 0; j < res[m].specialAreas.length; j++) {
                    if (res[m].specialAreas[i] && res[m].specialAreas[i].languages[j] && res[m].specialAreas[i].languages[j].language === 'zh') {
                      _this.productTypeOpts.push({
                        value: res[m].specialAreas[i].specialAreaCode,
                        label: res[m].specialAreas[i].languages[j].name
                      });
                    }
                  }
                }
              }
            }
            // 如果大类为空，则隐藏大类选项并清除必填验证
            if (_this.productTypeOpts.length < 1) {
              this.rules.productType = [];
              this.showProductType = false;
            } else {
              this.showProductType = true;
              this.rules.productType = [
                { required: true, message: "展品分类不能为空", trigger: "change" }
              ];
            }
            if (_this.$route.query.schemeDetail.companyDemandRecord) {
              _this.writeForm.productType = _this.$route.query.schemeDetail.companyDemandRecord.productType;
            }
          });
        });
        let detailData = {};
        if (_this.$route.query.schemeDetail) {
          let ExhibitJson = {
            companyId: _this.$store.state.userInfo.companyId,
            exhibitTypeOne: JSON.parse(_this.$route.query.schemeDetail).exhibitionArea
          };
          _this.getGeneralVenture(ExhibitJson).then(res => {
          }).catch(e => { });
          detailData = JSON.parse(_this.$route.query.schemeDetail);
        }
        // this.getProductDomains();
        let isAll = this.$route.query.isAll;
        let isView = this.$route.query.isView;
        this.writeForm.canEdit = this.$route.query.isEdit;
        let isConfirm = this.$route.query.isConfirm;
        if (this.writeForm.canEdit) {
          this.writeForm.boothAffirmId = this.$route.query.boothAffirmId;
        }
        if (isView) {
          this.isView = true;
          this.isAll = true;
        } else {
          this.isView = false;
          this.isAll = false;
        }
        if (isConfirm) {
          this.isView = false;
          this.isAll = false;
        }

        // 退回参展
        if (isAll) {
          this.isView = false;
          this.isAll = true;
          this.writeForm.currentReserveNumber = 0;
          this.writeForm.boothAcreage = 0;
          this.writeForm.backBoothNumber = this.writeForm.initialBoothNum;
        }

        if (detailData.companyDemandRecord) {
          this.writeForm.hscode = detailData.companyDemandRecord.hscode;
          this.writeForm.demandRecordId = detailData.companyDemandRecord.demandRecordId;
          this.writeForm.productType = detailData.companyDemandRecord.productType;
          let val = { demandRecordId: this.writeForm.demandRecordId };
          let appoped = encodeURI(JSON.stringify(val));
          this.getHandRemove(appoped).then(res => {
            // 主要展示产品
            for (let key in res.companyProductList) {
              if (key < 1) {
                this.writeForm.domains[key].products = res.companyProductList[key].productId;
              } else {
                this.writeForm.domains.push({
                  products: res.companyProductList[key].productId
                });
              }
            }
            this.writeForm.isContacted = res.isContacted + '';
            this.writeForm.isCarryOut = res.isCarryOut + '';
            this.writeForm.joinProductType = res.joinProductType ? (res.joinProductType + '') : '';
            this.handleIsContracted(this.writeForm.isContacted);
          }).catch(() => {
            // this.writeForm.domains[0].products = res.companyProductList[0].productId;
          });
        }
        if (!isAll && detailData.backConfirmation) {
          this.writeForm.currentReserveNumber = detailData.backConfirmation.currentReserveNumber;
        }
        if (detailData.affirm) {
          this.writeForm.currentReserveNumber = detailData.affirm.affirmBoothNumber;
        }
        if (this.writeForm.brandBoothNumber > this.writeForm.initialBoothNum) {
          this.writeForm.violationBoothNum = this.writeForm.brandBoothNumber - this.writeForm.initialBoothNum;
        }
        this.handleBoothNumBlur();
        this.getProductDomains(this.writeForm.exhibitionArea);
      },
      methods: {
        ...mapActions("file", ["delFileInfo", "addFile", "selectFileInfo"]),
        ...mapActions('common', ['getSessionInfo']),
        ...mapActions("companyInfomation", [
          "getGeneralAddi", //  一般性新增联营
          "getGeneralVenture", //  一般性新增展品
          "getSchemePublishBrandFlag", // 展位性质判断
          "postSchemePublishSubmit",
          "getGeneralExhibit", // 面积
          "enterConfirmAddAffirm", // 面积
          "getHandRemove",
          "postGetSubmission",
          'getCountByCompanyIdInfo', // 获取企业资质信息参与次数
          'getAreaCodeInfo'
        ]),
        // 打印跳转
        onprint() {
          // 全部确认 跳转到 打印页面
          this.$router.push({
            path: '/printApplicationForm',
            query: {
              writeForm: JSON.stringify(this.newDate),
              demandRecordId: this.demandRecordId,
              isFirm: true
            }
          });
        },
        // 提交
        handleSubmit() {
          let _this = this;
          this.fullscreenLoading = false;
          // 处理布展类型的判断
          if (this.writeForm.exhibitionArea === 'MA02') {
            this.writeForm.exhibitionType = 'UNIFICATION_BOOTH';
          } else {
            this.writeForm.exhibitionType = 'SPECIAL_BOOTH';
          }
          // 展品分类 - 通过展品分类code转换为分类名称
          for (let exhibit in this.productTypeOpts) {
            if (this.productTypeOpts[exhibit].value === this.writeForm.productType) {
              this.writeForm.productName = this.productTypeOpts[exhibit].label;
              this.writeForm.productTypeName = this.productTypeOpts[exhibit].label;
            }
          }
          this.$refs['writeForm'].validate((valid) => {
            if (valid) {
              this.fullscreenLoading = true;
              // 主要展示产品，需要在一开始清空，不然会存在重复数据保存
              this.writeForm.companyProductList = [];
              for (let key in this.writeForm.domains) {
                this.writeForm.companyProductList.push({ productId: this.writeForm.domains[key].products });
              }
              // 数据提交(部分退回) 可以确认初始大于当届的数量 initialBoothNum 可确认数量  currentReserveNumber 当届已确认数量
              if (_this.writeForm.initialBoothNum > _this.writeForm.currentReserveNumber) {
                // 部分退回,跳转到提交退回申请页面
                this.writeForm.selfBackNumber = this.writeForm.initialBoothNum - this.writeForm.currentReserveNumber;
                this.writeForm.backBoothNum = this.writeForm.initialBoothNum - this.writeForm.currentReserveNumber;
                this.writeForm.affirmBoothNumber = this.writeForm.currentReserveNumber;
                this.writeForm.lastBoothNum = this.writeForm.brandBoothNumber;
                this.writeForm.cantonFairCode = this.writeForm.companyCode;
                this.writeForm.boothNumber = this.writeForm.currentReserveNumber;
                this.writeForm.boothNumberLast = this.writeForm.brandBoothNumber;
                this.newDate = this.writeForm;
                // 部分退回或者全部退回也存在，编辑和新增状态，canEdit是是否编辑状态标识符true为编辑状态，false为新增状态
                if (parseInt(this.writeForm.selfBackNumber) === parseInt(this.writeForm.initialBoothNum)) {
                  // 全部退回
                  this.$router.push({
                    path: '/submitConfirmLetter',
                    query: {
                      writeForm: JSON.stringify(this.newDate),
                      isAll: true,
                      canEdit: this.writeForm.canEdit
                    }
                  });
                } else {
                  // 部分退回
                  this.$router.push({
                    path: '/submitConfirmLetter',
                    query: {
                      writeForm: JSON.stringify(this.newDate),
                      isAll: false,
                      canEdit: this.writeForm.canEdit
                    }
                  });
                }
              } else {
                this.writeForm.affirmBoothNumber = this.writeForm.currentReserveNumber;
                this.writeForm.lastBoothNum = this.writeForm.brandBoothNumber;
                this.writeForm.cantonFairCode = this.writeForm.companyCode;
                this.writeForm.boothNumber = this.writeForm.currentReserveNumber;
                this.writeForm.boothNumberLast = this.writeForm.brandBoothNumber;
                this.writeForm.demandRecordId = this.writeForm.demandRecordId;

                // 全部确认分两种，新增和编辑，canEdit是是否编辑状态标识符true为编辑状态，false为新增状态
                if (this.writeForm.canEdit) {

                  // 这里是编辑状态下的全部确认，所以需要先删除再新增，调用完毕需要直接跳转到打印申请表界面，此时申请表界面只显示确认表部分内容
                  //（/api/ordinaryCompanyDemandRecord/numberAffirmDelete,
                  // /api/SchemePublish/numberAffirm/addAffirm，/api/ordinaryCompanyDemandRecord/add）
                  this.loading = true;
                  this.$http.postJson(this.baseApi + '/api/ordinaryCompanyDemandRecord/numberAffirmDelete',
                    {
                      boothAffirmId: this.writeForm.boothAffirmId,
                      demandRecordId: this.writeForm.demandRecordId
                    })
                    .then((resp) => {
                      this.enterConfirmAddAffirm(this.writeForm).then((res) => {
                        //全部确认情况下跳转展位确认申请表打印界面 brandConfirmNum
                        this.loading = false;
                        this.$message.success('展位数量确认成功!');
                      }).catch(e => {
                        this.loading = false;
                      });
                      this.postSchemePublishSubmit(this.writeForm).then((res) => {
                        this.loading = false;
                        this.dialogVisible = true;
                        this.demandRecordId = res.demandRecordId;
                      }).catch(e => {
                        this.loading = false;
                      });
                    })
                    .catch((error) => {

                    });
                } else {
                  // 这里是新增状态下的全部确认，所以直接调用两个新增接口,调用完毕需要直接跳转到打印申请表界面，此时申请表界面只显示确认表部分内容
                  // （/api/SchemePublish/numberAffirm/addAffirm，/api/ordinaryCompanyDemandRecord/add）
                  this.loading = true;
                  this.enterConfirmAddAffirm(this.writeForm).then((res) => {
                    //全部确认情况下跳转展位确认申请表打印界面
                    this.loading = false;
                    this.$message.success('展位数量确认成功!');
                  }).catch(e => {
                    this.loading = false;
                  });
                  this.postSchemePublishSubmit(this.writeForm).then((res) => {
                    this.loading = false;
                    this.dialogVisible = true;
                    this.demandRecordId = res.demandRecordId;
                  }).catch(e => {
                    this.loading = false;
                  });
                }
              }
            }
          });
        },
        getProductDomains(id) {
          let ExhibitJson = {
            companyId: this.$store.state.userInfo.companyId,
            exhibitTypeOne: id
          };
          this.getGeneralVenture(ExhibitJson).then(res => {
            if (res.length > 0) {
              this.domains = res;
            }
          }).catch(e => { });
        },
        // 申请数量鼠标离开事件
        handleBoothNumBlur() {
          if (this.writeForm.currentReserveNumber > this.writeForm.initialBoothNum) {
            this.writeForm.currentReserveNumber = this.writeForm.initialBoothNum;
          }
          if (this.writeForm.initialBoothNum > this.writeForm.currentReserveNumber) {
            this.isShowTip = true;
          } else {
            this.isShowTip = false;
          }
          let parms = {
            "areaCode": this.writeForm.exhibitionArea,
            "session": this.session
          };
          this.getAreaCodeInfo(parms).then(res => {
            this.writeForm.boothAcreage = this.writeForm.currentReserveNumber * res[0].seatArea;
          });
        },
        // 折合面积鼠标离开事件
        handleAcreageBlur() {
          if (this.writeForm.exhibitionArea === "MA02") {
            this.writeForm.currentReserveNumber = Math.floor(
              this.writeForm.boothAcreage / 9
            );
          } else {
            this.writeForm.currentReserveNumber = Math.floor(
              this.writeForm.boothAcreage / 8
            );
          }
        },
        // 返回
        handleCancel() {
          this.$router.push({ path: '/brandConfirmNum' });
        },
        // 是否愿意接洽国内采购商
        handleIsContracted(val) {
          if (val === "1") {
            this.isContractFlag = true;
            this.rules.isCarryOut = [
              { required: true, message: "展会期间开展的内贸业务不能为空", trigger: "blur" }
            ];
            this.rules.joinProductType = [
              { required: true, message: "我司参展商品为不能为空", trigger: "blur" }
            ];
          } else {
            this.isContractFlag = false;
            this.rules.isCarryOut = [];
            this.rules.joinProductType = [];
          }
        },
        // 主要出口展品选择事件
        handleChangeOne(val) {
          this.productList = [];
          let kk = "";
          if (this.writeForm.domains.length > 0) {
            for (let i = 0; i < this.writeForm.domains.length; i++) {
              this.productList.push(this.writeForm.domains[i].products);
            }
            this.productList.splice(this.productList.indexOf(val), 1);
            for (let i = 0; i < this.productList.length; i++) {
              if (this.productList[i] === val) {
                kk = '1';
              } else {
                kk = '2';
              }
            }
            this.productList.push(val);
          }
          if (kk === '1') {
            this.isToAddition = false;
          } else {
            this.isToAddition = true;
          }
        },
        addDomain() {
          this.indexes = this.indexes + 1;
          this.writeForm.domains.push({
            products: "",
            key: Date.now(),
            newVal: ""
          });
        },
        removeDomain(item) {
          this.indexes = this.indexes - 1;
          let index = this.writeForm.domains.indexOf(item);
          if (index !== -1) {
            this.writeForm.domains.splice(index, 1);
          }
          this.$refs['writeForm'].validateField('domains', (valid) => {
            if (!valid) {
              this.isToAddition = true;
            }
          }
      );
        },
        submitApplyConfirm(formName, val) {
          // 主要展示产品
          let companyProductList = [];
          for (let key in this.writeForm.domains) {
            companyProductList.push({ productId: this.writeForm.domains[key].products });
          }
          let newName = "";
          for (let key in this.exhibitionAreaOpts) {
            if (
          this.exhibitionAreaOpts[key].value === this.writeForm.exhibitionArea
        ) {
              newName = this.exhibitionAreaOpts[key].label;
            }
          }
          // 展品分类
          for (let exhibit in this.productTypeOpts) {
            if (this.productTypeOpts[exhibit].value === this.writeForm.productType) {
              this.writeForm.productName = this.productTypeOpts[exhibit].label;
              this.writeForm.productTypeName = this.productTypeOpts[exhibit].label;
            }
          }

          let handeDate = {
            companyId: this.$store.state.userInfo.companyId,
            exhibitionArea: this.writeForm.exhibitionArea, // 展区cord
            productType: this.writeForm.productType, // 展品分类
            productTypeName: this.writeForm.productTypeName, // 展品分类
            hscode: this.writeForm.hscode, // 产品SH编码
            initialBoothNum: this.writeForm.initialBoothNum, // 本届可确认品牌展位数
            currentReserveNumber: this.writeForm.currentReserveNumber, // 申请数量
            boothAcreage: this.writeForm.boothAcreage, // 申请折合面积
            brandBoothNumber: this.writeForm.brandBoothNumber, // 上届申请数量
            isContacted: this.writeForm.isContacted, // 是否愿意接洽国内采购商
            isCarryOut: this.writeForm.isCarryOut, // 展位期间开展的内贸业务
            companyProductList: companyProductList, // 主要展示产品
            confirmFlag: "89898", // 选择标记（0否1是）
            exhibitionAreaName: newName //展区名称
          };

          if (this.dataList.id === 1) {
            handeDate.demandRecordId = this.appData;
            // 主要展示产品
            for (let key in this.writeForm.domains) {
              handeDate.companyProductList[key]["demandRecordId"] = this.appData;
            }
            this.$refs.writeForm.validate(valid => {
              if (handeDate.companyProductList) {
                if (valid) {
                  this.postGetSubmission(handeDate).then(res => {
                    this.$router.push({
                      path: "/brand_applicat_list",
                      query: {
                        id: this.id
                      }
                    });
                  }).catch();
                }
              } else {
                this.isToAddition = false;
              }
            });
          } else if (val === "toAddition") {
            this.$confirm('前往新增产品？').then(_ => {
              this.$router.push({
                path: '/addProduction',
                query: {
                  returnName: "brandBoothConfirm",
                  data: handeDate
                }
              });
            }).catch(_ => {});
          } else {
            this.$refs.writeForm.validate(valid => {
              if (handeDate.companyProductList[0].productId !== "") {
                if (valid) {
                  this.postSchemePublishSubmit(handeDate)
              .then(res => {
                this.$router.push({
                  path: "/brand_applicat_list",
                  query: {
                    id: this.id
                  }
                });
              })
              .catch();
                }
              } else {
                this.isToAddition = false;
              }
            });
          }
        }
      }
    };
</script>

<style scoped>
  .write-form {
    width: 60%;
    margin: 0 auto;
  }
  .red-font {
    text-align: center;
    color: red;
  }
  .brand-footer{
    text-align: center;
    margin: 10px;
  }
  .addProduct {
    cursor: pointer;
    color: #d80c18;
    margin-right: 8px;
    margin-left: 5px;
  }
</style>
