// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

export function currencyFormat(amount: number) {
  return new Intl.NumberFormat('en-TN', { style: 'currency', currency: 'TND' }).format(amount)
}

export function numberWithSpaces(value, pattern) {
  var i = 0,
    phone = value.toString()
  return pattern.replace(/#/g, (_) => phone[i++])
}

// console.log(numberWithSpaces('27113818', '## ### ###'))

export function formatCustomDate(date) {
  // const date = new Date(inputDateString);

  // Extract year-month-day directly in local time
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  // Your fixed custom time (14:24:42.172)
  const customTime = '14:24:42.172';

  return `${year}-${month}-${day} ${customTime}+00`;
}
