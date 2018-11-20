module.exports = {
  "GET /": async (ctx, next) => {
    ctx.render("index.html", {
      title: "Sign In"
    });
  },
  "GET /register": async (ctx, next) => {
    ctx.render("register.html", {
      title: "Register"
    });
  },
  "GET /signin": async (ctx, next) => {
    ctx.render("signin.html", {
      title: "Sign In"
    });
  },
  "GET /index": async (ctx, next) => {
    ctx.render("index.html", {
      title: "index"
    });
  },
  "GET /togif": async (ctx, next) => {
    ctx.render("to-gif.html", {
      title: "index"
    });
  }
};
