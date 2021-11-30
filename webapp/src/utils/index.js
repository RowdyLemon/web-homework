export const romanizeNumberAdditive = number => {
  // Since there is no clear answer on how romans dealt with
  // fractions, I'm just going to rount the number to the
  // nearest whole number and then convert it
  number = Math.round(number)
  const mCount = Math.floor(number / 1000)
  number -= mCount * 1000
  const dCount = Math.floor(number / 500)
  number -= dCount * 500
  const cCount = Math.floor(number / 100)
  number -= cCount * 100
  const lCount = Math.floor(number / 50)
  number -= lCount * 50
  const xCount = Math.floor(number / 10)
  number -= xCount * 10
  const vCount = Math.floor(number / 5)
  number -= vCount * 5
  const iCount = number

  return 'M'.repeat(mCount) + 'D'.repeat(dCount) + 'C'.repeat(cCount) + 'L'.repeat(lCount) + 'X'.repeat(xCount) + 'V'.repeat(vCount) + 'I'.repeat(iCount)
}

export const romanizeNumber = number => {
  const romanNumerals = ['I', 'V', 'X', 'L', 'C', 'D', 'M']

  number = Math.round(number)
  const digits = number.toString().split('')

  let romanNumber = ''
  digits.reverse().forEach((digit, i) => {
    let value = parseInt(digit)
    if (i >= 3) {
      romanNumber = 'M'.repeat(Math.pow(10, i - 4) * value) + romanNumber
    } else {
      const minor = romanNumerals[i * 2]
      const middle = romanNumerals[i * 2 + 1]
      const major = romanNumerals[i * 2 + 2]

      if (value === 9) {
        romanNumber = minor + major + romanNumber
      } else if (value === 4) {
        romanNumber = minor + middle + romanNumber
      } else {
        const midCount = Math.floor(value / 5)
        value -= midCount * 5
        romanNumber = middle.repeat(midCount) + minor.repeat(value) + romanNumber
      }
    }
  })
  return romanNumber
}
