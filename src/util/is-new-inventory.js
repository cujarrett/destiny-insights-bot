module.exports.isNewInventory = async (currentItems, lastSoldItems) => {
  console.log({ currentItems })
  console.log({ lastSoldItems })
  let newItemsFound = false
  const lastSoldItemNames = lastSoldItems.map((value) => value.name)

  console.log({ lastSoldItemNames })

  for (const currentItem of currentItems) {
    if (!lastSoldItemNames.includes(currentItem.name)) {
      console.log(`New item found: ${currentItem.name}`)
      newItemsFound = true
    }
  }

  return newItemsFound
}
