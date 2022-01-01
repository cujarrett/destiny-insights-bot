const { getVendorInventory } = require("../integrations/destiny-insights-backend.js")
const { addItem, getLastSoldItems } = require("../integrations/dynamodb.js")
const { isNewInventory } = require ("../util/is-new-inventory.js")
const { tweet } = require("../integrations/twitter.js")

const getRoll = (item) => {
  let roll = ""

  if (item.mobility || item.mobility === 0) {
    roll += `${item.mobility}-`
  }
  if (item.resilience || item.resilience === 0) {
    roll += `${item.resilience}-`
  }
  if (item.recovery || item.recovery === 0) {
    roll += `${item.recovery}-`
  }
  if (item.discipline || item.discipline === 0) {
    roll += `${item.discipline}-`
  }
  if (item.intellect || item.intellect === 0) {
    roll += `${item.intellect}-`
  }
  if (item.strength || item.strength === 0) {
    roll += `${item.strength}`
  }

  if (item.perks) {
    roll += `${item.perks}`
  }

  if (item.roll) {
    roll += `${item.roll}`
  }

  return roll
}

const getCompareStrings = (items) => {
  const results = []

  for (const item of items) {
    let itemCompareString = item.name
    itemCompareString += `${itemCompareString} ${getRoll(item)}`
    results.push({ name: itemCompareString })
  }
  return results
}

module.exports.xur = async () => {
  let result
  const { inventory: { armor, weapons } } = await getVendorInventory("xur")
  const currentInventory = [...weapons, ...armor]
  const exotics = currentInventory.filter((item) => item.type.startsWith("Exotic"))
  const lastSoldItems = await getLastSoldItems("xur", 7)
  const currentInventoryForCompare = getCompareStrings(exotics)
  const lastInventoryForCompare = getCompareStrings(lastSoldItems)
  const newInventory = await isNewInventory(currentInventoryForCompare, lastInventoryForCompare)

  if (newInventory) {
    // eslint-disable-next-line max-len
    const { inventory: { armor: doubleCheckedArmor, weapons: doubleCheckedWeapons } } = await getVendorInventory("xur")
    const doubleCheckedInventory = [...doubleCheckedArmor, ...doubleCheckedWeapons]
    // eslint-disable-next-line max-len
    const doubleCheckedExotics = doubleCheckedInventory.filter((item) => item.type.startsWith("Exotic"))
    const doubleCheckedInventoryForCompare = getCompareStrings(doubleCheckedExotics)
    // eslint-disable-next-line max-len
    const confirmedNewInventory = await isNewInventory(doubleCheckedInventoryForCompare, lastInventoryForCompare)
    if (confirmedNewInventory) {
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
    }
  } else {
    result = "New Xur tweet is not ready"
  }
  return result
}
