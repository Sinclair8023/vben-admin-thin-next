<template>
  <el-tooltip
    :content="getTitle"
    placement="bottom"
    :show-after="500"
  >
    <span @click="toggleFullscreen">
      <g-icon
        prefix="ant-design"
        icon="fullscreen-outlined"
        v-if="!isFullscreen"
      />
      <g-icon
        prefix="ant-design"
        icon="fullscreen-exit-outlined"
        v-else
      />
    </span>
  </el-tooltip>
</template>
<script lang="ts">
import { defineComponent, computed, unref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { useFullscreen } from '/@/hooks/web/useFullScreen';

export default defineComponent({
  name: 'FullScreen',
  setup() {
    const { t } = useI18n();
    const { toggleFullscreen, isFullscreenRef } = useFullscreen();

    const getTitle = computed(() => {
      return unref(isFullscreenRef)
        ? t('layout.header.tooltipExitFull')
        : t('layout.header.tooltipEntryFull');
    });

    return {
      t,
      getTitle,
      isFullscreen: isFullscreenRef,
      toggleFullscreen,
    };
  },
});
</script>
