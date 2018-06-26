<template>

    <section
        id="relevant-criteria"
        class="lni-o-layout__secondary lni-c-text-context--secondary"
        tabindex="0">

        <h2>Select relevant success criteria</h2>

        <div class="flex items-end">
            <span class="criteria-stats">Showing {{ criteria.length - disabled.length || '' }} of {{ criteria.length || '' }} possible.</span>
            <!-- <lni-toggle
                id="hide-disabled"
                label="Hide irrelevant"
                @toggle="toggleVisible"/> -->
        </div>

        <ul class="mk-u-list-reset">
            <li
                v-for="item in criteria"
                v-show="!hideDisabled || !item.disabled"
                :key="item.ref_id"
                class="criterion">
                <mk-checkbox
                    :id="'ref-' + item.ref_id"
                    :label="item.title + ' ' + item.ref_id"
                    :value="item.ref_id"
                    :disabled="item.filtered"/>
                <a
                    :href="item.url"
                    class="reference-link"
                    target="_blank">Guideline</a>
            </li>
        </ul>
    </section>
</template>

<script>
import Checkbox from './Checkbox';

export default {
    name: 'mk-wcag-criteria',
    components: {
        'mk-checkbox': Checkbox,
    },
    props: {
        criteria: {
            type: Array,
            required: true,
        },
        hideDisabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        disabled() {
            // return this.criteria;
            return this.criteria.filter(item => item.filtered);
        },
    },
    methods: {
        toggleVisible() {
            this.hideDisabled = !this.hideDisabled;
        },
    },

};
</script>
