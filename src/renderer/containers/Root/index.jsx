import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedApp } from 'renderer/containers/App';
import './styles.css';

export const Root = () => (
  <Switch>
    <Route exact={true} path="/" component={ConnectedApp} />
    <Route path="*" component={ConnectedApp} />
  </Switch>
);
