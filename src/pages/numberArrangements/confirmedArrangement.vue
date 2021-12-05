<template>
  <!-- <div> -->
  <!-- 首页 -->
  <el-tabs v-model="activeName" @tab-click="handleClick" :inline="true" v-loading="loadinga" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225)">
    <el-tab-pane label="查看安排方案" name="first">
      <!-- form表单 -->
      <el-form :model="formData" size="small" :inline="true">
        <el-form-item label="商协会">
          <el-input v-model.trim="formInline.coceralName" maxlength="24" style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item label="展区">
          <el-input style="width: 150px" maxlength="24" v-model.trim="formInline.exhibitionAreaName"></el-input>
        </el-form-item>
        <el-form-item label-width="130px" label="是否有境外商标">
          <el-select style="width: 120px" v-model="formInline.outside">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" value="yes"></el-option>
            <el-option label="否" value="no"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="130px" label="方案确认状态">
          <el-select style="width: 150px" v-model="formInline.foreignTradeAffirm">
            <el-option label="请选择" value=""></el-option>
            <el-option label="未确认" value="0"></el-option>
            <el-option label="已确认" value="1"></el-option>
            <el-option label="已公示" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="handAdd" style="padding: 10px 25px">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" ref="multipleTable"  @select="handleSelectionChange" @select-all="handleSelectionChange"
        @selection-change="handleCheckedChange" style="width: 100%" max-height="800" :row-key="getRowKey" border>
        <el-table-column :selectable="checkBox" type="selection" fixed width="55">
        </el-table-column>
        <el-table-column align="center" label="方案确认状态" prop="foreignTradeAffirm">
          <template slot-scope="scope">
            {{ scope.row.foreignTradeAffirm === 0 ? '未确认' : (scope.row.foreignTradeAffirm === 1 ? '已确认' : '已公示')}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="企业基本信息">
          <el-table-column align="center" label="地区" prop="region" width="100"></el-table-column>
          <el-table-column align="center" label="商协会" prop="coceralName" width="100"></el-table-column>
          <el-table-column align="center" label="交易团" prop="dealClusterName" width="100"></el-table-column>
          <el-table-column align="center" label="申请企业名称" prop="companyName" width="100"></el-table-column>
          <el-table-column align="center" label="广交会编码" prop="cantonFairCode" width="100"></el-table-column>
          <el-table-column align="center" label="海关编码" prop="customCode" width="100"></el-table-column>
          <el-table-column align="center" label="企业属性" prop="companyAttribute" width="100"></el-table-column>
          <el-table-column align="center" label="企业类型" prop="companyType" width="100"></el-table-column>
          <el-table-column align="center" label="申请展区" prop="exhibitionAreaName" width="100"></el-table-column>
          <el-table-column align="center" label="上届届品牌展位数" prop="lastBoothNumber" width="100"></el-table-column>
          <el-table-column align="center" label="申请展位数" prop="applyBoothNumber" width="100"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="品牌展位预安排数" prop="provisionNumber" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="formData" :rules="rules" ref="formData">
                <el-form-item prop="listA">
                  <el-input maxlength="8" v-model="formData.listA" @change="edits"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{scope.row.provisionNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否有境外商标" prop="outsideBrand">
          <template slot-scope="scope">
            {{ scope.row.outsideBrand === '1' ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column sortable sort-by="coceralTotalGrade" align="center" label="评审总分" prop="coceralTotalGrade">
        </el-table-column>
        <el-table-column align="center" label="是否达标" prop="isStandard">
          <template slot-scope="scope">
            {{ scope.row.isStandard === 1 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column sortable sort-by="exportRatioTotal" align="center" label="出口金额" prop="exportRatioTotal" width="150">
        </el-table-column>
        <el-table-column align="center" label="评审项目得分">
          <el-table-column sort-by="coceralExportScore" sortable align="center" label="出口额" prop="coceralExportScore" width="150">
          </el-table-column>
          <el-table-column align="center" label="行业自律" prop="selfDisciplineScore" width="150"></el-table-column>
          <el-table-column align="center" label="品牌建设" prop="brandBuildScore"></el-table-column>
          <el-table-column align="center" label="专利与版权" prop="patentsScore" width="120"></el-table-column>
          <el-table-column align="center" label="高新技术企业或高新技术产品" prop="newHighScore" width="120"></el-table-column>
          <el-table-column align="center" label="国家标准或行业标准" prop="standardScore" width="120"></el-table-column>
          <el-table-column align="center" label="质量、环境管理体系认证" prop="qualityScore" width="150"></el-table-column>
          <el-table-column align="center" label="面向企业的行业认证" prop="industryScore" width="150"></el-table-column>
          <el-table-column align="center" label="面向产品或生产线的行业认证数" prop="productionScore" width="150"></el-table-column>
          <el-table-column align="center" label="境内商标" prop="territoryScore" width="120"></el-table-column>
          <el-table-column align="center" label="境外商标" prop="beyondScore" width="120"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="授权子公司名称" prop="correlationCompanyName" width="100"></el-table-column>
        <!-- <el-table-column align="center" label="备注" prop="remarks" width="120"></el-table-column> -->
        <el-table-column align="center" label="操作" prop="remarks" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handeldeposit(scope.$index, scope.row.provisionNumber)">编辑
            </el-button>
            <el-button size="mini" type="text" :disabled='!scope.row.edit' @click="handelAdit(scope.row,'formData')">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->

      <el-button @click="program" type="danger" style="padding: 10px 20px; margin-top: 20px">方案确认</el-button>
      <el-form :inline="true" style="float: right;">
        <el-form-item>
          <el-pagination style="margin-top: 20px;" background layout="total, prev, pager, next, jumper" :total="paginationData.total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationData.currentPage"
            :page-size="paginationData.pageSize">
          </el-pagination>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import { mapActions } from "vuex";
  export default {
    data() {
      let checkAge = (rule, value, callback) => {
        let regRule = /[^\d\$]/g;
        if (!value) {
          return callback(new Error("输入不能为空"));
        } else if (regRule.test(value)) {
          return callback(new Error("请输入正整数"));
        }
        callback();
      };
      return {
        objData: {},
        paginationData: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        loadinga: true,
        lastCheckData: [], // 上次保存的值
        selectData: [], // 选中的数据索引
        checkList: [], // 临时选中的值
        formInline: {
          coceralName: "",
          areexhibitionAreaNamea: "",
          outside: "",
          foreignTradeAffirm: ""
        },
        lastIndex: "",
        formData: {
          ragion: "",
          listA: ""
        },
        pageDate: {
          pageIndex: 1,
          pageSize: 10
        },
        getList: [],
        isDhow: false,
        disabled: true,
        tableData: [],
        activeName: "first",
        brandApplyId: [],
        rules: {
          listA: [{ validator: checkAge, trigger: "blur" }]
        }
      };
    },
    created() {
      this.handleSuer(this.pageDate);
    },
    computed: {
      getRowKey(row) {
        // 获取row的key值
        return row.applyBoothNumber; // 这里举例获取姓名
      }
    },
    methods: {
      ...mapActions("foreignDepartment", [
        "getArrangement", // 查询
        "postDepartmentProgram", // 外贸司确定
        "postScheduleSaved" // 保存
      ]),
      // 改变保存
      edits() {
        if (this.formData.listA) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      },
      // 接受数据
      handleSuer(val) {
        let aac = encodeURI(JSON.stringify(val));
        this.getArrangement(aac)
          .then(res => {
            this.loadinga = false;
            this.paginationData.currentPage = res.current;
            this.paginationData.pageSize = res.size;
            this.paginationData.total = res.total;
            let skb = JSON.parse(JSON.stringify(res.records));
            for (let i = 0, len = skb.length; i < len; i++) {
              skb[i]["edit"] = false;
            }
            this.tableData = skb;
            let arr = [];
            if (this.selectData[this.paginationData.currentPage - 1]) {
              this.selectData[
                this.paginationData.currentPage - 1
              ].forEach((item, index) => {
                arr.push(this.tableData[item]);
              });
            }
            setTimeout(() => {
              this.toggleSelection(arr);
            }, 0);
          })
          .catch(e => {
            this.loadinga = true;
          });
      },
      // 选中的数据获取
      handleCheckedChange(rows) {
        this.brandApplyId = [];
        this.checkList = []; // 初始化，防止重复添加
        if (rows) {
          rows.forEach(row => {
            // 遍历已选择的数据
            if (row) {
              this.checkList.push(row.applyBoothNumber);
              this.brandApplyId.push(row.brandApplyId);
            }
          });
        }
      },
      // 复选框禁用
      checkBox(row, index) {
        if (row.foreignTradeAffirm === 0) {
          return 1;
        } else {
          return 0;
        }
      },
      // 方案确认
      program() {
        this.lastCheckData[this.paginationData.currentPage - 1] = this.checkList; // 保存当前页获取的值
        //降维 --- 二维数组降至一维数组
        this.getList = Array.prototype.concat.apply([], this.lastCheckData);
        if (this.getList.length === 0) {
          this.$message("方案确认不能为空");
        } else {
          let arr = [
            {
              brandApplyId: this.brandApplyId.join(","),
              planAffirmStatus: this.getList.join(",")
            }
          ];
          this.postDepartmentProgram(arr)
            .then(res => {
              this.handleSuer(this.pageDate);
              this.selectData = [];
            })
            .catch(e => { });
        }

      },
      // 选中的数据索引获取
      handleSelectionChange(selection, row) {
        
        this.selectData[this.paginationData.currentPage - 1] = []; // 初始化
        this.tableData.forEach((item, index) => {
          for (let i = 0; i < selection.length; i++) {
            // 遍历已选的数据重新填充数组
            if (item.brandApplyId === selection[i].brandApplyId) {
              // 补充：注意这里的判断必须要保证判断的值是唯一的（不一定要拿获取的值进行比较，比如ID值），不然遍历的时候会都添加进去
              this.selectData[this.paginationData.currentPage - 1].push(index);
            }
          }
        });
      },
      toggleSelection(rows) {
        // 判断是否选中
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },

      // 分页
      handleCurrentChange(current) {
        this.lastIndex = "";
        this.formData.listA = "";
        this.lastCheckData[this.paginationData.currentPage - 1] = this.checkList; // 保存当前页获取的值
        let objOne = {
          customQueryParams: [],
          pageIndex: current,
          pageSize: 10
        };
        let key = Object.keys(this.formInline);
        for (let i = 0; i < key.length; i++) {
          if (this.formInline[key[i]] !== "") {
            let listb = {
              name: key[i],
              findType: "LIKE",
              joinType: "And",
              dataType: "Default",
              values: [this.formInline[key[i]]],
              description: ""
            };
            objOne.customQueryParams.push(listb);
          }
        }
        this.handleSuer(objOne);
        // if (!this.objData.pageIndex) {
        //   this.handleSuer(this.pageDate);
        // } else {
        //   this.objData.pageIndex = current;
        //   this.handleSuer(this.objData);
        // }
      },
      handleSizeChange() { },
      handleClick() { },
      // 编辑
      handeldeposit(id, data) {
        this.isDhow = true;
        if (this.lastIndex === "" || this.lastIndex === id) {
          this.tableData[id]["edit"] = true;
          this.formData.listA = data;
          this.lastIndex = id;
        } else {
          this.$confirm("是否放弃本次修改")
            .then(() => {
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i]["edit"] = false;
              }
              this.tableData[id]["edit"] = true;
              this.lastIndex = id;
              this.formData.listA = "";
              this.formData.listA = data;
            })
            .catch(() => {
              this.$message.info("已取消本次操作");
            });
        }
      },
      // 保存
      handelAdit(val, apo) {
        this.$refs[apo].validate(valid => {
          if (valid) {
            this.isDhow = false;
            this.brandApplyId = val.brandApplyId;
            let obj = {
              brandApplyId: this.brandApplyId,
              roleId: 5,
              provisionNumber: this.formData.listA
            };
            this.postScheduleSaved(obj)
              .then(res => {
                this.lastIndex = "";
                this.formData.listA = "";
                // this.$router.go(0);
                this.handAdd();
              })
              .catch(e => { });
          } else {
            this.$message("请输入正整数");
            return false;
          }
        });
      },
      // 查询
      handAdd() {
        this.lastIndex = "";
        this.selectData = [];
        let objOne = {
          customQueryParams: [],
          pageIndex: 1,
          pageSize: 10
        };
        let key = Object.keys(this.formInline);
        for (let i = 0; i < key.length; i++) {
          if (this.formInline[key[i]] !== "") {
            let listb = {
              name: key[i],
              findType: "LIKE",
              joinType: "And",
              dataType: "Default",
              values: [this.formInline[key[i]]],
              description: ""
            };
            objOne.customQueryParams.push(listb);
          }
        }
        this.handleSuer(objOne);
      }
    }
  };
</script>
<style scoped>
  .el-form-item>>>.el-form-item__content {
    margin-left: 0 !important;
  }

  .el-table>>>.cell {
    overflow: visible !important;
  }
</style>