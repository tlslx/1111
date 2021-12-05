/**
 * @file 新建手工工单
 */
<template>
  <div class="outer-home-page" v-loading="loading">
    <el-card class="box-card">
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="新建手工工单" name="first">
            <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="demo-ruleForm" :rules="rules">
              <el-form-item label="展览名称：" prop="exhName">
                <div style="width:100%;">
                  <el-input style="width:560px;" clearable v-model="ruleForm.exhName"></el-input>
                  <el-popover placement="right" trigger="click">
                    <el-table border v-loading="loading">
                      <el-table-column label="展览时间" prop="sessionNum" align="center"></el-table-column>
                      <el-table-column label="展览统称" prop="issueNum" align="center"></el-table-column>
                      <el-table-column label="展览名称（中）" prop="place" align="center"></el-table-column>
                      <el-table-column label="操作" prop="operate" align="center"></el-table-column>
                    </el-table>
                    <el-button slot="reference" type="text" @click="isShow = !isShow">获取信息</el-button>
                  </el-popover>
                </div>
              </el-form-item>
              <el-form-item label="标题">
                <el-input style="width:560px;" v-model="ruleForm.workTitle"></el-input>
              </el-form-item>
              <el-form-item label="内容">
                <el-input type="textarea" v-model="ruleForm.workDetails"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="展厅：" prop="exhibitionHall">
                    <el-select v-model="ruleForm.exhibitionHall" clearable>
                      <el-option label="1.1" value="1"></el-option>
                      <el-option label="1.2" value="2"></el-option>
                      <el-option label="1.3" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="展区：" prop="exhibitionArea">
                    <el-select v-model="ruleForm.exhibitionArea" clearable>
                      <el-option label="A区" value="1"></el-option>
                      <el-option label="B区" value="2"></el-option>
                      <el-option label="C区" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="期数：" prop="numberPeriods">
                    <el-select v-model="ruleForm.numberPeriods" clearable>
                      <el-option label="第120期" value="1"></el-option>
                      <el-option label="第121期" value="2"></el-option>
                      <el-option label="第122期" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <el-card class="box-card">
      <div>
        <div slot="header" class="clearfix">
          <span>● 指定负责人</span>
        </div>
        <div>
          <el-form class="search-form-inline">
            <el-form-item>
              <el-button type="warning" @click="openCope">新增</el-button>
              <el-dialog :visible.sync="OpenCopeExhibitionReceiver">
                <el-form :model="form" label-position="right" label-width="1px">
                  <el-form-item label="项目细则：" prop="projectDetails">
                    <el-select v-model="form.project.projectDetails" v-on:change="selectProject" clearable>
                      <el-option v-for="item in projectDetailsOps" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="科室班组编码：" prop="deptId">
                    {{form.workAcceptorHall.deptName}}
                  </el-form-item>
                  <el-form-item label="科室班组编码：" prop="deptId">
                    {{form.workAcceptorHall.deptId}}
                  </el-form-item>
                  <el-form-item label="科室班组名称：" prop="deptName">
                    {{form.workAcceptorHall.deptName}}
                  </el-form-item>
                  <el-form-item label="区域：" prop="area">
                    {{form.project.area}}
                  </el-form-item>
                  <el-form-item label="负责人：" prop="chargeName">
                    {{form.project.chargeName}}
                  </el-form-item>
                  <el-form-item label="手机：" prop="chargePhone">
                    {{form.workAcceptorHall.chargePhone}}
                  </el-form-item>
                  <el-form-item label="座机：" prop="linkTel">
                    {{form.workAcceptorHall.linkTel}}
                  </el-form-item>
                  <el-form-item class="el-form-item-btn">
                    <el-button class="btn1" @click="OpenCopeExhibitionReceiver = false">确认</el-button>
                    <el-button class="btn2" @click="OpenCopeExhibitionReceiver = false">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </el-form-item>
          </el-form>
          <el-table border :data="workProjectData" v-loading="loading">
            <el-table-column label="科室班组编码" prop="workAcceptorHall.deptId" align="center"></el-table-column>
            <el-table-column label="科室班组名称" prop="workAcceptorHall.deptName" align="center"></el-table-column>
            <el-table-column label="区域" prop="project.area" align="center"></el-table-column>
            <el-table-column label="负责人" prop="project.chargeName" align="center"></el-table-column>
            <el-table-column label="手机" prop="workAcceptorHall.chargePhone" align="center"></el-table-column>
            <el-table-column label="座机" prop="workAcceptorHall.linkTel" align="center"></el-table-column>
            <el-table-column label="操作" prop="operate" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="deleteUser(scope.row)">删除</el-button>
                <el-button type="text" @click="modifyUser(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <div slot="header" class="clearfix">
          <span>● 附件表</span>
        </div>
        <div>
          <el-upload class="upload-demo" :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="description" list-type="picture">
            <el-button size="small" type="primary">上传</el-button>
          </el-upload>
          <el-table border :data="description" v-loading="loading">
            <el-table-column label="附件描述" prop="name" align="center"></el-table-column>
            <el-table-column label="操作" prop="operate" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
     <div v-if="form.workAcceptorHall.deptName==='设备组'">
        <div slot="header" class="clearfix">
          <span>● 设备明细</span>
        </div>
        <div>
          <el-form class="search-form-inline">
            <el-form-item>
              <el-button type="warning" @click="openCopeEquipment">新增</el-button>
              <el-dialog :visible.sync="OpenDetailEquipment">
                <el-form :model="form" label-position="right" label-width="1px">
                  <el-form-item label="设备名称：" prop="projectDetails">
                    <el-select v-model="form.project.projectDetails" v-on:change="selectProject" clearable>
                      <el-option v-for="item in projectDetailsOps" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="数量：" prop="deptId">
                    {{form.workAcceptorHall.deptName}}
                  </el-form-item>
                  <el-form-item label="安装地点：" prop="deptId">
                    {{form.workAcceptorHall.deptId}}
                  </el-form-item>
                  <el-form-item class="el-form-item-btn">
                    <el-button class="btn1" @click="OpenDetailEquipment = false">确认</el-button>
                    <el-button class="btn2" @click="OpenDetailEquipment = false">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </el-form-item>
          </el-form>
          <el-table border :data="workProjectData" v-loading="loading">
            <el-table-column label="设备名称" prop="workAcceptorHall.deptId" align="center"></el-table-column>
            <el-table-column label="数量" prop="workAcceptorHall.deptName" align="center"></el-table-column>
            <el-table-column label="安装地点" prop="project.area" align="center"></el-table-column>
            <el-table-column label="操作" prop="operate" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="deleteUser(scope.row)">删除</el-button>
                <el-button type="text" @click="modifyUser(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div style="margin:0px auto;text-align:center">
        <el-form>
          <el-form-item class="el-form-item-btn">
            <el-button type="warning" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="revert">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      // 上传图片地址
      uploadUrl: process.env.API_KHFW_URL + '/api/workOrder/uploadFile',
      loading: '',
      activeName: "first",
      OpenCopeExhibitionReceiver: false,
      OpenDetailEquipment: false,
      exhibitionHalls: [],
      exhibitionAreas: [],
      numberPeriodsOps: [],
      areas: [],
      exhibitionNumber: [],
      projectDetailsOps: [],
      deptNames: [],
      description: [{
        name: '',
        url: ''
      }],
      workProjectData: [{
        project: "",
        workAcceptorHall: ""
      }],
      ruleForm: {
        exhName: "",
        workTitle: "",
        workDetails: "",
        exhibitionHall: "",
        exhibitionArea: "",
        numberPeriods: "",
        projectId: "",
        chargeId: "",
        workType: "2" // 手工工单
      },
      form: {
        project: {
          area: "",
          chargeName: "",
          projectDetails: ""
        },
        workAcceptorHall: {
          deptId: "",
          deptName: "",
          chargePhone: "",
          linkTel: ""
        }

      },
      rules: {
        exhName: [{ required: true, message: "请输入", trigger: "blur" }],
        workTitle: [{ required: true, message: "请输入", trigger: "blur" }],
        workDetails: [{ required: true, message: "请输入", trigger: "blur" }],
        isForm: [{ required: true, message: "请选择", trigger: "change" }],
        height: [{ required: true, message: "请选择", trigger: "change" }],
        numberPeriods: [{ required: true, message: "请选择", trigger: "change" }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  created() {
    let _this = this;
    this.loading = true;
    this.selectByArea(this.serviceByArea).then(response => {
      for (let i in response.records) {
        _this.projectDetailsOps.push({
          value: i,
          label: response.records[i].project.projectDetails
        });
      }
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('orderSetting', ['workProject', 'byArea']),
    serviceByArea() {
      return {
        projectName: "",
        chargeName: "",
        area: "",
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  methods: {
    ...mapActions('OrdersReminders', ['selectListWorkOrder', 'addWorkOrderInfo']),
    ...mapActions('orderSetting', ['selectWorkProject']),
    ...mapActions('orderSetting', ['selectByArea']),
    selectProject(val) {
      var obj = {};
      obj = this.projectDetailsOps.find(item => {
        return item.value === val;
      });
      let _this = this;
      this.loading = true;
      this.selectByArea(this.serviceByArea).then(response => {
        for (let i in response.records) {
          if (obj.label === response.records[i].project.projectDetails) {
            _this.ruleForm.chargeId = response.records[i].workAcceptorHall.chargeId;
            _this.ruleForm.projectId = response.records[i].project.projectId;
            _this.selectWorkProject(_this.ruleForm.projectId).then(response2 => {
              this.workProjectData.push({
                project: response2.project,
                workAcceptorHall: response2.workAcceptorHall
              });
              this.workProjectData.splice(0, 1);
              this.form = response2;
            }).catch(e => {
            });
          }
        }
        _this.loading = false;
      }).catch(e => {
        _this.loading = false;
      });
    },
    modifyUser(row) {
      console.log(row.project.projectId, "222");
      this.$router.push({
        path: '/modifyOrderServiceItems',
        query: {
          id: row.project.projectId
        }
      });
    },
    deleteUser(row) {
      let projectId = row.project.projectId;
      console.log(row.project.projectId, "222");
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let _this = this;
        this.loading = true;
        this.deleteAcceptorHallInfo(projectId).then(response => {
          console.log("2222");
          _this.selectByArea(this.serviceByArea).then(response2 => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(e => {
          });
          _this.loading = false;
        }).catch(e => {
          _this.loading = false;
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 表单提交
    submitForm(formName) {
      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.addWorkOrderInfo(this.ruleForm).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.$router.push('/myWorkOrde');
          });
        } else {
          return false;
        }
      });
    },
    openCopeEquipment() {
      this.OpenDetailEquipment = true;
      let _this = this;
      this.loading = true;
      this.selectListWorkOrder(this.listWorkOrderQuery).then(response => {
        _this.loading = false;
      }).catch(e => {
        _this.loading = false;
      });
    },
    openCope() {
      this.OpenCopeExhibitionReceiver = true;
      let _this = this;
      this.loading = true;
      this.selectListWorkOrder(this.listWorkOrderQuery).then(response => {
        _this.loading = false;
      }).catch(e => {
        _this.loading = false;
      });
    },
    handleClick(tab, event) {

    },
    feedback() {

    },
    revert() {

    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    }

  }
};
</script>
<style scoped>
.clearfix {
  font-weight: bold;
  margin: 12px;
}
</style>