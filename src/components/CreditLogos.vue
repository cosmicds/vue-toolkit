<template>
  <div id="logo-credits" :style="cssVars">
    <div id="icons-container">
      <a
        v-for="logo in logos"
        v-bind:key="logo.href"
        :id="logo.name ? logo.name : undefined"
        :href="logo.href"
        target="_blank"
        rel="noopener noreferrer"
        :class="['logo-link', logo.name ? `logo-${logo.name}` : '']"
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
    src: "https://projects.cosmicds.cfa.harvard.edu/cds-website/logos/cosmicds_logo_for_dark_backgrounds.png",
    href: "https://www.cosmicds.cfa.harvard.edu/",
    alt: "CosmicDS Logo",
    name: "cosmicds",
  }],
  ["wwt", {
    src: "https://projects.cosmicds.cfa.harvard.edu/cds-website/logos/logo_wwt.png",
    href: "https://worldwidetelescope.org/home/",
    alt: "WWT Logo",
    name: "wwt",
  }],
  ["sciact", {
    src: "https://projects.cosmicds.cfa.harvard.edu/cds-website/logos/logo_sciact.png",
    href: "https://science.nasa.gov/learners",
    alt: "SciAct Logo",
    name: "sciact",
  }],
  ["nasa", {
    src: "https://projects.cosmicds.cfa.harvard.edu/cds-website/logos/NASA_Grantee_color_no_outline.png",
    href: "https://nasa.gov/",
    alt: "NASA Grantee Logo",
    name: "nasa",
  }]
]);

const props = withDefaults(defineProps<CreditLogosProps>(), {
  logoSize: "5vmin",
  extraLogos: () => [],
  defaultLogos: () => ["cosmicds", "wwt", "sciact"],
});

const logos = computed<CreditLogo[]>(() => {
  const defaultLogos = props.defaultLogos.map((logo: DefaultCreditLogo) => DEFAULT_LOGOS.get(logo)).filter((logo: CreditLogo | undefined) => logo != undefined) as CreditLogo[];
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
    width: auto;
    margin-inline: 0.1em;
  }
}

.logo-link {
  display: inline-flex;
}
</style>
