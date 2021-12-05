<template>
  <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="交易团登记企业母子关系审核结果" name="first">
      <!-- form表单 -->
      <el-form :inline="true" :model="formData" size="small">
        <el-form-item label="审核情况">
          <el-select v-model="formData.region" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
            <el-option label="未审核" value="0"></el-option>
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right; margin-right: 50px;">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- tabel表格 -->
      <el-table :data="tableData" style="width: 100%"   @selection-change="handleSelectionChange">
        <el-table-column align="center" min-width="120" type="selection" fixed="left" :selectable="checkboxT" width="55"></el-table-column>
        <el-table-column align="center" min-width="120" prop="cantonFairCode" label="广交会编码"></el-table-column>
        <el-table-column align="center" min-width="120" prop="companyName" label="申请企业名称"></el-table-column>
        <el-table-column align="center" min-width="120" prop="aptitudeType" label="资质类型">
          <template slot-scope="scope">{{scope.row.aptitudeType | aptituType}}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" prop="aptitudeSource" label="资质来源">
          <template slot-scope="scope">{{scope.row.aptitudeSource | aptitudeS}}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" prop="correlationCompanyName" label="资质对应企业名称"></el-table-column>
        <el-table-column align="center" min-width="120" prop="exhibitionArea" label="资质使用展区"></el-table-column>
        <el-table-column align="center" min-width="120" prop="checkResult" label="交易团审核情况">
          <template slot-scope="scope">{{scope.row.checkResult | checkresu}}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" prop="materialCode" label="材料编号"></el-table-column>
        <el-table-column align="center" min-width="160" fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-show="!(scope.row.checkResult !== '0')"
              @click="yPass(scope.row)"
            >通过</el-button>
            <el-button
              type="text"
              v-show="!(scope.row.checkResult !== '0')"
              @click="noPass(scope.row)"
            >不通过</el-button>
            <el-button type="text" @click="handelEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="handelDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-button class="flatLef" type="danger" @click="batchReview">批量审核</el-button>
      <el-button class="flatLef" type="danger" @click="handelAdd">新增</el-button>
      <el-button class="flatLef" type="primary">下载</el-button>
      <el-form :inline="true" style="float: right;">
        <el-form-item>
          <el-pagination
            style="margin-top: 5px;"
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
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
      <!-- 新增弹窗 -->
      <el-dialog :title="headTitle" width="500px" :visible.sync="isShow" @close="closeDialog">
        <el-card>
          <div>
            <el-form :model="formDat" label-width="150px">
              <el-form-item label="广交会编码：">
                <el-input v-model.trim="formDat.cantonFairCode" placeholder="请输入" maxlength="24"></el-input>
              </el-form-item>
              <el-form-item label="申请企业名称：">
                <el-input v-model.trim="formDat.companyName" placeholder="请输入" maxlength="24"></el-input>
              </el-form-item>
              <el-form-item label="资质类型：">
                <el-select v-model="formDat.aptitudeType">
                  <el-option label="出口额" value="1"></el-option>
                  <el-option label="境内商标" value="2"></el-option>
                  <el-option label="境外商标" value="3"></el-option>
                  <el-option label="品牌建设" value="4"></el-option>
                  <el-option label="研发创新和自主知识产权" value="5"></el-option>
                  <el-option label="国际通行认证" value="6"></el-option>
                  <el-option label="行业自律" value="7"></el-option>
                  <el-option label="广交会参展表现" value="8"></el-option>
                  <el-option label="国家或行业标准" value="9"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资质来源：">
                <el-select v-model="formDat.aptitudeSource">
                  <!-- <el-option label="本企业所有" value="1"></el-option> -->
                  <el-option label="绝对控股子公司所有" value="2"></el-option>
                  <el-option label="相对控股子公司所有" value="3"></el-option>
                  <el-option label="绝对控股母公司所有" value="4"></el-option>
                  <el-option label="绝对控股母公司的其他绝对控股子公司所有" value="5"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="资质对应企业名称：">
                <el-input
                  v-model.trim="formDat.correlationCompanyName"
                  placeholder="请输入"
                  maxlength="24"
                ></el-input>
              </el-form-item>
              <el-form-item label="资质使用展区：">
                <el-select v-model="formDat.exhibitionCode">
                  <el-option
                    v-for="(item, index) in options"
                    :key="index"
                    :label="item.exhibitionAreaName"
                    :value="item.exhibitionAreaCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="交易团审核情况：">
                <el-select v-model="formDat.checkResult">
                  <el-option label="通过" value="1"></el-option>
                  <el-option label="不通过" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="材料编号：">
                <el-input
                  type="textarea"
                  v-model.trim="formDat.materialCode"
                  placeholder="请输入"
                  maxlength="24"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="handelServe">确认</el-button>
                <el-button @click="backR">返回</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      fullLoading: true,
      options: [],
      headTitle: "",
      obj: {
        orderModelField: [
          {
            orderByField: "",
            asc: false
          }
        ],
        pageIndex: 1,
        pageSize: 10
      },
      // 审核
      review: [],
      activeName: "first",
      isShow: false,
      fileList: [],
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      formDat: {
        cantonFairCode: "",
        companyName: "",
        aptitudeType: "",
        correlationCompanyName: "",
        exhibitionCode: "",
        aptitudeSource: "",
        checkResult: "1",
        materialCode: ""
      },
      formData: {
        region: ""
      }
    };
  },
  filters: {
    checkresu(value) {
      let val = value - 0;
      if (val === 0) {
        return "未审核";
      } else if (val === 1) {
        return "通过";
      } else if (val === 2) {
        return "不通过";
      }
      // return val === 1 ? "通过" : "不通过";
    },
    aptitudeS(value) {
      let val = value - 0;
      switch (val) {
        case 1:
          return "本企业所有";
        case 2:
          return "绝对控股子公司所有";
        case 3:
          return "相对控股子公司所有";
        case 4:
          return "绝对控股母公司所有";
        case 5:
          return "绝对控股母公司的其他绝对控股子公司所有";
        default:
          break;
      }
    },
    aptituType(value) {
      let val = value - 0;
      switch (val) {
        case 1:
          return "出口额";
        case 2:
          return "境内商标";
        case 3:
          return "境外商标";
        case 4:
          return "品牌建设";
        case 5:
          return "研发创新和自主知识产权";
        case 6:
          return "国际通行认证";
        case 7:
          return "行业自律";
        case 8:
          return "广交会参展表现";
        case 9:
          return "国家或行业标准";
        default:
          break;
      }
    }
  },
  mounted() {
    // 展区
    this.getexhibitionArea({ exhibitionSession: this.getCes }).then(res => {
      this.options = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.getPage(this.obj);
  },
  methods: {
    ...mapActions("tradeGroupAudit", [
      "dealclusterCheckMotherChildRelationship", // 审核 单个
      "deletemotherChildRelationship", // 删除
      "getmotherChildRelationship", // 获取
      "addmotherChildRelationship", // 新增
      "updatemotherChildRelationship", // 编辑
      "updatebatchMotherChildRelationship" // 审核 批量
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea" // 展区
    ]),
    // 打钩事件
    handleSelectionChange(val) {
      this.review = [];
      for (let i = 0; i < val.length; i++) {
        let aFirst = {};
        aFirst["checkDescribe"] = val[i].checkDescribe;
        aFirst["checkResult"] = val[i].checkResult;
        aFirst["registerId"] = val[i].registerId;
        this.review.push(aFirst);
      }
    },
    // 批量审核
    batchReview() {
      if (this.review[0]) {
        this.$confirm("您正在批量审核这些事件。", "提示", {
          confirmButtonText: "通过",
          cancelButtonText: "不通过",
          type: "warning"
        })
          .then(() => {
            this.updatebatchMotherChildRelationship(this.review)
              .then(res => {
                this.$message({
                  type: "sucess",
                  message: "已全部通过"
                });
              })
              .catch(e => {});
          })
          .catch(() => {
            this.updatebatchMotherChildRelationship(this.review)
              .then(res => {
                this.$message({
                  type: "sucess",
                  message: "已全部不通过"
                });
              })
              .catch(e => {});
          });
      } else {
        this.$message("请勾选您要发送的内容！");
      }
    },
    // 禁用打钩选项
    checkboxT(row, index) {
      if (row.checkResult === "0") {
        return 1;
      } else {
        return 0;
      }
    },
    closeDialog() {
      for (let key in this.formDat) {
        this.formDat[key] = "";
      }
      this.getPage(this.obj);
    },
    handleCurrentChange(val) {
      this.obj["pageIndex"] = val;
      this.getPage(this.obj);
    },
    handleSizeChange(val) {
      this.obj["pageSize"] = val;
      this.getPage(this.obj);
    },
    // 通过
    yPass(ypass) {
      this.dealclusterCheckMotherChildRelationship({
        checkDescribe: "审核通过",
        checkResult: "1",
        registerId: ypass.registerId
      })
        .then(res => {})
        .catch(e => {});
    },
    // 不通过
    noPass(datai) {
      this.dealclusterCheckMotherChildRelationship({
        checkDescribe: "审核不通过",
        checkResult: "2",
        registerId: datai.registerId
      })
        .then(res => {})
        .catch(e => {});
    },
    handelDel(val) {
      this.$confirm("是否删除该选项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deletemotherChildRelationship({
            registerId: val.registerId
          })
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getPage(this.obj);
            })
            .catch(e => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      // this.deletemotherChildRelationship({
      //   registerId: val.registerId
      // })
      //   .then(res => {
      //     this.getPage(this.obj);
      //   })
      //   .catch(e => {});
    },
    getPage(getDataUrl) {
      // 获取页面数据
      let getUrl = encodeURI(JSON.stringify(getDataUrl));
      this.getmotherChildRelationship(getUrl)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.paginationData.total = res.total;
          this.tableData = res.records;
        })
        .catch(e => {});
    },
    handelEdit(val) {
      // 编辑
      for (let key in this.formDat) {
        this.formDat[key] = "";
      }
      this.headTitle = "编辑";
      this.isShow = true;
      this.formDat = val;
    },
    handelAdd() {
      this.headTitle = "新增";
      this.isShow = true;
    },
    // 确认
    handelServe() {
      if (this.formDat.registerId) {
        // 编辑
        if (this.formDat.cantonFairCode === "") {
          this.$message("广交会编码不能为空");
        } else if (!this.formDat.cantonFairCode.replace(/[^\w\.\/]/gi, "")) {
          this.$message("广交会编码只能输入字母和数字");
        } else if (this.formDat.companyName === "") {
          this.$message("申请企业名称不能为空");
        } else if (this.formDat.aptitudeType === "") {
          this.$message("资质类型不能为空");
        } else if (this.formDat.aptitudeSource === "") {
          this.$message("资质来源不能为空");
        } else if (this.formDat.correlationCompanyName === "") {
          this.$message("资质对应企业名称不能为空");
        } else if (this.formDat.exhibitionCode === "") {
          this.$message("资质使用展区不能为空");
        } else if (this.formDat.checkResult === "") {
          this.$message("交易团初核情况不能为空");
        } else if (this.formDat.materialCode === "") {
          this.$message("材料编号不能为空");
        } else {
          this.formDat["uploadRole"] = "1";
          this.updatemotherChildRelationship(this.formDat)
            .then(res => {
              this.isShow = false;
              for (let key in this.formDat) {
                this.formDat[key] = "";
              }
              this.getPage(this.obj);
            })
            .catch(e => {});
        }
      } else {
        // 新增
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].exhibitionAreaCode === this.formDat.exhibitionCode) {
            this.formDat["exhibitionArea"] = this.options[i].exhibitionAreaName;
          }
        }
        if (this.formDat.cantonFairCode === "") {
          this.$message("广交会编码不能为空");
        } else if (!this.formDat.cantonFairCode.replace(/[^\w\.\/]/gi, "")) {
          this.$message("广交会编码只能输入字母和数字");
        } else if (this.formDat.companyName === "") {
          this.$message("申请企业名称不能为空");
        } else if (this.formDat.aptitudeType === "") {
          this.$message("资质类型不能为空");
        } else if (this.formDat.aptitudeSource === "") {
          this.$message("资质来源不能为空");
        } else if (this.formDat.correlationCompanyName === "") {
          this.$message("资质对应企业名称不能为空");
        } else if (this.formDat.exhibitionCode === "") {
          this.$message("资质使用展区不能为空");
        } else if (this.formDat.checkResult === "") {
          this.$message("交易团审核情况不能为空");
        } else if (this.formDat.materialCode === "") {
          this.$message("材料编号不能为空");
        } else {
          this.formDat["uploadRole"] = "1";
          this.addmotherChildRelationship(this.formDat)
            .then(res => {
              this.getPage(this.obj);
              this.isShow = false;
            })
            .catch(e => {});
          // this.isShow = false;
        }
      }
    },
    backR() {
      this.isShow = false;
      for (let key in this.formDat) {
        this.formDat[key] = "";
      }
    },
    onSubmit() {
      if (this.formData.region === "") {
        this.obj = {
          orderModelField: [
            {
              orderByField: "",
              asc: false
            }
          ],
          pageIndex: 1,
          pageSize: 10
        };
      } else {
        this.obj = {
          orderModelField: [
            {
              orderByField: "",
              asc: false
            }
          ],
          customQueryParams: [
            {
              name: "checkResult",
              findType: "EQ",
              joinType: "And",
              dataType: "Default",
              values: [this.formData.region],
              description: ""
            }
          ],
          pageIndex: 1,
          pageSize: 10
        };
      }
      this.getPage(this.obj);
    }
  }
};
</script>
<style scoped>
/* .fcolor {
  color: #0f0;
}
.popup{
  position: absolute;
  left: 35%;
  top: 20%;
  width: 500px;
} */
.flatLef {
  float: left;
}
</style>



