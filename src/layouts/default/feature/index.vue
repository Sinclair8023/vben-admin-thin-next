<template>
  <LayoutLockPage />
  <el-backtop
    v-if="getUseOpenBackTop"
    target="body"
  />
  <SettingDrawer v-if="getShowSettingButton" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';

export default defineComponent({
  name: 'LayoutFeatures',
  components: {
    LayoutLockPage: createAsyncComponent(() => import('/@/views/sys/lock/index.vue')),
    SettingDrawer: createAsyncComponent(() => import('/@/layouts/default/setting/index.vue')),
  },
  setup() {
    const { getUseOpenBackTop, getShowSettingButton } = useRootSetting();
    return {
      getUseOpenBackTop,
      getShowSettingButton,
    };
  },
});
</script>
