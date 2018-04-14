/**
 * ScrollObserver
 * @description Add a class to an element when a specific scroll threshold has been reached
 *
 * @module
 * @author Zander Martineau
 */
import throttle from 'just-throttle'
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

    if (this.opts.threshold === 'this') {
      this.threshold = getOffset(this.element);
    } else {
      if (typeof parseInt(this.opts.threshold, 10) === 'Number') {
        this.threshold = parseInt(this.opts.threshold, 10);
      } else {
        throw new Error('2nd param should either be an integer or "this"');
      }
    }

    this.addEvents();
  }

  addEvents() {
    window.addEventListener('scroll', throttle(this.onScroll.bind(this), this.opts.throttle));
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

  return top
};
