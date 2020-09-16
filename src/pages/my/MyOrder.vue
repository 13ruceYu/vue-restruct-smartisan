<template>
  <div class="my-order">
    <h2>我的订单</h2>
    <div v-if="$route.params.id" class="order-card">
      <div class="title">订单详情</div>
      <div class="pair">
        <div>订单号:</div>
        <div>{{form.id}}</div>
      </div>
      <div class="pair">
        <div>总价:</div>
        <div class="cny">{{form.sum}}</div>
      </div>
      <div class="pair">
        <div>付款方式:</div>
      </div>
    </div>
    <div class="table-user">
      <el-table :data="list" style="width: 100%" max-height="500">
        <el-table-column fixed prop="id" label="订单号"></el-table-column>
        <el-table-column fixed prop="sum" label="总价"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" type="text">
              <router-link :to="`/my/order/${scope.row.id}`">详情</router-link>
            </el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="pagination text-center">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="readParam.limit"
          :current-page="readParam.page"
          @current-change="flip"
        ></el-pagination>
      </div>-->
    </div>
  </div>
</template>

<script>
import session from "../../lib/session";
import api from "../../lib/api";
export default {
  mounted() {
    this.read(); // 拿到当前用户的订单信息
    this.form.id = this.$route.params.id;
    if (this.form.id) this.find();
  },
  data() {
    return {
      list: [], //用户的所有订单
      form: {} // 要被执行的订单
    };
  },
  methods: {
    // 得到用户所有订单信息
    read() {
      api("order/read", {
        where: { and: { user_id: session.user().id } }
      }).then(r => {
        this.list = r.data;
      });
    },
    // 拿到当前订单信息
    find() {
      api("order/find", { id: this.form.id }).then(r => {
        this.form = r.data;
        console.log(r.data);
      });
    }
  },
  watch: {
    '$route': {
      handler(n) {
        let params = n.params;
        if(params.id) {
          this.form.id = params.id;
          this.find();
        }
      },
      deep: true
    }
  },
};
</script>

<style scoped>
.my-order {
  padding: 1em;
}

.table-user {
  border: 1px solid #ccc;
  padding: 5px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(46, 61, 73, 0.08);
}
</style>
