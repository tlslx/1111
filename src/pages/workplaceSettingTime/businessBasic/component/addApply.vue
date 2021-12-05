<style lang="less" scoped>
.addApply {
  height: 100%;
  /deep/.el-form-item {
        margin-bottom: 28px;
      }
  .newbtn {
    padding-bottom: 20px;
    text-align: center;
  }
}
</style>
<template>
  <el-form class="addApply" ref="form" :model="form" :rules="rules" label-width="180px">
    <el-form-item label="企业名称:">
      <!-- <el-input v-model="form.code"></el-input> -->
      {{enterpriseDate.name}}
    </el-form-item>
    <el-form-item label="展位类型:" prop="boothType">
      <el-select v-model="form.boothType" placeholder="请选一般类型:">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="展区:" prop="exhibitionArea">
      <el-select v-model="form.exhibitionArea" placeholder="请选展区:" @change="exhibitionChange">
        <el-option
          v-for="(item, index) in exhibitionAreaoption"
          :key="index"
          :label="item.exhibitionAreaName"
          :value="item.exhibitionAreaCode"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="主要展示产品:" prop="productIdO">
      <el-select v-model="form.productIdO" placeholder="请选产品:">
        <el-option
          v-for="item in productsList"
          :key="item.exhibitId"
          :label="item.exhibitNameCh"
          :value="item.exhibitId"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label prop="productIdT">
      <el-select v-model="form.productIdT" placeholder="请选产品:">
        <el-option
          v-for="item in productsList"
          :key="item.exhibitId"
          :label="item.exhibitNameCh"
          :value="item.exhibitId"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="申请数量:" prop="boothNumber">
      <el-input v-model.number="form.boothNumber" maxlength="4" @change="inputChange"></el-input>
    </el-form-item>
    <!-- <el-form-item label="申请面积:" prop="boothAcreage"> -->
    <el-form-item label="申请面积:" :rules="[{ required: true, message: '请填入申请面积' }]">
      <el-input disabled v-model="sumn" ></el-input>
    </el-form-item>
    <el-form-item label="布展类型:" prop="exhibitionType">
      <el-select v-model="form.exhibitionType" :disabled="typDisab" placeholder="请选布展类型:">
        <el-option
          v-for="item in exhibitionTypeDate"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否愿意接洽国内买家:" prop="isContacted">
      <el-select v-model="form.isContacted" placeholder="请选择">
        <el-option
          v-for="item in isContactedDate"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item class="newbtn"> -->
      <div class="newbtn">
        <el-button type="primary" @click="onSubmit(form)">保存</el-button>
        <el-button @click="closeModel">取消</el-button>
      </div>
    <!-- </el-form-item> -->
  </el-form>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "addApply",
  props: ["enterpriseDate"],
  data() {
    //验证申请面积
    let validateNum = (rule, value, callback) => {
      let str = /^(?:0|[1-9]\d{0,3})(?:\.\d{1,2})?$/;
      if (!str.test(value)) {
        return callback(new Error('请不要超过四位正整数和两位小数'));
      } else {
        return callback();
      }
    };
    return {
      options: [
        {
          label: "一般性展位",
          value: "01"
        }
      ],
      exhibitionAreaName: '',
      typDisab: false,
      exhibitionAreaoption: [],
      isContactedDate: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      exhibitionTypeDate: [
        {
          label: "标摊",
          value: "STANDARD_BOOTH",
          disabled: false
        },
        {
          label: "特装",
          value: "SPECIAL_BOOTH",
          disabled: false
        },
        {
          label: "统一布展",
          value: "UNIFICATION_BOOTH",
          disabled: true
        }
      ],
      form: {
        exhibitionArea: "",
        boothType: "01",
        companyProductList: [],
        exhibitionType: "",
        isContacted: "",
        productIdO: "",
        productIdT: "",
        boothAcreage: null,
        boothNumber: null
      },
      num: 0,
      rules: {
        boothType: [
          { required: true, message: "请选择展位类型", trigger: "change" }
        ],
        exhibitionArea: [
          { required: true, message: "请选择展区类型", trigger: "change" }
        ],
        productIdO: [
          {
            required: true,
            message: "请选择主要展示产品类型",
            trigger: "change"
          }
        ],
        productIdT: [
          {
            required: true,
            message: "请选择主要展示产品类型",
            trigger: "change"
          }
        ],
        isContacted: [
          {
            required: true,
            message: "请选择是否愿意接洽国内买家",
            trigger: "change"
          }
        ],
        exhibitionType: [
          { required: true, message: "请选择布展类型", trigger: "change" }
        ],
        boothNumber: [
          { required: true, message: "请填入申请数量", trigger: "blur" },
          { type: "number", message: "申请数量必须为数字值", trigger: "blur" }
        ],
        boothAcreage: [
          { required: true, message: "请填入申请面积", trigger: "blur" },
          { validator: validateNum }
        ]
      }
    };
  },
  computed: {
    ...mapGetters("quantitativeArrangement", [
      "productsList", // //获取审核结果的公布批次时间
      "suppleList"
    ]),
    ...mapGetters("nainformation", ["getCes"]),
    sumn() {
      return this.form.boothNumber * this.num + 0;
    }
  },
  watch: {
    "form.exhibitionArea"(val, oldval) {
      if (val !== '') {
        let temp = {};
        temp.exhibitionArea = val;
        temp.companyId = this.enterpriseDate.id;
        this.getEnterpriseProducts(temp);
      }
    },
    productsList: {
      handler(val) {
        if (val && val.length === 0) {
          this.$message.error("企业尚未登记该展区大类下的展品,请登记后才可以追加申请展位!");
        }
      },
      deep: true
    }
  },
  async created () {
    // this.exhibitionAreaoption = await kindo.dictionary.get('exhibitionArea'); // 展区
    // 展区
    this.getexhibitionArea().then(res => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.exhibitionAreaoption = newRes;
    }).catch(e => {});
    // this.exhibitionTypeDate = await kindo.dictionary.get('exhibitionType'); // 布展类型
    // this.options = await kindo.dictionary.get('boothType'); // 展位类型  李康 修改于 19/5/19  将此行注释
  },
  mounted() {
    this.getcurrentExhibitionSession();
  },
  methods: {
    ...mapActions("quantitativeArrangement", [
      "getEnterpriseProducts", //获取审核结果的公布批次时间
      "getSupplementaryapplication"
    ]),
    ...mapActions("nainformation", [
      "getcurrentExhibitionSession", // 展届
      "getexhibitionArea"
    ]),
    onSubmit(formName) {
      let _this = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          if (formName.productIdO !== formName.productIdT) {
            for (let key in this.enterpriseDate.option) {
              if (
                this.enterpriseDate.option[key].value === formName.exhibitionArea
              ) {
                formName.exhibitionAreaName = this.enterpriseDate.option[key].text;
              }
            }
            formName.companyProductList.push({
              productId: formName.productIdT
            });
            formName.companyProductList.push({
              productId: formName.productIdO
            });
            formName.companyName = this.enterpriseDate.name;
            formName.companyId = this.enterpriseDate.id;
            formName.exhibitionAreaName = this.exhibitionAreaName;
            this.getSupplementaryapplication(formName).then(res => {
              // console.log(res);
              this.$message({
                type: "success",
                message: "申请成功!"
              });
              _this.closeModel();
            });
          } else {
            this.$message.error("请不要选择相同的一款主要产品");
            formName.productIdT = "";
            formName.productIdO = "";
          }
        }
      });
    },
    closeModel() {
      this.$refs.form.resetFields();
      this.$emit("closeModal", false);
    },
    exhibitionChange() {
      this.$http.get(process.env.API_NA_URL + "/api/common/exhibitionAreaDTOList/get", {
        exhibitionAreaCode: this.form.exhibitionArea,
        exhibitionSession: this.getCes
      }).then(res => {
        this.exhibitionAreaName = res.records[0].exhibitionAreaName;
        this.num = res.records[0].seatArea;
        if (res.records[0].isUnifyArrangeExhibitionArea) {
          this.form.exhibitionType = "UNIFICATION_BOOTH";
          this.typDisab = true;
        } else {
          this.form.exhibitionType = "";
          this.typDisab = false;
        }
      }).catch();
    },
    inputChange() {
      this.form.boothAcreage = this.form.boothNumber * this.num;
    }
  }
};
</script>
