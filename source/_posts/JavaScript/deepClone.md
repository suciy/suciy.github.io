title: 深拷贝
----
深拷贝与浅拷贝的区别
浅拷贝拷贝的是值的引用，当改变对象的值，另一个对象的值也会发生变化；深拷贝是开辟了一块新的内存地址保存值，旧值的属性不收到影响。  

常见的浅拷贝方法： slice(), Object.assign(target, source1,source2)  

1、JSON转换  

``` JSON.parse(JSON.stringify(val))  ```

缺点：（1）如果对象里有函数，函数无法被拷贝下来 （2）无法拷贝对象原型链上的属性和方法 （3） 当数据层次很深，会栈溢出  

2、普通递归函数

``` 
function deepCopy(soure) {
  if (!isObject(soure))  return soure;
  let target = Array.isArray(source) ? [] : {};
  for (let key in source){
    if (soure.hasOwnProperty(key)) {
      if( isObject(source[key])) {
        target[key] = deepCopy(source[key])
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}
// 缺点：（1）无法保持引用 （2）当函数的层次很深，会栈溢出
```

// 3、防止栈溢出的深层拷贝
```
function deepClone(x){
  const root = {};
  const loopList = [
    {
      parent: root,
      key: void 0,
      data: x
    }
  ];
  while(loopList.length){
    // 深度优先
    const node = loopList.pop();
    const { parent, key, data } = node.parent;
    // 初始化赋值目标，key为 undefined 则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = {};
    }
    for (let k in data) {
      if (isObject(data[k])) {
        loopList.push({
          parent: res,
          key: k,
          data: data[k]
        });
      } else {
        res[k] = data[k];
      }
    }
  }
  return root;
}
```