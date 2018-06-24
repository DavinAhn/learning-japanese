import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedApp } from 'renderer/containers/App';
import { ConnectedLearn } from 'renderer/containers/Learn';
import './styles.css';

export const Root = () => (
  <Switch>
    <Route exact={true} path="/" component={ConnectedApp} />
    <Route exact={true} path="/learn" component={ConnectedLearn} />
    <Route path="*" component={ConnectedApp} />
  </Switch>
);
