const fetch = require("node-fetch")
const StopWatch = require("statman-stopwatch")
const { formatTime } = require("../../src/util/format-time.js")

module.exports.getModsForSale = async () => {
  const endpoint = "https://voluspa.braytech.org/vendor/?hash=672118013&defined=true"

  const options = {
    method: "GET",
    json: true
  }

  const stopwatch = new StopWatch(true)
  const rawResponse = await fetch(endpoint, options)
  const response = await rawResponse.json()
  const vendorData = response.Response.sales.data

  const modsData = Object.values(vendorData).filter((vendorItem) => {
    return vendorItem.itemDefinition.itemType === 19
  })

  stopwatch.stop()
  const braytechProcessTime = formatTime(stopwatch.time())
  const mods = modsData.map((modData) => modData.itemDefinition.displayProperties.name)

  return {
    mods,
    braytechProcessTime
  }
}
