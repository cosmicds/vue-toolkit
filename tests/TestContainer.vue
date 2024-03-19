<template>
  <div id="#test-app">
    <component :is="component"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({

  created() {
    window.addEventListener("hashchange", (event) => {
      this.component = new URL(event.newURL).hash;
    });
  },

  data() {
    return {
      component: "div"
    };
  }
});
</script>
