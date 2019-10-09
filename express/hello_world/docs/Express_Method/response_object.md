## response object

#### ` response.redirect ` 方法

该方法允许网址的重定向

```
response.redirect([status,] path);

response.redirect('http://google.com');
response.redirect(404, '/about');
```

#### ` response.render ` 方法

该方法用于渲染网页模板

```
response.render(view [, locals] [, callback]);

app.get('/', (req, res) => {
   res.render('index', {message: 'hello world'}); 
});
```

上面代码使用 ` render ` 方法，将 ` message ` 变量传入 ` index ` 模板，渲染成 ` HTML ` 网页
