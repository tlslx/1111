/**
* @file 各交易团各展区申请情况汇总
* @author:heli
* @date:2019/4/15
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="企业展位申请明细表" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="交易团:" size="mini">
          <el-select v-model="ruleForm.delegationId" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in deptArr" :label="item.deptName"
            :value="item.deptId" :key="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区:" size="mini">
          <el-select v-model="exhibitionAreas" placeholder="请选择" @change="onSelected">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in exhibitionAreaCode" :label="item.exhibitionAreaName"
            :value="item.exhibitionAreaCode" :key="item.exhibitionAreaCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业中文名称:" size="mini" placeholder="请选择">
          <el-input v-model="ruleForm.companyName" clearable></el-input>
        </el-form-item>

        <a class="advancedSearch" href="javascript:;" @click="advancedQuery">高级查询</a>

        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </el-form-item>
        <hr v-show="isShow">

        <div v-show="isShow">
          <el-form-item label="广交会编码:" size="mini" placeholder="请选择">
            <el-input v-model="ruleForm.cecfCode" clearable></el-input>
          </el-form-item>
          <el-form-item label="产品大类:" size="mini" v-if="false">
            <el-select v-model="ruleForm.productBigCatalogName" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in productBigCatalogNameArr" :label="item.itemText"
                :value="item.itemCode" :key="item.itemCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展品专区:" size="mini">
            <el-select v-model="ruleForm.exhibitionCategory" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in specialAreaCodeArr" :label="item.cname"
              :value="item.specialAreaCode" :key="item.specialAreaCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主要产品:" size="mini" placeholder="请选择" v-if="false">
            <el-input v-model="ruleForm.mainProductName" clearable></el-input>
          </el-form-item>
          <el-form-item label="地区:" size="mini">
            <el-select v-model="ruleForm.delegationAreaCode" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item) in placeArr" :key="item.dataDictItemId"
                :label="item.itemText" :value="item.itemCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展位类型:" size="mini">
            <el-select v-model="ruleForm.boothType" placeholder="请选择">
              <el-option v-for="(item, index) in boothTypeArray" :key="index"
                :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否领导小组成员:" size="mini" v-if="false">
            <el-select v-model="ruleForm.LeaderMemberIs" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否新题材:" size="mini" v-if="false">
            <el-select v-model="ruleForm.newThemeIs" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否统一布展:" size="mini" v-if="false">
            <el-select v-model="ruleForm.unificationBoothIs" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否重点关注展区:" size="mini" v-if="false">
            <el-select v-model="ruleForm.focusExbitionAreaIs" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>

      <div class="tableTip">
        <p class="appliExhibition">共查询到<span>{{total}}</span>条记录</p>
        <p class="downLoadXls" @click="downLoad">下载</p>
      </div>

      <template>
        <el-table
          :fit="true"
          :data="tableData"
          @selection-change="handleSelectionChange"
          @select="handleSelection">
          <!-- <el-table-column
            type="selection">
          </el-table-column> -->
          <el-table-column
            prop="exhibitionSession"
            label="届数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionYear"
            label="年份"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="企业名称"
            align="center"
            width="240">
          </el-table-column>
          <el-table-column
            prop="companyId"
            label="企业编码"
            align="center"
            width="160">
          </el-table-column>
          <el-table-column
            prop="cecfCode"
            label="广交会编码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="delegationName"
            label="交易团"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="coceralName"
            label="商会"
            align="center"
            width="130">
          </el-table-column>
          <el-table-column
            prop="memberCardNo"
            label="会员证号"
            align="center"
            width="240">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaCode"
            label="展区代码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaName"
            label="展区名称"
            align="center"
            width="220">
          </el-table-column>
          <el-table-column
            prop="exhibitionCategoryName"
            label="展品专区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitTypeOne"
            label="展区展品类别专业化细分（一级）"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="exhibitTypeTwo"
            label="展区展品类别专业化细分（二级）"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="exhibitTypeThree"
            label="展区展品类别专业化细分（三级）"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="exhibitionProductIdOneName"
            label="主要展示产品1"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionProductIdTwoName"
            label="主要展示产品2"
            align="center">
          </el-table-column>
          <el-table-column
            prop="hsCode"
            label="产品海关编码(HS编码)"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="hsCodeExhibitName"
            label="HS编码对应商品名称"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="hsCodeExhibitionAreaName"
            label="HS编码对应展区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="hsCodeMatchingExhibitionArea"
            label="HS编码与展区是否匹配"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="boothType"
            label="展位类型"
            align="center"
            width="140">
          </el-table-column>
          <el-table-column
            prop="upExhibitionNumber"
            label="上届展位数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="ownExhibitionApplyNumber"
            label="申请展位数量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="upExhibitionArea"
            label="上届面积"
            align="center">
          </el-table-column>
          <el-table-column
            prop="ownExhibitionArea"
            label="申请面积"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionTypeName"
            label="布展类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyUnionIsExist"
            label="是否有联营企业"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyUnionOneName"
            label="联营企业1"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyUnionTwoName"
            label="联营企业2"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyTypeName"
            label="企业类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyAttributeName"
            label="企业属性"
            align="center">
          </el-table-column>
          <el-table-column
            prop="cityName"
            label="城市"
            align="center">
          </el-table-column>
          <el-table-column
            prop="telephoneCode"
            label="电话区号"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="telephoneCodeLast"
            label="电话"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="fax"
            label="传真"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="businessContactsEmail"
            label="Email"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="businessContactsCh"
            label="联系人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="customCodes"
            label="海关编码"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="importExportCode"
            label="进出口代码"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="beyondNumber"
            label="海外商标国家数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="coceralGrade"
            label="发明专利数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="practicalPatent"
            label="实用新型专利数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="appearancePatent"
            label="外观设计专利数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="internationallytCertification"
            label="国际认证数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="nationalAwardsCount"
            label="国家级奖励数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="includStatus"
            label="列入《中国高科技出口产品目录》"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="exportVolumeLast"
            label="上年度出口额(单位：万美元)"
            align="center">
          </el-table-column>
          <el-table-column
            prop="contactedIs"
            label="是否愿意接洽国内采购商"
            align="center">
          </el-table-column>
          <el-table-column
            prop="delegationAreaName"
            label="交易团所在地区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="dataFrom"
            label="数据来源"
            align="center"
            width="140">
          </el-table-column>


          <!-- <el-table-column
            type="index"
            label="序号"
            align="center"
            width='50'>
          </el-table-column>
          <el-table-column
            prop="delegationAreaName"
            label="地区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionBigCatalogName"
            label="产品大类"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mainProductName"
            label="主要产品"
            align="center">
          </el-table-column>
          <el-table-column
            prop="LeaderMemberIs"
            label="是否领导小组成员"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.LeaderMemberIs==0">否</span>
              <span v-else-if="scope.row.LeaderMemberIs==1">是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="newThemeIs"
            label="是否新题材"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.newThemeIs==0">否</span>
              <span v-else-if="scope.row.newThemeIs==1">是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="unificationBoothIs"
            label="是否统一布展"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.unificationBoothIs==0">否</span>
              <span v-else-if="scope.row.unificationBoothIs==1">是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="focusExbitionAreaIs"
            label="是否重点关注展区"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.focusExbitionAreaIs==0">否</span>
              <span v-else-if="scope.row.focusExbitionAreaIs==1">是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机"
            align="center">
          </el-table-column>
          <el-table-column
            prop="importExportCode"
            label="进出口企业代码"
            align="center">
          </el-table-column>
          <el-table-column
            prop="internationallytCertification"
            label="国际认证书"
            align="center">
          </el-table-column>
          <el-table-column
            prop="includStatus"
            label="列入（中国高科技出口产品目录）"
            align="center">
          </el-table-column>
          <el-table-column
            prop="lastExportAmount"
            label="上年度出口额"
            align="center">
          </el-table-column>
          <el-table-column
            prop="contactedIs"
            label="是否愿意接洽国内买家"
            align="center">
          </el-table-column>
          <el-table-column
            prop="upExhibitionNumber"
            label="上届展位数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="ownExhibitionApplyNumber"
            label="申请展位数量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="upExhibitionArea"
            label="上届展位面积"
            align="center">
          </el-table-column>
          <el-table-column
            prop="ownExhibitionArea"
            label="申请展位面积"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyUnionIsExist"
            label="是否有联营企业"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.companyUnionIsExist==0">否</span>
              <span v-else-if="scope.row.companyUnionIsExist==1">是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="companyUnionOne"
            label="联营企业1"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyUnionTwo"
            label="联营企业2"
            align="center">
          </el-table-column> -->
          
          
          
          
          
          
          
          
          

         
          
         
          
        </el-table>
        <div class="block" style="float:right; margin-top:10px;" >
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="ruleForm.current"
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
  name: "eachTradingGroup",
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
      deptArr: [],
      delegationId: "",
      boothTypeArray: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "01",
          label: "一般性展位"
        },
        {
          value: "02",
          label: "品牌展位"
        }
      ],
      ruleForm: {
        size: 10,
        current: 1,
        cecfCode: '',
        newThemeIs: '',
        companyName: '',
        specialArea: '',
        exhibitionNum: '',
        delegationId: "",
        LeaderMemberIs: '',
        exhibitionArea: '',
        mainProductName: '',
        exhibitionSession: '',
        unificationBoothIs: '',
        focusExbitionAreaIs: '',
        exhibitionCategory: '',
        delegationAreaCode: '',
        boothType: "",
        centerChannelBoothIs: '',
        productBigCatalogCode: '',
        productBigCatalogName: ''
      },
      exhibitionAreas: '',
      placeArr: [],
      exhibitionAreaCode: [],
      specialAreaCodeArr: [],
      productBigCatalogNameArr: [],
      formLabelWidth: '120px',
      formAward: {
        checkboxGroup: []
      },
      boothParams: {
        size: 10,
        current: 1
      },
      tradingParams: {
        current: 1,
        size: 2147483647
      }
    };
  },
  mounted() {
    // getBusinessPlace是获取区域
    this.getBusinessPlace().then(res => {
      if (res.records && res.records.length > 0) {
        for (let i = 0; i < res.records.length; i++) {
          this.placeArr.push(res.records[i] || '');
        }
      }
    });
    // 各交易团各展区申请情况汇总
    this.businessDelegationAndArea(this.ruleForm).then(res => {
      this.total = res.total;

      for (let i = 0; i < res.records.length; i++) {
        this.tableData.push(res.records[i] || '');
      }
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
      for (let i = 0; i < res.length; i++) {
        this.exhibitionAreaCode.push(res[i] || ''); // 展区
      }
    });

    // 获取交易团
    this.searchBusinessDelegation(this.tradingParams).then(res => {
      res.records.forEach(item => {
        this.deptArr.push(item);
      });
    });

    // 产品大类
    this.sysDataDictItem().then(res => {
      res.records.forEach(item => {
        this.productBigCatalogNameArr.push(item);
      });
    });
  },
  methods: {
    ...mapActions("enterpriseBooth", ["getCurrent"]), // 获取当届展会展期信息
    ...mapActions("enterpriseBooth", ["sysDataDictItem"]), // 产品大类
    ...mapActions("enterpriseBooth", ["searchBusinessDelegation"]), // 获取交易团
    ...mapActions("enterpriseBooth", ["getAreas"]), // 根据展届展期获取展区和专区的信息
    ...mapActions("enterpriseBooth", ["businessDelegationAndArea", "getBusinessPlace"]), // 各交易团各展区申请情况汇总
    ...mapActions("downTotal", ["addDown2MangeList"]),
    // 搜索框查询
    submitForm() {
      this.tableData = [];
      this.ruleForm.current = 1;
      this.ruleForm.exhibitionAreaCode = this.exhibitionAreas;

      this.businessDelegationAndArea(this.ruleForm).then(res => {
        this.total = res.total;
        this.tableData = [];
        for (let i = 0; i < res.records.length; i++) {
          this.tableData.push(res.records[i] || '');
        }
      });

    },
    // 展区事件
    onSelected() {
      // 根据展届展期获取展区和专区的信息
      let params = {
        exhibitionAreaCode: this.exhibitionAreas,
        exhibitionNum: this.ruleForm.exhibitionSession
      };

      this.specialAreaCodeArr = [];
      this.getAreas(params).then(res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].specialAreas != null) {
            for (let j = 0; j < res[i].specialAreas.length; j++) {
              this.specialAreaCodeArr.push(res[i].specialAreas[j]); // 专区
            }
          }
        }

        if (this.exhibitionAreas === '') {
          this.specialAreaCodeArr = [];
        }
      });
    },
    // 高级查询
    advancedQuery() {
      for (let key in this.ruleForm) {
        this.ruleForm[key] = '';
      }
      this.ruleForm.size = 10;
      this.ruleForm.current = 1;

      this.isShow = !this.isShow;
    },
    // 分页 页面显示数据量切换
    handleSizeChange(val) {
      this.tableData = [];
      this.ruleForm.size = val;

      this.businessDelegationAndArea(this.ruleForm).then(res => {
        this.total = res.total;

        for (let i = 0; i < res.records.length; i++) {
          this.tableData.push(res.records[i] || '');
        }
      });
    },
    // 分页 下一页
    handleCurrentChange(val) {
      this.tableData = [];
      this.ruleForm.current = val;

      this.businessDelegationAndArea(this.ruleForm).then(res => {
        this.total = res.total;

        for (let i = 0; i < res.records.length; i++) {
          this.tableData.push(res.records[i] || '');
        }
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
    // 表格多选框选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
   * 拼接对象为请求字符串
   * @param {Object} obj - 待拼接的对象
   * @returns {string} - 拼接成的请求字符串
   */
    encodeSearchParams(obj) {
      const params = [];

      Object.keys(obj).forEach((key) => {
        let value = obj[key];
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
          value = '';
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='));
      });

      return params.join('&');
    },
    // 下载模板
    downLoad() {
      let str = "";
      for (let key in this.ruleForm) {
        if (str === "") {
          str += `${key}=${this.ruleForm[key]}`;
        } else {
          str += `&${key}=${this.ruleForm[key]}`;
        }
      }
      // kindo.util.getdown(`${process.env.API_SN_URL}/api/report/businessDelegationAndArea/export`, '各交易团各展区申请情况汇总.xls');
      this.addDown2MangeList(str).then(res => {
        this.$message({
          message: "下载已创建成功，请到下载管理模块查看",
          type: 'success'
        });
      });
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
.advancedSearch {
  line-height: 30px;
  margin-right: 10px;
  display: inline-block;
  text-decoration: none
}
.tableTip .appliExhibition {
  float: left
}
.tableTip .appliExhibition span {
  margin: 0 4px
}
.tableTip .downLoadXls {
  float: right;
  cursor: pointer
}
</style>
