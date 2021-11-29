import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { TransactionCSVUpload } from '.'

const makeProps = overrides => ({
  onFileUpload: jest.fn(),
  ...overrides
})

const setup = props => {
  return render(<TransactionCSVUpload {...props} />)
}

describe('Transaction CSV Upload', () => {
  it('renders an upload transaction csv button', () => {
    const props = makeProps()
    const container = setup(props)

    const uploadButton = container.getByText('Upload Transaction CSV')
    expect(uploadButton).toBeInTheDocument()
  })

  it('calls the onFileUpload callback when a file is selected', () => {
    const props = makeProps()
    const container = setup(props)

    fireEvent.click(container.getByText('Upload Transaction CSV'))
    fireEvent.change(container.getByTestId('upload-transaction-csv'))
    expect(props.onFileUpload).toHaveBeenCalled()
  })
})
