<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="录入并公布方案" name="first" v-loading.fullscreen="fullLoading">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" size="small">
          <el-form-item label="展区">
            <el-select v-model="formData.exhibitionArea" clearable>
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.exhibitionAreaName"
                :value="item.exhibitionAreaCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易团">
            <el-select v-model="formData.delegationId" clearable>
              <el-option
                v-for="(item, index) in localstora.delegation"
                :key="index"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展期">
            <el-select v-model="formData.exhibitionPeriod" clearable>
              <el-option v-for="(item, index) in exhibitionPeriod" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商会">
            <el-select v-model="formData.coceralId" clearable>
              <el-option
                v-for="(item, index) in localstora.businessAssociation"
                :key="index"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类别">
            <el-select v-model="formData.boothType" clearable>
              <el-option label="一般性展位" value="1"></el-option>
              <el-option label="中央通道展位" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
            <el-button class="formStyle" type="primary">导入</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          ref="multipleTable"
          style="width: 100%"
           
          border
          size="small"
          @selection-change="handleSelectionChange"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column align="center" type="selection" fixed="left" :selectable="selecta" width="55"></el-table-column>
          <el-table-column align="center" min-width="120" label="类别" prop="boothType">
            <template slot-scope="scope">{{scope.row.boothType === "1" ? "一般性展位" : "中央通道展位"}}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展期" prop="exhibitionPeriod">
            <template slot-scope="scope">{{scope.row.exhibitionPeriod | nper}}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="商会" prop="coceralName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" :label="`${getCes - 1}届最终展位数/${getCes}届初始展位数`" prop="initialNumber"></el-table-column>
          <el-table-column align="center" min-width="120" label="等量调换" prop="isImport">
            <template slot-scope="scope">{{scope.row.isImport !== "" ? "0" : "0" }}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="不等量调换" prop="isImport">
            <template slot-scope="scope">{{scope.row.isImport !== "" ? "0" : "0" }}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="还原调整" prop="isImport">
            <template slot-scope="scope">{{scope.row.isImport !== "" ? "0" : "0" }}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="退展位" prop="isImport">
            <template slot-scope="scope">{{scope.row.isImport !== "" ? "0" : "0" }}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="新增展位" prop="boothNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="editform" ref="refedit" label-width="0px" :rules="editRule">
                  <el-form-item prop="boothNumber">
                    <el-input v-model.trim.number="editform.boothNumber" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.boothNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="回收展位" prop="isImport">
            <template slot-scope="scope">{{scope.row.isImport !== "" ? "0" : "0" }}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="展位类型调整" prop="isImport">
            <template slot-scope="scope">{{scope.row.isImport !== "" ? "0" : "0" }}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="其他调整" prop="isImport">
            <template slot-scope="scope">{{scope.row.isImport !== "" ? "0" : "0" }}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" :label="`${getCes}届最终展位数`" prop="finalNumber"></el-table-column>
          <el-table-column align="center" min-width="160" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="!scope.row.edit"
                @click="onEdit(scope.row, scope.$index)"
              >编辑</el-button>
              <el-button type="text" v-else @click="onServe(scope.row, scope.$index, 'refedit')">保存</el-button>
              <el-button type="text" @click="onDele(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-checkbox v-model="checkede" size="small" @change="checkede => allCheck(checkede, tableData)">全选</el-checkbox>
          <el-button type="danger" size="small" class="formStyle" @click="handPub">公布</el-button>
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
        <!-- 公布弹框 -->
        <el-dialog title="公布" :visible.sync="dialogVisible" v-if="dialogVisible" :close-on-click-modal="false" width="500px">
          <el-form :model="addForm" :rules="rules" ref="ruleForm" label-width="110px" size="small">
            <el-form-item label="发布至" :rules="[{ required: true, message: '必填', trigger: 'blur' }]" class="addstyle">
              <el-checkbox checked="true">内部管理系统</el-checkbox>
            </el-form-item>
            <el-form-item label="附件" :rules="[{ required: true, message: '必填', trigger: 'blur' }]" class="addstyle">
              <el-button type="primary">上传</el-button>
            </el-form-item>
            <el-form-item label="是否计入基数" prop="isImport" class="addstyle">
              <el-select v-model="addForm.isImport">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <div class="fpub">
              <el-button type="primary" class="formStyle" @click="onPublish('ruleForm')">确认</el-button>
              <el-button class="formStyle" @click="dialogVisible = false">取消</el-button>
            </div>
          </el-form>
        </el-dialog>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import editFormTable from "@/components/project/common/editFormTable";
export default {
  components: {
    editFormTable
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
      obj: {
        current: 1,
        size: 10
      },
      formData: {
        exhibitionArea: "",
        delegationId: "",
        exhibitionPeriod: "",
        coceralId: "",
        boothType: ""
      },
      dialogVisible: false,
      addForm: { isImport: "" },
      optionS: [{ label: "", value: "5" }],
      fullLoading: false,
      checkede: false, // 全选
      localstora: {
        exhibitionArea: [], // 展区
        delegation: [], // 交易团
        businessAssociation: [] // 商协会
      },
      editform: { boothNumber: "" },
      lastIndexPage: "",
      subm: [],
      exhibitionPeriod: [], // 展期 字典
      opboothType: [], // 类别
      // 编辑表单规则
      editRule: {
        boothNumber: [{ validator: tynum, required: true, trigger: "change" }]
      },
      rules: {
        isImport: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      // 表格数据
      tableData: [],
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      multipleSelection: {
        ordinarySpecialRangeTotalList: [],
        publishLog: {
          attachment: "1.txt",
          publishWay: "2"
        }
      },
      activeName: "first"
    };
  },
  filters: {
    nper(data) {
      if (data === "1") {
        return "第一期";
      } else if (data === "2") {
        return "第二期";
      } else if (data === "3") {
        return "第三期";
      }
    }
  },
  async created () {
    this.exhibitionPeriod = await kindo.dictionary.get("exhibitionPeriodNum");
    this.opboothType = await kindo.dictionary.get("exhibitionPositionType");
  },
  mounted() {
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    this.getListPage(this.obj);
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      this.localstora.businessAssociation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 当前展届
    this.getcurrentExhibitionSession();
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"]),
    ...mapGetters("nainformation", ["getCes"])
  },
  methods: {
    ...mapActions("specificAreaboothTradegroup", [
      "getunPublishOrdinarySpecialRangeTotal", // 7.1获取工作部待公布方案列表
      "addordinaryPostUnPublish", // 7.2工作部公布各交易团各展区展位数量安排方案
      "editordinarySpecialRangeTotal", // 7.3工作部修改各交易团各展区展位数量安排方案
      "deleordinarySpecialRangeTotal" // 7.4工作部删除各交易团各展区展位数量安排方案
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment", // 交易团
      "getassociationDepartment", // 商协会
      "getcurrentExhibitionSession" // 展届
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getunPublishOrdinarySpecialRangeTotal(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          let getTable = JSON.parse(JSON.stringify(res.records));
          for (let i = 0; i < getTable.length; i++) {
            getTable[i]["edit"] = false;
          }
          this.tableData = getTable;
        })
        .catch(e => {});
    },
    // 查询
    onSearch() {
      this.obj = {
        current: 1,
        size: 10
      };
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
    // 编辑
    onEdit(val, valId) {
      if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
        this.editform.boothNumber = val.boothNumber;
        this.editform["totalId"] = val.totalId;
        // this.tabDat.inNumber = val.inNumber;
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
          })
          .catch(() => {
            this.$message.info("已取消本次操作");
          });
      }
    },
    // 编辑 =》 保存
    onServe(val, valId, datae) {
      this.lastIndexPage = "";
      // this.
      this.$refs[datae].validate(vald => {
        if (vald) {
          this.editordinarySpecialRangeTotal(this.editform)
            .then(res => {
              this.tableData[valId]["edit"] = false;
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.getListPage(this.obj); // 调用初始加载页面方法
            })
            .catch(e => {});
        }
      });
    },
    // 删除
    onDele(val) {
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleordinarySpecialRangeTotal(val)
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
    // 页面合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
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
          sums[index] = "--";
        }
        if (index === 7 || index === 8 || index === 9 || index === 10 || index === 12 || index === 13 || index === 14) {
          sums[index] = "0";
        }
        if (index === 1 || index === 3 || index === 4) {
          sums[index] = "--";
        }
      });
      return sums;
    },
    handleSelectionChange(val) {
      this.multipleSelection = {
        ordinarySpecialRangeTotalList: [],
        publishLog: {
          attachment: "1.txt",
          publishWay: "2"
        }
      };
      for (let i in val) {
        let dat = {
          exhibitionAreaName: val[i].exhibitionAreaName,
          coceralName: val[i].coceralName,
          boothNumber: val[i].boothNumber,
          isImport: "1",
          initialNumber: val[i].initialNumber,
          quantityId: val[i].quantityId,
          finalNumber: val[i].finalNumber,
          boothType: val[i].boothType,
          exhibitionPeriod: val[i].exhibitionPeriod,
          totalId: val[i].totalId,
          exhibitionSession: val[i].exhibitionSession,
          exhibitionArea: val[i].exhibitionArea,
          delegationCode: val[i].delegationCode,
          delegationId: val[i].delegationId,
          delegationName: val[i].delegationName
        };
        this.multipleSelection.ordinarySpecialRangeTotalList.push(dat);
      }
      // this.multipleSelection = val;
    },
    // 全选
    allCheck(check, rows) {
      // if (check) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
      // }
    },
    // 公布按钮
    handPub() {
      if (this.multipleSelection.ordinarySpecialRangeTotalList.length === 0) {
        this.$message("请勾选您要公布的数据");
      } else {
        this.dialogVisible = true;
      }
    },
    selecta(row, index) {
      //
      if (row.ifPublish === "0") {
        return true;
      } else {
        return false;
      }
    },
    // 公布
    onPublish(fname) {
      this.$refs[fname].validate((valid) => {
        if (valid) {
          for (let i = 0; i < this.multipleSelection.ordinarySpecialRangeTotalList.length; i++) {
            this.multipleSelection.ordinarySpecialRangeTotalList[i]["isImport"] = this.addForm.isImport;
          }
          this.$confirm("确认公布？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.addordinaryPostUnPublish(this.multipleSelection)
                .then(res => {
                  this.dialogVisible = false;
                  this.$message({
                    message: "公布成功！",
                    type: "success"
                  });
                  this.getListPage(this.obj);
                })
                .catch(e => {});
              // }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消公布"
              });
            });
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
.fpub {
  text-align: center;
  padding-bottom: 20px;
}
</style>
