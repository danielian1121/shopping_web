require('dotenv').config()

const config = {}

Object.defineProperties(config, {
  'database': {
    value: 'shopping'
  },
  'username': {
    value: 'daniel'
  },
  'password': {
    value: '1121'
  },
  'host': {
    value: 'localhost'
  },
  'dialect': {
    value: 'mysql'
  }
})
module.exports = config
