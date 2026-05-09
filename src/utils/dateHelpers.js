export function getNewZealandLocalDate(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-NZ', {
    timeZone: 'Pacific/Auckland',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const parts = formatter.formatToParts(date)

  const dateParts = parts.reduce((accumulator, part) => {
    if (part.type !== 'literal') {
      accumulator[part.type] = part.value
    }

    return accumulator
  }, {})

  return `${dateParts.year}-${dateParts.month}-${dateParts.day}`
}