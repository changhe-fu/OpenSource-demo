// sign in:
const model = require("../../db/model");
let User = model.User;
module.exports = {
  "POST /signin": async (ctx, next) => {
    var username = ctx.request.body.username || "",
      password = ctx.request.body.password || "";

    const userInfo = await User.findByName(username);
    console.log("----userInfo:", userInfo);
    if (userInfo === null || (username != userInfo.name && password != userInfo.passwd)) {
      console.log("signin failed!");
      ctx.render("signin-failed.html", {
        title: "Sign In Failed"
      });
    } else {
      ctx.render("signin-ok.html", {
        title: "Sign In OK",
        name: userInfo.name,
        userInfo: JSON.stringify(userInfo)
      });
    }
  },
  "POST /register": async (ctx, next) => {
    var username = ctx.request.body.username || "",
      password = ctx.request.body.password || "",
      gender = !!ctx.request.body.gender,
      email = ctx.request.body.email || "";

    var res = await User.addUser(username, password, gender, email);
    ctx.render("index.html", {
      title: "hpcode"
    });
  }
};
