<style lang="less" scoped>
@import "../../../../../../theme/project/css/flex.less";
</style>

<template>
  <div>
    <el-table :data="tableTopData">
      <el-table-column v-for='(item, index) in tableTopHead' :key="index"
        :prop="item.prop" :label="item.label" align="center"></el-table-column>
    </el-table>
    <el-row type="flex" justify="end" class="pagination-contain">
      <el-pagination
        @size-change="handleSizeChangeTop"
        @current-change="handleCurrentChangeTop"
        :current-page='ruleTop.cuurent'
        :page-sizes="[10, 20, 30, 40]"
        :page-size="ruleTop.size"
        layout="prev, pager, next, jumper"
        :total="totalTop">
      </el-pagination>
    </el-row>

    <!-- bottomForm -->
    <el-form :inline="true" :model="ruleForm" style="margin-top: 20px">
      <el-form-item label="届数">
        <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
          <el-option v-for="(item, index) in exhibitionNum" :key="index"
            :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="期数">
        <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
          <el-option label="1" :value="1"></el-option>
          <el-option label="3" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件类型" >
        <el-select  placeholder="请选择" v-model="ruleForm.idType" clearable>
          <el-option  v-for="item in personCardTypeArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select  placeholder="请选择" v-model="ruleForm.ApproveState" clearable>
          <el-option  v-for="item in reApproveArray" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称">
        <el-input v-model="ruleForm.companyName"></el-input>
      </el-form-item>

      <el-row>
        <div class="bm bm-pe">
          <el-button type="primary" @click="getTableTop(ruleForm)" size="mini">查询</el-button>
          <el-button type="primary" size="mini" @click="addflag=true">新增</el-button>
        </div>
      </el-row>
    </el-form>
    <el-table :data="tableBottomData">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column v-for='(item, index) in tableBottomHead' :key="index"
        :prop="item.prop" :label="item.label"></el-table-column>
    </el-table>
    <div class="bm bm-pj">
      <el-button type="primary">打印回执单</el-button>
      <el-pagination
        @size-change="handleSizeBtmChange"
        @current-change="handleCurrentBtmChange"
        :current-page="ruleForm.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="ruleForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalBtm">
      </el-pagination>
    </div>

    <!-- 新增dialog -->
    <el-dialog
      title="新增证件"
      width="80%"
      :visible.sync="addflag"
      :show-close="false">
      <add-papersCar></add-papersCar>
    </el-dialog>
        
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import addPapersCar from "@/pages/Exhibitors/company/components/addPaperCar";
export default {
  components: {
    "add-papersCar": addPapersCar
  },
  data() {
    return {
      addflag: false,
      // top的表格
      ruleTop: {
        current: 1,
        size: 10
      },
      totalTop: 0,
      tableTopData: [
        {
          type: "参展类型",
          exhibitionNum: "全期",
          combination: "总额度",
          applyCombination: "已申请额度",
          residueCombination: "3"
        }
      ],
      tableTopHead: [
        {
          prop: "badgeTypeName",
          label: "证件类型"
        },
        {
          prop: "exhibitionPeriod",
          label: "期数"
        },
        {
          prop: "combination",
          label: "总额度"
        },
        {
          prop: "applyCombination",
          label: "已申请额度"
        },
        {
          prop: "residueCombination",
          label: "剩余额度"
        }
      ],
      // bottom的表格
      ruleForm: {
        exhibitionNum: "",
        exhibitionSession: 1,
        idType: "",
        ApproveState: "",
        companyName: "",
        current: 1,
        size: 10
      },
      tableBottomData: [],
      tableBottomHead: [
        {
          prop: "type",
          label: "申请单编号"
        },
        {
          prop: "badgeTypeName",
          label: "证件类型"
        },
        {
          prop: "companyName",
          label: "企业名称"
        },
        {
          prop: "combination",
          label: "单位"
        },
        {
          prop: "applyCombination",
          label: "驾驶人姓名"
        },
        {
          prop: "residueCombination",
          label: "驾驶证扫描件"
        },
        {
          prop: "residueCombination",
          label: "证件照"
        },
        {
          prop: "residueCombination",
          label: "身份证复印件"
        },
        {
          prop: "residueCombination",
          label: "身份证号"
        },
        {
          prop: "residueCombination",
          label: "手机"
        },
        {
          prop: "residueCombination",
          label: "撤展证类型"
        },
        {
          prop: "residueCombination",
          label: "馆号"
        },
        {
          prop: "residueCombination",
          label: "车辆类型"
        },
        {
          prop: "residueCombination",
          label: "吨位/座号"
        },
        {
          prop: "residueCombination",
          label: "车牌颜色"
        },
        {
          prop: "exhibitionSessioin",
          label: "届数"
        },
        {
          prop: "exhibitionPeriod",
          label: "期数"
        },
        {
          prop: "residueCombination",
          label: "进馆开始日期"
        },
        {
          prop: "residueCombination",
          label: "进馆结束日期"
        },
        {
          prop: "residueCombination",
          label: "车牌号"
        },
        {
          prop: "residueCombination",
          label: "车辆行驶证扫描件"
        },
        {
          prop: "residueCombination",
          label: "状态"
        },
        {
          prop: "invalidDesc",
          label: "不通过原因"
        }
      ]
    };
  },
  computed: {
    ...mapGetters('commonStore', ['exhibitionNum', "currentExhibition"])
  },
  methods: {
    //获取top列表
    getTableTop(param) {
      return "todo";
    },
    handleSizeChangeTop(param) {
      this.ruleTop.size = param;
      this.getTableTop(this.ruleTop);
    },
    handleCurrentChangeTop(param) {
      this.ruleTop.current = param;
      this.getTableTop(this.ruleTop);
    },
    //获取bottom列表
    getBtmTableDataList(param) {
      return "todo";
    },
    handleSizeBtmChange(val) {
      this.ruleForm.size = val;
      this.getBtmTableDataList(this.ruleForm);
    },
    handleCurrentBtmChange(val) {
      this.ruleForm.current = val;
      this.getBtmTableDataList(this.ruleForm);
    }
  },
  async created() {
    if (!this.exhibitionNum) {
      await this.getExhibitionNum().then(res => {
        if (res) {
          let array = [];
          for (let item of res) {
            array.push({
              label: item.exhibitionNum,
              value: item.exhibitionNum,
              current: item.current
            });
          }
          this.$store.commit('commonStore/EXHIBITION_NUM', array);
          for (let item of this.exhibitionNum) {
            if (item.current) {
              this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
              this.ruleForm.exhibitionNum = this.currentExhibition;
              break;
            }
          }
        }
      });
    } else if (!this.currentExhibition) {
      for (let item of this.exhibitionNum) {
        if (item.current) {
          this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
          this.ruleForm.exhibitionNum = this.currentExhibition;
          break;
        }
      }
    } else {
      this.ruleForm.exhibitionNum = this.currentExhibition;
    }
  }
};
</script>
