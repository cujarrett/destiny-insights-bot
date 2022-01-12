const { getVendorInventory } = require("../integrations/destiny-insights-backend.js")
const { addItem, getLastSoldItems } = require("../integrations/dynamodb.js")
const { isNewInventory } = require ("../util/is-new-inventory.js")
const { tweet } = require("../integrations/twitter.js")

module.exports.getmodTweetMessage = (ada1Mod1, ada1Mod2, banshee44Mod1, banshee44Mod2) => {
  return `Ada-1 mods for sale:
- ${ada1Mod1}
- ${ada1Mod2}

Banshee-44 mods for sale:
- ${banshee44Mod1}
- ${banshee44Mod2}

Mod sale stats available at https://destinyinsights.com

#Destiny2 #TwitterBot`
}

module.exports.mods = async () => {
  let result
  const { inventory: { mods: currentAda1Mods } } = await getVendorInventory("ada-1")
  const lastSoldAda1Mods = await getLastSoldItems("ada-1", 1)
  const newAda1Inventory = await isNewInventory(currentAda1Mods, lastSoldAda1Mods)

  if (newAda1Inventory) {
    const timestamp = new Date().toISOString()
    for (const mod of currentAda1Mods) {
      mod.source = "ada-1"
      await addItem(mod, timestamp)
    }
    const ada1Mod1 = currentAda1Mods[0].name
    const ada1Mod2 = currentAda1Mods[1].name

    const { inventory: { mods: currentBanshee44Mods } } = await getVendorInventory("banshee-44")
    for (const mod of currentBanshee44Mods) {
      mod.source = "banshee-44"
      await addItem(mod, timestamp)
    }
    const banshee44Mod1 = currentBanshee44Mods[0].name
    const banshee44Mod2 = currentBanshee44Mods[1].name

    const message = this.getmodTweetMessage(ada1Mod1, ada1Mod2, banshee44Mod1, banshee44Mod2)

    await tweet(message)
    result = `Tweeted:\n${message}`
  } else {
    result = "New mods tweet is not ready"
  }
  return result
}
