import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import store from "store"
import { Provider } from "react-redux"
import Header from "componets/Header"
import GitRepos from "pages/GitRepos"
import GitAutorization from "pages/GitAutorization"
import GitIssues from "pages/GitIssues"

const App = () => {
  return (
    <Provider store={store}>
      <Router basename="git-issues-react">
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <GitAutorization />
            </Route>
            <Route path="/repos">
              <GitRepos />
            </Route>
            <Route path="/issues/:login/:repoName">
              <GitIssues />
            </Route>
            <Route>
              <GitAutorization />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
