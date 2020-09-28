/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { getGallery } from '../../service/api-service';
import {
  Section,
  SectionParams,
  Sort,
  SortParams,
  Window,
  WindowParams,
} from '../../service/models';
import {
  AppBar,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    padding: '64px',
    background: '#2d3135',
    minHeight: '100vh',
    '@media (max-width: 720px)': {
      padding: '16px',
    },
  },
  grid: {
    marginTop: '80px',
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
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    backgroundColor: '#fafafa',
    width: '100%',
  },
  formControl: {
    minWidth: 120,
  },
}));

const Gallery = (props) => {
  const classes = useStyles();

  const [gallery, updateGallery] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);
  const [section, setSection] = useState(Section.HOT);
  const [sort, setSort] = useState(Sort.VIRAL);
  const [windowFilter, setWindow] = useState(Window.DAY);
  const [showViral, setShowViral] = useState(true);
  const [showMature, setShowMature] = useState(false);
  const [albumPreviews, setAlbumPreviews] = useState(false);
  const [replaceContent, setReplaceContent] = useState(false);

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreImages();
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) fetchData();
  }, [section, sort, windowFilter, showViral, showMature, albumPreviews]);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    ) {
      return;
    }
    setIsFetching(true);
  };

  const fetchData = async () => {
    const galleryOptions = {
      section,
      sort,
      window: windowFilter,
      page,
      showViral,
      showMature,
      albumPreviews,
    };
    setTimeout(async () => {
      await getGallery(galleryOptions)
        .then((response) => response.json())
        .then((result) => {
          setPage(page + 1);
          updateGallery(() => {
            return replaceContent ? result.data : [...gallery, ...result.data];
          });
          setReplaceContent(false);
        })
        .catch((error) => console.log('Gallery fetch error', error));
    }, 1000);
  };

  const fetchMoreImages = () => {
    fetchData();
    setIsFetching(false);
  };

  const handleImageClick = (image) => {
    const { history } = props;
    history.push(`/image/${image.id}`);
  };

  const handleSectionChange = (event) => {
    setReplaceContent(true);
    setSection(event.target.value);
  };

  const handleSortParamChange = (event) => {
    setReplaceContent(true);
    setSort(event.target.value);
  };

  const handleWindowParamChange = (event) => {
    setReplaceContent(true);
    setWindow(event.target.value);
  };

  const handleShowViral = (event) => {
    setReplaceContent(true);
    setShowViral(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <AppBar position='fixed' color='default'>
        <Toolbar>
          <div className={classes.filterContainer}>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>Section</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={section}
                onChange={(event) => handleSectionChange(event)}
              >
                {SectionParams.map((param, i) => (
                  <MenuItem key={i} value={param.value}>
                    {param.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ flex: '3' }}></div>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>Sort</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={sort}
                onChange={(event) => handleSortParamChange(event)}
              >
                {SortParams.map((param, i) => (
                  <MenuItem key={i} value={param.value}>
                    {param.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ flex: '.25' }}></div>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>Window</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={windowFilter}
                onChange={(event) => handleWindowParamChange(event)}
              >
                {WindowParams.map((param, i) => (
                  <MenuItem key={i} value={param.value}>
                    {param.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ flex: '.25' }}></div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showViral}
                  onChange={handleShowViral}
                  name='show-viral'
                  color='primary'
                />
              }
              label='Show Viral'
            />
          </div>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} className={classes.grid}>
        {gallery.map((listItem) => (
          <Grid item xs={12} sm={6} md={3} key={listItem.id}>
            <Card className={classes.card}>
              <div className={classes.image}>
                <Suspense fallback={<image src='https://via.placeholder.com/150'></image>}>
                  <img
                    src={listItem.images && listItem.images[0] && listItem.images[0].link}
                    alt=''
                    onClick={() => handleImageClick(listItem.images[0])}
                  />
                </Suspense>
              </div>
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
