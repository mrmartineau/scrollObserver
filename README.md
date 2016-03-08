# ScrollObserver
### Add class to element when a specific scroll value has been reached


## Installation

```sh
npm install --save scrollobserver
```

This is useful if you want to have a sticky nav

## Options:
```js
new ScrollObserver(document.querySelector('.foo'), {
	// options, defaults listed

	thresholdIn: 1,
	// The scroll threshold you want to use to change state
	// Can also be set to 'this' to dynamically determine the
	// threshold based on the element passed

	thresholdOut: 1,
	// The scroll threshold you want to use to change to the inactive state, after
	// the active state

	classNameActive: 'scrollObserver-active',
	// The CSS class applied to the element when `window.scrollY` is reached

	classNameInactive: 'scrollObserver-inactive',
	// The CSS class applied to the element when `window.scrollY` not reached

});
```

### Examples

```js

// Use the offset of the passed element
new ScrollObserver(document.querySelector('.foo'), {
	thresholdIn: 'this',
});

// Set threshold to 50 and change the active class
new ScrollObserver(document.querySelector('.foo'), {
	thresholdIn: 50,
	classNameActive: 'fixToTop',
});
```

### Future
* 2nd param could be array so can apply multiple options on the element
* Is there a need for inactive class?

```js
new ScrollObserver(
	document.querySelector('.foo'),
	[{
		thresholdIn: 'this',
	},
	{
		thresholdIn: 500,
		className: 'fixToTop',
	}]
);
```

By [Z&er :zap:](https://github.com/mrmartineau/)
