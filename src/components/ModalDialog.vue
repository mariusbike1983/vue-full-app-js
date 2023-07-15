<script setup>
import { ref } from 'vue';
import CustomButton from './CustomButton.vue';
import { getImageUrl } from '../helpers/helpers.js';

const props = defineProps({
    title: "",
    text: "",
    type: 'TYPE_1' | 'TYPE_2'
});

const mTitle = ref(props.title);
const mText = ref(props.text);
const mType = ref(props.type);

const modalDialog = ref(null);

defineExpose({
    show: (_title, _text, _type, callback) => {
        if (_title) {
            mTitle.value = _title;
        } 
        if (_text) {
            mText.value = _text;
        }
        if (_type) {
            mType.value = _type;
        }
        modalDialog.value.addEventListener("close", callback);
        modalDialog.value.showModal();
    }
});


function onCloseModalConfirm() {
    modalDialog.value.close("YES");
}

function onCloseModalCancel() {
    modalDialog.value.close("DISMISS");
}

</script>

<template>
    <dialog ref="modalDialog">
        <header>
            <div class="title"> {{ mTitle }}</div>
            <CustomButton
                :type="'TYPE_4'"
                :icon="getImageUrl('close.png')"
                @specialEvent="onCloseModalCancel"
            />
        </header>
        
        <div class="container">
            <div class="text"> {{ mText }}</div>
        </div>
        <footer>
            <CustomButton
                :text="'Cancel'"
                :type="'TYPE_3'"
                @specialEvent="onCloseModalCancel"
            />
            <CustomButton
                :text="'Confirm'"
                :type="'TYPE_1'"
                @specialEvent="onCloseModalConfirm"
            />
        </footer>
    </dialog>
</template>

<style lang="css" scoped>
    dialog {
        padding: 0px;
        overflow: hidden;
        border: 2px solid darkgray;
    }
    header {
        display: flex;
        padding: 5px;
        justify-content: space-between;
        background-color: antiquewhite;
        border-bottom: 1px solid orange;
    }
    footer {
        padding: 5px;
        display: flex;
        justify-content: flex-end;
        background-color: antiquewhite;
        border-top: 1px solid orange;
    }
    .container {
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100px;
        min-width: 200px;
        max-width: 400px;
        max-height: 400px;
    }
    .text {
        
    }
</style>