<script setup>
import { ref, watch, computed } from 'vue'
import TodoList from '../components/TodoList.vue'
import Button from '../components/Button.vue'
import { loadData, createNewTodoItem , loadExternalData} from '../data/loaddata.js'

const newItemText     = ref("")
const items           = ref(loadData())
const buttonAdd       = ref(null)
const buttonRemove    = ref(null)
const showCompleted   = ref(true)
const bREnabled       = ref(false)
const bAEnabled       = ref(false)
const todoList        = ref(null)
const showHideList    = computed(() => {
	return showCompleted.value ? "Hide completed" : "Show completed"
})
const filteredItems   = computed(() => { 
	return items.value.filter(item => showCompleted.value ? true: !item.completed)
})
const defaultPlaceholderText = "No items in list. Start adding one...";
  
watch(items, 
  	(newValue, oldValue) => {
  		bREnabled.value = newValue.length > 0
		},
  	{ deep: true, 
      immediate: true 
    })
  
watch(newItemText, 
		(newValue, oldValue) => {
    	bAEnabled.value = newValue.length > 0
  	},
    { immediate: true })

function onAdd() {
	if (newItemText.value) {
    const newItem = createNewTodoItem(newItemText.value);
    items.value.push(newItem);
  }
  newItemText.value = "";
}

function onRemoveAll() {
	items.value.splice(0);
  todoList.value.setTodoPlaceholderText(defaultPlaceholderText);
}
  
function onItemRemove(data) {
  const ndx = items.value.findIndex(el => el.id === data.id);
  if (ndx >= 0) {
  	items.value.splice(ndx, 1);
  }
  if (items.value.length === 0) {
    todoList.value.setTodoPlaceholderText(defaultPlaceholderText);
  }
}
  
function onItemChanged(data) {
	const item = items.value.find(el => el.id === data.id);
  if (item) {
  	item.completed = !item.completed;
  }
}

async function onLoadExternalData() {
  items.value.splice(0);
  todoList.value.setTodoPlaceholderText("Loading...");
  const newItems = await loadExternalData();
  if (newItems.length > 0){
    items.value.push(...newItems);
  } else {
    todoList.value.setTodoPlaceholderText("No elements loaded!");
  }
}
</script>

<template>
  <h1>Todo list</h1>
  <input  v-model="newItemText" 
          @keyup.enter="onAdd">
  <Button ref="buttonAdd"
          :text="'Add'"
          :type="'TYPE_1'"
          :disabled="!bAEnabled"
          @specialEvent="onAdd"/>
  <Button ref="buttonRemove"
          :text="'Remove all'"
          :type="'TYPE_1'"
          :disabled="!bREnabled"
          @specialEvent="onRemoveAll"/>
  <Button :text="showHideList"
          :type="'TYPE_1'"
          @specialEvent="showCompleted = !showCompleted"/>
  <Button :text="'Load external data'"
          :type="'TYPE_1'"
          @specialEvent="onLoadExternalData"/>
  <TodoList
        ref="todoList"
  			:items="filteredItems"
        :placeholderText="defaultPlaceholderText"
        @item-removed="onItemRemove"
        @item-changed="onItemChanged"/>
</template>