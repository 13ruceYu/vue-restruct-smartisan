<template>
  <div class="admin">
    <el-row class="container">
      <el-col :span="4">
        <div class="wrapper-box text-center nav-cat">
          <div class="link-group-v">
            <div class="profile">
              <div
                class="avatar-container"
                :style="'backgroundImage: url(' + user.avatar + ')'"
              ></div>
              <div class="nickname">{{ user.nickname }}</div>
            </div>
            <router-link to="/my/order">我的订单</router-link>
            <router-link to="/my/cart">购物车</router-link>
            <router-link to="/my/setting">账户资料</router-link>
            <router-link to="/my/address">收货地址</router-link>
          </div>
        </div>
      </el-col>
      <el-col :span="20" class="admin-view">
        <div class="wrapper-box">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import session from "../../lib/session";
export default {
  mounted() {
    let currentUser = session.user();
    if (!currentUser) {
      this.$router.push("/login");
      return;
    }
    this.user = currentUser;
  },
  data() {
    return {
      user: {},
    };
  },
};
</script>

<style scoped>
.admin {
  margin-bottom: 1em;
}

.admin .link-group-v a {
  padding-top: 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid #ddd;
  color: #666;
  font-size: 0.9em;
}

.admin .link-group-v a.router-link-active {
  background: #8da6eb;
  color: #fff;
}

.nav-cat {
  margin-right: 1em;
}

.avatar-container {
  width: 130px;
  height: 130px;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 1.5em auto 1em auto;
}

.profile .nickname {
  font-size: 1.2em;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  color: #666;
  padding-bottom: .5em;
}
</style>
