const db = require("../db");

// module.exports = db.defineModel("pets", {
//   ownerId: db.ID,
//   name: db.STRING(100),
//   gender: db.BOOLEAN,
//   birth: db.STRING(10)
// });

// 定义宠物表
const Pet = db.defineModel("demo_pets", {
  ownerId: db.ID,
  name: db.STRING(100),
  gender: db.BOOLEAN,
  birth: db.STRING(10)
});

// 添加新宠物
function addPet(ownerId, name, gender, birth) {
  // 向 Pet 表中插入数据
  return Pet.create({
    ownerId,
    name,
    gender,
    birth
  });
}

// 通过名称查找
function findByName(petName) {
  return Pet.findOne({ where: { name: petName } });
}

module.exports = {
  Pet,
  addPet,
  findByName
};
