title: ES2015 中四种相等算法
---

# ES2015 中四种相等算法  （Note， 待完善和补充）
* 非严格相等比较(==)： 
* 严格相等比较(===) ：  
Array.prototype.indexOf, Array.prototype.lastIndexOf, 和 case-matching  
* 同值零：  
用于 %TypedArray% 和 ArrayBuffer 构造函数、以及Map和Set操作, 并将用于 ES2016/ES7 中的String.prototype.includes  
* 同值: 用于所有其他地方   
## 非严格相等比较(==)  
相等操作符比较两个值是否相等，在比较前将两个被比较的值隐式转换为相同类型。转化类型时，先调用值的 toString() 和 valueOf() 方法，将值转化为原始类型。优先尝试转化为 Number 类型。  
## 严格相等(===)  
全等操作符比较两个值是否相等，两个被比较的值在比较前都不进行隐式转换。如果两个被比较的值具有不同的类型，这两个值是不全等的。  
### 同值相等
确定两个值是否在任何情况下功能上是相同的。不可变属性和新设定的值使用 same-value 相等比较。  
同值相等由 Object.is 方法提供。
### 零值相等  
与同值相等类似，不过会认为 +0 与 -0 相等。



