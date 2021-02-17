<template>
  <span @click="handleLock">
    <el-tooltip
      :content="t('layout.header.tooltipLock')"
      placement="bottom"
      show-after="0.5"
    >
      <LockOutlined />
    </el-tooltip>
    <LockAction
      :show="showModalRef"
      @close="handleClosModal"
    />
  </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { LockOutlined } from '@ant-design/icons-vue';
import { useModal } from '/@/components/Modal';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
export default defineComponent({
  name: 'Lock',
  components: {
    LockOutlined,
    LockAction: createAsyncComponent(() => import('./LockModal.vue')),
  },

  setup() {
    const { t } = useI18n();
    const showModalRef = ref(boolean)(false);

    function handleLock() {
      showModalRef.value = true;
    }
    function handleClosModal() {
      showModalRef.value = false;
    }
    return {
      t,
      register,
      handleLock,
      showModalRef,
      handleClosModal,
    };
  },
});
</script>
