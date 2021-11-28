import React from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { func, string } from 'prop-types'

export const DescriptionField = ({ onChange, value }) => {
  return (
    <Box sx={{ m: 2 }}>
      <FormControl fullWidth>
        <TextField label='Description' onChange={onChange} required value={value} variant='outlined' />
      </FormControl>
    </Box>
  )
}

DescriptionField.propTypes = {
  onChange: func,
  value: string
}
