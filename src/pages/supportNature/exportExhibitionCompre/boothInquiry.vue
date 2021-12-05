/**
* @file 展位查询
* @author:heli
* @date:2019/4/15
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展位查询" name="first">
      <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
        <el-form-item label="届数:" size="mini">
          <!-- 届数下拉框 -->
          <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in ruleForm.exhibitionSessionArr" :label="item.exhibitionNum"
            :value="item.exhibitionNum" :key="item.exhibitionId"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年份:" size="mini">
          <!-- 年份下拉框 -->
          <el-select v-model="ruleForm.applyYear" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="2019" value="2019"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="广交会编码:" size="mini" placeholder="请选择">
          <el-input v-model="ruleForm.cecfCode" clearable></el-input>
        </el-form-item>

        <a class="advancedSearch" href="javascript:;" @click="advancedQuery">高级查询</a>

        <el-form-item size="mini">
          <el-button type="primary" @click="submitForm()">查询</el-button>
        </el-form-item>
        <hr v-show="isShow">

        <div v-show="isShow">
          <el-form-item label="展位:" size="mini">
            <el-select v-model="ruleForm.productBigCatalogName" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="馆号:" size="mini">
            <el-select v-model="ruleForm.exhibitionCategory" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="楼层:" size="mini">
            <el-select v-model="ruleForm.exhibitionCategory" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="通道:" size="mini">
            <el-select v-model="ruleForm.delegationAreaCode" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
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
            <el-select v-model="ruleForm.centerChannelBoothIs" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="一期" value="0"></el-option>
              <el-option label="二期" value="1"></el-option>
              <el-option label="三期" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="展位类型:" size="mini">
            <el-select v-model="ruleForm.newThemeIs" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属展区:" size="mini">
            <el-select v-model="ruleForm.exhibitionAreaCode" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in ruleForm.exhibitionAreaArr" :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode" :key="item.exhibitionAreaCode"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属机构:" size="mini">
            <el-select v-model="ruleForm.focusExbitionAreaIs" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="布展类型:" size="mini">
            <el-select v-model="ruleForm.focusExbitionAreaIs" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="标摊" value="0"></el-option>
              <el-option label="特装" value="1"></el-option>
              <el-option label="统一布展" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="企业中文名称:" size="mini">
            <el-input v-model="ruleForm.cecfCode" clearable></el-input>
          </el-form-item>

          <el-form-item label="产品大类:" size="mini">
            <el-select v-model="ruleForm.productBigCatalogName" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in productBigCatalogNameArr" :label="item.itemText"
                :value="item.itemCode" :key="item.itemCode"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="专区:" size="mini">
            <el-select v-model="ruleForm.focusExbitionAreaIs" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-radio v-model="radio" label="1">简表</el-radio>
            <el-radio v-model="radio" label="2" @change="applicationReduce">清单</el-radio>
          </el-form-item><br>

          <el-form-item label="是否中央通道展位:" size="mini">
            <el-select v-model="ruleForm.focusExbitionAreaIs" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否新题材:" size="mini">
            <el-select v-model="ruleForm.focusExbitionAreaIs" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否统一布展:" size="mini">
            <el-select v-model="ruleForm.focusExbitionAreaIs" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否重点关注展区:" size="mini">
            <el-select v-model="ruleForm.focusExbitionAreaIs" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否品牌粘连:" size="mini">
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
        <p class="downLoadXls" v-show="isShow" @click="downLoad">下载</p>
      </div>

      <template>
        <el-table
          :fit="true"
          :data="tableData"
          @selection-change="handleSelectionChange"
          @select="handleSelection">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            prop="delegationAreaName"
            label="届数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionBigCatalogName"
            label="年份"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mainProductName"
            label="地区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="LeaderMemberIs"
            label="广交会编码"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.LeaderMemberIs==0">否</span>
              <span v-else-if="scope.row.LeaderMemberIs==1">是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="newThemeIs"
            label="展馆"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.newThemeIs==0">否</span>
              <span v-else-if="scope.row.newThemeIs==1">是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="unificationBoothIs"
            label="品牌粘连展位数"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.unificationBoothIs==0">否</span>
              <span v-else-if="scope.row.unificationBoothIs==1">是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="focusExbitionAreaIs"
            label="产品大类"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.focusExbitionAreaIs==0">否</span>
              <span v-else-if="scope.row.focusExbitionAreaIs==1">是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="exhibitionAreaName"
            label="专区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionCategoryName"
            label="主要产品1"
            align="center">
          </el-table-column>
          <el-table-column
            prop="delegationName"
            label="主要产品2"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyId"
            label="展位面积"
            align="center">
          </el-table-column>
          <el-table-column
            prop="cecfCode"
            label="是否当届领导小组成员"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="是否中央通道展位"
            align="center">
          </el-table-column>
          <el-table-column
            prop="upExhibitionNumber"
            label="是否新题材"
            align="center">
          </el-table-column>
          <el-table-column
            prop="ownExhibitionApplyNumber"
            label="是否统一布展"
            align="center">
          </el-table-column>
          <el-table-column
            prop="upExhibitionArea"
            label="上届是否绿色特装"
            align="center">
          </el-table-column>
          <el-table-column
            prop="ownExhibitionArea"
            label="是否重点关注展区"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.companyUnionIsExist==0">否</span>
              <span v-else-if="scope.row.companyUnionIsExist==1">是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="companyUnionIsExist"
            label="商会"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyUnionOne"
            label="展区"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyUnionTwo"
            label="展位类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="memberCardNo"
            label="展位编号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyTypeName"
            label="布展类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyAttributeName"
            label="面积"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionProductIdOneName"
            label="标准数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionProductIdTwoName"
            label="计费方式"
            align="center">
          </el-table-column>
          <el-table-column
            prop="telephoneCode"
            label="所属机构"
            align="center">
          </el-table-column>
          <el-table-column
            prop="telephoneCodeLast"
            label="企业名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="所属市县"
            align="center">
          </el-table-column>
          <el-table-column
            prop="fax"
            label="期数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="businessContactsEmail"
            label="展位负责人"
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
  name: "boothInquiry",
  data() {
    return {
      activeName: 'first',
      tableData: [],
      ids: [],
      radio: '1',
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
      ruleForm: {
        size: 10,
        current: 1,
        cecfCode: '',
        applyYear: '',
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
        exhibitionAreaCode: "",
        focusExbitionAreaIs: '',
        exhibitionCategory: '',
        delegationAreaCode: '',
        centerChannelBoothIs: '',
        productBigCatalogCode: '',
        productBigCatalogName: '',
        exhibitionSessionArr: [],
        exhibitionAreaArr: [] // 展区下拉框
      },
      exhibitionAreas: '',
      exhibitionAreaCode: [],
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
    // 各交易团各展区申请情况汇总
    this.businessDelegationAndArea(this.ruleForm).then(res => {
      this.total = res.total;

      for (let i = 0; i < res.records.length; i++) {
        this.tableData.push(res.records[i] || '');
      }
    });

    // 获取所有届数信息
    this.getListAll().then(res => {
      this.ruleForm.exhibitionSessionArr = res;
    });

    // 产品大类
    this.sysDataDictItem().then(res => {
      res.records.forEach(item => {
        this.productBigCatalogNameArr.push(item);
      });
    });
  },
  methods: {
    ...mapActions("enterpriseBooth", ["getListAll"]), // 获取所有届数信息
    ...mapActions("enterpriseBooth", ["sysDataDictItem"]), // 产品大类
    ...mapActions("enterpriseBooth", ["businessDelegationAndArea"]), // 各交易团各展区申请情况汇总

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
    // 清单
    applicationReduce() {

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
      kindo.util.getdown(`${process.env.API_SN_URL}/api/report/businessDelegationAndArea/export`, '各交易团各展区申请情况汇总.xls');
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
.serialNumber {
  width: 200px
}
.numberLline {
  margin: 0px 10px 0 4px;
}
</style>
