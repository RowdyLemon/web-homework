import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { OptionSelect } from '.'

const makeProps = overrides => ({
  onSelect: jest.fn(),
  options: [
    {
      value: 'value_1',
      id: 'id_1'
    },
    {
      value: 'value_2',
      id: 'id_2'
    },
    {
      value: 'value_3',
      id: 'id_3'
    }
  ],
  label: 'options',
  selectedOption: 'id_1',
  error: false,
  ...overrides
})

const setup = props => {
  return render(<OptionSelect {...props} />)
}

describe('Option Select', () => {
  it('displays the selected option', () => {
    const props = makeProps()
    const container = setup(props)

    expect(container.getByText('value_1')).toBeInTheDocument()
    expect(container.queryByText('value_2')).not.toBeInTheDocument()
    expect(container.queryByText('value_3')).not.toBeInTheDocument()
  })

  it('calls the onSelect callback when an option is selected', () => {
    const props = makeProps()
    const container = setup(props)

    fireEvent.mouseDown(container.getByRole('button'))
    fireEvent.click(container.getByText('value_3'))
    expect(props.onSelect).toHaveBeenCalled()
  })
})
