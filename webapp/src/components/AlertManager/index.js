import React, { useState } from 'react'
import Alert from '@mui/material/Alert'
import { css } from '@emotion/core'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { node } from 'prop-types'

import Collapse from '@mui/material/Collapse'

const ALERT_TIMEOUT = 5000

export const AlertManagerContext = React.createContext({
  setOnFailure: () => {},
  setOnSuccess: () => {}
})

export const AlertManager = props => {
  const [alertStatus, setAlertStatus] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  const setOnFailure = alertMessage => {
    setAlertStatus('error')
    setAlertMessage(alertMessage)
    setTimeout(closeAlert, ALERT_TIMEOUT)
  }

  const setOnSuccess = alertMessage => {
    setAlertStatus('success')
    setAlertMessage(alertMessage)
    setTimeout(closeAlert, ALERT_TIMEOUT)
  }

  const closeAlert = () => {
    setAlertStatus('')
    setAlertMessage('')
  }

  return (
    <AlertManagerContext.Provider
      value={{
        setOnFailure,
        setOnSuccess
      }}
    >
      <div css={alertStyle}>
        <Collapse in={!!alertStatus}>
          <Alert
            action={(
              <IconButton
                aria-label='close'
                color='inherit'
                onClick={closeAlert}
                size='small'
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            )}
            severity={alertStatus || 'success'}
          >
            {alertMessage}
          </Alert>
        </Collapse>
      </div>
      {props.children}
    </AlertManagerContext.Provider>
  )
}

const alertStyle = css`
  position: 'fixed';
  zIndex: 1337;
  top: 80px;
`

AlertManager.propTypes = {
  children: node
}
