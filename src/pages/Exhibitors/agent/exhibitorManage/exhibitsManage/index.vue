<style lang='less' scoped>
  #exhibits-manage {
    /deep/ .dialogDetails {
      .el-row {
        font-size: 16px;
        padding: 5px 0;
        .el-col:first-child {
          div {
            text-align: right;
          }
        }
      }
    }
  }
</style>
<template>
  <div id="exhibits-manage">
    <!-- 展品列表 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="展品列表" name="first">
        <el-form :inline="true" :model="queryForm">
          <el-form-item label="展品类别" size="small">
            <change-boothChild @change-child="acceptForm"></change-boothChild>
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
        </el-form>
        <!-- 表格 -->
        <el-table :data="exhibitionsListData.records" @selection-change="handleSelectionChange" border>
          <!-- productId loginType 详情要要-->
          <el-table-column type="selection" width="55"></el-table-column>
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
              {{ scope.row.exAreaCatalogName }} - {{ scope.row.fstNameCh }} - {{ scope.row.secNameCh }}
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
            <el-col :span="12"><div>{{this.localDetailsData.exAreaCatalogName}} - {{this.localDetailsData.fstNameCh}} - {{this.localDetailsData.secNameCh}}</div></el-col>
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
            <el-col :span="12"><div>{{this.localDetailsData.isEnterChinese? (this.localDetailsData.isEnterChinese === 1? "是":""):(this.localDetailsData.isEnterChinese === 0? "否":"")}}</div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>是否首次发布:</div></el-col>
            <el-col :span="12"><div>{{this.localDetailsData.isFirstPublish? (this.localDetailsData.isFirstPublish === 1? "是":""): (this.localDetailsData.isFirstPublish === 0? "否":"")}}</div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>往届展出记录:{{this.localDetailsData.historyExhibitionNum}}</div></el-col>
            <el-col :span="12"><div></div></el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDetails = false">关闭</el-button>
          </span>
        </el-dialog>

        <!-- 编辑 -->
        <el-dialog title="编辑" :visible.sync="dialogEdit" width="50%" :show-close="false">
          <components-modalBox type="edit" :id="idExhibit" :exhibitionsDetailsData="exhibitionsDetailsData" :exhibitionNum="exhibitionNum"
            @close-modal="cancelShow"></components-modalBox>
        </el-dialog>
                
        <!-- 新增 -->
        <el-dialog title="新增" :visible.sync="dialogAdd" width="50%" :show-close="false">
          <components-modalBox type="add" :show="dialogAdd" :exhibitionNum="exhibitionNum"
            @close-modal="cancelShow"></components-modalBox>
        </el-dialog>

        <el-button type="primary" @click="handleBatchSelect('126')" :disabled="this.selectionArr.length <= 0">批量转当届展品</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import componentsChangeBoothChild from "@/components/project/common/changeboothChild";
import { mapActions, mapGetters } from "vuex";
import componentsModalBox from "./components/modalBox";
export default {
  components: {
    "components-modalBox": componentsModalBox,
    "change-boothChild": componentsChangeBoothChild
  },
  data() {
    return {
      idExhibit: 0,
      activeName: 'first',
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
    cancelShow(param) {
      if (param.type === 'edit') {
        this.dialogEdit = param.show;
      } else if (param.type === 'add') {
        this.dialogAdd = param.show;
      }
    },
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
    handleAddList() { // 新增列表-show
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
      this.selectionArr.forEach(ele => {
        let currentSessionParams = {
          "ifoProduct": {
            "productId": ele
          },
          "currentNum": num
        };
        this.postCurrentSessionExhibitionsList(currentSessionParams).then(() => {
          this.$message.success('设为当届展品成功');
        }).catch(() => {
          this.$message.info('设为当届展品失败');
        });
      });
    },

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
        this.localDetailsData.exAreaCatalogName = this.exhibitionsDetailsData.ifoProduct.exAreaCatalogName;
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
        // let currentSessionParams = {
        //   "ifoProduct": {
        //     "productId": Id
        //   },
        //   "currentNum": num
        // };
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
      this.dialogEdit = true;
      this.idExhibit = Id;
    },
    // submitEditList(formName) { // 提交修改
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       this.postEditExhibitionsList(this.editFormParams).then(res => {
    //         this.dialogEdit = false;
    //         this.getExhibitionsList(this.queryFormParams);
    //         this.$refs[formName].resetFields(); // 清空表单
    //       });
    //     } else {
    //       this.$message.error('请正确填写表单！');
    //     }
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
    //         label: item.exhibitionAreaNameCh,
    //         value: item.exhibitionAreaArrangeId
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
