<template>
<div>
    <div class="flex items-end">

        <span class="criteria-stats">{{ relevant.length || '' }} of {{ criteria.length || '' }}</span>
        <button
            v-if="disabled.length > 0" 
            class="mk-c-button--bare"
            @click="toggleVisible">Hide/Show Disabled</button>
        <mk-progress
            :value="relevant.length"
            :max="criteria.length"
        />
    </div>

    <ul class="mk-u-list-reset mk-u-columns --sm mk-u-type-size--0 mk-u-pt2">
        <li
            v-for="item in criteria"
            v-show="!hideDisabled || !item.filtered"
            :key="item.ref_id"
            :class="item.filtered ? '-disabled' : ''"
            class="mk-c-criterion mk-u-flex mk-u-items-start">
            <span class="mk-c-criterion__title">{{ item.title }}</span>
            <a
                :href="item.url"
                class="reference-link mk-u-mr0 mk-u-mlauto mk-u-nowrap"
                target="_blank"
                rel="noopener">{{ item.ref_id}}</a>
        </li>
    </ul>
</div>      
</template>

<script>
import Checkbox from './Checkbox';
import Progress from './ProgressBar';

export default {
    name: 'mk-wcag-criteria',
    components: {
        'mk-checkbox': Checkbox,
        'mk-progress': Progress,
    },
    props: {
        criteria: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            hideDisabled: true,
        };
    },
    computed: {
        disabled() {
            return this.criteria.filter(item => item.filtered);
        },
        relevant() {
            return this.criteria.filter(item => !item.filtered);
        },
    },
    methods: {
        toggleVisible() {
            this.hideDisabled = !this.hideDisabled;
        },
    },
};
</script>
<style lang="scss">
.mk-c-criterion {

}
.mk-c-criterion__title {
    .-disabled & {
        text-decoration: line-through;
        text-decoration-style: dotted; 
    }
}
</style>