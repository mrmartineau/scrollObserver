/**
 * Sticker
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
function Sticker(element, options) {
	let opts;
	this.element = element;

	if (arguments.length > 1) {
		opts = options || {};
	} else {
		opts = JSON.parse(this.element.getAttribute('data-sticker-options')) || {};
	}

	this.options = Object.assign({}, this.defaultOptions, opts);

	this.addEvents();
}


/** Default options */
Sticker.prototype.defaultOptions = {
	breakpoint: 1,
	classNameActive: 'sticker-active',
	classNameInactive: 'sticker-inactive',
};


/** Add events */
Sticker.prototype.addEvents = function () {
	window.addEventListener("scroll", this.onScroll.bind(this))
};


/** onScroll events */
Sticker.prototype.onScroll = function () {
	const scrollYPos = window.scrollY;

	let breakpoint = this.options.breakpoint;

	if (this.options.breakpoint === 'this') {
		breakpoint = getOffsetSum(this.el).top;
	}

	if (scrollYPos >= this.options.breakpoint) {
		this.stick();
	} else {
		this.unstick();
	}
};


/** Stick */
Sticker.prototype.stick = function () {
	this.el.classList.add(this.options.classNameActive);
	this.el.classList.remove(this.options.classNameInactive);
};


/** Unstick */
Sticker.prototype.unstick = function () {
	this.el.classList.remove(this.options.classNameActive);
	this.el.classList.add(this.options.classNameInactive);
};

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

module.exports = Sticker;
