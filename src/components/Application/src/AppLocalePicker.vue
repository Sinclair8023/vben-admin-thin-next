<template>
  <el-dropdown @command="handleMenuEvent">
    <span :class="prefixCls">
      <Icon icon="cil:language" />
      <span
        :class="`${prefixCls}__text`"
        v-if="showText"
      >{{ getLangText }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in localeList"
          :key="item.event"
          :command="item.event"
        >{{item.text}}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts">
import type { LocaleType } from '/@/locales/types';

import { defineComponent, ref, watchEffect, unref, computed } from 'vue';
import Icon from '/@/components/Icon';

import { useLocale } from '/@/locales/useLocale';
import { useLocaleSetting } from '/@/hooks/setting/useLocaleSetting';
import { useDesign } from '/@/hooks/web/useDesign';
import { propTypes } from '/@/utils/propTypes';

export default defineComponent({
  name: 'AppLocalPicker',
  components: { Icon },
  props: {
    // Whether to display text
    showText: propTypes.bool.def(true),
    // Whether to refresh the interface when changing
    reload: propTypes.bool,
  },
  setup(props) {
    const selectedKeys = ref<string[]>([]);

    const { prefixCls } = useDesign('app-locale-picker');

    const { localeList } = useLocaleSetting();

    const { changeLocale, getLang } = useLocale();

    const getLangText = computed(() => {
      const key = selectedKeys.value[0];
      if (!key) return '';
      return localeList.find((item) => item.event === key)?.text;
    });

    watchEffect(() => {
      selectedKeys.value = [unref(getLang)];
    });

    function handleMenuEvent(lang: LocaleType | string) {
      changeLocale(lang as LocaleType);
      selectedKeys.value = [lang as string];
      // props.reload && location.reload();
    }

    return { localeList, handleMenuEvent, selectedKeys, getLangText, prefixCls };
  },
});
</script>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-app-locale-picker';

:global(.@{prefix-cls}-overlay) {
  .ant-dropdown-menu-item {
    min-width: 160px;
  }
}

.@{prefix-cls} {
  display: flex;
  align-items: center;
  cursor: pointer;

  &__text {
    margin-left: 6px;
  }
}
</style>
