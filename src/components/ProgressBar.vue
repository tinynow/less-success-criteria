<template>
    <progress
        class="mk-c-progress"
        :value="value"
        :max="max"
    />

</template>

<script>
export default {
    name: 'mk-progress',
    props: {
        value: {
            type: Number,
        },
        max: {
            type: Number,
        },
    },
};
</script>

<style>

</style>
