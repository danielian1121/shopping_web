const config = {}

Object.defineProperties(config, {
  host: {
    value: 'localhost'
  },
  protocol: {
    value: 'http'
  },
  port: {
    value: 3000
  },
  url: {
    get () {
      return `${config.protocol}://${config.host}:${config.port}`
    }
  },
  staticUrl: {
    get () {
      return config.url
    }
  }
})

module.exports = config
