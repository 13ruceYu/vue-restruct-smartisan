<template>
  <nav>
    <el-row>
      <el-col :span="4" id="logo">
        <router-link to="/">锤</router-link>
      </el-col>
      <el-col :span="16" class="link-group text-center">
        <router-link to="/">在线商城</router-link>
        <a href="#">坚果Pro3</a>
        <a href="#">坚果Pro2S</a>
        <a href="#">坚果TNT工作站</a>
        <a href="#">Smartisan OS</a>
        <a href="#">论坛</a>
      </el-col>
      <el-col :span="4" class="text-right auth">
        <span v-if="user">
          <router-link :to="user.IS_ADMIN ? '/admin' : '/me'">{{user.nickname || user.mail}}</router-link>
          <a href="#" @click="session.logout()">登出</a>
        </span>
        <span v-else>
          <router-link to="/login">登录/注册</router-link>
        </span>
        <Cart></Cart>
      </el-col>
    </el-row>
  </nav>
</template>
<script>
import session from "../lib/session";
import Cart from "./Cart";
export default {
  components: {Cart},
  mounted() {
    this.user = session.user();
  },
  data() {
    return {
      user: {},
      session
    };
  }
};
</script>
<style>
nav {
  background: #26272a;
  color: #bcbabd;
  font-size: 14px;
}

nav a {
  line-height: 3.5em;
  display: inline-block;
  font-size: 0.9em;
}

nav .link-group a {
  padding-left: 1.5em;
  padding-right: 1.5em;
}

nav .auth a {
  margin-right: .5em;
}
</style>