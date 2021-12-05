<template>
  <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="外贸司审核展位基数" name="first">
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
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        align="center"
        style="width: 100%"
         
        border
        size="small"
        show-summary
        :summary-method="getSummaries"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" min-width="120" type="selection" :selectable="handleSelect" width="55"></el-table-column>
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
            <el-input v-if="scope.row.edit" v-model.trim.number="editTableData[0].baseNumber" maxlength="8"></el-input>
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
            <el-input v-if="scope.row.edit" v-model.trim.number="editTableData[1].baseNumber" maxlength="8"></el-input>
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
            <el-input v-if="scope.row.edit" v-model.trim.number="editTableData[2].baseNumber" maxlength="8"></el-input>
            <span v-else>{{scope.row.thirdBaseNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="160" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="!scope.row.edit"
              :disabled="scope.row.examineStatus === '1'"
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
        <el-button type="primary" size="small" class="formStyle" @click="handelPsaa">通过</el-button>
        <el-button type="primary" size="small" class="formStyle" @click="handNoPass">不通过</el-button>
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
      <!-- 不通过原因 -->
      <el-dialog title="审核" :visible.sync="isExhibit" :close-on-click-modal="false" v-if="isExhibit" width="500px">
        <el-form :model="addForm" :rules="rules" :inline="true" ref="ruleForm" size="small" label-width="140px">
          <el-form-item label="不通过原因" prop="examineOpinion">
            <el-input v-model.trim="addForm.examineOpinion" type="textarea" :rows="5" class="widtwo" maxlength="100"></el-input>
          </el-form-item>
          <div class="divp">
            <el-button type="primary" @click="handSeave('ruleForm')">保存</el-button>
            <el-button @click="handCancel">取消</el-button>
          </div>
        </el-form>
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
    return {
      obj: {
        current: "1",
        size: "10",
        delegationId: "",
        exhibitionSession: ""
      },
      isPass: {
        ordinaryBaseList: [
          {
            baseId: "07A2146CE6C44B4BAD13550B12D7681F"
          }
        ],
        examineStatus: "1"
      },
      fullLoading: true, // 控制加载
      // 页面输入框的绑定数据
      editTableData: [
        { delegationId: "", delegationCode: "", baseNumber: "", exhibitionSession: "", exhibitionPeriod: "1" },
        { delegationId: "", delegationCode: "", baseNumber: "", exhibitionSession: "", exhibitionPeriod: "2" },
        { delegationId: "", delegationCode: "", baseNumber: "", exhibitionSession: "", exhibitionPeriod: "3" }
      ], 
      // 下拉框数据届数
      formOptionOne: [],
      // 下拉框数据交易团
      formOptionThree: [],
      isShow: false, // 控制显示规则
      delet: { name: "交易团" },
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
      // 通过 不通过
      sub: {
        ordinaryBaseList: [],
        examineStatus: "1"
      }, // 打勾
      isExhibit: false,
      addForm: {
        examineOpinion: ""
      },
      rules: {
        examineOpinion: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      lastIndexPage: "", // 上一次页面编辑保存的数据
      // 表单
      formData: {
        exhibitionSession: "",
        delegationId: ""
      },
      // 表单编辑控制
      formEditControl: [
        { label: "届数", type: "input" },
        { label: "交易团", type: "input" },
        { label: "基数总数", type: "input" },
        { label: "第一期基数", type: "input" },
        { label: "第二期基数", type: "input" },
        { label: "第三期基数", type: "input" },
        { label: "审核状态", type: "input" },
        { label: "审核意见", type: "input" }
      ],
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
      // 分页
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
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
    }
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
    this.getListPage(this.obj);
    this.formOptionThree = this.dictionaryData.delegation;
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  methods: {
    ...mapActions("baseAccounting", [
      "updatebase", // 编辑工作部根据规则计算一般性展位基数
      "getordinaryBase", // 查询提交到外贸司的一般性展位核算基数（参数多个审核状态）
      "updatecheckNumber" // 外贸司审核一般性展位基数
    ]),
    ...mapActions("nainformation", [
      "getsysExhibitions" // 获取所有展届信息
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getordinaryBase(Url)
        .then(res => {
          this.fullLoading = false;
          let getPage = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          for (let i = 0; i < getPage.length; i++) {
            getPage[i]["edit"] = false;
            // let option = {
            //   label: getPage[i].exhibitionSession + "届",
            //   value: getPage[i].exhibitionSession
            // };
            // this.formOptionOne.push(option);
          }
          // 数组去重
          // let hash = {};
          // this.formOptionOne = this.formOptionOne.reduce(function(item, next) {
          //   hash[next.value] ? '' : hash[next.value] = true && item.push(next);
          //   return item;
          // }, []);
          this.tableData = getPage;
        })
        .catch(e => {});
    },
    // 是否已审核
    handleSelect(row) {
      if (row.examineStatus === '1') {
        return false;
      } else {
        return true;
      }
    },
    // 通过
    handelPsaa(num) {
      if (this.sub.ordinaryBaseList.length > 0) {
        this.sub.examineStatus = "1";
        for (let i = 0; i < this.sub.ordinaryBaseList.length; i++) {
          this.sub.ordinaryBaseList[i].examineStatus = "1";
        }
        this.$confirm('是否确认通过？', '审核', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updatecheckNumber(this.sub).then(res => {
            this.$message({
              type: 'success',
              message: '确认通过成功!'
            });
            this.isExhibit = false;
            this.getListPage(this.obj);
            this.sub = {
              ordinaryBaseList: [],
              examineStatus: ""
            };
          }).catch(e => {});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消通过'
          });          
        });
      } else {
        this.$message({
          type: 'error',
          message: '请先勾选您要通过的数据!'
        });
      }
    },
    // 不通过 按钮
    handNoPass() {
      if (this.sub.ordinaryBaseList.length > 0) {
        this.isExhibit = true;
      } else {
        this.$message({
          type: 'error',
          message: '请先勾选您要通过的数据!'
        });
      }
    },
    // 不通过 保存
    handSeave(datae) {
      this.$refs[datae].validate((vald) => {
        if (vald) {
          this.sub.examineStatus = "2";
          for (let i = 0; i < this.sub.ordinaryBaseList.length; i++) {
            this.sub.ordinaryBaseList[i].examineStatus = "2";
            this.sub.ordinaryBaseList[i]["examineOpinion"] = this.addForm.examineOpinion;
          }
          this.updatecheckNumber(this.sub).then(res => {
            this.$message({
              type: 'success',
              message: '确认不通过成功!'
            });
            this.addForm.examineOpinion = "";
            this.isExhibit = false;
            this.getListPage(this.obj);
            this.sub = {
              ordinaryBaseList: [],
              examineStatus: ""
            };
          }).catch(e => {});
        } else {
          return false;
        }
      });
    },
    // 不通过 取消
    handCancel() {
      this.isExhibit = false;
      this.addForm.examineOpinion = "";
    },
    // 获取组件数据
    dataDelegation(id, name) {
      this.formData.delegationId = id;
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
    },
    // 打钩事件
    handleSelectionChange(val) {
      this.sub = {
        ordinaryBaseList: [],
        examineStatus: "1"
      };
      for (let i = 0; i < val.length; i++) {
        let dataSub = {
          delegationId: "",
          exhibitionSession: "",
          examineStatus: ""
        };
        dataSub.delegationId = val[i].delegationId;
        dataSub.exhibitionSession = val[i].exhibitionSession;
        // dataSub.examineStatus = val[i].examineStatus;
        this.sub.ordinaryBaseList.push(dataSub);
        // for (let j = 0; j < 3; j++) {
        //   let dataSub = {
        //     baseId: ""
        //   };
        //   dataSub.baseId = val[i].ordinaryBaseList[j].baseId;
        //   this.sub.ordinaryBaseList.push(dataSub);
        // }
      }
    },
    // 页面查询
    onSearch() {
      this.obj.exhibitionSession = this.formData.exhibitionSession;
      this.obj.delegationId = this.formData.delegationId;
      this.getListPage(this.obj);
    },
    // 编辑事件
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
      let flagList = [];
      for (let i = 0, l = this.editTableData.length; i < l; i++) {
        if (this.editTableData[i].baseNumber === '' || this.editTableData[i].baseNumber < 0) {
          flagList[i] = 'false';
        } else {
          flagList[i] = 'true';
        }
      }
      if (!flagList.includes('false')) {
        let fullScreenloading = this.$loading({ fullscreen: true });
        this.lastIndexPage = "";
        this.tableData[valId]["edit"] = false;
        this.updatebase(this.editTableData)
          .then(res => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
            this.$message.success('保存成功');
            this.getListPage(this.obj); // 调用初始加载页面方法
          })
          .catch(e => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
          });
      } else {
        this.$message.warning('请正确填写');
      }
    },
    // 页面合计
    getSummaries(param) {
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
    }
  }
};
</script>
<style scoped>
.paginationTop {
  margin-top: 10px;
}
.closCenter {
  text-align: center;
  line-height: 100px;
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
  margin-left: 10px;
  display: inline-block;
}
.flotle {
  float: left;
}
.divp {
  text-align: center;
  padding: 20px 0;
}
.widtwo {
  width: 300px;
}
</style>


