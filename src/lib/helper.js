export function fileUrl(fileData) {
  return "https://" + fileData._base_url + "/" + fileData._key;
}

export function orderSum(product_list) {
  let sum = 0;

  product_list.forEach((p) => {
    sum += p.product_snapshot.price * p.count;
  });

  return sum;
}

export function obj2Arr(obj) {
  let arr = [];

  for (let key in obj) {
    arr.push(obj[key]);
  }

  return arr;
}
