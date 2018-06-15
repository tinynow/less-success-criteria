<template>

    <section
        id="relevant-criteria"
        class="lni-o-layout__secondary lni-c-text-context--secondary"
        tabindex="0">

        <h2>Select relevant success criteria</h2>

        <div class="flex items-end">
            <span class="criteria-stats">Showing {{ criteria.length - disabledCriteria.length || '' }} of {{ criteria.length || '' }} possible.</span>
            <lni-toggle
                id="hide-disabled"
                label="Hide irrelevant"
                @toggle="toggleVisible"/>
        </div>

        <ul class="lni-c-list--reset">
            <li
                v-for="item in filteredCriteria"
                v-show="!hideDisabled || !item.disabled"
                :key="item.ref_id"
                class="criterion">
                <lni-checkbox
                    :id="'ref-' + item.ref_id"
                    :label="item.title + ' ' + item.ref_id"
                    :value="item.ref_id"
                    :disabled="item.disabled"/>
                <a
                    :href="item.url"
                    class="reference-link"
                    target="_blank">Guideline</a>
            </li>
        </ul>
    </section>
</template>

<script>
export default {

};
</script>

<style>

</style>
