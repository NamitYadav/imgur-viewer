/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getImage } from '../../service/api-service';

const ImageViewer = (props) => {
  const [imageData, updateImage] = useState([]);

  useEffect(() => {
    const imageId = props.match.params.id;
    if (imageId) {
      fetchData(imageId);
    }
  }, []);

  const fetchData = async (imageId) => {
    await getImage(imageId)
      .then((response) => response.json())
      .then((result) => {
        updateImage(() => result.data);
      })
      .catch((error) => console.log('Image fetch error', error));
  };

  return (
    <div>
      <img src={imageData.link} alt='Avatar' />
    </div>
  );
};

export default ImageViewer;
