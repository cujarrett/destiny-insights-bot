module.exports.isNewInventory = async (currentItems, lastSoldItems) => {
  let newItemsFound = false
  const lastSoldItemNames = lastSoldItems.map((value) => value.name)

  for (const currentItem of currentItems) {
    if (!lastSoldItemNames.includes(currentItem.name)) {
      newItemsFound = true
    }
  }

  return newItemsFound
}
