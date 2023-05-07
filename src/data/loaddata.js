function loadData() {
    const data = [];
    data.push(createNewTodoItem("Buy eggs"));
    const newItem = createNewTodoItem("Do the dishes");
    newItem.completed = true;
    data.push(newItem);
    return data;
}

async function loadExternalData() {
    const data = [];
    const todos = await fetch('https://dummyjson.com/todos?limit=5')
        .then(response => response.json())
        .then(json => json.todos);
    for(let i = 0; i<todos.length; i++) {
        const item = createNewTodoItem(todos[i].todo);
        item.completed = todos[i].completed;
        data.push(item);
    }
    return data;
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

export { loadData, createNewTodoItem, loadExternalData }