<template>
  <el-page>
    <template slot="body" slot-scope="scope">
      <div class="page-error">
        <div class="buttons">
          <el-button type="success" @click="backHome" icon="success">返回首页</el-button>
        </div>
      </div>
    </template>
  </el-page>
</template>

<script>
export default {
  name: 'Error',
  methods: {
    backHome () {
      this.$router.push('/');
    }
  }
};
</script>

<style>
.page-error {
  height: 268px;
  width: 100%;
  background: url('../../theme/framework/images/error.jpg') no-repeat center 0px;
  position: absolute;
  left: 0px;
  top: 70px;
}
.page-error .buttons {
  text-align: center;
  position: absolute;
  bottom: -50px;
  width: 150px;
  left: 50%;
  margin-left: -75px;
}
</style>

