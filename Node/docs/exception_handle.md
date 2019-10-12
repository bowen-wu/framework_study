## 异常处理

` Node ` 是单线程运行环境，一旦抛出的异常没有被捕获，就会引起整个进程的崩溃。` Node ` 有三种方法，传播一个错误

- 使用 ` throw ` 语句抛出一个错误对象，即抛出异常

- 将错误对象传递给回调函数，由回调函数负责发出错误

- 通过 ` EventEmitter ` 接口，发出一个 ` error ` 事件

#### ` try...catch ` 结构

` try...catch ` 结构无法捕获异步运行的代码抛出的异常，解决方法是将错误捕获代码也放到异步执行

```
function async (callback, errorHandle) {
    setTimeout(() => {
        try {
            if(true) {
                throw new Error('This is Error!');
            } else {
                callback('done');
            }
        } catch(error) {
            errorHandle(error);
        }
    })
}

async(res => console.log('received: ', res), error => console.error('Error: async throw an exception', error));
```

一般来说，` Node ` 只在很少的场合才用 ` try...catch ` 语句，比如使用 ` JSON.parse ` 解析 ` JSON ` 文本

#### 回调函数

` Node ` 采用将错误对象作为第一个参数，传入回调函数。这样可以避免捕获代码与发生错误的代码不在同一个时间段的问题

```
function async2(continuation) {
    setTimeout(() => {
        try {
            const res = 42;
            if(true) {
                throw new Error('This is Error!');
            } else {
                continuation(null, res);
            }
        } catch(error) {
            continuation(error, null);
        }
    })
}

async2((error, res) => {
    if(error) {
        console.log('Error: (cps) failed: ', error)
    } else {
        console.log('(cps) received: ', res);
    }
});
```

#### ` EventEmitter ` 接口的 ` error ` 事件

当 ` EventEmitter ` 实例出错时，应该触发 ` error ` 事件。这些在 ` Node.js ` 中被视为特殊情况

如果没有为 ` error ` 事件注册监听器，则当 ` error ` 事件触发时，会抛出错误、打印堆栈跟踪、并退出 ` Node.js ` 进程。作为最佳实践，应该始终为 ` error ` 事件注册监听器

```
const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

emitter.on('error', (error) => console.error('出错: ', error.message));

emitter.emit('error', new Error('something bad happened'));
```
