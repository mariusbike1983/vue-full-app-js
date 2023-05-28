function loadData() {
    const data = [];
    data.push(createNewTodoItem("Buy eggs"));
    data.push(createNewTodoItem("Do the dishes", true));
    return data;
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

export { loadData, createNewTodoItem, loadExternalData }