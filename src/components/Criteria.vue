<template>
<div>
    <div>
        <!-- <mk-meter
            :value="relevant.length"
            :max="criteria.length"
        /> -->
        <div class="mk-u-flex">
            <!-- <p>Showing <span class="criteria-stats">{{ relevant.length || '' }} of {{ criteria.length || '' }}</span> criteria.</p> -->
            <mk-toggle
                v-if="criteria.length > relevant.length"
                ariaLabel="Show Disabled"
                pressedLabel="Hide"
                unpressedLabel="Show"
                @toggle="toggleVisible"
            >
                <span slot="after">Filtered Items</span>
            </mk-toggle>
            <div 
                v-if="relevant.length === criteria.length"
                class="mk-u-mb3"></div><!-- hack to stop the shifting of content -->
        </div>

    </div>

        <transition-group name="list" tag="ul" class="mk-c-criteria mk-u-list-reset mk-u-columns --sm mk-u-type-size--0 mk-u-pt2">
        <li
            v-for="item in criteria"
            v-show="!hideDisabled || !item.filtered"
            :key="item.ref_id"
            :class="item.filtered ? '-disabled' : ''"
            class="mk-c-criterion mk-u-flex">
            <span class="mk-c-criterion__title">{{ item.title }}</span>
            <a
                :href="item.url"
                class="mk-u-mr0 mk-u-mlauto mk-u-nowrap"
                target="_blank"
                rel="noopener">{{ item.ref_id}}</a>
        </li>
        </transition-group>
</div>      
</template>

<script>
import Checkbox from './Checkbox';
import Meter from './Meter';
import Toggle from './Toggle';

export default {
    name: 'mk-wcag-criteria',
    components: {
        'mk-checkbox': Checkbox,
        'mk-meter': Meter,
        'mk-toggle': Toggle,
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

.mk-c-criteria {
    position: relative;
    overflow: hidden;
}

.mk-c-criterion {
        border-bottom: 1px solid #999;

}
.mk-c-criterion__title {
    .-disabled & {
        text-decoration: line-through;
        text-decoration-style: dotted; 
    }
}

.list-enter {
    position: absolute;
    bottom: 0;
}
.list-enter-active {
    color: red;
    outline: 5px solid brown;
}
.list-enter-active, .list-leave-active, .list-move {
    transition: all 1s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-complete-leave-active {
  outline: 1px solid red;
}
</style>