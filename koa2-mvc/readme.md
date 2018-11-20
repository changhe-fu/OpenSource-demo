# 项目文件介绍

### middleware 文件夹 （存放所有的中间件）

中间件介绍：

- static-files.js -- 处理静态文件的 middleware

- controller.js -- 处理路由文件的 middleware

- templating.js -- 给 ctx 对象绑定一个 render(view, model)的方法

### db 文件夹 （存放数据库相关文件）

- models -- 表 model

- model.js -- 用来扫描 models 文件夹，抛出数据库处理方法

- db.js -- model 统一处理

- config.js -- 数据库配置文件

- init-data.js -- 初始化数据库数据

### static 文件夹 （存放静态资源）

### views 文件夹 （存放模板页面）

