<style lang="less">
  @import '../../../../../theme/project/css/flex.less';
  #reservationBooth-add {
    width: 100%;
    margin: 0 auto;
    .submit_div{
      margin: 30px 0 50px 260px;
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
    <div id="reservationBooth-add">
      <el-tabs v-model="activeName">
        <el-tab-pane label="申请展位-增加" name="first">
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
          <el-form ref="addForm" :model="addForm" label-width="350px" :rules="formRules">
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
                  <el-input :value="companyObj.companyNameEn" :disabled="true" placeholder="请先选择企业"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="企业简称:">
                <el-col :span="10">
                  <el-input :value="companyObj.enterpriseAbbreviation" :disabled="true" placeholder="请先选择企业"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="国别/地区:">
                <el-col :span="10">
                  <el-input :value="companyObj.crChName" :disabled="true" placeholder="请先选择企业"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="上届是否达成订单:">
                <el-col :span="10">
                  <el-input v-model="addForm.isFinishOrder" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="届数:" v-if="hasOrder">
                <el-col :span="10">
                  <el-input v-model="addForm.sessionNum" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="成交金额:" v-if="hasOrder" prop="lastOrder.money">
                <el-col :span="10">
                  <el-input v-model="addForm.lastOrder.money"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <!-- <el-row>
              <el-form-item label="展区:" v-if="hasOrder" prop="lastOrder.exhibitionAreaCode">
                <el-col :span="10">
                  <el-select v-model="addForm.lastOrder.exhibitionAreaCode" placeholder="请选择">
                    <el-option label="0" value="0"></el-option>
                    <el-option label="1" value="1"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="备注:" v-if="hasOrder" prop="lastOrder.note">
                <el-col :span="10">
                  <el-input type="textarea" v-model="addForm.lastOrder.note"></el-input>
                </el-col>
              </el-form-item>
            </el-row> -->

            <el-row>
              <el-form-item label="届数:" required prop="ifoBoothApply.exhibitionNum">
                <el-col :span="10">
                  <el-select v-model="addForm.ifoBoothApply.exhibitionNum" placeholder="请选择" @change="exhibitionNumChange">
                    <el-option v-for="(item, index) in exhibitionNum" :key="index"
                      :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="期数:" required prop="ifoBoothApply.exhibitionSession">
                <el-col :span="10">
                  <el-select v-model="addForm.ifoBoothApply.exhibitionSession" placeholder="请选择" @change="periodCodeChange">
                    <el-option label="1" :value="1"></el-option>
                    <el-option label="3" :value="3"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="申请展区:" required prop="ifoBoothApply.exhibitionAreaCode">
                <el-col :span="10">
                  <el-select v-model="addForm.ifoBoothApply.exhibitionAreaCode" placeholder="请选择" @change="applyExhibitionRegion">
                    <el-option v-for="(item, index) in exhibitionPlaceArray" :key="index"
                      :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="专区:" prop="ifoBoothApply.exhibitionRegionId">
                <el-col :span="10">
                  <el-select v-model="addForm.ifoBoothApply.exhibitionRegionId" placeholder="请选择">
                    <el-option v-for="(item, index) in arrSpecialAreas" :key="index"
                    :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="主要展品:" prop="productIds">
                <el-col>
                  <el-transfer v-model="addForm.productIds" :data="productData" :titles="['待选', '已选']"></el-transfer>
                </el-col>
                <p v-show="showProduct">展品不足2个,请<a href="javascript:;">添加展品</a></p>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="展位类型:" prop="ifoBoothApply.layout">
                <el-col :span="10">
                  <el-select v-model="addForm.ifoBoothApply.layout" placeholder="请选择">
                    <el-option v-for="(item, index) in layoutArray" :key="index"
                      :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="申请展位数:" prop="ifoBoothApply.boothNum">
                <el-col :span="10">
                  <el-input type="text" v-model="addForm.ifoBoothApply.boothNum"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="展位面积:">
                <el-col :span="10">
                  <el-input v-model="addForm.boothArea" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

          </el-form>
          <!--表单提交/返回按钮-->
          <div class="submit_div">
            <el-button type="primary" @click="onSubmit('addForm')" class="submit_btn">提交</el-button>
            <el-button class="submit_btn" @click="clearForm('addForm')">返回</el-button>
          </div>
        </el-tab-pane>

        <!--展位新增提示信息-->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <span>第{{this.addForm.ifoBoothApply.exhibitionNum}}届，第{{this.addForm.ifoBoothApply.exhibitionSession}}期该企业已经申请过展位，不能重复申请</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

        <!--黑名单用户提示信息-->
        <el-dialog title="提示" :visible.sync="dialogVisibleBlack" width="30%" :before-close="handleClose">
          <span>该用户是黑名单用户，不能申请展位</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="blackCompany">取 消</el-button>
            <el-button type="primary" @click="blackCompany">确 定</el-button>
          </span>
        </el-dialog>
      </el-tabs>

      <!-- 企业列表 -->
      <el-dialog title="选择企业" :visible.sync="innerCompanyDialog" width="70%" :before-close="handleClose">
        <components-companyList :showAble="innerCompanyDialog"
          @closeInnerCompany="innerCompanyDialogCallback" @radio-company="radioCompany"></components-companyList>
      </el-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import componentsCompanyList from './components/companyList';
export default {
  components: {
    'components-companyList': componentsCompanyList
  },
  data() {
    return {
      preArrSpecialAreas: [],
      exhibitionPlaceArray: [],
      innerCompanyDialog: false,
      companyNameCNArray: [
        {
          label: "中国中央电视台",
          value: "1"
        }
      ],
      //展示企业信息
      companyObj: {
        companyNameEn: "",
        companyNameCh: "",
        enterpriseAbbreviation: "",
        crChName: ""
      },
      addForm: {
        // loginId: "aaa", // 登录ID
        // loginType: "0", // 0 参展企业
        creatorName: "", // 创建人
        isFinishOrder: '', // 0没有，1有
        sessionNum: '', // 届数
        lastOrder: {
          note: '', // 备注
          money: '', // 成交金额
          exhibitionAreaCode: '' // 上届展区代码
        },
        ifoBoothApply: {
          companyId: "",
          layout: '', // 展位类型
          boothNum: null, // 申请展位数
          exhibitionNum: '', // 届数
          exhibitionAreaCode: '', // 申请展区
          exhibitionRegionId: '', // 专区ID
          exhibitionSession: 1 // 期数
        },
        boothArea: '',
        productIds: [], // 主要展品
        exhibitionArea: ''
      },
      hasOrder: false,
      products: [],
      productsId: [],
      productNames: [],
      showProduct: false,
      activeName: 'first',
      arrSpecialAreas: [],
      dialogVisible: false,
      dialogVisibleBlack: false,
      interfaceException: false,
      productData: [],
      boothParams: {
        "size": 10,
        "current": 1,
        "isAsc": true,
        "loginType": "0",
        "loginId": 'aaa',
        "orderByField": "apply.create_date"
      },
      checkParams: {
        "customQueryParams": [
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "exhibition_num",
            "values": []
          },
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "exhibition_session",
            "values": []
          },
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "company_id",
            "values": []
          },
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "exhibition_area_code",
            "values": []
          }
        ]
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
      exhibitsAdd: {
        "creatorName": "", // 创建人
        "isFinishOrder": "", // 0没有，1有
        "lastOrder": {
          "note": "", // 备注
          "money": "", // 成交金额
          "exhibitionAreaCode": "" // 上届展区代码
        },
        "ifoBoothApply": {
          "layout": "", // 展位类型
          "boothNum": "", // 申请展位数
          "exhibitionNum": "", // 届数
          "exhibitionAreaCode": "", // 申请展区
          "exhibitionRegionId": "", // 专区ID
          "exhibitionSession": "" // 期数
        },
        "productIds": [] // 主要展品
      },
      hasLastOrder: {
        "customQueryParams": [
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "agent_id",
            "values": [
              "aaa"
            ]
          },
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "agent_type",
            "values": [
              "0"
            ]
          },
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "exhibition_num",
            "values": [
              ""
            ]
          },
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "status",
            "values": [
              "2"
            ]
          }
        ]
      },
      formRules: { // 表单校验
        'lastOrder.money': [{ required: true, message: "金额信息不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的金额信息"));
              }
              callback(errors);
            },
            trigger: "blur"
          }
        ],
        'lastOrder.note': [{ required: true, message: "备注信息不能为空", trigger: "blur" }],
        'lastOrder.exhibitionAreaCode': [{ required: true, message: "请选择展区", trigger: "change" }],
        'ifoBoothApply.layout': [{ required: true, message: "请选择展位类型", trigger: "change" }],
        'ifoBoothApply.exhibitionAreaCode': [{ required: true, message: "请选择展区", trigger: "change" }],
        'ifoBoothApply.exhibitionNum': [{ required: true, message: "请选择届数", trigger: "change" }],
        'ifoBoothApply.exhibitionSession': [{ required: true, message: "请选择期数", trigger: "change" }],
        'ifoBoothApply.exhibitionRegionId': [{ required: true, message: "请选择专区", trigger: "change" }],
        'ifoBoothApply.boothNum': [{ required: true, message: "申请展位数不能为空", trigger: "blur" }],
        productIds: [{ required: true, message: "请选择主要产品", trigger: "change" }]
      },
      blackParams: {
        "customQueryParams": [
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "limit_condition",
            "values": [0]
          },
          {
            "findType": "LTE",
            "joinType": "And",
            "name": "start_exh_num",
            "values": []
          },
          {
            "findType": "GTE",
            "joinType": "And",
            "name": "end_exh_num",
            "values": []
          },
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "company_id",
            "values": []
          }
        ]
      }
    };
  },
  watch: {
    "addForm.ifoBoothApply.boothNum": function(newV, oldV) {
      let value = newV;
      this.addForm.boothArea = value * 9;
    }
  },
  computed: {
    ...mapGetters('commonStore', ['exhibitionNum', "currentExhibition", 'layoutArray'])
  },
  async created() {
    if (!this.layoutArray) {
      this.getBoothApplyType().then(res => {
        if (res) {
          let array = [];
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
              this.addForm.ifoBoothApply.exhibitionNum = this.currentExhibition;
              this.addForm.sessionNum = this.currentExhibition - 1;
              break;
            }
          }
        }
      });
    } else if (!this.currentExhibition) {
      for (let item of this.exhibitionNum) {
        if (item.current) {
          this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
          this.addForm.ifoBoothApply.exhibitionNum = this.currentExhibition;
          this.addForm.sessionNum = this.currentExhibition - 1;
          break;
        }
      }
    } else {
      this.addForm.ifoBoothApply.exhibitionNum = this.currentExhibition;
      this.addForm.sessionNum = this.currentExhibition - 1;
    }

    // this.enqueryParams.customQueryParams[0].values[0] = this.addForm.ifoBoothApply.exhibitionNum;
    // this.getProductsOfCompany(this.enqueryParams).then(response => {
    //   response.forEach((item, index) => {
    //     // 产品个数的校验
    //     if (response.length < 2) {
    //       this.showProduct = true;
    //     }
    //     this.products.push({ name: item.productName, id: item.productId });
    //     this.productNames.push(item.productName);
    //   });

    //   // 主要产品穿梭框
    //   this.products.forEach((product) => {
    //     this.productData.push({
    //       label: product.name,
    //       key: product.id
    //     });
    //   });
    // });
  },
  mounted() {
    // 展位新增组件中 查询上届是否有达成订单
    this.getCheckHasLastOrder().then(res => {
      if (res === "0") {
        this.exhibitsAdd.isFinishOrder = res;
        this.addForm.isFinishOrder = "否";
      } else if (res === "1") {
        this.hasOrder = true;
        this.addForm.isFinishOrder = "是";
      }
    });

    //请求展区
    this.periodCodeChange(this.addForm.ifoBoothApply.exhibitionSession);
  },
  methods: {
    ...mapActions("numberBooth", ["getBlackCompany"]), // 用户黑名单列表查询
    ...mapActions("numberBooth", ["getApplicationBooth"]), // 用户列表查询
    ...mapActions("numberBooth", ["getCheckIsApplied"]), // 用户黑名单列表查询
    ...mapActions("numberBooth", ["getCheckHasLastOrder"]), // 查询上届是否有达成订单
    ...mapActions("numberBooth", ["getExhibitionRegion"]), // 展位新增组件中 专区接口
    ...mapActions("numberBooth", ["getProductsOfCompany"]), // 展位新增组件中 主要展品接口
    ...mapActions("numberBooth", ["getApplicationExhibitsAdd"]), // 展位新增组件中 添加按钮接口

    ...mapActions("commonStore", ["getExhibitionNum", "getExhibitionPlace", 'getBoothApplyType']),

    //单选
    radioCompany(param) {
      // console.log(param);
      
      this.innerCompanyDialog = param.show;
      let { companyNameEn, companyNameCh, enterpriseAbbreviation, companyId, crChName } = param.primary;
      let obj = { companyNameEn, companyNameCh, enterpriseAbbreviation, crChName };
      Object.assign(this.companyObj, obj);
      this.addForm.ifoBoothApply.companyId = companyId;

      this.enqueryParams.customQueryParams[0].values[0] = companyId;
      if (this.addForm.ifoBoothApply.exhibitionAreaCode) {
        let str = `exhibitionAreaCode=${this.addForm.ifoBoothApply.exhibitionAreaCode}&companyId=${companyId}`;
        this.getProductsOfCompany(str).then(response => {
          // console.log(response);
          this.products = [];
          this.productData = [];
          response.forEach((item, index) => {
            // 产品个数的校验
            if (response.length < 2) {
              this.showProduct = true;
            }
            this.products.push({ name: item.productName, id: item.productId });
            this.productNames.push(item.productName);
          });

          // 主要产品穿梭框
          this.products.forEach((product) => {
            this.productData.push({
              label: product.name,
              key: product.id
            });
          });
        }); 
      }
    },
    //企业列表
    innerCompanyDialogCallback(param) {
      this.innerCompanyDialog = param;
    },
    //届数变化，请求展区
    exhibitionNumChange(param) {
      this.addForm.ifoBoothApply.exhibitionAreaCode = "";
      this.addForm.ifoBoothApply.exhibitionRegionId = "";

      // this.enqueryParams.customQueryParams[0].values[0] = param; //展示展品传入届数
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
          if (this.exhibitionPlaceArray.length > 0) {
            this.exhibitionPlaceArray.splice(0, this.exhibitionPlaceArray.length);
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
      this.addForm.ifoBoothApply.exhibitionAreaCode = "";
      this.addForm.ifoBoothApply.exhibitionRegionId = "";

      this.arrSpecialAreas.splice(0, this.arrSpecialAreas.length);
      let obj = {
        exhibitionNum: this.addForm.ifoBoothApply.exhibitionNum,
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
                value: item.exhibitionAreaCode
              });
            }
            if (this.exhibitionPlaceArray.length > 0) {
              this.exhibitionPlaceArray.splice(0, this.exhibitionPlaceArray.length);
            }
            for (let item of array) {
              this.exhibitionPlaceArray.push(item);
            }
            //展区变换后，展品要重置的
            this.productData = [];
            this.products = [];
          }
        }
      });
    },
    // 黑名单提示框
    blackCompany() {
      this.dialogVisibleBlack = false;
      this.$router.push('/applicationBoothList');
    },
    // 修改、新增
    onSubmit(addForm) {
      // 黑名单参数
      this.blackParams.customQueryParams[1].values.push(this.addForm.ifoBoothApply.exhibitionNum);
      this.blackParams.customQueryParams[2].values.push(this.addForm.ifoBoothApply.exhibitionNum);

      // 判断当届当期是否申请的参数
      this.checkParams.customQueryParams[0].values.push(this.addForm.ifoBoothApply.exhibitionNum);
      this.checkParams.customQueryParams[1].values.push(this.addForm.ifoBoothApply.exhibitionSession);
      this.addForm.boothArea = this.addForm.ifoBoothApply.boothNum * 9;
      let _this = this;
      let domValid = _this.$refs[addForm];

      this.blackParams.customQueryParams[3].values[0] = this.addForm.ifoBoothApply.companyId;
      this.getBlackCompany(this.blackParams).then(res => {
        if (res === "1") { // 黑名单 置灰
          this.dialogVisibleBlack = true;
        } else {
          // 当届当期是否申请过
          this.checkParams.customQueryParams[2].values[0] = this.addForm.ifoBoothApply.companyId;
          this.checkParams.customQueryParams[3].values[0] = this.addForm.ifoBoothApply.exhibitionAreaCode;
          _this.getCheckIsApplied(this.checkParams).then(resp => {
            if (resp === "0") { // 1 不能申请  0 可以申请/隐藏
              // 展位新增组件中 数据提交时的校验规则
              domValid.validate((valid) => {
                if (valid) {
                  // 展位新增组件中 提交按钮接口
                  _this.getApplicationExhibitsAdd(this.addForm).then(respon => {
                    this.$message({
                      type: 'success',
                      message: '提交成功!'
                    });
                    // 清除上一次的新增记录
                    let key;
                    for (key in this.addForm) {
                      this.addForm[key] = '';
                    }
                    _this.$router.push('/applicationBoothList');
                  }).catch(e => {
                    _this.$message.error(e);
                    return false;
                  });
                } else {
                  return false;
                }
              });
            } else {
              this.dialogVisible = true;
            }
          });
          // 刷新页面
          this.getApplicationBooth(this.boothParams).then(respo => {
            this.tableData = respo.records;
            this.total = respo.total;
          });
        }
      });
    },
    // 展位新增组件中 专区接口
    applyExhibitionRegion(param) {
      this.addForm.ifoBoothApply.exhibitionRegionId = "";

      let obj = {
        exhibitionNum: this.addForm.ifoBoothApply.exhibitionNum,
        periodCode: this.addForm.ifoBoothApply.exhibitionSession,
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
      //展品
      let str = `exhibitionAreaCode=${param}&companyId=${this.addForm.ifoBoothApply.companyId}`;
      this.getProductsOfCompany(str).then(res => {
        if (res) {
          //展区变换后，展品要重置的
          this.productData = [];
          this.products = [];
          res.forEach((item, index) => {
            // 产品个数的校验
            if (res.length < 2) {
              this.showProduct = true;
            }
            this.products.push({ name: item.productName, id: item.productId });
            this.productNames.push(item.productName);
          });

          // 主要产品穿梭框
          this.products.forEach((product) => {
            this.productData.push({
              label: product.name,
              key: product.id
            });
          }); 
        }
      });
      // let exhibitionAreaCode = this.addForm.ifoBoothApply.exhibitionAreaCode;
      // this.getExhibitionRegion(exhibitionAreaCode).then(res => {
      //   this.arrSpecialAreas = res;
      // });
    },
    // 返回
    clearForm(addForm) {
      this.$refs[addForm].resetFields();
      this.$router.push('/agent_booth_reservation');
    },
    // 展位新增提示信息
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }

  }
};
</script>
