<template>
  <h2 class="title"><span>{{ label }}</span></h2>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'headline',
  mixins: [listPageBase],
  props: {
    'label': {
      type: String,
      default: '标题'
    }
  }
};
</script>

<style scoped>
.title {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 59px;
  border-bottom: 1px solid #ebebeb;
}
.title span {
  position: relative;
  display: inline-block;
}
.title span::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 1px;
  background-color: #2b57a4;
}
</style>
