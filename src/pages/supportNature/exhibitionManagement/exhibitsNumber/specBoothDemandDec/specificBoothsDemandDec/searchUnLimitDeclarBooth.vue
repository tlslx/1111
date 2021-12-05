/**
* @file 查看申报展位(限制数量)【交易团】
* @author:heli
* @date:2019/6/5
*/
<template>
    <div class="addBooth">
      <el-tabs v-model="activeName">
        <el-tab-pane label="查看申报展位（限制数量）" name="first">
          <el-form ref="addForm" :model="addForm" label-width="200px" :rules="formRules">
            <el-row>
              <el-form-item label="届数:">
                <el-col :span="4">
                  <el-input v-model="addForm.isFinishOrder" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="调研方案名称:">
                <el-col :span="4">
                  <el-input v-model="addForm.isFinishOrder" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="申报类型:">
                <el-col :span="4">
                  <el-input v-model="addForm.isFinishOrder" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="调研展区:">
                <el-col :span="4">
                  <el-input v-model="addForm.isFinishOrder" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="申报展位数量:">
                <el-col :span="4">
                  <el-input v-model="addForm.isFinishOrder" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "searchUnLimitDeclarBooth",
  data() {
    return {
      preArrSpecialAreas: [],
      exhibitionPlaceArray: [],
      addForm: {
        creatorName: "", // 创建人
        isFinishOrder: '', // 0没有，1有
        sessionNum: "", // 届数
        lastOrder: {
          note: '', // 备注
          money: '', // 成交金额
          exhibitionAreaCode: '' // 上届展区代码
        },
        ifoBoothApply: {
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
      interfaceException: false,
      productData: [],
      boothParams: {
        "size": 10,
        "current": 1,
        "isAsc": true,
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
          }
        ]
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

    this.enqueryParams.customQueryParams[0].values[0] = this.addForm.ifoBoothApply.exhibitionNum;
    this.getProductsOfCompany(this.enqueryParams).then(response => {
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
    //届数变化，请求展区
    exhibitionNumChange(param) {
      this.addForm.ifoBoothApply.exhibitionAreaCode = "";
      this.addForm.ifoBoothApply.exhibitionRegionId = "";

      this.enqueryParams.customQueryParams[0].values[0] = param; //展示展品传入届数
      this.exhibitionPlaceArray.splice(0, this.exhibitionPlaceArray.length);
      this.arrSpecialAreas.splice(0, this.arrSpecialAreas.length);

      let obj = {
        exhibitionNum: param,
        periodCode: this.addForm.ifoBoothApply.exhibitionSession,
        exhibitionAreaCode: ""
      };

      //展品
      this.getProductsOfCompany(this.enqueryParams).then(res => {
        if (res && res.lenght > 0) {
          this.productData = [];
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

      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          let array = [];
          for (let item of res) {
            array.push({
              label: item.exhibitionAreaName,
              value: item.exhibitionAreaCode
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
                label: item.exhibitionAreaName,
                value: item.exhibitionAreaCode
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
      this.addForm.ifoBoothApply.exhibitionRegionId = "";

      let obj = {
        exhibitionNum: this.addForm.ifoBoothApply.exhibitionNum,
        periodCode: this.addForm.ifoBoothApply.exhibitionSession,
        exhibitionAreaCode: param
      };
      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          let array = [];
          for (let item of res[0].specialAreas) {
            array.push({
              label: item.cname,
              value: item.specialAreaCode
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
      // 原先的
      // let exhibitionAreaCode = this.addForm.ifoBoothApply.exhibitionAreaCode;
      // this.getExhibitionRegion(exhibitionAreaCode).then(res => {
      //   this.arrSpecialAreas = res;
      // });
    }

  }
};
</script>

<style scoped>
.addBooth{
  width: 100%;
  margin: 0 auto;
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
