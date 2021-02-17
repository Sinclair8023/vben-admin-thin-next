<template>
  <BasicMenuItem
    v-if="!menuHasChildren(item) && getShowMenu"
    v-bind="$props"
    :index="index"
  />
  <el-submenu
    v-if="menuHasChildren(item) && getShowMenu"
    :class="getClass"
    :index="index"
  >
    <template #title>
      <MenuItemContent
        v-bind="$props"
        :item="item"
      />
    </template>

    <template
      v-for="childrenItem in item.children || []"
      :key="childrenItem.path"
    >
      <BasicSubMenuItem
        v-bind="$props"
        :item="childrenItem"
        :index="childrenItem.path"
      />
    </template>
  </el-submenu>
</template>
<script lang="ts">
import type { Menu as MenuType } from '/@/router/types';

import { defineComponent, computed, toRef } from 'vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { itemProps } from '../props';
import BasicMenuItem from './BasicMenuItem.vue';
import MenuItemContent from './MenuItemContent.vue';

export default defineComponent({
  name: 'BasicSubMenuItem',
  isSubMenu: true,
  components: {
    BasicMenuItem,
    MenuItemContent,
  },
  props: itemProps,
  setup(props) {
    const { prefixCls } = useDesign('basic-menu-item');
    const getShowMenu = computed(() => {
      return !props.item.meta?.hideMenu;
    });
    function menuHasChildren(menuTreeItem: MenuType): boolean {
      return (
        Reflect.has(menuTreeItem, 'children') &&
        !!menuTreeItem.children &&
        menuTreeItem.children.length > 0
      );
    }
    const getClass = computed(() => {
      return [`${prefixCls}__submenu`, `${prefixCls}__submenu--${props.theme}`];
    });
    return {
      prefixCls,
      menuHasChildren,
      getShowMenu,
      getClass,
    };
  },
});
</script>
