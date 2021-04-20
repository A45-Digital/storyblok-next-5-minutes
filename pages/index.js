import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Storyblok from "../lib/storyblok"
import useStoryblok from "../lib/storyblok-hook"
import DynamicComponent from '../components/DynamicComponent'


export default function Page({ story : originalStory, preview }) {
  console.log('DEBUG: originalStory: ', originalStory)
  const story = useStoryblok(originalStory, preview)

  console.log('DEBUG: story:', story)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
 
      <header>
        <h1>
          { story ? story.name : 'My Site' }
        </h1>
      </header>
 
      <main>
        { story ? story.content.body.map((blok) => (
          <DynamicComponent blok={blok} key={blok._uid}/>
        )) : null }
      </main>
    </div>
  )
}

export async function getStaticProps(context) {
  console.log('DEBUG: getStaticProps(): context:', context)

  let slug = 'home'
  let params = {
    version: "published", // or 'published'
  }
 
  if (context.preview) {
    params.version = "draft"
    params.cv = Date.now()
  }
  
  let { data } = await Storyblok.get(`cdn/stories/${slug}`, params)
 
  return {
    props: {
      story: data ? data.story : false,
      preview: context.preview || false
    }
  }
}