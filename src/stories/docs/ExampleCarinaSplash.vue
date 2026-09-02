<template>
  <div>
    <p>In the previous page on this guide, we helped you get set up with a working data story using the CosmicDS Vue template. However, the "story" that we've set up isn't really a story yet - for that, we need to add some components and data so that there's actually a story to tell. While this guide obviously can't help tell your story, what we'll do here is give a step-by-step example of how we created our <a href="https://projects.cosmicds.cfa.harvard.edu/carina">Carina</a> story. Hopefully this will give you the pieces you need to tell the stories that you think will inspire your audience!</p>

    <p>What we build here won't be a carbon-copy of the Carina story, but it will provide all of the essential functionality that the Carina story offers. The goal is to give an example of how you can compose toolkit components together to create an engaging, interactive user experience.</p>

    <h2>Setup</h2>

    <p>If you want to follow along with this guide, follow the steps in the previous page to set up a story with the template. For this guide, we'll assume that the setup script was run with "carina" as the story name.</p>

    <h2>Splash screen</h2>

    <p>The CosmicDS template provides built-in scaffolding for a <a href="https://en.wikipedia.org/wiki/Splash_screen">splash screen</a> that appears when users first access your story. So let's start off by editing the splash screen to be relevant to our story.</p>
    <p>To find the splash screen content, navigate to the main component file, which should be located at src/Carina.vue inside your project folder. Inside that file, look inside the template for a div element with an ID of splash-screen. The relevant piece of code looks like this:</p>

    <VCodeBlock
      highlightjs
      lang="html"
      theme="atom-one-dark"
      :code="`
        <v-overlay
          :model-value='showSplashScreen'
          absolute
          opacity='0.6'
          :style='cssVars'
          id='splash-overlay'
        >
          <div
            id='splash-screen'
            v-click-outside='closeSplashScreen'
            :style='cssVars'
          >
            <font-awesome-icon
              id='close-splash-button'
              @click='closeSplashScreen'
              @keyup.enter='closeSplashScreen'
              icon='xmark'
              tabindex='0'
            />
            <div id='splash-screen-text'>
              <p>Splash Screen Content</p>
            </div>
            <div id='splash-screen-acknowledgements' class='small'>
              This Data Story is brought to you by <a href='https://www.cosmicds.cfa.harvard.edu/' target='_blank' rel='noopener noreferrer'>Cosmic Data Stories</a> and <a href='https://www.worldwidetelescope.org/home/' target='_blank' rel='noopener noreferrer'>WorldWide Telescope</a>.
              
              <div id='splash-screen-logos'>
                <credit-logos logo-size='5vmin'/>
              </div>
            </div>
          </div>
      </v-overlay>
      `"
    >
    </VCodeBlock>
  </div>
</template>

<script setup lang="ts">
import { VCodeBlock } from "@wdns/vue-code-block";
</script>


