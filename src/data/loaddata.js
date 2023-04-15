function loadData() {
    if (!window.data) {
        window.data = [ createNewTodoItem("Buy eggs"), 
                        createNewTodoItem("Do the dishes")];
        window.data[1].completed = true;
    }
    return window.data;
}

function createNewTodoItem(itemText) {
    return {
        id:   generateNextId(),
        text: itemText
    }
}

function generateNextId() {
    window.nextId = window.nextId ? window.nextId + 1 : 1;
    return window.nextId;
}

export { loadData, createNewTodoItem }