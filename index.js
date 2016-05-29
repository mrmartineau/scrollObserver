/**
 * ScrollObserver
 * @description Add a class to an element when a specific scroll threshold has been reached
 *
 * @module
 * @author Zander Martineau
 */

/**
 * @constructor
 * @param {Element} element
 * @param {Object} options
 */
function ScrollObserver(element, options) {
	this.element = element;
	this.options = Object.assign(this.defaultOptions, options);

	if (this.options.threshold === 'this') {
		this.threshold = getOffsetSum(this.element).top;
	} else {
		if (typeof parseInt(this.options.threshold, 10) === 'Number') {
			this.threshold = parseInt(this.options.threshold, 10);
		} else {
			throw new Error('2nd param should either be an integer or "this"');
		}
	}

	this.addEvents();
}


/** Default options */
ScrollObserver.prototype.defaultOptions = {
	threshold: 1,
	classNameActive: 'scrollObserver-active',
	classNameInactive: 'scrollObserver-inactive',
};


/** Add events */
ScrollObserver.prototype.addEvents = function () {
	window.addEventListener("scroll", this.onScroll.bind(this));
};


/** onScroll events */
ScrollObserver.prototype.onScroll = function (e) {
	const scrollYPos = getScrollTop();

	if (scrollYPos >= this.threshold) {
		this.thresholdReached();
	} else {
		this.release();
	}
};


/** Stick */
ScrollObserver.prototype.thresholdReached = function () {
	this.element.classList.add(this.options.classNameActive);
	this.element.classList.remove(this.options.classNameInactive);
};


/** Release */
ScrollObserver.prototype.release = function () {
	this.element.classList.remove(this.options.classNameActive);
	this.element.classList.add(this.options.classNameInactive);
};

function getScrollTop () {
	return window.pageYOffset || document.body.scrollTop;
}

function getOffsetSum(elem) {
	let top = 0;
	let left = 0;

	while (elem) {
		top = top + parseInt(elem.offsetTop, 10);
		left = left + parseInt(elem.offsetLeft, 10);
		elem = elem.offsetParent;
	}

	return {
		top: top,
		left: left,
	};
}
