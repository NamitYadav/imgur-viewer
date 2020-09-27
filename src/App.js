import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Gallery from './components/gallery/gallery';
import ImageViewer from './components/image-viewer/image-viewer';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Gallery} />
        <Route path='/image/:id' component={ImageViewer} />
      </Switch>
    </Router>
  );
}

export default App;
