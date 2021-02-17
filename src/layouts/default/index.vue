<template>
  <div :class="prefixCls">
    <LayoutFeatures />
    <LayoutHeader
      fixed
      v-if="getShowFullHeaderRef"
    />
    <el-container
      :class="{
        'ant-layout-has-sider': getIsMixSidebar,
        'layout': true,
      }"
      style="display:flex"
    >
      <LayoutSideBar v-if="getShowSidebar || getIsMobile" />
      <div :class="`${prefixCls}__main`">
        <LayoutMultipleHeader />
        <LayoutContent />
        <LayoutFooter />
      </div>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

import LayoutHeader from './header/index.vue';
import LayoutContent from './content/index.vue';
import LayoutSideBar from './sider/index.vue';
import LayoutMultipleHeader from './header/MultipleHeader.vue';

import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useDesign } from '/@/hooks/web/useDesign';

import { useAppInject } from '/@/hooks/web/useAppInject';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    LayoutFeatures: createAsyncComponent(() => import('/@/layouts/default/feature/index.vue')),
    LayoutFooter: createAsyncComponent(() => import('/@/layouts/default/footer/index.vue')),
    LayoutHeader,
    LayoutContent,
    LayoutSideBar,
    LayoutMultipleHeader,
  },
  setup() {
    const { prefixCls } = useDesign('default-layout');

    const { getIsMobile } = useAppInject();

    const { getShowFullHeaderRef } = useHeaderSetting();

    const { getShowSidebar, getIsMixSidebar } = useMenuSetting();

    return {
      getShowFullHeaderRef,
      getShowSidebar,
      prefixCls,
      getIsMobile,
      getIsMixSidebar,
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-default-layout';

.@{prefix-cls} {
  display: flex;
  width: 100%;
  min-height: 100%;
  background: @content-bg;
  flex-direction: column;

  > .layout {
    min-height: 100%;
  }

  &__main {
    margin-left: 1px;
    width: 100%;
    overflow-x: hidden;
  }
}
</style>
