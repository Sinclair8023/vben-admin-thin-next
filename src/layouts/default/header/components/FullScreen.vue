<template>
  <el-tooltip
    :content="getTitle"
    placement="bottom"
    :show-after="500"
  >
    <span @click="toggleFullscreen">
      <FullscreenOutlined v-if="!isFullscreen" />
      <FullscreenExitOutlined v-else />
    </span>
  </el-tooltip>
</template>
<script lang="ts">
export default defineComponent({
  name: 'FullScreen',
  components: { FullscreenExitOutlined, FullscreenOutlined },

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
