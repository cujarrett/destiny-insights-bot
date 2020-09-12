module.exports.getOrdinal = (day) => {
  if (day > 3 && day < 21) {
    return "th"
  } else if (day % 10 === 1) {
    return "st"
  } else if (day % 10 === 2) {
    return "nd"
  } else if (day % 10 === 3) {
    return "rd"
  } else {
    return "th"
  }
}
