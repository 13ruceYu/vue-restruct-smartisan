<template>
  <div class="my-cart">
    <section class="header">
      <span>购物清单</span>
    </section>
    <section class="content">
      <el-row>
        <el-col class="select" :span="1">1</el-col>
        <el-col class="thumbnail" :span="2">1</el-col>
        <el-col class="text" :span="10">1</el-col>
        <el-col class="price" :span="2">1</el-col>
        <el-col class="count" :span="4">1</el-col>
        <el-col class="total" :span="3">1</el-col>
        <el-col class="del" :span="2">1</el-col>
      </el-row>
    </section>
  </div>
</template>

<script>

export default {
  name: 'my-cart',
  components: {},
  data () {
    return {

    }
  },
  mounted() {
    
  },
  methods: {

  }
}
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
</style>
