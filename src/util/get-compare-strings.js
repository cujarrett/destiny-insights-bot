const { getRoll } = require("./get-roll.js")

module.exports.getCompareStrings = (items) => {
  console.log("getCompareStrings called")
  const results = []

  for (const item of items) {
    const itemCompareString = `${item.name} ${getRoll(item)}`
    results.push({ name: itemCompareString })
  }

  return results
}
