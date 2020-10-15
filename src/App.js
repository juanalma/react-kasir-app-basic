import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { NavbarComponent } from "./component"
import { Home, Success} from './pages'

class App extends Component {
  render() {
    return (
      <div>
        <NavbarComponent />
        <main>
          <Router>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/success" component={Success} exact />
            </Switch>
          </Router>
        </main>
      </div>
    )
  }
}
export default App;