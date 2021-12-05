/*
* @file 展商动态列表 展商列表
* @author: weiwei
* @date:2019/3/28
*/
<template>
  <div class="page-contain">
    <el-tabs v-model="activeName">
      <el-tab-pane label="审核参展商企业动态" name="first">
        <!-- <el-button type="primary" @click="handleRouterToPublish">发布新动态</el-button>
        <div class="headText">贵公司在第{{this.currentExhibition}}届可发布数量： 已发布：{{this.exhibitNum}} 可发布：{{  3 - this.exhibitNum}}</div> -->
        <!-- 之后需要放开的搜索条件 -->
        <!-- <el-form :inline="true" :model="queryForm" class="demo-ruleForm">
          <el-form-item label="企业名称:" size="mini">
            <el-input v-model="queryForm.companyName"></el-input>
          </el-form-item>
          <el-form-item label="企业编号:" size="mini">
            <el-input v-model="queryForm.companyCode"></el-input>
          </el-form-item>
          <el-form-item label="审核状态:" size="mini">
            <el-select v-model="queryForm.approve" placeholder="请选择" @change="exhibitionNumChange">
              <el-option v-for="(item, index) in approveArray" :key="index"
                :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-form> -->
        <el-table :data="exhibitorsListData.records" border @selection-change="selectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="companyName" label="企业名称" align="center"></el-table-column>
          <el-table-column prop="contentTitle" label="新闻标题" align="center">
            <template slot-scope="scope">
              <div>「中文」{{scope.row.contentTitle}}</div>
              <div>「英文」{{scope.row.contentTitleEn}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="contentText" label="新闻内容" align="center" min-width="150px">
            <template slot-scope="scope">
              <div>「中文」{{scope.row.contentText}}</div>
              <div>「英文」{{scope.row.contentTextEn}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="picUrl" label="图片预览" align="center">
            <template slot-scope="scope">
              <div @click="handleBigPic(scope)"><img :src="scope.row.picUrl" alt="" style="height: 60px;max-width: 120px;"></div>
              <!-- 大图 -->
              <el-dialog title="图片" :visible.sync="bigPicVisible">
                <img :src="bigPicUrl" alt="" width="100%" height="100%">
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column prop="applyDate" label="更新时间" align="center"></el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              {{handleApproveResult(scope.row.approveResult)}}
              <!-- {{ scope.row.approveResult == '1' ? '已发布' : (scope.row.approveResult == '0' ? '待发布' : '') }} -->
            </template>
          </el-table-column>
          <el-table-column prop="" label="人气" align="center"></el-table-column>
          <el-table-column prop="operate" label="操作" align="center">
            <template slot-scope="scope">
              <div class="bm">
                <el-button type="text" @click="handleShowEdit(scope.row.exhibitorDynamicId)">修改</el-button>
                <el-button type="text" @click="handleShowDelete(scope.row.exhibitorDynamicId)">删除</el-button>
              </div>
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
            :total="exhibitorsListData.total">
          </el-pagination>
        </el-row>

        <el-row style="margin-bottom: 20px">
          <el-button type="primary" @change="checkApplyExhibition()">审核通过</el-button>
          <el-button type="primary" @change="checkApplyExhibition(2)">审核通过并标为优秀文章</el-button>
          <el-button type="success" @change="checkApplyExhibition(3)">审核不通过</el-button>
          <el-button type="info">删除</el-button>
          <el-button type="warning" @change="checkApplyExhibition(4)">移除优秀文章标记</el-button>
        </el-row>

        <el-form ref="form" :model="checkForm">
          <el-form-item label="审核意见：">
            <el-select style="width: 260px;" v-model="checkForm.approveResult" placeholder="请选择" @change="passChange">
              <el-option
                v-for="(item, index) in approveArray2"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核不通过原因(不超过200字符)：" v-if="isNot">
            <el-input style="width: 260px;" type="textarea" :rows="5" v-model="checkForm.approveExplain" clearable maxlength="200"></el-input>
          </el-form-item>
        </el-form>


        <!-- 编辑弹框 -->
        <el-dialog title="编辑" :visible.sync="dialogEdit" @close="closeEditDialog" width="50%">
          <el-form :model="editParams" :rules="rules" label-width="140px">
            <div class="hint">您当前可选择只发布中文或英文动态，也可中英文版同时发布。</div>
            <el-form-item label="标题（中文）：" prop="contentTitle">
              <el-input v-model="editParams.contentTitle" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="内容（中文）：" prop="contentText">
              <el-input :rows="4" type="textarea" v-model="editParams.contentText" maxlength="600"></el-input>
            </el-form-item>

            <div class="hint">如果您希望同时发布英文版，请继续录入英文状态。</div>
            <el-form-item label="标题（英文）：" prop="contentTitleEn">
              <el-input v-model="editParams.contentTitleEn" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="内容（英文）：" prop="contentTextEn">
              <el-input :rows="4" type="textarea" v-model="editParams.contentTextEn" maxlength="1000"></el-input>
            </el-form-item>

            <el-form-item label="图片：" prop="imageEnclosure">
              <el-upload :action="API_POT_URL + '/api/ifoFile/addFiles'" list-type="picture-card" :file-list="this.editFileList"
                :data="this.uploadParams" :limit="3" accept="jpg, jpeg, png" :on-success="handleUploadSuccess" :on-remove="handleUploadRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="handleSubmitEdit">保 存</el-button>
            <el-button @click="dialogEdit = false">取 消</el-button>
          </span>
        </el-dialog>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import listPageBase from "@/components/framework/mixins/listPageBase";
// import tableMixIn from "@/utils/helper/tableMixIn";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      approveArray: [],
      approveArray2: [],
      queryForm: {
        companyName: "",
        companyCode: "",
        approve: ""
      },
      API_POT_URL: process.env.API_POT_URL,
      activeName: "first",
      bigPicVisible: false,
      bigPicUrl: '',
      requireParams: {
        // "companyId": "aaa",
        // "releaseStatus": "1",
        // "approveResult": "1",
        "creatorId": "aaa",
        "creatorName": "test"
      },
      pageInfoData: { currentPage: 1, pageSize: 10 },
      dialogEdit: false,
      editParams: {
        contentTitle: '',
        contentText: '',
        contentTitleEn: '',
        contentTextEn: '',
        imageEnclosure: '',
        // modifierId: 'aaa',
        // modifierName: 'aaa',
        companyName: '',
        exhibitorDynamicId: ''
      },
      editFileList: [],
      editFileIdList: [],
      rules: {
        contentTitle: [
          { required: true, message: "请输入标题", trigger: "blur" }
        ],
        contentText: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { max: 600, message: '长度在 600 个字符', trigger: 'blur' }
        ]
      },
      // 审核不通过变量
      isNot: false,
      checkForm: {
        approveResult: "",
        approveExplain: ""
      }
    };
  },
  computed: {
    ...mapGetters('exhibitorsDynamic', ['exhibitorsListData', 'exhibitNum', 'exhibitorsDetailsData']),
    ...mapGetters('commonStore', ['exhibitionNum', 'currentExhibition']),
    queryListParams() {
      let params = {
        // dynamicInfo: this.requireParams,
        // companyId: this.requireParams.companyId
        // dynamicInfo: {},
        pageNum: this.pageInfoData.currentPage,
        pageSize: this.pageInfoData.pageSize
      };
      return params;
    },
    editListParams() {
      let _params = this.editParams;
      _params.imageEnclosure = this.editFileIdList.join(',');
      _params.operateType = 's';
      let obj = { // 编辑传参结构就是这样
        dynamicInfos: [_params]
      };
      return obj;
    },
    uploadParams() {
      let params = {
        creatorId: this.requireParams.creatorId,
        creatorName: this.requireParams.creatorName
      };
      return params;
    },
    exhibitorNum() {
      let params = {
        publishedExhibitionCountSession: {
          numberSessions: this.currentExhibition + ""
        }
      };
      return params;
    }
  },
  methods: {
    ...mapActions('exhibitorsDynamic', ['getExhibitorsList', 'getExhibitNum', 'getExhibitorsDetails',
      'postEditExhibitors', 'postDeleteExhibitors']),
    ...mapActions('commonStore', ["getExhibitionNum", "getCurrentExhibitionNum"]),
    ...mapActions("informationBusiness", ["checkExhibitionApplyInformationBusiness"]),
    selectionChange(param) {
      console.log(param);
      
    },
    // 审核意见下拉改变事件
    passChange(val) {
      if (val === "0") {
        this.isNot = true;
      } else {
        this.isNot = false;
      }
    },
    checkApplyExhibition(obj) {
      this.checkExhibitionApplyInformationBusiness(obj).then(res => {
        this.pageInfoData = { currentPage: 1, pageSize: 10 };
        this.getExhibitorsList(this.queryListParams);
      });
    },
    handleApproveResult(param) {
      switch (param) {
        case "0":
          return "未审核";
        case "1":
          return "不通过";
        case "2":
          return "通过";
        case "3":
          return "未发布";
        default:
          return "";
      }
    },
    handleBigPic(scope) {
      this.bigPicUrl = scope.row.picUrl;
      this.bigPicVisible = true;
    },
    handleRouterToPublish() { // 跳转发布新动态页面
      this.$router.push({ path: '/publishDynamic' });
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getExhibitorsList(this.queryListParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getExhibitorsList(this.queryListParams);
    },
    handleShowEdit(id) {
      this.getExhibitorsDetails(id).then(res => {
        this.editParams.contentTitle = this.exhibitorsDetailsData.contentTitle;
        this.editParams.contentText = this.exhibitorsDetailsData.contentText;
        this.editParams.contentTitleEn = this.exhibitorsDetailsData.contentTitleEn;
        this.editParams.contentTextEn = this.exhibitorsDetailsData.contentTextEn;
        this.editFileList = this.exhibitorsDetailsData.fileList; // unload图片数组
        this.editFileIdList = JSON.parse(JSON.stringify(this.exhibitorsDetailsData.fileIdList)); // 提交用

        // this.editParams.modifierId = this.exhibitorsDetailsData.modifierId;
        // this.editParams.modifierName = this.exhibitorsDetailsData.modifierName;
        this.editParams.companyName = this.exhibitorsDetailsData.companyName;
        this.editParams.exhibitorDynamicId = this.exhibitorsDetailsData.exhibitorDynamicId;
      });
      this.dialogEdit = true;
    },
    closeEditDialog() { // 关闭编辑dialog时清空
      var key;
      for (key in this.editParams) {
        this.editParams[key] = '';
      }
      this.editFileList = '';
      this.editFileIdList = '';
    },
    handleUploadSuccess(res, file, fileList) {
      // console.log(res, file, fileList, 'res, file, fileList');
      let item = file.response.data[0];
      this.editFileIdList.push(item);
    },
    handleUploadRemove(file, fileList) {
      // console.log(file, fileList, 'file, fileList');
      if (file.response) {
        let _item = file.response.data[0];
        this.editFileIdList.splice(this.editFileIdList.findIndex(item => item === _item), 1);
      } else {
        let _item = file.url.split('=')[1];
        this.editFileIdList.splice(this.editFileIdList.findIndex(item => item === _item), 1);
      }
    },
    handleSubmitEdit() { // 提交编辑
      this.postEditExhibitors(this.editListParams).then(res => {
        var key;
        for (key in this.editParams) {
          this.editParams[key] = '';
        }
        this.dialogEdit = false;
        this.$message.success('编辑成功');
      });
    },
    handleShowDelete(id) {
      this.$confirm('此操作将永久删除此条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postDeleteExhibitors(id).then(res => {
          this.$message.success('删除成功');
          this.getExhibitorsList(this.queryListParams); // 刷新列表
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    }
  },
  async created() {
    this.approveArray = await kindo.dictionary.get('ifoCommonApproveStatus');
    if (this.approveArray.length) {
      this.approveArray2 = [];
      for (let item of this.approveArray) {
        if (item.value !== 0) {
          this.approveArray2.push(item);
        }
      }
    }

    if (!this.exhibitionNum) {
      await this.getExhibitionNum().then(res => {
        if (res) {
          let array = [];
          for (let item of res) {
            array.push({
              label: item.exhibitionNum,
              value: item.exhibitionNum,
              current: item.current
            });
          }
          this.$store.commit('commonStore/EXHIBITION_NUM', array);
          for (let item of this.exhibitionNum) {
            if (item.current) {
              this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
              // this.ruleForm.exhibitionNum = this.currentExhibition;
              break;
            }
          }
        }
      });
    } else if (!this.currentExhibition) {
      for (let item of this.exhibitionNum) {
        if (item.current) {
          this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
          // this.ruleForm.exhibitionNum = this.currentExhibition;
          break;
        }
      }
    }
    
    this.getExhibitorsList(this.queryListParams);
    // .then(res => {
    //   console.log(this.exhibitorsListData);
    // });
    this.getExhibitNum(this.exhibitorNum);
  }
};
</script>
<style lang='less' scoped>
@import '../../../theme/project/css/flex.less';
.page-contain {
  .headText {
    color: red;
    margin: 20px 10px;
  }
  .hint {
    height: 50px;
    // margin: 30px 0px;
    margin-bottom: 10px;
    background: #f2f2f2;
    line-height: 50px;
    padding-left: 20px;
    color: rgb(0, 140, 255);
  }
}
</style>

