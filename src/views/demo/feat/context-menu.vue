<template>
  <div title="全屏示例">
    <CollapseContainer
      class="px-20 bg-white w-full h-32 rounded-md"
      title="Window Full Screen"
    >
      <el-button
        type="primary"
        @click="enterFullscreen"
        class="mr-2"
      >
        Enter Window Full Screen
      </el-button>
      <el-button
        type="success"
        @click="toggleFullscreen"
        class="mr-2"
      >
        Toggle Window Full Screen
      </el-button>

      <el-button
        type="error"
        @click="exitFullscreen"
        class="mr-2"
      >
        Exit Window Full Screen
      </el-button>

      Current State: {{ isFullscreenRef }}
    </CollapseContainer>

    <CollapseContainer
      class="px-20 bg-white w-full h-32 rounded-md mt-5"
      title="Dom Full Screen"
    >
      <el-button
        type="primary"
        @click="toggleDom"
        class="mr-2"
      > Enter Dom Full Screen </el-button>
    </CollapseContainer>

    <div
      ref="domRef"
      class="w-1/2 h-64 flex justify-center rounded-md items-center bg-white mx-auto mt-10"
    >
      <el-button
        type="primary"
        @click="toggleDom"
        class="mr-2"
      > Exit Dom Full Screen </el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CollapseContainer } from '/@/components/Container/index';
import { useFullscreen } from '/@/hooks/web/useFullScreen';

export default defineComponent({
  components: { CollapseContainer },
  setup() {
    const domRef = ref<Nullable<HTMLElement>>(null);
    const { enterFullscreen, toggleFullscreen, isFullscreenRef, exitFullscreen } = useFullscreen();

    const { toggleFullscreen: toggleDom } = useFullscreen(domRef);
    return {
      enterFullscreen,
      toggleDom,
      toggleFullscreen,
      isFullscreenRef,
      exitFullscreen,
      domRef,
    };
  },
});
</script>
