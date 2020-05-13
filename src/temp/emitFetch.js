export default (callback, errorMessage = '', delay = 1000) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (errorMessage) {
      // TODO: error handling; custom errors
      reject(new Error(errorMessage));
    } else {
      resolve(callback());
    }
  }, delay);
});
