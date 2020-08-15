// 冒泡排序
// 1、比较相邻元素，如果第一个比第二个大，就交换位置
// 2、对每一组相邻的元素做相同的工作，最后的元素应该会是最大或者最小的值
// 3、针对所有的元素重复以上的步骤，除了最后一个
// 4、持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比比较
function bubble(arr){
  // 存储临时变量
  let temp;
  // 记录是否发生了置换， 0 表示没有发生置换，1表示发生了置换
  let isChange;
  // 记录执行了多少遍
  let num = 0;
  // 外层循环是排序的次数
  for (let i = 0; i < arr.length - 1; i++){
    // 每次比较完就重新初始化为0
    isChange = 0;
    // 内层循环是当前次数需要比较的次数
    for(let j = 0; j < arr.length - i - 1; j++){
      // 前一位与后一位比较，如果比后一个要大，交换值
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        // 发生置换了
        isChange = 1;
      }
    }
    // 如果比较成功后没有发生置换，说明已经排序成功，不需要往下执行
    if (!isChange){
      break;
    }
    num++;
  }
  console.log(num, arr)
}
bubble([1,9,3,8,5]);

