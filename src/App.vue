<template>
  <AppProvider v-bind="lockEvent">
    <router-view />
  </AppProvider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AppProvider } from '/@/components/Application';

import { initAppConfigStore } from '/@/logics/initAppConfig';

import { useLockPage } from '/@/hooks/web/useLockPage';
import { useLocale } from '/@/locales/useLocale';

export default defineComponent({
  name: 'App',
  components: { AppProvider },
  setup() {
    // support Multi-language
    const { setLocale } = useLocale();
    setLocale();

    // Initialize vuex internal system configuration
    initAppConfigStore();
    // Create a lock screen monitor
    const lockEvent = useLockPage();

    return {
      lockEvent,
    };
  },
});
</script>
