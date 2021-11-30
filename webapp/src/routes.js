import { AlertManager } from './components/AlertManager'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import { CSVUpload } from './csv_upload'
import { Game } from './game'
import { Header } from './components/Header'
import { Home } from './home'
import { Merchants } from './merchants'
import React from 'react'
import { Settings } from './settings'
import { SettingsManager } from './components/SettingsManager'
import { Users } from './users'

function AppRouter () {
  return (
    <Router>
      <Header />
      <div css={contentStyle}>
        <AlertManager>
          <SettingsManager>
            <Route component={Home} exact path='/' />
            <Route component={Users} exact path='/users' />
            <Route component={Merchants} exact path='/merchants' />
            <Route component={CSVUpload} exact path='/csv_upload' />
            <Route component={Game} exact path='/game' />
            <Route component={Settings} exact path='/settings' />
          </SettingsManager>
        </AlertManager>
      </div>
    </Router>
  )
}

export default AppRouter

const contentStyle = css`
  padding: 32px;
`
