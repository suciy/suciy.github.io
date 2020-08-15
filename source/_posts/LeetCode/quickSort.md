# 快速排序
// 在数组中找一个元素作为基准，比它小的在左边，比它大的在右边  

// 代码实现要点：支点取中间，使用L和R表示数组的最小和最大位置，不断进行比较  

// 直到找到比支点小的数，随后交换，不断减小范围。递归L到支点前一个元素，递归支点后一个元素到R元素  
```
// 内存占用少  

function quickSort(arr, left, right) {
  /*
   * len为数组的长度;
   * left为需要数组中参与排序的起始点；right为数组中参与排序的终止点;
   * left如果有传数字那么就为left，没有传参则为0；
   * right如果有传参那么就为right，没有传参则为len-1;
   * 有传参可能会部分排序可能不会排序，没传参默认排序整个数组;
   * partitionIndex为分组界限;
   */
  var len = arr.length,
      partitionIndex,
      left = typeof left !== 'number' ? 0 : left,
      right = typeof right !== 'number' ? len - 1 : right;

  // 如果需要排序的起始索引小于终止索引则执行排序;递归的终止条件；
  if (left < right) {

    // partition的返回值作为partitionIndex来分隔数组；
    // 索引partitionIndex左边的元素均小于arr[partitionIndex]；
    // 右边的元素均大于arr[partitionIndex]；
    partitionIndex = partition(arr, left, right);

    // 数组中小于arr[partitionIndex]的部分(索引left到partitionIndex-1)再次使用quickSort排序；
    quickSort(arr, left, partitionIndex - 1);

    // 数组中大于arr[partitionIndex]的部分(索引partitionIndex+1到right)再次使用quickSort排序；
    quickSort(arr, partitionIndex + 1, right);
  }
  // 递归执行直到不满足left<right;返回本身；
  return arr;
}
function partition(arr, left, right) {
  /*
   * 这部分是具体实现排序的部分；
   * 将left赋值给pivot，作为参照物，因为left在最左边，只需要从左到右比较一遍即可判断整个数组；
   * index索引是arr中待交换位置；
   */
  var pivot = left,
      index = pivot + 1;
  // for循环从参照物arr[pivot]下一个元素arr[pivot+1]开始一直比较到子数组结束arr[right]；
  for (var i = index; i <= right; i++) {

  // 循环中如果有任何小于参照物的，就将他交换到index的位置，然后index向右移动到下一个位置；
    if (arr[i] < arr[pivot]) {
        swap(arr, i, index);
        index++;
    }
  }
  /*
   * 因为每次都是交换完后index移动到下一个位置，所以在循环结束时，index仍为待交换的位置；
   * 此时索引pivot+1到index-1的元素都小于参照物arr[pivot]；
   */

  // 交换pivot和index-1索引的值之后index-1索引左边全都是小于arr[index-1]的元素；
  swap(arr, pivot, index - 1);

  // 返回index-1作为拆分子数组的分界线；
  return index - 1;
}
/*
* 普通的交换，将a[i]和a[j]的数值交换；
*/
function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
// 内存占用多
function quickSort2(arr){
  /**
   * 创建len保存数组长度，每次获取数组长度都要实时查询不利于性能
   * index作为保存取到的中间值
   * privot保存比较参照物
   * left、right 作为子数组的容器
   */
  let len = arr.length,
      index,
      privot,
      left = [],
      right = [];
  // 如果数组长度只有一位，就直接返回数组，递归的终止条件
  if(len <= 1) return arr;
  // 获取中间值作为索引
  index = Math.floor(len / 2);
  // 使用splice截取中间值，第一个参数为截取的索引，第二个参数为截取的长度；
  privot = arr.splice(index, 1);
  len -= 1;
  // 小于arr[privot]的存到left数组，大于arr[privot]的存到right数组
  for(let i = 0; i < len; i++){
    if (privot > arr[i]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // 不断把分割的数组左右数组传入quickSort，直到分割的只有只有一位直接返回子数组本身，递归终止
  // 每一层left元素都小于对应的privot，right里的元素都大于对应的privot
  return quickSort2(left).concat(privot, quickSort2(right));
}
console.log(quickSort2([1,3,4,5,9]))
```