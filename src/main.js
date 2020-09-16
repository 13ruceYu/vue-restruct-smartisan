import Vue from 'vue'
import VueRouter from "vue-router"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import session from "./lib/session";

Vue.use(VueRouter)
Vue.use(ElementUI)

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Product from "./pages/Product";
import PasswordRecover from "./pages/PasswordRecover";
import My from "./pages/my/My";
import MyOrder from "./pages/my/MyOrder";
import Admin from "./pages/admin/Admin";
import AdminUser from "./pages/admin/AdminUser";
import AdminBrand from "./pages/admin/AdminBrand";
import AdminCat from "./pages/admin/AdminCat";
import AdminProduct from "./pages/admin/AdminProduct";


const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/product/:id',
      component: Product
    },
    {
      path: '/passwordrecover',
      component: PasswordRecover
    },
    {
      path:'/my',
      component: My,
      children:[
        {
          path:'order/:id?',
          component: MyOrder
        }
      ]
    },
    {
      path: '/admin',
      component: Admin,
      children:[
        {
          path:'user',
          component: AdminUser
        },
        {
          path:'brand',
          component: AdminBrand
        },
        {
          path:'cat',
          component: AdminCat
        },
        {
          path:'product',
          component: AdminProduct
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  let toAdmin = to.matched[0].path == '/admin';
  let isAdmin = session.isAdmin();

  if (toAdmin && !isAdmin) {
    return;
  }

  next();
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
