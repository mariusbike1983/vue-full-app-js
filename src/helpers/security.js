
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

  getCurrentLoggedInUserDetails() {
    if (this.isUserLoggedIn) {
      const id = this.getCurrentLoggedInUserId();
      const obj = auth._getUserObjFoId(id);
      return {
        fullName: obj.fullname,
        userDetails: obj.username
      }
    }
  },

  setCurrentLoggedInUserDetails(newData) {
    const id = this.getCurrentLoggedInUserId();
    const updateData = {
      id: id,
      ...newData
    }
    auth._updateObjForId(updateData);
  },

  logOut() {
    auth._logout();
    this.isUserLoggedIn = false;
    this.isUserAdmin = false;
  },

  init() {
    const secObj = auth._getCurrentSecurityObj();
    if (secObj) {
      this.isUserLoggedIn = true;
      const role = auth._getRoleForCurrentLoggedInUser();
      this.isUserAdmin = "ADMIN" === role;  
    }
  },

  getCurrentLoggedInUserId() {
    const secObj = auth._getCurrentSecurityObj();
    if (secObj) {
      return secObj.id;
    }
    return -1;
  }
});

export { securityStore}