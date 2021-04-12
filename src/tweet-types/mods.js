const { getMods } = require("../integrations/destiny-insights-backend.js")
const { getLastModTweetDate, tweet } = require("../integrations/twitter.js")
const { getOrdinal } = require("../util/get-ordinal.js")

module.exports.getModInfo = (mod) => {
  const timesSoldInLastYear = mod.timesSoldInLastYear

  let timesSoldInLastYearMessage = `Sold ${timesSoldInLastYear} times in the last year`
  if (mod && mod.timesSoldInLastYear === 1) {
    timesSoldInLastYearMessage = "First time sold in the last year"
  }

  // eslint-disable-next-line max-len
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let lastSoldDateMessage = undefined
  const lastSoldDate = mod.lastSold
  const year = lastSoldDate.substring(0, 4)
  // monthNumber - 1 to account for zero based array counting
  const monthNumber = Number(lastSoldDate.substring(5, 7)) - 1
  const month = months[monthNumber]
  let day = lastSoldDate.substring(8)
  if (day.startsWith("0")) {
    day = day.substring(1)
  }
  const ordinal = getOrdinal(day)
  lastSoldDateMessage = `Last sold ${month} ${day}${ordinal} ${year}`

  let message = `${mod.name}
- ${timesSoldInLastYearMessage}`

  if (mod && mod.timesSoldInLastYear > 1) {
    message += `\n- ${lastSoldDateMessage}`
  }

  return message
}

module.exports.getTweetMessage = (mod1Info, mod2Info) => {
  return `Banshee-44 is selling:

${mod1Info}

${mod2Info}

#Destiny2 #TwitterBot`
}

module.exports.mods = async () => {
  let result
  const modsResponse = await getMods()
  const lastUpdated = modsResponse.metadata.lastUpdated
  const lastUpdatedDate = new Date(lastUpdated)
  const lastModTweet = await getLastModTweetDate()
  const isTweetReady = lastUpdatedDate > lastModTweet

  if (isTweetReady) {
    const mods = modsResponse.inventory
    const [mod1, mod2] = mods
    const mod1Info = this.getModInfo(mod1)
    const mod2Info = this.getModInfo(mod2)
    const message = this.getTweetMessage(mod1Info, mod2Info)
    await tweet(message)
    result = `Tweeted:\n${message}`
  } else {
    result = "New mods tweet is not ready"
  }
  return result
}
