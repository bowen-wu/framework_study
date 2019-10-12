## 模块化结构

**注： 来自阮一峰老师的 [JavaScript 标准参考教程](http://javascript.ruanyifeng.com/nodejs/basic.html#toc7)**

#### 概述

` Node.js ` 采用模块化结构，模块和文件是一一对应关系，即加载一个模块实际上就是加载对应的一个模块文件

` require ` 命令用于指定加载模块，加载时可以省略脚本文件的后缀名

```
const bar = require('./bar.js');

// or

const bar = require('./bar');
```

` require ` 方法的参数是模块文件的名字。它分成两种情况，第一种情况是参数中含有文件路径，这时路径是相对于当前脚本所在的目录，第二种情况是参数中不含有文件路径，这时 ` Node ` 到模块的安装目录，去寻找已安装的模块

```
const bar = require('bar');
```

有时候，一个模块本身就是一个目录，目录中包含多个文件。这时候，` Node ` 在 ` package.json ` 文件中，寻找 ` main ` 属性所指明的模块入口文件

```
{
    "name": "bar",
    "main": "./bar/bar.js"
}
```

上面代码中，模块的启动文件为 ` lib ` 子目录下的 ` bar.js `。当使用 ` requires('bar') ` 命令加载该模块时，实际上加载的是 ` ./node_modules/bar/lib/bar.js ` 文件。下面写法会起到同样效果

```
const bar = require('bar/lib/bar.js');
```
如果模块目录中没有 ` package.json ` 文件，` Node.js ` 会尝试在模块目录中寻找 ` index.js ` 或 ` index.node ` 文件进行加载

模块一旦被加载，就会被系统缓存。如果第二次还加载该模块，则会返回缓存中的版本，这意味着模块实际上只会执行一次。如果希望模块执行多次，则可以让模块返回一个函数，然后多次调用该函数

#### 核心模块

` Node.js ` 提供一系列功能模块，与操作系统互动，这些核心的功能模块不用安装就可以使用

- ` http ` => 提供 ` HTTP ` 服务器功能
- ` url ` => 解析 ` URL `
- ` fs ` => 与文件系统交互
- ` querystring ` => 解析 ` URL ` 的查询字符串
- ` child_process ` => 新建子进程
- ` util ` => 提供一系列使用小工具
- ` path ` => 处理文件路径
- ` crypto ` => 提供加密和解密功能，基本上是对 ` OpenSSl ` 的包装

核心模块总是最优先加载的。如果你自己写了一个 ` HTTP ` 模块，` require('http') ` 加载的还是核心模块

#### 自定义模块

自定义模块通过 ` module.exports ` 变量对外输出。` module ` 变量是整个模块的顶层变量，它的 ` exports ` 属性就是模块向外输出的接口。模块可以输出一个函数，也可以输出一个对象

```
// print.js

module.exports = message => console.log(message);

// out.js

module.exports = {
    print: message => console.log('message');
}
```

使用方法

```
const print = require('./print');
const out = require('./out');
print('这是自定义模块 -> 函数');
out.print('这是自定义模块 -> 对象');
```
