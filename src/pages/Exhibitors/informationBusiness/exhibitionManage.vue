<template>
  <div class="page-contain">
    <!-- 展品列表 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="展品申请管理" name="first">
        <el-form :inline="true" :model="queryForm">
          <el-form-item label="展品类别" size="small">
            <components-changeBoothChild @change-child="acceptQueryForm"></components-changeBoothChild>
          </el-form-item>
          <el-form-item label="展品名称" size="small" prop="productName">
            <el-input placeholder="请输入" v-model="queryForm.productName" clearable></el-input>
          </el-form-item>
          <el-form-item label="初审核状态" size="small" prop="productName">
            <el-select v-model="queryForm.firstApprove" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in ApproveArray" :key="index"
                :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="复审核状态" size="small" prop="productName">
            <el-select v-model="queryForm.firstApprove" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item, index) in ApproveArray" :key="index"
                :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业名称" size="small" prop="productName">
            <el-input placeholder="请输入" v-model="queryForm.companyName" clearable></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="handleListQuery" size="mini">查询</el-button>
          </el-form-item>
          <!-- <el-row>
            <el-col :span="9" style="text-align:center">
            </el-col>
            <el-col :span="7" style="text-align:right">
            </el-col>
          </el-row> -->
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" @selection-change="handleSelectionChange" border>
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
          <el-table-column prop="firstApprove" label="初审状态" align="center" :formatter="formatterRow"></el-table-column>
          <el-table-column prop="reApprove" label="复审状态" align="center" :formatter="formatterRow"></el-table-column>
          <el-table-column prop="operate" label="操作" align="center">
            <template slot-scope="scope">
              <!-- 编辑需要productId -->
              <el-button type="text" @click="handleXQfn(scope.row.productId)">查看详情</el-button>
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
              :current-page='queryForm.current'
              :page-sizes="[10, 20, 30, 40]"
              :page-size="queryForm.size"
              layout="sizes, prev, pager, next"
              :total="total">
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
          <hr style="padding: 0 10;" />
          <el-form v-if="approveFlag" :inline="true" ref="ruleForm" :model="ruleForm" label-width="200px" style="width:100%">
            <el-form-item label="审核:" size="mini">
              <el-select v-model="ruleForm.Approve" placeholder="请选择">
                <el-option v-for="(item, index) in ApproveArray2" :label="item.label"
                :value="item.value" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item require label="不通过原因:" size="mini" placeholder="请选择" prop="reason" v-if="ruleForm.firstApprove === '1'">
              <el-select v-model="ruleForm.reason" placeholder="请选择">
                <el-option v-for="item in reasonArray" :label="item.label"
                :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" " size="mini" placeholder="请选择" v-if="ruleForm.firstApprove === '1'">
              <el-input
                style="min-width:250px"
                type="textarea"
                :rows="3"
                placeholder="请输入原因"
                v-model="ruleForm.reasonElse">
              </el-input>
            </el-form-item> -->
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="affirm">确定</el-button>
            <el-button @click="dialogDetails = false">关闭</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import componentsChangeBoothChild from "@/components/project/common/changeboothChild";
export default {
  components: {
    "components-changeBoothChild": componentsChangeBoothChild
  },
  data() {
    return {
      approveFlag: false,
      approveObj: {},
      ApproveArray: [],
      ApproveArray2: [],
      tableData: [],
      total: 0,
      activeName: 'first',
      bigPicVisible: false,
      bigPicUrl: '',
      queryForm: {
        current: 1,
        size: 10,

        exAreaId: '',
        fstCatalogId: '',
        secCatalogId: '',
        productName: '',
        firstApprove: "",
        reApprove: "",
        companyName: ""
      },
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
      },
      ruleForm: {
        Approve: ""
      }
    };
  },
  computed: {
    ...mapGetters('registeredExhibits', ['exhibitionsDetailsData'])
  },
  methods: {
    ...mapActions('registeredExhibits', ["postCurrentSessionExhibitionsList", "getExhibitionsDetails"]),
    ...mapActions("informationBusiness", ["getTableDataInformationBusiness", "checkExhibitionInformationBusiness"]),
    formatterRow(row, column, cellValue, index) {
      let prop = column.property;
      let value = row[prop];
      if (prop === "firstApprove" || prop === "reApprove") {
        for (let item of this.ApproveArray) {
          if (item.valeu === value) {
            return item.label;
          } else {
            return "";
          }
        }
      } else {
        return "";
      }
    },
    getTableData(obj) {
      if (obj) {
        let array = [];
        for (let key in obj) {
          array.push(`${key}=${obj[key]}`);
        }
        let str = array.join("&");
        this.getTableDataInformationBusiness(str).then(res => {
          // console.log(res);
          if (res && res.records) {
            this.tableData = res.records;
            this.total = this.total;
          }
        });
      }
    },
    acceptQueryForm(param) {
      Object.assign(this.queryForm, param);
    },
    handleBigPic(scope) {
      this.bigPicUrl = scope.row.picUrl;
      this.bigPicVisible = true;
    },
    handleListQuery() { // 查询表单
      this.getExhibitionsList(this.queryFormParams);
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
      this.queryForm.size = val;
      this.getTableData(this.queryForm); // 查询列表
    },
    handleCurrentChange(val) {
      this.queryForm.current = val;
      this.getTableData(this.queryForm); // 查询列表
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
    // 查看详情
    handleXQfn(Id) {
      // loginType: 0,
      this.getExhibitionsDetails({ productId: Id }).then(res => {
        console.log(res);
        let ifoApprove = res.ifoProduct;
        //判断初审复审
        if (ifoApprove.firstApprove === 0) {
          this.approveFlag = true;
          this.approveObj = {
            productId: id,
            firstApprove: ""
          };
        } else if (ifoApprove.firstApprove === 2) {
          if (ifoApprove === 0) {
            this.approveFlag = true;
            this.approveObj = {
              productId: id,
              reApprove: ""
            };
          } else {
            this.approveFlag = false;
            this.approveObj = {};
          }
        } else {
          this.approveFlag = false;
          this.approveObj = {};
        }

        for (let key in this.localDetailsData) {
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
    //确认审核
    affirm() {
      for (let key in this.approveObj) {
        let prop = key;
        if (key) {
          if (prop === "firstApprove" || prop === "reApprove") {
            this.approveObj[prop] = this.ruleForm.Approve;
          }
        } else {
          break;
        }
      }
      //请求审核接口
      this.checkExhibitionInformationBusiness(this.approveObj).then(res => {
        this.queryForm = {
          current: 1,
          size: 10,

          exAreaId: '',
          fstCatalogId: '',
          secCatalogId: '',
          productName: '',
          firstApprove: "",
          reApprove: "",
          companyName: ""
        };
        this.getTableData(obj);
      });
    }
  },
  async created() {
    this.ApproveArray = await kindo.dictionary.get('ifoCommonApproveStatus');
    if (this.ApproveArray.length) {
      this.ApproveArray2 = [];
      for (let item of this.ApproveArray) {
        if (item.value !== 0) {
          this.ApproveArray2.push(item);
        }
      }
    }
    this.getTableData(this.queryForm);
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
