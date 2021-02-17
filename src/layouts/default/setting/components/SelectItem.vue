<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <el-select
      :class="`${prefixCls}-select`"
      @change="handleChange"
      :model-value="def"
      :disabled="disabled"
      size="mini"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

import { useDesign } from '/@/hooks/web/useDesign';
import { baseHandler } from '../handler';
import { HandlerEnum } from '../enum';

export default defineComponent({
  name: 'SelectItem',
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
      type: [String, Number] as PropType<string | number>,
    },
    options: {
      type: Array as PropType<LabelValueOptions>,
      default: [],
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('setting-select-item');
    function handleChange(e: ChangeEvent) {
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
@prefix-cls: ~'@{namespace}-setting-select-item';

.@{prefix-cls} {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;

  &-select {
    width: 126px;
  }
}
</style>
