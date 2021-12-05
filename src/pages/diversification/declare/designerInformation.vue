/**
* @file 设计师基本信息
* @author:wanglifeng
* @date:2019/1/14
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="设计师基本信息" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item style="margin:30px 0px 12px 0px;" label="设计师名称（中文）：" prop="designerNameCn">
          <el-input v-model="ruleForm.designerNameCn" placeholder="请输入设计师中文名" clearable></el-input>
        </el-form-item>
        <el-form-item label="设计师名称（英文）：" prop="designerNameEn">
          <el-input v-model="ruleForm.designerNameEn" placeholder="请输入设计师英文名" clearable></el-input>
        </el-form-item>
        <el-form-item label="职务（中文）：" prop="positionCn">
          <el-input v-model="ruleForm.positionCn" placeholder="请输入职务（中文）" clearable></el-input>
        </el-form-item>
        <el-form-item label="职务（英文）：" prop="positionEn">
          <el-input v-model="ruleForm.positionEn" placeholder="请输入职务（英文）" clearable></el-input>
        </el-form-item>
        <el-form-item label="关联产品：" prop="infoCsDesignProductLkList" class="item-long">
          <el-select v-model="ruleForm.infoCsDesignProductLkList" multiple placeholder="请选择(可多选)"
                     style="width: 300px;">
            <el-option
              v-for="item in productOption"
              :key="item.awardProductId"
              :label="item.productNameCn"
              :value="item.awardProductId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm('ruleForm')">确定</el-button>
          <el-button class="btn2" @click="goBack('ruleForm')">返回</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
// import http from "@/scripts/framework/http";
export default {
  name: "designerInformation",
  data() {
    const checkEn = (rule, value, callback) => {
      if (!/^[a-zA-Z]*$/i.test(value)) { //英文正则
        return callback(new Error("请输入英文"));
      }
      return callback();
    };
    const checkCn = (rule, value, callback) => {
      let reg = /^[\u4e00-\u9fa5]+$/; //中文正则
      if (!reg.test(value)) {
        return callback(new Error("请输入中文"));
      }
      return callback();
    };
    return {
      activeName: "first",
      designerId: '',
      productOption: [],
      ruleForm: {
        designerId: "",
        designerNameCn: "",
        designerNameEn: "",
        positionCn: "",
        positionEn: "",
        isDelete: '0',
        infoCsDesignProductLkList: []
      },
      rules: {
        infoCsDesignProductLkList: [{ required: true, message: "请选择关联产品", trigger: "change" }],
        designerNameCn: [{ required: true, message: "请输入设计师中文名", trigger: "blur" },
          { required: true, validator: checkCn, trigger: 'blur' }],
        designerNameEn: [{ required: true, message: "请输入设计师英文名", trigger: "blur" },
          { required: true, validator: checkEn, trigger: 'blur' }],
        positionCn: [{ required: true, message: "请输入职务（中文）", trigger: "blur" },
          { required: true, validator: checkCn, trigger: 'blur' }],
        positionEn: [{ required: true, message: "请输入职务（英文）", trigger: "blur" },
          { required: true, validator: checkEn, trigger: 'blur' }]
      },
      baseApi: process.env.API_CF_URL
      // baseApi: 'http://192.168.1.111:9014'
    };
  },
  methods: {
    getData() {
      this.$http.get(this.baseApi + '/api/customservice/cf/getDesigner', {
        designerId: this.designerId
      }).then(data => {
        let name;
        for (name in this.ruleForm) {
          this.ruleForm[name] = data[name];
        }
        this.ruleForm.infoCsDesignProductLkList = [];
        data.infoCsDesignProductLkList.forEach(item => {
          this.ruleForm.infoCsDesignProductLkList.push(item.awardProductId);
        });

      }).catch(error => {
      });
    },
    // 关联产品下拉框
    getProduct() {
      this.$http.get(this.baseApi + '/api/customservice/cf/listCfProductSet').then(data => {
        this.productOption = data.records;
      }).catch(error => {
      });
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let arr = [];
          this.ruleForm.infoCsDesignProductLkList.forEach(item => {
            if (item.awardProductId) {
              arr.push({ awardProductId: item.awardProductId, designerRelationId: item.designerRelationId });
            } else {
              arr.push({ awardProductId: item });
            }
          });
          let data = {};
          data = this.ruleForm;
          data.infoCsDesignProductLkList = arr;
          let url;
          if (this.designerId) { // 修改设计师
            url = '/api/customservice/cf/updateDesigner';
          } else { // 新增设计师
            url = '/api/customservice/cf/saveDesigner';
          }
          this.$http.postJson(this.baseApi + url, data).then(res => {
            this.$message({
              message: '设计师保存成功',
              type: 'success'
            });
          //  成功后跳转
            this.$router.push({
              path: '/designerManagerment'
            });
          }).catch(error => {
          });
        } else {
          this.$message({
            message: '必填项不能为空',
            type: 'error'
          });
          return false;
        }
      });
    },
    goBack() {
      // this.$router.go(-1);
      this.$router.push({
        path: '/designerManagerment'
      });
    }
  },
  mounted() {
    this.designerId = this.$route.query.designerId;
    if (this.designerId) {
      this.getData();
    }
    this.getProduct();
  }
};
</script>
<style scoped>
.el-form-item {
  width: 500px;
  position: relative;
  left: 20%;
}
.el-form-item-btn {
  position: relative;
  left: 20%;
  margin-top: 50px;
}
.item-long{
  width: 600px;
}
.select-item{
  width: 300px;
}
.btn1 {
  background-color: #e04040;
  width: 120px;
  height: 40px;
  color: white;
  border-color: #e04040;
}
.btn2 {
  background-color: white;
  width: 120px;
  height: 40px;
}
.btn3 {
  background-color: #e04040;
  width: 60px;
  height: 40px;
  color: white;
}
</style>
