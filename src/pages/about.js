import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import '../styles.scss'

const AboutPage = () => {
  return (
    <Layout>
      <Seo
        description="The background, context and purpose of Memo from me podcast!"
        title="About the show"
      />
      <h1 className="title is-size-2">About the show</h1>
      <div className="content">
        <StaticImage
          alt="Stuart Mackenzie - host, producer, researcher, marketing manager and web developer"
          src="../images/page-images/podcast-image.jpg"
          className="imageRight smaller"
        />
        <p>
          <strong className="highlight">
            A podcast of voice memos shared openly for those that want or need
            to hear them.
          </strong>
        </p>
        <p>
          The basic idea of the show is to record and openly share voice memos
          as a means to explore the following…
        </p>
        <p>
          1. When humans record their voices for an audience to consume{' '}
          <a href="https://www.collinsdictionary.com/dictionary/english/asynchronous">
            asynchronously
          </a>{' '}
          (answering machines, voice notes) and without conscious
          preparation(scripts, guides, prompts) that the results can often be
          interesting, humorous, odd, rambling and informative to an extent
          beyond the original intention.{' '}
        </p>
        <p>
          2. A recording of information or opinion for future use, openly
          shared, could benefit a wider group of people than those intended as
          the original audience.
        </p>
        <p>
          You can hear me ramble on about the premise and inspiration for the
          show in my first memo called{' '}
          <Link to="/memos/1-start-explaining/">'Start explaining'</Link>.
        </p>
        <h3>Ways you can get involved</h3>
        <p>
          <strong className="highlight">
            1. Listen, Subscribe, Share, Comment
          </strong>{' '}
          - Knowing people are listening to the show and getting something out
          of this little experiment will help motivate me to put more time and
          energy into it.
        </p>
        <p>
          <strong className="highlight">2. Record a memo!</strong>- I’d love
          this show to be a collaborative effort and include a range of voices
          and perspectives. If you have something to share, but don’t want to
          set up your own podcast, please{' '}
          <Link to="/contact">get in touch</Link>, and we’ll see if we can make
          that happen.
        </p>
        <h3>More about the creator</h3>
        <p>
          Hey, I’m Stuart. To pay my bills, I work as a consultant helping to
          improve our Public Services. I’m also known for being a father,
          husband, occasional runner, photography nerd, parkrun fanboy, geek and
          exotic disco dancer!
        </p>
        <p>
          You can find more about me on my{' '}
          <a href="https://hellostu.xyz/about">personal site and blog.</a>
        </p>
        <p>
          I’m the creator, producer, marketing manager and web developer for
          Memo from me. I’ve got a tiny amount of podcasting experience from
          many years back when some friends and I recorded a show about digital
          photography. That said, I’m definitely not a master of any of the
          roles listed above. I’m making this up as I go! Let me know if you
          spot any mistakes and I'll do my best to rectify.
        </p>
      </div>
    </Layout>
  )
}

export default AboutPage
