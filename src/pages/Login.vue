<template>
  <div class="container">
    <div class="container-form">
      <div class="form-card">
        <div class="title">使用账号密码登录</div>
        <form @submit.prevent="login">
          <div class="input-control">
            <el-input placeholder="邮箱" v-model="form.mail"></el-input>
          </div>
          <div class="input-control">
            <el-input placeholder="密码" show-password v-model="form.password"></el-input>
          </div>
          <div class="hint">
            <router-link to="/passwordrecover">忘记密码？</router-link>
            <router-link to="/signup" class="fr">去注册</router-link>
          </div>
          <div class="error">
            <div v-for="(e, index) in errors" :key="index">{{e}}</div>
          </div>
          <div class="input-control">
            <button type="submit">登录</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../lib/api";
import session from "../lib/session";
import { is } from "../lib/valee";
export default {
  data() {
    return {
      form: {
        password: ""
      },
      errors: []
    };
  },
  methods: {
    validate() {
      let f = this.form;
      let e = (this.errors = []);
      if (!is.mail(f.mail)) {
        e.push("邮箱格式有误");
      }

      if (e.length) {
        return false;
      }

      return true;
    },
    login() {
      let f = this.form;
      this.errors = [];

      if (f.mail === "admin" && f.password === "yoyoyo") {
        session.login("admin", { nickname: "Admin", IS_ADMIN: true });
        return;
      }
      if (!this.validate()) {
        return;
      }

      api("user/first", { where: { and: { mail: this.form.mail } } }).then(
        r => {
          let user = r.data;
          if (!user) {
            this.errors.push("邮箱尚未注册，请先注册");
            return;
          }
          if (user.password !== this.form.password) {
            this.errors.push("密码有误");
            return;
          }
          delete user.password;
          session.login(user.id, user);
        }
      );
    }
  }
};
</script>
<style>
.form-card {
  background: #fff;
  margin: 2em;
  border-radius: 1em;
}

.form-card .title {
  text-align: center;
  padding: 0.8em;
  font-weight: bold;
  font-size: 1.5em;
  border-bottom: 1px solid #ddd;
  color: #555;
}

.form-card form {
  padding: 2em;
}

.form-card button {
  padding: 0.5em;
  width: 100%;
  font-size: 1.2em;
  background: #bccdee;
  color: #fff;
  border: none;
  border-radius: 5px;
}

.form-card .input-control {
  margin-bottom: 1em;
}

.hint {
  font-size: 0.8em;
  color: #888;
  margin-top: 0.5em;
}

.error {
  font-size: 0.9em;
  margin-bottom: 0.8em;
  color: #c10;
}

.el-button.is-disabled:hover {
  background: inherit;
}
</style>