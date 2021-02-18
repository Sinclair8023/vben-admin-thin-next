<template>
  <el-tooltip
    :show-after="500"
    :content="t('layout.header.tooltipErrorLog')"
    placement="bottom"
  >
    <el-badge
      is-dot
      type="danger"
      :class="prefixCls"
      :max="99"
      :hidden="getCount === 0"
    >
      <g-icon
        prefix="ion"
        icon="bug-outline"
        @click="handleToErrorList"
      />
    </el-badge>
  </el-tooltip>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { errorStore } from '/@/store/modules/error';
import { PageEnum } from '/@/enums/pageEnum';
import { useRouter } from 'vue-router';
import { useDesign } from '/@/hooks/web/useDesign';

export default defineComponent({
  name: 'ErrorAction',

  setup() {
    const { prefixCls } = useDesign('error-action');
    const { t } = useI18n();
    const { push } = useRouter();
    const getCount = computed(() => {
      return errorStore.getErrorListCountState;
    });

    function handleToErrorList() {
      push(PageEnum.ERROR_LOG_PAGE).then(() => {
        errorStore.commitErrorListCountState(0);
      });
    }

    return {
      t,
      prefixCls,
      getCount,
      handleToErrorList,
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-error-action';

.@{prefix-cls} {
  .el-badge__content {
    top: 20px;
  }
}
</style>
