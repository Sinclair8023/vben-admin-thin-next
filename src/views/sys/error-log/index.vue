<template>
  <div class="p-4">
    <template
      v-for="src in imgList"
      :key="src"
    >
      <img
        :src="src"
        v-show="false"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useI18n } from '/@/hooks/web/useI18n';

import { ErrorInfo } from '/@/store/modules/error';

export default defineComponent({
  name: 'ErrorHandler',
  setup() {
    const rowInfo = ref<ErrorInfo>();
    const imgList = ref<string[]>([]);

    const { t } = useI18n();
    return {
      imgList,
      rowInfo,
      t,
    };
  },
});
</script>
