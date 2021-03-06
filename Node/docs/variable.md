## 全局对象和全局变量

**注： 来自阮一峰老师的 [JavaScript 标准参考教程](http://javascript.ruanyifeng.com/nodejs/basic.html#toc6)**

` Node.js ` 提供以下几个全局对象，它们是所有模块都可以调用的

- ` global ` => 表示 ` Node ` 所在的全局环境，类似于浏览器的 ` window ` 对象。需要注意的是，如果在浏览器中声明一个全局变量，实际上是声明了一个全局对象的属性，比如 ` var x = 1 ` 等同于设置 ` window.x = 1 `，但是 ` Node ` 不是这样，至少在模块中不是这样（` REPL ` 环境的行为与浏览器一致）。在模块文件中，声明 ` var x = 1 `，该变量不是 ` global ` 对象的属性，` global.x === undefined `。这是因为模块的全局变量都是该模块私有的，其他模块无法取到。

- ` process ` => 该对象表示 ` Node ` 所处的当前进程，允许开发者与该进程互动

- ` console ` => 指向 ` Node ` 内置的 ` console ` 模块，提供命令行环境中的标准输入，标准输出功能

` Node ` 还提供一些全局函数

- ` setTimeout() ` => 用于在指定毫秒之后，运行回调函数

- ` clearTimeout() ` => 用于终止一个 ` setTimeout ` 方法新建的定时器

- ` setInterval() ` => 用于每隔一定毫秒调用回调函数

- ` clearInterval() ` => 种植一个用 ` setInterval ` 方法新建的定时器

- ` require() ` => 用于加载模块

- ` Buffer() ` => 用于操作二进制数据

` Node ` 提供两个全局变量，都一两个下划线开头

- ` __filename ` => 指向当前运行的脚本文件名

- ` __dirname ` => 指向当前运行的脚本所在的目录

除此之外，还有一些对象实际上是模块内部的局部变量，指向的对象根据模块不同而不同，但是所有模块都适用，可以看做是伪全局变量，主要为 ` module `、` module.exports `、` exports ` 等等 
