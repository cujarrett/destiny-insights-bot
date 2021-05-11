const { getAda1 } = require("../integrations/destiny-insights-backend.js")
const { getLastAda1TweetDate, tweet } = require("../integrations/twitter.js")
const { getModInfo } = require("../util/get-mod-info.js")

module.exports.getAda1TweetMessage = (mod1Info, mod2Info) => {
  return `Ada-1 is selling:

${mod1Info}

${mod2Info}

#Destiny2 #TwitterBot`
}

module.exports.ada1 = async () => {
  let result
  const modsResponse = await getAda1()
  const lastUpdated = modsResponse.metadata.lastUpdated
  const lastUpdatedDate = new Date(lastUpdated)
  const lastModTweet = await getLastAda1TweetDate()
  const isTweetReady = lastUpdatedDate > lastModTweet

  if (isTweetReady) {
    const mods = modsResponse.inventory
    const [mod1, mod2] = mods
    const mod1Info = getModInfo(mod1)
    const mod2Info = getModInfo(mod2)
    const message = this.getAda1TweetMessage(mod1Info, mod2Info)
    await tweet(message)
    result = `Tweeted:\n${message}`
  } else {
    result = "New Ada-1 mods tweet is not ready"
  }
  return result
}
