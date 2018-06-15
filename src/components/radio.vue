<template>
    <div class="lni-c-radio">
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
            type: String,
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
