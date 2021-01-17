import React from 'react';
// import logo from './logo.svg';

import './App.scss';
import { Route, Switch } from 'react-router-dom';
import RepoList from './components/RepoList/RepoList';
import RepoInfo from './components/RepoInfo/RepoInfo';

export function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact={true} path="/" component={RepoList} />
        <Route path="/repos/:fullName+" component={RepoInfo} />
      </Switch>
    </div>
  );
}
