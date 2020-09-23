<template>
  <div id="cart">
    <el-card>
      <div slot="header" class="clearfix">
        <span>购物车</span>
        <el-button @click="$emit('close')" style="float: right; padding: 3px 0; color: #ccc" type="text"
          >关闭</el-button
        >
      </div>
      <div class="list-product">
        <el-row
          v-for="(item, k, index) in listCart"
          :key="index"
          class="list-item"
        >
          <el-col :span="6" class="product-thumb">
            <img :src="fileUrl(item.product.main_img[0])" alt="cart-thumbnail">
          </el-col>
          <el-col :span="14" class="product-desc">
            <div class="product-desc-title">
              <router-link target="_blank" :to="'/product/' + item.product.id" style="line-height: 0">{{item.product.title}}</router-link>
            </div>
            <div class="product-desc-prop">
              <span v-for="(prop, index) in item.product.prop" :key="index">{{prop[0]}}</span>
            </div>
            <div class="product-desc-price">
              <span class="cny price">
                {{item.product.price}}
              </span>
              <span class="count">
                x {{item.count}}
              </span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="delete-prod" style="float: right; margin-top: 2em">
              <el-button icon="el-icon-close" circle size="mini" @click="cartService.clear(item.product.id)"></el-button>
            </div>
          </el-col>
        </el-row>
        <div class="cart-total" style="margin-top: 1.5em">
          <div class="total-price">
            <el-button type="primary" style="float: right"><router-link to="/my/cart" style="line-height: 0; margin-right: 0">去购物车</router-link></el-button>
            <div class="product-count">
              共件 {{productSum}} 商品
            </div>
            <div class="price-count">
              合计：<span class="cny">{{priceSum}}</span>
            </div>
          </div>
          <div class="settle">
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import cartService from "../service/cart";
import { fileUrl } from "../lib/helper";
export default {
  name: "Cart",
  mounted() {
    this.listCart = this.cartService.get();
    cartService.onChange((localCart) => {
      // 计算购物车总件数和总价
      this.productSum = 0;
      for(let key in localCart) {
        this.productSum += localCart[key].count;
      }
      let priceTotal = 0;
      for(let key in localCart) {
        let product = localCart[key];
        let priceSum = product.count * product.product.price;
        priceTotal += priceSum;
      }
      this.priceSum = priceTotal;
      this.listCart = localCart;
    });
  },
  data() {
    return {
      listCart: {},
      cartService,
      productSum: 0,
      priceSum: 0
    };
  },
  methods: {
    fileUrl,
  },
};
</script>
<style scoped>
#cart {
  position: absolute;
  margin-top: 3em;
  z-index: 999;
  width: 400px;
  right: 0;
  top: 0;
  text-align-last: left;
  padding: 0.5em;
}

.list-item {
  margin-bottom: 1em;
  border-bottom: 1px solid #eee;
  padding-bottom: .5em;
}

.product-desc {
  padding-left: 1em;
}

.product-desc-title {
  font-weight: bold;
}

.product-desc-prop {
  margin: .6em 0;
}

.product-desc-prop span {
  color: #999;
  margin-right: 1em;
}

.product-desc-price .price {
  font-weight: bold;
  color: #c10;
  font-size: 1.1em;
}

.product-desc-price .count {
  color: #ccc;
  margin-left: 1em;
}

.cart-total .product-count {
  color: #ccc;
  font-size: .85em;
  margin-bottom: .2em;
}

.cart-total .price-count {
  color: #999;
  font-weight: 400;
}

.cart-total .price-count .cny {
  font-weight: bold;
  color: #c10;
  font-size: 1.2em;
}

</style>
