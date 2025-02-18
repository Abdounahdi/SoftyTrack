export function currencyFormat(amount: number) {
  return new Intl.NumberFormat('en-TN', { style: 'currency', currency: 'TND' }).format(amount)
}

export function numberWithSpaces(value, pattern) {
  var i = 0,
    phone = value.toString()
  return pattern.replace(/#/g, (_) => phone[i++])
}

// console.log(numberWithSpaces('27113818', '## ### ###'))
