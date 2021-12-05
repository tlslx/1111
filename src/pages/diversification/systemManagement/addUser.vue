/**
* @file 新增用户 编辑用户
* @author:wanglifeng
* @date:2019/1/19
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="用户基本信息" name="first">
      <el-form ref="form"
        :model="form"
        label-width="180px"
        :rules="formRules"
        >
        <el-row>
          <el-form-item label="用户类型" class="inline-item" prop="userType"  >
            <el-radio-group v-model="form.userType" size="small" @change="showExpert" :disabled="isUpdate" >
              <el-radio label="1" >工作人员</el-radio>
              <el-radio label="0">评审专家</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="姓名" class="inline-item" size="small" prop="userName" >
            <el-input v-model="form.userName" maxlength="50"></el-input>
          </el-form-item>
        </el-row>
        <!-- <el-row>
          <el-form-item label="工作部门：" prop="workDeptName"  size="small" class="inline-item">
            <el-select v-model="form.workDeptName"  placeholder="请选择" @focus ="showDept"></el-select>
          </el-form-item>
        </el-row> -->

        <el-row>
          <el-form-item label="账号" class="inline-item" size="small" prop="account" >
            <el-input v-model="form.account" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码" class="inline-item" size="small" prop="idCardNo" >
            <el-input v-model="form.idCardNo"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="性别" class="inline-item" size="small" prop="sex" >
            <el-radio-group v-model="form.sex">
            <el-radio v-model="form.sex" label="男" >男</el-radio>
            <el-radio v-model="form.sex" label="女" >女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="国籍" class="inline-item" size="small" prop="nationality" >
            <el-input v-model="form.nationality" placeholder="请输入国籍" maxlength="20"></el-input>
          </el-form-item>
        </el-row>
        <!-- <el-row>
          <el-form-item label="生日" class="inline-item" size="small" >
              <el-date-picker type="date" placeholder="选择日期" v-model="form.birthdate" style="width: 100%;" prop="birthdate" clearable :picker-options="pickerOptionsTh"></el-date-picker>
          </el-form-item>
        </el-row> -->
        <el-row>
          <el-form-item label="手机号" class="inline-item" size="small" prop="mobile" >
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" class="inline-item" size="small" prop="email" >
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="开始时间" class="inline-item" size="small" prop="startDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.startDate" style="width: 100%;" prop="startDate" :picker-options="pickerOptionsOne"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" class="inline-item" size="small" prop="endDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" style="width: 100%;" prop="endDate" clearable :picker-options="pickerOptionsTwo"></el-date-picker>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="地址" class="block-item" size="small" prop="addr" >
            <el-input v-model="form.addr" maxlength="200"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="状态" class="block-item" size="small" prop="state" >
            <el-select v-model="form.state" placeholder="请选择">
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
          </el-form-item>
        <el-form-item>
        </el-form-item>
        </el-row>
      </el-form>
      <el-form
        label-width="180px"
        :model="expertForm"
        :rules="expertFormRules"
        ref="expertForm"
        v-show="expert === true"
      >
<!--评审专家信息-->
        <h3>评审专家信息</h3>
        <el-row>
          <el-form-item label="职务" class="inline-item" size="small" prop="position" >
            <el-input v-model="expertForm.position" maxlength="50"></el-input>
          </el-form-item>

        </el-row>
        <el-row>
          <el-form-item label="中文名" class="inline-item" size="small" prop="nameCn">
            <el-input v-model="expertForm.nameCn" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="英文名" class="inline-item" size="small" prop="nameEn">
            <el-input v-model="expertForm.nameEn" maxlength="50"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="曾获奖项名称(中文)：" class="block-item" size="small" prop="awardNameCn">
            <el-input v-model="expertForm.awardNameCn" placeholder="曾获奖项名称(中文)" maxlength="128"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="曾获奖项名称(英文)：" class="block-item" size="small" prop="awardNameEn">
            <el-input v-model="expertForm.awardNameEn" placeholder="曾获奖项名称(英文)" maxlength="128"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="单位名称中文：" class="block-item" size="small" prop="unitCn">
            <el-input v-model="expertForm.unitCn" placeholder="单位名称中文" maxlength="128"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="单位名称英文：" class="block-item" size="small" prop="unitEn">
            <el-input v-model="expertForm.unitEn" placeholder="单位名称英文" maxlength="128"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="简历：" class="block-item" size="small" prop="resume">
            <el-input type="textarea" v-model="expertForm.resume" maxlength="512"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="照片:" class="block-item" size="small" prop="imagePath">
           <el-upload
                v-model="expertForm.imagePath"
                class="upload-demo"
                ref="upload"
                :action="uploadApi"
                :headers="header"
                accept="image/jpeg"
                :limit="1"
                :data="uploadParams"
                :on-exceed="onMaterialExceed"
                :before-upload="beforeUpload"
                :on-remove="handleRemove"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :file-list="fileList"
                >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
          <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          </el-form-item>
        </el-row>
      </el-form>
        <div class="submit_div">
          <el-button type="primary" @click="onSubmit('form')" class="submit_btn">确认</el-button>
          <el-button class="submit_btn" @click="clearForm">返回</el-button>
        </div>
    </el-tab-pane>
    <!-- <el-dialog title="工作部门" :visible.sync="chooseDept">
        <el-tree
          :props="dataT"
          :load="loadNode1"
          node-key="id"
          @check-change="orgCheckChange"
          lazy
          ref="tree"
          :check-strictly="true"
          show-checkbox>
        </el-tree>
        <div class="dialog-footer">
          <el-button type="primary" @click="getNode">确 定</el-button>
          <el-button @click="chooseDept = false">取 消</el-button>
        </div>
      </el-dialog> -->
  </el-tabs>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "addUser",
  data() {

    let checkCn = (rule, value, callback) => {
      let errors = [];
      let regRule = /^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$/;
      if (!regRule.test(value) && value !== "") {
        errors.push(new Error("请输入中文、“●”"));
      }
      callback(errors);
    };
    let checkEn = (rule, value, callback) => {
      let errors = [];
      let regRule = /^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z0-9]*[a-zA-Z0-9]+$/;
      if (!regRule.test(value) && value !== "") {
        errors.push(new Error("请输入字母、数字、括号、字符间支持一个空格"));
      }
      callback(errors);
    };
    return {
      activeName: 'first',
      chooseDept: false,
      deIds: [],
      fileList: [],
      isUpdate: false,
      uploadParams: {},
      uploadApi: '',
      baseApi: process.env.API_CF_URL,
      newDeptId: [],
      expert: false,
      dialogImageUrl: '',
      dialogVisible: false,
      statusOptions: [
        {
          value: 0,
          label: "禁用"
        },
        {
          value: 1,
          label: "启用"
        }
      ],
      header: {
        Token: this.$store.state.token
      },
      // pickerOptionsTh: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now() - 8.64e6;
      //   }
      // },
      pickerOptionsOne: {
        disabledDate: (time) => {
          if (this.form.endDate != null && this.form.endDate !== undefined) {
            return time.getTime() > this.form.endDate;
          }
        }
      },
      pickerOptionsTwo: {
        disabledDate: (time) => {
          if (this.form.startDate != null && this.form.startDate !== undefined) {
            return time.getTime() < this.form.startDate;
          }
        }
      },
      test: {},
      form: {
        mobile: '',
        account: '',
        email: '',
        endDate: undefined,
        idCardNo: '',
        addr: '',
        nationality: '',
        sex: '男',
        startDate: undefined,
        userName: '',
        userType: '1',
        workDeptCode: "",
        workDeptId: "",
        workDeptName: "",
        userId: "",
        state: 1

      },
      expertForm: {
        nameCn: '',
        nameEn: '',
        position: '',
        awardNameCn: '',
        awardNameEn: '',
        unitCn: '',
        unitEn: '',
        resume: '',
        country: '',
        imagePath: "",
        "subaccountId": ""

      },
      dataT: {
        id: "",
        label: 'name',
        children: [],
        isLeaf: 'leaf'
      },

      expertFormRules: {
        nameCn: [{ required: false, message: "", trigger: "blur", validator: checkCn },
        { message: "长度超过限制（64）", trigger: "blur", max: 64 }],
        nameEn: [{ required: false, message: "", trigger: "blur", validator: checkEn },
        { message: "长度超过限制（64）", trigger: "blur", max: 64 }],
        position: [{ message: "长度超过限制（64）", trigger: "blur", max: 64 }],
        awardNameCn: [{ required: false, message: "", trigger: "blur", validator: checkCn },
        { message: "长度超过限制（128）", trigger: "blur", max: 128 }],
        awardNameEn: [{ required: false, message: "", trigger: "blur", validator: checkEn },
        { message: "长度超过限制（128）", trigger: "blur", max: 128 }],
        unitEn: [{ required: false, message: "", trigger: "blur", validator: checkEn },
        { message: "长度超过限制（128）", trigger: "blur", max: 128 }],
        unitCn: [{ required: false, message: "", trigger: "blur", validator: checkCn },
        { message: "长度超过限制（128）", trigger: "blur", max: 128 }],
        resume: [{ message: "长度超过限制（512）", trigger: "blur", max: 512 }]
        // imagePath: [{ required: true, message: "照片不能为空", trigger: "blur" }]


      },
      formRules: {
        mobile: [{ required: true, message: "手机号不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的手机号"));
              }
              callback(errors);
            },
            trigger: "blur"
          }
        ],
        sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
        state: [{ required: true, message: "状态不能为空", trigger: "blur" }],
        account: [{ required: true, message: "账号不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let regRule = /[`~!@#$%^&*_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&* ——\-+={}|《》？：“”【】、；‘’，。、]/im;
              let space = /\s+/g;
              if (regRule.test(value) || space.test(value)) {
                return callback(new Error("不能输入特殊字符"));
              } else {
                return callback();
              }
            },
            trigger: "blur"
          },
          { message: "长度超过限制（50）", trigger: "blur", max: 50 }
        ],
        // birthdate: [{ required: true, message: "生日不能为空", trigger: "blur" }],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的邮箱格式"));
              }
              callback(errors);
            },
            trigger: "blur"
          }
        ],
        endDate: [{ required: true, message: "结束日期不能为空", trigger: "blur" }],
        startDate: [{ required: true, message: "开始日期不能为空", trigger: "blur" }],
        addr: [{ required: true, message: "地址不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let regRule = /[`~!@#$%^&*_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&* ——\-+={}|《》？：“”【】、；‘’，。、]/im;
              let space = /\s+/g;
              if (regRule.test(value) || space.test(value)) {
                return callback(new Error("不能输入特殊字符"));
              } else {
                return callback();
              }
            },
            trigger: "blur"
          },
          { message: "长度超过限制（255）", trigger: "blur", max: 255 }
        ],
        nationality: [{ required: true, message: "国籍不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let regRule = /[`~!@#$%^&*_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&* ——\-+={}|《》？：“”【】、；‘’，。、]/im;
              let space = /\s+/g;
              if (regRule.test(value) || space.test(value)) {
                return callback(new Error("不能输入特殊字符"));
              } else {
                return callback();
              }
            },
            trigger: "blur"
          },
          { message: "长度超过限制（50）", trigger: "blur", max: 50 }
        ],
        userName: [{ required: true, message: "用户名不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let regRule = /[`~!@#$%^&*_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&* ——\-+={}|《》？：“”【】、；‘’，。、]/im;
              let space = /\s+/g;
              if (regRule.test(value) || space.test(value)) {
                return callback(new Error("不能输入特殊字符"));
              } else {
                return callback();
              }
            },
            trigger: "blur"
          },
          { message: "长度超过限制（50）", trigger: "blur", max: 50 }
        ],
        workDeptName: [{ required: true, message: "工作部门不能为空", trigger: "blur" }],
        userType: [{ required: true, message: "用户类型不能为空", trigger: "blur" }],
        idCardNo: [{ required: true, message: "身份证不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的身份证"));
              }
              callback(errors);
            },
            trigger: "blur"
          }
        ]
      }
    };

  },
  computed: {
    ...mapGetters('addUserInfo', ['getUserSave']),   // 用户新增
    ...mapGetters('addUserInfo', ['getSaveexpert']),   // 专家新增
    ...mapGetters('addUserInfo', ['updateById'])   // 用户修改

    // tableData() {
    //   return {
    //     data: this.data
    //   };
    // }
  },
  mounted() {
    this.uploadApi = this.baseApi + '/api/customservice/cf/uploadFile';

    let _this = this;
    if (this.$route.query.data) {
      let params = {};
      this.isUpdate = true;
      let currentObject = {};
      currentObject = JSON.parse(this.$route.query.data);
      for (let key in currentObject) {
        for (let formKey in _this.form) {
          if (key === formKey) {
            _this.form[formKey] = currentObject[key];
          }
        }
      }
      _this.form.userId = currentObject.userId;
      if (currentObject.userType === "0") {
        _this.getExpertByIdInfo(currentObject.userId).then(res => {
          params = res;
          for (let key in params) {
            for (let formKey in _this.expertForm) {
              if (key === formKey) {
                _this.expertForm[formKey] = params[key];
              }
            }
          }
        });
      }
    }
    if (this.form.userType === '1') {
      this.expert = false;
    } else if (this.form.userType === '0') {
      this.expert = true;

    }
  },
  methods: {
    ...mapActions('addUserInfo', ['getAddUserInfo']),   // 用户新增
    ...mapActions('addUserInfo', ['saveExpertInfo']),   // 专家新增
    ...mapActions('addUserInfo', ['updateByIdInfo']),   // 用户修改
    ...mapActions('addUserInfo', ['getListAllInfo']),   // 获取部门
    ...mapActions('addUserInfo', ['updateExpertInfo']),   // 专家修改
    ...mapActions("addUserInfo", ["getExpertByIdInfo"]), // 按ID查询专家
    ...mapActions("getUserManagement", ["deleteBatchIdsInfo"]), // 用户删除

   // 修改、新增
    onSubmit(formName) {
      // this.form.birthdate = $date.format(this.form.birthdate, 'yyyy-MM-dd');
      this.form.workDeptId = "4594a42e12394c31b9e1ce4945dc8f7c";
      this.form.workDeptName = "广交会展务事务";
      let _this = this;
      this.expertForm.nationality = this.form.nationality;
      let contForm = JSON.parse((JSON.stringify(this.form) + JSON.stringify(this.expertForm)).replace(/}{/, ','));
      this.$refs[formName].validate(valid => {
        if (valid) {

          if (this.form.userType === '0') {
            _this.$refs.expertForm.validate((valid2) => {
              if (valid2) {
                if (_this.form.userId !== "") {
                  this.updateExpertInfo(contForm).then(res => {
                    this.updateByIdInfo(contForm).then(resT => {
                      _this.$router.push('/userManagement');
                      _this.$message({
                        type: 'success',
                        message: '修改成功!'
                      });
                    }).catch(e => {
                      _this.$message.error(e);
                      return false;
                    });
                  }).catch(e => {
                    _this.$message.error(e);
                    return false;
                  });
                } else {
                  this.deIds = [];
                  this.getAddUserInfo(this.form).then(res => {
                    contForm["subaccountId"] = res.userId;
                    this.deIds.push(res.userId);
                    this.saveExpertInfo(contForm).then(resT => {
                      _this.$router.push('/userManagement');
                      _this.$message({
                        type: 'success',
                        message: '新增成功!'
                      });
                    }).catch(e => {
                      _this.deleteBatchIdsInfo(this.deIds).then(resM => {
                      });
                      _this.$message.error(e);
                      return false;
                    });
                  }).catch(e => {
                    _this.$message.error(e);
                    return false;
                  });
                }
              } else {
                _this.$message({
                  type: 'error',
                  message: '有评审专家信息填写不规范!'
                });
                return false;
              }
            });
          } else if (this.form.userType === '1') {
            if (this.form.userId !== "") {
              this.updateByIdInfo(this.form).then(res => {
                _this.$router.push('/userManagement');
                _this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
              }).catch(e => {
                _this.$message.error(e);
                return false;
              });
            } else {
              this.getAddUserInfo(this.form).then(res => {
                _this.$router.push('/userManagement');
                _this.$message({
                  type: 'success',
                  message: '新增成功!'
                });
              }).catch(e => {
                _this.$message.error(e);
                return false;
              });
            }
          }
        }
      });

    },
    showExpert() {
      if (this.form.userType === '1') {
        this.expert = false;
      } else if (this.form.userType === '0') {
        this.expert = true;

      }
    },
    // 工作部门树节点懒加载
    loadNode1(node, resolve) {
      let json = {
        "OrderModelField": [{
          "OrderByField": "orderNo",
          "asc": true
        }],
        "CustomQueryParams": [{
          "Name": "parentId",
          "FindType": "EQ",
          "Values": ["0"]
        }, {
          "Name": "State",
          "FindType": "EQ",
          "Values": ["1"]
        }]
      };
      for (let k = 0; k < 5; k++) {
        if (node.level === (k - 1)) {
          return resolve([]);
        }
        if (node.level === k) {
          if (node.data !== undefined) {
            json.CustomQueryParams[0].Values[0] = node.data.id;
          }
          this.getListAllInfo(json).then(res => {
            let arr = [];
            for (let i = 0; i < res.records.length; i++) {
              arr.push({ name: res.records[i].deptName, id: res.records[i].deptId });

            }
            return resolve(arr);
          });
        }
      }
    },
    // 给部门赋值
    getNode() {
      this.chooseDept = false;
      this.newDeptId = this.$refs.tree.getCheckedNodes();
      this.form.workDeptId = this.newDeptId[0].id;
      this.form.workDeptName = this.newDeptId[0].name;

    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    clearForm() {
      this.$refs['form'].resetFields();
      this.$refs['expertForm'].resetFields();
      this.$router.push('/userManagement');
    },
    // 打开部门选择树形弹框
    showDept() {
      this.chooseDept = true;
    },
    // 设置部门只能单选
    orgCheckChange(data, checked, node) {
      if (checked === true) {
      //   let json = {
      //     "OrderModelField": [{
      //       "OrderByField": "orderNo",
      //       "asc": true
      //     }],
      //     "CustomQueryParams": [{
      //       "Name": "parentId",
      //       "FindType": "EQ",
      //       "Values": [data.id]
      //     }, {
      //       "Name": "State",
      //       "FindType": "EQ",
      //       "Values": ["1"]
      //     }]
      //   };
      //   this.getListAllInfo(json).then(res => {
      //     if (res.records.length > 0) {
      //       for (let i = 0; i < res.records.length; i++) {
      //         this.$refs.tree.setCheckedKeys([res.records[i].deptId]);
      //         console.log([res.records[i].deptId]);
      //       }
      //       // this.$refs.tree.setCheckedKeys([data.id]);
      //     }

      //   });
        this.$refs.tree.setCheckedNodes([data]);

      }
    },
    beforeUpload(file) {
      // this.dialogruleForm.files = file;
      // 进行图片大小验证
      let testPdf = file.type === "image/jpeg";
      if (!testPdf && !testFileType) {
        this.$message.warning("文件格式上传错误!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.warning("上传文件大小不能超过 5MB!");
        return false;
      }
      this.uploadParams.file = file;
      this.uploadParams.code = 1;
      return true;
    },
    uploadSuccess(res, file) {
      if (res.flag === "0") {
        this.$refs.upload.clearFiles();
        this.$message.error("照片上传失败");
      } else {
        this.$message.success("照片上传成功");
        this.expertForm.imagePath = res.data;
      }
    },
    uploadError() {
      this.$message.error("照片上传失败");
    },
    onMaterialExceed() {
      this.$message.error("只能上传一份照片！");
    }

  }
};
</script>

<style scoped>
.el-form-item{
  margin-bottom: 30px;
}
.inline-item{
  display: inline-block;
  width: 43%;
  margin-left: 3%;
}
.block-item{
  width: 89%;
  margin-left: 3%;
}
.submit_div{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 50px;
}
.submit_btn{
  text-align: center;
  margin-right: 10px;
  margin-left: 10px;
  /* width: 80px; */

}
.dialog-footer{
  text-align: center;
  margin-top: 30px;
  padding-bottom: 10px;
}
</style>
