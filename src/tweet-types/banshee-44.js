const { getBanshee44 } = require("../integrations/destiny-insights-backend.js")
const { getLastBanshee44TweetDate, tweet } = require("../integrations/twitter.js")
const { getModInfo } = require("../util/get-mod-info.js")

module.exports.getBanshee44TweetMessage = (mod1Info, mod2Info) => {
  return `Banshee-44 is selling:

${mod1Info}

${mod2Info}

#Destiny2 #TwitterBot`
}

module.exports.banshee44 = async () => {
  let result
  const modsResponse = await getBanshee44()
  const lastUpdated = modsResponse.metadata.lastUpdated
  const lastUpdatedDate = new Date(lastUpdated)
  const lastModTweet = await getLastBanshee44TweetDate()
  const isTweetReady = lastUpdatedDate > lastModTweet

  if (isTweetReady) {
    const mods = modsResponse.inventory
    const [mod1, mod2] = mods
    const mod1Info = getModInfo(mod1)
    const mod2Info = getModInfo(mod2)
    const message = this.getBanshee44TweetMessage(mod1Info, mod2Info)
    await tweet(message)
    result = `Tweeted:\n${message}`
  } else {
    result = "New Banshee-44 mods tweet is not ready"
  }
  return result
}
