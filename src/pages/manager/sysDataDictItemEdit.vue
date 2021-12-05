<template>
  <el-form :ref="name" :model="form" data-url="/api/sysDataDictItem/getSingleById"
    update-url="/api/sysDataDictItem/updateById" add-url="/api/sysDataDictItem/add">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="创建时间：" prop="createDate" :span="8" >
            <el-input v-model="form.createDate" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="创建人ID：" prop="creatorId" :span="8" >
            <el-input v-model="form.creatorId" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="创建人姓名：" prop="creatorName" :span="8" >
            <el-input v-model="form.creatorName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="SYS_DICTIONARIES/DICTIONARY_ID：" prop="dataDictId" :span="8" >
            <el-input v-model="form.dataDictId" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="主键（取公共框架生成的GUID）：" prop="dataDictItemId" :span="8" >
            <el-input v-model="form.dataDictItemId" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="字典项编码：" prop="itemCode" :span="8" >
            <el-input v-model="form.itemCode" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="字典项RGB：" prop="itemRgb" :span="8" >
            <el-input v-model="form.itemRgb" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="字典项文本：" prop="itemText" :span="8" >
            <el-input v-model="form.itemText" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="修改人ID：" prop="modifierId" :span="8" >
            <el-input v-model="form.modifierId" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="修改人姓名：" prop="modifierName" :span="8" >
            <el-input v-model="form.modifierName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="修改时间：" prop="modifyDate" :span="8" >
            <el-input v-model="form.modifyDate" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="排序：" prop="orderNo" :span="8" >
            <el-input v-model="form.orderNo" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="备注：" prop="remark" :span="8" >
            <el-input v-model="form.remark" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="状态：1=有效/0=无效：" prop="state" :span="8" >
            <el-input v-model="form.state" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="SYS_SYSTEM_INFO/SYSTEM_CODE：" prop="systemId" :span="8" >
            <el-input v-model="form.systemId" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script>
import dialogPageBase from '@/components/framework/mixins/dialogPageBase';
export default {
  mixins: [dialogPageBase],
  data () {
    return {
      submitType: "json",
      activeTab: 'baseInfo',
      form: { createDate: '', creatorId: '', creatorName: '', dataDictId: '', dataDictItemId: '', itemCode: '', itemRgb: '', itemText: '', modifierId: '', modifierName: '', modifyDate: '', orderNo: '', remark: '', state: '', systemId: '' }
    };
  },
  methods: {
    pageLoad () {
    }
  }
};
</script>
