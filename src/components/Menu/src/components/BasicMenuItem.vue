<template>
  <el-menu-item
    :index="index"
    :class="getClass"
  >
    <!-- <MenuItem :class="getLevelClass"> -->
    <MenuItemContent
      v-bind="$props"
      :item="item"
    />
  </el-menu-item>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Menu } from 'ant-design-vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { itemProps } from '../props';

import MenuItemContent from './MenuItemContent.vue';
export default defineComponent({
  name: 'BasicMenuItem',
  components: { MenuItem: Menu.Item, MenuItemContent },
  props: itemProps,
  setup(
    props // props
  ) {
    const { prefixCls } = useDesign('basic-menu-item');

    const getClass = computed(() => [
      `${prefixCls}-menu-item`,
      `${prefixCls}__menu-item--${props.theme}`,
    ]);
    return {
      prefixCls,
      getClass,
    };
  },
});
</script>
