<script setup>
import CustomButton from './CustomButton.vue';
import { getImageUrl } from '../helpers/helpers.js';
import { nextTick, ref } from 'vue';
  
const props = defineProps({
  id				: 0,
  text			: "",
  details   : "",
  readOnly  : false,
  completed	: false,
  selected  : false
});
  
const emits = defineEmits([
  "item-removed",
  "item-changed",
  "item-commit-edit",
  "item-attempt-editing",
  "item-select"
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

function onAttemptEditing() {
  emits('item-attempt-editing', { id: props.id });
  itemTextValue.value = props.text;
  editing.value = true;
  editingInput.value.size = props.text.length;
  nextTick(() => {
    editingInput.value.focus();
  });
}

function onCommitEditing() {
  editing.value = false;
  emits('item-commit-edit', {id: props.id, text: itemTextValue.value});
}

function onDiscardChanges() {
  editing.value = false;
  emits('item-attempt-editing');
}

function onItemClick() {
  emits('item-select', {id: props.id});
}

</script>

<template>
    <div class="item" 
        :class="{
          'is-completed': completed, 
          'read-only': readOnly, 
          'selected': selected
        }"
        @click="onItemClick">
        <div>
            <div class="item-content">
              <input type="checkbox"
                    :checked="completed"
                    @change="onChange">
              <span v-show="!(editing && selected)">
                {{ text }}
              </span>
              <input v-show="editing && selected" 
                    ref="editingInput"
                    id="itemedit"
                    v-model="itemTextValue"
                    @keydown.enter="onCommitEditing"
                    @keydown.esc="onDiscardChanges">
          </div>
          <div class="details" v-if="selected">
            <span> {{ details }}</span>
          </div>
        </div>
        <div class="actions-container">
          <CustomButton 
                :type="'TYPE_4'"
                :icon="getImageUrl('edit.png')"
                :hint="'Edit'"
                :disabled="editing"
                @specialEvent="onAttemptEditing"/>
          <CustomButton 
                :type="'TYPE_4'"
                :icon="getImageUrl('delete.png')"
                :hint="'Remove'"
                :disabled="editing"
                @specialEvent="onRemove"/>
        </div>
    </div>
</template>

<style scoped>
  .item {
    display: flex;
    flex-direction: row;
    gap: 10px;
    border: 2px solid slategray;
    border-radius: 5px;
    padding-left: 10px;
    cursor: pointer;
    position:relative;
    overflow: hidden;
    min-height: 32px;
  }

  .item::before {
    background: orange;
    content: "";
    display: block;
    height: 100%;
    left: -10px;
    position: absolute;
    top: 0;
    transition: transform .3s ease-in-out;
    width: 10px;
    z-index: 1;
  }

  .item:hover::before {
    transform: translateX(10px);
  }

  .item.selected::before {
    transform: translateX(10px);
    background: orangered;
  }

  .item.selected {
    border: 2px solid orangered;
    .actions-container {
      visibility: visible;
    }
  }
  
  .item:hover:not(.read-only, .selected) {
    border: 2px solid orange;
  }
  
  .actions-container {
    flex-grow: 1;
    min-width: 0;
    display: flex;
    justify-content: space-between;
  }

  .is-completed > div > .item-content {
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

  .details {
    padding-left: 20px;
  }

  .details > span {
    font-size: 11px;
    font-color: slategray
  }
</style>