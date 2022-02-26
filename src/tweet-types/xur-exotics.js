const { getVendorInventory } = require("../integrations/destiny-insights-backend.js")
const { addItem, getLastSoldItems } = require("../integrations/dynamodb.js")
const { isNewInventory } = require ("../util/is-new-inventory.js")
const { tweet } = require("../integrations/twitter.js")
const { getCompareStrings } = require("../util/get-compare-strings.js")
const { getRoll } = require("../util/get-roll.js")

module.exports.xurExotics = async () => {
  let result
  const { inventory: { armor, weapons } } = await getVendorInventory("xur")
  const removedRandomExoticWeapons = weapons
  // eslint-disable-next-line max-len
  // Remove Hawkmoon and Dead Mans Tale as they are static sold and wishlist rolls are handled by wish list weapon tweet(s)
  removedRandomExoticWeapons.splice(1, 1)
  removedRandomExoticWeapons.splice(1, 1)
  console.log(removedRandomExoticWeapons)
  const currentInventory = [...weapons, ...armor]
  const exotics = currentInventory.filter((item) => item.type.startsWith("Exotic"))
  const lastSoldItems = await getLastSoldItems("xur", 7)
  const currentInventoryForCompare = getCompareStrings(exotics)
  const lastInventoryForCompare = getCompareStrings(lastSoldItems)
  const newInventory = await isNewInventory(currentInventoryForCompare, lastInventoryForCompare)

  if (newInventory) {
    const timestamp = new Date().toISOString()
    for (const item of exotics) {
      item.source = "xur"
      item.roll = getRoll(item)
      await addItem(item, timestamp)
    }
    /* eslint-disable max-len */
    const message = `Xur is selling:

${exotics[0].name}

${exotics[1].name}
${exotics[1].mobility}-${exotics[1].resilience}-${exotics[1].recovery}-${exotics[1].discipline}-${exotics[1].intellect}-${exotics[1].strength} (${exotics[1].total})

${exotics[2].name}
${exotics[2].mobility}-${exotics[2].resilience}-${exotics[2].recovery}-${exotics[2].discipline}-${exotics[2].intellect}-${exotics[2].strength} (${exotics[2].total})

${exotics[3].name}
${exotics[3].mobility}-${exotics[3].resilience}-${exotics[3].recovery}-${exotics[3].discipline}-${exotics[3].intellect}-${exotics[3].strength} (${exotics[3].total})

Mob-Res-Rec-Dis-Int-Str

#Destiny2 #TwitterBot`

    await tweet(message)
    result = `Tweeted:\n${message}`
  } else {
    result = "New Xur exotics tweet is not ready"
  }
  return result
}
