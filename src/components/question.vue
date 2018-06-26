<template>
    <fieldset class="lni-c-fieldset--control-group">
        <legend>{{ question }}</legend>
        <mk-radio
            v-for="(option) in options"
            :key="option.value"
            :id="id + option.label"
            :label="option.label"
            :name="id"
            :value="option.value"
            @change="updateAnswer(option, question)" />
    </fieldset>
</template>

<script>
import Radio from './Radio';

export default {
    name: 'mk-question',
    components: {
        'mk-radio': Radio,
    },
    props: {
        question: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
        id: {
            type: String,
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
