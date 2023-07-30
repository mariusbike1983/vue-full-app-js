const authUserId = "userIdAuth";
const usersData = "usersData";

function isUserAuthenticated() {
    const secObj = _getCurrentSecurityObj();
    if (!secObj || !secObj.id) {
        return false;
    }
    return true;
}

function getRoleForUser(userId) {
    const secObj = _getCurrentSecurityObj();
    if (!secObj || secObj.id !== userId) {
        return null;
    }
    return _getUserObjFoId(userId).role;
}

function logInUser(username, password) {
    const userObj = _getUserObj(username, password);
    if (userObj) {
        localStorage.removeItem(authUserId);
        localStorage.setItem(authUserId, JSON.stringify({ 
            id: userObj.id,
            date: new Date()
        }));
    } else {
        throw new Error("Invalid username or password");
    }
}

function logout() {
    localStorage.removeItem(authUserId);    
}

function getCurrentUserId() {
    const obj = _getCurrentSecurityObj();

    return obj ? obj.id : -1;
}

function _getCurrentSecurityObj() {
    const securityObj = localStorage.getItem(authUserId);
    if (!securityObj) {
        return null;
    }
    const authUserIdData = JSON.parse(securityObj);
    if (!authUserIdData.id) {
        return null;
    }
    return authUserIdData;
}

function initUserWithRoles() {
    let usersDataObj = localStorage.getItem(usersData);
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
        localStorage.setItem(usersData, JSON.stringify(usersDataObj));
    }
    return usersDataObj;
}

function _getUserObj(username, password) {
    let usersDataObj = localStorage.getItem(usersData);
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
    let usersDataObj = localStorage.getItem(usersData);
    if (usersDataObj) {
        return JSON.parse(usersDataObj).find(elem => {
            if (elem.id === id) {
                return elem;
            }
        });
    }
    return null;
}

function getAuthUserPriviles() {
    const loggedInUser = _getCurrentSecurityObj();
    if (loggedInUser) {

    }
}

export { initUserWithRoles, isUserAuthenticated, getCurrentUserId, logInUser, logout, getRoleForUser }