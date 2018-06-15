export default [
    {
        name: 'videoOrAudio',
        question: 'Is there video or audio on the page?',
        options: [
            {
                id: 1,
                label: 'Yes',
                enable: ['1.2.1', '1.2.2', '1.2.3', '1.2.4', '1.2.5', '1.2.6', '1.2.7', '1.2.8', '1.2.9', '1.4.2', '1.4.7'],
            },
            {
                id: 2,
                label: 'No',
                disable: ['1.2.1', '1.2.2', '1.2.3', '1.2.4', '1.2.5', '1.2.6', '1.2.7', '1.2.8', '1.2.9', '1.4.2', '1.4.7'],
            },
        ],
    },
    {
        name: 'animations',
        question: 'Are their animations or content that is revealed by user interaction on the page?',
        options: [
            {
                id: 1,
                label: 'Yes',
                enable: ['2.2.2', '2.3.1'],
            },
            {
                id: 2,
                label: 'No',
                disable: ['2.2.2', '2.3.1'],
            },
        ],
    },

];
