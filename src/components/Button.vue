<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  text: "",
  type: 'TYPE_1' | 'TYPE_2'
});
  
const btnCls = computed(() => {
  return props.type === 'TYPE_1' ? "type1" : "type2"
});
</script>

<template>
	<button class="my-button" 
          :class="btnCls"
          @click="$emit('specialEvent')">
    {{ text }}
  </button>
</template>

<style scoped>
  button {
  	margin-left: 5px;
  }
  
  .my-button:not(:disabled){
    cursor: pointer;
  }
  
  .type1 {
  	background-color: yellow;
  }
  
  .type2 {
  	background-color: red;
  }
</style>