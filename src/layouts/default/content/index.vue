<template>
  <div :class="[prefixCls, getLayoutContentMode]">
    <transition v-if="getOpenPageLoading" name="fade">
      <div
        v-if="getPageLoading"
        :class="`${prefixCls}-loading`"
        v-loading="getPageLoading"
      />
    </transition>
    <PageLayout />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
import PageLayout from '/@/layouts/page/index.vue';
import { useContentViewHeight } from './useContentViewHeight';

export default defineComponent({
  name: 'LayoutContent',
  components: { PageLayout },
  setup() {
    const { prefixCls } = useDesign('layout-content');
    const { getOpenPageLoading } = useTransitionSetting();
    const { getLayoutContentMode, getPageLoading } = useRootSetting();

    useContentViewHeight();
    return {
      prefixCls,
      getOpenPageLoading,
      getLayoutContentMode,
      getPageLoading,
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-layout-content';

.@{prefix-cls} {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;

  &.fixed {
    width: 1200px;
    margin: 0 auto;
  }
  &-loading {
    width: 100%;
    height: 100%;
  }
}
</style>
