<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <el-switch
      :value="def"
      @change="handleChange"
      :disabled="disabled"
    >
      <!-- :active-text="t('layout.setting.on')"
      :inactive-text="t('layout.setting.off')" -->
    </el-switch>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

import { useDesign } from '/@/hooks/web/useDesign';
import { useI18n } from '/@/hooks/web/useI18n';
import { baseHandler } from '../handler';
import { HandlerEnum } from '../enum';

export default defineComponent({
  name: 'SwitchItem',
  props: {
    event: {
      type: Number as PropType<HandlerEnum>,
      default: () => {},
    },
    disabled: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    def: {
      type: Boolean,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('setting-switch-item');
    const { t } = useI18n();

    function handleChange(val) {
      console.log(props.event, val);
      props.event && baseHandler(props.event, val);
    }
    return {
      prefixCls,
      t,
      handleChange,
    };
  },
});
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-setting-switch-item';

.@{prefix-cls} {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
}
</style>
