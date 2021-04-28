
const db = require("../database/db")

module.exports = app => {
  const { STRING, BOOLEAN } = app.Sequelize

  const Roles = db.defineModel(app, "system_roles", {
    name: STRING, // 名字
    describe: STRING, // 角色描述
    status: { type: BOOLEAN, defaultValue: true }, //  用户状态： false:禁用, true:启用
  })
  console.log("Roles++++++++++++++++++++++++++", Roles)
  return Roles
}
