//数组去除重复的项，即[‘1’,‘2’,1,‘3’]——>[‘1’,‘2’,1,‘3’]
//注：使用原生的方式，不使用set
// 如果哈希表的查找速度的时间复杂度都是 O(1)可以用对象、map这两个数据结构来存储，查找判断
function dealArray(arr){
  let obj = {};
  // js里的属性不是线性查找，而是hash查找
  for (let i = 0; i < arr.length; i++) {
    const key = typeof arr[i] + arr[i];
    if(!obj.hasOwnProperty(key)){
      obj[key] = arr[i];
    }
  }
 return Object.values(obj);
}

function filterData(arr){
  let map = new Map();
  for(const item of arr){
    // 传说哈希表的时间复杂度是O(1)
    if(!map.has(item)){
      map.set(item, '');
    }
  }
  return Array.from(map.keys());
}

const arr = [1, 'a', '1', 2, '2', 'b', 'b', null, null, , ,'null'];
console.log(dealArray(arr))