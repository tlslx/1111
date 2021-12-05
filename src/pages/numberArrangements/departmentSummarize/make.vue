<template>
  <div>
    <el-tabs v-model="activeNameA" @tab-click="handleClickA" v-loading="loadinga" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225)">
      <el-tab-pane label="生成报表" name="two">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="地区汇总表" name="first">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="地区">
                <el-input v-model.trim="formInline.area" maxlength="10" size="small"></el-input>
              </el-form-item>
              <el-form-item label="交易团">
                <el-input v-model.trim="formInline.dealClusterName" maxlength="24" size="small"></el-input>
              </el-form-item>
              <el-form-item label="对比条件">
                <el-select v-model="formInline.region" @change="handleChange" size="small">
                  <el-option label="方案一和方案二" value="1"></el-option>
                  <el-option label="方案一和方案三" value="2"></el-option>
                  <el-option label="方案二和方案三" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" class="add">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="tableData" height="800" :span-method="arraySpanMetho" border style="width: 100%">
              <el-table-column prop="area" align="center" label="地区">
              </el-table-column>
              <el-table-column prop="dealClusterName" align="center" label="交易团">
              </el-table-column>
              <el-table-column v-if="getFor.lastExhibitionSession !== null" prop="lastCompanyNumber" align="center" :label="'第' + getFor.lastExhibitionSession + '届品牌企业数'">
              </el-table-column>
              <el-table-column v-if="getFor.lastExhibitionSession !== null" prop="lastBoothNumber" align="center" :label="'第' + getFor.lastExhibitionSession + '品牌展位数'">
              </el-table-column>
              <el-table-column prop="companyNumber" align="center" :label="'第' + getFor.currentExhibitionSession + '届品牌企业数'">
              </el-table-column>
              <el-table-column prop="boothNumber" align="center" :label="'第' + getFor.currentExhibitionSession + '品牌展位数'">
              </el-table-column>
              <el-table-column v-if="formInline.region === '1' || formInline.region === '2' " prop="planCompanyNumberOne"
                align="center" :label="getFor.currentYear + '年品牌评审安排牌企业数(方案1)'">
              </el-table-column>
              <el-table-column v-if="formInline.region === '1' || formInline.region === '2'" prop="planBoothNumberOne"
                align="center" :label="getFor.currentYear + '年品牌评审安排牌展位数(方案1)'">
              </el-table-column>
              <el-table-column v-if="formInline.region === '1' || formInline.region === '3'" prop="planCompanyNumberTwo"
                align="center" :label="getFor.currentYear + '年品牌评审安排牌企业数(方案2)'">
              </el-table-column>
              <el-table-column v-if="formInline.region === '1' || formInline.region === '3'" prop="planBoothNumberTwo"
                :label="getFor.currentYear + '年品牌评审安排牌展位数(方案2)'">
              </el-table-column>
              <el-table-column v-if="formInline.region === '2' || formInline.region === '3'" prop="planCompanyNumberThree"
                align="center" :label="getFor.currentYear + '年品牌评审安排牌企业数(方案3)'">
              </el-table-column>
              <el-table-column v-if="formInline.region === '2' || formInline.region === '3'" prop="planBoothNumberThree"
                :label="getFor.currentYear + '年品牌评审安排牌展位数(方案3)'">
              </el-table-column>
              <el-table-column align="center" prop="applyCompanyNumber" :label="getFor.currentYear + '年品牌评审申请企业数'">
              </el-table-column>
              <el-table-column prop="applyBoothNumber" align="center" :label="getFor.currentYear + '年品牌评审申请品牌展位数'">
              </el-table-column>
              <el-table-column prop="recommendCompanyNumber" align="center" :label="getFor.currentYear + '年品牌评审交易团推荐企业数'">
              </el-table-column>
              <el-table-column prop="recommendBoothNumber" align="center" :label="getFor.currentYear + '年品牌评审交易团推荐企业申请展位数'">
              </el-table-column>
              <el-table-column prop="standardCompanyNumber" align="center" :label="getFor.currentYear + '年品牌评审交易团推荐达标企业数'">
              </el-table-column>
              <el-table-column prop="standardBoothNumber" align="center" :label=" getFor.currentYear + '年品牌评审商协会评审达标企业申请展位数'">
              </el-table-column>
            </el-table>
            <el-button type="primary" @click="downloads" class="add">下载</el-button>
          </el-tab-pane>
          <el-tab-pane label="展区汇总表" name="second">
            <el-form :inline="true" :model="formIntine" class="demo-form-inline">
              <el-form-item label="商协会">
                <el-input v-model.trim="formIntine.coceralName" maxlength="24" size="small"></el-input>
              </el-form-item>
              <el-form-item label="展区">
                <el-input v-model.trim="formIntine.exhibitionAreaName" maxlength="24" size="small"></el-input>
              </el-form-item>
              <el-form-item label="对比条件">
                <el-select v-model="formIntine.region" @change="handleDhange" size="small">
                  <el-option v-for="item in listB" :label="item.label" :value="item.value" :key="item.value"></el-option>
                  <!-- <el-option label="方案一和方案二" value="1"></el-option>
              <el-option label="方案一和方案三" value="2"></el-option>
              <el-option label="方案二和方案三" value="3"></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmita" class="add">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="tableAata" height="800" :span-method="arraySpanMethod" border style="width: 100%">
              <el-table-column prop="exhibitionAreaName" align="center" label="展区">
              </el-table-column>
              <el-table-column prop="coceralName" align="center" label="商协会">
              </el-table-column>
              <el-table-column v-if="getEpar.lastExhibitionSession !==null" prop="lastCompanyNumber" align="center" :label="'第' + getEpar.lastExhibitionSession + '届品牌企业数'">
              </el-table-column>
              <el-table-column v-if="getEpar.lastExhibitionSession !==null" prop="lastBoothNumber" align="center" :label="'第' + getEpar.lastExhibitionSession + '品牌展位数'">
              </el-table-column>
              <el-table-column prop="companyNumber" align="center" :label="'第' + getEpar.currentExhibitionSession + '届品牌企业数'">
              </el-table-column>
              <el-table-column prop="boothNumber" align="center" :label="'第' + getEpar.currentExhibitionSession + '品牌展位数'">
              </el-table-column>
              <el-table-column v-if="formIntine.region === '1' || formIntine.region === '2'" prop="planCompanyNumberOne"
                align="center" :label="getEpar.currentYear + '年品牌评审安排牌企业数(方案1)'">
              </el-table-column>
              <el-table-column v-if="formIntine.region === '1' || formIntine.region === '2'" prop="planBoothNumberOne"
                align="center" :label="getEpar.currentYear + '年品牌评审安排牌展位数(方案1)'">
              </el-table-column>
              <el-table-column v-if="formIntine.region === '1' || formIntine.region === '3'" prop="planCompanyNumberTwo"
                align="center" :label="getEpar.currentYear + '年品牌评审安排牌企业数(方案2)'">
              </el-table-column>
              <el-table-column v-if="formIntine.region === '1' || formIntine.region === '3'" prop="planBoothNumberTwo"
                :label="getEpar.currentYear + '年品牌评审安排牌展位数(方案2)'">
              </el-table-column>
              <el-table-column v-if="formIntine.region === '2' || formIntine.region === '3'" prop="planCompanyNumberThree"
                align="center" :label="getEpar.currentYear + '年品牌评审安排牌企业数(方案3)'">
              </el-table-column>
              <el-table-column v-if="formIntine.region === '2' || formIntine.region === '3'" prop="planBoothNumberThree"
                :label="getEpar.currentYear + '年品牌评审安排牌展位数(方案3)'">
              </el-table-column>
              <el-table-column align="center" prop="applyCompanyNumber" :label="getEpar.currentYear + '年品牌评审申请企业数'">
              </el-table-column>
              <el-table-column prop="applyBoothNumber" align="center" :label="getEpar.currentYear + '年品牌评审申请品牌展位数'">
              </el-table-column>
              <el-table-column prop="recommendCompanyNumber" align="center" :label="getEpar.currentYear + '年品牌评审交易团推荐企业数'">
              </el-table-column>
              <el-table-column prop="recommendBoothNumber" align="center" :label="getEpar.currentYear + '年品牌评审交易团推荐企业申请展位数'">
              </el-table-column>
              <el-table-column prop="standardCompanyNumber" align="center" :label="getEpar.currentYear + '年品牌评审交易团推荐达标企业数'">
              </el-table-column>
              <el-table-column prop="standardBoothNumber" align="center" :label=" getEpar.currentYear + '年品牌评审商协会评审达标企业申请展位数'">
              </el-table-column>
            </el-table>
            <el-button type="primary" @click="download" class="add">下载</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {
        activeName: "first",
        activeNameA: "two",
        formInline: {
          dealClusterName: "",
          region: "1",
          area: ""
        },
        skb: [],
        skba: [],
        formIntine: {
          coceralName: "",
          region: "1",
          exhibitionAreaName: ""
        },
        obj: {},
        loadinga: true,
        listB: [
          { label: "方案一和方案二", value: "1" },
          { label: "方案一和方案三", value: "2" },
          { label: "方案二和方案三", value: "3" }
        ],
        lastReviewExhibitionSession: "",
        lastExhibitionSession: "",
        currentYear: "",
        tableData: [],
        tableAata: []
      };
    },
    created() {
      this.handleSuer({
        compareConditionOne: 1,
        compareConditionTwo: 2
      });
      this.handleDuer({
        compareConditionOne: 1,
        compareConditionTwo: 2
      });
    },
    computed: {
      ...mapGetters("foreignDepartment", ["getFor", "getEpar"])
    },
    methods: {
      ...mapActions("foreignDepartment", [
        "getForeignDepartment",
        "getForeignEpartment"
      ]),
      // 复选框改变 展区汇总表
      handleDhange(val) {
        if (this.formIntine.region === "1") {
          this.obj = {
            compareConditionOne: 1,
            compareConditionTwo: 2,
            coceralName: this.formIntine.coceralName,
            exhibitionAreaName: this.formIntine.exhibitionAreaName
          };
          this.getForeignEpartment(this.obj)
            .then(res => {
              this.skba = JSON.parse(JSON.stringify(res.boothArrangeSummary));
              this.tableAata = this.skba;
            })
            .catch(e => {
            });
        }
        if (this.formIntine.region === "2") {
          this.obj = {
            compareConditionOne: 1,
            compareConditionTwo: 3,
            coceralName: this.formIntine.coceralName,
            exhibitionAreaName: this.formIntine.exhibitionAreaName
          };
          this.getForeignEpartment(this.obj)
            .then(res => {
              this.skba = JSON.parse(JSON.stringify(res.boothArrangeSummary));
              this.tableAata = this.skba;
            })
            .catch(e => {
            });
        }
        if (this.formIntine.region === "3") {
          this.obj = {
            compareConditionOne: 2,
            compareConditionTwo: 3,
            coceralName: this.formIntine.coceralName,
            exhibitionAreaName: this.formIntine.exhibitionAreaName
          };
          this.getForeignEpartment(this.obj)
            .then(res => {
              this.skba = JSON.parse(JSON.stringify(res.boothArrangeSummary));
              this.tableAata = this.skba;
            })
            .catch(e => {
            });
        }
      },
      // 复选框改变 地区汇总表
      handleChange(val) {
        if (val === '1') {
          this.obj = {
            compareConditionOne: 1,
            compareConditionTwo: 2,
            dealClusterName: this.formInline.dealClusterName,
            area: this.formInline.area
          };
          this.getForeignDepartment(this.obj)
            .then(res => {
              this.skb = JSON.parse(JSON.stringify(res.boothArrangeSummary));
              this.tableData = this.skb;
            })
            .catch(e => {
            });
        }
        if (val === '2') {
          this.obj = {
            compareConditionOne: 1,
            compareConditionTwo: 3,
            dealClusterName: this.formInline.dealClusterName,
            area: this.formInline.area
          };
          this.getForeignDepartment(this.obj)
            .then(res => {
              this.skb = JSON.parse(JSON.stringify(res.boothArrangeSummary));
              this.tableData = this.skb;
            })
            .catch(e => {
              // this.loadinga = false;
            });
        }
        if (val === '3') {
          this.obj = {
            compareConditionOne: 2,
            compareConditionTwo: 3,
            dealClusterName: this.formInline.dealClusterName,
            area: this.formInline.area
          };
          this.getForeignDepartment(this.obj)
            .then(res => {
              this.skb = JSON.parse(JSON.stringify(res.boothArrangeSummary));
              this.tableData = this.skb;
            })
            .catch(e => {
              // this.loadinga = false;
            });
        }
        // console.log(val);
      },
      // 合并表格
      arraySpanMetho({ row, column, rowIndex, columnIndex }) {
        if (row.dealClusterName === "汇总") {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
          if (row.area != null) {
            if (row.area.indexOf("汇总") !== -1) {
              row.area = row.area;
            } else {
              row.area = row.area + row.dealClusterName;
            }
          } else {
            row.area = "汇总";
          }
        }
      },
      // 合并表格
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (row.coceralName === "汇总") {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
          if (row.exhibitionAreaName != null) {
            if (row.exhibitionAreaName.indexOf("汇总") !== -1) {
              row.exhibitionAreaName = row.exhibitionAreaName;
            } else {
              row.exhibitionAreaName = row.exhibitionAreaName + row.coceralName;
            }
          } else {
            row.exhibitionAreaName = "汇总";
          }
        }
      },
      // 接受后台数据地区
      handleSuer(val) {
        this.getForeignDepartment(val)
          .then(res => {
            this.skb = JSON.parse(JSON.stringify(res.boothArrangeSummary));
            this.tableData = this.skb;
            this.loadinga = false;
          })
          .catch(e => {
            this.loadinga = true;
          });
      },
      // 接受后台数据展区
      handleDuer(val) {
        this.getForeignEpartment(val)
          .then(res => {
            this.skba = JSON.parse(JSON.stringify(res.boothArrangeSummary));
            this.tableAata = this.skba;
            this.loadinga = false;
          })
          .catch(e => { });
      },
      handleClick() { },
      // 查询
      onSubmit() {
        if (this.formInline.region === "1") {
          this.obj = {
            compareConditionOne: 1,
            compareConditionTwo: 2,
            dealClusterName: this.formInline.dealClusterName,
            area: this.formInline.area
          };
          this.handleSuer(this.obj);
         
        }
        if (this.formInline.region === "2") {
          this.obj = {
            compareConditionOne: 1,
            compareConditionTwo: 3,
            dealClusterName: this.formInline.dealClusterName,
            area: this.formInline.area
          };
          this.handleSuer(this.obj);
          
        }
        if (this.formInline.region === "3") {
          this.obj = {
            compareConditionOne: 2,
            compareConditionTwo: 3,
            dealClusterName: this.formInline.dealClusterName,
            area: this.formInline.area
          };
          this.handleSuer(this.obj);
         
        }
      },
      // 查询
      onSubmita() {
        if (this.formIntine.region === "1") {
          this.obj = {
            compareConditionOne: 1,
            compareConditionTwo: 2,
            coceralName: this.formIntine.coceralName,
            exhibitionAreaName: this.formIntine.exhibitionAreaName
          };
          this.handleDuer(this.obj);
          // this.getForeignEpartment(this.obj)
          //   .then(res => {
          //     this.skba = JSON.parse(JSON.stringify(res.boothArrangeSummary));
          //     this.tableAata = this.skba;
          //   })
          //   .catch(e => {
          //     // this.loadinga = false;
          //   });
        }
        if (this.formIntine.region === "2") {
          this.obj = {
            compareConditionOne: 1,
            compareConditionTwo: 3,
            coceralName: this.formIntine.coceralName,
            exhibitionAreaName: this.formIntine.exhibitionAreaName
          };
          this.handleDuer(this.obj);
          // this.getForeignEpartment(this.obj)
          //   .then(res => {
          //     this.skba = JSON.parse(JSON.stringify(res.boothArrangeSummary));
          //     this.tableAata = this.skba;
          //   })
          //   .catch(e => {
          //     // this.loadinga = false;
          //   });
        }
        if (this.formIntine.region === "3") {
          this.obj = {
            compareConditionOne: 2,
            compareConditionTwo: 3,
            coceralName: this.formIntine.coceralName,
            exhibitionAreaName: this.formIntine.exhibitionAreaName
          };
          this.handleDuer(this.obj);
          // this.getForeignEpartment(this.obj)
          //   .then(res => {
          //     this.skba = JSON.parse(JSON.stringify(res.boothArrangeSummary));
          //     this.tableAata = this.skba;
          //   })
          //   .catch(e => {
          //   });
        }
      },
      downloads() { },
      download() { },
      handleClickA() { }
    }
  };
</script>
<style>
  .add {
    padding: 10px 20px;
  }
</style>