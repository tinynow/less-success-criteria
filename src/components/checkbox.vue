<template>
    <div class="mk-checkbox">
        <input
            :name="name"
            :id="id"
            :value="value"
            :checked="shouldBeChecked"
            :required="required"
            :disabled="disabled"
            type="checkbox"
            @change="updateInput"
        >
        <label :for="id">{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: 'mk-checkbox',
    description: `
    A checkbox that works differently if it is in a list of checkboxes.
    `,
    model: {
        prop: 'modelValue',
        event: 'change',
    },
    props: {
        name: {
            type: String,
            default: this.id,
        },
        id: {
            type: String,
            required: true,
        },
        /* For checkbox lists */
        value: {
            type: String,
            validator(val) {
                /* Fancy way to say, it is required if part of list */
                return val || !(this.modelValue instanceof Array);
            },
            default: this.id, // TODO: is this a good idea?
            note: 'If checkbox is part of a list and it is checked, this is the value stored in the model\'s array. Not required for a single checkbox.',
        },
        modelValue: {
            type: [Array, Boolean],
            default: false,
            note: 'Single checkbox',
        },
        trueValue: {
            type: [Number, String, Boolean],
            default: true,
        },
        falseValue: {
            type: [Number, String, Boolean],
            default: false,
            description: 'For single checkboxes, when "!this.checked != false"',
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        checked: {
            type: Boolean,
            required: false,
            default: false,
        },
        label: {
            type: String,
            required: true,
        },
        className: {
            type: String,
            required: false,
            default: '',
        },
    },
    computed: {
        shouldBeChecked() {
            /* Allow model to control state */
            if (this.modelValue instanceof Array) {
                return this.modelValue.includes(this.value);
            }

            return this.modelValue === this.trueValue;
        },
    },
    methods: {
        updateInput(event) {
            const isChecked = event.target.checked;

            if (this.modelValue instanceof Array) {
                /* This is part of a list of checkboxes */
                const newValue = [...this.modelValue];

                if (isChecked) {
                    newValue.push(this.value);
                } else {
                    newValue.splice(newValue.indexOf(this.value), 1);
                }
                this.$emit('change', newValue);
            } else {
                /* The simple case - checked = true (or 1, 'Yes', etc.) */
                this.$emit(
                    'change',
                    isChecked ? this.trueValue : this.falseValue,
                );
            }
        },
    },
};
</script>
<style></style>
