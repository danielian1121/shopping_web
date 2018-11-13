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
    timezone: '+08:00',
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
const member = sequelize.define('member', {
  id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  img: { type: Sequelize.STRING, allowNull: true },
  img_name: { type: Sequelize.STRING, allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: false }
}, {
  timestamps: false,
  tableName: 'member'
})

const product = sequelize.define('product', {
  id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  price: { type: Sequelize.DECIMAL, allowNull: false },
  quantity: { type: Sequelize.INTEGER, allowNull: false },
  img: { type: Sequelize.STRING, allowNull: true },
  img_name: { type: Sequelize.STRING, allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  create_date: { type: Sequelize.DATE, allowNull: false },
  remark: { type: Sequelize.STRING, allowNull: true }
}, {
  timestamps: false,
  tableName: 'product'
})

const order = sequelize.define('order', {
  orderId: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
  memberId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'member',
      referencesKey: 'id'
    } },
  productId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'product',
      referencesKey: 'id'
    } },
  orderQuantity: { type: Sequelize.INTEGER, allowNull: false },
  orderPrice: { type: Sequelize.DECIMAL, allowNull: true },
  isComplete: { type: Sequelize.INTEGER, allowNull: true },
  update_date: { type: Sequelize.DATE, allowNull: true },
  order_date: { type: Sequelize.DATE, allowNull: false }
}, {
  timestamps: false,
  tableName: 'orderList'
})

member.hasMany(order)
product.hasMany(order)

product.sync()
member.sync()
order.sync()

module.exports = {
  member,
  product,
  order
}
