import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { SettingsManagerContext } from '../SettingsManager'
import { TxTable } from './TxTable'

const makeProps = overrides => ({
  data: [
    {
      id: 'transaction_1',
      user_id: 'user_1',
      description: 'description_1',
      merchant_id: 'merchant_1',
      debit: true,
      credit: false,
      amount: 123.05
    },
    {
      id: 'transaction_2',
      user_id: 'user_2',
      description: 'description_2',
      merchant_id: 'merchant_2',
      debit: true,
      credit: false,
      amount: 1337.13
    },
    {
      id: 'transaction_3',
      user_id: 'user_3',
      description: 'description_3',
      merchant_id: 'merchant_3',
      debit: false,
      credit: true,
      amount: 45.65
    }
  ],
  onDelete: jest.fn(),
  onEdit: jest.fn(),
  ...overrides
})

const setup = (props, romanize) => {
  return render(
    <SettingsManagerContext.Provider value={{ romanize }}>
      <TxTable {...props} />
    </SettingsManagerContext.Provider>
  )
}

describe('Transactions Table', () => {
  it('displays transactions', () => {
    const props = makeProps()
    const container = setup(props)
    props.data.forEach(transaction => {
      expect(container.getByText(transaction.id)).toBeInTheDocument()
      expect(container.getByText(transaction.user_id)).toBeInTheDocument()
      expect(container.getByText(transaction.description)).toBeInTheDocument()
      expect(container.getByText(transaction.merchant_id)).toBeInTheDocument()
      expect(container.getByText(transaction.amount.toString())).toBeInTheDocument()
    })
  })

  it('calls the delete callback', () => {
    const props = makeProps()
    const container = setup(props)

    const deleteButton = container.getAllByTestId('DeleteIcon')[0]
    fireEvent.click(deleteButton)
    expect(props.onDelete).toHaveBeenCalledWith({ variables: { id: props.data[0].id } })
  })

  it('calls the edit callback', () => {
    const props = makeProps()
    const container = setup(props)

    const editButton = container.getAllByTestId('EditIcon')[0]
    fireEvent.click(editButton)
    expect(props.onEdit).toHaveBeenCalledWith(props.data[0])
  })

  it('converts the transaction amounts to roman numerals when the setting is enabled', () => {
    const props = makeProps()
    const container = setup(props, true)

    // 123
    expect(container.getByText('CXXIII')).toBeInTheDocument()

    // 1337
    expect(container.getByText('MCCCXXXVII')).toBeInTheDocument()

    // 46, because we round to the nearest whole number before romanizing a number
    expect(container.getByText('XXXXVI')).toBeInTheDocument()
  })
})
