import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage'
import LoginPage from './Components/LoginPage/LoginPage'
import RegisterPage from './Components/RegisterPage/RegisterPage'
import Nav from './Components/Nav/Nav'
import Footer from './Components/Footer/Footer'

import './style/reset.scss'
import './style/common.scss'

function App() {
  return (
    <Router>
      {/* header영역 */}
      <Nav />

      {/* section영역 */}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/category/:category?" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>

      {/* footer영역 */}
      <Footer />
    </Router>
  )
}

export default App
