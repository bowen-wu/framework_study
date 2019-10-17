## Node.js

` Node.js ` 不是 Web 框架，不是编程语言。它是一种平台，它将多种技术组合在一起，让 ` JavaScript ` 也能调用系统接口、开发后端应用。

` Node.js ` 用到了 V8 引擎、libuv、C/C++实现的 ` c-ares `、` http-parser `、` OpenSSL ` 、` zlib `等库

#### 版本
双数稳定版，单数非稳定版

#### 周边工具
- ` nrm ` => 用于切换 npm 下载源
    
    ```
    nrm ls  // List all the registries
    nrm use <registry>  // Change registry to registry
    ```
- ` yrm ` => 用于切换 yarn 下载源

#### 技术架构
![node 技术架构](https://upload-images.jianshu.io/upload_images/9617841-024144e47d9336aa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- ` bindings ` => 在 JS 和 C/C++ 中间创建一个桥梁，可以使二者通信
- ` libuv ` => 跨平台的异步 I/O 库。可以用于 TCP/UDP/DNS/文件 等的异步操作
- ` V8 ` => V8 本身是多线程的，但是执行 JS 是单线程的。
    ```
    将 JS 源代码变成本地代码并执行
    维护调用栈，确保 JS 函数的执行顺序
    内存管理，为所有对象分配内存
    垃圾回收，重复利用无用的内存
    实现 JS 的标准库
    V8 自带 event loop, 但是 Node.js 基于 libuv 自己做了一个（使用中）
    ```

#### Event Loop
操作系统可以触发事件，JS 可以处理事件。Event Loop 就是对事件处理顺序的管理

由于事件是分优先级的，所以处理起来也是分先后的。所以 Node.js 需要按顺序轮询每种事件，这种轮询往往是循环的，1 -> 2 -> 3 -> 1 -> 2 -> 3

![Event Loop](https://upload-images.jianshu.io/upload_images/9617841-ebfcb0940c768216.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 重点阶段

- timers => 检查计时器
- poll => 轮询，检查系统事件
- check => 检查 setImmediate 回调
- 其他阶段用的较少

**注：大部分时间，Node.js 都停在 poll 轮询阶段（有最长时间限制），大部分事件都在 poll 阶段被处理，如文件、网络请求**

#### 总结

- 用 libuv 进行异步 I/O 操作
- 用 Event Loop 管理事件处理顺序
- 用 C/C++ 库高效处理 DNS/HTTP...
- 用 bindings 让 JS 能和 C/C++ 沟通
- 用 V8 运行 JS
- 用 Node.js 库简化 JS 代码


