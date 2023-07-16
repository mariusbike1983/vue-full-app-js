<script setup>
import CustomButton from './CustomButton.vue';
import { getImageUrl } from '../helpers/helpers.js';
import { ref } from 'vue';
  
const props = defineProps({
  id				: 0,
  text			: "",
  completed	: false
});
  
const emits = defineEmits([
  "item-removed",
  "item-changed",
  "item-edit"
]);

const editing = ref(false);
const editingInput = ref(null);
const itemTextValue = ref(props.text)
  
function onRemove() {
  emits('item-removed', { id: props.id })
}
  
function onChange() {
  emits('item-changed', { id: props.id })
}

function onEdit() {
  itemTextValue.value = props.text;
  editing.value = true;
  editingInput.value.focus();
}

function onCommitEditing() {
  editing.value = false;
  emits('item-edit', {id: props.id, text: itemTextValue.value});
}

function onDiscardChanges() {
  editing.value = false;
}

</script>

<template>
    <div class="item" 
        :class="{'is-completed': completed}">
        <div>
            <input type="checkbox"
                  :checked="completed"
                  @change="onChange">
            <span v-show="!editing">
              {{ text }}
            </span>
            <input v-show="editing" 
                  ref="editingInput"
                  id="itemedit"
                  v-model="itemTextValue"
                  @keydown.enter="onCommitEditing"
                  @keydown.esc="onDiscardChanges"
            >
        </div>
        <div class="actions-container">
          <CustomButton 
                :type="'TYPE_4'"
                :icon="getImageUrl('edit.png')"
                :hint="'Edit'"
                @specialEvent="onEdit"/>
          <CustomButton 
                :type="'TYPE_4'"
                :icon="getImageUrl('delete.png')"
                :hint="'Remove'"
                @specialEvent="onRemove"/>
        </div>
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
  
  .item:hover {
    border: 1px solid orange;
    .actions-container {
      visibility: visible;
    }
  }

  .is-completed > div {
    text-decoration: line-through;
  }
  .is-completed {
    background-color: rgba(144, 238, 144, 0.2);
  }

  .actions-container {
    display: flex;
    gap: 2px;
    visibility: hidden;
  }
</style>