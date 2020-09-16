<template>
  <div class="container">
    <div class="container-form">
      <div class="form-card">
        <div class="title">邮箱验证码注册</div>
        <form @submit.prevent="signup">
          <div class="input-control">
            <el-input placeholder="邮箱" v-model="form.mail"></el-input>
          </div>
          <div class="input-control">
            <el-input placeholder="设置密码" show-password v-model="form.password"></el-input>
          </div>
          <div class="input-control">
            <el-input placeholder="验证码" class="input-with-select" v-model="currentCode">
              <el-button slot="append" @click="sendCode" :disabled="!!sendCodeCountDown">
                <span v-if="!sendCodeCountDown">获取验证码</span>
                <span v-else>{{sendCodeCountDown}}s</span>
              </el-button>
            </el-input>
          </div>
          <div class="hint">
            <!-- <span>未注册的邮箱验证后将自动注册</span> -->
            <router-link to="/login">已有账号，去登录</router-link>
          </div>
          <div class="error">
            <div v-for="(e, index) in errors" :key="index">{{e}}</div>
          </div>
          <div class="input-control">
            <button type="submit">注册</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../lib/api";
import { is } from "../lib/valee";
export default {
  data() {
    return {
      form: {
        password: ""
      },
      errors: [],
      currentCode: "",
      realCode: "",
      sendCodeCountDown: 0,
      sendCodeTimer: null
    };
  },
  methods: {
    signup() {
      if (this.currentCode !== this.realCode) {
        this.errors = [];
        this.errors.push("验证码有误");
        return;
      }
      api("user/create", this.form).then(r => {
        if (r.success) {
          this.$router.push("/login");
        }
      });
    },
    validate() {
      let f = this.form;
      let e = (this.errors = []);
      if (!is.mail(f.mail)) {
        e.push("邮箱格式有误");
      }

      if (f.password.length < 6) {
        e.push("密码长度不可小于6位");
      }

      if (e.length) {
        return false;
      }

      return true;
    },
    sendCode() {
      if (!this.validate()) {
        return;
      }
      api("captcha/mail", { mail: this.form.mail }).then(r => {
        if (r.success) {
          this.realCode = atob(r.data.result);
          this.sendCodeCountDown = 60;

          this.sendCodeTimer = setInterval(() => {
            this.sendCodeCountDown--;
            if (this.sendCodeCountDown == 0) {
              clearInterval(this.sendCodeTimer);
            }
          }, 1000);
        }
      });
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
  margin-bottom: 0.5em;
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