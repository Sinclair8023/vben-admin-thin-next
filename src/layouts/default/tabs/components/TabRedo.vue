<template>
  <el-tooltip
    :content="t('common.redo')"
    placement="bottom"
    :show-after="0.5"
  >
    <span
      :class="`${prefixCls}__extra-redo`"
      @click="handleRedo"
    >
      <g-icon
        prefix="ant-design"
        icon="redo-outlined"
        :loading="loading"
      />
    </span>
  </el-tooltip>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { useI18n } from '/@/hooks/web/useI18n';
import { useTabs } from '/@/hooks/web/useTabs';

export default defineComponent({
  name: 'TabContent',
  setup() {
    const loading = ref(false);
    const { prefixCls } = useDesign('multiple-tabs-content');
    const { t } = useI18n();
    const { refreshPage } = useTabs();

    async function handleRedo() {
      loading.value = true;
      await refreshPage();
      setTimeout(() => {
        loading.value = false;
        // Animation execution time
      }, 1000);
    }
    return { prefixCls, t, handleRedo, loading };
  },
});
</script>
