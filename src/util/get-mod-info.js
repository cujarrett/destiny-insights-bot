const { getModSalesInLastYear } = require("../integrations/dynamodb.js")
const { getOrdinal } = require("../util/get-ordinal.js")

module.exports.getModInfo = async (mod) => {
  const modSales = await getModSalesInLastYear(mod)
  const timesSoldInLastYear = modSales.length

  let timesSoldInLastYearMessage = `Sold ${timesSoldInLastYear} times in the last year`
  if (mod && timesSoldInLastYear === 1) {
    timesSoldInLastYearMessage = "First time sold in the last year"
  }

  let lastSoldDateMessage = undefined
  if (timesSoldInLastYear > 1) {
    // eslint-disable-next-line max-len
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    // eslint-disable-next-line newline-per-chained-call
    const lastSoldDate = new Date(modSales[1]).toISOString().split("T")[0]
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
  }

  let message = `${mod.name}
- ${timesSoldInLastYearMessage}`

  if (mod && timesSoldInLastYear > 1) {
    message += `\n- ${lastSoldDateMessage}`
  }

  return message
}
