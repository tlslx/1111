<template>
  <div class="page-contain">
    <!-- 展品列表 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="展品列表" name="first">
        <el-form :inline="true" :model="queryForm">
          <el-form-item label="展品类别" size="small">
            <components-changeBoothChild @change-child="acceptForm"></components-changeBoothChild>
          </el-form-item>
          <el-form-item label="展品名称" size="small" prop="productName">
            <el-input placeholder="请输入" v-model="queryForm.productName" clearable></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="handleListQuery" size="mini">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="bm">
          <span>企业中文名称：{{companyNameCh}}</span> <span>企业英文名称：{{companyNameEn}}</span>
        </div>
        <!-- 表格 -->
        <!-- @selection-change="handleSelectionChange" -->
        <el-table :data="exhibitionsListData.records" border>
          <!-- productId loginType 详情要要-->
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->
          <el-table-column prop="productSession" label="届数" align="center"></el-table-column>
          <el-table-column prop="productName" label="展品名称" align="center"></el-table-column>
          <el-table-column prop="preFileId" label="图片预览" align="center">
            <template slot-scope="scope">
              <!-- <img :src = "(scope.row.preFileId != null)?handleSrc(scope.row.preFileId):''" alt="" style="height: 60px"> -->
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
              {{ scope.row.fstNameCh }} {{ scope.row.secNameCh }}
            </template>
          </el-table-column>
          <el-table-column prop="productSource" label="原产地" align="center"></el-table-column>
          <el-table-column prop="operate" label="操作" align="center">
            <template slot-scope="scope">
              <!-- 编辑需要productId -->
              <el-button type="text" @click="handleXQfn(scope.row.productId)">查看详情</el-button>
              <!-- <el-button type="text" @click="handleDJfn(scope.row.productId, '126')">转为当届展品</el-button>
              <el-button type="text" @click="handleEditShow(scope.row.productId)">编辑</el-button>
              <el-button type="text" @click="handleDeletefn(scope.row.productId)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" class="pagination-contain">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page = pageInfoData.currentPage
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageInfoData.pageSize"
            layout="prev, pager, next, jumper"
            :total="exhibitionsListData.total">
          </el-pagination>
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
            <el-col :span="12"><div>{{this.localDetailsData.fstNameCh}} {{this.localDetailsData.secNameCh}}</div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>展品原产地:</div></el-col>
            <el-col :span="12"><div>
                <span v-for="(item, i) in this.localDetailsData.ycdList" :key="i">
                  <img :src="item.url" alt="" style="height: 60px;max-width: 120px;">
                </span>
              </div></el-col>
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
            <el-col :span="12"><div>{{this.localDetailsData.isEnterChinese}}</div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>是否首次发布:</div></el-col>
            <el-col :span="12"><div>{{this.localDetailsData.isFirstPublish}}</div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>往届展出记录:</div></el-col>
            <el-col :span="12"><div></div></el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDetails = false">关闭</el-button>
          </span>
        </el-dialog>

        <!-- <el-button type="primary" @click="handleBatchSelect('126')" :disabled="this.selectionArr.length <= 0">批量转当届展品</el-button> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import componentsChangeBoothChild from "@/components/project/common/changeboothChild";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "components-changeBoothChild": componentsChangeBoothChild
  },
  data() {
    return {
      companyNameCh: "",
      companyNameEn: "",
      idExhibit: 0,
      activeName: 'first',
      bigPicVisible: false,
      bigPicUrl: '',
      queryForm: {
        isAsc: false,
        companyId: "",
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
      dialogEdit: false, // 编辑弹框
      selectionArr: [], // 存储多选的productId
      dialogDetails: false, // 详情弹框

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
      }
    };
  },
  computed: {
    ...mapGetters('registeredExhibits', ['exhibitionsListData', 'exhibitionsDetailsData']),
    ...mapGetters('commonStore', ['exhibitionNum', 'boothArray']),
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
    ...mapActions('registeredExhibits', ['getExhibitionsList', 'getExhibitionsDetails', 'postDeleteExhibitionsList',
      'postCurrentSessionExhibitionsList', 'postAddExhibitionsList', 'postEditExhibitionsList', 'postDeleteycdFile', 'postDeleteMoreFile']),
    ...mapActions('commonStore', ['getExhibitionNum', 'getBooth', 'getBoothChild']),
    acceptForm(param) {
      Object.assign(this.queryFormParams, param);
    },
    handleBigPic(scope) {
      this.bigPicUrl = scope.row.picUrl;
      this.bigPicVisible = true;
    },
    handleListQuery() { // 查询表单
      this.getExhibitionsList(this.queryFormParams);
    },
    // handleSrc(preFileId) {
    //   // window.open(this.API_POT_URL + '/api/ifoFile/getImg?fileId=' + preFileId);
    //   let srcUrl = this.API_POT_URL + '/api/ifoFile/getImg?fileId=' + preFileId;
    //   return srcUrl;
    // },
    // handleAddList() { // 新增列表-show
    //   this.dialogAdd = true;
    // },
    // handleSelectionChange(val) { // 选项
    //   this.selectionArr = [];
    //   if (val.length > 0) {
    //     val.forEach(ele => {
    //       this.selectionArr.push(ele.productId);
    //     });
    //   }
    // },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getExhibitionsList(this.queryFormParams); // 查询列表
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getExhibitionsList(this.queryFormParams); // 查询列表
    },
    // handleBatchSelect(num) { // 多选表格
    //   this.selectionArr.forEach(ele => {
    //     let currentSessionParams = {
    //       "ifoProduct": {
    //         "productId": ele
    //       },
    //       "currentNum": num
    //     };
    //     this.postCurrentSessionExhibitionsList(currentSessionParams).then(() => {
    //       this.$message.success('设为当届展品成功');
    //     }).catch(() => {
    //       this.$message.info('设为当届展品失败');
    //     });
    //   });
    // },
    // ycdUploadSuccess(res) { // 上传原产地成功
    //   if (res.flag === "0") {
    //     this.$message.error(res.message);
    //   }
    //   if (res.flag === "1") {
    //     this.$message.success('上传成功');
    //     this.addListForm.productSourceFileId = res.data; // 赋值
    //   }
    // },
    // editycdUploadSuccess(res) { // 上传原产地成功
    //   if (res.flag === "0") {
    //     this.$message.error(res.message);
    //   }
    //   if (res.flag === "1") {
    //     this.$message.success('上传成功');
    //     this.editListForm.productSourceFileId = res.data; // 赋值
    //   }
    // },
    // editycdUploadRemove(res) { // 编辑原产地移除
    //   this.editListForm.productSourceFileId = ''; // 移除赋值为空
    // },
    // ycdUploadError() { // 上传原产地失败
    //   this.$message.error(res.message);
    // },

    // 四种多文件上传 1新增
    // picUploadSuccess(res) { // 第二种上传-图片
    //   if (res.flag === "0") {
    //     this.$message.error(res.message);
    //   }
    //   if (res.flag === "1") {
    //     this.$message.success('上传成功');
    //     this.uploadFileIdObj.proPicsFileIds.push(res.data[0]);
    //   }
    // },
    // awardsUploadSuccess(res) { // 第二种上传-奖金
    //   if (res.flag === "0") {
    //     this.$message.error(res.message);
    //   }
    //   if (res.flag === "1") {
    //     this.$message.success('上传成功');
    //     this.uploadFileIdObj.proAwardFileIds.push(res.data[0]);
    //   }
    // },
    // videoUploadSuccess(res) { // 第二种上传-影像
    //   if (res.flag === "0") {
    //     this.$message.error(res.message);
    //   }
    //   if (res.flag === "1") {
    //     this.$message.success('上传成功');
    //     this.uploadFileIdObj.proVideoFileIds.push(res.data[0]);
    //   }
    // },
    // propertyUploadSuccess(res) { // 第二种上传-专利
    //   if (res.flag === "0") {
    //     this.$message.error(res.message);
    //   }
    //   if (res.flag === "1") {
    //     this.$message.success('上传成功');
    //     this.uploadFileIdObj.proPropertyFileIds.push(res.data[0]);
    //   }
    // },

    // 四种多文件上传 2编辑
    // editpicUploadSuccess(res, file, fileList) { // 第二种上传-图片
    //   // console.log(res, file, fileList, '上传');
    //   if (res.flag === "0") {
    //     this.$message.error(res.message);
    //   }
    //   if (res.flag === "1") {
    //     this.$message.success('上传成功');
    //     let item = file.response.data[0];
    //     this.editFileList.tpFileIdsList.push(item);
    //     // this.editUploadFileIdObj.proPicsFileIds = fileIdArr;
    //   }
    // },
    // editawardsUploadSuccess(res, file, fileList) { // 第二种上传-奖金
    //   if (res.flag === "0") {
    //     this.$message.error(res.message);
    //   }
    //   if (res.flag === "1") {
    //     this.$message.success('上传成功');
    //     let item = file.response.data[0];
    //     this.editFileList.hjFileIdsList.push(item);
    //     // this.edituploadFileIdObj.proAwardFileIds = fileIdArr;
    //   }
    // },
    // editvideoUploadSuccess(res, file, fileList) { // 第二种上传-影像
    //   if (res.flag === "0") {
    //     this.$message.error(res.message);
    //   }
    //   if (res.flag === "1") {
    //     this.$message.success('上传成功');
    //     let item = file.response.data[0];
    //     this.editFileList.spFileIdsList.push(item);
    //     // this.edituploadFileIdObj.proVideoFileIds = fileIdArr;
    //   }
    // },
    // editpropertyUploadSuccess(res, file, fileList) { // 第二种上传-专利
    //   if (res.flag === "0") {
    //     this.$message.error(res.message);
    //   }
    //   if (res.flag === "1") {
    //     this.$message.success('上传成功');
    //     let item = file.response.data[0];
    //     this.editFileList.cqFileIdsList.push(item);
    //     // this.edituploadFileIdObj.proPropertyFileIds = fileIdArr;
    //   }
    // },

      // 四种多文件上传 3移除
    // editpicUploadRemove(file, fileList) { // 编辑移除-图片
    //   // console.log(file, fileList, 'file, fileList');
    //   if (file.response) {
    //     let _item = file.response.data[0];
    //     this.editFileList.tpFileIdsList.splice(this.editFileList.tpFileIdsList.findIndex(item => item === _item), 1);
    //   } else {
    //     let _item = file.url.split('=')[1];
    //     this.editFileList.tpFileIdsList.splice(this.editFileList.tpFileIdsList.findIndex(item => item === _item), 1);
    //   }
    //   // this.editUploadFileIdObj.proPicsFileIds = fileIdArr;
    // },
    // editawardsUploadRemove(file, fileList) { // 编辑移除-奖金
    //   if (file.response) {
    //     let _item = file.response.data[0];
    //     this.editFileList.spFileIdsList.splice(this.editFileList.spFileIdsList.findIndex(item => item === _item), 1);
    //   } else {
    //     let _item = file.url.split('=')[1];
    //     this.editFileList.spFileIdsList.splice(this.editFileList.spFileIdsList.findIndex(item => item === _item), 1);
    //   }
    //   // this.editUploadFileIdObj.proAwardFileIds = fileIdArr;
    // },
    // editvideoUploadRemove(file, fileList) { // 编辑移除-影像
    //   if (file.response) {
    //     let _item = file.response.data[0];
    //     this.editFileList.hjFileIdsList.splice(this.editFileList.hjFileIdsList.findIndex(item => item === _item), 1);
    //   } else {
    //     let _item = file.url.split('=')[1];
    //     this.editFileList.hjFileIdsList.splice(this.editFileList.hjFileIdsList.findIndex(item => item === _item), 1);
    //   }
    //   // this.editUploadFileIdObj.proVideoFileIds = fileIdArr;
    // },
    // editpropertyUploadRemove(file, fileList) { // 编辑移除-专利
    //   if (file.response) {
    //     let _item = file.response.data[0];
    //     this.editFileList.cqFileIdsList.splice(this.editFileList.cqFileIdsList.findIndex(item => item === _item), 1);
    //   } else {
    //     let _item = file.url.split('=')[1];
    //     this.editFileList.cqFileIdsList.splice(this.editFileList.cqFileIdsList.findIndex(item => item === _item), 1);
    //   }
    //   // this.editUploadFileIdObj.proPropertyFileIds = fileIdArr;
    // },

    // dzpUploadError() { // 第二种上传失败
    //   this.$message.error(res.message);
    // },
    // submitAddList(formName) { // 提交新增
    //   this.$refs[formName].validate(validate => {
    //     if (validate) {
    //       this.postAddExhibitionsList(this.addFormParams).then(() => {
    //         this.getExhibitionsList(this.queryFormParams); // 新增成功调列表接口
    //         this.dialogAdd = false;
    //         this.$refs[formName].resetFields();
    //       });
    //     } else {
    //       this.$message.error('请正确填写表单！');
    //     }
    //   });
    // },

    // 查看详情
    handleXQfn(Id) {
      this.getExhibitionsDetails({ loginType: 0, productId: Id }).then(res => {
        var key;
        for (key in this.localDetailsData) {
          if (typeof (this.localDetailsData[key]) === 'object' && Array.isArray(this.localDetailsData[key])) {
            this.localDetailsData[key] = [];
          }
          this.localDetailsData[key] = '';
        }
        // console.log(this.exhibitionsDetailsData, 'exhibitionsDetailsData');
        this.localDetailsData.productSession = this.exhibitionsDetailsData.ifoProduct.productSession;
        this.localDetailsData.productName = this.exhibitionsDetailsData.ifoProduct.productName;
        this.localDetailsData.fstNameCh = this.exhibitionsDetailsData.ifoProduct.fstNameCh;
        this.localDetailsData.secNameCh = this.exhibitionsDetailsData.ifoProduct.secNameCh;
        // this.localDetailsData.productSource = this.exhibitionsDetailsData.ifoProduct.productSource; // 原产地
        this.localDetailsData.productDescription = this.exhibitionsDetailsData.ifoProduct.productDescription; // 字符串数组
        this.localDetailsData.productFunction = this.exhibitionsDetailsData.ifoProduct.productFunction;
        this.localDetailsData.isEnterChinese = this.exhibitionsDetailsData.ifoProduct.isEnterChinese;
        this.localDetailsData.isFirstPublish = this.exhibitionsDetailsData.ifoProduct.isFirstPublish;
        // 展示图片
        this.localDetailsData.cqList = this.exhibitionsDetailsData.cqList;
        this.localDetailsData.hjList = this.exhibitionsDetailsData.hjList;
        this.localDetailsData.spList = this.exhibitionsDetailsData.spList;
        this.localDetailsData.tpList = this.exhibitionsDetailsData.tpList;
        this.localDetailsData.ycdList = this.exhibitionsDetailsData.ycdList;

        this.dialogDetails = true;
      });
    },

    // handleDJfn(Id, num) { // 转换为当届展品
    //   this.$confirm('将此展品设为当届展品, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     let currentSessionParams = {
    //       "ifoProduct": {
    //         "productId": Id
    //       },
    //       "currentNum": num
    //     };
    //     this.postCurrentSessionExhibitionsList(currentSessionParams).then(() => {
    //       this.$message.success('设为当届展品成功');
    //     }).catch(() => {
    //       this.$message.info('设为当届展品失败');
    //     });
    //   }).catch(() => {
    //     this.$message.info('已取消设置');
    //   });
    // },

    // handleEditShow(Id) { // 展示编辑弹框,先做详情查询
    //   this.getExhibitionsDetails({ loginType: 0, productId: Id }).then(res => {
    //     var key;
    //     for (key in this.editListForm) {
    //       if (key !== 'companyId') {
    //         this.editListForm[key] = ''; // 这里清空了editListForm, 所以要补回companyId
    //       }
    //     }
    //     // console.log(this.exhibitionsDetailsData, 'exhibitionsDetailsData');
    //     this.editListForm.productId = this.exhibitionsDetailsData.ifoProduct.productId; // 必传项
    //     this.editListForm.productSession = this.exhibitionsDetailsData.ifoProduct.productSession;
    //     this.editListForm.productName = this.exhibitionsDetailsData.ifoProduct.productName;
    //     this.editListForm.exAreaId = this.exhibitionsDetailsData.ifoProduct.exAreaId;
    //     this.editListForm.fstCatalogId = this.exhibitionsDetailsData.ifoProduct.fstCatalogId;
    //     this.editListForm.secCatalogId = this.exhibitionsDetailsData.ifoProduct.secCatalogId;
    //     this.editListForm.productSourceFileId = this.exhibitionsDetailsData.ifoProduct.productSourceFileId; // 原产地图片,需要
    //     this.editListForm.productDescription = this.exhibitionsDetailsData.ifoProduct.productDescription;
    //     this.editListForm.productFunction = this.exhibitionsDetailsData.ifoProduct.productFunction;
    //     this.editListForm.isEnterChinese = this.exhibitionsDetailsData.ifoProduct.isEnterChinese;
    //     this.editListForm.isFirstPublish = this.exhibitionsDetailsData.ifoProduct.isFirstPublish;

    //     this.editFileList.tpList = this.exhibitionsDetailsData.tpList;
    //     this.editFileList.hjList = this.exhibitionsDetailsData.hjList;
    //     this.editFileList.spList = this.exhibitionsDetailsData.spList;
    //     this.editFileList.cqList = this.exhibitionsDetailsData.cqList;
    //     this.editFileList.ycdList = this.exhibitionsDetailsData.ycdList;
    //     // [id,id,id]
    //     this.editFileList.tpFileIdsList = JSON.parse(JSON.stringify(this.exhibitionsDetailsData.tpFileIdsList));
    //     this.editFileList.spFileIdsList = JSON.parse(JSON.stringify(this.exhibitionsDetailsData.spFileIdsList));
    //     this.editFileList.hjFileIdsList = JSON.parse(JSON.stringify(this.exhibitionsDetailsData.hjFileIdsList));
    //     this.editFileList.cqFileIdsList = JSON.parse(JSON.stringify(this.exhibitionsDetailsData.cqFileIdsList));
    //     this.dialogEdit = true;
    //   });
    // },

    handleDeletefn(Id) { // 删除
      this.$confirm('此操作将永久删除本条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postDeleteExhibitionsList({ productId: Id }).then(() => {
          this.$message.success('删除成功');
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    }
  },
  async created() {
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
    if (!this.boothArray) {
      await this.getBooth().then(res => {
        let array = [];
        for (let item of res) {
          array.push({
            label: item.exhibitionAreaNameCh,
            value: item.exhibitionAreaArrangeId
          });
        }
        this.$store.commit("commonStore/BOOTH_ARRAY", array);
      });
    }

    let { companyId, companyNameCh, companyNameEn } = JSON.parse(this.$route.query.row);
    this.companyNameCh = companyNameCh;
    this.companyNameEn = companyNameEn;
    Object.assign(this.queryForm, { companyId });

    this.getExhibitionsList(this.queryFormParams);
  }
};
</script>
<style lang='less' scoped>
@import "../../../../../../theme/project/css/flex.less";
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
