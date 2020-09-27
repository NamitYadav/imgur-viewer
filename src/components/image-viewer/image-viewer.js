import React, { useEffect, useState } from 'react';
import { getImage } from '../../service/api-service';

const ImageViewer = (props) => {
  const [image, updateImage] = useState([]);

  useEffect(() => {
    console.log('Image props', props);
    const imageId = props.match.params.id;
    if (imageId) {
      fetchData(imageId);
    }
  }, []);

  const fetchData = async (imageId) => {
    await getImage(imageId)
      .then((response) => response.json())
      .then((result) => {
        console.log('Result', result);
        updateImage(() => {
          return [result];
        });
      })
      .catch((error) => console.log('error', error));
  };

  return <img src='' alt='Avatar' style={{ width: '100%' }} />;
};

export default ImageViewer;
