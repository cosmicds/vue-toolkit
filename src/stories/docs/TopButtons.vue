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
    <p>
      In particular, let's put these buttons inside the <code>center-buttons</code> container which, as the name suggests, is in the top-center of screen. For the button that 
      resets the view, we're going to use the toolkit's icon button component. Add the following markup inside of the <code>center-buttons</code> container:
    </p>
    <CodeBlock :code="resetViewButton" lang="html" />
    <p>
      This specifies a few things: the icon that we want to use, the code that gets triggered when the button is pressed, the button color, and setup for the button tooltip. 
      Going item-by-item:
    </p>
    <ul>
      <li>
        <code>fa-icon="redo"</code> specifies that we want the Redo icon from <a href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">Font Awesome</a>. 
        The icon button component has built-in support for Font Awesome icons (as well as <a href="https://pictogrammers.com/library/mdi/" target="_blank" rel="noopener noreferrer">Material Design Icons</a>). 
      </li>
      <li>
        <code>@activate="() => resetView(false)"</code> runs when the button is pressed (causing it to emit the <code>activate</code> event). As you'll recall, we made <code>resetView</code>
        a standalone function in our earlier section about setting up layers. This is the reason that we defined this logic in its own function before - we can now reuse it 
        here without needing to do anything extra.
      </li>
      <li><code>:color="buttonColor"</code> sets the button color to <code>buttonColor</code>, which is a predefined variable in the template (set to white by default)</li>
      <li>
        <code>
          tooltip-text="Return to Carina"<br>
          tooltip-location="bottom"<br>
          tooltip-offset="3px"<br>
          :show-tooltip="!mobile"
        </code>
        <br>
        These four lines set up the tooltip for the icon button (the tooltip is text that displays when e.g. hovering over the button). The first line sets the text of the 
        tooltip. The second sets the tooltip location relative to the button (in this case, we're setting the tooltip to diplay below the button). The third line sets the 
        tooltip offset, which is the distance between the button and the tooltip - here we set it to 3 pixels. Finally, the last line disables the tooltip on a mobile device, 
        where there's really no concept of "hovering over" an element.
      </li>
    </ul>
    <p>
      So this button is <em>almost</em> done, but if you try and run the story now, you'll see that the icon doesn't appear. There's one extra thing we need to do in order to use 
      the icon that we want on the button. To do this, go to the <code>src/main.ts</code> file. Find the block near the top that imports some icons from Font Awesome. We need to update 
      this to import the Redo icon as well:
    </p>
    <CodeBlock :code="importRedo" lang="javascript" />
    <p>
      Similarly, we also need to add the icon to the local Font Awesome library. Below the import block should be a set of lines of the form <code>library.add(...)</code>. 
      Add one more line there:
    </p>
    <CodeBlock :code="addRedoToLibrary" lang="javascript" />
    <p>
      Next, let's set up our button to show and hide images. First, let's do a little setup in the template. Similar to what we did when we set up <code>crossfade</code> 
      to control our opacities, we'll create a Vue ref to control whether or not the images are shown or hidden. At the top level of the script portion of the template, 
      add the following:
    </p>
    <CodeBlock :code="showLayers" lang="javascript" />
    <p>
      So how do we want to use <code>showLayers</code>? Also similar to <code>crossfade</code>, what we'll do is define a watcher that updates the WWT state to match the 
      current value of <code>showLayers</code>. Add the following below the watcher for <code>crossfade</code>:
    </p>
    <CodeBlock :code="showLayersWatcher" lang="javascript" />
    <p>
      So, once again, we're able to control the state of the WWT view using our Vue template variables - we now only need to adjust the value of <code>showLayers</code> in order to 
      manipulate WWT. As you're hopefully seeing, this pattern can be used to great effect. Now, let's give the user a way to change the value of <code>showLayers</code>. Add the following 
      directly before the reset button in the template:
    </p>
    <CodeBlock :code="showHideButton" lang="html" />
    <p>
      The pieces inside the tag should be straightforward by now - the most important thing is that on a click event, we switch the value of <code>showLayers</code>, which will cause the layers to 
      update. Inside of the button element is something new though:<br><code>{{ showLayers ? "Hide Images" : "Show Images" }}</code><br>This is using Vue's 
      <a href="https://vuejs.org/guide/essentials/template-syntax.html#text-interpolation" target="_blank" rel="noopener noreferrer">text interpolation</a> capabilities to insert the value of the expression 
      in double curly braces into the template. Here we're using a simple ternary - if <code>showLayers.value</code> is true, the button says "Hide Images"; if it's false, it says "Show Images". This is a 
      simple way to allow our button to react to the current state that the user has set.
    </p>
    <p>
      This finishes setting up the show/hide button - the user now has a simple way to control whether the images are visible, and our button even reacts to what they've done! But there's one more thing that 
      we can do on this front to help our interactive feel more context-aware. In the previous section of this guide we added opacity controls for the images, but it doesn't really make sense to have the buttons 
      and slider when the images aren't visible! To deal with this, find the controls container and change the opening tag to the following:
    </p>
    <CodeBlock :code="controlsContainerVif" lang="html" />
    <p>
      This update uses Vuetify's <a href="https://vuejs.org/guide/essentials/conditional.html#v-if" target="_blank" rel="noopener noreferrer">conditional rendering</a> capabilities to only render
      the opacity controls when the image layers are visible. This way, the user interface is as clean as possible based on the current state. Not bad for just a few extra characters of code!
    </p>
    <v-alert type="info" variant="tonal">
      <template #text>
        Note that Vue has another conditional rendering directive: <code>v-show</code>. Which one you want to use depends on your particular interactive and what you want to do with the relevant elements. 
        We'll defer to this discussion in the <a href="https://vuejs.org/guide/essentials/conditional.html#v-if-vs-v-show" target="_blank" rel="noopener noreferrer">Vue documentation</a> of which directive 
        to use when.
      </template>
    </v-alert>
    <p>
      And that's it! We've now got an interactive data story with all of the UI elements and functionality that we want. While this isn't a carbon copy of our 
      <a href="https://projects.cosmicds.cfa.harvard.edu/carina/" target="_blank" rel="noopener noreferrer">Carina data story</a>, it does have all of the same essential functionality. 
      Hope
    </p>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable indent */

import CodeBlock from "./CodeBlock.vue";

const topContentDefault = 
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
;

const resetViewButton = 
`<icon-button
  fa-icon="redo"
  :color="accentColor"
  @activate="() => resetView(false)"
  tooltip-text="Return to Carina"
  tooltip-location="bottom"
  tooltip-offset="3px"
  :show-tooltip="!mobile"
`
;

const showLayers = "const showLayers = ref(true);";

const showLayersWatcher = 
`watch(showLayers, (show: boolean) => {
  Object.values(layers).forEach(layer => {
    layer.set_enabled(show);
  });
});
`
;

const importRedo = 
`import {
  faBookOpen,
  faRedo,
  faTimes,
  faVideo
} from "@fortawesome/free-solid-svg-icons";
`
;

const addRedoToLibrary = "library.add(faRedo)";

const showHideButton = 
`<button
  id="show-layers-button"
  class="ui-text"
  @click="showLayers = !showLayers"
>
  {{ showLayers ? "Hide Images" : "Show Images" }}
</button>
`
;

const controlsContainerVif = `<div id="controls-container" v-if="showLayers">`;

</script>
