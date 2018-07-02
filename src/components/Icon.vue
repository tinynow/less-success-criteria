<template>
    <svg
        :width="width"
        :height="height"
        :style="{transform: 'rotateZ(' + rotation + ')'}"
        xmlns="http://www.w3.org/2000/svg"
        class="mk-c-icon"
        viewBox="0 0 512 512"
        aria-hidden="true">
        <g :fill="iconColor">
            <slot />
        </g>
    </svg>
</template>

<script>
export default {
    props: {
        width: {
            type: [Number, String],
            default: 24,
        },
        height: {
            type: [Number, String],
            default: 24,
        },
        iconColor: {
            type: String,
            default: 'currentColor',
        },
        orientation: {
            type: String,
        },
    },
    data() {
        return {
            directions: {
                N: 0,
                NE: 45,
                E: 90,
                SE: 135,
                S: 180,
                SW: 225,
                W: 270,
                NW: 315,
            },
        };
    },
    computed: {
        rotation() {
            return `${this.getRotation(this.orientation)}deg`;
        },
    },
    methods: {
        getRotation(direction) {
            return this.directions[direction];
        },
    },
};
</script>
