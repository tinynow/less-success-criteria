<template>
    <div class="mk-c-meter__container">
        <label for="id"><slot name="label" v-bind:value="value" v-bind:max="max"></slot></label>
        <meter
            :id="id"
            class="mk-c-meter"
            :value="value"
            :max="max"
            :min="min"
        />
    </div>

</template>

<script>
export default {
    name: 'mk-meter',
    props: {
        id: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
        },
        max: {
            type: Number,
        },
        min: {
            type: Number,
            default: 0,
        },
    },
};
</script>
