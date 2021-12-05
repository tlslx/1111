/*
* @file 展品列表
* @author: weiwei
* @date:2019/3/23
*/
<template>
  <div class="page-contain">
    <!-- 展品列表 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="展品列表" name="first">
        <el-form :inline="true" :model="queryForm">
          <el-form-item label="展品类别" size="small">
            <components-changeBoothChild @change-child="acceptQueryForm"></components-changeBoothChild>
          </el-form-item>
          <el-form-item label="展品名称" size="small" prop="productName">
            <el-input placeholder="请输入" v-model="queryForm.productName" clearable></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="handleListQuery" size="mini">查询</el-button>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="handleAddList" size="mini">新增</el-button>
          </el-form-item>
          <!-- <el-row>
            <el-col :span="9" style="text-align:center">
            </el-col>
            <el-col :span="7" style="text-align:right">
            </el-col>
          </el-row> -->
        </el-form>
        <!-- 表格 -->
        <el-table :data="exhibitionsListData.records" @selection-change="handleSelectionChange" border>
          <!-- productId loginType 详情要要-->
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="productSession" label="届数" align="center"></el-table-column>
          <el-table-column prop="productName" label="展品名称" align="center"></el-table-column>
          <el-table-column prop="preFileId" label="图片预览" align="center">
            <template slot-scope="scope">
              <div @click="handleBigPic(scope)">
                <img :src = "scope.row.picUrl" alt="" style="height: 60px; max-width: 250px;">
              </div>
              <!-- 大图 -->
              <el-dialog title="图片" :visible.sync="bigPicVisible">
                <img :src="bigPicUrl" alt="" width="100%" height="100%">
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column prop="fstNameCh" label="展品类别" align="center">
            <template slot-scope="scope">
              {{ scope.row.exAreaCatalogName ? scope.row.exAreaCatalogName : ""}} - {{ scope.row.fstNameCh ? scope.row.fstNameCh : ""}} - {{ scope.row.secNameCh ? scope.row.secNameCh : ""}}
            </template>
          </el-table-column>
          <el-table-column prop="productSource" label="原产地" align="center"></el-table-column>
          <el-table-column prop="operate" label="操作" align="center">
            <template slot-scope="scope">
              <!-- 编辑需要productId -->
              <el-button type="text" @click="handleXQfn(scope.row.productId)">查看详情</el-button>
              <el-button type="text" @click="handleDJfn(scope.row.productId, '126')">转为当届展品</el-button>
              <el-button type="text" @click="handleEditShow(scope.row.productId)">编辑</el-button>
              <el-button type="text" @click="handleDeletefn(scope.row.productId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" class="pagination-contain" style="margin-top:10px">
          <el-col :span="12">
            <el-button type="primary" @click="handleBatchSelect('126')" :disabled="this.selectionArr.length <= 0">批量转当届展品</el-button>
          </el-col>
          <el-col :span="12" style="text-align:right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page = pageInfoData.currentPage
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageInfoData.pageSize"
              layout="prev, pager, next, jumper"
              :total="exhibitionsListData.total">
            </el-pagination>
          </el-col>
        </el-row>

        <!-- 详情弹框 -->
        <el-dialog title="查看详情" :visible.sync="dialogDetails" width="50%" class="dialogDetails">
          <el-row :gutter="10">
            <el-col :span="12"><div>届数:</div></el-col>
            <el-col :span="12"><div>{{this.localDetailsData.productSession}}</div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>展品名称:</div></el-col>
            <el-col :span="12"><div>{{this.localDetailsData.productName}}</div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>展品类别:</div></el-col>
            <el-col :span="12"><div>{{this.localDetailsData.exAreaCatalogName}} - {{this.localDetailsData.fstNameCh}} - {{this.localDetailsData.secNameCh}}</div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>原产地文件:</div></el-col>
            <el-col :span="12"><div>
                <a v-for="(item, i) in this.localDetailsData.ycdList" :key="i" :href="item.url">点击查看</a>
                <!-- <span v-for="(item, i) in this.localDetailsData.ycdList" :key="i">
                  <img :src="item.url" alt="" style="height: 60px;max-width: 120px;">
                </span> -->
              </div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>原产地:</div></el-col>
            <el-col :span="12">{{this.localDetailsData.productSource}}</el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>展品描述:</div></el-col>
            <el-col :span="12"><div>{{this.localDetailsData.productDescription}}</div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>展品功能:</div></el-col>
            <el-col :span="12"><div>{{this.localDetailsData.productFunction}}</div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>展品图片:</div></el-col>
            <el-col :span="12"><div>
              <span v-for="(item, i) in this.localDetailsData.tpList" :key="i">
                <img :src="item.url" alt="" style="height: 60px;max-width: 120px;margin-right: 10px;">
              </span>
            </div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>展品视频:</div></el-col>
            <el-col :span="12"><div>
              <span v-for="(item, i) in this.localDetailsData.spList" :key="i">
                <!-- <img :src="item.url" alt="" style="height: 30px;margin-right: 10px;"> -->
                <a :href="item.url">{{item.name}}</a>
              </span>
            </div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>展品获奖情况:</div></el-col>
            <el-col :span="12"><div>
              <span v-for="(item, i) in this.localDetailsData.hjList" :key="i">
                <!-- <img :src="item.url" alt="" style="height: 30px;margin-right: 10px;"> -->
                <a :href="item.url">{{item.name}}</a>
              </span>
            </div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>展品知识产权专利:</div></el-col>
            <el-col :span="12"><div>
              <span v-for="(item, i) in this.localDetailsData.cqList" :key="i">
                <!-- <img :src="item.url" alt="" style="height: 30px;margin-right: 10px;"> -->
                <a :href="item.url">{{item.name}}</a>
              </span>
            </div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>是否已进入中国市场:</div></el-col>
            <el-col :span="12"><div>{{this.localDetailsData.isEnterChinese? (this.localDetailsData.isEnterChinese === 1? "是":""):(this.localDetailsData.isEnterChinese === 0? "否":"")}}</div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>是否首次发布:</div></el-col>
            <el-col :span="12"><div>{{this.localDetailsData.isFirstPublish? (this.localDetailsData.isFirstPublish === 1? "是":""): (this.localDetailsData.isFirstPublish === 0? "否":"")}}</div></el-col>
          </el-row>
          <!-- <el-row :gutter="10">
            <el-col :span="12"><div>是否已进入中国市场:</div></el-col>
            <el-col :span="12"><div>{{this.localDetailsData.isEnterChinese}}</div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>是否首次发布:</div></el-col>
            <el-col :span="12"><div>{{this.localDetailsData.isFirstPublish}}</div></el-col>
          </el-row> -->
          <el-row :gutter="10">
            <el-col :span="12"><div>往届展出记录:{{this.localDetailsData.historyExhibitionNum}}</div></el-col>
            <el-col :span="12"><div></div></el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDetails = false">关闭</el-button>
          </span>
        </el-dialog>
        <!-- 编辑弹框 -->
        <el-dialog title="编辑" :visible.sync="dialogEdit" width="50%" :show-close="false">
          <el-form :rules="formRules" ref="editForm" :model="editListForm" label-width="128px">
            <!-- <el-form-item label="届数:" size="small" prop="productSession">
              <el-select v-model="editListForm.productSession">
                <el-option v-for="(item, index) in exhibitionNum" :key="index"
                  :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="展品名称:" size="small" prop="productName">
              <el-input v-model="editListForm.productName"></el-input>
            </el-form-item>
            <el-form-item label="展品类别" size="small" prop="secCatalogId">
              <components-changeBoothChild :editData="transData" @change-child="acceptEditListForm"></components-changeBoothChild>
            </el-form-item>
            <el-form-item label="原产地文件:" size="small" prop="productSourceFileId">
              <el-upload :action="API_POT_URL + '/api/applicationForExhibits/uploadSourcePic'"
                :limit=1
                :file-list = this.editFileList.ycdList
                :on-remove = "editycdUploadRemove"
                :on-success = "editycdUploadSuccess"
                :on-error = "ycdUploadError">
                <el-button size="small" type="primary">上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="原产地:" size="small" prop="productSource">
              <el-input v-model="editListForm.productSource"></el-input>
            </el-form-item>
            <el-form-item label="展品描述:" size="small" prop="productDescription">
              <el-input v-model="editListForm.productDescription"></el-input>
            </el-form-item>
            <el-form-item label="展品功能:" size="small" prop="productFunction">
              <el-input v-model="editListForm.productFunction"></el-input>
            </el-form-item>
            <el-form-item label="展品图片:" size="small">
              <el-upload :action="API_POT_URL + '/api/applicationForExhibits/uploadProductFiles'"
                ref="picUpload"
                :file-list = this.editFileList.tpList
                :data="{type: 2}"
                multiple
                :on-remove = "editpicUploadRemove"
                :on-success = "editpicUploadSuccess"
                :on-error = "dzpUploadError"
                list-type="picture">
                <el-button size="small" type="primary">上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="展品视频:" size="small">
              <el-upload :action="API_POT_URL + '/api/applicationForExhibits/uploadProductFiles'"
                ref="awardsUpload"
                :file-list = this.editFileList.spList
                :data="{type: 3}"
                multiple
                :on-remove = "editvideoUploadRemove"
                :on-success = "editvideoUploadSuccess"
                :on-error = "dzpUploadError">
                <el-button size="small" type="primary">上传</el-button>
                <!-- <el-button size="small" type="primary" @click="awardsSubmitUpload">上传</el-button> -->
              </el-upload>
            </el-form-item>
            <el-form-item label="产品获奖情况:" size="small">
              <el-upload :action="API_POT_URL + '/api/applicationForExhibits/uploadProductFiles'"
                ref="proAwardFileIds"
                :file-list = this.editFileList.hjList
                :data="{type: 0}"
                multiple
                :on-remove = "editawardsUploadRemove"
                :on-success = "editawardsUploadSuccess"
                :on-error = "dzpUploadError">
                <el-button size="small" type="primary">上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="产品知识产权专利:" size="small">
              <el-upload :action="API_POT_URL + '/api/applicationForExhibits/uploadProductFiles'"
                  ref="proAwardFileIds"
                  :file-list = this.editFileList.cqList
                  :data="{type: 1}"
                  multiple
                  :on-remove = "editpropertyUploadRemove"
                  :on-success = "editpropertyUploadSuccess"
                  :on-error = "dzpUploadError">
                  <el-button size="small" type="primary">上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="是否进入中国市场:" size="small">
              <el-select v-model="editListForm.isEnterChinese">
                <el-option label="是" value=1></el-option>
                <el-option label="否" value=0></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否首次发布:" size="small">
              <el-select v-model="editListForm.isFirstPublish">
                <el-option label="是" value=1></el-option>
                <el-option label="否" value=0></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="submitEditList('editForm')">保 存</el-button>
            <el-button @click="dialogEdit = false">取 消</el-button>
          </span>
        </el-dialog>
        <!-- 新增弹框 -->
        <el-dialog title="新增" :visible.sync="dialogAdd" width="50%" :show-close="false">
          <el-form :rules="formRules" ref="addForm" :model="addListForm" label-width="128px">
            <!-- <el-form-item label="届数:" size="small" prop="productSession">
              <el-select v-model="addListForm.productSession">
                <el-option v-for="(item, index) in exhibitionNum" :key="index"
                  :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="展品名称:" size="small" prop="productName">
              <el-input v-model="addListForm.productName"></el-input>
            </el-form-item>
            <el-form-item label="展品类别" size="small" prop="secCatalogId">
              <components-changeBoothChild :editData="transData" @change-child="acceptAddListForm"></components-changeBoothChild>
            </el-form-item>
            <el-form-item label="原产地文件:" size="small" prop="productSourceFileId">
              <!-- <el-input style="width: 90%" v-model="addListForm.productSourceFileId"></el-input> -->
              <el-upload :action="API_POT_URL + '/api/applicationForExhibits/uploadSourcePic'"
                :limit=1
                :file-list = this.editFileList.ycdList
                :on-success = "ycdUploadSuccess"
                :on-error = "ycdUploadError">
                <el-button size="small" type="primary">上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="原产地:" size="small" prop="productSource">
              <el-input v-model="addListForm.productSource"></el-input>
            </el-form-item>
            <el-form-item label="展品描述:" size="small" prop="productDescription">
              <el-input v-model="addListForm.productDescription"></el-input>
            </el-form-item>
            <el-form-item label="展品功能:" size="small" prop="productFunction">
              <el-input v-model="addListForm.productFunction"></el-input>
            </el-form-item>
            <el-form-item label="展品图片:" size="small" required>
                <!-- proPicsFileIds -->
                <el-upload :action="API_POT_URL + '/api/applicationForExhibits/uploadProductFiles'"
                  ref="picUpload"
                  :file-list = this.editFileList.tpList
                  :data="{type: 2}"
                  multiple
                  :on-success = "picUploadSuccess"
                  :on-error = "dzpUploadError"
                  list-type="picture">
                  <el-button size="small" type="primary">上传</el-button>
                  <!-- <el-button size="small" type="primary" @click="picSubmitUpload">上传</el-button> -->
                </el-upload>
            </el-form-item>
            <el-form-item label="展品视频:" size="small">
              <!-- proVideoFileIds  :auto-upload = false-->
              <el-upload :action="API_POT_URL + '/api/applicationForExhibits/uploadProductFiles'"
                  ref="awardsUpload"
                  :data="{type: 3}"
                  multiple
                  :on-success = "videoUploadSuccess"
                  :on-error = "dzpUploadError">
                  <el-button size="small" type="primary">上传</el-button>
                  <!-- <el-button size="small" type="primary" @click="awardsSubmitUpload">上传</el-button> -->
              </el-upload>
            </el-form-item>
            <el-form-item label="产品获奖情况:" size="small">
              <!-- proAwardFileIds -->
              <el-upload :action="API_POT_URL + '/api/applicationForExhibits/uploadProductFiles'"
                  ref="proAwardFileIds"
                  :data="{type: 0}"
                  multiple
                  :on-success = "awardsUploadSuccess"
                  :on-error = "dzpUploadError">
                  <el-button size="small" type="primary">上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="产品知识产权专利:" size="small">
              <!-- proPropertyFileIds -->
              <el-upload :action="API_POT_URL + '/api/applicationForExhibits/uploadProductFiles'"
                  ref="proAwardFileIds"
                  :data="{type: 1}"
                  multiple
                  :on-success = "propertyUploadSuccess"
                  :on-error = "dzpUploadError">
                  <el-button size="small" type="primary">上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="是否进入中国市场:" size="small">
              <el-select v-model="addListForm.isEnterChinese">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否首次发布:" size="small">
              <el-select v-model="addListForm.isFirstPublish">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="submitAddList('addForm')">保 存</el-button>
            <el-button @click="dialogAdd = false">取 消</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import componentsChangeBoothChild from "@/components/project/common/changeboothChild";
export default {
  components: {
    "components-changeBoothChild": componentsChangeBoothChild
  },
  data() {
    return {
      transData: {
        exAreaId: "",
        fstCatalogId: "",
        secCatalogId: ""
      },
      activeName: 'first',
      API_POT_URL: process.env.API_POT_URL,
      bigPicVisible: false,
      bigPicUrl: '',
      queryForm: {
        isAsc: false,
        // loginId: 'aaa',
        // loginType: 0,
        orderByField: 'ip.create_date',
        exAreaId: '',
        fstCatalogId: '',
        secCatalogId: '',
        productName: ''
      },
      pageInfoData: { currentPage: 1, pageSize: 10 },
      dialogAdd: false, // 新增弹框
      fstCatalogArray: [],
      secCatalogArray: [],
      addListForm: { // 新增弹框参数
        // companyId: 'aaa', // 编辑必传
        productSession: '',
        productName: '',
        fstCatalogId: '',
        secCatalogId: '',
        exAreaId: '',
        productDescription: '',
        productFunction: '',
        isEnterChinese: '',
        isFirstPublish: '',
        productSourceFileId: '',
        productSource: ""
      },
      uploadFileIdObj: { // 新增上传返回的
        proPicsFileIds: [],
        proAwardFileIds: [],
        proVideoFileIds: [],
        proPropertyFileIds: []
      },
      dialogEdit: false, // 编辑弹框
      selectionArr: [], // 存储多选的productId
      dialogDetails: false, // 详情弹框

      editListForm: {
        // companyId: 'aaa',
        productId: '', // 编辑必传
        productSession: '',
        productName: '',
        exAreaId: '',
        fstCatalogId: '',
        secCatalogId: '',
        productDescription: '',
        productFunction: '',
        isEnterChinese: '',
        isFirstPublish: '',
        productSourceFileId: '',
        productSource: ""
      },
      editUploadFileIdObj: { // 编辑上传返回的 fileIdlist数组
        proPicsFileIds: [],
        proAwardFileIds: [],
        proVideoFileIds: [],
        proPropertyFileIds: []
      },
      editFileList: { // 编辑fileList-展示图片用
        tpList: [],
        hjList: [],
        spList: [],
        cqList: [],
        ycdList: [],
        tpFileIdsList: [],
        spFileIdsList: [],
        hjFileIdsList: [],
        cqFileIdsList: []
      },
      localDetailsData: { // 详情
        productSession: '',
        productName: '',
        fstNameCh: '',
        secNameCh: '',
        productSource: '',
        productDescription: '',
        productFunction: '',
        isEnterChinese: '',
        isFirstPublish: '',
        cqList: [],
        hjList: [],
        spList: [],
        tpList: [],
        ycdList: []
      },
      formRules: { // 验证
        productFunction: [{ required: true, message: "请输入", trigger: "blur" }],
        productDescription: [{ required: true, message: '请输入50~400个字符', trigger: 'blur', min: 50, max: 400 }],
        // productSession: [{ required: true, message: "请选择", trigger: 'blur' }],
        productName: [{ required: true, message: '请输入', trigger: 'blur' }],
        exAreaId: [{ required: true, message: '请输入', trigger: 'blur' }],
        fstCatalogId: [{ required: true, message: '请输入', trigger: 'blur' }],
        secCatalogId: [{ required: true, message: '请选择到二级目录', trigger: 'blur' }],
        productSourceFileId: [{ required: true, message: '请上传格式为jpg或pdf，大小为500k~5m的文件', trigger: 'blur' }],
        productSource: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  watch: {
    dialogAdd: function(newV, oldV) {
      let val = newV;
      if (!val) {
        this.editFileList.ycdList = [];
        this.editFileList.tpList = [];
        this.$refs.addForm.resetFields();
      }
    },
    dialogEdit: function(newV, oldV) {
      let val = newV;
      if (!val) {
        this.editFileList.ycdList = [];
        this.editFileList.tpList = [];
        this.$refs.editForm.resetFields();
      }
    }
  },
  computed: {
    ...mapGetters('registeredExhibits', ['exhibitionsListData', 'exhibitionsDetailsData']),
    ...mapGetters('commonStore', ['exhibitionNum']),
    queryFormParams() {
      let _queryForm = {};
      for (let key in this.queryForm) {
        if (this.queryForm[key] == null) {
          this.queryForm[key] = '';
        }
      }
      _queryForm = this.queryForm;
      _queryForm.current = this.pageInfoData.currentPage;
      _queryForm.size = this.pageInfoData.pageSize;
      return _queryForm;
    },
    addFormParams() { // 新增上传
      let _addForm = {};
      _addForm.ifoProduct = this.addListForm;
      _addForm.proPicsFileIds = this.uploadFileIdObj.proPicsFileIds;
      _addForm.proAwardFileIds = this.uploadFileIdObj.proAwardFileIds;
      _addForm.proVideoFileIds = this.uploadFileIdObj.proVideoFileIds;
      _addForm.proPropertyFileIds = this.uploadFileIdObj.proPropertyFileIds;
      return _addForm;
    },

    editFormParams() { // 编辑上传
      let _editForm = {};
      _editForm.ifoProduct = this.editListForm;
      // _editForm.ifoProduct.companyId = 'aaa'; // 防止误删除，再赋值一遍
      _editForm.proPicsFileIds = this.editFileList.tpFileIdsList; // 更新之后赋值
      _editForm.proAwardFileIds = this.editFileList.hjFileIdsList;
      _editForm.proVideoFileIds = this.editFileList.spFileIdsList;
      _editForm.proPropertyFileIds = this.editFileList.cqFileIdsList;
      return _editForm;
    }
  },
  methods: {
    ...mapActions('registeredExhibits', ['getExhibitionsList', 'getExhibitionsDetails', 'postDeleteExhibitionsList',
      'postCurrentSessionExhibitionsList', 'postAddExhibitionsList', 'postEditExhibitionsList', 'postDeleteycdFile', 'postDeleteMoreFile']),
    ...mapActions('commonStore', ['getExhibitionNum', 'getBoothChild']),
    acceptQueryForm(param) {
      Object.assign(this.queryForm, param);
    },
    acceptEditListForm(param) {
      Object.assign(this.editListForm, param);
    },
    acceptAddListForm(param) {
      Object.assign(this.addListForm, param);
    },

    handleBigPic(scope) {
      this.bigPicUrl = scope.row.picUrl;
      this.bigPicVisible = true;
    },
    handleListQuery() { // 查询表单
      this.getExhibitionsList(this.queryFormParams);
    },
    handleSrc(preFileId) {
      // window.open(this.API_POT_URL + '/api/ifoFile/getImg?fileId=' + preFileId);
      let srcUrl = this.API_POT_URL + '/api/ifoFile/getImg?fileId=' + preFileId;
      return srcUrl;
    },
    handleAddList() { // 新增列表-show
      this.transData = { // 新增的时候初始化
        exAreaId: "",
        fstCatalogId: "",
        secCatalogId: ""
      };
      this.dialogAdd = true;
    },
    handleSelectionChange(val) { // 选项
      this.selectionArr = [];
      if (val.length > 0) {
        val.forEach(ele => {
          this.selectionArr.push(ele.productId);
        });
      }
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getExhibitionsList(this.queryFormParams); // 查询列表
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getExhibitionsList(this.queryFormParams); // 查询列表
    },
    handleBatchSelect(num) { // 多选表格
      let currentSessionParams = {
        "ifoProducts": []
      };
      this.selectionArr.forEach(ele => {
        currentSessionParams.ifoProducts.push(
          {
            "productId": ele
          }
        );
      });
      this.postCurrentSessionExhibitionsList(currentSessionParams).then(() => {
        this.$message.success('设为当届展品成功');
      }).catch(() => {
        this.$message.info('设为当届展品失败');
      });
    },
    ycdUploadSuccess(res) { // 上传原产地成功
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        this.addListForm.productSourceFileId = res.data; // 赋值
      }
    },
    editycdUploadSuccess(res) { // 上传原产地成功
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        this.editListForm.productSourceFileId = res.data; // 赋值
      }
    },
    editycdUploadRemove(res) { // 编辑原产地移除
      this.editListForm.productSourceFileId = ''; // 移除赋值为空
    },
    ycdUploadError() { // 上传原产地失败
      this.$message.error(res.message);
    },

    // 四种多文件上传 1新增
    picUploadSuccess(res) { // 第二种上传-图片
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        this.uploadFileIdObj.proPicsFileIds.push(res.data[0]);
      }
    },
    awardsUploadSuccess(res) { // 第二种上传-奖金
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        this.uploadFileIdObj.proAwardFileIds.push(res.data[0]);
      }
    },
    videoUploadSuccess(res) { // 第二种上传-影像
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        this.uploadFileIdObj.proVideoFileIds.push(res.data[0]);
      }
    },
    propertyUploadSuccess(res) { // 第二种上传-专利
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        this.uploadFileIdObj.proPropertyFileIds.push(res.data[0]);
      }
    },

    // 四种多文件上传 2编辑
    editpicUploadSuccess(res, file, fileList) { // 第二种上传-图片
      // console.log(res, file, fileList, '上传');
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        let item = file.response.data[0];
        this.editFileList.tpFileIdsList.push(item);
        // this.editUploadFileIdObj.proPicsFileIds = fileIdArr;
      }
    },
    editawardsUploadSuccess(res, file, fileList) { // 第二种上传-奖金
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        let item = file.response.data[0];
        this.editFileList.hjFileIdsList.push(item);
        // this.edituploadFileIdObj.proAwardFileIds = fileIdArr;
      }
    },
    editvideoUploadSuccess(res, file, fileList) { // 第二种上传-影像
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        let item = file.response.data[0];
        this.editFileList.spFileIdsList.push(item);
        // this.edituploadFileIdObj.proVideoFileIds = fileIdArr;
      }
    },
    editpropertyUploadSuccess(res, file, fileList) { // 第二种上传-专利
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        let item = file.response.data[0];
        this.editFileList.cqFileIdsList.push(item);
        // this.edituploadFileIdObj.proPropertyFileIds = fileIdArr;
      }
    },

      // 四种多文件上传 3移除
    editpicUploadRemove(file, fileList) { // 编辑移除-图片
      // console.log(file, fileList, 'file, fileList');
      if (file.response) {
        let _item = file.response.data[0];
        this.editFileList.tpFileIdsList.splice(this.editFileList.tpFileIdsList.findIndex(item => item === _item), 1);
      } else {
        let _item = file.url.split('=')[1];
        this.editFileList.tpFileIdsList.splice(this.editFileList.tpFileIdsList.findIndex(item => item === _item), 1);
      }
      // this.editUploadFileIdObj.proPicsFileIds = fileIdArr;
    },
    editawardsUploadRemove(file, fileList) { // 编辑移除-奖金
      if (file.response) {
        let _item = file.response.data[0];
        this.editFileList.spFileIdsList.splice(this.editFileList.spFileIdsList.findIndex(item => item === _item), 1);
      } else {
        let _item = file.url.split('=')[1];
        this.editFileList.spFileIdsList.splice(this.editFileList.spFileIdsList.findIndex(item => item === _item), 1);
      }
      // this.editUploadFileIdObj.proAwardFileIds = fileIdArr;
    },
    editvideoUploadRemove(file, fileList) { // 编辑移除-影像
      if (file.response) {
        let _item = file.response.data[0];
        this.editFileList.hjFileIdsList.splice(this.editFileList.hjFileIdsList.findIndex(item => item === _item), 1);
      } else {
        let _item = file.url.split('=')[1];
        this.editFileList.hjFileIdsList.splice(this.editFileList.hjFileIdsList.findIndex(item => item === _item), 1);
      }
      // this.editUploadFileIdObj.proVideoFileIds = fileIdArr;
    },
    editpropertyUploadRemove(file, fileList) { // 编辑移除-专利
      if (file.response) {
        let _item = file.response.data[0];
        this.editFileList.cqFileIdsList.splice(this.editFileList.cqFileIdsList.findIndex(item => item === _item), 1);
      } else {
        let _item = file.url.split('=')[1];
        this.editFileList.cqFileIdsList.splice(this.editFileList.cqFileIdsList.findIndex(item => item === _item), 1);
      }
      // this.editUploadFileIdObj.proPropertyFileIds = fileIdArr;
    },

    dzpUploadError() { // 第二种上传失败
      this.$message.error(res.message);
    },
    submitAddList(formName) { // 提交新增
      this.$refs[formName].validate(validate => {
        if (validate) {
          this.postAddExhibitionsList(this.addFormParams).then(() => {
            this.getExhibitionsList(this.queryFormParams); // 新增成功调列表接口
            this.dialogAdd = false;
            this.$refs[formName].resetFields();
          });
        } else {
          this.$message.error('请正确填写表单！');
        }
      });
    },

    // 查看详情
    handleXQfn(Id) {
      // loginType: 0,
      this.getExhibitionsDetails({ productId: Id }).then(res => {
        var key;
        for (key in this.localDetailsData) {
          if (typeof (this.localDetailsData[key]) === 'object' && Array.isArray(this.localDetailsData[key])) {
            this.localDetailsData[key] = [];
          }
          this.localDetailsData[key] = '';
        }
        // console.log(this.exhibitionsDetailsData, 'exhibitionsDetailsData');
        const copyExhibitionsDetailsData = JSON.parse(JSON.stringify(this.exhibitionsDetailsData));
        this.localDetailsData.exAreaCatalogName = copyExhibitionsDetailsData.ifoProduct.exAreaCatalogName;
        this.localDetailsData.productSession = copyExhibitionsDetailsData.ifoProduct.productSession;
        this.localDetailsData.productName = copyExhibitionsDetailsData.ifoProduct.productName;
        this.localDetailsData.fstNameCh = copyExhibitionsDetailsData.ifoProduct.fstNameCh;
        this.localDetailsData.secNameCh = copyExhibitionsDetailsData.ifoProduct.secNameCh;
        this.localDetailsData.productSource = copyExhibitionsDetailsData.ifoProduct.productSource; // 原产地
        this.localDetailsData.productDescription = copyExhibitionsDetailsData.ifoProduct.productDescription; // 字符串数组
        this.localDetailsData.productFunction = copyExhibitionsDetailsData.ifoProduct.productFunction;
        this.localDetailsData.isEnterChinese = copyExhibitionsDetailsData.ifoProduct.isEnterChinese;
        this.localDetailsData.isFirstPublish = copyExhibitionsDetailsData.ifoProduct.isFirstPublish;
        // 展示图片
        this.localDetailsData.cqList = copyExhibitionsDetailsData.cqList;
        this.localDetailsData.hjList = copyExhibitionsDetailsData.hjList;
        this.localDetailsData.spList = copyExhibitionsDetailsData.spList;
        this.localDetailsData.tpList = copyExhibitionsDetailsData.tpList;
        this.localDetailsData.ycdList = copyExhibitionsDetailsData.ycdList;

        this.dialogDetails = true;
      });
    },

    handleDJfn(Id, num) { // 转换为当届展品
      this.$confirm('将此展品设为当届展品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let currentSessionParams = {
          "ifoProducts": []
        };
        currentSessionParams.ifoProducts.push({ "productId": Id });
        this.postCurrentSessionExhibitionsList(currentSessionParams).then(() => {
          this.$message.success('设为当届展品成功');
        }).catch(() => {
          this.$message.info('设为当届展品失败');
        });
      }).catch(() => {
        this.$message.info('已取消设置');
      });
    },

    handleEditShow(Id) { // 展示编辑弹框,先做详情查询
      // loginType: 0
      this.getExhibitionsDetails({ productId: Id }).then(res => {
        var key;
        for (key in this.editListForm) {
          if (key !== 'companyId') {
            this.editListForm[key] = ''; // 这里清空了editListForm, 所以要补回companyId
          }
        }
        // console.log(this.exhibitionsDetailsData, 'exhibitionsDetailsData');
        const copyExhibitionsDetailsData = JSON.parse(JSON.stringify(this.exhibitionsDetailsData));
        this.editListForm.productId = copyExhibitionsDetailsData.ifoProduct.productId; // 必传项
        // this.editListForm.productSession = copyExhibitionsDetailsData.ifoProduct.productSession;
        this.editListForm.productName = copyExhibitionsDetailsData.ifoProduct.productName;
        this.editListForm.exAreaId = copyExhibitionsDetailsData.ifoProduct.exAreaId;
        this.editListForm.fstCatalogId = copyExhibitionsDetailsData.ifoProduct.fstCatalogId;
        this.editListForm.secCatalogId = copyExhibitionsDetailsData.ifoProduct.secCatalogId;
        this.editListForm.productSourceFileId = copyExhibitionsDetailsData.ifoProduct.productSourceFileId; // 原产地图片,需要
        this.editListForm.productDescription = copyExhibitionsDetailsData.ifoProduct.productDescription;
        this.editListForm.productFunction = copyExhibitionsDetailsData.ifoProduct.productFunction;
        this.editListForm.isEnterChinese = copyExhibitionsDetailsData.ifoProduct.isEnterChinese;
        this.editListForm.isFirstPublish = copyExhibitionsDetailsData.ifoProduct.isFirstPublish;
        this.editListForm.productSource = copyExhibitionsDetailsData.ifoProduct.productSource;

        this.editFileList.tpList = copyExhibitionsDetailsData.tpList;
        this.editFileList.hjList = copyExhibitionsDetailsData.hjList;
        this.editFileList.spList = copyExhibitionsDetailsData.spList;
        this.editFileList.cqList = copyExhibitionsDetailsData.cqList;
        this.editFileList.ycdList = copyExhibitionsDetailsData.ycdList;
        // [id,id,id]
        this.editFileList.tpFileIdsList = JSON.parse(JSON.stringify(this.exhibitionsDetailsData.tpFileIdsList));
        this.editFileList.spFileIdsList = JSON.parse(JSON.stringify(this.exhibitionsDetailsData.spFileIdsList));
        this.editFileList.hjFileIdsList = JSON.parse(JSON.stringify(this.exhibitionsDetailsData.hjFileIdsList));
        this.editFileList.cqFileIdsList = JSON.parse(JSON.stringify(this.exhibitionsDetailsData.cqFileIdsList));
        this.dialogEdit = true;

        //处理船只展品类别
        Object.assign(this.transData, {
          exAreaId: copyExhibitionsDetailsData.ifoProduct.exAreaId,
          fstCatalogId: copyExhibitionsDetailsData.ifoProduct.fstCatalogId,
          secCatalogId: copyExhibitionsDetailsData.ifoProduct.secCatalogId
        });
      });
    },
    submitEditList(formName) { // 提交修改
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postEditExhibitionsList(this.editFormParams).then(res => {
            this.dialogEdit = false;
            this.getExhibitionsList(this.queryFormParams);
            this.$refs[formName].resetFields(); // 清空表单
          });
        } else {
          this.$message.error('请正确填写表单！');
        }
      });
    },

    handleDeletefn(Id) { // 删除
      this.$confirm('此操作将永久删除本条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postDeleteExhibitionsList({ productId: Id }).then(() => {
          this.$message.success('删除成功');
          this.handleListQuery();
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },

    //新增中展区1、2级菜单的变化
    changeboothChild(parentId, level, array) {
      if (level === 1) {
        this.addListForm.fstCatalogId = "";
        this.addListForm.secCatalogId = "";
      } else if (level === 2) {
        this.addListForm.secCatalogId = "";
      }
      let params = {
        level,
        parentId
      };
      let copyArray = array;
      this.getBoothChild(params).then(res => {
        if (res) {
          if (copyArray.length !== 0) {
            copyArray = copyArray.splice(0, copyArray.length);
          }
          for (let item of res) {
            copyArray.push({
              label: item.chName,
              value: item.catalogId
            });
          }
        }
      });
    }
  },
  async created() {
    this.getExhibitionsList(this.queryFormParams);
    if (!this.exhibitionNum) {
      await this.getExhibitionNum().then(res => {
        let array = [];
        for (let item of res) {
          array.push({
            label: item.exhibitionNum,
            value: item.exhibitionNum,
            current: item.current
          });
        }
        this.$store.commit('commonStore/EXHIBITION_NUM', array);
      });
    }
    // if (!this.boothArray) {
    //   await this.getBooth().then(res => {
    //     let array = [];
    //     for (let item of res) {
    //       array.push({
    //         label: item.exhibitionAreaName,
    //         value: item.exhibitionAreaCode
    //       });
    //     }
    //     this.$store.commit("commonStore/BOOTH_ARRAY", array);
    //   });
    // }
    // .then(res => { // 查询表单
    //   console.log('res', res);
    //   console.log('exhibitionsListData', this.exhibitionsListData);
    // });
  }
};
</script>
<style lang='less' scoped>
.page-contain {
  /deep/ .dialogDetails {
    .el-row {
      font-size: 16px;line-height: 32px;
      .el-col:first-child {
        div {
          text-align: right;
        }
      }
    }
  }
}
</style>
