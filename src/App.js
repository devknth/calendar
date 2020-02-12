import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Calendar, Home, About, Posts } from 'pages'
import Menu from 'components/Menu'
import { createGlobalStyle } from 'styled-components'

function App() {
  return (
    <div id='container'>
      <GlobalStyle />
      <Menu />
      <Switch>
        <Route exact path='/' component={Calendar} />
      </Switch>
      <Route path='/Home' component={Home} />
      <Switch>
        <Route path='/about/:name' component={About} />
        <Route path='/about' component={About} />
      </Switch>
      <Route path='/posts' component={Posts} />
    </div>
  )
}

export default App

const GlobalStyle = createGlobalStyle`
  body {
    margin: 50px;
    padding: 50px;
    height: 100%;
    background-color: white;
    @import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');
    font-family: "Noto Sans KR", sans-serif !important;
  }
`
