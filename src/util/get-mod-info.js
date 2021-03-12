const { getOrdinal } = require("./get-ordinal.js")

module.exports.getModInfo = (mod) => {
  const timesSoldInLastYear = mod.timesSoldInLastYear

  let timesSoldInLastYearMessage = `Sold ${timesSoldInLastYear} times in the last year`
  if (mod && mod.timesSoldInLastYear === 1) {
    timesSoldInLastYearMessage = "First time sold in the last year"
  }

  // eslint-disable-next-line max-len
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let lastSoldDateMessage = undefined
  const lastSoldDate = mod.lastSold
  const year = lastSoldDate.substring(0, 4)
  // monthNumber - 1 to account for zero based array counting
  const monthNumber = Number(lastSoldDate.substring(5, 7)) - 1
  const month = months[monthNumber]
  let day = lastSoldDate.substring(8)
  if (day.startsWith("0")) {
    day = day.substring(1)
  }
  const ordinal = getOrdinal(day)
  lastSoldDateMessage = `Last sold ${month} ${day}${ordinal} ${year}`

  let soldRate = timesSoldInLastYear / 365 * 100
  soldRate = soldRate.toFixed(2)

  let message = `${mod.name}
- ${timesSoldInLastYearMessage}
- ${soldRate}% year drop rate`

  if (mod && mod.timesSoldInLastYear > 1) {
    message += `\n- ${lastSoldDateMessage}`
  }

  return message
}
