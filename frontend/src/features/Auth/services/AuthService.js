/*
const request = (callback, errorMessage = '', timeout = 1000) => new Promise(
  (resolve, reject) => {
    setTimeout(() => {
      if (errorMessage) {
        reject(new Error(errorMessage));
      }

      resolve(callback);
    }, timeout);
  },
);
*/

/**
 * TODO: actual request to identity provider service #1
 * TODO: remove value storing from local storage #2
 */
export default {
  authenticate(payload) {
    if (!payload) {
      return localStorage.getItem('auth');
    }

    const { login, password } = payload;
    const { VUE_APP_LOGIN, VUE_APP_PASSWORD } = process.env; // #1

    return login === VUE_APP_LOGIN && password === VUE_APP_PASSWORD;
  },
  logIn({ login, password }) {
    const authResult = this.authenticate({ login, password });

    localStorage.setItem('auth', authResult); // #2

    return authResult;
  },
  logOut() {
    localStorage.clear();
  },
};
