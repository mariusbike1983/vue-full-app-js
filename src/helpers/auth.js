const auth = {
    __AUTH_USER_ID: "userIdAuth",
    __USERS_DATA:   "usersData",

    _getRoleForCurrentLoggedInUser: function() {
        const secObj = this._getCurrentSecurityObj();
        if (!secObj) {
            return null;
        }
        return this._getUserObjFoId(secObj.id).role;
    },

    _logInUser: function(username, password) {
        const userObj = this._getUserObj(username, password);
        if (userObj) {
            this._logout();
            localStorage.setItem(this.__AUTH_USER_ID, JSON.stringify({ 
                id: userObj.id,
                date: new Date()
            }));
        } else {
            throw new Error("Invalid username or password");
        }
    },

    _logout: function() {
        localStorage.removeItem(this.__AUTH_USER_ID);
    },

    _getCurrentSecurityObj: function() {
        const securityObj = localStorage.getItem(this.__AUTH_USER_ID);
        if (!securityObj) {
            return null;
        }
        const authUserIdData = JSON.parse(securityObj);
        if (!authUserIdData.id) {
            return null;
        }
        return authUserIdData;
    },

    _getUserObj: function(username, password) {
        let usersDataObj = localStorage.getItem(this.__USERS_DATA);
        if (usersDataObj) {
            return JSON.parse(usersDataObj).find(elem => {
                if (elem.username === username && elem.password === password) {
                    return elem;
                }
            });
        }
        return null;
    },

    _getUserObjFoId: function(id) {
        let usersDataObj = localStorage.getItem(this.__USERS_DATA);
        if (usersDataObj) {
            return JSON.parse(usersDataObj).find(elem => {
                if (elem.id === id) {
                    return elem;
                }
            });
        }
        return null;
    },

    _updateObjForId: function(newData) {
        let usersDataObj = localStorage.getItem(this.__USERS_DATA);
        if (usersDataObj) {
            const usersData = JSON.parse(usersDataObj);
            const elem = usersData.find(elem => elem.id === newData.id);
            elem.fullname = newData.fullName;
            elem.role = newData.isAdmin ? "ADMIN":"STANDARD";
            localStorage.setItem(this.__USERS_DATA, JSON.stringify(usersData));
        }
    },

    getUsersData() {
        let usersDataObj = localStorage.getItem(this.__USERS_DATA);
        if (usersDataObj) {
            const usersData = JSON.parse(usersDataObj);
            return usersData;
        }
        return [];
    },

    insertUserData(userData) {
        
    },

    initUserWithRoles() {
        let usersDataObj = localStorage.getItem(this.__USERS_DATA);
        if (!usersDataObj) {
            usersDataObj = [
                {
                    id:         1,
                    role:       "ADMIN",
                    username:   "user1",
                    fullname:   "Marius",
                    password:   "user1"
                },
                {
                    id:         2,
                    role:       "STANDARD",
                    username:   "user2",
                    fullname:   "Adrian",
                    password:   "user2"
                }
            ];
            localStorage.setItem(this.__USERS_DATA, JSON.stringify(usersDataObj));
        }
        return usersDataObj;
    }
}

export { auth };