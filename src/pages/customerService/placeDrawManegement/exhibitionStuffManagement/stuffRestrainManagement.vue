/**
* @file  展具约束规则管理
* @author:xujinlei
* @date:2019/5/09
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展具约束规则管理" name="first">
      <el-form class="script-form" :model="scriptForm" ref="scriptForm" label-width="190px">
        <el-form-item label="展具名称：">
          <el-select class="small-select-width" v-model="scriptForm.exhibitionName" clearable>
            <el-option v-for="item in exhibitionNames" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <div v-if="isShow">
        <el-form-item label="属性分类：">
          <div style="width:100%;">
            <el-select class="small-select-width" v-model="scriptForm.attributeName" clearable>
              <el-option v-for="item in attributeNameOps" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
            <el-button type="primary" @click="addUser()" class="btn-margin">新增</el-button>
          </div>
        </el-form-item>
        <el-form-item label="属性分类名称：">
          <el-checkbox-group class="scope-item property-scope-checks" v-model="scriptForm.constraintRuleTowldChoose">
            <el-checkbox v-for="property in constraintRuleTowldChooseList" :label="property" :key="property">{{property}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        </div>
        <div class="moreRules" >
          <div class="moreRulesIn" v-for="(item, index) in scriptForm.moreNotifyObject" :key="item.key">
            <el-form-item label="属性分类：" :prop="'moreNotifyObject.' + index +'.attributeName'">
              <div style="width:100%;">
              <el-select class="small-select-width" v-model="item.attributeName" clearable>
                <el-option v-for="bunch in attributeNameOps" :key="bunch.value" :value="bunch.value" :label="bunch.label"></el-option>
              </el-select>
              <el-button type="primary" @click="addNewUser(item, index)" class="btn-margin" v-if="!isShow">新增</el-button>
              <el-button @click="deleteRules(item, index)" v-if="isShow">删除</el-button>
              </div>
            </el-form-item>
            <el-form-item label="属性分类名称：" :prop="'moreNotifyObject.'+ index +'.constraintRuleTowldChoose'">
              <el-checkbox-group class="scope-item property-scope-checks" v-model="item.constraintRuleTowldChoose">
                <el-checkbox v-for="property in constraintRuleTowldChooseList" :label="property" :key="property">{{property}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
        </div>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm('scriptForm')">提交</el-button>
          <el-button class="btn2" @click="resetForm('scriptForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "brandBoothConfirm",
  data() {
    return {
      activeName: 'first',
      exhibitionNames: [], // 展具名称字典
      attributeNameOps: [], // 属性分类字典
      constraintRuleTowldChooseList: [], // 属性分类名称字典
      isShow: false,
      scriptForm: {
        exhibitionName: '', // 展具名称
        attributeName: '', // 属性分类
        radio: '', // 属性分类名称
        moreNotifyObject: [{
          attributeName: '',
          constraintRuleTowldChoose: ''
        }]
      }
    };
  },
  computed: {
    ...mapGetters('categoryManagement', []),
    initData() {
      this.scriptForm.moreNotifyObject = [];
    }
  },
  mounted() {

  },
  methods: {
    ...mapActions('common', ['getSessionInfo']),
    addNewUser(item, index) {
      this.isShow = true;
      this.scriptForm.moreNotifyObject.push({
        attributeName: '',
        constraintRuleTowldChoose: ''
      });
      this.deleteRules(item, index);
    },
    addUser() {
      this.isShow = true;
      this.scriptForm.moreNotifyObject.push({
        attributeName: '',
        constraintRuleTowldChoose: ''
      });
    },
    deleteRules(item, index) {
      this.index = this.scriptForm.moreNotifyObject.indexOf(item);
      if (index !== -1) {
        this.scriptForm.moreNotifyObject.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
.script-form {
  width: 60%;
  margin: 0 auto;
}
.property-scope-checks {
  margin-left: 152px;
}
.el-form-item-btn {
  position: relative;
  left: 20%;
  margin-top: 50px;
}
.small-select-width {
  width: 100px;
}
</style>
