/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-var */
class Dep {
  id: Date;
  subs: Watch[];
  static watch: Watch | null;
  // 订阅池
  constructor() {
    this.id = new Date(); //这里简单的运用时间戳做订阅池的ID
    this.subs = []; //该事件下被订阅对象的集合
  }
  defined() {
    // 添加订阅者
    Dep.watch?.add(this);
  }
  notify() {
    //通知订阅者有变化
    this.subs.forEach((e) => {
      if (typeof e.update === "function") {
        try {
          e.update.apply(e); //触发订阅者更新函数
        } catch (err) {
          console.warn(err);
        }
      }
    });
  }
}
Dep.watch = null;

class Watch {
  name: string;
  id: Date;
  callBack: (name: string) => void;
  constructor(name: string, fn: (name: string) => void) {
    this.name = name; //订阅消息的名称
    this.id = new Date(); //这里简单的运用时间戳做订阅者的ID
    this.callBack = fn; //订阅消息发送改变时->订阅者执行的回调函数
  }
  add(dep: Dep) {
    //将订阅者放入dep订阅池
    dep.subs.push(this);
  }
  update() {
    //将订阅者更新方法
    const cb = this.callBack; //赋值为了不改变函数内调用的this
    cb(this.name);
  }
}

const addHistoryMethod = (function () {
  var historyDep = new Dep();
  return function (name: string) {
    if (name === "historychange") {
      return function (name: string, fn: (name: string) => void) {
        // 订阅一下
        var event = new Watch(name, fn);
        Dep.watch = event;
        historyDep.defined();
        Dep.watch = null; //置空供下一个订阅者使用
      };
    } else if (name === "pushState" || name === "replaceState") {
      // @ts-ignore
      var method = history[name];
      return function () {
        /**
         * 1，arguments 是每一个函数都自带的属性
         * 2，arguments 会自动的将所有的实参存储其中
         * **/
        // @ts-ignore
        // eslint-disable-next-line prefer-rest-params
        method.apply(history, arguments);
        historyDep.notify();
      };
    }
  };
})();

// @ts-ignore
window.addHistoryListener = addHistoryMethod("historychange");
// @ts-ignore
history.pushState = addHistoryMethod("pushState");
// @ts-ignore
history.replaceState = addHistoryMethod("replaceState");
