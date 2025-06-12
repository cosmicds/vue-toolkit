<template>
  <div>
    <h1>Setting Up Images and Camera</h1>

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
    similar to a folder in a filesystem. Our images are stored as WWT <code>Imageset</code>s within <code>Place</code> entries, so after the Promise resolves, 
    we do a few checks to make sure that the items have the right structure and then use WWT's <code>addImageSetLayer</code> to add the images into WWT using the names (<code>"jwst"</code> and <code>"hubble"</code>) that we used as keys in our <code>wtmls</code> object.
    This method also returns a promise which we return, meaning that <code>layerPromises</code> is, as the name suggests, an array of promises.
    Before we do our next steps, we want to be sure that both layers have finished being set up in WWT. To do that, we use JavaScript's <code>Promise.all</code>, which takes in an array of promises and returns a promise that resolves only when all of them are complete. The resolved value will be an array whose members are the resolved values of the input promises. In our case, once all of the layers have loaded, we add them to our component-level <code>layers</code> object for access later, and set the opacity of each to 0.5 (out of 1).
    </p>
    <v-alert type="info" variant="tonal">
      <template #text>
        Note that we haven't added any handling for what happens if the promises fail for any reason. We've omitted error handling in order to keep the tutorial simpler, but in your own story you can use the promise's <code>catch</code> method 
        to decide how to handle any errors that pop up as you're handling data.
      </template>
    </v-alert>
    <p>
      With the layers loaded and set up, we now set <code>layersLoaded.value = true</code>. Why do we do this?  
      The variables <code>layersLoaded</code> and <code>positionSet</code> are built-in variables in the template. When both of these are set to true, the <code>isReady</code> value will automatically be updated to be true. Note that these values are both Vue references (so that we can use them in the template), and so we update their stored values by setting their <code>value</code> member.
      Until this happens, the template has a built in "Loading..." screen with a small Moon GIF. Feel free to customize what you want there!
    </p>
    <p>
      So now we've set <code>layersLoaded</code> to be true, but we haven't handled setting the position. In addition to allowing the loading screen to pass, we also want WWT to bring the user to the right place on the sky. We're going to add a button to reset the camera later, so let's do ourselves a favor now and make this functionality that we can use in multiple places. To do this, add the following function to the top level of the component:
    </p>
    <CodeBlock :code="resetView" lang="javascript" />
    <p>Additionally, add the following near the top of the script section of the template, near the other imports:</p>
    <CodeBlock :code="importD2R" lang="javascript" />
    <p>
      While there's nothing wrong with setting the position "by hand", this code allows us to automatically grab the center position of the JWST imageset and, after converting it to radians, set the WWT camera to that
      RA/Dec position. The zoom and roll parameters are values that we picked manually, though. 
      Now that we've defined this function, let's call it and let the template know that we've set our position. Below <code>layersLoaded.value = true</code>, add the following:
    </p>
    <CodeBlock :code="callResetView" lang="javascript" />
    <p>
    Now that we have code to mark both the layers and position as all set up, the user can advance through the loading screen. When the loading screen finishes, we'll have 
    both images loaded into WWT, with the camera at the correct RA/Dec position and zoom level! With the basic view set up, we can now move on to the controls!
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
  layersLoaded.value = true;
});
`
);

const resetView = ref(
`function resetView(instant = false) {
  const imageset = layers.jwst.get_imageSet();
  store.gotoRADecZoom({
    raRad: D2R * imageset.get_centerX(),
    decRad: D2R * imageset.get_centerY(),
    zoomDeg: 0.8595,
    rollRad: 1.799,
    instant,
  });
}` 
);

const importD2R = ref(`import { D2R } from "@wwtelescope/astro";`);

const callResetView = ref(
`resetView();
positionSet.value = true;
`
);
</script>
