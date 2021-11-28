import React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { func, arrayOf, string, shape } from 'prop-types'

export const OptionSelect = ({ onSelect, options, selectedOption, label }) => {
  const handleSelect = event => {
    onSelect(options.find(option => option.value === event.target.value))
  }

  return (
    <Box sx={{ m: 2 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          onChange={handleSelect}
          required
          value={selectedOption}
        >
          {
            options.map(option => (
              <MenuItem key={option.value + option.id} value={option.value}>{option.value}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  )
}

OptionSelect.propTypes = {
  onSelect: func,
  options: arrayOf(shape({
    value: string,
    id: string
  })),
  label: string,
  selectedOption: string
}
