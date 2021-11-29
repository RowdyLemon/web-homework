import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import React, { useContext } from 'react'
import { SettingsManagerContext } from '../components/SettingsManager'
import Switch from '@mui/material/Switch'

export const Settings = () => {
  const { romanize, setRomanizeSetting } = useContext(SettingsManagerContext)

  return (
    <FormGroup>
      <FormControlLabel
        control={(
          <Switch
            checked={romanize}
            onChange={event => setRomanizeSetting(event.target.checked)}
          />
        )}
        label='Romanize (converts numbers to roman numerals)'
      />
    </FormGroup>
  )
}
