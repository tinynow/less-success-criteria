<template>
    <div class="lni-c-checkbox">
        <input type="checkbox" 
               :name="name" 
               :id="id"
               :value="value" 
               :checked="shouldBeChecked" 
               :required="required" 
               :disabled="disabled"
               @change="updateInput">
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
            required: false,
        },
        id: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: false,
        },
        modelValue: {
            default: false,
        },
        trueValue: {
            default: true,
        },
        falseValue: {
            default: false,
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        disabled: {
            type: Boolean,
            required: false,
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
        },
    },
    computed: {
        shouldBeChecked() {
            if (this.modelValue instanceof Array) {
                return this.modelValue.includes(this.value);
            }

            return this.modelValue === this.trueValue;
        },
    },
    methods: {
        updateInput: function(event) {
            let isChecked = event.target.checked;

            if (this.modelValue instanceof Array) {
                let newValue = [...this.modelValue];

                if (isChecked) {
                    newValue.push(this.value);
                } else {
                    newValue.splice(newValue.indexOf(this.value), 1);
                }

                this.$emit('change', newValue);
            } else {
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