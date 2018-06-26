<template>
    <div class="mk-c-radio">
        <input
            :value="value"
            :id="id"
            :name="name"
            :checked="shouldBeChecked"
            type="radio"
            @change="updateInput"
        >
        <label :for="id">{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: 'mk-radio',
    model: {
        prop: 'modelValue',
        event: 'change',
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        value: {
            type: [String, Boolean],
            required: false,
            default: null,
        },
        modelValue: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            required: true,
        },
        checked: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        shouldBeChecked() {
            return this.modelValue === this.value;
        },
    },
    methods: {
        updateInput() {
            this.$emit('change', this.value);
        },
    },
};
</script>
