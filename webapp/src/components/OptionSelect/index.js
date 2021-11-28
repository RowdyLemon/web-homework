import React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { func, arrayOf, string } from 'prop-types'

export const OptionSelect = ({ onSelect, options, selectedOption, label }) => {
  return (
    <Box sx={{ m: 2 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          onChange={onSelect}
          required
          value={selectedOption}
        >
          {
            options.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  )
}

OptionSelect.propTypes = {
  onSelect: func,
  options: arrayOf(string),
  label: string,
  selectedOption: string
}
