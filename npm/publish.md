## 发布 npm 包

#### 修改 ` package.json `

- ` name ` => 不可以和其他 npm 包同名
- ` bin ` => 命令行生成的命令（中间位置），` Object `。用来指定各个内部命令对应的可执行文件的位置
    ```
    "bin": {
        "todo": "file.js" // todo => 命令   file.js => 所对应的的文件
    }
    ```
- ` files ` => 告诉 npm 那些文件有用 ` Array `
    ```
    "files": ["index.js", "app.js", "README.md"],
    ```
- ` main ` => 指定加载的入口文件

#### 命令文件中增加 shebang
node shebang => ` #!/usr/bin/env node ` => 告诉命令行用什么执行代码

#### 将命令文件变为可执行文件
```
chmod +x file.js   // macOs + linux
```

#### 发布

**注：发布时需要切换至原始源**

```
npm adduser
npm publish
```

安装
```
yarn global add <packageName>
```

如果要更新，将 ` package.json ` 中的 ` version ` 改掉，之后重新 ` npm publish ` 即可

