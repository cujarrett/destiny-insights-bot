const { getVendorInventory } = require("../integrations/destiny-insights-backend.js")
const { addItem, getLastSoldItems } = require("../integrations/dynamodb.js")
const { isNewInventory } = require ("../util/is-new-inventory.js")
const { getModLastSoldInfo } = require("../util/get-mod-last-sold-info.js")
const { prettyVendorNames } = require("../data/pretty-vendor-names.js")
const { tweet } = require("../integrations/twitter.js")

module.exports.getmodTweetMessage = async (vendor, mod1, mod2, mod3, mod4) => {
  const mod1LastSoldInfo = await getModLastSoldInfo(mod1)
  const mod2LastSoldInfo = await getModLastSoldInfo(mod2)
  const mod3LastSoldInfo = await getModLastSoldInfo(mod3)
  const mod4LastSoldInfo = await getModLastSoldInfo(mod4)

  return `${prettyVendorNames[vendor]} is selling:
- ${mod1.name} (${mod1LastSoldInfo})
- ${mod2.name} (${mod2LastSoldInfo})
- ${mod3.name} (${mod3LastSoldInfo})
- ${mod4.name} (${mod4LastSoldInfo})

#Destiny2 #TwitterBot`
}

module.exports.mods = async (vendor) => {
  console.log(`mods called for ${vendor}`)
  let result
  const { inventory: { mods } } = await getVendorInventory(vendor)
  const lastSoldVendorMods = await getLastSoldItems(vendor, 1)
  const newVendorInventory = await isNewInventory(mods, lastSoldVendorMods)

  if (newVendorInventory) {
    const timestamp = new Date().toISOString()
    for (const mod of mods) {
      mod.source = vendor
      await addItem(mod, timestamp)
    }
    const [mod1, mod2, mod3, mod4] = mods

    const message = await this.getmodTweetMessage(vendor, mod1, mod2, mod3, mod4)

    await tweet(message)
    result = `Tweeted:\n${message}`
  } else {
    result = "New mods tweet is not ready"
  }
  return result
}
