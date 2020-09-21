<template>
  <div class="nav-page">
    <el-row class="container">
      <el-col :span="18" class="ling-group">
        <router-link to="/">首页</router-link>
        <a href="#">手机</a>
        <a href="#">官方配件</a>
        <a href="#">服饰箱包</a>
        <a href="#">畅呼吸</a>
        <a href="#">好物精选</a>
      </el-col>
      <el-col :span="6" class="search text-right">
        <el-input prefix-icon="el-icon-search" size='medium'></el-input>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>

<style>
.nav-page {
  background: #fff;
  line-height: 5em;
  font-size: 0.9em;
  color: #777;
}

.nav-page a {
  margin-right: 2em;
}

.nav-page input {
  border-radius: 1.4em;
  border: 1px solid #ddd;
  outline: none;
  padding: 0.5em;
  padding-left: 1em;
}
</style>