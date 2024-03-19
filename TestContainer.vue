<template>
  <div id="test-app">
    <component :is="component" v-bind="props" class="test-component"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({

  created() {
    this.component = window.location.hash.substring(1);
    window.addEventListener("hashchange", (event) => {
      const url = new URL(event.newURL);
      this.component = url.hash.substring(1);
      const query = url.searchParams.get("props");
      this.props = query ? JSON.parse(Buffer.from(query, "base64").toString()) : {};
    });
  },

  data() {
    return {
      component: "div",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props: {} as Record<string, any>,
    };
  }
});
</script>

<style lang="less">
::-webkit-scrollbar {
  display: none;
}

html {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
body {
  overflow: hidden;
}

#test-app {
  width: 75vw;
  height: 75vh;
  position: fixed;
  margin-top: 12.5vh;
  margin-left: 12.5vw;
}
</style>
