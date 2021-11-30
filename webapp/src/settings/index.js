import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import React, { Fragment, useContext } from 'react'
import { SettingsManagerContext } from '../components/SettingsManager'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'

export const Settings = () => {
  const { romanizeAdditive, setRomanizeAdditiveSetting, romanize, setRomanizeSetting } = useContext(SettingsManagerContext)

  return (
    <Fragment>
      <Typography component='h1' sx={{ my: 2 }} variant='h4'>Romanize Settings</Typography>
      <Typography sx={{ my: 2 }}>Conversts transaction amounts to roman numerals</Typography>
      <FormGroup>
        <FormControlLabel
          control={(
            <Switch
              checked={romanize}
              onChange={event => setRomanizeSetting(event.target.checked)}
            />
          )}
          disabled={romanizeAdditive}
          label='Traditional (e.g. 19 would be XIX)'
        />
        <FormControlLabel
          control={(
            <Switch
              checked={romanizeAdditive}
              onChange={event => setRomanizeAdditiveSetting(event.target.checked)}
            />
          )}
          disabled={romanize}
          label='Additive (e.g. 19 would be XVIIII)'
        />
      </FormGroup>
    </Fragment>
  )
}
