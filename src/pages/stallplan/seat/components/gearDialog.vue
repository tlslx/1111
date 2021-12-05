<template>
  <el-dialog
    title="在线安排企业"
    :visible.sync="dialogVisible"
    @close="clear"
    width="50%">
    <el-form ref="gear" :model="gear" :inline="false" size="small">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="languageSource.LocationLang.programName" prop="schemeName">
            <el-input v-model="gear.schemeName" clearable style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="languageSource.LocationLang.exhibitionNumber" prop="sessionNumber">
            <el-select v-model="gear.sessionNumber" clearable placeholder="请选择展会界数">
              <el-option
                v-for="session in sessionNumber"
                :key="session.value"
                :label="session.label"
                :value="session.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="languageSource.LocationLang.exhibitionPeriod" prop="exhibitionPeriod">
            <el-select v-model="gear.exhibitionPeriod" clearable placeholder="请选择展期">
              <el-option
                v-for="area in exhibitionPeriodNum"
                :key="area.value"
                :label="area.label"
                :value="area.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="languageSource.LocationLang.exhibitionArea" prop="exhibitionAreaName">
            <el-select v-model="gear.exhibitionAreaName" clearable placeholder="请选择展区">
              <el-option
                v-for="area in regionOfExhibition"
                :key="area.value"
                :label="area.label"
                :value="area.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="languageSource.LocationLang.exhibitionProperty" prop="exhibitionProperty">
            <el-select v-model="gear.exhibitionProperty" clearable placeholder="请选择展位性质">
              <el-option
                v-for="area in natures"
                :key="area.value"
                :label="area.label"
                :value="area.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="languageSource.LocationLang.specialArea" prop="zhuanqu">
            <el-select v-model="gear.zhuanqu" filterable placeholder="请选择专区">
              <el-option
                v-for="session in zhuanqu"
                :key="session.value"
                :label="session.label"
                :value="session.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">{{languageSource.CommonLang.cancel}}</el-button>
      <el-button type="primary" @click="onGearSubmit">{{languageSource.CommonLang.confirm}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'gearDialog',
  mixins: [listPageBase],
  props: {
    'natures': {
      'type': Array,
      'required': true
    },
    'regionOfExhibition': {
      'type': Array,
      'required': true
    },
    'exhibitionPeriodNum': {
      'type': Array,
      'required': true
    },
    'sessionNumber': {
      'type': Array,
      'required': true
    },
    'zhuanqu': {
      'type': Array,
      'required': true
    },
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      'dialogVisible': false,
      'gear': {}
    };
  },
  methods: {
    onGearSubmit () {
      this.dialogVisible = false;
      // this.$router.push({ path: '/stallplan/area' });
    },
    clear () {
      this.$refs.gear.resetFields();
    }
  }
};
</script>
