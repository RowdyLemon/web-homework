import React from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import { bool, func, string } from 'prop-types'

export const AmountField = ({ onChange, value, error }) => {
  return (
    <Box sx={{ m: 2 }}>
      <FormControl fullWidth>
        <InputLabel htmlFor='outlined-adornment-amount'>Amount</InputLabel>
        <OutlinedInput
          error={error}
          id='outlined-adornment-amount'
          label='Amount'
          onChange={onChange}
          required
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          type='number'
          value={value}
        />
      </FormControl>
    </Box>
  )
}

AmountField.propTypes = {
  onChange: func,
  value: string,
  error: bool
}
