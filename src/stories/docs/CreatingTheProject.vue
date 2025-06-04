<template>
  <div>  
    <h1>Example Story Creation</h1>
    <p>Whether you've worked with Vue before or not, creating your own data story can be a tall task. In this multi-part guide, we'll show you step-by-step what it takes to recreate the <a href="https://projects.cosmicds.cfa.harvard.edu/carina">Carina</a> data story. This was one of the first Cosmic Data Stories that we created, and while relatively straightforward, will highlight most of the key points that you'll need to create your own data story.</p>
    
    <p>First things first - before we start thinking about content, we need to set up a project! There's a decent amount of boilerplate that goes into a Vue project, so we've created the <a href="https://github.com/cosmicds/vue-ds-template">CosmicDS Vue Template</a> to help you get started. The first thing that you'll want to do is to clone that repository onto your machine and enter the directory that it creates. We'll call this example story "carina" - feel free to change the name if you want.</p>
  <CodeBlock :code="clone" lang="plain">
  </CodeBlock>
  <p>Now that we've got the Vue template on our local machine, there's a setup script that we can run that will do some more boilerplate setup tasks - things like modifying the basic page title and skeleton to match your story. You can pass the story name in kebab-case - the script will automatically take care of things like title-casing the page title, etc:</p>
  <CodeBlock :code="setup"/>
  <p>In addition to the changes to the HTML skeleton mentioned above, this script will also:</p>
  <ul>
    <li>Rename the main story component file to match your story name</li>
    <li>Remove the git folder so that your story no longer has the template's commit history</li>
  </ul>

  <p>And now you're set up! In the next guide, we'll tackle the first piece of content that users see - the splash screen!</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CodeBlock from "./CodeBlock.vue";
import { trimLeadingWhitespacePerLine } from "./utils";

const clone = ref(trimLeadingWhitespacePerLine(`
  git clone https://github.com/cosmicds/vue-ds-template.git carina
  cd carina`));
const setup = ref(`scripts/setup.sh carina`);
  
</script>
