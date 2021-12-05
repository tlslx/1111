<template>
  <seat-progress-sum v-if="currentActive === 'progressSum'" @tabClick='handleClick'></seat-progress-sum>
  <seat-num-sum v-else @tabClick='handleClick'></seat-num-sum>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'ruleTabs',
  mixins: [listPageBase],
  components: {
    'seatNumSum': () => import('../seatNumSum/index.vue'),
    'seatProgressSum': () => import('./components/seatProgressSum.vue')
  },
  data () {
    return {
      'pageId': 'seatProgressSum',
      'currentActive': 'progressSum'
    };
  },
  methods: {
    //tab点击
    handleClick(tab) {
      this.currentActive = tab.name;
    }
  }
};
</script>
