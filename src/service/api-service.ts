import { GalleryOptions, Section, Sort, Window } from './models'

const myHeaders = new Headers();
myHeaders.append('Authorization', 'Client-ID 9d9facb48501684');

const requestOptions: RequestInit = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

export function getGallery(galleryOptions: GalleryOptions = {}) {
  const { section = Section.HOT, sort = Sort.TOP, window = Window.DAY, page = 1, showViral = false, showMature = false, albumPreviews = false } = galleryOptions;
  return fetch(
    `https://api.imgur.com/3/gallery/${section}/${sort}/${window}/${page}?showViral=${showViral}&mature=${showMature}&album_previews=${albumPreviews}`,
    requestOptions
  )
}

export function getImage(imageHash: string) {
  return fetch(`https://api.imgur.com/3/image/${imageHash}`, requestOptions)
}
