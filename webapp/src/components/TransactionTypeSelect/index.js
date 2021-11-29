import React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { bool, func, string } from 'prop-types'
import Box from '@mui/material/Box'

export const TransactionTypeSelect = ({ onChange, value, error }) => {
  return (
    <Box sx={{ m: 2 }}>
      <FormControl component='fieldset' error={error}>
        <FormLabel component='legend'>Transaction Type</FormLabel>
        <RadioGroup
          aria-label='Transaction Type'
          name='controlled-radio-buttons-group'
          onChange={onChange}
          value={value}
        >
          <FormControlLabel control={<Radio data-testid='debit-radio-button' />} label='Debit' value='Debit' />
          <FormControlLabel control={<Radio data-testid='credit-radio-button' />} label='Credit' value='Credit' />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

TransactionTypeSelect.propTypes = {
  onChange: func,
  value: string,
  error: bool
}
