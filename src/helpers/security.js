const __AUTH_USER_ID = "userIdAuth";
const __USERS_DATA   = "usersData";

import { reactive } from 'vue';

const securityStore = reactive({
  isUserLoggedIn: false,
  isUserAdmin: false,

  logInUser(username, password) {
    _logInUser(username, password);
    this.isUserLoggedIn = true;
    const role = _getRoleForCurrentLoggedInUser();
    this.isUserAdmin = "ADMIN" === role;
  },

  logOut() {
    localStorage.removeItem(__AUTH_USER_ID);
    this.isUserLoggedIn = false;
    this.isUserAdmin = false;
  }
});

function _getRoleForCurrentLoggedInUser() {
const secObj = _getCurrentSecurityObj();
if (!secObj) {
    return null;
}
return _getUserObjFoId(secObj.id).role;
}

function _logInUser(username, password) {
    const userObj = _getUserObj(username, password);
    if (userObj) {
        localStorage.removeItem(__AUTH_USER_ID);
        localStorage.setItem(__AUTH_USER_ID, JSON.stringify({ 
            id: userObj.id,
            date: new Date()
        }));
    } else {
        throw new Error("Invalid username or password");
    }
}

function _getCurrentSecurityObj() {
    const securityObj = localStorage.getItem(__AUTH_USER_ID);
    if (!securityObj) {
        return null;
    }
    const authUserIdData = JSON.parse(securityObj);
    if (!authUserIdData.id) {
        return null;
    }
    return authUserIdData;
}


function _getUserObj(username, password) {
    let usersDataObj = localStorage.getItem(__USERS_DATA);
    if (usersDataObj) {
        return JSON.parse(usersDataObj).find(elem => {
            if (elem.username === username && elem.password === password) {
                return elem;
            }
        });
    }
    return null;
}

function _getUserObjFoId(id) {
    let usersDataObj = localStorage.getItem(__USERS_DATA);
    if (usersDataObj) {
        return JSON.parse(usersDataObj).find(elem => {
            if (elem.id === id) {
                return elem;
            }
        });
    }
    return null;
}

function initUserWithRoles() {
    let usersDataObj = localStorage.getItem(__USERS_DATA);
    if (!usersDataObj) {
        usersDataObj = [
            {
                id:         1,
                role:       "ADMIN",
                username:   "user1",
                password:   "user1"
            },
            {
                id:         2,
                role:       "STANDARD",
                username:   "user2",
                password:   "user2"
            }
        ];
        localStorage.setItem(__USERS_DATA, JSON.stringify(usersDataObj));
    }
    return usersDataObj;
}

export { initUserWithRoles, securityStore}