<script setup>
import { ref, computed } from 'vue';
import CustomButton from './CustomButton.vue';
import { getImageUrl } from '../helpers/helpers.js';

const props = defineProps({
    title: "",
    text: "",
    type: 'INFORMATION' | 'QUESTION'
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
        modalDialog.value.addEventListener("close", function() {
            modalDialog.value.removeEventListener("close", this);
            modalDialog.value.removeEventListener("close", callback);
        });
        // since we are reusing the dialog instance, the return value must be reseted
        modalDialog.value.returnValue = "";
        modalDialog.value.showModal();
    }
});

function onCloseModalDismiss() {
    modalDialog.value.close("DISMISS");
}

function onCloseModalYes() {
    modalDialog.value.close("YES");
}

function onCloseModalNo() {
    modalDialog.value.close("NO");
}

const dialogIcon = computed(() => {
    if (isInformation) {
        return getImageUrl('info.png')
    } else if (isQuestion) {
        return getImageUrl('question.png')
    }
    return "";
});

const isInformation = computed(() => mType.value === "INFORMATION");

const isQuestion = computed(() => mType.value === "QUESTION")

</script>

<template>
    <dialog ref="modalDialog">
        <header>
            <div class="title"> {{ mTitle }}</div>
            <CustomButton
                :type="'TYPE_4'"
                :icon="getImageUrl('close.png')"
                @specialEvent="onCloseModalDismiss"
            />
        </header>
        <div class="container">
            <img v-if="dialogIcon" 
                :src="dialogIcon">
            <div class="text"> {{ mText }}</div>
        </div>
        <footer>
            <CustomButton
                v-if="isQuestion"
                :text="'Cancel'"
                :type="'TYPE_3'"
                @specialEvent="onCloseModalDismiss"
            />
            <CustomButton
                v-if="isInformation"
                :text="'No'"
                :type="'TYPE_1'"
                @specialEvent="onCloseModalNo"
            />
            <CustomButton
                :text="'Yes'"
                :type="'TYPE_1'"
                @specialEvent="onCloseModalYes"
            />
        </footer>
    </dialog>
</template>

<style lang="css" scoped>
    dialog {
        padding: 0px;
        overflow: hidden;
        border: 2px solid slategray;
    }
    header {
        display: flex;
        padding: 5px;
        justify-content: space-between;
        background-color: antiquewhite;
        border-bottom: 2px solid orangered;
    }
    footer {
        padding: 5px;
        display: flex;
        justify-content: flex-end;
        background-color: antiquewhite;
        border-top: 2px solid orangered;
    }
    .container {
        padding: 10px;
        display: flex;
        gap: 10px;
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