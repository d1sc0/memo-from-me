import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { EpisodeSizer, EpisodeDuration } from '../helpers/helper.js'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { getSrc } from 'gatsby-plugin-image'
import { Embed } from 'hyvor-talk-react'
import '../styles.scss'

const PostTemplate = ({ data, children }) => {
  const post = data.mdx
  const socialImg = getSrc(post.frontmatter.socialImage)
  const episodeTitle = `${post.frontmatter.episodeNumber}: ${post.frontmatter.title}`
  const episodeSize = EpisodeSizer(post.frontmatter.episodeBytes, 2)
  const episodeLength = EpisodeDuration(post.frontmatter.episodeSeconds)

  const { previous, next } = data
  return (
    <Layout>
      <Seo
        title={episodeTitle}
        description={post.frontmatter.description || post.excerpt}
        imageUrl={socialImg}
      />
      <h1 className="title memo-title is-size-2 mb-2">{episodeTitle}</h1>
      <div className="postheader">
        <p className="is-uppercase is-size-7 mb-4">
          {post.frontmatter.tags.map(tag => {
            return (
              <span key={tag} className="tag is-light mr-2">
                <Link to={`/tags/${tag}`} className="is-uppercase">
                  {tag}
                </Link>
              </span>
            )
          })}
        </p>
        <p className="is-uppercase is-size-7 mb-2">
          Posted: {post.frontmatter.episodeDate} &#x2f;&#x2f; Duration:{' '}
          {episodeLength} &#x2f;&#x2f; Size: {episodeSize}
        </p>
      </div>
      <audio className="audioplayer" src={post.frontmatter.episodeMp3} controls>
        Your browser does not support the audio player!{' '}
        <a href={post.frontmatter.episodeMp3}>You can download here instead</a>
        <track kind="captions" label={episodeTitle} />
      </audio>

      <div className="content mt-4">{children}</div>

      <Embed websiteId="8919" id={post.fields.slug} />
      <nav
        className="pagination py-4"
        role="navigation"
        aria-label="pagination"
      >
        <div className="container">
          <h4 className="is-size-6 has-text-weight-bold py-3">
            Explore more memos...
          </h4>
          {previous && (
            <Link
              to={`/memos${previous.fields.slug}`}
              className="pagination-previous"
              rel="prev"
            >
              ← {previous.frontmatter.episodeNumber}:{' '}
              {previous.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link
              to={`/memos${next.fields.slug}`}
              className="pagination-next"
              rel="next"
            >
              {next.frontmatter.episodeNumber}: {next.frontmatter.title} →
            </Link>
          )}
        </div>
      </nav>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query postByID($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        siteTitle
        siteUrl
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt
      body
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        description
        tags
        episodeMp3
        episodeBytes
        episodeSeconds
        episodeNumber
        socialImage {
          childImageSharp {
            gatsbyImageData
          }
        }
        postImages {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        episodeNumber
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        episodeNumber
      }
    }
  }
`
