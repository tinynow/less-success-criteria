<template>
    <div>
        <header>
            <h1>
                Less Success Criteria
                <span class="mk-u-subtitle">Only test relevant WCAG criteria.</span>
            </h1>

        </header>
        <main>
            <mk-fetcher
                v-if="!rawCriteria"
                :endpoint="WCAGJSONURL"
                method="get"
                @response="handleResponse" />


            <div class="lni-o-layout--aside-right inset">
                <section id="screening-questions">
                    <h2>Narrow the possibilities</h2>
                    <p> Answer questions to eliminate WCAG criteria that don't apply.</p>
                    <form>
                        <mk-question
                            v-for="condition in conditions"
                            :id="condition.name"
                            :question="condition.question"
                            :options="condition.options"
                            :key="conditions.indexOf(condition)"
                            @change="onAnswer($event, condition)" />
                    </form>
                </section>

                <mk-wcag-criteria :criteria="filteredCriteria" />

                <mk-downloader
                    :data-string="JSON.stringify(filteredCriteria)"
                    file-type="json"
                    text="Download .json file for WCAG-EM Report Tool"
                />

            </div>
            <h2>Potential Conditions</h2>
            <ul>
                <li>Uses common styles and templates (org specific)</li>
                <li>Passes aXe test</li>
                <li>Valid HTML5</li>
                <li>Can access all content via keyboard with styles disabled</li>
            </ul>
            <h2 id="roadmap">Roadmap</h2>
            <ul>
                <li>Add more conditions</li>
                <li>Add filter to hide irrelevant requirements</li>
                <li>Create more complex conditions (based on answers to more than one question)</li>
                <li>Add heuristics for meeting requirements, not just eliminating irrelevant</li>
                <li>Allow custom conditions</li>
                <li>Better error messaging (if data doesn't load)</li>
                <li>Provide short descriptions of success criteria</li>
            </ul>
        </main>
    </div>
</template>

<script>
import Fetcher from './Fetcher';
import Question from './Question';
import Conditions from '../assets/defaultConditions';
import Criteria from './Criteria';
import Downloader from './Downloader';
import wcagCriteria from '../assets/successCriteria.json';

const WCAGJSONURL = 'https://raw.githubusercontent.com/karlgroves/wcag-as-json/master/wcag.json';


export default {
    name: 'hello-world',
    components: {
        // TODO: determine best way to import components
        'mk-question': Question,
        'mk-fetcher': Fetcher,
        'mk-wcag-criteria': Criteria,
        'mk-downloader': Downloader,
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            conditions: Conditions,
            WCAGJSONURL,
            rawCriteria: wcagCriteria,
            appliedFilters: [],
        };
    },
    computed: {
        filteredIds() {
            // TODO: remove duplicates
            const allIds = [];

            this.appliedFilters.forEach((filterObject) => {
                filterObject.criteria.forEach((id) => {
                    allIds.push(id);
                });
            });

            return allIds;
        },
        successCriteria() {
            const successCriteria = [];

            this.rawCriteria.forEach((principle) => {
                principle.guidelines.forEach((guideline) => {
                    guideline.success_criteria.forEach((criterion) => {
                        successCriteria.push(criterion);
                    });
                });
            });
            return successCriteria;
        },
        filteredCriteria() {
            const filteredIds = this.filteredIds;
            return this.successCriteria.map((criteria) => {
                // TODO: consider more deeply whether this linting rule is helping
                // eslint-disable-next-line no-param-reassign
                criteria.filtered = filteredIds.includes(criteria.ref_id);
                return criteria;
            });
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
            this.appliedFilters = this.appliedFilters.filter(item => item.name !== filter.name);
        },
        updateConditions(answer, condition) {
            if (answer.value === condition.filter.on) {
                this.applyFilter(condition.filter);
            } else {
                this.removeFilter(condition.filter);
            }
        },
        onAnswer(answer, condition) {
            this.updateConditions(answer, condition);
        },
    },
};
</script>
