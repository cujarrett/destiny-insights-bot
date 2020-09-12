const { getOrdinal } = require("./get-ordinal.js")

module.exports.getModDetails = async (modData) => {
  const dropCount = modData.length
  let dropRate = modData.length / 365 * 100

  if (dropRate !== 0) {
    dropRate = dropRate.toFixed(2)
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]

  let lastDropDate

  if (modData[1] && modData[1].timestamp) {
    lastDropDate = new Date(modData[1].timestamp)
    const year = lastDropDate.getFullYear()
    const month = months[lastDropDate.getMonth()]
    const day = lastDropDate.getDate()
    const ordinal = getOrdinal(day)
    lastDropDate = `${month} ${day}${ordinal} ${year}`
  }

  return {
    dropCount,
    dropRate,
    lastDropDate
  }
}
