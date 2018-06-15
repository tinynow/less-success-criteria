<template>
    <main>
        <mk-fetcher
            :endpoint="WCAGJSONURL"
            method="get"
            @response="handleResponse"
        />
        {{ rawCriteria }}
        <div class="lni-o-layout--aside-right inset">
            <section id="screening-questions">
                <h2>
                    <a
                        href="#screening-questions"
                        class="step-number">1</a> Narrow the possibilities
                </h2>
                <p> Answer questions to eliminate WCAG criteria that don't apply.</p>
                <form>
                    <lni-question
                        v-for="condition in conditions"
                        :condition="condition"
                        :key="conditions.indexOf(condition)"
                        @change="setDisabled"/>
                </form>
                <a
                    href="#relevant-criteria"
                    class="expand-next"
                    tabindex="-1"
                    aria-hidden="true">Next section</a>
            </section>


            <section
                id="relevant-test-procedures"
                tabindex="0">
                <h2>
                    <a
                        href="#relevant-test-procedures"
                        class="step-number"
                        tabindex="-1">3</a>Review your testing checklist
                </h2>
                <p>You can <a href="#export-checklist">download or print your custom checklist below.</a></p>
                <a
                    href="#relevant-criteria"
                    class="expand-previous"
                    tabindex="-1"
                    aria-hidden="true">Previous</a>
            </section>

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
</template>

<script>
import Fetcher from './Fetcher';
import Question from './Question';
import Conditions from '../assets/defaultConditions';

const WCAGJSONURL = 'https://raw.githubusercontent.com/karlgroves/wcag-as-json/master/wcag.json';


export default {
    name: 'HelloWorld',
    components: {
        'mk-question': Question,
        'mk-fetcher': Fetcher,
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            conditions: Conditions,
            WCAGJSONURL,
            rawCriteria: null,
            successCriteria: null,
        };
    },
    methods: {
        handleResponse(response) {
            this.rawCriteria = response;
            this.successCriteria = this.parseRawCriteria(response);
        },
        parseRawCriteria(raw) {
            const successCriteria = [];
            raw.forEach((principle) => {
                principle.forEach((guideline) => {
                    successCriteria.push(guideline.success_criteria);
                });
            });
            return successCriteria;
        },
    },
};
</script>
