
<template>
  <div></div>
</template>

<script>
export default {
  name: "Logout",
  data() {
    return {
      loginUrl: process.env.SSO_BASE_URL,
      IASID: process.env.IASID
    };
  },
  created() {
    let url = location.href;
    location.href 
    = this.loginUrl 
    + "/logout?type=0&IASID="
    + this.IASID 
    + "&ReturnUrl="
    + url;
  }
};
</script>

<style>
</style>
