import React from 'react'
import { graphql, Link } from 'gatsby'
import Seo from '../components/seo'
import Layout from '../components/layout'
import '../styles.scss'

const PostsByTagList = ({ data, pageContext }) => {
  const posts = data.allMdx.nodes
  const { tagName, currentPage, numTagPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numTagPages
  const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  const tagUpper = tagName.toUpperCase()
  const pageTitle = `Tagged: ${tagUpper}`
  return (
    <Layout>
      <Seo title={pageTitle} />
      <h1 className="title is-size-2">{pageTitle}</h1>
      {posts.map(post => {
        const episodeTitle = `${post.frontmatter.episodeNumber}: ${post.frontmatter.title}`

        return (
          <>
            <div className="article px-3 py-5">
              <div className="columns rounded-corners episode-card">
                <div className="column is-three-fifths">
                  <div className="px-3">
                    <h2 className="is-size-3 is-size-4-touch has-text-weight-semibold">
                      <Link
                        to={`/memos${post.fields.slug}`}
                        className="memo-title-compact episode-link"
                      >
                        {episodeTitle}
                      </Link>
                    </h2>
                    <p className="is-uppercase is-size-7 mb-4">
                      Posted: {post.frontmatter.date} &#x2f;&#x2f; Filed under:{' '}
                      {post.frontmatter.tags.map(tag => {
                        return (
                          <span key={tag} className="tag mr-2">
                            <Link to={`/tags/${tag}`} className="is-uppercase">
                              {tag}
                            </Link>
                          </span>
                        )
                      })}
                    </p>
                  </div>
                </div>
                <div className="column is-vcentered">
                  <div className="px-3">
                    <audio
                      className="audioplayer has-text-warning-light"
                      src={post.frontmatter.episodeMp3}
                      controls
                    >
                      Your browser does not support the audio player!{' '}
                      <a href={post.frontmatter.episodeMp3}>
                        You can download here instead
                      </a>
                      <track kind="captions" label={episodeTitle} />
                    </audio>
                    <p className="is-size-7 py-2 has-text-right">
                      <span className="is-uppercase has-text-weight-medium tag">
                        <Link to={`/memos${post.fields.slug}`}>
                          Accompanying Notes...
                        </Link>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      })}

      {!isFirst && (
        <Link
          to={`/tags/${tagName}/${prevPage}`}
          className="pagination-previous is-pulled-left"
          rel="prev"
        >
          Previous Page
        </Link>
      )}
      {!isLast && (
        <Link
          to={`/tags/${tagName}/${nextPage}`}
          className="pagination-next is-pulled-right"
          rel="next"
        >
          Next Page
        </Link>
      )}
    </Layout>
  )
}

export default PostsByTagList

export const PostsByTagListQuery = graphql`
  query PostsByTagListQuery($tagName: String, $skip: Int!, $limit: Int!) {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tagName] } } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        fields {
          slug
        }
        id
        excerpt(pruneLength: 480)
        frontmatter {
          date(formatString: "DD MMM YYYY")
          title
          tags
          description
          episodeMp3
          episodeBytes
          episodeSeconds
          episodeNumber
        }
      }
    }
  }
`
