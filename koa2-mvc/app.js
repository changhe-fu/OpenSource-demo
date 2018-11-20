const Koa = require("koa");

// 提供post请求的body解析
const bodyParser = require("koa-bodyparser");

// 导入controller middleware:
const controller = require("./middleware/controller");

// 给ctx对象绑定一个render(view, model)方法
const templating = require("./middleware/templating");

// 初始化数据
require("./db/init-data")()();

const app = new Koa();

// 生产环境上必须配置环境变量NODE_ENV = 'production'，而开发环境不需要配置，实际上NODE_ENV可能是undefined，所以判断的时候，不要用NODE_ENV === 'development'。
const isProduction = process.env.NODE_ENV === "production";

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  var start = new Date().getTime(),
    execTime;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set("X-Response-Time", `${execTime}ms`);
});

// 导入静态文件的 middleware:
// 在生产环境下，静态文件是由部署在最前面的反向代理服务器（如Nginx）处理的。而在开发环境下，我们希望koa能顺带处理静态文件
if (!isProduction) {
  let staticFiles = require("./middleware/static-files");
  app.use(staticFiles("/static/", __dirname + "/static"));
}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(
  templating("views", {
    noCache: !isProduction, // 是生产环境，就使用缓存
    watch: !isProduction
  })
);

// add controller:
app.use(controller());

app.listen(3000);
console.log("app started at port 3000...");
