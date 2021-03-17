import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from 'react-router-dom';

import TodoList from '../pages/TodoList';
import TodoDetails from '../pages/TodoDetails';
import VideoLandingPage from '../pages/VideoLandingPage';

const RootView = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <TodoList />
      </Route>
      <Route exact path="/:todoId">
        <TodoDetails />
      </Route>
      <Route exact path="/:todoId/video/:videoName">
        <VideoLandingPage />
      </Route>
    </Switch>
  </Router>
);
  
export default RootView;