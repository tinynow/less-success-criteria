<template>
    <a
        :href="dataURI"
        :download="fileName"
        class="mk-download__link"
        @click="onClick">{{ text }}</a>

</template>

<script>
export default {
    name: 'mk-downloader',
    props: {
        text: {
            type: String,
            default: 'Download file',
        },
        dataString: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: 'download',
        },
        fileType: {
            type: String,
            default: 'json',
        },
    },
    data() {
        return {
            mimeTypes: {
                json: 'text/json;charset=utf8',
            },
        };
    },
    computed: {
        dataURI() {
            return `data:${this.mimeTypes[this.fileType]},${encodeURIComponent(this.dataString)}`;
        },
        fileName() {
            return `${this.name}.${this.fileType}`;
        },
    },
    methods: {
        triggerDownload() {
            this.el.click();
        },
        onClick() {
            this.$emit('click');
        },
    },
};
</script>

<style>

</style>
