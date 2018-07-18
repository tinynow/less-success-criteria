export default [
    {
        name: 'aaaRequired',
        question: 'Do you need to meet the AAA level of conformance?',
        options: [
            {
                value: true,
                label: 'Yes',
            },
            {
                value: false,
                label: 'No',
            },
        ],
        filter: {
            name: 'No AAA criteria',
            on: false,
            criteria: ['1.2.6', '1.2.7', '1.2.8', '1.2.9', '1.4.6', '1.4.7', '1.4.8', '1.4.9', '2.1.3', '2.2.3', '2.2.4', '2.2.5', '2.3.2', '2.4.8', '2.4.9', '2.4.10', '3.1.3', '3.1.4', '3.1.5', '3.1.6', '3.2.5', '3.3.5', '3.3.6'],
        },
    },
    {
        name: 'videoOrAudio',
        question: 'Is there video or audio on the page?',
        options: [
            {
                value: true,
                label: 'Yes',
            },
            {
                value: false,
                label: 'No',
            },
        ],
        filter: {
            name: 'No video or audio',
            on: false,
            criteria: ['1.2.1', '1.2.2', '1.2.3', '1.2.4', '1.2.5', '1.2.6', '1.2.7', '1.2.8', '1.2.9', '1.4.2', '1.4.7'],
        },
    },
    {
        name: 'animations',
        question: 'Are there animations or content that is revealed by user interaction on the page?',
        options: [
            {
                value: true,
                label: 'Yes',
            },
            {
                value: false,
                label: 'No',
            },
        ],
        filter: {
            name: 'No animations',
            on: false,
            criteria: ['2.2.2', '2.3.1'],
        },
    },
    {
        name: 'formElements',
        question: 'Are there any form elements on the page?',
        description: 'WCAG criteria apply only to form elements.',
        options: [
            {
                label: 'Yes',
                value: true,
            },
            {
                label: 'No',
                value: false,
            },
        ],
        filter: {
            name: 'No form elements',
            on: false,
            criteria: ['3.3.1', '3.3.2', '3.3.3', '3.3.4', '3.3.5', '4.1.2'],
        },
    },
    {
        name: 'timing',
        question: 'Is there any timed content or time limits?',
        options: [
            {
                label: 'Yes',
                value: true,
            },
            {
                label: 'No',
                value: false,
            },
        ],
        filter: {
            name: 'No timed content',
            on: false,
            criteria: ['2.2.1', '2.2.3'],
        },
    },
    {
        name: 'imageAlternatives',
        question: 'Do all non-decorative images have a text label?',
        options: [
            {
                label: 'Yes',
                value: true,
            },
            {
                label: 'No',
                value: false,
            },
        ],
        filter: {
            name: 'All images have alt',
            on: true,
            criteria: ['1.1.1'],
        },
    },
];

