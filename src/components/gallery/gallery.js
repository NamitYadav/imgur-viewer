/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from 'react';
import { AutoSizer, List, InfiniteLoader } from 'react-virtualized';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './gallery-styles';
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

const CARD_WIDTH = 340;

const Gallery = (props) => {
  const classes = useStyles();

  const [gallery, updateGallery] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);
  const [section, setSection] = useState(Section.HOT);
  const [sort, setSort] = useState(Sort.VIRAL);
  const [windowFilter, setWindow] = useState(Window.DAY);
  const [showViral, setShowViral] = useState(true);
  const [replaceContent, setReplaceContent] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchData();
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) fetchData();
  }, [section, sort, windowFilter, showViral]);

  const fetchData = async () => {
    const galleryOptions = {
      section,
      sort,
      window: windowFilter,
      page,
      showViral,
    };
    setTimeout(async () => {
      await getGallery(galleryOptions)
        .then((response) => response.json())
        .then((result) => {
          setPage(page + 1);
          updateGallery(() => {
            return replaceContent ? result.data : [...gallery, ...result.data];
          });
          setIsFetching(false);
          setReplaceContent(false);
        })
        .catch((error) => console.log('Gallery fetch error', error));
    }, 1000);
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

  function isRowLoaded({ index }) {
    console.log('Row:', index, 'Loaded: ', !!gallery[index]);
    return !!gallery[index];
  }

  function loadMoreRows({ startIndex, stopIndex }) {
    console.log(startIndex, stopIndex);
    return fetchData();
  }

  if (isFetching) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress size="80px" />;
      </div>
    );
  }

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

      <AutoSizer>
        {({ height, width }) => {
          const itemsPerRow = Math.floor(width / CARD_WIDTH) || 1;

          const rowCount = Math.ceil(gallery.length / itemsPerRow);

          return (
            <InfiniteLoader
              isRowLoaded={isRowLoaded}
              loadMoreRows={loadMoreRows}
              rowCount={rowCount}
            >
              {({ onRowsRendered, registerChild }) => (
                <List
                  width={width}
                  height={height}
                  ref={registerChild}
                  onRowsRendered={onRowsRendered}
                  rowCount={rowCount}
                  rowHeight={CARD_WIDTH}
                  rowRenderer={({ index, key, style }) => {
                    style = {
                      ...style,
                      margin: '80px 0',
                    };
                    const items = [];
                    const fromIndex = index * itemsPerRow;
                    const toIndex = Math.min(fromIndex + itemsPerRow, gallery.length);

                    for (let i = fromIndex; i < toIndex; i++) {
                      let listItem = gallery[i];

                      items.push(
                        <div className={classes.Item} key={i}>
                          <Card className={classes.card}>
                            <div className={classes.image}>
                              <Suspense
                                fallback={<image src='https://via.placeholder.com/150'></image>}
                              >
                                <img
                                  src={
                                    listItem.images && listItem.images[0] && listItem.images[0].link
                                  }
                                  alt=''
                                  onClick={() => handleImageClick(listItem.images[0])}
                                />
                              </Suspense>
                            </div>
                            <div className={classes.title}>{listItem.title}</div>
                          </Card>
                        </div>
                      );
                    }

                    return (
                      <div className={classes.Row} key={key} style={style}>
                        {items}
                      </div>
                    );
                  }}
                />
              )}
            </InfiniteLoader>
          );
        }}
      </AutoSizer>
      {/* {isFetching && <h1>Fetching more list items...</h1>} */}
    </div>
  );
};

export default Gallery;
