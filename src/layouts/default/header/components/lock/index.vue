<template>
  <span>
    <el-tooltip
      :content="t('layout.header.tooltipLock')"
      placement="bottom"
      :show-after="500"
    >
      <LockOutlined @click="open" />
    </el-tooltip>
    <LockAction v-model:show="showRef" />
  </span>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { LockOutlined } from '@ant-design/icons-vue';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
export default defineComponent({
  name: 'Lock',
  components: {
    LockOutlined,
    LockAction: createAsyncComponent(() => import('./LockModal.vue')),
  },
  setup() {
    const { t } = useI18n();
    const showRef = ref<boolean>(false);
    const open = () => {
      showRef.value = true;
    };
    return {
      t,
      showRef,
      open,
    };
  },
});
</script>
