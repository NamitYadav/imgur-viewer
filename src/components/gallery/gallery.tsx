/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from 'react';
import { AutoSizer, List, InfiniteLoader } from 'react-virtualized';
import CircularProgress from '@material-ui/core/CircularProgress';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

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

const Gallery = (props: any) => {
  const classes = useStyles();

  const [gallery, updateGallery] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [section, setSection] = useState(Section.HOT);
  const [sort, setSort] = useState(Sort.VIRAL);
  const [windowFilter, setWindow] = useState(Window.DAY);
  const [showViral, setShowViral] = useState(true);
  const [replaceContent, setReplaceContent] = useState(false);

  useEffect(() => {
    if (!isFetching) fetchData();
  }, [section, sort, windowFilter, showViral]);

  const fetchData = async () => {
    setIsFetching(true);
    const galleryOptions = {
      section,
      sort,
      window: windowFilter,
      page,
      showViral,
    };
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
  };

  const gotoItem = (image: any) => {
    const { history } = props;
    history.push(`/image/${image.id}`);
  };

  const handleSectionChange = (event: any) => {
    setReplaceContent(true);
    setSection(event.target.value);
  };

  const handleSortParamChange = (event: any) => {
    setReplaceContent(true);
    setSort(event.target.value);
  };

  const handleWindowParamChange = (event: any) => {
    setReplaceContent(true);
    setWindow(event.target.value);
  };

  const handleShowViral = (event: any) => {
    setReplaceContent(true);
    setShowViral(event.target.checked);
  };

  function isRowLoaded({ index }: any) {
    return !!gallery[index];
  }

  function loadMoreRows({ startIndex, stopIndex }: any) {
    return fetchData();
  }

  return (
    <div className={classes.root}>
      <AppBar color='default'>
        <Toolbar>
          <div className={classes.filterContainer}>
            <div className={classes.title}>Imgur Gallery</div>
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
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='section-sort-label'>Section</InputLabel>
              <Select
                labelId='section-sort-label'
                label='Section'
                value={section}
                onChange={(event) => handleSectionChange(event)}>
                {SectionParams.map((param, i) => (
                  <MenuItem key={i} value={param.value}>
                    {param.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='sort-select-label'>Sort</InputLabel>
              <Select
                labelId='sort-select-label'
                label='Sort'
                value={sort}
                onChange={(event) => handleSortParamChange(event)}>
                {SortParams.map((param, i) => (
                  <MenuItem key={i} value={param.value}>
                    {param.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='window-select-label'>Window</InputLabel>
              <Select
                labelId='window-select-label'
                label='Window'
                value={windowFilter}
                onChange={(event) => handleWindowParamChange(event)}>
                {WindowParams.map((param, i) => (
                  <MenuItem key={i} value={param.value}>
                    {param.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Toolbar>
      </AppBar>

      {isFetching ? (
        <div className={classes.progressContainer}>
          <CircularProgress size='80px' />;
        </div>
      ) : !gallery || !gallery.length ? (
        <div className={classes.emptyDiv}>
          <SentimentDissatisfiedIcon fontSize='large' />
          <div>Nothing to see here</div>
        </div>
      ) : (
        <AutoSizer>
          {({ height, width }) => {
            const itemsPerRow = Math.floor(width / CARD_WIDTH) || 1;

            const rowCount = Math.ceil(gallery.length / itemsPerRow);

            return (
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                rowCount={rowCount}>
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
                        let listItem: any = gallery[i];

                        items.push(
                          <div className={classes.Item} key={i}>
                            <Card className={classes.card}>
                              <div
                                className={classes.image}
                                onClick={() =>
                                  gotoItem((listItem.images && listItem.images[0]) || listItem)
                                }>
                                <Suspense
                                  fallback={
                                    <img
                                      src='https://via.placeholder.com/340X305'
                                      alt='placeholder'></img>
                                  }>
                                  {listItem.images &&
                                  listItem.images[0] &&
                                  (listItem.images[0].type === 'image/jpeg' ||
                                    listItem.images[0].type === 'image/png' ||
                                    listItem.images[0].type === 'image/gif') ? (
                                    <img
                                      style={{ width: '100%', height: '100%' }}
                                      src={listItem.images[0].link || listItem.link}
                                      alt=''
                                    />
                                  ) : (
                                    <video autoPlay loop style={{ flex: '1' }}>
                                      <source
                                        src={
                                          listItem.images &&
                                          listItem.images[0] &&
                                          listItem.images[0].link
                                        }
                                        type='video/mp4'
                                      />
                                      Your browser does not support the video tag.
                                    </video>
                                  )}
                                </Suspense>
                              </div>
                              <div className={classes.listTitle}>{listItem.title}</div>
                            </Card>
                          </div>,
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
      )}
    </div>
  );
};

export default Gallery;
