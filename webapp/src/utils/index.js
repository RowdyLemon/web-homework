export const romanizeNumber = number => {
  // Since there is no clear answer on how romans dealt with
  // fractions, I'm just going to split them on the decimal
  // and convert them to roman numerals and then combine them
  // again with a decimal
  const parts = number.toString().split('.')
  if (parts.length === 2) {
    return romanizeNumber(parseInt(parts[0])) + '.' + romanizeNumber(parseInt(parts[1]))
  } else {
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
}
