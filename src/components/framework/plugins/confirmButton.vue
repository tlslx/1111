<template>
  <el-button
    :size="size"
    :type="buttonType"
    @click="handleClick"><slot>删除</slot></el-button>
</template>

<script>
import { MessageBox } from 'element-ui';
export default {
  name: 'ConfirmButton',
  props: {
    size: {
      type: String,
      default: 'mini'
    },
    buttonType: {
      type: String,
      default: 'danger'
    },
    title: {
      type: String,
      default: '友情提示'
    },
    boxType: {
      type: String,
      default: 'warning'
    },
    message: {
      type: String,
      default: '此操作将永久删除, 是否继续?'
    },
    showCancelButton: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClick () {
      MessageBox({
        title: this.title,
        type: this.buttonType,
        message: this.message,
        showCancelButton: this.showCancelButton,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$emit('remove');
      }).catch(() => {
        this.$emit('cancle');
      });
    }
  }
};
</script>
