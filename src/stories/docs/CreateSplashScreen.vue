<template>
  <div>
    <h1>Splash Screen setup</h1>

    <p>
      Now that we've set up our project, it's time to create the first piece of content that users will see - the splash screen.
      Even if you're not familiar with the term, you've very likely seen one before. A splash screen is the initial screen that shows
      <a href="https://en.wikipedia.org/wiki/Splash_screen" target="_blank" rel="noopener noreferrer">when a program is starting up</a>.
      We want to make a splash screen that gives the user a sense of what to expect in the story, and to build some interest in the content.
    </p>

    <p>
      To get started building the splash screen, open up the main component file, which should be located at <code>src/Carina.vue</code>.
      The main component has a splash screen built in that can be customized. To find the splash screen, look for the first <code>v-overlay</code> opening tag, and the opening <code>div</code> tag inside it. It should look something like this:
    </p>
    <CodeBlock :code="splashScreenStart" lang="html" />
    <p>
      If you're not too familiar with Vue, this might seem like a lot. Basically, this is using Vuetify's
      <a href="https://vuetifyjs.com/en/components/overlays/" target="_blank" rel="noopener noreferrer">overlay</a>
      component to create an overlay to cover the screen, with the <code>div</code> inside containing the content of the splash screen
      that displays over it. The template has already set up the code that controls the splash screen opening and closing, so for this
      example we only need to fill in the content.
    </p>
    <v-alert type="info" variant="tonal">
      <template #text>
        By default, the splash screen will close if a user clicks outside of it. While this is the default behavior that we recommend,
        if you don't want this, you can remove the <code>v-click-outside="closeSplashScreen"</code> line in the splash content div.
        Just make sure that you leave another way for the user to close the screen!
      </template>
    </v-alert>
    <p>Initially, the splash screen looks like this:</p>
    <v-img :src="initialSplashScreenURL"/>
    <p>
      Let's start with the obviously placeholder "Splash Screen Content". Additionally, note that the "X" button is already set up to close the splash screen. 
      Since we're recreating the Carina data story in this example, let's update that text to be something relevant to that story. In our case, we started with
    </p>
    <CodeBlock :code="splashScreenTitleV1" lang="html"/>

    <p>
      to emphasize that JWST can see in the infrared, outside the range of human vision. This isn't bad, but we wanted the text, and in
      particular the bit about infrared, to pop a bit more. To do this, head down to the <code>&lt;style&gt;</code> section of the code
      and add the following bit of code <em>inside</em> of the <code>#splash-screen</code> block:
    </p>
    <CodeBlock :code="splashScreenTitleStyling" lang="css"/>
    <v-alert type="info" variant="tonal">
      <template #text>
        While simple CSS like this is often quite readable, if you're unfamiliar with the basics of how CSS works, we recommend the
        <a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics" target="_blank" rel="noopener noreferrer">MDN guides</a>
        on the basic aspects of CSS styling.
      </template>
    </v-alert>
    <p>
      We've set up the template to incorporate <a href="https://lesscss.org/" target="_blank" rel="noopener noreferrer">Less</a>, which uses a
      preprocessor step to compile into regular CSS. Less has a lot of cool features, but the one that we'll be taking most advantage of
      here is nesting. Simply put, this means that inner block selectors are related to the containing selectors. So writing
    </p>
    <CodeBlock :code="nestingExample" lang="css"/>
    <p>using Less has the same effect as writing</p>
    <CodeBlock :code="unnestedExample" lang="css"/>
    <p>This is a really useful feature to help keep your CSS organized if there's an outer selector that you're using a lot. We recommend it!</p>
    <p>Additionally, in order to use our newly-added <code>highlight</code> class, change the splash screen title content to be</p>
    <CodeBlock :code="splashScreenTitleV2" lang="html"/>
    <v-alert type="info" variant="tonal">
      <template #text>
        <p>The font that we've set the splash screen to use by default is called <a href="https://en.wikipedia.org/wiki/Highway_Gothic" target="_blank" rel="noopener noreferrer">Highway Gothic</a> - in
        particular, we're using the Narrow variant (which, as the name suggests, you might recognize this as the font that's used on highway signs). Since this probably isn't a font that most users will
        have by default, we import it ourselves at the beginning of our style section:</p>
        <CodeBlock :code="highwayGothicImport" lang="css"/>
        <p>We include this font in the template assets by default, but you can also load a font from a remote URL. You can use this same pattern to load in any custom font that you want!</p>
      </template>
    </v-alert>
    <p>
      Finally, for the Carina story we decided to add a button to allow the user to advance past the splash screen and get started with the story. We created
      our button using <a href="https://vuetifyjs.com/en/components/buttons/" target="_blank" rel="noopener noreferrer">Vuetify's button component</a>. Insert the following underneath the <code>splash-screen-text</code> div:
    </p>
    <CodeBlock :code="getStartedButton" lang="html"/>
    <p>Once again, let's break this down:</p>
    <ul>
      <li><code>@click="closeSplashScreen"</code> means that clicking this button will close the splash screen</li>
      <li><code>:color="accentColor"</code> sets the color of the button. We'll set the <code>accentColor</code> for the button in a later step</li>
      <li><code>:density="smallSize ? 'compact' : 'default'</code> controls the density, which is a property of the Vuetify button.
        The condition here means that we'll use the "compact" density on a small screen, and the "default" density otherwise. The <code>smallSize</code> variable keeps track of whether the user is on a "small" and is built in to the template (and will update as necessary if the user resizes their browser window).</li>
      <li><code>size="x-large"</code> sets the button size to be extra large</li>
      <li><code>variant="elevated"</code> tells Vuetify to give the button some <a href="https://m2.material.io/design/environment/elevation.html" target="_blank" rel="noopener noreferrer">elevation</a></li>
      <li><code>rounded="lg"</code> tells Vuetify how much to round the button. If you're familiar with CSS, this is like setting a <code>border-radius</code></li>
    </ul>
    <p>You should now have a splash screen that looks like the image below</p>
    <img :src="splashScreenTextURL" height="400" width="400"/>
    <p>
      As a final tweak, let's add a bit of color. The template has a built-in <code>accentColor</code> variable that gets used in a few places to set the color of various elements. Let's set it to one of the 
      accent colors that we used for Carina. Find that variable and change its definition to the following:
    </p>
    <CodeBlock :code="accentColor" lang="javascript"/>
    <p>The splash screen should now look like this:</p>
    <v-img :src="finalSplashScreenURL" height="400" width="400"/>
    <p>
      This is looking pretty close to the original Carina splash screen! It's not quite a perfect match, but for our purposes this is close enough. 
      Now, let's move on to creating the content of our data story!
    </p>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-var-requires */
import CodeBlock from "./CodeBlock.vue";

const splashScreenStart = 
`<v-overlay
  :model-value="showSplashScreen"
  absolute
  opacity="0.6"
  :style="cssVars"
  id="splash-overlay"
>
  <div
    id="splash-screen"
    v-click-outside="closeSplashScreen"
    :style="cssVars"
  >
`
;

const initialSplashScreenURL = require("../assets/initial-splash-screen.png");
const splashScreenTextURL = require("../assets/splash-screen-text.png");
const finalSplashScreenURL = require("../assets/final-splash-screen.png");

const splashScreenTitleV1 = 
`<p>Want to see in the</p>
<p>INFRARED</p>
<p>like JWST can?</p>
`
;

const splashScreenTitleV2 = 
`<p>Want to see in the</p>
<p class="highlight">INFRARED</p>
<p>like JWST can?</p>
`
;

const splashScreenTitleStyling = 
`p {
  font-family: 'Highway Gothic Narrow', 'Roboto', sans-serif;
  font-weight: bold;
  vertical-align: middle;
}
  
p.highlight {
  color: red;
  text-transform: uppercase;
  font-weight: bolder;
}
`
;

const nestingExample = 
`#splash-screen {
  p {
    // Styling here
  }
}
`
;

const unnestedExample = 
`#splash-screen p {
  // Styling here
}
`
;

const highwayGothicImport = 
`@font-face {
  font-family: "Highway Gothic Narrow";
  src: url("./assets/HighwayGothicNarrow.ttf");
}
`
;

const getStartedButton = 
`<div>
  <v-btn
    class="splash-get-started"
    @click="closeSplashScreen"
    :color="accentColor"
    :density="smallSize ? 'compact' : 'default'"
    size="x-large"
    variant="elevated"
    rounded="lg"
  >
    Get Started
  </v-btn>
</div>
`
;

const accentColor = `ref("#F0AB52");`;
</script>
