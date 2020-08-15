//写个转换函数，把一个JSON对象的key从横杠形式（Pascal）转换到小驼峰形式（Camel），即{“a_b”:1, 'aB': 2}——>{“aB”:1} 
//注：考虑下嵌套，且不能改变原数据
function myParse(obj) {
  // 数组
  if(obj instanceof Array) {
     return obj.map(i => 
      myParse(i)
    );
  }
  // 对象
  if (typeof obj === "object") {
      let newObj = {}
      Object.keys(obj).forEach(key => {
        newObj[toCamel(key)] = myParse(obj[key])
      })
      return newObj;
  }
  
  return obj
}
// 下划线转化为驼峰
function toCamel(value){
  if (~(value.indexOf('_')) !== -1) {
    return value;
  } else {
    // const str = /_(\w)/g;
    const str = /_([a-z])/g;
    // replace第二个参数为回调函数，函数参数如下：
    // 参数 a 代表 匹配到的字符串
    // 参数 b 代表 匹配到的字符串的下标
    // 参数 c 代表 整个字符串 
    return value.replace(str, (a, b, c) => {
      return b.toUpperCase();
    });
  }
}