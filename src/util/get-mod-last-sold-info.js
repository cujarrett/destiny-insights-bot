const { getModSalesInLastYear } = require("../integrations/dynamodb.js")
const { getOrdinal } = require("./get-ordinal.js")

module.exports.getModLastSoldInfo = async (mod) => {
  const modSales = await getModSalesInLastYear(mod)
  const timesSoldInLastYear = modSales.length

  let lastSoldMessage = undefined
  if (timesSoldInLastYear > 1) {
    // eslint-disable-next-line max-len
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    // eslint-disable-next-line newline-per-chained-call
    const lastSoldDate = new Date(modSales[1]).toISOString().split("T")[0]
    // monthNumber - 1 to account for zero based array counting
    const monthNumber = Number(lastSoldDate.substring(5, 7)) - 1
    const month = months[monthNumber]
    let day = lastSoldDate.substring(8)
    if (day.startsWith("0")) {
      day = day.substring(1)
    }
    const ordinal = getOrdinal(day)
    lastSoldMessage = `📅 ${month} ${day}${ordinal}`
  } else {
    lastSoldMessage = "🚨 First sale in the last year"
  }

  return lastSoldMessage
}
