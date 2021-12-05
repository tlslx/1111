<template>
  <!-- <div> -->
    <!-- 首页 -->
  <el-tabs v-model="activeName" @tab-click="handleClick" :inline="true" v-loading="loadinga"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(225, 225, 225)">
    <el-tab-pane label="商协会提交品牌展位数量安排方案" name="first">
      <!-- form表单 -->
      <el-form :model="formData" size="small" :inline="true" >
        <el-form-item label="商协会">
           <!-- <el-input maxlength="10" v-model.trim="formData.coceralName"></el-input> -->
           <el-select v-model="formData.coceralId" size="small" clearable>
            <el-option
              v-for="(item, index) in localstora.businessAssociation"
              :key="index"
              :label="item.deptName"
              :value="item.deptCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <!-- <el-input maxlength="10" v-model.trim="formData.dealClusterName"></el-input> -->
          <el-select v-model="formData.dealClusterId" size="small" clearable>
            <el-option
              v-for="(item, index) in localstora.delegation"
              :key="index"
              :label="item.deptName"
              :value="item.deptCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请展区">
          <!-- <el-input maxlength="10" v-model.trim="formData.exhibitionAreaName"></el-input> -->
          <el-select v-model="formData.exhibitionArea" size="small" clearable>
            <el-option
              v-for="(item, index) in localstora.exhibitionArea"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="onSubmit" :disabled='isDhow' style="padding: 10px 25px">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableList" style="width: 100%" border>
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
          <el-table-column align="center" label="123届品牌展位数" prop="lastBoothNumber" width="100"></el-table-column>
          <el-table-column align="center" label="申请展位数" prop="applyBoothNumber" width="100"></el-table-column>
        </el-table-column>       
        <el-table-column align="center" label="品牌展位预安排数"  prop="provisionNumber" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.edit" >
              <el-form :model="formAata" :rules="rules" ref="formAata">
                <el-form-item prop="listA">
                  <el-input maxlength="10" v-model="formAata.listA" @change="edits"></el-input>
                </el-form-item>
              </el-form>              
            </div>            
            <span v-else>{{scope.row.provisionNumber}}</span>
          </template>         
        </el-table-column>
        <el-table-column align="center" label="评审总分" prop="coceralTotalGrade"></el-table-column>
        <el-table-column align="center" label="是否达标" prop="isStandard"></el-table-column>
        <el-table-column align="center" label="评审项目得分">
          <el-table-column align="center" label="出口额" prop="coceralExportScore" width="150"></el-table-column>
          <el-table-column align="center" label="行业自律" prop="selfDisciplineScore" width="150"></el-table-column>
          <el-table-column align="center" label="品牌建设" prop="brandBuildScore"></el-table-column>
          <el-table-column align="center" label="专利与版权" prop="productionScore" width="120"></el-table-column>
          <el-table-column align="center" label="高新技术企业或高新技术产品" prop="newHighScore" width="120"></el-table-column>
          <el-table-column align="center" label="国家标准或行业标准" prop="standardScore" width="120"></el-table-column>
          <el-table-column align="center" label="质量、环境管理体系认证" prop="qualityScore" width="150"></el-table-column>
          <el-table-column align="center" label="面向企业的行业认证" prop="industryScore" width="150"></el-table-column>
          <el-table-column align="center" label="面向产品或生产线的行业认证数" prop="productionScore" width="150"></el-table-column>
          <el-table-column align="center" label="境内商标" prop="territoryScore" width="120"></el-table-column>
          <el-table-column align="center" label="境外商标" prop="beyondScore" width="120"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="授权子公司名称" prop="correlationCompanyName" width="100"></el-table-column>
        <el-table-column align="center" label="备注" prop="remark" width="120"></el-table-column>
        <el-table-column align="center" label="操作" prop="remark" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="mini"  @click="handeldeposit(scope.$index, scope.row.provisionNumber)">编辑
            </el-button>
            <el-button size="mini" type="text" :disabled='!scope.row.edit' @click="handelAdit(scope.row,'formAata')" >保存</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-form :inline="true" style="float: right;">
        <el-form-item>
          <el-pagination
            style="margin-top: 5px;"
            background
            layout="total, prev, pager, next, jumper"
            :total="paginationData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationData.currentPage"
            :page-size="paginationData.pageSize">
          </el-pagination>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
  <!-- </div> -->
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
      disabled: true,
      isDhow: false,
      lastIndex: "",
      paginationData: {
        currentPage: 0,
        pageSize: 1,
        total: 0
      },
      formAata: {
        listA: ""
      },
      loadinga: true,
      formData: {
        exhibitionArea: "",
        coceralId: "",
        dealClusterId: ""
      },
      localstora: {
        exhibitionArea: [], // 展区
        delegation: [], // 交易团
        businessAssociation: [] // 商协会
      }, // 数据字典
      pageDate: {
        "current": 1,
        "size": 10
      },
      brandApplyId: '',
      tableList: [],
      isShow: true,
      rules: {
        listA: [
          { validator: checkAge, trigger: "blur" }
        ]
      },
      activeName: "first"
    };
  },
  created() {
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
    this.handleListUser(this.pageDate);
  },
  methods: {
    ...mapActions("numberBrrangement", ["getNumberArrangement", "postNumberArrangement"]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment", // 交易团
      "getassociationDepartment" // 商协会
    ]),
    // 接受后台数据
    handleListUser(val) {
      this.getNumberArrangement(val)
        .then(res => {
          let list = JSON.parse(JSON.stringify(res.records));
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.paginationData.total = res.total;             
          for (let i = 0, len = list.length; i < len; i++) {
            list[i]["edit"] = false;
          }
          this.tableList = list;
          this.loadinga = false;
        })
        .catch(e => {
          this.loadinga = true;
        });
    },
    // 改变保存按钮
    edits() {
      if (this.formAata.listA > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    // 分页
    handleCurrentChange(current) {
      let objWne = {
        coceralId: this.formData.coceralId,
        dealClusterId: this.formData.dealClusterId,
        exhibitionArea: this.formData.exhibitionArea,
        "current": current,
        "size": 10
      };
      this.isDhow = false;
      this.handleListUser(objWne);
    },
    handleSizeChange() {},
    handelAdd() {},
    handleClick() {},
    // 编辑
    handeldeposit(id, data) {
      this.isDhow = true;
      this.formAata.listA = data;
      if (this.lastIndex === "" || this.lastIndex === id) {
        this.tableList[id]["edit"] = true;
        this.lastIndex = id;
      } else {
        this.$confirm("是否放弃本次修改")
          .then(() => {
            for (let i = 0; i < this.tableList.length; i++) {
              this.tableList[i]['edit'] = false;
            }
            this.tableList[id]["edit"] = true;
            this.lastIndex = id;
            this.formAata.listA = '';
            this.formAata.listA = data;
          })
          .catch(() => {
            this.$message.info("已取消本次操作");
          });
      }
    },
    // 查询
    onSubmit() {
      let objOne = {
        coceralId: this.formData.coceralId,
        dealClusterId: this.formData.dealClusterId,
        exhibitionArea: this.formData.exhibitionArea,
        "current": 1,
        "size": 10
      };
      this.handleListUser(objOne);
      // this.getNumberArrangement(objOne).then(res => {
      //   let list = JSON.parse(JSON.stringify(res.records));
      //   this.paginationData.currentPage = res.current;
      //   this.paginationData.pageSize = res.size;
      //   this.paginationData.total = res.total;             
      //   for (let i = 0, len = list.length; i < len; i++) {
      //     list[i]["edit"] = false;
      //   }
      //   this.tableList = list;
      // }).catch(e => {});
    },
    // 保存
    handelAdit(val, apo) {
      this.$refs[apo].validate((valid) => {
        if (valid) {
          this.isDhow = false;
          this.brandApplyId = val.brandApplyId;
          let obj = {
            "brandApplyId": this.brandApplyId,
            "provisionNumber": this.formAata.listA 
          };    
          this.postNumberArrangement(obj).then(res => {     
            this.lastIndex = '';
            this.formAata.listA = '';
            this.handleListUser(this.pageDate);
          }).catch(e => {});
        } else {
          this.$message("请输入正整数");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.el-form-item >>> .el-form-item__content{
  margin-left: 0 !important;
}
.el-table >>> .cell{
  overflow: visible !important;
}
</style>



