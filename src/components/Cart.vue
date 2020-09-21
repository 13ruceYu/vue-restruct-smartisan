<template>
  <div id="cart">
    {{giao}}
    <h1>cart</h1>
    <div class="list-product">
      <el-row
        v-for="(item, k, index) in listCart"
        :key="index"
        class="list-item"
      >
        <el-col :span="12" class="product-name">{{ k }}</el-col>
        <el-col :span="8" class="product-count">{{ item.count }}</el-col>
        <el-col :span="4">
          <button @click="cartService.change(k, 1, product)" type="button">
            +
          </button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import cartService from "../service/cart";
export default {
  name: "Cart",
  mounted() {
    this.listCart = this.cartService.get();
    cartService.onChange((localCart) => {
      this.listCart = localCart;
    });
  },
  data() {
    return {
      listCart: {},
      giao: '',
      cartService,
    };
  },
  methods: {},
};
</script>
<style scoped>
#cart {
  position: absolute;
  margin-top: 3em;
  z-index: 999;
  width: 400px;
  border: solid;
  right: 0;
  top: 0;
  background: #fff;
  text-align-last: left;
  color: #333;
  padding: 0.5em;
}

.list-item {
  border: solid #999;
  line-height: 20px;
  margin-bottom: 0.5em;
}
</style>
