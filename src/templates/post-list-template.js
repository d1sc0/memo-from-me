import React from 'react'
import { graphql, Link } from 'gatsby'
import Seo from '../components/seo'
import Layout from '../components/layout'
//import MetaShare from '../components/metashare'
import '../styles.scss'

const PostList = ({ data, pageContext }) => {
  const posts = data.allMdx.nodes
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '' : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()
  let pageTitle = 'Memos'
  if (isFirst) {
    pageTitle = 'Latest Memos'
  }
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
        <nav
          className="pagination py-4 is-pulled-left"
          role="navigation"
          aria-label="pagination"
        >
          <Link
            to={`/memos/${prevPage}`}
            className="pagination-previous"
            rel="prev"
          >
            Previous Page
          </Link>
        </nav>
      )}
      {!isLast && (
        <nav
          className="pagination py-4 is-pulled-right"
          role="navigation"
          aria-label="pagination"
        >
          <Link
            to={`/memos/${nextPage}`}
            className="pagination-next"
            rel="next"
          >
            Next Page
          </Link>
        </nav>
      )}
    </Layout>
  )
}

export default PostList

export const postListQuery = graphql`
  query postListQuery($skip: Int!, $limit: Int!) {
    allMdx(sort: { frontmatter: { date: DESC } }, limit: $limit, skip: $skip) {
      nodes {
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
        fields {
          slug
        }
      }
    }
  }
`
