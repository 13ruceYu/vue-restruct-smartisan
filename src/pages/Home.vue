<template>
  <div>
    <div class="container">
      <div class="banner-slider wrapper-box">
        <el-carousel height="480px">
          <el-carousel-item v-for="(item,index) in list_carousel" :key="index">
            <router-link :to="`/product/${item.id}`"><img :src="item.carousel_img"></router-link>
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-row class="prom-area wrapper-box" :gutter="1">
        <el-col :span="6" class="prom-box" v-for="(item, index) in list_top_banner" :key="index">
          <img :src="item.top_banner_img" alt />
          <a href="#"></a>
        </el-col>
      </el-row>
      <el-row class="hot-sale-area wrapper-box">
        <div class="title">热门商品</div>
        <el-row class="box-container">
          <el-col
            :span="6"
            class="product-box text-center"
            v-for="(item, index) in list_hot"
            :key="index"
          >
            <router-link :to="`/product/${item.id}`">
              <div class="thumbnail">
                <img :src="fileUrl(item.main_img[0])" alt />
              </div>
              <div class="name">{{item.title}}</div>
              <div class="desc"></div>
              <div class="opt"></div>
              <div class="price">
                <span class="now cny">{{item.price}}</span>
                <span class="before cny">199.00</span>
              </div>
            </router-link>
          </el-col>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
import prom from "../img/prom-1.webp";
import product from "../img/product-1.webp";
import api from "../lib/api";
import { fileUrl } from "../lib/helper";
export default {
  mounted() {
    this.read('hot');
    this.read('carousel'),
    this.read('top_banner')
  },
  data() {
    return {
      prom,
      product,
      list_hot: [],
      list_carousel:[],
      list_top_banner:[]
    };
  },
  methods: {
    fileUrl,
    read(type) {
      api("product/read", { where: { and: { ["is_" + type]: true } } }).then(
        r => {
          if (r.success) this["list_" + type] = r.data || [];
        }
      );
    }
  }
};
</script>
<style>
.banner-slider {
  margin-top: 3em;
  margin-bottom: 2em;
}

.banner-slider img {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.prom-box {
  position: relative;
}

.prom-box a {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.hot-sale-area {
  margin-top: 2em;
  margin-bottom: 2em;
}

.hot-sale-area .title {
  background: #fafafa;
  padding: 1em;
  font-weight: bold;
  font-size: 1.2em;
  color: #666;
}

.product-box {
  background: #fff;
  border-right: 1px solid #ddd;
  border-top: 1px solid #ddd;
  padding-top: 1em;
  padding-bottom: 2em;
}

.prom-box a:hover,
.product-box:hover {
  -webkit-box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.06);
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.15s ease-out, -webkit-box-shadow 0.15s ease-out;
}

.product-box .thumbnail {
  padding: 0.5em 1.6em;
}

.product-box .name {
  font-size: 0.9em;
  font-weight: bold;
  margin: 0.6em 0;
}

.product-box .desc {
  font-size: 0.7em;
  color: #999;
  margin: 1em 0;
}

.product-box .price .now {
  font-weight: 1000;
  font-size: 1.2em;
  color: #d44d44;
}

.product-box .price .before {
  font-size: 0.7em;
  color: #aaa;
  text-decoration: line-through;
  margin-left: 1em;
}
</style>