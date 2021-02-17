<template>
  <div
    @click="openDrawer"
    :class="prefixCls"
  >
    <SettingOutlined />
    <SettingDrawer
      :show="show"
      @close="closeDrawer"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue';
import { SettingOutlined } from '@ant-design/icons-vue';
import SettingDrawer from './SettingDrawer';

import { useDesign } from '/@/hooks/web/useDesign';

export default defineComponent({
  name: 'SettingButton',
  components: { SettingOutlined, SettingDrawer },
  setup() {
    const openDrawerRef = ref<boolean>(false);
    const { prefixCls } = useDesign('setting-button');
    const openDrawer = () => {
      openDrawerRef.value = true;
    };
    const closeDrawer = () => {
      openDrawerRef.value = false;
    };
    return {
      prefixCls,
      openDrawer,
      closeDrawer,
      show: openDrawerRef,
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-setting';

.@{prefix-cls} {
  &-button {
    position: absolute;
    top: 45%;
    right: 0;
    z-index: 10;
    display: flex;
    padding: 10px;
    color: @white;
    cursor: pointer;
    background: @primary-color;
    border-radius: 6px 0 0 6px;
    justify-content: center;
    align-items: center;

    svg {
      width: 1em;
      height: 1em;
    }
  }
  &-drawer {
    .el-drawer__header {
      padding: 16px 24px;
      color: rgba(0, 0, 0, 0.85);
      background: #fff;
      border-radius: 2px 2px 0 0;
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 0;
    }
    .el-drawer__body {
      padding: 16px;
      overflow-y: auto;
    }
  }
}
</style>
