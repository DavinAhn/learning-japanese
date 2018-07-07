import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedApp } from 'renderer/containers/App';
import { ConnectedLearn } from 'renderer/containers/Learn';
import { ConnectedSettings } from 'renderer/containers/Settings';
import { ConnectedTest } from 'renderer/containers/Test';
import './styles.css';

export const Root = () => (
  <Switch>
    <Route exact={true} path="/" component={ConnectedApp} />
    <Route exact={true} path="/learn" component={ConnectedLearn} />
    <Route exact={true} path="/test" component={ConnectedTest} />
    <Route exact={true} path="/settings" component={ConnectedSettings} />
    <Route path="*" component={ConnectedApp} />
  </Switch>
);
