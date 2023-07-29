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

function onItemAttemptEditing(data) {
  editingItem.value = data ? data.id : -1;
}

function isItemReadonly(item) {
  if (editingItem.value === -1) {
    return false;
  }
  return item.id !== editingItem.value;
}

function onItemSelect(data) {
  editingItem.value = -1;
  emits('item-select', data);
}

</script>

<template>
  <div class="container" ref="container">
  	<TodoItem v-for="(item, index) in items" :key="index"
        :id="item.id"
        :text="item.text"
        :details="item.details"
        :selected="item.selected"
        :completed="item.completed"
        :read-only="isItemReadonly(item)"
        @item-removed="onItemRemoved"
        @item-changed="onItemChanged"
        @item-attempt-editing="onItemAttemptEditing"
        @item-commit-edit="onItemEdit"
        @item-select="onItemSelect"/>
    <span class="placeholder" v-if="items.length === 0">{{ placeholderTextValue }}</span>
  </div>
</template>

<style scoped>
  .container {
    margin-top: 10px;
    padding: 2px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: rgb(220, 236, 241);
    border: 1px solid slategray;
    border-radius: 5px;
    min-height: 35px;
  }

  .placeholder {
    opacity: 0.5;
  }
</style>