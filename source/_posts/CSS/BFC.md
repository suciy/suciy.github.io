# BFC、IFC、GFC、FFC理解
[TOC]
## 定义 
FC: Formatting Context， 定义的是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用
BFC：Block Format Context ，块级格式化上下文
IFC：Inline Format Context ，行内格式化上下文  
GFC：GridLayout Formatting Context，网格布局格式化上下文
FFC：Flex Formatting Context， 自适应格式化上下文
## 布局规则
BFC：框垂直排列
1、内部的 Box 会在垂直方向，一个接一个地放置。
2、Box 垂直方向的距离由 margin 决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
3、每个元素的左外边缘（margin-left)， 与包含块的左边（contain box left）相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。除非这个元素自己形成了一个新的BFC。
4、BFC的区域不会与float box重叠。
5、BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6、计算BFC的高度时，浮动元素也参与计算。

###  如何形成BFC
* 根元素或其它包含它的元素
* 浮动 (元素的 float 不是 none)
* 绝对定位的元素 (元素具有 position 为 absolute 或 fixed)
* 非块级元素具有 display: inline-block，table-cell, table-caption, flex, inline-flex
* 块级元素具有overflow ，且值不是 visible
### BFC用处
1、清除浮动
```
<div class="wrap">
<section>1</section>
<section>2</section>
</div>
```
```
.wrap{
  border: 2px solid yellow;
  width: 250px;
}
section {
  background-color: pink;
  float: left;
  width: 100px;
  height: 100px;
}
```
由于子元素都是浮动的，受浮动影响，父元素的高度塌陷了。

解决方案：为 .wrap 加上 overflow: hidden;使其形成BFC，根据BFC规则第六条，计算高度时就会计算float的元素的高度，达到清除浮动影响的效果。

2、布局： 自适应两栏布局
3、防止垂直margin合并

___
IFC：框水平排列  
在水平方向上的外边距、边框、内边距所占用的空间都会被考虑在内。
行框的宽度是由包含块和存在的浮动来决定。行框的高度由行高计算。
___
GFC：当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间。
___
FFC：display值为flex或者inline-flex的元素将会生成自适应容器（flex container）
Flex Box 由伸缩容器和伸缩项目组成。通过设置元素的 display 属性为 flex 或 inline-flex 可以得到一个伸缩容器。设置为 flex 的容器被渲染为一个块级元素，而设置为 inline-flex 的容器则渲染为一个行内元素。伸缩容器中的每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩项目内的一切元素都不受影响。简单地说，Flexbox 定义了伸缩容器内伸缩项目该如何布局。
推荐阅读：https://www.jianshu.com/p/e75f351e11f8
## 注意
两个元素使用dispaly:inline-block在同一行显示时，元素有可能间隔一道缝隙。原因是元素被当成行内元素排版的时候，元素之间的空白符（空格、回车换行等）都会被浏览器处理，根据white-space的处理方式（默认是normal，合并多余空白），原来HTML代码中的回车换行被转成一个空白符，在字体大小不为0的情况下，空白符占据一定宽度，所以inline-block的元素之间就出现了空隙。这些元素之间的间距会随着字体的大小而变化，当行内元素font-size:16px时，间距为8px。
比较常用解决方法主要有以下点：
1、解决元素之间的空白符
2、为inline-block元素添加样式float:left（但是有了浮动后，inline-block其实是被忽略的）
3、为父元素中设置font-size: 0，在子元素上重置正确的font-size
4、设置父元素，display:table和word-spacing:-1em
> word-spacing 属性增加或减少单词间的空白（即字间隔）。
该属性定义元素中字之间插入多少空白符。针对这个属性，“字” 定义为由空白符包围的一个字符串。如果指定为长度值，会调整字之间的通常间隔；所以，normal 就等同于设置为 0。允许指定负长度值，这会让字之间挤得更紧。

详情请点击：https://blog.csdn.net/qq_32614411/article/details/82223624
