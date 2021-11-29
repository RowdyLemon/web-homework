import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { MerchantCSVUpload } from '.'

const makeProps = overrides => ({
  onFileUpload: jest.fn(),
  ...overrides
})

const setup = props => {
  return render(<MerchantCSVUpload {...props} />)
}

describe('Merchant CSV Upload', () => {
  it('renders an upload merchant csv button', () => {
    const props = makeProps()
    const container = setup(props)

    const uploadButton = container.getByText('Upload Merchant CSV')
    expect(uploadButton).toBeInTheDocument()
  })

  it('calls the onFileUpload callback when a file is selected', () => {
    const props = makeProps()
    const container = setup(props)

    fireEvent.click(container.getByText('Upload Merchant CSV'))
    fireEvent.change(container.getByTestId('upload-merchant-csv'))
    expect(props.onFileUpload).toHaveBeenCalled()
  })
})
