<template>
    <button 
        class="mk-c-toggle mk-c-button" 
        :aria-pressed="pressed"
        aria-label="ariaLabel"
        @click="onClick">
        <slot name="before" />
        <span class="visual-only">{{ pressed ? pressedLabel : unpressedLabel }}</span>
        &nbsp;
        <slot name="after" />
    </button>
</template>

<script>
export default {

    name: "mk-toggle",

    props: {
        ariaLabel: {
            type: String,
            required: true,
        },
        isPressed: {
            type: Boolean,
            default: false,
        },
        pressedLabel: {
            type: String,
            default: 'on',
        },
        unpressedLabel: {
            type: String,
            default: 'off',
        },
    },
    data() {
        return {
            pressed: false,
        }
    },
    watch: {
        isPressed(val) {
            this.pressed = val;
        },
    },
    methods: {
        toggle() {
            this.pressed = !this.pressed;
        },
        onClick() {
            this.toggle();
            this.$emit("toggle", this.pressed);
        },
    },
};
</script>