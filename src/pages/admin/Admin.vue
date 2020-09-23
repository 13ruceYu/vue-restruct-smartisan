<template>
  <div class="admin">
    <el-row class="container">
      <h1>管理页</h1>
      <el-col :span="4">
        <div class="wrapper-box text-center nav-cat">
          <div class="link-group-v">
            <router-link to="/admin/user">用户管理</router-link>
            <router-link to="/admin/brand">品牌管理</router-link>
            <router-link to="/admin/cat">分类管理</router-link>
            <router-link to="/admin/product">商品管理</router-link>
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
export default {};
</script>

<style scoped>
.admin {
  margin-bottom: 1em;
}

.admin .link-group-v a {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #ddd;
  color: #666;
}

.nav-cat {
  margin-right: 1em;
}
</style>