import React from 'react';

import './gallery.css';
import { getGallery } from '../../service/api-service.ts';

function getGalleryImages() {
  getGallery();
}

function Gallery() {
  return (
    <div className='title' onClick={() => getGalleryImages()}>
      Gallery
    </div>
  );
}

export default Gallery;
