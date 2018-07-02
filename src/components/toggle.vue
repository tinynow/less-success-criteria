<template>
    <button class="mk-toggle" :aria-pressed="pressed" aria-label="hide irrelevant" @click="onClick">
        <span class="visual-only">{{ pressed ? "Show" : "Hide" }}</span> Irrelevant
    </button>
</template>

<script>
export default {
  name: "mk-toggle",
  model: {
    prop: "value",
    event: "change"
  },
  computed: {
    shouldBePressed() {
      return this.modelValue === this.value;
    }
  },
  methods: {
    onClick() {
      this.pressed === true ? (this.pressed = false) : (this.pressed = true);
      this.$emit("toggle", this.pressed);
    }
  }
};
</script>