## 版本管理工具 ` nvm `

**注： 来自阮一峰老师的 [JavaScript 标准参考教程](http://javascript.ruanyifeng.com/nodejs/basic.html#toc2)**

如果想在同一台机器同时安装多个版本的 ` Node.js `，就需要用到版本管理工具 ` nvm `

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash

// or

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
```

之后

```
source ~/.nvm/nvm.sh
nvm --version
```

安装以后，` nvm ` 的执行脚本每次使用前都要激活，建议将其加入 ` ~/.bashrc ` 文件（假定使用 ` bash `）。激活后就可以安装指定版本的 ` Node `

```
// 安装最新版本 Node.js
nvm install node

// 安装指定版本 Node.js
nvm install 8.5.0

// 使用已安装的最新版本
nvm use node

// 使用版本的 Node.js
nvm use 8.5.0
```

如果在项目根目录下新建一个 ` .nvmrc ` 文件，将版本号写入其中，就只输入 ` nvm use ` 命令即可，不再需要附加版本号

下面是其他经常用到的命令

```
nvm ls  // 查看本地安装的所有版本

nvm ls-remote  // 查看服务器上所有可供安装的版本

nvm deactivate  // 退出已经激活的 nvm，使用 deactivate 命令
```

` nvm ` 也允许进入指定版本的 ` REPL ` 环境

```
nvm run 8.5.0
```

#### REPL 环境
在命令行键入 ` node ` 命令，后面没有文件名，就进入一个 ` Node.js ` 的 ` REPL ` 环境（` Read-eval-print loop `，读取-求值-输出 循环），可以直接运行各种 ` JavaScript ` 命令。如果使用参数 ` --use_strict `，则 ` REPL ` 将在严格模式下运行

```
node --use_strict
```

在 ` REPL ` 环境中，特殊变量下划线 ` _ ` 表示上一个命令的返回结果。在 ` REPL ` 环境中，如果运行一个表达式，会直接在命令行返回结果。如果运行一条语句，就不会有任何输出，因为语句没有返回值

