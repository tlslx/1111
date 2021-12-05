<template>
  <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="核算展位基数" name="first">
      <!-- 表单 -->
      <el-form :inline="true" :model="formData" size="small">
        <el-form-item label="届数">
          <el-select v-model="formData.exhibitionSession" clearable>
            <el-option
              v-for="(item, index) in formOptionOne"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <drop-down-list :selectName="delet" @delegation="dataDelegation"></drop-down-list>
        <el-form-item class="floatRight">
          <el-button class="formStyle flotle" type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary" @click="openUpload">导入</el-button>
          <el-button type="primary" @click="setComputationrule" class="formStyle flotle">设置计算规则</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        align="center"
        style="width: 100%"
         
        border
        size="small"
        @selection-change="handleSelectionChange"
        show-summary
        :summary-method="getSum"
      >
        <el-table-column align="center" type="selection" width="55" fixed="left" :selectable="selecta"></el-table-column>
        <el-table-column align="center" min-width="120" label="届数" prop="exhibitionSession">
          <template slot-scope="scope">
            <span>{{scope.row.exhibitionSession}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="交易团" prop="delegationName">
          <template slot-scope="scope">
            <span>{{scope.row.delegationName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="基数总数" prop="baseTotal">
          <template slot-scope="scope">
            <span>{{scope.row.baseTotal}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="120"
          label="第一期基数"
          prop="firstBaseNumber"
        >
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model.trim="editTableData[0].baseNumber" maxlength="24"></el-input>
            <span v-else>{{scope.row.firstBaseNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="120"
          label="第二期基数"
          prop="secondBaseNumber"
        >
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model.trim="editTableData[1].baseNumber" maxlength="24"></el-input>
            <span v-else>{{scope.row.secondBaseNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          min-width="120"
          label="第三期基数"
          prop="thirdBaseNumber"
        >
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model.trim="editTableData[2].baseNumber" maxlength="24"></el-input>
            <span v-else>{{scope.row.thirdBaseNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="160" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="!scope.row.edit"
              :disabled="scope.row.examineStatus === '0' || scope.row.examineStatus === '1'"
              @click="onEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              v-else
              @click="onServe(scope.row, scope.$index)"
            >保存</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 一堆按钮 -->
      <div class="paginationTop floatLeft">
        <el-button type="primary" class="formStyle" size="small" @click="handDownload">下载</el-button>
        <el-button type="primary" class="formStyle" size="small" @click="handelSubmit" :disabled="ondisable">提交</el-button>
        <el-button type="primary" class="formStyle" size="small" @click="handAudit">核算</el-button>
        <el-button type="danger" class="formStyle" size="small" @click="dialogVisible = true" >公布</el-button>
      </div>
      <!-- 分页 -->
      <div class="floatRight paginationTop">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="paginationData.pageSizes"
          :current-page="paginationData.currentPage"
          :pager-count="paginationData.pagerCount"
          :page-size="paginationData.pageSize"
        ></el-pagination>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="500px"
        center>
        <span>站内信系统尚未集成</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 导入 -->
      <el-dialog title="导入" :visible.sync="isUp" v-if="isUp">
        <el-form :model="fileForm" ref="fileForm" :rules="fileRule">
          <el-form-item label="文件选择：" prop="chooseFileName">
            <el-upload ref="upload" action="" accept=".xls, .xlsx" :http-request="uploadFileMethod" :on-change="handleChange" :auto-upload="false" :show-file-list="false">
              <el-input placeholder="请选择文件" v-model="fileForm.chooseFileName" readonly></el-input>
              <div slot="tip" class="el-upload__tip">只能上传 xls / xlsx 文件，且不超过10M</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="模板下载：">
            <a href="javascript:;" @click="handleDownloadFile">模板文件点击下载</a>
          </el-form-item>
        </el-form>
        <div class="total-footer">
          <el-button type="primary" size="medium" @click="toUpload('fileForm')">导入</el-button>
          <el-button size="medium" @click="isUp = false;">取消</el-button>
        </div>
      </el-dialog>
      <!-- 设置计算规则弹框 -->
      <!-- close-on-click-modal="false" 弹框点击 遮罩层不关闭 -->
      <el-dialog
        title="设置计算规则"
        :visible.sync="isShow"
        :close-on-click-modal="false"
        @close="closeDialog"
        v-if="isShow"
        width="850px"
        v-loading.fullscreen="fullLoad"
      >
        <!-- 表格 -->
        <el-table :data="tableSetDataComputer" style="width: 100%" size="small" border>
          <el-table-column align="center" label="期数" prop="exhibitionPeriod">
            <template slot-scope="scope">
              <span>{{scope.row.exhibitionPeriod | checkStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="一般性展位总数" prop="boothTotal">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="tableSetEditComputer" :rules="editRule" ref="editRef" label-width="0px">
                  <el-form-item prop="boothTotal">
                    <el-input v-model.trim="tableSetEditComputer.boothTotal" maxlength="24"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.boothTotal}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="切块支持展位总数" prop="supportTotle">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="tableSetEditComputer" :rules="editRule" ref="editRef" label-width="0px">
                  <el-form-item prop="supportTotle">
                    <el-input v-model.trim="tableSetEditComputer.supportTotle" maxlength="24"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.supportTotle}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="不列入基数范围的一般性展位数" prop="boothTotalExcept">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="tableSetEditComputer" :rules="editRule" ref="editRef" label-width="0px">
                  <el-form-item prop="boothTotalExcept">
                    <el-input v-model.trim="tableSetEditComputer.boothTotalExcept" maxlength="24"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.boothTotalExcept}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="一般性展位总基数" prop="baseTotal">
            <template slot-scope="scope">
              <span v-if="scope.row.edit">{{tableSetEditComputer.boothTotal - tableSetEditComputer.supportTotle - tableSetEditComputer.boothTotalExcept}}</span>
              <span v-else>{{scope.row.boothTotal - scope.row.supportTotle - scope.row.boothTotalExcept}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="!scope.row.edit"
                @click="computEdit(scope.row, scope.$index)"
              >编辑</el-button>
              <el-button type="text" v-else @click="computSave(scope.row, scope.$index, 'editRef')">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="closCenter">
          <el-button type="info" size="small" class="formStyle" @click="closeEdit">关闭</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DropDownList from "@/components/project/common1/dropDownList.vue";
export default {
  components: {
    "drop-down-list": DropDownList
  },
  data() {
    let tynum = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error("该字段为必填项"));
      } else if (!Number.isInteger(value - 0)) {
        return callback(new Error("请输入合法字符"));
      } else if (value < 0) {
        return callback(new Error("必须大于等于0"));
      } else {
        return callback();
      }
    };
    return {
      // 弹窗
      obj: {
        orderModelField: [
          {
            orderByField: "",
            asc: false
          }
        ],
        localstora: {},
        customQueryParams: [],
        pageIndex: 1,
        pageSize: 10
      },
      isUp: false,
      fileForm: {
        chooseFileName: '' // 文件选择名称
      },
      fileRule: {
        chooseFileName: [{ required: true, message: '请选择需上传的文件', trigger: 'change' }]
      },
      dialogVisible: false,
      delet: { name: "交易团" },
      // 页面
      pageObj: {
        exhibitionSession: "",
        delegationId: "",
        current: 1,
        size: 10
      },
      indata: {
        current: 1,
        size: 0
      },
      thtabdat: [], // 用来保存addbase参数的数组
      ondisable: false,
      sub: [], // 提交
      lastIndexPage: "", // 上一次页面编辑保存的数据
      lastIndex: "", // 上一次弹窗编辑保存的数据
      fullLoading: true, // 控制加载
      fullLoad: true, // 控制弹框加载
      isEdit: true, // 是否显示编辑按钮
      // 弹框表格
      // tableSetData: [
      //   { label: "期数", prop: "qishu" },
      //   { label: "一般性展位总数", prop: "yibanx" },
      //   { label: "切块支持展位总数", prop: "qikuai" },
      //   { label: "不列入基数范围的一般性展位数", prop: "bulier" },
      //   { label: "一般性展位总基数", prop: "zongjishu" }
      // ],
      // 页面输入框的绑定数据
      editTableData: [
        { delegationId: "", delegationCode: "", baseNumber: "", exhibitionSession: "", exhibitionPeriod: "1" },
        { delegationId: "", delegationCode: "", baseNumber: "", exhibitionSession: "", exhibitionPeriod: "2" },
        { delegationId: "", delegationCode: "", baseNumber: "", exhibitionSession: "", exhibitionPeriod: "3" }
      ], // 暂无
      // 弹框输入框的绑定数据
      tableSetEditComputer: {
        boothTotal: "",
        supportTotle: "",
        boothTotalExcept: "",
        // baseTotal: "",
        ruleId: ""
      },
      editRule: {
        boothTotal: [{ validator: tynum, required: true, trigger: "blur" }],
        supportTotle: [{ validator: tynum, required: true, trigger: "blur" }],
        boothTotalExcept: [{ validator: tynum, required: true, trigger: "blur" }]
      },
      // 弹框表格数据
      tableSetDataComputer: [
        { exhibitionPeriod: "1", boothTotal: "0", supportTotle: "0", boothTotalExcept: "0", edit: false },
        { exhibitionPeriod: "2", boothTotal: "0", supportTotle: "0", boothTotalExcept: "0", edit: false },
        { exhibitionPeriod: "3", boothTotal: "0", supportTotle: "0", boothTotalExcept: "0", edit: false }
      ],
      // 下拉框数据届数
      formOptionOne: [],
      // 下拉框数据交易团
      formOptionThree: [],
      isShow: false, // 控制显示规则
      // 表单控制
      formControl: [
        {
          label: "届数",
          // model: "formData.numberOf",
          type: "select",
          optionData: [
            { label: "124届", value: "124" },
            { label: "125届", value: "125" },
            { label: "126届", value: "126" },
            { label: "127届", value: "127" },
            { label: "128届", value: "128" },
            { label: "129届", value: "129" },
            { label: "130届", value: "130" },
            { label: "131届", value: "131" },
            { label: "132届", value: "132" },
            { label: "133届", value: "133" }
          ]
        },
        {
          label: "交易团",
          // model: "formData.dealClusterName",
          type: "select",
          optionData: [
            {
              label: "请选择",
              value: ""
            },
            {
              label: "交易团1",
              value: "交易团1"
            }
          ]
        }
      ],
      // 表单
      formData: {
        exhibitionSession: "",
        delegationId: ""
      },
      // 表格
      tableDataMain: [
        { label: "届数", prop: "periods" },
        { label: "交易团", prop: "periods" },
        { label: "基数总数", prop: "periods" },
        { label: "第一期基数", prop: "periods" },
        { label: "第二期基数", prop: "periods" },
        { label: "第三期基数", prop: "periods" },
        { label: "审核状态", prop: "periods" },
        { label: "审核意见", prop: "periods" }
      ],
      // 表格数据
      tableData: [],
      tabDatCom: [],
      // 分页
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      token: "",
      activeName: "first"
    };
  },
  filters: {
    statusChek(value) {
      let val = value;
      if (val === "0") {
        return "未审核"; // 不可编辑
      } else if (val === "1") {
        return "审核通过"; // 不可编辑
      } else if (val === "2") {
        return "审核未通过"; // 可编辑
      } else {
        return "未提交"; // 可编辑
      }
    },
    checkStatus(value) {
      let val = value - 0;
      if (val === 1) {
        return "第一期";
      } else if (val === 2) {
        return "第二期";
      } else if (val === 3) {
        return "第三期";
      }
    }
  },
  created() {
    this.getList(this.pageObj);
    this.token = localStorage.getItem("USER_TOKEN");
    // this.getexhibitionArea().then(res => {
    // }).catch(e => {});
    this.formOptionThree = this.dictionaryData.delegation;
  },
  mounted() {
    this.getsysExhibitions().then(res => {
      // this.formOptionOne = JSON.parse(JSON.stringify(res.data));
      for (let i = 0; i < res.data.length; i++) {
        this.formOptionOne.push(res.data[i].exhibitionNum - 0);
      }
      let rul = (a, b) => a - b;
      this.formOptionOne = this.formOptionOne.sort(rul);
    });
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    this.getListPage(this.obj);
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  methods: {
    ...mapActions("baseAccounting", [
      "getlistAllOrdinary", // 工作部查询计算规则 （弹框）
      "updateordinaryBase", // 工作部编辑计算规则 （弹框）
      "addbase", // 工作部根据规则计算一般性展位基数
      "getordinaryBase", // 查询工作部根据规则计算一般性展位基数
      "updatebase", // 编辑工作部根据规则计算一般性展位基数
      "updatebaseNumber", // 提交一般性展位基数给外贸司
      "downloadbaseNumber", // 展位基数下载
      "postscheduleApply" // 导入展位基数
      // "addordinaryBase" // 核算交易团一般展位基数
    ]),
    ...mapActions("nainformation", ["getexhibitionArea",
      "getsysExhibitions" // 获取所有展届信息
    ]),
    // 获取初始页面的数据
    getList(Url) {
      // let getUrl = encodeURI(JSON.stringify(Url));
      this.getordinaryBase(Url)
        .then(res => {
          this.fullLoading = false;
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.tableData = getTable;
          for (let i = 0; i < getTable.length; i++) {
            getTable[i]["edit"] = false;
            // let option = {
            //   label: getTable[i].exhibitionSession + "届",
            //   value: getTable[i].exhibitionSession
            // };
            // this.formOptionOne.push(option);
          }
          // 数组去重
          // let hash = {};
          // this.formOptionOne = this.formOptionOne.reduce(function(item, next) {
          //   hash[next.value] ? '' : hash[next.value] = true && item.push(next);
          //   return item;
          // }, []);
          this.indata.size = res.total;
        })
        .catch(e => {});
    },
    // 页面查询
    onSearch() {
      this.pageObj.exhibitionSession = this.formData.exhibitionSession;
      this.pageObj.delegationId = this.formData.delegationId;
      this.getList(this.pageObj);
    },
    // 下载
    handDownload() {
      let url = this.indata.current + "&size=" + this.indata.size + "&exhibitionSession=" + this.formData.exhibitionSession + "&delegationId=" + this.formData.delegationId + "&token=" + this.token;
      window.open(process.env.API_NA_URL + "/api/ordinaryBase/baseNumber/download?current=" + url, "_parent");
    },
    // 打开上传弹框
    openUpload() {
      this.fileForm.chooseFileName = '';
      this.isUp = true;
    },
    // 模板下载
    handleDownloadFile() {
      window.open(`${process.env.API_NA_URL}/api/ordinaryBase/importBaseNumber/download?token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
    },
    // 文件改变
    handleChange(file, fileList) {
      this.fileForm.chooseFileName = file.name;
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);				
      const extension = testmsg === 'xls';
      const extension2 = testmsg === 'xlsx';
      const isLt2M = file.size / 1024 / 1024 < 10;    //这里做文件大小限制
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
        this.fileForm.chooseFileName = '';
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
        this.fileForm.chooseFileName = '';
      }
    },
    // 导入（上传）
    uploadFileMethod(param) {
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.postscheduleApply(formData).then(res => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
        this.$message({
          type: "success",
          message: "导入成功"
        });
        this.isUp = false;
        this.getList(this.pageObj);
      }).catch(e => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
      });
    },
    // 文件上传
    toUpload(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs.upload.submit();
        }
      });
    },
    // 获取组件数据
    dataDelegation(code, name) {
      this.formData.delegationId = code;
    },
    // 是否禁用打钩选项
    selecta(row, index) {
      if (row.examineStatus === "1") {
        return false;
      } else {
        return true;
      }
    },
    // 页面编辑事件
    onEdit(valId, val) {
      if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
        this.editTableData[0].baseNumber = val.firstBaseNumber;
        this.editTableData[1].baseNumber = val.secondBaseNumber;
        this.editTableData[2].baseNumber = val.thirdBaseNumber;
        for (let i = 0; i < this.editTableData.length; i++) {
          this.editTableData[i].delegationId = val.delegationId;
          this.editTableData[i].delegationCode = val.delegationCode;
          this.editTableData[i].exhibitionSession = val.exhibitionSession;
        }
        this.tableData[valId]["edit"] = true;
        this.lastIndexPage = valId;
      } else {
        this.$confirm("是否放弃本次修改")
          .then(() => {
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i]["edit"] = false;
            }
            this.tableData[valId]["edit"] = true;
            this.lastIndexPage = valId;
            this.editTableData[0].baseNumber = val.firstBaseNumber;
            this.editTableData[1].baseNumber = val.secondBaseNumber;
            this.editTableData[2].baseNumber = val.thirdBaseNumber;
            for (let i = 0; i < this.editTableData.length; i++) {
              this.editTableData[i].delegationId = val.delegationId;
              this.editTableData[i].delegationCode = val.delegationCode;
              this.editTableData[i].exhibitionSession = val.exhibitionSession;
            }
          })
          .catch(() => {
            this.$message.info("已取消本次操作");
          });
      }
    },
    // 页面编辑保存事件
    onServe(val, valId) {
      this.lastIndexPage = "";
      this.tableData[valId]["edit"] = false;
      this.updatebase(this.editTableData)
        .then(res => {
          this.getList(this.pageObj); // 调用初始加载页面方法
        })
        .catch(e => {});
    },
    // 页面合计
    getSum(param) {
      const { columns, data } = param;
      const sums = [];
      if (data.length > 0) {
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          } else if (index === 1) {
            sums[index] = '';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        });
      }
      return sums;
    },
    // 打钩事件
    handleSelectionChange(val) {
      this.sub = [];
      for (let i = 0; i < val.length; i++) {
        let dataSub = {
          delegationId: "",
          exhibitionSession: "",
          examineStatus: ""
        };
        dataSub.delegationId = val[i].delegationId;
        dataSub.exhibitionSession = val[i].exhibitionSession;
        dataSub.examineStatus = val[i].examineStatus;
        this.sub.push(dataSub);
      }
      for (let i = 0; i < val.length; i++) {
        this.ondisable = false;
        if (val[i].examineStatus === "0" || val[i].examineStatus === "1") {
          this.ondisable = true;
          break;
        }
      }
    },
    // 页面提交
    handelSubmit() {
      this.updatebaseNumber(this.sub).then(res => {
        this.$message("您已提交");
        this.getList(this.pageObj);
      }).catch(e => {});
    },
    // 获取弹框的初始数据
    getListPage(Url) {
      // this.fullLoad = false;
      let getUrl = encodeURI(JSON.stringify(Url));
      this.getlistAllOrdinary(getUrl)
        .then(res => {
          this.fullLoad = false;
          let listTable = JSON.parse(JSON.stringify(res.records));
          for (let i = 0; i < listTable.length; i++) {
            listTable[i]["edit"] = false;
            if (listTable[i].exhibitionPeriod === "1") {
              this.tableSetDataComputer[0] = listTable[i];
            } else if (listTable[i].exhibitionPeriod === "2") {
              this.tableSetDataComputer[1] = listTable[i];
            } else if (listTable[i].exhibitionPeriod === "3") {
              this.tableSetDataComputer[2] = listTable[i];
            }
          }
          // this.tableSetDataComputer = listTable;
        })
        .catch(e => {});
    },
    // 编辑弹窗
    computEdit(val, valId) {
      this.thtabdat = val;
      if (this.lastIndex === "" || this.lastIndex === valId) {
        this.tableSetEditComputer.boothTotal = val.boothTotal;
        this.tableSetEditComputer.supportTotle = val.supportTotle;
        this.tableSetEditComputer.boothTotalExcept = val.boothTotalExcept;
        this.tableSetEditComputer["exhibitionPeriod"] = Number(valId + 1);
        this.tableSetEditComputer.ruleId = val.ruleId;
        this.tableSetDataComputer[valId]["edit"] = true;
        this.lastIndex = valId;
      } else {
        this.$confirm("是否放弃本次修改")
          .then(() => {
            for (let i = 0; i < this.tableSetDataComputer.length; i++) {
              this.tableSetDataComputer[i]["edit"] = false;
            }
            this.tableSetDataComputer[valId]["edit"] = true;
            this.lastIndex = valId;
            // for (let key = 0; key < this.tableSetEditComputer.length; key++) {
            //   this.tableSetEditComputer[key] = "";
            // }
            this.tableSetEditComputer.boothTotal = val.boothTotal;
            this.tableSetEditComputer.supportTotle = val.supportTotle;
            this.tableSetEditComputer.boothTotalExcept = val.boothTotalExcept;
            this.tableSetEditComputer.ruleId = val.ruleId;
            // this.tableSetEditComputer["exhibitionPeriod"] = Number(valId + 1);
          })
          .catch(() => {
            this.$message.info("已取消本次操作");
          });
      }
    },
    // 保存弹框
    computSave(val, valId, datae) {
      if (
        this.tableSetEditComputer.boothTotal - this.tableSetEditComputer.supportTotle - this.tableSetEditComputer.boothTotalExcept < 0
      ) {
        this.$message(
          "不列入基数范围的一般性展位数和切块支持展位总数之和不应大于一般性展位总数"
        );
      } else {
        this.lastIndex = "";
        this.$refs[datae].validate((vald) => {
          if (vald) {
            this.tableSetDataComputer.forEach((obj, index) => {
              for (let key in obj) {
                if (obj[key] == null || obj[key] === "") {
                  obj[key] = "0";
                }
              }
            });
            this.updateordinaryBase(this.tableSetEditComputer)
              .then(res => {
                this.getList(this.pageObj);
                this.getListPage(this.obj);
                this.tableSetDataComputer[valId]["edit"] = false;
              })
              .catch(e => {});
          }
        });
      }
    },
    // 关闭弹框按钮
    closeEdit() {
      this.lastIndex = "";
      for (let key = 0; key < this.tableSetDataComputer.length; key++) {
        this.tableSetDataComputer[key]["edit"] = false;
      }
      this.isShow = false;
    },
    // 关闭弹框
    closeDialog() {
      this.lastIndex = "";
      for (let key = 0; key < this.tableSetDataComputer.length; key++) {
        this.tableSetDataComputer[key]["edit"] = false;
      }
      this.isShow = false;
    },
    // 设置计算规则
    setComputationrule() {
      this.isShow = true;
      this.getListPage(this.obj);
    },
    // 核算
    handAudit() {
      if (this.tableSetDataComputer.length === 0) {
        this.$message("请先设置计算规则");
      } else {
        this.$confirm('是否确认核算?', '核算', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.addbase(this.tableSetDataComputer)
          .then(res => {
            this.$message({
              type: 'success',
              message: '确认成功!'
            });
            this.getList(this.pageObj);
          })
          .catch(e => {});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消确认'
          });          
        });
      }
    },
    // 分条/页
    handleSizeChange(val) {
      this.pageObj.size = val;
      this.getListPage(this.pageObj);
    },
    // 分页
    handleCurrentChange(val) {
      this.pageObj.current = val;
      this.getList(this.pageObj);
    }
  }
};
</script>
<style scoped>
.closCenter {
  text-align: center;
  line-height: 100px;
}
.paginationTop {
  margin-top: 10px;
}
.floatLeft {
  float: left;
}
.floatRight {
  float: right;
  margin-right: 50px;
}
.formStyle {
  padding: 8px 30px;
}
.impfloat {
  margin: 0 10px;
  display: inline-block;
}
.flotle {
  float: left;
}
.total-footer{
  text-align: center;
  padding: 20px 0;
}
</style>

