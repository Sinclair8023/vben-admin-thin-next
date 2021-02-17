import type { TabContentProps } from './types';

import { computed, unref, reactive } from 'vue';
import { TabContentEnum, MenuEventEnum } from './types';
import { tabStore } from '/@/store/modules/tab';
import router from '/@/router';
import { RouteLocationNormalized } from 'vue-router';
import { useTabs } from '/@/hooks/web/useTabs';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export function useTabDropdown(tabContentProps: TabContentProps) {
  const state = reactive({
    current: null as Nullable<RouteLocationNormalized>,
    currentIndex: 0,
  });

  const { currentRoute } = router;

  const isTabs = computed(() => tabContentProps.type === TabContentEnum.TAB_TYPE);

  const getCurrentTab = computed(
    (): RouteLocationNormalized => {
      return unref(isTabs) ? tabContentProps.tabItem : unref(currentRoute);
    }
  );

  /**
   * @description: drop-down list
   */
  const getDropMenuList = computed(() => {
    if (!unref(getCurrentTab)) return;
    const { meta } = unref(getCurrentTab);
    const { path } = unref(currentRoute);

    // Refresh button
    const curItem = state.current;
    const index = state.currentIndex;
    const refreshDisabled = curItem ? curItem.path !== path : true;
    // Close left
    const closeLeftDisabled = index === 0;

    const disabled = tabStore.getTabsState.length === 1;

    // Close right
    const closeRightDisabled =
      index === tabStore.getTabsState.length - 1 && tabStore.getLastDragEndIndexState >= 0;
    const dropMenuList = [
      {
        icon: 'ion:reload-sharp',
        command: MenuEventEnum.REFRESH_PAGE,
        text: t('layout.multipleTab.reload'),
        disabled: refreshDisabled,
      },
      {
        icon: 'clarity:close-line',
        command: MenuEventEnum.CLOSE_CURRENT,
        text: t('layout.multipleTab.close'),
        disabled: meta?.affix || disabled,
        divider: true,
      },
      {
        icon: 'line-md:arrow-close-left',
        command: MenuEventEnum.CLOSE_LEFT,
        text: t('layout.multipleTab.closeLeft'),
        disabled: closeLeftDisabled,
        divider: false,
      },
      {
        icon: 'line-md:arrow-close-right',
        command: MenuEventEnum.CLOSE_RIGHT,
        text: t('layout.multipleTab.closeRight'),
        disabled: closeRightDisabled,
        divider: true,
      },
      {
        icon: 'dashicons:align-center',
        command: MenuEventEnum.CLOSE_OTHER,
        text: t('layout.multipleTab.closeOther'),
        disabled: disabled,
      },
      {
        icon: 'clarity:minus-line',
        command: MenuEventEnum.CLOSE_ALL,
        text: t('layout.multipleTab.closeAll'),
        disabled: disabled,
      },
    ];
    console.log(t('layout.multipleTab.closeAll'))
    return dropMenuList;
  });

  const getTrigger = computed(() => {
    return unref(isTabs) ? 'contextmenu' : 'click';
  });

  function handleContextMenu(tabItem: RouteLocationNormalized) {
    return (e: Event) => {
      if (!tabItem) return;
      e?.preventDefault();
      const index = tabStore.getTabsState.findIndex((tab) => tab.path === tabItem.path);
      state.current = tabItem;
      state.currentIndex = index;
    };
  }

  // Handle right click event
  function handleMenuEvent(event): void {
    const { refreshPage, closeAll, close, closeLeft, closeOther, closeRight } = useTabs();
    switch (event) {
      case MenuEventEnum.SCALE:
        scaleScreen();
        break;
      case MenuEventEnum.REFRESH_PAGE:
        // refresh page
        refreshPage();
        break;
      // Close current
      case MenuEventEnum.CLOSE_CURRENT:
        close(tabContentProps.tabItem);
        break;
      // Close left
      case MenuEventEnum.CLOSE_LEFT:
        closeLeft();
        break;
      // Close right
      case MenuEventEnum.CLOSE_RIGHT:
        closeRight();
        break;
      // Close other
      case MenuEventEnum.CLOSE_OTHER:
        closeOther();
        break;
      // Close all
      case MenuEventEnum.CLOSE_ALL:
        closeAll();
        break;
    }
  }
  return { getDropMenuList, handleMenuEvent, handleContextMenu, getTrigger, isTabs };
}
