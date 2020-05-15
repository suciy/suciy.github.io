title: 性能指标(未完待续)
---
# 浏览器性能指标  
\{% assets-performance performance-target.jpg 浏览器性能指标 %}  

## 相关名词  

* FP (First Paint): 首次绘制，标记浏览器渲染任何在视觉上不同于导航前屏幕内容之内容的时间点。  

* FCP(First Contentful Paint): 首次内容绘制，标记的是浏览器渲染第一帧内容。  

* FMP(First Meaning Paint): 首次有效绘制，标记主角元素渲染完成的时间点，主角元素可以是视频网站的视频空间、内容网站的页面框架、资源网站的首图等等。  

* LCP(Largest Contentful Paint): 最大内容渲染，代表在viewport中最大的页面元素加载的时间。 LCP的数据会通过PerformanceEntry对象记录，每次出现更大的内容渲染，则会产生一个新的PerformanceEntry对象(2019年11月新增)。

* DCL(DomContentloaded):当 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载。  

* L(onLoad):当依赖的资源，全部加载完毕之后才会触发。  

* TTI(Time to Interactive): 可交互时间，指标用于标记应用已进行视觉渲染并能可靠响应用户输入的时间点。  

* TBT(Total Blocking Time): 页面阻塞总时长，TBT汇总所有加载过程中阻塞用户操作的时长，在FCP和TTI之间任何long task中阻塞部分都会被汇总。  

* FID(First Input Delay): 首次输入延迟，指标衡量的是从用户首次与您的网站进行交互（即当他们单击链接，点击按钮等）到浏览器实际能够访问之间的时间。   

* CLS(Cumulative Layout Shift): 累积布局偏移，一个元素初始时和其hidden之间的任何时间如果元素偏移了, 则会被计算进去。  

* SI(Speed Index): 指标用于显示页面可见部分的显示速度, 单位是时间。   

## FMP 计算方法  
1、主动上报：开发者在相应页面的「Meaning」位置上报时间  
2、权重计算：根据页面元素，计算权重最高的元素渲染时间  
3、趋势计算：在 render 期间，根据 dom 的变化趋势推算 FMP 值  
**权重计算**  
---
[参考链接](https://blog.csdn.net/weixin_33989780/article/details/91370658)




