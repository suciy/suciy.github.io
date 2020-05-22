title: 浏览器工作原理与实践--- 关于内存
---
# JS内存机制（2020-04-15）  
## 碎片知识点： 
**什么是静态语言和动态语言**  
在使用之前就需要确认其变量数据类型的称为静态语言。比如： C语言。
在运行过程中需要检查数据类型的语言称为动态语言。比如： JavaScript。
**支持隐式类型转换的语言称为弱类型语言，不支持隐式类型转换的语言称为强类型语言。**   
在 JavaScript 的执行过程中， 主要有三种类型内存空间，分别是`代码空间、栈空间和堆空间`。
>代码空间主要是存储可执行代码的。  
JavaScript 引擎需要用栈来维护程序执行期间上下文的状态，如果栈空间大了话，所有的数据都存放在栈空间里面，那么会影响到上下文切换的效率，进而又影响到整个程序的执行效率。所以通常情况下，栈空间都不会设置太大，主要用来存放一些原始类型的小数据。  
堆空间很大，能存放很多大的数据，不过缺点是分配内存和回收内存都会占用一定的时间。
**原始类型的赋值会完整复制变量值，而引用类型的赋值是复制引用地址。**
> 产生闭包的核心有两步：第一步是需要预扫描内部函数；第二步是把内部函数引用的外部变量保存到堆中。
## 代际假说（The Generational Hypothesis）  
两个特点：  
第一个是大部分对象在内存中存在的时间很短，简单来说，就是很多对象一经分配内存，很快就变得不可访问；
第二个是不死的对象，会活得更久。  

在 V8 中会把堆分为新生代和老生代两个区域，新生代中存放的是生存时间短的对象，老生代中存放的生存时间久的对象。 
新生区通常只支持 1～8M 的容量，而老生区支持的容量就大很多了。对于这两块区域，V8 分别使用两个不同的垃圾回收器，以便更高效地实施垃圾回收。

## 垃圾回收机制  
副垃圾回收器，主要负责新生代的垃圾回收。
主垃圾回收器，主要负责老生代的垃圾回收。
执行流程  
1、第一步是标记空间中活动对象和非活动对象。所谓活动对象就是还在使用的对象，非活动对象就是可以进行垃圾回收的对象。  

2、第二步是回收非活动对象所占据的内存。其实就是在所有的标记完成之后，统一清理内存中所有被标记为可回收的对象。  

3、第三步是做内存整理。一般来说，频繁回收对象后，内存中就会存在大量不连续空间，我们把这些不连续的内存空间称为内存碎片。当内存中出现了大量的内存碎片之后，如果需要分配较大连续内存的时候，就有可能出现内存不足的情况。所以最后一步需要整理这些内存碎片，但这步其实是可选的，因为有的垃圾回收器不会产生内存碎片。    
**新生代垃圾删除流程**
新生代中用Scavenge 算法来处理。所谓 Scavenge 算法，是把新生代空间对半划分为两个区域，一半是对象区域，一半是空闲区域。 新加入的对象都会存放到对象区域，当对象区域快被写满时，就需要执行一次垃圾清理操作。

1、在垃圾回收过程中，首先要对对象区域中的垃圾做标记；标记完成之后，就进入垃圾清理阶段，副垃圾回收器会把这些存活的对象复制到空闲区域中，同时它还会把这些对象有序地排列起来，所以这个复制过程，也就相当于完成了内存整理操作，复制后空闲区域就没有内存碎片了。

2、完成复制后，对象区域与空闲区域进行角色翻转，也就是原来的对象区域变成空闲区域，原来的空闲区域变成了对象区域。这样就完成了垃圾对象的回收操作，同时这种角色翻转的操作还能让新生代中的这两块区域无限重复使用下去。

JavaScript 引擎采用了**对象晋升策略**，也就是经过两次垃圾回收依然还存活的对象，会被移动到老生区中。
**老生代垃圾删除流程** 
主垃圾回收器是采用`标记 - 清除（Mark-Sweep）`的算法进行垃圾回收的。  

1、首先是标记过程阶段。标记阶段就是从一组根元素开始，递归遍历这组根元素，在这个遍历过程中，能到达的元素称为活动对象，没有到达的元素就可以判断为垃圾数据。  

2、对一块内存多次执行标记 - 清除算法后，会产生大量不连续的内存碎片。而碎片过多会导致大对象无法分配到足够的连续内存，于是又产生了另外一种`算法——标记 - 整理（Mark-Compact）`，这个标记过程仍然与标记 - 清除算法里的是一样的，但后续步骤不是直接对可回收对象进行清理，而是让所有存活的对象都向一端移动，然后直接清理掉端边界以外的内存。  
## 全停顿  
不过由于 JavaScript 是运行在主线程之上的，一旦执行垃圾回收算法，都需要将正在执行的 JavaScript 脚本暂停下来，待垃圾回收完毕后再恢复脚本执行。我们把这种行为叫做`全停顿（Stop-The-World）`。  
为了降低老生代的垃圾回收而造成的卡顿，V8 将标记过程分为一个个的子标记过程，同时让垃圾回收标记和 JavaScript 应用逻辑交替进行，直到标记阶段完成，我们把这个算法称为`增量标记（Incremental Marking）`算法。