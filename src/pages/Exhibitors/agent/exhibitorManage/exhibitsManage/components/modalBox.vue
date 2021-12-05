<style lang="less" scoped>
  #component-modal-box {

  }
</style>

<template>
  <div id="component-modal-box">
    <!-- 编辑弹框 -->
    <div v-if="type === 'edit'">
      <el-form :rules="formRules" ref="editForm" :model="editListForm" label-width="128px">
        <!-- <el-form-item label="届数:" size="small" prop="productSession">
          <el-select v-model="editListForm.productSession">
            <el-option v-for="(item, index) in exhibitionNum" :key="index"
              :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="企业名称:" size="small" prop="companyId">
          <el-select v-model="addListForm.companyId">
            <el-option v-for="(item, index) in companyArray" :key="index"
              :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展品名称:" size="small" prop="productName">
          <el-input v-model="editListForm.productName"></el-input>
        </el-form-item>
        <el-form-item label="展品类别" size="small">
          <components-changeBoothChild :editData="editData" @change-child="acceptForm"></components-changeBoothChild>
        </el-form-item>
        <el-row>
          <!-- <components-changeBoothChild :small="true" @change-child="acceptForm"></components-changeBoothChild> -->
        </el-row>
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
      <span slot="footer" class="dialog-footer" style="text-align: center">
        <div class="bm bm-pc">
          <el-button type="danger" @click="submitList('editForm')">保 存</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </span>
    </div>

    <!-- 新增弹框 -->
    <div v-if="type === 'add'">
      <el-form :rules="formRules" ref="addForm" :model="addListForm" label-width="128px">
        <!-- <el-form-item label="届数:" size="small" prop="productSession">
          <el-select v-model="addListForm.productSession">
            <el-option v-for="(item, index) in exhibitionNum" :key="index"
              :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="企业名称:" size="small" prop="companyId">
          <el-select v-model="addListForm.companyId">
            <el-option v-for="(item, index) in companyArray" :key="index"
              :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展品名称:" size="small" prop="productName">
          <el-input v-model="addListForm.productName"></el-input>
        </el-form-item>
        <el-form-item label="展品类别" size="small" prop="secCatalogId">
          <components-changeBoothChild @change-child="acceptForm"></components-changeBoothChild>
        </el-form-item>
        <el-row>
          <!-- <components-changeBoothChild :small="true" @change-child="acceptForm"></components-changeBoothChild> -->
        </el-row>
        <el-form-item label="原产地文件:" size="small" prop="productSourceFileId">
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
      <span slot="footer" class="dialog-footer" style="text-align: center">
        <div class="bm bm-pe">
          <el-button type="danger" @click="submitList('addForm')">保 存</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import componentsChangeBoothChild from "@/components/project/common/changeboothChild";
export default {
  components: {
    "components-changeBoothChild": componentsChangeBoothChild
  },
  props: {
    id: {
      type: String,
      default: "0"
    },
    exhibitionNum: Array,
    type: String
  },
  data() {
    return {
      companyArray: [],
      //列表参数
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
      editData: {
        exAreaId: "",
        fstCatalogId: "",
        secCatalogId: ""
      },
      idEdit: this.id,
      //编辑
      editListForm: {
        companyId: '',
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
      API_POT_URL: process.env.API_POT_URL,
      addListForm: { // 新增弹框参数
        companyId: '',
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
      formRules: { // 验证
        companyId: [{ required: true, message: "请选择企业", trigger: "blur" }],
        productFunction: [{ required: true, message: "请输入", trigger: "blur" }],
        productDescription: [{ required: true, message: '请输入50~400个字符', trigger: 'blur', min: 50, max: 400 }],
        productSession: [{ required: true, message: "请选择", trigger: 'blur' }],
        productName: [{ required: true, message: '请输入', trigger: 'blur' }],
        exAreaId: [{ required: true, message: '请输入', trigger: 'blur' }],
        fstCatalogId: [{ required: true, message: '请输入', trigger: 'blur' }],
        secCatalogId: [{ required: true, message: '请选到二级目录', trigger: 'blur' }],
        productSourceFileId: [{ required: true, message: '请上传格式为jpg或pdf，大小为500k~5m的文件', trigger: 'blur' }],
        productSource: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      uploadFileIdObj: { // 新增上传返回的
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
      }
    };
  },
  watch: {
    idEdit: {
      handler: function(newV, oldV) {
        if (newV) {
          this.getExhibitionsDetails({ productId: newV }).then(res => {
            var key;
            for (key in this.editListForm) {
              if (key !== 'companyId') {
                this.editListForm[key] = ''; // 这里清空了editListForm, 所以要补回companyId
              }
            }
            // console.log(this.exhibitionsDetailsData, 'exhibitionsDetailsData');
            const copyExhibitionsDetailsData = Object.assign({}, this.exhibitionsDetailsData);
            this.editListForm.companyId = copyExhibitionsDetailsData.ifoProduct.companyId;
            this.editListForm.productId = copyExhibitionsDetailsData.ifoProduct.productId; // 必传项
            this.editListForm.productSession = copyExhibitionsDetailsData.ifoProduct.productSession;
            this.editListForm.productName = copyExhibitionsDetailsData.ifoProduct.productName;
            this.editListForm.exAreaId = copyExhibitionsDetailsData.ifoProduct.exAreaId;
            this.editListForm.fstCatalogId = copyExhibitionsDetailsData.ifoProduct.fstCatalogId;
            this.editListForm.secCatalogId = copyExhibitionsDetailsData.ifoProduct.secCatalogId;
            this.editListForm.productSource = copyExhibitionsDetailsData.ifoProduct.productSource;
            this.editListForm.productSourceFileId = copyExhibitionsDetailsData.ifoProduct.productSourceFileId; // 原产地图片,需要
            this.editListForm.productDescription = copyExhibitionsDetailsData.ifoProduct.productDescription;
            this.editListForm.productFunction = copyExhibitionsDetailsData.ifoProduct.productFunction;
            this.editListForm.isEnterChinese = copyExhibitionsDetailsData.ifoProduct.isEnterChinese;
            this.editListForm.isFirstPublish = copyExhibitionsDetailsData.ifoProduct.isFirstPublish;

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

            //处理展品类别
            Object.assign(this.editData, {
              exAreaId: copyExhibitionsDetailsData.ifoProduct.exAreaId,
              fstCatalogId: copyExhibitionsDetailsData.ifoProduct.fstCatalogId,
              secCatalogId: copyExhibitionsDetailsData.ifoProduct.secCatalogId
            });
          }); 
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters('registeredExhibits', ['exhibitionsDetailsData']),
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
    },
    //成功后的列表请求参数
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
    }
  },
  methods: {
    ...mapActions('registeredExhibits', [
      'getExhibitionsList', 'postAddExhibitionsList',
      'getExhibitionsDetails', 'postEditExhibitionsList', "getCompanyListAddExhibits"]),
    acceptForm(param) {
      if (param) {
        if (this.type === 'edit') {
          Object.assign(this.editListForm, param);
        } else if (this.type === 'add') {
          Object.assign(this.addListForm, param);
        }
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
    ycdUploadError() { // 上传原产地失败
      this.$message.error(res.message);
    },
    dzpUploadError() { // 第二种上传失败
      this.$message.error(res.message);
    },
    editycdUploadRemove(res) { // 编辑原产地移除
      this.editListForm.productSourceFileId = ''; // 移除赋值为空
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

    // ------------新增-----------
    ycdUploadSuccess(res) { // 上传原产地成功
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        this.addListForm.productSourceFileId = res.data; // 赋值
      }
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
    videoUploadSuccess(res) { // 第二种上传-影像
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        this.uploadFileIdObj.proVideoFileIds.push(res.data[0]);
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
    propertyUploadSuccess(res) { // 第二种上传-专利
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        this.uploadFileIdObj.proPropertyFileIds.push(res.data[0]);
      }
    },

    //提交
    submitList(formName) { // 提交修改
      if (formName === 'addForm') {
        this.$refs[formName].validate(validate => {
          if (validate) {
            this.postAddExhibitionsList(this.addFormParams).then(() => {
              this.getExhibitionsList(this.queryFormParams); // 新增成功调列表接口
              this.cancel();
              this.$refs[formName].resetFields();
            });
          } else {
            this.$message.error('请正确填写表单！');
          }
        });
      } else if (formName === 'editForm') {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.postEditExhibitionsList(this.editFormParams).then(res => {
              this.getExhibitionsList(this.queryFormParams);
              this.cancel();
              this.$refs[formName].resetFields(); // 清空表单
            });
          } else {
            this.$message.error('请正确填写表单！');
          }
        });
      }
    },
    cancel() {
      let obj = {
        type: "",
        show: false
      };
      if (this.type === "edit") {
        obj.type = 'edit';
      } else if (this.type === 'add') {
        obj.type = 'add';
      }
      this.$emit("close-modal", obj);
    }
  },
  async created() {
    await this.getCompanyListAddExhibits().then(res => {
      // console.log(res);
      if (res && res.length) {
        this.companyArray.splice(0, this.companyArray.length);
        for (let item of res) {
          this.companyArray.push({
            value: item.companyId,
            label: item.companyNameEn
          });
        }
      }
    });
  }
};
</script>
