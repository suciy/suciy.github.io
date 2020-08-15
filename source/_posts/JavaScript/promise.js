// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class MyPromise {
  // 接收传入的函数
  constructor(handle){
    // 对传入的参数进行类型判断，如果不是函数则抛出异常
    if (typeof handle !== 'function'){
      throw new Error(`Promise resolver ${handle} is not a function`);
    }
    // 对 Promise 的状态进行初始化
    this._status = 'PENDING'
    // 对处理值进行初始化
    this._value;
    // 添加成功回调函数队列
    this._fulfilledQueues = []
    // 添加失败回调函数队列
    this._rejectedQueues = []
    // 执行处理函数
    try{
      handle(this._resolve.bind(this), this._reject.bind(this));
    } catch(err) {
      this._reject(err);
    }
  }
  // 添加resolve时执行函数
  _resolve(val){
    if(this._status !== 'PENDING') return;
    this._status = FULFILLED;
    // this._value = val;
    // 依次执行成功队列中的函数，并清空队列
    const runFulfilled = (value) => {
      let cb;
      while(cb = this._fulfilledQueues.shift()){
        cb(value);
      }
    }
    // 依次执行失败队列中的函数，并清空队列
    const runRejected = (error) => {
      let cb;
      while (cb = this._rejectedQueues.shift()) {
        cb(error)
      }
    }
    // 如果 resolve 的参数为 Promise 对象，则必须等待该 Promise 对象状态改变后，当前的 Promise 的状态才会改变，且状态取决于参数 Promise 对象的状态
    if (val instanceof MyPromise) {
      val.then(value => {
        this._value = value;
        runFulfilled(value);
      }, err => {
        runRejected(err);
      })
    } else {
      this._value = val;
      runFulfilled(val)
    }
     // 为了支持同步的Promise，这里采用异步调用
     setTimeout(() => this._reject(err),0)
  }
  // 添加reject时执行函数
  _reject(err){
    if(this._status !== 'PENDING') return;
    this._status = REJECTED;
    this._value = err;
  }
  // then 方法返回一个新的 Promise 对象，并且需要将回调的函数加入到执行队列  
  then(onFulfilled, onRejected) {
    const { _value, _status } = this;
    return new MyPromise((onFulfilledNext, onRejectedNext)  => {
      // 封装一个成功时执行的函数
      let fulfilled = value => {
        try {
          if (typeof onFulfilled !== "function"){
            onFulfilledNext(value);
          } else {
            let res = onFulfilled(value);
            if (res instanceof MyPromise){
              // 如果当前回调函数返回 Promise 对象，必须等待其状态改变后再执行下一个回调
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并且立即执行下一个then的回调函数
              onFulfilledNext(res);
            }
          }
        } catch (error) {
          // 如果函数执行出错，新的 Promise 对象的状态为失败
          onRejectedNext(error);
        }
      }
      // 封装一个失败时执行的函数
      let rejected = error => {
        try {
          if (typeof onRejected !== "function") {
            onRejectedNext(error);
          } else {
            let res = onRejected(error);
            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
            if (res instanceof MyPromise){
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              onFulfilledNext(res);
            }
          }
        } catch (error) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }
      switch(_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING: this._fulfilledQueues.push(fulfilled)
        this._rejectedQueues.push(rejected)
        break;
        // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED: onFulfilled(_value); break;
        case REJECTED: onRejected(_value);
        break;
      }
    })
  }
  // 添加catch方法
  catch (onRejected) {
    return this.then(undefined, onRejected)
  }
  // 添加静态 resolve 语法
  static resolve(value) {
   // 如果参数是MyPromise实例，直接返回这个实例
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }
  // 添加静态reject方法
  static reject (value) {
    return new MyPromise((resolve ,reject) => reject(value))
  }
  // 静态 all 方法
  static all(list) {
    return new MyPromise((resolve, reject) => {
      let values = [];
      let count = 0;
      for (const [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(res => {
          values[i] = res;
          count++;
          // 所有状态都变成fulfilled时返回的 MyPromise 状态就变成了 fulfilled
          if(count === list.length) resolve(values);
        }, err => {
          // 有一个被rejected时返回的 MyPromise 状态就变成了rejected
          reject(err);
        })
      }
    })
  };
  // 添加静态race方法
  static race (list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }
  finally (cb) {
    return this.then(
      value  => MyPromise.resolve(cb()).then(() => value),
      reason => MyPromise.resolve(cb()).then(() => { throw reason })
    );
  }
}