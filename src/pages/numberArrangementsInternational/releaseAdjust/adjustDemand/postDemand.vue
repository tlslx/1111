<template>
  <div v-loading.fullscreen="fullLoading">
    <!--<el-card style="padding-bottom: 24px">-->
    <!-- 表单 -->
    <el-form :inline="true" :model="formData" size="small">
      <el-form-item label="拟换入展位">
        <el-select v-model="formData.inExhibitionAreaCode" clearable>
          <el-option
            v-for="(item, index) in localstora.exhibitionArea"
            :key="index"
            :label="item.exhibitionAreaName"
            :value="item.exhibitionAreaCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="拟换出展位">
        <el-select v-model="formData.outExhibitionAreaCode" clearable>
          <el-option
            v-for="(item, index) in localstora.exhibitionArea"
            :key="index"
            :label="item.exhibitionAreaName"
            :value="item.exhibitionAreaCode"
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
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      size="small"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" fixed="left" :selectable="selecta" type="selection" width="55"></el-table-column>
      <el-table-column align="center" min-width="120" label="本团拟换入展位" prop="inExhibitionArea"></el-table-column>
      <el-table-column align="center" min-width="120" label="本团拟换出展位" prop="outExhibitionArea"></el-table-column>
      <el-table-column align="center" min-width="120" label="展位类型" prop="boothType">
        <template slot-scope="scope">{{scope.row.boothType | status}}</template>
      </el-table-column>
      <el-table-column align="center" min-width="120" label="调换展位数量（填写数字，须整数，大于0）" prop="exchangeNumber">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-form :model="editForm" :rules="editRule" ref="editRef" label-width="0px">
              <el-form-item prop="exchangeNumber">
                <el-input v-model.trim="editForm.exchangeNumber" maxlength="4"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span v-else>{{scope.row.exchangeNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="120" label="备注" prop="remark"></el-table-column>
      <el-table-column align="center" min-width="120" label="联系方式" prop="contact"></el-table-column>
      <el-table-column align="center" min-width="160" label="操作">
        <template slot-scope="scope">
          <!-- jcrao 5/28 -->
          <!--<el-button type="text" :disabled="scope.row.otherDelegationConfirm === '2' || scope.row.otherDelegationConfirm === '3'" @click="announce(scope.row)">发布</el-button>-->
          <el-button
            type="text"
            v-if="!scope.row.edit"
            @click="handEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button type="text" v-else @click="handSeave(scope.$index, scope.row, 'editRef')">保存</el-button>
          <el-button type="text" @click="handDele(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 一堆按钮 -->
    <div class="paginationTop floatLeft">
      <el-button type="danger" class="formStyle" size="small" @click="addExhibition">新增</el-button>
      <el-button type="danger" class="formStyle" size="small" @click="delBoth">删除</el-button>
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
    <!-- 匹配信息 -->
    <el-dialog title="匹配信息" :visible.sync="isShow" v-if="isShow" :close-on-click-modal="false" width="850px">
      <!-- 表格 -->
      <el-table :data="tableDataedit" style="width: 100%" size="small" border>
        <el-table-column align="center" label="交易团" prop="delegationName"></el-table-column>
        <el-table-column align="center" label="拟换入展位" prop="inExhibitionArea"></el-table-column>
        <!-- <el-table-column align="center" label="换入展位数量" prop="inNumber"></el-table-column> -->
        <el-table-column align="center" label="拟换出展位" prop="outExhibitionArea"></el-table-column>
        <!-- <el-table-column align="center" label="换出展位数量" prop="outNumber"></el-table-column> -->
        <el-table-column align="center" label="匹配交易团调换数量" prop="exchangeNumber"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row.matchId != null && scope.row.matchId !== ''" @click="sendRequest(scope.row)">发送请求</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="closCenter">
        <el-button type="info" class="formStyle" size="small" @click="isShow = false">返回</el-button>
      </div>
    </el-dialog>
    <!-- 新增弹框 -->
    <el-dialog title="新增" :visible.sync="isExhibit" v-if="isExhibit" :close-on-click-modal="false" width="500px">
      <el-form :model="addForm" :rules="rules" ref="ruleForm" size="small" label-width="140px">
        <el-form-item label="本团拟换入展位 ：">
          <el-select v-model="addForm.inExhibitionAreaCode" :disabled="addForm.outExhibitionAreaCode === 'CP01'" clearable @change="inexhiac">
            <el-option
              v-for="(item, index) in localstora.exhibitionArea"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="本团拟换出展位 ：">
          <el-select v-model="addForm.outExhibitionAreaCode" :disabled="addForm.inExhibitionAreaCode === 'CP01'" @change="outexhiac" clearable>
            <el-option
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
        <el-form-item label="调整展位数量 ：" prop="exchangeNumber">
          <el-input v-model.trim.number="addForm.exchangeNumber" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="备注 ：" prop="remark">
          <el-input v-model.trim="addForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="联系方式 ：" prop="contact">
          <el-input v-model.trim="addForm.contact"></el-input>
        </el-form-item>
        <el-form-item label class="pbottom">
          <el-button type="primary" @click="addSubmit('ruleForm')">提交</el-button>
          <el-button @click="isExhibit = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--</el-card>-->
  </div>
</template>
<script>
// import Bus from "./bus.js";
import { mapActions, mapGetters } from "vuex";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    let tynum = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error("该字段为必填项"));
      } else if (!Number.isInteger(value - 0)) {
        return callback(new Error("请输入合法字符"));
      } else if (value <= 0) {
        return callback(new Error("必须大于0"));
      } else {
        return callback();
      }
    };
    let valRem = (rule, value, callback) => {
      let remLen = value.split("");
      if (remLen.length > 120) {
        return callback(new Error("该字段长度不能大于120"));
      } else {
        return callback();
      }
    };
    let valCon = (rule, value, callback) => {
      let remLen = value.split("");
      if (remLen.length > 20) {
        return callback(new Error("该字段长度不能大于20"));
      } else {
        return callback();
      }
    };
    return {
      obj: {
        pageIndex: 1,
        pageSize: 10,
        customQueryParams: [
          {
            name: "delegationId",
            findType: "EQ",
            joinType: "And",
            dataType: "Default",
            values: [""],
            description: ""
          }
        ]
      },
      formData: {
        inExhibitionAreaCode: "",
        outExhibitionAreaCode: "",
        boothType: ""
      },
      editForm: {
        exchangeNumber: ""
      },
      editRule: {
        exchangeNumber: [{ validator: tynum, required: true, trigger: "blur" }]
      },
      isExhibit: false, // 新增弹框的显示隐藏
      localstora: {
        exhibitionArea: [],
        delegation: []
      }, // 数据字典
      addForm: {
        inExhibitionArea: "",
        inExhibitionAreaCode: "",
        outExhibitionArea: "",
        outExhibitionAreaCode: "",
        exchangeNumber: "",
        boothType: ""
      },
      isShow: false, // 发布弹框
      fullLoading: true, // 加载
      lastIndexPage: "", // 上一个编辑的id
      intId: {
        intentId: ""
      }, // 删除参数
      saveScheme: [],
      rules: {
        boothType: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        outExhibitionAreaCode: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        exchangeNumber: [{ validator: tynum, required: true, trigger: "blur" }],
        remark: [{ validator: valRem, trigger: "blur" }],
        contact: [{ validator: valCon, trigger: "blur" }]
      },
      // 表格数据
      tableData: [
        {
          exhibitionPeriod: "",
          boothTotal: "",
          supportTotle: ""
        }
      ],
      tableDataedit: [],
      dpara: {},
      // 分页
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      }
    };
  },
  filters: {
    status(val) {
      if (val === "1") {
        return "一般性展位";
      } else if (val === "2") {
        return "中央通道展位";
      }
    }
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  mounted() {
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
    // this.localstora = JSON.parse(localStorage.getItem("temp"));
    // this.localstora = this.dictionaryData;
    // 交易团
    // this.obj["delegationId"] = this.obj.delegationCode;
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // for (let key in this.localstora.delegation) {
    //   if (this.localstora.delegation[key].deptId === this.obj.delegationId) {
    //     this.obj["delegationName"] = this.localstora.delegation[key].deptName;
    //     this.obj["delegationCode"] = this.localstora.delegation[key].deptCode;
    //   }
    // }
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj.customQueryParams[0].values.splice(0, 1, this.$store.getters.userInfo.org.deptId);
    }
    this.getListPage(this.obj);
  },
  methods: {
    ...mapActions("releaseAdjust", [
      "getlistAdjustDemand", // 查询工作部设置的规则
      "getlistAreaCode", // 查询工作部设置的规则相关的展区
      "getlistDelegation", // 查询工作部设置的规则相关的交易团
      "getlistIntent", // 查询交易团一般性展位调整需求
      "addintent", // 交易团添加一般性展位调整需求
      "updateschedueRequest", // 交易团发布一般性展位调整需求
      "getlistExchangeIntent", // 查询跟本交易团发布一般性展位调整需求相匹配的其他交易团
      "addsendScheduleRequest", // 系统匹配完后，向符合要求的交易团发送调整请求
      "updateordinaryExchangeIntent", // 编辑交易团调整需求
      "deleteordinaryExchangeIntent", // 删除交易团调整需求
      "deletebatchOrdinaryExchangeIntent" // 批量删除交易团调整需求
      // "getlistSendScheduleRequest" // 发布调整需求时，查询需要处理的调整需求
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据 ok
    getListPage(Url) {
      this.tableData = [];
      let getUrl = encodeURI(JSON.stringify(Url));
      this.getlistIntent(getUrl)
        .then(res => {
          this.fullLoading = false;
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          for (let i = 0; i < getTable.length; i++) {
            getTable[i]["edit"] = false;
          }
          this.tableData = getTable;
        })
        .catch(e => {});
    },
    // 查询 ok
    onSearch() {
      let objOne = {
        customQueryParams: [
          {
            name: "delegationId",
            findType: "EQ",
            joinType: "And",
            dataType: "Default",
            values: ["140"],
            description: ""
          }
        ],
        pageIndex: 1,
        pageSize: 10
      };
      if (this.$store.getters.userInfo.org.deptId) {
        objOne.customQueryParams[0].values.splice(0, 1, this.$store.getters.userInfo.org.deptId);
      }
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        if (this.formData[key[i]] !== "" && this.formData[key[i]] != null) {
          let aFist = {
            name: key[i],
            findType: "LIKE",
            joinType: "And",
            dataType: "Default",
            values: [this.formData[key[i]]],
            description: ""
          };
          objOne.customQueryParams.push(aFist);
        }
      }
      this.getListPage(objOne);
    },
    // 新增 =》 弹框弹出
    addExhibition() {
      this.addForm = {
        inExhibitionArea: "",
        inExhibitionAreaCode: "",
        outExhibitionArea: "",
        outExhibitionAreaCode: "",
        exchangeNumber: "",
        boothType: "",
        remark: "", //备注
        contact: "" //联系方式
      };
      this.isExhibit = true;
    },
    // 换入展区的change事件
    inexhiac() {
      if (this.addForm.inExhibitionAreaCode === "CP01") {
        this.addForm.outExhibitionAreaCode = "CP01";
      }
    },
    // 换出展区的change事件
    outexhiac() {
      if (this.addForm.outExhibitionAreaCode === "CP01") {
        this.addForm.inExhibitionAreaCode = "CP01";
      }
    },
    // 新增 =》 提交 ok
    addSubmit(fname) {
      // this.addForm["delegationCode"] = this.obj.customQueryParams[0].values[0];
      // this.addForm["delegationId"] = this.$store.getters.userInfo.org.deptId;
      // 交易团
      // for (let key in this.localstora.delegation) {
      //   if (
      //     this.localstora.delegation[key].deptId === this.addForm.delegationId
      //   ) {
      //     this.addForm["delegationName"] = this.localstora.delegation[key].deptName;
      //     this.addForm["delegationCode"] = this.localstora.delegation[key].deptCode;
      //     console.log(this.addForm, "addForm");
      //   }
      // }
      // this.addForm["delegationName"] = this.$store.getters.userInfo.org.deptName;
      // this.addForm["delegationCode"] = this.$store.getters.userInfo.org.deptCode;
      let fullScreenloading = this.$loading({ fullscreen: true });
      // 展区
      for (let key in this.localstora.exhibitionArea) {
        if (
          this.localstora.exhibitionArea[key].exhibitionAreaCode === this.addForm.inExhibitionAreaCode
        ) {
          this.addForm["inExhibitionArea"] = this.localstora.exhibitionArea[
            key
          ].exhibitionAreaName;
        }
        if (
          this.localstora.exhibitionArea[key].exhibitionAreaCode === this.addForm.outExhibitionAreaCode
        ) {
          this.addForm["outExhibitionArea"] = this.localstora.exhibitionArea[
            key
          ].exhibitionAreaName;
        }
      }
      // if (this.addForm.inExhibitionAreaCode === "") {
      //   this.$message("本团拟换入展位不能为空");
      // } else if (this.addForm.outExhibitionAreaCode === "") {
      //   this.$message("本团拟换出展位不能为空");
      // } else
      // if (this.addForm.exchangeNumber.replace(/^([1-9][0-9]*)$/, "")) {
      //   this.$message("调整展位数量只能输入正整数");
      // } else {
      if (this.addForm.inExhibitionAreaCode === "" && this.addForm.outExhibitionAreaCode === "") {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
        this.$message.error("不符合调整规则");
      } else {
        this.$refs[fname].validate((valid) => {
          if (valid) {
            let addData = {
              inExhibitionArea: this.addForm.inExhibitionArea,
              inExhibitionAreaCode: this.addForm.inExhibitionAreaCode,
              outExhibitionArea: this.addForm.outExhibitionArea,
              outExhibitionAreaCode: this.addForm.outExhibitionAreaCode,
              exchangeNumber: this.addForm.exchangeNumber,
              boothType: this.addForm.boothType,
              remark: this.addForm.remark,
              contact: this.addForm.contact,
              delegationId: this.$store.getters.userInfo.org.deptId,
              delegationName: this.$store.getters.userInfo.org.deptName,
              delegationCode: this.$store.getters.userInfo.org.deptCode
            };
            if (!this.addForm.inExhibitionAreaCode) {
              addData.inExhibitionArea = "";
            }
            if (!this.addForm.outExhibitionAreaCode) {
              addData.outExhibitionArea = "";
            }
            this.addintent(addData)
              .then(res => {
                this.$nextTick(() => { 
                  fullScreenloading.close();
                });
                this.isExhibit = false;
                // 清空弹框
                for (let key in this.addForm) {
                  this.addForm[key] = "";
                }
                this.getListPage(this.obj);
              })
              .catch(e => {
                this.$nextTick(() => { 
                  fullScreenloading.close();
                });
              });
          }
        });
      }
    },
    // jcrao 5/28
    // 发布
    // announce(data) {
    //   // this.isShow = true;
    //   this.intId.intentId = data.intentId;
    //   // if (data.otherDelegationConfirm === "0") {
    //     // 发布
    //   this.updateschedueRequest(this.intId)
    //     .then(res => {
    //       this.$message({
    //         message: "发布成功！",
    //         type: "success"
    //       });
    //       this.getListPage(this.obj);
    //     })
    //     .catch();
      // } else {
      //   this.$message.info("您已发布成功");
      // }
      // this.dpara = {
      //   inExhibitionAreaCode: data.inExhibitionAreaCode,
      //   outExhibitionAreaCode: data.outExhibitionAreaCode
      // };
      // 获取弹框页面数据
      // this.getlistExchangeIntent(this.dpara)
      //   .then(res => {
      //     this.tableDataedit = res;
      //   })
      //   .catch(e => {});
    // },
    // 编辑 ok
    handEdit(valId, val) {
      if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
        this.editForm.exchangeNumber = val.exchangeNumber;
        this.editForm["intentId"] = val.intentId;
        this.tableData[valId]["edit"] = true;
        this.lastIndexPage = valId;
      } else {
        this.$confirm("是否放弃本次修改")
          .then(() => {
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i]["edit"] = false;
            }
            this.editForm.exchangeNumber = val.exchangeNumber;
            this.editForm["intentId"] = val.intentId;
            this.tableData[valId]["edit"] = true;
            this.lastIndexPage = valId;
          })
          .catch(() => {
            this.$message.info("已取消本次操作");
          });
      }
    },
    // 编辑 =》 保存 ok
    handSeave(valId, val, datae) {
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.lastIndexPage = "";
      this.intId.intentId = val.intentId;
      // let editTableData = {
      //   exchangeNumber: val.exchangeNumber,
      //   intentId: val.intentId
      // };
      this.$refs[datae].validate((vald) => {
        if (vald) {
          // this.tableData[valId]["edit"] = false;
          this.updateordinaryExchangeIntent(this.editForm)
            .then(res => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.tableData[valId]["edit"] = false;
              // this.getListPage(this.obj); // 调用初始加载页面方法
            })
            .catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
          // 发布
          this.updateschedueRequest(this.intId)
            .then(res => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message({
                message: "发布成功！",
                type: "success"
              });
              this.getListPage(this.obj);
            })
            .catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
        }
      });
    },
    // 删除 ok
    handDele(val) {
      this.intId.intentId = val.intentId;
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteordinaryExchangeIntent(this.intId)
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
    // 表格勾选时的事件
    handleSelectionChange(val) {
      this.saveScheme = [];
      if (val.length === 0) {
        this.saveScheme = [];
      } else {
        for (let i = 0; i < val.length; i++) {
          this.saveScheme.push(val[i].intentId);
        }
      }
    },
    // 是否禁用复选框事件
    selecta(row, index) {
      if (row.otherDelegationConfirm === "3" || row.otherDelegationConfirm === "2") {
        return false;
      } else {
        return true;
      }
    },
    // 批量删除
    delBoth() {
      // let flag = true;
      if (this.saveScheme.length === 0) {
        this.$message("请勾选您要删除的数据");
      } else {
        this.deletebatchOrdinaryExchangeIntent(this.saveScheme)
          .then(res => {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.getListPage(this.obj);
          })
          .catch(e => {});
      }
    },
    // 发送请求
    sendRequest(val) {
      let sendada = {
        intentId: this.intId.intentId,
        matchId: val.intentId
      };
      this.addsendScheduleRequest(sendada)
        .then(res => {
          this.getListPage(this.obj);
          this.$message({
            message: "发送成功！",
            type: "success"
          });
          this.isShow = false;
          this.getlistExchangeIntent(this.dpara).then(resa => {
            this.tableDataedit = resa;
          })
          .catch(e => {});
        })
        .catch(e => {});
    },
    // 分条/页
    handleSizeChange(val) {
      this.obj.pageSize = val;
      this.getListPage(this.obj);
    },
    // 分页
    handleCurrentChange(val) {
      this.obj.pageIndex = val;
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
.closCenter {
  text-align: center;
  line-height: 50px;
  margin-bottom: 20px;
}
.pbottom {
  padding-bottom: 20px;
}
</style>


