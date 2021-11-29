import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { AmountField } from '.'

const makeProps = overrides => ({
  onChange: jest.fn(),
  value: '1337',
  error: false
})

const setup = props => {
  return render(<AmountField {...props} />)
}

describe('Amount Field', () => {
  it('displays the amount', () => {
    const props = makeProps()
    const container = setup(props)

    expect(container.container.querySelector('input').value).toEqual(props.value)
  })

  it('calls the onChange callback when the input is updated', () => {
    const props = makeProps()
    const container = setup(props)

    fireEvent.change(container.container.querySelector('input'), {
      target: { value: '12345' }
    })
    expect(props.onChange).toHaveBeenCalled()
  })
})
