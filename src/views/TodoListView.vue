<script setup>
import { ref, watch, computed } from 'vue'
import TodoList from '../components/TodoList.vue'
import CustomButton from '../components/CustomButton.vue'
import { loadData, createNewTodoItem , loadExternalData, storeData } from '../data/loaddata.js'
import ModalDialog from '../components/ModalDialog.vue';

const defaultPlaceholderText  = "No items in list. Start adding one...";
const newItemText             = ref("");
const items                   = ref(loadData());
const showCompleted           = ref(true);
const bREnabled               = ref(false);
const bAEnabled               = ref(false);

const todoList                = ref(null);
const modalDialog             = ref(null);
const showHideList            = computed(() => showCompleted.value ? "Hide completed" : "Show completed");
const filteredItems           = computed(() => items.value.filter(item => showCompleted.value ? true: !item.completed));
  
watch(items, newValue => {
  		bREnabled.value = newValue.length > 0;
      storeData(newValue);
      if (newValue.length === 0 && todoList.value) {
        todoList.value.setTodoPlaceholderText(defaultPlaceholderText);
      }
		},
  	{ 
      deep: true, 
      immediate: true 
    });
  
watch(newItemText, newValue => bAEnabled.value = newValue.length > 0, { immediate: true });

function onAdd() {
	if (newItemText.value) {
    const newItem = createNewTodoItem(newItemText.value);
    items.value.push(newItem);
  }
  newItemText.value = "";
}

function onRemoveAll() {
  const nrOfItems = items.value.length
  modalDialog.value.show("Confirm", `Are you sure you want to remove all ${nrOfItems} items?`, "QUESTION", ev => {
    if (!ev.currentTarget.returnValue || ev.currentTarget.returnValue === "DISMISS") {
      return;
    }
    items.value.splice(0);
  });
}
  
function onItemRemove(data) {
  modalDialog.value.show("Confirm", "Are you sure you want to delete this item?", "QUESTION", ev => {
    if (!ev.currentTarget.returnValue || ev.currentTarget.returnValue === "DISMISS") {
      return;
    }
    const ndx = items.value.findIndex(el => el.id === data.id);
    if (ndx >= 0) {
      items.value.splice(ndx, 1);
    }
  });
}
  
function onItemChanged(data) {
	const item = items.value.find(el => el.id === data.id);
  if (item) {
  	item.completed = !item.completed;
  }
}

function onItemEdit(data) {
  const item = items.value.find(el => el.id === data.id);
  if (item) {
    item.text = data.text;
  }
}

function onItemSelected(data) {
  items.value.forEach(element => {
      element.selected = element.id === data.id;
  });
}

function onLoadExternalData() {
  modalDialog.value.show("Information", "You are about to fetch data from an external site. Continue?", "INFORMATION", async ev => {
    if (ev.currentTarget.returnValue === "YES") {
      items.value.splice(0);
      todoList.value.setTodoPlaceholderText("Loading...");
      const newItems = await loadExternalData();
      if (newItems.length > 0){
        items.value.push(...newItems);
      } else {
        todoList.value.setTodoPlaceholderText("No elements loaded!");
      }
    }
  });
  
}
</script>

<template>
  <h1>Todo list</h1>
  <div class="toolbar">
    <div>
      <input  v-model="newItemText" 
              @keyup.enter="onAdd">
      <CustomButton ref="buttonAdd"
              :text="'Add'"
              :type="'TYPE_1'"
              :disabled="!bAEnabled"
              @specialEvent="onAdd"/>
      <CustomButton ref="buttonRemove"
              :text="'Remove all'"
              :type="'TYPE_1'"
              :disabled="!bREnabled"
              @specialEvent="onRemoveAll"/>
      <CustomButton :text="showHideList"
              :type="'TYPE_1'"
              @specialEvent="showCompleted = !showCompleted"/>
    </div>
    <CustomButton 
            :text="'Load external data'"
            :type="'TYPE_1'"
            @specialEvent="onLoadExternalData"/>
  </div>
  <TodoList
          ref="todoList"
          :items="filteredItems"
          :placeholderText="defaultPlaceholderText"
          @item-removed="onItemRemove"
          @item-changed="onItemChanged"
          @item-select="onItemSelected"
          @item-edit="onItemEdit"/>
  <ModalDialog ref="modalDialog"/>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;  
}
</style>