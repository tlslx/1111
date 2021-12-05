/**
* @file 参展企业信息及展位分布综合查询
* @author:heli
* @date:2019/4/17
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="参展企业信息及展位分布综合查询" name="first">
      <el-form :inline="true" :model="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-form-item label="届数:" size="mini">
          <el-select v-model="deptName" placeholder="请选择">
            <el-option v-for="item in ruleForm.deptName" :label="item.deptName"
            :value="item.deptName" :key="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年份:" size="mini">
          <el-select v-model="exhibitionAreaCode" placeholder="请选择">
            <el-option v-for="item in ruleForm.exhibitionAreaCode" :label="item.exhibitionAreaCode"
            :value="item.exhibitionAreaCode" :key="item.exhibitionAreaCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码:" size="mini" placeholder="请选择">
          <el-input v-model="ruleForm.exhibitionSession" ></el-input>
        </el-form-item>

        <a class="advancedSearch" href="javascript:;" @click="advancedQuery">高级查询</a>

        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </el-form-item>
        <hr>

        <div v-show="isShow">
          <el-form-item label="展位:" size="mini">
            <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="一期" value="一期"></el-option>
              <el-option label="二期" value="二期"></el-option>
              <el-option label="三期" value="三期"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="馆号:" size="mini">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="家居用品" value="家居用品"></el-option>
              <el-option label="日用陶瓷" value="日用陶瓷"></el-option>
              <el-option label="卫浴设备" value="卫浴设备"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="楼层:" size="mini" placeholder="请选择">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="东部" value="东部"></el-option>
              <el-option label="西部" value="西部"></el-option>
              <el-option label="沿海" value="沿海"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="通道:" size="mini" v-show="isShow">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="东部" value="东部"></el-option>
              <el-option label="西部" value="西部"></el-option>
              <el-option label="沿海" value="沿海"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="编号:" size="mini" placeholder="请选择">
            <div class="serialNumber">
              <el-col :span="10">
                <el-input v-model="ruleForm.exhibitionSession"></el-input>
              </el-col>
              <el-col class="numberLline" :span="1">至</el-col>
              <el-col :span="10">
                <el-input v-model="ruleForm.exhibitionSession"></el-input>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item label="期数:" size="mini">
            <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业类型:" size="mini">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业属性:" size="mini">
            <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品大类:" size="mini">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展位类型:" size="mini">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属展区:" size="mini">
            <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="一期" value="一期"></el-option>
              <el-option label="二期" value="二期"></el-option>
              <el-option label="三期" value="三期"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属机构:" size="mini">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="家居用品" value="家居用品"></el-option>
              <el-option label="日用陶瓷" value="日用陶瓷"></el-option>
              <el-option label="卫浴设备" value="卫浴设备"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专区:" size="mini" placeholder="请选择">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="东部" value="东部"></el-option>
              <el-option label="西部" value="西部"></el-option>
              <el-option label="沿海" value="沿海"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="布展类型:" size="mini">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="东部" value="东部"></el-option>
              <el-option label="西部" value="西部"></el-option>
              <el-option label="沿海" value="沿海"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业中文名称:" size="mini">
            <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展示产品:" size="mini" placeholder="请选择">
            <el-input v-model="ruleForm.exhibitionSession"></el-input>
          </el-form-item>
          <el-form-item label="所属市县:" size="mini">
            <div class="serialNumber">
              <el-col :span="11">
                <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="是" value="是"></el-option>
                  <el-option label="否" value="否"></el-option>
                </el-select>省
              </el-col>
              <el-col :span="11">
                <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="是" value="是"></el-option>
                  <el-option label="否" value="否"></el-option>
                </el-select>市
              </el-col>
            </div>
          </el-form-item>
          <el-form-item label="是否中央通道展位:" size="mini">
            <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否新题材:" size="mini">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否统一布展:" size="mini">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否重点关注展区:" size="mini">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否品牌粘连:" size="mini">
            <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>

      <div class="tableTip">
        <p class="appliExhibition">共12条统计结果</p>
        <p class="downLoadXls" v-show="isShow">下载</p>
      </div>

      <template>
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%;"
          @select="handleSelection">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="届数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="年份"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="所属机构"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="广交会编码"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="地区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="展位"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="馆号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="楼层"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="通道"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="编号"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="企业类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="企业属性"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="展馆"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="品牌粘连展位数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="产品大类"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="专区"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="主要产品1"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="主要产品2"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="展位面积"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="是否中央通道展位"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="是否当届领导小组成员"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="是否中央通道展位"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="是否新题材"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="是否统一布展"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="上届是否绿色特装"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="是否重点关注展区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="是否品牌粘性"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="所属市县"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="分配企业"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="展区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="展区类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="布展类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="联系人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="联系电话"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="传真"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionSession"
            label="电子邮箱"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="展位号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="reCh"
            label="展位数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="layout"
            label="期数"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.layout==0">光地</span>
              <span v-else-if="scope.row.layout==1">标摊</span>
              <span v-else-if="scope.row.layout==2">豪摊</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="展位负责人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="boothNum"
            label="联营企业"
            align="center">
          </el-table-column>
        </el-table>
        <div class="block" style="float:right; margin-top:10px;" >
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "comprehensiveQuery",
  data() {
    return {
      activeName: 'first',
      tableData: [],
      ids: [],
      isShow: false,
      expIds: [],
      userIds: [],
      nowUserId: "",
      categories: [],
      idsRow: [],
      currentPage: 1,
      total: 0,
      deptName: "",
      ruleForm: {
        deptName: [], // 交易团
        specialArea: '', // 专区下拉框
        exhibitionNum: '', // 展区下拉框
        exhibitionArea: '', // 届数下拉框
        exhibitionSession: '', // 期数下拉框
        exhibitionAreaCode: []
      },
      exhibitionAreaCode: '',
      formAward: {
        checkboxGroup: []
      },
      boothParams: {
        "size": 10,
        "current": 1,
        "isAsc": true,
        "loginType": "0",
        "loginId": 'aaa',
        "orderByField": "apply.create_date"
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      }
    };
  },
  mounted() {
    this.getApplicationBooth(this.boothParams).then(res => {
      this.tableData = res.records;
      this.total = res.total;
    });

    // 获取当届展会展期信息
    this.getCurrent().then(res => {
      this.ruleForm.exhibitionNum = res.exhibitionNum;
    });

    // 根据展届展期获取展区和专区的信息
    let param = {
      exhibitionNum: this.ruleForm.exhibitionNum
    };

    this.getAreas(param).then(res => {
      this.ruleForm.exhibitionAreaCode = res;
    });

    // 获取交易团
    this.searchBusinessDelegation(this.tradingParams).then(res => {
      this.ruleForm.deptName = res.records;
    });
  },
  methods: {
    ...mapActions("enterpriseBooth", ["searchBusinessDelegation"]), // 获取交易团
    ...mapActions("enterpriseBooth", ["getCurrent"]), // 获取当届展会展期信息
    ...mapActions("enterpriseBooth", ["getAreas"]), // 根据展届展期获取展区和专区的信息
    ...mapActions("numberBooth", ["getApplicationBooth"]), // 用户列表查询
    // 搜索框查询
    submitForm() {
      let params = {};
      params = this.boothParams;
      params.specialArea = this.ruleForm.specialArea;
      params.exhibitionNum = this.ruleForm.exhibitionNum;
      params.exhibitionArea = this.ruleForm.exhibitionArea;
      params.exhibitionSession = this.ruleForm.exhibitionSession;

      this.getApplicationBooth(params).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });

    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.json.PageSize = val;
      this.getListPageInfo(this.json).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.json.PageIndex = val;
      this.getListPageInfo(this.json).then(res => {
        this.tableData = res.records;
        this.total = res.total;
      });
    },
    // 表格多选框选中事件
    handleSelection(selection, row) {
      this.ids.push(row.userId);
      if (row.userType === "0") {
        this.expIds.push(row.userId);
      } else if (row.userType === "1") {
        this.userIds.push(row.userId);
      }
      this.nowUserId = this.$store.getters.userInfo.userId;

    },
    // 跳转到用户新增页面
    locationAdd() {
      this.$router.push('/applicationBoothAdd');
    },
    // 修改
    handleEdit(row, index) {
      this.$router.push({
        path: '/applicationBoothEdit',
        query: {
          data: row.boothApplyId
        }
      });
    },
    // 表格多选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 高级查询
    advancedQuery() {
      this.isShow = !this.isShow;
    }
  }
};
</script>
<style scoped>
.advancedSearch {
  line-height: 30px;
  margin-right: 10px;
  display: inline-block;
}
.title{
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
}
.btn-row{
  margin: 10px;
}
.dialog-footer{
  text-align: center;
  margin: 15px 0;
  padding-bottom: 10px;
}
.check-item{
  margin: 10px;
}
.dialog-userList {
  padding-bottom: 10px;
  height: 32px;
}
.li_style {
  float: left;
  list-style: none;
  background-color: rgba(64, 158, 255, 0.1);
  padding: 0 10px;
  margin-right: 5px;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  color: #409eff;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid rgba(64, 158, 255, 0.2);
}
.tableTip .appliExhibition {
  float: left
}
.tableTip .downLoadXls {
  float: right;
}
.advancedSearch {
  line-height: 30px;
  margin-right: 10px;
  display: inline-block;
  text-decoration: none
}
.serialNumber {
  width: 200px
}
.numberLline {
  margin: 0px 10px 0 4px;
}
</style>
