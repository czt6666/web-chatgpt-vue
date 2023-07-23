export default {
  lang: 'en-CN',
  title: 'ChatGPT聊天',
  description: '',

  base: './',

  themeConfig: {
    siteTitle: '帮助与反馈',
    logo: '/logo/paimeng1-trans.png',
    // 顶部导航栏
    nav: [
      { text: '支付问题', link: '/payment' },
      { text: '账号问题', link: '/account' },

      // {
      //   text: '帮助与反馈',
      //   items: [
      //     { text: 'Item A', link: '/item-1' },
      //     { text: 'Item B', link: '/item-2' },
      //     { text: 'Item C', link: '/item-3' },
      //   ],
      // },
    ],
    // 侧边导航栏 
    sidebar: [
      {
        // text: '帮助与反馈',
        items: [
          { text: '💰支付问题', link: '/payment' },
          { text: '🎫账号问题', link: '/account' },
          { text: '💸收费问题', link: '/charge' },
          { text: '📱其它产品', link: '/product' },
          { text: '💯优化建议', link: '/propose' },
        ],
      },
    ],
  },
};
