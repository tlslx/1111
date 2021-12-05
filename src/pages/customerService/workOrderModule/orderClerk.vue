/**
 * @file 接单员设置
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="接单员设置" name="three">
      <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm" :rules="rules">
        <el-form-item label="展览名称：" prop="exhName">
          <div style="width:100%;">
            <el-select class="small-select-width" v-model="ruleForm.exhName" clearable>
              <el-option label="4平方米洽谈桌" value="1"></el-option>
              <el-option label="5平方米洽谈桌" value="2"></el-option>
              <el-option label="6平方米洽谈桌" value="3"></el-option>
            </el-select>
            <el-popover placement="right" trigger="click">
              <el-table border v-loading="loading">
                <el-table-column label="展览时间" prop="sessionNum" align="center"></el-table-column>
                <el-table-column label="展览统称" prop="issueNum" align="center"></el-table-column>
                <el-table-column label="展览名称（中）" prop="place" align="center"></el-table-column>
                <el-table-column label="操作" prop="operate" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" @click="checkDetail(scope.row)">选择</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button slot="reference" type="text" @click="isShow = !isShow">获取信息</el-button>
            </el-popover>
          </div>
        </el-form-item>
        <el-form-item label="部门：" prop="deptName">
          <el-select class="small-select-width" v-model="ruleForm.deptName" clearable>
            <el-option label="信息化部" value="1"></el-option>
            <el-option label="保卫部" value="2"></el-option>
            <el-option label="研发部" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接单员：" prop="acceptorName">
          <el-select class="small-select-width" v-model="ruleForm.acceptorName" clearable>
            <el-option label="李飞" value="1"></el-option>
            <el-option label="李伟明" value="2"></el-option>
            <el-option label="陈玉霞" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input class="small-select-width" v-model="ruleForm.mobile" placeholder="张"></el-input>
        </el-form-item>
        <el-form-item label="展区：" prop="area">
          <el-select class="small-select-width" v-model="ruleForm.area" clearable>
            <el-option label="A区" value="1"></el-option>
            <el-option label="B区" value="2"></el-option>
            <el-option label="C区" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展厅：" prop="hall">
          <el-select class="small-select-width" v-model="ruleForm.hall" clearable>
            <el-option label="1.1" value="1"></el-option>
            <el-option label="1.2" value="2"></el-option>
            <el-option label="1.3" value="3"></el-option>
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
      loading: '',
      activeName: "three",
      isShow: false,
      exhNames: [], // 展览名称字典
      deptNames: [], // 部门字典
      acceptorNames: [],
      areas: [],
      halls: [],
      ruleForm: {
        exhName: "",
        deptName: "",
        acceptorName: "",
        mobile: "",
        area: "",
        hall: ""
      },
      rules: {
        exhName: [{ required: true, message: "请选择", trigger: "change" }],
        deptName: [{ required: true, message: "请选择", trigger: "change" }],
        acceptorName: [{ required: true, message: "请选择", trigger: "change" }],
        mobile: [{ required: true, message: "请输入", trigger: "blur" }],
        area: [{ required: true, message: "请选择", trigger: "change" }],
        hall: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  computed: {
    ...mapGetters('receiver', []),
    ...mapGetters('dictionary', ['dictionaryData'])
  },
  // async beforeCreate() {
  //   this.exhNames = await kindo.dictionary.get('exhNames');
  //   this.deptNames = await kindo.dictionary.get('deptNames');
  //   this.acceptorNames = await kindo.dictionary.get('acceptorNames');
  //   this.areas = await kindo.dictionary.get('areas');
  //   this.halls = await kindo.dictionary.get('halls');
  // },
  methods: {
    ...mapActions('receiver', ['addworkAcceptorInfo']),
    handleClick(tab, event) {

    },
    // 表单提交
    submitForm(formName) {
      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.addworkAcceptorInfo(this.ruleForm).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.$router.push('/receiverList');
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
  width: 100%;
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
  width: 200px;
}
</style>
