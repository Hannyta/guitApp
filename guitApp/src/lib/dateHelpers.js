import dayjs from 'dayjs'

export function lastNMonths(n) {
  const now = dayjs()
  return Array.from({ length: n }, (_, index) => now.subtract(n - 1 - index, 'month')).map(
    (date) => ({ year: date.year(), month: date.month() + 1, label: date.format('MMM YY') }),
  )
}

export function isSameMonth(dateString, year, month) {
  const date = dayjs(dateString)
  return date.year() === year && date.month() + 1 === month
}
