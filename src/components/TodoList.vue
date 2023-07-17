<script setup> 
import TodoItem from './TodoItem.vue';
import { ref } from 'vue';
  
const props = defineProps({
	items:            [],
  placeholderText:  ""
})

const container = ref(null);
const placeholderTextValue = ref(props.placeholderText);
const editingItem = ref(-1);

const emits = defineEmits([
  'item-removed',
  'item-changed',
  'item-edit'
])

defineExpose({
  setTodoPlaceholderText: text => placeholderTextValue.value = text
})

function onItemChanged(data) {
  emits('item-changed', data);
}
  
function onItemRemoved(data) {
 	emits('item-removed', data);
}

function onItemEdit(data) {
  emits('item-edit', data);
  editingItem.value = -1;
}

function onItemEditing(data) {
  editingItem.value = data ? data.id : -1;
}

function isItemReadonly(item) {
  if (editingItem.value === -1) {
    return false;
  }
  return item.id !== editingItem.value;
}

</script>

<template>
  <div class="container" ref="container">
  	<TodoItem v-for="(item, index) in items" :key="index"
        :id="item.id"
        :text="item.text"
        :completed="item.completed"
        :read-only="isItemReadonly(item)"
        @item-removed="onItemRemoved"
        @item-changed="onItemChanged"
        @item-editing="onItemEditing"
        @item-edit="onItemEdit"/>
    <span v-if="items.length === 0">{{ placeholderTextValue }}</span>
  </div>
</template>

<style scoped>
  .container {
    margin-top: 10px;
    padding: 2px;
    background-color: lightblue;
    border: 1px solid slategray;
    border-radius: 5px;
  }
</style>