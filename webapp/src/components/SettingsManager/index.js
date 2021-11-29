import { node } from 'prop-types'
import React, { createContext, useState } from 'react'

export const SettingsManagerContext = createContext({
  romanize: false,
  setRomanizeSetting: () => {}
})

export const SettingsManager = props => {
  const [romanize, setRomanize] = useState(false)

  const setRomanizeSetting = enabled => {
    setRomanize(enabled)
  }

  return (
    <SettingsManagerContext.Provider
      value={{
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
