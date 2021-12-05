<template>
  <div class="inlinBlock">
    <el-form :inline="true" :model="formData" size="small">
      <el-form-item label="展区" v-if="exhibitionArea">
        <el-select v-model="formData.exhibitionArea" @change="formChange" class="widtwo" clearable>
          <el-option
            v-for="(item, index) in localstora.exhibitionArea"
            :key="index"
            :label="item.exhibitionAreaName"
            :value="item.exhibitionAreaCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品专区" v-if="specialArea">
        <el-select v-model="formData.productType" @change="specialChange" class="widtwo" clearable>
          <el-option
            v-for="(item, index) in optspe"
            :key="index"
            :label="item.specialAreaName"
            :value="item.specialAreaCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易团" v-if="delegation">
        <el-select v-model="formData.delegationId" @change="deptChange" class="widtwo" clearable>
          <el-option
            v-for="(item, index) in localstora.delegation"
            :key="index"
            :label="item.deptName"
            :value="item.deptId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商协会" v-if="businessAssociation">
        <el-select v-model="formData.coceralId" @change="coceralChange" class="widtwo" clearable>
          <el-option
            v-for="(item, index) in localstora.businessAssociation"
            :key="index"
            :label="item.deptName"
            :value="item.deptId"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    selectName: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: {
        exhibitionArea: "",
        productType: "",
        delegationId: ""
      },
      exhibitionArea: false, // 展区
      specialArea: false, // 专区
      delegation: false, // 交易团
      businessAssociation: false, // 商协会
      localstora: {
        exhibitionArea: [], // 展区
        delegation: [], // 交易团
        businessAssociation: [] // 商协会
      }, // 数据字典
      optspe: []
    };
  },
  created() {
    if (this.selectName.name === "展区") {
      this.exhibitionArea = true;
      this.specialArea = false;
      this.delegation = false;
    } else if (this.selectName.name === "展区专区") {
      this.exhibitionArea = true;
      this.specialArea = true;
      this.delegation = false;
    } else if (this.selectName.name === "展区专区交易团") {
      this.exhibitionArea = true;
      this.specialArea = true;
      this.delegation = true;
    } else if (this.selectName.name === "交易团") {
      this.exhibitionArea = false;
      this.specialArea = false;
      this.delegation = true;
    } else if (this.selectName.name === "展区交易团") {
      this.exhibitionArea = true;
      this.specialArea = false;
      this.delegation = true;
    }
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      this.localstora.businessAssociation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  methods: {
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment", // 交易团
      "getassociationDepartment" // 商协会
    ]),
    // 展区事件change
    formChange() {
      this.optspe = [];
      // 专区
      if (this.formData.exhibitionArea) {
        this.getexhibitionInfoByCode({ exhibitionAreaCode: this.formData.exhibitionArea }).then(res => {
          this.optspe = JSON.parse(JSON.stringify(res));
        }).catch(e => {});
      }
      for (let i = 0; i < this.localstora.exhibitionArea.length; i++) {
        if (this.localstora.exhibitionArea[i].exhibitionAreaCode === this.formData.exhibitionArea) {
          this.formData["exhibitionAreaName"] = this.localstora.exhibitionArea[i].exhibitionAreaName;
        }
      }
      this.$emit("exhibitionArea", this.formData.exhibitionArea, this.formData["exhibitionAreaName"]);
    },
    // 专区change事件
    specialChange() {
      for (let i = 0; i < this.optspe.length; i++) {
        if (this.optspe[i].specialAreaCode === this.formData.productType) {
          this.formData["specialAreaName"] = this.optspe[i].specialAreaName;
        }
      }
      this.$emit("specialArea", this.formData.productType, this.formData["specialAreaName"]);
    },
    // 交易团change事件
    deptChange() {
      for (let i = 0; i < this.localstora.delegation.length; i++) {
        if (this.localstora.delegation[i].deptId === this.formData.delegationId) {
          this.formData["delegationName"] = this.localstora.delegation[i].deptName;
        }
      }
      this.$emit("delegation", this.formData.delegationId, this.formData["delegationName"]);
    },
    // 商协会change事件
    coceralChange() {
      for (let i = 0; i < this.localstora.businessAssociation.length; i++) {
        if (this.localstora.businessAssociation[i].deptId === this.formData.delegationId) {
          this.formData["businessAssociationName"] = this.localstora.businessAssociation[i].deptName;
        }
      }
      this.$emit("businessAssociation", this.formData.delegationId, this.formData["businessAssociationName"]);
    }
  }
};
</script>

<style scoped>
.widtwo {
  width: 215px;
}
.inlinBlock {
  display: inline-block;
}
</style>


