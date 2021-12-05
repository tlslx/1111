/**
 * @file 施工组设置
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="施工组设置" name="three">
      <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm" :rules="rules">
        <el-form-item label="接单员：" prop="acceptorName">
          <el-select class="small-select-width" v-model="ruleForm.acceptorName" v-on:change="select" clearable>
            <el-option v-for="item in acceptorNames" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="施工组：" prop="constructionGroup">
          <el-input class="small-select-width" v-model="ruleForm.constructionGroup"></el-input>
        </el-form-item>
        <el-form-item label="施工单位名称：" prop="constructionGroupName">
          <el-input class="small-select-width" v-model="ruleForm.constructionGroupName"></el-input>
        </el-form-item>
        <el-form-item label="施工人员：" prop="constructionNames">
          <el-input class="small-select-width" v-model="ruleForm.constructionNames" placeholder="施工人员之间逗号隔开"></el-input>
        </el-form-item>
        <el-form-item label="无账号施工人员手机号：" prop="noAccountPhone">
          <el-input class="small-select-width" v-model="ruleForm.noAccountPhone"></el-input>
        </el-form-item>
        <!-- <el-form-item  v-for="(item, index) in ruleForm.moreNotify" label="施工人员：" :key="item.key" :prop="'moreNotify.' + index +'.constructionName'">
          <div style="width:100%;">
            <el-input class="small-select-width" v-model="item.constructionName" placeholder="请输入"></el-input>
            <el-button type="text" @click="deleteRules(item, index)">❌</el-button>
            <el-button type="text" @click="addUser()">➕</el-button>
          </div>
        </el-form-item>
        <el-form-item  v-for="(item, index) in ruleForm.moreObject" label="无账号施工人员手机号：" :key="item.key" :prop="'moreObject.' + index +'.noAccountPhone'">
          <div style="width:100%;">
            <el-input class="small-select-width" v-model="item.noAccountPhone" placeholder="请输入"></el-input>
            <el-button type="text" @click="deletePhone(item, index)">❌</el-button>
            <el-button type="text" @click="addPhone()">➕</el-button>
          </div>
        </el-form-item> -->
        <el-form-item label="负责的展区：" prop="area">
          <el-select class="small-select-width" v-model="ruleForm.area" clearable>
            <el-option label="全部" value="1"></el-option>
            <el-option label="部分" value="2"></el-option>
            <el-option label="小部分" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责的展厅：" prop="hall">
          <el-select class="small-select-width" v-model="ruleForm.hall" clearable>
            <el-option label="全部" value="1"></el-option>
            <el-option label="部分" value="2"></el-option>
            <el-option label="小部分" value="3"></el-option>
          </el-select>
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
      acceptorNames: [], 
      areas: [], 
      halls: [], 
      ruleForm: {
        acceptorName: "",
        constructionGroup: "",
        constructionGroupName: "",
        noAccountPhone: "",
        area: "",
        hall: "",
        constructionName: "",
        acceptorRowId: ""
        // moreNotify: [{
        //   constructionName: ''
        // }],
        // moreObject: [{
        //   noAccountPhone: ''
        // }]
      },
      rules: {
        acceptorName: [{ required: true, message: "请选择", trigger: "change" }],
        constructionGroup: [{ required: true, message: "请输入", trigger: "blur" }],
        constructionGroupName: [{ required: true, message: "请输入", trigger: "blur" }],
        constructionName: [{ required: true, message: "请输入", trigger: "blur" }],
        noAccountPhone: [{ required: true, message: "请输入", trigger: "blur" }],
        area: [{ required: true, message: "请输入", trigger: "blur" }],
        hall: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  created() {
    let _this = this;
    this.loading = true;
    this.selectList().then(response => {
      for (let i in response.records) {
        _this.acceptorNames.push({
          value: i,
          label: response.records[i].acceptorName
        });
      }
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('orderSetting', []),
    ...mapGetters('receiver', ['list']),
    ...mapGetters('dictionary', ['dictionaryData'])
    // initData() {
    //   this.ruleForm.moreNotify = [];
    //   this.ruleForm.moreObject = [];
    // }
  },
  // async beforeCreate() {
  //   this.acceptorNames = await kindo.dictionary.get('acceptorNames'); 
  //   this.areas = await kindo.dictionary.get('areas'); 
  //   this.halls = await kindo.dictionary.get('halls'); 
  // },
  methods: {
    ...mapActions('orderSetting', ['addGroupInfo']),
    ...mapActions('receiver', ['selectList']),
    // addPhone() {
    //   this.ruleForm.moreObject.push({
    //     noAccountPhone: ''
    //   });
    // },
    // deletePhone(item, index) {
    //   this.index = this.ruleForm.moreObject.indexOf(item);
    //   if (index !== -1) {
    //     this.ruleForm.moreObject.splice(index, 1);
    //   }
    // },
    // addUser() {
    //   this.ruleForm.moreNotify.push({
    //     constructionName: ''
    //   });
    // },
    // deleteRules(item, index) {
    //   this.index = this.ruleForm.moreNotify.indexOf(item);
    //   if (index !== -1) {
    //     this.ruleForm.moreNotify.splice(index, 1);
    //   }
    // },
    handleClick(tab, event) {

    },
    // 表单提交
    submitForm(formName) {
      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.addGroupInfo(this.ruleForm).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.$router.push('/constructionGroupList');
          });
        } else {
          return false;
        }
      });
    },
    // 取消返回列表页
    toBack() {
      this.$router.back();
    },
    select(val) {
      var obj = {};
      obj = this.acceptorNames.find(item => {
        return item.value === val;
      });
      let _this = this;
      this.loading = true;
      this.selectList().then(response => {
        for (let i in response.records) {
          if (obj.label === response.records[i].acceptorName) {
            this.ruleForm.acceptorRowId = response.records[i].acceptorRowId;
          }
        }
        _this.loading = false;
      }).catch(e => {
        _this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.demo-ruleForm{
  margin:30px 0px 12px 0px;
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
.el-form-item-btn {
  position: relative;
  left: 26%;
  margin-top: 50px;
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
  width: 170px;
}
</style>
