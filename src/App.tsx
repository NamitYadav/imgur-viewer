import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Gallery from './components/gallery/gallery';
import ImageViewer from './components/image-viewer/image-viewer';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' render={(props: any) => <Gallery {...props} />} />
        <Route path='/image/:id' render={(props: any) => <ImageViewer {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
