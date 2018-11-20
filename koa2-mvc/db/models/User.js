const db = require("../db");

// module.exports = db.defineModel("users", {
//   email: {
//     type: db.STRING(100),
//     unique: true
//   },
//   passwd: db.STRING(100),
//   name: db.STRING(100),
//   gender: db.BOOLEAN
// });

// 定义用户表
const User = db.defineModel("demo_users", {
  email: {
    type: db.STRING(100),
    unique: true // 唯一
  },
  passwd: db.STRING(100),
  name: db.STRING(100),
  gender: db.BOOLEAN
});

// 添加新用户
function addUser(name, passwd, gender, email) {
  // 向 user 表中插入数据
  return User.create({
    email,
    passwd,
    name,
    gender
  });
}

// 通过用户名查找用户
function findByName(userName) {
  return User.findOne({ where: { name: userName } });
}

module.exports = {
  User,
  addUser,
  findByName
};
