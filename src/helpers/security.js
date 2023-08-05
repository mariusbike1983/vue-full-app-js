
import { reactive } from 'vue';
import { auth } from './auth';

const securityStore = reactive({
  isUserLoggedIn: false,
  isUserAdmin: false,

  logInUser(username, password) {
    auth._logInUser(username, password);
    this.isUserLoggedIn = true;
    const role = auth._getRoleForCurrentLoggedInUser();
    this.isUserAdmin = "ADMIN" === role;
  },

  logOut() {
    auth._logout();
    this.isUserLoggedIn = false;
    this.isUserAdmin = false;
  }
});

export { securityStore}