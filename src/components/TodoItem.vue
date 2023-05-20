<script setup>
import Button from './Button.vue'
  
const props = defineProps({
  id				: 0,
  text			: "",
  completed	: false
});
  
const emits = defineEmits([
  "item-removed",
  "item-changed"
]);
  
function onRemove() {
  emits('item-removed', { id: props.id })
}
  
function onItemChange() {
  emits('item-changed', { id: props.id })
}
</script>

<template>
    <div class="item" 
        :class="{'is-completed': completed}">
        <div>
          <input type="checkbox"
                :checked="completed"
                @change="onItemChange">
          <span> {{ text }} </span>
        </div>
        <Button 
              :text='"-"'
              :type='"TYPE_2"'
              @specialEvent="onRemove"/>
    </div>
</template>

<style scoped>
  .item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid gray;
    border-radius: 5px;
    background-color: lightgreen;
    margin: 5px;
    padding: 2px;
  }
  
  .is-completed > span {
    text-decoration: line-through;
  }
  .is-completed {
    background-color: rgba(144, 238, 144, 0.2);
  }
  
  span {
    margin-left: 5px;
    margin-right: 10px;
  }
</style>