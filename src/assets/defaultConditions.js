export default [
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

];
