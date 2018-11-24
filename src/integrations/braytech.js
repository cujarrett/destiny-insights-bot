const fetch = require("node-fetch")
const StopWatch = require("statman-stopwatch")
const { formatTime } = require("../../src/util/format-time.js")

module.exports.getModsForSale = async () => {
  const endpoint = "https://api.braytech.org/?request=vendor&hash=672118013&defined"

  const options = {
    method: "GET",
    json: true
  }

  const stopwatch = new StopWatch(true)
  const rawResponse = await fetch(endpoint, options)
  const response = await rawResponse.json()
  const firstMod = await response.response.data[0].sales[1].item.perks[0].displayProperties.name
  const secondMod = await response.response.data[0].sales[2].item.perks[0].displayProperties.name
  stopwatch.stop()
  const braytechProcessTime = formatTime(stopwatch.time())

  return {
    mods: [firstMod, secondMod],
    braytechProcessTime
  }
}
