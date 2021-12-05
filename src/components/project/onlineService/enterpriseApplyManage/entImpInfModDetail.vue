<style scoped>
  .dialog-form {
    width: 50%;
  }
</style>
<template>
  <el-dialog :visible="dialogFormVisible" :title="detailInfo.label" @close="closeDialog">
    <el-form class="dialog-form" :inline="true" >
      <el-form-item label="修改前：">
        <span>{{ detailInfo.oldContent }}</span>
      </el-form-item>
      <el-form-item label="修改后：">
        <span>{{ detailInfo.newContent }}</span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    detailInfo: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close-ent-imp-inf-mod-detail');
    }
  }
};
</script>
