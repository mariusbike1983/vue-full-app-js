<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: "",
  icon: "",
  hint: "",
  type: 'TYPE_1' | 'TYPE_2' | 'TYPE_3' | 'TYPE_4'
});
  
const btnCls = computed(() => props.type.toLowerCase().replace("_", ""));

</script>

<template>
	<button 
      class="my-button" 
      :class="btnCls"
      :title="hint"
      @click.stop.prevent="$emit('specialEvent')">
      <img v-if="icon" :src="icon"/>
      <span v-if="text">{{ text }}</span>
  </button>
</template>

<style scoped>
  .my-button:not(:disabled){
    cursor: pointer;
  }
  
  .type1 {
  	background-color: orange;
    margin-left: 5px;
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