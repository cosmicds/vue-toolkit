<template>
  <div>
    <h1>Informational Content</h1>
    <p>
      In addition to the interactive pieces of a data story, it's often also useful to have some purely instructional or educational content to help the user have a better experience with the story. 
      Our template offers built-in mechanisms for supporting two distinct types of informational content - video and text. In this section, we'll show how to use these to help flesh out an interactive.
    </p>
    <p>
      Let's start with the video. For the purposes of our Carina example, we'll be using a video that shows the user the basics of how to use the interactive. However, in your stories, the videos can 
      be whatever you want - for example, they could focus more on explaining relevant scientific concepts. To insert your video into the story, look for the <code>video</code> element in the template. 
      It should look something like this:
    </p>
    <CodeBlock :code="emptyVideo" lang="html" />
    <p>
      As you can see, the <code>src</code> attribute of the video source is empty. All we need to do is fill it in! For our example, we'll use the video that we made to explain the Carina story:
    </p>
    <CodeBlock :code="filledSource" lang="html" />
    <p>
      In this case, we're using an absolute URL to specify the video location. But you can also use a local one. For example, if you had a video file located at <code>src/assets/MyVideo.mp4</code>, 
      all you need to do is to specify the URL relative to the main component file. That is, you can do:
    </p>
    <CodeBlock :code="localSource" lang="html" />
    <p>
      Now, if you press the video icon button, our video will open in fullscreen with standard playback controls. There's also a button in the top-right of the screen to close the video.
    </p>
    <p>
      Next up, let's look at adding some informational text. The template has a built-in place for adding informational text, which can be opened by pressing the book icon button. 
      Start by finding the info sheet dialog, whose opening tag looks like this:
    </p>
    <CodeBlock :code="infoSheetOpeningTag" lang="html" />
    <p>
      You don't really need to worry about the various settings in the dialog - they're largely there just to facilitate its setup and ensure that it opens/displays correctly. (Though if you do 
      want to change things up, feel free to look at the <a href="https://vuetifyjs.com/en/components/dialogs/" target="_blank" rel="noopener noreferrer">documentation</a> for Vuetify's dialog 
      component). But this is where we'll put our informational content. By default the information window is set up to have two tabs - one for story-specific content, and another that's pre-populated 
      with information about how to control the WWT display. The WWT control descriptions are context-aware and will update based on whether the current device has a touchscreen or not. The tabs and the 
      window that displays the content are connected via their <code>v-model</code>, which is the <code>tab</code> variable - again, put simply, we've already hooked up the connections so that selecting 
      a tab updates which window is visible.
    </p>
    <p>
      The window that's intended for story-specific information looks like this:
    </p>
    <CodeBlock :code="emptyInfoWindow" lang="html" />
    <p>
      There are some classes here to set up styling, as well as an ending spacer to give a bit of padding to the bottom of the content automatically. The <code>Information goes here</code> is, of course, 
      where we want to put our info. Since we're writing directly into the template, we can put whatever we want here - HTML, other Vue components, etc.
    </p>
    <p>
      Obviously, you'll need to write the informational content for your stories. But, to finish out our Carina example, here's what we have inside of the <code>v-card-text</code> tag inside of the Carina story:
    </p>
    <CodeBlock :code="infoContent" lang="html" />
    <p>
      By default, this dialog will open from the right on desktop-sized screens, and from the bottom when the form factor is more akin to a phone, which we find provides a good experience as the dialog is opened 
      along the longer dimension of the screen. However, if you'd like the dialog to open from the bottom on a desktop screen as well, you can find the (already-defined) <code>widescreenInfoLocation</code> variable 
      and change its value from <code>"right"</code> to <code>"bottom</code>:
    </p>
    <CodeBlock :code="widescreenBottom" lang="javascript" />
    <p>
      At this point, we're just about done! We have a working interactive with all of the UI elements and functionality that we want. In the next section we'll do some final bits of styling to finish things off.
    </p>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable indent */
import CodeBlock from "./CodeBlock.vue";

const emptyVideo = 
`<video
  controls
  id="info-video"
>
  <source src="" type="video/mp4">
</video>
`
;

const filledSource = 
`<source
  src="https://projects.cosmicds.cfa.harvard.edu/carina/media/CarinaFinal.fdf47ce7.mp4"
  type="video/mp4"
>
`
;

const localSource = `<source src="./assets/MyVideo.mp4" type="video/mp4">`;

const infoSheetOpeningTag = 
`<v-dialog
  :style="cssVars"
  :class="['info-sheet', \`info-sheet-\${infoSheetLocation}\`]"
  id="text-info-sheet"
  hide-overlay
  persistent
  no-click-animation
  absolute
  :scrim="false"
  location="bottom"
  v-model="showTextSheet"
  :transition="infoSheetTransition"
>
`
;

const emptyInfoWindow = 
`<v-window-item>
  <v-card class="no-bottom-border-radius scrollable">
    <v-card-text class="info-text no-bottom-border-radius">
      Information goes here
      <v-spacer class="end-spacer"></v-spacer>
    </v-card-text>
  </v-card>
</v-window-item>
`
;

const infoContent = 
`<h4>Explore!</h4>
As scientists, we learn by observing and noticing. Explore these images of the <a href="https://webbtelescope.org/contents/media/images/2022/031/01G77PKB8NKR7S8Z6HBXMYATGJ" target="_blank" rel="noopener noreferrer">Carina Nebula</a> and see what you can find.<br>
• Look for stars that are “invisible” to our eyes because they are blocked by dust but shine in JWST’s infrared image.<br>
• Look near the edge of the dusty, dense clouds in the JWST image. See if you can find bright yellow arcs that indicate gas and dust being blown away by young forming stars.<br>
• Scan the dark blue region of the JWST image and see if you can find reddish smudgy objects that might be galaxies. Switch over to the Hubble image. Do you see those galaxies in the Hubble image?<br>
<br>
<h4>Images as “data”</h4>
When you think about scientific data, pictures might not immediately spring to mind, but in astronomy, images are some of the most important pieces of data available.
<br><br>
Images show us the structure of objects in space, which here provides clues on how stars form and evolve. In the Hubble and JWST images of the Carina Nebula, you can see regions of very high density dust and gas (the brown parts of the images) where new stars are being born. If you zoom out, you will see that the images are at the edge of what appears to be a larger bubble, which is the cavern of lower density gas carved out by winds from massive stars.
<br><br>
<h4>Visible vs Infrared Light</h4>
Our eyes can detect visible light, but visible light is only a small part of a broader <a href="https://hubblesite.org/contents/articles/the-electromagnetic-spectrum" target="_blank" rel="noopener noreferrer">spectrum</a> of light that has different energies, ranging from gamma rays and x-rays to infrared light and radio waves. Images from each part of the spectrum can tell a different part of the story about objects in space.
<br><br>
The Hubble Space Telescope takes pictures in visible light, like our eyes. The James Webb Space Telescope takes pictures in infrared light. Some “night vision” cameras image objects in the dark using infrared light. Animals and people “glow” in infrared in the dark because we usually have higher temperatures than our surroundings.
<br><br><br>
<h3>Credits:</h3>
<h4><a href="https://www.cosmicds.cfa.harvard.edu/" target="_blank" rel="noopener noreferrer">CosmicDS</a> Team:</h4>
Jon Carifio<br>
John Lewis<br>
Pat Udomprasert<br>
Alyssa Goodman<br>
Mary Dussault<br>
Evaluator: Sue Sunbury<br>
<br>
<h4>WorldWide Telescope Team:</h4>
Peter Williams<br>
A. David Weigel<br>
Jon Carifio<br>
<br>
<funding-acknowledgment/>
`
;

const widescreenBottom = `const widescreenInfoLocation = ref<"right" | "bottom">("bottom");`;

</script>
