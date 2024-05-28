<template>
  <div id="logo-credits" :style="cssVars">
    <div id="icons-container">
      <a
        v-for="logo in logos"
        v-bind:key="logo.href"
        :href="logo.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          :alt="logo.alt"
          :src="logo.src"
        />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { CreditLogo, CreditLogosProps, DefaultCreditLogo } from "../types";

const DEFAULT_LOGOS: Map<DefaultCreditLogo, CreditLogo> = new Map([
  ["cosmicds", {
    src: "https://raw.githubusercontent.com/cosmicds/minids/main/assets/cosmicds_logo_for_dark_backgrounds.png",
    href: "https://www.cosmicds.cfa.harvard.edu/",
    alt: "CosmicDS Logo",
  }],
  ["wwt", {
    src: "https://raw.githubusercontent.com/cosmicds/minids/main/assets/logo_wwt.png",
    href: "https://worldwidetelescope.org/home/",
    alt: "WWT Logo",
  }],
  ["sciact", {
    src: "https://raw.githubusercontent.com/cosmicds/minids/main/assets/logo_sciact.png",
    href: "https://science.nasa.gov/learners",
    alt: "SciAct Logo",
  }],
  ["nasa", {
    src: "https://raw.githubusercontent.com/cosmicds/minids/main/assets/NASA_Partner_color_300_no_outline.png",
    href: "https://nasa.gov/",
    alt: "NASA Partner Logo"
  }]
]);

const props = withDefaults(defineProps<CreditLogosProps>(), {
  logoSize: "5vmin",
  extraLogos: () => [],
  defaultLogos: () => [...DEFAULT_LOGOS.keys()],
});

const logos = computed<CreditLogo[]>(() => {
  const defaultLogos = props.defaultLogos.map(logo => DEFAULT_LOGOS.get(logo)).filter(x => x != undefined) as CreditLogo[];
  return defaultLogos.concat(props.extraLogos);
});

const cssVars = computed(() => {
  return {
    "--logo-size": props.logoSize,
  };
});
</script>

<style lang="less">
#icons-container {
  pointer-events: auto;

  img {
    height: var(--logo-size);
  }
}
</style>
