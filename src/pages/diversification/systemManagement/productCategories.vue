/**
* @file 产品大类管理
* @author:wanglifeng
* @date:2019/1/16
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="产品大类管理" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="活动编号:" size="mini" prop="activityCode">
          <el-select v-model="ruleForm.activityCode" placeholder="请选择">
             <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.activityCode"
              :value="item.activityCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button @click="submitForm()" type="primary">查询</el-button>
          <el-button @click="resetForm()" type="primary">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row class="btn-row">
        <el-button type="primary" @click="toAdd" >新增</el-button>
        <el-button type="primary" @click="handleImports">一键导入</el-button>
      </el-row>

      <template>
        <el-table
          :data="newData"
          border
          @selection-change="handleSelectionChange"
          style="width: 100%;"
          >
          <el-table-column
            prop="productCategoryCode"
            label="产品大类编号"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="productCategoryNameCn"
            label="产品大类名称"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="firstPassRate"
            label="初评通过率"
            align="center"
            width="100">
            <template slot-scope="scope">
              <span>{{scope.row.firstPassRate}} %</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="firstUpLimit"
            label="初评投票上限"
            align="center"
            width="120">
            <template slot-scope="scope">
              <span>{{scope.row.firstUpLimit}} %</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="firstDownLimit"
            label="初评投票下限"
            align="center"
            width="120">
            <template slot-scope="scope">
              <span>{{scope.row.firstDownLimit}} %</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="finalUpLimit"
            label="终评投票上限"
            align="center"
            width="120">
            <template slot-scope="scope">
              <span>{{scope.row.finalUpLimit}} %</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="finalDownLimit"
            label="终评投票下限"
            align="center"
            width="120">
            <template slot-scope="scope">
              <span>{{scope.row.finalDownLimit}} %</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            width="250">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row, scope.index)" type="text" size="small">修改</el-button>
              <el-button @click="handleDelete(scope.row, scope.index)" type="text" size="small">删除</el-button>
              <el-button type="text" @click="awardSetting(scope.row, scope.index)">奖项设置</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="false"
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="ruleForm.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="ruleForm.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalDatas"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </template>

      <!--新增产品大类弹窗-->
      <el-dialog :title="categoryDialogName" :visible.sync="dialogProduct" class="formProduct" width="450px" :close-on-click-modal="false">
        <el-form
        ref="formProduct"
        :model="formProduct"
        :rules="formRules"
        label-width="120px"
        >
          <el-form-item label="大类名称" prop="productCategoryNameCn" class="elForm">
            <el-input v-model="formProduct.productCategoryNameCn" autocomplete="off" class="addCategory"></el-input>
          </el-form-item>
          <el-form-item label="大类名称(英文)" prop="productCategoryNameEn" class="elForm">
            <el-input v-model="formProduct.productCategoryNameEn" autocomplete="off" class="addCategory"></el-input>
          </el-form-item>
          <el-form-item label="初评通过率" prop="firstPassRate" class="elForm">
            <el-input  v-model.number="formProduct.firstPassRate" @input = "formProduct.firstPassRate=formProduct.firstPassRate.replace(/[^\d]/g,'')" autocomplete="off" class="addCategory"></el-input> %
          </el-form-item>
          <el-form-item label="初评投票上限" prop="firstUpLimit" class="elForm">
            <el-input  v-model.number="formProduct.firstUpLimit" @input = "formProduct.firstUpLimit=formProduct.firstUpLimit.replace(/[^\d]/g,'')" autocomplete="off" class="addCategory"></el-input> %
          </el-form-item>
          <el-form-item label="初评投票下限" prop="firstDownLimit" class="elForm">
            <el-input  v-model.number="formProduct.firstDownLimit" @input = "formProduct.firstDownLimit=formProduct.firstDownLimit.replace(/[^\d]/g,'')" autocomplete="off" class="addCategory"></el-input> %
          </el-form-item>
          <el-form-item label="终评投票上限" prop="finalUpLimit" class="elForm">
            <el-input  v-model.number="formProduct.finalUpLimit"  @input = "formProduct.finalUpLimit=formProduct.finalUpLimit.replace(/[^\d]/g,'')" autocomplete="off" class="addCategory"></el-input> %
          </el-form-item>
          <el-form-item label="终评投票下限" prop="finalDownLimit" class="elForm">
            <el-input  v-model.number="formProduct.finalDownLimit" @input = "formProduct.finalDownLimit=formProduct.finalDownLimit.replace(/[^\d]/g,'')" autocomplete="off" class="addCategory"></el-input> %
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="productAdd('formProduct')">确 定</el-button>
          <el-button @click="dialogProduct = false">取 消</el-button>
        </div>
      </el-dialog>
      <!--奖项设置弹窗-->
      <el-dialog title="CF奖项设置" :visible.sync="dialogAwardSetting" :close-on-click-modal="false" width="660px">
        <el-form :inline="true" :model="formAward" :rules="formRules" ref="formAward">
          <el-row>
            <el-form-item label="金奖数量" :label-width="formLabelWidth" prop="[0].awardNumber">
              <el-input v-model.number="formAward[0].awardNumber" @input = "formAward[0].awardNumber=formAward[0].awardNumber.replace(/[^\d]/g,'')" autocomplete="off" style="width: 90px"></el-input>
            </el-form-item>

            <el-form-item label="模板" prop="goldFile">
              <el-upload
                :headers="header"
                class="upload-demo"
                :action="uploadApi"
                :on-exceed="goldAwardExceed"
                :before-upload="goldAwardBeforeUpload"
                :on-remove="goldAwardRemove"
                :on-success="goldAwardUploadSuccess"
                :on-error="goldAwardUploadError"
                :data="uploadData"
                :file-list="files"
                :show-file-list="false"
                ref="goldupload">
              <el-button class="uploadbtn" slot="trigger" size="small" type="primary" v-if="isGoldUploading">上传中...</el-button>
              <el-button class="uploadbtn" slot="trigger" size="small" type="primary" v-else>{{formAward[0].awardTemplateId ? '重新上传' : '浏览'}}</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <span class="filename" v-if="!formAward[0].awardTemplateId">{{defaultShowStr}}</span>
              <a class="filename" target="_blank" v-else :href="showFilePath(formAward[0].awardTemplateId)">{{formAward[0].fileName}}</a>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="银奖数量" :label-width="formLabelWidth"  prop="[1].awardNumber">
              <el-input v-model.number="formAward[1].awardNumber" autocomplete="off"  @input = "formAward[1].awardNumber=formAward[1].awardNumber.replace(/[^\d]/g,'')" style="width: 90px"></el-input>
            </el-form-item>
            <el-form-item label="模板" prop="silverFile">
              <el-upload
                :headers="header"
                class="upload-demo"
                :action="uploadApi"
                :data="uploadData"
                :on-exceed="goldAwardExceed"
                :before-upload="silverAwardBeforeUpload"
                :on-remove="goldAwardRemove"
                :on-success="silverAwardUploadSuccess"
                :on-error="goldAwardUploadError"
                ref="silverupload"
                :show-file-list="false"
                :file-list="files">
                <el-button class="uploadbtn" slot="trigger" size="small" type="primary" v-if="isSliverUploading">上传中...</el-button>
                <el-button size="small" type="primary" v-else class="uploadbtn">{{formAward[1].awardTemplateId ? '重新上传' : '浏览'}}</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <span class="filename" v-if="!formAward[1].awardTemplateId">{{defaultShowStr}}</span>
              <a class="filename" target="_blank" v-else :href="showFilePath(formAward[1].awardTemplateId)">{{formAward[1].fileName}}</a>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="铜奖数量" :label-width="formLabelWidth" prop="[2].awardNumber">
              <el-input v-model.number="formAward[2].awardNumber"  @input = "formAward[2].awardNumber=formAward[2].awardNumber.replace(/[^\d]/g,'')" autocomplete="off" style="width: 90px"></el-input>
            </el-form-item>
            <el-form-item label="模板" prop="bronzeFile">
              <el-upload
                :headers="header"
                class="upload-demo"
                :action="uploadApi"
                :on-exceed="goldAwardExceed"
                :show-file-list="false"
                :before-upload="bronzeAwardBeforeUpload"
                :on-remove="goldAwardRemove"
                :on-success="bronzeAwardUploadSuccess"
                :on-error="goldAwardUploadError"
                ref="bronzeupload"
                :data="uploadData"
                :file-list="files">
                <el-button class="uploadbtn" slot="trigger" size="small" type="primary" v-if="isBronzeUploading">上传中...</el-button>
                <el-button class="uploadbtn" size="small" type="primary" v-else>{{formAward[2].awardTemplateId ? '重新上传' : '浏览'}}</el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-form-item>
            <el-form-item>
              <span class="filename" v-if="!formAward[2].awardTemplateId">{{defaultShowStr}}</span>
              <a class="filename" target="_blank" v-else :href="showFilePath(formAward[2].awardTemplateId)">{{formAward[2].fileName}}</a>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="入围奖数量" :label-width="formLabelWidth" prop="[3].awardNumber">
              <el-input v-model.number="formAward[3].awardNumber"  @input = "formAward[3].awardNumber=formAward[3].awardNumber.replace(/[^\d]/g,'')" autocomplete="off" style="width: 90px"></el-input>
            </el-form-item>
            <el-form-item label="模板" prop="ruweiFile">
              <el-upload
                :headers="header"
                class="upload-demo"
                :on-exceed="goldAwardExceed"
                :show-file-list="false"
                :before-upload="finalistAwardBeforeUpload"
                :on-remove="goldAwardRemove"
                :on-success="finalistAwardUploadSuccess"
                :on-error="goldAwardUploadError"
                :action="uploadApi"
                :data="uploadData"
                :file-list="files"
                ref="ruweiupload">
                <el-button class="uploadbtn" slot="trigger" size="small" type="primary" v-if="isRuweiUploading">上传中...</el-button>
                <el-button class="uploadbtn" size="small" type="primary" v-else>{{formAward[3].awardTemplateId ? '重新上传' : '浏览'}}</el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-form-item>
            <el-form-item>
              <span class="filename" v-if="!formAward[3].awardTemplateId">{{defaultShowStr}}</span>
              <a class="filename" target="_blank" v-else :href="showFilePath(formAward[3].awardTemplateId)">{{formAward[3].fileName}}</a>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="至尊奖模板" :label-width="formLabelWidth" prop="bestFile">
              <el-upload
                class="upload-demo"
                :headers="header"
                :action="uploadApi"
                :on-exceed="bestAwardExceed"
                :show-file-list="false"
                :before-upload="bestAwardBeforeUpload"
                :on-remove="bestAwardRemove"
                :on-success="bestAwardUploadSuccess"
                :on-error="bestAwardUploadError"
                :on-change="bestAwardChange"
                :data="uploadData"
                :file-list="files"
                ref="bestupload">
                <el-button class="uploadbtn" slot="trigger" size="small" type="primary" v-if="isBestUploading">上传中...</el-button>
                <el-button class="uploadbtn" size="small" type="primary" v-else>{{formAward[4].awardTemplateId ? '重新上传' : '浏览'}}</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <span class="filename" v-if="!formAward[4].awardTemplateId">{{defaultShowStr}}</span>
              <a class="filename" target="_blank" v-else :href="showFilePath(formAward[4].awardTemplateId)">{{formAward[4].fileName}}</a>
            </el-form-item>
          </el-row>
          <el-row>
            <span style="color: red;margin-left: 20px" >*</span>
            <span>上传的文件必须为pdf格式,且大小在5M以内</span>
          </el-row>

        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="saveAwardSetting()">确 定</el-button>
          <el-button @click="dialogAwardSetting = false">取 消</el-button>
        </div>
      </el-dialog>

    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "exhibitionAreaManagement",
  data() {
    let checkPerNum = (rule, value, callback) => {
      let regRule = /^(?:0|[0-9][0-9]?|100)$/;
      if (!regRule.test(value)) {
        return callback(new Error("请输入0-100的数字"));
      }
      return callback();
    };
    let checkPerNum1000 = (rule, value, callback) => {
      let regRule = /^((?!0)\d{1,3}|1000|0)$/;
      if (!regRule.test(value)) {
        return callback(new Error("请输入0-1000的数字"));
      }
      return callback();
    };
    return {
      baseApi: process.env.API_CF_URL,
      imageUrl: '',
      totalDatas: 0,
      activeName: 'first',
      uploadData: {
        code: 3
      },
      actCode: '',
      uploadApi: '',
      fileList: [],
      newData: [],
      options: [],
      tableData: [],
      header: {
        Token: this.$store.state.token
      },
      ruleForm: {
        activityCode: '',
        size: 10,
        current: 1
      },
      dialogProduct: false, // 产品列表弹窗
      dialogAwardSetting: false, // 奖项设置弹窗
      formLabelWidth: '120px',
      categoryDialogName: "新增产品大类",
      formProduct: {
        activityCode: '',
        productCategoryNameCn: '',
        productCategoryNameEn: '',
        firstUpLimit: 0,
        firstDownLimit: 0,
        finalUpLimit: 0,
        finalDownLimit: 0,
        firstPassRate: 0
      },
      files: [],
      defaultShowStr: '未上传',
      isGoldUploading: false,
      isSliverUploading: false,
      isBronzeUploading: false,
      isRuweiUploading: false,
      isBestUploading: false,

      goldFileName: '',
      sliverFileName: '',
      bronzeFileName: '',
      ruweiFileName: '',
      bestFileName: '',

      formAward: [
        {
          awardNumber: '',  // 金奖数量
          awardTemplateId: "",
          awardLevel: '2',
          productCategoryId: '',
          awardNumberId: '',
          fileName: ''
        },
        {
          awardNumber: '',  // 银奖数量
          awardTemplateId: "",
          awardLevel: '3',
          productCategoryId: '',
          awardNumberId: '',
          fileName: ''
        },
        {
          awardNumber: '',  // 铜奖数量
          awardTemplateId: "",
          awardLevel: '4',
          productCategoryId: '',
          awardNumberId: '',
          fileName: ''
        },
        {
          awardNumber: '',  // 入围奖数量
          awardTemplateId: "",
          awardLevel: '5',
          productCategoryId: '',
          awardNumberId: '',
          fileName: ''
        },
        {
          awardNumber: 0,  // 至尊金奖
          awardTemplateId: "",
          awardLevel: '1',
          productCategoryId: '',
          awardNumberId: '',
          fileName: ''
        }
      ],
      formRules: {
        "[0].awardNumber": [
          { required: true, message: "请输入获奖数量", trigger: "blur" },
          { validator: checkPerNum1000 }
        ],
        "[1].awardNumber": [
          { required: true, message: "请输入获奖数量", trigger: "blur" },
          { validator: checkPerNum1000 }
        ],
        "[2].awardNumber": [
          { required: true, message: "请输入获奖数量", trigger: "blur" },
          { validator: checkPerNum1000 }
        ],
        "[3].awardNumber": [
          { required: true, message: "请输入获奖数量", trigger: "blur" },
          { validator: checkPerNum1000 }
        ],
        goldFile: [
          { required: true, message: "请上传模板", trigger: "blur" }
        ],
        silverFile: [
          { required: true, message: "请上传模板", trigger: "blur" }
        ],
        bronzeFile: [
          { required: true, message: "请上传模板", trigger: "blur" }
        ],
        ruweiFile: [
          { required: true, message: "请上传模板", trigger: "blur" }
        ],
        bestFile: [
          { required: true, message: "请上传模板", trigger: "blur" }
        ],

        productCategoryNameCn: [{ required: true, message: "请输入正确的中文名", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$/;
              if (!regRule.test(value) && value !== "") {
                errors.push(new Error("请输入正确的中文名"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
          { message: "长度超过限制（32）", trigger: "blur", max: 32 }
        ],
        productCategoryNameEn: [{ required: true, message: "请输入正确的英文名", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^[a-zA-Z]+$/;
              if (!regRule.test(value) && value !== "") {
                errors.push(new Error("请输入正确的英文名"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
          { message: "长度超过限制（32）", trigger: "blur", max: 32 }
        ],
        firstPassRate: [{ required: true, message: "请输入初评通过率", trigger: "blur" },
          { validator: checkPerNum }],
        firstUpLimit: [
          { required: true, message: "请输入初评投票上限", trigger: "blur" },
          { validator: checkPerNum }
        ],
        firstDownLimit: [
          { required: true, message: "请输入初评投票下限", trigger: "blur" },
          { validator: checkPerNum }
        ],
        finalUpLimit: [
          { required: true, message: "请输入终评投票上限", trigger: "blur" },
          { validator: checkPerNum }
        ],
        finalDownLimit: [
          { required: true, message: "请输入终评投票下限", trigger: "blur" },
          { validator: checkPerNum }
        ]
      }
    };
  },
  mounted() {
    let _this = this;
    this.uploadApi = this.baseApi + '/api/customservice/cf/uploadFile';
    // 获取最新活动编号
    this.getLastActivityCodeInfo().then(res => {
      this.actCode = res.activityCode;
      this.ruleForm.activityCode = res.activityCode;
      // 查询产品大类列表
      _this.getListProductCategoryInfo(this.actCode).then(res2 => {
        _this.newData = res2.records;
        _this.totalDatas = res2.total;
      });
    });
    // 获取活动编号
    this.getCfActivityCodeInfo().then(res => {
      _this.options = res.records;
    });

  },
  computed: {
    ...mapGetters('getLastActivityCode', ['getLastCode']),   // 获取最新活动编号
    ...mapGetters('getLastActivityCode', ['getListCategory']),   // 查询产品大类列表
    ...mapGetters('getLastActivityCode', ['getcfCode']),   // 获取活动编号
    ...mapGetters('getLastActivityCode', ['delProductCat']),  // 产品大类删除
    ...mapGetters('getLastActivityCode', ['productSave']),   // 产品大类新增
    ...mapGetters('getLastActivityCode', ['productUpdate']),   // 产品大类修改
    ...mapGetters('getLastActivityCode', ['proCatLast'])   // 产品大类一键新增
  },
  methods: {
    ...mapActions('getLastActivityCode', ['getLastActivityCodeInfo']),   // 获取最近活动编号
    ...mapActions('getLastActivityCode', ['getListProductCategoryInfo']),   // 查询产品大类列表
    ...mapActions('getLastActivityCode', ['getCfActivityCodeInfo']),   // 获取活动编号
    ...mapActions('getLastActivityCode', ['deleteProductCategoryInfo']),   // 产品大类删除
    ...mapActions('getLastActivityCode', ['saveProductCategoryInfo']),   // 产品大类新增
    ...mapActions('getLastActivityCode', ['updateProductCategoryInfo']),   // 产品大类修改
    ...mapActions('getLastActivityCode', ['saveProductCategoryByLastestInfo']),   // 产品大类一键新增
    // 文件路径组装
    showFilePath(filePath) {
      return this.baseApi + '/api/customservice/cf/viewImage/' + filePath;
    },
    resetForm() {
      this.ruleForm.activityCode = this.actCode;
    },
    // 奖项设置
    awardSetting(row, index) {
      this.dialogAwardSetting = true;
      for (let i = 0, length = this.formAward.length; i < length; i++) {
        this.formAward[i].productCategoryId = row.productCategoryId;
        this.formAward[i].awardTemplateId = '';
        this.formAward[i].awardNumberId = '';
        this.formAward[i].fileName = '';
        this.formAward[i].awardNumber = 0;
      }
      this.formRules.goldFile = [{ required: true, message: "请上传模板", trigger: "blur" }];
      this.formRules.silverFile = [{ required: true, message: "请上传模板", trigger: "blur" }];
      this.formRules.bronzeFile = [{ required: true, message: "请上传模板", trigger: "blur" }];
      this.formRules.ruweiFile = [{ required: true, message: "请上传模板", trigger: "blur" }];
      this.formRules.bestFile = [{ required: true, message: "请上传模板", trigger: "blur" }];
      this.getAwardSetting(row.productCategoryId);
    },
    // 获取奖项信息
    getAwardSetting(productCategoryId) {
      this.$http.get(this.baseApi + '/api/customservice/cf/listAwardNumber', { productCategoryId: productCategoryId }).then((res) => {
        if (res.length > 0) {
          for (let i = 0, length = res.length; i < length; i++) {
            if (res[i].awardLevel === "1") {
              this.initAwardData(4, res[i]);
              this.formRules.bestFile = [];
            } else if (res[i].awardLevel === "2") {
              this.initAwardData(0, res[i]);
              this.formRules.goldFile = [];
            } else if (res[i].awardLevel === "3") {
              this.initAwardData(1, res[i]);
              this.formRules.silverFile = [];
            } else if (res[i].awardLevel === "4") {
              this.initAwardData(2, res[i]);
              this.formRules.bronzeFile = [];
            } else if (res[i].awardLevel === "5") {
              this.initAwardData(3, res[i]);
              this.formRules.ruweiFile = [];
            }
          }
        }
      }).catch((error) => {
        this.$message.error(error);
      });
    },
    initAwardData(i, resData) {
      this.formAward[i].awardLevel = resData.awardLevel;
      this.formAward[i].awardNumber = resData.awardNumber;
      this.formAward[i].awardTemplateId = resData.awardTemplateId;
      this.formAward[i].fileName = resData.fileName;
      this.formAward[i].productCategoryId = resData.productCategoryId;
      this.formAward[i].awardNumberId = resData.awardNumberId;
    },
    /*
     * 图片上传设置
     */
    // 金奖上传处理
    goldAwardExceed() {
      this.$message.error("只能上传一个文件");
    },
    goldAwardBeforeUpload(file) {
      this.goldFileName = file.name;
      this.formAward[0].fileName = file.name;
      // 格式及大小判断
      if (this.uploadFileTypeJuge(file)) {
        this.isGoldUploading = true;
        return true;
      } else {
        return false;
      }
    },
    goldAwardRemove(file, fileList) {

    },
    goldAwardUploadSuccess(res, file) {
      this.isGoldUploading = false;
      if (res.flag === "0") {
        this.$refs.goldupload.clearFiles();
        this.$message.success("模板上传失败");
        this.goldFileName = this.defaultShowStr;
      } else {
        this.formRules.goldFile = [];
        this.formAward[0].awardTemplateId = res.data;
        this.$message.success("模板上传成功");
        this.$refs.goldupload.clearFiles();
      }
    },
    goldAwardUploadError() {
      this.$message.error("模板上传错误");
    },

    // 银奖上传处理
    silverAwardBeforeUpload(file) {
      this.sliverFileName = file.name;
      this.formAward[1].fileName = file.name;
      // 格式及大小判断
      if (this.uploadFileTypeJuge(file)) {
        this.isSliverUploading = true;
        return true;
      } else {
        return false;
      }
    },
    silverAwardUploadSuccess(res, file) {
      this.isSliverUploading = false;
      if (res.flag === "0") {
        this.$refs.silverupload.clearFiles();
        this.$message.success("模板上传失败");
        this.sliverFileName = this.defaultShowStr;
      } else {
        this.formRules.silverFile = [];
        this.formAward[1].awardTemplateId = res.data;
        this.$message.success("模板上传成功");
        this.$refs.silverupload.clearFiles();
      }
    },

    // 铜奖上传处理
    bronzeAwardBeforeUpload(file) {
      this.bronzeFileName = file.name;
      this.formAward[2].fileName = file.name;
      // 格式及大小判断
      if (this.uploadFileTypeJuge(file)) {
        this.isBronzeUploading = true;
        return true;
      } else {
        return false;
      }
    },
    bronzeAwardUploadSuccess(res, file) {
      this.isBronzeUploading = false;
      if (res.flag === "0") {
        this.$refs.bronzeupload.clearFiles();
        this.$message.success("模板上传失败");
        this.bronzeFileName = this.defaultShowStr;
      } else {
        this.formRules.bronzeFile = [];
        this.formAward[2].awardTemplateId = res.data;
        this.$message.success("模板上传成功");
        this.$refs.bronzeupload.clearFiles();
      }
    },

    // 入围奖上传处理
    finalistAwardBeforeUpload(file) {
      this.ruweiFileName = file.name;
      this.formAward[3].fileName = file.name;
      // 格式及大小判断
      if (this.uploadFileTypeJuge(file)) {
        this.isRuweiUploading = true;
        return true;
      } else {
        return false;
      }
    },
    finalistAwardUploadSuccess(res, file) {
      this.isRuweiUploading = false;
      if (res.flag === "0") {
        this.$refs.ruweiupload.clearFiles();
        this.$message.success("模板上传失败");
        this.ruweiFileName = this.defaultShowStr;
      } else {
        this.formRules.ruweiFile = [];
        this.formAward[3].awardTemplateId = res.data;
        this.$message.success("模板上传成功");
        this.$refs.ruweiupload.clearFiles();
      }
    },
    // 至尊奖上传处理
    bestAwardExceed() {
      this.$message.error("只能上传一个文件");
    },
    bestAwardBeforeUpload(file) {
      this.bestFileName = file.name;
      this.formAward[4].fileName = file.name;
      if (this.uploadFileTypeJuge(file)) {
        this.isBestUploading = true;
        return true;
      } else {
        return false;
      }
    },
    bestAwardRemove(file, fileList) {

    },
    bestAwardUploadSuccess(res, file) {
      this.isBestUploading = false;
      if (res.flag === "0") {
        this.$refs.bestupload.clearFiles();
        this.$message.success("模板上传失败");
        this.bestFileName = this.defaultShowStr;
      } else {
        this.formRules.bestFile = [];
        this.formAward[4].awardTemplateId = res.data;
        this.$message.success("模板上传成功");
        this.$refs.bestupload.clearFiles();
      }
    },
    bestAwardUploadError() {
      this.$message.error("模板上传错误");
    },
    bestAwardChange(file, filelist) {

    },
    uploadFileTypeJuge(file) {
      // 进行pdf格式及大小验证
      let testPdf = file.type === "application/pdf";
      if (!testPdf) {
        this.$message.warning("文件格式上传错误!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.warning("上传文件大小不能超过 5MB!");
        return false;
      }
      return true;
    },
    // 保存奖项设置
    saveAwardSetting() {
      this.$refs["formAward"].validate((valid) => {
        if (valid) {
          this.$http.postJson(this.baseApi + '/api/customservice/cf/saveAwardNumber', this.formAward).then(res => {
            this.$message.success('奖项设置成功');
            this.dialogAwardSetting = false;
          }).catch(error => {
            this.$message.error(error);
          });
        } else {
          return false;
        }
      });
    },
    // 查询产品大类列表
    submitForm() {
      let _this = this;
      let params = this.ruleForm.activityCode + '&current=' + this.ruleForm.current + '&size=' + this.ruleForm.size;
      this.getListProductCategoryInfo(params).then(res2 => {
        _this.newData = res2.records;
        _this.totalDatas = res2.total;
      });
    },
    handleSizeChange(pageSize) {
      this.ruleForm.size = pageSize;
      this.submitForm();
    },
    handleCurrentChange(currentPage) {
      this.ruleForm.current = currentPage;
      this.submitForm();
    },
    // 修改
    handleEdit(row, index) {
      this.categoryDialogName = "修改产品大类";
      this.formProduct.productCategoryNameCn = row.productCategoryNameCn;
      this.formProduct.productCategoryNameEn = row.productCategoryNameEn;
      this.formProduct.firstUpLimit = row.firstUpLimit;
      this.formProduct.firstDownLimit = row.firstDownLimit;
      this.formProduct.finalUpLimit = row.finalUpLimit;
      this.formProduct.finalDownLimit = row.finalDownLimit;
      this.formProduct.firstPassRate = row.firstPassRate;
      this.formProduct.productCategoryId = row.productCategoryId;
      this.formProduct.activityCode = row.activityCode;
      this.formProduct.productCategoryCode = row.productCategoryCode;
      this.formProduct.ticketSetId = row.ticketSetId;
      this.dialogProduct = true;
    },
    //产品类别新增
    productAdd(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (parseInt(this.formProduct.firstUpLimit) < parseInt(this.formProduct.firstDownLimit)) {
            this.$message.error("初评投票下限不能大于上限");
            return;
          }
          if (parseInt(this.formProduct.finalUpLimit) < parseInt(this.formProduct.finalDownLimit)) {
            this.$message.error("终评投票下限不能大于上限");
            return;
          }
          if (this.formProduct.productCategoryCode == null) {
            this.formProduct.activityCode = this.ruleForm.activityCode ? this.ruleForm.activityCode : this.actCode;
            this.saveProductCategoryInfo(this.formProduct).then(res => {
              _this.dialogProduct = false;
              _this.getListProductCategoryInfo(this.formProduct.activityCode).then(res2 => {
                _this.newData = res2.records;
              }).catch(e => {
                _this.$message.error(e);
                return false;
              });
              this.$message({
                message: '新增成功',
                type: 'success'
              });
            }).catch(e => {
              _this.$message.error(e);
              return false;
            });
          } else if (this.formProduct.productCategoryCode != null) {
            if (parseInt(this.formProduct.firstUpLimit) < parseInt(this.formProduct.firstDownLimit)) {
              this.$message.error("初评投票下限不能大于上限");
              return;
            }
            if (parseInt(this.formProduct.finalUpLimit) < parseInt(this.formProduct.finalDownLimit)) {
              this.$message.error("终评投票下限不能大于上限");
              return;
            }
            this.formProduct.activityCode = this.ruleForm.activityCode ? this.ruleForm.activityCode : this.actCode;
            this.updateProductCategoryInfo(this.formProduct).then(res => {
              _this.dialogProduct = false;
              _this.getListProductCategoryInfo(this.formProduct.activityCode).then(res2 => {
                _this.newData = res2.records;
              });
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            }).catch(e => {
              _this.$message.error(e);
              return false;
            });
          }
        } else {
          return false;
        }
      });

    },
    // 打开新增窗口
    toAdd() {
      this.categoryDialogName = "新增产品大类";
      this.dialogProduct = true;
      this.formProduct = {
        productCategoryNameCn: '',
        productCategoryNameEn: '',
        firstUpLimit: 0,
        firstDownLimit: 0,
        finalUpLimit: 0,
        finalDownLimit: 0,
        firstPassRate: 0
      };
    },
      // 删除
    handleDelete(row, index) {

      let productCategoryId = row.productCategoryId;
      let _this = this;
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteProductCategoryInfo(productCategoryId).then(res => {
          _this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // location.reload();actCode
          let code = this.ruleForm.activityCode ? this.ruleForm.activityCode : this.actCode;
          this.getListProductCategoryInfo(code).then(res2 => {
            _this.newData = res2.records;
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 一键导入
    handleImports() {
      this.showDialogTips("确认导入数据吗?").then(() => {
        this.saveProductCategoryByLastestInfo(this.actCode).then(res => {
          this.$message({
            type: 'success',
            message: '一键新增成功!'
          });
          // 查询产品大类列表
          this.getListProductCategoryInfo(this.ruleForm.activityCode).then(res2 => {
            this.newData = res2.records;
            this.totalDatas = res2.total;
          });
        });
      }).catch(() => {});
    },
    // 表格多选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 消息提示
    showDialogTips(tipMessage) {
      return this.$confirm(tipMessage, '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      });
    }
  }
};
</script>
<style scoped>
  .title{
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
  }
  .btn-row{
    margin: 10px 20px;
  }
  .dialog-footer{
    text-align: center;
    margin: 15px 0;
    padding-bottom: 10px;
  }
  .elForm{
    margin-bottom: 30px;
  }
  .paging{
    margin: 10px auto;
    text-align: center;
  }
  .filename{
    display: inline-block;
    width: 130px;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow: hidden;
  }
  .addCategory{
    width: 200px;
  }
  .uploadbtn{
    padding: 10px 30px;
  }
</style>
<!--<style>-->
  <!--input::-webkit-outer-spin-button,-->
  <!--input::-webkit-inner-spin-button {-->
    <!-- -webkit-appearance: none !important;-->
    <!--margin: 0;-->
  <!--}-->
<!--</style>-->
