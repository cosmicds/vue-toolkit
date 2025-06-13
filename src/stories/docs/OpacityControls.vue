<template>
  <div>
    <h1>Image Opacity Controls</h1>
    <p>
      In the previous section of our guide, we set up our Hubble and JWST images in WorldWide Telescope, and set both of them to 50% opacity.
      This is a good starting point for our interactive, but what we really want is for users to be able to crossfade from one image to the other
      and see how things change. So in this section of the guide, we'll set up the controls that allow a user to do just that.
    </p>
    <p>
      While we could place these controls anywhere, we find that a convenient place for these sorts of controls is near the bottom of the view, so that 
      they only minimally block the WWT view. In fact, our template has a container already placed along the bottom for doing exactly this. Look for the
      following in the HTML template for the main component:
    </p>
    <CodeBlock :code="bottomContentEmpty" lang="html" />
    <p>
      To start with, the only thing along the bottom is our credit logos component. You can customize the logos that appear here (see the documentation for 
      this component), but for this story we'll use the default logos. As far as image controls go, for our Carina story we want to have three opacity control 
      elements:
      <ul>
        <li>A button for setting the JWST image to 100% opacity and the Hubble image to 0% opacity</li>
        <li>A button to do the reverse - set the Hubble image to 100% opacity and the JWST image to 0%</li>
        <li>A slider to slide between the two, with the two opacities complementary - i.e. if JWST is at X%, Hubble is at (100 - X)%</li>
      </ul>
    </p>
    <p>
      Let's implement these in order, so we'll start with the button to show the JWST image only. First, let's add a container for our control widgets, above the credit logos:
    </p>
    <CodeBlock :code="controlsContainer" lang="html" />
    <p>The bottom content container is already set up as a flex container with <code>flex-direction: column</code>, so the controls will automatically show up above the logos 
    (if this doesn't mean anything to you, it's just a fancy way of saying the that bottom content container will vertically stack its top-level items
    </p>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable indent */

import { ref } from "vue";
import CodeBlock from "./CodeBlock.vue";

const bottomContentEmpty = ref(
`<div id="bottom-content">
  <div id="body-logos" v-if= "!smallSize">
    <credit-logos/>
  </div>
</div>
`
);

const controlsContainer = ref(
`<div id="bottom-content">
  <div id="controls-container">
  </div>
  <div id="body-logos" v-if= "!smallSize">
    <credit-logos/>
  </div>
</div>
`);
</script>
