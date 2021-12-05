<template>
  <el-dialog title="潜在数据跟进" :visible.sync="trackDiaLogVisible" width="50%">
    <el-form :model="trackDiaLogForm" label-width="220px" size="small" label-position="right" ref="trackDiaLogForm">
      <el-form-item label="姓名：">
        <el-input v-model="trackDiaLogForm.personName" disabled class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="所属公司：">
        <el-input v-model="trackDiaLogForm.enterpriseName" disabled class="inputWidth"></el-input>
      </el-form-item>
      <el-form-item label="固定是否有效：">
        <el-radio-group v-model="trackDiaLogForm.fixedPhoneStatus">
          <el-radio :label="1">有效</el-radio>
          <el-radio :label="0">无效</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机是否有效：">
        <el-radio-group v-model="trackDiaLogForm.phonenumberStatus">
          <el-radio :label="1">有效</el-radio>
          <el-radio :label="0">无效</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否接电话：">
        <el-radio-group v-model="trackDiaLogForm.answerStatus">
          <el-radio :label="1">接电话</el-radio>
          <el-radio :label="0">未接电话</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有参会意向：">
        <el-radio-group v-model="trackDiaLogForm.attendIntention">
          <el-radio :label="1">有意向</el-radio>
          <el-radio :label="0">无意向</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="感兴趣产品类别：">
        <el-select v-model="trackDiaLogForm.interestedProduct" placeholder="" multiple class="inputWidth">
          <el-option v-for="item in buyerTypeOptions" :key="item.id" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据标签：">
        <el-radio-group v-model="trackDiaLogForm.dataLab">
          <el-radio :label="'无效'">无效</el-radio>
          <el-radio :label="'不良'">不良</el-radio>
          <el-radio :label="'禁用'">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="登记人：">
        <el-input v-model="trackDiaLogForm.registrar" class="inputWidth"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeOrShowDialog">关闭</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'trackDiaLog',
  props: {
    trackDiaLogVisible: { type: Boolean, default: false },
    closeOrShowDialog: Function,
    submit: Function,
    buyerTypeOptions: { type: Array, default: [] }
  },
  data() {
    return {
      trackDiaLogForm: {}
    };
  },
  mounted() { },
  methods: {}
};
</script>

<style lang="less" scoped>
.inputWidth {
  width: 280px;
}
</style>

