const Sequelize = require('sequelize')
const Op = Sequelize.Op
const config = require('../config/development_config')
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $eq: Op.eq,
      $gt: Op.gt,
      $lt: Op.lt,
      $lte: Op.lte,
      $like: Op.like
    }
  })
const member_info = sequelize.define('member_info', {
  id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false},
  name: { type: Sequelize.STRING, allowNull: false},
  email: { type: Sequelize.STRING, allowNull: false},
  password: { type: Sequelize.STRING, allowNull: false},
  img: { type: Sequelize.BLOB, allowNull: true},
  img_name: { type: Sequelize.STRING, allowNull: true},
  update_date: { type: Sequelize.DATE, allowNull: true},
  create_date: { type: Sequelize.DATE, allowNull: false},
}, {
  timestamps: false,
  tableName: 'member_info'
})

member_info.sync()

module.exports = {
  member_info
}
