import session from "../lib/session";
import store from "../lib/store";

let localCart = {};

let callbackPool = [];

const output = {
  onChange(fn) {
    if (callbackPool.find((it) => it === fn)) {
      return;
    }
    callbackPool.push(fn);
  },

  change(product_id, count, product_snapshot, prop) {
    if (!localCart[product_id]) {
      localCart[product_id] = { product_id, count: 0, product_snapshot, prop };
    }
    localCart[product_id].count += count;
    this.sync();
    this.callPool();
  },
  callPool() {
    callbackPool.forEach((fn) => fn(localCart));
  },
  clear(product_id) {
    delete localCart[product_id];
    this.sync();
    this.callPool();
  },
  get() {
    return localCart;
  },
  restore() {
    this.restoreLocal();
  },
  restoreLocal() {
    localCart = store.get("cart") || {};
  },
  sync() {
    if (session.loggedIn()) {
      this.syncCloud();
    }
    this.syncLocal();
  },
  syncLocal() {
    store.set("cart", localCart);
  },
  syncCloud() {
    // api()
  },
};

init();

function init() {
  output.restore();
}

export default output;
