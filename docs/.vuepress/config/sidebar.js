module.exports = {
    '/introduction/': [
        // {
        //     title: '面试题',
        //     collapsable: false,
        //     sidebarDepth: 2,
        //     children: ['question/']
        // },
        {
            title: '前端面试之道',
            collapsable: false,
            sidebarDepth: 2,
            children: [
                'js-basis/'
            ]
        }],
    // '/introduction/':require('../../introduction/sidebar'),
    '/interview/': require('../../interview/sidebar'),
    // '/code-resource/vue/': require('../code-resource/vue/sidebar'),
    // '/reprint/':require('../reprint/sidebar')
}