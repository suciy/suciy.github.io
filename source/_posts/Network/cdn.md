title: 关于 CDN，你知道多少
---
# CDN 加速原理
## 什么是CDN?
> CDN的全称是Content Delivery Network，即内容分发网络。其目的是通过在现有的Internet中增加一层新的网络架构，将网站的内容发布到最接近用户的网络“边缘”，使用户可以就近取得所需的内容，提高用户访问网站的响应速度。CDN有别于镜像，因为它比镜像更智能，或者可以做这样一个比喻：CDN=更智能的镜像+缓存+流量导流。因而，CDN可以明显提高Internet网络中信息流动的效率。从技术上全面解决由于网络带宽小、用户访问量大、网点分布不均等问题，提高用户访问网站的响应速度。

下面是CDN的一个简单的示意图：
![CDN](https://img-blog.csdn.net/20181018144849100)

如上图所示，是CDN一个常见的架构示意图，其工作流程可以总结为：当用户访问已经加入CDN服务的网站时，首先通过DNS重定向技术确定最接近用户的最佳CDN节点，同时将用户的请求指向该节点。当用户的请求到达指定节点时，CDN的服务器（节点上的高速缓存）负责将用户请求的内容提供给用户。具体流程为: 用户在自己的浏览器中输入要访问的网站的域名，浏览器向本地DNS请求对该域名的解析，本地DNS将请求发到网站的主DNS，主DNS根据一系列的策略确定当时最适当的CDN节点，并将解析的结果（IP地址）发给用户，用户向给定的CDN节点请求相应网站的内容。

## CDN相关技术
CDN的实现需要依赖多种网络技术的支持，其中最主要的包括负载均衡技术、动态内容分发与复制技术、缓存技术等。

### 负载均衡技术
负载均衡技术不仅仅应用于CDN中，在网络的很多领域都得到了广泛的应用，如服务器的负载均衡、网络流量的负载均衡。顾名思义，网络中的负载均衡就是将网络的流量尽可能均匀分配到几个能完成相同任务的服务器或网络节点上，由此来避免部分网络节点过载。这样既可以提高网络流量，又提高了网络的整体性能。在CDN中，负载均衡又分为服务器负载均衡和服务器整体负载均衡(也有的称为服务器全局负载均衡)。服务器负载均衡是指能够在性能不同的服务器之间进行任务分配，既能保证性能差的服务器不成为系统的瓶颈，又能保证性能高的服务器的资源得到充分利用。而服务器整体负载均衡允许Web网络托管商、门户站点和企业根据地理位置分配内容和服务。通过使用多站点内容和服务来提高容错性和可用性，防止因本地网或区域网络中断、断电或自然灾害而导致的故障。在CDN的方案中服务器整体负载均衡将发挥重要作用，其性能高低将直接影响整个CDN的性能。

### 动态分发与复制技术
众所周知，网站访问响应速度取决于许多因素，如网络的带宽是否有瓶颈、传输途中的路由是否有阻塞和延迟、网站服务器的处理能力及访问距离等。多数情况下，网站响应速度和访问者与网站服务器之间的距离有密切的关系。如果访问者和网站之间的距离过远的话，它们之间的通信一样需要经过重重的路由转发和处理，网络延误不可避免。一个有效的方法就是利用内容分发与复制技术，将占网站主体的大部分静态网页、图像和流媒体数据分发复制到各地的加速节点上。所以动态内容分发与复制技术也是CDN所需的一个主要技术。

缓存技术
缓存技术已经不是一种新鲜技术。Web缓存服务通过几种方式来改善用户的响应时间，如代理缓存服务、透明代理缓存服务、使用重定向服务的透明代理缓存服务等。通过Web缓存服务，用户访问网页时可以将广域网的流量降至最低。对于公司内联网用户来说，这意味着将内容在本地缓存，而无须通过专用的广域网来检索网页。对于Internet用户来说，这意味着将内容存储在他们的ISP的缓存器中，而无须通过Internet来检索网页。这样无疑会提高用户的访问速度。CDN的核心作用正是提高网络的访问速度，所以，缓存技术将是CDN所采用的又一个主要技术。
### 工作原理
CDN网络是在用户和服务器之间增加Cache层，主要是通过接管DNS实现，将用户的请求引导到Cache上获得源服务器的数据，从而降低网络的访问时间。
首先，让我们看一下传统的未加缓存服务的访问过程：
![CDN网络](https://img-blog.csdn.net/20181018151508334)

如图可以看出，传统的网络访问的流程如下：

用户输入访问的域名,操作系统向 LocalDns 查询域名的ip地址；
LocalDns向 ROOT DNS 查询域名的授权服务器(这里假设LocalDns缓存过期)；
ROOT DNS将域名授权dns记录回应给 LocalDns；
LocalDns得到域名的授权dns记录后，继续向域名授权dns查询域名的ip地址；
域名授权dns 查询域名记录后，回应给 LocalDns；
LocalDns 将得到的域名ip地址，回应给用户端；
用户得到域名ip地址后，访问站点服务器；
站点服务器应答请求，将内容返回给客户端.
下面让我们看一下使用CDN缓存后的网站的访问过程：
如上图，是使用CDN缓存后的网络访问流程：
![CDN缓存](https://img-blog.csdn.net/20181018152139324)
用户输入访问的域名,操作系统向 LocalDns 查询域名的ip地址；
LocalDns向 ROOT DNS 查询域名的授权服务器(这里假设LocalDns缓存过期)；
ROOT DNS将域名授权dns记录回应给 LocalDns；
LocalDns得到域名的授权dns记录后,继续向域名授权dns查询域名的ip地址；
域名授权dns 查询域名记录后(一般是CNAME)，回应给 LocalDns；
LocalDns 得到域名记录后,向智能调度DNS查询域名的ip地址；
智能调度DNS 根据一定的算法和策略(比如静态拓扑，容量等),将最适合的CDN节点ip地址回应给 LocalDns；
LocalDns 将得到的域名ip地址，回应给用户端；
用户得到域名ip地址后，访问站点服务器。
宗上，CDN网络是在用户和服务器之间增加Cache层，主要是通过接管DNS实现，将用户的请求引导到Cache上获得源服务器的数据，从而降低网络的访问的速度。
————————————————
版权声明：本文为CSDN博主「xiangzhihong8」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/xiangzhihong8/java/article/details/83147542  

-----
# 总结
  总而言之，CDN就是通过 镜像 + 智能化分析，将已经缓存的或者是离你最近的资源加载给你，减少网络压力，提高用户体验。整个流程可以简化为（第一次输入URL后发生了什么）：
  <ol>
    <li>用户输入URL地址</li>
    <li>DNS（域名解析系统）解析URL</li>
    <li>向根域名询问是否存在该URL</li>
    <li>根域名询问其他域名是否存在该URL</li>
    <li>存在的话将最接近的资源返回给客户端</li>
  </ol>