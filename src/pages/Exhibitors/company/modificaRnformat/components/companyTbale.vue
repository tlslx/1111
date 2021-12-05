<style scoped>
.wisd{
  width: 150px;
}
</style>
<template>
  <div>
    <el-form :inline="true" :model="formInline" :rules="ruleted" ref="ruleFormsed"  class="demo-form-inline">
      <el-form-item label="展品类别:" prop="enNames">
        <components-changeBoothChild @change-child="acceptForm"></components-changeBoothChild>
        <!-- <el-input v-model="formInline.companyName" clearable></el-input> -->
      </el-form-item>
      <el-form-item label="展品名称:" prop="enNames">
        <el-input class="wisd" v-model="formInline.productName" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select class="wisd" v-model="formInline.reApprove" placeholder="请选择" :clearable='true'>
          <!-- <el-option v-for="(item, index) in dataList" :key="index" @change="handelChange"  :label="item.label" :value="item.value"></el-option> -->
          <el-option label="未审核" value="0"></el-option>  
          <el-option label="审核通过" value="2"></el-option>  
          <el-option label="审核不通过" value="1"></el-option>  
          <!-- <el-option label="审核不通过" value="2"></el-option>   -->
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <!-- <el-button type="primary" @click="increase">新增</el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="productSession" label="届数" align="center">
      </el-table-column>
      <el-table-column prop="productName" label="展品名称" align="center">
      </el-table-column>
      <el-table-column prop="fstNameCh" label="展品类别" align="center">
        <template slot-scope="scope">
          {{ scope.row.fstNameCh }} {{ scope.row.secNameCh }}
        </template>
      </el-table-column>
      <el-table-column prop="productSource" label="展品原产地" align="center">
      </el-table-column>
      <el-table-column prop="exAreaCatalogName" label="展品描述" align="center">
      </el-table-column>
      <el-table-column prop="productFunction" label="展品功能" align="center" width="150">
      </el-table-column>
      <!-- <el-table-column prop="applyModifyTime" label="是否当届" align="center" width="150">
      
      </el-table-column> -->
      <el-table-column prop="firstApprove" label="初审状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.firstApprove | statusFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="reApprove" label="复审状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.reApprove | statusFilter }}
        </template>
      </el-table-column>
      <el-table-column  label="操作" align="center" width="180">
        <template slot-scope="scope">
          <div class="bm bm-pc">
            <el-button type="text"  @click="detail(scope.row.productId, scope.$index)" >查看详情</el-button>
            <!-- <el-button type="text"  @click="onServe(scope.row, scope.$index)">审核</el-button> -->
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfoData.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageInfoData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfoData.total">
    </el-pagination>
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
          <!-- <el-row :gutter="10">
            <el-col :span="12"><div>是否已进入中国市场:</div></el-col>
            <el-col :span="12"><div>{{this.localDetailsData.isEnterChinese}}</div></el-col>
          </el-row> -->
          <!-- <el-row :gutter="10">
            <el-col :span="12"><div>是否首次发布:</div></el-col>
            <el-col :span="12"><div>{{this.localDetailsData.isFirstPublish}}</div></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12"><div>往届展出记录:</div></el-col>
            <el-col :span="12"><div></div></el-col>
          </el-row> -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDetails = false">关闭</el-button>
          </span>
        </el-dialog>
  </div>
</template>
<script>
import componentsChangeBoothChild from "@/components/project/common/changeboothChildList";
import { mapActions } from "vuex";
export default {
  props: {
    companyId: {
      type: String,
      default: () => { }
    }
  },
  components: {
    "components-changeBoothChild": componentsChangeBoothChild
  },
  data() {
    return {
      tableData: [],
      dataList: [],
      pageInfoData: {
        currentPage: 1,
        pageSize: 10,
        total: 1
      },
      formInline: {
        size: 10,
        current: 1,
        isAsc: false,
        companyId: "",
        // loginId: 'aaa',
        // loginType: 0,
        orderByField: 'ip.create_date',
        exAreaId: '',
        fstCatalogId: '',
        secCatalogId: '',
        productName: '',
        reApprove: ''
        // orderByField: 'ip.create_date',
        // isAsc: false,
        // firstApprove: '',
        // productName: ''
      },
      ruleted: {},
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
  filters: {
    statusFilter: value => {
      switch (value) {
        case '0':
          return '未审核';
        case '1':
          return '审核不通过';
        case '2':
          return '审核通过';
        default:
          return;
      }
    }
  },
  computed: {
    queryFormParams() {
      let _queryForm = {};
      for (let key in this.formInline) {
        if (this.formInline[key] == null) {
          this.formInline[key] = '';
        }
      }
      _queryForm = this.formInline;
      _queryForm.current = this.formInline.current;
      _queryForm.size = this.formInline.size;
      return _queryForm;
    }
  
  },
  created() {
    this.formInline.companyId = this.companyId;
    this.handelGetViewExhitList(this.formInline);
  },
  methods: {
    // ...mapActions('registeredExhibits', ['getExhibitionsDetails', 'postDeleteExhibitionsList']),
    ...mapActions('agents', ['getExhibitionsDetail', 'postDeleteExhibitionsList']),
    ...mapActions("modificaRnformat", [
      "getViewExhitList",     // 查看展品列表
      "getRecruitAgents"      // 获取所有招展代理
    ]),
    acceptForm(param) {
      Object.assign(this.queryFormParams, param);
    },
    handelGetViewExhitList(obj) {
      this.getViewExhitList(obj).then(res => {
        // console.log(res, 'res888');
        this.tableData = res.records;
        this.pageInfoData.currentPage = res.current;
        this.pageInfoData.pageSize = res.size;
        this.pageInfoData.total = res.total;
      });
    },
    detail(Id) {
      this.getExhibitionsDetail({ productId: Id }).then(res => {
        console.log(res, 'res8520');
        
        // var key;
        // for (key in this.localDetailsData) {
        //   if (typeof (this.localDetailsData[key]) === 'object' && Array.isArray(this.localDetailsData[key])) {
        //     this.localDetailsData[key] = [];
        //   }
        //   this.localDetailsData[key] = '';
        // }
        // // console.log(this.exhibitionsDetailsData, 'exhibitionsDetailsData');
        this.localDetailsData.productSession = res.ifoProduct.productSession;
        this.localDetailsData.productName = res.ifoProduct.productName;
        this.localDetailsData.fstNameCh = res.ifoProduct.fstNameCh;
        this.localDetailsData.secNameCh = res.ifoProduct.secNameCh;
        // this.localDetailsData.productSource = res.ifoProduct.productSource; // 原产地
        this.localDetailsData.productDescription = res.ifoProduct.productDescription; // 字符串数组
        this.localDetailsData.productFunction = res.ifoProduct.productFunction;
        this.localDetailsData.isEnterChinese = res.ifoProduct.isEnterChinese;
        this.localDetailsData.isFirstPublish = res.ifoProduct.isFirstPublish;
        // 展示图片
        this.localDetailsData.cqList = res.cqList;
        this.localDetailsData.hjList = res.hjList;
        this.localDetailsData.spList = res.spList;
        this.localDetailsData.tpList = res.tpList;
        this.localDetailsData.ycdList = res.ycdList;
        this.dialogDetails = true;
        
      });
    },
    // 查询
    onSubmit() {
      this.handelGetViewExhitList(this.queryFormParams);
    },
    // 分页操作
    handleSizeChange(val) {
      this.formInline.size = val;
      this.handelGetViewExhitList(this.formInline);
    },
    // 按钮操作
    handleCurrentChange(val) {
      this.formInline.current = val;
      this.handelGetViewExhitList(this.formInline);
    }
  }
};
</script>
