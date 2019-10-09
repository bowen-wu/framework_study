## set method

` set ` 方法用于指定变量的值

```
app.set('view', __dirname + '/views');

app.set('view engine', 'jade');
```

上面代码使用 ` set ` 方法，为系统变量 ` view ` 和 ` view engine ` 指定值

如果想获取该值，需要使用 ` app.get() ` 方法

```
app.get('view');

app.get('view engine'); // 'jade'
```
