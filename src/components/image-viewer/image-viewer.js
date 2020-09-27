/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, makeStyles } from '@material-ui/core';

import { getImage } from '../../service/api-service';

const useStyles = makeStyles(() => ({
  container: {
    padding: '128px 64px',
    background: '#2d3135',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: '8px',
    background: '#474b50',
    maxWidth: '800px'
  },
  image: {
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#474b50',
    color: '#fff',
    borderRadius: '0 0 4px 4px',
  },
}));

const ImageViewer = (props) => {
  const classes = useStyles();

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
    <div className={classes.container}>
      <Card className={classes.card}>
        <img src={imageData.link} alt='Avatar' className={classes.image} />
        <div className={classes.title}>{imageData.title}</div>
        <div className={classes.title}>{imageData.description}</div>
        <div className={classes.title}>{imageData.vote}</div>
      </Card>
    </div>
  );
};

export default ImageViewer;
