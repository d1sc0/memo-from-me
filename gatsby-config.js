module.exports = {
  siteMetadata: {
    siteTitle: `Memo from me`,
    description: `A podcast of voice memos, shared openly for those that want to hear them.`,
    siteUrl: `https://memofrom.me`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `post-images`,
        path: `${__dirname}/src/images/post-images`,
      },
    },
    {
      resolve: 'gatsby-plugin-simple-analytics',
      options: {
        trackPageViews: true,
        events: true,
        eventsGlobal: 'sa_event',
        ignorePages: ['pathname'],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        setup: options => ({
          ...options,
          feed_url: 'https://memofrom.me/podcast.xml',
          site_url: 'https://memofrom.me/',
          description:
            'A podcast of voice memos, shared openly for those that want to hear them.',
          generator: 'Memo from me',
          copyright: 'Copyright Stuart Mackenzie',
          language: 'en',
          custom_namespaces: {
            itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
          },
          custom_elements: [
            { 'itunes:author': 'Memo from me' },
            { 'itunes:explicit': 'false' },
            {
              'itunes:summary':
                'A podcast of voice memos, shared openly for those that want to hear them.',
            },
            {
              'itunes:owner': [
                { 'itunes:name': 'Stuart Mackenzie' },
                { 'itunes:email': 'mail@memofrom.me' },
              ],
            },
            {
              'itunes:image': {
                _attr: {
                  href: 'https://memofrom.me/mfm_cover.jpg',
                },
              },
            },
            {
              'itunes:category': [
                {
                  _attr: {
                    text: 'Society & Culture',
                  },
                },
              ],
            },
            {
              'itunes:category': [
                {
                  _attr: {
                    text: 'Arts',
                  },
                },
              ],
            },
            {
              'itunes:category': [
                {
                  _attr: {
                    text: 'News & Politics',
                  },
                },
              ],
            },
          ],
        }),
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                const episodeUrl = `${site.siteMetadata.siteUrl}/memos${node.fields.slug}`
                const episodeGuid = `MFM${node.fields.slug}`
                return Object.assign({}, node.frontmatter, {
                  title: node.frontmatter.title,
                  description: node.frontmatter.description,
                  date: node.frontmatter.date,
                  enclosure: {
                    url: node.frontmatter.episodeMp3,
                    size: node.frontmatter.episodeBytes,
                    type: 'audio/mpeg',
                  },
                  url: episodeUrl,
                  guid: episodeGuid,
                  custom_elements: [
                    { 'itunes:title': node.frontmatter.title },
                    { 'itunes:summary': node.frontmatter.description },
                    { 'itunes:episode': node.frontmatter.episodeNumber },
                    { 'itunes:duration': node.frontmatter.episodeSeconds },
                    { 'itunes:author': 'Memo from me' },
                  ],
                })
              })
            },
            query: `{
  allMdx(sort: {frontmatter: {date: DESC}}) {
    nodes {
      id
      fields {
        slug
      }
      frontmatter {
        date(formatString: "DD MMM YYYY")
        title
        description
        episodeMp3
        episodeBytes
        episodeSeconds
        episodeNumber
      }
    }
  }
}`,
            output: '/podcast.xml',
            title: 'Memo from me',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Memo from me`,
        short_name: `Memo from me`,
        start_url: `/`,
        background_color: `#ffffff`,
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/mfm-round.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
