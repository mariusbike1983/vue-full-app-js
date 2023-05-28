<script setup> 
import TodoItem from './TodoItem.vue'
import { ref } from 'vue'
  
const props = defineProps({
	items:            [],
  placeholderText:  ""
})

const container = ref(null)
const placeholderTextValue = ref(props.placeholderText)

const emits = defineEmits([
  'item-removed',
  'item-changed'
])

defineExpose({
  setTodoPlaceholderText: text => { placeholderTextValue.value = text; }
})

function onItemChanged(data) {
  emits('item-changed', { id: data.id })
}
  
function onItemRemoved(data) {
 	emits('item-removed', { id: data.id })
}
</script>

<template>
  <div class="container" ref="container">
  	<TodoItem v-for="(item, index) in items" :key="index"
        :id="item.id"
        :text="item.text"
        :completed="item.completed"
        @item-removed="onItemRemoved(item)"
        @item-changed="onItemChanged(item)"/>
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