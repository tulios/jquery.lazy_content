# jQuery.LazyContent

Lazy load of any content made easy

## Any content

Include **src/jquery.lazy_content.js**

```js
$(".elements").lazyContent({
  threshold: 0, // The amount of pixels to load earlier
  load: function(element) { // Callback for loaded element
    // Do some magic
  }
});
```

## Only images

Include **src/jquery.lazy_content.js** and **src/jquery.lazy_content_img.js**

```js
$("img.lazy").lazyContentImg({
  threshold: 0 // The amount of pixels to load earlier
});
```

## Demo and examples

Refer to the jQuery.LazyContent [website](http://tulios.github.io/jquery.lazy_content/) for examples
