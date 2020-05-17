export default (callback, errorMessage = '', delay = 1000) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (errorMessage) {
      reject(new Error(errorMessage));
    } else {
      resolve(callback());
    }
  }, delay);
});
