# imgur-gallery
Simple web app that allows one to browse the Imgur gallery using React


1. Show gallery images in a grid of thumbnails and lazy load them
1. Show image description in the thumbnail, top or bottom
1. On clicking an image in the gallery, show its details: big image, title, description, upvotes, downvotes, and score

### Filters

1. Filter the images based on: hot, top, user
1. Include or exclude viral images from the result set
1. Filter based on window and sort parameters;

### APIs used

##### Initialise Request
```javascript
var myHeaders = new Headers();
myHeaders.append("Authorization", "Client-ID {{clientId}}");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
```


##### Get Gallery Images

```javascript

fetch("https://api.imgur.com/3/gallery/{{section}}/{{sort}}/{{window}}/{{page}}?showViral={{showViral}}&mature={{showMature}}&album_previews={{albumPreviews}}", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```


##### Get Image
```javascript
fetch("https://api.imgur.com/3/image/{{imageHash}}", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```