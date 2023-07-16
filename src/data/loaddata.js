const storage_id = "TODOS";

function loadData() {
    let content = localStorage.getItem(storage_id);
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
    localStorage.setItem(storage_id, JSON.stringify(data));
}

async function loadExternalData() {
    const response = await fetch('https://dummyjson.com/todos?limit=5');
    const json = await response.json();
    const todos = json.todos;
    const data = [];
    todos.forEach(element => {
        const item = createNewTodoItem(element.todo, element.completed);
        data.push(item);
    });
    return data;
}

function createNewTodoItem(itemText, itemCompleted) {
    return {
        id:         _generateNextId(),
        text:       itemText,
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