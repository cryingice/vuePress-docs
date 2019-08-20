/* eslint-disable */
module.exports = {
    title: 'cryingice的博客',
    description: '我的心路历程',
    dest: './dist',
    host: "0.0.0.0", //访问路径
    port: 7777,
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: require('./config/nav'),
        sidebar: require('./config/sidebar'),
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "New content is available.",
                buttonText: 'Refresh'
            }
        },
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！'
    }
}