<style lang="less" scoped>
  .formBox {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    .emailPass{
      width: 20%;
      line-height:30px;
      .emailErr{
        font-size: 14px;
        color: #999;
        a {
          color: orange;
          cursor: pointer;
          text-decoration: none;
        }
      }
    }
  }
</style>

<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="修改邮箱" name="first">
         <div class="formBox">
          <div class="emailPass">
            我们已向您的注册邮箱发送了一封密码找回邮件 请您注意接收邮件
            <el-button style="width: 100%;height:40px;margin:20px 0;" type="primary">去邮箱接收邮件</el-button>
            <span class="emailErr">请注意查收邮件，并按照邮件中的提示操作,完成安全认证。
            没有收到？<a @click="sendEmail">重新发送</a>
            </span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    name: "getEmail",
    data() {
      return {
        activeName: "first"
      };
    }
  };
</script>

