<template>
  <div>
    <h1>Show/Hide Images and Reset View</h1>
    <p>
      Now that we've got the crossfading functionality set up, we want to add a couple more convenience buttons for our users. In particular, 
      we have two in the Carina story: a button that will turn both images on/off, and a button that will reset the WWT camera back to the starting 
      view. It turns out that the camera-reset button will be simpler, so let's start with that.
    </p>
    <p>
      Similar to with the controls, we'll place these buttons in a pre-existing template container - in this case we'll use the <code>top-content</code> container, which by default in the template looks like:
    </p>
    <CodeBlock :code="topContentDefault" lang="html" />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable indent */

import { ref } from "vue";
import CodeBlock from "./CodeBlock.vue";

const topContentDefault = ref(
`<div id="top-content">
  <div id="left-buttons">
    <icon-button
      v-model="showTextSheet"
      fa-icon="book-open"
      :color="buttonColor"
      :tooltip-text="showTextSheet ? 'Hide Info' : 'Learn More'"
      tooltip-location="start"
    >
    </icon-button>
    <icon-button
      v-model="showVideoSheet"
      fa-icon="video"
      :color="buttonColor"
      tooltip-text="Watch video"
      tooltip-location="start"
    >
    </icon-button>
  </div>
  <div id="center-buttons">
  </div>
  <div id="right-buttons">
  </div>
</div>
`
);
</script>
