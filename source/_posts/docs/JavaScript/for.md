title: 那些年用过的 for 循环们
---
# for 循环的那些用法笔记（持续更新）  
## 1、for ... in 语法
```
  for (variable in object)
  statement
```
### for...in 的作用
for...in语句以任意顺序遍历一个对象的除Symbol以外的可枚举属性。  
for...in 循环只遍历可枚举属性（包括它的原型链上的可枚举属性）。  
> for...in不应该用于迭代一个 Array，其中索引顺序很重要。  
### for...in 的使用场景
for ... in是为遍历对象属性而构建的，不建议与数组一起使用，数组可以用Array.prototype.forEach()和for ... of，那么for ... in的到底有什么用呢？    

最常用的地方应该是用于调试，可以更方便的去检查对象属性（通过输出到控制台或其他方式）。尽管对于处理存储数据，数组更实用些，但是你在处理有key-value数据（比如属性用作“键”），需要检查其中的任何键是否为某值的情况时，还是推荐用for ... in。  
一般配合 hasOwnProperty() 使用，继承的属性不显示。  
```
var triangle = {a: 1, b: 2, c: 3};

function ColoredTriangle() {
  this.color = 'red';
}

ColoredTriangle.prototype = triangle;

var obj = new ColoredTriangle();

for (var prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log(`obj.${prop} = ${obj[prop]}`);
  } 
}

// Output:
// "obj.color = red"
```
  

## 2、for ... of
### for ... of 语法
```
for (variable of iterable) {
    //statements
}
```
### for...of 的作用
for...of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义的钩子，并为每个不同属性的值执行语句。  

> 注： for...of 只用在`可迭代对象`上，而对象不属于`可迭代对象`。
```
const obj = { h: 'hello', o: 'world'};

for (const element of obj) {
  console.log(element);
}
// output: Error: obj is not iterable
```
### for...of 的使用场景
['for...of 的使用实例'](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)

###  关闭迭代器  
对于for...of的循环，可以由break, throw  continue  或return终止。在这些情况下，迭代器关闭。
```
function* foo(){ 
  yield 1; 
  yield 2; 
  yield 3; 
}; 

for (let o of foo()) { 
  console.log(o); 
  break; // closes iterator, triggers return
}
```  
## for ... in 与 for ... of 区别  
for...in 语句以任意顺序迭代对象的可枚举属性。  

for...of 语句遍历可迭代对象定义要迭代的数据。  
``` 
Object.prototype.objCustom = function() {}; 
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // logs 0, 1, 2, "foo"
  }
}

for (let i of iterable) {
  console.log(i); // logs 3, 5, 7
}
```
----

