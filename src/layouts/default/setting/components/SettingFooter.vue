<template>
  <div :class="prefixCls">
    <el-button
      type="primary"
      block
      @click="handleCopy"
    >
      <g-icon
        prefix="ant-design"
        icon="copy-outline"
        class="mr-2"
      />
      {{ t('layout.setting.copyBtn') }}
    </el-button>

    <el-button
      type="warning"
      @click="handleResetSetting"
      class="my-3"
    >
      <g-icon
        prefix="ant-design"
        icon="redo-outline"
        class="mr-2"
      />
      {{ t('common.resetText') }}
    </el-button>

    <el-button
      type="danger"
      @click="handleClearAndRedo"
    >
      <g-icon
        prefix="ant-design"
        icon="redo-outline"
        class="mr-2"
      />
      {{ t('layout.setting.clearBtn') }}
    </el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, unref } from 'vue';

import { useDesign } from '/@/hooks/web/useDesign';
import { useI18n } from '/@/hooks/web/useI18n';
import { appStore } from '/@/store/modules/app';
import defaultSetting from '/@/settings/projectSetting';
import { useMessage } from '/@/hooks/web/useMessage';
import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { updateColorWeak } from '/@/logics/theme/updateColorWeak';
import { updateGrayMode } from '/@/logics/theme/updateGrayMode';

export default defineComponent({
  name: 'SettingFooter',
  setup() {
    const { getRootSetting } = useRootSetting();
    const { prefixCls } = useDesign('setting-footer');
    const { t } = useI18n();
    const { createSuccessModal, createMessage } = useMessage();

    function handleCopy() {
      const { isSuccessRef } = useCopyToClipboard(JSON.stringify(unref(getRootSetting), null, 2));
      unref(isSuccessRef) &&
        createSuccessModal({
          title: t('layout.setting.operatingTitle'),
          content: t('layout.setting.operatingContent'),
        });
    }
    function handleResetSetting() {
      try {
        appStore.commitProjectConfigState(defaultSetting);
        const { colorWeak, grayMode } = defaultSetting;
        // updateTheme(themeColor);
        updateColorWeak(colorWeak);
        updateGrayMode(grayMode);
        createMessage.success(t('layout.setting.resetSuccess'));
      } catch (error) {
        createMessage.error(error);
      }
    }

    function handleClearAndRedo() {
      localStorage.clear();
      appStore.resumeAllState();
      location.reload();
    }
    return {
      prefixCls,
      t,
      handleCopy,
      handleResetSetting,
      handleClearAndRedo,
    };
  },
});
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-setting-footer';

.@{prefix-cls} {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .el-button {
    margin-left: 0;
  }
}
</style>
