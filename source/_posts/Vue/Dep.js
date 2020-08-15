// 数据劫持结合发布-订阅者模式
// 1、实现一个数据监听器 Observer， 能够对数据对象的所有属性进行监听，如果有数据变动可以拿到最新值并通知订阅者
// 2、实现一个指令解析器 Compile，对每个元素节点对指令进行扫描和解析，根据指令模版替换数据，以及绑定相应的更新函数
// 3、实现一个 Watcher， 作为连接 Observer 和 Compiler 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图

// 实现 Observer

// 定义对象的响应式属性
function defineReactive(data, key, val){
  observe(val); // 递归遍历所有的子属性
  const dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function(){
      if(dep){
        dep.addSub(watcher)
      }
      return val;
    },
    set: function(newVal){
      val = newVal;
    }
  })
}
function observe(data){
  if (!data || typeof data !== 'object'){
   return;
  }
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key]);
  });
}
function Dep(){
  this.subs = {};
}
Dep.prototype = {
  addSub: function(sub){
    this.subs.push(sub);
  },
  notify: function(){
    this.subs.forEach((sub) => {
      sub.update();
    })
  }
}
const library = {
  book1: {
      name: ''
  },
  book2: ''
};
observe(library);
library.book1.name = 'vue权威指南'; // 属性name已经被监听了，现在值为：“vue权威指南”
library.book2 = '没有此书籍';  // 属性book2已经被监听了，现在值为：“没有此书籍”
console.log(library)