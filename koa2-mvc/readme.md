# 项目文件介绍

## middleware 文件夹

存放所有的中间件

中间件介绍：

- static-files.js -- 处理静态文件的 middleware

- controller.js -- 处理路由文件的 middleware

- templating.js -- 给 ctx 对象绑定一个 render(view, model)的方法

## db 文件夹 

存放数据库相关文件

- models -- 表 model

- model.js -- 用来扫描 models 文件夹，抛出数据库处理方法

- db.js -- model 统一处理

- config.js -- 数据库配置文件

- init-data.js -- 初始化数据库数据

## static 文件夹 

存放静态资源

## views 文件夹 

存放模板页面

## 运行项目

1. 安装依赖

```
	npm install
```

2. 修改 db 文件夹下的 config.js 文件中的数据库配置

请注意，运行项目会在连接的数据中同步 model 表结构

- demo_users —— 用户表

- demo_pets  —— 宠物表

如果不想初始化数据可在 app.js 中注释掉下边代码：
```
	// 初始化数据
	require("./db/init-data")()();
```


3. 启动项目

```
	npm start
```

如过报错数据库某一个表不存在，原因是在数据库中同步表结构未完成就开始添加数据

解决办法：
重新启动项目，或者在 bd 文件夹下的 init-data.js 中修改 `sleep(900)` 时间

