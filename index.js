/**
 * ScrollObserver
 * Description
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
	this.options = Object.assign({}, this.defaultOptions, options);

	if (this.options.thresholdIn === 'this') {
		this.breakpoint = getOffsetSum(this.element).top;
	}

	this.addEvents();
}


/** Default options */
ScrollObserver.prototype.defaultOptions = {
	thresholdIn: 1,
	thresholdOut: 100,
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
	let breakpoint;

	if (this.breakpoint) {
		breakpoint = this.breakpoint;
	} else {
		breakpoint = this.options.breakpoint;
	}

	if (scrollYPos >= breakpoint) {
		this.thresholdReached();
	} else {
		this.unstick();
	}
};


/** Stick */
ScrollObserver.prototype.thresholdReached = function () {
	this.element.classList.add(this.options.classNameActive);
	this.element.classList.remove(this.options.classNameInactive);
};


/** Unstick */
ScrollObserver.prototype.unstick = function () {
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
