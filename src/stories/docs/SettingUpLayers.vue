<template>
  <div>
    <h1>Setting Up Images</h1>

    <p>
      If you've followed along with our guide so far, you've got a working Vue project and a splash screen with some relevant content.
      Now, it's time to start setting up the content of the story itself. To start, we'll go through how to set up the image layers
      in WorldWide Telescope so that they display on the sky!
    </p>

    <p>
      The first thing that we'll need to set up images in WWT is what's called a <a href="https://docs.worldwidetelescope.org/data-guide/1/data-file-formats/collections/" target="_blank" rel="noopener noreferrer">WTML file</a>,
      which is a XML document that WWT knows to how read to load in data. Since it's just XML, creating your own WTML files is easy. You can read the WWT Data Guide linked above
      if you want to create your own WTML files, but for this guide we'll use some WTMLs that already exist and have the data that we want.
    </p>

    <p>
      To get started setting up the image layers and pointing the WWT camera to them, again open up <code>src/Carina.vue</code>, and this time look for the <code>onMounted</code> hook inside of the JavaScript section of the template.
      It should look like this:
    </p>
    <CodeBlock :code="onMountedInitial" lang="javascript" />
    <p>
      You can see the commented-out line recommending where to add layer setup code, and that's where we'll put in. But first, let's briefly go through what's happening here. 
      The WWT engine needs to run a few things when it first sets up - there's default data to load, connections to set up with WWT data servers, etc. Since this all happens 
      over the internet, we don't know exactly when this will finish. As the language of the web browser, modern JavaScript has the concept of a 
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank" rel="noopener noreferrer"><code>Promise</code></a> 
      to represent these sorts of asynchronous operations. The WWT web engine store (which we use to access WWT's functionality) exposes a <code>waitForReady</code> promise. This promise doesn't return a value, but does
      let us know when WWT is ready to respond to our commands. To do something after a promise resolves, we use the promise's <code>then</code> method - basically, we're saying 
      "when you're finished, <em>then</em> do this next". So all of our camera and layer setup will happen inside of the <code>then</code> block, so that we can be sure that WWT 
      has finished setting up.
    </p>
    <p>
      By default, the template assumes that you have a specific location in mind that you want to go to (and we do!) But let's handle that later. To start, delete the call part of the code
      that goes to an initial position (<code>store.gotoRADecZoom</code> through <code>positionSet.value = true);</code> a few lines later). We'll do this another way later on. Also, if you scroll
      up a bit, find a variable named <code>props</code>. You can delete the <code>initialCameraParams</code> defaults there, so that the props look like
    </p>
    <CodeBlock :code="props" lang="javascript" />
    <p>Now, we'll used WWT's API for loading image collections to add the images into our view. Add the following code after the line that sets up the sky imagesets:</p>
    <CodeBlock :code="layerSetup" lang="javascript" />
    <p>This code used a top-level <code>layers</code> object so that we can use the imagesets elsewhere in the component, so somewhere outside of the <code>onMounted</code> hook you'll need to add</p>
    <CodeBlock code="const layers: Record<string,string> = {};" lang="javascript" />
    <p>
    Let's go over what we're doing here. First, we create a <code>wtmls</code> object that stores the URLs for our two WTML files. Here we have two separate WTML files (one for our Hubble image, the other 
    for our JWST image), but you can store multiple imagesets in one WTML. For each key, value pair in our <code>wtmls</code> object, we load the WTML from its URL using WWT's <code>loadImageCollection</code> 
    method. Again, as this generally requires loading from a remote location, it returns a Promise whose resolved value is a WWT <code>Folder</code> object, which is a class describing a folder of contents, 
    similar to a folder in a filesystem. 
    </p>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable indent */

import { ref } from "vue";
import CodeBlock from "./CodeBlock.vue";

const onMountedInitial = ref(
`onMounted(() => {
  store.waitForReady().then(async () => {
    skyBackgroundImagesets.forEach(iset => backgroundImagesets.push(iset));
    store.gotoRADecZoom({
      ...props.initialCameraParams,
      instant: true
    }).then(() => positionSet.value = true);

    // If there are layers to set up, do that here!
    layersLoaded.value = true;
  });
});
`
);

const props = ref(
`const props = withDefaults(defineProps<CarinaProps>(), {
  wwtNameSpace: "carina",
});
`
);

const layerSetup = ref(
`const wtmls = {
  jwst: "https://web.wwtassets.org/specials/2023/cosmicds-carina/collection/jwst_carina.wtml",
  hubble: "https://web.wwtassets.org/specials/2023/cosmicds-carina/collection/carina_carina.wtml"
};
const layerPromises = Object.entries(wtmls).map(([name, url]) =>
  store.loadImageCollection({
    url,
    loadChildFolders: false
  }).then((folder) => {
    const children = folder.get_children();
    if (children == null) { return; }
    const item = children[0] as Place;
    const imageset = item.get_backgroundImageset() ?? item.get_studyImageset();
    if (imageset === null) { return; }
    return store.addImageSetLayer({
      url: imageset.get_url(),
      mode: "autodetect",
      name,
      goto: false
    });
  }));

Promise.all(layerPromises).then((layers) => {
  layers.forEach(layer => {
    if (layer === undefined) { return; }
    layers[layer.get_name()] = layer;
    applyImageSetLayerSetting(layer, ["opacity", 0.5]);
  });
  this.layersLoaded = true;
`
);
</script>
