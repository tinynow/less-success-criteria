<template>
    <fieldset class="lni-c-fieldset--control-group">
        <legend>{{ condition.question  }}</legend>
        <lni-radio v-for="option in condition.options" :key="option.id" 
                   :id="condition.name + option.id" 
                   :label="option.label" 
                   :name="condition.name" 
                   :value="option.hasEffect ? 'true' : 'false'" 
                   @change="updateAnswer(option)"></lni-radio>
    </fieldset>
</template>

<script>
import Radio from './radio';

export default {
    props: ['condition'],
    components: {
        "mk-radio": Radio
    },
    methods: {
        updateAnswer(option) {
            this.$emit('change', option);
        }
    }
}
</script>
<style></style>