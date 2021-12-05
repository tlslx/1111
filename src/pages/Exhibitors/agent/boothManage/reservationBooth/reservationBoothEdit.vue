<style lang="less">
  @import '../../../../../theme/project/css/flex.less';
  #reservationBooth-edit {
    width: 100%;
    margin: 0 auto;
    .submitBtn button{
      margin-left: 20px
    }
    .submit_back{
      margin: 0px 0 0px 220px;
    }
    .submit_div{
      margin: 0px 0 0px 260px;
    }
    p a{
      text-decoration: none
    }
    .el-form-item{
      margin-bottom: 30px;
    }
    .el-transfer__button {
      border-radius: 0% !important;
    }
    .hint {
      .title {
        font-size: 20px;
        font-weight: 700;
        color: #000;
      }
      .content {
        .indent {
          text-indent:2em;
        }
      }
    }
  }
</style>

<template>
    <div id="reservationBooth-edit">
      <el-tabs v-model="activeName">
        <el-tab-pane label="申请展位-编辑" name="first">
           <div class="bm bm-ver hint">
            <p class="title bm bm-pc">温馨提示</p>
            <div class="content">
              <p class="indent">参展企业在同意参展规定及条款后，选择届数、期数、申请展区、专区、主要展品，填写申请展位数、布展类型等信息，确认申请材料，提交申请后打印参展申请表和参展条款。也可由招展代理填写届数、展区、标摊个数、豪标个数、光地面积、主要展示产品等信息，并提交申请。</p>
              <p class="indent">1.企业可以同步申请两届多期的广交会进口展展位。</p>
              <p class="indent">2.展区下设专区，专区可有可无，非必填项。</p>
              <p class="indent">3.申请展位时，要保证同一个展区至少填报两个展品信息。</p>
              <p class="indent">4.主要展示产品从已填报企业资料的产品信息中选择。</p>
              <p class="indent">5.非首次参展企业在申请当届展位前，需登记上届达成订单情况。订单情况包括产品类别（展区）、成交金额（人民币或美元）、公司名称、公司性质（零售/批发/进口代理/餐饮/电商/百货/其他）、备注等。如无，则选无；但均是必填项。若企业选择“未有成交”，则不用填写订单情况。</p>
            </div>
          </div>
          <el-form ref="form" :model="form" label-width="350px">
            <el-row>
              <el-form-item label="企业中文名称:">
                <el-col :span="10">
                  <el-input :value="companyObj.companyNameCh" @focus="innerCompanyDialog = true" placeholder="请点击选择企业"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="企业英文名称:">
                <el-col :span="10">
                  <el-input v-model="companyObj.companyNameEn" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="企业简称:">
                <el-col :span="10">
                  <el-input v-model="companyObj.enterpriseAbbreviation" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="国别/地区:">
                <el-col :span="10">
                  <el-input v-model="companyObj.crChName" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="上届是否达成订单:">
                <el-col :span="10">
                  <el-input v-model="form.isFinishOrder" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="届数:" v-if="hasOrder">
                <el-col :span="10">
                  <el-input v-model="form.sessionNum" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="成交金额:" v-if="hasOrder">
                <el-col :span="10">
                  <el-input v-model="form.lastOrder.money" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <!-- <el-row>
              <el-form-item label="展区:" v-if="hasOrder">
                <el-col :span="10">
                  <el-select v-model="form.lastOrder.exhibitionAreaCode" placeholder="请选择" :disabled="true">
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="备注:" v-if="hasOrder" :disabled="true">
                <el-col :span="10">
                  <el-input type="textarea" v-model="form.lastOrder.note"></el-input>
                </el-col>
              </el-form-item>
            </el-row> -->

            <el-row>
              <el-form-item label="届数:">
                <el-col :span="10">
                  <el-select v-model="form.ifoBoothApply.exhibitionNum" :disabled="true" placeholder="请选择" @change="exhibitionNumChange">
                    <el-option v-for="(item, index) in exhibitionNum" :key="index"
                      :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="期数:">
                <el-col :span="10">
                  <el-select v-model="form.ifoBoothApply.exhibitionSession" :disabled="true" placeholder="请选择" @change="periodCodeChange">
                    <el-option label="1" :value="1"></el-option>
                    <el-option label="3" :value="3"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="申请展区:">
                <el-col :span="10">
                  <el-select v-model="form.ifoBoothApply.exhibitionAreaCode" :disabled="true" placeholder="请选择" @change="applyExhibitionRegion">
                    <el-option v-for="(item, index) in exhibitionPlaceArray" :key="index"
                      :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="专区:">
                <el-col :span="10">
                  <el-select v-model="form.ifoBoothApply.exhibitionRegionId" :disabled="true" placeholder="请选择">
                    <el-option v-for="(item, index) in arrSpecialAreas" :key="index"
                    :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="主要展品:">
                <el-col>
                 <el-transfer v-model="form.productIds" :data="productData" :titles="['待选', '已选']"></el-transfer>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="展位类型:">
                <el-col :span="10">
                  <el-select v-model="form.ifoBoothApply.layout" placeholder="请选择" :disabled="true">
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="申请展位数:">
                <el-col :span="10">
                  <el-input type="text" v-model="form.ifoBoothApply.boothNum" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="展位面积:">
                <el-col :span="10">
                  <el-input v-model="form.boothArea" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row :gutter="10">
              <el-form-item class="submitBtn" label="上传附件:">
                <el-col :span="6">
                  <el-button type="danger" size="small" class="submit_btn" @click="downLoadTemplate">下载模板</el-button>
                </el-col>
                <el-col :span="6">
                  <el-button type="danger" size="small" class="submit_btn" :disabled="isShow" @click="downLoadFile">下载文件</el-button>
                </el-col>
                <el-col :span="6">
                  <el-form-item class="block-item" size="small" prop="fileUrl">
                    <el-upload
                          v-model="form.fileUrl"
                          class="upload-demo"
                          ref="upload"
                          :action="url"
                          :limit="1"
                          :data="uploadParams"
                          :on-remove="handleRemove"
                          :on-exceed="onMaterialExceed"
                          :before-upload="beforeUpload"
                          :on-success="uploadSuccess"
                          :on-error="uploadError"
                          :file-list="fileList">
                          <el-button slot="trigger" size="small" type="primary">上传</el-button>
                        </el-upload>
                    </el-form-item>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>

          <!--表单返回按钮-->
          <div class="submit_back bm bm-pc">
            <el-button class="submit_btn" @click="clearForm">返回</el-button>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import utility from '@/scripts/framework/utility';
export default {
  name: "applicationBoothEdit",
  data() {
    return {
      url: process.env.API_POT_URL + "/api/standApplication/uploadApplySheetAndArticle",
      exhibitionPlaceArray: [],
      preArrSpecialAreas: [],
      //展示企业信息
      companyObj: {
        companyNameEn: "",
        companyNameCh: "",
        enterpriseAbbreviation: "",
        crChName: ""
      },
      form: {
        companyId: "",
        companyNameCh: "",
        companyNameEn: "",
        companyAbbreviation: "",
        crChName: "",
        fileUrl: '',
        // loginId: "aaa", // 登录ID
        // loginType: "0", // 0 参展企业
        boothApplyId: '',
        creatorId: "test", // 创建人
        creatorName: "test", // 创建人
        isFinishOrder: '', // 0没有，1有
        sessionNum: '', // 届数
        lastOrder: {
          note: '', // 备注
          money: '', // 成交金额
          exhibitionAreaCode: '' // 上届展区代码
        },
        ifoBoothApply: {
          companyId: "aaa",
          layout: '', // 展位类型
          boothNum: '', // 申请展位数
          exhibitionNum: '', // 届数
          exhibitionAreaCode: '', // 申请展区
          exhibitionRegionId: '', // 专区ID
          exhibitionSession: '' // 期数
        },
        boothArea: '',
        productIds: [], // 主要展品
        exhibitionArea: ''
      },
      enqueryParams: {
        'customQueryParams': [
          // {
          //   'findType': 'EQ',
          //   'joinType': 'And',
          //   'name': 'product_session',
          //   'values': []
          // },
          // {
          //   'findType': 'EQ',
          //   'joinType': 'And',
          //   'name': 're_approve',
          //   'values': [
          //     '2'
          //   ]
          // },
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "company_id",
            "values": []
          }
        ]
      },
      products: [],
      fileList: [],
      applyFileId: '',
      isShow: true,
      uploadParams: {},
      productData: [],
      hasOrder: false,
      dialogVisible: false,
      productsId: [],
      activeName: 'first',
      dialogImageUrl: '',
      arrSpecialAreas: []

    };
  },
  computed: {
    ...mapGetters('commonStore', ['exhibitionNum', "currentExhibition", 'layoutArray'])
  },
  async created() {
    if (!this.layoutArray) {
      this.getBoothApplyType().then(res => {
        if (res) {
          let array = [];
          console.log("leixing", res);
          for (let item of res.records) {
            array.push({
              label: item.itemText,
              value: item.itemCode
            });
          }
          this.$store.commit('commonStore/LAYOUT_TYPE', array);
        }
      });
    }

    if (!this.exhibitionNum) {
      await this.getExhibitionNum().then(res => {
        if (res) {
          let array = [];
          for (let item of res) {
            array.push({
              label: item.exhibitionNum,
              value: item.exhibitionNum,
              current: item.current
            });
          }
          this.$store.commit('commonStore/EXHIBITION_NUM', array);
          for (let item of this.exhibitionNum) {
            if (item.current) {
              this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
              this.form.ifoBoothApply.exhibitionNum = this.currentExhibition;
              this.form.sessionNum = this.currentExhibition - 1;
              break;
            }
          }
        }
      });
    } else if (!this.currentExhibition) {
      for (let item of this.exhibitionNum) {
        if (item.current) {
          this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
          this.form.ifoBoothApply.exhibitionNum = this.currentExhibition;
          this.form.sessionNum = this.currentExhibition - 1;
          break;
        }
      }
    } else {
      this.form.ifoBoothApply.exhibitionNum = this.currentExhibition;
      this.form.sessionNum = this.currentExhibition - 1;
    }
    
    if (this.$route.query.data) {
      this.getApplyInfo(this.$route.query.data).then(res => {
        
        if (res.lastFinishOrder == null) {
          this.form.isFinishOrder = "否";
        } else {
          this.form.isFinishOrder = "是";
          this.hasOrder = true;
        }
        // 判断下载文件按钮是否置灰
        if (res.applyFileId == null) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }

        res.applyProducts.forEach(item => {
          this.form.productIds.push(item.productId);
        });

        this.applyFileId = res.applyFileId;
        this.form.lastOrder.note = res.note;
        this.form.boothArea = res.boothNum * 9;
        this.form.boothApplyId = res.boothApplyId;
        this.form.lastOrder.exhibitionAreaCode = res.exhibitionAreaCode;
        this.form.ifoBoothApply.companyId = res.companyId;
        this.form.ifoBoothApply.layout = res.layout;
        this.form.ifoBoothApply.boothNum = res.boothNum;
        this.form.ifoBoothApply.exhibitionNum = res.exhibitionNum;
        this.form.ifoBoothApply.exhibitionSession = res.exhibitionSession;
        this.form.ifoBoothApply.exhibitionAreaCode = res.exhibitionAreaCode;
        this.form.ifoBoothApply.exhibitionRegionId = res.exhibitionRegionId;

        //企业的信息
        this.companyObj.companyNameCh = res.companyNameCh;
        this.companyObj.companyNameEn = res.companyNameEn;
        this.companyObj.enterpriseAbbreviation = res.enterpriseAbbreviation;
        this.companyObj.crChName = res.crChName;

        if (res.exhibitionNum) {
          if (res.exhibitionSession) {
            this.periodCodeChange(res.exhibitionSession);
            if (res.exhibitionAreaCode) {
              this.applyExhibitionRegion(res.exhibitionAreaCode);
            }
          }
        }

        // this.enqueryParams.customQueryParams[0].values[0] = res.exhibitionNum;
        // this.enqueryParams.customQueryParams[2].values[0] = res.companyId;
        this.enqueryParams.customQueryParams[0].values[0] = res.companyId; 
         // 展位新增组件中 主要展品接口
        this.getProductsOfCompany(this.enqueryParams).then(respon => {
          this.productData = [];
          respon.forEach((item, index) => {
            this.products.push({ name: item.productName, id: item.productId });
          });

          // 主要产品穿梭框
          this.products.forEach((product) => {
            this.productData.push({
              key: product.id,
              label: product.name,
              disabled: true
            });
          });
        });
      });
    }
  },
  methods: {
    ...mapActions("numberBooth", ["getApplyInfo"]), // 用户列表查询
    ...mapActions("numberBooth", ["getProductsOfCompany"]), // 展位新增组件中 主要展品接口
    ...mapActions("numberBooth", ["getDownLoadApplyFile"]), // 展位新增组件中 下载展位申请表模板

    ...mapActions("commonStore", ["getExhibitionNum", "getExhibitionPlace", "getBoothApplyType", "downFileMethods"]),
    //届数变化，请求展区
    exhibitionNumChange(param) {
      this.exhibitionPlaceArray.splice(0, this.exhibitionPlaceArray.length);
      this.arrSpecialAreas.splice(0, this.arrSpecialAreas.length);
      let obj = {
        exhibitionNum: param,
        periodCode: this.addForm.ifoBoothApply.exhibitionSession,
        exhibitionAreaCode: ""
      };
      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          let array = [];
          for (let item of res) {
            array.push({
              label: item.exhibitionAreaNameCh,
              value: item.exhibitionAreaCode
            });
          }
          for (let item of array) {
            this.exhibitionPlaceArray.push(item);
          }
          //展区变换后，展品要重置的
          this.productData = [];
          this.products = [];
        }
      });
    },
    //期数变化,请求展区
    periodCodeChange(param) {
      this.exhibitionPlaceArray.splice(0, this.exhibitionPlaceArray.length);
      this.arrSpecialAreas.splice(0, this.arrSpecialAreas.length);
      let obj = {
        exhibitionNum: this.form.ifoBoothApply.exhibitionNum,
        periodCode: param,
        exhibitionAreaCode: ""
      };
      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          let array = [];
          for (let item of res) {
            array.push({
              label: item.exhibitionAreaNameCh,
              value: item.exhibitionAreaCode
            });
          }
          for (let item of array) {
            this.exhibitionPlaceArray.push(item);
          }
          //展区变换后，展品要重置的
          this.productData = [];
          this.products = [];
        }
      });
    },
    // 展位新增组件中 专区接口
    applyExhibitionRegion(param) {
      let obj = {
        exhibitionNum: this.form.ifoBoothApply.exhibitionNum,
        periodCode: this.form.ifoBoothApply.exhibitionSession,
        exhibitionAreaCode: param
      };
      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          let array = [];
          for (let item of res[0].exhibitionRegions) {
            array.push({
              label: item.reCh,
              value: item.exhibitionRegionId
            });
          }
          if (this.arrSpecialAreas.length > 0) {
            this.arrSpecialAreas.splice(0, this.arrSpecialAreas.length);
          }
          for (let item of array) {
            this.arrSpecialAreas.push(item);
          }
        }
      });
    },
    // 返回
    clearForm() {
      this.$refs['form'].resetFields();
      this.$router.push('/agent_booth_reservation');
    },
    // 展位新增提示信息
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 下载模板
    downLoadTemplate() {
      let downLoadTempParams = {
        boothApplyId: this.form.boothApplyId,
        boothNum: this.form.ifoBoothApply.boothNum,
        companyId: this.form.ifoBoothApply.companyId,
        exhibitionAreaCode: this.form.ifoBoothApply.exhibitionAreaCode,
        exhibitionNum: this.form.ifoBoothApply.exhibitionNum,
        exhibitionRegionId: this.form.ifoBoothApply.exhibitionRegionId,
        exhibitionSession: this.form.ifoBoothApply.exhibitionSession,
        layout: this.form.ifoBoothApply.layout,
        productIds: this.form.productIds
      };

      let url = '/api/standApplication/downloadApplyFile?boothApplyId=' + downLoadTempParams.boothApplyId + '&boothNum=' + downLoadTempParams.boothNum
       + '&companyId=' + downLoadTempParams.companyId + '&exhibitionAreaCode=' + downLoadTempParams.exhibitionAreaCode + '&exhibitionNum=' + downLoadTempParams.exhibitionNum
       + '&exhibitionRegionId=' + downLoadTempParams.exhibitionRegionId + '&exhibitionSession=' + downLoadTempParams.exhibitionSession
       + '&layout=' + downLoadTempParams.layout + '&productIds=' + utility.urlEncode(downLoadTempParams.productIds);
      
      this.downFileMethods(url);
    },
    uploadSuccess(res, file) {
      if (res.flag === "0") {
        this.$refs.upload.clearFiles();
        this.$message.error("文件上传失败,请上传.zip格式文件");
      } else {
        this.isShow = false;
        this.$message.success("文件上传成功");
        this.$router.push('/applicationBoothList');
        this.form.fileUrl = res.data;
      }
    },
    uploadError() {
      this.$message.error("文件上传失败");
    },
    handleRemove(file, fileList) {

    },
    beforeUpload(file) {
      this.uploadParams.fileUrl = this.form.fileUrl;
      this.uploadParams.creatorId = this.form.creatorId;
      this.uploadParams.creatorName = this.form.creatorName;
      this.uploadParams.boothApplyId = this.form.boothApplyId;
      return true;
    },
    onMaterialExceed() {
      this.$message.error("只能上传一份文件！");
    },
    // 下载文件
    downLoadFile() {
      let downLoadfile = {
        fileId: this.applyFileId
      };

      let url = '/api/ifoFile/get?fileId=' + downLoadfile.fileId;
      this.downFileMethods(url);
    }

  }
};
</script>
