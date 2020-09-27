export enum Section {
  HOT = 'hot',
  TOP = 'top',
  USER = 'user'
}

export const SectionParams = [
  { label: 'Hot', value: Section.HOT },
  { label: 'Top', value: Section.TOP },
  { label: 'User', value: Section.USER }
];


export enum Sort {
  VIRAL = 'viral',
  TOP = 'top',
  TIME = 'time'
}

export const SortParams = [
  { label: 'Viral', value: Sort.VIRAL },
  { label: 'Top', value: Sort.TOP },
  { label: 'Time', value: Sort.TIME },
];

export enum Window {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  ALL = 'all'
}

export const WindowParams = [
  { label: 'Day', value: Window.DAY },
  { label: 'Week', value: Window.WEEK },
  { label: 'Month', value: Window.MONTH },
  { label: 'Year', value: Window.YEAR },
  { label: 'All', value: Window.ALL },
];

export interface GalleryOptions {
  section?: Section,
  sort?: Sort,
  window?: string,
  page?: Number,
  showViral?: boolean,
  showMature?: boolean,
  albumPreviews?: boolean,
}