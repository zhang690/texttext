// 给球添加数量
let forNum = function(arr, num) {
  for (let index = 1; index < num; index++) {
    if (index < 10) {
      index = "0" + index;
    }
    arr.push({
      isActive: false,
      num: index
    });
  }
}
module.exports = {
  forNum
}