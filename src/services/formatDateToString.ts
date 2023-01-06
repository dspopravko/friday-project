export const createDate = (date: Date): string => {
  if (!date) {
    return ''
  }
  return new Intl.DateTimeFormat('ru-ru', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(new Date(date))
}
