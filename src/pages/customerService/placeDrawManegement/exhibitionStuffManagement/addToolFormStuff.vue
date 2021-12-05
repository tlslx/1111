/**
 * @file 添加展具/组成展材
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="添加展具/组成展材" name="three">
      <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm" :rules="rules">
        <el-form-item label="一级分类名称：" prop="typeName">
          <el-select v-model="ruleForm.typeName" v-on:change="selectSecond" clearable>
            <el-option v-for="item in typeNames" v-bind:key="'one'+item.value" v-bind:value="item.value" v-bind:label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类名称：" prop="secondTypeName">
          <el-select v-model="ruleForm.secondTypeName" clearable>
            <el-option v-for="item in secondTypeNames" v-bind:key="item.value" v-bind:value="item.value" v-bind:label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展具编号：" prop="exhibitionNumber">
          <el-input v-model="ruleForm.exhibitionNumber" placeholder="02122052"></el-input>
        </el-form-item>
        <el-form-item label="名称：" prop="exhibitionName">
          <el-input v-model="ruleForm.exhibitionName" placeholder="四米帐篷"></el-input>
        </el-form-item>
        <el-form-item label="计量单位：" prop="unitMeasurement">
          <el-input v-model="ruleForm.unitMeasurement" placeholder="张"></el-input>
        </el-form-item>
        <el-form-item label="数量：" prop="exhibitionQuantity">
          <el-input v-model="ruleForm.exhibitionQuantity" placeholder="12"></el-input>
        </el-form-item>
        <el-form-item label="规格：" prop="specification">
          <el-input v-model="ruleForm.specification" placeholder="2900*495*4200"></el-input>
        </el-form-item>
        <el-form-item label="长：" prop="length">
          <el-input v-model="ruleForm.length" placeholder="2900mm"></el-input>
        </el-form-item>
        <el-form-item label="宽：" prop="width">
          <el-input v-model="ruleForm.width" placeholder="495mm"></el-input>
        </el-form-item>
        <el-form-item label="高：" prop="height">
          <el-input v-model="ruleForm.height" placeholder="4200mm"></el-input>
        </el-form-item>
        <el-form-item label="是否为组成展具：" prop="isForm">
          <el-select v-model="ruleForm.isForm" clearable>
            <el-option label="是" value="shi"></el-option>
            <el-option label="否" value="fou"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组成展材数量：" prop="quantity">
          <el-input v-model="ruleForm.quantity" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="是否合成：" prop="isMixture">
          <el-select v-model="ruleForm.isMixture" clearable>
            <el-option label="是" value="shi"></el-option>
            <el-option label="否" value="fou"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可重叠：" prop="isOverlapping">
          <el-select v-model="ruleForm.isOverlapping" clearable>
            <el-option label="是" value="shi"></el-option>
            <el-option label="否" value="fou"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否含层板：" prop="isLaminate">
          <el-select v-model="ruleForm.isLaminate" clearable>
            <el-option label="是" value="shi"></el-option>
            <el-option label="否" value="fou"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="层距：" prop="layerSpacing">
          <el-input v-model="ruleForm.layerSpacing" placeholder="75/40/40/40"></el-input>
        </el-form-item>
        <el-form-item label="是否固定：" prop="isFixed">
          <el-select v-model="ruleForm.isFixed" clearable>
            <el-option label="是" value="shi"></el-option>
            <el-option label="否" value="fou"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可视：" prop="isVisible">
          <el-select v-model="ruleForm.isVisible" clearable>
            <el-option label="是" value="shi"></el-option>
            <el-option label="否" value="fou"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="效果图：" prop="rendering">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="施工图例：" prop="constructionLegend">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="拆除图例：" prop="removeLegend">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="适用范围：" prop="scopeApplication">
          <el-select v-model="ruleForm.ifSee" clearable>
            <el-option label="A区" value="A"></el-option>
            <el-option label="B区" value="B"></el-option>
            <el-option label="C区" value="C"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="约束规则：" prop="constraints">
          <el-button type="primary" @click="ruleDialogVisible = true">添加规则</el-button>
          <el-dialog title="约束规则" :visible.sync="ruleDialogVisible" width="70%">
            <el-form class="script-form" :model="ruleForm" ref="ruleForm" label-width="190px">
              <el-form-item label="展具名称：">
                {{ruleForm.exhibitionName}}
              </el-form-item>
              <div v-if="isShow">
                <el-form-item label="属性分类：">
                  <div style="width:100%;">
                    <el-select class="small-select-width" v-model="ruleForm.attributeName" clearable v-on:change="selectConstraint">
                      <el-option v-for="item in attributeNameOps"  v-bind:key="item.value"  v-bind:value="item.value"  v-bind:label="item.label"></el-option>
                    </el-select>
                    <el-button type="primary" @click="addUser()" class="btn-margin">新增</el-button>
                  </div>
                </el-form-item>
                <el-form-item label="属性分类名称：">
                  <el-checkbox-group class="scope-item property-scope-checks" v-model="ruleForm.constraintRuleTowldChoose">
                    <el-checkbox v-for="property in constraintRuleTowldChoose"  v-bind:label="property.label"  v-bind:key="property.value"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
              <div class="moreRules">
                <div class="moreRulesIn" v-for="(item, index) in ruleForm.moreNotifyObject" :key="item.key">
                  <el-form-item label="属性分类：" :prop="'moreNotifyObject.' + index +'.attributeName'">
                    <div style="width:100%;">
                      <el-select class="small-select-width" v-model="item.attributeName" v-on:change="selectConstraint" clearable>
                        <el-option v-for="bunch in attributeNameOps" v-bind:key="bunch.value" v-bind:value="bunch.value" v-bind:label="bunch.label"></el-option>
                      </el-select>
                      <el-button type="primary" @click="addNewUser(item, index)" class="btn-margin" v-if="!isShow">新增</el-button>
                      <el-button @click="deleteRules(item, index)" v-if="isShow">删除</el-button>
                    </div>
                  </el-form-item>
                  <el-form-item label="属性分类名称：" :prop="'moreNotifyObject.'+ index +'.constraintRuleTowldChoose'">
                    <el-checkbox-group class="scope-item property-scope-checks" v-model="item.constraintRuleTowldChoose">
                      <el-checkbox v-for="property in constraintRuleTowldChoose" v-bind:label="property.label" v-bind:value="property.value" v-bind:key="property.value"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </div>
              </div>
              <el-form-item class="el-form-btn">
                <el-button class="btn1" @click="submit">提交</el-button>
                <el-button class="btn2"  @click="ruleDialogVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-form-item>
        <el-form-item label="约束规则一：" v-if="isRuleShow">
          {{ruleForm.moreNotifyObject.attributeName}}
          {{ruleForm.moreNotifyObject.constraintRuleTowldChoose}}
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm('ruleForm')">提交</el-button>
          <el-button class="btn2" @click="toBack">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: "three",
      dialogImageUrl: '',
      dialogVisible: false,
      ruleDialogVisible: false,
      isShow: false,
      isRuleShow: false,
      typeNames: [], // 一级分类字典
      secondTypeNames: [], // 一级分类字典
      attributeNameOps: [], // 属性分类字典
      constraintRuleIdOps: [], // 属性分类id字典
      constraintRuleTowldChoose: [],
      constraintRuleId: '', // 属性id分类
      ruleForm: {
        typeName: "",
        secondTypeName: "",
        exhibitionNumber: "",
        exhibitionName: "",
        unitMeasurement: "",
        exhibitionQuantity: "",
        specification: "",
        length: "",
        width: "",
        height: "",
        isForm: "",
        quantity: "",
        isMixture: "",
        isOverlapping: "",
        isLaminate: "",
        layerSpacing: "",
        isFixed: "",
        isVisible: "",
        rendering: "",
        constructionLegend: "",
        removeLegend: "",
        scopeApplication: "",
        constraints: "",
        attributeName: '', // 属性分类
        constraintRuleTowldChoose: [],
        moreNotifyObject: [{
          attributeName: '',
          constraintRuleTowldChoose: []
        }]
      },
      rules: {
        typeName: [{ required: true, message: "请选择", trigger: "change" }],
        secondTypeName: [{ required: true, message: "请选择", trigger: "change" }],
        exhibitionNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        exhibitionName: [{ required: true, message: "请输入", trigger: "blur" }],
        unitMeasurement: [{ required: true, message: "请输入", trigger: "blur" }],
        exhibitionQuantity: [{ required: true, message: "请输入", trigger: "blur" }],
        specification: [{ required: true, message: "请输入", trigger: "blur" }],
        length: [{ required: true, message: "请输入", trigger: "blur" }],
        width: [{ required: true, message: "请输入", trigger: "blur" }],
        height: [{ required: true, message: "请输入", trigger: "blur" }],
        isForm: [{ required: true, message: "请选择", trigger: "change" }],
        quantity: [{ required: true, message: "请输入", trigger: "blur" }],
        isMixture: [{ required: true, message: "请选择", trigger: "change" }],
        isOverlapping: [{ required: true, message: "请选择", trigger: "change" }],
        isLaminate: [{ required: true, message: "请选择", trigger: "change" }],
        layerSpacing: [{ required: true, message: "请输入", trigger: "blur" }],
        isFixed: [{ required: true, message: "请选择", trigger: "change" }],
        isVisible: [{ required: true, message: "请选择", trigger: "change" }],
        rendering: [{ required: true, message: " ", trigger: "blur" }],
        constructionLegend: [{ required: true, message: " ", trigger: "blur" }],
        removeLegend: [{ required: true, message: " ", trigger: "blur" }],
        scopeApplication: [{ required: true, message: "请选择", trigger: "change" }],
        constraints: [{ required: true, message: " ", trigger: "blur" }]
      }
    };
  },
  created() {
    let _this = this;
    this.loading = true;
    this.selectListAllTwo().then(response => {
      for (let i in response) {
        _this.typeNames.push({
          value: i,
          label: response[i].typeName
        });
      }
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
    this.selectListAllRule().then(response => {
      for (let i in response) {
        _this.attributeNameOps.push({
          value: i,
          label: response[i].attributeName
        });
      }
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('categoryManagement', []),
    initData() {
      this.ruleForm.moreNotifyObject = [];
    }
  },
  methods: {
    ...mapActions('categoryManagement', ['addExhibitionInfo', 'selectListAllTwo', 'selectListAllRule', 'selectListAllRuleTwo']),
    submit() {
      this.isRuleShow = true;
      this.ruleDialogVisible = false;
    },
    selectConstraint(val) {
      var obj = {};
      this.constraintRuleTowldChoose = [];
      obj = this.attributeNameOps.find(item => {
        return item.value === val;
      });
      let _this = this;
      this.loading = true;
      this.selectListAllRule().then(response => {
        for (let i in response) {
          if (obj.label === response[i].attributeName) {
            _this.constraintRuleId = response[i].constraintRuleId;
            _this.select();
            return;
          }
        }
        _this.loading = false;
      }).catch(e => {
        _this.loading = false;
      });

    },
    select() {
      let _this = this;
      this.loading = true;
      this.selectListAllRuleTwo(_this.constraintRuleId).then(response => {
        for (let i in response) {
          _this.constraintRuleTowldChoose.push({
            value: i,
            label: response[i].constraintRuleTowId
          });
        }
        _this.loading = false;
      }).catch(e => {
        _this.loading = false;
      });
    },
    selectSecond(val) {
      var obj = {};
      obj = this.typeNames.find(item => {
        return item.value === val;
      });
      let _this = this;
      this.loading = true;
      this.selectListAllTwo().then(response => {
        for (let i in response) {
          if (obj.label === response[i].typeName) {
            _this.secondTypeNames.push({
              value: i,
              label: response[i].secondTypeName
            });
          }
        }
        _this.loading = false;
      }).catch(e => {
        _this.loading = false;
      });
    },
    addNewUser(item, index) {
      this.isShow = true;
      this.ruleForm.moreNotifyObject.push({
        attributeName: '',
        constraintRuleTowldChoose: ''
      });
      this.deleteRules(item, index);
      this.constraintRuleTowldChoose = [];
    },
    addUser() {
      this.isShow = true;
      this.ruleForm.moreNotifyObject.push({
        attributeName: '',
        constraintRuleTowldChoose: ''
      });
    },
    deleteRules(item, index) {
      this.index = this.ruleForm.moreNotifyObject.indexOf(item);
      if (index !== -1) {
        this.ruleForm.moreNotifyObject.splice(index, 1);
      }
    },
    handleClick(tab, event) {

    },
    handleRemove(file, fileList) {

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 表单提交
    submitForm(formName) {
      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.addExhibitionInfo(this.ruleForm).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.$router.push('/categoryManagement');
          });
        } else {
          return false;
        }
      });
    },
    // 取消返回列表页
    toBack() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.demo-ruleForm {
  margin: 30px 0px 12px 0px;
}
.div_hint {
  color: red;
  position: relative;
  left: 30%;
  margin-top: 30px;
}
.el-form-item {
  width: 500px;
  position: relative;
  left: 20%;
}
.el-form-btn {
  position: relative;
  margin-top: 50px;
  margin-right: 200px;
}
.el-form-item-btn {
  position: relative;
  left: 26%;
  margin-top: 50px;
  text-align: center;
}
.btn1 {
  background-color: red;
  width: 120px;
  height: 40px;
  color: white;
}
.btn2 {
  background-color: white;
  width: 120px;
  height: 40px;
}
.small-select-width {
  width: 200px;
}
</style>
