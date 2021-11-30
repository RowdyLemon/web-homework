import { node } from 'prop-types'
import React, { createContext, useState } from 'react'

export const SettingsManagerContext = createContext({
  romanizeAdditive: false,
  setRomanizeAdditiveSetting: () => {},
  romanize: false,
  setRomanizeSetting: () => {}
})

export const SettingsManager = props => {
  const [romanizeAdditive, setRomanizeAdditive] = useState(false)
  const [romanize, setRomanize] = useState(false)

  const setRomanizeAdditiveSetting = enabled => {
    setRomanizeAdditive(enabled)
  }

  const setRomanizeSetting = enabled => {
    setRomanize(enabled)
  }

  return (
    <SettingsManagerContext.Provider
      value={{
        romanizeAdditive,
        setRomanizeAdditiveSetting,
        romanize,
        setRomanizeSetting
      }}
    >
      {props.children}
    </SettingsManagerContext.Provider>
  )
}

SettingsManager.propTypes = {
  children: node
}
