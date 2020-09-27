/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import { getGallery } from '../../service/api-service';
import ImageViewer from '../image-viewer/image-viewer';
import { GalleryOptions, Section, Sort, Window } from '../../service/models';
import { Card } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    padding: '64px',
    background: '#2d3135',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '400px',
    padding: '8px',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.04)',
      transition: 'all 0.3s ease',
    },
  },
  image: {
    height: '350px',
    overflow: 'hidden',
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

const Gallery = () => {
  const classes = useStyles();

  const [gallery, updateGallery] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [section, setSection] = useState(Section.HOT);
  const [sort, setSort] = useState(Sort.VIRAL);
  const [windowFilter, setWindow] = useState(Window.DAY);
  const [showViral, setShowViral] = useState(true);
  const [showMature, setShowMature] = useState(false);
  const [albumPreviews, setAlbumPreviews] = useState(false);

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreImages();
  }, [isFetching]);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };

  const fetchData = async () => {
    setTimeout(async () => {
      await getGallery()
        .then((response) => response.json())
        .then((result) => {
          console.log('Result', result);
          setPage(page + 1);
          updateGallery(() => {
            return [...gallery, ...result.data];
          });
        })
        .catch((error) => console.log('error', error));
    }, 1000);
  };

  const fetchMoreImages = () => {
    fetchData();
    setIsFetching(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {gallery.map((listItem) => (
          <Grid item xs={12} sm={6} md={3} key={listItem.id}>
            <Card className={classes.card}>
              <Link to={listItem.images && listItem.images[0] && `/image/${listItem.images[0].id}`}>
                <div className={classes.image}>
                  <Suspense fallback={<image src='https://via.placeholder.com/150'></image>}>
                    <ImageViewer
                      src={listItem.images && listItem.images[0] && listItem.images[0].link}
                    />
                  </Suspense>
                </div>
              </Link>
              <div className={classes.title}>{listItem.title}</div>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isFetching && <h1>Fetching more list items...</h1>}
    </div>
  );
};

export default Gallery;
