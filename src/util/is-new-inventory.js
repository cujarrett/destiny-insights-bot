module.exports.isNewInventory = async (currentItems, lastSoldItems) => {
  console.log("isNewInventory called")
  const noRecentItems = lastSoldItems.length === 0
  let newItemsFound = false
  const lastSoldItemNames = lastSoldItems.map((value) => value.name)

  for (const currentItem of currentItems) {
    if (!lastSoldItemNames.includes(currentItem.name)) {
      newItemsFound = true
    }
  }
  return noRecentItems || newItemsFound
}
