title: 你真的知道什么叫协议吗
---
# IP（Internet Protocol）：把数据包送达目的主机
数据包要在互联网上进行传输，就要符合网际协议（Internet Protocol，简称IP）标准。   
计算机的地址就称为 IP 地址，访问任何网站实际上只是你的计算机向另外一台计算机请求信息。   
 IP 头是 IP 数据包开头的信息，包含 IP 版本、源 IP 地址、目标 IP 地址、生存时间等信息。  

 # UDP(User Datagram Protocol用户数据包协议)：把数据包送达应用程序  
UDP 中一个最重要的信息是端口号，端口号其实就是一个数字，每个想访问网络的程序都需要绑定一个端口号。通过端口号 UDP 就能把指定的数据包发送给指定的程序了，所以IP 通过 IP 地址信息把数据包发送给指定的电脑，而UDP 通过端口号把数据包分发给正确的程序。和 IP 头一样，端口号会被装进 UDP 头里面，UDP 头再和原始数据包合并组成新的 UDP 数据包。UDP 头中除了目的端口，还有源端口号等信息。  
在使用 UDP 发送数据时，有各种因素会导致数据包出错，虽然 UDP 可以校验数据是否正确，但是对于错误的数据包，UDP 并不提供重发机制，只是丢弃当前的包，而且 UDP 在发送之后也无法知道是否能达到目的地。  
虽说UDP 不能保证数据可靠性，但是传输速度却非常快，所以 UDP 会应用在一些关注速度、但不那么严格要求数据完整性的领域，如在线视频、互动游戏等。  
## UDP 传输会存在两个问题：

1、数据包在传输过程中容易丢失；
2、大文件会被拆分成很多小的数据包来传输，这些小的数据包会经过不同的路由，并在不同的时间到达接收端，而 UDP 协议并不知道如何组装这些数据包，从而把这些数据包还原成完整的文件。  

# TCP（Transmission Control Protocol，传输控制协议）：把数据完整地送达应用程序  
TCP 有下面两个特点:

1、对于数据包丢失的情况，TCP 提供重传机制；
2、TCP 引入了数据包排序机制，用来保证把乱序的数据包组合成一个完整的文件。

# HTTP
HTTP 是一种允许浏览器向服务器获取资源的协议，是 Web 的基础，通常由浏览器发起请求，用来获取不同类型的文件，例如 HTML 文件、CSS 文件、JavaScript 文件、图片、视频等。
