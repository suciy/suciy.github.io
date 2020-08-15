title: 入门专用 --- new 运算符做了啥]
---
# new 运算符  
**new 运算符**创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。new 关键字会进行如下的操作：

* 创建一个新的空的对象
* 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
* 执行构造函数中的代码（为这个新对象添加属性）
* 如果这个函数有返回值，则返回；否则，就会默认返回新对象

```
// 箭头函数实现
const myNew = (Parent, rest) => {
  // 1.以构造器的prototype属性为原型，创建新对象；
  let newObj = Object.create(Parent.prototype);
   // 2.将this和调用参数传给构造器执行
  let result =  Parent.apply(newObj, rest);
  // 3.如果构造器没有手动返回对象，则返回第一步的对象
  return typeof result  === 'object' ? result : newObj;
}
// 类实现
class newFunc{
  connstructor(Fn){
    //1:创建一个空对象
    const newObj = {};
    //2:将空对象的原型指向类
    newObj.__proto__ = Fn.prototype;
    //3:运行类函数并将空对象指向类的this
    let arr = [].slice().call(arguments, 1);
    let result = Fn.apply(newObj, arr);
    //4:判断返回值不为null且是对象则返回运行结果否则返回空对象
    if(result !== null && typeof result === 'object'){
      return result;
    } else {
      return newObj;
    }
  }
}
```