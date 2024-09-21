export function formatDate(date: Date, format: string): string {
  const formatters: { [key: string]: () => string } = {
    YYYY: () => date.getFullYear().toString(),
    MM: () => padZero(date.getMonth() + 1),
    DD: () => padZero(date.getDate()),
    hh: () => padZero(date.getHours()),
    mm: () => padZero(date.getMinutes()),
    ss: () => padZero(date.getSeconds()),
  };

  return format.replace(/YYYY|MM|DD|hh|mm|ss/g, (match) => formatters[match]());
}

function padZero(num: number): string {
  return num.toString().padStart(2, '0');
}
