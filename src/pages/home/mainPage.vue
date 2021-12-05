<style scoped>
  .main-page {
    overflow: hidden;
  }
</style>

<template>
  <div>
    <!-- <div v-if="kindo.config.theme !== 'red'" id="calendar" style="float:right;width:260px;padding: 11px 5px 5px 5px;">
      <calendar />
    </div> -->
    <div class="main-page">
      <onlineServiceHomePage v-if="userType === 'qy'"></onlineServiceHomePage>
      <innerHomePage v-else-if="orgType === '5'||orgType === '7'||orgType === '30'"/>
      <div v-else id="calendar" style="float:right;width:260px;padding: 11px 5px 5px 5px;">
        <calendar />
      </div>
    </div>
  </div>
</template>

<script>
  import onlineServiceHomePage from '@/pages/home/onlineService/homePage.vue';
  import innerHomePage from '@/pages/home/innerService/homePage.vue';
  import calendar from "@/components/project/plugins/calendar.vue";
  export default {
    name: 'app',
    data() {
      return {
        userType: '',
        orgType: '',
        usersource: ''
      };
    },
    created() {
      // console.log(this.$store.state.userInfo.data.source);
      this.userType = this.$store.state.userInfo.userType;
      this.orgType = this.$store.getters.userInfo.org.deptType;
      this.usersource = this.$store.state.userInfo.data.source;
    },
    methods: {
    },
    components: {
      innerHomePage,
      onlineServiceHomePage,
      calendar
    }
  };

</script>
