<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: "",
  icon: "",
  type: 'TYPE_1' | 'TYPE_2' | 'TYPE_3' | 'TYPE_4'
});
  
const btnCls = computed(() => props.type.toLowerCase().replace("_", ""));
</script>

<template>
	<button 
      class="my-button" 
      :class="btnCls"
      @click="$emit('specialEvent')">
      <img v-if="icon" :src="icon"/>
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

  .type3 {
    border: none;
    background: none;
    text-decoration: underline;
  }

  .type4 {
    padding: 0px;
    border: 1px solid gray;
    margin: 0px;
    width: 21px;
    height: 21px;
  }
</style>