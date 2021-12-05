<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="新增配置" name="first">
      <el-form ref="form" :model="formData" label-width="120px">
        <el-form-item label="配置名称">
          <el-row>
            <el-col :span="6" class="rowStyle">
              <el-date-picker v-model="valueDate" type="date"></el-date-picker>
            </el-col>
            <el-col :span="6" class="rowStyle">
              <el-select v-model="formData.exhibitionSession" clearable>
                <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="rowStyle">
              <el-select v-model="formData.exhibitionSession" clearable>
                <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="rowStyle">
              <el-input></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="款项类别">
          <el-radio-group v-model="radio">
            <el-popover
              placement="bottom"
              width="110"
              trigger="hover">
              <div>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="展位费"></el-checkbox>
                  <el-checkbox label="配置费"></el-checkbox>
                  <el-checkbox label="统一布展费"></el-checkbox>
                  <el-checkbox label="包期通讯费"></el-checkbox>
                </el-checkbox-group>
              </div>
              <el-radio class="radioStyle" slot="reference" :label="1">定金款</el-radio>
            </el-popover>
            <el-popover
              placement="bottom"
              width="110"
              trigger="hover">
              <div>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="展位费"></el-checkbox>
                  <el-checkbox label="配置费"></el-checkbox>
                  <el-checkbox label="统一布展费"></el-checkbox>
                  <el-checkbox label="包期通讯费"></el-checkbox>
                </el-checkbox-group>
              </div>
              <el-radio class="radioStyle" slot="reference" :label="2">预收费</el-radio>
            </el-popover>
            <el-popover
              placement="bottom"
              width="110"
              trigger="hover">
              <div>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="展位费"></el-checkbox>
                  <el-checkbox label="配置费"></el-checkbox>
                  <el-checkbox label="统一布展费"></el-checkbox>
                  <el-checkbox label="包期通讯费"></el-checkbox>
                </el-checkbox-group>
              </div>
              <el-radio class="radioStyle" slot="reference" :label="3">预订款</el-radio>
            </el-popover>
            <el-popover
              placement="bottom"
              width="110"
              trigger="hover">
              <div>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="展位费"></el-checkbox>
                  <el-checkbox label="配置费"></el-checkbox>
                  <el-checkbox label="统一布展费"></el-checkbox>
                  <el-checkbox label="包期通讯费"></el-checkbox>
                </el-checkbox-group>
              </div>
              <el-radio class="radioStyle" slot="reference" :label="4">结算款</el-radio>
            </el-popover>
          </el-radio-group>
        </el-form-item>
        <el-tabs type="card" class="tabsStyle">
          <el-tab-pane label="交易团">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group class="chegroupStyle" v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="独立核算企业">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group class="chegroupStyle" v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-tab-pane>
        </el-tabs>
        <el-form-item label="展区分类">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group class="chegroupStyle" v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="展区类别">
          <el-checkbox-group v-model="checkedCities">
            <el-checkbox label="品牌展位"></el-checkbox>
            <el-checkbox label="一般性展位"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="确认企业缴费">
          <el-radio-group v-model="radio">
            <el-radio :label="3">确认</el-radio>
            <el-radio :label="6">不确认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="5"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button>保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      activeName: "first",
      formData: {
        exhibitionSession: "",
        checkList: []
      },
      valueDate: "",
      radio: "",
      checkList: [],
      exhibitionSessionOpts: ''
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<style scoped>
.tabsStyle {
  margin-left: 50px;
}
.tabsStyle >>> .el-tabs__header {
  margin: 0;
}
.tabsStyle >>> .el-tabs__header {
  margin: 0;
}
.tabsStyle >>> .el-tabs__content {
  padding: 15px 50px;
  border-left: 1px solid #E4E7ED;
  border-right: 1px solid #E4E7ED;
  border-bottom: 1px solid #E4E7ED;
}
.rowStyle {
  padding: 0 20px;
}
.chegroupStyle {
  display: inline-block;
}
.radioStyle {
  margin-right: 20px;
}
</style>


