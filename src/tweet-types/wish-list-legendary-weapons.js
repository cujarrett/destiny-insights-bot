const { getVendorInventory } = require("../integrations/destiny-insights-backend.js")
const { addItem, getLastSoldItems } = require("../integrations/dynamodb.js")
const { getCompareStrings } = require("../util/get-compare-strings.js")
const { getRoll } = require("../util/get-roll.js")
const { isNewInventory } = require ("../util/is-new-inventory.js")
const { prettyVendorNames } = require("../data/pretty-vendor-names.js")
const { tweet } = require("../integrations/twitter.js")

const getTweetMessage = (vendor, weapon) => {
  // eslint-disable-next-line max-len
  const message = `👀 Community Wish List Legendary Weapon 👀

${prettyVendorNames[vendor]} is selling a ${weapon.type}:

${weapon.name}
- ${[...weapon.perks].join("\n- ")}

#Destiny2 #TwitterBot`

  return message
}

module.exports.wishListLegendaryWeapons = async (vendor) => {
  console.log(`wishListLegendaryWeapons called for ${vendor}`)
  let result
  const { inventory: { weapons } } = await getVendorInventory(vendor)
  const currentInventory = [...weapons]
  const legendaryWeapons = currentInventory.filter((item) => item.type.startsWith("Legendary"))

  const wishListWeapons = []
  for (const item of legendaryWeapons) {
    if (item.wishList) {
      wishListWeapons.push(item)
    }
  }
  const currentInventoryForCompare = getCompareStrings(wishListWeapons)
  const lastSoldItems = await getLastSoldItems(vendor, 7)
  // Looking for , in the roll finds armor as weapons are comma separated
  // eslint-disable-next-line max-len
  const legendaryLastSoldWeapons = lastSoldItems.filter((item) => item.type.startsWith("Legendary") && item.roll.includes(","))
  const lastLegendaryWeaponsInventoryForCompare = getCompareStrings(legendaryLastSoldWeapons)
  // eslint-disable-next-line max-len
  const newInventory = await isNewInventory(currentInventoryForCompare, lastLegendaryWeaponsInventoryForCompare)

  if (newInventory) {
    const timestamp = new Date().toISOString()
    for (const weapon of wishListWeapons) {
      weapon.source = vendor
      weapon.roll = getRoll(weapon)
      await addItem(weapon, timestamp)
      const message = getTweetMessage(vendor, weapon)
      await tweet(message)
      result = `Tweeted:\n${message}`
    }
  } else {
    result = `New ${prettyVendorNames[vendor]} legendary wish list weapons tweet is not ready`
  }
  return result
}
