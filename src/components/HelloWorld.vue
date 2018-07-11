<template>

    <main>
        <!-- <mk-fetcher
                v-if="!rawCriteria"
                :endpoint="WCAGJSONURL"
                method="get"
                @response="handleResponse" /> -->
        <div class="mk-intro mk-u-full-width">
            <!-- TODO: provide short posts for those who don't know what the about words mean -->
            <p class="mk-u-readable">Accessibility testing cannot be (fully) automated, so a manual process is always necessary. Certain answers to particular questions reduce the WCAG criteria you need to test. This application asks those questions and filters WCAG criteria accordingly. It is especially useful if you use the <a href="https://www.w3.org/WAI/eval/report-tool/#/">WCAG-EM Report Tool</a>.</p>
        </div>
        <mk-meter
            class="mk-u-mt3"
            id="percentFilteredCriteria"
            :value="successCriteria.length - filteredIds.length"
            :max="successCriteria.length"
        >
            <span slot-scope="slotProps" slot="label">Showing {{ slotProps.value }} of {{ slotProps.max }} criteria</span>
        </mk-meter>
        <div class="mk-o-page--filtered-collection inset mk-u-mt3">
 
            <section 
                id="screening-questions"
                class="mk-u-mb4">
                <h2>1. Answer questions to eliminate WCAG criteria that don't apply.</h2>
                <form>
                    <mk-question v-for="condition in conditions" :id="condition.name" :question="condition.question" :options="condition.options" :key="conditions.indexOf(condition)" @change="onAnswer($event, condition)" />
                </form>
            </section>
            <div>
                <section id="relevant-criteria" class="lni-o-layout__secondary mk-text-context--secondary mk-u-mb4" tabindex="0">
                    <h2>2. Review filtered criteria</h2>
                    <mk-wcag-criteria :criteria="filteredCriteria" />
                </section>
                <section>
                    <h2>3. Download .json file for your audit</h2>
                    <mk-downloader v-if="filteredCriteria" :data-string="JSON.stringify(emToolJson)" file-type="json" text="Download .json file for WCAG-EM Report Tool" />
                </section>
            </div>

        </div>
    </main>
</template>

<script>
import Fetcher from "./Fetcher";
import Question from "./Question";
import Conditions from "../assets/defaultConditions";
import Criteria from "./Criteria";
import Downloader from "./Downloader";
import Meter from './Meter';
import wcagCriteria from "../assets/successCriteria.json";
import blankJson from "../assets/evaluation.json";
import testsToCriteria from "../assets/testsToCriteria.json";

const WCAGJSONURL =
    "https://raw.githubusercontent.com/karlgroves/wcag-as-json/master/wcag.json";

export default {
    name: "hello-world",
    components: {
        // TODO: determine best way to import components
        "mk-question": Question,
        "mk-fetcher": Fetcher,
        "mk-wcag-criteria": Criteria,
        "mk-downloader": Downloader,
        'mk-meter': Meter,
    },
    data() {
        return {
            msg: "Welcome to Your Vue.js App",
            conditions: Conditions,
            WCAGJSONURL,
            rawCriteria: wcagCriteria,
            appliedFilters: [],
            blankJson: blankJson
        };
    },
    computed: {
        filteredIds() {
        // TODO: remove duplicates
        const allIds = [];

        this.appliedFilters.forEach(filterObject => {
            filterObject.criteria.forEach(id => {
                allIds.push(id);
            });
        });

            return allIds;
        },
        successCriteria() {
            const successCriteria = [];

            this.rawCriteria.forEach(principle => {
                principle.guidelines.forEach(guideline => {
                guideline.success_criteria.forEach(criterion => {
                    criterion["principle"] = principle.title;
                    criterion["guideline"] = guideline.title;
                    successCriteria.push(criterion);
                });
                });
            });
            return successCriteria;
        },
        filteredCriteria() {
            const filteredIds = this.filteredIds;
            return this.successCriteria.map(criteria => {
                // TODO: consider more deeply whether this linting rule
                // is helping
                // eslint-disable-next-line no-param-reassign
                criteria.filtered = filteredIds.includes(criteria.ref_id);
                return criteria;
            });
        },

        emToolJson() {
            const template = this.blankJson;
            const assertions = template["@graph"][0].auditResult;

            this.filteredIds.forEach(id => {
                let test = testsToCriteria[id];
                let checked = assertions.find(assertion => assertion["test"] === test);
                checked.result.outcome = "earl:inapplicable";
            });

            template["@graph"][0].auditResult = assertions;

            if (this.appliedFilters.find((filter) => filter.name === 'No AAA criteria')) {
                template["@graph"][0].evaluationScope.conformanceTarget = 'wai:WCAG2AA-Conformance';
            }


            return template;
        },
    },
    methods: {
        handleResponse(response) {
            this.rawCriteria = response;
        },
        applyFilter(filter) {
            this.appliedFilters.push(filter);
        },
        removeFilter(filter) {
            this.appliedFilters = this.appliedFilters.filter(
                item => item.name !== filter.name
            );
        },
        updateConditions(answer, condition) {
            if (answer.value === condition.filter.on) {
                this.applyFilter(condition.filter);
            } else {
                this.removeFilter(condition.filter);
            }
        },
        onAnswer(payload, condition) {
            this.updateConditions(payload, condition);
        },
    }
};
</script>
