import React from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { bool, func, string } from 'prop-types'

export const TextInputField = ({ onChange, value, error, label }) => {
  return (
    <Box sx={{ m: 2 }}>
      <FormControl fullWidth>
        <TextField data-testid='description-field' error={error} label={label} onChange={onChange} value={value} variant='outlined' />
      </FormControl>
    </Box>
  )
}

TextInputField.propTypes = {
  onChange: func,
  value: string,
  error: bool,
  label: string
}
