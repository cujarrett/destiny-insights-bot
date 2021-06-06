module.exports.isNewInventory = async (currentItems, lastSoldItems) => {
  console.log("isNewInventory called")
  console.log("currentItems")
  console.log(currentItems)
  console.log("lastSoldItems")
  console.log(lastSoldItems)
  let newItemsFound = false
  console.log({ newItemsFound })
  const lastSoldItemNames = lastSoldItems.map((value) => value.name)
  console.log({ lastSoldItemNames })

  for (const currentItem of currentItems) {
    console.log({ currentItem })
    if (!lastSoldItemNames.includes(currentItem.name)) {
      console.log({ "currentItem.name": currentItem.name })
      // eslint-disable-next-line max-len
      console.log({ "!lastSoldItemNames.includes(currentItem.name)": !lastSoldItemNames.includes(currentItem.name) })
      newItemsFound = true
    }
    console.log({ newItemsFound })
  }

  console.log({ newItemsFound })
  return newItemsFound
}
