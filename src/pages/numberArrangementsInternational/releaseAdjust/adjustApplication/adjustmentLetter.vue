<template>
  <div v-loading.fullscreen="fullLoading">
    <el-card style="padding-bottom: 24px">
      <!-- 表单 -->
      <el-form :inline="true" :model="formData" size="small" label-width="110px">
        <el-form-item label="换入展区">
          <el-select v-model="formData.inAreaCode" clearable>
            <el-option
              v-for="(item, index) in localstora.exhibitionArea"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="换出展区">
          <el-select v-model="formData.outAreaCode" clearable>
            <el-option
              v-for="(item, index) in localstora.exhibitionArea"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对方交易团">
          <el-select v-model="formData.otherDelegationCode" clearable>
            <el-option
              v-for="(item, index) in localstora.delegation"
              :key="index"
              :label="item.deptName"
              :value="item.deptCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展位类型">
          <el-select v-model="formData.boothType" clearable>
            <el-option label="一般性展位" value="1"></el-option>
            <el-option label="中央通道展位" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 提示 -->
      <div class="bgPink">
        <p>注意：</p>
        <p class="pStyle">1.如属交易团之间的展位等量调整，以及等量调换，交易团协商一致后，由一方通过此界面提交等量调整申请，另一方通过此界面查询到该调整申请后，点击确认，完成双方展位等量调整的申请，无需打印盖章确认。</p>
        <p class="pStyle">2.如属交易团之间的展位不等量调整，以及不等量还原调整，由交易团协商一致后，只需一方交易团填写，在线打印后需双方盖章确认，并传真至广交会工作领导小组办公室秘书处（传真号：020-89138550）。 </p>
        <p class="pStyle">3.如无调入或调出展位，则相应的展区和展位数项下无需填写，保留空白。</p>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border size="small">
        <el-table-column align="center" min-width="120" label="换入展区" prop="inArea"></el-table-column>
        <el-table-column align="center" min-width="120" label="换出展区" prop="outArea"></el-table-column>
        <el-table-column align="center" min-width="120" label="对方交易团" prop="otherDelegationName"></el-table-column>
        <el-table-column align="center" min-width="120" label="展位类型" prop="boothType">
          <template slot-scope="scope">{{scope.row.boothType | status}}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="本团换出展位数" prop="outNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="本团换入展位数" prop="inNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="商协会审核状态" prop="coceralExamineStatus">
          <template slot-scope="scope">{{scope.row.coceralExamineStatus | checkState}}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="工作部审核状态" prop="examineStatus">
          <template slot-scope="scope">{{scope.row.examineStatus | checkState}}</template>
        </el-table-column>
        <el-table-column align="center" min-width="160" label="操作">
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row.otherDelegationConfirm === '1' || scope.row.otherDelegationConfirm === '2'" @click="computEdit(scope.row)">编辑</el-button>
            <el-button type="text" :disabled="scope.row.otherDelegationConfirm === '1' || scope.row.otherDelegationConfirm === '2'" @click="computDele(scope.row)">删除</el-button>
            <!--<el-button
              type="text"
              v-show="scope.row.examineStatus === '1'"
              @click="revocation(scope.row)"
            >撤回</el-button>-->
            <el-button type="text" @click="print(scope.row)" v-if="scope.row.adjustType === 'UNEQUAL_EXCHANGE' || scope.row.adjustType === 'RESTORE_EXCHANGE_UNEQUAL'">打印</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 一堆按钮 -->
      <div class="paginationTop floatLeft">
        <el-button type="danger" class="formStyle" size="small" @click="handleAdd">新增</el-button>
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
      <!-- 新增弹框 -->
      <el-dialog :title="handtit" @close="closebox" :visible.sync="isExhibit" :close-on-click-modal="false" v-if="isExhibit" width="600px">
        <el-form :model="addForm" :rules="addRules" ref="addRef" size="small" label-width="140px">
          <el-form-item label="换入展区 ：">
            <el-select v-model="addForm.inAreaCode" @change="areaChange" clearable>
              <el-option v-if="addForm.outAreaCode === 'CP01'" label="化工" value="CP01"></el-option>
              <el-option
                v-else
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.exhibitionAreaName"
                :value="item.exhibitionAreaCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="换出展区 ：">
            <el-select v-model="addForm.outAreaCode" @change="outexhiac" clearable>
              <el-option v-if="addForm.inAreaCode === 'CP01'" label="化工" value="CP01"></el-option>
              <el-option
                v-else
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.exhibitionAreaName"
                :value="item.exhibitionAreaCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展位类型 ：" prop="boothType">
            <el-select v-model="addForm.boothType" clearable>
            <el-option label="一般性展位" value="1"></el-option>
            <el-option label="中央通道展位" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="对方交易团 ：" prop="otherDelegationCode">
            <el-select v-model="addForm.otherDelegationCode" clearable>
              <el-option
                v-for="(item, index) in localstora.delegation"
                :key="index"
                :label="item.deptName"
                :value="item.deptCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- jcrao 5/28
          <el-form-item label="本团换入展位数 ：" prop="inNumber">
            <el-input v-model.trim.number="addForm.inNumber" :disabled="addForm.outAreaCode !== '' && addForm.inAreaCode === ''" @change="numbin" maxlength="4"></el-input>
          </el-form-item>
          <el-form-item label="本团换出展位数 ：" prop="outNumber">
            <el-input v-model.trim.number="addForm.outNumber" :disabled="addForm.outAreaCode === '' && addForm.inAreaCode !== ''" @change="numbout" maxlength="4"></el-input>
          </el-form-item>
          -->
          <el-form-item label="调整展位数量 ：" prop="inoutNumber">
            <el-input placeholder="请输入" v-model.trim.number="addForm.inoutNumber" maxlength="4"></el-input>
          </el-form-item>
          <el-form-item label="备注 ：" prop="remark">
            <el-input type="textarea" v-model="addForm.remark" :rows="4" maxlength="120"></el-input>
          </el-form-item>
          <el-form-item label class="pdBoton">
            <el-button type="primary" @click="addSubmit('addRef')">提交</el-button>
            <el-button @click="addCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  props: {
    softData: {
      type: Object,
      default: () => { }
    }
  },
  mixins: [listPageBase],
  data() {
    // let tynum = (rule, value, callback) => {
    //   if (!value && value !== 0) {
    //     return callback(new Error("该字段为必填项"));
    //   } else if (!Number.isInteger(value - 0)) {
    //     return callback(new Error("请输入合法字符"));
    //   } else if (!(this.addForm.outNumber > 0) || !(this.addForm.inNumber > 0)) {
    //     return callback(new Error("换入换出展位数至少一项大于0"));
    //   } else {
    //     return callback();
    //   }
    // };
    // let tynum = (rule, value, callback) => {
    //   if (!value && value !== 0) {
    //     return callback(new Error("该字段为必填项"));
    //   } else if (!Number.isInteger(value - 0)) {
    //     return callback(new Error("请输入合法字符"));
    //   } else if (value <= 0) {
    //     return callback(new Error("必须大于0"));
    //   } else {
    //     return callback();
    //   }
    // };
    var numRule = (rule, value, callback) => {
      const reg = /[^\d\$]/g;
      if (!value) {
        return callback(new Error("请输入大于0的数"));
      } else if (reg.test(value)) {
        return callback(new Error('请输入整数'));
      } else if (!this.addForm.inAreaCode && !this.addForm.outAreaCode) {
        return callback(new Error('请选择换入或换出展区'));
      } else {
        return callback();
      }
    };
    return {
      obj: {
        current: 1,
        size: 10,
        delegationId: "140"
      },
      formData: {
        inAreaCode: "",
        outAreaCode: "",
        otherDelegationCode: "",
        boothType: ""
      },
      hytz: false, // 还原调整
      isExhibit: false, // 新增弹框
      fullLoading: true, // 加载
      handtit: "新增", // 弹框默认字段
      localstora: {
        exhibitionArea: [],
        delegation: []
      }, // 数据字典
      exArea: [], // 换入展位
      getLocal: {},
      // 删除绑定数据id
      delid: {
        applyId: ""
      },
      // 新增/编辑 数据
      addForm: {
        inAreaCode: "",
        outAreaCode: "",
        otherDelegationCode: "",
        otherDelegationId: "",
        otherDelegationName: "",
        outNumber: "",
        inNumber: "",
        remark: "",
        inoutNumber: "" // 调整展位数量
      },
      addRules: {
        // inAreaCode: [{ required: true, message: "该字段为必填项", trigger: "change" }],
        // outAreaCode: [{ required: true, message: "该字段为必填项", trigger: "change" }],
        boothType: [{ required: true, message: "该字段为必填项", trigger: "change" }],
        otherDelegationCode: [{ required: true, message: "该字段为必填项", trigger: "change" }],
        inoutNumber: [{ required: true, validator: numRule, trigger: 'blur' }]
      },
      // 表格数据
      tableData: [],
      receiveData: {},
      // 分页
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      isShow: false
    };
  },
  filters: {
    checkState(value) {
      if (value === "1") {
        return "通过";
      } else if (value === "2") {
        return "不通过";
      } else if (value === "0") {
        return "未审核";
      } else {
        return "未审核";
      }
    },
    status(val) {
      if (val === "1") {
        return "一般性展位";
      } else if (val === "2") {
        return "中央通道展位";
      }
    }
  },
  created() {
    if (Object.keys(this.softData).length !== 0) {
      this.receiveData = JSON.parse(JSON.stringify(this.softData));
      this.addForm.inAreaCode = this.receiveData.outExhibitionAreaCode;
      this.addForm.intentId = this.receiveData.intentId;
      this.addForm.outAreaCode = this.receiveData.inExhibitionAreaCode;
      this.addForm.boothType = this.receiveData.boothType;
      this.addForm.otherDelegationCode = this.receiveData.delegationCode;
      this.addForm.otherDelegationId = this.receiveData.delegationId;
      this.addForm.otherDelegationName = this.receiveData.delegationName;
      this.addForm.inoutNumber = this.receiveData.exchangeNumber;
      this.addForm.outNumber = this.receiveData.outExhibitionAreaCode ? this.receiveData.exchangeNumber : '';
      this.addForm.inNumber = this.receiveData.inExhibitionAreaCode ? this.receiveData.exchangeNumber : '';
      this.addForm.remark = this.receiveData.remark;
      this.isExhibit = true;
    }
  },
  mounted() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
    }
    this.getlistAdjustDemand();
    // this.getlistAdjustDemand().then(res => {
    //   if (res.records.length !== 0) {
    //     let id = { adjustDemandId: res.records[0].adjustDemandId };
    //     this.getlistAreaCode(id).then(resarea => {
    //       for (let j = 0; j < resarea.records.length; j++) {
    //         this.localstora.exhibitionArea = JSON.parse(JSON.stringify(resarea.records));
    //       }
    //     }).catch(e => {});
    //     this.getlistDelegation(id).then(resde => {
    //       for (let j = 0; j < resde.records.length; j++) {
    //         this.localstora.delegation = JSON.parse(JSON.stringify(resde.records));
    //       }
    //     }).catch(e => {});
    //   }
    // }).catch(e => {});
    // this.getLocal = JSON.parse(localStorage.getItem("temp"));
    this.getListPage(this.obj);
    // if (JSON.stringify(this.getLocal) === "{}") {
    //   this.$message({
    //     message: "请设置工作部设置调整规则",
    //     type: "danger"
    //   });
    // } else
    // if (this.getLocal.records[0].adjustType === "3") {
    //   this.hytz = true;
    // }
  },
  computed: {
    ...mapGetters("releaseAdjust", ["getlistAdjust"])
  },
  methods: {
    ...mapActions("releaseAdjust", [
      "getlistAdjustDemand", // 查询工作部设置的规则
      "getlistAreaCode", // 查询工作部设置的规则相关的展区
      "getlistDelegation", // 查询工作部设置的规则相关的交易团
      "getlistAdjustApplyDelegation", // 查询填写的一般性调整申请
      "addadjustApplyDelegation", // 填写一般性调整申请
      "updateadjustApplyDelegation", // 编辑一般性调整申请
      "deleteadjustApplyDelegation", // 删除一般性调整申请
      "addreturnScheduleRecord" // 撤回调整记录
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.tableData = [];
      this.getlistAdjustApplyDelegation(Url)
        .then(res => {
          this.fullLoading = false;
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.tableData = JSON.parse(JSON.stringify(res.records));
        })
        .catch(e => {});
    },
    // 查询
    onSearch() {
      this.obj = {
        delegationId: "140",
        current: "1",
        size: "10"
      };
      if (this.$store.getters.userInfo.org.deptId) {
        this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
      }
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        let aFirst = key[i];
        let bSecend = this.formData[key[i]];
        if (bSecend !== "") {
          this.obj[aFirst] = bSecend;
        }
      }
      this.getListPage(this.obj);
    },
    // 新增
    handleAdd() {
      this.isExhibit = true;
      this.handtit = "新增";
      this.addForm = {
        inAreaCode: "",
        outAreaCode: "",
        otherDelegationCode: "",
        otherDelegationId: "",
        otherDelegationName: "",
        outNumber: "",
        inNumber: "",
        remark: "",
        inoutNumber: "" 
      };
    },
    // jcrao 5/28
    // 编辑
    computEdit(val) {
      this.isExhibit = true;
      this.handtit = "编辑";
      this.addForm = {
        applyId: val.applyId,
        inAreaCode: val.inAreaCode,
        outAreaCode: val.outAreaCode,
        boothType: val.boothType,
        otherDelegationCode: val.otherDelegationCode,
        otherDelegationId: val.otherDelegationId,
        otherDelegationName: val.otherDelegationName,
        outNumber: val.outNumber,
        inNumber: val.inNumber,
        inoutNumber: val.outNumber === '0' ? val.inNumber : val.outNumber,
        remark: val.remark
      };
      if (val.outNumber == null || val.outNumber === '') {
        this.addForm.inoutNumber = val.inNumber;
      }
    },
    // 删除
    computDele(val) {
      this.delid.applyId = val.applyId;
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteadjustApplyDelegation(this.delid)
            .then(res => {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.getListPage(this.obj);
            })
            .catch(e => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 换入展区change事件
    areaChange() {
      // if (this.getLocal.records[0].isAcross === "0") {
      //   this.getlistAdjustDemand().then(res => {
      //     if (res.records.length !== 0) {
      //       let id = { 
      //         adjustDemandId: res.records[0].adjustDemandId,
      //         exhibitionAreaCode: this.addForm.inAreaCode,
      //         isAcross: "0"
      //       };
      //       this.getlistAreaCode(id).then(resarea => {
      //         for (let j = 0; j < resarea.records.length; j++) {
      //           this.exArea = JSON.parse(JSON.stringify(resarea.records));
      //         }
      //       }).catch(e => {});
      //     }
      //   }).catch(e => {});
      // } else {
      //   this.exArea = this.localstora.exhibitionArea;
      // }
      // let tynum = (rule, value, callback) => {
      //   if (!value && value !== 0) {
      //     return callback(new Error("该字段为必填项"));
      //   } else if (!Number.isInteger(value - 0)) {
      //     return callback(new Error("请输入合法字符"));
      //   } else if (value <= 0) {
      //     return callback(new Error("必须大于0"));
      //   } else {
      //     return callback();
      //   }
      // };
      if (this.addForm.inAreaCode === "CP01") {
        this.addForm.outAreaCode = "CP01";
        this.addRules.otherDelegationCode[0].required = false;
      } else {
        this.addRules.otherDelegationCode[0].required = true;
      }
      // if (this.addForm.inAreaCode !== "") {
      //   this.addRules.inNumber = [{ validator: tynum, required: true, trigger: "blur" }];
      // } else {
      //   this.addRules.inNumber = [];
      // }
    },
    // 换出展区的change事件
    outexhiac() {
      // let tynum = (rule, value, callback) => {
      //   if (!value && value !== 0) {
      //     return callback(new Error("该字段为必填项"));
      //   } else if (!Number.isInteger(value - 0)) {
      //     return callback(new Error("请输入合法字符"));
      //   } else if (value <= 0) {
      //     return callback(new Error("必须大于0"));
      //   } else {
      //     return callback();
      //   }
      // };
      if (this.addForm.outAreaCode === "CP01") {
        this.addForm.inAreaCode = "CP01";
        this.addRules.otherDelegationCode[0].required = false;
      } else {
        this.addRules.otherDelegationCode[0].required = true;
      }
      // if (this.addForm.outAreaCode !== "") {
      //   this.addRules.outNumber = [{ validator: tynum, required: true, trigger: "blur" }];
      // } else {
      //   this.addRules.outNumber = [];
      // }
    },
    // 换入change
    numbout() {
      if (this.addForm.inAreaCode !== "" && this.addForm.outAreaCode !== "") {
        this.addForm.inNumber = this.addForm.outNumber;
      }
    },
    // 换入change
    numbin() {
      if (this.addForm.inAreaCode !== "" && this.addForm.outAreaCode !== "") {
        this.addForm.outNumber = this.addForm.inNumber;
      }
    },
    // 撤回
    revocation(val) {
      let recall = {
        orderNo: val.orderNo,
        applyId: val.applyId,
        delegationId: val.delegationId,
        delegationName: val.delegationName,
        delegationCode: val.delegationCode,
        otherDelegationCode: val.otherDelegationCode,
        otherDelegationId: val.otherDelegationId,
        otherDelegationName: val.otherDelegationName,
        outAreaCode: val.outAreaCode,
        outNumber: val.outNumber,
        inAreaCode: val.inAreaCode,
        inNumber: val.inNumber
      };
      this.$confirm("确定撤回？")
        .then(() => {
          this.addreturnScheduleRecord(recall)
            .then(res => {
              this.$message({
                message: "撤回成功！",
                type: "success"
              });
              this.getListPage(this.obj);
            })
            .catch(e => {});
        });
    },
    // 新增/编辑 =》 提交
    addSubmit(datae) {
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.addForm.delegationId = this.obj.delegationId;
      // 交易团
      // this.addForm["delegationId"] = this.obj.delegationCode;
      for (let key in this.localstora.delegation) {
        if (this.localstora.delegation[key].deptId === this.obj.delegationId) {
          this.addForm["delegationName"] = this.localstora.delegation[key].deptName;
          this.addForm["delegationCode"] = this.localstora.delegation[key].deptCode;
        }
      }
      // this.addForm["otherDelegationId"] = this.addForm.otherDelegationCode;
      // 交易团
      for (let key in this.localstora.delegation) {
        if (this.localstora.delegation[key].deptCode === this.addForm.otherDelegationCode) {
          this.addForm["otherDelegationName"] = this.localstora.delegation[key].deptName;
          this.addForm["otherDelegationId"] = this.localstora.delegation[key].deptId;
        }
      }
      // 展区
      for (let key in this.localstora.exhibitionArea) {
        if (this.localstora.exhibitionArea[key].exhibitionAreaCode === this.addForm.inAreaCode) {
          this.addForm["inArea"] = this.localstora.exhibitionArea[key].exhibitionAreaName;
        }
        if (this.localstora.exhibitionArea[key].exhibitionAreaCode === this.addForm.outAreaCode) {
          this.addForm["outArea"] = this.localstora.exhibitionArea[key].exhibitionAreaName;
        }
      }
      // 新增编辑传参 jcrao 5/28
      if (this.addForm.inAreaCode !== '' && this.addForm.outAreaCode !== '') {
        this.addForm.inNumber = this.addForm.inoutNumber;
        this.addForm.outNumber = this.addForm.inoutNumber;
      } else if (this.addForm.inAreaCode !== '' && this.addForm.outAreaCode === '') {
        this.addForm.inNumber = this.addForm.inoutNumber;
        this.addForm.outNumber = '';
      } else if (this.addForm.inAreaCode === '' && this.addForm.outAreaCode !== '') {
        this.addForm.inNumber = '';
        this.addForm.outNumber = this.addForm.inoutNumber;
      }
      let addData = {
        intentId: this.addForm.intentId,
        inAreaCode: this.addForm.inAreaCode,
        inArea: this.addForm.inArea,
        outAreaCode: this.addForm.outAreaCode,
        outArea: this.addForm.outArea,
        outNumber: this.addForm.outNumber,
        inNumber: this.addForm.inNumber,
        boothType: this.addForm.boothType,
        delegationId: this.$store.getters.userInfo.org.deptId,
        delegationName: this.$store.getters.userInfo.org.deptName,
        delegationCode: this.$store.getters.userInfo.org.deptCode,
        otherDelegationId: this.addForm.otherDelegationId,
        otherDelegationName: this.addForm.otherDelegationName,
        otherDelegationCode: this.addForm.otherDelegationCode,
        remark: this.addForm.remark
      };
      if (!this.addForm.inAreaCode === "") {
        addData.inArea = "";
      }
      if (!this.addForm.outAreaCode) {
        addData.outArea = "";
      }
      if (this.handtit === "编辑") {
        // if (this.addForm.inAreaCode === "") {
        //   this.$message("换入展区不能为空");
        // } else if (this.addForm.outAreaCode === "") {
        //   this.$message("换出展区不能为空");
        // } else if (this.addForm.otherDelegationCode === "") {
        //   this.$message("对方交易团不能为空");
        // } else if (this.addForm.outNumber === "") {
        //   this.$message("换出数量不能为空");
        // } else
        // if (this.addForm.outNumber.replace(/^([1-9][0-9]*)$/, "")) {
        //   this.$message("换出数量只能输入正整数");
        // } else if (this.addForm.inNumber === "") {
        //   this.$message("换入数量不能为空");
        // } else if (this.addForm.inNumber.replace(/^([1-9][0-9]*)$/, "")) {
        //   this.$message("换入数量只能输入正整数");
        // } else {
        addData.applyId = this.addForm.applyId; 
        this.$refs[datae].validate((vald) => {
          if (vald) {
            this.updateadjustApplyDelegation(addData)
              .then(res => {
                this.$nextTick(() => { 
                  fullScreenloading.close();
                });
                this.getListPage(this.obj);
                this.isExhibit = false;
                this.handtit = "新增";
                this.addForm = {
                  inAreaCode: "",
                  outAreaCode: "",
                  boothType: "",
                  otherDelegationCode: "",
                  otherDelegationId: "",
                  otherDelegationName: "",
                  outNumber: "",
                  inNumber: "",
                  inoutNumber: "",
                  remark: ""
                };
              })
              .catch(e => {
                this.$nextTick(() => { 
                  fullScreenloading.close();
                });
              });
          }
        });
      } else {
        this.$refs[datae].validate((vald) => {
          if (vald) {
            this.addadjustApplyDelegation(addData)
              .then(res => {
                this.$nextTick(() => { 
                  fullScreenloading.close();
                });
                this.getListPage(this.obj);
                this.isExhibit = false;
                this.addForm = {
                  inAreaCode: "",
                  outAreaCode: "",
                  boothType: "",
                  otherDelegationCode: "",
                  otherDelegationId: "",
                  otherDelegationName: "",
                  outNumber: "",
                  inNumber: "",
                  inoutNumber: "",
                  remark: ""
                };
              })
              .catch(e => {
                this.$nextTick(() => { 
                  fullScreenloading.close();
                });
              });
          }
        });
      }
      // if (this.getLocal.records[0].adjustType === "1" || this.getLocal.records[0].adjustType === "1,3" || this.getLocal.records[0].adjustType === "3,1") {
      //   // if (this.addForm.inAreaCode === "") {
      //   //   this.$message("换入展区不能为空");
      //   // } else if (this.addForm.outAreaCode === "") {
      //   //   this.$message("换出展区不能为空");
      //   // } else if (this.addForm.otherDelegationCode === "") {
      //   //   this.$message("对方交易团不能为空");
      //   // } else if (this.addForm.outNumber === "") {
      //   //   this.$message("换出数量不能为空");
      //   // } else
      //   // if (this.addForm.outNumber.replace(/^([1-9][0-9]*)$/, "")) {
      //   //   this.$message("换出数量只能输入正整数");
      //   // } else if (this.addForm.inNumber === "") {
      //   //   this.$message("换入数量不能为空");
      //   // } else if (this.addForm.inNumber.replace(/^([1-9][0-9]*)$/, "")) {
      //   //   this.$message("换入数量只能输入正整数");
      //   // } else
      //   this.$refs[datae].validate((vald) => {
      //     if (vald) {
      //       if (this.addForm.outNumber === this.addForm.inNumber) {
      //         this.addadjustApplyDelegation(addData)
      //           .then(res => {
      //             this.getListPage(this.obj);
      //             this.isExhibit = false;
      //             this.addForm = {
      //               inAreaCode: "",
      //               outAreaCode: "",
      //               boothType: "",
      //               otherDelegationCode: "",
      //               otherDelegationId: "",
      //               otherDelegationName: "",
      //               outNumber: "",
      //               inNumber: "",
      //               inoutNumber: "",
      //               remark: ""
      //             };
      //           })
      //           .catch(e => {});
      //       } else {
      //         this.$message("与调整规则冲突，请重新输入");
      //       }
      //     }
      //   });
      // } else if (this.getLocal.records[0].adjustType === "2" || this.getLocal.records[0].adjustType === "2,3" || this.getLocal.records[0].adjustType === "3,2") {
      //   this.$refs[datae].validate((vald) => {
      //     if (vald) {
      //       if (this.addForm.outNumber !== this.addForm.inNumber) {
      //         this.addadjustApplyDelegation(addData)
      //           .then(res => {
      //             this.getListPage(this.obj);
      //             this.isExhibit = false;
      //             this.addForm = {
      //               inAreaCode: "",
      //               outAreaCode: "",
      //               boothType: "",
      //               otherDelegationCode: "",
      //               otherDelegationId: "",
      //               otherDelegationName: "",
      //               outNumber: "",
      //               inNumber: "",
      //               inoutNumber: "",
      //               remark: ""
      //             };
      //           })
      //           .catch(e => {});
      //       } else {
      //         this.$message("与调整规则冲突，请重新输入");
      //       }
      //     }
      //   });
      // } else 
    },
    // 取消
    addCancel() {
      this.isExhibit = false;
      // if (this.addForm.intentId) {
      //   this.$http.postJson(process.env.API_NA_URL + "/api/ordinaryExchangeIntent/publishSchedueRequest/update", {
      //     intentId: this.addForm.intentId
      //   }).then(res => {
      //   });
      // }
    },
    // 关闭弹窗 数据清空
    closebox() {
      for (let key in this.addForm) {
        this.addForm[key] = "";
      }
    },
    // 打印
    print(data) {
      this.$router.push({
        path: "/printedPage",
        query: {
          data: data,
          tatal: this.paginationData.total
        }
      });
    },
    // 分条/页
    handleSizeChange(val) {
      this.obj.size = val;
      this.getListPage(this.obj);
    },
    // 分页
    handleCurrentChange(val) {
      this.obj.current = val;
      this.getListPage(this.obj);
    }
  }
};
</script>
<style scoped>
.floatRight {
  float: right;
  margin-right: 50px;
}
.formStyle {
  padding: 8px 30px;
}
.paginationTop {
  margin-top: 10px;
}
.floatLeft {
  float: left;
}
.pdBoton {
  padding: 20px 0;
}
.pStyle {
  word-break: normal;
  white-space: pre-warp;
  word-wrapL: break-word;
}
.bgPink {
  padding: 20px;
  margin-bottom: 20px;
  background-color: #ffc0cb;
}
</style>


