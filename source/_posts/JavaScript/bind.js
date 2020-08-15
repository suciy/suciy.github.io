// 手动实现bind，bind不执行方法，返回改变了this指向的函数
function myBind(context){
  // 判断是不是函数绑定，否则抛出异常
  if (typeof this !== 'function'){
    throw new Error('Error!');
  }
  const _this = this;
  const args = [...arguments].slice();
}