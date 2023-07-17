const authUserId = "userIdAuth";
function isUserAuthenticated(userId) {
    const secObj = _getCurrentSecurityObj();
    if (!secObj || secObj.userId !== userId) {
        return false;
    }
    return true;
}

function logInUser(userId) {
    const secObj = _getCurrentSecurityObj();
    if (!secObj) {
        localStorage.removeItem(authUserId);
        localStorage.setItem(authUserId, JSON.stringify({ id: userId }));
    } else {
        throw new Error("Auth log in err");
    }
}

function getCurrentUserId() {
    const obj = _getCurrentSecurityObj();
    return obj ? obj.userId : -1;
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
    return securityObj;
}

export { isUserAuthenticated, getCurrentUserId, logInUser }