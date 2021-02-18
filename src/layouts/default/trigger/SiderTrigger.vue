<template>
  <g-icon
    icon="ant-design:double-right-outlined"
    v-if="getCollapsed"
  />
  <g-icon
    icon="ant-design:double-left-outlined"
    v-else
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';

export default defineComponent({
  name: 'SiderTrigger',
  setup() {
    const { getCollapsed } = useMenuSetting();
    return { getCollapsed };
  },
});
</script>
