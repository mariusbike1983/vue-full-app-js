import { securityStore } from "../helpers/security";

const storage_id = "TODOS";

function getStorageId() {
    const userId = securityStore.getCurrentLoggedInUserId();
    return storage_id+":"+userId;
}

function loadData() {
    let content = localStorage.getItem(getStorageId());
    let data = [];
    if (!content) {
        data.push(createNewTodoItem("Buy eggs"));
        data.push(createNewTodoItem("Do the dishes", true));
        storeData(data);
    } else {
        data = JSON.parse(content);
    }
    return data;
}

function storeData(data) {
    localStorage.setItem(getStorageId(), JSON.stringify(data));
}

async function loadExternalData(userid) {
    const response = await fetch('https://dummyjson.com/todos/user/'+userid+'?limit=5');
    const json = await response.json();
    const todos = json.todos;
    const data = [];
    todos.forEach(element => {
        const item = createNewTodoItem(element.todo, element.completed);
        data.push(item);
    });
    storeData(data);
    return data;
}

function createNewTodoItem(itemText, itemCompleted, itemDetails) {
    if (!itemDetails) {
        itemDetails = "Created at: " + new Date();
    }
    return {
        id:         _generateNextId(),
        text:       itemText,
        details:    itemDetails,
        completed:  itemCompleted
    }
}

/**
 *  Private methods, should not be called from the outside
 */
function _generateNextId() {
    window.nextId = window.nextId ? window.nextId + 1 : 1;
    return window.nextId;
}

export { loadData, createNewTodoItem, loadExternalData, storeData }