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
      </ul>
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
</script>
