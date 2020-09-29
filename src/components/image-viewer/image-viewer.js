/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { getImage } from '../../service/api-service';
import useStyles from './image-viewer-styles';

const ImageViewer = (props) => {
  const classes = useStyles();

  const [imageData, updateImage] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const imageId = props.match.params.id;
    if (imageId) {
      fetchData(imageId);
    }
  }, []);

  const fetchData = async (imageId) => {
    setIsFetching(true);
    await getImage(imageId)
      .then((response) => response.json())
      .then((result) => {
        updateImage(() => result.data);
        setIsFetching(false);
      })
      .catch((error) => console.log('Image fetch error', error));
  };

  const handleBack = () => {
    console.log(props);
    props.history.goBack();
  };

  if (isFetching) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress size='80px' />;
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.cardContainer}>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back
        </Button>
        <Card className={classes.card}>
          {imageData.type === 'image/jpeg' ||
          imageData.type === 'image/png' ||
          imageData.type === 'image/gif' ? (
            <img src={imageData.link} alt='Avatar' className={classes.image} />
          ) : (
            <video controls autoPlay loop className={classes.image}>
              <source src={imageData.link} type='video/mp4' />
            </video>
          )}
          <div className={classes.infoContainer}>
            <div className={classes.titleBar}>
              <div className={classes.title}>{imageData.title}</div>
              <div className={classes.views}>{imageData.views} Views</div>
            </div>
            {imageData.description && (
              <div className={classes.description}>{imageData.description}</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ImageViewer;
