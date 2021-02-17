<template>
  <div
    v-if="getMenuFixed && !getIsMobile"
    :style="getHiddenDomStyle"
    v-show="showClassSideBarRef"
  ></div>
  <el-aside
    v-show="showClassSideBarRef"
    ref="sideRef"
    :class="getSiderClass"
    :width="`${getAsideWidth}px`"
  >
    <LayoutMenu
      :theme="getMenuTheme"
      :menuMode="getMode"
      :splitType="getSplitType"
    />
    <DragBar ref="dragBarRef" />
  </el-aside>
</template>
<script lang="ts">
import { computed, defineComponent, ref, unref, CSSProperties } from 'vue';

import LayoutMenu from '../menu';
import LayoutTrigger from '/@/layouts/default/trigger/index.vue';

import { MenuModeEnum, MenuSplitTyeEnum } from '/@/enums/menuEnum';

import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useTrigger, useDragLine, useSiderEvent } from './useLayoutSider';
import { useAppInject } from '/@/hooks/web/useAppInject';
import { useDesign } from '/@/hooks/web/useDesign';

import DragBar from './DragBar.vue';
export default defineComponent({
  name: 'LayoutSideBar',
  components: { LayoutMenu, DragBar, LayoutTrigger },
  setup() {
    const dragBarRef = ref<ElRef>(null);
    const sideRef = ref<ElRef>(null);

    const {
      getCollapsed,
      getMenuWidth,
      getSplit,
      getMenuTheme,
      getRealWidth,
      getMenuHidden,
      getMenuFixed,
      getIsMixMode,
    } = useMenuSetting();

    const { prefixCls } = useDesign('layout-sideBar');

    const { getIsMobile } = useAppInject();

    const { getTriggerAttr, getShowTrigger } = useTrigger(getIsMobile);

    useDragLine(sideRef, dragBarRef);

    const { getCollapsedWidth, onBreakpointChange, onCollapseChange } = useSiderEvent();

    const getMode = computed(() => {
      return unref(getSplit) ? MenuModeEnum.INLINE : null;
    });

    const getSplitType = computed(() => {
      return unref(getSplit) ? MenuSplitTyeEnum.LEFT : MenuSplitTyeEnum.NONE;
    });

    const showClassSideBarRef = computed(() => {
      return unref(getSplit) ? !unref(getMenuHidden) : true;
    });

    const getSiderClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--fixed`]: unref(getMenuFixed),
          [`${prefixCls}--mix`]: unref(getIsMixMode) && !unref(getIsMobile),
        },
        `${prefixCls}--${unref(getMenuTheme)}`,
      ];
    });

    const getHiddenDomStyle = computed(
      (): CSSProperties => {
        const width = `${unref(getRealWidth)}px`;
        return {
          width: width,
          overflow: 'hidden',
          flex: `0 0 ${width}`,
          maxWidth: width,
          minWidth: width,
          transition: 'all 0.2s',
        };
      }
    );

    const getAsideWidth = computed(() => {
      return unref(getIsMobile) || unref(getCollapsed)
        ? unref(getCollapsedWidth)
        : unref(getMenuWidth);
    });
    return {
      prefixCls,
      sideRef,
      dragBarRef,
      getIsMobile,
      getHiddenDomStyle,
      getSiderClass,
      getTriggerAttr,
      getCollapsedWidth,
      getMenuFixed,
      showClassSideBarRef,
      getAsideWidth,
      getCollapsed,
      getMenuTheme,
      onBreakpointChange,
      getMode,
      getSplitType,
      onCollapseChange,
      getShowTrigger,
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-layout-sideBar';

.@{prefix-cls} {
  z-index: @layout-sider-fixed-z-index;

  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
  }

  &--mix {
    top: @header-height;
    height: calc(100% - @header-height);
  }

  &--dark {
    background: @sider-dark-bg-color;

    .ant-layout-sider-trigger {
      color: darken(@white, 25%);
      background: @trigger-dark-bg-color;

      &:hover {
        color: @white;
        background: @trigger-dark-hover-bg-color;
      }
    }
  }

  &:not(.ant-layout-sider-dark) {
    // box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

    .ant-layout-sider-trigger {
      color: @text-color-base;
      border-top: 1px solid @border-color-light;
    }
  }

  .ant-layout-sider-zero-width-trigger {
    top: 40%;
    z-index: 10;
  }

  & .ant-layout-sider-trigger {
    height: 36px;
    line-height: 36px;
  }
}
</style>
