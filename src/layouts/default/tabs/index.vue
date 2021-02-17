<template>
  <div :class="getWrapClass">
    <el-tabs
      type="editable-card"
      v-model="activeKeyRef"
      @tab-click="handleChange"
      @edit="handleEdit"
    >
      <el-tab-pane
        v-for="item in getTabsState"
        :key="item.query ? item.fullPath : item.path"
        :name="item.query ? item.fullPath : item.path"
        :closable="!(item && item.meta && item.meta.affix)"
      >
        <template #label>
          <TabContent :tabItem="item" />
        </template>
      </el-tab-pane>
    </el-tabs>
    <div
      :class="getToolsClass"
      v-if="getShowRedo || getShowQuick"
    >
      <TabRedo v-if="getShowRedo" />
      <QuickButton v-if="getShowQuick" />
      <FoldButton v-if="getShowFold" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, unref, ref } from 'vue';

import TabContent from './components/TabContent.vue';
import type { RouteLocationNormalized } from 'vue-router';

import { useGo } from '/@/hooks/web/usePage';

import { tabStore } from '/@/store/modules/tab';
import { userStore } from '/@/store/modules/user';

import { initAffixTabs, useTabsDrag } from './useMultipleTabs';
import { REDIRECT_NAME } from '/@/router/constant';
import { useDesign } from '/@/hooks/web/useDesign';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
import { listenerLastChangeTab } from '/@/logics/mitt/tabChange';
import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting';

import router from '/@/router';

export default defineComponent({
  name: 'MultipleTabs',
  components: {
    QuickButton: createAsyncComponent(() => import('./components/QuickButton.vue')),
    TabRedo: createAsyncComponent(() => import('./components/TabRedo.vue')),
    FoldButton: createAsyncComponent(() => import('./components/FoldButton.vue')),
    TabContent,
  },
  setup() {
    const affixTextList = initAffixTabs();
    const activeKeyRef = ref('');

    useTabsDrag(affixTextList);
    const { prefixCls } = useDesign('multiple-tabs');
    const go = useGo();
    const { getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting();

    const getTabsState = computed(() => {
      return tabStore.getTabsState.filter((item) => !item.meta?.hideTab);
    });

    const unClose = computed(() => unref(getTabsState).length === 1);

    const getWrapClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--hide-close`]: unref(unClose),
        },
      ];
    });
    const getToolsClass = computed(() => `${prefixCls}__tools`);
    listenerLastChangeTab((route) => {
      const { name } = route;
      if (name === REDIRECT_NAME || !route || !userStore.getTokenState) return;

      const { path, fullPath, meta = {} } = route;

      const { currentActiveMenu, hideTab } = meta;
      const isHide = hideTab ? null : currentActiveMenu;
      const p = isHide || fullPath || path;
      if (activeKeyRef.value !== p) {
        activeKeyRef.value = p;
      }

      if (isHide) {
        const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu);
        findParentRoute &&
          tabStore.addTabAction((findParentRoute as unknown) as RouteLocationNormalized);
      } else {
        tabStore.addTabAction(unref(route));
      }
    });

    function handleChange(activeKey: any) {
      go(activeKeyRef.value, false);
    }

    // Close the current tab
    function handleEdit(targetKey: string) {
      // Added operation to hide, currently only use delete operation
      if (unref(unClose)) return;

      tabStore.closeTabByKeyAction(targetKey);
    }
    return {
      prefixCls,
      unClose,
      getWrapClass,
      getToolsClass,
      handleEdit,
      handleChange,
      activeKeyRef,
      getTabsState,
      getShowQuick,
      getShowRedo,
      getShowFold,
    };
  },
});
</script>
<style lang="less">
@import './index.less';
</style>
