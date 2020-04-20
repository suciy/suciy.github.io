# 前端使用 WebSocket 接口

最近项目进入优化阶段，要求把之前的定时轮询（心跳）修改为 WebSocket。网上有很多 WebSocket协议 优秀的文章，从原理到请求头各个参数解读，但是前端详细的使用文章比较少。此篇笔记也主要是记录 WebSocket 接口的基本用法，不涉及太多原理。


# WebSocket协议 是什么

**WebSocket协议**是一种在单个[TCP](https://baike.baidu.com/item/TCP)连接上进行[全双工](https://baike.baidu.com/item/%E5%85%A8%E5%8F%8C%E5%B7%A5)通信的协议。它可以在用户的浏览器和服务器之间打开交互式通信会话。使用此API，开发者可以向服务器发送消息并接收事件驱动的响应，而无需通过轮询服务器的方式以获得响应。

## WebSocket 协议基本概念
	

在浏览器的Network查看ws接口详情，我们可以看到基本 WebSocket 请求头如下：

```
	Upgrade: websocket
	Connection: Upgrade
	Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
	Sec-WebSocket-Version: 13
	Sec-WebSocket-Extensions:permessage-deflate; client_max_window_bits
	Origin: localhost:8080
```
其中：

 - `Connection `这个核心字段通知服务器当前使用的是WebSocket 协议
 - `Upgrade` 表示要升级到 WebSocket 协议
 - `Sec-WebSocket-Key` 是一个 Base64 encode 的值，与后面服务端响应首部的`Sec-WebSocket-Accept`是配套的，提供基本的防护，比如恶意的连接，或者无意的连接。
 - `Sec-WebSocket-Version: 13`表示websocket的版本。这也是由于早期各个浏览器使用的版本都不同，所以后期进行了统一
 - `Sec-WebSocket-Extensions`表示协议扩展类型。某类协议可能支持多个扩展，通过它可以实现协议增强
 - `Origin`用于防止未授权的跨域脚本攻击，服务器可以从Origin决定是否接受该WebSocket连接，如果请求来自浏览器必须包含Origin属性名
 
 而 ws 接口的响应包也是可以对应的上：
 ```
	Upgrade: websocket
	Connection: Upgrade
	Sec-WebSocket-Extensions:permessage-deflate; client_max_window_bits
	Origin: localhost:8080 
 ```
 在相应包中，存在和请求头一一对应的字段，而在其中：
 
 -`Sec-WebSocket-Accept`值是将请求包“Sec-WebSocket-Key”的值，与”258EAFA5-E914-47DA-95CA-C5AB0DC85B11″这个字符串进行拼接，然后对拼接后的字符串进行sha-1运算，再进行base64编码，就是“Sec-WebSocket-Accept”的值；

## WebSocket 接口前端用法

 1. 初始化 WebSocket 实例，`WebSocket()`构造函器会返回一个 [`WebSocket`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket "WebSocket 对象提供了用于创建和管理 WebSocket 连接，以及可以通过该连接发送和接收数据的 API。") 对象。`WebSocket()`包含两个参数：url--要连接的URL（必填）、protocols--单协议字符串或者包含协议字符串的数组（可选）。
	 
 2. 常用属性赋值：
	--**`WebSocket.onopen`** 属性定义一个事件处理程序，当[`WebSocket`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket "WebSocket 对象提供了用于创建和管理 WebSocket 连接，以及可以通过该连接发送和接收数据的 API。") 的连接状态[`readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket/readyState "返回当前 WebSocket 的链接状态，只读。")变为“OPEN”时调用;这意味着当前连接已经准备好发送和接受数据。这个事件处理程序通过 [`事件`](https://developer.mozilla.org/zh-CN/docs/Web/API/%E4%BA%8B%E4%BB%B6 "此页面仍未被本地化, 期待您的翻译!")（建立连接时）触发。可以在此处使用`WebSocket.send()`方法传递参数。
	--**`WebSocket.onclose`** 属性返回一个事件监听器，这个事件监听器将在 WebSocket 连接的[`readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket/readyState "返回当前 WebSocket 的链接状态，只读。") 变为 `CLOSED`时被调用，它接收一个名字为“close”的 [`CloseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent "CloseEvent 会在连接关闭时发送给使用 WebSockets 的客户端. 它在 WebSocket 对象的 onclose 事件监听器中使用.") 事件。
	-- **`WebSocket.onerror`** 属性返回一个事件监听器，你可以定义一个发生错误时执行的回调函数，此事件的事件命名为"error"。
	-- **`WebSocket.onmessage`** 属性是一个当收到来自服务器的消息时被调用的 [`EventHandler`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventHandler "此页面仍未被本地化, 期待您的翻译!")。它由一个[`MessageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent "MessageEvent  是接口代表一段被目标对象接收的消息。")调用。可以接收和处理服务器端推送的数据，并可以在此处重新发送参数，保持连接不断开。
	**`WebSocket.send()`** 方法将需要通过 WebSocket 链接传输至服务器的数据排入队列，并根据所需要传输的data bytes的大小来增加 `bufferedAmount`的值 。若数据无法传输（例如数据需要缓存而缓冲区已满）时，套接字会自行关闭。但是该方法需要在 WebSocket 实例创建后才能使用，否则 WebSocket 会发生错误。
	**`WebSocket.close()`** 方法关闭 `WebSocket`，WebSocket 对象提供了用于创建和管理 WebSocket 连接，以及可以通过该连接发送和接收数据的 API。") 连接或连接尝试（如果有的话）。 如果连接已经关闭,则此方法不执行任何操作。在销毁页面或者组件之前，为了性能，可以调用此方法关闭该页面的 WebSocket ，保证页面内存。
整个使用流程可以参照下图：

```mermaid
flowchat
st=>start: 初始化 WebSocket，赋值给一个常量
e=>end: WebSocket.close()，关闭整个 WebSocket
config=>operation: 为onclose，onmessage，onopen，onmessage 绑定对应操作函数
isOpen=>condition: WebSocket 服务是否启动成功
isError=>operation: WebSocket 异常，则调用 WebSocket.onclose() 关闭连接，将 WebSocket 实例常量清空，重新初始化
send=>operation: WebSocket.send()传递请求需要的参数
message=>operation: 接收服务器推送回来的数据，在此可以进行数据处理
onClose=>operation: 关闭连接

st->config->isOpen->send->message->isError->onClose->e
isOpen(yes)->send
isOpen(no)->isError

```
体现在代码中则是：
```
	const wsUrl ="ws://services address/";
	const wsCase = new WebSocket(wsUrl);
	function initWs() {
	  wsCase.onopen = openWs();
	  wsCase.onerror = wsError();
	  wsCase.onmessage = getWsData();
	  wsCase.onclose = closeWs();
	} 
	// 自定义打开函数 
	function openWs(ws) { // 参数是当前ws实例对象
	  // 可以在此处传递参数
	  wsCase.send("params:{}");
	}
	// 自定义错误函数 
	function wsError(err) {
	  // 可以在有异常时重置websocket，创建新的websocket实例连接
	  wsCase.close();
	  wsCase = null;
	  initWs();
	}
	 // 自定义数据处理函数
	function getWsData(ws) { // 参数是当前ws实例对象
	  // 可以在此处处理数据
	  console.log(JSON.parse(ws));
	}
	 // 自定义关闭参数	 
	function openWs(ws) { // 参数是当前ws实例对象
	  wsCase.close();
	  wsCase = null;
	}
	// 如果在现实场景，退出当前页面时最好销毁当前实例
	if (wsCase) wsCase.close()
```
> **Note:** 整个流程和方法使用都是参照我实际使用，如有不足，请及时指正

### 总结
--------------
真正梳理 WebScoket 接口后，才发现前端基本使用都比较简单，主要是对各个状态的 WebScoket 进行数据、异常以及关闭重启的处理。 但是就 WebScoket 协议以及一些字段解析处理还是有很多的知识点，但是我主要是记录一个基础概念和使用，参考了一些大佬和MDN的文档，如有不足，请及时指正。如果对 WebScoket 有兴趣，也可以一起探讨。

### 参考资料
[WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)
[WebSocket：5分钟从入门到精通](https://segmentfault.com/a/1190000012709475#articleHeader24)
[ 【译】 WebSocket 协议第九章——扩展（Extension）](https://blog.csdn.net/weixin_34270865/article/details/88596602)
[什么是WebSocket](https://www.cnblogs.com/LWWTT/p/11073636.html)
