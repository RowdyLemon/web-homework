import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { TransactionTypeSelect } from '.'

const makeProps = overrides => ({
  onChange: jest.fn(),
  value: '',
  error: false,
  ...overrides
})

const setup = props => {
  return render(<TransactionTypeSelect {...props} />)
}

describe('Transaction Type Select', () => {
  it('has debit and credit options', () => {
    const props = makeProps()
    const container = setup(props)

    expect(container.getByText('Debit')).toBeInTheDocument()
    expect(container.getByText('Credit')).toBeInTheDocument()
  })

  it('selects Debit if provided as the value', () => {
    const props = makeProps({ value: 'Debit' })
    const container = setup(props)

    const debit = container.getByTestId('debit-radio-button').querySelector('input')
    expect(debit.checked).toBe(true)
  })

  it('selects Credit if provided as the value', () => {
    const props = makeProps({ value: 'Credit' })
    const container = setup(props)

    const credit = container.getByTestId('credit-radio-button').querySelector('input')
    expect(credit.checked).toBe(true)
  })

  it('calls the onChange callback when an option is selected', () => {
    const props = makeProps()
    const container = setup(props)

    const debit = container.getByTestId('debit-radio-button').querySelector('input')
    fireEvent.click(debit)
    expect(props.onChange).toHaveBeenCalled()

    const credit = container.getByTestId('credit-radio-button').querySelector('input')
    fireEvent.click(credit)
    expect(props.onChange).toHaveBeenCalled()
  })
})
