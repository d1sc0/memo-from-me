import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { Link, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import '../styles.scss'
import { FaPodcast, FaSpotify } from 'react-icons/fa'
import { SiGooglepodcasts } from 'react-icons/si'

const HomePage = ({ data }) => {
  const latestPost = data.allMdx.nodes[0]
  const episodeTitle = `${latestPost.frontmatter.title}`
  const episodeLink = `/memos${latestPost.fields.slug}`

  return (
    <Layout>
      <Seo title="Home" />
      <div className="section px-0 pt-0 pb-5">
        <div className="columns is-reversed-mobile">
          <div className="column is-two-fifths">
            <StaticImage
              alt="memos from me!"
              src="../images/haring-podcast.png"
              className="rounded-corners"
            />
          </div>
          <div className="column">
            <p className="is-size-2 is-size-3-touch has-text-weight-bold">
              A podcast of{' '}
              <Link to="/about">
                <span className="highlight">voice memos,</span>
              </Link>{' '}
              shared openly for those that want to{' '}
              <Link to="/about">
                <span className="highlight">hear them</span>
                ...
              </Link>
            </p>
            <p className="pt-4 is-uppercase has-text-weight-semibold is-size-7">
              Latest memo
            </p>
            <p className="memo-title-compact pt-0 mt-0">
              <Link to={episodeLink}>{episodeTitle}</Link>
            </p>
            <p className="is-uppercase is-size-7 py-2">
              Posted: {latestPost.frontmatter.date} &#x2f;&#x2f; Filed under:{' '}
              {latestPost.frontmatter.tags.map(tag => {
                return (
                  <span
                    key={tag}
                    className="tag has-text-weight-medium mr-2 is-uppercase"
                  >
                    <Link to={`/tags/${tag}`}>{tag}</Link>
                  </span>
                )
              })}
            </p>
            <audio
              className="audioplayer"
              src={latestPost.frontmatter.episodeMp3}
              controls
            >
              Your browser does not support the audio player!{' '}
              <a href={latestPost.frontmatter.episodeMp3}>
                You can download here instead
              </a>
              <track kind="captions" label={episodeTitle} />
            </audio>

            <p className="is-size-7 py-2 has-text-right">
              <span className="is-uppercase has-text-weight-medium tag">
                <Link to="/memos">Explore more memos</Link>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="section p-0 pb-3 has-text-centered">
        <p className="is-size-5 p-0">Subscribe with your favourite player</p>
      </div>
      <div className="columns mb-0">
        <div className="column">
          <a href="https://podcasts.apple.com/gb/podcast/another-talk-show/id1551385867">
            <button className="button is-black is-medium is-fullwidth has-text-weight-semibold">
              <span className="icon">
                <FaPodcast />
              </span>
              <span>Apple Podcasts</span>
            </button>
          </a>
        </div>
        <div className="column">
          <a href="https://podcasts.google.com/feed/aHR0cHM6Ly9hbm90aGVydGFsay5zaG93L3BvZGNhc3QueG1s">
            <button className="button is-black is-medium is-fullwidth has-text-weight-semibold">
              <span className="icon">
                <SiGooglepodcasts />
              </span>
              <span>Google Podcasts</span>
            </button>
          </a>
        </div>
        <div className="column">
          <a href="https://open.spotify.com/show/4KBoGQIiwmO4ZEE6rdNSGh">
            <button className="button is-black is-medium is-fullwidth has-text-weight-semibold">
              <span className="icon">
                <FaSpotify />
              </span>
              <span>Spotify Podcasts</span>
            </button>
          </a>
        </div>
      </div>
      <div className="section p-0 has-text-centered">
        <p className="is-size-5">
          <Link to="/podcast.xml" className="has-text-weight-semibold">
            RSS Feed
          </Link>
        </p>
      </div>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query latestPost {
    allMdx(sort: { frontmatter: { date: DESC } }, limit: 1) {
      nodes {
        id
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
        }
      }
    }
  }
`
