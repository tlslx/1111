<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="审核企业资料详情页" name="first"></el-tab-pane>
      <el-button @click="back" type="danger">返回</el-button>
      <el-row>
        <el-col :span="6">
          <div class="allborder bgccc lheight fsizer">公司基本信息：</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight fzcenter">{{id.checkResult === '1' ? '审核通过' :(id.checkResult === '2' ? '审核不通过' : '未审核') }}</div>
        </el-col>
      </el-row>
      <!-- 表格1 -->
      <el-table :data="tableDataA" v-show="isTableOne" style="width: 100%">
        <el-table-column align="right" header-align="center" label="名称" prop="name1"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter1"></el-table-column>
        <el-table-column align="right" label="名称" prop="name2"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter2">
        </el-table-column>
      </el-table>
      <!-- 企业品牌/认证/奖励/专利 -->
      <el-row>
        <el-col :span="6">
          <div class="allborder bgccc lheight fsizer">企业品牌/认证/奖励/专利：</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight fzcenter"><i v-show="isShowOne" class="el-icon-arrow-up" @click="arrowUpOne"></i><i
              v-show="!isShowOne" @click="arrowDownOne" class="el-icon-arrow-down"></i></div>
        </el-col>
      </el-row>
      <!-- 表格2 -->
      <el-table :data="tableDataB" v-show="isTableTwo" style="width: 100%">
        <el-table-column align="right" header-align="center" label="名称" prop="name1"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter1"></el-table-column>
        <el-table-column align="right" label="名称" prop="name2"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter2"></el-table-column>
      </el-table>
      <!-- 参展及贸易需求 -->
      <el-row>
        <el-col :span="6">
          <div class="allborder bgccc lheight fsizer">参展及贸易需求：</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight fzcenter"><i v-show="isShowTwo" class="el-icon-arrow-up" @click="arrowUpTwo"></i><i v-show="!isShowTwo" @click="arrowDownTwo" class="el-icon-arrow-down"></i></div>
        </el-col>
      </el-row>
      <!-- 表格3 -->
      <el-table :data="tableDataC" v-show="isTableThree" style="width: 100%">
        <el-table-column align="right" header-align="center" label="名称" prop="name1"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter1"></el-table-column>
        <el-table-column align="right" label="名称" prop="name2"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter2"></el-table-column>
      </el-table>
      <!-- 企业联系方式 -->
      <el-row>
        <el-col :span="6">
          <div class="allborder bgccc lheight fsizer">企业联系方式：</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight fzcenter"><i v-show="isShowThree" class="el-icon-arrow-up" @click="arrowUpThree"></i><i v-show="!isShowThree" @click="arrowDownThree" class="el-icon-arrow-down"></i></div>
        </el-col>
      </el-row>
      <!-- 表格4 -->
      <el-table :data="tableDataD" v-show="isTableFour" style="width: 100%">
        <el-table-column align="right" header-align="center" label="名称" prop="name1"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter1"></el-table-column>
        <el-table-column align="right" label="名称" prop="name2"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter2"></el-table-column>
      </el-table>
      <!-- 企业展品信息 -->
      <el-row>
        <el-col :span="6">
          <div class="allborder bgccc lheight fsizer">企业展品信息：</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight fzcenter"><i v-show="isShowFour" class="el-icon-arrow-up" @click="arrowUpFour"></i><i v-show="!isShowFour" @click="arrowDownFour" class="el-icon-arrow-down"></i></div>
        </el-col>
      </el-row>
      <!-- 表格5 -->
      <el-table :data="tableDataE" v-show="isTableFive" style="width: 100%">
        <el-table-column align="center" label="产品名称" prop="name"></el-table-column>
        <el-table-column align="center" label="图片" prop="picture">
        </el-table-column>
        <el-table-column align="right" label="型号" prop="type"></el-table-column>
        <el-table-column align="center" label="类别" prop="category"></el-table-column>
      </el-table>
      <!-- 交易团审核 -->
      <el-row>
        <el-col :span="6">
          <div class="allborder bgccc lheight fsizer">交易团审核：</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight fzcenter"><i v-show="isShowFive" class="el-icon-arrow-up" @click="arrowUpFive"></i><i v-show="!isShowFive" @click="arrowDownFive" class="el-icon-arrow-down"></i></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="allborder" style="text-align: right; line-height: 26px;">审核结果：</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder" style="text-align: center; line-height: 26px;">
            <el-button type="primary" @click="handelSure" :disabled="disabled" style="margin-left: 80px; margin-right: 30px">通过</el-button>
            <el-button type="danger" :disabled="disabled" @click="handelBure">不通过</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="allborder">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder">&nbsp;</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="allborder" style="text-align: right; line-height: 26px;">审核意见：</div>
        </el-col>
        <el-col :span="18">
          <div class="allborder">
            <el-input :disabled="disabled" maxlength="48" @change="bur" v-model="audit" size="mini"></el-input>
          </div>
        </el-col>
      </el-row>
    </el-tabs>
  </div>
</template>
<script>
  import { mapActions } from "vuex";
  export default {
    data() {
      return {
        id: '',
        activeName: '',
        audit: '',
        disabled: true,
        isShowOne: true,
        isTableOne: false,
        isShowTwo: true,
        isTableTwo: false,
        isShowThree: true,
        isTableThree: false,
        isShowFour: true,
        isTableFour: false,
        isShowFive: true,
        isTableFive: false,
        checkResult: '',
        tableDataA: [
          {
            name1: "是否上市公司：",
            matter1: "是",
            name2: "厂房面积：",
            matter2: "965亩"
          },
          {
            name1: "上市地点：",
            matter1: "香港",
            name2: "主营产品关键字（中文）:",
            matter2: "手机"
          },
          {
            name1: "股票代码：",
            matter1: "123422",
            name2: "主营产品关键字（英文）:",
            matter2: "shouji"
          },
          {
            name1: "商（协）会会员号：",
            matter1: "123422",
            name2: "公司名称分词:",
            matter2: "大清"
          },
          {
            name1: "公司成立年份：",
            matter1: "1644年",
            name2: "纳税人识别号/统一社会信用代码:",
            matter2: "大清"
          },
          {
            name1: "注册资本：",
            matter1: "123422",
            name2: "贸易形式:",
            matter2: "大清"
          },
          {
            name1: "员工数量：",
            matter1: "123422",
            name2: "公司Logo:",
            matter2: "img",
            url: ""
          },
          {
            name1: "生产部门人数：",
            matter1: "123422",
            name2: "公司形象图:",
            matter2: "img",
            url: ""
          },
          {
            name1: "研发部门人数：",
            matter1: "123422",
            name2: "公司简介",
            matter2: "反清复明"
          },
          {
            name1: "质检部门人数：",
            matter1: "123422",
            name2: "企业首次参展时间:",
            matter2: "1644年"
          }
        ],
        tableDataB: [
          {
            name1: "品牌（商标）：",
            matter1: "是",
            name2: "是否使用该品牌出口：",
            matter2: "965亩"
          },
          {
            name1: "品牌中文名称：",
            matter1: "香港",
            name2: "商标（logo）:",
            matter2: "手机"
          },
          {
            name1: "品牌英文名称：",
            matter1: "123422",
            name2: "国家级奖励数量:",
            matter2: "shouji"
          },
          {
            name1: "是否自有品牌：",
            matter1: "123422",
            name2: "省级奖励数量:",
            matter2: "大清"
          },
          {
            name1: "海外注册商标的国家及地区数量：",
            matter1: "1644年",
            name2: "发明专利数:",
            matter2: "大清"
          },
          {
            name1: "国际/行业通行的管理体系认证的数量：",
            matter1: "123422",
            name2: "实用新型专利数:",
            matter2: "大清"
          },
          {
            name1: "面向企业的行业认证数量：",
            matter1: "123422",
            name2: "外观设计专利数:",
            matter2: "img"
          },
          {
            name1: "面向产品或生产线的行业认证数量：",
            matter1: "123422",
            name2: "",
            matter2: ""
          }
        ],
        tableDataC: [
          {
            name1: "参展目的（多选）：",
            matter1: "是",
            name2: "主要目标客户类型（多选）：",
            matter2: "965亩"
          },
          {
            name1: "是否有内贸业务：",
            matter1: "香港",
            name2: "参展产品:",
            matter2: "手机"
          },
          {
            name1: "上年度出口额前三位客户的国别或地区：",
            matter1: "123422",
            name2: "申请展位:",
            matter2: "shouji"
          },
          {
            name1: "主要目标市场：",
            matter1: "123422",
            name2: "是否禁止参展产品:",
            matter2: "大清"
          }
        ],
        tableDataD: [
          {
            name1: "省份/城市：",
            matter1: "是",
            name2: "广交会参展业务专用联系电子邮件：",
            matter2: "965亩"
          },
          {
            name1: "业务联系人姓名（中文）：",
            matter1: "香港",
            name2: "网址:",
            matter2: "手机"
          },
          {
            name1: "业务联系人姓名（英文）：",
            matter1: "123422",
            name2: "是否在“展商展品查询”中隐藏联系方式:",
            matter2: "shouji"
          },
          {
            name1: "职位：",
            matter1: "123422",
            name2: "所属交易团:",
            matter2: "大清"
          },
          {
            name1: "电话：",
            matter1: "1644年",
            name2: "交易团联系方式:",
            matter2: "大清"
          },
          {
            name1: "手机：",
            matter1: "123422",
            name2: "企业地址（中文）:",
            matter2: "大清"
          },
          {
            name1: "传真：",
            matter1: "123422",
            name2: "企业地址（英文）:",
            matter2: "img"
          },
          {
            name1: "业务联系电子邮件：",
            matter1: "123422",
            name2: "邮政编码：",
            matter2: ""
          }
        ],
        tableDataE: [
          {
            name: "马桶",
            picture: "img",
            type: "aw123",
            category: "Al马桶"
          },
          {
            name: "马桶",
            picture: "img",
            type: "aw123",
            category: "Al马桶"
          }
        ]
      };
    },
    mounted() {
      this.id = this.$router.history.current.query.id;
      if (this.id.checkResult !== '0') {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      // console.log(this.id.checkResult);
    },
    methods: {
      ...mapActions("enterprisesConfirm", ["postEviewBusiness"]),
      back() {
        this.$router.go(-1);
      },
      // 第一个表格的收起按钮
      arrowUpOne() {
        this.isShowOne = !this.isShowOne;
        this.isTableOne = !this.isTableOne;
      },
      // 第一个表格的打开按钮
      arrowDownOne() {
        this.isShowOne = !this.isShowOne;
        this.isTableOne = !this.isTableOne;
      },
      // 第二个表格的收起按钮
      arrowUpTwo() {
        this.isShowTwo = !this.isShowTwo;
        this.isTableTwo = !this.isTableTwo;
      },
      // 第二个表格的打开按钮
      arrowDownTwo() {
        this.isShowTwo = !this.isShowTwo;
        this.isTableTwo = !this.isTableTwo;
      },
      // 第三个表格的收起按钮
      arrowUpThree() {
        this.isShowThree = !this.isShowThree;
        this.isTableThree = !this.isTableThree;
      },
      // 第三个表格的打开按钮
      arrowDownThree() {
        this.isShowThree = !this.isShowThree;
        this.isTableThree = !this.isTableThree;
      },
      // 第四个表格的收起按钮
      arrowUpFour() {
        this.isShowFour = !this.isShowFour;
        this.isTableFour = !this.isTableFour;
      },
      // 第四个表格的打开按钮
      arrowDownFour() {
        this.isShowFour = !this.isShowFour;
        this.isTableFour = !this.isTableFour;
      },
      // 第五个表格的收起按钮
      arrowUpFive() {
        this.isShowFive = !this.isShowFive;
        this.isTableFive = !this.isTableFive;
      },
      // 第五个表格的打开按钮
      arrowDownFive() {
        this.isShowFive = !this.isShowFive;
        this.isTableFive = !this.isTableFive;
      },
      bur() {
        // if (this.audit === "") {
        //   this.disabled = true;
        // } else {
        //   this.disabled = false;
        // }
      },
      //通过
      handelSure() {
        let obj = {
          "boothAffirmId": this.id.boothAffirmId,
          "checkResult": 1,
          "checkDescribe": this.audit
        };
        if (this.audit === "") {
          this.$message("请填写审核意见");
        } else {
          this.postEviewBusiness(obj).then(res => {
            this.$router.push('/dumpling_audit');
          }).catch(e => { });
        }

      },
      //不通过
      handelBure() {
        let boaa = {
          "boothAffirmId": this.id.boothAffirmId,
          "checkResult": 2,
          "checkDescribe": this.audit
        };
        if (this.audit === "") {
          this.$message("请填写审核意见");
        } else {
          this.postEviewBusiness(boaa).then(res => {
            this.$router.push('/dumpling_audit');
          }).catch(e => { });
        }
        // this.postEviewBusiness(boaa).then(res => {
        //   this.$router.push('/dumpling_audit');
        // }).catch(e => { });
      }
    }
  };
</script>
<style>
  .allborder {
    border: 1px solid #fff;
  }

  .bgccc {
    background: #ccc;
  }

  .lheight {
    line-height: 30px;
  }

  .fsizer {
    font-size: 16px;
    font-weight: 600;
    text-align: right;
  }

  .fzcenter {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  }
</style>