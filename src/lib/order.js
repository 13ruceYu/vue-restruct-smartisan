import api from './api';

export function createOrder(detail, user_id) {
  let order = { product_list: detail };
  order.sum = orderSum(order.product_list);
  order.user_id = user_id;
  console.log(order);

  return api("order/create", order).then((r) => r);
}
export function orderSum(product_list) {
  let sum = 0;

  product_list.forEach((p) => {
    sum += p.product_snapshot.price * p.count;
  });

  return sum;
}