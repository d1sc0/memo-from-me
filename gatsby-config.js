module.exports = {
  siteMetadata: {
    siteTitle: `Memo from me`,
    description: `Memo from me is a podcast of recorded voice memos on a variety of subjects.`,
    siteUrl: `https://memofromme.com`,
    social: {
      twitter: `_ordinaryhost`,
    },
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
      resolve: `gatsby-plugin-panelbear`,
      options: {
        siteID: 'CpkZWeIf3ez',
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
          feed_url: 'https://memofromme.com/podcast.xml',
          site_url: 'https://memofromme.com/',
          description:
            'Memo From Me is a podcast of recorded voice memos on a variety of subjects.',
          generator: 'Memo from me',
          copyright: 'Copyright Stuart Mackenzie',
          language: 'en',
          custom_namespaces: {
            itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
          },
          custom_elements: [
            { 'itunes:author': 'Another Talk Show' },
            { 'itunes:explicit': 'false' },
            {
              'itunes:summary':
                'Memo From Me is a podcast of recorded voice memos on a variety of subjects.',
            },
            {
              'itunes:owner': [
                { 'itunes:name': 'Stuart Mackenzie' },
                { 'itunes:email': 'mail@hellostu.xyz' },
              ],
            },
            {
              'itunes:image': {
                _attr: {
                  href: 'https://memofromme.com/mfm_cover_art.png',
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
                const episodeUrl = `${site.siteMetadata.siteUrl}/episodes${node.fields.slug}`
                const episodeGuid = `ATS-${node.fields.slug}`
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
                    { 'itunes:author': 'Another Talk Show' },
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
        icon: `src/images/ats-logo.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
