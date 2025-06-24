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
    </p>
    <ul>
      <li>A button for setting the JWST image to 100% opacity and the Hubble image to 0% opacity</li>
      <li>A button to do the reverse - set the Hubble image to 100% opacity and the JWST image to 0%</li>
      <li>A slider to slide between the two, with the two opacities complementary - i.e. if JWST is at X%, Hubble is at (100 - X)%</li>
    </ul>
    <p>
      Additionally, we'll want these UI elements to be in sync - for example, if a user presses the JWST button, the slider should move all the way to the JWST end 
      as well. To help facilitate that, let's create a reactive variable that will let Vue help us with that. There's no one right way to set this up, but for this 
      story, let's define a variable called <code>crossfade</code> that goes from 0 to 100, with 0 meaning that only the Hubble image is visible, and 100 meaning 
      that only the JWST image is visible. Add the following at the top level of the component:
    </p>
    <CodeBlock code="const crossfade = ref(50);" lang="javascript" />
    <p>
      And then let's have Vue hook this variable up to our imageset layer opacities. Also at the top level of the component, add:
    </p>
    <CodeBlock :code="crossfadeWatcher" lang="javascript" />
    <p>And update the first line of the script section of the template to be</p>
    <CodeBlock :code="importWithWatch" lang="javascript" />
    <p>
      This sets up a <a href="https://vuejs.org/guide/essentials/watchers.html" target="_blank" rel="noopener noreferrer">watcher</a>, which is a piece of code 
      that Vue will automatically run whenever the value of the specified reactive variable (here <code>crossfade</code>) is updated. What this really means is that now
      we can entirely control the opacities of our imagesets through <code>crossfade</code>, and they'll automatically have the complementary behavior that we want.
    </p>
    <p>
      Now that we have a reactive way to control our opacities, let's set up our control widgets. First, let's add a container for them, above the credit logos:
    </p>
    <CodeBlock :code="controlsContainer" lang="html" />
    <p>
      The bottom content container is already set up as a flex container with <code>flex-direction: column</code>, so the controls will automatically show up above the logos 
      (if this doesn't mean anything to you, it's just a fancy way of saying the that bottom content container will vertically stack its top-level items).
    </p>
    <p>
      Now that we've got a container, let's add our first button - a button to set the current view to show only the Hubble image. There are a look of ways that we could 
      create a button - the HTML button element, Vuetify's <code>v-btn</code> component, etc. To keep things simple, we'll do the most natural thing and create a 
      <code>button</code> element with a click listener. Inside the <code>controls-container</code>, add the following:
    </p>
    <CodeBlock :code="hubbleButton" lang="html" />
    <p>
      We also want to add some styling. Notice that we're applying these styles to the <code>ui-text</code> and <code>slider-label</code> classes that we assigned to the button. 
      The <code>slider-label</code> styling will just be for the two buttons we're going to add now, but we'll reuse the <code>ui-text</code> class a few times throughout the story:
    </p>
    <CodeBlock :code="styling" lang="css" />
    <p>To break down the Vue functionality a bit:</p>
    <ul>
      <li><code>@click="crossfade = 0"</code> tells Vue to set our <code>crossfade</code> value to zero when the button is clicked</li>
      <li><code>@keyup.enter="crossfade = 0"</code> does the same thing when the Enter button is pressed when the button is focused</li>
      <li><code>tabindex="0"</code> allows the button to be tab-focusable</li>
    </ul>
    <p>
      Together the last two lines help make the controls more accessible for users who are navigating via the keyboard.
    </p>
    <v-alert type="info" variant="tonal">
      <template #text>
        Note that when we update Vue refs in the JavaScript portion of the template, we need to update the underlying value by setting the <code>value</code> attribute 
        of the ref, but in the template this isn't necessary. Internally, Vue will automatically translate <code>crossfade = 0</code> in the template into 
        <code>crossfade.value = 0</code>.
      </template>
    </v-alert>
    <p>We can do almost the same thing for the JWST button:</p>
    <CodeBlock :code="jwstButton" lang="html" />
    <p>The functionality is the same here, except now we're setting <code>crossfade = 100</code>.</p>
    <p>
      Finally, let's add the slider to allow users to adjust the crossfade between the two images. For this, we'll use Vuetify's slider component. Add the following 
      to the template between the markup for the two buttons:
    </p>
    <CodeBlock :code="crossfadeSlider" lang="html" />
    <p>
      The markup for the slider is pretty straightforward. <code>min</code> and <code>max</code> are the min and max values of the slider, and <code>step</code> is the 
      gap between adjacent slider values. So our slider goes from 0 to 100, in increments of 1. The <code>v-model="crossfade"</code> line hooks up the value of the 
      slider to our crossfade value. This means that changing the value of the slider will adjust the value of <code>crossfade</code>, and changing the value of crossfade 
      somewhere else will cause the slider to update to match.
    </p>
    <p>
      Finally, let's set up the layout for the controls. To keep things simple, let's just have the controls container lay its items out in a single row. Add the following in 
      the style section of the template:
    </p>
    <CodeBlock :code="controlsContainerCSS" lang="css" />
    <p>The main highlights of this are:
    </p>
    <ul>
      <li>Setting <code>display: flex</code> and <code>flex-direction: row</code> will cause the container to lay its items out in a single row</li>
      <li>
        In order to not block the pointer from adjusting the WWT view, we have things in the interactive set to <code>pointer-events: none</code> by default. 
        So in order for these to be usable, we need to be <code>pointer-events: auto</code> for the controls container.
      </li>
    </ul>
    <p>
      Your controls should now look something like what's below. More importantly, they should adjust the image opacities in exactly the way that we want. This example highlights 
      the power of setting up our user interface logic using Vue - once we set up <code>crossfade</code> to control our opacities in the way that we want, hooking up UI elements 
      with the interactions that we wanted became almost trivial. In the next part of the guide, we'll take things one step further - we'll allow showing and hiding the images, and 
      even update our UI based on whether the images are visible or not!
    </p>
    <v-img :src="controlsURL" />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-var-requires */

import CodeBlock from "./CodeBlock.vue";

const bottomContentEmpty = 
`<div id="bottom-content">
  <div id="body-logos" v-if= "!smallSize">
    <credit-logos/>
  </div>
</div>
`
;

const controlsContainer = 
`<div id="bottom-content">
   <div id="controls-container">
   </div>
   <div id="body-logos" v-if= "!smallSize">
     <credit-logos/>
   </div>
</div>
`;

const crossfadeWatcher = 
`watch(crossfade, (value: number) => {
   const jwstOpacity = 0.01 * value;
   layers.jwst.set_opacity(jwstOpacity);
   layers.hubble.set_opacity(1 - jwstOpacity);
});
`;

const importWithWatch = `import { ref, reactive, computed, onMounted, nextTick, watch } from "vue";`;

const hubbleButton = 
`<button
  class="ui-text slider-label"
  @click="crossfade = 0"
  @keyup.enter="crossfade = 0"
  tabindex="0"
>Hubble<br><span class="light-type">(Visible)</span>
</button>
`;

const jwstButton = 
`<button
  class="ui-text slider-label"
  @click="crossfade = 100"
  @keyup.enter="crossfade = 100"
  tabindex="0"
>JWST<br><span class="light-type">(Infrared)</span>
</button>
`;

const crossfadeSlider = 
`<v-slider
  v-model="crossfade"
  :min="0"
  :max="100"
  :step="1"
  hide-details
></v-slider>
`;

const controlsContainerCSS = 
`#controls-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  pointer-events: auto;
  width: 75%;
}
`;

const styling = 
`.ui-text {
  color: var(--accent-color);
  background: black;
  padding: 5px 5px;
  border: 2px solid black;
  border-radius: 10px;
  font-size: calc(0.7em + 0.2vw);

  &:focus {
    color: white;
  }
}

.slider-label {
  font-weight: bold;
  font-size: calc(0.8em + 0.5vw);
  padding: 5px 10px;
  text-align: center;
  line-height: 20px;

  .light-type {
    font-size: calc(0.56em + 0.35vw);
  }

  &:hover {
    cursor: pointer;
  }
}
`
;

const controlsURL = require("../assets/controls.png");
</script>
