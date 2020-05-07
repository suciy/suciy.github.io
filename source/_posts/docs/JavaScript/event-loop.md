title: 浏览器工作原理与实践---消息队列和事件循环
---
# 关于消息队列

`消息队列`是一种数据结构，可以存放要执行的任务。它符合队列“先进先出”的特点，也就是说要添加任务的话，添加到队列的尾部；要取出任务的话，从队列头部去取。

`渲染进程专门有一个 IO 线程用来接收其他进程传进来的消息`，接收到消息之后，会将这些消息组装成任务发送给渲染主线程。
\{%
   assets-js/img msgq.jpg messgage-queue
%}
# 关于事件循环
> 由setTimeout、Promise、async代码的执行顺序引发的深层思考
## 追根溯源
### JavaScript 的任务
 JavaScript 是单线程的，通过事件循环执行任务。`采纳 JSC 引擎的术语，我们把宿主发起的任务称为宏观任务，把 JavaScript 引擎发起的任务称为微观任务`。  
 宏观任务：   
  * 创建主文档对象,解析HTML,执行主线或者全局的javascript的代码,更改url以及各种事件。
  * 页面加载,输入，网络事件，定时器。从浏览器角度看，宏任务是一个个离散的，独立的工作单元。
  * 运行完成后，浏览器可以继续其他调度，重新渲染页面的UI或者去执行垃圾回收。

  微任务：
  * 微任务是更小的任务，微任务更新应用程序的状态，但是必须在浏览器任务继续执行其他任务之前执行，浏览器任务包括重新渲染页面的UI。
  * 微任务包括Promise的回调函数，DOM发生变化等，微任务需要尽可能快地，通过异步方式执行，同时不能产生全新的微任务。
  * 微任务能使得我们能够在重新渲染UI之前执行指定的行为，避免不必要的UI重绘，UI重绘会使得应用状态不连续。  
  每次任务执行过程都是一个宏观任务，在宏观任务中，JavaScript 的 Promise 还会产生异步代码，JavaScript 必须保证这些异步代码在一个宏观任务中完成，因此，每个宏观任务中又包含了一个微观任务队列。
  还有一种逻辑：
  * 宏任务是主流，当js开始被执行的时候，就是开启一个宏任务，在宏任务中执行一条一条的指令；宏任务可以同时有多个，但会按顺序一个一个执行；
  * 每一个宏任务，后面都可以跟一个微任务队列，如果微任务队列中有指令或方法，那么就会执行；如果没有，则开始执行下一个宏任务，直到所有的宏任务执行完为止，微任务相当于宏任务的小尾巴；
  * 为什么有了宏任务，还会有微任务存在？因为宏任务太占用性能，当需要一些较早就准备好的方法，排在最后才执行的时候，又不想新增一个宏任务，那么就可以把这些方法，一个一个的放在微任务队列里面，在这个宏任务中的代码执行完后，就会执行微任务队列。
  ```
    function sleep(duration) {
      return new Promise(function(resolve, reject) {
          console.log("b");  // 注意 new Promise() 是同步方法，resolve才是异步方法  
          setTimeout(resolve,duration);
      })
    }
    console.log("a");
    setTimeout(() => {
      sleep(1000).then(()=>console.log("c", new Date()))
    }, 0);
    console.log("d");
  ```  

### async、 await的认识
  await只能在 async 关键字作用区域内使用，返回一个 Promise 。使用 await 可以使用多个 Promise ， 并且支持 Promise 的多重嵌套。
  
## 最佳实践  
  ```
  // 实现一个 green 3 秒，yellow 1 秒，red 2 秒循环打印
    function sleep(duration){
      return new Promise(function(resolve){
          setTimeout(resolve, duration);
      })
    }
    async function changeColor(duration,color){
      console.log(color);
      await sleep(duration);    }
    async function main(){
      while(true){
          await changeColor(3000,"green");
          await changeColor(1000, "yellow");
          await changeColor(2000, "red");
      }
    }
    main()
  ```
  ## 写在最后
  认识到事件循环、宏任务、微任务都来源于 Winter 老师在极客时间推出的《 重学前端 》课程，之前对 setTimeout、Promise、async 这些都只有一个想法，对于嵌套多层和代码的执行逻辑没有过多考虑。也时刻感觉到自己对 JavaScript 的学习和认知比较表面，追根溯源确实是一种值得推荐的学习方法，毕竟要“知其然，也要知其所以然”。
  此篇笔记也是我参考多篇文章进行摘抄和梳理,参考了一些其他大佬的理解，如有侵权，请联系本人。
  引用文章：
  [js的setTimeout和Promise---同步异步和微任务宏任务](https://segmentfault.com/a/1190000018033021)
  [宏任务和微任务](http://xgfe.github.io/2019/04/16/zhangpeng/%E5%AE%8F%E4%BB%BB%E5%8A%A1%E5%92%8C%E5%BE%AE%E4%BB%BB%E5%8A%A1/)
  参考理解文章：
  [JavaScript执行（一）：Promise里的代码为什么比setTimeout先执行？](https://time.geekbang.org/column/article/82764)
  [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/?utm_source=html5weekly)



  GUI 渲染进程

绘制页面，解析 HTML、CSS，构建 DOM 树，布局和绘制等
页面重绘和回流
与 JS 引擎线程互斥，也就是所谓的 JS 执行阻塞页面更新


JS 引擎线程

负责 JS 脚本代码的执行
负责准执行准备好待执行的事件，即定时器计数结束，或异步请求成功并正确返回的事件
与 GUI 渲染线程互斥，执行时间过长将阻塞页面的渲染


事件触发线程

负责将准备好的事件交给 JS 引擎线程执行
多个事件加入任务队列的时候需要排队等待(JS 的单线程)


定时器触发线程

负责执行异步的定时器类的事件，如 setTimeout、setInterval
定时器到时间之后把注册的回调加到任务队列的队尾


HTTP 请求线程

负责执行异步请求
主线程执行代码遇到异步请求的时候会把函数交给该线程处理，当监听到状态变更事件，如果有回调函数，该线程会把回调函数加入到任务队列的队尾等待执行

作者：Horace_
链接：https://juejin.im/post/5e80595c518825739f6af6f4
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
