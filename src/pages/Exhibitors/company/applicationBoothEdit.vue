<template>
    <div class="addBooth">
      <el-tabs v-model="activeName">
        <el-tab-pane label="申请展位-编辑" name="first">
          <el-form ref="form" :model="form" label-width="200px">
            <el-row>
              <el-form-item label="上届是否达成订单:">
                <el-col :span="4">
                  <el-input v-model="form.isFinishOrder" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="届数:" v-if="hasOrder">
                <el-col :span="4">
                  <el-input v-model="form.sessionNum" :disabled="true"></el-input>
                  <!-- <el-select v-model="form.sessionNum" placeholder="请选择">
                    <el-option v-for="(item, index) in exhibitionNum" :key="index"
                      :value="item.value" :label="item.label"></el-option>
                  </el-select> -->
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="成交金额:" v-if="hasOrder">
                <el-col :span="4">
                  <el-input v-model="form.lastOrder.money" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <!-- <el-row>
              <el-form-item label="展区:" v-if="hasOrder">
                <el-col :span="4">
                  <el-select v-model="form.lastOrder.exhibitionAreaCode" placeholder="请选择" :disabled="true">
                    <el-option v-for="(item, index) in preArrSpecialAreas" :key="index"
                      :value="item.vale" :label="item.label"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="备注:" v-if="hasOrder" :disabled="true">
                <el-col :span="4">
                  <el-input type="textarea" v-model="form.lastOrder.note"></el-input>
                </el-col>
              </el-form-item>
            </el-row> -->

            <el-row>
              <el-form-item label="届数:">
                <el-col :span="4">
                 <el-select v-model="form.ifoBoothApply.exhibitionNum" :disabled="true" placeholder="请选择" @change="exhibitionNumChange">
                    <el-option v-for="(item, index) in exhibitionNum" :key="index"
                      :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="期数:">
                <el-col :span="4">
                  <el-select v-model="form.ifoBoothApply.exhibitionSession" :disabled="true" placeholder="请选择" @change="periodCodeChange">
                    <el-option label="1" :value="1"></el-option>
                    <el-option label="3" :value="3"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="申请展区:">
                <el-col :span="4">
                  <el-select v-model="form.ifoBoothApply.exhibitionAreaCode" :disabled="true" placeholder="请选择" @change="applyExhibitionRegion">
                    <el-option v-for="(item, index) in exhibitionPlaceArray" :key="index"
                      :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="专区:">
                <el-col :span="4">
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
                  <el-transfer v-model="form.productIds" :data="productData" :disabled="true" :titles="['待选', '已选']"></el-transfer>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="展位类型:">
                <el-col :span="4">
                  <el-select v-model="form.ifoBoothApply.layout" placeholder="请选择" :disabled="true">
                    <el-option v-for="(item, index) in layoutArray" :key="index"
                      :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="申请展位数:">
                <el-col :span="4">
                  <el-input type="textarea" v-model="form.ifoBoothApply.boothNum" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="展位面积:">
                <el-col :span="4">
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
          <div class="submit_back">
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
  data() {
    return {
      url: process.env.API_POT_URL + "/api/standApplication/uploadApplySheetAndArticle",
      preArrSpecialAreas: [],
      exhibitionPlaceArray: [],
      form: {
        fileUrl: '',
        // loginId: "aaa", // 登录ID
        // loginType: "0", // 0 参展企业
        boothApplyId: '',
        creatorId: "test", // 创建人
        creatorName: "test", // 创建人
        isFinishOrder: '', // 0没有，1有
        sessionNum: "", // 届数
        lastOrder: {
          note: '', // 备注
          money: '', // 成交金额
          exhibitionAreaCode: '' // 上届展区代码
        },
        ifoBoothApply: {
          // companyId: "aaa",
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
          {
            'findType': 'EQ',
            'joinType': 'And',
            'name': 'product_session',
            'values': []
          },
          {
            'findType': 'EQ',
            'joinType': 'And',
            'name': 're_approve',
            'values': [
              '2'
            ]
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
        this.form.ifoBoothApply.layout = res.layout;
        this.form.ifoBoothApply.boothNum = res.boothNum;
        this.form.ifoBoothApply.exhibitionNum = res.exhibitionNum;
        this.form.ifoBoothApply.exhibitionSession = res.exhibitionSession;
        this.form.ifoBoothApply.exhibitionAreaCode = res.exhibitionAreaCode;
        this.form.ifoBoothApply.exhibitionRegionId = res.exhibitionRegionId;

        if (res.exhibitionNum) {
          if (res.exhibitionSession) {
            this.periodCodeChange(res.exhibitionSession);
            if (res.exhibitionAreaCode) {
              this.applyExhibitionRegion(res.exhibitionAreaCode);
            }
          }
        }

        this.enqueryParams.customQueryParams[0].values[0] = res.exhibitionNum;
         // 展位新增组件中 主要展品接口
        this.getProductsOfCompany(this.enqueryParams).then(respon => {
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
              value: item.exhibitionAreaArrangeId
            });
          }
          if (this.exhibitionPlaceArray.length > 0) {
            this.exhibitionPlaceArray.splice(0, this.exhibitionPlaceArray.length);
          }
          for (let item of array) {
            this.exhibitionPlaceArray.push(item);
          }
        }
      });
    },
    //期数变化,请求展区
    periodCodeChange(param) {
      this.arrSpecialAreas.splice(0, this.arrSpecialAreas.length);
      let obj = {
        exhibitionNum: this.form.ifoBoothApply.exhibitionNum,
        periodCode: param,
        exhibitionAreaCode: ""
      };
      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          if (res) {
            let array = [];
            for (let item of res) {
              array.push({
                label: item.exhibitionAreaNameCh,
                value: item.exhibitionAreaArrangeId
              });
            }
            if (this.exhibitionPlaceArray.length > 0) {
              this.exhibitionPlaceArray.splice(0, this.exhibitionPlaceArray.length);
            }
            for (let item of array) {
              this.exhibitionPlaceArray.push(item);
            }
          }
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
      this.$router.push('/applicationBoothList');
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
        // companyId: "aaa",
        exhibitionAreaCode: this.form.ifoBoothApply.exhibitionAreaCode,
        exhibitionNum: this.form.ifoBoothApply.exhibitionNum,
        exhibitionRegionId: this.form.ifoBoothApply.exhibitionRegionId,
        exhibitionSession: this.form.ifoBoothApply.exhibitionSession,
        layout: this.form.ifoBoothApply.layout,
        productIds: this.form.productIds
      };
      // + '&companyId=' + downLoadTempParams.companyId

      let url = '/api/standApplication/downloadApplyFile?boothApplyId=' + downLoadTempParams.boothApplyId + '&boothNum=' + downLoadTempParams.boothNum
       + '&exhibitionAreaCode=' + downLoadTempParams.exhibitionAreaCode + '&exhibitionNum=' + downLoadTempParams.exhibitionNum
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

<style scoped>
.addBooth{
  width: 100%;
  margin: 0 auto;
}
.addBooth .submitBtn button{
  margin-left: 20px
}
.submit_back{
  margin: 0px 0 0px 220px;
}
.submit_div{
  margin: 0px 0 0px 260px;
}
.addBooth p{
  color: red;
}
.addBooth span{
  color: red;
  display: inline-block;
  margin-left: 20px;
}
.addBooth p a{
  text-decoration: none
}
.el-form-item{
  margin-bottom: 30px;
}
</style>

<style>
.addBooth .el-transfer__button {
  border-radius: 0% !important;
}
</style>
