import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { UserCSVUpload } from '.'

const makeProps = overrides => ({
  onFileUpload: jest.fn(),
  ...overrides
})

const setup = props => {
  return render(<UserCSVUpload {...props} />)
}

describe('User CSV Upload', () => {
  it('renders an upload user csv button', () => {
    const props = makeProps()
    const container = setup(props)

    const uploadButton = container.getByText('Upload User CSV')
    expect(uploadButton).toBeInTheDocument()
  })

  it('calls the onFileUpload callback when a file is selected', () => {
    const props = makeProps()
    const container = setup(props)

    fireEvent.click(container.getByText('Upload User CSV'))
    fireEvent.change(container.getByTestId('upload-user-csv'))
    expect(props.onFileUpload).toHaveBeenCalled()
  })
})
