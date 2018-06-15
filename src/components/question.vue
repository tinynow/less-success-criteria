<template>
    <fieldset class="lni-c-fieldset--control-group">
        <legend>{{ condition.question }}</legend>
        <lni-radio
            v-for="option in condition.options"
            :key="option.id"
            :id="condition.name + option.id"
            :label="option.label"
            :name="condition.name"
            :value="option.hasEffect ? 'true' : 'false'"
            @change="updateAnswer(option)" />
    </fieldset>
</template>

<script>
import Radio from './Radio';

export default {
    components: {
        'mk-radio': Radio,
    },
    props: {
        condition: {
            type: Object,
            required: true,
        },
    },
    methods: {
        updateAnswer(option) {
            this.$emit('change', option);
        },
    },
};
</script>
