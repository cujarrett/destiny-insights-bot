const os = require("os")
const path = require("path")
const nconf = require("nconf")

nconf.stores = {}
nconf.env()

const homeDirectory = os.homedir()
const configFilePath = path.join(homeDirectory, ".destiny-insights-bot.ini")

nconf.use("file", {
  file: configFilePath,
  format: nconf.formats.ini
})

module.exports = nconf.get()
