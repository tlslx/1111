<template>
  <div>
    <el-form :model="form" ref="form" label-width="150px" class="demo-form">
      <el-form-item label="选择客户：" prop="emailList">
        {{ this.form.emailList }}
      </el-form-item>
      <el-form-item label="邮件模板：" prop="emailModelId">
        {{ this.form.emailModelId }}
      </el-form-item>
      <el-form-item label="参展企业名称：" prop="companyName">
        {{ this.form.companyName }}
      </el-form-item>
      <el-form-item label="联系人：" prop="contact">
        {{ this.form.contact }}
      </el-form-item>
      <el-form-item label="参加广交会时间：" prop="enterTime">
        <el-row>
          <el-col :span="8">
            第一期：{{ this.form.boothOneDate }}
          </el-col>
          <el-col :span="8">
            <el-form-item label="展位号：" prop="boothOneNo" style="width: 100px;">
              {{ this.form.boothOneNo }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            第二期：{{ this.form.boothTwoDate }}
          </el-col>
          <el-col :span="8">
            <el-form-item label="展位号：" prop="boothTwoNo" style="width: 100px;">
              {{ this.form.boothTwoNo }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            第三期：{{ this.form.boothThreeDate }}
          </el-col>
          <el-col :span="8">
            <el-form-item label="展位号：" prop="boothThreeNo" style="width: 100px;">
              {{ this.form.boothThreeNo }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="电话：" prop="tel">
        {{ this.form.tel }}
      </el-form-item>
      <el-form-item label="参展企业E-mail：" prop="email">
        {{ this.form.email }}
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tranVal: true
    };
  },
  props: {
    // 传对象
    form: {
      type: Object,
      default: () => {}
    },
    // 传客户数组
    data: {
      type: Array,
      default: () => {}
    },
    // 传邮件数组
    maildata: {
      type: Array,
      default: () => {}
    }
  }
};
</script>
