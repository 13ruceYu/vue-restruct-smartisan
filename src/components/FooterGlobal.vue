<template>
  <footer>
    <div class="container">
      <el-row class="web-links">
        <el-col :span="3">
          <div class="title">订单服务</div>
          <div class="link-group-v">
            <a href="#">购买指南</a>
            <a href="#">送货政策</a>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="title">订单服务</div>
          <div class="link-group-v">
            <a href="#">零售门店</a>
            <a href="#">自助服务</a>
            <a href="#">维修门店</a>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="title">媒体中心</div>
          <div class="link-group-v">
            <a href="#">新闻动态</a>
            <a href="#">官方视频</a>
            <a href="#">图片资料</a>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="title">关注我们</div>
          <div class="link-group-v">
            <a href="#">新浪微博</a>
            <a href="#">官方微信</a>
            <a href="#">荣誉奖项</a>
          </div>
        </el-col>
        <el-col :span="6" :offset="6" class="text-right">
          <div class="custom-phone">400 - 603 - 5000</div>
          <div class="support-time">
            周一到周日 9:00 - 18:00
            <br />（仅收市话费）
          </div>
          <div class="online-help">
            <button>在线帮助</button>
          </div>
        </el-col>
      </el-row>
      <div class="meta-info">
        <div class="copyright">
          <span>Copyright © 2020 smartisan.com 版权所有</span>
          <a href="#">锤子商城隐私政策</a>
          <a href="#">锤子商城用户协议</a>
          <a href="#">资质证照</a>
        </div>
        <div>京 ICP 备 19048576 号 - 1京公网安备 11010502039854号</div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style>
footer {
  background: #fafafa;
  font-size: 0.8em;
  padding-top: 5em;
  padding-bottom: 4em;
}

.web-links {
  border-bottom: 1px solid #ddd;
  padding-bottom: 5em;
  margin-bottom: 3em;
}

.link-group-v a {
  display: block;
}

footer .link-group-v a {
  margin-top: 1em;
  color: #888;
}

.custom-phone {
  font-size: 1.2rem;
  font-weight: bold;
  color: #5079d9;
}

.support-time {
  color: #888;
  margin-top: 1em;
  margin-bottom: 1em;
}

.meta-info {
  color: #888;
  font-size: 12px;
}

.copyright {
  line-height: 2em;
}

.copyright > * {
  padding-left: 1em;
  padding-right: 1em;
  border-left: 1px solid #ddd;
}

.copyright > *:first-child {
  padding-left: 0;
  border-left: none;
}



</style>