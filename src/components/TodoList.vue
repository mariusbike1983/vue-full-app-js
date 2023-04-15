<script setup>
import TodoItem from './TodoItem.vue'
  
const props = defineProps({
	items: []
})

const emits = defineEmits([
  'item-removed',
  'item-changed'
])
  
function onItemChanged(data) {
  emits('item-changed', { id: data.id })
}
  
function onItemRemoved(data) {
 	emits('item-removed', { id: data.id })
}
</script>

<template>
  <div class="container">
  	<TodoItem v-for="(item, index) in items" :key="index"
        :id="item.id"
        :text="item.text"
        :completed="item.completed"
        @item-removed="onItemRemoved"
        @item-changed="onItemChanged"/>
  </div>
</template>

<style scoped>
  .container {
    margin-top: 10px;
    padding: 2px;
    background-color: lightblue;
  }
</style>