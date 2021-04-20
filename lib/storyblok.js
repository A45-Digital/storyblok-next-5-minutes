import StoryblokClient from 'storyblok-js-client'
 
const Storyblok = new StoryblokClient({
    accessToken: 'D7w5wWBrTLfvMqXaIUTcIgtt',
    cache: {
      clear: 'auto',
      type: 'memory'
    }
})
 
export default Storyblok