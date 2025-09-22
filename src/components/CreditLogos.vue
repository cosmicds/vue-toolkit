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

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface CreditLogo {
  src: string;
  href: string;
  alt: string;
  name: string;
}

const DEFAULT_LOGOS: Map<string, CreditLogo> = new Map([
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

export default defineComponent({

  props: {
    visible: {
      type: Boolean,
      default: true
    },
    logoSize: {
      type: String,
      default: "5vmin"
    },
    extraLogos: {
      type: Array as PropType<CreditLogo[]>,
      default: () => [],
    },
    defaultLogos: {
      type: Array as PropType<string[]>,
      default: () => ["cosmicds", "wwt", "sciact"],
    },
  },

  computed: { 
    isMobile() {
      return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    },
    cssVars() {
      return {
        "--logo-size": this.logoSize,
      };
    },
    logos() {
      const defaultLogos = this.defaultLogos.map((logo: string) => DEFAULT_LOGOS.get(logo)).filter((logo: CreditLogo | undefined) => logo != undefined) as CreditLogo[];
      return defaultLogos.concat(this.extraLogos);
    }
  },

});
</script>

<style>
#logo-credits img {
  height: var(--logo-size);
}
</style>
