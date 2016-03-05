# Sticker
### Add class to element when a specific scroll value has been reached

This is useful if you want to have a sticky nav

## Options:
```js
new Sticker(document.querySelector('.foo'), {
	// options, defaults listed

	breakpoint: 1,
	// The scroll threshold you want to use to change state
	// Can also be set to 'this' to dynamically determine the
	// threshold based on the element passed

	classNameActive: 'sticker-active',
	// The CSS class applied to the element when `window.scrollY` is reached

	classNameInactive: 'sticker-inactive',
	// The CSS class applied to the element when `window.scrollY` not reached

});
```

### Examples

```js

// Use the offset of the passed element
new Sticker(document.querySelector('.foo'), {
	breakpoint: 'this',
});

// Set threshold to 50 and change the active class
new Sticker(document.querySelector('.foo'), {
	breakpoint: 50,
	classNameActive: 'fixToTop',
});
```

By [Z&er :zap:](https://github.com/mrmartineau/)
