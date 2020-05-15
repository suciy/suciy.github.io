title: 入门专用 --- Map 对象
---
# Map   
## Map是什么  
`Map` 对象保存键值对，并且能够记住键的原始插入位置。任何值(对象或者原始值) 都可以作为一个键或一个值。  
## 语法  
```
new Map([iterable])
```
参数：  
`iterable`:  
Iterable 可以是一个数组或者其他 iterable 对象，其元素为键值对(两个元素的数组，例如: [[ 1, 'one' ],[ 2, 'two' ]])。 每个键值对都会添加到新的 Map。null 会被当做 undefined。  
## 与 Object 的比较  
### 相同点  
  都允许按键存取值、删除键、检测一个键是否绑定了值。
### 不同点    
1、Object 的键只能是字符串或者 Symbols，Map 的键可以式任意值。  
2、Object 的键是无序的， Map 中的键值是有序的。  
3、Object 需要手动计算键值对个数，Map 可以通过 size 属性直接获取一个 Map 的键值对个数。  
4、Object 的迭代需要先获取它的键数组，然后再进行迭代， Map 可直接进行迭代。  
5、 Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。  
6、 Map 在涉及频繁增删键值对的场景下会有些性能优势。  
## 属性  
1、Map.length    
属性 length 的值为 0 。想要计算一个Map 中的条目数量， 使用 Map.prototype.size。
2、Map.prototype  
表示 Map 构造器的原型。 允许添加属性从而应用于所有的 Map 对象。
## 实例属性   
Map.prototype.constructor： 返回一个函数，它创建了实例的原型。默认是Map函数。  
Map.prototype.size： 返回Map对象的键/值对的数量。  
## 方法  
`Map.prototype.clear()`：移除Map对象的所有键/值对 。

`Map.prototype.delete(key)`：如果 Map 对象中存在该元素，则移除它并返回 true；否则如果该元素不存在则返回 false。随后调用 Map.prototype.has(key) 将返回 false 。  
  
`Map.prototype.entries()`：返回一个新的 Iterator 对象，它按插入顺序包含了Map对象中每个元素的 [key, value] 数组。 
  
`Map.prototype.forEach(callbackFn[, thisArg])`
按插入顺序，为 Map对象里的每一键值对调用一次callbackFn函数。如果为forEach提供了thisArg，它将在每次回调中作为this值。
  
`Map.prototype.get(key)`：返回键对应的值，如果不存在，则返回undefined。  
   

`Map.prototype.has(key)`：返回一个布尔值，表示Map实例是否包含键对应的值。  

`Map.prototype.keys()`：返回一个新的 Iterator对象， 它按插入顺序包含了Map对象中每个元素的键 。  


`Map.prototype.set(key, value)`：设置Map对象中键的值。返回该Map对象。  

`Map.prototype.values()`：返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的值 。  

`Map.prototype[@@iterator]()`：返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的 [key, value] 数组。





