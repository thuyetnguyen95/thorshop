const generateTodayDate = (includeHour = true) => {
  const date = new Date()
  const y = date.getFullYear()
  const m = ('0' + (date.getMonth() + 1)).slice(-2)
  const d = ('0' + date.getDate()).slice(-2)
  const h = ('0' + date.getHours()).slice(-2)
  const mn = ('0' + date.getMinutes()).slice(-2)

  if (includeHour) {
    return `${y}-${m}-${d} ${h}:${mn}`
  }

  return `${y}-${m}-${d}`
}

const parseNormalDate = dateStr => {
  let date = new Date(dateStr)
  const y = date.getFullYear()
  const m = ('0' + (date.getMonth() + 1)).slice(-2)
  const d = ('0' + date.getDate()).slice(-2)

  return `${y}-${m}-${d}`
}

const equalDate = (d1, d2) => {
  let d1Parser = parseNormalDate(d1)
  let d2Parser = parseNormalDate(d2)

  return d1Parser === d2Parser
}

module.exports = {
  generateTodayDate,
  parseNormalDate,
  equalDate,
}