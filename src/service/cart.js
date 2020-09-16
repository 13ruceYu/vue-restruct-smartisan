import session from "../lib/session";
import store from "../lib/store";

let localCart = {
  1: {
    count: 1
  },
  2: {
    count: 1
  }
}

export default {
  change(product_id, count, product) {
    if (!localCart[ product_id ]) {
      localCart [ product_id ] = { count, product }
    }

    localCart[ product_id ].count += count;
    console.log(localCart);
    this.sync()
  },
  clear(product_id) {
    delete localCart[product_id];
  },
  get() {
    return localCart;
  },
  sync() {
    if (session.loggedIn()) {
      this.syncCloud();
    }

    this.syncLocal();
  },
  syncLocal() {
    store.set('cart', localCart)
  },
  syncCloud() {
    // api()
  }
}