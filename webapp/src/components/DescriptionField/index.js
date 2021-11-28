import React from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { bool, func, string } from 'prop-types'

export const DescriptionField = ({ onChange, value, error }) => {
  return (
    <Box sx={{ m: 2 }}>
      <FormControl fullWidth>
        <TextField error={error} label='Description' onChange={onChange} value={value} variant='outlined' />
      </FormControl>
    </Box>
  )
}

DescriptionField.propTypes = {
  onChange: func,
  value: string,
  error: bool
}
