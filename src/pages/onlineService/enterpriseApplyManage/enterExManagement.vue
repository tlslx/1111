/**
 * @file 企业展品管理---展品资料
*/
<style scoped>
.topHeader {
  width: 98%;
  padding: 1%;
}
.topTitle {
  margin: 0;
}
.topInfo {
  color: #d80c18;
  margin: 0;
}
.page-bar {
  width: 80%;
  float: right;
}
.top-titles {
  display: flex;
  align-items: center;
  width: 100%;
}
.top-titles-item-text {
  width: inherit;
}
.sort-btns {
  display: flex;
  margin-top: 20px;
  width: 100%;
}
.sort-btns-item-sort {
  flex: 1;
}
.sort-btns-item-btn {
  padding: 0 10px;
}
.detail-name {
  color: rgb(26, 168, 235);
  cursor: pointer;
  text-decoration: underline;
}
.enter-table {
  width: 100%;
  margin-top: 20px;
}
.img-pro {
  cursor: pointer;
  height: 180px;
}
.searchParams {
  width: 180px;
  margin-right: 10px
}
.enter-confirm-submit-btn {
  position: relative;
  left: 50%;
  margin-left: -60px;
  margin-top: 50px;
}
</style>
<template>
  <div class="topHeader">
    <el-tabs v-model="activeName">
      <el-tab-pane label="展品资料" name="first">
        <div class="top-titles">
          <div class="top-titles-item-text">
            <p class="topInfo">说明：</p>
            <p class="topInfo">1.您在填报展品时，每个申请展区至少登记不少于三个标注为现场展示的展品，且至少有一个为近三年内上传或更新。</p>
            <p class="topInfo">2.只有获得展位安排的展区对应的展品，且标注为现场展示的，才能在展商展品查询系统免费展示。</p>
            <p class="topInfo">3.如果您需要报备刀具展样品，需添加录入刀具展样品信息，并在产品列表中点击“打印刀具展样品报备登记表”，录入的信息将自动生成。</p>
            <br/>
            <p class="topTitle" v-if="userType ==='qy'">共有{{ totalNum }}个展品，其中{{ showNum }}个展品为广交会现场展品</p>
            <p class="topTitle" v-if="userType ==='qy'">最后一次修改时间：{{ lastDate }}</p>
          </div>
          <el-button type="primary" @click="toEdit" class="top-titles-item-operation">添加新展品</el-button>
        </div>
        <div class="sort-btns">
          <div class="sort-btns-item-sort">
            排序：
            <el-button class="sort-btns-item-btn" @click="sortDesc('typeOne')" :type="typeOne" icon="el-icon-sort">展品名称</el-button>
            <el-button class="sort-btns-item-btn" @click="sortDesc('typeTwo')" :type="typeTwo" icon="el-icon-sort">展品类别</el-button>
            <el-button class="sort-btns-item-btn" @click="sortDesc('typeThe')" :type="typeThe" icon="el-icon-sort">更新时间</el-button>
            <!-- <el-button @click="sortKnife" :type="typeFour">是否刀具展品</el-button>
            <el-button @click="sortOnExh" :type="typeFive">是否广交会现场展品</el-button> -->
          </div>
          <div class="sort-btns-item-filter">
            筛选：
            <el-select v-model="value" placeholder="请选择" style="width:180px;" @change="handleSelect">
              <el-option v-for="item in dicSelect" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
            展品名称：<el-input placeholder="请输入" class="searchParams" v-model="searchParamsT.productName"></el-input>
            <!-- 展品类别：<el-select v-model="searchParamsT.productCategory" placeholder="请选择" class="searchParams" >
              <el-option v-for="item in dicSelect" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
            审核状态：<el-select v-model="searchParamsT.state" placeholder="请选择" class="searchParams" >
              <el-option v-for="item in dicSelect" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select> -->
            <el-button type="primary" @click="search">查询</el-button>
          </div>
        </div>
        <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" class="enter-table" v-loading="loading"
           @selection-change="handleSelectionChange" :header-cell-style="tableHeaderColor">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="exhibitNameCh" label="展品名称">
              <template slot-scope="scope">
                <img :src="scope.row.imageUrl" width="100%" @click="toBoost(scope.row)" class="img-pro">
                <p class="detail-name" @click="toDetail(scope.row)">{{ scope.row.exhibitNameCh }}</p>
              </template>
          </el-table-column>
          <el-table-column label="展品类别">
            <template slot-scope="scope">
              {{ scope.row.newExhibitTypeOne }}{{ scope.row.newExhibitTypeTwo}}{{ scope.row.newExhibitTypeThree }}
            </template>
          </el-table-column>
          <el-table-column prop="approveResult" label="审核状态">
              <template slot-scope="scope">
                {{ scope.row.approveResult | traCn}}
                <p style="color: red;">{{ scope.row.approveExplain }}</p>
              </template>
          </el-table-column>
          <el-table-column prop="modifyDate" label="更新时间"></el-table-column>
          <el-table-column label="操作" width="350">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleEdit(scope.row)" v-if="scope.row.approveResult !== '0'">编辑</el-button>
              <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
              <el-button size="mini" type="text" v-if="scope.row.showStatus === '2' && userType ==='qy'" @click="handleExpo(scope.row)" >标注现场展示</el-button>
              <el-button size="mini" type="text" v-if="scope.row.showStatus === '1' && userType === 'qy'" >现场展示展品</el-button>
              <el-button size="mini" type="text" v-if="userType ==='qy'" :disabled="scope.row.showStatus === '2'"  @click="handleRemove(scope.row)">移除现场展示</el-button>
              <el-button size="mini" type="text" style='margin-top: 5px' v-if="scope.row.isToolStatus !== '0'"  @click="printKnife(scope.row)">广交会刀具展样品报备登记表</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="width:94%;padding:1% 3%;">
          <el-button type="primary" @click="toLabel" style="float:left;" v-if="userType ==='qy'">标注现场展示</el-button>
          <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
        </div>
        <div class="enter-confirm-submit-btn" v-if="showSubmit && userType ==='qy'">
          <el-button type="primary" @click="confirmSubmit">确认提交</el-button>
        </div>
        <el-dialog title="图片预览" :visible.sync="dialogVisible">
          <img :src="imgSrcBig" width="100%">
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
// const COMMPNYID = "1";
export default {
  // 引入分页组件
  components: {
    'pagination': pagination
  },
  // 过滤器  转换审核结果
  filters: {
    traCn(value) {
      let val = value;
      if (val === "1") {
        return "通过";
      } else if (val === "2") {
        return "不通过";
      } else {
        return "待审核";
      }
    }
  },
  data() {
    return {
      activeName: "first",
      showSubmit: false,
      userType: "",
      companyId: "",
      dialogVisible: false,
      dicTypeData: {},
      imgSrc: "",
      imgSrcBig: "", // 预览大图
      typeOne: "", // 排序按钮组样式变量，初始样式
      typeTwo: "", // 排序按钮组样式变量
      typeThe: "", // 排序按钮组样式变量
      typeFive: "",
      typeFour: "",
      showNum: "", // 展示数量
      totalNum: "", // 总展品数
      lastDate: "", // 最后一次修改时间
      tableData: [], // 表格数据
      multipleSelection: [], // 多选暂存数据
      selectData: [], // 多选标注数据
      selectDelete: [], // 多选删除数据
      // 设置table的loading变量
      loading: false,
      // 批量审核按钮初始禁用
      disabled: true,
      // 筛选框字典
      dicSelect: [],
      // 分页
      pageInfo: {
        "currentPage": 0,
        "pageSize": 5,
        "total": 0,
        "style": "padding: 10px 0;text-align: right;"
      },
      value: '', //
      // 传参
      searchParams: {
        "orderModelField": [
          {
            "orderByField": "exhibitNameCh",
            "desc": true
          }
        ],
        "customQueryParams": [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [],
            "description": ""
          }
        ],
        "pageIndex": 1,
        "pageSize": 5
      },
      searchParamsT: {
        productName: "",
        productCategory: "",
        state: ""

      }
    };
  },

  created() {
    this.getExhibitCategorysInfo().then(res => {
      this.dicTypeData = res;
      // 初始列表
      // this.getData();
    });
    if (this.$store.state.userInfo.userType) {
      this.userType = this.$store.state.userInfo.userType;
    }
    if (this.$store.state.userInfo.companyId) {
      this.companyId = this.$store.state.userInfo.companyId;
    }
    this.getExhibitCategorysInfo().then(res => {
      this.dicTypeData = res;
      // 初始列表
      this.getData();
    });

    // 获取企业是否完善信息
    this.getBasicInfo(this.$store.state.userInfo.companyId).then(res => {
      if (res && res.isConfirmExhibit === '1') {
        this.showSubmit = false;
      } else {
        this.showSubmit = true;
      }
    });
    //获取字典信息
    let dicData = JSON.parse(localStorage.getItem('dictData'));
    this.dicSelect = dicData.exhibitSelect.sort(this.compare('value'));
  },
  computed: {
    ...mapGetters('enterExManagement', ['getAudit', 'updatePro', 'updatePros', 'getStatus'])
  },
  methods: {
    ...mapActions('enterExManagement', ['getAuditEnterProductInfo', 'getExhibitStatusInfo', 'updateProductInfo', 'updateProductsInfo', 'deleteProductInfo',
      'getExhibitCategorysInfo', // 获取展品类别
      'getExhibitShowCountInfo' // 获取已标注现场展示产品数
    ]),
    ...mapActions('corpDataManagement', ['reviewCompanyDocs', 'getBasicInfo']),
    // 确认提交
    confirmSubmit() {
      this.getAuditEnterProductInfo(this.searchParams).then(resM => {
        if (resM.records.length === 0) {
          this.$confirm('您在填报展品时，每个申请展区至少登记不少于三个标注为现场展示的展品，且至少有一个为近三年内上传或更新', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          });
        } else {
          this.getExhibitShowCountInfo(this.$store.state.userInfo.companyId).then(res => {
            if (res.length !== 0) {
              for (let i = 0; i < res.length; i++) {
                if (res[i].count < 3) {
                  this.$confirm('您在填报展品时，每个申请展区至少登记不少于三个标注为现场展示的展品，且至少有一个为近三年内上传或更新', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  });
                  this.showSubmit = true;
                  return false;
                } else {
                  this.showSubmit = false;
                  this.reviewCompanyDocs({ isConfirmExhibit: '1', companyId: this.$store.state.userInfo.companyId }).then(resT => {
                  });
                  this.$router.push({
                    path: '/brand_applicat_list'
                  });
                  return false;
                }
              }
            } else {
              this.$confirm('您在填报展品时，每个申请展区至少登记不少于三个标注为现场展示的展品，且至少有一个为近三年内上传或更新', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              });
            }
            // if (res.length !== 0) {
            //   this.$confirm('您在填报展品时，每个申请展区至少登记不少于三个标注为现场展示的展品，且至少有一个为近三年内上传或更新', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            //   });
            //   this.showSubmit = true;
            // } else {
            //   this.showSubmit = false;
            //   this.reviewCompanyDocs({ isConfirmExhibit: '1', companyId: this.$store.state.userInfo.companyId }).then(resT => {
            //   });
            //   this.$router.push({
            //     path: '/brand_applicat_list'
            //   });
            // }
          });
        }
      });
    },
    compare(property) {
      return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      };
    },
    // 展品类别转换方法
    getTra(data) {
      let _this = this;
      data.forEach((value, index, array) => {
        let newexhibitTypeOne = '';
        let newexhibitTypeTwo = '';
        let newexhibitTypeThree = '';
        if (value.exhibitTypeOne) {
          newexhibitTypeOne = _this.getDicText(_this.dicTypeData.exhibit_type_one, value.exhibitTypeOne);
        } else {
          newexhibitTypeOne = '';
        }
        value.newExhibitTypeOne = newexhibitTypeOne;
        if (value.exhibitTypeTwo) {
          newexhibitTypeTwo = " " + '|' + " " + _this.getDicText(_this.dicTypeData.exhibit_type_two, value.exhibitTypeTwo);
        } else {
          newexhibitTypeTwo = '';
        }
        value.newExhibitTypeTwo = newexhibitTypeTwo;
        if (value.exhibitTypeThree) {
          newexhibitTypeThree = " " + '|' + " " + _this.getDicText(_this.dicTypeData.exhibit_type_three, value.exhibitTypeThree);
        } else {
          newexhibitTypeThree = '';
        }
        value.newExhibitTypeThree = newexhibitTypeThree;
      });
    },
    // 字典code转换
    getDicText(dicArray, dicValue) {
      let text = '';
      for (let i = 0; i < dicArray.length; i++) {
        if (dicArray[i].exhibitTypeId === dicValue) {
          text = dicArray[i].commcn;
        }
      }
      return text;
    },
    // 查询方法
    getData() {
      if (this.userType === "qy") {
        this.searchParams.customQueryParams[0].values = [this.companyId];
      } else {
        this.searchParams.customQueryParams[0].name = "personalId";
        this.searchParams.customQueryParams[0].values = [this.companyId];
      }
      let _this = this;
      _this.searchParams.pageIndex = 1;
      this.loading = true;
      this.getAuditEnterProductInfo(this.searchParams).then(res => {
        this.loading = false;
        this.getTra(res.records);
         // ===imageUrl  // 只展示第一个
        for (let items in res.records) {
          let images = res.records[items]['images'];
          if (Array.isArray(images) && images.length !== 0) {
            res.records[items]["imageUrl"] = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + images[0].imageS;
          }
        }
        this.tableData = res.records;
        // this.pageInfo.currentPage = 1;
        // this.pageInfo.pageSize = 10;
        this.pageInfo.total = res.total;
      }).catch(e => {
        this.loading = false;
      });
      // 获取最新展览信息
      this.getExhibitStatusInfo(this.$store.state.userInfo.companyId);
    },
    // 筛选框选择不同，页面展示不同
    handleSelect(val) {
      if (val === "99") {
        this.getAll(); // 1为全部展品
        // this.getData();
      } else {
        this.showSpot(val); // 3为展示现场展品
      }
    },
    // 搜索框查询
    search() {
      let val = this.value;
      let searchName = '';
      let values = '';
      let findType = '';
      if (val === "01") {
        searchName = 'approveResult';
        values = '2';
        findType = 'EQ';
      } else if (val === "02") {
        // 筛选审核通过数据
        searchName = 'approveResult';
        values = '1';
        findType = 'EQ';
      } else if (val === "03") {
        // 筛选待审核数据
        searchName = 'approveResult';
        values = '3';
        findType = 'EQ';
      } else if (val === "04") {
        // 筛选有展位号数据
        searchName = 'boothNo';
        values = '1';
        findType = 'IS_NOT_NULL';
      } else if (val === "05") {
        // 筛选无展位号数据
        searchName = 'boothNo';
        values = '1';
        findType = 'IS_NULL';
      } else if (val === "06") {
        // 筛选是刀具数据
        searchName = 'isToolStatus';
        values = '1';
        findType = 'EQ';
      } else if (val === "07") {
        // 筛选现场展示展品数据
        searchName = 'showStatus';
        values = '1';
        findType = 'EQ';
      }
      if (this.searchParamsT.productName !== "") {
        this.searchParamsT.productName = $helper.trim(this.searchParamsT.productName);
      } else {
        this.searchParamsT.productName = "";
      }
      // if (this.searchParamsT.state !== "") {
      //   this.searchParamsT.state = $helper.trim(this.searchParamsT.state);
      // } else {
      //   this.searchParamsT.state = "";
      // }
      if (searchName === '') {
        searchName = 'exhibitNameCh';
      }
      if (values === '') {
        findType = 'IS_NOT_NULL';
      }
      let searchParams = {
        "orderModelField": [
          {
            "orderByField": "exhibitNameCh",
            "desc": true
          }
        ],
        "customQueryParams": [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.$store.state.userInfo.companyId],
            "description": ""
          },
          {
            "name": "exhibitNameCh",
            "findType": "LIKE",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.searchParamsT.productName],
            "description": ""
          },
          {
            "name": searchName,
            "findType": findType,
            "joinType": "And",
            "dataType": "Default",
            "values": [values],
            "description": ""
          }
        ],
        "pageIndex": 1,
        "pageSize": this.pageInfo.pageSize
      };
      if (val === '99') {
        searchParams = {
          "orderModelField": [
            {
              "orderByField": "exhibitNameCh",
              "desc": true
            }
          ],
          "customQueryParams": [
            {
              "name": "companyId",
              "findType": "EQ",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.$store.state.userInfo.companyId],
              "description": ""
            },
            {
              "name": "exhibitNameCh",
              "findType": "LIKE",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.searchParamsT.productName],
              "description": ""
            }
          ],
          "pageIndex": 1,
          "pageSize": this.pageInfo.pageSize
        };
      }
      if (this.userType === "qy") {
        searchParams.customQueryParams[0].values = [this.companyId];
      } else {
        searchParams.customQueryParams[0].name = "personalId";
        searchParams.customQueryParams[0].values = [this.companyId];
      }
      this.getAuditEnterProductInfo(searchParams).then(res => {
        this.getTra(res.records);
        for (let items in res.records) {
          let images = res.records[items]['images'];
          if (Array.isArray(images) && images.length !== 0) {
            res.records[items]["imageUrl"] = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + images[0].imageS;
          }
        }
        this.tableData = res.records;
        // this.pageInfo.currentPage = 1;
        // this.pageInfo.pageSize = 10;
        this.pageInfo.total = res.total;
      });
    },
    //获取全部展品
    getAll() {
      if (this.searchParamsT.productName) {
        this.searchParams.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.$store.state.userInfo.companyId],
            "description": ""
          },
          {
            "name": "exhibitNameCh",
            "findType": "LIKE",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.searchParamsT.productName],
            "description": ""
          }
        ];
      } else {
        this.searchParams.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.$store.state.userInfo.companyId],
            "description": ""
          }
        ];
      }

      this.getAuditEnterProductInfo(this.searchParams).then(res => {
        if (res.total > 0) {
          this.pageInfo.currentPage = res.current;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 0;
          this.pageInfo.total = 0;
        }
        this.getTra(res.records);
        for (let items in res.records) {
          let images = res.records[items]['images'];
          if (Array.isArray(images) && images.length !== 0) {
            res.records[items]["imageUrl"] = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + images[0].imageS;
          }
        }
        this.tableData = res.records;
        // this.pageInfo.pageSize = 10;
      });
    },
    // 多选数据处理
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //批量时，若未选择数据，按钮禁用
      if (val.length >= 1) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
      // 返回批量现场标注数据
      this.selectData = [];
      this.multipleSelection.map(el => {
        if (el.showStatus !== "1") {
          this.selectData.push(
            {
              "exhibitId": el.exhibitId,
              "oldExhibitId": el.oldExhibitId,
              "showStatus": "1"
            }
          );
          // return {
          //   "exhibitId": el.exhibitId,
          //   "showStatus": "1"
          // };
        } else {
          this.$message({
            message: '已标记现场展示的商品不能再次标记',
            type: 'warning'
          });
          // this.$refs.multipleTable.clearSelection(el);
          this.$refs.multipleTable.toggleRowSelection(el);
        }
      });
      // 返回批量删除数据
      this.selectDelete = [];
      this.multipleSelection.map(el => {
        this.selectDelete.push({
          "exhibitId": el.exhibitId
        });
        // return {
        //   "exhibitId": el.exhibitId
        // };
      });
    },
    // 分页事件
    handleSizeChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.pageSize = val;
      // let _this = this;
      this.getAuditEnterProductInfo(this.searchParams).then(res => {

        //设置table的loading变量
        this.loading = false;
        this.getTra(res.records);
        for (let items in res.records) {
          let images = res.records[items]['images'];
          if (Array.isArray(images) && images.length !== 0) {
            res.records[items]["imageUrl"] = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + images[0].imageS;
          }
        }
        this.tableData = res.records;
      });
    },
    handleCurrentChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.pageIndex = val;
      // let _this = this;
      this.getAuditEnterProductInfo(this.searchParams).then(res => {

        //设置table的loading变量
        this.loading = false;
        this.getTra(res.records);
        for (let items in res.records) {
          let images = res.records[items]['images'];
          if (Array.isArray(images) && images.length !== 0) {
            res.records[items]["imageUrl"] = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + images[0].imageS;
          }
        }
        this.tableData = res.records;
      });
    },
    // 进入编辑页面
    handleEdit(row) {
      this.$router.push({
        path: "/addProduction",
        query: {
          exhibitId: row.exhibitId,
          oldExhibitId: row.oldExhibitId,
          isOp: "1"
        }
      });
    },
    // 打印广交会刀具展样品报备登记表
    printKnife(val) {
      this.$router.push({
        path: "/registForm",
        query: {
          ruleForm: val.toolSampleId,
          returnPath: 'enterExManagement'
        }
      });
    },
    // 进入查看页面
    toDetail(row) {
      this.$router.push({
        path: "/addProduction",
        query: {
          exhibitId: row.exhibitId,
          isOp: "0"
        }
      });
    },
    toBoost(row) {
      if (row.images[0]) {
        this.imgSrcBig = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + row.images[0].imageB;
      }
      this.dialogVisible = true;
    },
    // 删除单条数据
    handleDelete(row) {
      let api = process.env.API_NA_URL;
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(api + "/api/speciaAreaExternal/ifApply?productId=" + row.exhibitId).then(resT => {
          if (resT.ifInUse === "1") {
            this.$message({
              type: 'warning',
              message: '该展品已在本届展位申请中提交，无法删除'
            });
          } else {
            let param = {
              exhibitIds: [
                {
                  exhibitId: row.exhibitId
                }
              ]
            };
            this.deleteProductInfo(param).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.showSpot();
            });

          }
        }).catch((e) => {

        });
      }).catch(() => {});
    },
    // 移除现场标注展品
    handleRemove(row) {
      this.$confirm('是否将该项移除现场展示？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = {
          "exhibitInfos": [
            {
              "exhibitId": row.exhibitId,
              "oldExhibitId": row.oldExhibitId,
              "showStatus": "2"
            }
          ]
        };
        this.updateProductsInfo(param).then(res => {
          this.$message({
            type: 'success',
            message: '移除成功'
          });
          this.getData();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    // 进入新增页面
    toEdit() {
      this.$router.push({
        path: "/addProduction",
        query: {
          isOp: "2"
        }
      });
    },
    // 批量标注为现场展示
    toLabel() {
      if (this.selectData.length < 1) {
        this.$message({
          type: 'info',
          message: '请选择至少一个展品'
        });
      } else {
        this.getLabel();
      }
    },
    handleExpo(row) {
      this.$confirm('是否将该项标注为现场展示？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = {
          "exhibitInfos": [
            {
              "exhibitId": row.exhibitId,
              "oldExhibitId": row.oldExhibitId,
              "showStatus": "1"
            }
          ]
        };
        this.updateProductsInfo(param).then(res => {
          this.$message({
            type: 'success',
            message: '标注现场展品成功'
          });
          this.getData();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    // 只有审核通过的展品方可标注现场展示，不可空选
    getLabel() {
      // if (this.selectData.includes(undefined)) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请选择审核通过的展品'
      //   });
      // } else {
      let param = {
        "exhibitInfos": this.selectData

      };
      this.updateProductsInfo(param).then(res => {
        this.$message({
          type: 'success',
          message: '标注现场展品成功'
        });
        this.getData();
      });
    },
    // 根据筛选条件不同，获取不同数据
    showSpot(val) {
      // 筛选审核不通过数据
      if (val === "01") {
        this.searchParams.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.$store.state.userInfo.companyId],
            "description": ""
          },
          {
            "name": "approveResult",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["2"],
            "description": ""
          }
        ];
      } else if (val === "02") {
        // 筛选审核通过数据
        this.searchParams.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.$store.state.userInfo.companyId],
            "description": ""
          },
          {
            "name": "approveResult",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["1"],
            "description": ""
          }
        ];
      } else if (val === "03") {
        // 筛选待审核数据
        this.searchParams.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.$store.state.userInfo.companyId],
            "description": ""
          },
          {
            "name": "approveResult",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["3"],
            "description": ""
          }
        ];
      } else if (val === "04") {
        // 筛选有展位号数据
        this.searchParams.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.$store.state.userInfo.companyId],
            "description": ""
          },
          {
            "name": "boothNo",
            "findType": "IS_NOT_NULL",
            "joinType": "And",
            "dataType": "Default",
            "values": ["1"],
            "description": ""
          }
        ];
      } else if (val === "05") {
        // 筛选无展位号数据
        this.searchParams.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.$store.state.userInfo.companyId],
            "description": ""
          },
          {
            "name": "boothNo",
            "findType": "IS_NULL",
            "joinType": "And",
            "dataType": "Default",
            "values": ["1"],
            "description": ""
          }
          // {
          //   "name": "boothNo",
          //   "findType": "EQ",
          //   "joinType": "Or",
          //   "dataType": "Default",
          //   "values": [],
          //   "description": ""
          // }
        ];
      } else if (val === "06") {
        // 筛选是刀具数据
        this.searchParams.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.$store.state.userInfo.companyId],
            "description": ""
          },
          {
            "name": "isToolStatus",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["1"],
            "description": ""
          }
        ];
      } else if (val === "07") {
        // 筛选现场展示展品数据
        this.searchParams.customQueryParams = [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.$store.state.userInfo.companyId],
            "description": ""
          },
          {
            "name": "showStatus",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["1"],
            "description": ""
          }
        ];
      }
      this.getData();
    },
    sortOnExh() {
      this.typeOne = ""; // 展品名称按钮改变选中样式
      this.typeThe = "";
      this.typeTwo = "";
      this.typeFour = "";
      this.typeFive = "danger";
      this.searchParams.orderModelField = [
        {
          "orderByField": "showStatus",
          "desc": true
        }
      ];
      this.getAuditEnterProductInfo(this.searchParams).then(res => {
        this.getTra(res.records);
        for (let items in res.records) {
          let images = res.records[items]['images'];
          if (Array.isArray(images) && images.length !== 0) {
            res.records[items]["imageUrl"] = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + images[0].imageS;
          }
        }
        this.tableData = res.records;
        // this.pageInfo.currentPage = 1;
        // this.pageInfo.pageSize = 10;
        this.pageInfo.total = res.total;
      });
    },
    sortKnife() {
      this.typeOne = ""; // 展品名称按钮改变选中样式
      this.typeThe = "";
      this.typeTwo = "";
      this.typeFour = "danger";
      this.typeFive = "";
      this.searchParams.orderModelField = [
        {
          "orderByField": "isToolStatus",
          "desc": true
        }
      ];
      this.getAuditEnterProductInfo(this.searchParams).then(res => {
        this.getTra(res.records);
        for (let items in res.records) {
          let images = res.records[items]['images'];
          if (Array.isArray(images) && images.length !== 0) {
            res.records[items]["imageUrl"] = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + images[0].imageS;
          }
        }
        this.tableData = res.records;
        // this.pageInfo.currentPage = 1;
        // this.pageInfo.pageSize = 10;
        this.pageInfo.total = res.total;
      });
    },
    // 根据名称排序
    // sortName() {
    //   this.typeOne = "danger"; // 展品名称按钮改变选中样式
    //   this.typeThe = "";
    //   this.typeTwo = "";
    //   this.searchParams.orderModelField = [
    //     {
    //       "orderByField": "exhibitNameCh",
    //       "desc": true
    //     }
    //   ];
    //   this.getAuditEnterProductInfo(this.searchParams).then(res => {
    //     this.getTra(res.records);
    //     this.tableData = res.records;
    //     // this.pageInfo.currentPage = 1;
    //     // this.pageInfo.pageSize = 10;
    //     this.pageInfo.total = res.total;
    //   });
    // },
    // 根据类型排序
    // sortType() {
    //   this.typeOne = "";
    //   this.typeThe = "";
    //   this.typeTwo = "danger"; // 展品类型按钮改变选中样式
    //   this.searchParams.orderModelField = [
    //     {
    //       "orderByField": "exhibitTypeOne,exhibitTypeTwo,exhibitTypeThree",
    //       "desc": true
    //     }
    //   ];
    //   this.getAuditEnterProductInfo(this.searchParams).then(res => {
    //     this.getTra(res.records);
    //     this.tableData = res.records;
    //     // this.pageInfo.currentPage = 1;
    //     // this.pageInfo.pageSize = 10;
    //     this.pageInfo.total = res.total;
    //   });
    // },
    // 根据更新时间排序
    sortDesc(val) {
      let orderFiled = '';
      this.typeOne = "";
      this.typeThe = ""; // 更新时间按钮改变选中样式
      this.typeTwo = "";
      if (val === 'typeOne') {
        this.typeOne = "danger";
        orderFiled = 'exhibitNameCh';
      } else if (val === 'typeTwo') {
        this.typeTwo = "danger";
        orderFiled = 'exhibitTypeOne,exhibitTypeTwo,exhibitTypeThree';
      } else if (val === 'typeThe') {
        this.typeThe = "danger";
        orderFiled = 'modifyDate';
      }

      if (this.searchParams.orderModelField[0].desc) {
        this.searchParams.orderModelField = [
          {
            "orderByField": orderFiled,
            "asc": true
          }
        ];
      } else {
        this.searchParams.orderModelField = [
          {
            "orderByField": orderFiled,
            "desc": true
          }
        ];
      }

      this.getAuditEnterProductInfo(this.searchParams).then(res => {
        this.getTra(res.records);
        for (let items in res.records) {
          let images = res.records[items]['images'];
          if (Array.isArray(images) && images.length !== 0) {
            res.records[items]["imageUrl"] = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + images[0].imageS;
          }
        }
        this.tableData = res.records;
        // this.pageInfo.currentPage = 1;
        // this.pageInfo.pageSize = 10;
        this.pageInfo.total = res.total;
      });
    },
    // 添加表头样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f5f5f5;";
      }
    }
  },
  watch: {
    "getStatus"(newVal) {
      if (newVal) {
        this.lastDate = newVal.lastDate;
        this.totalNum = newVal.totalNum;
        this.showNum = newVal.showNum;
      }
    }
  }
};
</script>
