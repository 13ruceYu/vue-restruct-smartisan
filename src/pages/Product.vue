<template>
  <div class="product">
    <div class="container">
      <div class="wrapper-box product-card">
        <el-row>
          <el-col :span="2" class="main-cover-thumbnail-container">
            <div
              class="main-cover-thumbnail"
              v-for="(img, index) in row.main_img"
              :key="index"
            >
              <img :src="fileUrl(img)" alt @click="mainCoverChange(index)" />
            </div>
          </el-col>
          <el-col :span="8" class="main-cover-show">
            <img :src="currentCover" alt />
          </el-col>
          <el-col :span="14" class="product-info">
            <div class="title">
              <h1>{{ row.title }}</h1>
              <div class="price">
                <div class="now cny">{{ row.price }}</div>
                <div class="before">原价：￥199.00</div>
              </div>
            </div>
            <!-- <div class="desc">智能配对 开盖即连</div> -->
            <section
              class="choose"
              v-for="(item, name, index) in row.prop"
              :key="index"
            >
              <span class="spec-title">{{ name }}</span>
              <span
                :class="index === 0 ? 'active' : ''"
                @click="setProp(name, prop)"
                v-for="(prop, index) in item"
                :key="index"
                class="prop-item"
                >{{ prop }}</span
              >
            </section>
            <section class="number">
              <span class="spec-title">数量选择</span>
              <el-input-number
                v-model="form.count"
                :min="1"
                :max="10"
                label="描述文字"
              ></el-input-number>
            </section>
            <section class="buy-cart">
              <el-button type="primary" @click="createOrder"
                >现在购买</el-button
              >
              <el-button @click="cartService.change(row.id, form.count, row)"
                >加入购物车</el-button
              >
            </section>
          </el-col>
        </el-row>
      </div>
      <div class="wrapper-box product-detail-card">
        <div class="title">产品信息</div>
        <div class="content">
          <div v-for="(item, index) in row.detail" :key="index">
            <div v-if="item.type === 'text'">{{ item.value }}</div>
            <div v-else>
              <img :src="fileUrl(item.value)" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../lib/api";
import session from "../lib/session";
import { fileUrl, orderSum } from "../lib/helper";
import cartService from "../service/cart";
export default {
  mounted() {
    this.row.id = this.$route.params.id;
    this.find();
  },
  data() {
    return {
      cartService,
      row: {}, // 从后端拿到的当前页数据
      currentCover: "",
      form: { // 用户造作表单数据
        count: 1,
        prop: {},
      },
    };
  },
  methods: {
    fileUrl,
    find() {
      api("product/find", this.row).then((r) => {
        this.row = r.data;
        this.normalize();
        // 设置默认购买选项如尺码和颜色

      });
    },
    normalize() {
      let p = this.row.prop;
      let betterProp = {};
      for (let key in p) {
        let option = p[key];
        betterProp[key] = option.split("|");
      }
      this.row.prop = betterProp;
      this.currentCover = fileUrl(this.row.main_img[0]);
      // 设定默认选择
      for(let key in this.row.prop) {
        this.setProp(key, this.row.prop[key][0])
      }
    },
    mainCoverChange(index) {
      this.currentCover = fileUrl(this.row.main_img[index]);
    },
    setProp(name, prop) {
      this.$set(this.form.prop, name, prop);
    },
    createOrder() {
      // 草，下次用这种简写能不能注释啊傻逼
      let p = this.row;
      let f = this.form;

      f.product_id = p.id;
      f.product_snapshot = p;

      let order = { product_list: [f] };
      order.sum = orderSum(order.product_list);

      if (!session.user().id) {
        this.$notify.info({
          title: 'Info',
          message: '尚未登录，请登录后购买'
        });
        return;
      }
      order.user_id = session.user().id;

      if (!this.form.count && this.form.count < 1) {
        this.$notify.info({
          title: 'Info',
          message: '请选择数量'
        });
        return;
      }

      api("order/create", order).then((r) => {
        if (r.success) {
          this.$router.push(`/my/order/${r.data.id}`);
        }
      });
    },
    allPropsChecked() {
      let p = this.row.prop;
      for (let key in p) {
        if (!this.form.prop[key]) {
          return false;
        }
        return true;
      }
    },
  },
};
</script>
<style scoped>
.product {
  margin-top: 1em;
}

.product h1 {
  margin-top: 0;
}

.product-card {
  padding: 3em;
}

.product-info {
  padding-left: 1em;
  font-size: 0.9em;
}

.product-info section {
  line-height: 6em;
  border-bottom: 1px solid #ddd;
}

.product-info section .spec-title {
  margin-right: 2em;
}

.title {
  position: relative;
}

.price {
  position: absolute;
  top: 2em;
  right: 2em;
}

.price .now {
  color: #d44d44;
  font-weight: bold;
  font-size: 1.7em;
}

.price .before {
  font-size: 0.9em;
  color: #888;
  text-decoration: line-through;
  text-decoration-color: #d44d44;
}

.desc {
  border-bottom: 1px solid #ddd;
  padding-bottom: 2em;
}

.prop-item {
  padding: 0.4em;
  border: 2px solid #ddd;
  margin: 0.2em;
}

.prop-item.active {
  border-color: #d44d44;
}

.prop-item:hover {
  cursor: pointer;
}

.main-cover-thumbnail {
  border: 3px solid #ddd;
  margin: 0.5em;
  border-radius: 5px;
  overflow: hidden;
}

.main-cover-thumbnail:hover {
  cursor: pointer;
}

.main-cover-show {
  padding: 1em;
}

.main-cover-thumbnail-container {
  margin-top: 2em;
}

.product-detail-card .title {
  padding: 1em;
  border-bottom: 1px solid #ddd;
  background: #f6f6f6;
  font-size: 1.2em;
}
</style>
