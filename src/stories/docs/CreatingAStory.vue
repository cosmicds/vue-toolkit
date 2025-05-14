<template>
  <div class="creating-story-root">
    <h1>Creating a Story</h1>
    
    <p>In this guide we'll walk you through the process of creating a Vue-based data story. Whether you have some experience with Vue or are completely new to it, this guide will hopefully make the process of setting up your own data story a little bit easier.</p>
    
    <h2>Using the CosmicDS template</h2>
    
    <p>To help you get started, the Cosmic Data Stories team has created a <a href="https://github.com/cosmicds/vue-ds-template">Vue DS template</a> that gives you the skeleton of a fully working data story. The template creates a story built around <a href="https://worldwidetelescope.org/home/">WorldWide Telescope</a>, but in the future we'll provide templates for other sorts of data stories as well.</p>
    
    <h4>Getting set up</h4>
    
    <p>To get started with the template, you'll want to use <a href="https://git-scm.com/">Git</a> to clone the template. One way to do this is to open a terminal prompt and run</p>
    <code-block
      code="git clone https://github.com/cosmicds/vue-ds-template.git <your-story-name>"
    />
    <p>where &lt;your-story-name&gt; is the name of your story. Next, we have a setup script that you can run to help rename relevant pieces of the story:</p>

    <code-block
      :code="['cd <your-story-name>', 'scripts/setup.sh <your-story-name>']"
    />

    <h4>Useful commands</h4>
    
    <p>With the basic renaming done, there are a few commands that you can use while developing the story:</p>
    <ul>
      <li><pre>yarn serve</pre> runs the Vue development server. This will run a small development server that you can use to look at what the story currently looks like. This server uses "hot reloading", which means that updates you make to component files will automatically be reflected on the page.</li>
      <li><pre>yarn build</pre> - when you're ready to deploy a version of your story, run this command. It will build a static version of your story into the "dist" directory. You can then upload this directory onto a static file server (GitHub Pages works great) and you're good to go!</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import CodeBlock from "./CodeBlock.vue";
</script>

<style lang="less">
.creating-story-root {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
