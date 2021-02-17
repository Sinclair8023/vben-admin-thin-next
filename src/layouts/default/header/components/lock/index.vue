<template>
  <span @click="handleLock">
    <el-tooltip
      :content="t('layout.header.tooltipLock')"
      placement="bottom"
      :show-after="500"
    >
      <LockOutlined />
    </el-tooltip>
    <LockAction
      :show="show"
      @close="handleCloseModal"
    />
  </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { LockOutlined } from '@ant-design/icons-vue';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
export default defineComponent({
  name: 'Lock',
  components: {
    LockOutlined,
    LockAction: createAsyncComponent(() => import('./LockModal.vue')),
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handleCloseModal() {
      this.show = false;
    },
    handleLock() {
      this.show = true;
    },
  },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
});
</script>
