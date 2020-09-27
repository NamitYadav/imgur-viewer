export enum Section {
  HOT = 'hot',
  TOP = 'top',
  USER = 'user'
}

export enum Sort {
  VIRAL = 'viral',
  TOP = 'top',
  TIME = 'time'
}

export enum Window {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  ALL = 'all'
}

export interface GalleryOptions {
  section?: Section,
  sort?: Sort,
  window?: string,
  page?: Number,
  showViral?: boolean,
  showMature?: boolean,
  albumPreviews?: boolean,
}