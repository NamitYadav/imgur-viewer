import React from 'react';
import ReactDOM from 'react-dom';
import ImageViewer from './image-viewer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ImageViewer />, div);
});