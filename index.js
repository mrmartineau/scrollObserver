/**
 * ScrollObserver
 * @description Add a class to an element when a specific scroll threshold has been reached
 *
 * @module
 * @author Zander Martineau
 */
import throttle from 'just-throttle';
export default class {
  /**
   * @constructor
   * @param {Element} element
   * @param {Object} opts
   */
  constructor(element, opts) {
    this.element = element;
    const defaultOpts = {
      threshold: 1,
      classNameActive: 'scrollObserver-active',
      classNameInactive: 'scrollObserver-inactive',
      throttle: 100,
    };
    this.opts = Object.assign({}, defaultOpts, opts);

    this.addEvents();
  }

  addEvents() {
    window.addEventListener(
      'scroll',
      throttle(this.onScroll.bind(this), this.opts.throttle)
    );

    const threshold = this.opts.threshold;
    if (threshold === 'this') {
      this.threshold = getOffset(this.element);
    } else {
      if (typeof parseInt(threshold, 10) !== 'number') {
        throw new Error(
          '`threshold` value should either be an integer or "this"'
        );
      }
      this.threshold = parseInt(threshold, 10);
    }
  }

  onScroll(e) {
    const scrollYPos = window.pageYOffset || document.body.scrollTop;

    if (scrollYPos >= this.threshold) {
      this.thresholdReached();
    } else {
      this.release();
    }
  }

  thresholdReached() {
    this.element.classList.add(this.opts.classNameActive);
    this.element.classList.remove(this.opts.classNameInactive);
  }

  release() {
    this.element.classList.remove(this.opts.classNameActive);
    this.element.classList.add(this.opts.classNameInactive);
  }
}

const getOffset = elem => {
  let top = 0;

  while (elem) {
    top = top + parseInt(elem.offsetTop, 10);
    elem = elem.offsetParent;
  }

  return top;
};
