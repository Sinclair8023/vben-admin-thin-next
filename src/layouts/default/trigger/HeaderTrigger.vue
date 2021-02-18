<template>
  <span
    :class="[prefixCls, theme]"
    @click="toggleCollapsed"
  >
    <g-icon
      prefix="ant-design"
      icon="menu-unfold-outlined"
      v-if="getCollapsed"
    />
    <g-icon
      icon="ant-design:menu-fold-outlined"
      v-else
    />
  </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useDesign } from '/@/hooks/web/useDesign';
import { propTypes } from '/@/utils/propTypes';

export default defineComponent({
  name: 'SiderTrigger',
  props: {
    theme: propTypes.oneOf(['light', 'dark']),
  },
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting();
    const { prefixCls } = useDesign('layout-header-trigger');
    return { getCollapsed, toggleCollapsed, prefixCls };
  },
});
</script>
