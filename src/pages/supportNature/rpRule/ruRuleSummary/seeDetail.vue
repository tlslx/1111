/**
 * @file 奖惩情况查看
 */

<style>
.el-header {
  border-bottom: 1px solid #ddd;
}
.el-header > span {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  height: 58px;
  line-height: 58px;
  display: block;
  float: left;
  border-bottom: 2px solid #2b579a;
}
</style>

<template>
  <el-container>
    <el-header>
      <span>奖惩情况查看</span>
    </el-header>
    <el-main>
      <el-form
        ref="form"
        :model="tableData"
        label-width="150px"
      >
        <el-form-item label="届数">
          <el-col :span="8">
            <el-input
              disabled
              v-model="tableData.exhibitionNum"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-col :span="8">
            <el-input
              disabled
              v-model="tableData.companyName"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="所属交易团">
          <el-col :span="8">
            <el-input
              disabled
              v-model="tableData.businessDelegationText"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="展区">
          <el-col :span="8">
           <el-select disabled v-model="tableData.exhibitionAreaCode" placeholder="请选择" style="width:290px">
             <el-option v-for="item in exhArea" :key="item.code" :label="item.label" :value="item.code"></el-option>
           </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="专区">
          <el-col :span="8">
            <el-select disabled v-model="tableData.specialAreaCode" placeholder="请选择" style="width:290px">
              <el-option v-for="item in speArea" :key="item.code" :label="item.label" :value="item.code"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item
          label="最大安排数"
          prop="maxnum"
        >
          <el-input
            disabled
            v-model="tableData.maxnum"
            style="width:290px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="限制展位类型"
          prop="ifflauntValue"
        >
         <el-select disabled v-model="tableData.ifflaunt" style="width:290px">
          <el-option v-for="item in ifflauntCode" :key="item.code" :label="item.label" :value="item.code"></el-option>
         </el-select>
        </el-form-item>
        <el-form-item label="事件类别">
          <el-col :span="8">
            <el-input
              disabled
              v-model="tableData.rpTypeCode"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="认定条件">
          <el-col :span="8">
            <el-input
              type="textarea"
              rows="5"
              disabled
              v-model="tableData.rpConText"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="颁布单位">
          <el-col :span="8">
            <el-input
              disabled
              v-model="tableData.issueText"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="中心联络部门">
          <el-col :span="8">
            <el-input
              disabled
              v-model="tableData.deptText"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="处理期限">
          <el-col :span="8">
            <el-input
              disabled
              v-model="tableData.limit"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="起始届数">
          <el-col :span="8">
            <el-input
              disabled
              v-model="tableData.start"
            ></el-input>
          </el-col>
        </el-form-item>
         <el-form-item label="认定依据">
          <el-col :span="8">
            <el-input
              type="textarea"
              rows="5"
              disabled
              v-model="tableData.cognizanceBasis"
            ></el-input>
          </el-col>
        </el-form-item>
         <el-form-item>
          <el-col :span="8">
            <el-button
             @click="goBack"
            >返回</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import http from "@/scripts/framework/http";
export default {
  data() {
    return {
      tableData: {},
      exhArea: [], // 展区
      ifflauntCode: [], // 展位类型 
      //专区(全)
      speArea: [],
      //专区（单个展区内所有专区）
      speAreaArray: [],
      baseApi: process.env.API_SN_URL
    };
  },
  watch: {
    exhArea(val) {
      if (val.length > 0) {
        this.tableData.exhibitionAreaCode = this.$route.query.areaCode;
      }
    },
    speAreaArray(val) {
      if (val.length > 0) {
        this.tableData.specialAreaCode = this.$route.query.speCode;
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 获取展位
    getpost() {
      let data = {
        exhibitionNum: this.$route.query.exhibitionNum
      };
      if (this.exhArea.length > 0) {
        this.exhArea.clear();
      }
      if (this.speArea.length > 0) {
        this.speArea.clear();
      }
       // 获取所有展区
      http.get(this.baseApi + "/api/exp/exhibitionschemes/getAreas", data).then(res => {
        // var speAreaArr = [];
        // this.speAreaAll.clear();
        res.forEach(element => {
          this.exhArea.push({
            code: element.exhibitionAreaCode,
            label: element.exhibitionAreaName
          });
          if (element.specialAreas && element.specialAreas.length > 0) {
            //塞入展区中的专区
            element.specialAreas.forEach(element2 => {
              this.speArea.push({
                code: element2.specialAreaCode,
                label: element2.cname
              });
            });
          }
          // this.speArea.set(element.exhibitionAreaCode + '', speAreaArr);
        });
      }).catch(error => { });
    },
    // 限制展位类型
    BoothType() {
       // 获取所有限制展位类型
      http.get(this.baseApi + "/api/sysDataDictItem/findDicItemListBySupportLimitBoothType").then(res => {
        res.records.forEach(element => {
          this.ifflauntCode.push({
            code: element.itemCode,
            label: element.itemText
          });
        });
      }).catch(error => { });

    }
  },
  created() {
    this.tableData = this.$route.query;
    // delete this.$route.query.exhibitionAreaCode;
    this.BoothType();
  },
  mounted() {
    this.getpost();
  }
};
</script>

