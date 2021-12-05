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
    <el-tabs v-model="activeName">
      <el-tab-pane label="修改邮箱" name="first">
         <div class="formBox">
          <div class="emailPass">
            我们已向您的注册邮箱发送了一封密码找回邮件 请您注意接收邮件
            <el-button style="width: 100%;height:40px;margin:20px 0;" type="primary" @click="jump">去邮箱接收邮件</el-button>
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
    },
    methods: {
      jump() {
        let uurl = this.$route.query.email;
        uurl = this.gotoEmail(uurl);
        if (uurl) {
          window.open("http://" + uurl);
        } else {
          kindo.util.alert('未找到对应的邮箱登录地址', '提示', "warning");
        }
      },
      gotoEmail(mail) {
        let tm = mail.split('@')[1];
        tm = tm.toLowerCase();
        if (tm === '163.com') {
          return 'mail.163.com';
        } else if (tm === 'vip.163.com') {
          return 'vip.163.com';
        } else if (tm === '126.com') {
          return 'mail.126.com';
        } else if (tm === 'qq.com' || tm === 'vip.qq.com' || tm === 'foxmail.com') {
          return 'mail.qq.com';
        } else if (tm === 'gmail.com') {
          return 'mail.google.com';
        } else if (tm === 'sohu.com') {
          return 'mail.sohu.com';
        } else if (tm === 'tom.com') {
          return 'mail.tom.com';
        } else if (tm === 'vip.sina.com') {
          return 'vip.sina.com';
        } else if (tm === 'sina.com.cn' || tm === 'sina.com') {
          return 'mail.sina.com.cn';
        } else if (tm === 'tom.com') {
          return 'mail.tom.com';
        } else if (tm === 'yahoo.com.cn' || tm === 'yahoo.cn') {
          return 'mail.cn.yahoo.com';
        } else if (tm === 'tom.com') {
          return 'mail.tom.com';
        } else if (tm === 'yeah.net') {
          return 'www.yeah.net';
        } else if (tm === '21cn.com') {
          return 'mail.21cn.com';
        } else if (tm === 'hotmail.com') {
          return 'www.hotmail.com';
        } else if (tm === 'sogou.com') {
          return 'mail.sogou.com';
        } else if (tm === '188.com') {
          return 'www.188.com';
        } else if (tm === '139.com') {
          return 'mail.10086.cn';
        } else if (tm === '189.cn') {
          return 'webmail15.189.cn/webmail';
        } else if (tm === 'wo.com.cn') {
          return 'mail.wo.com.cn/smsmail';
        } else if (tm === '139.com') {
          return 'mail.10086.cn';
        } else {
          return '';
        }
      },
      sendEmail() {
        this.$router.push('/reviseEmail');
      }
    }
  };
</script>

