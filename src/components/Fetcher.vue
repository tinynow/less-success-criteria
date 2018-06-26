<template>
    <div class="mk-fetcher"/>
</template>

<script>
/*  TODO:
- document events
    - response: @returns json
    - error: @returns string
*/

export default {
    name: 'mk-fetcher',

    props: {
        endpoint: {
            type: String,
            required: true,
        },
        method: {
            type: String, // TODO: can you do new types - like httpMethod?
            default: 'get',
        },
        localKey: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            response: null,
            error: null,
        };
    },
    created() {
        this.fetch();
    },

    methods: {
        buildRequest() {
            return new Request(this.endpoint);
        },

        handleJsonResponse(json) {
            this.response = json;
            this.$emit('response', this.response);
        },

        fetch() {
            const self = this;

            fetch(this.buildRequest(), { method: this.method })
                .then(response =>
                // What do you do here for error handling?
                    response.json(),
                )

                .then((json) => {
                    self.handleJsonResponse(json);
                })

                .catch(() => {
                    // TODO: research best way to handle fetch errors
                    // gonna be up in then and here in catch
                    // eslint-disable-next-line no-console
                    console.warn(
                        "Couldn't fetch data (and developer couldn't bother to provide a better error message).",
                    );
                });
        },
    },
};
</script>
