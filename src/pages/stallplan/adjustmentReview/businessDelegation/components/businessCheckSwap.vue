<template>
<!-- 除品牌外，其它类型交易团审核组件（1.直接安排，2.A交易团团间交换，3.B交易团团间交换） -->
  <el-form ref="variables" :model="variables" :rules="rules" label-width="120px">
    <!-- 直接安排 -->
    <el-row v-if='itemState === 1'>
      <el-col :span="12">
        <el-form-item :label="languageSource.AdjustmentApply.setNewEnterprise" prop="setNewBusiness" class="row-margin">
          <el-input v-model="variables.setNewBusiness" ></el-input>
          <i class="el-icon-info i-s">
            <span class="tip-text">{{languageSource.AdjustmentApply.applyTip}}</span>
          </i>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-col :span="10">
          <add-business ref="addBusinessRef" @rowClick='handleRowClick'/>
        </el-col>
        <el-col :span="12"><el-button type="primary" class="checkBtn" size="small">{{languageSource.AdjustmentApply.detection}}</el-button></el-col>
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
        <el-col :span="4" v-if='!ABState'>
          <el-col :span="10">
            <add-business ref="addBusinessRef" @rowClick='handleRowClick' />
          </el-col>
          <el-col :span="12"><el-button type="primary" class="checkBtn" size="small">{{languageSource.AdjustmentApply.detection}}</el-button></el-col>
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
      'rules': {
        setNewBusiness: [
          { required: true, message: '请输入交易图信息', trigger: 'blur' }
        ],
        setNewenterprise: [
          { required: true, message: '请选择企业信息', trigger: 'blur' }
        ],
        swapnum: [
          { required: true, message: '请输入交换展位数', trigger: 'blur' }
        ]
      },
      'itemState': 3, //直接安排和团间交换状态，1：表示是直接安排，2：表示团间交换, 3：表示默认不显示
      'ABState': false, //AB交易团团间交换状态区别，A交易团false， B交易团true
      'labelPrefix': '设置', //A交易团显示'设置'，B交易团显示'申请'
      'businessSelect': {} //添加企业选中值
    };
  },
  mounted() {
    this.checkCurrentState();
  },
  computed: {
    lastLabel: function () {
      return this.ABState ? '申请' : '';
    },
    secondLabel: function () {
      return this.ABState ? '申请' : '设置新';
    }
  },
  methods: {
    //判断当前页面处于什么状态，直接安排/A交易团团间交换/B交易团团间交换
    checkCurrentState () {
      let currentRow = this.$route.query.scopeRow;
      if (currentRow.actId === 'tradeTeam2') {
        this.itemState = 1;
      } else if (currentRow.actId === 'tradeTeamA') {
        this.itemState = 2;
        this.ABState = false;
        this.labelPrefix = '设置';
      } else if (currentRow.actId === 'tradeTeamB') {
        this.itemState = 2;
        this.ABState = true;
        this.labelPrefix = '申请';
      }
    },
    //处理弹出框表格选中行赋值事件
    handleRowClick (row) {
      this.businessSelect = row;
    },
    //校验表单
    checkForm () {
      this.$refs.variables.validate();
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
  margin-top: 6px;
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
