/**
 * @type {import('vitepress').UserConfig}
 */
export default {
  lang: 'en-US',
  cleanUrls: true,
  title: 'Brendan Goodenough',
  markdown: {
    theme: 'github-dark',
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nerdenough' },
      {
        icon: 'twitter',
        link: 'https://twitter.com/nerdenough',
      },
      {
        icon: 'instagram',
        link: 'https://instagram.com/nerdenough',
      },
    ],
    outline: [2, 3],
    nav: [
      {
        text: 'Projects',
        link: '/projects',
      },
      // {
      //   text: 'Photography',
      //   link: '/photography',
      // },
      {
        text: 'Blog',
        link: '/blog',
      },
    ],
    footer: {
      copyright: `&copy; ${new Date().getFullYear()} Brendan Goodenough`,
    },
  },
}
