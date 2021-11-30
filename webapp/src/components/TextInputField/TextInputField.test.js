import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { TextInputField } from '.'

const makeProps = overrides => ({
  onChange: jest.fn(),
  value: 'Neato Burrito',
  error: false
})

const setup = props => {
  return render(<TextInputField {...props} />)
}

describe('Description Field', () => {
  it('displays the description', () => {
    const props = makeProps()
    const container = setup(props)

    expect(container.getByTestId('description-field').querySelector('input').value).toEqual(props.value)
  })

  it('calls the onChange callback when the input is updated', () => {
    const props = makeProps()
    const container = setup(props)

    fireEvent.change(container.getByTestId('description-field').querySelector('input'), {
      target: { value: 'rad lad' }
    })
    expect(props.onChange).toHaveBeenCalled()
  })
})
