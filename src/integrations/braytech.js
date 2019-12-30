const fetch = require("node-fetch")

module.exports.getModsForSale = async () => {
  const endpoint = "https://voluspa.braytech.org/vendor/?hash=672118013&defined=true"
  const options = {
    method: "GET",
    json: true
  }

  try {
    const rawResponse = await fetch(endpoint, options)
    const response = await rawResponse.json()
    const vendorData = response.Response.sales.data

    const modsData = Object.values(vendorData).filter((vendorItem) => {
      return vendorItem.itemDefinition.itemType === 19
    })
    const mods = modsData.map((modData) => modData.itemDefinition.displayProperties.name)
    return mods
  } catch (error) {
    throw new Error("Braytech is not available or not working.")
  }
}
