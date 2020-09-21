const { getOrdinal } = require("./get-ordinal.js")

module.exports.getModDetails = async (modData) => {
  let soldCountMessage = ""
  let soldRateMessage = ""
  let lastSoldDateMessage = ""

  const soldCount = modData.length
  if (soldCount === 0) {
    soldCountMessage = "Not sold in the last year"
  } else {
    soldCountMessage = `Sold ${soldCount} times in the last year`
  }

  let soldRate = soldCount / 365 * 100
  if (soldRate !== 0) {
    soldRate = soldRate.toFixed(2)
  }
  soldRateMessage = `${soldRate}% year drop rate`

  // eslint-disable-next-line max-len
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  if (modData[0] && modData[0].timestamp) {
    const lastSoldDate = new Date(modData[0].timestamp)
    const year = lastSoldDate.getFullYear()
    const month = months[lastSoldDate.getMonth()]
    const day = lastSoldDate.getDate()
    const ordinal = getOrdinal(day)
    lastSoldDateMessage = `Last sold ${month} ${day}${ordinal} ${year}`
  }

  if (soldCount < 1) {
    return {
      soldCountMessage,
      soldRateMessage
    }
  } else {
    return {
      soldCountMessage,
      soldRateMessage,
      lastSoldDateMessage
    }
  }
}
