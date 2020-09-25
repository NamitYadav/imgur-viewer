import { GalleryOptions, Section, Sort } from './models'

const myHeaders = new Headers();
myHeaders.append('Authorization', 'Client-ID 9d9facb48501684');

const requestOptions: RequestInit = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

export function getGallery(galleryOptions: GalleryOptions = {}) {
  const { section = Section.HOT, sort = Sort.TOP, window = undefined, page = 1, showViral = false, showMature = false, albumPreviews = false } = galleryOptions;
  fetch(
    `https://api.imgur.com/3/gallery/${section}/${sort}/${window}/${page}?showViral=${showViral}&mature=${showMature}&album_previews=${albumPreviews}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log('Gallery resp', result))
    .catch((error) => console.log('error', error));
}

export function getImage(imageHash: string) {
  fetch(`https://api.imgur.com/3/image/${imageHash}`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log('Image resp', result))
    .catch((error) => console.log('error', error));
}
