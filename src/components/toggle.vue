<template>
    <button class="x-toggle" :aria-pressed="pressed" aria-label="hide irrelevant" @click="onClick">
      <span class="visual-only">{{ pressed ? "Show" : "Hide" }}</span> Irrelevant
    </button>
</template>

<script>
  module.exports = {
      model: {
          prop: 'modelValue',
          event: 'change',
      },
      data: function() {
        return {
          pressed: false,
        } 
      },
      methods: {
        onClick() {
          this.pressed === true ? this.pressed = false : this.pressed = true;
          this.$emit('toggle', this.pressed)
        }
      }
    }
</script>
<style></style>