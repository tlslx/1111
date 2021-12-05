<style lang='less' scoped>

</style>

<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="展品数据审核" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="企业名称">
            <el-input v-model.trim="formInline.category" :clearable='true' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="公司编号">
            <el-input v-model.trim="formInline.company" :clearable='true' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="是否当届参展">
            <el-select v-model="formInline.region" :clearable='true' placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="广交会编码">
            <el-input v-model.trim="formInline.canton" :clearable='true' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="展品名称">
            <el-input v-model.trim="formInline.name" :clearable='true' placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="exhibitNameCh" label="展品中文名" align="center" >
          </el-table-column>
          <el-table-column prop="exhibitNameEn" label="展品英文名" align="center" >
          </el-table-column>
          <el-table-column prop="exhibitSizeCh" label="尺寸规格" align="center" >
          </el-table-column>
          <el-table-column prop="exhibitModelCh" label="型号" align="center" >
          </el-table-column>
          <el-table-column prop="address" label="展品图片" align="center">
            <template slot-scope="scope">
              <el-button @click="check(scope.row)" type="text" size="small">查看</el-button>
              <!-- <el-button type="text" size="small" @click="handleRevamp(scope.row)">修改</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="companyName" align="center" label="企业名称">
          </el-table-column>
          <el-table-column prop="companyId" align="center" label="公司编号">
          </el-table-column>
          <el-table-column prop="status" align="center" label="审核状态">
            <template slot-scope="scope">
              {{ scope.row.status | statusc }}
            </template>
          </el-table-column>
          <el-table-column prop="operatorName" align="center" label="审核者">
          </el-table-column>
          <el-table-column prop="operateTime" align="center" label="审核时间">
          </el-table-column>
          <el-table-column prop="exhibitFeatureDescribeCh" align="center" label="展品中文介绍">
          </el-table-column>
          <el-table-column prop="exhibitFeatureDescribeEn" align="center" label="展品英文介绍">
          </el-table-column>
          <el-table-column prop="reason" align="center" label="原因" width="120">
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="150">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.status === 4" @click="handleClick(scope.row)" type="text" size="small">审核</el-button>
              <el-button type="text" size="small" @click="handleRevamp(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="space-between" class="pagination-contain">
          <!-- <div style="margin-top:8px;"> -->

            <!-- <el-button  type="text" size="small" @click="handelDownload">下载XLS</el-button> -->
            <!-- <el-button  type="text" size="small">打印</el-button> -->
          <!-- </div> -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfoData.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageInfoData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfoData.total">
          </el-pagination>
        </el-row>
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfoData.total">
        </el-pagination> -->
        <el-dialog title="查看" :visible.sync="isShoded">
          <img width="100%" v-for="(item, index) in imageList" :key="index" :src="item.imageB" alt="企业形象图">
          <!-- <img width="100%" :src="imageUrl" alt="企业形象图"> -->
        </el-dialog>
        <el-dialog title="审核" :visible.sync="dialogFormVisible" :before-close="handleClose">
          <el-button @click="pass" type="text" size="small">通过</el-button>
          <el-button type="text" size="small" @click="handlePass">不通过</el-button>
          <div style="margin-top:30px;" v-if="isshow">
            <span>不通过原因：</span>
            <el-select style="width: 300px" v-model="reason" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.pkVal"
                :label="item.reviewFailedReason"
                :value="item.reviewFailedReason"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </div>
          <div style="margin-top:30px;">
            <span style="color:red">敏感词：{{ this.sensitive }}</span>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="fetch">取 消</el-button>
            <el-button type="primary" @click="reliable">确 定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: 'first',
      reason: '',
      imageUrl: 'localhost:8091/6cf221ac-dcb9-4de4-97a1-34ea295995e1',
      imageList: [],
      dialogFormVisible: false,
      isshow: false,
      isShoded: false,
      formInline: {
        category: '',
        company: '',
        region: '',
        canton: '',
        name: ''
      },
      options: [
      ],
      tableData: [
      ],
      pageInfoData: {
        currentPage: 1,
        pageSize: 0,
        total: 0
      },
      sensitive: '',
      obj: {
        size: "10",
        current: "1"
      },
      id: ''
    };
  },
  created() {
    this.handelExhibitAuditPage(this.obj);
  },
  filters: {
    statusc(val) {
      if (val === 0) {
        return "初审待审核";
      } else if (val === 1) {
        return "初审通过";
      } if (val === 2) {
        return "初审不通过";
      } if (val === 3) {
        return "终审通过";
      } if (val === 4) {
        return "终审未通过";
      } else {
        return "";
      }
    },
    checkStatu: value => {
      let val = value - 0;
      switch (val) {
        case '0':
          return '初审待审核';
        case '1':
          return '初审通过';
        case '2':
          return '初审不通过';
        case '3':
          return '终审通过';
        case '4':
          return '终审未通过';
        default:
          return;
      }
    }
  },
  methods: {
    ...mapActions("managemen", [
      "getExhibitAuditPage",      // 展品数据审核页面（展示审核数据, 初始化页面）
      "getExhibitAuditAudit",     // 审核
      "getReasonsApproved",       // 获取审核不通过原因列表
      "getCheckSensitive"         // 检查敏感词
    ]),
    // 下载
    handelDownload() {
      // beginTime=2019-06-12&endTime=2019-06-12&operatorName
      let url = `companyName=${this.formInline.category}&cantonCode=${this.formInline.canton}&exhibitNameCh=${this.formInline.name}&companyId${this.formInline.company}&showStatus${this.formInline.region}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_SN_URL}/api/efSupExhManage/downAuditList?${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    handelExhibitAuditPage(obj) {
      this.getExhibitAuditPage(obj).then(res => {
        this.tableData = res.records;
        this.pageInfoData.pageSize = Number(res.size);
        this.pageInfoData.currentPage = Number(res.current);
        this.pageInfoData.total = Number(res.total);
      });
    },
    handelExhibitAuditAudit(obj) {
      this.getExhibitAuditAudit(obj).then(res => {
        this.handelExhibitAuditPage(this.obj);
      });
    },
    // 查询
    onSubmit() {
      let obj = {
        companyName: this.formInline.category,    // 企业名称
        cantonCode: this.formInline.canton,      // 广交会编码
        exhibitNameCh: this.formInline.name,      // 展品名称
        companyId: this.formInline.company,      // 公司编号
        showStatus: this.formInline.region,       // 是否当届参展（是当届传1过去， 不是当届传0过去 ）
        size: this.obj.size,         // 每页大小
        current: 1     // 当前页数
      };
      this.handelExhibitAuditPage(obj);
    },
    // 查看
    check(data) {
      let aryData = [];
      let obj = {};
      this.imageList = [];
      aryData = data.exhibitImgs;
      aryData.forEach(el => {
        obj = {
          imageB: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + el.imageB
        };
        this.imageList.push(obj);
      });
      this.isShoded = true;
    },
    // 审核
    handleClick(data) {
      this.dialogFormVisible = true;
      this.id = data.exhibitId;
      this.getCheckSensitive({ exhibitId: data.exhibitId }).then(res => {
        this.sensitive = res;
      });
    },
    // 修改
    handleRevamp(data) {
      this.$router.push(
        {
          path: '/exhibitModification',
          query: { data: data }
        }
      );
    },
    // 通过
    pass() {
      let obj = {
        'exhibitId': this.id,
        'status': 1
      };
      this.handelExhibitAuditAudit(obj);
      this.dialogFormVisible = false;
      this.isshow = false;
      this.reason = '';
    },
    // 不通过
    handlePass() {
      this.isshow = true;
      this.getReasonsApproved().then(res => {
        // console.log(res, 'res8');
        this.options = res;
      });
    },
    // 取消
    fetch() {
      this.dialogFormVisible = false;
      this.isshow = false;
      this.reason = '';
    },
    // 确定
    reliable() {
      let obj = {
        'exhibitId': this.id,
        'status': 0,
        'reason': this.reason
      };
      this.handelExhibitAuditAudit(obj);
      this.dialogFormVisible = false;
      this.isshow = false;
      this.reason = '';
    },
    // 点击空白处弹框消失
    handleClose() {
      this.dialogFormVisible = false;
      this.isshow = false;
      this.reason = '';
    },
    // 页面数据
    handleSizeChange(val) {
      this.obj.size = val;
      this.handelExhibitAuditPage(this.obj);
    },
    // 按钮改变
    handleCurrentChange(val) {
      this.obj.current = val;
      this.handelExhibitAuditPage(this.obj);
    }
  }
};
</script>

