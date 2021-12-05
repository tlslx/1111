/**
* @file 设置展区(限制数量)【工作部管理员】
* @author:heli
* @date:2019/6/5
*/
<template>
    <div class="addBooth">
      <el-tabs v-model="activeName">
        <el-tab-pane label="设置展区" name="first">
          <el-form ref="addForm" :model="addForm" label-width="200px" :rules="formRules">
            <el-row>
              <el-form-item label="届数:">
                <el-col :span="4">
                  <el-select v-model="addForm.exhibitionNum" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in exhibitionSessionArr" :label="item.exhibitionNum"
                    :value="item.exhibitionNum" :key="item.exhibitionId"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="调研方案名称:" prop="surveyName">
                <el-col :span="4">
                  <el-input v-model="addForm.surveyName"></el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="申报类型:" prop="declareType">
                <el-radio-group v-model="addForm.declareType">
                  <el-radio label="1" @click.native="limitNunber">制定展位数量</el-radio>
                  <el-radio label="0">不限制展位数量</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="交易团:">
                <el-col :span="6">
                  <el-checkbox :indeterminate="isIndeterminateDele" v-model="checkAll" @change="handleCheckAllDeleChange">全选</el-checkbox><br>
                  <el-checkbox-group v-model="depSchemeLks">
                    <el-checkbox v-for="(item, index) in deptArr" :label="item.deptCode" :key="index">{{item.deptName}}</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item label="调研展区:" prop="exhibitionAreaCodes">
                <el-col :span="6">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox><br>
                  <el-checkbox-group v-model="addForm.exhibitionAreaCodes">
                    <el-checkbox v-for="(item, index) in exhibitionAreaArr" :label="item.itemCode" :key="index">{{item.itemText}}</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-form-item>
            </el-row>
          </el-form>

          <!--表单提交/返回按钮-->
          <div class="submit_div">
            <el-button type="primary" @click="onSubmit('addForm')" class="submit_btn">提交</el-button>
            <el-button class="submit_btn" @click="backSearchSchemes">返回</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "unlimitedNumExhibitAreas",
  data() {
    return {
      addForm: {
        schemeLks: [],
        surveyName: '',
        exhibitionNum: "",
        declareType: '0', // 0:不限制展位数量,1:限制展位数量
        exhibitionAreaCodes: []
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      },
      deptArr: [],
      checkAll: false,
      depSchemeLks: [],
      activeName: 'first',
      delegationCodes: [],
      dialogVisible: false,
      isIndeterminate: true,
      isIndeterminateDele: true,
      exhibitionAreaArr: [],
      formLabelWidth: '120px',
      exhibitionSessionArr: [],
      formRules: { // 表单校验
        declareType: [{ required: true, trigger: "change" }],
        surveyName: [{ required: true, message: "方案名称A", trigger: "change" }],
        exhibitionAreaCodes: [{ required: true, message: "请选择展区", trigger: "change" }]
      },
      uploadParams: {}
    };
  },
  // watch: {
  //   "addForm.ifoBoothApply.boothNum": function(newV, oldV) {
  //     let value = newV;
  //     this.addForm.boothArea = value * 9;
  //   }
  // },
  mounted() {
    // 获取所有届数信息
    this.getListAll().then(res => {
      for (let i = 0; i < res.length; i++) {
        this.exhibitionSessionArr.push(res[i] || '');
      }
    });

    // 根据展届展期获取展区和专区的信息
    this.findDicItemListByExhibiArea().then(res => {
      this.exhibitionAreaArr = res.records;
    });

    // 获取交易团
    this.searchBusinessDelegation(this.tradingParams).then(res => {
      // 遍历交易团
      for (let i = 0; i < res.records.length; i++) {
        this.deptArr.push(res.records[i] || '');
      }
    });
  },
  methods: {
    ...mapActions("enterpriseBooth", ["getListAll"]), // 获取所有届数信息
    ...mapActions("enterpriseBooth", ["searchBusinessDelegation"]), // 获取交易团
    ...mapActions("enterpriseBooth", ["findDicItemListByExhibiArea"]), // 根据字典获取展区
    ...mapActions("enterpriseBooth", ["surveySchemeAddTypeZero"]), // 展位数量 设定需求申报类型(不限制数量) 新增

    handleCheckAllDeleChange(val) { // 交易团 全选
      let temp = [];
      for (let key in this.deptArr) {
        temp.push(this.deptArr[key].deptCode);
      }
      this.depSchemeLks = val ? temp : [];
      this.isIndeterminateDele = false;
    },
    handleCheckAllChange(val) { // 调研展区 全选
      let temp = [];
      for (let key in this.exhibitionAreaArr) {
        temp.push(this.exhibitionAreaArr[key].itemCode);
      }
      this.addForm.exhibitionAreaCodes = val ? temp : [];
      this.isIndeterminate = false;
    },
    // 修改、新增
    onSubmit(addForm) {
      // 交易团参数
      let temp = [];
      let duplicateArr = [];
      this.deptArr.forEach(item => {
        for (let i = 0; i < this.depSchemeLks.length; i++) {
          let searchArr = {};

          if (this.depSchemeLks[i] === item.deptCode) {
            searchArr.delegationId = item.deptId;
            searchArr.delegationCode = item.deptCode;
            searchArr.delegationName = item.deptName;

            // 添加选中的交易团
            temp.push(searchArr);
          }
        }
      });

      // 去除空对象
      for (let j in temp) {
        for (let prop in temp[j]) {
          if (prop !== '' || temp[j][prop] !== '') {
            duplicateArr.push(temp[j]);
          }
        }
      }

      (function() { //去除数组中重复对象
        var unique = {};
        duplicateArr.forEach(function(a) {
          unique[ JSON.stringify(a) ] = 1;
        });
        duplicateArr = Object.keys(unique).map(function(u) {
          return JSON.parse(u);
        });
        return duplicateArr;
      })(duplicateArr);
      this.addForm.schemeLks = duplicateArr;

      this.$refs[addForm].validate((valid) => {
        if (valid) {
          // 数组转换字符串
          this.addForm.exhibitionAreaCodes = JSON.parse(JSON.stringify(this.addForm.exhibitionAreaCodes)).join(',');
          this.surveySchemeAddTypeZero(this.addForm).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功!'
            });

            this.$router.replace('/researchSchemesList');
          });
        } else {
          return false;
        }
      });
    },
    // 返回
    backSearchSchemes() {
      this.$router.replace('/researchSchemesList');
    },
    // 限制展位数量
    limitNunber() {
      this.$router.push('/limitNumExhibitAreas');
    }

  }
};
</script>

<style scoped>
.addBooth{
  width: 100%;
  margin: 0 auto;
}
.submit_div{
  margin: 30px 0 50px 170px;
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
