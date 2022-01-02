module.exports.getRoll = (item) => {
  console.log("getRoll called")
  let roll = ""

  if (item.mobility || item.mobility === 0) {
    roll += `${item.mobility}-`
  }
  if (item.resilience || item.resilience === 0) {
    roll += `${item.resilience}-`
  }
  if (item.recovery || item.recovery === 0) {
    roll += `${item.recovery}-`
  }
  if (item.discipline || item.discipline === 0) {
    roll += `${item.discipline}-`
  }
  if (item.intellect || item.intellect === 0) {
    roll += `${item.intellect}-`
  }
  if (item.strength || item.strength === 0) {
    roll += `${item.strength}`
  }

  if (item.perks) {
    roll += `${item.perks}`
  }

  if (item.roll) {
    roll += `${item.roll}`
  }

  return roll
}
