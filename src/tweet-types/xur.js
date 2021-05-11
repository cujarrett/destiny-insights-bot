const { getXur } = require("../integrations/destiny-insights-backend.js")
const { getLastXurTweetDate, tweet } = require("../integrations/twitter.js")

module.exports.xur = async () => {
  let result
  const xurResponse = await getXur()
  const lastUpdated = xurResponse.metadata.lastUpdated
  const lastUpdatedDate = new Date(lastUpdated)
  const lastXurTweet = await getLastXurTweetDate()
  const isTweetReady = lastUpdatedDate > lastXurTweet

  if (isTweetReady) {
    const inventory = xurResponse.inventory
    /* eslint-disable max-len */
    const message = `Xur is selling:

${inventory[0].name}

${inventory[1].name}
${inventory[1].mobility}-${inventory[1].resilience}-${inventory[1].recovery}-${inventory[1].discipline}-${inventory[1].intellect}-${inventory[1].strength} (${inventory[1].total})

${inventory[2].name}
${inventory[2].mobility}-${inventory[2].resilience}-${inventory[2].recovery}-${inventory[2].discipline}-${inventory[2].intellect}-${inventory[2].strength} (${inventory[2].total})

${inventory[3].name}
${inventory[3].mobility}-${inventory[3].resilience}-${inventory[3].recovery}-${inventory[3].discipline}-${inventory[3].intellect}-${inventory[3].strength} (${inventory[3].total})

Mob-Res-Rec-Dis-Int-Str

#Destiny2 #TwitterBot`
    /* eslint-enable max-len */
    await tweet(message)
    result = `Tweeted:\n${message}`
  } else {
    result = "New Xur tweet is not ready"
  }
  return result
}
