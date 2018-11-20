/**
 * 初始化数据中间件
 * 同步所有尚未在数据库中的模型，并添加初始数据
 */

const model = require("./model");
function sleep(time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

function initData() {
  let Pet = model.Pet,
    User = model.User;

  return async () => {
    console.log("----------init data ");
    //  同步所有尚未在数据库中的模型
    model.sync();

    // 立即添加数据，会报错：表不存在
    console.time("db is ok");
    await sleep(900);
    console.timeEnd("db is ok");

    console.log("---------- start adding data ------ ");
    // 初始化用户表数据
    var userInfo = await User.addUser("构造a", 123123, false, "gouzi@qq.com");
    console.log("-- init userInfo", userInfo.id);

    // 初始化宠物
    var petInfo = await Pet.addPet(userInfo.id, "狗蛋儿2", false, "2008-11-01");
    console.log("-- init petInfo", JSON.stringify(petInfo));

    console.log("----------init data end -------------- ");
  };
}

module.exports = initData;
