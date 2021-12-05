<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="工作部设置商协会查看企业资料范围" name="first">
      <el-form class="check-form" ref="checkForm">
        <el-form-item label="资料范围：">
          <div v-for="(item, index) in workDepartRangeList" :key="index">
            <el-checkbox :label="item.configName" :checked="handleChecked(item.configValue)" @change="val => handleChange(val, index)"></el-checkbox>
          </div>
        </el-form-item>
        <div class="total-footer">
          <el-button type="primary" size="medium" @click="handleSave">保存</el-button>
          <el-button size="medium">取消</el-button>
        </div>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      rangeList: [{ value: 'COMPANY_BASE_INFO', label: '公司基本信息' }, { value: 'COMPANY_APPLY_INFO', label: '企业申请资料' }, { value: 'COMPANY_PRODUCT_INFO', label: '企业展品信息' }, 
      { value: 'BUSINESS_LICENSE', label: '营业执照' }, { value: 'FOREIGN_CERTIFICATE', label: '外贸经营资质证明' }, { value: 'PRODUCT_BRIEF', label: '产品简介' }, 
      { value: 'DOMESTIC_SALES', label: '国内销售额' }, { value: 'CUSTOMS_CODE', label: '海关编码' }, { value: 'APTITUDE_OUTSIDE', label: '境外注册商标' }, 
      { value: 'APTITUDE_INTERNATIONAL', label: '国际通行认证' }, 
      { value: 'INNOVATE_PROPERTY_PATENT', label: '专利证明' }, { value: 'NATIONAL_HIGH_TECH', label: ' 国家高新技术' }, { value: 'INNOVATE_PROPERTY_STANDARD', label: '参与国家或行业标准制定' }, 
      { value: 'ACTOR_PROJECT', label: '近两年参与商务部对外经济合作、援助项目' }, { value: 'INTERNATIONAL_PROJECT', label: '近两年参加国际专业展' }],
      workDepartRangeList: []
    };
  },
  computed: {
    ...mapGetters('newThemeRecommendCompany', ['rangeWorkDepart'])
  },
  created() {
    this.createdQuery();
  },
  methods: {
    ...mapActions('newThemeRecommendCompany', ['getRangeWorkDepart', 'postRangeSetByWorkDepartment']),
    // 是否勾选
    handleChecked(status) {
      if (status === '0') {
        return false;
      } else if (status === '1') {
        return true;
      }
    },
    // 保存勾选项
    handleChange(val, index) {
      if (val) {
        this.workDepartRangeList[index].configValue = '1';
      } else {
        this.workDepartRangeList[index].configValue = '0';
      }
    },
    // 点击保存
    handleSave() {
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.postRangeSetByWorkDepartment(this.workDepartRangeList).then(() => {
        this.$message.success('保存成功');
        this.createdQuery();
      }).catch(e => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
      });
    },
    // 查询封装
    createdQuery() {
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.getRangeWorkDepart().then(res => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
        let list = [];
        list = JSON.parse(JSON.stringify(this.rangeWorkDepart));
        for (let i = 0; i < list.length; i++) {
          if (this.rangeList[i].label) {
            list[i].configName = this.rangeList[i].label;
          }
        }
        this.workDepartRangeList = list;
      }).catch(e => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
      });
    }
  }
};
</script>
<style scoped>
.queryBtn, .pagination-container{
  float: right;
}
.add_btn{
  margin-left: 30px;
}
.item-Num  >>> .el-form-item__content{
  margin-left: 0 !important;
}
.el-table >>> .cell{
  overflow: visible !important;
}
.item-Num >>> input::-webkit-outer-spin-button,
.item-Num >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none!important;
}
.item-Num >>> input[type="number"]{
  -moz-appearance: textfield!important;
}
.pagination-footer{
  margin-top: 20px;
}  
.total-footer{
  text-align: center;
  padding: 20px 0;
}
.check-form{
  width: 100%;
  max-width: 550px;
}
</style>
