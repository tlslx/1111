<template>
<!-- 除品牌外，其它类型交易团审核组件（1.直接安排，2.A交易团团间交换，3.B交易团团间交换） -->
  <el-form ref="variables" :model="variables" :rules="rules" label-width="120px" label-position="left">
    <!-- 直接安排 -->
    <el-row v-if='itemState === 1'>
      <el-col :span="14">
        <el-form-item :label="languageSource.AdjustmentApply.setNewEnterprise" prop="setNewBusiness" class="row-margin">
          <el-input  v-model="variables.setNewBusiness" style="width: 94%"></el-input>
          <i class="el-icon-info i-s">
            <span class="tip-text">{{languageSource.AdjustmentApply.applyTip}}</span>
          </i>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-col :span="12">
          <el-popover
            placement="bottom"
            width="300"
            v-model="popoverState"
            trigger="click">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column property="schemeName" label="日期"></el-table-column>
              <el-table-column property="description" label="姓名"></el-table-column>
              <el-table-column property="creatorName" label="地址"></el-table-column>
            </el-table>
            <el-button ref="addBtn" type="primary" slot="reference" class="checkBtn">{{languageSource.AdjustmentApply.addenterprise}}</el-button>
          </el-popover>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" class="checkBtn">{{languageSource.AdjustmentApply.detection}}</el-button>
        </el-col>
      </el-col>
    </el-row>
    <!-- A,B交易团，B交易团输入框为禁填，且没有按钮显示 -->
    <template v-else-if="itemState === 2">
      <el-row>
        <el-col :span="12">
          <el-form-item :label="`${labelPrefix}${languageSource.AdjustmentApply.businessDelegation}`" prop="setNewBusiness" class="row-margin">
            <el-input v-model="variables.setNewBusiness" :disabled="ABState"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="`${secondLabel}${languageSource.AdjustmentApply.business}`" prop="setNewenterprise" class="row-margin">
            <el-input v-model="variables.setNewenterprise" :disabled="ABState"></el-input>
            <i class="el-icon-info i-s" v-if='!ABState'>
              <span class="tip-text">{{languageSource.AdjustmentApply.applyTip}}</span>
            </i>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if='!ABState'>
          <el-col :span="12">
            <el-popover
              placement="bottom"
              width="300"
              trigger="click">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column property="schemeName" label="日期"></el-table-column>
                <el-table-column property="description" label="姓名"></el-table-column>
                <el-table-column property="creatorName" label="地址"></el-table-column>
              </el-table>
              <el-button type="primary" slot="reference" class="checkBtn">{{languageSource.AdjustmentApply.addenterprise}}</el-button>
            </el-popover>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" class="checkBtn">{{languageSource.AdjustmentApply.detection}}</el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="`${lastLabel}${languageSource.AdjustmentApply.swapNum}`" prop="swapnum" class="row-margin">
            <el-input v-model="variables.swapnum" :disabled="ABState"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </template>
  </el-form>

</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'businessCheckSwap',
  mixins: [listPageBase],
  components: {
    addBusiness: () => import('./addBusiness.vue')
  },
  props: {
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      'variables': {},
      'rules': {},
      'itemState': 3, //直接安排和团间交换状态，1：表示是直接安排，2：表示团间交换, 3：表示默认不显示
      'ABState': false, //AB交易团团间交换状态区别，A交易团false， B交易团true
      'labelPrefix': '设置', //A交易团显示'设置'，B交易团显示'申请'
      'businessSelect': {}, //添加企业选中值
      'tableData': [
        {
          schemeName: '2018-5-21',
          description: 'Lisa',
          creatorName: '武汉'
        }
      ],
      popoverState: false
    };
  },
  created() {
    this.checkCurrentState();
    //设置校验信息国际化
    let languageSource = this.languageSource;
    this.rules = {
      setNewBusiness: [
        { required: true, message: languageSource.CheckProgress.businessDelegationTips, trigger: 'blur' },
        { max: 255, message: languageSource.LocationLang.toLongMsg, trigger: 'blur' }
      ],
      setNewenterprise: [
        { required: true, message: languageSource.AdjustmentApply.selectBusinessTips, trigger: 'blur' },
        { max: 255, message: languageSource.LocationLang.toLongMsg, trigger: 'blur' }
      ],
      swapnum: [
        { required: true, message: languageSource.AdjustmentApply.changeNumTips, trigger: 'blur' },
        { max: 255, message: languageSource.LocationLang.toLongMsg, trigger: 'blur' }
      ]
    };
  },
  mounted () {

  },
  computed: {
    lastLabel: function () {
      return this.ABState ? this.languageSource.AdjustmentApply.applyBtn : '';
    },
    secondLabel: function () {
      return this.ABState ? this.languageSource.AdjustmentApply.applyBtn : this.languageSource.AdjustmentApply.setNew;
    }
  },
  methods: {
    //判断当前页面处于什么状态，直接安排/A交易团团间交换/B交易团团间交换
    checkCurrentState () {
      let currentRow = this.$route.query.scopeRow;
      // currentRow.actId = 'tradeTeam2';
      if (currentRow.actId === 'tradeTeam2') {
        this.itemState = 1;
      } else if (currentRow.actId === 'tradeTeamA') {
        this.itemState = 2;
        this.ABState = false;
        this.labelPrefix = this.languageSource.AdjustmentApply.setLabel;
      } else if (currentRow.actId === 'tradeTeamB') {
        this.itemState = 2;
        this.ABState = true;
        this.labelPrefix = this.languageSource.AdjustmentApply.applyBtn;
      }
    },
    //处理弹出框表格选中行赋值事件
    handleRowClick (row) {
      this.businessSelect = row;
    },
    //校验表单
    checkForm () {
      this.$refs.variables.validate();
    },
    //新增企业点击
    addClick () {
      this.$refs.addBusinessRef.visible = true;
    }
  }
};
</script>

<style scoped>
.row-margin {
  margin-bottom: 20px;
}
.checkBtn {
  margin-left: 10px;
}
.i-s {
  color: #F56C6C;
  margin-top: 10px;
}
.tip-text {
  color: #606266;
  font-size: 12px;
  margin-left: 5px;
}
</style>
