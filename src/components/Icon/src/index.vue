<template>
  <span
    ref="elRef"
    :class="getWarpClass"
    :style="getWrapStyle"
  ></span>
</template>
<script lang="ts">
import type { PropType } from 'vue';
import {
  defineComponent,
  ref,
  watch,
  onMounted,
  nextTick,
  unref,
  computed,
  CSSProperties,
} from 'vue';
import Iconify from '@purge-icons/generated';
import { isString } from '/@/utils/is';
import { propTypes } from '/@/utils/propTypes';
export default defineComponent({
  name: 'GIcon',
  props: {
    // icon name
    icon: propTypes.string,
    // icon color
    color: propTypes.string,
    // 显示loading动画
    loading: propTypes.bool,
    // 旋转
    spin: propTypes.bool,
    // icon size
    size: {
      type: [String, Number] as PropType<string | number>,
      default: 16 * 1.2,
    },
    prefix: propTypes.string.def(''),
  },
  setup(props, { attrs }) {
    const elRef = ref<ElRef>(null);
    const getIconRef = computed(() => {
      const { icon, prefix, loading } = props;
      if (loading) {
        return 'ant-design:loading-outlined';
      }
      return `${prefix ? prefix + ':' : ''}${icon}`;
    });

    const update = async () => {
      const el = unref(elRef);
      if (el) {
        await nextTick();
        const icon = unref(getIconRef);
        if (!icon) return;
        const svg = Iconify.renderSVG(icon, {});

        if (svg) {
          el.textContent = '';
          svg.style.width = '1em';
          svg.style.height = '1em';
          // svg.width = '1em';
          // svg.height = '1em';
          el.appendChild(svg);
        } else {
          const span = document.createElement('span');
          span.className = 'iconify';
          span.dataset.icon = icon;
          el.textContent = '';
          el.appendChild(span);
        }
      }
    };

    const getWrapStyle = computed(
      (): CSSProperties => {
        const { size, color } = props;
        let fs = size;
        if (isString(size)) {
          fs = parseInt(size, 10);
        }
        return {
          fontSize: `${fs}px`,
          color,
          display: 'inline-flex',
        };
      }
    );

    watch(() => props.icon, update, { flush: 'post' });
    watch(() => props.loading, update, { flush: 'post' });
    onMounted(update);

    const getWarpClass = computed(() => {
      return [
        attrs.class,
        'app-iconify anticon',
        {
          'is-loading': props.loading,
          'is-spin': props.spin,
        },
      ];
    });
    return { elRef, getWrapStyle, getWarpClass };
  },
});
</script>
<style lang="less">
@keyframes loadingCircle {
  100% {
    transform: rotate(1turn);
  }
}
.app-iconify {
  display: inline-block;
  vertical-align: middle;
  &.is-loading,
  &.is-spin {
    svg {
      animation: loadingCircle 1s linear infinite;
    }
  }
}

span.iconify {
  display: block;
  min-width: 1em;
  min-height: 1em;
  background: @iconify-bg-color;
  border-radius: 100%;
}
</style>
