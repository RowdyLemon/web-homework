import { AlertManager } from './components/AlertManager'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import { Header } from './components/Header'
import { Home } from './home'
import React from 'react'

function AppRouter () {
  return (
    <Router>
      <Header />
      <div css={contentStyle}>
        <AlertManager>
          <Route component={Home} exact path='/' />
          <Route component={() => (<div>Content for /another route</div>)} exact path='/another' />
        </AlertManager>
      </div>
    </Router>
  )
}

export default AppRouter

const contentStyle = css`
  padding: 32px;
`
