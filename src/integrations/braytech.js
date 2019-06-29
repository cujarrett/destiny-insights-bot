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
  
  const mods = Object.values(response.Response.sales.data).filter(i => i.itemDefinition.itemType === 19)
  
  stopwatch.stop()
  const braytechProcessTime = formatTime(stopwatch.time())

  return {
    mods: mods.map(m => m.itemDefinition.displayProperties.name),
    braytechProcessTime
  }
}
