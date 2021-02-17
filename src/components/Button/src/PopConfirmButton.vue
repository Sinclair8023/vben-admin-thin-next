<script lang="ts">
import { defineComponent, h, unref, computed } from 'vue';
import { ElPopconfirm, ElButton } from 'element-plus';
import { propTypes } from '/@/utils/propTypes';
import { useI18n } from '/@/hooks/web/useI18n';
import { extendSlots } from '/@/utils/helper/tsxHelper';
import { omit } from 'lodash-es';
import { useAttrs } from '/@/hooks/core/useAttrs';

export default defineComponent({
  name: 'PopButton',
  inheritAttrs: false,
  components: { ElPopconfirm, ElButton },
  props: {
    size: propTypes.oneOf(['medium', 'small', 'mini']).def('mini'),
    enable: propTypes.bool.def(true),
    okText: propTypes.string,
    cancelText: propTypes.string,
  },
  setup(props, { slots }) {
    const { t } = useI18n();
    const attrs = useAttrs();

    const getBindValues = computed(() => {
      const popValues = Object.assign(
        {
          okText: t('common.okText'),
          cancelText: t('common.cancelText'),
        },
        { ...props, ...unref(attrs) }
      );
      return popValues;
    });
    return () => {
      const values = (omit(unref(getBindValues), 'icon') as unknown) as any;
      const Button = h(ElButton, values, extendSlots(slots));
      if (!props.enable) {
        return Button;
      }
      return h(
        ElPopconfirm,
        {
          title: values.title,
          confirmButtonText: values.okText,
          cancelButtonText: values.cancelText,
        },
        { reference: Button }
      );
    };
  },
});
</script>
