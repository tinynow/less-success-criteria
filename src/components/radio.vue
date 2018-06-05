<template>
  <div class="lni-c-radio">
      <input type="radio"
             :id="id" 
             :name="name"
             :checked="shouldBeChecked" 
             :value="value" 
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
    props:  {
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
            default: "",
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
            return this.modelValue == this.value;
        }
    },
    methods: {
        updateInput() {
            this.$emit('change', this.value);
        }
    }
  }
</script>