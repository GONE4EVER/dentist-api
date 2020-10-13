/**
 * Takes functions sequence and calls them in specified order.
 * Each further function is being called with result of the previous one.
 * Providing arguments for the first function in sequence is performed by calling
 * the returned value with required ones.
 * @param {Function[]} funcs
 */

const pipe = (...funcs) => funcs
  .filter(func => func instanceof Function)
  .reduce(
    (prev, next) => (...args) => next(prev(...args)),
  );


export default pipe;
