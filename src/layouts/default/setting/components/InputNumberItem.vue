<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <el-input-number
      v-bind="$attrs"
      :model-value="def"
      size="small"
      :class="`${prefixCls}-input-number`"
      @change="handleChange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { useDesign } from '/@/hooks/web/useDesign';
import { baseHandler } from '../handler';
import { HandlerEnum } from '../enum';

export default defineComponent({
  name: 'InputNumberItem',
  props: {
    event: {
      type: Number as PropType<HandlerEnum>,
      default: () => {},
    },
    title: {
      type: String,
    },
    def: {
      type: Number,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('setting-input-number-item');

    function handleChange(e: ChangeEvent) {
      debugger;
      props.event && baseHandler(props.event, e);
    }
    return {
      prefixCls,
      handleChange,
    };
  },
});
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-setting-input-number-item';

.@{prefix-cls} {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;

  &-input-number {
    width: 126px;
  }
}
</style>
