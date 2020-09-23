<template>
  <div class="my-setting">
    <section class="header">
      <span>账户资料</span>
    </section>
    <section class="content">
      <div class="content-item avatar">
        <el-row>
          <el-col :span="3">
            <div
              class="avatar-container"
              :style="'backgroundImage: url(' + user.avatar + ')'"
            ></div>
          </el-col>
          <el-col :span="4" class="avatar-opt">
            <div class="desc">修改头像</div>
            <Uploader
              @uploadSuccess="avatarUploaded"
              :autoUpload="true"
            ></Uploader>
          </el-col>
        </el-row>
      </div>
      <div class="content-item">
        <div class="title">
          <i
            class="el-icon-success"
            style="color: #62bd2e; font-size: 1.4em"
          ></i>
          <span class="item-key">账户昵称：</span>
          <span class="item-value">{{ user.nickname }}</span>
          <el-button plain size="mini">修改</el-button>
        </div>
      </div>
      <div class="content-item">
        <div class="title">
          <i
            class="el-icon-success"
            style="color: #62bd2e; font-size: 1.4em"
          ></i>
          <span class="item-key">手机验证：</span>
          <span class="item-value">{{ user.phone }}</span>
          <el-button plain size="mini">修改</el-button>
        </div>
      </div>
      <div class="content-item">
        <div class="title">
          <i
            class="el-icon-success"
            style="color: #62bd2e; font-size: 1.4em"
          ></i>
          <span class="item-key">登录密码：</span>
          <span class="item-value">******</span>
          <el-button plain size="mini">修改</el-button>
        </div>
      </div>
      <div class="content-item">
        <div class="title">
          <i
            class="el-icon-success"
            style="color: #62bd2e; font-size: 1.4em"
          ></i>
          <span class="item-key">邮箱验证：</span>
          <span class="item-value">{{ user.mail }}</span>
          <el-button plain size="mini">修改</el-button>
        </div>
      </div>
      <div class="content-item">
        <div class="title">
          <i
            class="el-icon-success"
            style="color: #62bd2e; font-size: 1.4em"
          ></i>
          <span class="item-key">安全问题：</span>
          <span class="item-value">尚未设置安全问题</span>
          <el-button plain size="mini">修改</el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "../../lib/api";
import session from "../../lib/session";
import Uploader from "../../components/Uploader";
import { fileUrl } from "../../lib/helper";
export default {
  name: "my-setting",
  components: { Uploader },
  mounted() {
    api("user/find", { id: session.user().id }).then((r) => {
      if (r.success) {
        this.user = r.data;
      } else {
        this.$router.push("/login");
      }
    });
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    avatarUploaded(data) {
      this.user.avatar = fileUrl(data);
      api("user/update", this.user).then((r) => {
        if (r.success) {
          this.user = r.data;
        }
      });
    },
  },
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid #ddd;
  padding: 1rem 0 1rem 1rem;
  font-size: 18px;
  color: #646464;
  background: #f9f9f9;
}

.content {
  padding: 0 2em 2em 2em;
}

.content-item {
  border-bottom: 1px solid #ddd;
  padding: 1.5em 0;
}

.content-item .title > * {
  vertical-align: middle;
}

.content-item .title i {
  margin-right: 0.5em;
}

.content-item button {
  float: right;
  font-size: small;
  color: #999;
}

.item-value {
  color: #999;
  font-size: .9em;
}

.avatar-container {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.avatar-opt {
  margin-top: 1em;
}
</style>
