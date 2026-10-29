
<template>
  <v-footer 
    v-if="showPrivacyDialog" 
    class="privacy-footer"
    app 
  >
    <close-button
      class="privacy-footer-close"
      label="Close"
      color="primary"
      @click="showPrivacyDialog = false"
    />
    <div class="privacy-footer-text">
      To evaluate usage of this app, <strong>anonymized</strong> data may be collected. 
      <!-- <a href="#" @click.prevent="showPrivacyPolicyInfo = true">Learn more</a> -->
      <button 
        type="button"
        class="privacy-footer-learn-more"
        @click.prevent="showPrivacyPolicyInfo = true"
      >
        Learn more
      </button>
    </div>
    <!-- compact - small buttons --> 
    <!-- privacy, opt out, allow -->
    <div class="privacy-footer-buttons">
      <v-btn
        color="green"
        variant="tonal"
        density="comfortable"
        size="xs-small"
        @click="responseOptOut = false"
      >
        Allow
      </v-btn>
      <!-- <v-btn
          color="#BDBDBD"
          density="comfortable"
          size="xs-small"
          variant="outlined"
          @click="showPrivacyPolicyInfo = true"
        >
          Privacy Policy
        </v-btn> -->
      <v-btn
        color="#ff6666"
        density="comfortable"
        size="xs-small"
        variant="text"
        @click="responseOptOut = true"
      >
        Opt Out
      </v-btn>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
import { VFooter, VBtn } from "vuetify/components";
import CloseButton from "../components/CloseButton.vue";

const showPrivacyDialog = defineModel<boolean>('show',{default: false, required: true});
const showPrivacyPolicyInfo = defineModel<boolean>('showPrivacyPolicy',{default: false, required: true});
const responseOptOut = defineModel<boolean | null>('responseOptOut',{default: null, required: true});
</script>


<style scoped lang="less">

.v-footer.privacy-footer {
  // Vuetify's own .v-footer default is `flex: 1 1 auto`, which (since we don't
  // pass the `app` prop) lets it compete for leftover space in .v-application__wrap's
  // column flex and balloon to fill the viewport - pin it back to its content height.
  // flex: none;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  z-index: 9000;
  background-color: rgb(var(--v-theme-background));
  font-size: 0.8em;
  // padding: 0.5em 1em;
  .privacy-footer-close {
    padding: .5rem;
    margin: -.5rem;
  }
  
  button.privacy-footer-learn-more {
    background: none;
    border: none;
    text-decoration: underline;
    cursor: pointer;
  }
  
  .privacy-footer-buttons {
    flex: 1 1 auto;
    
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    
    gap: 0.5em;
  
    
    .v-btn {
      text-transform: none;
      opacity: 0.8;
      padding-inline: 4px;
      padding-block: 2px;
    }
    .v-btn.text-green {
      font-weight: bold;
      padding-block: 4px;
      padding-inline: 8px;
    }
  }
  .privacy-footer-text {
    font-size: 1em;
    color: #bdbdbd;
  }
  
}

</style>